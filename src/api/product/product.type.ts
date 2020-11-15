export interface Product {
    product_name: string,
    price: number,
    category: string,
    image: string,
    isDeleted: boolean
}

export type ProductRequest = Omit<Product, 'isDeleted'>