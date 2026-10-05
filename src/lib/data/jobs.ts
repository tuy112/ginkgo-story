export type JobId =
      | 'warrior'
      | 'archer'
      | 'mage'
      | 'thief'
      | 'pirate';

export interface Job {
      id: JobId;
      name: string;
      description: string;
      image: string;
}

export const tempJobs: Job[] = [
      {
            id: 'warrior',
            name: '전사',
            description: '강한 체력과 힘을 바탕으로 근접 전투에 특화된 직업입니다.',
            image: '/images/lobby/warrior.png',
      },
      {
            id: 'archer',
            name: '궁수',
            description: '빠른 움직임과 정확한 활 공격으로 적을 제압합니다.',
            image: '/images/lobby/standing-archer.png',
      },
      {
            id: 'mage',
            name: '마법사',
            description: '신비로운 마법으로 적을 공격하고 동료를 지원합니다.',
            image: '/images/lobby/mage.png',
      },
      {
            id: 'thief',
            name: '도적',
            description: '빠른 움직임과 날카로운 공격으로 적의 빈틈을 노립니다.',
            image: '/images/lobby/thief.png',
      },
      {
            id: 'pirate',
            name: '해적',
            description: '총과 다양한 기술을 활용하는 자유로운 모험가입니다.',
            image: '/images/lobby/pirate.png',
      },
];