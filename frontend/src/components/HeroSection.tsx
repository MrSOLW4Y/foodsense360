import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

type HeroSectionProps = {
  onNavigate: (page: 'home' | 'login' | 'register') => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Sistema de Gestión Integral</span>
            </div>

            <h1 className="bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Revoluciona la Gestión de Alimentos Orgánicos
            </h1>

            <p className="text-slate-400 max-w-xl">
              Controla cada etapa de tu producción orgánica con tecnología de vanguardia. 
              Desde el cultivo hasta el punto de venta, asegurando la máxima calidad y trazabilidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 group"
                onClick={() => onNavigate('register')}
              >
                Explorar Plataforma
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => onNavigate('login')}
              >
                Ver Demo
              </Button>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-emerald-400">99.9%</div>
                <p className="text-slate-500">Trazabilidad</p>
              </div>
              <div className="space-y-1">
                <div className="text-emerald-400">24/7</div>
                <p className="text-slate-500">Monitoreo</p>
              </div>
              <div className="space-y-1">
                <div className="text-emerald-400">+500</div>
                <p className="text-slate-500">Granjas</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759509295194-e85b92b24e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzMjE0ODUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Agricultura orgánica con tecnología"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}