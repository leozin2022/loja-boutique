
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { generateProductDescription } from '../services/geminiService';
import { steinService } from '../services/steinService';
import { Category } from '../types';

const AdminAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(Category.DRESSES);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('10');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [isPromotion, setIsPromotion] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !sku || !price || !img1) return alert("Preencha os campos obrigatórios (Nome, SKU, Preço e Imagem 1).");
    
    setIsSaving(true);
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      category: category,
      price: price,
      oldPrice: oldPrice || "", 
      image1: img1.trim(), // Ajustado para image1 para bater com a planilha
      image2: img2.trim(),
      image3: img3.trim(),
      image4: img4.trim(),
      description: description.trim(),
      sku: sku.trim(),
      stock: stock,
      isBestSeller: 'false',
      isNew: 'true',
      isPromotion: isPromotion ? 'true' : 'false'
    };

    const result = await steinService.addProduct(newProduct);
    if (result.success) {
      alert("Sucesso! Peça cadastrada com todas as imagens.");
      navigate('/admin');
    } else {
      alert("Erro ao salvar. Verifique o console ou as colunas da sua planilha.");
    }
    setIsSaving(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-background-dark">
      <div className="fixed top-4 right-4 z-[60] flex gap-2">
        <Link to="/admin" className="bg-white shadow-lg px-4 py-2 rounded-full text-slate-600 font-bold text-sm">Voltar</Link>
        <button onClick={() => navigate('/')} className="bg-white shadow-xl px-4 py-2 rounded-full text-red-500 font-bold text-sm">Sair</button>
      </div>

      <main className="flex-1 p-6 pt-24 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black">Cadastrar Nova Peça</h2>
          <button onClick={handleSave} disabled={isSaving} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg">
            {isSaving ? 'Salvando...' : 'Publicar'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status Promocional</label>
                <button 
                  onClick={() => setIsPromotion(!isPromotion)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${isPromotion ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}
                >
                  {isPromotion ? 'PROMOÇÃO ATIVA' : 'MARCAR PROMOÇÃO?'}
                </button>
              </div>

              <div className="space-y-4">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da Peça" className="w-full bg-slate-50 border-none rounded-xl h-12 px-4" />
                <div className="grid grid-cols-2 gap-4">
                  <input value={sku} onChange={e => setSku(e.target.value)} placeholder="SKU" className="w-full bg-slate-50 border-none rounded-xl h-12 px-4" />
                  <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full bg-slate-50 border-none rounded-xl h-12 px-4">
                    {Object.values(Category).filter(c => c !== Category.ALL).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Preço Venda" className="w-full bg-slate-50 border-none rounded-xl h-12 px-4" />
                  <input type="number" value={oldPrice} onChange={e => setOldPrice(e.target.value)} placeholder="Preço Original (Risco)" className="w-full bg-slate-50 border-none rounded-xl h-12 px-4" />
                </div>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Descrição..." className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Imagens (Use URLs ou Base64)</label>
            <div className="grid grid-cols-1 gap-2 mb-4">
              <input value={img1} onChange={e => setImg1(e.target.value)} placeholder="URL Foto 1 (Capa)" className="text-xs bg-slate-50 border-none rounded-lg p-3" />
              <input value={img2} onChange={e => setImg2(e.target.value)} placeholder="URL Foto 2" className="text-xs bg-slate-50 border-none rounded-lg p-3" />
              <input value={img3} onChange={e => setImg3(e.target.value)} placeholder="URL Foto 3" className="text-xs bg-slate-50 border-none rounded-lg p-3" />
              <input value={img4} onChange={e => setImg4(e.target.value)} placeholder="URL Foto 4" className="text-xs bg-slate-50 border-none rounded-lg p-3" />
            </div>
            <div className="grid grid-cols-4 gap-2 h-24">
              <div className="bg-slate-100 rounded-lg overflow-hidden">{img1 && <img src={img1} className="w-full h-full object-cover" />}</div>
              <div className="bg-slate-100 rounded-lg overflow-hidden">{img2 && <img src={img2} className="w-full h-full object-cover" />}</div>
              <div className="bg-slate-100 rounded-lg overflow-hidden">{img3 && <img src={img3} className="w-full h-full object-cover" />}</div>
              <div className="bg-slate-100 rounded-lg overflow-hidden">{img4 && <img src={img4} className="w-full h-full object-cover" />}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAddProduct;
