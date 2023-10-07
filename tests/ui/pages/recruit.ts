import { Locator, Page, expect } from "@playwright/test"

export class RecruitPage {
    static URL = "/recruit-qa-engineer-work-sample"
    page: Page;

    logoElement: Locator;
    emailInputElement: Locator;
    lastNameInputElement: Locator;
    firstNameInputElement: Locator;
    referentDropdownElement: Locator;
    referentDropdownContentElements: Locator[];
    serviceInterestCheckboxElements: Locator[];
    typeAssociationRadioElements: Locator[];
    explainationInputElement: Locator;
    submitButtonElement: Locator;
    submitSuccessfulTextElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoElement = page.locator("img.logo");
        this.emailInputElement = page.locator("#form_item_email");
        this.lastNameInputElement = page.locator("#form_item_lastName");
        this.firstNameInputElement = page.locator("#form_item_firstName");
        this.referentDropdownElement = page.locator("span.ant-select-selection-item");
        this.explainationInputElement = page.locator("#form_item_explanation");
        this.submitButtonElement = page.locator("button[type='submit']");
    }

    async submit(email: string, last_name: string, first_name: string,
        referent_source_index: any, service_interest_index: any[],
        type_of_association_index: any, explaination: string,
        expected_text: string) {

        await expect(this.logoElement).toBeVisible();
        await this.emailInputElement.fill(email);
        await this.lastNameInputElement.fill(last_name);
        await this.firstNameInputElement.fill(first_name);
        if (referent_source_index.toString().trim().length > 0) {
            await this.referentDropdownElement.click();
            this.referentDropdownContentElements = await this.page.locator("div.ant-select-item-option-content").all();
            await this.referentDropdownContentElements[referent_source_index].click();
        }
        if (service_interest_index.toString().trim().length > 0) {
            this.serviceInterestCheckboxElements = await this.page.locator("input.ant-checkbox-input").all();
            for (let i = 0; i < service_interest_index.length; i++) {
                await this.serviceInterestCheckboxElements[service_interest_index[i]].click();
            }
        }

        if (type_of_association_index.toString().trim().length > 0) {
            this.typeAssociationRadioElements = await this.page.locator("input.ant-radio-input").all();
            await this.typeAssociationRadioElements[type_of_association_index].click();
        }
        await this.explainationInputElement.fill(explaination);
        await this.submitButtonElement.click();
        await expect(this.page.getByText(expected_text)).toBeVisible();
    }

}