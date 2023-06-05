import { Pool } from 'mysql'
import { CookbookMySqlRepository } from '../../../../infra/db/mysql/cookbook/cookbook-mysql-repository'
import { AddCookbook } from '../../../../domain/usecases/add-cookbook'
import { DbAddCookbook } from '../../../../data/usecases/add-cookbook/db-add-cookbook'

export const makeDbAddCookbook = (pool: Pool): AddCookbook => {
  const repository = new CookbookMySqlRepository(pool)
  return new DbAddCookbook(repository)
}
