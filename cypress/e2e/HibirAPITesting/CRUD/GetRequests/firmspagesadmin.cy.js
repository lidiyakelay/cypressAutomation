import { he } from "@faker-js/faker";
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

// Testing accessing firm pages as super admin
describe('Accessing firm pages as super admin', () => {
    
    const requestBody1 = {
        username: "Main",
        password: "!QAZxsw2"
    };
 
    let authToken = null;

    before('Login as super admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody1
        
        }).then((response) => {
            cy.log(response.status)
            cy.log(response.body)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
            authToken=sessionCookie
            // Log the session cookie value
            cy.log(sessionCookie);
            
            
            expect(response.status).to.eq(200);
        });
    });
    it('access firm pages',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.firmPage+"/1",
            failOnStatusCode: false,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+ authToken
            }
        }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(200)
       
      }
  
      )


    }

    )

});
// Testing accessing firm pages as firm
describe('Accessing firm pages as firmn', () => {
    
    const requestBody1 = {
        username: "Firm",
        password: "!QAZxsw2"
    };
 
    let authToken = null;

    before('Login as a firm', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody1
        
        }).then((response) => {
            cy.log(response.status)
            cy.log(response.body)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
            authToken=sessionCookie
            // Log the session cookie value
            cy.log(sessionCookie);
            
            
            expect(response.status).to.eq(200);
        });
    });
    it('access firm pages',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.firmPage+"/1",
            failOnStatusCode: false,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+ authToken
            }
        }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(403)
       
      }
  
      )


    }

    )
});

    // Testing accessing firm pages as client
    describe('Accessing firm pages as client', () => {
    
        const requestBody1 = {
            username: "Client",
            password: "!QAZxsw2"
        };
     
        let authToken = null;
    
        before('Login as a client', () => {
            cy.request({
                method: 'POST',
                url: constants.url + constants.login,
                body: requestBody1
            
            }).then((response) => {
                cy.log(response.status)
                cy.log(response.body)
                // Extract the session cookie value from the headers
                const cookies = response.headers['set-cookie'];
                const sessionCookie = getSessionValue(cookies, 'session');
                authToken=sessionCookie
                // Log the session cookie value
                cy.log(sessionCookie);
                
                
                expect(response.status).to.eq(200);
            });
        });
        it('access client pages',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.firmPage+"/1",
                failOnStatusCode: false,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer'+ authToken
                }
            }).then((response)=>{
                cy.log(response.body)
                expect(response.status).to.eq(403)
           
          }
      
          )
    
    
        }
    )});




//
//
//
//Testing for number of pages 
describe('Accessing empty pages', () => {
    
    const requestBody1 = {
        username: "Main",
        password: "!QAZxsw2"
    };
 
    let authToken = null;

    before('Login as a main', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody1
        
        }).then((response) => {
            cy.log(response.status)
            cy.log(response.body)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
            authToken=sessionCookie
            // Log the session cookie value
            cy.log(sessionCookie);
            
            
            expect(response.status).to.eq(200);
        });
    });
    it('access empty pages',() => {
            cy.request({
                method:'Get',
                url:constants.url + constants.firmPage+"/"+1,
                failOnStatusCode: false,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer'+ authToken
                }
            }).then((response)=>{
                cy.log(response.body.total_pages)
                let totalPages= response.body.total_pages
                let invalidPage= Number(totalPages)+1
                cy.log(totalPages)
                cy.request({
                    method:'Get',
                    url:constants.url + constants.firmPage+"/"+invalidPage,
                    failOnStatusCode: false,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':'Bearer'+ authToken
                    }
                }).then((response)=>{
                    expect(response.status).to.eq(404)
                }
                )
                   
          }
      
          )
        
        


    }
)});


//
//
//
//Testing for accesing page with out logging in
describe('Accessing pages logged ou', () => {
   
 
    let authToken = null;
    it('access pages logged out',() => {
        cy.request({
            method:'Get',
            url:constants.url + constants.firmPage+"/1",
            failOnStatusCode: false,
            
        }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(401)
       
      }
  
      )


    }
)

});
//
//