
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  if (isAdminPage) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-display font-bold text-2xl tracking-tight text-primary">BOUTIQUE.</span>
            </Link>
            
            {/* Menu Centralizado e Funcional */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link to="/" className="font-display text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Início</Link>
              <Link to="/shop" className="font-display text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Novidades</Link>
              <a href="#/localizacao" className="font-display text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Localização</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-full text-slate-500 hover:text-primary transition-all text-xs font-bold border border-slate-100 dark:border-white/10">
                <span className="material-symbols-outlined !text-[18px]">admin_panel_settings</span>
                Painel
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="font-display font-bold text-2xl tracking-tight text-primary mb-4 block">BOUTIQUE.</span>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Curadoria de moda minimalista para a mulher moderna. Encontre sua essência em cada detalhe.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Comprar</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/shop" className="hover:text-primary transition-colors">Novidades</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Mais Vendidos</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Coleções</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Ajuda</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Rastrear Pedido</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guia de Tamanhos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Newsletter</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Receba novidades e 10% off.</p>
              <div className="flex">
                <input className="w-full bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-l-lg text-sm focus:ring-primary focus:border-primary" placeholder="Seu e-mail" type="email" />
                <button className="bg-primary text-white px-4 rounded-r-lg hover:bg-primary/90 transition-colors">OK</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 dark:text-slate-500">© 2024 Lumière Boutique. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AdminAddProduct />} />
          {/* Rota de compatibilidade para âncora de localização na home */}
          <Route path="/localizacao" element={<Home scrollTarget="localizacao" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
