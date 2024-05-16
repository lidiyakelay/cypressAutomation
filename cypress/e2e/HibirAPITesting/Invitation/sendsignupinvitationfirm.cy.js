import * as constants from "../../../constants.js";
import { faker } from '@faker-js/faker';

function getSessionValue(cookies, cookieName) {
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const cookieParts = cookie.split(';');
        for (let j = 0; j < cookieParts.length; j++) {
            const part = cookieParts[j].trim();
            if (part.startsWith(cookieName + '=')) {
                return part.substring(cookieName.length + 1);
            }
        }
    }
    return null;
}


//Testing sending signup invitation from firm 
describe('Testing ssending signup invitation from firm ', ()=>{
    const email=faker.internet.email()
    const requestBody1= 
    {
        username: "INSATest",
        password: "!QAZxsw2"
    }
    const requestBody2= 
    {
        email: email ,
     
    }
    const requestBody3= 
    {
        email: "test" ,
     
    }
    
    beforeEach('Login as firm admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody1
        
        }).then((response) => {
            cy.log(response.status)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
            // Log the session cookie value
            cy.log(sessionCookie);
            expect(response.status).to.eq(200);
        });
    }),
    it("Testing sending signup invitation from firm admin with valid email and authorization",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationfirm,
                failOnStatusCode: false,
                body:requestBody2
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(200)
         

        }

        )
    }
    ),
    it("Testing sending signup invitation from firm admin with existing email and authorized user",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationfirm,
                failOnStatusCode: false,
                body:requestBody2
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )
    it("Testing sending signup invitation from firm admin with invalid email and authorized user",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationfirm,
                failOnStatusCode: false,
                body:requestBody3
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )

})
//Testing sending signup invitation from firm with unauthorized user
describe('Testing sending signup invitation from firm with unauthorized user', ()=>{
    const email=faker.internet.email()
    const requestBody1= 
    {
        username: "INSAUser",
        password: "!QAZxsw2"
    }
    const requestBody2= 
    {
        email: email ,
     
    }
  
    
    beforeEach('Login as firm user', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody1
        
        }).then((response) => {
            cy.log(response.status)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
            // Log the session cookie value
            cy.log(sessionCookie);
            expect(response.status).to.eq(200);
        });
    })
    it("Testing sending signup invitation from firm user (unauthorized)",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationfirm,
                failOnStatusCode: false,
                body:requestBody2
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(403)
         

        }

        )
    }
    )
})
//
//
//Testing sending signup invitation without loging in
describe('Testing sending signup invitation without loging in', ()=>{
    const email=faker.internet.email()
  
    const requestBody2= 
    {
        email: email ,
     
    }
  
 
    it("Testing sending signup invitation without loging in",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationfirm,
                failOnStatusCode: false,
                body:requestBody2
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(401)
         

        }

        )
    }
    )
})