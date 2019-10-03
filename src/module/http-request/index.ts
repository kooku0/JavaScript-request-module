import HttpRequestBody from './http-request-body'
import HttpRequestHeader from './http-request-header'

type THttpMethod = 'POST' | 'GET' | 'DELETE' | 'UPDATE'
interface IOptions {
  headers?: Object
  params?: Object
  body?: Object
}

class HttpRequest {
  private method: THttpMethod
  private header: HttpRequestHeader
  private body: HttpRequestBody
  private url: string
  private xhttp: XMLHttpRequest
  private errorHandler: Function | null
  private baseUrl: string
  private query: string

  constructor(
    requestUrl: string,
    httpMethod: THttpMethod,
    options?: IOptions,
    errorFunction?: Function,
  ) {
    this.baseUrl =
      process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'http://google.com'
    this.url = requestUrl
    this.method = httpMethod
    this.setOptions(options)
    this.xhttp = new XMLHttpRequest()
    this.errorHandler = errorFunction || null
  }
  private setOptions(options?: Object) {
    if (options) {
      this.header = new HttpRequestHeader(options['headers'])
      this.body = new HttpRequestBody(options['body'])
      const params = options['params']
      this.query = params ? this.parseParams(params) : ''
    } else {
      this.header = new HttpRequestHeader()
      this.body = new HttpRequestBody()
      this.query = ''
    }
  }
  private parseParams(params: Object) {
    const queryString = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
    return '?' + queryString
  }
  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl
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
  public setErrorHandler(errorHandler: Function) {
    this.errorHandler = errorHandler
  }
  private setHeaderAtXMLHttpRequest() {
    this.xhttp.setRequestHeader('Content-Type', 'application/json')
    const headers = this.header.getHeader()
    for (let key in headers) {
      this.xhttp.setRequestHeader(key, headers[key])
    }
  }
  private requestCallBack(resolve: any, reject: any) {
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
  }
  public sendData(): Promise<JSON | Error | undefined | null> {
    const { xhttp, method, baseUrl, url, body, query } = this
    xhttp.open(method, baseUrl + url + query, true)
    this.setHeaderAtXMLHttpRequest()
    return new Promise((resolve, reject) => {
      xhttp.send(body.getBody())
      this.requestCallBack(resolve, reject)
    })
  }
}

export default HttpRequest
