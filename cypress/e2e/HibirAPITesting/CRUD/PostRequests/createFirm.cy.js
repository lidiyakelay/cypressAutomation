import { faker } from '@faker-js/faker';
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


////Testing create firm functionality with valid data
describe('create firm functionality with valid data', ()=>{

    let authToken = null;

    const requestBody= {
        username: "Main",
        password: "!QAZxsw2"
    };
    const requestBody1= 
    {
                accesstype: "Firm",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    before('Login as admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody
        
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
    //Testing create firm functionality with valid data
    it("Testing create firm functionality with valid data",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
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

})




//
//
//
//
//Testing  create firm from other invalid roles Client
describe('Testing  create firm from other invalid roles Client', ()=>{

let authToken = null;

const requestBody= {
    username: "Client",
    password: "!QAZxsw2"
};
const requestBody1= 
{
            accesstype: "Firm",
            address: "addis ababa",
            description: "test test",
            email: faker.internet.email(),
            name: faker.internet.userName(),
            phone: "251911121314"

}
before('Login as Client', () => {
    cy.request({
        method: 'POST',
        url: constants.url + constants.login,
        body: requestBody
    
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
//Testing  create firm from other invalid roles CLient
it("Testing  create firm from other invalid roles CLient",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
         cy.log(response.body)
          expect(response.status).to.eq(403)
     

    }

    )
}
)

})
//
//
//
//
//Testing  create firm from other invalid roles Firm
describe('Testing  create firm from other invalid roles Firm', ()=>{

    let authToken = null;
    
    const requestBody= {
        username: "Firm",
        password: "!QAZxsw2"
    };

    const requestBody1= 
    {
                accesstype: "Firm",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    before('Login as Firm', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody
        
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
    //Testing  create firm from other invalid roles firm
    it("Testing  create firm from other invalid roles Firm",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(403)
         
    
        }
    
        )
    }
    )
    
    })




//
//
//
//Testing create firm functionality for input data length
describe('create firm functionality Input data length Test', ()=>{

    let authToken = null;

    const requestBody= {
        username: "Main",
        password: "!QAZxsw2"
    };
    const requestBody1= 
    {
                accesstype: "Firm",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: " "
    
    }
    
    const requestBody2= 
    {
                accesstype: "Firm",
                address: " ",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    const requestBody3= 
    {
                accesstype: "Firm",
                address:"Addis Ababa",
                description: " ",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    const requestBody4= 
    {
                accesstype: "Firm",
                address: "addis ababa",
                description: "testing",
                email: Math.floor(Math.random() * 90 + 10),
                name: faker.internet.userName(),
                phone: "251911121318"
    
    }
    
    const requestBody5= 
    {
                accesstype: "Firm",
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
    beforeEach('Login as admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody
        
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
    //Testing create firm input data phone length
    it("Testing create firm input data phone length",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )
     //Testing create firm input data address length
     it("Testing create firm input data address length",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
                failOnStatusCode: false,
                body: requestBody2
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(400)
         
                
        }

        )
    }
    )
   //Testing create firm input data description length
   it("Testing create firm input data description length",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody3
        }
    ).then((response)=>{
        cy.log(response.body)
        
          expect(response.status).to.eq(400)
     

    }

    )
}
)
//Testing create firm input data email length
it("Testing create firm input data email length",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody4
        }
    ).then((response)=>{
        cy.log("//////////////////////"+response.body)
        
          expect(response.status).to.eq(400)
     

    }

    )
}
)
 
//Testing create firm input data name length
it("Testing create firm input data name length",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody5
        }
    ).then((response)=>{
        cy.log(response.body)
        
          expect(response.status).to.eq(400)
     

    }

    )
}
)

//Testing create firm input data accesstype length
it("Testing create firm input data accesstype length",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody6
        }
    ).then((response)=>{
        cy.log(response.body)
        
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
//Testing create firm functionality for unique email, phone and name input data 
describe('create firm functionality Input data length Test', ()=>{

    let authToken = null;

    const requestBody= {
        username: "Main",
        password: "!QAZxsw2"
    };
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
beforeEach('Login as admin', () => {
    cy.request({
        method: 'POST',
        url: constants.url + constants.login,
        body: requestBody
    
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
//Testing create firm with existing name
it("Testing create firm with existing name",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
        cy.log(response.body)
        
          expect(response.status).to.eq(403)
     

    }

    )
}
)

//Testing create firm with existing email
it("Testing create firm with existing email",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody2
        }
    ).then((response)=>{
        cy.log(response.body)
        
          expect(response.status).to.eq(403)
     

    }

    )
}
)
//Testing create firm with existing phone
it("Testing create firm with existing phone",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.createFirm,
            failOnStatusCode: false,
            body: requestBody3
        }
    ).then((response)=>{
        cy.log(response.body)
        
          expect(response.status).to.eq(403)
     

    }

    )
}
)
})


//
//
//
//
//Testing create firm functionality without logging in
describe('Testing create firm functionality without logging in', ()=>{
    const requestBody1= 
    {
                accesstype: "Firm",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
   
    //Testing create firm functionality without logging in
    it("Testing create firm functionality without logging in",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(401)
         

        }

        )
    }
    )

})


//
//
//
//
//
//Testing create firm functionality with incorrect accesstype
describe('Testing create firm functionality with incorrect accesstype', ()=>{
    
    let authToken = null;

    const requestBody= {
        username: "Main",
        password: "!QAZxsw2"
    };
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
                accesstype: "Main",
                address: "addis ababa",
                description: "test test",
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phone: "251911121314"
    
    }
    beforeEach('Login as admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody
        
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
   
    //Testing create firm functionality with incorrect accesstype Client
    it("Testing create firm functionality with incorrect accesstype Client",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )
    //Testing create firm functionality with incorrect accesstype Main
    it("Testing create firm functionality with incorrect accesstype Main",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.createFirm,
                failOnStatusCode: false,
                body: requestBody2
            }
        ).then((response)=>{
             cy.log(response.body)
              expect(response.status).to.eq(400)
         

        }

        )
    }
    )

})