import HttpRequest from 'src/http-request'

export const getBooks = async () => {
  const request = new HttpRequest('/', 'GET', {
    params: { name: 'hello' },
    headers: { Authentication: 'token' },
  })
  request.setErrorHandler(alert)
  const response = await request.sendData()
  console.log(response)
}

export const postBook = async () => {
  const request = new HttpRequest('/', 'POST', { body: { b1: 'book1' } })
  request.setErrorHandler(alert)
  const response = await request.sendData()
  console.log(response)
}

function alert(statusCode: number) {
  console.log(`error ${statusCode}`)
}
