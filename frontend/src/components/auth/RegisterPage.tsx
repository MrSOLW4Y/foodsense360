import { useState } from 'react';
import { Leaf, ArrowLeft, Eye, EyeOff, User, Mail, Lock, Building, Phone, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type RegisterPageProps = {
  onRegister: (userType: 'admin' | 'comerciante' | 'agricultor', name: string) => void;
  onNavigate: (page: 'home' | 'login' | 'register') => void;
};

export function RegisterPage({ onRegister, onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    email: '',
    password: '',
    confirmPassword: '',
    ubicacion: '',
    telefono: '',
    // Campos específicos por tipo
    contacto: '', // Para agricultor
    negocio: '', // Para comerciante
    correo_negocio: '', // Para comerciante
    userType: 'comerciante' as 'admin' | 'comerciante' | 'agricultor',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (formData.telefono.length !== 10) {
    alert("El teléfono debe tener 10 dígitos");
    return;
  }

  const payload = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    payload.append(key, value);
  });

  try {
    const response = await fetch("http://localhost/foodsense360/backend/register.php", {
      method: "POST",
      body: payload,
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Usuario registrado exitosamente");
    onRegister(formData.userType, formData.nombre);

  } catch (error) {
    console.error("Error:", error);
    alert("Error al conectar con el servidor");
  }
};


  const userTypes = [
    {
      value: 'comerciante',
      label: 'Comerciante',
      description: 'Compra y distribuye productos orgánicos',
      icon: Building,
    },
    {
      value: 'agricultor',
      label: 'Agricultor',
      description: 'Gestiona cultivos y producción',
      icon: Leaf,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4 py-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Back button */}
        <Button
          variant="ghost"
          className="text-slate-400 hover:text-emerald-400 mb-6"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <Leaf className="w-10 h-10 text-emerald-400" />
                <div className="absolute inset-0 blur-md bg-emerald-400/30"></div>
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                FoodSense360
              </span>
            </div>
            <h2 className="text-white mb-2">Crear Cuenta</h2>
            <p className="text-slate-400">Únete a la revolución de alimentos orgánicos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="text-slate-300">Tipo de Cuenta</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={(value: any) => setFormData({ ...formData, userType: value })}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.value}
                      className={`relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.userType === type.value
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                      }`}
                    >
                      <RadioGroupItem value={type.value} className="sr-only" />
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${
                          formData.userType === type.value ? 'text-emerald-400' : 'text-slate-400'
                        }`} />
                        <span className={`${
                          formData.userType === type.value ? 'text-emerald-400' : 'text-slate-300'
                        }`}>
                          {type.label}
                        </span>
                      </div>
                      <p className="text-slate-500">{type.description}</p>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Nombre y Apellidos */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-slate-300">
                  Nombre <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    maxLength={100}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido_p" className="text-slate-300">
                  Apellido Paterno <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="apellido_p"
                  type="text"
                  placeholder="Pérez"
                  value={formData.apellido_p}
                  onChange={(e) => setFormData({ ...formData, apellido_p: e.target.value })}
                  required
                  maxLength={25}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido_m" className="text-slate-300">
                  Apellido Materno <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="apellido_m"
                  type="text"
                  placeholder="García"
                  value={formData.apellido_m}
                  onChange={(e) => setFormData({ ...formData, apellido_m: e.target.value })}
                  required
                  maxLength={25}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Email y Teléfono */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Correo Electrónico <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-slate-300">
                  Teléfono <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="5512345678"
                    value={formData.telefono}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({ ...formData, telefono: value });
                      }
                    }}
                    required
                    pattern="[0-9]{10}"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10"
                  />
                </div>
                <p className="text-slate-500">10 dígitos sin espacios</p>
              </div>
            </div>

            {/* Campos específicos para Comerciante */}
            {formData.userType === 'comerciante' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="negocio" className="text-slate-300">
                    Nombre del Negocio <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="negocio"
                      type="text"
                      placeholder="Mi Tienda Orgánica"
                      value={formData.negocio}
                      onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                      required
                      maxLength={100}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo_negocio" className="text-slate-300">
                    Correo del Negocio
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="correo_negocio"
                      type="email"
                      placeholder="negocio@empresa.com"
                      value={formData.correo_negocio}
                      onChange={(e) => setFormData({ ...formData, correo_negocio: e.target.value })}
                      maxLength={255}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Campos específicos para Agricultor */}
            {formData.userType === 'agricultor' && (
              <div className="space-y-2">
                <Label htmlFor="contacto" className="text-slate-300">
                  Información de Contacto Adicional
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="contacto"
                    type="text"
                    placeholder="Nombre de granja, dirección, etc."
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    maxLength={100}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10"
                  />
                </div>
              </div>
            )}

            {/* Contraseñas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Contraseña <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">
                  Confirmar Contraseña <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={8}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <label className="flex items-start gap-3 text-slate-400 cursor-pointer">
              <input type="checkbox" required className="mt-1 rounded border-slate-700 bg-slate-800/50" />
              <span>
                Acepto los{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">
                  política de privacidad
                </a>
              </span>
            </label>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
            >
              Crear Cuenta
            </Button>

            {/* Login link */}
            <p className="text-center text-slate-400">
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Inicia sesión
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
