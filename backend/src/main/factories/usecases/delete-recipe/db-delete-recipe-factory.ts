import { Pool } from 'mysql'
import { DbDeleteRecipe } from '../../../../data/usecases/delete-recipe/db-delete-recipe'
import { DeleteRecipe } from '../../../../domain/usecases/delete-recipe'
import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'

export const makeDbDeleteRecipe = (pool: Pool): DeleteRecipe => {
  const recipeSqlRepository = new RecipeMySqlRepository(pool)
  return new DbDeleteRecipe(recipeSqlRepository, recipeSqlRepository, recipeSqlRepository, recipeSqlRepository, recipeSqlRepository)
}
