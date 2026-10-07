'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';

const leafImages = [
      '/images/lobby/ginkgo-03.png',
      '/images/lobby/leaf-01.png',
      '/images/lobby/leaf-02.png',
      '/images/lobby/leaf-03.png',
      '/images/lobby/leaf-04.png',
      '/images/lobby/leaf-05.png',
      '/images/lobby/leaf-06.png',
      '/images/lobby/leaf-08.png',
      '/images/lobby/leaf-10.png',
];

export default function LoginPage() {
      const router = useRouter();

      const [userId, setUserId] = useState('');
      const [password, setPassword] = useState('');
      const [autoLogin, setAutoLogin] = useState(false);

      // 브금
      const [musicPlaying, setMusicPlaying] = useState(true);
      const audioRef = useRef<HTMLAudioElement>(null);
      
      const toggleMusic = async () => {
            const audio = audioRef.current;
            if (!audio) return;
            if (musicPlaying) {
                  audio.pause();
                  setMusicPlaying(false);
                  return;
            }
            try {
                  await audio.play();
                  setMusicPlaying(true);
            } catch {
                  setMusicPlaying(false);
            }
      };

      useEffect(() => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.loop = true;
            audio.volume = 0.4;
            if (musicPlaying) {
                  void audio.play().catch(() => setMusicPlaying(false));
            } else {
                  audio.pause();
            }
      }, [musicPlaying]);
      useEffect(() => () => {
            audioRef.current?.pause();
      }, []);

      // 로그인 버튼 기능
      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            router.push('/character');
      };

      return (
            <main className={styles.page}>
                  <section className={styles.game}>
                        {/* 브금 재생 */}
                        <audio
                              ref={audioRef}
                              src="/audio/ginkgo-first-breeze.mp3"
                              loop
                              preload="auto"
                        />

                        <Image
                              src="/images/lobby/main-bg.png"
                              alt=""
                              fill
                              priority
                              className={styles.background}
                              sizes="100vw"
                        />

                        {/* 햇빛 + 나뭇잎 효과 */}
                        <div className={styles.sunLight} />
                        <div className={styles.leafField} aria-hidden="true">
                              {Array.from({ length: 16 }, (_, i) => (
                                    <Image
                                          key={i}
                                          src={leafImages[i % leafImages.length]}
                                          alt=""
                                          width={64}
                                          height={64}
                                          className={styles.leaf}
                                          style={{
                                                left: `${(i * 37 + 8) % 100}%`,
                                                width: `${16 + (i * 5) % 14}px`,
                                                height: 'auto',
                                                animationDelay: `${-(i * 1.73 % 20)}s`,
                                                animationDuration: `${17 + (i * 7) % 13}s`,
                                                '--leaf-drift': `${(i * 31) % 180 - 90}px`,
                                                '--leaf-drift-back': `${90 - (i * 19) % 180}px`,
                                                '--leaf-spin': `${180 + (i * 73) % 360}deg`,
                                          } as CSSProperties}
                                    />
                              ))}
                        </div>

                        <div className={styles.logoArea}>
                              <Image
                                    src="/images/lobby/logo.png"
                                    alt="Ginkgo Story"
                                    fill
                                    priority
                                    className={styles.containImage}
                                    sizes="28vw"
                              />
                        </div>

                        <div className={styles.subtitle}>
                              은행잎이 흩날리는 이야기 속으로..
                        </div>

                        <div className={styles.heroArea}>
                              <Image
                                    src="/images/lobby/main-character.png"
                                    alt=""
                                    fill
                                    priority
                                    className={styles.containImage}
                                    sizes="25vw"
                              />
                        </div>

                        <div className={styles.slimeArea}>
                              <Image
                                    src="/images/lobby/slime.png"
                                    alt=""
                                    fill
                                    priority
                                    className={styles.containImage}
                                    sizes="13vw"
                              />
                        </div>

                        <section className={styles.loginArea}> 
                              <Image
                                    src="/images/lobby/wood-frame.png"
                                    alt=""
                                    fill
                                    priority
                                    className={styles.frameImage}
                                    sizes="40vw"
                              />

                              <form
                                    className={styles.form}
                                    onSubmit={handleSubmit}
                              >
                                    <div className={styles.inputGroup}>
                                          <label className={styles.inputBox}>
                                                <span className={styles.inputIcon}>●</span>
                                                <input
                                                      type="text"
                                                      value={userId}
                                                      placeholder="아이디를 입력하세요."
                                                      autoComplete="username"
                                                      onChange={(event) =>
                                                            setUserId(event.target.value)
                                                      }
                                                />
                                          </label>

                                          <label className={styles.inputBox}>
                                                <span className={styles.passwordIcon}>◆</span>

                                                <input
                                                      type="password"
                                                      value={password}
                                                      placeholder="비밀번호를 입력하세요."
                                                      autoComplete="current-password"
                                                      onChange={(event) =>
                                                            setPassword(event.target.value)
                                                      }
                                                />
                                          </label>
                                    </div>

                                    <button
                                          type="submit"
                                          className={styles.loginButton}
                                    >
                                          <span className={styles.loginArrow}>
                                                ➜
                                          </span>

                                          <span>
                                                로그인
                                          </span>
                                    </button>

                                    <div className={styles.loginOptions}>
                                          <label className={styles.checkbox}>
                                                <input
                                                      type="checkbox"
                                                      checked={autoLogin}
                                                      onChange={(event) =>
                                                            setAutoLogin(
                                                                  event.target.checked,
                                                            )
                                                      }
                                                />
                                                <span>자동 로그인</span>
                                          </label>

                                          <div className={styles.links}>
                                                <button type="button">회원가입</button>
                                                <span>|</span>
                                                <button type="button">비밀번호 찾기</button>
                                          </div>
                                    </div>

                                    <div className={styles.divider}>
                                          <span />
                                          <p>만든 이의 이야기</p>
                                          <span />
                                    </div>

                                    <div className={styles.footerActions}>
                                          <a
                                                className={styles.developerButton}
                                                href="https://jstory-next.vercel.app/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                          >
                                                개발자 홈페이지
                                          </a>
                                          <button
                                                type="button"
                                                className={styles.exitButton}
                                                onClick={() => window.close()}
                                          >
                                                끝내기
                                          </button>
                                    </div>
                              </form>
                        </section>

                        {/* 배경음 버튼 */}
                        <button
                              type="button"
                              className={`${styles.musicButton} ${musicPlaying ? styles.musicPlaying : ''}`}
                              onClick={toggleMusic}
                              aria-label={musicPlaying ? '배경음악 끄기' : '배경음악 켜기'}
                              aria-pressed={musicPlaying}
                              title={musicPlaying ? '숲의 첫 바람 · 재생 중' : '숲의 첫 바람 · 배경음악 켜기'}
                        >
                              ♫
                        </button>

                        <div className={styles.version}>
                              GINKGO STORY v0.1
                        </div>
                  </section>

                  <section className={styles.rotate}>
                        <div className={styles.rotateIcon}>
                              ↻
                        </div>

                        <strong>
                              화면을 가로로 돌려주세요
                        </strong>

                        <p>
                              Ginkgo Story는 가로모드로 플레이합니다.
                        </p>
                  </section>
            </main>
      );
}