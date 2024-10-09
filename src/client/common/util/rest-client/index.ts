import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/",
      timeout: 5000,
      headers: {
        "x-custom-header": "fetch",
      },
    });
  }
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async get(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.axiosInstance.get(endpoint, config);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  public async post<T extends {}>(
    endpoint: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.axiosInstance.post(endpoint, data, config);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  public async put<T extends {}>(
    endpoint: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.axiosInstance.put(endpoint, data, config);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  public async delete<T extends {}>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.axiosInstance.delete(endpoint, config);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export const apiClient = ApiClient.getInstance();
