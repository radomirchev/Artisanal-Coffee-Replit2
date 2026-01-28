import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  stock: integer("stock").notNull().default(0),
  roastLevel: text("roast_level").notNull(), // Light, Medium, Dark, Espresso
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  subscriptionTier: text("subscription_tier"), // Basic, Connoisseur, Professional
  subscriptionStatus: text("subscription_status").default("active"),
  nextShipmentDate: timestamp("next_shipment_date"),
  flavorProfile: jsonb("flavor_profile").$type<{
    fruity: number;
    nutty: number;
    dark: number;
    acidic: number;
    sweet: number;
  }>(),
});

// === SCHEMAS ===
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

// === EXPLICIT TYPES ===
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// API Types
export type ProductResponse = Product;
export type ProductListResponse = Product[];
export type UserProfileResponse = User;
