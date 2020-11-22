import HttpException from '../../utils/httpException'
import categoryModel from './category.model'
import { CategoryRequest } from './category.type'

export default class CategoryService {
  getAllCategory() {
    return categoryModel.find({})
  }

  getCategoryByName(name: string) {
    return categoryModel.findOne({ name })
  }

  createCategory(category: CategoryRequest) {
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

  updateCategory(id: string, category: CategoryRequest) {
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
}
