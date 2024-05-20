import { faker } from '@faker-js/faker';
import { createOrg, login, signup, createUserInfo, changeFirmStatus } from '../../../../const_functions/const_functions.cy.js'
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

//* / Testing update user info functionality for client
describe('Testing update user info functionality for client ', () => {
    let adminemail= faker.internet.email()
    let orgemail= faker.internet.email()
    let newname= faker.internet.userName()
    let name= faker.internet.userName()
    let adminname= faker.internet.userName()
    let newphone= faker.phone.imei()
    let signupToken
    let usersignupToken
   let adminphone= faker.phone.imei()
    let session;

    const requestBody1 = {
        username: adminname,
        password: "!QAZxsw2"
    };
    const requestBody2={
        
            "address": "addis ababa",
            "first_name": adminname,
            "last_name": "test",
            "phone_number": adminphone,
            "preferences": {
              "theme":"string"
          },
            "profile_picture": "string"
          
    }
    const requestBody5={
        
        "address": "addis ababa",
        "first_name": newname,
        "last_name": "test",
        "phone_number": newphone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
}
    const requestBody= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: adminemail,
                organization_email:orgemail,
                name: name,
                phone: adminphone
    
    }

 
 before('Create organization as client', () => {
    
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
});
before("clinet admin signup",()=>{
    signup(signupToken,requestBody1).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
    })
}
) 
before('Login as client admin', () => {
    login(requestBody1).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    });
it('Create user info for client admin',() => {

       createUserInfo(requestBody2, session).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body.first_name)
        cy.log(response.body);
    })
  
      }

      

    )
    it("Testing updating user info as client admin",()=>{
        cy.request(
            {
                method: 'PUT',
                url: constants.url+constants.updateProfile,
                failOnStatusCode: false,
                body:requestBody5,
                headers: {
                    'Cookie': 'session=' + session
                }
                
            }
        ).then((response)=>{
             cy.log(response.body.first_name)
              expect(response.status).to.eq(200)
        }

        )
    }
    )
    
    
});


//
//
//
//Testing update user profile for Firm admin
describe('Testing update user profile for Firm admin', ()=>{
    let totalpage
    let orgID
    let authToken = null;
    let signupToken
    let session
    let orgemail= faker.internet.email()
    let adminemail= faker.internet.email() 
    let newname= faker.internet.userName()
    let name= faker.internet.userName()
    let newphone= faker.phone.imei()
    let adminphone= faker.phone.imei()
    let adminname=faker.internet.userName()

    

  
    const requestBody1= 
    {
        username: adminname,
        password: "!QAZxsw2"
    }
    const requestBody3={
        
        "address": "addis ababa",
        "first_name": adminname,
        "last_name": "test",
        "phone_number": adminphone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
}
const requestBody5={
        
    "address": "addis ababa",
    "first_name": newname,
    "last_name": "test",
    "phone_number": newphone,
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}
    const requestBody= 
        {
                    accesstype: "Firm",
                    address: "addis ababa",
                    description: "test test",
                    email: adminemail,
            organization_email:orgemail,
                    name: name,
                    phone: "251999880766"
        
        }
        const requestBody2= constants.mainAdmin
       
    //Testing create organization with firm
before("create organization functionality role Test Firm",()=>{
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(201);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
}
)
   before('Login as firm admin', () => {
    login(requestBody2).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
       const sessionCookie = getSessionValue(cookies, 'session');

    })
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
                        cy.log(adminemail)
                        cy.log(response.body.firms[j].email)
                        if(response.body.firms[j].email==adminemail){
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
    
    signup(signupToken,requestBody1).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
    })
    it('Login as firm admin', () => {
        login(requestBody1).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
        it('Create user info for firm admin', () => {

            createUserInfo(requestBody3,session).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
              
            }) })
   it("Testing updating user info as firm admin",()=>{
                cy.request(
                    {
                        method: 'PUT',
                        url: constants.url+constants.updateProfile,
                        failOnStatusCode: false,
                        body:requestBody5,
                        headers: {
                            'Cookie': 'session=' + session
                        }
                        
                    }
                ).then((response)=>{
                     cy.log(response.body.first_name)
                     cy.log(newname)
                      expect(response.status).to.eq(200)
                }
        
                )
            }
            )
    
         
        


})
     
