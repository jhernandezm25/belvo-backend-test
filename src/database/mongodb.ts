import mongoose, { Connection } from 'mongoose'

export default class DB {
  private connection: Connection | null = null

  getConnection() {
    const uri = process.env.MONGO_URI

    mongoose
      .connect(`${uri}`, {
        maxPoolSize: 200,
      })
      .then(() => {
        console.log('Conexión exitosa a la BD')
        this.connection = mongoose.connection
        this.connection.on('error', (error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
