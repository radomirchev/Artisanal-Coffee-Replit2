import { Link, useLocation } from "wouter";
import { Coffee, User, Package, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Coffee },
    { href: "/dashboard", label: "My Brew", icon: User },
    { href: "/inventory", label: "Shop", icon: ShoppingBag },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground transition-transform group-hover:rotate-12">
            <Coffee className="w-6 h-6" />
          </div>
          <span className="font-display text-xl font-bold tracking-wide text-foreground">
            Artisan<span className="text-primary">Roast</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
