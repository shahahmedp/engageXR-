/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from 'express'
import cors from 'cors'
import 'module-alias/register'
import db from './src/models'
import { role } from './src/seeders/role'
require('dotenv').config()

const app = express()
//cors origin
var corsOptions = {
  origin: 'https://localhost:3002',
}
//setting up cors origin
app.use(cors(corsOptions))
//content type= application/json ans
app.use(express.json())
//content type=h application/x-www-form-urlecoded
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3001

/**mapping over the user for seeders */

const createRole = () => {
  db.role.findAndCountAll().then((obj: any) => {
    // console.log('---------------------',obj.count);
    if (!obj.count) {
      role.map((rle) => {
        db.role.create(rle)
      })
    }
  })
}
//routes
require('./src/routes')(app)
//check the request
app.get('/role', (req: Request, res: Response) => {
  db.companies
    .findAll({
      include: db.employee,
    })
    .then((user: any) => {
      res.send(JSON.stringify(user))
    })
    .catch((err: any) => {
      res.send(err)
    })
})

//db seualize sync connection
db.sequelize.sync().then(() => {
  createRole()
  app.listen(port, () => {
    console.log(`1App is listenning on PORT ${port}`)
  })
})
