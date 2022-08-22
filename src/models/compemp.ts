/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict'
import { Model } from 'sequelize'

interface CompEmpAttribute {
  cmpId: string
  userId: string
}
module.exports = (sequelize: any, DataTypes: any) => {
  class CompEmp extends Model<CompEmpAttribute> implements CompEmpAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    cmpId!: string
    userId!: string
    static associate(models: any) {
      // define association here
    }
  }
  CompEmp.init(
    {
      cmpId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'compemp',
    }
  )
  return CompEmp
}
