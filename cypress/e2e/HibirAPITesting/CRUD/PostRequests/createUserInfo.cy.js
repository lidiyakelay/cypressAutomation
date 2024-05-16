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

//* / Testing Create user info functionality for client
describe('Testing creating user info functionality for client ', () => {
    let adminemail= faker.internet.email()
    let useremail= faker.internet.email()
    let orgemail= faker.internet.email()
    let username= faker.internet.userName()
    let adminname= faker.internet.userName()
    let userphone= faker.phone.imei()
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
        "first_name": username,
        "last_name": "test",
        "phone_number": userphone,
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
                name: username,
                phone: userphone
    
    }
    const requestBody3 = {
        email: useremail,
       
    };
    const requestBody4= {
        username: username,
        password: "!QAZxsw2"
       
    };
 before('Create organization as client', () => {
    
    createOrg(requestBody).then((response) => {
        expect(response.status).to.eq(200);
        signupToken=response.body.token // Adjust the expected status code as needed
        cy.log(response.body);
    });
});
before("Testing clinet admin signup",()=>{
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
        cy.log(response.body);
    })
  
      }

      

    )
    it("sending signup invitation from client admin with valid email and authorization",()=>{
        cy.request(
            {
                method: 'Post',
                url: constants.url+constants.sendsignupinvitationclient,
                failOnStatusCode: false,
                body:requestBody3,
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
    }
    )
    it("Testing clinet signup",()=>{
        signup(usersignupToken,requestBody4).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
        })
    }
    ) 
    it('Login as client', () => {
        login(requestBody4).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
           const cookies = response.headers['set-cookie'];
                session = getSessionValue(cookies, 'session');
                cy.setCookie('session', session);
        })
        });
    it('Create user info for client user', () => {

        createUserInfo(requestBody5,session).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
          
        }) })
    
});


//
//
//
//Testing create user profile for Firm
describe('Testing create user profile for Firm', ()=>{
    let totalpage
    let orgID
    let authToken = null;
    let signupToken
    let session
    let usersignupToken
    let useremail= faker.internet.email()
    let orgemail= faker.internet.email()
    let adminemail= faker.internet.email() 
    let username= faker.internet.userName()
    let userphone= faker.phone.imei()
    let adminphone= faker.phone.imei()
    let adminname=faker.internet.userName()

    


    const requestBody4= 
    {
        username: username,
        password: "!QAZxsw2"
    }
    const requestBody5= 
    {
        email: useremail,
        
    }
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
const requestBody6={
        
    "address": "addis ababa",
    "first_name": username,
    "last_name": "test",
    "phone_number": userphone,
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
                    name: username,
                    phone: "251999880766"
        
        }
        const requestBody2= constants.mainAdmin
       
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
    )
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
       it("sending signup invitation from firm admin with valid email and authorization",()=>{
                cy.request(
                    {
                        method: 'Post',
                        url: constants.url+constants.sendsignupinvitationfirm,
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
            it("Testing firm user signup",()=>{
                signup(usersignupToken,requestBody4).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                })
            }
            ) 
            it('Login as firm user', () => {
                login(requestBody4).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                   const cookies = response.headers['set-cookie'];
                        session = getSessionValue(cookies, 'session');
                        cy.setCookie('session', session);
                })
                });
            it('Create user info for firm user', () => {
        
                createUserInfo(requestBody6,session).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                  
                }) })
        


})
     
//
//
//
//Testing create user profile for main
describe('Testing create user profile for Main', ()=>{
    let session
    let usersignupToken
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let adminname= faker.internet.userName()

   let userphone= faker.phone.imei()
   let adminphone= faker.phone.imei()

    const requestBody= constants.mainAdmin
    const requestBody2={
        email:useremail
    }
    const requestBody3={
        username: username,
        password:'!QAZxsw2'
    }
    const requestBody1={
        
        "address": "addis ababa",
        "first_name": adminname,
        "last_name": "test",
        "phone_number": adminphone,
        "preferences": {
          "theme":"string"
      },
        "profile_picture": "string"
      
    }
    const requestBody4={
        
        "address": "addis ababa",
        "first_name": username,
        "last_name": "test",
        "phone_number": userphone,
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
    it('Create user info for Main Admin', () => {
            createUserInfo(requestBody1,session).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
              
            }) })
    it("sending signup invitation from main admin with valid email and authorization",()=>{
                cy.request(
                    {
                        method: 'Post',
                        url: constants.url+constants.sendsignupinvitationm,
                        failOnStatusCode: false,
                        body:requestBody2,
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
         it("Testing main user signup",()=>{
                signup(usersignupToken,requestBody3).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                })
            }
            ) 
     it('Login as main user', () => {
                login(requestBody3).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(response.body);
                   const cookies = response.headers['set-cookie'];
                        session = getSessionValue(cookies, 'session');
                        cy.setCookie('session', session);
                })
                });
     it('Create user info for main user', () => {
        
                    createUserInfo(requestBody4,session).then((response) => {
                        expect(response.status).to.eq(200);
                        cy.log(response.body);
                      
                    }) })
    


}
)





