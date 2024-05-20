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
//Testing sending multiple invitation from main admin
describe('Testing sending signup invitation from main admin', ()=>{
const requestBody=constants.mainAdmin
const requestBody1={
        emails: [
          faker.internet.email(),
          faker.internet.email(),
          faker.internet.email(),
        ]
      }

    beforeEach('Login as super admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody
        
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
    it('Testing sending signup invitation from main admin',()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendmultiplesignupinvitations,
                failOnStatusCode: false,
                body:requestBody1
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )
})
//Testing sending multiple invitation from client admin
describe('Testing sending signup invitation from client admin', ()=>{
    const requestBody=constants.clientAdmin
    const requestBody1={
            emails: [
              faker.internet.email(),
              faker.internet.email(),
              faker.internet.email(),
            ]
          }
    
        before('Login as client admin', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody
            
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
        it('Testing sending signup invitation from client admin',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
                    failOnStatusCode: false,
                    body:requestBody1
                    ,
                    
                }
            ).then((response)=>{
                 cy.log(response.body)
                  expect(response.status).to.eq(200)
             
    
            }
    
            )
        }
        )
    })//Testing sending multiple invitation from firm admin
    describe('Testing sending signup invitation from firm admin', ()=>{
        const requestBody=constants.firmAdmin
        const requestBody1={
                emails: [
                  faker.internet.email(),
                  faker.internet.email(),
                  faker.internet.email(),
                ]
              }
        
            before('Login as firm admin', () => {
                cy.request({
                    method: 'POST',
                    url: constants.url + constants.login,
                    body: requestBody
                
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
            it('Testing sending signup invitation from firm admin',()=>{
                cy.request(
                    {
                        method: 'Post',
                        url: constants.url+constants.sendmultiplesignupinvitations,
                        failOnStatusCode: false,
                        body:requestBody1
                        ,
                        
                    }
                ).then((response)=>{
                     cy.log(response.body)
                      expect(response.status).to.eq(200)
                 
        
                }
        
                )
            }
            )
        })
//Testing sending multiple invitation from main admin with invalid input data
describe('Testing sending signup invitation from main admin with invalid input data', ()=>{
    const requestBody=constants.mainAdmin
    const requestBody1={
            emails: []
          }
     const requestBody2={
            emails: ['yesty','']
          }
     const requestBody3={
        emails:['test@g.com','test@g.com']
     }
     const requestBody4={
        emails: [
          faker.internet.email(),
        ]
      }
    
        beforeEach('Login as super admin', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody
            
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
        it('Testing sending signup invitation from main admin with empty array',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
                    failOnStatusCode: false,
                    body:requestBody1
                    ,
                    
                }
            ).then((response)=>{
                 cy.log(response.body)
                  expect(response.status).to.eq(400)
             
    
            }
    
            )
        }
        )
        it('Testing sending signup invitation from main admin with invalid email',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
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
        it('Testing sending signup invitation from main admin with existing email',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
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
        it('Testing sending signup invitation from main admin with one email',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
                    failOnStatusCode: false,
                    body:requestBody4
                    ,
                    
                }
            ).then((response)=>{
                 cy.log(response.body)
                  expect(response.status).to.eq(200)
             
    
            }
    
            )
        }
        )
    })

//Testing sending multiple invitation from main user
describe('Testing sending signup invitation from main user', ()=>{
    const requestBody=constants.mainUser
    const requestBody1={
            emails: [
              faker.internet.email(),
              faker.internet.email(),
              faker.internet.email(),
            ]
          }
    
        beforeEach('Login as super admin', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody
            
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
        it('Testing sending signup invitation from main user',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
                    failOnStatusCode: false,
                    body:requestBody1
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
//Testing sending multiple invitation from client user
describe('Testing sending signup invitation from client user', ()=>{
    const requestBody=constants.clientUser
    const requestBody1={
            emails: [
              faker.internet.email(),
              faker.internet.email(),
              faker.internet.email(),
            ]
          }
    
        beforeEach('Login as super admin', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody
            
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
        it('Testing sending signup invitation from client user',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
                    failOnStatusCode: false,
                    body:requestBody1
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
//Testing sending multiple invitation from firm user
describe('Testing sending signup invitation from firm user', ()=>{
    const requestBody=constants.firmUser
    const requestBody1={
            emails: [
              faker.internet.email(),
              faker.internet.email(),
              faker.internet.email(),
            ]
          }
    
        beforeEach('Login as super admin', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody
            
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
        it('Testing sending signup invitation from firm user',()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendmultiplesignupinvitations,
                    failOnStatusCode: false,
                    body:requestBody1
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