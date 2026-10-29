import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const responses=sqliteTable('responses',{id:text('id').primaryKey(),rating:integer('rating').notNull(),frequency:text('frequency').notNull(),comment:text('comment').notNull(),createdAt:text('created_at').notNull()});
