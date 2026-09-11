"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import styles from "./page.module.css";

const SKIN_COLORS = ["#ffe0bd", "#f1c27d", "#e0ac69", "#c68642"];
const HAIR_COLORS = ["#3d2b1f", "#8b5a2b", "#e0a721", "#2c3e50", "#f1c40f"];
const FACES = ["😊", "😎", "🙂", "😐", "😏"];
const DEFAULT_STATS = { str: 4, dex: 4, int: 4, luk: 13 };

function rollStats() {
      const stats = [4, 4, 4, 4];
      stats[Math.floor(Math.random() * 4)] = 13;

      return { str: stats[0], dex: stats[1], int: stats[2], luk: stats[3] };
}

export default function CharacterCreatePage() {
      const router = useRouter();
      const [name, setName] = useState("");
      const [nameChecked, setNameChecked] = useState<null | boolean>(null);
      const [skinIndex, setSkinIndex] = useState(0);
      const [hairIndex, setHairIndex] = useState(0);
      const [faceIndex, setFaceIndex] = useState(0);
      const [stats, setStats] = useState(DEFAULT_STATS);

      useEffect(() => {
            setStats(rollStats());
      }, []);

      const cycle = (setter: (fn: (i: number) => number) => void, len: number, dir: 1 | -1) =>
            setter((i) => (i + dir + len) % len);

      // 은행잎 월드로 이동!
      const handleConfirm = () => {
            const params = new URLSearchParams({
                name,
                skin: SKIN_COLORS[skinIndex],
                hair: HAIR_COLORS[hairIndex],
                face: FACES[faceIndex],
            });
            router.push(`/world?${params.toString()}`);
      };

      return (
            <div className={styles.layout}>
                  <div className={styles.meshBg} />

                  <header className={styles.header}>
                        <button className={styles.backLink} onClick={() => router.push("/")}>
                              ← 캐릭터 만들기
                        </button>
                        <div className={styles.headerRight}>
                              <span className={styles.version}>Ver 1.0.0</span>
                              <span className={styles.ageBadge}>전체이용가</span>
                        </div>
                  </header>

                  <aside className={styles.sidebar}>
                        <Panel className={styles.infoBox}>
                              <p>선택캐릭터</p>
                              <p>월드</p>
                              <p>OK,2</p>
                        </Panel>
                        <Button variant="ghost" onClick={() => router.push("/")}>
                              처음으로
                        </Button>
                  </aside>

                  <section className={styles.stageArea}>
                        <div className={styles.character}>
                              <div className={styles.head} style={{ background: SKIN_COLORS[skinIndex] }}>
                                    <span>{FACES[faceIndex]}</span>
                                    <div className={styles.hair} style={{ background: HAIR_COLORS[hairIndex] }} />
                              </div>
                              <div className={styles.body} />
                              <div className={styles.floorGlow} />
                        </div>

                        <Panel className={styles.equipPanel}>
                              <div className={styles.equipRow}>
                                    <span>얼굴</span>
                                    <div className={styles.equipControl}>
                                    <button onClick={() => cycle(setFaceIndex, FACES.length, -1)}>‹</button>
                                    <span>{FACES[faceIndex]}</span>
                                    <button onClick={() => cycle(setFaceIndex, FACES.length, 1)}>›</button>
                                    </div>
                              </div>
                              <div className={styles.equipRow}>
                                    <span>헤어스타일</span>
                                    <div className={styles.equipControl}>
                                    <button onClick={() => cycle(setHairIndex, HAIR_COLORS.length, -1)}>‹</button>
                                    <span className={styles.swatch} style={{ background: HAIR_COLORS[hairIndex] }} />
                                    <button onClick={() => cycle(setHairIndex, HAIR_COLORS.length, 1)}>›</button>
                                    </div>
                              </div>
                              <div className={styles.equipRow}>
                                    <span>피부</span>
                                    <div className={styles.equipControl}>
                                    <button onClick={() => cycle(setSkinIndex, SKIN_COLORS.length, -1)}>‹</button>
                                    <span className={styles.swatch} style={{ background: SKIN_COLORS[skinIndex] }} />
                                    <button onClick={() => cycle(setSkinIndex, SKIN_COLORS.length, 1)}>›</button>
                                    </div>
                              </div>
                        </Panel>
                  </section>

                  <Panel className={styles.rightPanel}>
                        <div className={styles.nameRow}>
                              <input
                                    className={styles.nameInput}
                                    placeholder="캐릭터이름"
                                    value={name}
                                    maxLength={12}
                                    onChange={(e) => {
                                    setName(e.target.value);
                                    setNameChecked(null);
                                    }}
                              />
                              <button
                                    className={styles.checkButton}
                                    onClick={() => setNameChecked(name.trim().length >= 2)}
                              >
                                    확인
                              </button>
                        </div>
                        {nameChecked === true && <p className={styles.ok}>사용 가능한 이름입니다.</p>}
                        {nameChecked === false && <p className={styles.fail}>2글자 이상 입력해주세요.</p>}

                        <Button variant="ghost" onClick={() => setStats(rollStats())}>
                              🎲 능력치 다시 굴리기
                        </Button>

                        <div className={styles.statGrid}>
                              <div className={styles.statBox}><span>STR</span><b>{stats.str}</b></div>
                              <div className={styles.statBox}><span>DEX</span><b>{stats.dex}</b></div>
                              <div className={styles.statBox}><span>INT</span><b>{stats.int}</b></div>
                              <div className={styles.statBox}><span>LUK</span><b>{stats.luk}</b></div>
                        </div>

                        <div className={styles.confirmRow}>
                              <Button
                                    variant="primary"
                                    disabled={!nameChecked}
                                    onClick={handleConfirm}
                              >
                                    확인
                              </Button>
                              <Button variant="ghost" onClick={() => router.push("/")}>
                                    취소
                              </Button>
                        </div>
                  </Panel>
            </div>
      );
}