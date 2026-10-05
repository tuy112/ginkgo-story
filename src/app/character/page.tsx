'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
      JobId,
      tempJobs,
} from '@/lib/data/jobs';

import styles from './page.module.css';

type Gender = 'male' | 'female';

export default function CharacterCreatePage() {
      const router = useRouter();

      const [name, setName] = useState('');
      const [gender, setGender] = useState<Gender>('male');
      const [jobId, setJobId] = useState<JobId>('warrior');

      const selectedJob =
            tempJobs.find((job) => job.id === jobId) ??
            tempJobs[0];

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

                        <section className={styles.formPanel}>
                              <Image
                                    src="/images/lobby/wood-frame.png"
                                    alt=""
                                    fill
                                    priority
                                    className={styles.frame}
                                    sizes="52vw"
                              />

                              <div className={styles.formContent}>
                                    <h1>
                                          캐릭터 생성
                                    </h1>

                                    <div className={styles.sectionTitle}>
                                          <span>
                                                ◆
                                          </span>

                                          캐릭터 정보
                                    </div>

                                    <div className={styles.row}>
                                          <label htmlFor="characterName">
                                                캐릭터명
                                          </label>

                                          <div className={styles.nameInput}>
                                                <input
                                                      id="characterName"
                                                      type="text"
                                                      value={name}
                                                      maxLength={12}
                                                      placeholder="이름을 입력하세요. (2~12자)"
                                                      onChange={(event) =>
                                                            setName(event.target.value)
                                                      }
                                                />

                                                <span>
                                                      {name.length}/12
                                                </span>
                                          </div>
                                    </div>

                                    <div className={styles.row}>
                                          <label>
                                                성별
                                          </label>

                                          <div className={styles.gender}>
                                                <button
                                                      type="button"
                                                      className={
                                                            gender === 'male'
                                                                  ? styles.selectedGender
                                                                  : ''
                                                      }
                                                      onClick={() =>
                                                            setGender('male')
                                                      }
                                                >
                                                      <span className={styles.male}>
                                                            ♂
                                                      </span>

                                                      남자
                                                </button>

                                                <button
                                                      type="button"
                                                      className={
                                                            gender === 'female'
                                                                  ? styles.selectedGender
                                                                  : ''
                                                      }
                                                      onClick={() =>
                                                            setGender('female')
                                                      }
                                                >
                                                      <span className={styles.female}>
                                                            ♀
                                                      </span>

                                                      여자
                                                </button>
                                          </div>
                                    </div>

                                    <div className={styles.jobSection}>
                                          <label>
                                                직업
                                          </label>

                                          <div className={styles.jobs}>
                                                {tempJobs.map((job) => (
                                                      <button
                                                            key={job.id}
                                                            type="button"
                                                            className={`${styles.job} ${
                                                                  jobId === job.id
                                                                        ? styles.selectedJob
                                                                        : ''
                                                            }`}
                                                            onClick={() =>
                                                                  setJobId(job.id)
                                                            }
                                                      >
                                                            <span className={styles.jobImage}>
                                                                  <Image
                                                                        src={job.image}
                                                                        alt=""
                                                                        fill
                                                                        sizes="8vw"
                                                                  />
                                                            </span>

                                                            <strong>
                                                                  {job.name}
                                                            </strong>
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                                    <button
                                          type="button"
                                          className={styles.createButton}
                                    >
                                          <span>
                                                🍃
                                          </span>

                                          캐릭터 생성

                                          <span>
                                                🍃
                                          </span>
                                    </button>

                                    <button
                                          type="button"
                                          className={styles.backButton}
                                          onClick={() => router.push('/login')}
                                    >
                                          ← 이전으로
                                    </button>
                              </div>
                        </section>

                        <section className={styles.previewPanel}>
                              <Image
                                    src="/images/lobby/character-preview-frame.png"
                                    alt=""
                                    fill
                                    priority
                                    className={styles.frame}
                                    sizes="35vw"
                              />

                              <div className={styles.previewContent}>
                                    <div className={styles.previewCharacter}>
                                          <Image
                                                src={selectedJob.image}
                                                alt={selectedJob.name}
                                                fill
                                                priority
                                                className={styles.characterImage}
                                                sizes="20vw"
                                          />
                                    </div>

                                    <div className={styles.jobInfo}>
                                          <h2>
                                                ⚔ {selectedJob.name}
                                          </h2>

                                          <p>
                                                {selectedJob.description}
                                          </p>
                                    </div>

                                    <div className={styles.previewJobs}>
                                          {tempJobs.map((job) => (
                                                <button
                                                      key={job.id}
                                                      type="button"
                                                      className={
                                                            jobId === job.id
                                                                  ? styles.previewSelected
                                                                  : ''
                                                      }
                                                      onClick={() =>
                                                            setJobId(job.id)
                                                      }
                                                >
                                                      <Image
                                                            src={job.image}
                                                            alt={job.name}
                                                            fill
                                                            sizes="6vw"
                                                      />
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        </section>
                  </section>

                  <section className={styles.rotate}>
                        <div>
                              ↻
                        </div>

                        <strong>
                              화면을 가로로 돌려주세요
                        </strong>
                  </section>
            </main>
      );
}