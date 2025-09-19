"use client";

import { useState } from "react";
import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

const faceParts = ["eyes", "mouth", "nose", "eyebrows"] as const;

const faceStyles = {
  eyes: ["Round"],
  mouth: [
    "01-close smile",
    "02-close wide",
    "03-close",
    "04-medium",
    "05-slant",
    "06-only teeth",
    "07-small open",
    "08-medium open",
    "09-angular open",
    "10-baby",
    "11-slant open",
    "12-wide open",
    "13-extra wide",
  ],
  nose: ["01-upturned", "02-medium", "03-wide", "04-snub", "05-small"],
  eyebrows: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
};

const faceColors = {
  eyes: [
    { name: "blue", color: "#3b82f6" },
    { name: "brown", color: "#8b5e3c" },
    { name: "dark", color: "#1f2937" },
    { name: "green", color: "#10b981" },
    { name: "grey", color: "#9ca3af" },
    { name: "purple", color: "#8b5cf6" },
  ],
  eyebrows: [
    { name: "blonde", color: "#ffd89e" },
    { name: "brown", color: "#a8552d" },
    { name: "dark", color: "#452d20" },
    { name: "red", color: "#e15333" },
  ],
};

export default function FaceSelector() {
  const { faceParts: faceState, setFacePart } = useAvatarStore();
  const [selectedPart, setSelectedPart] =
    useState<(typeof faceParts)[number]>("eyes");

  const currentStyle = faceState[selectedPart].style;
  const currentColor = faceState[selectedPart].color;
  const supportsColor = selectedPart in faceColors;

  const getImagePath = (part: string, style: string, color: string) => {
    switch (part) {
      case "eyes":
        return `/avatar/face/01-eyes/${color}.svg`;
      case "mouth":
        return `/avatar/face/02-mouth/${style}.svg`;
      case "nose":
        return `/avatar/face/03-nose/${style}.svg`;
      case "eyebrows":
        return `/avatar/face/04-eyebrows/${color}/${style}.svg`;
      default:
        return "";
    }
  };

  return (
    <div className="mb-6">
      {/* Part Selector */}
      <div className="flex gap-4 mb-4 text-black">
        {faceParts.map((part) => (
          <motion.button
            key={part}
            onClick={() => setSelectedPart(part)}
            initial={false}
            animate={{ scale: selectedPart === part ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`px-4 py-2 rounded-full border shadow-md ${
              selectedPart === part ? "border-indigo-500" : "border-gray-300"
            }`}
          >
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Style Picker */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto max-w-full p-2 px-2">
          {faceStyles[selectedPart].map((style) => {
            const isSelected = currentStyle === style;
            const color = supportsColor ? currentColor : "default";
            const imagePath = getImagePath(selectedPart, style, color);

            return (
              <motion.button
                key={style}
                onClick={() => setFacePart(selectedPart, style, currentColor)}
                initial={false}
                animate={{ scale: isSelected ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex-shrink-0 border rounded-full shadow-lg p-2 mb-3 min-w-[5rem] ${
                  isSelected ? "border-indigo-500" : "border-gray-300"
                }`}
              >
                <img
                  src={imagePath}
                  alt={style}
                  className="w-16 h-16 object-contain"
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Color Picker */}
      {supportsColor && (
        <div className="mt-8">
          <p className="text-sm font-medium mb-2 text-black">Choose Color</p>
          <div className="flex gap-4">
            {faceColors[selectedPart].map(({ name, color }) => {
              const isSelected = currentColor === name;
              return (
                <motion.button
                  key={name}
                  onClick={() => setFacePart(selectedPart, currentStyle, name)}
                  initial={false}
                  animate={{ scale: isSelected ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-10 h-10 rounded-full border ${
                    isSelected ? "border-indigo-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
