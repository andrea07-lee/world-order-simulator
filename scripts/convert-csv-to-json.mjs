// scripts/convert-csv-to-json.mjs
import fs from "fs";
import csv from "csvtojson";

// 사용법: node scripts/convert-csv-to-json.mjs input.csv output.json
const [,, inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("❗ 사용법: node scripts/convert-csv-to-json.mjs input.csv output.json");
  process.exit(1);
}

(async () => {
  try {
    const json = await csv({
      trim: true,
      ignoreEmpty: true,
      colParser: {
        year: "number"
        // 필요하면 여기에 숫자 컬럼 추가: Debt: "number", Unrest: "number", ...
      }
    }).fromFile(inputPath);

    const cleaned = json.map(row => {
      const out = {};
      for (const [k, v] of Object.entries(row)) {
        if (!k) continue;
        out[k.trim()] = typeof v === "string" ? v.trim() : v;
      }
      return out;
    });

    // 출력 폴더 보장
    fs.mkdirSync("src/data", { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2), "utf8");
    console.log(`✅ 변환 완료: ${outputPath} (총 ${cleaned.length}행)`);
  } catch (e) {
    console.error("변환 중 오류:", e);
    process.exit(1);
  }
})();
