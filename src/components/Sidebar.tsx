"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Users, Building2, Wrench, CircleDollarSign, Settings, Droplet, ChevronDown, LayoutDashboard } from 'lucide-react';

// Menu data
const menuItems = [
  {
    title: 'Vue d\'ensemble',
    icon: LayoutDashboard,
    href: '/',
    subItems: [
      { label: 'Indicateurs clés', href: '/' },
      { label: 'Live Tracking', href: '/bookings' },
    ]
  },
  {
    title: 'Clients',
    icon: Users,
    href: '/clients',
    subItems: [
      { label: 'Particuliers', href: '/clients' },
      { label: 'Abonnements', href: '/clients/abonnements' },
    ]
  },
  {
    title: 'B2B & Flottes',
    icon: Building2,
    href: '/b2b',
    subItems: [
      { label: 'Pipeline Prospect', href: '/b2b/prospects' },
      { label: 'Gestion flottes', href: '/b2b/flottes' },
    ]
  },
  {
    title: 'Opérations',
    icon: Wrench,
    href: '/operations',
    subItems: [
      { label: 'Planning Team', href: '/technicians' },
      { label: 'Gestion Missions', href: '/missions' },
    ]
  },
  {
    title: 'Finance',
    icon: CircleDollarSign,
    href: '/finance',
    subItems: [
      { label: 'Paiements', href: '/finance/paiements' },
      { label: 'Facturation', href: '/finance/factures' },
    ]
  },
  {
    title: 'Paramètres',
    icon: Settings,
    href: '/settings',
    subItems: [
      { label: 'Équipe & Accès', href: '/settings/equipe' },
      { label: 'Zone & Tarifs', href: '/settings/zones' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Vue d\'ensemble': true,
  });

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-72 glass-card flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-50 border-r border-white/20 bg-white/40 shadow-2xl shadow-primary/5">
      <div className="h-28 flex items-center px-10 border-b border-gray-100/30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Droplet className="text-white" size={28} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter uppercase text-gradient leading-none">KLIRÔ</span>
            <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mt-1 ml-0.5">ADMIN v2.0</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-10 flex flex-col gap-2 px-6 pb-20">
        {menuItems.map((item, idx) => {
          const isOpen = openMenus[item.title];
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <div key={idx} className={item.title === 'Paramètres' ? "border-t border-gray-100/50 mt-8 pt-8" : ""}>
              {item.title === 'Vue d\'ensemble' && (
                <p className="px-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4 opacity-70">
                  Principal
                </p>
              )}
              
              <button 
                onClick={() => toggleMenu(item.title)}
                className={`w-full group flex items-center justify-between px-5 py-3.5 rounded-2xl font-black transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                    : 'text-gray-500 hover:bg-white/60 hover:text-primary transition-all'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`transition-all duration-500 group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`}>
                    <item.icon size={22} />
                  </div>
                  <span className="text-sm tracking-tight">{item.title}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-gray-300'}`} />
              </button>

              {isOpen && (
                <div className="pl-14 flex flex-col gap-3 mt-4 mb-6 animate-in slide-in-from-left-4 duration-500">
                  {item.subItems.map((sub, sIdx) => (
                    <Link 
                      key={sIdx} 
                      href={sub.href}
                      className={`text-xs font-black py-1.5 transition-all relative flex items-center gap-3 ${
                        pathname === sub.href 
                          ? 'text-primary' 
                          : 'text-gray-400 hover:text-primary hover:translate-x-1'
                      }`}
                    >
                      <div className={`w-1 h-1 rounded-full transition-all ${pathname === sub.href ? 'bg-primary scale-150' : 'bg-transparent'}`} />
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile Summary in Sidebar */}
      <div className="p-6 mt-auto">
        <div className="bg-white/60 rounded-3xl p-4 flex items-center gap-x-4 border border-white/40">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-black text-xs">
            AD
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-black text-primary leading-none">Admin Kliro</p>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Master Op.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
