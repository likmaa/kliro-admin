"use client";

import { useEffect, useState } from 'react';
import { api, Mission } from '@/lib/api';
import { Search, Filter, ArrowUpDown, ChevronRight, Droplet, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const STATUS_COLORS = {
  pending: "bg-gray-100 text-gray-600",
  assigned: "bg-blue-100 text-blue-700",
  en_route: "bg-indigo-100 text-indigo-700",
  on_site: "bg-purple-100 text-purple-700",
  washing: "bg-primary/10 text-primary",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadMissions() {
      try {
        const data = await api.getBookings();
        setMissions(data);
      } catch (err) {
        console.error("Failed to load missions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMissions();
  }, []);

  const filteredMissions = missions.filter(m => {
    const matchStatus = filter === 'all' || m.status === filter;
    const matchSearch = m.address.toLowerCase().includes(search.toLowerCase()) || m.id.toString().includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gradient leading-tight">Gestion des Missions</h1>
          <p className="text-gray-500 font-medium mt-1">Suivi et pilotage des interventions terrain</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher une mission..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold text-sm text-gray-700 cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="on_site">Sur place</option>
              <option value="washing">Lavage en cours</option>
              <option value="completed">Terminées</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/40 shadow-xl shadow-primary/5 bg-white/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/40 border-b border-gray-100/50">
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] w-24">ID</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Client & Destination</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Service</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Statut</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Date & Heure</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="p-8 border-t border-gray-50">
                      <div className="h-4 bg-gray-100 rounded-full w-full opacity-50" />
                    </td>
                  </tr>
                ))
              ) : filteredMissions.length > 0 ? (
                filteredMissions.map((m) => (
                  <tr key={m.id} className="border-t border-gray-50/50 hover:bg-white/80 transition-all group cursor-pointer">
                    <td className="p-6">
                      <span className="font-black text-primary bg-primary/5 px-2 py-1 rounded-md text-xs tracking-widest">#{m.id}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-black text-sm text-gray-900 leading-tight">Client #{m.client}</span>
                        <span className="text-xs text-gray-400 mt-1 truncate max-w-[250px] font-bold">{m.address}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${m.formula === 'premium' ? 'bg-amber-100/50 text-amber-700' : 'bg-blue-100/50 text-blue-700'}`}>
                        <Droplet size={12} className="stroke-[3]" />
                        {m.formula}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${STATUS_COLORS[m.status] || 'bg-gray-100 text-gray-600'}`}>
                        {m.status === 'completed' ? <CheckCircle2 size={12} /> : 
                         m.status === 'pending' ? <Clock size={12} /> : 
                         <AlertCircle size={12} />}
                        {m.status.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-sm font-black text-gray-700">{new Date(m.scheduled_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{new Date(m.scheduled_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="p-6">
                      <button className="mx-auto w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <div className="flex flex-col items-center">
                      <Search size={48} className="text-gray-200 mb-4" />
                      <p className="font-black text-gray-300 uppercase tracking-widest">Aucune mission trouvée</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Bar */}
        <div className="p-6 bg-white/40 border-t border-gray-100/50 flex items-center justify-between">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {filteredMissions.length} missions affichées
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-500 hover:bg-gray-50 transition-all">Précédent</button>
            <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-500 hover:bg-gray-50 transition-all">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
}
