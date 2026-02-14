"use client";

type Heart = {
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart as HeartIcon } from "lucide-react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const ANNIVERSARY_PASSWORD = "03012026";

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // 🎯 Scene memoization
  const scenes = useMemo(
    () => [
      { title: `สวัสดี ${name}` },
      { content: "ทุกความทรงจำที่มีเธออยู่ด้วย ทำให้โลกใบนี้อ่อนโยนขึ้นเสมอ" },
      {
        title: "วันแรกที่เราเจอกัน",
        content: `เราเจอกันครั้งแรกตอนเสิร์ต Cocktail เนอะ ${name} ยังจำได้อยู่ไหมนะ`,
      },
      {
        content:
          "ตอนนั้นใจหายนะ วงโปรดกำลังจะไม่มีคอนเสิร์ตแล้ว แต่เหมือนได้เริ่มต้นใหม่ เพราะได้เจอเธอ",
      },
      {
        title: "ความรู้สึกที่มีให้เธอ",
        content: "ทุกครั้งที่ได้อยู่ใกล้เธอ หัวใจก็เต้นแรงขึ้นทุกที",
      },
      { title: "ขอบคุณที่อยู่ด้วยกันมา" },
      { title: "ขอบคุณที่ทำให้ชีวิตมีความหมายมากขึ้น" },
      {
        title: "Happy Valentine's Day 🌻",
        content:
          "ขอให้ปีนี้เป็นปีที่ดีสำหรับเรา และขอให้ความรักของเรายิ่งใหญ่ขึ้นทุกวันนะ",
      },
    ],
    [name]
  );

  // 💕 Hearts optimized generator
  useEffect(() => {
    const layers = isMobile
      ? [{ count: 4, size: [12, 18], opacity: [0.25, 0.4], speed: [30, 38] }]
      : [
          { count: 12, size: [10, 16], opacity: [0.12, 0.22], speed: [28, 36] },
          { count: 10, size: [16, 22], opacity: [0.18, 0.32], speed: [22, 30] },
          { count: 8, size: [22, 32], opacity: [0.25, 0.45], speed: [16, 22] },
        ];

    const Arr = layers.flatMap((layer) =>
      Array.from({ length: layer.count }).map(() => ({
        x: Math.random() * 100,
        size:
          layer.size[0] +
          Math.random() * (layer.size[1] - layer.size[0]),
        duration:
          layer.speed[0] +
          Math.random() * (layer.speed[1] - layer.speed[0]),
        delay: Math.random() * 10,
        opacity:
          layer.opacity[0] +
          Math.random() * (layer.opacity[1] - layer.opacity[0]),
      }))
    );

    setHearts(Arr);
  }, [isMobile]);

  const handleLogin = () => {
    if (!name) return setError("กรุณาใส่ชื่อ");
    if (password !== ANNIVERSARY_PASSWORD)
      return setError("รหัสไม่ถูกต้อง");
    setIsLogin(true);
    setError("");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0f0c1d] flex items-center justify-center px-6 text-white">

      {/* Ambient base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.20),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.15),transparent_60%)]" />

      {/* Heavy glow only desktop */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(168,85,247,0.35),transparent_65%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.25),transparent_65%)] blur-3xl"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* 💕 Floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            initial={{ x: `${heart.x}vw`, y: "110vh", opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, heart.opacity, 0] }}
            transition={{
              duration: heart.duration + 8,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute select-none"
            style={{
              fontSize: heart.size,
              filter: "drop-shadow(0 0 6px rgba(236,72,153,0.6))",
            }}
          >
            🤍
          </motion.div>
        ))}
      </div>

      {/* 🎵 music */}
      <audio autoPlay loop playsInline>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl space-y-6 text-center shadow-2xl"
        >
          <div className="flex justify-center">
            <HeartIcon className="w-9 h-9 text-pink-400" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            พื้นที่พิเศษของเรา
          </h1>

          <input
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
            placeholder="ชื่อของเธอ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-medium shadow-xl"
          >
            เปิดหัวใจ 💗
          </motion.button>
        </motion.div>
      )}

      {isLogin && (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "linear" }}
            className="relative z-10 max-w-3xl text-center space-y-12 will-change-transform transform-gpu"
          >
            <h2 className="text-3xl font-medium">
              {scenes[step].title}
            </h2>

            {scenes[step].content && (
              <p className="text-lg text-white/70">
                {scenes[step].content}
              </p>
            )}

            {step < scenes.length - 1 && (
              <div className="flex justify-center gap-6">
                {step > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep((s) => s - 1)}
                    className="px-10 py-3 bg-white/10 border border-white/20 rounded-full"
                  >
                    ← ย้อนกลับ
                  </motion.button>
                )}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep((s) => s + 1)}
                  className="px-14 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl"
                >
                  ต่อไป →
                </motion.button>
              </div>
            )}

            {step === scenes.length - 1 && (
              <h1 className="text-4xl font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                รักเธอเสมอ {name} 🤍
              </h1>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
