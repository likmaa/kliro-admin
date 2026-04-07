import { Search, UserPlus, Star } from 'lucide-react';

export default function TechniciansPage() {
  const techs = [
    { id: 'T-01', name: 'John Doe', rating: 4.8, jobs: 142, status: 'Actif', zone: 'Cotonou Centre' },
    { id: 'T-02', name: 'Alain D.', rating: 4.9, jobs: 89, status: 'Actif', zone: 'Haie Vive' },
    { id: 'T-03', name: 'Bosse K.', rating: 4.5, jobs: 34, status: 'En Repos', zone: 'Fidjrossè' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Techniciens</h1>
          <p className="text-sm text-gray-500 mt-1">Supervisez votre flotte d'opérateurs Klirô.</p>
        </div>
        <button className="bg-[#0D4A2A] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-[#0a3620]">
          <UserPlus size={16} />
          Ajouter Un Technicien
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techs.map((tech) => (
          <div key={tech.id} className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 flex items-center justify-center text-gray-400 text-2xl font-bold">
              {tech.name.substring(0,2).toUpperCase()}
            </div>
            <h3 className="font-bold text-lg text-gray-900">{tech.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{tech.zone}</p>
            
            <div className="flex items-center justify-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold w-full mb-4">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              {tech.rating} / 5
            </div>
            
            <div className="w-full flex justify-between text-sm border-t border-gray-100 pt-4 mt-auto">
              <div className="text-center">
                <p className="text-gray-500 text-xs">Missions</p>
                <p className="font-bold text-gray-900">{tech.jobs}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">Statut</p>
                <span className={`font-bold ${tech.status === 'Actif' ? 'text-green-600' : 'text-gray-400'}`}>
                  {tech.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
