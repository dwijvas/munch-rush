#!/usr/bin/env python3
"""
FastAPI application for LLM interactions and image processing
Supports image uploads, text generation, and chat functionality
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import uvicorn
import os
from datetime import datetime
import shutil
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="LLM and Image Processing API",
    description="API for handling image uploads and LLM interactions",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB

# Model configuration
MODEL_CONFIG = {
    "name": "your-model-name",  # Replace with your model name
    "max_length": 1000,
    "temperature": 0.7,
    "device": "cuda" if torch.cuda.is_available() else "cpu"
}

class ModelManager:
    def __init__(self):
        self.device = torch.device(MODEL_CONFIG["device"])
        self.tokenizer = None
        self.model = None
        self.initialize_model()

    def initialize_model(self):
        """Initialize the model and tokenizer"""
        try:
            logger.info(f"Loading model: {MODEL_CONFIG['name']}")
            self.tokenizer = AutoTokenizer.from_pretrained(MODEL_CONFIG["name"])
            self.model = AutoModelForCausalLM.from_pretrained(MODEL_CONFIG["name"])
            self.model.to(self.device)
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise

# Initialize model manager
model_manager = ModelManager()

# Pydantic models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str
    processing_time: float

class LLMRequest(BaseModel):
    prompt: str
    max_length: Optional[int] = MODEL_CONFIG["max_length"]
    temperature: Optional[float] = MODEL_CONFIG["temperature"]

# Helper functions
def generate_unique_filename(original_filename: str) -> str:
    """Generate a unique filename using timestamp"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{timestamp}_{original_filename}"

def validate_image(file: UploadFile) -> None:
    """Validate image file"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Check file size
    file.file.seek(0, 2)  # Seek to end
    size = file.file.tell()
    file.file.seek(0)  # Reset position
    
    if size > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds maximum limit")

def process_llm_input(prompt: str, max_length: int = MODEL_CONFIG["max_length"], 
                     temperature: float = MODEL_CONFIG["temperature"]) -> str:
    """Process input through the LLM"""
    try:
        inputs = model_manager.tokenizer(prompt, return_tensors="pt").to(model_manager.device)
        outputs = model_manager.model.generate(
            **inputs,
            max_length=max_length,
            do_sample=True,
            temperature=temperature
        )
        return model_manager.tokenizer.decode(outputs[0], skip_special_tokens=True)
    except Exception as e:
        logger.error(f"Error processing LLM input: {str(e)}")
        raise

# API endpoints
@app.post("/upload/image/")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file to the server"""
    try:
        validate_image(file)
        filename = generate_unique_filename(file.filename)
        file_path = UPLOAD_DIR / filename
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"Successfully uploaded image: {filename}")
        return {
            "filename": filename,
            "file_path": str(file_path),
            "content_type": file.content_type,
            "message": "Image uploaded successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/llm/generate/")
async def generate_text(request: LLMRequest):
    """Generate text using the LLM based on a single prompt"""
    try:
        start_time = datetime.now()
        
        response = process_llm_input(
            request.prompt,
            max_length=request.max_length,
            temperature=request.temperature
        )
        
        processing_time = (datetime.now() - start_time).total_seconds()
        logger.info(f"Generated text in {processing_time:.2f} seconds")
        
        return {
            "response": response,
            "processing_time": processing_time,
            "prompt": request.prompt
        }
    except Exception as e:
        logger.error(f"Error generating text: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle a chat conversation with the LLM"""
    try:
        start_time = datetime.now()
        
        # Format messages for the model
        formatted_messages = model_manager.tokenizer.apply_chat_template(
            [{"role": msg.role, "content": msg.content} for msg in request.messages],
            tokenize=True,
            return_tensors="pt"
        )
        
        # Generate response
        formatted_messages = formatted_messages.to(model_manager.device)
        generated_ids = model_manager.model.generate(
            formatted_messages,
            max_new_tokens=MODEL_CONFIG["max_length"],
            do_sample=True,
            temperature=MODEL_CONFIG["temperature"]
        )
        
        response = model_manager.tokenizer.batch_decode(generated_ids)[0]
        processing_time = (datetime.now() - start_time).total_seconds()
        
        logger.info(f"Chat response generated in {processing_time:.2f} seconds")
        return ChatResponse(
            response=response,
            processing_time=processing_time
        )
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health/")
async def health_check():
    """Health check endpoint to verify API status"""
    return {
        "status": "healthy",
        "model_name": MODEL_CONFIG["name"],
        "device": MODEL_CONFIG["device"],
        "upload_dir": str(UPLOAD_DIR),
        "max_image_size": MAX_IMAGE_SIZE
    }

if __name__ == "__main__":
    logger.info("Starting FastAPI application")
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
