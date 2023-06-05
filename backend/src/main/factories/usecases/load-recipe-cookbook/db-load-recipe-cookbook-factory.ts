import { Pool } from 'mysql'
import { DbLoadRecipeCookbook } from '../../../../data/usecases/load-cookbook/db-load-cookbook'
import { LoadRecipeCookbook } from '../../../../domain/usecases/load-recipe-cookbook'
import { CookbookMySqlRepository } from '../../../../infra/db/mysql/cookbook/cookbook-mysql-repository'

export const makeLoadRecipeCookbook = (pool: Pool): LoadRecipeCookbook => {
  const loadRecipeCookbook = new CookbookMySqlRepository(pool)
  return new DbLoadRecipeCookbook(loadRecipeCookbook)
}
