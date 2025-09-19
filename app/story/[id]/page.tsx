"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { stories } from "@/data/stories";
import { AnimatePresence, motion } from "framer-motion";
import DynamicAvatarRenderer from "@/components/avatar/DynamicAvatarRenderer";
import Image from "next/image";

export default function StoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const story = stories[id as keyof typeof stories];
  const [pageIndex, setPageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pageSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!story) router.push("/story");

    // Autoplay music when story loads
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    }
  }, [story]);

  useEffect(() => {
    const currentSound = story.pages[pageIndex]?.sound;

    if (currentSound && pageSoundRef.current) {
      pageSoundRef.current.src = currentSound;
      pageSoundRef.current.play().catch((err) => {
        console.warn("Page sound playback failed:", err);
      });
    }
  }, [pageIndex]);

  if (!story) return null;

  const currentPage = story.pages[pageIndex];

  const getAvatarStyle = (
    position: string | { x: string; y: string },
    scale: string
  ): React.CSSProperties => {
    if (typeof position === "string") {
      switch (position) {
        case "bottom-left":
          return { position: "absolute", bottom: "10%", left: "10%" };
        case "center":
          return {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          };
        case "bottom-right":
          return { position: "absolute", bottom: "10%", right: "10%" };
        default:
          return {};
      }
    } else {
      return { position: "absolute", top: position.y, left: position.x, scale };
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      <h1 className="text-5xl font-bold mb-4 text-black">{story.title}</h1>

      {/* 🎵 Music Player */}
      {story.music && (
        <audio ref={audioRef} src={story.music} loop autoPlay hidden />
      )}

      <audio ref={pageSoundRef} hidden />

      <AnimatePresence mode="wait">
        <div
          key={pageIndex}
          className="relative w-full h-[60vh] rounded-lg overflow-hidden shadow-lg mb-6"
        >
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={currentPage.image}
              alt={`Slide ${pageIndex + 1}`}
              className="w-full h-full object-cover"
              fill
              loading="lazy"
            />
          </motion.div>

          <div className="z-10 absolute bottom-4 left-4 bg-white bg-opacity-80 p-4 rounded shadow text-black max-w-[80%]">
            <p className="text-md lg:text-xl">{currentPage.text}</p>
          </div>

          {currentPage.avatars?.map((avatar, index) => (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
              style={getAvatarStyle(avatar.position, avatar.scale)}
            >
              <DynamicAvatarRenderer
                id={avatar.id}
                image={avatar.image}
                animation={avatar.animation}
                scale={avatar.scale}
                rotate={avatar.rotate}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className="px-4 py-2 bg-indigo-600 rounded-full disabled:opacity-50 hover:scale-105 duration-150 transform transition"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPageIndex((prev) => Math.min(prev + 1, story.pages.length - 1))
          }
          disabled={pageIndex === story.pages.length - 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:scale-105 duration-150 transform transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
