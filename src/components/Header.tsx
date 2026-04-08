import { Search, Bell, UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 glass-card flex items-center justify-between px-8 sticky top-0 z-40 w-full backdrop-blur-md">
      <div className="flex items-center bg-gray-100/50 border border-gray-100 px-4 py-2.5 rounded-xl w-96 group focus-within:border-[#0D4A2A]/30 focus-within:bg-white transition-all duration-300">
        <Search size={18} className="text-gray-400 mr-2 group-focus-within:text-[#0D4A2A] transition-colors" />
        <input 
          type="text" 
          placeholder="Rechercher un client, un matricule..." 
          className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400 text-gray-900"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2.5 relative bg-white/50 rounded-xl hover:bg-white hover:shadow-sm border border-gray-100 transition-all">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#0D4A2A] rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-gray-900">Admin Klirô</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Superviseur</p>
          </div>
          <div className="w-12 h-12 bg-[#0D4A2A]/5 border border-[#0D4A2A]/10 rounded-xl flex items-center justify-center text-[#0D4A2A] shadow-sm">
            <UserCircle size={28} />
          </div>
        </div>
      </div>
    </header>
  );
}
