import { motion } from "framer-motion";
import { ArrowRight, Check, Coffee, Truck, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Coffee pouring into a cup */}
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80"
            alt="Pouring coffee"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          className="container relative z-10 px-4 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            PREMIUM SMALL BATCH ROASTING
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Experience the <br />
            <span className="text-primary italic">Art of Coffee</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover single-origin beans roasted to perfection. Delivered fresh to your door, tailored to your unique taste profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 rounded-full">
                Shop Collection
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full">
                View Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to elevate your morning ritual.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { icon: Coffee, title: "Select", desc: "Choose your preference from our curated selection of global beans." },
              { icon: Flame, title: "Roast", desc: "Our master roasters bring out the unique flavor notes of every batch." },
              { icon: Truck, title: "Deliver", desc: "Freshly roasted beans shipped within 24 hours of roasting." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-background rounded-2xl flex items-center justify-center border border-border mb-6 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 rotate-3 group-hover:rotate-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Choose Your Roast</h2>
            <p className="text-muted-foreground">Flexible plans for every level of coffee enthusiast.</p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { name: "Curious Sipper", price: "19", desc: "1 bag per month", features: ["Single Origin", "Roaster's Choice", "Free Shipping"] },
              { name: "Daily Ritual", price: "34", desc: "2 bags per month", features: ["Single Origin + Blends", "Custom Grind", "Free Shipping", "Priority Support"], popular: true },
              { name: "Master Connoisseur", price: "49", desc: "3 bags per month", features: ["Exclusive Micro-lots", "Weekly Tasting Notes", "Free Shipping", "Priority Support", "Access to Events"] },
            ].map((plan, i) => (
              <motion.div 
                key={i}
                variants={item}
                className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-primary bg-card/50 shadow-2xl shadow-primary/10' : 'border-border bg-card'} hover:-translate-y-2 transition-transform duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.desc}</p>
                </div>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold font-display">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}>
                  Subscribe Now
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
