// src/index.ts
import express, { Request, Response } from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!')
})

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`)
})
