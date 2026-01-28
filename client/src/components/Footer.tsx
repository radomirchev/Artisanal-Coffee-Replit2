import { Coffee, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold">ArtisanRoast</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting the perfect cup, one bean at a time. Sourced ethically, roasted passionately, delivered freshly.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">All Coffee</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Equipment</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Gift Cards</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Subscriptions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Roastery</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 ArtisanRoast. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
