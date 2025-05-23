
import React, { useState } from "react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "./ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

// Chart config for different display themes/colors
const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "rgba(0, 149, 255, 0.7)",
      dark: "rgba(34, 211, 238, 0.7)",
    },
  },
  bookings: {
    label: "Bookings",
    theme: {
      light: "rgba(16, 185, 129, 0.7)",
      dark: "rgba(52, 211, 153, 0.7)",
    },
  },
};

interface GrowthChartProps {
  title: string;
}

// Generate mock data based on the selected time period
const generateMockData = (months: number) => {
  const data = [];
  const today = new Date();
  
  // For each month, generate mock data
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    
    // Generate some random but growing trends
    const baseRevenue = 50000 + Math.random() * 10000;
    const baseBookings = 30 + Math.random() * 5;
    
    // Simulate growth over time
    const growthMultiplier = 1 + (((months - i) / months) * 0.5); // Gradually increases
    
    data.push({
      month: monthName,
      revenue: Math.round(baseRevenue * growthMultiplier),
      bookings: Math.round(baseBookings * growthMultiplier),
    });
  }
  
  return data;
};

export const GrowthChart: React.FC<GrowthChartProps> = ({ title }) => {
  const [timeFrame, setTimeFrame] = useState<3 | 6 | 12>(3);
  const chartData = generateMockData(timeFrame);
  const isMobile = useIsMobile();
  
  const handleTimeFrameChange = (months: 3 | 6 | 12) => {
    setTimeFrame(months);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <Button 
            variant={timeFrame === 3 ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTimeFrameChange(3)}
          >
            3 Months
          </Button>
          <Button 
            variant={timeFrame === 6 ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTimeFrameChange(6)}
          >
            6 Months
          </Button>
          <Button 
            variant={timeFrame === 12 ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTimeFrameChange(12)}
          >
            12 Months
          </Button>
        </div>
      </div>
      
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="w-[80%] h-[80%]">
                <ChartContainer config={{
                  revenue: chartConfig.revenue
                }}>
                  <ResponsiveContainer width="99%" height="99%">
                    <AreaChart 
                      data={chartData}
                      margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tick={{fontSize: 10}} 
                        tickMargin={5}
                      />
                      <YAxis 
                        tick={{fontSize: 10}}
                        tickFormatter={(value) => `₹${value/1000}k`} 
                        width={50}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        name="Revenue" 
                        stroke="var(--color-revenue)" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bookings Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="w-[80%] h-[80%]">
                <ChartContainer config={{
                  bookings: chartConfig.bookings
                }}>
                  <ResponsiveContainer width="99%" height="99%">
                    <AreaChart 
                      data={chartData}
                      margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-bookings)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-bookings)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tick={{fontSize: 10}}
                        tickMargin={5}
                      />
                      <YAxis 
                        tick={{fontSize: 10}}
                        width={30}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="bookings" 
                        name="Bookings" 
                        stroke="var(--color-bookings)" 
                        fillOpacity={1} 
                        fill="url(#colorBookings)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrowthChart;
