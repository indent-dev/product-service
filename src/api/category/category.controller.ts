import { NextFunction, Request, Response } from 'express'
import HttpException from '../../utils/httpException'
import CategoryService from './category.service'

const categoryService = new CategoryService()

export default class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const createcategory = await categoryService.createCategory(req.body)
      res.send(createcategory)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllCategory = await categoryService.getAllCategory()
      res.send(getAllCategory)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  // async getCategoryByName(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const categoryName = req.query.name?.toString()
  //     if (!categoryName) throw new HttpException(403, 'category name not found')
  //     const getCategoryByName = await categoryService.getCategoryByName(
  //       categoryName
  //     )
  //     res.send(getCategoryByName)
  //   } catch (error) {
  //     next(new HttpException(error.statusCode || 500, error.message))
  //   }
  // }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const updateCategory = await categoryService.updateCategory(id, req.body)
      res.send(updateCategory)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }
}
