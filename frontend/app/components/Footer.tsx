"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SiYoutube,
  SiInstagram,
  SiFacebook,
  SiLinkedin,
  SiX
} from "react-icons/si";

export default function Footer() {
  const base =
    "w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 transition-colors duration-500 ease-in-out group";

  return (
    <footer className="bg-white border-t mt-16 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/nawy-removebg-preview.png"
            alt="Logo"
            width={250}
            height={150}
            className="rounded-md"
          />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">

          <Link href="https://www.youtube.com/channel/UCAtydzjr9JcWM4UNXU1AXig" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${base} hover:bg-red-600`}>
            <SiYoutube className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-500" />
          </Link>

          <Link href="https://www.instagram.com/nawyrealestate/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${base} hover:bg-gradient-to-tr from-yellow-500 to-pink-500`}>
            <SiInstagram className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-500" />
          </Link>

          <Link href="https://www.facebook.com/nawyrealestate" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${base} hover:bg-blue-600`}>
            <SiFacebook className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-500" />
          </Link>

          <Link href="https://www.linkedin.com/company/nawyestate/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${base} hover:bg-blue-700`}>
            <SiLinkedin className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-500" />
          </Link>

          <Link href="https://x.com/nawyegypt" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${base} hover:bg-black`}>
            <SiX className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-500" />
          </Link>

        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} NawyHomes — All rights reserved.
      </p>
    </footer>
  );
}
