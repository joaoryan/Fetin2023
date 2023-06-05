import { Pool } from 'mysql'
import { DbAddRecipe } from '../../../../data/usecases/add-recipe/db-add-recipe'
import { AddRecipe } from '../../../../domain/usecases/add-recipe'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeDbAddRecipe = (pool: Pool): AddRecipe => {
  const recipeSqlRepository = new RecipeMySqlRepository(pool)
  return new DbAddRecipe(recipeSqlRepository)
}
