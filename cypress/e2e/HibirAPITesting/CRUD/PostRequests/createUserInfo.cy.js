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

// Testing Create user info functionality
describe('Login input data schema validation', () => {
    
    const requestBody1 = {
        username: "firm_user",
        password: "!QAZxsw2"
    };
    const requestBody2={
        
            "address": "string",
            "first_name": "string",
            "last_name": "string",
            "phone_number": "string",
            "preferences": {
              "theme":"string"
          },
            "profile_picture": "string"
          
    }
    let authToken = null;

    before('Login as Firm admin', () => {
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
    it('Create project as a firm admin',() => {
        cy.request({
            method:'Post',
            url:constants.url + constants.createUserInfo,
            failOnStatusCode: false,
            body: requestBody2,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+ authToken
            }
        }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(500)
       
  
      }
  
      )


    }

    )

});
