
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate the password
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Decoration */}
      <div className="hidden lg:block w-1/2 relative bg-neutral-900">
        <img alt="Boutique Interior" className="absolute inset-0 w-full h-full object-cover opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA22KYOeliWV7gin1PXche84HqWKOrd-jM98LUCVS9ij6G9A0kDnhLtxdyNz18FNUPJ7hsvC0cujT3wkTDbKRfGoyROYvQheihMewGEfmHpDNcxn-B6rtk_VOFL3oEcr2UEQq2jbZmoTbiaoJG4BqfHPw28WnV4J00j45-kZKqX03FdmAJ8e0Oi87rQY9R-EgSyp01W3GquwsTpQwAeLtpjuXhLjIx77__0H8zRr9_D0DGEB84RFQ0GTqTrJ9Phkr3nrF2N5dFhXX5v" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-20 left-12 max-w-md">
          <p className="text-3xl text-white font-medium italic">"A elegância é a única beleza que nunca desaparece."</p>
          <p className="mt-4 text-white/60 font-bold">— Audrey Hepburn</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-background-dark">
        <div className="max-w-md w-full space-y-12">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined !text-[40px] text-primary">diamond</span>
            <span className="text-2xl font-display font-black text-slate-900 dark:text-white">BOUTIQUE ADMIN</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Bem-vindo</h1>
            <p className="text-slate-500">Acesse o painel para gerenciar sua boutique.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Senha de Acesso</label>
              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="Digite sua senha" 
                  className="w-full bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl h-14 px-5 focus:ring-primary focus:border-primary transition-all text-lg"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white h-14 rounded-xl font-bold shadow-xl shadow-primary/30 transition-all active:scale-95">
              Entrar no Painel
            </button>
          </form>

          <div className="pt-8 border-t border-slate-100 dark:border-white/5">
            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
              <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
              Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
