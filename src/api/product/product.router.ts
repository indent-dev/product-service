import { Router } from 'express'
import ProductController from './product.controller'

const productRouter = Router()
const productController = new ProductController()
const baseUrl = '/product'

productRouter.get(
    `${baseUrl}`,
    productController.index
)
export default productRouter