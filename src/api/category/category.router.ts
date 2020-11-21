import { Router } from 'express'
import CategoryController from './category.controller'

const categoryRouter = Router()
const categoryController = new CategoryController()

const baseURL = '/category'

categoryRouter.post(`${baseURL}`, categoryController.createCategory)
categoryRouter.get(`${baseURL}`, categoryController.getAllCategory)
// categoryRouter.get(`${baseURL}`, categoryController.getCategoryByName)
categoryRouter.put(`${baseURL}/:id`, categoryController.updateCategory)

export default categoryRouter
