"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart as HeartIcon } from "lucide-react";

type Heart = {
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const playlist = [
  { src: "/intentions.mp3", title: "Starfall – Intentions" },

];

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const ANNIVERSARY_PASSWORD = "03012026";

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

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

  useEffect(() => {
    const layers = isMobile
      ? [{ count: 5, size: [14, 20], opacity: [0.3, 0.45], speed: [28, 38] }]
      : [
          { count: 14, size: [12, 18], opacity: [0.12, 0.25], speed: [30, 40] },
          { count: 10, size: [18, 26], opacity: [0.18, 0.35], speed: [22, 32] },
          { count: 8, size: [26, 34], opacity: [0.22, 0.45], speed: [16, 24] },
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

  useEffect(() => {
    if (!isLogin || !audioRef.current) return;

    const index = Math.min(step, playlist.length - 1);
    if (index === currentTrack) return;

    crossFade(index);
  }, [step, isLogin]);

  const crossFade = (next: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    let vol = audio.volume;

    const fadeOut = setInterval(() => {
      vol -= 0.04;
      if (vol <= 0) {
        clearInterval(fadeOut);
        audio.pause();
        audio.src = playlist[next].src;
        audio.load();
        audio.play().catch(() => {});
        fadeIn();
      } else {
        audio.volume = vol;
      }
    }, 40);

    const fadeIn = () => {
      let v = 0;
      const fade = setInterval(() => {
        v += 0.03;
        if (v >= 0.45) {
          audio.volume = 0.45;
          clearInterval(fade);
        } else {
          audio.volume = v;
        }
      }, 70);
    };

    setCurrentTrack(next);
  };

  const handleLogin = () => {
    if (!name) return setError("กรุณาใส่ชื่อ");
    if (password !== ANNIVERSARY_PASSWORD)
      return setError("รหัสไม่ถูกต้อง");

    setIsLogin(true);
    setError("");

    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});
      crossFade(0);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0f0c1d] flex items-center justify-center px-6 text-white">

      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.20),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.15),transparent_60%)]" />

      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(168,85,247,0.35),transparent_65%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.25),transparent_65%)] blur-3xl"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Hearts */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden will-change-transform">
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

      {/* Audio */}
      <audio ref={audioRef} loop playsInline preload="metadata" />

      {/* Song label */}
      {isLogin && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-50 text-xs text-white/60 backdrop-blur bg-white/5 border border-white/10 px-4 py-2 rounded-full"
        >
          🎵 {playlist[currentTrack].title}
        </motion.div>
      )}

      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl space-y-6 text-center shadow-2xl"
        >
          <HeartIcon className="w-10 h-10 text-pink-400 mx-auto" />
          <h1 className="text-2xl font-semibold">พื้นที่พิเศษของเรา</h1>

          <input
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
            placeholder="ชื่อของเธอ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
            placeholder="รหัสวันครบรอบ"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 max-w-3xl text-center space-y-12 transform-gpu"
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
