import Navbar from "@/components/ui/Navbar";
import { section } from "framer-motion/client";

export default function StoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-[#e4f3ff] min-h-screen">
      <Navbar />
      {children}
    </section>
  );
}
