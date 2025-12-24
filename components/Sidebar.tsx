
import React from 'react';
import { NAVIGATION_ITEMS, APP_NAME } from '../constants';
import { UserRole } from '../types';
import { LogOut, Landmark } from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, activeTab, setActiveTab, onLogout }) => {
  const filteredNav = NAVIGATION_ITEMS.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-slate-300 no-print">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Landmark className="text-blue-400" size={32} />
        <h1 className="text-xl font-bold text-white tracking-tight">{APP_NAME}</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {filteredNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
          <p className="text-xs uppercase text-slate-500 font-bold mb-1">Current User</p>
          <p className="text-sm font-semibold text-white truncate">Administrator</p>
          <p className="text-[10px] text-blue-400 font-bold bg-blue-400/10 inline-block px-1.5 py-0.5 rounded mt-1">
            {currentRole.replace('_', ' ')}
          </p>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout System</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
