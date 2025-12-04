// app/services/publisher.service.js
const { ObjectId } = require("mongodb");

class PublisherService {
  constructor(client) {
    this.Publisher = client.db("libraryDB").collection("publishers");
  }

  async find(filter = {}) {
    return await this.Publisher.find(filter).toArray();
  }

  async findById(id) {
    return await this.Publisher.findOne({ _id: new ObjectId(id) });
  }

  async create(data) {
    const result = await this.Publisher.insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async update(id, data) {
    const result = await this.Publisher.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result.modifiedCount > 0;
  }

  async delete(id) {
    const result = await this.Publisher.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async deleteAll() {
    const result = await this.Publisher.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = PublisherService;
