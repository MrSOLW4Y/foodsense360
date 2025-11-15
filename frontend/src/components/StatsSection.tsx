import { TrendingUp, Users, Package, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: '250%',
      label: 'Aumento en Productividad',
      description: 'Promedio en 6 meses'
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Usuarios Activos',
      description: 'En toda la plataforma'
    },
    {
      icon: Package,
      value: '500K+',
      label: 'Productos Rastreados',
      description: 'Mensualmente'
    },
    {
      icon: Award,
      value: '100%',
      label: 'Certificación Orgánica',
      description: 'Cumplimiento garantizado'
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1690107504429-cd4831f627ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb3BvbmljJTIwZmFybSUyMG1vZGVybnxlbnwxfHx8fDE3NjMyMTQ4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Granja hidropónica moderna"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/20 shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722810767143-40a6a7a74b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MzE4NTY0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Vegetales orgánicos frescos"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722810767143-40a6a7a74b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MzE4NTY0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Productos frescos"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-emerald-400">Certificación</div>
                <p className="text-slate-300 mt-2">Estándares internacionales de calidad orgánica</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Resultados Comprobados
              </h2>
              <p className="text-slate-400">
                Nuestros clientes experimentan mejoras significativas en eficiencia, 
                trazabilidad y rentabilidad desde el primer día.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-emerald-400">{stat.value}</div>
                        <p className="text-white">{stat.label}</p>
                        <p className="text-slate-500">{stat.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
