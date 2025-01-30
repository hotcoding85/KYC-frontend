class ApiClient {
  constructor(headers = {}) {
    this.baseURL =
      process.env.NEXT_PUBLIC_NESTJS_API_URL || "https://api.thirteenx.ai";
    this.headers = headers;
  }

  async request(endpoint, method = "GET", data = null, customHeaders = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const options = {
      method: method.toUpperCase(), 
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
        ...customHeaders,
      },
      credentials: "include",
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const ipAddress = await fetch(`${process.env.NEXT_PUBLIC_NEXTJS_URL}/api/ip`).then((res) => res.json()) ;

      options.headers["X-Forwarded-For"] = ipAddress?.ip || 'unknown';
      const response = await fetch(url, options);

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData; 
      }

      return await response.json();
    } catch (error) {
      console.error("Error making API request:", error);
      throw error; 
    }
  }

  get(endpoint, customHeaders = {}) {
    return this.request(endpoint, "GET", null, customHeaders);
  }

  post(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "POST", data, customHeaders);
  }

  put(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "PUT", data, customHeaders);
  }

  delete(endpoint, customHeaders = {}) {
    return this.request(endpoint, "DELETE", null, customHeaders);
  }
}

export default ApiClient;
