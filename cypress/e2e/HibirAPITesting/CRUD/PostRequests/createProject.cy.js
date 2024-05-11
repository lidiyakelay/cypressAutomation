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

// Testing Create project functionality
describe('Login input data schema validation', () => {
    
    const requestBody1 = {
        username: "firm_user",
        password: "!QAZxsw2"
    };
    const requestBody2 = {
        
        
            "name": "Example Project",
            "description": "This is an example project for demonstration purposes.",
            "code": "EP123",
            "firm_id": "123e4567-e89b-12d3-a456-426614174000",
            "client_id": "123e4567-e89b-12d3-a456-426614174001",
            "service_request_id": "123e4567-e89b-12d3-a456-426614174002",
            "project_leader_id": "123e4567-e89b-12d3-a456-426614174004",
            "project_manager_id": "123e4567-e89b-12d3-a456-426614174005",
            "client_representative_id": "123e4567-e89b-12d3-a456-426614174006",
            "version": 1,
            "version_summary": "Initial version",
            "start_date": "2023-04-01T00:00:00Z",
            "end_date": "2023-04-30T00:00:00Z",
            "status_id": 1,
            "level_id": "123e4567-e89b-12d3-a456-426614174007",
            "level_detail_id": "123e4567-e89b-12d3-a456-426614174008",
            "methodology_id": "123e4567-e89b-12d3-a456-426614174009"
           
          
    };
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
            url:constants.url + constants.createProject,
            failOnStatusCode: false,
            body: requestBody2,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+ authToken
            }
        }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
       
  
      }
  
      )


    }

    )

});
