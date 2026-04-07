import { ArrowUpRight, TrendingUp, Users, CheckCircle2, Car } from 'lucide-react';

export default function DashboardPage() {
  const kpis = [
    { title: "Chiffre d'Affaires", value: "850 000 FCFA", icon: TrendingUp, trend: "+12.5%", positive: true },
    { title: "Lavages Aujourd'hui", value: "42", icon: Car, trend: "+5", positive: true },
    { title: "Techniciens Actifs", value: "12 / 15", icon: Users, trend: "Stable", positive: true },
    { title: "Taux de satisfaction", value: "4.8/5", icon: CheckCircle2, trend: "+0.1", positive: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Vue d'ensemble</h1>
        <div className="text-sm text-gray-500 font-medium">Lundi 6 Avril 2026</div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-[#e0e0e0] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#f0fdf4] rounded-lg">
                <kpi.icon className="text-[#0D4A2A]" size={24} />
              </div>
              <span className={`text-sm font-bold flex items-center gap-1 ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight size={16} />
                {kpi.trend}
              </span>
            </div>
            <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{kpi.title}</h2>
            <p className="text-3xl font-black mt-1 text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Content Area placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#e0e0e0] shadow-sm lg:col-span-2 min-h-[400px]">
          <h3 className="font-bold text-lg mb-4">Missions en temps réel</h3>
          <div className="flex h-full items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400">Carte dynamique ou liste des interventions de la journée en cours de chargement...</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#e0e0e0] shadow-sm min-h-[400px]">
          <h3 className="font-bold text-lg mb-4">Performances Techniciens</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">Tech {i}</p>
                  <p className="text-xs text-gray-500">{5 + i} lavages faits</p>
                </div>
                <span className="font-bold text-sm text-[#0D4A2A]">{100 - i * 5}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
