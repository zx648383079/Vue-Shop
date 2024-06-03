

export interface IHttpClient {
    get<T>(url: string, params?: any): Promise<T>;
    post<T>(url: string, data?: any): Promise<T>;
    put<T>(url: string, data?: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
    patch<T>(url: string, data?: any): Promise<T>;
    upload<T>(url: string, file: File, name?: string): Promise<T>;
}