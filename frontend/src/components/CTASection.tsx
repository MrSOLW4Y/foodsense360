import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type CTASectionProps = {
  onNavigate: (page: 'home' | 'login' | 'register') => void;
};

export function CTASection({ onNavigate }: CTASectionProps) {
  const benefits = [
    'Prueba gratuita de 30 días',
    'Sin tarjeta de crédito requerida',
    'Soporte técnico 24/7',
    'Implementación guiada'
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-emerald-500/10"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(52 211 153 / 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>

          <div className="relative z-10 p-12 md:p-20 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Comienza a Optimizar tu Producción Hoy
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Únete a cientos de productores que ya están revolucionando 
                la gestión de sus alimentos orgánicos con FoodSense360.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Email signup form */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                />
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 group whitespace-nowrap"
                  onClick={() => onNavigate('register')}
                >
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-slate-500 mt-3">
                Al registrarte, aceptas nuestros términos y condiciones
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500">
              © 2025 FoodSense360. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                Términos
              </a>
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}