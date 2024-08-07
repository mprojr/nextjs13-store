import { MongoClient } from 'mongodb';

const username = encodeURIComponent(process.env.MONGODB_USER);
const password = encodeURIComponent(process.env.MONGODB_PASS);
const cluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DB;

const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${dbName}`;

console.log('MongoDB URI:', uri);

const client = new MongoClient(uri);

let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    console.log('Connecting to MongoDB in development environment...');
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log('Connecting to MongoDB in production environment...');
  clientPromise = client.connect();
}

clientPromise.then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

export default clientPromise;
