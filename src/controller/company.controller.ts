/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import db from '../models'
import { logger } from '../utils/logger'
import { StatusConstants as dailogue } from '../constants/StatusConstants'

export class CompanyController {
  /**
   * This controller is used to store company resource info.
   *
   * @param req
   * @param res
   */
  public static async companyPost(req: Request, res: Response) {
    logger.info('CompanyPOst api called')
    db.companies
      .create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
      })
      .then((cmpny: any) => {
        logger.info('company resources are stored')
        res.status(dailogue.code200.code).send({
          status: dailogue.code200.message,
          message: 'company Detailes added',
          response: cmpny.data,
        })
      })
      .catch((err: { message: any }) => {
        logger.info('company resources failed stored due to server error')
        res.status(dailogue.code500.code).send({
          status: dailogue.code500.message,
          message:
            err.message || 'Some error occured while creating the Tutorial .',
        })
      })
  }
  /**
   * This controller is used to update company resource info.
   *
   * @param req
   * @param res
   */
  public static async companyPutBYId(req: Request, res: Response) {
    logger.info('companyPutById api called ')
    const { id } = req.params
    db.companies
      .update({ ...req.body }, { where: { id } })
      .then((upt: any) => {
        if (upt) {
          res.status(dailogue.code200.code).send({
            status: dailogue.code200.message,
            message: 'Company deatils have been updated successfully',
          })
        } else {
          res.status(dailogue.code404.code).send({
            status: dailogue.code404.message,
            message: `id ${id} is not there`,
          })
        }
      })
      .catch((err: { message: any }) => {
        res.status(dailogue.code500.code).send({
          status: dailogue.code500.message,
          message: err.message || 'server is not working properly',
        })
      })
  }
  /**
   * This controller is used to get company resource.
   *
   * @param req
   * @param res
   */
  public static async companyGet(req: Request, res: Response) {
    logger.info('companyGet api called')
    db.companies
      .findAll()
      .then((data: any) => {
        res
          .status(dailogue.code200.code)
          .send({ '': dailogue.code200.message, response: data })
      })
      .catch((err: { message: any }) => {
        res.status(dailogue.code500.code).send({
          status: dailogue.code500.message,
          messagge: err.message || 'server error',
        })
      })
  }
  /**
   * This controller is used to get by Id company resource .
   *
   * @param req
   * @param res
   */
  public static async companyGetById(req: Request, res: Response) {
    logger.info('companyGetById was called')
    db.companies
      .findByPk(req.params.id)
      .then((data: any) => {
        if (data) {
          res
            .status(dailogue.code200.code)
            .send({ status: dailogue.code200.message, message: data })
        } else {
          res.status(dailogue.code404.code).send({
            status: dailogue.code404.message,
            message: `id ${req.params.id} is not there`,
          })
        }
        res.send(data)
      })
      .catch((err: { message: any }) => {
        res.status(500).send({
          messagge: err.message || 'server error',
        })
      })
  }
  /**
   * This controller is used to delete by id company resource info.
   *
   * @param req
   * @param res
   */
  public static async companyDeleteById(req: Request, res: Response) {
    logger.info('companydeleteByid is called')
    const { id } = req.params
    db.companies
      .destroy({ where: { id } })
      .then((dl: any) => {
        if (dl) {
          res.status(dailogue.code200.code).send({
            status: dailogue.code200.message,
            message: `id ${id} was deleted`,
          })
        } else {
          res.status(dailogue.code404.code).send({
            status: dailogue.code404.message,
            message: `id ${id} is not there`,
          })
        }
      })
      .catch((err: { message: any }) => {
        res.status(dailogue.code500.code).send({
          status: dailogue.code500.message,
          message: err.message || 'server error',
        })
      })
  }
  /**
   * This controller is used to store company resource info.
   *
   * @param req
   * @param res
   */
  public static async GetEmployee(req: Request, res: Response) {
    await db.compemp
      .findAll({
        where: { cmpId: req.params.name },
      })
      .then((user: any) => {
        if (user) {
          res.status(dailogue.code200.code).send({
            status: dailogue.code200.message,
            message: JSON.stringify(user),
          })
        } else {
          res.status(dailogue.code404.code).send({
            status: dailogue.code404.message,
            message: `${req.params.name} is not there`,
          })
        }
      })
      .catch((err: any) => {
        res.status(dailogue.code500.code).send({
          status: dailogue.code500.message,
          message: err.message || 'server error',
        })
      })
  }
}