//
//
//
//testing input length validation for create user info for first name
describe('Testing input length validation for create user info for first name input length and type',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let session
    let usersignupToken
const requestBody1={
        
    "address": "addis ababa",
    "first_name": "1",
    "last_name": "test",
    "phone_number": "0911121314",
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


        it('Create user info for main user with invalid first name', () => {
               
                createUserInfo(requestBody1,session).then((response) => {
                    expect(response.status).to.eq(400);
                    cy.log(response.body);
                  
                }) })
    
    
    


})



//
//
//
//testing input length validation for create user info for last name
describe('Testing input length validation for create user info for last name input length and type',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let session
    let usersignupToken

    const requestBody2={
        
        "address": "addis ababa",
        "first_name": "adam",
        "last_name": "2",
        "phone_number": faker.phone.imei(),
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


     
       it('Create user info for main user with invalid last name', () => {
               
                    createUserInfo(requestBody2,session).then((response) => {
                        expect(response.status).to.eq(400);
                        cy.log(response.body);
                      
                    })})


})

//
//
//
//testing create user info for main user with invalid phonenumber
describe('Testing create user info for main user with invalid phonenumber input length and type',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let session
    let usersignupToken

    const requestBody3={
        
        "address": "addis ababa",
        "first_name": "adam",
        "last_name": "test",
        "phone_number":"b",
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


     
            it('Create user info for main user with invalid phonenumber', () => {
               
                createUserInfo(requestBody3,session).then((response) => {
                    expect(response.status).to.eq(400);
                    cy.log(response.body);
                  
                }) })

})

//
//
//
//testing input length validation for create user info for faddress
describe('Testing input length validation for create user info for address',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let phonenumber=faker.phone.imei()
    let session
    let usersignupToken


const requestBody4={
        
    "address": "3",
    "first_name": "adam",
    "last_name": "test",
    "phone_number": phonenumber,
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


    
        it('Create user info for main user with invalid address', () => {
               
                            createUserInfo(requestBody4,session).then((response) => {
                                expect(response.status).to.eq(400);
                                cy.log(response.body);
                              
                            }) })
     
    


})
//testing input length validation for create user info with existing phone number
describe('Testing input length validation for create user info with existing phone number',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let session
    let usersignupToken

const requestBody7={
        
    "address": "address",
    "first_name": "adam",
    "last_name": "test",
    "phone_number": "0911121314",
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

    
        it('Create user info for main user with existing phone number', () => {
               
                            createUserInfo(requestBody7,session).then((response) => {
                                expect(response.status).to.eq(400);
                                cy.log(response.body);
                              
                            }) })
    


})



//
//
//
//Testing creating user info from unauthorized user
describe('Testing creating user info from unauthorized user',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let session
    let usersignupToken

const requestBody7={
        
    "address": "address",
    "first_name": "adam",
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

    
        it('Create user info for main user as main admin', () => {
               
                            createUserInfo(requestBody7,session).then((response) => {
                                expect(response.status).to.eq(500);
                              
                            }) })
    


})
//
//
//
//Testing creating user info without logging in
describe('Testing creating user info without logging in',()=>{
    let useremail= faker.internet.email()
    let username= faker.internet.userName()
    let session
    let usersignupToken

const requestBody7={
        
    "address": "address",
    "first_name": "adam",
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

it.only("sending signup invitation from firm admin with valid email and authorization",()=>{
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
     it.only("main user signup",()=>{
            signup(usersignupToken,requestBody6).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(response.body);
            })
        }
        ) 

    
        it.only('Test creating user info without logging in', () => {
               
            cy.request({
                method: 'POST',
                url: constants.url + constants.createUserInfo,
                failOnStatusCode: false,
                body: requestBody,
              
            }).then((response) => {
                expect(response.status).to.eq(401)
                cy.log(response.body);
            })
                        
                        })
    


})