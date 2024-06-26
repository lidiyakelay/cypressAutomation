import * as constants from "../../../constants.js";
import { faker } from '@faker-js/faker';
import { createOrg, signup } from '../../../const_functions/const_functions.cy.js'



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


//Testing signup for client
describe('Signup as client', ()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let orgemail= faker.internet.email()
    let signupToken
    const requestBody1= 
    {
        username: username,
        password: "!QAZxsw2"
    }
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
                    organization_email:orgemail,
                    name: username,
                    phone: "251999887766"
        
        }
    before('Create organization as client', () => {
        
        createOrg(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            signupToken=response.body.token // Adjust the expected status code as needed
            cy.log(response.body);
    });})
 
  

    it("Testing clinet signup",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              cy.log(response.body.error)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )
    
})



//Testing signup for input validation  input length
describe('Testing signup for input validation  input length', ()=>{
    let signupToken
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let orgemail= faker.internet.email()

    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
                    organization_email:orgemail,
                    name: username,
                    phone: "251999887766"
        
        }
    const requestBody1= 
    {
        username: "",
        password: "!QAZxsw2"
    }
    const requestBody2= 
    {
        username: username,
        password: ""
    }
//Testing create organization input data 
beforeEach('creating organization', () => {
        
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
});})
it("//Testing create organization input data username with invalid length",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.signup+"/"+signupToken,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
         cy.log(response.body)
          expect(response.status).to.eq(400)
     

    }

    )
    it("//Testing create organization input data password with invalid length",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.signup+"/"+signupToken,
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
})})



//Testing signup for input validation unique username
describe('Testing signup for input validation unique username', ()=>{
    let signupToken
    let orgemail= faker.internet.email()
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
                    organization_email:orgemail,
                    name: username,
                    phone: "251999887766"
        
        }
    const requestBody1= 
    {
        username: "Client23",
        password: "!QAZxsw2"
    }
   
//Testing create organization input data unique username
before('creating organization', () => {
        
            
       
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
});})

it("//Testing create organization input data username with existing user name",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.signup+"/"+signupToken,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
         cy.log(response.body)
          expect(response.status).to.eq(500)
     

    }

    )
  

})})


//
//
//
//
//
//Testing create organization input data Strong password
describe('Testing create organization input data Strong password', ()=>{
    let signupToken
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let orgemail= faker.internet.email()
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
                    organization_email:orgemail,
                    name: username,
                    phone: "251999887766"
        
        }
    const requestBody1= 
    {
        username: "Client23",
        password: "12345"
    }
   

before('creating organization', () => {
        
       
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
});})
it("//Testing create organization input data password with weak password",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.signup+"/"+signupToken,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
         cy.log(response.body)
          expect(response.status).to.eq(400)
     

    }

    )
  

})})

//
//
//
//
//
//Testing create organization token
describe('Testing create organization token', ()=>{
    let signupToken
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let orgemail= faker.internet.email()

    
    const requestBody= 
        {
            accesstype: "Client",
            address: "addis ababa",
            description: "test test",
            email: useremail,
            organization_email:orgemail,
            name: username,
            phone: "251999887766"
        
        }
    const requestBody1= 
    {
        username: "Client23",
        password: "12345"
    }
   

//Testing create organization with firm
before("create organization functionality role Test Firm",()=>{
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            })
    });
}
)

it("//Testing create organization token validation",()=>{
    cy.request(
        {
            method: 'Post',
            url: constants.url+constants.signup+"/"+signupToken,
            failOnStatusCode: false,
            body: requestBody1
        }
    ).then((response)=>{
         cy.log(response.body)
          expect(response.status).to.eq(400)
     

    }

    )
  

})

})







//
//
//
//
///////////////////////////////////////////////////////////////////////////////////
//Testing signup for Firm
describe('Signup as Firm', ()=>{
    let totalpage
    let orgID
    let authToken = null;
    let signupToken
    let useremail= faker.internet.email()
    let orgemail= faker.internet.email()

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
            organization_email:orgemail,
                    name: username,
                    phone: "251999880766"
        
        }
        const requestBody2= 
        {
            username: "Scarlett.Ryan",
            password: "!QAZxsw2"
        }
    //Testing create organization with firm
before("create organization functionality role Test Firm",()=>{
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(201);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
        cy.log(username)
    });
}
)
    
    before('Login as admin', () => {
        cy.request({
            method: 'POST',
            url: constants.url + constants.login,
            body: requestBody2
        
        }).then((response) => {
            cy.log(response.status)
            // Extract the session cookie value from the headers
            const cookies = response.headers['set-cookie'];
            const sessionCookie = getSessionValue(cookies, 'session');
         //   authToken=sessionCookie
            // Log the session cookie value
            cy.log(sessionCookie);
            expect(response.status).to.eq(200);
        });
    });
    before("//Get the organization id",()=>{
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
                cy.log(totalpage)
                cy.request(
                    {
                        method: 'Get',
                        url: constants.url+constants.firmPage+"/"+i,
                        failOnStatusCode: false,
                    }
                ).then((response)=>{
                    expect(response.status).to.eq(200)
                    for(let j=0; j<response.body.firms.length; j++ ){
                        cy.log(constants.url+constants.firmPage+"/"+i)
                        cy.log(response.body.firms.length)
                        cy.log(j)
                        cy.log(useremail)
                        cy.log(response.body.firms[j].email)
                        if(response.body.firms[j].email==useremail){
                            orgID=response.body.firms[j].id
                            cy.log(response.body.firms[j].id+"/////////////////////////////////////")
                            break
    
                            
                        }
                }})
    
    
                
              }
    
        }
    
        )
      
    
    })
    before("change firm status",()=>{
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
    
    it("Testing signup as firm",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.signup+"/"+signupToken,
                failOnStatusCode: false,
                body: requestBody1
            }
        ).then((response)=>{
              cy.log(response.body)
              expect(response.status).to.eq(200)
              
                
        }

        )
    }
    )})
     