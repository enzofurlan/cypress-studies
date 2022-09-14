Cypress.Commands.add('createItem', item_name => {
    return cy
        .request({
            method: 'POST',
            url: '/items',
            body: {
                name: item_name,
            },
        })
        .then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('completed', false);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('name', item_name);
            return response;
        });
});

Cypress.Commands.add('markItem', (response, completed) => {
    cy.request({
        method: 'PUT',
        url: '/items/' + response.body.id,
        body: {
            completed: completed,
            name: response.body.name,
        },
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('completed', completed);
        expect(response.body).to.have.property('id', response.body.id);
        expect(response.body).to.have.property('name', response.body.name);
    });
});

Cypress.Commands.add('deleteItem', id => {
    cy.request({
        method: 'DELETE',
        url: '/items/' + id,
    }).then(response => {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add('getItems', () => {
    return cy
        .request({
            method: 'GET',
            url: '/items',
        })
        .then(response => {
            expect(response.status).to.eq(200);
            return response;
        });
});
