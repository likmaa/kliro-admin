"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, Mission } from '@/lib/api';
import { ChevronLeft, MapPin, Clock, User, Droplet, CheckCircle2, AlertCircle, Wrench, ShieldCheck } from 'lucide-react';

export default function MissionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    async function loadMission() {
      try {
        const data = await api.getBooking(Number(id));
        setMission(data);
      } catch (err) {
        console.error("Failed to load mission:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMission();
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!mission) return <div>Mission introuvable.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary font-black uppercase text-xs hover:opacity-70 transition-opacity"
      >
        <ChevronLeft size={16} />
        Retour à la liste
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-8">
          <div className="glass-card p-10 rounded-[2.5rem] border-white/40">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Référence Mission</span>
                <h1 className="text-4xl font-black tracking-tighter text-gray-900 mt-1">#KLR-{mission.id}</h1>
              </div>
              <div className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest ${mission.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                {mission.status.replace('_', ' ')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-xl text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Localisation</p>
                    <p className="font-bold text-gray-900 mt-0.5">{mission.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-xl text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Planification</p>
                    <p className="font-bold text-gray-900 mt-0.5">
                      {new Date(mission.scheduled_at).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {new Date(mission.scheduled_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-xl text-primary">
                    <Droplet size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Formule Choisie</p>
                    <p className="font-bold text-gray-900 mt-0.5 uppercase tracking-tighter">{mission.formula}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-xl text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID Client</p>
                    <p className="font-bold text-gray-900 mt-0.5 tracking-tighter">USR-{mission.client}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] border-white/40">
            <h3 className="font-black text-xl text-gray-900 mb-8 border-b border-gray-100 pb-4">Historique des statuts</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />
              {[
                { time: "09:00", label: "Mission créée", desc: "Par le client via l'application Mobile", icon: CheckCircle2, done: true },
                { time: "09:15", label: "Paiement confirmé", desc: "ID FedaPay: tr_83h29a... (Simulé)", icon: ShieldCheck, done: true },
                { time: "10:30", label: "Status actuel", desc: mission.status.replace('_', ' '), icon: Activity, done: false },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  <div className={`w-6 h-6 rounded-full border-4 border-white z-10 flex items-center justify-center ${step.done ? 'bg-primary' : 'bg-gray-200'}`}>
                    <step.icon size={10} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary/40">{step.time}</p>
                    <p className="font-black text-gray-900 text-sm mt-0.5">{step.label}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Assignment */}
        <div className="w-full lg:w-96 space-y-8">
          <div className="glass-card p-10 rounded-[2.5rem] border-white/40 bg-white shadow-2xl shadow-primary/5">
            <h3 className="font-black text-xl text-gray-900 mb-6">Affectation</h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Technicien assigné</p>
              <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center">
                <p className="text-sm font-medium text-gray-400">Aucun technicien pour le moment</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Techniciens disponibles (3)</p>
              {[1, 2, 3].map(i => (
                <button 
                  key={i}
                  onClick={() => setAssigning(true)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all text-left border border-transparent hover:border-primary/10 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Wrench size={18} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-gray-900">Tech Kliro {i}</p>
                    <p className="text-[10px] font-bold text-green-600">À 2.5 km</p>
                  </div>
                </button>
              ))}
            </div>

            <button 
              className="w-full mt-10 py-5 bg-primary text-white rounded-[1.5rem] font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Confirmer l&apos;affectation
            </button>
          </div>

          <div className="p-8 bg-black rounded-[2.5rem] text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">Note interne</p>
            <p className="text-sm font-medium-italic opacity-80 leading-relaxed italic">
              &quot;Client récurrent, privilégier un technicien expérimenté pour la formule Premium.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Activity = ({ size, className }: { size: number, className?: string }) => (
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
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
