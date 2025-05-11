import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema from './Schema'

//gonna hold teh connection taht is gonna link this database with the neon console that we creted
const sql=neon(
    "postgresql://neondb_owner:npg_iY5Php6tERKL@ep-floral-sun-a52kxfvp-pooler.us-east-2.aws.neon.tech/cure_cancer?sslmode=require"
);

export const db=drizzle(sql,{schema}) //set up the drizzle to interact with the datanase using the defined schema that we provided by pushing that schema to neon console from drizzle orm to neon