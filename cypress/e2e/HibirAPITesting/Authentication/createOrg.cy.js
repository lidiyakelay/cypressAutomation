
import { faker } from '@faker-js/faker';
import { createOrg} from '../../../const_functions/const_functions.cy.js';


//Testing create organization functionality for input data length
describe('create organization functionality Input data length Test', ()=>{
    const requestBody1= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                organization_email:faker.internet.email(),
                name: faker.internet.userName(),
                phone: " "
    
    }
    
    const requestBody2= 
    {
                accesstype: "Client",
                address: " ",
                description: "test test",
                email: faker.internet.email(),
                organization_email:faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    const requestBody3= 
    {
                accesstype: "Client",
                address:"Addis Ababa",
                description: " ",
                email: faker.internet.email(),
                organization_email:faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    const requestBody4= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "testing",
                email: Math.floor(Math.random() * 90 + 10),
                organization_email:faker.internet.email(),
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
                organization_email:faker.internet.email(),
                phone: "251911121318"
    
    }
    const requestBody6= 
    {
                accesstype: " ",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                organization_email:faker.internet.email(),
                phone: "251910121314"
    
    }
    const requestBody7= 
    {
                accesstype: " ",
                address: "addis ababa",
                description: "test test",
                email:faker.internet.email(),
                name: faker.internet.userName(),
                organization_email: Math.floor(Math.random() * 90 + 10),
                phone: "251910121314"
    
    }
    
    //Testing create organization input data phone length
    it("Testing create organization input data phone length",()=>{
        createOrg(requestBody1).then((response) => {
            expect(response.status).to.eq(400);
            //signupToken=response.body.token // Adjust the expected status code as needed
            cy.log(response.body);
        });
    })
     //Testing create organization input data address length
     it("Testing create organization input data address length",()=>{
        createOrg(requestBody2).then((response) => {
            expect(response.status).to.eq(400);
            //signupToken=response.body.token // Adjust the expected status code as needed
            cy.log(response.body);
        });
    }
    )
   //Testing create organization input data description length
   it("Testing create organization input data description length",()=>{
    createOrg(requestBody3).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization input data email length
it("Testing create organization input data email length",()=>{
    createOrg(requestBody4).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
 //Testing create organization input data user email length
it("Testing create organization input data user email length",()=>{
    createOrg(requestBody7).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization input data name length
it("Testing create organization input data name length and input type",()=>{
    createOrg(requestBody5).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)

//Testing create organization input data accesstype length
it("Testing create organization input data accesstype length",()=>{
    createOrg(requestBody6).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
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
                organization_email:faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    
    const requestBody2= 
    {
        accesstype: "Firm",
        address: "addis ababa",
        description: "test test",
        email: faker.internet.email(),
        organization_email:faker.internet.email(),
        name: faker.internet.userName(),
        phone: "251911121314"
    
    }
    const requestBody3= 
    {
                accesstype: "Main",
                address:"Addis Ababa",
                description: "test test",
                email: faker.internet.email(),
                organization_email:faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    
    const requestBody4= 
    {
                accesstype: "Observer",
                address:"Addis Ababa",
                description: "test test",
                email: faker.internet.email(),
                organization_email:faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
   

//Testing create organization with client
it("create organization functionality role Test Client",()=>{
    createOrg(requestBody1).then((response) => {
        expect(response.status).to.eq(200);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization with firm
it("create organization functionality role Test Firm",()=>{
    createOrg(requestBody2).then((response) => {
        expect(response.status).to.eq(201);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization with main
it("create organization functionality role Test Main",()=>{
    createOrg(requestBody3).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization with observer
it("create organization functionality role Test Obsever",()=>{
    createOrg(requestBody4).then((response) => {
        expect(response.status).to.eq(400);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
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
                organization_email:faker.internet.email(),
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
        organization_email:faker.internet.email(),
        phone: "251911121314"
    
    }
    const requestBody3= 
    {
                accesstype: "Client",
                address:"Addis Ababa",
                description: "test test",
                organization_email:faker.internet.email(),
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    const requestBody4= 
    {
                accesstype: "Client",
                address:"Addis Ababa",
                description: "test test",
                organization_email: "chapaadmin@gmail.com",
                email: faker.internet.email(),
                name:faker.internet.name,
                phone: "251911121314"
    
    }
    

   

//Testing create organization for unique name with repeated name
it("Testing create organization for unique name with repeated name",()=>{
    createOrg(requestBody1).then((response) => {
        expect(response.status).to.eq(403);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization for unique email with repeated email
it("Testing create organization for unique email with repeated email",()=>{
    createOrg(requestBody2).then((response) => {
        expect(response.status).to.eq(403);
        //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization for unique user email with repeated email
it("Testing create organization for unique user email with repeated email",()=>{
    createOrg(requestBody4).then((response) => {
        expect(response.status).to.eq(403);
       // //signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
//Testing create organization for unique phone with repeated phone
it("Testing create organization for unique phone with repeated phone",()=>{
    createOrg(requestBody3).then((response) => {
        expect(response.status).to.eq(403);
        ////signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)

}

) 