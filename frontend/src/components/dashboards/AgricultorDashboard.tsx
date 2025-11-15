import { Sprout, TrendingUp, Package, AlertTriangle, Droplets, Thermometer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type AgricultorDashboardProps = {
  userName: string;
};

export function AgricultorDashboard({ userName }: AgricultorDashboardProps) {
  const activeCrops = [
    {
      name: 'Tomates Cherry',
      area: '2.5 ha',
      progress: 75,
      status: 'Crecimiento',
      harvest: '15 días',
      health: 'Excelente',
    },
    {
      name: 'Lechugas Hidropónicas',
      area: '1.2 ha',
      progress: 90,
      status: 'Pre-cosecha',
      harvest: '5 días',
      health: 'Excelente',
    },
    {
      name: 'Fresas Orgánicas',
      area: '3.0 ha',
      progress: 45,
      status: 'Floración',
      harvest: '30 días',
      health: 'Buena',
    },
  ];

  const environmentalData = [
    { label: 'Temperatura', value: '22°C', icon: Thermometer, status: 'optimal' },
    { label: 'Humedad', value: '65%', icon: Droplets, status: 'optimal' },
    { label: 'pH del Suelo', value: '6.5', icon: Sprout, status: 'optimal' },
  ];

  const recentAlerts = [
    {
      message: 'Riego programado para mañana - Tomates Cherry',
      type: 'info',
      time: 'Hace 1 hora',
    },
    {
      message: 'Revisión de pH recomendada - Zona B',
      type: 'warning',
      time: 'Hace 3 horas',
    },
    {
      message: 'Cosecha completada - Zanahorias Orgánicas',
      type: 'success',
      time: 'Hace 5 horas',
    },
  ];

  const salesStats = [
    { label: 'Ventas del Mes', value: '$12,450', change: '+15.3%' },
    { label: 'Productos Activos', value: '24', change: '+3' },
    { label: 'Pedidos Pendientes', value: '8', change: '-2' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen">
      <div className="container mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-white">
            Bienvenido, {userName}
          </h1>
          <p className="text-slate-400">Panel de Control - Gestión de Cultivos</p>
        </div>

        {/* Environmental Monitoring */}
        <div className="grid sm:grid-cols-3 gap-6">
          {environmentalData.map((data, index) => {
            const Icon = data.icon;
            return (
              <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-emerald-500/30 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-slate-400">{data.label}</p>
                      <div className="text-white">{data.value}</div>
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-400"
                      >
                        Óptimo
                      </Badge>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sales Stats */}
        <div className="grid sm:grid-cols-3 gap-6">
          {salesStats.map((stat, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-800">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-slate-400">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white">{stat.value}</span>
                    <span className="text-emerald-400">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Crops */}
          <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Cultivos Activos</CardTitle>
              <CardDescription className="text-slate-400">Estado actual de tus plantaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeCrops.map((crop, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <p className="text-white">{crop.name}</p>
                        <Badge
                          variant="outline"
                          className={`${
                            crop.health === 'Excelente'
                              ? 'border-emerald-500/30 text-emerald-400'
                              : 'border-cyan-500/30 text-cyan-400'
                          }`}
                        >
                          {crop.health}
                        </Badge>
                      </div>
                      <p className="text-slate-400">
                        {crop.area} • {crop.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400">Cosecha en</p>
                      <p className="text-emerald-400">{crop.harvest}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Progreso</span>
                      <span>{crop.progress}%</span>
                    </div>
                    <Progress value={crop.progress} className="h-2 bg-slate-700" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-700 text-slate-400 hover:bg-slate-800"
                    >
                      Registrar Actividad
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Alertas y Notificaciones</CardTitle>
              <CardDescription className="text-slate-400">Actualizaciones recientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    alert.type === 'info'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : alert.type === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="flex gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        alert.type === 'info'
                          ? 'text-blue-400'
                          : alert.type === 'warning'
                          ? 'text-yellow-400'
                          : 'text-emerald-400'
                      }`}
                    />
                    <div className="space-y-1">
                      <p className="text-slate-300">{alert.message}</p>
                      <p className="text-slate-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                Ver Todas las Alertas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
            <CardDescription className="text-slate-400">Gestiona tus operaciones diarias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                className="h-auto py-4 flex-col gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                variant="outline"
              >
                <Sprout className="w-6 h-6" />
                <span>Registrar Cultivo</span>
              </Button>
              <Button
                className="h-auto py-4 flex-col gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                variant="outline"
              >
                <Package className="w-6 h-6" />
                <span>Nuevo Producto</span>
              </Button>
              <Button
                className="h-auto py-4 flex-col gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                variant="outline"
              >
                <TrendingUp className="w-6 h-6" />
                <span>Ver Análisis</span>
              </Button>
              <Button
                className="h-auto py-4 flex-col gap-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400"
                variant="outline"
              >
                <AlertTriangle className="w-6 h-6" />
                <span>Reportar Incidencia</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
