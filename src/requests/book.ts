import HttpRequest from 'src/http-request'

export const getBooks = async () => {
  const request = new HttpRequest('http://localhost:4000/d', 'GET')
  request.setErrorHandler(alert)
  const response = await request.sendData()
  console.log(response)
}

export const postBook = () => {
  const request = new HttpRequest('http://localhost:4000', 'POST')
  request.setBody('books', { book1: 'b1', book2: 'b2' })
  request.sendData()
}

function alert(statusCode: number) {
  console.log(statusCode)
}
