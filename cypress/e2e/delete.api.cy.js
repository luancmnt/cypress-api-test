/// <reference types="cypress"/>

describe('Delete devices', () => {

    const payload_create_device = require('../fixtures/create_device.json')


    it('Delete a device', () => {

         cy.postDevice(payload_create_device)
            .then((response_post) => {
            expect(response_post.status).equal(200) 
        

        cy.request({
            method: 'DELETE',
            url: `/objects/${response_post.body.id}`,
            failOnStatusCode: false
        }).as('deleteDeviceResult')

        cy.get('@deleteDeviceResult').then((response_delete) => {
            expect(response_delete.status).equal(200)
            expect(response_delete.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
        })

    })
})

    it('Delete a non-existent device', () => { 

        const device_id = 'luana'

        cy.request({
        method: 'DELETE',
        url: `/objects/${device_id}`,
        failOnStatusCode: false
     }).as('deleteNonExistentDeviceResult')

        cy.get('@deleteNonExistentDeviceResult').then((response_nonexistent) => {
        expect(response_nonexistent.status).equal(404)
        expect(response_nonexistent.body.error).equal(`Object with id = ${device_id} doesn't exist.`)
    })
})

    it('Delete a reserved device', () => { 

    const device_id = '7'

    cy.request({
    method: 'DELETE',
    url: `/objects/${device_id}`,
    failOnStatusCode: false
 }).as('deleteReservedDeviceResult')

    cy.get('@deleteReservedDeviceResult').then((response_reserved) => {
    expect(response_reserved.status).equal(405)
    expect(response_reserved.body.error)
    .equal(`${device_id} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)
})
})

})