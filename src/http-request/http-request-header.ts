class HttpRequestHeader {
  private header: object

  public getHeader() {
    return this
  }

  public setHeader(key: string, value: string) {
    this.header[key] = value
  }
}

export default HttpRequestHeader
