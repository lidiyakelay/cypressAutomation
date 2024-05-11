import * as constants from "../../../constants.js";

//Testing login input data json schema 
describe('Login input data schema validation', ()=>{
    const requestBody1= 
    {
        username: "client_user",
        password: 12345
    }
    const requestBody2= 
    {
        username: 123456,
        password: "!QAZxsw2"
    }
    const requestBody3= 
    {
        username: "client_user",
        password: "!QAZxsw2"
    }
    //Testing login input data json schema with invalid password datatype
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
     //Testing login input data json schema with invalid username datatype
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
     //Testing login input data json schema with valid username and password datatype
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
}



)