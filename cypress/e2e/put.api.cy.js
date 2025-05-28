/// <reference types="cypress"/>

describe('Edit devices', () => {

    const body_post = require('../fixtures/create_device.json')
    const body_put = require('../fixtures/update_device.json')
    const id = response_post.body.id


    it('Edit a device', () => {

        const currentDate = new Date().toISOString().slice(0, 16)

        cy.postDevice(body_post)
        .then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(body_post.name)
            expect(response_post.body.data.price).equal(body_post.data.price)


        cy.putDevice(body_put, id)
        .then((response_put) => {
            expect(response_put.status).equal(200)
            expect(response_put.body.name).equal(body_put.name)
            expect(response_put.body.data.price).equal(body_put.data.price)
            expect(response_put.body.updatedAt).not.empty
            expect(response_put.body.updatedAt.slice(0, 16))
        })

    })
})

})