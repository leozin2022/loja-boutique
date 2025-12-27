
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { steinService } from '../services/steinService.ts';
import { Product } from '../types.ts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const all = await steinService.getAllProducts();
        const found = all.find(p => p.id === id);
        if (found) {
          setProduct(found);
          setMainImage(found.image);
        }
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <div className="py-40 text-center"><div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full inline-block"></div></div>;
  if (!product) return <div className="py-20 text-center"><h2 className="text-2xl font-bold">Produto não encontrado</h2></div>;

  const productImages = [product.image, product.image2, product.image3, product.image4].filter(img => !!img);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden relative">
            <img src={mainImage} className="w-full h-full object-cover" alt={product.name} />
            {product.isPromotion && (
              <div className="absolute top-6 left-6">
                <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full shadow-xl">PROMOÇÃO DA SEMANA</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img || '')}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Miniatura ${idx}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-primary font-bold text-xs tracking-widest uppercase">{product.category}</span>
              <span className="text-slate-400 text-[10px] font-bold">REF: {product.sku}</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">R$ {Number(product.price).toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl text-slate-400 line-through">R$ {Number(product.oldPrice).toFixed(2)}</span>
              )}
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
          <a 
            href={`https://wa.me/5589999867161?text=Olá! Gostaria de mais informações sobre o produto: ${product.name} (REF: ${product.sku})`} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-primary text-white h-16 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:bg-primary-hover transition-all"
          >
            <span className="material-symbols-outlined">chat</span>
            Comprar pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
