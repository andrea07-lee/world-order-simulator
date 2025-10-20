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
      corruption: '63 (CPI)', // 부패 인식지수
      externalThreat: '2.7% of GDP', // 군사 지출 비율
    },

    radarScores: {
      productivity: 53.3,
      trustInGov: 36,
      educationLevel: 87.4,
      ruleOfLaw: 73.2,
      diplomaticInfluence: 41.2,
      growthRate: 51.1,
      debtLevel: 27.3,
      civilUnrest: 80.9,
      corruption: 63,
      externalThreat: 34,
    },
  },

  'United States of America': {
    name: 'United States of America',
    name_kr: '미국',
    flag: 'https://flagcdn.com/w320/us.png',
    iso: 'USA',
    region: 'North America',
    capital: 'Washington D.C.',
    population: '3억 4,200만 명',
    area: '983만 3517 km²',
    language: 'English',
    religion: 'Christianity 64%, None 30%, Others 6%',
    summary:
      '세계 최대 경제대국으로서 높은 혁신성과 군사력을 보유하나, 정치적 양극화와 사회 불평등이 주요 과제임.',

    // 💸 경제 지표
    gdp: '27조 3,000억 USD',
    gdpPerCapita: '79,200 USD',
    growthRate: '2.5%',
    debtRatio: '122%',
    unemployment: '3.8%',
    productivity: '81.4 USD/hour',
    gini: '0.41',
    tradeVolume: '5조 9,000억 USD',
    tradeDependency: '26%',
    forexReserve: '2,400억 USD',
    exports: ['기계류', '항공기', '전자제품', '의약품', '석유제품'],

    // 🏛️ 정치/제도 지표
    governmentType: 'Federal republic, Democracy',
    trustInGov: 31,
    ruleOfLaw: 1.47,
    corruptionIndex: 69,
    politicalStability: 0.39,
    pressFreedom: 71.22,
    institutionalCapacity: 8.4,
    regimeStatus: 'stable democracy',

    // 🧨 사회/문화 지표
    unrestIndex: 2.37,
    protestFrequency: '12,000건/연',
    hdi: 0.926,
    educationSpending: '6.0% of GDP',
    avgYearsSchooling: '13.9년',
    citizenSatisfaction: 56,
    culturalDiversity: 0.73,
    agingRate: '17.2%',
    urbanizationRate: '83.6%',
    higherEdRate: '89%',

    // 🛡️ 외교/안보 지표
    diplomacyScore: 83.3,
    militarySpending: '3.4%',
    allies: ['NATO', 'Japan', 'South Korea', 'Australia', 'Israel', 'UK', 'EU'],
    alignment: 'global leadership (pro-democracy)',
    enemies: ['Russia', 'Iran', 'North Korea'],
    securityTreaties: ['NATO 조약', '한미상호방위조약', '미일안보조약'],
    armsExport: '720억 USD',
    armsImport: '16억 USD',
    nuclearStatus: 'Nuclear-armed',
    securityThreatLevel: 'Low',

    // 🌐 글로벌 시스템 지표
    globalCompetitiveness: 83.6,
    competitivenessRank: 2,
    innovationRank: 3,
    financialStability: 0.72,
    currencyShare: '58.9%',
    digitalInfra: 89.2,
    economicComplexityRank: 14,
    cyberCapability: 91,

    // 📊 시뮬레이션용 변수 점수
    currentScores: {
      productivity: '81.4 USD/hour',
      trustInGov: '31%',
      educationLevel: '0.926 (HDI)',
      ruleOfLaw: '+1.47 (–2.5~+2.5 scale)',
      diplomaticInfluence: '83.3 (Lowy Index)',
      growthRate: '2.5%',
      debtLevel: '122% of GDP',
      civilUnrest: '2.37 (GPI)',
      corruption: '69 (CPI)',
      externalThreat: '3.4% of GDP',
    },

    radarScores: {
      productivity: 81.4,
      trustInGov: 31,
      educationLevel: 84.6,
      ruleOfLaw: 79.2,
      diplomaticInfluence: 83.3,
      growthRate: 52.4,
      debtLevel: 21.5,
      civilUnrest: 74.2,
      corruption: 69,
      externalThreat: 37,
    },
  },

  'China': {
    name: 'China',
    name_kr: '중국',
    flag: 'https://flagcdn.com/w320/cn.png',
    iso: 'CHN',
    region: 'East Asia',
    capital: 'Beijing',
    population: '14억 1,600만 명',
    area: '959만 6960 km²',
    language: 'Mandarin Chinese',
    religion: 'Unaffiliated 52%, Buddhism 18%, Christianity 5%, Islam 2%, Others 23%',
    summary:
      '세계 2위 경제 대국으로 제조업과 수출 중심 구조를 유지하나, 부동산 침체와 청년실업, 부채 리스크가 주요 도전 과제로 지적됨.',


    // 💸 경제 지표
    gdp: '18조 7,400억 USD',
    gdpPerCapita: '13,121 USD',
    growthRate: '5.0%',
    debtRatio: '88.3%',
    unemployment: '5.1%',
    productivity: '38.5 USD/hour',
    gini: '0.473',
    tradeVolume: '6조 2,000억 USD',
    tradeDependency: '34%',
    forexReserve: '3조 2,380억 USD',
    exports: ['전자제품', '기계류', '의류', '화학제품', '철강'],


    // 🏛️ 정치/제도 지표
    governmentType: 'One-party socialist republic',
    trustInGov: 85,
    ruleOfLaw: -0.45,
    corruptionIndex: 42,
    politicalStability: -0.36,
    pressFreedom: 25.69,
    institutionalCapacity: 6.2,
    regimeStatus: 'authoritarian regime',


    // 🧨 사회/문화 지표
    unrestIndex: 1.938,
    protestFrequency: '3,000건/연',
    hdi: 0.788,
    educationSpending: '3.8% of GDP',
    avgYearsSchooling: '7.9년',
    citizenSatisfaction: 72,
    culturalDiversity: 0.21,
    agingRate: '15.7%',
    urbanizationRate: '65.4%',
    higherEdRate: '60%',


    // 🛡️ 외교/안보 지표
    diplomacyScore: 68.7,
    militarySpending: '1.7%',
    allies: ['Russia', 'Pakistan', 'Iran', 'Belarus'],
    alignment: 'authoritarian bloc, revisionist power',
    enemies: ['United States', 'Japan', 'India'],
    securityTreaties: ['중러 전략협력조약', '상하이협력기구(SCO)'],
    armsExport: '240억 USD',
    armsImport: '47억 USD',
    nuclearStatus: 'Nuclear-armed',
    securityThreatLevel: 'Medium',


    // 🌐 글로벌 시스템 지표
    globalCompetitiveness: 75.2,
    competitivenessRank: 20,
    innovationRank: 12,
    financialStability: 0.48,
    currencyShare: '2.5%',
    digitalInfra: 82.7,
    economicComplexityRank: 29,
    cyberCapability: 72,


    // 📊 시뮬레이션용 변수 점수
    currentScores: {
      productivity: '38.5 USD/hour',
      trustInGov: '85%',
      educationLevel: '0.788 (HDI)',
      ruleOfLaw: '-0.45 (–2.5~+2.5 scale)',
      diplomaticInfluence: '68.7 (Lowy Index)',
      growthRate: '5.0%',
      debtLevel: '88.3% of GDP',
      civilUnrest: '1.938 (GPI)',
      corruption: '42 (CPI)',
      externalThreat: '1.7% of GDP',
    },


    radarScores: {
      productivity: 38.5,
      trustInGov: 85,
      educationLevel: 69.4,
      ruleOfLaw: 44.7,
      diplomaticInfluence: 68.7,
      growthRate: 59.1,
      debtLevel: 33.8,
      civilUnrest: 82.6,
      corruption: 42,
      externalThreat: 21,
    },
  },

  'Russia': {
    name: 'Russia',
    name_kr: '러시아',
    flag: 'https://flagcdn.com/w320/ru.png',
    iso: 'RUS',
    region: 'Eastern Europe / Eurasia',
    capital: 'Moscow',
    population: '1억 4,700만 명',
    area: '1,709만 km²',
    language: 'Russian',
    religion: 'Orthodox Christianity 71%, Islam 10%, Others/None 19%',
    summary:
      '에너지 수출로 세계 4위 수준의 경제 규모를 유지하나, 서방 제재와 구조적 비효율, 인구 감소가 장기적인 도전 과제로 지적됨.',


    // 💸 경제 지표
    gdp: '2조 5,410억 USD',
    gdpPerCapita: '17,287 USD',
    growthRate: '4.1%',
    debtRatio: '18.4%',
    unemployment: '3.3%',
    productivity: '31.2 USD/hour',
    gini: '0.375',
    tradeVolume: '1조 1,200억 USD',
    tradeDependency: '54%',
    forexReserve: '5,780억 USD',
    exports: ['원유', '천연가스', '금속', '비료', '무기'],


    // 🏛️ 정치/제도 지표
    governmentType: 'Semi-presidential federation, authoritarian regime',
    trustInGov: 62,
    ruleOfLaw: -0.83,
    corruptionIndex: 35,
    politicalStability: -0.97,
    pressFreedom: 28.76,
    institutionalCapacity: 5.4,
    regimeStatus: 'authoritarian regime',


    // 🧨 사회/문화 지표
    unrestIndex: 2.36,
    protestFrequency: '1,500건/연',
    hdi: 0.824,
    educationSpending: '4.0% of GDP',
    avgYearsSchooling: '12.1년',
    citizenSatisfaction: 51,
    culturalDiversity: 0.38,
    agingRate: '16.6%',
    urbanizationRate: '74.9%',
    higherEdRate: '66%',


    // 🛡️ 외교/안보 지표
    diplomacyScore: 56.4,
    militarySpending: '5.6%',
    allies: ['China', 'Iran', 'Belarus', 'North Korea'],
    alignment: 'anti-Western bloc',
    enemies: ['Ukraine', 'United States', 'NATO', 'EU'],
    securityTreaties: ['CSTO', '중러 전략협력조약'],
    armsExport: '380억 USD',
    armsImport: '5억 USD',
    nuclearStatus: 'Nuclear-armed',
    securityThreatLevel: 'High',


    // 🌐 글로벌 시스템 지표
    globalCompetitiveness: 63.8,
    competitivenessRank: 45,
    innovationRank: 39,
    financialStability: 0.44,
    currencyShare: '0.3%',
    digitalInfra: 73.4,
    economicComplexityRank: 45,
    cyberCapability: 76,


    // 📊 시뮬레이션용 변수 점수
    currentScores: {
      productivity: '31.2 USD/hour',
      trustInGov: '62%',
      educationLevel: '0.824 (HDI)',
      ruleOfLaw: '-0.83 (–2.5~+2.5 scale)',
      diplomaticInfluence: '56.4 (Lowy Index)',
      growthRate: '4.1%',
      debtLevel: '18.4% of GDP',
      civilUnrest: '2.36 (GPI)',
      corruption: '35 (CPI)',
      externalThreat: '5.6% of GDP',
    },


    radarScores: {
      productivity: 31.2,
      trustInGov: 62,
      educationLevel: 73.4,
      ruleOfLaw: 38.6,
      diplomaticInfluence: 56.4,
      growthRate: 57.2,
      debtLevel: 88.2,
      civilUnrest: 72.5,
      corruption: 35,
      externalThreat: 63,
    },
  },

  'Japan': {
  name: 'Japan',
  name_kr: '일본',
  flag: 'https://flagcdn.com/w320/jp.png',
  iso: 'JPN',
  region: 'East Asia',
  capital: 'Tokyo',
  population: '1억 2,409만 명',
  area: '377,975 km²',
  language: 'Japanese',
  religion: 'Shinto 70%, Buddhism 69%, Christianity 1%, None 18%',
  summary:
    '세계 3위 경제대국으로 제조 및 기술 강국이지만, 저출산과 고령화, 내수 침체가 큰 과제임.',

  // 💸 경제 지표
  gdp: '4조 1,900억 USD',
  gdpPerCapita: '33,956 USD',
  growthRate: '1.3%',
  debtRatio: '236.7%',
  unemployment: '2.6%',
  productivity: '42.5 USD/hour',
  gini: '0.33',
  tradeVolume: '1조 5,000억 USD',
  tradeDependency: '17%',
  forexReserve: '1조 2,900억 USD',
  exports: ['자동차', '기계류', '전기기기', '철강', '화학제품'],

  // 🏛️ 정치/제도 지표
  governmentType: 'Constitutional monarchy, Parliamentary democracy',
  trustInGov: 40,
  ruleOfLaw: 1.62,
  corruptionIndex: 73,
  politicalStability: 0.50,
  pressFreedom: 82.11,
  institutionalCapacity: 7.8,
  regimeStatus: 'stable democracy',

  // 🧨 사회/문화 지표
  unrestIndex: 1.002,
  protestFrequency: '300건/연',
  hdi: 0.925,
  educationSpending: '3.5% of GDP',
  avgYearsSchooling: '11.2년',
  citizenSatisfaction: 60,
  culturalDiversity: 0.12,
  agingRate: '28.7%',
  urbanizationRate: '91.8%',
  higherEdRate: '58%',

  // 🛡️ 외교/안보 지표
  diplomacyScore: 57.9,
  militarySpending: '1.0%',
  allies: ['USA', 'Australia', 'India', 'United Kingdom'],
  alignment: 'pro-US, pacifist constitution',
  enemies: [],
  securityTreaties: ['미일안보조약', '쿼드(Quad) 협력'],
  armsExport: '10억 USD',
  armsImport: '90억 USD',
  nuclearStatus: 'Non-nuclear',
  securityThreatLevel: 'Low',

  // 🌐 글로벌 시스템 지표
  globalCompetitiveness: 75.9,
  competitivenessRank: 22,
  innovationRank: 15,
  financialStability: 0.68,
  currencyShare: '6.1%',
  digitalInfra: 85.3,
  economicComplexityRank: 25,
  cyberCapability: 84,

  // 📊 시뮬레이션용 변수 점수
  currentScores: {
    productivity: '42.5 USD/hour',
    trustInGov: '40%',
    educationLevel: '0.925 (HDI)',
    ruleOfLaw: '+1.62 (–2.5~+2.5 scale)',
    diplomaticInfluence: '57.9 (Lowy Index)',
    growthRate: '1.3%',
    debtLevel: '236.7% of GDP',
    civilUnrest: '1.002 (GPI)',
    corruption: '73 (CPI)',
    externalThreat: '1.0% of GDP',
  },

  radarScores: {
    productivity: 42.5,
    trustInGov: 40,
    educationLevel: 84.1,
    ruleOfLaw: 81.2,
    diplomaticInfluence: 57.9,
    growthRate: 33.1,
    debtLevel: 4.2,
    civilUnrest: 92.7,
    corruption: 73,
    externalThreat: 11,
  },
},

