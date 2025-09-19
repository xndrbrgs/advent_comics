"use client";

import { useRouter } from "next/navigation";
import { useAvatarStore } from "@/store/avatarStore";

export default function StartStoryButton() {
  const router = useRouter();
  const {
    skin,
    hair,
    hairColor,
    clothes,
    clothesColor,
    accessories,
    faceParts,
  } = useAvatarStore();

  const handleStartStory = () => {
    const avatarData = {
      skin,
      hair,
      hairColor,
      clothes,
      clothesColor,
      accessories,
      faceParts,
    };

    // Option 1: Save to localStorage
    localStorage.setItem("avatarData", JSON.stringify(avatarData));

    // Option 2: Navigate to /story
    router.push("/story");
  };

  return (
    <button
      onClick={handleStartStory}
      className="mt-6 px-6 py-2 text-2xl bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
    >
      Start Story
    </button>
  );
}
