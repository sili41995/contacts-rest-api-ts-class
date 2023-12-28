class ApiResponse<T> {
  constructor(
    public success: boolean,
    public data: T,
    public message?: string
  ) {}
}

export default ApiResponse;
