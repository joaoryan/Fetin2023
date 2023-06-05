import { Pool } from 'mysql'
import { DbDeleteCookbook } from '../../../../data/usecases/delete-cookbook/db-delete-cookbook'
import { DeleteCookbook } from '../../../../domain/usecases/delete-cookbook'
import { CookbookMySqlRepository } from '../../../../infra/db/mysql/cookbook/cookbook-mysql-repository'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeDeleteCookbook = (pool: Pool): DeleteCookbook => {
  const cookbookSqlRepository = new CookbookMySqlRepository(pool)
  const recipeSqlRepository = new RecipeMySqlRepository(pool)
  return new DbDeleteCookbook(cookbookSqlRepository, recipeSqlRepository, recipeSqlRepository, recipeSqlRepository)
}
