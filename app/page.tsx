"use client";
import Footer from "./components/Footer";
import { motion, easeOut } from "framer-motion";
// Motion variants pentru animații consistente
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
};
import { 
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Package,
  CreditCard,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedKPICard from './components/AnimatedKPICard';

// Mock Data
const kpiData = {
  comenzi: { value: 1847, change: +23.5, trend: "up" as const },
  revenue: { value: 124350, change: +18.2, trend: "up" as const },
  clientiNoi: { value: 342, change: -5.3, trend: "down" as const },
  conversie: { value: 3.8, change: +0.7, trend: "up" as const }
};

const revenueLunare = [
  { luna: "Mai", revenue: 89500, comenzi: 1234 },
  { luna: "Iun", revenue: 105200, comenzi: 1456 },
  { luna: "Iul", revenue: 98800, comenzi: 1389 },
  { luna: "Aug", revenue: 118300, comenzi: 1621 },
  { luna: "Sep", revenue: 112100, comenzi: 1543 },
  { luna: "Oct", revenue: 124350, comenzi: 1847 }
];

const produseBestSeller = [
  { produs: "iPhone 15 Pro", vanzari: 234 },
  { produs: "MacBook Air M2", vanzari: 189 },
  { produs: "AirPods Pro", vanzari: 412 },
  { produs: "iPad Air", vanzari: 156 },
  { produs: "Apple Watch", vanzari: 298 }
];

const categoriiVanzari = [
  { categorie: "Electronice", value: 42, color: "#6366f1" },
  { categorie: "Fashion", value: 28, color: "#14b8a6" },
  { categorie: "Home & Living", value: 18, color: "#8b5cf6" },
  { categorie: "Beauty", value: 8, color: "#06b6d4" },
  { categorie: "Sports", value: 4, color: "#f59e0b" }
];

const comenziRecente = [
  { 
    id: "#ORD-8347", 
    client: "Ana Popescu", 
    produs: "iPhone 15 Pro Max", 
    valoare: 6499, 
    data: "16 Oct, 14:32",
    status: "delivered" 
  },
  { 
    id: "#ORD-8346", 
    client: "Mihai Ionescu", 
    produs: "MacBook Pro 16\"", 
    valoare: 12999, 
    data: "16 Oct, 13:15",
    status: "processing" 
  },
  { 
    id: "#ORD-8345", 
    client: "Elena Stan", 
    produs: "AirPods Pro 2", 
    valoare: 1299, 
    data: "16 Oct, 11:48",
    status: "shipped" 
  },
  { 
    id: "#ORD-8344", 
    client: "Bogdan Marin", 
    produs: "iPad Air 11\"", 
    valoare: 3499, 
    data: "16 Oct, 10:22",
    status: "delivered" 
  },
  { 
    id: "#ORD-8343", 
    client: "Cristina Popa", 
    produs: "Apple Watch Ultra", 
    valoare: 4299, 
    data: "16 Oct, 09:05",
    status: "cancelled" 
  }
];


export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl space-y-8 sm:space-y-10 lg:space-y-12">
        
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
                <span className="bg-gradient-to-r from-indigo-500 via-teal-400 to-sky-400 bg-clip-text text-transparent">
                  ShopFlow
                </span>{" "}
                Dashboard
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Octombrie 2025 — Performanță e-commerce
              </p>
            </div>
            <div className="flex justify-center sm:justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 text-sm sm:text-base"
              >
                Export Raport
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <AnimatedKPICard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Total Comenzi"
            value={kpiData.comenzi.value}
            change={kpiData.comenzi.change}
            trend={kpiData.comenzi.trend}
            color="orange"
          />
          <AnimatedKPICard
            icon={<DollarSign className="w-6 h-6" />}
            title="Revenue"
            value={kpiData.revenue.value}
            change={kpiData.revenue.change}
            trend={kpiData.revenue.trend}
            prefix="lei"
            color="purple"
          />
          <AnimatedKPICard
            icon={<Users className="w-6 h-6" />}
            title="Clienți Noi"
            value={kpiData.clientiNoi.value}
            change={kpiData.clientiNoi.change}
            trend={kpiData.clientiNoi.trend}
            color="teal"
          />
          <AnimatedKPICard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Conversion Rate"
            value={kpiData.conversie.value}
            change={kpiData.conversie.change}
            trend={kpiData.conversie.trend}
            suffix="%"
            decimals={1}
            color="pink"
          />
        </div>

        {/* Revenue Line Chart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-xl">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              </div>
              <span className="hidden sm:inline">Evoluție Revenue & Comenzi</span>
              <span className="sm:hidden">Revenue</span>
            </h2>
            <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-400">Comenzi</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueLunare}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="luna" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#6366f1" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#14b8a6" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#ff6b35" 
                strokeWidth={3}
                dot={{ fill: '#ff6b35', r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="comenzi" 
                stroke="#7c3aed" 
                strokeWidth={3}
                dot={{ fill: '#7c3aed', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Best Sellers */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
              </div>
              <span className="hidden sm:inline">Top Produse Vândute</span>
              <span className="sm:hidden">Top Produse</span>
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={produseBestSeller}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="produs" 
                  stroke="#94a3b8"
                  angle={-15}
                  textAnchor="end"
                  height={80}
                  style={{ fontSize: '10px' }}
                />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="vanzari" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Categorii Vânzări */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              </div>
              <span className="hidden sm:inline">Distribuție Categorii</span>
              <span className="sm:hidden">Categorii</span>
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoriiVanzari}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ payload }) => {
                    const data = payload as { categorie: string; value: number };
                    return `${data.categorie} ${data.value}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoriiVanzari.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Tabel Comenzi Recente */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
            </div>
            Comenzi Recente
          </h2>
          
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 rounded-lg">
            <table className="w-full min-w-[560px] sm:min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm">ID</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm">Client</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm hidden sm:table-cell">Produs</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm">Valoare</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm hidden md:table-cell">Data</th>
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {comenziRecente.map((comanda, index) => (
                  <motion.tr
                    key={comanda.id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-white font-mono font-medium text-xs sm:text-sm">{comanda.id}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm">{comanda.client}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm hidden sm:table-cell">{comanda.produs}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-white font-semibold text-xs sm:text-sm">{comanda.valoare.toLocaleString()} lei</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-400 text-xs hidden md:table-cell">{comanda.data}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <StatusBadge status={comanda.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <Footer />
      </div>
    </main>
  );
}

// KPI Card Component

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    "delivered": { 
      label: "Livrat", 
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
      icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
    },
    "processing": { 
      label: "În procesare", 
      color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
      icon: <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
    },
    "shipped": { 
      label: "Expediat", 
      color: "text-violet-400 bg-violet-400/10 border-violet-400/30",
      icon: <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
    },
    "cancelled": { 
      label: "Anulat", 
      color: "text-rose-400 bg-rose-400/10 border-rose-400/30",
      icon: <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
    }
  };

  const { label, color, icon } = config[status as keyof typeof config] || config.processing;

  return (
    <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border ${color}`}>
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </span>
  );
};
