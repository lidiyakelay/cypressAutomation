import * as constants from "../../../constants.js";
import { faker } from '@faker-js/faker';

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
                    name: username,
                    phone: "251999887766"
        
        }
    before('Create organization as client', () => {
        
       
             cy.request({
            method: 'POST',
            url: constants.url + constants.createOrg,
            body: requestBody
        
        }).then((response) => {
            expect(response.status).to.eq(200);
            signupToken= response.body.token
            cy.log(signupToken)

        });
    });
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
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
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
before('creating organization', () => {
        
       
    cy.request({
   method: 'POST',
   url: constants.url + constants.createOrg,
   body: requestBody

}).then((response) => {
   expect(response.status).to.eq(200);
   signupToken= response.body.token
   cy.log(signupToken)

});
});
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
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
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
        
       
    cy.request({
   method: 'POST',
   url: constants.url + constants.createOrg,
   body: requestBody

}).then((response) => {
   expect(response.status).to.eq(200);
   signupToken= response.body.token
   cy.log(signupToken)

});
});
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
    const requestBody= 
        {
                    accesstype: "Client",
                    address: "addis ababa",
                    description: "test test",
                    email: useremail,
                    name: username,
                    phone: "251999887766"
        
        }
    const requestBody1= 
    {
        username: "Client23",
        password: "12345"
    }
   

before('creating organization', () => {
        
       
    cy.request({
   method: 'POST',
   url: constants.url + constants.createOrg,
   body: requestBody

}).then((response) => {
   expect(response.status).to.eq(200);
   signupToken= response.body.token
   cy.log(signupToken)

});
});
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
    const requestBody= 
        {
            accesstype: "Client",
            address: "addis ababa",
            description: "test test",
            email: useremail,
            name: username,
            phone: "251999887766"
        
        }
    const requestBody1= 
    {
        username: "Client23",
        password: "12345"
    }
   

before('creating organization', () => {
        
       
    cy.request({
   method: 'POST',
   url: constants.url + constants.createOrg,
   body: requestBody

}).then((response) => {
   expect(response.status).to.eq(200);
   signupToken= response.body.token
   cy.request(
    {
        method: 'Post',
        url: constants.url+constants.signup+"/"+signupToken,
        failOnStatusCode: false,
        body: requestBody1
    })
   cy.log(signupToken)

});
});
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



describe('Testing create organization token', ()=>{
    let orgID
    let totalpage
    let authToken = null;
    let useremail= "hibirqatest@gmail.com"
    const requestBody1= 
    {
        username: "Main",
        password: "!QAZxsw2"
    }

    before('Login as admin', () => {
             cy.request({
                  method: 'POST',
                     url: constants.url + constants.login,
                     body: requestBody1
                
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

    it("//Get the organization id",()=>{
    cy.request(
        {
            method: 'Get',
            url: constants.url+constants.firmPage+"/"+1,
            failOnStatusCode: false,
        }
    ).then((response)=>{
         
         
          expect(response.status).to.eq(200)
          totalpage= response.body.total_pages
          for(let i=1; i < totalpage; i++ ) {
            cy.request(
                {
                    method: 'Get',
                    url: constants.url+constants.firmPage+"/"+i,
                    failOnStatusCode: false,
                }
            ).then((response)=>{
                expect(response.status).to.eq(200)
                for(let j=0; j < 10; j++ ){
                    if(response.body.firms[j].email==useremail){
                        cy.log("////////////////////////////")
                        cy.log(response.body.firms[j].email)
                        orgID=response.body.firms[j].id
                        cy.log(response.body.firms[j].id)
                        break

                        
                    }
            }})


             /* 
             } */
            
          }

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
// /* describe('Signup as Firm', ()=>{
//     let authToken = null;
//     let signupToken
//     let useremail= faker.internet.email()
//     let username= faker.internet.userName()
//     const requestBody1= 
//     {
//         username: username,
//         password: "!QAZxsw2"
//     }
//     const requestBody= 
//         {
//                     accesstype: "Firm",
//                     address: "addis ababa",
//                     description: "test test",
//                     email: useremail,
//                     name: username,
//                     phone: "251999880766"
        
//         }
//         const requestBody2= 
//         {
//             username: "Main",
//             password: "!QAZxsw2"
//         }
//     before('Create organization as Firm', () => {
        
       
//              cy.request({
//             method: 'POST',
//             url: constants.url + constants.createOrg,
//             body: requestBody
        
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             signupToken= response.body.token
//             cy.log(signupToken)

//         });
//     });
    
//     before('Login as admin', () => {
//         cy.request({
//             method: 'POST',
//             url: constants.url + constants.login,
//             body: requestBody2
        
//         }).then((response) => {
//             cy.log(response.status)
//             // Extract the session cookie value from the headers
//             const cookies = response.headers['set-cookie'];
//             const sessionCookie = getSessionValue(cookies, 'session');
//             authToken=sessionCookie
//             // Log the session cookie value
//             cy.log(sessionCookie);
//             expect(response.status).to.eq(200);
//         });
//     });
   
//     before("crhange firm status",()=>{
//         cy.request(
//             {
//                 method: 'Post',
//                 url: constants.url+constants.createFirm,
//                 failOnStatusCode: false,
//                 body: requestBody
//             }
//         ).then((response)=>{
//              cy.log(response.body)
//               signupToken= response.body.token
//               expect(response.status).to.eq(403)
         

//         }

//         )
//     }
//     )

//     it("Testing signup as firm",()=>{
//         cy.request(
//             {
//                 method: 'Post',
//                 url: constants.url+constants.signup+"/"+signupToken,
//                 failOnStatusCode: false,
//                 body: requestBody1
//             }
//         ).then((response)=>{
//               cy.log(response.body)
//               expect(response.status).to.eq(200)
              
                
//         }

//         )
//     }
//     )
     