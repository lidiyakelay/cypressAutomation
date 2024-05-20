import { faker } from "@faker-js/faker";
import * as constants from "../../../../constants.js";

// Function to extract cookie value based on cookie name
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
// Testing get organization users from admin  for main
describe(' Testing get organization users from admin  for main', () => {
    
    const requestBody1 = constants.mainAdmin

        before('Login as admin', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody1
            
            }).then((response) => {
                cy.log(response.status)
                // Extract the session cookie value from the headers
                const cookies = response.headers['set-cookie'];
                const sessionCookie = getSessionValue(cookies, 'session');
               // authToken=sessionCookie
                // Log the session cookie value
                cy.log(sessionCookie);
                expect(response.status).to.eq(200);
            });
        });
        it('Test get organization users from admin  for main with main admin',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
             
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(200)
           
          }
      
          )
    
    
        })
      
    })
//
//
//
//
//Test get organization users from admin  for main with main user
describe('Test get organization users from admin  for main with main user',()=> {
        const requestBody2 = constants.mainUser
        before('Login as Main user', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody2
            
            }).then((response) => {
                cy.log(response.status)
                // Extract the session cookie value from the headers
                const cookies = response.headers['set-cookie'];
                const sessionCookie = getSessionValue(cookies, 'session');
                //authToken=sessionCookie
                // Log the session cookie value
                cy.log(sessionCookie);
                expect(response.status).to.eq(200);
                cy.log(response.body)
            });
        });
        it('Test get organization users from admin  for main with main user',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
                
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(403)
           
          }
      
          )
    
    
        })
    })
//
//
//
//
//
// Testing get organization users from firm with firm admin
describe(' Testing get organization users from firm  with firm admin', () => {
    
    const requestBody1 = constants.firmAdmin
       

        before('Login as Firm admin', () => {
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
        });
        it('Test get organization users from firm   with firm admin',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
               
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(200)
           
          }
      
          )
    
    
        })
      
        
     
    })
//
//
//
//
//
// Testing get organization users from firm   with firm user
describe(' Testing get organization users from firm  with firm user', () => {
 
        const requestBody1 = constants.firmUser

        before('Login as Firm admin', () => {
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
        });
        it('Test get organization users from firm  with firm user',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
               
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(403)
           
          }
      
          )
    
    
        })
      
        
     
    })
    //
//
//
//
//
// Testing get organization users from client  with client admin
describe(' Testing get organization users from client  with client admin', () => {
    
    const requestBody1 = constants.clientAdmin
       

        before('Login as Firm admin', () => {
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
        });
        it('Testing get organization users from client with client admin',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
               
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(200)
           
          }
      
          )
    
    
        })
      
        
     
    })
//
//
//
//
// Testing get organization users from client  with client user
describe(' Testing get organization users from client  with client user', () => {
    
    const requestBody1 = constants.clientUser
       

        before('Login as Firm admin', () => {
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
        });
        it('Testing get organization users from client with client user',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
               
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(403)
           
          }
      
          )
    
    
        })
      
        
     
    })