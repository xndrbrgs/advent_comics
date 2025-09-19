"use client";

import { useState } from "react";
import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

const hairColors = [
  { name: "dark", color: "#452d20" },
  { name: "blonde", color: "#ffd89e" },
  { name: "brown", color: "#a8552d" },
  { name: "red", color: "#e15333" },
];

const hairStyles = [
  { label: "High Bangs", value: "01-high bangs" },
  { label: "Low Bangs", value: "02-low bangs" },
  { label: "Side Bangs", value: "04-side bangs" },
  { label: "Bowl", value: "03-bowl" },
  { label: "Flat", value: "05-flattop" },
  { label: "Flat Curly", value: "06-flattop-curly" },
  { label: "Shaven", value: "07-shaven" },
  { label: "Short Curly", value: "08-short-curly" },
  { label: "Bob", value: "09-bob" },
  { label: "Curly", value: "10-curly" },
  { label: "Straight", value: "11-straight with bangs" },
  { label: "Buns", value: "12-buns" },
  { label: "Wavy", value: "13-wavy" },
  { label: "Middle", value: "14-middle parted" },
  { label: "Straight Bang", value: "15-straight bang" },
  { label: "Pigtails", value: "16-pigtails" },
  { label: "Braids", value: "17-braids & bangs" },
  { label: "Braids", value: "18-braids" },
  { label: "Pigtail Long", value: "19-long pigtail" },
  { label: "Pigtail Low", value: "20-low pigtails" },
];

export default function HairSelector() {
  const { hair, hairColor, setHair, setHairColor } = useAvatarStore();
  const [selectedColor, setSelectedColor] = useState(hairColor);

  return (
    <div className="mb-4">
      {/* Hair Style Picker */}
      <div className="pb-4">
        <p className="text-sm font-medium mb-2 text text-black">
          Choose Hair Style
        </p>
        <div className="flex gap-4 overflow-x-auto py-4 p-2 scrollbar-thin scrollbar-thumb-gray-300">
          {hairStyles.map((style) => {
            const isSelected =
              hair === style.value && hairColor === selectedColor;
            const imagePath = `/avatar/hair/${selectedColor}/${style.value}.svg`;

            return (
              <motion.button
                key={style.value}
                onClick={() => {
                  setHair(style.value);
                  setHairColor(selectedColor);
                }}
                initial={false}
                animate={{ scale: isSelected ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`border rounded-full shadow-lg p-2 min-w-[5rem] ${
                  isSelected ? "border-indigo-500" : "border-gray-300"
                }`}
              >
                <img
                  src={imagePath}
                  alt={style.label}
                  className="w-16 h-16 object-contain"
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Hair Color Picker */}
      <div className="mt-8">
        <p className="text-sm font-medium mb-2 text-black">Choose Hair Color</p>
        <div className="flex gap-4">
          {hairColors.map(({ name, color }) => {
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
