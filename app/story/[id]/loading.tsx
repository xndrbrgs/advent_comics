// app/story/[id]/loading.tsx
import { getImageList } from "@/lib/getImageList";
import Head from "next/head";

export default function Loading() {
  const backgrounds = getImageList("backgrounds/nitrous-sedation", [".svg"]);
  const npcs = getImageList("npc", [".webp"]);

  return (
    <>
      <Head>
        {[...backgrounds, ...npcs].map((src, i) => (
          <link key={i} rel="preload" as="image" href={src} />
        ))}
      </Head>

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
}
