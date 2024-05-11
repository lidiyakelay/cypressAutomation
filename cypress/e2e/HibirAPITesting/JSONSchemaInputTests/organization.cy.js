import * as constants from "../../../constants.js";
import { faker } from '@faker-js/faker';

//Testing create organization input data json schema 
describe('create organization input data schema validation', ()=>{
    const requestBody1= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"

    }
  
    const requestBody2= 
    {
                accesstype: 12345,
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"

    }
    const requestBody3= 
    {
                accesstype: "Client",
                address:123456,
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"

    }
    const requestBody4= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: 123456,
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"

    }
    const requestBody5= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email:12345,
                name: faker.internet.userName(),
                phone: "251911121318"

    }
    const requestBody6= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: 12345,
                phone: "251911121318"

    }
    const requestBody7= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "janedoe"

    }
    //Testing create organization input data json schema with valid  datatype
    it("create organization input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createOrg,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(200)
         

        }

        )
    }
    )
    //Testing create organization input data json schema with invalid accesstype datatype
    it("create organization input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createOrg,
                failOnStatusCode: false,
                body: requestBody2
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         

        }

        )
    })
     //Testing create organization input data json schema with invalid address datatype
    it("create organization input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createOrg,
                failOnStatusCode: false,
                body: requestBody3
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         

        }

        )
    })
  //Testing create organization input data json schema with invalid description datatype
    it("create organization input data schema validation",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createOrg,
            failOnStatusCode: false,
            body: requestBody4
        }
    ).then((response)=>{
        
          expect(response.status).to.eq(400)
     

    }

    )
    
})
//Testing create organization input data json schema with invalid email datatype
    it("create organization input data schema validation",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createOrg,
            failOnStatusCode: false,
            body: requestBody5
        }
    ).then((response)=>{
        
          expect(response.status).to.eq(400)
     

    }

    )
    
})
    //Testing create organization input data json schema with invalid name datatype
    it("create organization input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createOrg,
                failOnStatusCode: false,
                body: requestBody6
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         
    
        }
    
        )
        
    })
    //Testing create organization input data json schema with invalid name datatype
    it("create organization input data schema validation",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createOrg,
                failOnStatusCode: false,
                body: requestBody7
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         
    
        }
    
        )
        
    })
 

}

)  
