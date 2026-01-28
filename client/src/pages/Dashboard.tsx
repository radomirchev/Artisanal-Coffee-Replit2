import { useUser } from "@/hooks/use-coffee";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Package, TrendingUp, AlertCircle } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) return <DashboardSkeleton />;
  if (error || !user) return <div className="p-8 text-center text-red-500">Failed to load profile.</div>;

  const flavorData = [
    { subject: 'Fruity', A: user.flavorProfile.fruity, fullMark: 10 },
    { subject: 'Nutty', A: user.flavorProfile.nutty, fullMark: 10 },
    { subject: 'Dark', A: user.flavorProfile.dark, fullMark: 10 },
    { subject: 'Acidic', A: user.flavorProfile.acidic, fullMark: 10 },
    { subject: 'Sweet', A: user.flavorProfile.sweet, fullMark: 10 },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground">Your coffee journey continues.</p>
          </motion.div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">Manage Subscription</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Next Shipment Card - Main Focus */}
          <motion.div 
            className="md:col-span-8 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full bg-gradient-to-br from-card to-card/50 border-border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-2xl">
                  <Package className="text-primary w-6 h-6" />
                  Next Shipment
                </CardTitle>
                <CardDescription>Your next batch is being prepared.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="text-xl font-bold font-display">
                      {user.nextShipmentDate ? format(new Date(user.nextShipmentDate), "MMMM d, yyyy") : "TBD"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-primary font-medium capitalize">{user.subscriptionStatus}</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-2/3 rounded-full shadow-[0_0_10px_rgba(212,163,115,0.5)]" />
                  </div>
                  <p className="text-xs text-right text-muted-foreground pt-1">Roasting in progress</p>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Tip: Update your flavor profile by Friday to influence this month's selection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Flavor Profile Chart */}
          <motion.div 
            className="md:col-span-12 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card border-border shadow-xl">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Your Flavor Profile</CardTitle>
                <CardDescription>Based on your recent ratings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={flavorData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                      name="Flavor"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tier Info */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full bg-secondary/30 border-border flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-1">{user.subscriptionTier}</h3>
              <p className="text-muted-foreground text-sm mb-6">Current Tier</p>
              <Button variant="outline" className="w-full">Upgrade Tier</Button>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  );
}
