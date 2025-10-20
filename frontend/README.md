# DataDocAI Frontend

Modern React frontend for the DataDocAI RAG (Retrieval-Augmented Generation) system.

## 🚀 Features

- 📤 **Document Upload**: Upload PDF, TXT, DOC, DOCX files with drag-and-drop support
- 💬 **Chat Interface**: Interactive chat UI to ask questions about uploaded documents
- 📊 **Source Display**: View relevant document sources for each answer with similarity scores
- 👍 **Feedback System**: Rate responses with thumbs up/down
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Real-time Updates**: Loading indicators and smooth animations

## 🛠️ Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library

## 📦 Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the backend API URL if needed:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx      # Document upload component
│   │   ├── ChatInterface.jsx   # Main chat UI
│   │   └── MessageBubble.jsx   # Individual message display
│   ├── services/
│   │   └── api.js              # API client with Axios
│   ├── utils/
│   │   └── config.js           # Configuration and constants
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Entry point
├── .env                        # Environment variables
└── package.json                # Dependencies
```

## 🔌 API Integration

The frontend connects to the backend API with the following endpoints:

- `POST /upload` - Upload documents
- `POST /query` - Ask questions
- `POST /feedback` - Submit feedback

## 📱 Usage

1. **Upload Documents**: Click the upload area or drag files to upload documents
2. **Ask Questions**: Type your question in the chat input and press Enter or click Send
3. **View Sources**: See which document sections were used to answer your question
4. **Provide Feedback**: Click thumbs up/down to rate responses

## 🤝 Contributing

This is the frontend component of DataDocAI. Make sure the backend is running before starting development.

## 📝 Developer Notes

- Follow React best practices and hooks patterns
- Use Tailwind utility classes for styling
- Keep components modular and reusable
- Handle loading and error states gracefully
- Test API integration with the backend
