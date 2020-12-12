require('dotenv').config()
import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../app'

import {
    connectDB,
    closeDB,
    mockingDatabaseRecord,
    clearDB
} from '../../utils/database'

const request = supertest(app);

describe('product', () => {
    beforeAll(async () => await connectDB(true))

    beforeEach(async () => {
        await clearDB()
        await mockingDatabaseRecord()
    })

    afterAll(async () => await closeDB(true))

    // it('can get product by name', async () => {
    //     const getProductByName = await request.get(
    //         '/product?product_name=pensil'
    //     )
    //     expect(getProductByName.body).to.have.length(1);
    // })

    it('can get all product', async () => {
        const getAllProduct = await request.get('/product')
        expect(getAllProduct.body).to.have.length(2)
    })

    it('can create product', async () => {
        const getAllCategory = await request.get('/category')
        expect(getAllCategory.body[0]).to.has.property('_id')
        const categoryId = getAllCategory.body[0]._id

        const createProductResponse = await request.post('/product').send({
            product_name: 'mukena',
            category: `${categoryId}`,
            description: 'mukena digunakan untuk sholat',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dOYJtE15_3XOPXO1VA9KzaNGCKy_E2DT1Q&usqp=CAU',
            price: 260000,
        })
        expect(createProductResponse.body).to.has.property('_id')
        expect(createProductResponse.body).to.deep.include({
            product_name: 'mukena',
            category: `${categoryId}`,
            description: 'mukena digunakan untuk sholat',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dOYJtE15_3XOPXO1VA9KzaNGCKy_E2DT1Q&usqp=CAU',
            price: 260000,
        })
    })

    // check edit product masih belum

    it('can delete product', async () => {
        const getAllProduct = await request.get('/product')
        expect(getAllProduct.body[0]).to.has.property('_id')
        const productId = getAllProduct.body[0]._id

        const deleteProduct = await request.delete(`/product/${productId}`)
        expect(deleteProduct.body).to.deep.include({
            _id: `${productId}`,
            isDeleted: true
        })

        const getAllProductVerifyResponse = await request.get('/product');
        expect(getAllProductVerifyResponse.body[0])
            .to.has.property('_id')
            .but.not.equal(`${productId}`)
    })
})