import { RecipeMySqlRepository } from '../../../../infra/db/mysql/recipe/recipe-mysql-repository'
import { Pool } from 'mysql'
import { DbLoadRecipeCMAX } from '../../../../data/usecases/load-recipeCMAX/db-load-recipe-cmax'
import { LoadRecipeCMAX } from '../../../../domain/usecases/load-recipeCMAX'

export const makeLoadRecipeCMAX = (pool: Pool): LoadRecipeCMAX => {
  const loadRecipeCmax = new RecipeMySqlRepository(pool)
  return new DbLoadRecipeCMAX(loadRecipeCmax)
}
