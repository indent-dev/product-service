import express, { Request, Response } from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler'
import categoryRouter from './api/category/category.router'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({
    isSuccess: true,
    message: 'This is product service',
  })
})


app.use(categoryRouter)
app.use(errorHandler)

export default app
