// Import necessary dependencies
// Pool: Manages database connections efficiently
// neonConfig: Configuration for Neon database
import { Pool, neonConfig } from '@neondatabase/serverless';
// PrismaNeon: Adapter to connect Prisma with Neon database
import { PrismaNeon } from '@prisma/adapter-neon';
// PrismaClient: Main Prisma client for database operations
import { PrismaClient } from '../lib/generated/prisma/index.js'; //✅ use generated prisma client in index.js
// ws: WebSocket library for real-time communication
import ws from 'ws';

// Configure Neon to use WebSocket for communication
// This is required for serverless environments where traditional TCP connections aren't suitable
neonConfig.webSocketConstructor = ws;

// Get the database connection string from environment variables
// This string contains all necessary information to connect to the database (host, port, credentials, etc.)
const connectionString = `${process.env.DATABASE_URL}`;

// Create a connection pool for better performance
// A pool maintains multiple database connections and reuses them instead of creating new ones for each query
// This significantly improves application performance
const pool = new Pool({ connectionString });

// Create a Neon adapter for Prisma
// This adapter allows Prisma to work with the Neon database using the connection pool
const adapter = new PrismaNeon(pool.options); // ✅ only if options matches PoolConfig

// Initialize and export the Prisma client with custom configurations
// The $extends method allows us to modify how Prisma handles certain data types
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      // Custom transformer for the price field
      // This ensures that prices are always returned as strings
      // This is useful for maintaining precision with decimal numbers
      price: {
        compute(product: unknown) {
          // @ts-expect-error: product type is dynamic from Prisma extension
          return product.price.toString();
        },
      },
      // Custom transformer for the rating field
      // Converts the numeric rating to a string format
      // This helps maintain consistency in the API responses
      rating: {
        compute(product: unknown) {
          // @ts-expect-error: product type is dynamic from Prisma extension
          return product.rating.toString();
        },
      },
    },
  },
});
