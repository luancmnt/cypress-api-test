/// <reference types="cypress"/>

describe('Get devices', () => {

    // test 01

    it('Get specific device', () => {

        const device_id = '7'

        cy.getSpecificDevice(device_id)
            .then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).equal(device_id)
            expect(response.body.name).equal('Apple MacBook Pro 16')
            expect(response.body).not.empty

            expect(response.body.data.year).not.string
            expect(response.body.data.year).equal(2019)

            expect(response.body.data.price).not.string
            expect(response.body.data.price).equal(1849.99)
            
            expect(response.body.data['CPU model']).not.empty
            expect(response.body.data['Hard disk size']).not.empty

        })

    })
})