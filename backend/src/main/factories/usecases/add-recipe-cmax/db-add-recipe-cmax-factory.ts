import { Pool } from 'mysql'
import { DbAddRecipeCMAX } from '../../../../data/usecases/add-recipe-cmax/db-add-recipe-cmax'
import { AddRecipeCMAX } from '../../../../domain/usecases/add-recipeCMAX'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeDbAddRecipeCmax = (pool: Pool): AddRecipeCMAX => {
  const recipeSqlRepository = new RecipeMySqlRepository(pool)
  return new DbAddRecipeCMAX(recipeSqlRepository)
}
