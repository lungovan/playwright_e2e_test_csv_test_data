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

    async verifyLogoVisibile() 
    {
        await expect(this.logoElement).toBeVisible();
    }

    async submit(email: string, last_name: string, first_name: string,
        referent_sources: any, services_interest: any,
        types_of_association: any, explaination: string) 
        {

        await this.emailInputElement.fill(email);
        await this.lastNameInputElement.fill(last_name);
        await this.firstNameInputElement.fill(first_name);

        await this.referentSourceDataInput(referent_sources);
        await this.serviceInterestDataInput(services_interest);
        await this.typeAssociationDataInput(types_of_association);

        await this.explainationInputElement.fill(explaination);
        await this.submitButtonElement.click();
    }

    async verifyMessageAfterSubmit(expected_text : string)
    {
        await expect(this.page.getByText(expected_text)).toBeVisible();
    }

    private async referentSourceDataInput(referent_sources)
    {
        if (referent_sources.toString().trim().length > 0) {
            await this.referentDropdownElement.click();
            await this.page.locator(`//div[contains(@class, 'ant-select-item-option-content') and text() = '${referent_sources}']`).click()
        }
    }

    private async serviceInterestDataInput(services_interest : string)
    {
        if (services_interest.toString().trim().length > 0) {
            let services_interest_list = services_interest.split(":");
            for (let i = 0; i < services_interest_list.length; i++) 
            {
                await this.page.getByText(services_interest_list[i]).click();
            }
        }
    }

    private async typeAssociationDataInput(type_of_association : string)
    {
        if (type_of_association.toString().trim().length > 0) {
            await this.page.getByText(type_of_association).click();
        }
    }
}