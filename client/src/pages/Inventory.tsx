import { useProducts } from "@/hooks/use-coffee";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Inventory() {
  const { data: products, isLoading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Our Collection</h1>
            <p className="text-muted-foreground">Browse our current selection of artisanal roasts.</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search beans, roasts, or origins..." 
              className="pl-10 bg-card border-border h-12 rounded-full focus:ring-primary/50 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">Failed to load inventory.</p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {filteredProducts?.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No coffee found matching your search.
              </div>
            ) : (
              filteredProducts?.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
