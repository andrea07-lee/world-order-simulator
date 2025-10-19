// src/data/types.ts
export type CanonicalIndicators = {
    iso3: string;          // "Country Code" 매핑
    country: string;       // "Country Name" 매핑
    year?: number;         // "year" 또는 "Year" 있으면 매핑
  
    // 네 CSV에 실제 있는 지표들(예시: 스크린샷에 보인 필드들)
    population_total?: number;
    gdp_ppp_current_intl?: number;       // gdp_ppp_current_intl$ -> 숫자화
    trade_pct_gdp?: number;
    military_expenditure_pct_gdp?: number;
    democracy_index?: number;
    co2_tonnes_per_capita?: number;
    hdi?: number;
    // 필요하면 더 추가
  };
  
  // 지도/슬라이더에서 쓸 키 목록
  export type FilterKey =
    | "democracy_index"
    | "trade_pct_gdp"
    | "gdp_ppp_current_intl"
    | "military_expenditure_pct_gdp"
    | "population_total"
      "co2_tonnes_per_capita"
      "hdi" ;
      
// types.ts
export type AdjustmentType = {
  trustInGov: number;
  civilUnrest: number;
  debtLevel: number;
};
