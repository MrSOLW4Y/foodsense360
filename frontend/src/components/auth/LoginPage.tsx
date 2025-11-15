import { useState } from 'react';
import { Leaf, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';

type LoginPageProps = {
  onLogin: (userType: 'admin' | 'comerciante' | 'agricultor', name: string) => void;
  onNavigate: (page: 'home' | 'login' | 'register') => void;
};

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost/foodsense360/backend/login.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        onLogin(data.tipo_usuario, data.nombre);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Button
          variant="ghost"
          className="text-slate-400 hover:text-emerald-400 mb-6"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-white mb-2">Iniciar Sesión</h2>
            <p className="text-slate-400">Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
            >
              Iniciar Sesión
            </Button>
            <p className="text-center text-slate-400">
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Crea tu cuenta aquí
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
