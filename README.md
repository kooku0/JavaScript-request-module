쓸모없는 짓인지 일단 확인중...
며칠 뒤 삭제 가능성 65%

```javascript
import HttpRequestHeader from './http-request-header'
import HttpRequestBody from './http-request-body'

export type THttpMethod = 'POST' | 'GET' | 'DELETE' | 'UPDATE'

class HttpRequest {
  private method: THttpMethod
  private header: HttpRequestHeader
  private body: HttpRequestBody
  private url: string
  private xhttp: XMLHttpRequest

  constructor(url: string, httpMethod?: THttpMethod) {
    this.url = url
    this.method = httpMethod || 'GET'
    this.header = new HttpRequestHeader()
    this.body = new HttpRequestBody()
    this.xhttp = new XMLHttpRequest()
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
  public setBody(key: string, value: Object | string) {
    this.body.setBody(key, value)
  }
  public sendData() {
    this.xhttp.open(this.method, this.url, true)
  }
}

export default HttpRequest
```
