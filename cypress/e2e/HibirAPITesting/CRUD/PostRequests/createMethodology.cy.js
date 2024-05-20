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
//
//
//
// Testing create methodologies for Main Admin
describe('Testing create methodologies for Main Admin', ()=>{
   let methodologyname = faker.internet.userName()
   const requestBody= constants.mainAdmin
   const requestBody1= {
        "code":1,
        "description": "loreum epsom",
        "name": methodologyname,
        "visibility": constants.publicVisibility
       
      }
      const requestBody2= {
        "code":1 ,
        "description": "loreum epsom",
        "name": methodologyname,
        "visibility": constants.protectedVisibility
       
      }
      const requestBody3= {
        "code": 1,
        "description": "loreum epsom",
        "name": methodologyname,
        "visibility": constants.privateVisibility
       
      }
    beforeEach("Login as main", ()=>{
        login(requestBody).then((response)=>{
        expect(response.status).to.eq(200);
        cy.log(response.body);
        const cookies = response.headers['set-cookie'];
        //const sessionCookie = getSessionValue(cookies, 'session');

        })
    })
    it("Testing create public methodologies for Main Admin ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody1,
               
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    it("Testing create protected methodologies for Main Admin ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody2,
               
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(400)
              cy.log(response.body)
        }

        )
    }
    )
    it("Testing create private methodologies for Main Admin ",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody3,
               
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(201)
        }

        )
    }
    )
    


})

//
//
//
// Testing create methodologies for Firm Admin
describe('Testing create methodologies for Firm Admin', ()=>{
    let methodologyname = faker.internet.userName()
    const requestBody= constants.firmAdmin
    const requestBody1= {
         "code":1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.publicVisibility
        
       }
       const requestBody2= {
         "code":1 ,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody3= {
         "code": 1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.privateVisibility
        
       }
     beforeEach("Login as firm", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it("Testing create public methodologies for firm Admin ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody1,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for firm Admin ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody2,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
               cy.log(response.body)
         }
 
         )
     }
     )
     it("Testing create private methodologies for firm Admin ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody3,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
         }
 
         )
     }
     )
     
 
 
 })

 //
//
//
// Testing create methodologies for Client Admin
describe('Testing create methodologies for Client Admin', ()=>{
    let methodologyname = faker.internet.userName()
    const requestBody= constants.clientAdmin
    const requestBody1= {
         "code":1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.publicVisibility
        
       }
       const requestBody2= {
         "code":1 ,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody3= {
         "code": 1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.privateVisibility
        
       }
     beforeEach("Login as client", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it("Testing create public methodologies for client Admin ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody1,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for client Admin ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody2,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
               cy.log(response.body)
         }
 
         )
     }
     )
     it("Testing create private methodologies for client Admin ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody3,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
         }
 
         )
     }
     )
     
 
 
 })

 
 //
//
//
// Testing create methodologies for firm User
describe('Testing create methodologies for firm User', ()=>{
    let methodologyname = faker.internet.userName()
    const requestBody= constants.firmUser
    const requestBody1= {
         "code":1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.publicVisibility
        
       }
       const requestBody2= {
         "code":1 ,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody3= {
         "code": 1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.privateVisibility
        
       }
     beforeEach("Login as firm user", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it("Testing create public methodologies for firm User ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody1,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for firm user ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody2,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
               cy.log(response.body)
         }
 
         )
     }
     )
     it("Testing create private methodologies for firm user ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody3,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
         }
 
         )
     }
     )
     
 
 
 })
 

 
 //
//
//
// Testing create methodologies for main User
describe('Testing create methodologies for main User', ()=>{
    let methodologyname = faker.internet.userName()
    const requestBody= constants.mainUser
    const requestBody1= {
         "code":1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.publicVisibility
        
       }
       const requestBody2= {
         "code":1 ,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody3= {
         "code": 1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.privateVisibility
        
       }
     beforeEach("Login as main user", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it("Testing create public methodologies for main User ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody1,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for main user ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody2,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
               cy.log(response.body)
         }
 
         )
     }
     )
     it("Testing create private methodologies for main user ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody3,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
         }
 
         )
     }
     )
     
 
 
 })
 

 //
//
//
// Testing create methodologies for client User
describe('Testing create methodologies for client User', ()=>{
    let methodologyname = faker.internet.userName()
    const requestBody= constants.clientUser
    const requestBody1= {
         "code":1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.publicVisibility
        
       }
       const requestBody2= {
         "code":1 ,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody3= {
         "code": 1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.privateVisibility
        
       }
     beforeEach("Login as client user", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it("Testing create public methodologies for client User ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody1,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for client user ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody2,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
               cy.log(response.body)
         }
 
         )
     }
     )
     it("Testing create private methodologies for client user ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody3,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(201)
         }
 
         )
     }
     )
     
 
 
 })

 //
//
//
// Testing create methodologies for firm Admin
describe('Testing create methodologies for firm Admin', ()=>{
    let methodologyname = faker.internet.userName()
    const requestBody= constants.firmAdmin
    const requestBody1= {
         "code":1,
         "description": "loreum epsom",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody2= {
         "code":1 ,
         "description": "3",
         "name": methodologyname,
         "visibility": constants.protectedVisibility
        
       }
       const requestBody3= {
         "code": 1,
         "description": "loreum epsom",
         "name": " ",
         "visibility": constants.privateVisibility
        
       }
       const requestBody4= {
        "code": 1,
        "description": "loreum epsom",
        "name": " ",
        "visibility": " "
       
      }
     beforeEach("Login as firm", ()=>{
         login(requestBody).then((response)=>{
         expect(response.status).to.eq(200);
         cy.log(response.body);
         const cookies = response.headers['set-cookie'];
         //const sessionCookie = getSessionValue(cookies, 'session');
 
         })
     })
     it("Testing create protected methodologies for firm Admin with invalid code input type and length ",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody1,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for firm Admin with invalid description input type and length",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody2,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
               cy.log(response.body)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for firm Admin with invalid name input type and length",()=>{
         cy.request(
             {
                 method: 'POST',
                 url: constants.url+constants.createmethodology,
                 failOnStatusCode: false,
                 body:requestBody3,
                
                 
             }
         ).then((response)=>{
               expect(response.status).to.eq(400)
         }
 
         )
     }
     )
     it("Testing create protected methodologies for firm Admin with invalid visibility",()=>{
        cy.request(
            {
                method: 'POST',
                url: constants.url+constants.createmethodology,
                failOnStatusCode: false,
                body:requestBody4,
               
                
            }
        ).then((response)=>{
              expect(response.status).to.eq(500)
              cy.log(response.body)
        }

        )
    }
    )
 
 
 })

 