import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, Image, FileText } from "lucide-react";

export default function FileUploadCard({
  label,
  accept = ".jpg,.png,.pdf",
  maxSize = 5, // MB
  onChange,
  value,
  error,
  required = false,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const file = value;
  const fileName = file?.name;
  const fileSize = file?.size;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (file) => {
    if (!file) return <Upload className="w-8 h-8 text-gray-400" />;
    const type = file.type;
    if (type.startsWith("image/")) return <Image className="w-8 h-8 text-secondary" />;
    if (type === "application/pdf") return <FileText className="w-8 h-8 text-error" />;
    return <File className="w-8 h-8 text-gray-400" />;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    
    onChange(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {!file ? (
        <motion.div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-colors duration-200
            ${dragActive 
              ? "border-primary bg-primary-50" 
              : "border-gray-300 hover:border-secondary hover:bg-gray-50"
            }
            ${error ? "border-error" : ""}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center mb-4
              ${dragActive ? "bg-primary/10" : "bg-gray-100"}
            `}>
              <Upload className={`w-8 h-8 ${dragActive ? "text-primary" : "text-gray-400"}`} />
            </div>
            
            <p className="text-sm font-medium text-gray-700 mb-1">
              {dragActive ? "Drop file here" : "Drag & drop your file here"}
            </p>
            <p className="text-xs text-gray-500">
              or click to browse • Max size: {maxSize}MB
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-gray-200 rounded-xl p-4 bg-white"
        >
          <div className="flex items-center gap-4">
            {/* Preview or Icon */}
            <div className="flex-shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getFileIcon(file)}
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {fileName}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(fileSize)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-error hover:bg-error-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
}
