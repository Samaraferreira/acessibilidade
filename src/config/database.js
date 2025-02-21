import { EventEmitter } from 'events';

// In-memory database mock
class InMemoryDB {
  constructor() {
    this.collections = new Map();
    this.events = new EventEmitter();
  }

  collection(name) {
    if (!this.collections.has(name)) {
      this.collections.set(name, []);
    }
    return new InMemoryCollection(this.collections.get(name), this.events);
  }
}

class InMemoryCollection {
  constructor(data, events) {
    this.data = data;
    this.events = events;
  }

  find(query = {}) {
    // Return a copy of the data that matches the query
    const matchingData = [...this.data];
    
    return {
      sort: (sortObj) => {
        if (sortObj) {
          const [field, order] = Object.entries(sortObj)[0];
          matchingData.sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];
            if (order === 1) {
              return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
          });
        }
        return {
          toArray: () => Promise.resolve(matchingData)
        };
      },
      toArray: () => Promise.resolve(matchingData)
    };
  }

  async findOne(query) {
    const id = query._id?.toString();
    return Promise.resolve(this.data.find(item => item._id.toString() === id) || null);
  }

  async insertOne(doc) {
    const _id = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newDoc = { ...doc, _id };
    this.data.push(newDoc);
    this.events.emit('insert', newDoc);
    return Promise.resolve({ insertedId: _id, acknowledged: true });
  }

  async updateOne(query, update) {
    const id = query._id?.toString();
    const index = this.data.findIndex(item => item._id.toString() === id);
    if (index === -1) {
      return Promise.resolve({ matchedCount: 0, modifiedCount: 0, acknowledged: true });
    }

    const updateSet = update.$set || {};
    this.data[index] = { ...this.data[index], ...updateSet };
    this.events.emit('update', this.data[index]);
    return Promise.resolve({ matchedCount: 1, modifiedCount: 1, acknowledged: true });
  }

  async deleteOne(query) {
    const id = query._id?.toString();
    const index = this.data.findIndex(item => item._id.toString() === id);
    if (index === -1) {
      return Promise.resolve({ deletedCount: 0, acknowledged: true });
    }

    const deleted = this.data.splice(index, 1)[0];
    this.events.emit('delete', deleted);
    return Promise.resolve({ deletedCount: 1, acknowledged: true });
  }
}

// Mock MongoDB client
let db = null;
let isConnected = false;

export async function connectToDatabase() {
  if (!db) {
    db = new InMemoryDB();
    isConnected = true;
    console.log('Connected to mock MongoDB');
  }
  return db;
}

export async function closeConnection() {
  if (isConnected) {
    db = null;
    isConnected = false;
    console.log('Mock MongoDB connection closed');
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

// Mock ObjectId for compatibility
export class ObjectId {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return this.id;
  }
}