class HttpRequestBody {
  private body: object

  constructor(body?: object) {
    this.body = { ...body }
  }

  public setBody(key: string, value: object | string) {
    this.body[key] = value
  }

  public getBody(): string {
    return JSON.stringify(this.body)
  }
}

export default HttpRequestBody
