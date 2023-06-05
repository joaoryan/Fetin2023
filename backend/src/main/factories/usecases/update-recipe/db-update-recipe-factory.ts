import { Pool } from 'mysql'
import { DbUpdateRecipe } from '../../../../data/usecases/update-recipe/db-update-recipe'
import { UpdateRecipe } from '../../../../domain/usecases/update-recipe'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeDbUpdateRecipe = (pool: Pool): UpdateRecipe => {
  const RecipeSqlRepository = new RecipeMySqlRepository(pool)
  return new DbUpdateRecipe(RecipeSqlRepository)
}
