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
  db.Role.findAndCountAll().then((obj: any) => {
    // console.log('---------------------',obj.count);
    if (!obj.count) {
      role.map((rle) => {
        db.Role.create(rle)
      })
    }
  })
}
//routes
require('./src/routes/auth.routes')(app)
require('./src/routes/user.routes')(app)
require('./src/routes/company.routes')(app)
require('./src/routes/employee.routes')(app)
//check the request
app.get('/role', (req: Request, res: Response) => {
  db.User.findAll({
    include: db.Role,
  })
    .then((result: any) => {
      res.send(JSON.stringify(result))
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
