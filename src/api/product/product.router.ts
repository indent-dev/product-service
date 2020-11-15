import { Router } from 'express'
import ProductController from './product.controller'

const productRouter = Router()
const productController = new ProductController()
const baseUrl = '/product'

productRouter.get(
    `${baseUrl}`,
    productController.index
)

productRouter.post(
    `${baseUrl}`,
    productController.store
)

productRouter.put(
    `${baseUrl}/:id?`,
    productController.edit
)

productRouter.delete(
    `${baseUrl}/:id?`,
    productController.delete
)

export default productRouter