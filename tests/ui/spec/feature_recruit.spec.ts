import { expect } from '@playwright/test';
import { test } from '../fixtures/recruit_fixture';
import { invalidCases, validCases } from '../../utils/test_data_reader';

test.describe('Recruit Valid Submit Tests', () => {
  for (const testCase of validCases) {
    test(testCase.test_case, async ({ recruitPage }) => {

      await recruitPage.verifyLogoVisibile();

      await recruitPage.submit(testCase.email, testCase.last_name, testCase.first_name,
                              testCase.referent_source, testCase.service_interest,
                              testCase.type_of_association, testCase.explaination);
      
      await recruitPage.verifyMessageAfterSubmit(testCase.expected_text);
    })
  }
});

test.describe('Recruit Invalid Submit Tests', () => {
  for (const testCase of invalidCases) {
    test(testCase.test_case, async ({ recruitPage }) => {

      await recruitPage.verifyLogoVisibile();

      await recruitPage.submit(testCase.email, testCase.last_name, testCase.first_name,
                               testCase.referent_source, testCase.service_interest, 
                               testCase.type_of_association, testCase.explaination);

      await recruitPage.verifyMessageAfterSubmit(testCase.expected_text);
    })
  }
});
