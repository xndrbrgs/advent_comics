"use client";

import { useRouter } from "next/navigation";
import { stories } from "@/data/stories";

export default function StorySelectionPage() {
  const router = useRouter();

  const handleSelectStory = (id: string) => {
    router.push(`/story/${id}`);
  };

  return (
    <div className="flex justify-center items-center h-[90vh] text-black">
      <div className="grid grid-cols-12">
        <div className="col-span-12 items-center text-center">
          <h1 className="text-7xl font-bold mb-4">Choose Your Story!</h1>
        </div>
        <div className="col-span-12 mt-8 items-center text-center">
          <ul className="space-y-4">
            {Object.entries(stories).map(([id, story]) => (
              <li key={id}>
                <button
                  onClick={() => handleSelectStory(id)}
                  className="px-5 py-2 bg-indigo-500 text-xl text-white rounded-full shadow hover:bg-indigo-700 hover:scale-110 transition transform duration-150"
                >
                  {story.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
