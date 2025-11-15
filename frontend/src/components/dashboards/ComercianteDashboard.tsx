import { ShoppingBag, MapPin, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type ComercianteDashboardProps = {
  userName: string;
};

export function ComercianteDashboard({ userName }: ComercianteDashboardProps) {
  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Tomates Orgánicos',
      quantity: '5 kg',
      status: 'En camino',
      date: '15 Nov 2025',
      farmer: 'Granja Verde',
      image: 'https://images.unsplash.com/photo-1722810767143-40a6a7a74b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MzE4NTY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'ORD-002',
      product: 'Lechugas Hidropónicas',
      quantity: '3 kg',
      status: 'Entregado',
      date: '13 Nov 2025',
      farmer: 'AgroTech Solutions',
      image: 'https://images.unsplash.com/photo-1690107504429-cd4831f627ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb3BvbmljJTIwZmFybSUyMG1vZGVybnxlbnwxfHx8fDE3NjMyMTQ4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const availableProducts = [
    {
      name: 'Fresas Orgánicas',
      farmer: 'Frutas del Campo',
      price: '$12.99/kg',
      certification: 'USDA Organic',
      available: true,
    },
    {
      name: 'Espinacas',
      farmer: 'Granja Verde',
      price: '$8.50/kg',
      certification: 'EU Organic',
      available: true,
    },
    {
      name: 'Zanahorias',
      farmer: 'Raíces Naturales',
      price: '$6.75/kg',
      certification: 'USDA Organic',
      available: false,
    },
  ];

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen">
      <div className="container mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-white">
            Hola, {userName}
          </h1>
          <p className="text-slate-400">Panel de Comercio - Gestión de Ventas y Distribución</p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 hover:border-emerald-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-400">Pedidos Totales</p>
                  <div className="text-white">24</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-400">En Camino</p>
                  <div className="text-white">2</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-yellow-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-slate-400">Productos Favoritos</p>
                  <div className="text-white">8</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400">Última Compra</p>
                  <div className="text-white">Hace 2 días</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Mis Pedidos Recientes</CardTitle>
              <CardDescription className="text-slate-400">Estado de tus últimas compras</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={order.image}
                      alt={order.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white">{order.product}</p>
                        <p className="text-slate-400">{order.quantity}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          order.status === 'En camino'
                            ? 'border-cyan-500/30 text-cyan-400'
                            : 'border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>{order.farmer}</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                Ver Todos los Pedidos
              </Button>
            </CardContent>
          </Card>

          {/* Available Products */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Productos Disponibles</CardTitle>
              <CardDescription className="text-slate-400">Productos frescos de agricultores locales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white">{product.name}</p>
                      {!product.available && (
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          Agotado
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-400">{product.farmer}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400">{product.price}</span>
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                        <Award className="w-3 h-3 mr-1" />
                        {product.certification}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    disabled={!product.available}
                    className={`${
                      product.available
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0'
                        : ''
                    }`}
                  >
                    Agregar
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                Explorar Catálogo Completo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Traceability Section */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Trazabilidad de Productos</CardTitle>
            <CardDescription className="text-slate-400">
              Rastrea el origen y trayectoria de tus productos orgánicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
              <p className="text-slate-300">Selecciona un pedido para ver su trazabilidad completa</p>
              <p className="text-slate-500 mt-2">
                Desde la semilla hasta tu negocio, cada paso documentado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
