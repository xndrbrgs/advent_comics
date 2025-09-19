"use client";

import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

const skinOptions = [
  { label: "Light", value: "light", image: "/avatar/skin/light.svg" },
  { label: "Medium", value: "medium", image: "/avatar/skin/medium.svg" },
  { label: "Dark", value: "brown", image: "/avatar/skin/brown.svg" },
];

export default function SkinSelector() {
  const { skin, setSkin } = useAvatarStore();

  return (
    <div className="mb-4">
      <div className="flex gap-4">
        {skinOptions.map((option) => {
          const isSelected = skin === option.value;

          return (
            <motion.button
              key={option.value}
              onClick={() => setSkin(option.value)}
              initial={false}
              animate={{ scale: isSelected ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`border rounded-full shadow-lg p-2 ${
                isSelected ? "border-indigo-500" : "border-gray-300"
              }`}
            >
              <img
                src={option.image}
                alt={option.label}
                className="w-16 h-16 object-contain"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
