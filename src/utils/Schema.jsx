import {sql} from "drizzle-orm";
import {integer,varchar,pgTable,serial,text} from 'drizzle-orm/pg-core';

//pgTable('table name') - creates a table
export const Users = pgTable('users',{
    id:serial('id').primaryKey(),//treating id as important
    username: varchar('username').notNull(), //creating fields inside the database table
    age:integer('age').notNull(),
    location:varchar('location').notNull(),
    createdBy:varchar('createdBy').notNull(),
});

export const Records=pgTable('records',{
    id: serial('id').primaryKey(),
    //each user will have many records 
    // so we are storing the id of the user inside the record to identify which record is for which user
    userId:integer('user_id').references(()=> Users.id).notNull(), //taking reference of the username from the above Users table of field storing all the info of the user
    recordName : varchar('record_name').notNull(),
    //ai generated results to be store in analysis result
    analysisResult: varchar('analysis_result').notNull(),
    kanbanRecords:varchar('kanban_records').notNull(),
    createdBy:varchar('cerated_by').notNull(),//this holds the email of the user
})