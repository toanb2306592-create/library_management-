// services/book.service.js
const BookModel = require("../models/book.model");

class BookService {
  async getAll(filter) {
    return await BookModel.findAll(filter);
  }

  async getById(id) {
    return await BookModel.findById(id);
  }

  async create(data) {
    return await BookModel.create(data);
  }

  async update(id, data) {
    return await BookModel.update(id, data);
  }

  async delete(id) {
    return await BookModel.delete(id);
  }
}

module.exports = BookService;
