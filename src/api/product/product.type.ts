import { CategoryRequest } from '../category/category.type'

export interface Product {
    product_name: string,
    price: number,
    category: CategoryRequest,
    image: string,
    isDeleted: boolean
}

export type ProductRequest = Omit<Product, 'isDeleted'>