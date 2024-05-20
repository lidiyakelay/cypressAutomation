import { faker } from "@faker-js/faker";
import * as constants from "../../../../constants.js";
import { signup, login, createUserInfo } from "../../../../const_functions/const_functions.cy";

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
//Testing get profile as a Clinet user that have creaated user info
describe('Testing get profile as a Clinet user that have creaated user info',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let userphone= faker.phone.imei()
    let usersignupToken
    let session;

    const requestBody1 = constants.clientAdmin
   
    const requestBody5={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number": userphone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
}
  
    const requestBody3 = {
        email: useremail,
       
    };
    const requestBody4= {
        username: username,
        password: "!QAZxsw2"
       
    };
    before('Login as client admin', () => {
        login(requestBody1).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
     
        before("sending signup invitation from client admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationclient,
                    failOnStatusCode: false,
                    body:requestBody3,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        }
        )
        it("Testing clinet signup",()=>{
            signup(usersignupToken,requestBody4).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
        it('Login as client', () => {
            login(requestBody4).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
              const cookies = response.headers['set-cookie'];
                 session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });
        it('Create user info for client user', () => {
    
            createUserInfo(requestBody5,session).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
              
            }) })
        it("Testing get profile as a Clinet user that have creaated user info",()=>{
                cy.request(
                    {
                        method: 'GET',
                        url: constants.url+constants.profile,
                        failOnStatusCode: false,
                        headers: {
                            'Cookie': 'session=' + session
                        }
                        
                    }
                ).then((response)=>{
                     cy.log(response.body)
                      expect(response.status).to.eq(200)
                }
        
                )
            }
            )
        

})





//
//
//
//
//
//
//
//Testing get profile as a Clinet user without created user info
describe('Testing get profile as a Clinet user without created user info',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let usersignupToken
    let session;

    const requestBody1 = constants.clientAdmin
   

  
    const requestBody3 = {
        email: useremail,
       
    };
    const requestBody4= {
        username: username,
        password: "!QAZxsw2"
       
    };

    before('Login as client admin', () => {
        login(requestBody1).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
     
        before("sending signup invitation from client admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationclient,
                    failOnStatusCode: false,
                    body:requestBody3,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        }
        )
        it("Testing clinet signup",()=>{
            signup(usersignupToken,requestBody4).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
        it('Login as client', () => {
            login(requestBody4).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
              const cookies = response.headers['set-cookie'];
                 session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });
         
        it("Testing get profile as a Clinet user without created user info",()=>{
                cy.request(
                    {
                        method: 'GET',
                        url: constants.url+constants.profile,
                        failOnStatusCode: false,
                        headers: {
                            'Cookie': 'session=' + session
                        }
                        
                    }
                ).then((response)=>{
                     cy.log(response.body)
                      expect(response.status).to.eq(200)
                }
        
                )
            }
            )
        

})

//
//
//
//
//
//
//
//Testing get profile as a Clinet user without loging in as the client user
describe('Testing get profile as a Clinet user without loging in as the client user',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let usersignupToken
    let session;

    const requestBody1 = constants.clientAdmin
   

  
    const requestBody3 = {
        email: useremail,
       
    };
    const requestBody4= {
        username: username,
        password: "!QAZxsw2"
       
    };

    before('Login as client admin', () => {
        login(requestBody1).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
     
        before("sending signup invitation from client admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationclient,
                    failOnStatusCode: false,
                    body:requestBody3,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        }
        )
        it("Testing clinet signup",()=>{
            signup(usersignupToken,requestBody4).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
  
         
        it("Testing get profile as a Clinet user without logginging in as a clinet user",()=>{
                cy.request(
                    {
                        method: 'GET',
                        url: constants.url+constants.profile,
                        failOnStatusCode: false,
                     
                        
                    }
                ).then((response)=>{
                     cy.log(response.body)
                      expect(response.status).to.eq(401)
                }
        
                )
            }
            )
        

})