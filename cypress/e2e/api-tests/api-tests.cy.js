import { faker } from '@faker-js/faker';
const errorMsg = 'Failed to load... try again later.';

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
        cy.getItems().then(response => {
            for (let i = 0; i < response.body.length; i++) {
                cy.deleteItem(response.body[i].id);
            }
        });
        cy.visit('/');
        cy.contains('You have no todo items yet! Add one above!').should(
            'be.visible',
        );

        let item_name = faker.lorem.words(3);
        cy.createItem(item_name);
        cy.getItems();

        cy.visit('/');
        cy.contains(item_name).should('be.visible');
    });

    it('6. Delete all items', () => {
        cy.getItems().then(response => {
            for (let i = 0; i < response.body.length; i++) {
                cy.deleteItem(response.body[i].id);
            }
        });
        cy.visit('/');
        cy.contains('You have no todo items yet! Add one above!').should(
            'be.visible',
        );
    });

    it('7. Checks a network error', () => {
        cy.intercept('GET', '**/items', { forceNetworkError: true }).as(
            'getNetworkFailure',
        );
        cy.visit('/');
        cy.wait('@getNetworkFailure');
        cy.contains(errorMsg).should('be.visible');
    });

    it('8. Checks a server error', () => {
        cy.intercept('GET', '**/items', { statusCode: 500 }).as(
            'getServerFailure',
        );
        cy.visit('/');
        cy.wait('@getServerFailure');
        cy.contains(errorMsg).should('be.visible');
    });

    it('9. Checks a delayed response', () => {
        cy.intercept('GET', '**/items', {
            delay: 1000,
        }).as('getDelayedItems');
        cy.visit('/');

        cy.wait('@getDelayedItems');
        cy.contains(errorMsg).should('be.visible');
    });
});
