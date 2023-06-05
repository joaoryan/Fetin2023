import { Pool } from 'mysql'

export const insertOne = (pool: Pool, table: string, value: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`INSERT INTO ${table} SET ?`, value, (error, result) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(result)
      })
    })
  })
}

export const deleteById = (pool: Pool, table: string, columnToCompare: string, value: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`DELETE FROM ${table} WHERE ${columnToCompare} = ${value}`, (error, result) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(result)
      })
    })
  })
}

export const getCount = (pool: Pool, table: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`SELECT * FROM ${table}`, (error, rows) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(rows.length)
      })
    })
  })
}

export const getOne = (pool: Pool, table: string, columnToCompare: string, valueToCompare: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`SELECT * FROM ${table} WHERE ${columnToCompare} = ?`, valueToCompare, (error, rows) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(rows)
      })
    })
  })
}

export const updateById = (pool: Pool, table: string, valueAlteration: string, valueToCompare: any, valueToInsert: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`UPDATE ${table} SET ${valueAlteration} = ? WHERE id = ?`, [valueToInsert, valueToCompare], (error, rows) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(rows)
      })
    })
  })
}

export const updateAll = (pool: Pool, table: string, setFields: string, valueToCompare: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(
        `UPDATE 
          ${table} 
        SET 
          ${setFields}
        WHERE id = ${valueToCompare}`,
        (error, rows) => {
          if (error) {
            connection.release()
            return reject(error)
          }
          connection.release()
          resolve(rows)
        })
    })
  })
}

export const customGet = <T = any>(pool: Pool, sql: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(sql, (error, rows) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(rows)
      })
    })
  })
}

export const customDelete = <T = any>(pool: Pool, sql: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(sql, (error, rows) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(rows)
      })
    })
  })
}

export const deleteAll = (pool: Pool, table: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`DELETE FROM ${table}`, (error, result) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(result)
      })
    })
  })
}
