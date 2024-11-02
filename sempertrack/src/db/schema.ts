// src/db/schema.ts
import { 
    pgTable, 
    serial, 
    text, 
    timestamp, 
    integer, 
    jsonb,
    date,
    decimal
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Core tables
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    rank: text('rank'),
    unit: text('unit'),
    createdAt: timestamp('created_at').defaultNow(),
});

// Physical Fitness
export const pftScores = pgTable('pft_scores', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    pullUps: integer('pull_ups'),
    crunches: integer('crunches'),
    runTime: integer('run_time'),
    score: integer('score'),
    date: timestamp('date').defaultNow(),
});

// Rifle Qualifications
export const rifleQuals = pgTable('rifle_quals', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    score: integer('score'),
    qualification: text('qualification'), // Expert, Sharpshooter, Marksman
    date: timestamp('date'),
});

// MCMAP Progress
export const mcmapProgress = pgTable('mcmap_progress', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    beltLevel: text('belt_level'),
    techniques: jsonb('techniques'),
    hoursCompleted: integer('hours_completed'),
    dateEarned: timestamp('date_earned'),
});

// Pay and Allowances
export const payRecords = pgTable('pay_records', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    rank: text('rank'),
    yearsService: integer('years_service'),
    basePay: decimal('base_pay'),
    allowances: jsonb('allowances'),
    effectiveDate: date('effective_date'),
});

// PCS Moves
export const pcsRecords = pgTable('pcs_records', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    fromLocation: text('from_location'),
    toLocation: text('to_location'),
    moveDate: date('move_date'),
    allowances: jsonb('allowances'),
    status: text('status'),
});

// Events Calendar
export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    date: timestamp('date'),
    location: text('location'),
    type: text('type'), // historical, upcoming, recurring
    category: text('category'),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
    pftScores: many(pftScores),
    rifleQuals: many(rifleQuals),
    mcmapProgress: many(mcmapProgress),
    payRecords: many(payRecords),
    pcsRecords: many(pcsRecords),
}));