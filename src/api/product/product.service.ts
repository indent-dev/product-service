import HttpException from "../../utils/httpException";
import productModel, { ProductDocument } from "./product.model";
import { Product } from "./product.type";

export default class ProductService {
    getAllProduct() {
        return new Promise<ProductDocument[]> (async (resolve, reject) => {
            try {
                const getProducts = productModel.find({})
                if (getProducts) resolve(getProducts)
                else throw new HttpException(409, 'Product Not Found') 
            } catch (error) {
                reject(error)
            }
        })
    }
