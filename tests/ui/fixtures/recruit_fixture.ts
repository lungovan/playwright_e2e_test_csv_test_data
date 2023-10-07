import { test as base } from "@playwright/test";
import { RecruitPage } from "../pages/recruit";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

type MyFixtures = {
  recruitPage: RecruitPage;
  recruitValidCases: any;
  recruitInValidCases: any;
}

export const test = base.extend<MyFixtures>({
  recruitPage: async ({ page }, use) => {
    await page.goto(RecruitPage.URL);
    const recruitPage = new RecruitPage(page);
    await use(recruitPage);
  },

});