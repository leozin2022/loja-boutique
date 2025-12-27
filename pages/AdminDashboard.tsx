
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { steinService } from '../services/steinService';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await steinService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product: Product) => {
    const id = product.id;
    const name = product.name || 'esta peça';
    
    if (window.confirm(`ATENÇÃO: Deseja excluir permanentemente a peça "${name}" da sua planilha?`)) {
      setDeletingId(id);
      try {
        const result = await steinService.deleteProduct(id);
        if (result.success) {
          // Remove da tela na hora
          setProducts(prev => prev.filter(p => p.id !== id));
          console.log("Peça removida com sucesso!");
        } else {
          alert(`Não foi possível excluir: ${result.message}`);
        }
      } catch (err) {
        alert("Erro ao conectar com a planilha. Tente novamente.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white transition-colors">
      {/* Top Bar Navigation */}
      <div className="fixed top-0 right-0 left-0 lg:left-72 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md h-16 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-6 z-40">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Painel Administrativo</h3>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-slate-600 dark:text-slate-300 font-bold text-xs hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined !text-[16px]">logout</span>
          Ver Loja
        </button>
      </div>

      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-white/5 hidden lg:flex flex-col fixed h-screen z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">diamond</span>
            </div>
            <h1 className="text-xl font-display font-black tracking-tight">LUMIÈRE</h1>
          </div>

          <nav className="space-y-2">
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 transition-all">
              <span className="material-symbols-outlined icon-filled">inventory_2</span>
              Estoque Geral
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 font-bold text-sm transition-all text-left cursor-not-allowed opacity-50">
              <span className="material-symbols-outlined">analytics</span>
              Relatórios
            </button>
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planilha Ativa</p>
          </div>
          <p className="text-[10px] text-slate-500 font-medium italic">Sincronizado via SteinHQ</p>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 p-6 pt-24 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-display font-black mb-2">Inventário</h2>
              <p className="text-slate-500 font-medium">Gerencie suas peças diretamente na planilha do Google.</p>
            </div>
            <Link to="/admin/add" className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 transition-all hover:scale-105">
              <span className="material-symbols-outlined">add_circle</span>
              Cadastrar Peça
            </Link>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-[32px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="py-32 text-center flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold text-sm animate-pulse">Consultando Planilha...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center flex flex-col items-center gap-4">
                <span className="material-symbols-outlined !text-[64px] text-slate-200">inventory</span>
                <p className="text-slate-500 font-medium">Nenhum produto encontrado no estoque.</p>
                <Link to="/admin/add" className="text-primary font-bold hover:underline">Cadastrar primeira peça</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Peça</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">SKU</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Estoque</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Preço</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden flex-shrink-0">
                              <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{p.name}</p>
                              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{p.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-500">{p.sku}</td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock > 5 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                            {p.stock} UN
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-bold text-sm">R$ {Number(p.price).toFixed(2)}</p>
                          {p.isPromotion && <p className="text-[8px] font-black text-primary uppercase">Em Promoção</p>}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleDelete(p)}
                              disabled={deletingId === p.id}
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                            >
                              {deletingId === p.id ? (
                                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <span className="material-symbols-outlined !text-[20px]">delete</span>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
