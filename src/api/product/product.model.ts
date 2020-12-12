import { Product } from "./product.type"
import { Document, Schema, model } from 'mongoose'

export type ProductDocument = Omit<Product, 'isDeleted'> & Document

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
          },
    },
    {
        timestamps: true
    }
)

export default model<ProductDocument>('Product', productSchema)