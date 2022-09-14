import { faker } from '@faker-js/faker';

describe('1. API Tests', () => {
    it('1. Adds a new item', () => {
        let item_name = faker.lorem.words(3);
        cy.createItem(item_name);
    });

    it('2. Marks item as complete', () => {
        let item_name = faker.lorem.words(3);
        cy.createItem(item_name).then(response => {
            cy.markItem(response, true);
        });
    });

    it('3. Marks item as incomplete again', () => {
        let item_name = faker.lorem.words(3);
        cy.createItem(item_name).then(response => {
            cy.markItem(response, true);
            cy.markItem(response, false);
        });
    });

    it('4. Deletes an item', () => {
        let item_name = faker.lorem.words(3);
        cy.createItem(item_name).then(response => {
            cy.markItem(response, true);
            cy.deleteItem(response);
        });
    });

    it('5. Gets items list', () => {
        let item_name = faker.lorem.words(3);
        cy.createItem(item_name);
        cy.getItems();
    });

    it('6. Delete all items', () => {
        cy.getItems().then(response => {
            for (let i = 0; i < response.body.length; i++) {
                cy.deleteItem(response.body[i].id);
            }
        });
    });
});
