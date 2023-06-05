import { Pool } from 'mysql'
import { UpdateCookbook } from '../../../../domain/usecases/update-cookbook'
import { DbUpdateCookbook } from '../../../../data/usecases/update-cookbook/db-update-cookbook'
import { CookbookMySqlRepository } from '../../../../infra/db/mysql/cookbook/cookbook-mysql-repository'

export const makeDbUpdateCookbook = (pool: Pool): UpdateCookbook => {
  const repository = new CookbookMySqlRepository(pool)
  return new DbUpdateCookbook(repository)
}
