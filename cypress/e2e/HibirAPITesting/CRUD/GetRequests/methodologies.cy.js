import * as constants from "../../../../constants.js";
import {login } from '../../../../const_functions/const_functions.cy.js'

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



//
//
//
// Testing get methodologies for main Admin
describe('Testing get methodologies for main Admin', ()=>{
    const requestBody= constants.mainAdmin
    
     beforeEach("Login as main", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it('Testing get methodologies for main Admin',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
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
// Testing get methodologies for firm Admin
describe('Testing get methodologies for firm Admin', ()=>{
    const requestBody= constants.firmAdmin
    
     beforeEach("Login as firm", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it('Testing get methodologies for firm Admin',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
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
// Testing get methodologies for client Admin
describe('Testing get methodologies for client Admin', ()=>{
    const requestBody= constants.clientAdmin
    
     beforeEach("Login as client", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it('Testing get methodologies for client Admin',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
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
// Testing get methodologies for client user
describe('Testing get methodologies for client user', ()=>{
    const requestBody= constants.clientUser
    
     beforeEach("Login as client user", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it('Testing get methodologies for client user',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
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
// Testing get methodologies for firm user
describe('Testing get methodologies for firm user', ()=>{
    const requestBody= constants.firmUser
    
     beforeEach("Login as firm user", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it('Testing get methodologies for firm user',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
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
// Testing get methodologies for main user
describe('Testing get methodologies for main user', ()=>{
    const requestBody= constants.firmUser
    
     beforeEach("Login as main user", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it('Testing get methodologies for main user',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
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
//'Testing get methodologies for without logging in
describe('Testing get methodologies for without logging in', ()=>{
    
    
     it('Testing get methodologies for unauthorized user',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.methodologies,
            failOnStatusCode: false,
         
        }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(401)
       
      }
  
      )


    })
 
 
 })