import { type ProductResponse } from "@shared/routes";
import { Edit2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUpdateProduct } from "@/hooks/use-coffee";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stock, setStock] = useState(product.stock);
  const updateProduct = useUpdateProduct();
  const { toast } = useToast();

  const isLowStock = product.stock < 10;

  const handleUpdate = () => {
    updateProduct.mutate(
      { id: product.id, stock: Number(stock) },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast({
            title: "Inventory Updated",
            description: `${product.name} stock level set to ${stock}.`,
          });
        },
      }
    );
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-4 right-4">
          <Badge 
            variant={isLowStock ? "destructive" : "default"}
            className={isLowStock ? "animate-pulse" : "bg-primary text-primary-foreground"}
          >
            {isLowStock ? "Low Stock" : "In Stock"}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{product.roastLevel} Roast</p>
          </div>
          <span className="font-mono text-lg text-primary">${(product.price / 100).toFixed(2)}</span>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>{product.stock} units</span>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground border-primary/20 text-foreground">
                <Edit2 className="w-3 h-3 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Update Inventory</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock Level</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <Button 
                onClick={handleUpdate} 
                disabled={updateProduct.isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {updateProduct.isPending ? "Updating..." : "Save Changes"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
