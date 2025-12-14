import { Users, FileText, TrendingUp, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ------------------ CUSTOM DASHBOARD DATA ------------------ */

const scoreTrends = [
  { month: "Jan", averageScore: 680, lowRisk: 120 },
  { month: "Feb", averageScore: 690, lowRisk: 140 },
  { month: "Mar", averageScore: 700, lowRisk: 160 },
  { month: "Apr", averageScore: 710, lowRisk: 180 },
  { month: "May", averageScore: 720, lowRisk: 210 },
];

const pieData = [
  { name: "Low Risk", value: 65, color: "#22c55e" },
  { name: "Medium Risk", value: 25, color: "#f59e0b" },
  { name: "High Risk", value: 10, color: "#ef4444" },
];

const alerts = [
  {
    id: 1,
    farmerName: "John Okorie",
    message: "Severe drought risk detected",
    type: "critical",
    isResolved: false,
    timestamp: Date.now(),
  },
  {
    id: 2,
    farmerName: "Amina Bello",
    message: "Unstable rainfall pattern",
    type: "warning",
    isResolved: false,
    timestamp: Date.now(),
  },
  {
    id: 3,
    farmerName: "Chinedu Obi",
    message: "Crop health slightly declining",
    type: "info",
    isResolved: true,
    timestamp: Date.now(),
  },
];

const pendingCount = 18;
const totalFarmers = 1240;

/* ------------------ RECENT ACTIVITY ------------------ */

function RecentActivity({ alerts }) {
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h3 className="card-title">Recent Activity</h3>

        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-base-200"
            >
              <span
                className={`w-2 h-2 mt-2 rounded-full ${
                  alert.type === "critical"
                    ? "bg-error"
                    : alert.type === "warning"
                    ? "bg-warning"
                    : "bg-info"
                }`}
              />

              <div className="flex-1">
                <p className="font-medium">{alert.farmerName}</p>
                <p className="text-sm opacity-70">{alert.message}</p>
                <p className="text-xs opacity-50 mt-1">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------ DASHBOARD ------------------ */

export default function Dashboard() {
  const highRiskCount = alerts.filter(
    (a) => a.type === "critical" && !a.isResolved
  ).length;

  return (
    <div className="space-y-10 pt-10 px-6 max-w-7xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="opacity-70">
          Monitor your agricultural loan portfolio performance
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
       <div className="bg-base-100 rounded-2xl shadow-md p-6 min-h-[140px] flex flex-col justify-between">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium opacity-70">Total Farmers</p>
    <div className="p-3 rounded-xl bg-primary/10 text-primary">
      <Users />
    </div>
  </div>

  <div>
    <p className="text-3xl font-bold">{totalFarmers}</p>
    <p className="text-sm text-success mt-1">↑ 8.2% vs last month</p>
  </div>
</div>


        <div className="bg-warning/5 rounded-2xl shadow-md p-6 min-h-[140px] flex flex-col justify-between">
  <div className="flex justify-between items-center">
    <p className="text-sm font-medium opacity-70">Pending Applications</p>
    <div className="p-3 rounded-xl bg-warning/15 text-warning">
      <FileText />
    </div>
  </div>

  <p className="text-3xl font-bold">{pendingCount}</p>
</div>


        <div className="bg-success/5 rounded-2xl shadow-md p-6 min-h-[140px] flex flex-col justify-between">
  <div className="flex justify-between items-center">
    <p className="text-sm font-medium opacity-70">Average CropCura Score</p>
    <div className="p-3 rounded-xl bg-success/15 text-success">
      <TrendingUp />
    </div>
  </div>

  <div>
    <p className="text-3xl font-bold">720</p>
    <p className="text-sm text-success mt-1">↑ 2.5% vs last month</p>
  </div>
</div>


        <div className="bg-error/5 rounded-2xl shadow-md p-6 min-h-[140px] flex flex-col justify-between">
  <div className="flex justify-between items-center">
    <p className="text-sm font-medium opacity-70">High Risk Alerts</p>
    <div className="p-3 rounded-xl bg-error/15 text-error">
      <AlertTriangle />
    </div>
  </div>

  <p className="text-3xl font-bold text-error">{highRiskCount}</p>
</div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Portfolio Health Trend</h3>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#16a34a"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="lowRisk"
                    stroke="#22c55e"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Risk Distribution</h3>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Activity & API */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
        <RecentActivity alerts={alerts} />

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">CropCura API Integration</h3>

            <div className="mockup-code">
              <pre data-prefix="$">
                <code>GET /api/v1/scores/FRM-1001</code>
              </pre>
            </div>

            <p className="text-sm opacity-70">
              Real-time score updates via AI & satellite imagery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
