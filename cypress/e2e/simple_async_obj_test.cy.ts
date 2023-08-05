interface Credentials {
  username: string
  password: string
}

describe('Async Function Test', () => {
  it('should call an async function with an object argument using cy.wrap().then()', () => {
    // Define your async function here
    const asyncFunction = async (
      obj: Credentials,
    ): Promise<string> => {
      // Simulate an async operation, e.g., processing an object
      return new Promise((resolve) => {
        const result = `Processed: ${obj.username} - ${obj.password}`
        resolve(result)
      })
    }

    // Create an object to pass as an argument
    const Credentials: Credentials = {
      username: 'admin',
      password: 'admin',
    }

    // Call the async function using cy.wrap().then()
    cy.wrap(null).then(async () => {
      // Call the async function with the object argument using await
      const result = await asyncFunction(Credentials)

      // You can perform assertions on the result
      expect(result).to.equal('Processed: admin - admin')
    })
  })
})
