import { Document, model, Schema } from 'mongoose'
import { Category } from './category.type'

export type CategoryDocument = Category & Document

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

export default model<CategoryDocument>('Category', categorySchema)
