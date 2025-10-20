from fastapi import FastAPI

app = FastAPI(
    title="DataDocAI API",
    description="API for interacting with the RAG pipeline.",
    version="0.1.0",
)

@app.get("/health", tags=["Health"])
def health_check():
    """
    Endpoint to check if the API is running.
    """
    return {"status": "ok"}

# In Phase 2, we will add the /upload endpoint.
# In Phase 3, we will add the /query endpoint.
