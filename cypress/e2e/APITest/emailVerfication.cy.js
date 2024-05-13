/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import * as constants from "../../constants";
const { recurse } = require('cypress-recurse')

describe('Email confirmation', () => {
   
 let userName=faker.internet.userName()
 let userPass= "1Hibir1Test!"
 const Email="hibirqatest@gmail.com"
 let tempUserEmail
 let userEmail
  beforeEach(() => {
    recurse(
      () => cy.task("createTestEmail"),
      Cypress._.isObject, // keep retrying until the task returns an object
      {
        log: true,
        timeout: 20000, // retry up to 20 seconds
        delay: 5000, // wait 5 seconds between attempts
        error: "Could not create test email"
      }
    ).then((testAccount) => {
      
      userEmail = testAccount.user
      userPass = testAccount.pass
      cy.log(`Email account created - (for debugging purposes): ${userEmail}`)
      cy.log(`Email account password - (for debugging purposes): ${userPass}`)
    })
  })

  it('Fill in signup form and validate confirmation email is received', () => {
    const requestBody1= 
    {
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: userEmail,
                name: userEmail,
                phone: "251911121314"
    
    }
    cy.request(
      {
          method: 'Post',
          url: constants.url+constants.createOrg,
          failOnStatusCode: false,
          body: requestBody1
      }
  ).then((response)=>{
      
       // expect(response.status).to.eq(200)
   

  }

  )
    //cy.visit("/signup/email").pause()
    //cy.get("#email").type(userEmail)
    //cy.get("[type=password]").type(userPass)
    //cy.get("button[type=submit]").click()

    //cy.log("**redirects to /confirm**")
    //cy.location("pathname").should("equal", "/verify")

    // retry fetching the email
    recurse(
      () => cy.task("getLastEmail", { user: userEmail, pass: userPass }), // Cypress commands to retry
      Cypress._.isObject, // keep retrying until the task returns an object
      {
        log: true,
        timeout: 30000, // retry up to 30 seconds
        delay: 5000, // wait 5 seconds between attempts
        error: "Messages Not Found"
      }
    ).then((message) => {
      cy.task("parseEmail", { message })
        .its("html")
        .then((html) => {
          cy.document().then(document => {
            document.body.innerHTML = html;
          });
        })
    })

    cy.log("**Email message content validation**")
    cy.get("h1")
    cy.get('input[name="hiddenToken"]');
   
  })

 
})