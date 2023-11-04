import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export const validCases = parse(
    fs.readFileSync(path.join(process.cwd(), "tests", "ui", "test_data", "valid_recruit.csv")),
    {
      columns: true,
      skip_empty_lines: true,
    }
  );
  
export const invalidCases = parse(
    fs.readFileSync(path.join(process.cwd(), "tests", "ui", "test_data", "invalid_recruit.csv")),
    {
      columns: true,
      skip_empty_lines: true,
    }
  );