import HttpException from '../../utils/httpException'
import categoryModel, { CategoryDocument } from './category.model'
import { Category } from './category.type'

export default class CategoryService {
  getAllCategory() {
    return categoryModel.find({})
  }

  getCategoryByName(name: string) {
    return categoryModel.findOne({ name })
  }

  createCategory(category: Category) {
    return new Promise(async (resolve, reject) => {
      try {
        const isCategoryExist = await this.getCategoryByName(category.name)
        if (isCategoryExist)
          throw new HttpException(409, 'category name already exist')

        resolve(categoryModel.create({ ...category }))
      } catch (error) {
        reject(error)
      }
    })
  }

  updateCategory(id: string, category: Category) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(
          id,
          category,
          {
            new: true,
          }
        )
        if (updatedCategory) resolve(updatedCategory)
        else throw new HttpException(400, 'category not found')
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteCategory(id: string) {
    return new Promise<Pick<CategoryDocument, '_id' | 'name'>>(async (resolve, reject) => {
      try {
        const deletedCategory = await categoryModel.findByIdAndUpdate(
          id,
          { isDeleted: true },
          { new: true, lean: true }
        )
        if (deletedCategory) resolve(deletedCategory)
        else throw new HttpException(400, 'category not found')
      } catch (error) {
        reject(error)
      }
    })
  }
}
