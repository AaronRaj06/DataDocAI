# DataDocAI Frontend - Deployment Guide

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t datadocai-frontend .
```

### Run Docker Container

```bash
docker run -p 3000:80 datadocai-frontend
```

The application will be available at `http://localhost:3000`

### Docker Compose (with Backend)

Create a `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./data:/app/data

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=http://localhost:8000
    depends_on:
      - backend
```

Run both services:

```bash
docker-compose up
```

## 🚀 Production Deployment

### Environment Variables

Make sure to set the correct backend URL:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

### Build for Production

```bash
npm run build
```

The `dist` folder will contain the optimized production build.

### Deploy to Various Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Render
1. Connect your GitHub repository
2. Select "Static Site"
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🔧 Configuration

### Backend API Integration

The frontend expects the following endpoints from the backend:

- `POST /upload` - Upload documents
  - Body: FormData with file
  - Response: `{ filename: string, message: string }`

- `POST /query` - Ask questions
  - Body: `{ question: string }`
  - Response: `{ answer: string, sources: Array, message_id: string }`

- `POST /feedback` - Submit feedback
  - Body: `{ message_id: string, feedback: 'positive' | 'negative' }`
  - Response: `{ message: string }`

### CORS Configuration

Make sure your backend allows CORS from the frontend domain:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 Performance Optimization

- ✅ Gzip compression enabled in Nginx
- ✅ Static asset caching (1 year)
- ✅ Code splitting with Vite
- ✅ Lazy loading for components
- ✅ Optimized bundle size

## 🔐 Security

- ✅ Security headers configured in Nginx
- ✅ XSS protection
- ✅ Content Security Policy
- ✅ No sensitive data in frontend code

## 🧪 Testing

Before deploying, test the build locally:

```bash
npm run build
npm run preview
```

## 📝 Deployment Checklist

- [ ] Update `VITE_API_BASE_URL` in `.env`
- [ ] Test API connection
- [ ] Build and test locally
- [ ] Check responsive design
- [ ] Verify all features work
- [ ] Deploy backend first
- [ ] Deploy frontend
- [ ] Test production deployment
- [ ] Setup monitoring and analytics
