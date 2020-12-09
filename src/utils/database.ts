require('dotenv').config()
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import categoryModel from '../api/category/category.model'
import productModel from "../api/product/product.model"

const mongoMemoryServer = new MongoMemoryServer()
const { CONNECTION_STRING } = process.env
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

async function getConnectionString(isUsingMemory?: boolean) {
  return isUsingMemory
    ? await mongoMemoryServer.getConnectionString()
    : `${CONNECTION_STRING}`
}

export async function connectDB(isUsingMemory?: boolean) {
  const connectionString = await getConnectionString(isUsingMemory)
  return mongoose.connect(connectionString, options)
}

mongoose.connection.on('error', function (error) {
  console.error('database connection error:', error)
})

mongoose.connection.once('open', function () {
  console.log('Database connected to:', getConnectionString(false))
})

export async function clearDB() {
  return await mongoose.connection.db.dropDatabase()
}

export async function closeDB(isUsingMemory?: boolean) {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()

  if (isUsingMemory) await mongoMemoryServer.stop()
}

export async function mockingDatabaseRecord() {
  let category = await categoryModel.create({
    name: 'ATK',
    isDeleted: false
  })
  await categoryModel.create({
    name: 'pakaian muslim',
    isDeleted: false
  })

  await productModel.create({
    product_name: 'Pensil',
    category: category._id,
    image: 'http://google.com',
    price: 5000,    
  })
}
