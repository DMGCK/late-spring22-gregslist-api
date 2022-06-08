import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { logger } from "../utils/Logger.js"
import { HouseSchema } from "../models/House.js"
import { housesService } from "../services/HousesService.js"

export class HousesController extends BaseController {
  constructor(){
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const houses = await housesService.getAll(req.query)
      return res.send(houses)
    } catch (error) {
      next(error) //really really wants a return with a res.send I think
    }
  }

  async getById(req, res, next) {
    logger.log(req.params.id, 'attempting id search')
    try {
      const house = await housesService.getById(req.params.id)
      return res.send(house)
    } catch (error) {
      next(error)
    }

  }

  async create(req, res, next) {
    try {

      req.body.creatorId = req.userInfo.id
      const house = await housesService.create(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    logger.log('editing', req.body)
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const house = await housesService.edit(req.body)
    return res.send(house)}
    catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    logger.log(req.params, 'trying delete')
    try {
      await housesService.remove(req.params.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
      housesService.newFunc()
    }

    

  }
}

//intellicode
//power mode