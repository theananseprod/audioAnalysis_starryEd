import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const FileUploader = ({ onFileSelect, selectedFile, onClear }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <motion.div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            glass rounded-2xl p-12 cursor-pointer transition-all duration-300
            ${isDragging ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.1)]" : "hover:border-[#A78BFA]"}
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-foreground mb-2">Upload Audio File</h3>
              <p className="text-muted-foreground text-sm">
                Drag and drop or click to browse
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Supports MP3, WAV, M4A, FLAC
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]">
                <File className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-foreground">{selectedFile.name}</p>
                <p className="text-muted-foreground text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="hover:bg-destructive/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