//
//
//
//Testing update user profile for main
describe('Testing update user profile for Main admin', ()=>{
    let session
    let newname= faker.internet.userName()

   let newphone= faker.phone.imei()

    const requestBody= constants.mainAdmin
    
  
    const requestBody4={
        
        "address": "addis ababa",
        "first_name": newname,
        "last_name": "test",
        "phone_number": newphone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }
    
    before('Login as mainadmin', () => {
        login(requestBody).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        })
 
        it("Testing updating user info as main admin",()=>{
            cy.request(
                {
                    method: 'PUT',
                    url: constants.url+constants.updateProfile,
                    failOnStatusCode: false,
                    body:requestBody4,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.first_name)
                 cy.log(newname)
                  expect(response.status).to.eq(200)
            }
    
            )
        }
        )
        


}
)





//
//
//
//testing input length validation for update user info for first name
describe('Testing input length validation for update user info for first name input length and type',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let newname= faker.internet.userName()
    let phone=  faker.phone.imei()
    let session
    let usersignupToken
    const requestBody2={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number":phone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }

const requestBody1={
        
    "address": "addis ababa",
    "first_name": "3",
    "last_name": "test",
    "phone_number": phone,
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}




const requestBody= constants.mainAdmin
const requestBody5= {
    email: useremail
}
const requestBody6= {
    username:username,
    password:'!QAZxsw2'
}
before('Login as mainadmin', () => {
    login(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    })

it("sending signup invitation from firm admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationm,
                    failOnStatusCode: false,
                    body:requestBody5,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        })
     it("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
 it('Login as main user', () => {
            login(requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });


        it('Create user info for main user ', () => {
               
                createUserInfo(requestBody2,session).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                  
                }) })
        it("Testing updating user info as main admin with invalid first name",()=>{
            cy.request(
                {
                    method: 'PUT',
                    url: constants.url+constants.updateProfile,
                    failOnStatusCode: false,
                    body:requestBody1,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.first_name)
                 cy.log(newname)
                  expect(response.status).to.eq(400)
            }
    
            )
        }
        )
    
    
    


})



//
//
//
//testing input length validation for update user info for last name
describe('Testing input length validation for update user info for last name input length and type',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let newname= faker.internet.userName()
    let phone=  faker.phone.imei()
    let session
    let usersignupToken
    const requestBody2={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number":phone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }

const requestBody1={
        
    "address": "addis ababa",
    "first_name": newname,
    "last_name": "3",
    "phone_number": phone,
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}




const requestBody= constants.mainAdmin
const requestBody5= {
    email: useremail
}
const requestBody6= {
    username:username,
    password:'!QAZxsw2'
}
before('Login as mainadmin', () => {
    login(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    })

it("sending signup invitation from firm admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationm,
                    failOnStatusCode: false,
                    body:requestBody5,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        })
     it("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
 it('Login as main user', () => {
            login(requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });


        it('Create user info for main user ', () => {
               
                createUserInfo(requestBody2,session).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                  
                }) })
        it("Testing updating user info as main admin with invalid last name",()=>{
            cy.request(
                {
                    method: 'PUT',
                    url: constants.url+constants.updateProfile,
                    failOnStatusCode: false,
                    body:requestBody1,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.first_name)
                 cy.log(newname)
                  expect(response.status).to.eq(400)
            }
    
            )
        }
        )
    


})

//
//
//
//testing update user info for main user with invalid phonenumber
describe('Testing update user info for main user with invalid phonenumber input length and type',()=>{
   
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let newname= faker.internet.userName()
    let phone=  faker.phone.imei()
    let session
    let usersignupToken
    const requestBody2={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number":phone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }

const requestBody1={

    "address": "addis ababa",
    "first_name": username,
    "last_name": "test",
    "phone_number": 'n',
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}




const requestBody= constants.mainAdmin
const requestBody5= {
    email: useremail
}
const requestBody6= {
    username:username,
    password:'!QAZxsw2'
}
before('Login as mainadmin', () => {
    login(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    })

it("sending signup invitation from firm admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationm,
                    failOnStatusCode: false,
                    body:requestBody5,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        })
     it("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
 it('Login as main user', () => {
            login(requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });


        it('Create user info for main user ', () => {
               
                createUserInfo(requestBody2,session).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                  
                }) })
        it("Testing updating user info as main admin with invalid phone",()=>{
            cy.request(
                {
                    method: 'PUT',
                    url: constants.url+constants.updateProfile,
                    failOnStatusCode: false,
                    body:requestBody1,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.first_name)
                 cy.log(newname)
                  expect(response.status).to.eq(400)
            }
    
            )
        }
        )
    

})

