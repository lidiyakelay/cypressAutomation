describe("HTTP Request",()=>{

    it.only("GET Call", ()=>{
        cy.request('GET', 'http://192.168.8.170/')
        .its('status')
        .should('equal', 200);
    })

    it("Post Call", ()=>{

      cy.request(
        {
            method:'POST',
            url:'http://172.20.110.233/create-org',
            body:{
                accesstype: "Client",
                address: "addis ababa",
                description: "test test",
                email: "tester34@g.com",
                name: "chaapaa",
                phone: "251911121318"
            }
        }

      )
      .its('status')
      .should('equal',200);

    })
})