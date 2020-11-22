require("dotenv").config()
import app from './app'
import { connectDB } from './utils/database'

const port = process.env.PORT || 3000

connectDB()
  .then(() => {
    console.log('Database connected!')
    app.listen(port, () => {
      console.log(`Product-service listening on http://localhost:${port}/`)
    })
  })
  .catch((err: string) => {
    console.log(err)
  })
