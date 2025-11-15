import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { ComercianteDashboard } from './components/dashboards/ComercianteDashboard';
import { AgricultorDashboard } from './components/dashboards/AgricultorDashboard';

type UserType = 'admin' | 'comerciante' | 'agricultor' | null;
type Page = 'home' | 'login' | 'register';

export default function App() {
  const [user, setUser] = useState<UserType>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userName, setUserName] = useState<string>('');

  const handleLogin = (userType: UserType, name: string) => {
    setUser(userType);
    setUserName(name);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setUserName('');
    setCurrentPage('home');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  // Si el usuario está logueado, mostrar dashboard según su tipo
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
        <Header 
          isAuthenticated={true} 
          userName={userName}
          userType={user}
          onLogout={handleLogout} 
        />
        <main>
          {user === 'admin' && <AdminDashboard userName={userName} />}
          {user === 'comerciante' && <ComercianteDashboard userName={userName} />}
          {user === 'agricultor' && <AgricultorDashboard userName={userName} />}
        </main>
      </div>
    );
  }

  // Si no está logueado, mostrar según la página actual
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'register') {
    return <RegisterPage onRegister={handleLogin} onNavigate={handleNavigate} />;
  }

  // Página de inicio para usuarios no logueados
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
      <Header 
        isAuthenticated={false} 
        onNavigate={handleNavigate}
      />
      <main>
        <HeroSection onNavigate={handleNavigate} />
        <FeaturesGrid />
        <StatsSection />
        <CTASection onNavigate={handleNavigate} />
      </main>
    </div>
  );
}