// otherSpec.cy.js
import { faker } from '@faker-js/faker';
import { createOrg, login, signup} from '../../const_functions/const_functions.cy.js';

describe('Other spec file', () => {
    let useremail = faker.internet.email();
    let username = faker.internet.userName();
    let orgemail = faker.internet.email();
    let signupToken
    const requestBody1 = {
        accesstype: "Client",
        address: "addis ababa",
        description: "test test",
        email:useremail,
        organization_email:orgemail,
        name: username,
        phone: "1234567890"
    };
    const requestBody2={
        username:username,
        password:"!QAZxsw2"
    }
    before('Test creating organization', () => {
        createOrg(requestBody1).then((response) => {
            expect(response.status).to.eq(200);
            signupToken=response.body.token // Adjust the expected status code as needed
            cy.log(response.body);
        });
    });
    it('Test creating organization', () => {
        signup(signupToken,requestBody2).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
        });
    });
});
