import * as constants from "../../../constants.js";

//Testing login Functionality
describe('Login input data schema validation', ()=>{
    const requestBody1= 
    {
        username: "client_user",
        password: "12345"
    }
    const requestBody2= 
    {
        username: "123456",
        password: "!QAZxsw2"
    }
    const requestBody3= 
    {
        username: "client_user",
        password: "!QAZxsw2"
    }
    const requestBody4= 
    {
        username: "12345",
        password: "12345"
    }
    //Testing login functionality with invalid password 
    it("Login input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.login,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         

        }

        )
    }

    )
     //Testing login functionality with invalid username 
    it("Login input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.login,
                failOnStatusCode: false,
                body: requestBody2
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         

        }

        )
    }

    )
     //Testing login functionality with valid username and password
    it("Login input data schema validation",()=>{
        
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.login,
                failOnStatusCode: false,
                body: requestBody3
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(200)
         

        }

        )
    }

    )
    
      //Testing login functionality with invalid username and password
      it("Login input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.login,
                failOnStatusCode: false,
                body: requestBody4
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         

        }

        )
    }

    )
}
)