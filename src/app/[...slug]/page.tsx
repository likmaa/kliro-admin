import { Hammer } from 'lucide-react';
import Link from 'next/link';

export default async function ConstructionPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.slug?.join(' / ') || 'Page';
  
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-6">
        <Hammer size={48} className="text-[#0D4A2A]" />
      </div>
      <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Module en développement</h1>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        La section <span className="font-bold text-gray-700 uppercase">{path}</span> est de niveau 2 (non-MVP) et sera construite ultérieurement.
      </p>
      <Link href="/" className="bg-[#0D4A2A] text-white px-6 py-3 rounded-lg font-bold text-sm shadow-sm hover:bg-[#0a3620] transition-colors">
        Retour au Dashboard
      </Link>
    </div>
  );
}
