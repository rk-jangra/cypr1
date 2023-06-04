describe('Katalon Demo Cura', () => {
  const auth_token = 'Bearer b4b2d9241ca023cd14512d13e8419ace2256c0d52f7f20522227cefb91f06fb0'
  
  it('api chaining', () => {
    // creaet a new user
    
    cy.request({
        method:'POST',
        url: 'https://gorest.co.in/public/v2/users/',
        body: {
          name:'Joe',
          gender: 'male',
          email: Math.random().toString(5).substring(2)+"@testmail.com",
          status: 'active'
      },
      headers: {
          Authorization: auth_token
      }
    }).then((response)=>{
        expect(response.status).to.equal(201)
        const userId = response.body.id
        // update the user's name
        cy.request({
          method:'PUT',
          url: `https://gorest.co.in/public/v2/users/${userId}`,
          body: {
            name:'Scott',
            gender: 'male',
            email: Math.random().toString(5).substring(2)+"@testmail.com",
            status: 'active'
          },
          headers: {
              Authorization: auth_token
          }
        }).then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal('Scott')
            // delete resource
            cy.request({
              method: 'DELETE',
              url: `https://gorest.co.in/public/v2/users/${userId}`,
              headers: {
                Authorization: auth_token
              }
            }).then((response)=>{
              expect(response.status).to.equal(204)
            })

        })
    })
  })
})
