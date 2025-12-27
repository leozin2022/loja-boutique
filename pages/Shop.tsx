
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { steinService } from '../services/steinService';
import { Category, Product } from '../types';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(Category.ALL);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await steinService.getAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === Category.ALL 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4">Coleção Completa</h1>
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="group bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Selo de Promoção Redesenhado */}
                {p.isPromotion && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-primary bg-gradient-to-r from-primary to-primary-hover text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-primary/40 animate-pulse-soft border border-white/20">
                      PROMOÇÃO
                    </div>
                  </div>
                )}

                {/* Selo de Novo (Aparece se não for promoção) */}
                {p.isNew && !p.isPromotion && (
                  <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full border border-white/10">
                    NOVO
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.category}</p>
                </div>
                <h3 className="font-bold text-lg mb-2 truncate group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="font-black text-primary text-xl">R$ {Number(p.price).toFixed(2)}</span>
                  {p.oldPrice && (
                    <span className="text-slate-400 line-through text-sm font-medium">R$ {Number(p.oldPrice).toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
