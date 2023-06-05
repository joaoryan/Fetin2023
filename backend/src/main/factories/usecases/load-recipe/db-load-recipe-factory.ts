import { Pool } from 'mysql'
import { DbLoadRecipe } from '../../../../data/usecases/load-recipe/db-load-recipe'
import { LoadRecipe } from '../../../../domain/usecases/load-recipe'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeLoadRecipe = (pool: Pool): LoadRecipe => {
  const loadRecipe = new RecipeMySqlRepository(pool)
  return new DbLoadRecipe(loadRecipe)
}
