/// <reference types="cypress"/>

describe('Post devices', () => {

    const payload_create_device = require('../fixtures/create_device.json')

    it('Post a device', () => {

        const currentDate = new Date().toISOString().slice(0, 16)

    cy.postDevice(payload_create_device)
        .then((response) => {
            expect(response.status).equal(200)

            expect(response.body.id).not.empty

            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 16))

            expect(response.body.name).equal('Apple MacBook Pro 16')

            expect(response.body.data.year).equal(2019)

            expect(response.body.data.price).equal(1849.99)

            expect(response.body.data['CPU model']).not.empty
            
            expect(response.body.data['Hard disk size']).not.empty
        })

    })

    it('Post a device without body', () => {

    cy.postDevice('')
        .then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error)
            .equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })

    })
})