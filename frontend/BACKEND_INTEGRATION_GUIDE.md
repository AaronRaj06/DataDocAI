# Backend Integration Guide - For DevB

## 👋 **Hey DevB! Frontend is Ready for You**

DevC has completed the entire frontend and it's waiting to connect to your backend APIs. Here's everything you need to know for a smooth integration.

---

## 📡 **API Contract (What Frontend Expects)**

### 1. **POST /upload** - File Upload

**Request:**
```http
POST http://localhost:8000/upload
Content-Type: multipart/form-data

Body: FormData with 'file' field
```

**Expected Response (200 OK):**
```json
{
  "filename": "document.pdf",
  "size": 245760,
  "message": "File uploaded successfully"
}
```

**Expected Error (400/500):**
```json
{
  "detail": "Error message here"
}
```

**Frontend Code:**
```javascript
// src/services/api.js
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(API_ENDPOINTS.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
```

---

### 2. **POST /query** - RAG Query

**Request:**
```http
POST http://localhost:8000/query
Content-Type: application/json

Body:
{
  "question": "What is this document about?"
}
```

**Expected Response (200 OK):**
```json
{
  "answer": "The document is about...",
  "sources": [
    {
      "document": "filename.pdf",
      "page": 1,
      "score": 0.95
    }
  ],
  "message_id": "msg_1234567890"
}
```

**Expected Error (400/500):**
```json
{
  "detail": "Error message here"
}
```

**Frontend Code:**
```javascript
// src/services/api.js
export const queryRAG = async (question) => {
  const response = await apiClient.post(API_ENDPOINTS.query, {
    question
  });
  return response.data;
};
```

---

### 3. **POST /feedback** - Submit Feedback

**Request:**
```http
POST http://localhost:8000/feedback
Content-Type: application/json

Body:
{
  "message_id": "msg_1234567890",
  "feedback": "positive"  // or "negative"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Feedback submitted successfully"
}
```

**Frontend Code:**
```javascript
// src/services/api.js
export const submitFeedback = async (messageId, feedback) => {
  const response = await apiClient.post(API_ENDPOINTS.feedback, {
    message_id: messageId,
    feedback
  });
  return response.data;
};
```

---

## 🔧 **Backend Setup Requirements**

### 1. Enable CORS

**FastAPI Example:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# IMPORTANT: Add this for frontend to work
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. Handle Multipart Form Data

**FastAPI Example:**
```python
from fastapi import File, UploadFile

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    # Your upload logic here
    return {
        "filename": file.filename,
        "size": file.size,
        "message": "File uploaded successfully"
    }
```

### 3. Return Consistent Error Format

**FastAPI Example:**
```python
from fastapi import HTTPException

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )
```

---

## 🔄 **Frontend Integration Steps**

### Step 1: Update Frontend Imports (3 files)

#### File 1: `src/components/ChatInterface.jsx`
**Line 4:** Change from:
```javascript
import { queryRAG } from '../services/api-mock';
```
To:
```javascript
import { queryRAG } from '../services/api';
```

#### File 2: `src/components/FileUpload.jsx`
**Line 4:** Change from:
```javascript
import { uploadDocument } from '../services/api-mock';
```
To:
```javascript
import { uploadDocument } from '../services/api';
```

#### File 3: `src/components/MessageBubble.jsx`
**Line 4:** Change from:
```javascript
import { submitFeedback } from '../services/api-mock';
```
To:
```javascript
import { submitFeedback } from '../services/api';
```

### Step 2: Verify API URL (if needed)

Check `frontend/.env`:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🧪 **Testing Integration**

### Manual Testing Checklist

#### Test 1: Health Check (Optional)
```bash
curl http://localhost:8000/health
# Should return: {"status": "healthy"}
```

#### Test 2: File Upload
```bash
curl -X POST http://localhost:8000/upload \
  -F "file=@test.pdf"
# Should return JSON with filename and size
```

#### Test 3: Query
```bash
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"question": "test query"}'
# Should return answer and sources
```

#### Test 4: Frontend Integration
1. Start backend: `cd backend && uvicorn main:app --reload`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173
4. Try upload → chat → feedback flow

---

## 🐛 **Common Issues & Solutions**

### Issue 1: CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Add CORS middleware (see above)

### Issue 2: 422 Unprocessable Entity
**Error:** Backend returns 422 on /upload

**Solution:** Check that you're accepting `UploadFile = File(...)` parameter

### Issue 3: Frontend Not Connecting
**Error:** Network error or connection refused

