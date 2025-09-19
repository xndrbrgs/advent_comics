import { section } from "framer-motion/client";

export default function StoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-[#e4f3ff] min-h-screen">
      <p className="text-black">Navbar goes here</p>
      {children}
    </section>
  );
}
