import 'dotenv/config'
import pg from "pg"
import type { DatabaseConfig } from './types'

export const PORT = +(process.env.PORT ?? 3001)
export const Secret = process.env.JWT_SECRET as string
export const Expire = process.env.JWT_EXPIRE as string
export const Key = process.env.API_KEY as string
export const hostFront = process.env.HOST_FRONT as string


export const DATABASE_CONFIG: DatabaseConfig = {
    database: process.env.DATABASE || '',
    user: process.env.USER_BD || '',
    password: process.env.PASSWORD || '',
    host: process.env.HOST_BD || '',
    port: process.env.PORT_BD || '',
    dialect: 'postgres',
    dialectModule: pg,
}

export const corsOptions = 
    { 
        origin: hostFront, 
        methods: 'GET, HEAD, PUT,PATCH, POST, DELETE', 
        credentials: true 
    };


