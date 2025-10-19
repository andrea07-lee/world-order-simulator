// data/countryInfo.ts

export const countryInfo = {
  'South Korea': {
    name: 'South Korea',
    name_kr: '대한민국',
    flag: 'https://flagcdn.com/w320/kr.png',
    iso: 'KOR',
    region: 'East Asia',
    capital: 'Seoul',
    population: '5,174만 명',
    area: '10만 413 km²',
    language: 'Korean',
    religion: 'Christianity 31%, Buddhism 24%, None 46%',
    summary:
      '교육 수준은 높고 경제는 안정적이지만, 사회 갈등과 신뢰 문제 등 구조적 도전이 존재함.',

    // 💸 경제 지표
    gdp: '1조 7,200억 USD',
    gdpPerCapita: '33,745 USD',
    growthRate: '2.2%',
    debtRatio: '54.6%',
    unemployment: '2.8%',
    productivity: '53.3 USD/hour',
    gini: '0.34',
    tradeVolume: '1조 2,600억 USD',
    tradeDependency: '68.8%',
    forexReserve: '4,134억 USD',
    exports: ['반도체', '자동차', '석유화학', '기계류', '선박'],

    // 🏛️ 정치/제도 지표
    governmentType: 'Democracy',
    trustInGov: 36,
    ruleOfLaw: 1.08,
    corruptionIndex: 63,
    politicalStability: 0.34,
    pressFreedom: 68.55,
    institutionalCapacity: 7.1,
    regimeStatus: 'stable democracy',

    // 🧨 사회/문화 지표
    unrestIndex: 1.895,
    protestFrequency: '8,000건/연',
    hdi: 0.937,
    educationSpending: '4.7% of GDP',
    avgYearsSchooling: '12.5년',
    citizenSatisfaction: 45,
    culturalDiversity: 0.27,
    agingRate: '18.4%',
    urbanizationRate: '81.5%',
    higherEdRate: '73%',

    // 🛡️ 외교/안보 지표
    diplomacyScore: 41.2,
    militarySpending: '2.7%',
    allies: ['USA', 'Japan', 'Australia', 'EU'],
    alignment: 'pro-US',
    enemies: ['North Korea'],
    securityTreaties: ['한미상호방위조약', '한일 안보협력'],
    armsExport: '744억 USD',
    armsImport: '104억 USD',
    nuclearStatus: 'Non-nuclear',
    securityThreatLevel: 'Medium',

    // 🌐 글로벌 시스템 지표
    globalCompetitiveness: 79.6,
    competitivenessRank: 12,
    innovationRank: 10,
    financialStability: 0.6,
    currencyShare: '1.8%',
    digitalInfra: 91.3,
    economicComplexityRank: 4,
    cyberCapability: 78,

    // 📊 시뮬레이션용 변수 점수
    currentScores: {
      productivity: '53.3 USD/hour', // 생산성
      trustInGov: '36%', // 정부 신뢰도
      educationLevel: '0.937 (HDI)', // 교육 수준 (UN HDI 중 교육 요소)
      ruleOfLaw: '+1.08 (–2.5~+2.5 scale)', // 제도 안정성 (WGI 지수)
      diplomaticInfluence: '41.2 (Lowy Index)', // 외교 영향력 (Lowy Index 점수)
      growthRate: '2.2%', // 실질 GDP 성장률
      debtLevel: '54.6% of GDP', // 부채 비율
      civilUnrest: '1.895 (GPI)', // 사회 불안정도 (Global Peace Index)
      corruption: '63 (CPI)', // 부패 인식지수 (Corruption Perceptions Index)
      externalThreat: '2.7% of GDP', // 군사 지출 비율
    },

    radarScores: {
      productivity: 53.3,
      trustInGov: 36,
      educationLevel: 87.4, // 정규화된 값 추정
      ruleOfLaw: 73.2, // 정규화된 값 추정
      diplomaticInfluence: 41.2,
      growthRate: 51.1, // 정규화된 값 추정
      debtLevel: 27.3,
      civilUnrest: 80.9, // 정규화된 값 추정
      corruption: 63,
      externalThreat: 34,
    },
  },
};

// 타입 정의 및 타입 안정화
export type CountryInfoType = typeof countryInfo['South Korea'];
export type CountryInfoMap = Record<string, CountryInfoType>;
export const typedCountryInfo: CountryInfoMap = countryInfo;
