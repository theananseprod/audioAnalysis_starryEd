import { motion } from "motion/react";
import { File, Calendar, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface UploadedFile {
  id: string;
  file: File;
  metadata: any;
  uploadDate: string;
}

interface LogScreenProps {
  uploadedFiles: UploadedFile[];
  onDeleteFile: (id: string) => void;
  onSelectFile: (file: UploadedFile) => void;
}

export const LogScreen = ({ uploadedFiles, onDeleteFile, onSelectFile }: LogScreenProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full overflow-hidden pb-24">
      <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h1 className="text-foreground mb-2 font-bold">Analysis Log</h1>
          <p className="text-muted-foreground">
            View your previously analyzed audio files
          </p>
        </motion.div>

        {/* Files List */}
        {uploadedFiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center flex-1 flex items-center justify-center"
          >
            <div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/20 flex items-center justify-center">
                <File className="w-10 h-10 text-[#A78BFA]" />
              </div>
              <h3 className="text-foreground mb-2">No files analyzed yet</h3>
              <p className="text-muted-foreground">
                Upload an audio file on the Home screen to get started
              </p>
            </div>
          </motion.div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile, index) => (
                <motion.div
                  key={uploadedFile.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:border-[#8B5CF6]/50 transition-all cursor-pointer"
                  onClick={() => onSelectFile(uploadedFile)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] shrink-0">
                        <File className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground mb-1 truncate">
                          {uploadedFile.file.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(uploadedFile.uploadDate)}</span>
                        </div>
                        {uploadedFile.metadata && (
                          <div className="flex flex-wrap gap-2">
                            {uploadedFile.metadata.producer && (
                              <Badge
                                variant="secondary"
                                className="bg-[#8B5CF6]/20 border-[#8B5CF6]/30"
                              >
                                {uploadedFile.metadata.producer}
                              </Badge>
                            )}
                            {uploadedFile.metadata.genre && (
                              <Badge
                                variant="secondary"
                                className="bg-[#EC4899]/20 border-[#EC4899]/30"
                              >
                                {uploadedFile.metadata.genre}
                              </Badge>
                            )}
                            {uploadedFile.metadata.vocalists?.[0] && (
                              <Badge
                                variant="secondary"
                                className="bg-[#06B6D4]/20 border-[#06B6D4]/30"
                              >
                                {uploadedFile.metadata.vocalists[0]}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(uploadedFile.id);
                      }}
                      className="hover:bg-destructive/20 shrink-0"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
