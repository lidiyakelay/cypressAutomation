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

//Testing change organization status for main
describe('Testing change organization status for main ', ()=>{
    let userName=faker.internet.userName()
    let adminemail=faker.internet.email()
    let orgemail=faker.internet.email()
    let orgID
    let signupToken
    let session
    let totalpage
    let sessionII
   
    const requestBody1=constants.mainAdmin

    const requestBody2={
        username:faker.internet.userName(),
        password:"!QAZxsw2"
    }
    const requestBody3={
        accesstype: "Firm",
            address: "addis ababa",
            description: "test test",
            email: adminemail,
            organization_email:orgemail,
            name: userName,
            phone: "251911121314"
    }

 



    //Testing create organization with firm
    before("create organization functionality role Test Firm",()=>{
    createOrg(requestBody3).then((response) => {
        expect(response.status).to.eq(201);
     // Adjust the expected status code as needed
        cy.log(response.body);
    });


    })
    before("main admin login",()=>{
        login(requestBody1).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
              //  cy.setCookie('session', session);
    })})

    before("//Get the organization id",()=>{
        cy.request(
            {
                method: 'Get',
                url: constants.url+constants.firmPage+"/"+1,
                failOnStatusCode: false,
            }
        ).then((response)=>{
             
             
              expect(response.status).to.eq(200)
              totalpage= response.body.total_pages
              for(let i=1; i <= totalpage; i++ ) {
                cy.log(totalpage)
                cy.request(
                    {
                        method: 'Get',
                        url: constants.url+constants.firmPage+"/"+i,
                        failOnStatusCode: false,
                    }
                ).then((response)=>{
                    expect(response.status).to.eq(200)
                    for(let j=0; j<response.body.firms.length; j++ ){
                        cy.log(constants.url+constants.firmPage+"/"+i)
                        cy.log(response.body.firms.length)
                        cy.log(j)
                        cy.log(adminemail)
                        cy.log(response.body.firms[j].email)
                        if(response.body.firms[j].email==adminemail){
                            orgID=response.body.firms[j].id
                            cy.log(response.body.firms[j].id+"/////////////////////////////////////")
                            break
    
                            
                        }
                }})
    
    
                
              }
    
        }
    
        )
      
    
    })
    before("change firm status",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.changefirmstatus,
                failOnStatusCode: false,
                body: {
                    "orgID": orgID
 
                }
                ,
            
            }
        ).then((response)=>{
             cy.log(response.body.token)
              signupToken= response.body.token
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )
    it("Testing signup as firm",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody2
            }
        ).then((response)=>{
              cy.log(response.body)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    it('Login as firm admin', () => {
        login(requestBody2).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                sessionII = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
    
        it("Testing change organization status for organization with pending status",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.changestatusorg,
                    failOnStatusCode: false,
                    body:{
                        "status": "Pending",
                        "orgID": orgID},
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
        it('Login as firm admin', () => {
            login(requestBody2).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(response.body);
             
            })
            });
            it("Testing change organization status for organization with active status",()=>{
                cy.request(
                    {
                        method: 'Post',
                        url: constants.url+constants.changestatusorg,
                        failOnStatusCode: false,
                        body:{
                            "status": "Active",
                            "orgID": orgID},
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
            it('Login as firm admin', () => {
                login(requestBody2).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                 
                })
                });
                it("Testing change organization status for organization with suspended status",()=>{
                    cy.request(
                        {
                            method: 'Post',
                            url: constants.url+constants.changestatusorg,
                            failOnStatusCode: false,
                            body:{
                                "status": "Suspended",
                                "orgID": orgID},
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
                it('Login as firm admin', () => {
                    login(requestBody2).then((response) => {
                        expect(response.status).to.eq(400);
                        cy.log(response.body);
                     
                    })
                    });

}
) 


describe('Testing change organization status for main user', ()=>{
    let userName=faker.internet.userName()
    let adminemail=faker.internet.email()
    let orgemail=faker.internet.email()
    let orgID
    let signupToken
    let session
    let totalpage
    let sessionII
   
    const requestBody1=constants.mainUser

    const requestBody2={
        username:faker.internet.userName(),
        password:"!QAZxsw2"
    }
    const requestBody3={
        accesstype: "Firm",
            address: "addis ababa",
            description: "test test",
            email: adminemail,
            organization_email:orgemail,
            name: userName,
            phone: "251911121314"
    }

 



    //Testing create organization with firm
    before("create organization functionality role Test Firm",()=>{
    createOrg(requestBody3).then((response) => {
        expect(response.status).to.eq(201);
     // Adjust the expected status code as needed
        cy.log(response.body);
    });


    })
    before("main user login",()=>{
        login(requestBody1).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
              //  cy.setCookie('session', session);
    })})

    before("//Get the organization id",()=>{
        cy.request(
            {
                method: 'Get',
                url: constants.url+constants.firmPage+"/"+1,
                failOnStatusCode: false,
            }
        ).then((response)=>{
             
             
              expect(response.status).to.eq(200)
              totalpage= response.body.total_pages
              for(let i=1; i <= totalpage; i++ ) {
                cy.log(totalpage)
                cy.request(
                    {
                        method: 'Get',
                        url: constants.url+constants.firmPage+"/"+i,
                        failOnStatusCode: false,
                    }
                ).then((response)=>{
                    expect(response.status).to.eq(200)
                    for(let j=0; j<response.body.firms.length; j++ ){
                        cy.log(constants.url+constants.firmPage+"/"+i)
                        cy.log(response.body.firms.length)
                        cy.log(j)
                        cy.log(adminemail)
                        cy.log(response.body.firms[j].email)
                        if(response.body.firms[j].email==adminemail){
                            orgID=response.body.firms[j].id
                            cy.log(response.body.firms[j].id+"/////////////////////////////////////")
                            break
    
                            
                        }
                }})
    
    
                
              }
    
        }
    
        )
      
    
    })
    before("change firm status",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.changefirmstatus,
                failOnStatusCode: false,
                body: {
                    "orgID": orgID
 
                }
                ,
            
            }
        ).then((response)=>{
             cy.log(response.body.token)
              signupToken= response.body.token
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )
    it("Testing signup as firm",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody2
            }
        ).then((response)=>{
              cy.log(response.body)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    it('Login as firm admin', () => {
        login(requestBody2).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                sessionII = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
    
        it("Testing change organization status for organization with pending status",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.changestatusorg,
                    failOnStatusCode: false,
                    body:{
                        "status": "Pending",
                        "orgID": orgID},
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
        it('Login as firm admin', () => {
            login(requestBody2).then((response) => {
                expect(response.status).to.eq(400);
                cy.log(response.body);
             
            })
            });
            it("Testing change organization status for organization with active status",()=>{
                cy.request(
                    {
                        method: 'Post',
                        url: constants.url+constants.changestatusorg,
                        failOnStatusCode: false,
                        body:{
                            "status": "Active",
                            "orgID": orgID},
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
            it('Login as firm admin', () => {
                login(requestBody2).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                 
                })
                });
                it("Testing change organization status for organization with suspended status",()=>{
                    cy.request(
                        {
                            method: 'Post',
                            url: constants.url+constants.changestatusorg,
                            failOnStatusCode: false,
                            body:{
                                "status": "Suspended",
                                "orgID": orgID},
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
                it('Login as firm admin', () => {
                    login(requestBody2).then((response) => {
                        expect(response.status).to.eq(400);
                        cy.log(response.body);
                     
                    })
                    });

}
) 








////