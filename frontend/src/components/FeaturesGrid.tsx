import { Sprout, Truck, ShoppingCart, ClipboardCheck, BarChart3, Shield, Zap, Globe } from 'lucide-react';
import { Card } from './ui/card';

export function FeaturesGrid() {
  const features = [
    {
      icon: Sprout,
      title: 'Gestión de Cultivos',
      description: 'Monitoreo en tiempo real de todos tus cultivos orgánicos. Control de ciclos, riego, y condiciones ambientales.',
      color: 'emerald',
      id: 'cultivos'
    },
    {
      icon: Truck,
      title: 'Logística Inteligente',
      description: 'Optimiza rutas y tiempos de entrega. Mantén la cadena de frío y asegura la frescura de tus productos.',
      color: 'cyan',
      id: 'logistica'
    },
    {
      icon: ShoppingCart,
      title: 'Punto de Venta',
      description: 'Sistema POS integrado con gestión de inventario, facturación y análisis de ventas en tiempo real.',
      color: 'emerald',
      id: 'venta'
    },
    {
      icon: ClipboardCheck,
      title: 'Control de Calidad',
      description: 'Certificaciones orgánicas, análisis de laboratorio y cumplimiento de estándares internacionales.',
      color: 'cyan',
      id: 'calidad'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avanzado',
      description: 'Dashboard con métricas clave, predicciones de cosecha y análisis de rentabilidad.',
      color: 'emerald',
      id: 'analytics'
    },
    {
      icon: Shield,
      title: 'Trazabilidad Total',
      description: 'Blockchain para rastrear cada producto desde la semilla hasta el consumidor final.',
      color: 'cyan',
      id: 'trazabilidad'
    },
    {
      icon: Zap,
      title: 'Automatización',
      description: 'Procesos automatizados que reducen errores y aumentan la eficiencia operativa.',
      color: 'emerald',
      id: 'automatizacion'
    },
    {
      icon: Globe,
      title: 'Multi-ubicación',
      description: 'Gestiona múltiples granjas y puntos de venta desde una única plataforma centralizada.',
      color: 'cyan',
      id: 'multiubicacion'
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Módulos Integrados
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Una plataforma completa que abarca todas las necesidades de tu negocio de alimentos orgánicos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = feature.color === 'emerald' 
              ? 'from-emerald-500 to-emerald-600' 
              : 'from-cyan-500 to-cyan-600';
            const bgColorClass = feature.color === 'emerald'
              ? 'bg-emerald-500/10 border-emerald-500/20'
              : 'bg-cyan-500/10 border-cyan-500/20';

            return (
              <Card
                key={feature.id}
                id={feature.id}
                className="bg-slate-900/50 border-slate-800 hover:border-emerald-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/10 backdrop-blur-sm"
              >
                <div className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-lg ${bgColorClass} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 bg-gradient-to-br ${colorClass} bg-clip-text text-transparent`} 
                      style={{ filter: 'brightness(1.5)' }} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-white">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
