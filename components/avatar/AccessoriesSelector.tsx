"use client";

import { useState } from "react";
import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

const accessoryParts = ["glasses", "bow", "hijab"] as const;

const accessoryStyles = {
  glasses: ["fashion", "oval", "round", "sunglasses"],
  bow: ["bow tie", "center", "left", "right"],
  hijab: ["hijab"], // hijab has no style
};

const accessoryColors = {
  glasses: [
    { name: "blue", color: "#4a739e" },
    { name: "brown", color: "#a8552d" },
    { name: "dark", color: "#452d20" },
    { name: "green", color: "#54b66d" },
    { name: "red", color: "#e15333" },
  ],
  bow: [
    { name: "blue", color: "#4a739e" },
    { name: "brown", color: "#a8552d" },
    { name: "dark", color: "#452d20" },
    { name: "green", color: "#54b66d" },
    { name: "red", color: "#e15333" },
    { name: "pink", color: "#ec4899" },
    { name: "yellow", color: "#fbbf24" },
  ],
  hijab: [
    { name: "blue", color: "#4a739e" },
    { name: "brown", color: "#a8552d" },
    { name: "dark", color: "#452d20" },
    { name: "green", color: "#54b66d" },
    { name: "red", color: "#e15333" },
  ],
};

export default function AccessoriesSelector() {
  const { accessories, toggleAccessory } = useAvatarStore();
  const [selectedPart, setSelectedPart] =
    useState<(typeof accessoryParts)[number]>("glasses");
  const [selectedStyle, setSelectedStyle] = useState(
    accessoryStyles["glasses"][0]
  );
  const [selectedColor, setSelectedColor] = useState(
    accessoryColors["glasses"][0].name
  );

  const styles = accessoryStyles[selectedPart];
  const colors = accessoryColors[selectedPart];

  const getAccessoryKey = (part: string, style: string, color: string) => {
    return part === "hijab" ? `${part}_${color}` : `${part}_${style}_${color}`;
  };

  const getImagePath = (part: string, style: string, color: string) => {
    switch (part) {
      case "glasses":
        return `/avatar/accessories/01-glasses/${style}/${color}.svg`;
      case "bow":
        return `/avatar/accessories/02-bow/${style}/${color}.svg`;
      case "hijab":
        return `/avatar/accessories/03-hijab/${color}.svg`;
      default:
        return "";
    }
  };

  const accessoryKey = getAccessoryKey(
    selectedPart,
    selectedStyle,
    selectedColor
  );
  const imagePath = getImagePath(selectedPart, selectedStyle, selectedColor);
  const isSelected = accessories.includes(accessoryKey);

  return (
    <div>
      <p className="text-sm font-medium mb-2 text-black">Choose Accessories</p>

      {/* Part Selector */}
      <div className="flex gap-4 mb-4 text-black">
        {accessoryParts.map((part) => (
          <motion.button
            key={part}
            onClick={() => {
              setSelectedPart(part);
              setSelectedStyle(accessoryStyles[part][0]);
              setSelectedColor(accessoryColors[part][0].name);
            }}
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
          {styles.map((style) => {
            const key = getAccessoryKey(selectedPart, style, selectedColor);
            const imagePath = getImagePath(selectedPart, style, selectedColor);
            const isSelected = accessories.includes(key);

            return (
              <motion.button
                key={style}
                onClick={() => {
                  setSelectedStyle(style);
                  toggleAccessory(key);
                }}
                initial={false}
                animate={{ scale: isSelected ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex-shrink-0 border rounded-full shadow-lg p-2 min-w-[5rem] ${
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
      <div className="mt-8">
        <p className="text-sm font-medium mb-2 text-black">Choose Color</p>
        <div className="flex gap-4">
          {colors.map(({ name, color }) => {
            const isSelected = selectedColor === name;
            return (
              <motion.button
                key={name}
                onClick={() => setSelectedColor(name)}
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
    </div>
  );
}