**Solution:**
- Verify backend is running on port 8000
- Check `.env` has correct API URL
- Ensure no firewall blocking

### Issue 4: Sources Not Displaying
**Error:** Chat works but no sources shown

**Solution:** Ensure your `/query` response includes:
```json
{
  "sources": [
    {
      "document": "filename",
      "page": 1,
      "score": 0.95
    }
  ]
}
```

---

## 📂 **Frontend File Structure Reference**

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx      ← Uses /query API
│   │   ├── FileUpload.jsx         ← Uses /upload API
│   │   ├── MessageBubble.jsx      ← Uses /feedback API
│   │   ├── ErrorBoundary.jsx      ← Error handling
│   │   └── reactbits/             ← UI animations (ignore)
│   ├── services/
│   │   ├── api.js                 ← REAL API calls (use this)
│   │   └── api-mock.js            ← MOCK API (currently used)
│   └── utils/
│       └── config.js              ← API endpoints config
├── .env                           ← API URL configuration
└── vite.config.js                 ← Dev server config
```

---

## 🎯 **DevA Integration Points**

### For DevA (RAG Handler):

Your functions should be called from DevB's endpoints like this:

**Backend Structure:**
```python
# backend/main.py (DevB)
from rag.rag_pipeline import process_documents, get_answer

@app.post("/upload")
async def upload_endpoint(file: UploadFile):
    # Save file
    result = process_documents(file_path)  # ← DevA's function
    return {"filename": file.filename, ...}

@app.post("/query")
async def query_endpoint(request: QueryRequest):
    result = get_answer(request.question)  # ← DevA's function
    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "message_id": generate_id()
    }
```

**DevA's Expected Function Signatures:**

```python
# backend/rag/rag_pipeline.py (DevA)

def process_documents(file_path: str) -> dict:
    """
    Process uploaded document
    Returns: {"status": "success", "chunks": 42}
    """
    pass

def get_answer(question: str) -> dict:
    """
    Query RAG system
    Returns: {
        "answer": "...",
        "sources": [
            {"document": "...", "page": 1, "score": 0.95}
        ]
    }
    """
    pass
```

---

## ✅ **Integration Checklist for DevB**

### Before Integration:
- [ ] Backend runs on http://localhost:8000
- [ ] CORS is configured for http://localhost:5173
- [ ] All 3 endpoints implemented (/upload, /query, /feedback)
- [ ] Error responses return `{"detail": "message"}` format

### During Integration:
- [ ] Update 3 frontend import statements
- [ ] Test /upload with Postman/curl
- [ ] Test /query with Postman/curl
- [ ] Test /feedback with Postman/curl

### Testing Integration:
- [ ] Upload a PDF file through UI
- [ ] See file in uploaded documents list
- [ ] Ask a question in chat
- [ ] Receive answer with sources
- [ ] Click thumbs up/down (feedback)
- [ ] Check browser console for errors

---

## 📞 **Communication**

### When Backend is Ready:

**Notify DevC:**
> "Backend APIs are ready at http://localhost:8000. All endpoints tested and working. CORS configured."

**DevC Will:**
1. Update 3 import statements (5 minutes)
2. Test integration (15 minutes)
3. Report any issues found

### Expected Timeline:
- **Backend completion:** DevB + DevA coordination
- **Frontend switch:** 5 minutes
- **Integration testing:** 15-30 minutes
- **Bug fixes (if any):** 1-2 hours max

---

## 🚀 **Current Status**

### Frontend: ✅ **100% READY**
- All UI components complete
- All API calls implemented
- Mock API for independent testing
- Error handling in place
- Animations and polish complete
- Documentation complete

### Waiting For:
- Backend /upload endpoint
- Backend /query endpoint  
- Backend /feedback endpoint
- DevA's RAG functions

### Once Backend Ready:
- Change 3 imports (5 min)
- Integration complete! 🎉

---

## 📚 **Additional Resources**

- **Frontend Audit:** `/frontend/FRONTEND_READINESS_AUDIT.md`
- **React Bits Docs:** `/frontend/REACTBITS_ENHANCEMENTS.md`
- **Component Showcase:** `/frontend/COMPONENT_SHOWCASE.md`
- **Testing Without Backend:** `/frontend/TESTING_WITHOUT_BACKEND.md`
- **Project Board:** `/GITHUB_PROJECT_BOARD.md`

---

**Questions? Issues? Let DevC know!** 🤝

Frontend is production-ready and excited to connect with your backend! 🚀
