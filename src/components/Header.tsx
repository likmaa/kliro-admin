import { Search, Bell, UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-[#e0e0e0] flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">
        <Search size={18} className="text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Rechercher un client, un matricule..." 
          className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 relative bg-gray-50 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-[#e0e0e0] pl-4">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">Direction</p>
          </div>
          <div className="w-10 h-10 bg-[#0D4A2A] rounded-full flex items-center justify-center text-white">
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
