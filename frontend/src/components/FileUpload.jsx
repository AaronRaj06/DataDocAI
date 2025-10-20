import { useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
// Temporarily using mock API - switch back to '../services/api' when backend is ready
import { uploadDocument } from '../services/api-mock';
import { BlurFadeText } from './reactbits/AnimatedText';
import { ShimmerButton, RippleButton } from './reactbits/AnimatedButton';
import { GradientProgress } from './reactbits/LoadingAnimations';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    try {
      const response = await uploadDocument(selectedFile);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('success');
      setSelectedFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
        setUploadProgress(0);
      }, 3000);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadStatus('error');
      setError(err.response?.data?.detail || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus(null);
    setError(null);
  };

  return (
    <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
        <Upload className="w-5 h-5 text-indigo-600 animate-float" />
        <BlurFadeText text="Upload Document" delay={0.1} />
      </h2>
      
      <div className="space-y-4">
        {/* File input area */}
        <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 hover:scale-[1.02] transform">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.txt,.doc,.docx"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-2xl inline-block mb-3 animate-float">
              <Upload className="w-12 h-12 text-indigo-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              PDF, TXT, DOC, DOCX (Max 10MB)
            </span>
          </label>
        </div>

        {/* Selected file display */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 animate-slideUp">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
              disabled={uploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Upload button */}
        {selectedFile && !uploadStatus && (
          <div className="space-y-3">
            <ShimmerButton
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Document</span>
                </>
              )}
            </ShimmerButton>
            {uploading && uploadProgress > 0 && (
              <GradientProgress progress={uploadProgress} className="animate-fadeIn" />
            )}
          </div>
        )}

        {/* Success message */}
        {uploadStatus === 'success' && (
          <div className="flex items-center space-x-3 text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 animate-slideUp shadow-sm">
            <div className="bg-green-100 p-1.5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-semibold">Document uploaded successfully!</span>
          </div>
        )}

        {/* Error message */}
        {uploadStatus === 'error' && error && (
          <div className="flex items-center space-x-3 text-red-700 bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200 animate-slideUp shadow-sm">
            <div className="bg-red-100 p-1.5 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm font-semibold">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
