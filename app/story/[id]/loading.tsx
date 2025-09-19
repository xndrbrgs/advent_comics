// app/story/[id]/loading.tsx
import Head from "next/head";

export default function Loading() {
  return (
    <>
      <Head>
        {require("fs")
          .readdirSync("/backgrounds/nitrous-sedation")
          .filter((file: any) => file.endsWith(".svg"))
          .map((file: any, i: any) => (
            <link
              key={i}
              rel="preload"
              as="image"
              href={`/backgrounds/nitrous-sedation/${file}`}
            />
          ))}
        {require("fs")
          .readdirSync("/npc")
          .filter((file: any) => file.endsWith(".webp"))
          .map((file: any, i: any) => (
            <link key={i} rel="preload" as="image" href={`/npc/${file}`} />
          ))}
      </Head>

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
}
