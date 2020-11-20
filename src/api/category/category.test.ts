require('dotenv').config()
import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../app'

import {
  connectDB,
  closeDB,
  mockingDatabaseRecord,
  clearDB,
} from '../../utils/database'

const request = supertest(app)

describe('category', () => {
  beforeAll(async () => await connectDB(true))

  beforeEach(async () => {
    await clearDB()
    await mockingDatabaseRecord()
  })

  afterAll(async () => await closeDB(true))

  it('can get all category', async () => {
    const getAllCategoryResponse = await request.get('/category')
    expect(getAllCategoryResponse.body).to.have.length(2)
  })

  // it('can seacrh category by name', async() => {
  //   const getAllCategoryResponse = await request.get('/category?name=ATK')
  //   expect(getAllCategoryResponse.body).to.have.length(1);
  //   expect(getAllCategoryResponse.body[0]).to.deep.include({
  //     name: "ATK"
  //   })
  // })

  it('can create category', async() => {
    const createCategoryresponse = await request.post('/category').send({name: "headphone"})
    expect(createCategoryresponse.body).to.has.property('_id')
    expect(createCategoryresponse.body).to.deep.include({
      name: "headphone"
    })

    const getAllCategoryResponse = await request.get('/category')
    expect(getAllCategoryResponse.body).to.have.length(3)
  })

  it('can edit category', async() => {
    const getAllCategoryResponse = await request.get('/category').send()
    const categoryId = getAllCategoryResponse.body[0]._id

    const editCategoryResponse = await request.put(`/category/${categoryId}`).send({name: "dekorasi rumah"})
    expect(editCategoryResponse.body).to.has.property('_id')
    expect(editCategoryResponse.body).to.deep.include({
      name: "dekorasi rumah"
    })
  })

  it('can check duplicate category name', async() => {
    const createCategoryresponse = await request.post('/category').send({
      name: "ATK"
    })

    expect(createCategoryresponse.body).to.deep.equal({
      isSuccess: false,
      statusCode: 409,
      message: "category name already exist"
    })
  })
})
