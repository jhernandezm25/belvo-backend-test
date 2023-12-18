// src/index.ts
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import transactionRoutes from './routes/transaction.routes'
import DB from './database/mongodb'

dotenv.config()

const db = new DB()
db.getConnection()

const app = express()
const port = 3000

//middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//routes

app.use('/transactions', transactionRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!')
})

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`)
})
