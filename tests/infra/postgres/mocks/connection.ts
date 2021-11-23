import { IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb({ autoCreateForeignKeyIndices: true })

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database'
  })
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'uuid_generate_v4'
  })

  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })
  await connection.synchronize()
  return db
}
