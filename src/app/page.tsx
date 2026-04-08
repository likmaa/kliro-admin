"use client";

import { useEffect, useState } from 'react';
import { ArrowUpRight, Users, CheckCircle2, Car, Clock, RotateCcw, Activity } from 'lucide-react';
import { api, DashboardStats, Mission } from '@/lib/api';
import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, missionsData] = await Promise.all([
          api.getDashboardStats(),
          api.getBookings()
        ]);
        setStats(statsData);
        setMissions(missionsData.slice(0, 5)); // Top 5 recent
      } catch (err) {
        console.error("Erreur chargement dashboard:", err);
        setError("Impossible de charger les données. Vérifiez la connexion API.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const kpis = [
    { title: "Missions du jour", value: stats?.bookings_today ?? "14", icon: Car, trend: "+12%", positive: true },
    { title: "Missions Actives", value: stats?.active_missions ?? "3", icon: Clock, trend: "En direct", positive: true },
    { title: "Techniciens", value: "12 / 15", icon: Users, trend: "Stable", positive: true },
    { title: "Satisfaction", value: "4.8/5", icon: CheckCircle2, trend: "+0.1", positive: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-gradient leading-tight">
            Vue d&apos;ensemble
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-lg">Supervision de l&apos;activité opérationnelle</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-100">
            <Activity size={16} className="animate-pulse" />
            Live System
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="p-3 hover:bg-white/80 rounded-2xl transition-all glass-card shadow-sm hover:shadow-md"
          >
            <RotateCcw size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl font-bold flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          {error}
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="glass-card glass-card-hover p-8 rounded-[2rem] relative overflow-hidden group border-white/40">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-20" />
              </div>
            ) : (
              <>
                <div className="absolute -top-4 -right-4 p-8 opacity-[0.05] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-700">
                  <kpi.icon size={120} />
                </div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-primary/5 rounded-2xl">
                    <kpi.icon className="text-primary" size={28} />
                  </div>
                  <span className={`text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${kpi.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <h2 className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-1">{kpi.title}</h2>
                <p className="text-4xl font-black tracking-tighter text-gray-900">{kpi.value}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-[2rem] lg:col-span-2 min-h-[500px] border-white/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-2xl text-gray-900 tracking-tight">Missions récentes</h3>
              <p className="text-sm text-gray-400 font-medium">Les 5 dernières interventions en direct</p>
            </div>
            <button className="px-6 py-2.5 rounded-xl text-sm font-black text-white bg-primary hover:opacity-90 transition-opacity flex items-center gap-2">
              Voir tout
              <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                ))}
              </div>
            ) : missions.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-gray-100/50 bg-white/30">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Référence</th>
                      <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client & Lieu</th>
                      <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service</th>
                      <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((m) => (
                      <tr key={m.id} className="border-t border-gray-50 hover:bg-white/60 transition-colors">
                        <td className="p-5 font-black text-primary">#KLR-{m.id}</td>
                        <td className="p-5">
                          <p className="font-bold text-sm text-gray-900">Client Kliro</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">{m.address}</p>
                        </td>
                        <td className="p-5">
                          <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${m.formula === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                            <Droplet size={10} />
                            {m.formula}
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'completed' ? 'bg-green-500' : 'bg-primary'}`} />
                            <span className="text-xs font-black text-gray-700 uppercase">{m.status.replace('_', ' ')}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex h-80 flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[1.5rem]">
                <Car size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Aucune mission pour le moment</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[2rem] border-white/40">
            <h3 className="font-black text-2xl mb-8 text-gray-900 tracking-tight">Top Performance</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    T{i}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1.5">
                      <p className="font-black text-sm text-gray-900">Technicien Kliro {i}</p>
                      <span className="font-black text-xs text-primary">{95 - i * 8}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${95 - i * 8}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 bg-primary/5 text-primary rounded-2xl font-black text-sm hover:bg-primary hover:text-white transition-all border border-primary/10">
              Voir tous les techniciens
            </button>
          </div>

          <div className="p-8 bg-primary rounded-[2rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-700 capitalize">
              <Activity size={180} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Conseil Stratégique</p>
              <h4 className="text-xl font-black tracking-tight mb-3">Optimisation des tournées</h4>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Le temps de lavage moyen est de 38 min. Visualisez les zones à forte demande pour réduire les temps de trajet de l&apos;équipe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Droplet = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-5c-.5 1-2 3.4-4 5s-3 3.5-3 5.5a7 7 0 0 0 7 7Z" />
  </svg>
);
