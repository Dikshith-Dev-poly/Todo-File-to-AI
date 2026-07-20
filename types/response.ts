interface ApiSuccess<T = unknown> {
    success: true,
    message: string
    data?: T
}


interface ApiError {
    success: false,
    message: string
}


export type ApiResponse = ApiSuccess | ApiError;