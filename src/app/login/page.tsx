'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';

export default function LoginPage() {
      const router = useRouter();

      const [userId, setUserId] = useState('');
      const [password, setPassword] = useState('');
      const [autoLogin, setAutoLogin] = useState(false);

      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            router.push('/character');
      };

      return (
            <main className={styles.page}>
                  <section className={styles.game}>
                        <Image
                              src="/images/lobby/main-bg.png"
                              alt=""
                              fill
                              priority
                              className={styles.background}
                              sizes="100vw"
                        />

                        <div className={styles.sunLight} />

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
                                          <p>간편 로그인</p>
                                          <span />
                                    </div>

                                    <div className={styles.social}>
                                          <button
                                                type="button"
                                                className={styles.google}
                                                aria-label="Google 로그인"
                                          >
                                                G
                                          </button>

                                          <button
                                                type="button"
                                                className={styles.kakao}
                                                aria-label="Kakao 로그인"
                                          >
                                                K
                                          </button>

                                          <button
                                                type="button"
                                                className={styles.naver}
                                                aria-label="Naver 로그인"
                                          >
                                                N
                                          </button>

                                          <button
                                                type="button"
                                                className={styles.apple}
                                                aria-label="Apple 로그인"
                                          >
                                                ●
                                          </button>
                                    </div>
                              </form>
                        </section>

                        <div className={styles.version}>
                              GINKGO STORY
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