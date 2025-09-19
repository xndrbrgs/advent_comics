"use client";

import { useAvatarStore } from "@/store/avatarStore";
import { motion } from "framer-motion";

export default function AvatarPreview() {
  const {
    skin,
    hair,
    hairColor,
    clothes,
    clothesColor,
    accessories,
    faceParts,
  } = useAvatarStore();

  // Construct image paths based on selected options
  const layers = [
    `/avatar/skin/${skin}.svg`,
    `/avatar/face/01-eyes/${faceParts.eyes.color}.svg`,
    `/avatar/face/02-mouth/${faceParts.mouth.style}.svg`,
    `/avatar/face/03-nose/${faceParts.nose.style}.svg`,
    `/avatar/face/04-eyebrows/${faceParts.eyebrows.color}/${faceParts.eyebrows.style}.svg`,
    `/avatar/hair/${hairColor}/${hair}.svg`,
    `/avatar/clothes/${clothes}/${clothesColor}.svg`,
    ...accessories.map((item) => {
      const [type, styleOrColor, maybeColor] = item.split("_");
      if (type === "hijab") {
        return `/avatar/accessories/03-hijab/${styleOrColor}.svg`;
      } else if (type === "glasses") {
        return `/avatar/accessories/01-glasses/${styleOrColor}/${maybeColor}.svg`;
      } else if (type === "bow") {
        return `/avatar/accessories/02-bow/${styleOrColor}/${maybeColor}.svg`;
      }
      return "";
    }),
  ];

  return (
    <motion.div
      className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {layers.map((src, index) =>
        src ? (
          <img
            key={index}
            src={src}
            alt={`Layer ${index}`}
            className="absolute w-full h-full object-contain"
          />
        ) : null
      )}
    </motion.div>
  );
}