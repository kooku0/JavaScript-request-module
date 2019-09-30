class HttpRequestBody {
  private body: object
  public setBody(key: string, value: object | string) {
    this.body[key] = value
  }
}

export default HttpRequestBody
