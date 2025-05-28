/// <reference types="cypress"/>

describe('Edit devices', () => {

    const body_post = require('../fixtures/create_device.json')
    const body_put = require('../fixtures/update_device.json')


    it('Edit a device', () => {

        const currentDate = new Date().toISOString().slice(0, 16)

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_post
        }).as('postDeviceResult')

        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(body_post.name)
            expect(response_post.body.data.price).equal(body_post.data.price)


        cy.request({
            method: 'PUT',
            url: `/objects/${response_post.body.id}`,
            failOnStatusCode: false,
            body: body_put
        }).as('putDeviceResult')

        cy.get('@putDeviceResult').then((response_put) => {
            expect(response_put.status).equal(200)
            expect(response_put.body.name).equal(body_put.name)
            expect(response_put.body.data.price).equal(body_put.data.price)
            expect(response_put.body.updatedAt).not.empty
            expect(response_put.body.updatedAt.slice(0, 16))
        })

    })
})

})