/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment.js'
// require('dotenv').config()
let trelloDbInstance = null

// Function to get the MongoDB client instance
const mongoClientInstace = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    await mongoClientInstace.connect();
    trelloDbInstance = mongoClientInstace.db(env.DATABASE_NAME)
}
export const GET_DB = () => {
    if (!trelloDbInstance) {
        throw new Error('Database not connected. Please call CONNECT_DB first.');
    }
    return trelloDbInstance;
}
export const CLOSE_DB = async () => {
    console.log('Closing MongoDB connection...');
    await mongoClientInstace.close();

}
