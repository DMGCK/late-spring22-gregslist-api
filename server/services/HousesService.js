import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"


class HousesService {

  async getAll(query = {}) {
    return await dbContext.Houses.find(query).populate('creator', 'name picture')
  }

  async getById(id) {
    const house = await dbContext.Houses.findById(id).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest("That house doesn't exist, just like yours")
    }
    return house
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }

  async edit(update) {
    let original = await this.getById(update.id)
    logger.log( original)
    original.id = update.id || original.id
    original.title = update.title || original.title
    original.price = update.price || original.price
    original.description = update.description || original.description
    original.address = update.address || original.address
    original.imgUrl = update.imgUrl || original.imgUrl

    await original.save()

    return original
  }

  async remove(id) {
    const house = await this.getById(id);
    logger.log('id of deletion', id)
    await house.remove()
    // return house
  }


}

export const housesService = new HousesService()