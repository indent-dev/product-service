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
    ? await mongoMemoryServer.getUri()
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
  let category1 = await categoryModel.create({
    name: 'ATK',
    isDeleted: false
  })
  let category2 = await categoryModel.create({
    name: 'pakaian muslim',
    isDeleted: false
  })

  await productModel.create({
    product_name: 'pensil',
    category: category1._id,
    description: 'Pensil digunakan untuk menulis dan juga menggambar.',
    image: 'https://static.bmdstatic.com/pk/product/medium/5f19476e40c98.jpg',
    price: 5000,    
  })

  await productModel.create({
    product_name: 'sarung',
    category: category2._id,
    description: 'sarung digunakan untuk sholat',
    image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/18/63021111/63021111_31abdd49-cb2b-452d-8b53-b987c109c35b_700_700',
    price: 250000,
  })
}