'United Kingdom': {
  name: 'United Kingdom',
  name_kr: '영국',
  flag: 'https://flagcdn.com/w320/gb.png',
  iso: 'GBR',
  region: 'Europe',
  capital: 'London',
  population: '6,830만 명',
  area: '242,495 km²',
  language: 'English',
  religion: 'Christianity 59%, None 25%, Islam 5%, Others 11%',
  summary:
    '세계 6위 경제 규모를 가진 선진국으로, 금융과 서비스 산업이 중심이며 브렉시트 이후 점진적 경제 회복과 구조 변화가 진행 중임.',

  // 💸 경제 지표
  gdp: '3조 6,438억 USD',
  gdpPerCapita: '53,365 USD',
  growthRate: '0.9%',
  debtRatio: '98.5%',
  unemployment: '4.0%',
  productivity: '46.8 USD/hour',
  gini: '0.35',
  tradeVolume: '2조 2,800억 USD',
  tradeDependency: '38%',
  forexReserve: '1,500억 USD',
  exports: ['금융 서비스', '기계류', '석유제품', '자동차', '화학제품'],

  // 🏛️ 정치/제도 지표
  governmentType: 'Constitutional monarchy, Parliamentary democracy',
  trustInGov: 30,
  ruleOfLaw: 1.35,
  corruptionIndex: 75,
  politicalStability: 0.25,
  pressFreedom: 75.65,
  institutionalCapacity: 7.5,
  regimeStatus: 'stable democracy',

  // 🧨 사회/문화 지표
  unrestIndex: 1.55,
  protestFrequency: '4,500건/연',
  hdi: 0.929,
  educationSpending: '5.5% of GDP',
  avgYearsSchooling: '13.3년',
  citizenSatisfaction: 50,
  culturalDiversity: 0.44,
  agingRate: '19.9%',
  urbanizationRate: '83.7%',
  higherEdRate: '62%',

  // 🛡️ 외교/안보 지표
  diplomacyScore: 70.2,
  militarySpending: '2.1%',
  allies: ['USA', 'NATO', 'Australia', 'Canada', 'EU'],
  alignment: 'Western alliance',
  enemies: [],
  securityTreaties: ['NATO 조약', 'ANZUS', 'Five Eyes'],
  armsExport: '130억 USD',
  armsImport: '10억 USD',
  nuclearStatus: 'Nuclear-armed',
  securityThreatLevel: 'Medium',

  // 🌐 글로벌 시스템 지표
  globalCompetitiveness: 78.4,
  competitivenessRank: 9,
  innovationRank: 13,
  financialStability: 0.64,
  currencyShare: '4.1%',
  digitalInfra: 88.7,
  economicComplexityRank: 16,
  cyberCapability: 83,

  // 📊 시뮬레이션용 변수 점수
  currentScores: {
    productivity: '46.8 USD/hour',
    trustInGov: '30%',
    educationLevel: '0.929 (HDI)',
    ruleOfLaw: '+1.35 (–2.5~+2.5 scale)',
    diplomaticInfluence: '70.2 (Lowy Index)',
    growthRate: '0.9%',
    debtLevel: '98.5% of GDP',
    civilUnrest: '1.55 (GPI)',
    corruption: '75 (CPI)',
    externalThreat: '2.1% of GDP',
  },

  radarScores: {
    productivity: 46.8,
    trustInGov: 30,
    educationLevel: 84.7,
    ruleOfLaw: 77,
    diplomaticInfluence: 70.2,
    growthRate: 28.9,
    debtLevel: 19.5,
    civilUnrest: 60.8,
    corruption: 75,
    externalThreat: 26,
  },
},


};

// ✅ 타입 정의 및 타입 안정화
export type CountryInfoType = typeof countryInfo['South Korea'];
export type CountryInfoMap = Record<string, CountryInfoType>;
export const typedCountryInfo: CountryInfoMap = countryInfo;
