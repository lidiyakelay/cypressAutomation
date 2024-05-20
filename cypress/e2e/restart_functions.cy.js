import * as constants from "../constants.js";
import { faker } from '@faker-js/faker';
import { createOrg,login } from '../const_functions/const_functions.cy.js'



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

//Create Main Admin
describe('Create Main Admin ', ()=>{
    let session
    let name="INSA"
    let orgemail= faker.internet.email()
    let adminemail= faker.internet.email()
    let methodologyname = faker.internet.userName()

    let signupToken
   const requestBody3= {
        "code":1,
        "description": "loreum epsom",
        "name": methodologyname,
        "visibility": constants.publicVisibility
       
      }
    const requestBody1= constants.mainAdmin
    
    const requestBody= 
        {
                    accesstype: "Main",
                    address: "addis ababa",
                    description: "test test",
                    email: adminemail,
                    organization_email:'test@g.com',
                    name: name,
                    phone: "251999887766"
        
        }
    before('Create organization as Main', () => {
        
        createOrg(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            signupToken=response.body.token // Adjust the expected status code as needed
            cy.log(response.body);
    });})
 
  

    it("Testing Main signup",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              cy.log(response.body.error)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    it("Login as main", ()=>{
        login(requestBody1).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
        const cookies = response.headers['set-cookie'];
        session = getSessionValue(cookies, 'session');
        cy.setCookie('session', session);
        //const sessionCookie = getSessionValue(cookies, 'session');

        })
    })
    it("Testing create public methodologies for Main Admin ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody3,
                 headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    
})
//
//
//
//create main user
//Create firm User
describe('Create main User ', ()=>{
    let session
    let useremail= faker.internet.email()
    let signupToken
    const requestBody1= constants.mainUser
    const requestBody=  constants.mainAdmin
    let methodologyname = faker.internet.userName()

   const requestBody3= {
        "code":1,
        "description": "loreum epsom",
        "name": methodologyname,
        "visibility": constants.privateVisibility
       
      }
   

  
    before('Login as main admin', () => {
        login(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
 
    it("sending signup invitation from main admin with valid email and authorization",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationm,
                failOnStatusCode: false,
                body:{
                    email:useremail
                }
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
             signupToken=response.body.token
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )

    it("Testing main signup",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    it("Login as main user", ()=>{
        login(requestBody1).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
        const cookies = response.headers['set-cookie'];
        session = getSessionValue(cookies, 'session');
        cy.setCookie('session', session);
        //const sessionCookie = getSessionValue(cookies, 'session');

        })
    })
    it("Testing create public methodologies for main User ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody3,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    
})








//Create client Admin
describe('Create client Admin ', ()=>{
    let name='ArifPay'
    let adminemail= faker.internet.email()

    let orgemail= faker.internet.email()
    let signupToken
    const requestBody1= constants.clientAdmin
  
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: adminemail,
                    organization_email:orgemail,
                    name: name,
                    phone: "251999887766"
        
        }
    before('Create organization as client', () => {
        
        createOrg(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            signupToken=response.body.token // Adjust the expected status code as needed
            cy.log(response.body);
    });})
 
  

    it("Testing clinet signup",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              cy.log(response.body.error)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    
})
//Create client User
describe('Create client User ', ()=>{
    let session
    let useremail= faker.internet.email()
    let signupToken
    const requestBody1= constants.clientUser
   
    const requestBody= constants.clientAdmin
    

  
    before('Login as client admin', () => {
        login(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
 
    it("sending signup invitation from client admin with valid email and authorization",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationclient,
                failOnStatusCode: false,
                body:{
                    email:useremail
                }
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
             signupToken=response.body.token
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )

    it("Testing clinet signup",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              cy.log(response.body.error)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    
})

//
//
//create firm admin
describe('Signup as Firm', ()=>{
    let session
    let totalpage
    let orgID
    let signupToken
    let adminemail= faker.internet.email()
    let methodologyname = faker.internet.userName()

    let orgemail= faker.internet.email()

    let name= 'pentesting firm'
    const requestBody1= constants.firmAdmin
    const requestBody3= {
        "code":1 ,
        "description": "loreum epsom",
        "name": methodologyname,
        "visibility": constants.protectedVisibility
       
      }
      const requestBody4= {
        "code":1 ,
        "description": "loreum epsom",
        "name": faker.internet.userName(),
        "visibility": constants.protectedVisibility
       
      }
    const requestBody= 
        {
                    accesstype: "Firm",
                    address: "addis ababa",
                    description: "test test",
                    email: adminemail,
            organization_email:orgemail,
                    name: name,
                    phone: "251999880766"
        
        }
        const requestBody2= 
        {
            username: "Main",
            password: "!QAZxsw2"
        }
    //Testing create organization with firm
before("create organization functionality role Test Firm",()=>{
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(201);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
    
    before('Login as admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody2
        
        }).then((response) => {
            cy.log(response.status)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
         //   authToken=sessionCookie
            // Log the session cookie value
            cy.log(sessionCookie);
            expect(response.status).to.eq(200);
        });
    });
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
                body: requestBody1
            }
        ).then((response)=>{
              cy.log(response.body)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    it("Login as firm user", ()=>{
        login(requestBody1).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
        const cookies = response.headers['set-cookie'];
        
        session = getSessionValue(cookies, 'session');
        cy.setCookie('session', session);
        //const sessionCookie = getSessionValue(cookies, 'session');

        })
    })
    it("Testing create public methodologies for firm User ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody3,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    it("Testing create public methodologies for firm User ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody4,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    it("Testing create public methodologies for firm User ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody4,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    it("Testing create public methodologies for firm User ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody4,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )


})
     
//
//
//
//
//Create firm User
describe('Create firm User ', ()=>{
    let session
    let useremail= faker.internet.email()
    let signupToken
    const requestBody1= constants.firmUser
   
    const requestBody= constants.firmAdmin
   

  
    before('Login as firm admin', () => {
        login(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
 
    it("sending signup invitation from firm admin with valid email and authorization",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationfirm,
                failOnStatusCode: false,
                body:{
                    email:useremail
                }
                ,
                
            }
        ).then((response)=>{
             cy.log(response.body)
             signupToken=response.body.token
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )

    it("Testing firm signup",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    
})