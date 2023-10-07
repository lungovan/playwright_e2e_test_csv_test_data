import { test } from '../fixtures/recruit_fixture';

import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";


const validCases = parse(
  fs.readFileSync(
    path.join(process.cwd(), "tests", "ui", "test_data", "valid_recruit.csv")
  ),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

const invalidCases = parse(
  fs.readFileSync(
    path.join(process.cwd(), "tests", "ui", "test_data", "invalid_recruit.csv")
  ),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

//let recruitPage : RecruitPage;
// test.beforeEach(async ({ page }) => {
//   await page.goto(RecruitPage.URL);
//   recruitPage = new RecruitPage(page);
// })

test.describe('Recruit Valid Submit Tests', () => {
  for (const testCase of validCases) {
    test(testCase.test_case, async ({ recruitPage }) => {
      let service_interest_index = testCase.service_interest_index.split(",");
      await recruitPage.submit(testCase.email, testCase.last_name, testCase.first_name,
        testCase.referent_source_index, service_interest_index,
        testCase.type_of_association_index, testCase.explaination,
        testCase.expected_text);
    })
  }
});

test.describe('Recruit InValid Submit Tests', () => {
  for (const testCase of invalidCases) {
    test(testCase.test_case, async ({ recruitPage }) => {
      let service_interest_index = testCase.service_interest_index.split(",");
      await recruitPage.submit(testCase.email, testCase.last_name, testCase.first_name,
        testCase.referent_source_index, service_interest_index, testCase.type_of_association_index,
        testCase.explaination, testCase.expected_text);
    })
  }
});
