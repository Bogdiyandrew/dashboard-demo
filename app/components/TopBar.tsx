"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Package,
  DollarSign,
  Star,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    { id: 1, type: "order", title: "Comandă nouă #8347", time: "2 min", unread: true, icon: Package },
    { id: 2, type: "payment", title: "Plată primită: 6,499 lei", time: "15 min", unread: true, icon: DollarSign },
    { id: 3, type: "review", title: "Review nou de la Ana P.", time: "1h", unread: false, icon: Star },
    { id: 4, type: "stock", title: "Stoc redus: iPhone 15 Pro", time: "2h", unread: false, icon: AlertCircle },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'order': return 'from-blue-500 to-cyan-500';
      case 'payment': return 'from-green-500 to-emerald-500';
      case 'review': return 'from-yellow-500 to-orange-500';
      case 'stock': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl transition-colors duration-300">
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 pl-16 lg:pl-[296px]">
          
          {/* Left section: Search Bar */}
          <div className="flex-1 max-w-2xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSearchFocused(!searchFocused)}
              className="w-full h-12 px-4 flex items-center gap-3 bg-gray-50 dark:bg-slate-800/50 border-2 border-gray-200 dark:border-slate-700 rounded-2xl hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 group"
            >
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors" />
              <span className="text-sm font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                Caută comenzi, produse, clienți...
              </span>
            </motion.button>
          </div>

          {/* Right section: Actions + Avatar */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Moon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Sun className="w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors relative z-10" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-lg"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-orange-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
                        <h3 className="font-bold text-gray-900 dark:text-white">Notificări</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ai {unreadCount} notificări necitite</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif, index) => {
                          const Icon = notif.icon;
                          return (
                            <motion.div
                              key={notif.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`p-4 border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${
                                notif.unread ? 'bg-orange-50/30 dark:bg-slate-700/30' : ''
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getNotificationColor(notif.type)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                                    {notif.unread && (
                                      <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Acum {notif.time}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="p-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                        <button className="w-full text-center text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                          Vezi toate notificările
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            </motion.button>

          </div>
        </div>
      </header>

    </div>
  );
}