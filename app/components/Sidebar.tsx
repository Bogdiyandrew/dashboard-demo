"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Tags,
  Truck,
  CreditCard,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Store
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  color?: string;
}

const navItems: NavItem[] = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: <LayoutDashboard size={20} />,
    color: "indigo"
  },
  { 
    name: "Comenzi", 
    href: "/comenzi", 
    icon: <ShoppingCart size={20} />, 
    badge: 12,
    color: "teal"
  },
  { 
    name: "Produse", 
    href: "/produse", 
    icon: <Package size={20} />,
    color: "teal"
  },
  { 
    name: "Clienți", 
    href: "/clienti", 
    icon: <Users size={20} />,
    color: "teal"
  },
  { 
    name: "Analytics", 
    href: "/analytics", 
    icon: <BarChart3 size={20} />,
    color: "indigo"
  },
  { 
    name: "Marketing", 
    href: "/marketing", 
    icon: <Tags size={20} />,
    color: "indigo"
  },
  { 
    name: "Livrări", 
    href: "/livrari", 
    icon: <Truck size={20} />,
    badge: 3,
    color: "emerald"
  },
  { 
    name: "Plăți", 
    href: "/plati", 
    icon: <CreditCard size={20} />,
    color: "indigo"
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const getColorClasses = (color?: string) => {
    const colors = {
      indigo: "group-hover:text-indigo-400",
      teal: "group-hover:text-teal-400",
      sky: "group-hover:text-sky-400",
      emerald: "group-hover:text-emerald-400",
      violet: "group-hover:text-violet-400",
    };
    return colors[color as keyof typeof colors] || "group-hover:text-indigo-400";
  };

  return (
    <>
      {/* Mobile Menu Button (aligned near TopBar) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="absolute top-4 left-3 z-[60] lg:hidden p-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-xl text-white shadow-xl flex items-center justify-center"
        aria-label="Deschide meniu"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '80px' : '280px',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed left-0 top-0 h-screen z-[55]
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl 
          border-r border-gray-200 dark:border-slate-800
          flex flex-col shadow-2xl transition-colors duration-300
          ${isCollapsed ? 'items-center' : ''}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-6 right-6 lg:hidden p-2 text-white hover:text-indigo-400 transition-colors"
          aria-label="Închide meniu"
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0"
            >
              <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
                  ShopFlow
                </h2>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">E-commerce Admin</p>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Quick Stats (when expanded) */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 mx-3 sm:mx-4 mt-3 sm:mt-4 bg-gradient-to-br from-indigo-500/10 to-teal-500/10 border border-indigo-500/20 rounded-xl sm:rounded-2xl"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Vânzări Azi</span>
              <span className="text-[10px] sm:text-xs text-emerald-400 font-bold">+23%</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">24,350 lei</div>
            <div className="text-[10px] sm:text-xs text-gray-400">47 comenzi procesate</div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <ul className="space-y-1.5 sm:space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl
                    transition-all duration-300 group relative text-sm sm:text-base
                    ${activeItem === item.name 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-teal-500/20 text-white border border-indigo-400/30 shadow-lg shadow-indigo-500/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/50'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  {/* Active Glow Effect */}
                  {activeItem === item.name && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-teal-500/10 rounded-xl blur-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Icon */}
                  <span className={`flex-shrink-0 relative z-10 ${activeItem === item.name ? 'text-indigo-400' : getColorClasses(item.color)}`}>
                    {item.icon}
                  </span>

                  {/* Label */}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left font-medium relative z-10 text-sm sm:text-base">{item.name}</span>
                      {item.badge && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-full shadow-lg relative z-10"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-4 py-2 bg-slate-900 border border-slate-700 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-2xl">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Notifications */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-200 dark:border-slate-800 pt-3 sm:pt-4 transition-colors duration-300">
          <button
            className={`
              w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl
              bg-gray-100 dark:bg-slate-800/50 hover:bg-gray-200 dark:hover:bg-slate-800 
              text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
              transition-all duration-300 relative group text-sm sm:text-base
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <div className="relative">
              <Bell size={18} className="sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></span>
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left font-medium">Notificări</span>
                <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                  5
                </span>
              </>
            )}
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <div className={`
            flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-100 dark:bg-slate-800/50 rounded-lg sm:rounded-xl hover:bg-gray-200 dark:hover:bg-slate-800 transition-all duration-300 group
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg text-sm sm:text-base">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">Admin</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">Admin</p>
              </div>
            )}
          </div>

          {/* Settings & Logout */}
          <div className={`flex gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 ${isCollapsed ? 'flex-col' : ''}`}>
            <button
              className={`
                flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl
                text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800
                transition-all duration-300 group text-sm
                ${isCollapsed ? 'w-full' : 'flex-1'}
              `}
            >
              <Settings size={16} className="sm:w-[18px] sm:h-[18px] group-hover:rotate-90 transition-transform duration-300" />
              {!isCollapsed && <span className="text-xs sm:text-sm font-medium">Setări</span>}
            </button>
            
            <button
              className={`
                flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl
                text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10
                transition-all duration-300 text-sm
                ${isCollapsed ? 'w-full' : 'flex-1'}
              `}
            >
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
              {!isCollapsed && <span className="text-xs sm:text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>

        {/* Collapse Toggle (Desktop Only) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-4 top-24 p-2 bg-slate-900 border border-slate-700 rounded-full text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-300 shadow-xl z-50"
          aria-label={isCollapsed ? "Extinde sidebar" : "Restrânge sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </motion.button>
      </motion.aside>
    </>
  );
}