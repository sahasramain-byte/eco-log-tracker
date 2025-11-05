import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingDown, Award } from "lucide-react";

interface Activity {
  id: string;
  category: string;
  description: string;
  co2: number;
  timestamp: string;
}

const Dashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    // Load activities from localStorage
    const stored = localStorage.getItem("ecoscan-activities");
    if (stored) {
      const parsedActivities = JSON.parse(stored);
      setActivities(parsedActivities);
      
      // Calculate total CO2
      const total = parsedActivities.reduce((sum: number, activity: Activity) => sum + activity.co2, 0);
      setTotalCO2(total);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      transport: "bg-blue-500",
      food: "bg-green-500",
      electricity: "bg-yellow-500",
      shopping: "bg-purple-500",
      waste: "bg-red-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const getProgressLevel = () => {
    if (totalCO2 < 10) return { value: 25, label: "Excellent", color: "bg-green-500" };
    if (totalCO2 < 25) return { value: 50, label: "Good", color: "bg-blue-500" };
    if (totalCO2 < 50) return { value: 75, label: "Fair", color: "bg-yellow-500" };
    return { value: 90, label: "High Impact", color: "bg-red-500" };
  };

  const progressLevel = getProgressLevel();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-muted-foreground">
          Track your carbon footprint and environmental impact
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total CO₂</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{totalCO2.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">kg CO₂</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activities Logged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{activities.length}</div>
                <div className="text-sm text-muted-foreground">total activities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Impact Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{progressLevel.label}</div>
                <div className="text-sm text-muted-foreground">current status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="shadow-card mb-8">
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>Your current carbon footprint level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Impact Level</span>
              <span className="font-medium">{progressLevel.label}</span>
            </div>
            <Progress value={progressLevel.value} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Keep logging activities to track your progress towards a lower carbon footprint
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            {activities.length > 0
              ? "Your logged environmental activities"
              : "No activities logged yet. Start tracking your carbon footprint!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.slice().reverse().map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-smooth"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={`${getCategoryColor(activity.category)} text-white border-0`}>
                        {activity.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{activity.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-semibold text-primary">{activity.co2} kg</div>
                    <div className="text-xs text-muted-foreground">CO₂</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No activities yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
