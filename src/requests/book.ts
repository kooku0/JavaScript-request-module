import HttpRequest from 'src/http-request'

export const getBooks = async () => {
  const request = new HttpRequest('http://localhost:4000', 'GET')
  request.setErrorHandler(alert)
  console.log('보내기 전')
  const response = await request.sendData()
  console.log(response)
  console.log('보낸 후')
}

export const postBook = () => {
  const request = new HttpRequest('http://localhost:4000', 'POST')
  request.setBody('books', { book1: 'b1', book2: 'b2' })
  request.sendData()
}

function alert(statusCode: number) {
  console.log(`error ${statusCode}`)
}
