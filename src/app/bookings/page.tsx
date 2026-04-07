import { Search, Filter, MoreHorizontal } from 'lucide-react';

export default function BookingsPage() {
  const bookings = [
    { id: 'RES-001', client: 'Aïcha', vehicle: 'Toyota RAV4', date: '06 Apr 2026', status: 'En attente', amount: '15 000 FCFA' },
    { id: 'RES-002', client: 'Marc', vehicle: 'Hyundai Tucson', date: '06 Apr 2026', status: 'En cours', amount: '15 000 FCFA' },
    { id: 'RES-003', client: 'Dimitri', vehicle: 'Lexus RX350', date: '05 Apr 2026', status: 'Terminé', amount: '20 000 FCFA' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Réservations</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez toutes les interventions de lavage.</p>
        </div>
        <button className="bg-[#0D4A2A] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-[#0a3620]">
          Nouvelle Réservation
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e0e0e0] flex justify-between items-center bg-gray-50">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 w-72">
            <Search size={16} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Rechercher..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50">
            <Filter size={16} />
            Filtrer
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e0e0e0] text-sm text-gray-500">
              <th className="p-4 font-semibold pb-3">ID</th>
              <th className="p-4 font-semibold pb-3">Client</th>
              <th className="p-4 font-semibold pb-3">Véhicule</th>
              <th className="p-4 font-semibold pb-3">Date</th>
              <th className="p-4 font-semibold pb-3">Statut</th>
              <th className="p-4 font-semibold pb-3">Montant</th>
              <th className="p-4 font-semibold pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{b.id}</td>
                <td className="p-4">{b.client}</td>
                <td className="p-4 text-gray-500">{b.vehicle}</td>
                <td className="p-4 text-gray-500">{b.date}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    b.status === 'Terminé' ? 'bg-green-100 text-green-700' :
                    b.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4 font-medium">{b.amount}</td>
                <td className="p-4 text-right">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreHorizontal size={18} className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
