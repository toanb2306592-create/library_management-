import createApiClient from "./api.service";


class EmployeeService {
  constructor(baseUrl = "/api/employees") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }
}

export default new EmployeeService();