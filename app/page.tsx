import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#FAF8F4] relative overflow-hidden">
      <div className="absolute w-full px-4 justify-center items-center flex flex-col gap-8 md:gap-16 top-1/4 z-10">
        <TextEffect
          per="char"
          preset="fade"
          className="text-2xl md:text-4xl font-bold font-martian uppercase text-center"
        >
          Me passa a HEINZ..
        </TextEffect>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute  bottom-1/5 md:bottom-1/5 left-1/2 -translate-x-1/2 z-10"
      >
        <Button
          variant="destructive"
          className="text-white rounded-none text-lg md:text-xl px-3 py-4 md:py-5 font-martian shadow-none bg-black hover:text-white transition-all"
        >
          <a
            href="/produto"
            className="w-full h-full flex items-center justify-center"
          >
            AGORA
          </a>
        </Button>
      </motion.div>
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          className="w-full h-full object-cover"
          src="/batataG.png"
          alt="Batatas Fritas"
          priority
          fill
          sizes="100vw"
        />
      </div>
    </div>
  );
}
