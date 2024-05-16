import { faker } from '@faker-js/faker';
import * as constants from "../../../../constants.js"

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

//Testing change firm status
describe('Testing change firm status', ()=>{
    let totalpage
    let orgID
    let authToken = null;
    let signupToken
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    const requestBody1= 
    {
        username: username,
        password: "!QAZxsw2"
    }
    const requestBody= 
        {
                    accesstype: "Firm",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
                    name: username,
                    phone: "251999880766"
        
        }
        const requestBody2= 
        {
            username: "Main",
            password: "!QAZxsw2"
        }
    before('Create organization as Firm', () => {
        
       
             cy.request({
            method: 'POST',
            url: constants.url + constants.createOrg,
            body: requestBody
        
        }).then((response) => {
            cy.log(useremail)
            expect(response.status).to.eq(200);
           

        });
    });
    
    beforeEach('Login as admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody2
        
        }).then((response) => {
            cy.log(response.status)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
            authToken=sessionCookie
            // Log the session cookie value
            cy.log(sessionCookie);
            expect(response.status).to.eq(200);
        });
    });
    it("Get the organization id",()=>{
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
                cy.request(
                    {
                        method: 'Get',
                        url: constants.url+constants.firmPage+"/"+i,
                        failOnStatusCode: false,
                    }
                ).then((response)=>{
                    expect(response.status).to.eq(200)
                    for(let j=0; j < 10; j++ ){
                        if(response.body.firms[j].email==useremail){
                            orgID=response.body.firms[j].id
                            cy.log(response.body.firms[j].id)
                            break
    
                            
                        }
                }})
    
    
                
              }
    
        }
    
        )
      
    
    })
   
    it("change firm status",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.changefirmstatus,
                failOnStatusCode: false,
                body: {
                    "orgID": orgID
 
                }
                ,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer'+ authToken
                }
            }
        ).then((response)=>{
             cy.log(response.body.token)
              signupToken= response.body.token
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )
    it("change firm status again for already active user",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.changefirmstatus,
                failOnStatusCode: false,
                body: {
                    "orgID": orgID
 
                }
                ,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer'+ authToken
                }
            }
        ).then((response)=>{
             cy.log(response.body.token)
              signupToken= response.body.token
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )
    it("change firm status with invalid user id",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.changefirmstatus,
                failOnStatusCode: false,
                body: {
                    "orgID": "489cdaa1-275b-4afb-8b52-f28c695069b2"
 
                }
                ,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer'+ authToken
                }
            }
        ).then((response)=>{
             cy.log(response.body.token)
              signupToken= response.body.token
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )

})
     