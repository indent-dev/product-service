import { Request, Response, NextFunction } from "express";
import HttpException from "../../utils/httpException";
import ProductService from "./product.service";

const productService = new ProductService()

export default class ProductController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.getAllProduct()
            res.send(products)            
        } catch (error) {
            next(new HttpException(error.statusCode || 500, error.message))
        }
    }
}