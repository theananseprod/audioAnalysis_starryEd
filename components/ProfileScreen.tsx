import { motion } from "motion/react";
import { User, Lock, Globe, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface UploadedFile {
  id: string;
  file: File;
  metadata: any;
  uploadDate: string;
}

interface ProfileScreenProps {
  uploadedFiles: UploadedFile[];
}

export const ProfileScreen = ({ uploadedFiles }: ProfileScreenProps) => {
  const [visibility, setVisibility] = useState<"public" | "private" | "unlisted">("public");
  const [biography, setBiography] = useState(
    "Music enthusiast and audio engineer passionate about discovering the creative minds behind great music."
  );

  // Calculate top 3 recurring artists from metadata
  const getTopArtists = () => {
    const artistCount: Record<string, number> = {};

    uploadedFiles.forEach((file) => {
      if (file.metadata?.vocalists) {
        file.metadata.vocalists.forEach((artist: string) => {
          const cleanArtist = artist.split(" - ")[0]; // Remove instrument info
          artistCount[cleanArtist] = (artistCount[cleanArtist] || 0) + 1;
        });
      }
      if (file.metadata?.producer) {
        artistCount[file.metadata.producer] = (artistCount[file.metadata.producer] || 0) + 1;
      }
    });

    return Object.entries(artistCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([artist, count]) => ({ artist, count }));
  };

  const topArtists = getTopArtists();

  const visibilityOptions = [
    {
      value: "public" as const,
      label: "Public",
      icon: Globe,
      description: "Anyone can view your profile",
    },
    {
      value: "unlisted" as const,
      label: "Unlisted",
      icon: EyeOff,
      description: "Only people with the link can view",
    },
    {
      value: "private" as const,
      label: "Private",
      icon: Lock,
      description: "Only you can view your profile",
    },
  ];

  return (
    <div className="h-full overflow-y-auto pb-24">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-foreground mb-2 font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </motion.div>

        {/* Profile Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-foreground mb-4 text-center font-bold">Profile Visibility</h3>
          <div className="space-y-3">
            {visibilityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setVisibility(option.value)}
                  className={`
                    w-full p-4 rounded-xl flex items-center gap-4 transition-all
                    ${
                      visibility === option.value
                        ? "bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 border-2 border-[#8B5CF6]"
                        : "glass border hover:border-[#8B5CF6]/50"
                    }
                  `}
                >
                  <div
                    className={`
                    p-3 rounded-lg
                    ${
                      visibility === option.value
                        ? "bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]"
                        : "bg-muted"
                    }
                  `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        visibility === option.value ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-foreground">{option.label}</p>
                    <p className="text-muted-foreground text-sm">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Top Artists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-foreground mb-4 text-center font-bold">Top 3 Artists in Analysis</h3>
          {topArtists.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Analyze some audio files to see your top artists
            </p>
          ) : (
            <div className="space-y-3">
              {topArtists.map(({ artist, count }, index) => (
                <motion.div
                  key={artist}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#8B5CF6]/20"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center shrink-0">
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{artist}</p>
                    <p className="text-muted-foreground text-sm">
                      {count} {count === 1 ? "appearance" : "appearances"}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-[#8B5CF6]/20 border-[#8B5CF6]/30"
                  >
                    #{index + 1}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Biography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <Label htmlFor="biography" className="text-foreground mb-4 block text-center font-bold">
            Biography
          </Label>
          <Textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Tell us about yourself..."
            className="min-h-[120px] bg-transparent border-[#8B5CF6]/30 focus:border-[#8B5CF6] resize-none"
          />
          <Button
            className="mt-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:opacity-90"
          >
            Save Changes
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-foreground mb-4 text-center font-bold">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/20 border border-[#8B5CF6]/30">
              <p className="text-3xl text-foreground mb-1">{uploadedFiles.length}</p>
              <p className="text-muted-foreground text-sm">Files Analyzed</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-[#A78BFA]/20 border border-[#06B6D4]/30">
              <p className="text-3xl text-foreground mb-1">{topArtists.length}</p>
              <p className="text-muted-foreground text-sm">Unique Artists</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 space-y-2"
        >
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-[#8B5CF6] transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-border">•</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-[#8B5CF6] transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-border">•</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-[#8B5CF6] transition-colors"
            >
              Ethical AI Guidelines
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
