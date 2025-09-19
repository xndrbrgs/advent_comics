// app/story/[id]/layout.tsx
import { getImageList } from "@/lib/getImageList";
import Head from "next/head";

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageList = getImageList();

  return (
    <>
      <Head>
        {imageList.map((src, i) => (
          <link key={i} rel="preload" as="image" href={src} />
        ))}
      </Head>
      {children}
    </>
  );
}
