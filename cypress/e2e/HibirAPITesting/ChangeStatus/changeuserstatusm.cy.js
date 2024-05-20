import { faker } from '@faker-js/faker';
import * as constants from "../../../constants.js"
import { createOrg, login, signup, createUserInfo, changeFirmStatus } from '../../../const_functions/const_functions.cy.js'

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

//Testing change user status for main
describe('Testing change user status for main ', ()=>{
    let userName=faker.internet.userName()
    let userEmail=faker.internet.email()
    let userId
    let usersignupToken
    let session
    let sessionII
   
    const requestBody1=constants.mainAdmin

    const requestBody2={
        email:userEmail
    }
    const requestBody3={
        username:userName,
        password:"!QAZxsw2"
    }

 



    before("main admin login",()=>{
        login(requestBody1).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
              //  cy.setCookie('session', session);
    })})

    it("sending signup invitation from main admin with valid email and authorization",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationm,
                failOnStatusCode: false,
                body:requestBody2,
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
    })
    it("main user sign up",()=>{
        signup(usersignupToken,requestBody3).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
        })})

    it("main user login",()=>{
        login(requestBody3).then((response)=>{
            expect(response.status).to.eq(200);
            cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    sessionII = getSessionValue(cookies, 'session');
                    //cy.setCookie('session', session);
        })})
        it('Test get organization users from main admin',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.organizationUsers,
                failOnStatusCode: false,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }).then((response)=>{
                cy.log(response.body[0].id)
                expect(response.status).to.eq(200)
                userId=response.body[0].id
                cy.log(userId)
           
          }
          )   })
          it("Testing change user status for main with pending status",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.changeuserstatusm,
                    failOnStatusCode: false,
                    body:{
                        "status": "Pending",
                        "userID": userId},
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body)
                  expect(response.status).to.eq(200)
            }
    
            )
        })
        it("main user login",()=>{
            login(requestBody3).then((response)=>{
                expect(response.status).to.eq(400);
                cy.log(response.body);
            })})
            it("Testing change user status for main with Active status",()=>{
                cy.request(
                    {
                        method: 'Post',
                        url: constants.url+constants.changeuserstatusm,
                        failOnStatusCode: false,
                        body:{
                            "status": "Active",
                            "userID": userId},
                        headers: {
                            'Cookie': 'session=' + session
                        }
                        
                    }
                ).then((response)=>{
                     cy.log(response.body)
                      expect(response.status).to.eq(200)
                }
        
                )
            })
            it("main user login",()=>{
                login(requestBody3).then((response)=>{
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                })})
                it("Testing change user status for main with suspended status",()=>{
                    cy.request(
                        {
                            method: 'Post',
                            url: constants.url+constants.changeuserstatusm,
                            failOnStatusCode: false,
                            body:{
                                "status": "Suspended",
                                "userID": userId},
                            headers: {
                                'Cookie': 'session=' + session
                            }
                            
                        }
                    ).then((response)=>{
                         cy.log(response.body)
                          expect(response.status).to.eq(200)
                    }
            
                    )
                })
                
                    it("changing user status for main to active status",()=>{
                        cy.request(
                            {
                                method: 'Post',
                                url: constants.url+constants.changeuserstatusm,
                                failOnStatusCode: false,
                                body:{
                                    "status": "Active",
                                    "userID": userId},
                                headers: {
                                    'Cookie': 'session=' + session
                                }
                                
                            }
                        ).then((response)=>{
                             cy.log(response.body)
                              expect(response.status).to.eq(200)
                        }
                
                        )
                    })
                    it("main user login to test activation",()=>{
                        login(requestBody3).then((response)=>{
                            expect(response.status).to.eq(200);
                            cy.log(response.body);
                            cy.log(response.body);
                            const cookies = response.headers['set-cookie'];
                            sessionII = getSessionValue(cookies, 'session');
                        })})
                    it("Testing change user status for main with pending status",()=>{
                            cy.request(
                                {
                                    method: 'Post',
                                    url: constants.url+constants.changeuserstatusm,
                                    failOnStatusCode: false,
                                    body:{
                                        "status": "Pending",
                                        "userID": userId},
                                    headers: {
                                        'Cookie': 'session=' + sessionII
                                    }
                                    
                                }
                            ).then((response)=>{
                                 cy.log(response.body)
                                  expect(response.status).to.eq(403)
                            }
                    
                            )
                        })
                     it("Testing change user status for main with active status",()=>{
                                    cy.request(
                                        {
                                            method: 'Post',
                                            url: constants.url+constants.changeuserstatusm,
                                            failOnStatusCode: false,
                                            body:{
                                                "status": "active",
                                                "userID": userId},
                                            headers: {
                                                'Cookie': 'session=' + sessionII
                                            }
                                            
                                        }
                                    ).then((response)=>{
                                         cy.log(response.body)
                                          expect(response.status).to.eq(403)
                                    }
                            
                                    )
                                })
                    it("Testing change user status for main with suspended status",()=>{
                                    cy.request(
                                        {
                                            method: 'Post',
                                            url: constants.url+constants.changeuserstatusm,
                                            failOnStatusCode: false,
                                            body:{
                                                "status": "Suspended",
                                                "userID": userId},
                                            headers: {
                                                'Cookie': 'session=' + sessionII
                                            }
                                            
                                        }
                                    ).then((response)=>{
                                         cy.log(response.body)
                                          expect(response.status).to.eq(403)
                                    }
                            
                                    )
                                })
            

}
) 
