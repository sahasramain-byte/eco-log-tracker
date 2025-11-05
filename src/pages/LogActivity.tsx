import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";

const categories = [
  { value: "transport", label: "Transport", co2Factor: 0.2 },
  { value: "food", label: "Food", co2Factor: 0.15 },
  { value: "electricity", label: "Electricity", co2Factor: 0.5 },
  { value: "shopping", label: "Shopping", co2Factor: 0.3 },
  { value: "waste", label: "Waste", co2Factor: 0.1 },
];

interface Activity {
  id: string;
  category: string;
  description: string;
  co2: number;
  timestamp: string;
}

const LogActivity = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a category and enter a description",
        variant: "destructive",
      });
      return;
    }

    // Calculate estimated CO2 (placeholder logic)
    const selectedCategory = categories.find(c => c.value === category);
    const estimatedCO2 = (selectedCategory?.co2Factor || 0.2) * Math.random() * 10;

    // Get existing activities from localStorage
    const existingActivities = localStorage.getItem("ecoscan-activities");
    const activities: Activity[] = existingActivities ? JSON.parse(existingActivities) : [];

    // Add new activity
    const newActivity: Activity = {
      id: Date.now().toString(),
      category,
      description,
      co2: parseFloat(estimatedCO2.toFixed(2)),
      timestamp: new Date().toISOString(),
    };

    activities.push(newActivity);
    localStorage.setItem("ecoscan-activities", JSON.stringify(activities));

    toast({
      title: "Activity Logged!",
      description: `Your ${category} activity has been recorded.`,
    });

    // Reset form
    setCategory("");
    setDescription("");

    // Navigate to dashboard after a brief delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Log Your Activity</h1>
        <p className="text-muted-foreground">
          Record your daily activities to track your carbon footprint
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
          <CardDescription>
            Select a category and describe your activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., 'drove car for 10 km' or 'ate vegetarian lunch'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Log Activity
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-accent rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Note:</strong> CO₂ estimates are placeholder values. Backend integration will provide accurate calculations.
        </p>
      </div>
    </div>
  );
};

export default LogActivity;
