import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface MetadataProps {
  metadata: {
    producer?: string;
    composer?: string;
    lyricist?: string;
    masteringEngineer?: string;
    mixingEngineer?: string;
    recordingEngineer?: string;
    vocalEngineer?: string;
    songwriter?: string;
    vocalists?: string[];
    instrumentalists?: string[];
    publisher?: string;
    genre?: string;
    releaseDate?: string;
  };
}

export const MetadataDisplay = ({ metadata }: MetadataProps) => {
  const fields = [
    { label: "Producer", value: metadata.producer },
    { label: "Composer", value: metadata.composer },
    { label: "Lyricist", value: metadata.lyricist },
    { label: "Songwriter", value: metadata.songwriter },
    { label: "Mastering Engineer", value: metadata.masteringEngineer },
    { label: "Mixing Engineer", value: metadata.mixingEngineer },
    { label: "Recording Engineer", value: metadata.recordingEngineer },
    { label: "Vocal Engineer", value: metadata.vocalEngineer },
    { label: "Publisher", value: metadata.publisher },
    { label: "Genre", value: metadata.genre },
    { label: "Release Date", value: metadata.releaseDate },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-foreground mb-4 text-center font-bold">Track Metadata</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {fields.map(
            (field) =>
              field.value && (
                <div key={field.label} className="border-b border-border/50 pb-3">
                  <p className="text-muted-foreground text-sm mb-1">{field.label}</p>
                  <p className="text-foreground">{field.value}</p>
                </div>
              )
          )}

          {metadata.vocalists && metadata.vocalists.length > 0 && (
            <div className="border-b border-border/50 pb-3">
              <p className="text-muted-foreground text-sm mb-2">Vocalists</p>
              <div className="flex flex-wrap gap-2">
                {metadata.vocalists.map((vocalist, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 border-[#8B5CF6]/30"
                  >
                    {vocalist}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {metadata.instrumentalists && metadata.instrumentalists.length > 0 && (
            <div className="border-b border-border/50 pb-3">
              <p className="text-muted-foreground text-sm mb-2">Instrumentalists</p>
              <div className="flex flex-wrap gap-2">
                {metadata.instrumentalists.map((instrumentalist, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-[#06B6D4]/20 to-[#A78BFA]/20 border-[#06B6D4]/30"
                  >
                    {instrumentalist}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
};
