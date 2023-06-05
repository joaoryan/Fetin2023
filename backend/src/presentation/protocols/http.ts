export type HttpResponse <B = any> = {
    statusCode: number,
    body: B,
    download?: string
}

type Content = {
    body?: any
    query?: any
    headers?: any
    params?: any
}
export type HttpRequest <T = Content> = T
