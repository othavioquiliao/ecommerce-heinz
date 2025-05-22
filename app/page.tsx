"use client";

import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full  h-screen flex flex-col bg-[#FAF8F4]">
      <div className="absolute w-full justify-center items-center flex flex-col gap-16 top-1/5 z-10">
        <TextEffect
          per="char"
          preset="fade"
          className="text-4xl font-bold font-martian uppercase"
        >
          Me passa a HEINZ..
        </TextEffect>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-1/5 left-1/2 -translate-x-1/2 z-10"
      >
        <Button
          variant="destructive"
          className="text-white rounded-none text-xl px-4 py-5 font-martian shadow-none font-bold bg-black  hover:text-white hover:transition-all "
        >
          <a
            href="/produto
            "
          >
            AGORA
          </a>
        </Button>
      </motion.div>
      <Image
        className="w-full h-full object-cover absolute top-0 left-0"
        src="/batataG.png"
        alt="Batatas Fritas"
        priority
        width={3840}
        height={2160}
      />
    </div>
  );
}

export type TextEffectProps = {
  children: string; // Note que o tipo é explicitamente 'string'
  // ... outras props
};
