"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SkinSelector from "./SkinSelector";
import FaceSelector from "./FaceSelector";
import HairSelector from "./HairSelector";
import ClothesSelector from "./ClothesSelector";
import AccessoriesSelector from "./AccessoriesSelector";

const selectors = [
  { label: "Skin Tone", component: <SkinSelector /> },
  { label: "Face", component: <FaceSelector /> },
  { label: "Hair", component: <HairSelector /> },
  { label: "Clothes", component: <ClothesSelector /> },
  { label: "Accessories", component: <AccessoriesSelector /> },
];

export default function FeatureSelector() {
  const [index, setIndex] = useState(0);
  const current = selectors[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? selectors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === selectors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-6 rounded-2xl border p-6 bg-white shadow-lg w-full h-full">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-[#e4f3ff] rounded-2xl">
        <button
          onClick={handlePrev}
          className="px-3 py-2 bg-white rounded-lg text-black shadow-lg hover:cursor-pointer hover:scale-105 duration-150 transition transform"
        >
          ←
        </button>
        <motion.h2
          key={current.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold text-black"
        >
          {current.label}
        </motion.h2>
        <button
          onClick={handleNext}
          className="px-3 py-2 bg-white rounded-lg text-black shadow-lg hover:cursor-pointer hover:scale-105 duration-150 transition transform"
        >
          →
        </button>
      </div>

      {/* Animated Selector Component */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.label}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {current.component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
