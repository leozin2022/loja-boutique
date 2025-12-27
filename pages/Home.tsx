
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { steinService } from '../services/steinService.ts';
import { Product } from '../types.ts';

interface HomeProps {
  scrollTarget?: string;
}

const Home: React.FC<HomeProps> = ({ scrollTarget }) => {
  const [highlights, setHighlights] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const data = await steinService.getAllProducts();
        setHighlights(data.slice(0, 3));
      } catch (err) {
        console.error("Erro ao carregar destaques", err);
      } finally {
        setIsLoading(false);
      }
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
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-slate-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105" alt="Hero" />
        <div className="relative z-10 text-center text-white px-4">
          <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 inline-block">Maison Lumière</span>
          <h1 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tighter">ESSÊNCIA.</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 opacity-80 font-medium">Curadoria de moda minimalista com gestão inteligente em tempo real.</p>
          <Link to="/shop" className="bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all inline-block">Descobrir Coleção</Link>
        </div>
      </section>

      <section id="novidades" className="py-24 bg-white dark:bg-background-dark px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-16 tracking-tight">O Que Há de Novo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {isLoading ? (
              <div className="col-span-full py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block"></div></div>
            ) : (
              highlights.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group text-left">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                  <p className="text-primary font-black">R$ {Number(p.price).toFixed(2)}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="localizacao" className="py-24 bg-slate-50 dark:bg-white/5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-surface-dark rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 border border-slate-100 dark:border-white/5">
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <h2 className="text-4xl font-black mb-6">Venha Nos Visitar</h2>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed">Rua José Anacleto da Silva, 123 - Osasco, SP.<br/>Sinta a qualidade dos nossos tecidos pessoalmente.</p>
              <button onClick={handleTraceRoute} className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold hover:bg-primary transition-all">
                <span className="material-symbols-outlined">directions</span>
                Ver no Google Maps
              </button>
            </div>
            <div className="h-[400px] lg:h-auto grayscale contrast-125">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.7839!3d-23.5359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzA5LjIiUyA0Nis0NycwMi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1634567890123!5m2!1spt-BR!2sbr" className="w-full h-full border-0" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
