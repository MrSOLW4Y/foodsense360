import { Leaf, Menu, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type HeaderProps = {
  isAuthenticated: boolean;
  userName?: string;
  userType?: 'admin' | 'comerciante' | 'agricultor';
  onLogout?: () => void;
  onNavigate?: (page: 'home' | 'login' | 'register') => void;
};

export function Header({ isAuthenticated, userName, userType, onLogout, onNavigate }: HeaderProps) {
  const navItems = [
    { label: 'Cultivos', href: '#cultivos' },
    { label: 'Logística', href: '#logistica' },
    { label: 'Punto de Venta', href: '#venta' },
    { label: 'Calidad', href: '#calidad' },
  ];

  const getUserTypeLabel = (type?: string) => {
    switch (type) {
      case 'admin': return 'Administrador';
      case 'comerciante': return 'Comerciante';
      case 'agricultor': return 'Agricultor';
      default: return '';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-emerald-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <div className="absolute inset-0 blur-md bg-emerald-400/30"></div>
            </div>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FoodSense360
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-300 hover:text-emerald-400 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all"></span>
                </a>
              ))}
            </nav>
          )}

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-slate-300 hover:text-emerald-400 gap-2">
                    <User className="w-4 h-4" />
                    {userName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-900 border-slate-800">
                  <DropdownMenuLabel className="text-emerald-400">
                    {getUserTypeLabel(userType)}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="text-slate-300 hover:text-emerald-400 focus:text-emerald-400">
                    Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-emerald-400 focus:text-emerald-400">
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="text-red-400 hover:text-red-300 focus:text-red-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-slate-300 hover:text-emerald-400"
                  onClick={() => onNavigate?.('login')}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
                  onClick={() => onNavigate?.('register')}
                >
                  Comenzar
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-emerald-400" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-slate-950 border-emerald-500/20">
              <nav className="flex flex-col gap-6 mt-8">
                {!isAuthenticated && navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="text-emerald-400 pb-2 border-b border-slate-800">
                        {userName}
                        <div className="text-slate-500">{getUserTypeLabel(userType)}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-red-400 hover:text-red-300 justify-start"
                        onClick={onLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        className="text-slate-300 hover:text-emerald-400"
                        onClick={() => onNavigate?.('login')}
                      >
                        Iniciar Sesión
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
                        onClick={() => onNavigate?.('register')}
                      >
                        Comenzar
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}