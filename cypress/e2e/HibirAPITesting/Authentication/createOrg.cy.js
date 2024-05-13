import * as constants from "../../../constants.js";
import { faker } from '@faker-js/faker';



//Testing create organization functionality for input data length
describe('create organization functionality Input data length Test', ()=>{
    const requestBody1= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: " "
    
    }
    
    const requestBody2= 
    {
                accesstype: "Client",
                address: " ",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    const requestBody3= 
    {
                accesstype: "Client",
                address:"Addis Ababa",
                description: " ",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    const requestBody4= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "testing",
                email: Math.floor(Math.random() * 90 + 10),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    
    const requestBody5= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: Math.floor(Math.random() * 90 + 10),
                phone: "251911121318"
    
    }
    const requestBody6= 
    {
                accesstype: " ",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251910121314"
    
    }
    
    //Testing create organization input data phone length
    it("Testing create organization input data phone length",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createOrg,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
            
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )
     //Testing create organization input data address length
     it("Testing create organization input data address length",()=>{
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
    }
    )
   //Testing create organization input data description length
   it("Testing create organization input data description length",()=>{
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
}
)
//Testing create organization input data email length
it("Testing create organization input data email length",()=>{
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
}
)
 
//Testing create organization input data name length
it("Testing create organization input data name length",()=>{
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
}
)

//Testing create organization input data accesstype length
it("Testing create organization input data accesstype length",()=>{
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
}
)

}

) 
//
//
//
//
//Testing create organization functionality role Test
describe('create organization functionality role Test', ()=>{
    const requestBody1= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    
    const requestBody2= 
    {
        accesstype: "Firm",
        address: "addis ababa",
        description: "test test",
        email: faker.internet.email(),
        name: faker.internet.userName(),
        phone: "251911121314"
    
    }
    const requestBody3= 
    {
                accesstype: "Main",
                address:"Addis Ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    
    const requestBody4= 
    {
                accesstype: "Observer",
                address:"Addis Ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
   

//Testing create organization with client
it("create organization functionality role Test",()=>{
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
//Testing create organization with firm
it("create organization functionality role Test",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createOrg,
            failOnStatusCode: false,
            body: requestBody2
        }
    ).then((response)=>{
        
          expect(response.status).to.eq(200)
     

    }

    )
}
)
//Testing create organization with main
it("create organization functionality role Test",()=>{
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
}
)
//Testing create organization with main
it("create organization functionality role Test",()=>{
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
}
)
}

) 
//
//
//
//
//Testing create organization functionality unique name, email, phone
describe('create organization functionality testing unique name, email, phone', ()=>{
    const requestBody1= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: "chapa",
                phone: "251911121314"
    
    }
    
    const requestBody2= 
    {
        accesstype: "Firm",
        address: "addis ababa",
        description: "test test",
        email: "chapa@gmail.com",
        name: faker.internet.userName(),
        phone: "251911121314"
    
    }
    const requestBody3= 
    {
                accesstype: "Client",
                address:"Addis Ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    

   

//Testing create organization for unique name with repeated name
it("Testing create organization for unique name with repeated name",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createOrg,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
        
          expect(response.status).to.eq(403)
     

    }

    )
}
)
//Testing create organization for unique email with repeated email
it("Testing create organization for unique email with repeated email",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createOrg,
            failOnStatusCode: false,
            body: requestBody2
        }
    ).then((response)=>{
        
          expect(response.status).to.eq(403)
     

    }

    )
}
)
//Testing create organization for unique phone with repeated phone
it("Testing create organization for unique phone with repeated phone",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createOrg,
            failOnStatusCode: false,
            body: requestBody3
        }
    ).then((response)=>{
        
          expect(response.status).to.eq(403)
     

    }

    )
}
)

}

) 