//
//
//
//testing input length validation for update user info for faddress
describe('Testing input length validation for update user info for address',()=>{
    
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let newname= faker.internet.userName()
    let phone=  faker.phone.imei()
    let session
    let usersignupToken
    const requestBody2={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number":phone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }

const requestBody1={
        
    "address": "9",
    "first_name": username,
    "last_name": "test",
    "phone_number": '0911121314',
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}




const requestBody= constants.mainAdmin
const requestBody5= {
    email: useremail
}
const requestBody6= {
    username:username,
    password:'!QAZxsw2'
}
before('Login as mainadmin', () => {
    login(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    })

it("sending signup invitation from firm admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationm,
                    failOnStatusCode: false,
                    body:requestBody5,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        })
     it("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
 it('Login as main user', () => {
            login(requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });


        it('Create user info for main user ', () => {
               
                createUserInfo(requestBody2,session).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                  
                }) })
        it("Testing updating user info as main admin with invalid address",()=>{
            cy.request(
                {
                    method: 'PUT',
                    url: constants.url+constants.updateProfile,
                    failOnStatusCode: false,
                    body:requestBody1,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.first_name)
                 cy.log(newname)
                  expect(response.status).to.eq(400)
            }
    
            )
        }
        )
    

})
//testing input length validation for update user info with existing phone number
describe('Testing input length validation for update user info with existing phone number',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let newname= faker.internet.userName()
    let phone=  faker.phone.imei()
    let session
    let usersignupToken
    const requestBody2={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number":phone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }

const requestBody1={
        
    "address": "addis ababa",
    "first_name": username,
    "last_name": "test",
    "phone_number": '0911121314',
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}




const requestBody= constants.mainAdmin
const requestBody5= {
    email: useremail
}
const requestBody6= {
    username:username,
    password:'!QAZxsw2'
}
before('Login as main admin', () => {
    login(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    })

it("sending signup invitation from firm admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationm,
                    failOnStatusCode: false,
                    body:requestBody5,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        })
     it("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 
 it('Login as main user', () => {
            login(requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });


        it('Create user info for main user ', () => {
               
                createUserInfo(requestBody2,session).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                  
                }) })
        it("Testing updating user info as main admin with existing phone number",()=>{
            cy.request(
                {
                    method: 'PUT',
                    url: constants.url+constants.updateProfile,
                    failOnStatusCode: false,
                    body:requestBody1,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(newname)
                  expect(response.status).to.eq(400)
            }
    
            )
        }
        )
    
    


})




//
//
//
//Testing creating user info without logging in
describe('Testing creating user info without logging in',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let newname= faker.internet.userName()
    let session
    let usersignupToken

const requestBody7={
        
    "address": "address",
    "first_name": username,
    "last_name": "test",
    "phone_number":faker.phone.imei(),
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}
const requestBody8={
        
    "address": "address",
    "first_name": newname,
    "last_name": "test",
    "phone_number":faker.phone.imei(),
    "preferences": {
      "theme":"string"
  },
    "profile_picture": "string"
  
}
const requestBody= constants.mainAdmin
const requestBody5= {
    email: useremail
}
const requestBody6= {
    username:username,
    password:'!QAZxsw2'
}
before('Login as mainadmin', () => {
    login(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
       const cookies = response.headers['set-cookie'];
            session = getSessionValue(cookies, 'session');
            cy.setCookie('session', session);
    })
    })

it("sending signup invitation from firm admin with valid email and authorization",()=>{
            cy.request(
                {
                    method: 'Post',
                    url: constants.url+constants.sendsignupinvitationm,
                    failOnStatusCode: false,
                    body:requestBody5,
                    headers: {
                        'Cookie': 'session=' + session
                    }
                    
                }
            ).then((response)=>{
                 cy.log(response.body.token)
                  expect(response.status).to.eq(200)
                  usersignupToken=response.body.token
            }
    
            )
        })
     it("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 

        it('Login as main user', () => {
            login(requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
               const cookies = response.headers['set-cookie'];
                    session = getSessionValue(cookies, 'session');
                    cy.setCookie('session', session);
            })
            });
        it('creating user info ', () => {
               
            createUserInfo(requestBody7,session).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
                        
                        })})
           it("Testing updating user info without logging in",()=>{
                            cy.request(
                                {
                                    method: 'PUT',
                                    url: constants.url+constants.updateProfile,
                                    failOnStatusCode: false,
                                    body:requestBody8,
                                }
                            ).then((response)=>{
                                 cy.log(response.body.first_name)
                                 cy.log(newname)
                                  expect(response.status).to.eq(401)
                            }
                    
                            )
                        }
                        )
    


})