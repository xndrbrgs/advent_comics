"use client";

import { useState } from "react";
import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

const clothesColors = [
  { name: "blue", color: "#3587b0" },
  { name: "brown", color: "#a8552d" },
  { name: "dark", color: "#452d20" },
  { name: "green", color: "#54b66d" },
  { name: "red", color: "#e15333" },
  { name: "yellow", color: "#ffd419" },
];

const clothesTypes = [
  { label: "Overalls", value: "01-overalls" },
  { label: "High Neck", value: "02-high-neck" },
  { label: "Round Neck", value: "03-round-neck" },
  { label: "Wide Neck", value: "04-wide-round-neck" },
  { label: "V Neck", value: "05-V-neck" },
  { label: "Wide V Neck", value: "06-wide-V-neck" },
  { label: "Shirt", value: "07-shirt" },
  { label: "Round", value: "08-shirt-round-lapels" },
  { label: "Sleeves", value: "09-sleeves" },
  { label: "Beisbol", value: "10-beisbol-T-shirt" },
];

export default function ClothesSelector() {
  const { clothes, clothesColor, setClothes, setClothesColor } =
    useAvatarStore();
  const [selectedColor, setSelectedColor] = useState(clothesColor);

  return (
    <div>
      {/* Clothes Type Picker */}
      <div className="relative">
        <p className="text-sm font-medium mb-2 text-black">
          Choose Clothes Style
        </p>
        <div className="flex gap-4 overflow-x-auto max-w-full px-2 pb-2 p-2">
          {clothesTypes.map((type) => {
            const isSelected =
              clothes === type.value && clothesColor === selectedColor;
            const imagePath = `/avatar/clothes/${type.value}/${selectedColor}.svg`;

            return (
              <motion.button
                key={type.value}
                onClick={() => {
                  setClothes(type.value);
                  setClothesColor(selectedColor);
                }}
                initial={false}
                animate={{ scale: isSelected ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex-shrink-0 border rounded-full shadow-lg p-2 mb-4 ${
                  isSelected ? "border-indigo-500" : "border-gray-300"
                }`}
              >
                <img
                  src={imagePath}
                  alt={type.label}
                  className="w-16 h-16 object-contain"
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Color Picker */}
      <div className="mt-8">
        <p className="text-sm font-medium mb-2 text-black">
          Choose Clothes Color
        </p>
        <div className="flex gap-4">
          {clothesColors.map(({ name, color }) => {
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
