"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Users, Building2, Wrench, CircleDollarSign, Settings, Droplet, ChevronDown } from 'lucide-react';

// Menu data
const menuItems = [
  {
    title: 'Klirô Admin',
    icon: Home,
    href: '/',
    subItems: [
      { label: 'KPIs temps réel', href: '/' },
      { label: 'Missions du jour', href: '/' },
      { label: 'CA mensuel', href: '/' },
    ]
  },
  {
    title: 'Clients',
    icon: Users,
    href: '/clients',
    subItems: [
      { label: 'Liste particuliers', href: '/clients/particuliers' },
      { label: 'Abonnements actifs', href: '/clients/abonnements' },
      { label: 'Historique & notes', href: '/clients/historique' },
    ]
  },
  {
    title: 'B2B & Flottes',
    icon: Building2,
    href: '/b2b',
    subItems: [
      { label: 'Prospects & pipeline', href: '/b2b/prospects' },
      { label: 'Contrats actifs', href: '/b2b/contrats' },
      { label: 'Gestion flottes', href: '/b2b/flottes' },
      { label: 'Rapports mensuels', href: '/b2b/rapports' },
    ]
  },
  {
    title: 'Opérations',
    icon: Wrench,
    href: '/operations',
    subItems: [
      { label: 'Planning techniciens', href: '/technicians' }, // Mapped to the actual table we built
      { label: 'Affectation missions', href: '/operations/affectation' },
      { label: 'Suivi temps réel', href: '/bookings' }, // Mapped to the actual table we built
    ]
  },
  {
    title: 'Finance',
    icon: CircleDollarSign,
    href: '/finance',
    subItems: [
      { label: 'Paiements reçus', href: '/finance/paiements' },
      { label: 'Factures B2B', href: '/finance/factures' },
      { label: 'Relances automatiques', href: '/finance/relances' },
    ]
  },
  {
    title: 'Paramètres',
    icon: Settings,
    href: '/settings',
    subItems: [
      { label: 'Équipe & rôles', href: '/settings/equipe' },
      { label: 'Tarification', href: '/settings/tarification' },
      { label: 'Zones de service', href: '/settings/zones' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Klirô Admin': true, // Open by default
  });

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-[#e0e0e0] flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="h-16 flex items-center px-6 border-b border-[#e0e0e0] shrink-0">
        <div className="flex items-center gap-2">
          <Droplet className="text-[#0D4A2A]" size={24} />
          <span className="font-black text-2xl tracking-tighter uppercase text-[#0D4A2A]">KLIRÔ</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-2 px-4 pb-20">
        {menuItems.map((item, idx) => {
          const isOpen = openMenus[item.title];
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <div key={idx} className={item.title === 'Paramètres' ? "border-t border-[#e0e0e0] pt-4 mt-2" : ""}>
              {item.title === 'Klirô Admin' && <p className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">Navigation</p>}
              
              <button 
                onClick={() => toggleMenu(item.title)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-[#f0fdf4] text-[#0D4A2A]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="pl-12 flex flex-col gap-2 mt-2 mb-4 text-sm text-gray-500">
                  {item.subItems.map((sub, sIdx) => (
                    <Link 
                      key={sIdx} 
                      href={sub.href}
                      className={`hover:text-[#0D4A2A] transition-colors ${pathname === sub.href ? 'text-[#0D4A2A] font-bold' : ''}`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
