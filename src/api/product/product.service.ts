import HttpException from "../../utils/httpException";
import productModel, { ProductDocument } from "./product.model";
import { Product } from "./product.type";

export default class ProductService {

    getProductByName(name: string) {
        return productModel.findOne({ name, isDeleted: false })
    }

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

    createProduct(product: Product) {
        return new Promise(async (resolve, reject) => {
            try {
                const isProductExist = await this.getProductByName(product.product_name)
                if (isProductExist) {
                    throw new HttpException(409, 'Product name already exist');   
                }

                resolve(productModel.create({ ...product }))
            } catch (error) {
                reject(error)
            }
        })
    }

    editProduct(id: string, product: Product) {
        return new Promise(async (resolve, reject) => {
            try {
                const editedProduct = await productModel.findByIdAndUpdate(
                    id,
                    product,
                    {
                      new: true,
                    }
                )
                if (editedProduct) resolve(editedProduct)
                else throw new HttpException(400, 'project not found')
            } catch (error) {
                reject(error)
            }
        })
    }
}