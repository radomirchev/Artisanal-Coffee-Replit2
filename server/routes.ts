import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertProductSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Products API
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.patch(api.products.update.path, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updates = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, updates);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  // User Profile API (Mock/Demo)
  app.get(api.user.get.path, async (req, res) => {
    let user = await storage.getAnyUser();
    if (!user) {
      // Seed a user if none exists
      user = await storage.createUser({
        name: "Alex Barista",
        email: "alex@example.com",
        subscriptionTier: "Connoisseur",
        subscriptionStatus: "Active",
        nextShipmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        flavorProfile: {
          fruity: 7,
          nutty: 8,
          dark: 9,
          acidic: 4,
          sweet: 6
        }
      });
    }
    res.json(user);
  });

  // Seed Products if Empty
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await storage.createProduct({
      name: "Ethiopian Yirgacheffe",
      description: "Bright, floral, and tea-like with notes of lemon and jasmine.",
      price: 2400,
      stock: 45,
      roastLevel: "Light",
      imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
      tags: ["Floral", "Citrus", "Single Origin"]
    });
    await storage.createProduct({
      name: "Sumatra Mandheling",
      description: "Full-bodied, earthy, and low acidity with herbal undertones.",
      price: 2200,
      stock: 12,
      roastLevel: "Dark",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
      tags: ["Earthy", "Spicy", "Organic"]
    });
    await storage.createProduct({
      name: "Colombia Huila",
      description: "Balanced body with caramel sweetness and hints of nuttiness.",
      price: 1950,
      stock: 80,
      roastLevel: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800",
      tags: ["Caramel", "Nutty", "Balanced"]
    });
    await storage.createProduct({
      name: "Espresso Blend No. 5",
      description: "Our signature espresso blend. Rich crema, chocolatey finish.",
      price: 2100,
      stock: 5,
      roastLevel: "Espresso",
      imageUrl: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=800",
      tags: ["Chocolate", "Bold", "Blend"]
    });
    await storage.createProduct({
      name: "Costa Rica Tarrazu",
      description: "Clean, sweet, and wonderfully complex with honey notes.",
      price: 2600,
      stock: 30,
      roastLevel: "Medium-Light",
      imageUrl: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800",
      tags: ["Honey", "Clean", "Complex"]
    });
  }

  return httpServer;
}
