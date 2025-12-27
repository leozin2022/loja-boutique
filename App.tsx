
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Login from './pages/Login.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import AdminAddProduct from './pages/AdminAddProduct.tsx';

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
            
            <div className="hidden md:flex space-x-10 items-center">
              <Link to="/" className="font-display text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Início</Link>
              <Link to="/shop" className="font-display text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Novidades</Link>
              <Link to="/localizacao" className="font-display text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Localização</Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
           <p className="text-xs text-slate-400 dark:text-slate-500">© 2024 Lumière Boutique. Todos os direitos reservados.</p>
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
          <Route path="/localizacao" element={<Home scrollTarget="localizacao" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
