"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const WORLD_WIDTH = 2400;
const GROUND_LEVEL = 40;
const GRAVITY = 0.7;
const JUMP_FORCE = -13;
const MOVE_SPEED = 4;
const PLAYER_W = 42;

const NPC = { x: 620, name: "은행지기 할아버지" };
const NPC_LINES = [
      "어서 오게, 이 마을에 처음 온 모험가로군.",
      "저 앞쪽에 반짝이는 포탈이 하나 있는데, 아직 다음 지역이 열리진 않았다네.",
      "요즘 슬라임들이 자꾸 나타나서 골치가 아파. 조심하게나.",
];

const PORTAL = { x: 2050 };

type Slime = {
      id: number;
      x: number;
      minX: number;
      maxX: number;
      dir: 1 | -1;
      hp: number;
      maxHp: number;
      alive: boolean;
      respawnAt: number | null;
};

const INITIAL_SLIMES: Slime[] = [
      { id: 1, x: 1150, minX: 1080, maxX: 1300, dir: 1, hp: 100, maxHp: 100, alive: true, respawnAt: null },
      { id: 2, x: 1500, minX: 1450, maxX: 1650, dir: -1, hp: 100, maxHp: 100, alive: true, respawnAt: null },
];

function WorldContent() {
      const router = useRouter();
      const params = useSearchParams();

      const name = params.get("name") || "모험가";
      const skin = params.get("skin") || "#ffe0bd";
      const hair = params.get("hair") || "#3d2b1f";
      const face = params.get("face") || "😊";

      const [player, setPlayer] = useState({
            x: 100,
            y: 0,
            vy: 0,
            facing: 1 as 1 | -1,
            isAttacking: false,
            hp: 100,
            maxHp: 100,
            mp: 50,
            maxMp: 50,
            level: 1,
            exp: 0,
            maxExp: 100,
      });
      const [slimes, setSlimes] = useState<Slime[]>(INITIAL_SLIMES);
      const [dialog, setDialog] = useState<{ open: boolean; step: number }>({ open: false, step: 0 });
      const [toast, setToast] = useState<string | null>(null);

      const keys = useRef<Record<string, boolean>>({});
      const attackCooldown = useRef(false);
      const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
      const hitTimer = useRef<Record<number, number>>({});

      const showToast = (msg: string) => {
            setToast(msg);
            if (toastTimer.current) clearTimeout(toastTimer.current);
            toastTimer.current = setTimeout(() => setToast(null), 2200);
      };

      const grantExp = (amount: number) => {
            setPlayer((p) => {
                  let exp = p.exp + amount;
                  let level = p.level;
                  let maxExp = p.maxExp;
                  if (exp >= maxExp) {
                  exp -= maxExp;
                  level += 1;
                  maxExp = Math.round(maxExp * 1.25);
                  showToast(`🎉 레벨업! Lv.${level}`);
                  }
                  return { ...p, exp, level, maxExp };
            });
      };

      useEffect(() => {
            const down = (e: KeyboardEvent) => {
                  keys.current[e.key.toLowerCase()] = true;

                  if (e.key.toLowerCase() === "f") {
                  const distToNpc = Math.abs(player.x - NPC.x);
                  if (distToNpc < 70 && !dialog.open) {
                        setDialog({ open: true, step: 0 });
                  }
                  }

                  if (e.key.toLowerCase() === "x" && !attackCooldown.current) {
                  attackCooldown.current = true;
                  setPlayer((p) => ({ ...p, isAttacking: true }));

                  setSlimes((prev) =>
                        prev.map((s) => {
                              if (!s.alive) return s;
                              const dist = s.x - player.x;
                              const facingRight = player.facing === 1 && dist > 0 && dist < 90;
                              const facingLeft = player.facing === -1 && dist < 0 && dist > -90;
                              if (facingRight || facingLeft) {
                              const nextHp = s.hp - 25;
                              if (nextHp <= 0) {
                                    showToast("슬라임을 처치했다! +10 EXP");
                                    grantExp(10);
                                    return { ...s, hp: 0, alive: false, respawnAt: Date.now() + 5000 };
                              }
                              return { ...s, hp: nextHp };
                              }
                              return s;
                        })
                  );

                  setTimeout(() => {
                        setPlayer((p) => ({ ...p, isAttacking: false }));
                        attackCooldown.current = false;
                  }, 320);
                  }
            };
            const up = (e: KeyboardEvent) => {
                  keys.current[e.key.toLowerCase()] = false;
            };
            window.addEventListener("keydown", down);
            window.addEventListener("keyup", up);
            return () => {
                  window.removeEventListener("keydown", down);
                  window.removeEventListener("keyup", up);
            };
      }, [player.x, player.facing, dialog.open]);

      useEffect(() => {
            let raf: number;

            const loop = () => {
                  setPlayer((p) => {
                  let { x, y, vy, facing } = p;

                  if (!dialog.open) {
                        if (keys.current["arrowleft"] || keys.current["a"]) {
                              x -= MOVE_SPEED;
                              facing = -1;
                        }
                        if (keys.current["arrowright"] || keys.current["d"]) {
                              x += MOVE_SPEED;
                              facing = 1;
                        }
                        if ((keys.current[" "] || keys.current["arrowup"] || keys.current["w"]) && y === 0) {
                              vy = JUMP_FORCE;
                        }
                  }

                  vy += GRAVITY;
                  y += vy;
                  if (y > 0) {
                        y = 0;
                        vy = 0;
                  }

                  x = Math.max(20, Math.min(WORLD_WIDTH - PLAYER_W - 20, x));

                  return { ...p, x, y, vy, facing };
                  });

                  setSlimes((prev) =>
                  prev.map((s) => {
                        if (!s.alive) {
                              if (s.respawnAt && Date.now() > s.respawnAt) {
                              return { ...s, alive: true, hp: s.maxHp, respawnAt: null };
                              }
                              return s;
                        }
                        let nx = s.x + s.dir * 1.2;
                        let dir = s.dir;
                        if (nx <= s.minX) dir = 1;
                        if (nx >= s.maxX) dir = -1;
                        nx = Math.max(s.minX, Math.min(s.maxX, nx));
                        return { ...s, x: nx, dir };
                  })
                  );

                  raf = requestAnimationFrame(loop);
            };

            raf = requestAnimationFrame(loop);
            return () => cancelAnimationFrame(raf);
      }, [dialog.open]);

      useEffect(() => {
            const interval = setInterval(() => {
                  slimes.forEach((s) => {
                  if (!s.alive) return;
                  const dist = Math.abs(s.x - player.x);
                  if (dist < 34) {
                        const now = Date.now();
                        const last = hitTimer.current[s.id] || 0;
                        if (now - last > 900) {
                              hitTimer.current[s.id] = now;
                              setPlayer((p) => ({ ...p, hp: Math.max(0, p.hp - 6) }));
                              showToast("슬라임에게 부딪혔다! -6 HP");
                        }
                  }
                  });
            }, 200);
            return () => clearInterval(interval);
      }, [slimes, player.x]);

      useEffect(() => {
            const dist = Math.abs(player.x - PORTAL.x);
            if (dist < 45) {
                  showToast("다음 지역은 아직 준비 중입니다 🌱");
            }
      }, [player.x]);

      const cameraX = Math.max(0, Math.min(WORLD_WIDTH - 986, player.x - 986 / 2));

      return (
            <div className={styles.pageWrap}>
                  <div className={styles.gameWindow}>
                  <div className={styles.sky} />

                  {/* 플레이 영역: HUD와 완전히 분리된 별도 레이어 */}
                  <div className={styles.playfield}>
                        <div className={styles.world} style={{ transform: `translateX(-${cameraX}px)` }}>
                              <div className={styles.ground} />

                              <div className={styles.portal} style={{ left: PORTAL.x }}>
                              <div className={styles.portalRing} />
                              <div className={styles.portalLabel}>다음 지역</div>
                              </div>

                              <div className={styles.npc} style={{ left: NPC.x }}>
                              <div className={styles.npcHead} />
                              <div className={styles.npcBody} />
                              <div className={styles.npcName}>{NPC.name}</div>
                              {Math.abs(player.x - NPC.x) < 70 && !dialog.open && (
                                    <div className={styles.interactHint}>F 눌러서 대화</div>
                              )}
                              </div>

                              {slimes.map((s) =>
                              s.alive ? (
                                    <div key={s.id} className={styles.slime} style={{ left: s.x }}>
                                          <div className={styles.slimeHpBarWrap}>
                                          <div
                                                className={styles.slimeHpBar}
                                                style={{ width: `${(s.hp / s.maxHp) * 100}%` }}
                                          />
                                          </div>
                                          <div className={styles.slimeBody} />
                                    </div>
                              ) : null
                              )}

                              <div
                              className={styles.player}
                              style={{
                                    left: player.x,
                                    bottom: GROUND_LEVEL - player.y,
                                    transform: `scaleX(${player.facing})`,
                              }}
                              >
                              <div className={styles.playerHead} style={{ background: skin }}>
                                    <span className={styles.playerFace}>{face}</span>
                                    <div className={styles.playerHair} style={{ background: hair }} />
                              </div>
                              <div
                                    className={`${styles.playerBody} ${
                                          player.isAttacking ? styles.playerAttacking : ""
                                    }`}
                              />
                              {player.isAttacking && <div className={styles.attackSlash} />}
                              </div>
                        </div>
                  </div>

                  {/* HUD: 플레이 영역 아래에 별도 고정 바 (겹치지 않음) */}
                  <div className={styles.hud}>
                        <div className={styles.hudLeft}>
                              <span className={styles.hudName}>{name}</span>
                              <span className={styles.hudLevel}>Lv.{player.level}</span>
                        </div>
                        <div className={styles.barGroup}>
                              <div className={styles.barRow}>
                              <span>HP</span>
                              <div className={styles.barTrack}>
                                    <div
                                          className={styles.hpFill}
                                          style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                                    />
                              </div>
                              </div>
                              <div className={styles.barRow}>
                              <span>MP</span>
                              <div className={styles.barTrack}>
                                    <div
                                          className={styles.mpFill}
                                          style={{ width: `${(player.mp / player.maxMp) * 100}%` }}
                                    />
                              </div>
                              </div>
                              <div className={styles.barRow}>
                              <span>EXP</span>
                              <div className={styles.barTrack}>
                                    <div
                                          className={styles.expFill}
                                          style={{ width: `${(player.exp / player.maxExp) * 100}%` }}
                                    />
                              </div>
                              </div>
                        </div>
                  </div>

                  {dialog.open && (
                        <div className={styles.dialogBox}>
                              <p className={styles.dialogName}>{NPC.name}</p>
                              <p className={styles.dialogText}>{NPC_LINES[dialog.step]}</p>
                              <button
                              className={styles.dialogNext}
                              onClick={() => {
                                    if (dialog.step < NPC_LINES.length - 1) {
                                          setDialog((d) => ({ ...d, step: d.step + 1 }));
                                    } else {
                                          setDialog({ open: false, step: 0 });
                                    }
                              }}
                              >
                              {dialog.step < NPC_LINES.length - 1 ? "다음 ▶" : "닫기"}
                              </button>
                        </div>
                  )}

                  {toast && <div className={styles.toast}>{toast}</div>}

                  <button className={styles.exitButton} onClick={() => router.push("/")}>
                        ✕
                  </button>
                  </div>

                  {/* 조작법 안내: 게임 창 바깥으로 이동 */}
                  <p className={styles.controlsHint}>← → 이동 · Space 점프 · X 공격 · F 대화</p>
            </div>
      );
}

export default function WorldPage() {
      return (
            <Suspense fallback={null}>
                  <WorldContent />
            </Suspense>
      );
}