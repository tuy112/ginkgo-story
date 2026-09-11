"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";

const SERVERS = [
      { id: "ginkgo", name: "은행나무 서버" },
      { id: "maple", name: "단풍나무 서버" },
];

function seededRandom(seed: number) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
}

function generateCanopy() {
      const blobs = [];
      // 큰 덩어리 틀(뒤쪽, 어두운 톤)
      const clusters = [
          [220, 220, 150], [110, 300, 120], [340, 290, 125],
          [80, 420, 100], [380, 410, 105], [200, 400, 140],
      ];
      let seed = 1;
      for (const [cx, cy, r] of clusters) {
          const count = 9;
          for (let i = 0; i < count; i++) {
              seed += 1;
              const angle = seededRandom(seed) * Math.PI * 2;
              const dist = seededRandom(seed * 1.7) * r * 0.7;
              const blobR = 22 + seededRandom(seed * 2.3) * 26;
              const tone = seededRandom(seed * 3.1);
              blobs.push({
                  cx: cx + Math.cos(angle) * dist,
                  cy: cy + Math.sin(angle) * dist,
                  r: blobR,
                  tone,
              });
          }
      }
      return blobs;
}
  
const CANOPY_BLOBS = generateCanopy();
const LEAVES = Array.from({ length: 12 }, (_, i) => i);

export default function ServerSelectPage() {
      const router = useRouter();
      const [selected, setSelected] = useState<string | null>(null);

      return (
            <div className={styles.layout}>
                  <div className={styles.meshBg} />

                  {/* 히어로: 큰 은행나무 실루엣 */}
                  <svg className={styles.tree} viewBox="0 0 500 700" preserveAspectRatio="xMidYMax meet">
                        <defs>
                              <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3d2c1e" />
                                    <stop offset="100%" stopColor="#1a120b" />
                              </linearGradient>
                              <filter id="softBlur">
                                    <feGaussianBlur stdDeviation="4" />
                              </filter>
                        </defs>

                        <path
                              d="M250,700 C245,560 260,480 235,420 C215,375 260,340 250,260"
                              stroke="url(#trunkGrad)"
                              strokeWidth="26"
                              strokeLinecap="round"
                              fill="none"
                        />
                        <path
                              d="M245,430 C200,400 160,410 120,380 M255,380 C300,350 340,360 380,330 M240,300 C210,270 190,260 160,230 M260,290 C295,260 320,250 355,220"
                              stroke="url(#trunkGrad)"
                              strokeWidth="10"
                              strokeLinecap="round"
                              fill="none"
                              opacity="0.85"
                        />

                        {/* 캐노피 */}
                        <g filter="url(#softBlur)">
                              {CANOPY_BLOBS.map((b, i) => (
                                    <circle
                                          key={i}
                                          cx={b.cx}
                                          cy={b.cy}
                                          r={b.r}
                                          fill={`hsl(${40 + b.tone * 8}, ${60 + b.tone * 15}%, ${34 + b.tone * 28}%)`}
                                          opacity={0.55 + b.tone * 0.35}
                                    />
                              ))}
                        </g>
                        {/* 상단 하이라이트 레이어 */}
                        <g>
                              {CANOPY_BLOBS.filter((b) => b.tone > 0.6).map((b, i) => (
                                    <circle
                                          key={`hl-${i}`}
                                          cx={b.cx - b.r * 0.25}
                                          cy={b.cy - b.r * 0.3}
                                          r={b.r * 0.4}
                                          fill="#fff3c4"
                                          opacity={0.25}
                                    />
                              ))}
                        </g>
                  </svg>

                  {/* 떨어지는 은행잎 */}
                  <div className={styles.leafField}>
                  {LEAVES.map((i) => (
                        <span
                              key={i}
                              className={styles.fallingLeaf}
                              style={{
                                    left: `${(i * 37) % 100}%`,
                                    animationDelay: `${(i * 1.3) % 8}s`,
                                    animationDuration: `${9 + (i % 5)}s`,
                              }}
                        />
                  ))}
                  </div>

                  <header className={styles.header}>
                        <img
                              src="/icons/ginkgo-leaves.svg"
                              alt="은행잎 두 닢"
                              className={styles.leaf}
                        />
                        <div>
                              <h1 className={styles.logoText}>GinkgoStory</h1>
                              <p className={styles.tagline}>메이플스토리 짝퉁 (은행잎스토리)</p>
                        </div>
                  </header>

                  <main className={styles.main}>
                        <Panel className={styles.serverPanel}>
                              <p className={styles.label}>서버 선택</p>
                              <div className={styles.serverList}>
                                    {SERVERS.map((s) => (
                                    <Button
                                          key={s.id}
                                          variant={selected === s.id ? "rowActive" : "row"}
                                          onClick={() => setSelected(s.id)}
                                    >
                                          <span className={styles.dot} data-active={selected === s.id} />
                                          {s.name}
                                    </Button>
                                    ))}
                              </div>
                              <Button
                                    variant="primary"
                                    disabled={!selected}
                                    onClick={() => selected && router.push(`/character?server=${selected}`)}
                              >
                                    {selected ? "입장하기" : "서버를 선택해주세요"}
                              </Button>
                        </Panel>
                  </main>

                  <footer className={styles.footerRow}>
                        <Button variant="ghost">Jstory</Button>
                        <Button variant="ghost">개발자<br/>Github</Button>
                        <Button variant="ghost">끝내기</Button>
                  </footer>
            </div>
      );
}