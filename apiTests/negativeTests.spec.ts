import {test, expect} from '@playwright/test'

test.describe.parallel('Negative API tests', async () => {

//Negative tests for user retrieval, creation, update and deletion
    test('Attempt to retrieve a non-existent user', async ({request}) => {
        const response = await request.get('https://reqres.in/api/users/100000000')
        expect(response.status()).toBe(404)
    })

    //Negative tests for resource retrieval

    test('Attempt to retrieve a non-existent resource', async ({request}) => {
        const response = await request.get('https://reqres.in/api/unknown/676434')
        expect(response.status()).toBe(404)
    })

    //Negative tests for registration

    test('Attempt to register with an invalid email address', async ({request}) => {
        const response = await request.post('https://reqres.in/api/register', {
            data: {
                email: "test.com",
                password: "test1"
            }
        })
        expect (response.status()).toBe(400)
    })

    test('Attempt to register with an valid email addres but empty password', async ({request}) => {
        const response = await request.post('https://reqres.in/api/register', {
            data: {
                email: "eve.holt@reqres.in",
                password: ""
            }
        })
        expect (response.status()).toBe(400)
    })

    test('Attempt to register with an empty email addres and valid password', async ({request}) => {
        const response = await request.post('https://reqres.in/api/register', {
            data: {
                email: "",
                password: "cityslicka"
            }
        })
        expect (response.status()).toBe(400)
    })

    //Negative tests for login

    test('Attempt to login with a non-existent account', async ({request}) => {
        const response = await request.post('https://reqres.in/api/login', {
          
            data: {
              email: "test@test.com",
              password: "testing1234"
            }
        })
        expect(response.status()).toBe(400)
      })
})