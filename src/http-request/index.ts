import HttpRequestBody from './http-request-body'
import HttpRequestHeader from './http-request-header'

export type THttpMethod = 'POST' | 'GET' | 'DELETE' | 'UPDATE'

class HttpRequest {
  private method: THttpMethod
  private header: HttpRequestHeader
  private body: HttpRequestBody
  private url: string
  private xhttp: XMLHttpRequest
  private errorHandler: Function | null

  constructor(url: string, httpMethod?: THttpMethod) {
    this.url = url
    this.method = httpMethod || 'GET'
    this.header = new HttpRequestHeader()
    this.body = new HttpRequestBody()
    this.xhttp = new XMLHttpRequest()
    this.errorHandler = null
  }
  set httpMethod(httpRequestMethod: THttpMethod) {
    this.method = httpRequestMethod
  }
  get httpMethod(): THttpMethod {
    return this.method
  }
  set requestUrl(url: string) {
    this.url = url
  }
  get requestUrl(): string {
    return this.url
  }
  public setHeader(key: string, value: string) {
    this.header.setHeader(key, value)
  }
  public setBody(key: string, value: object | string) {
    this.body.setBody(key, value)
  }
  public setErrorHandler(errorHandler: any) {
    this.errorHandler = errorHandler
  }
  public sendData() {
    return new Promise((resolve, reject) => {
      this.xhttp.open(this.method, this.url, true)
      this.xhttp.send()
      this.xhttp.onreadystatechange = () => {
        const { readyState, status, response } = this.xhttp
        if (readyState === XMLHttpRequest.DONE) {
          if (status === 200) {
            resolve(response)
          } else {
            this.errorHandler ? this.errorHandler(status) : null
            reject('Promise Error')
          }
        }
      }
    })
  }
}

export default HttpRequest
