"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart } from "lucide-react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState([]);
  const ANNIVERSARY_PASSWORD = "03012026";

  useEffect(() => {
    const layers = [
      { count: 12, size: [10, 16], opacity: [0.12, 0.22], speed: [28, 36] },
      { count: 10, size: [16, 22], opacity: [0.18, 0.32], speed: [22, 30] },
      { count: 8, size: [22, 32], opacity: [0.25, 0.45], speed: [16, 22] },
    ];

    const arr = layers.flatMap((layer) =>
      Array.from({ length: layer.count }).map(() => ({
        x: 5 + Math.random() * 90,
        size:
          layer.size[0] +
          Math.random() * (layer.size[1] - layer.size[0]),
        duration:
          layer.speed[0] +
          Math.random() * (layer.speed[1] - layer.speed[0]),
        delay: Math.random() * 12,
        opacity:
          layer.opacity[0] +
          Math.random() * (layer.opacity[1] - layer.opacity[0]),
      }))
    );

    setHearts(arr);
  }, []);

  const scenes = [
    { title: `สวัสดี ${name}` },
    {
      // title: "เรื่องราวของเรา",
      content: "ทุกความทรงจำที่มีเธออยู่ด้วย ทำให้โลกใบนี้อ่อนโยนขึ้นเสมอ",
    },
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
      title: "Happy Valentine's Day 2026",
      content:
        "ขอให้ปีนี้เป็นปีที่ดีสำหรับเรา และขอให้ความรักของเรายิ่งใหญ่ขึ้นทุกวันนะ",
    },

  ];

  const handleLogin = () => {
    if (!name) return setError("กรุณาใส่ชื่อ");
    if (password !== ANNIVERSARY_PASSWORD)
      return setError("รหัสไม่ถูกต้อง");
    setIsLogin(true);
    setError("");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0f0c1d] flex items-center justify-center px-6 text-white">

      {/* 🌫 Ambient light */}
      {/* 🌫 Ambient base light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.20),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.15),transparent_60%)]" />

      {/* ✨ Moving glow layer */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(168,85,247,0.35),transparent_65%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.25),transparent_65%)] blur-3xl"
        animate={{
          opacity: [0.2, 0.55, 0.2],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🌙 Soft haze */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] blur-2xl"
        animate={{ opacity: [0.05, 0.25, 0.05] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 💕 Floating hearts (luxury soft) */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${heart.x}vw`,
              y: "110vh",
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              y: "-20vh",
              opacity: [0, heart.opacity, 0],
              scale: [0.6, 1, 0.4],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
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



      {/* 🎵 Background music */}
      <audio autoPlay loop>
        <source src="/love.mp3" type="audio/mpeg" />
      </audio>

      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl space-y-6 text-center shadow-2xl"
        >
          <div className="flex justify-center">
            <Heart className="w-9 h-9 text-pink-400" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            พื้นที่พิเศษของเรา
          </h1>

          <p className="text-white/60 text-sm">
            ใส่ชื่อและรหัสผ่าน
          </p>

          <input
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="ชื่อของเธอ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium shadow-xl"
          >
            เปิดหัวใจ 💗
          </motion.button>
        </motion.div>
      )}

      {isLogin && (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0, y: -30, scale: 0.96, filter: "blur(8px)" }}
            className="relative z-10 max-w-3xl text-center space-y-12"
          >

            <h2 className="text-3xl font-medium">
              {scenes[step].title}
            </h2>

            {scenes[step].content && (
              <p className="text-lg leading-relaxed text-white/70">
                {scenes[step].content}
              </p>
            )}

            <div className="flex justify-center items-center gap-6">
              {step > scenes.length - 0 && (
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setStep(step - 1)}
                  className="px-10 py-3 bg-white/10 border border-white/20 backdrop-blur text-white rounded-full text-lg font-medium shadow-lg hover:bg-white/20 transition"
                >
                  ← ย้อนกลับ
                </motion.button>
              )}

              {step < scenes.length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setStep(step + 1)}
                  className="px-14 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:brightness-110 text-white rounded-full text-lg font-medium shadow-xl"
                >
                  ต่อไป →
                </motion.button>
              )}
            </div>


            {step === scenes.length - 1 && (

              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="text-pink-300 text-xl font-medium"
              >
                <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                  รักเธอเสมอ {name}
                </h1>

                ขอบคุณที่เข้ามาเป็นความสุขในชีวิต 🤍
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
