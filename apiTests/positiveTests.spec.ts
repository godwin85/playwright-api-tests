import {test, expect} from '@playwright/test'

test.describe.parallel ('API testing', () => {
  
  //API tests covering retieval, creation, update and deletion of users

  test('Successful user list retrieval', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users?page=1")
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.page).toBe(1)
    expect(responseBody.per_page).toBe(6)
    expect(responseBody.data.map(e => e.id)).toContain(1)
    expect(responseBody.data.map(e => e.first_name)).toContain('Janet')
    expect(responseBody.data.map(e => e.last_name)).toContain('Weaver')
    expect(responseBody.data.map(e => e.id)).toContain(2)
    expect(responseBody.data.map(e => e.id)).toContain(3)
    expect(responseBody.data.map(e => e.id)).toContain(4)
    expect(responseBody.data.map(e => e.id)).toContain(5)
    expect(responseBody.data.map(e => e.id)).toContain(6)
    expect(responseBody.data.map(e => e.id)).not.toContain(7)
    expect(responseBody.support.url).toBeTruthy
    expect(responseBody.support.text).toBe("To keep ReqRes free, contributions towards server costs are appreciated!")
  })

  test('Successful user list retrieval after 3 second delay', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users?delay=3")
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.page).toBe(1)
    expect(responseBody.per_page).toBe(6)
    expect(responseBody.data.map(e => e.id)).toContain(1)
    expect(responseBody.data.map(e => e.first_name)).toContain('Janet')
    expect(responseBody.data.map(e => e.last_name)).toContain('Weaver')
    expect(responseBody.data.map(e => e.id)).toContain(2)
    expect(responseBody.data.map(e => e.id)).toContain(3)
    expect(responseBody.data.map(e => e.id)).toContain(4)
    expect(responseBody.data.map(e => e.id)).toContain(5)
    expect(responseBody.data.map(e => e.id)).toContain(6)
    expect(responseBody.data.map(e => e.id)).not.toContain(7)
    expect(responseBody.support.url).toBeTruthy
    expect(responseBody.support.text).toBe("To keep ReqRes free, contributions towards server costs are appreciated!")
  })


  test('Create a user', async ({request}) => {
    const response = await request.post('https://reqres.in/api/user',{
      data:{
        id: 1000,
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBe(1000);
    expect(responseBody.createdAt).toBeTruthy;
  })

  test('Update a user using PUT', async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'new name',
        job: 'new job'
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect (responseBody.name).toBe('new name')
    expect (responseBody.job).toBe('new job')
  })

  test('Update a user using PATCH', async ({request}) => {
    const response = await request.patch('https://reqres.in/api/users/2', {
      data: {
        name: 'new name1',
        job: 'new job1'
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect (responseBody.name).toBe('new name1')
    expect (responseBody.job).toBe('new job1')
  })

  test('Delete a user', async ({request}) => {
    const deletion = await request.delete('https://reqres.in/api/users/1000')
    const response = await request.get('https://reqres.in/api/users/1000')
    expect(deletion.status()).toBe(204)
    expect(response.status()).toBe(404)
  })
  

  //API tests covering the retrieval of resources

  test('Successful single user retrieval', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users/2")
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.support.url).toBeTruthy
  })

  test('Successful single resource retrieval', async ({request}) => {
    const response = await request.get('https://reqres.in/api/unknown/2')
    const responseBody = await JSON.parse(await response.text());
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.name).toBe('fuchsia rose')
    expect(responseBody.data.year).toBe(2001)
    expect(responseBody.data.color).toBe('#C74375')
    expect(responseBody.data.pantone_value).toBe('17-2031')
    expect(responseBody.data.url).toBeTruthy
  })

  //API test covering successful registration

  test('Successful Registration', async ({request}) => {
    const response = await request.post('https://reqres.in/api/register', {
      
        data: {
          email: "eve.holt@reqres.in",
          password: "cityslicka"
        }
    })
    const responseBody = await JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBeTruthy
    expect(responseBody.token).toBeTruthy
  })

  //API test covering successful login

  test('Successful Login', async ({request}) => {
    const response = await request.post('https://reqres.in/api/login', {
      
        data: {
          email: "eve.holt@reqres.in",
          password: "cityslicka"
        }
    })
    const responseBody = await JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy
  })

})