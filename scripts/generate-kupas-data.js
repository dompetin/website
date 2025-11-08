import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Read CSV file
const csvPath = resolve(process.cwd(), "data.csv");
const csvContent = readFileSync(csvPath, "utf-8");
const lines = csvContent.split("\n").filter((line) => line.trim());

// Find header row (line with sector names)
let headerRowIndex = -1;
const headerRow = [];

for (let i = 0; i < lines.length; i++) {
  const cells = lines[i].split(",");
  if (cells.some((cell) => cell.includes("Healthcare"))) {
    headerRowIndex = i;
    for (let j = 2; j < cells.length; j++) {
      headerRow.push(cells[j].trim());
    }
    break;
  }
}

if (headerRowIndex === -1) {
  console.error("Could not find header row");
  process.exit(1);
}

// Parse data rows
const data = [];
for (let i = headerRowIndex + 1; i < lines.length; i++) {
  const cells = lines[i].split(",").map((c) => c.trim());
  const date = cells[1];

  if (!date || date === "") continue;

  const row = {
    date,
    sectors: {},
  };

  for (let j = 2; j < cells.length; j++) {
    const sectorName = headerRow[j - 2];
    const value = cells[j];

    if (sectorName && value) {
      const numValue = parseFloat(value.replace("%", ""));
      row.sectors[sectorName] = numValue;
    }
  }

  if (Object.keys(row.sectors).length > 0) {
    data.push(row);
  }
}

// Generate TypeScript constant
const output = `// Auto-generated from data.csv
export const KUPAS_DATA = ${JSON.stringify(data, null, 2)};

export type KupasDataPoint = {
  date: string;
  sectors: Record<string, number>;
};
`;

// Write output file
const outputPath = resolve(process.cwd(), "lib/kupas-data.ts");
writeFileSync(outputPath, output);

console.log(`✓ Generated kupas data: ${outputPath}`);
console.log(`  ${data.length} data points parsed`);
