"use client";

import { useEffect, useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, User, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function ClientsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulation chargement clients
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const dummyClients = [
    { id: 1, name: "Jean Dupont", email: "jean.dupont@gmail.com", phone: "+229 90 00 00 01", location: "Cotonou, Fidjrossè", joined: "12 Mars 2024", status: "actif" },
    { id: 2, name: "Marie Kinto", email: "m.kinto@yahoo.fr", phone: "+229 61 00 12 34", location: "Cotonou, Akpakpa", joined: "05 Avr 2024", status: "actif" },
    { id: 3, name: "Marc Sossa", email: "sossa.marc@gmail.com", phone: "+229 97 11 22 33", location: "Abomey-Calavi", joined: "22 Jan 2024", status: "inactif" },
  ];

  const filteredClients = dummyClients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gradient leading-tight">Gestion Clients</h1>
          <p className="text-gray-500 font-medium mt-1 text-lg">Suivi de la base utilisateur et fidélisation</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>
          <button className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 glass-card rounded-[2rem] animate-pulse" />
          ))
        ) : filteredClients.map((client) => (
          <div key={client.id} className="glass-card glass-card-hover p-8 rounded-[2rem] border-white/40 flex flex-col group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-[1.2rem] bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <h3 className="font-black text-xl text-gray-900 mb-1 group-hover:text-primary transition-colors">{client.name}</h3>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md inline-flex self-start mb-4 ${client.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {client.status}
            </span>

            <div className="space-y-3 mt-auto">
              <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                <Mail size={16} className="text-primary/40" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                <Phone size={16} className="text-primary/40" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                <MapPin size={16} className="text-primary/40" />
                <span className="truncate">{client.location}</span>
              </div>
            </div>

            <button className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between group/btn">
              <span className="text-xs font-black text-gray-400 group-hover/btn:text-primary transition-colors uppercase tracking-widest">Voir le profil</span>
              <ChevronRight size={18} className="text-gray-300 group-hover/btn:text-primary transition-all group-hover/btn:translate-x-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
