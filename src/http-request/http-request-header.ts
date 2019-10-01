class HttpRequestHeader {
  private header: object

  constructor(headers?: Object) {
    this.header = { ...headers }
  }

  public getHeader() {
    return this.header
  }

  public setHeader(key: string, value: string) {
    this.header[key] = value
  }
}

export default HttpRequestHeader
