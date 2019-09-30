class HttpRequestBody {
  private body: Object
  constructor() {}
  public setBody(key: string, value: Object | string) {
    this.body[key] = value
  }
}

export default HttpRequestBody
