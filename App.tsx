import { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { LogScreen } from "./components/LogScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNav } from "./components/BottomNav";
import { GalaxyBackground } from "./components/GalaxyBackground";
import { motion, AnimatePresence } from "motion/react";

interface UploadedFile {
  id: string;
  file: File;
  metadata: any;
  uploadDate: string;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<"home" | "log" | "profile">("home");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleFileAnalyzed = (file: UploadedFile) => {
    setUploadedFiles((prev) => [file, ...prev]);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSelectFile = (file: UploadedFile) => {
    // Navigate to home screen with selected file (could expand this functionality)
    setActiveScreen("home");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Galaxy Background */}
      <GalaxyBackground />

      {/* Main Content Area */}
      <div className="h-screen overflow-hidden relative z-10">
        <AnimatePresence mode="wait">
          {activeScreen === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <HomeScreen onFileAnalyzed={handleFileAnalyzed} />
            </motion.div>
          )}
          {activeScreen === "log" && (
            <motion.div
              key="log"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <LogScreen
                uploadedFiles={uploadedFiles}
                onDeleteFile={handleDeleteFile}
                onSelectFile={handleSelectFile}
              />
            </motion.div>
          )}
          {activeScreen === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProfileScreen uploadedFiles={uploadedFiles} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />
    </div>
  );
}
