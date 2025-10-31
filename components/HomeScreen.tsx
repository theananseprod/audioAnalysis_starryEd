import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { AudioWaveform } from "./AudioWaveform";
import { MetadataDisplay } from "./MetadataDisplay";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

interface UploadedFile {
  id: string;
  file: File;
  metadata: any;
  uploadDate: string;
}

interface HomeScreenProps {
  onFileAnalyzed: (file: UploadedFile) => void;
}

export const HomeScreen = ({ onFileAnalyzed }: HomeScreenProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mockMetadataExtraction = (file: File) => {
    // Simulate different metadata based on file name
    const mockData = {
      producer: "Metro Boomin",
      composer: "Ludwig Göransson",
      lyricist: "Kendrick Lamar",
      songwriter: "Kendrick Lamar, Ludwig Göransson",
      masteringEngineer: "Mike Bozzi",
      mixingEngineer: "Ali Shaheed Muhammad",
      recordingEngineer: "Derek Ali",
      vocalEngineer: "Johnny Juliano",
      vocalists: ["Kendrick Lamar", "The Weeknd", "SZA"],
      instrumentalists: [
        "Thundercat - Bass",
        "Terrace Martin - Saxophone",
        "Robert Glasper - Piano",
        "Kamasi Washington - Saxophone",
      ],
      publisher: "Top Dawg Entertainment",
      genre: "Hip-Hop / Rap",
      releaseDate: "October 29, 2025",
    };
    return mockData;
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    setIsPlaying(true);

    // Simulate analysis delay
    setTimeout(() => {
      const extractedMetadata = mockMetadataExtraction(file);
      setMetadata(extractedMetadata);
      setIsAnalyzing(false);

      // Add to log
      onFileAnalyzed({
        id: Date.now().toString(),
        file: file,
        metadata: extractedMetadata,
        uploadDate: new Date().toISOString(),
      });
    }, 2000);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setMetadata(null);
    setIsPlaying(false);
  };

  const handleReset = () => {
    handleClear();
  };

  return (
    <div className="h-full overflow-y-auto pb-24">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-foreground mb-2 bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] bg-clip-text text-transparent font-bold">
            Audio Metadata Analyzer
          </h1>
          <p className="text-muted-foreground">
            Upload your audio file to extract detailed credits and metadata
          </p>
        </motion.div>

        {/* File Uploader */}
        <FileUploader
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          onClear={handleClear}
        />

        {/* Waveform Visualization */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col items-center gap-4 mb-4">
              <h3 className="text-foreground font-bold">Waveform</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-transparent border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/20"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="bg-transparent border-[#EC4899]/50 hover:bg-[#EC4899]/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            <AudioWaveform isPlaying={isPlaying} />
          </motion.div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#8B5CF6]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-[#A78BFA]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-[#EC4899]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <p className="text-muted-foreground mt-4">Analyzing audio metadata...</p>
          </motion.div>
        )}

        {/* Metadata Display */}
        {metadata && !isAnalyzing && <MetadataDisplay metadata={metadata} />}
      </div>
    </div>
  );
};
