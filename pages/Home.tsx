
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { steinService } from '../services/steinService';
import { Product } from '../types';

interface HomeProps {
  scrollTarget?: string;
}

const Home: React.FC<HomeProps> = ({ scrollTarget }) => {
  const [highlights, setHighlights] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      const data = await steinService.getAllProducts();
      setHighlights(data.slice(0, 3));
      setIsLoading(false);
    };
    fetchHighlights();
  }, []);

  useEffect(() => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollTarget]);

  const handleTraceRoute = () => {
    const address = "Rua José Anacleto da Silva, 123, Osasco, SP";
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] w-full flex items-center justify-center bg-slate-900">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-block">Minimalismo & Luxo</span>
          <h1 className="text-6xl md:text-8xl font-black mb-6">LUMIÈRE</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">Sua boutique favorita agora com estoque sincronizado em tempo real.</p>
          <Link to="/shop" className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all">Ver Coleção</Link>
        </div>
      </section>

      {/* Highlights - ID Adicionado */}
      <section id="novidades" className="py-24 bg-white dark:bg-background-dark px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12">Novidades da Semana</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {isLoading ? (
              <div className="col-span-full text-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block"></div>
              </div>
            ) : (
              highlights.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group space-y-4">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {p.isPromotion && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-full animate-pulse">PROMOÇÃO</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <div className="flex gap-3 items-center">
                      <span className="font-bold text-primary">R$ {Number(p.price).toFixed(2)}</span>
                      {p.oldPrice && <span className="text-slate-400 line-through text-sm">R$ {Number(p.oldPrice).toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Map Section - ID Adicionado */}
      <section id="localizacao" className="py-24 bg-slate-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-surface-dark rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <span className="text-primary font-black tracking-widest uppercase text-xs mb-4">Onde Estamos</span>
              <h2 className="text-4xl font-black mb-6">Visite nosso Ateliê</h2>
              <p className="text-slate-500 mb-10 text-lg">Rua José Anacleto da Silva, 123 - Osasco, SP.<br/>Venha conhecer nossas peças exclusivas de perto.</p>
              <button 
                onClick={handleTraceRoute}
                className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl"
              >
                <span className="material-symbols-outlined">directions</span>
                Traçar Rota no Google Maps
              </button>
            </div>
            <div className="h-[400px] lg:h-auto relative grayscale">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.7839!3d-23.5359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzA5LjIiUyA0Nis0NycwMi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1634567890123!5m2!1spt-BR!2sbr" 
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
