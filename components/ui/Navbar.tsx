import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full text-black p-6">
      <div className="flex justify-between items-center">
        <button className="px-5 py-2 bg-indigo-500 text-lg text-white rounded-full shadow hover:bg-indigo-700 hover:scale-110 transition transform duration-150">
          <Link href="/">Return to Character Maker</Link>
        </button>
        <button className="px-5 py-2 bg-indigo-500 text-lg text-white rounded-full shadow hover:bg-indigo-700 hover:scale-110 transition transform duration-150">
          <Link href="/story">Return to other stories</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
