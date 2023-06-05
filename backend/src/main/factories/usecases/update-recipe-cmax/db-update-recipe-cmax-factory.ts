import { Pool } from 'mysql'
import { DbUpdateRecipeCMAX } from '../../../../data/usecases/update-recipe-cmax/db-update-recipe-cmax'
import { UpdateRecipeCMAX } from '../../../../domain/usecases/update-recipeCMAX'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeDbUpdateRecipeCmax = (pool: Pool): UpdateRecipeCMAX => {
  const RecipeSqlRepository = new RecipeMySqlRepository(pool)
  return new DbUpdateRecipeCMAX(RecipeSqlRepository)
}
