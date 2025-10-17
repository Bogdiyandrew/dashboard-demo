"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  User,
  LogOut,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

export default function TopBar() {
  console.log('🔝 TopBar component rendering');
  const { theme, toggleTheme } = useTheme();
  console.log('✅ TopBar got theme:', theme);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    { id: 1, type: "order", title: "Comandă nouă #8347", time: "2 min", unread: true },
    { id: 2, type: "payment", title: "Plată primită: 6,499 lei", time: "15 min", unread: true },
    { id: 3, type: "review", title: "Review nou de la Ana P.", time: "1h", unread: false },
    { id: 4, type: "stock", title: "Stoc redus: iPhone 15 Pro", time: "2h", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-colors duration-300">
      <div className="flex h-16 sm:h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <motion.div 
            className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}
          >
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Caută comenzi, produse, clienți..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300 text-sm sm:text-base"
            />
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl"
              >
                <p className="text-sm text-gray-400">Începe să scrii pentru a căuta...</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dark/Light Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-orange-500/50 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700 text-gray-400 hover:text-white hover:border-orange-500/50 transition-all duration-300"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center border-2 border-slate-900"
                >
                  {unreadCount}
                </motion.span>
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
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm sm:text-base">Notificări</h3>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full font-semibold">
                        {unreadCount} noi
                      </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
                          className={`p-4 border-b border-slate-700/50 cursor-pointer transition-colors ${
                            notif.unread ? 'bg-slate-700/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notif.unread ? 'bg-orange-500' : 'bg-slate-600'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white">{notif.title}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time} ago</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-700 text-center">
                      <button className="text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                        Vezi toate notificările
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 sm:gap-3 h-10 sm:h-12 px-3 sm:px-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-gray-400">admin@shopflow.ro</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 hidden sm:block ${
                showUserMenu ? 'rotate-180' : ''
              }`} />
            </motion.button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Admin</p>
                          <p className="text-xs text-gray-400">admin@shopflow.ro</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <UserMenuItem icon={<User size={18} />} label="Profilul meu" />
                      <UserMenuItem icon={<Settings size={18} />} label="Setări" />
                      <UserMenuItem icon={<CreditCard size={18} />} label="Billing" />
                      <UserMenuItem icon={<HelpCircle size={18} />} label="Ajutor & Support" />
                    </div>

                    <div className="p-2 border-t border-slate-700">
                      <UserMenuItem 
                        icon={<LogOut size={18} />} 
                        label="Logout" 
                        danger 
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

// User Menu Item Component
const UserMenuItem = ({ 
  icon, 
  label, 
  danger = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  danger?: boolean;
}) => (
  <motion.button
    whileHover={{ x: 5 }}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
      danger 
        ? 'text-red-400 hover:bg-red-500/10' 
        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);