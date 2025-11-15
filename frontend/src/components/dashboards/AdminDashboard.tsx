import { Users, Package, TrendingUp, AlertCircle, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type AdminDashboardProps = {
  userName: string;
};

export function AdminDashboard({ userName }: AdminDashboardProps) {
  const stats = [
    {
      title: 'Usuarios Totales',
      value: '2,543',
      change: '+12.5%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Productos Activos',
      value: '1,234',
      change: '+8.2%',
      icon: Package,
      trend: 'up',
    },
    {
      title: 'Ingresos Totales',
      value: '$45,231',
      change: '+23.1%',
      icon: TrendingUp,
      trend: 'up',
    },
    {
      title: 'Alertas Pendientes',
      value: '12',
      change: '-4.3%',
      icon: AlertCircle,
      trend: 'down',
    },
  ];

  const recentActivities = [
    { user: 'Juan Pérez', action: 'Nuevo cultivo registrado', time: 'Hace 5 min', type: 'cultivo' },
    { user: 'María García', action: 'Pedido completado', time: 'Hace 12 min', type: 'venta' },
    { user: 'Carlos López', action: 'Certificación actualizada', time: 'Hace 23 min', type: 'calidad' },
    { user: 'Ana Martínez', action: 'Ruta optimizada', time: 'Hace 1 hora', type: 'logistica' },
  ];

  const systemAlerts = [
    { message: 'Actualización del sistema disponible', severity: 'info' },
    { message: '3 certificaciones por vencer', severity: 'warning' },
    { message: 'Backup completado exitosamente', severity: 'success' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen">
      <div className="container mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-white">
            Bienvenido, {userName}
          </h1>
          <p className="text-slate-400">Panel de Administración - FoodSense360</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-emerald-500/30 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-slate-400">{stat.title}</CardTitle>
                  <Icon className="w-4 h-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-white">{stat.value}</div>
                  <p className={`text-${stat.trend === 'up' ? 'emerald' : 'red'}-400 mt-1`}>
                    {stat.change} desde el último mes
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Vista General
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Actividad Reciente</CardTitle>
                  <CardDescription className="text-slate-400">Últimas acciones en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'cultivo' ? 'bg-emerald-400' :
                          activity.type === 'venta' ? 'bg-cyan-400' :
                          activity.type === 'calidad' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`}></div>
                        <div className="flex-1 space-y-1">
                          <p className="text-white">{activity.user}</p>
                          <p className="text-slate-400">{activity.action}</p>
                          <p className="text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Alertas del Sistema</CardTitle>
                  <CardDescription className="text-slate-400">Notificaciones importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        alert.severity === 'info' ? 'bg-blue-500/10 border-blue-500/30' :
                        alert.severity === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-emerald-500/10 border-emerald-500/30'
                      }`}>
                        <div className="flex items-center gap-3">
                          <AlertCircle className={`w-5 h-5 ${
                            alert.severity === 'info' ? 'text-blue-400' :
                            alert.severity === 'warning' ? 'text-yellow-400' :
                            'text-emerald-400'
                          }`} />
                          <p className="text-slate-300">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Usuarios</CardTitle>
                <CardDescription className="text-slate-400">Administra todos los usuarios del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p>Panel de gestión de usuarios</p>
                  <p className="mt-2">Próximamente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Análisis y Reportes</CardTitle>
                <CardDescription className="text-slate-400">Métricas y estadísticas detalladas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-400">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p>Dashboard de análisis</p>
                  <p className="mt-2">Próximamente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Configuración del Sistema</CardTitle>
                <CardDescription className="text-slate-400">Ajustes generales de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-400">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p>Panel de configuración</p>
                  <p className="mt-2">Próximamente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
