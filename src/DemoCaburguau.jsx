import { useState, useEffect } from 'react'
import { ShoppingCart, Trash2, Send, PawPrint, MapPin, Clock, X, Plus, Search, Filter, Star, Truck } from 'lucide-react'
import { Toaster, toast } from 'sonner'

export default function DemoCaburguau() {
  // 1. DATOS DE EJEMPLO
  const productosBase = [
    { id: 1, nombre: 'Fit Formula Adulto', marca: 'Fit Formula', tipo: 'Perro', precio: 24990, imagen: '🐕', desc: 'Saco 20kg', popular: true },
    { id: 2, nombre: 'Bokato Gold', marca: 'Bokato', tipo: 'Perro', precio: 28990, imagen: '🍖', desc: 'Premium 15kg', popular: false },
    { id: 3, nombre: 'Taste of the Wild', marca: 'TotW', tipo: 'Perro', precio: 54990, imagen: '🐺', desc: 'High Prairie', popular: true },
    { id: 4, nombre: 'Fit Formula Gato', marca: 'Fit Formula', tipo: 'Gato', precio: 22990, imagen: '🐈', desc: 'Saco 10kg', popular: true },
    { id: 5, nombre: 'Lata Húmeda', marca: 'Catz', tipo: 'Gato', precio: 1990, imagen: '🥫', desc: 'Paté Pollo', popular: false },
    { id: 6, nombre: 'Churu Variedades', marca: 'Inaba', tipo: 'Gato', precio: 2500, imagen: '🍬', desc: 'Pack 4 un', popular: true },
    { id: 7, nombre: 'Nomade Adulto', marca: 'Nomade', tipo: 'Perro', precio: 35990, imagen: '🐕', desc: 'Saco 20kg', popular: false },
    { id: 8, nombre: 'Master Dog Cachorro', marca: 'Master Dog', tipo: 'Perro', precio: 28990, imagen: '🐶', desc: 'Saco 18kg', popular: false },
  ]

  // 2. LÓGICA DE HORARIOS
  const calcularHorariosDisponibles = () => {
    const horaActual = new Date().getHours();
    const opciones = [];
    
    // Si es antes de las 14:00, alcanzamos al reparto de mediodía
    if (horaActual < 14) {
        opciones.push("HOY - Mediodia (12:45 - 15:00)");
    }
    // Si es antes de las 19:00, alcanzamos al reparto de tarde
    if (horaActual < 19) {
        opciones.push("HOY - Tarde (17:30 - 20:00)");
    }

    opciones.push("MANANA - Mediodia (12:45 - 15:00)");
    opciones.push("MANANA - Tarde (17:30 - 20:00)");

    return opciones;
  };

  const horariosDisponibles = calcularHorariosDisponibles();

  // 3. ESTADOS
  const [carrito, setCarrito] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [datosCliente, setDatosCliente] = useState({ nombre: '', direccion: '', horario: horariosDisponibles[0] })
  const [busqueda, setBusqueda] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('Todos')

  useEffect(() => {
    setDatosCliente(prev => ({ ...prev, horario: horariosDisponibles[0] }))
  }, [])

  // 4. LÓGICA DE FILTRADO
  const productosFiltrados = productosBase.filter(prod => {
      const coincideTexto = prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                            prod.marca.toLowerCase().includes(busqueda.toLowerCase());
      const coincideTipo = filtroTipo === 'Todos' || prod.tipo === filtroTipo;
      return coincideTexto && coincideTipo;
  })

  // 5. FUNCIONES CARRITO
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
    toast.success(`${producto.nombre} agregado!`)
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id))
  }

  const totalCarrito = carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0)

  // 6. ENVIAR A WHATSAPP (FORMATO LIMPIO SIN EMOJIS)
  const enviarPedido = (e) => {
    e.preventDefault()
    
    // Construimos el mensaje como lista limpia
    const lineas = [];
    
    lineas.push(`Hola Caburguau, soy *${datosCliente.nombre}*.`);
    lineas.push("Quisiera hacer el siguiente pedido web:");
    lineas.push(""); // Espacio
    
    // Lista de productos con guión
    carrito.forEach(p => {
        lineas.push(` - ${p.cantidad} x ${p.nombre} ($${(p.precio * p.cantidad).toLocaleString('es-CL')})`);
    });
    
    lineas.push("");
    lineas.push(`*TOTAL A PAGAR: $${totalCarrito.toLocaleString('es-CL')}*`);
    lineas.push("------------------------------");
    lineas.push("*DATOS DE DESPACHO:*");
    lineas.push("");
    // Indentamos los datos para que se vea ordenado
    lineas.push(` - Direccion: ${datosCliente.direccion}`);
    lineas.push(` - Reparto: ${datosCliente.horario}`);
    lineas.push("");
    lineas.push("(Quedo atento a los datos para transferir)");

    const mensajeFinal = lineas.join("\n");
    // Usamos encodeURIComponent para asegurar que llegue perfecto
    const url = `https://wa.me/56944743753?text=${encodeURIComponent(mensajeFinal)}`;
    
    window.open(url, '_blank');
    setModalAbierto(false);
    setCarrito([]);
    toast.success('Abriendo chat de WhatsApp...');
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="bg-emerald-600 text-white sticky top-0 z-30 shadow-xl">
        <div className="bg-emerald-800 text-emerald-100 text-[10px] md:text-xs font-bold py-1.5 px-4 text-center flex justify-center items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>LOCAL ABIERTO • HORA: {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
        </div>

        <div className="p-4 pb-2 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                    <PawPrint className="text-emerald-200" /> CABURGUAU
                </h1>
                
                <button onClick={() => setModalAbierto(true)} className="relative p-2 bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-colors border border-emerald-500">
                    <ShoppingCart size={24} />
                    {carrito.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm border-2 border-emerald-600">
                        {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                    </span>
                    )}
                </button>
            </div>

            <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Buscar producto (Ej: Fit Formula)..." 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-emerald-400/50 shadow-lg placeholder:text-slate-400 placeholder:font-normal transition-all"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
        </div>
      </header>

      {/* FILTROS */}
      <div className="bg-white border-b border-slate-100 sticky top-[125px] md:top-[130px] z-20 shadow-sm">
         <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
            {['Todos', 'Perro', 'Gato'].map(filtro => (
                <button 
                    key={filtro}
                    onClick={() => setFiltroTipo(filtro)}
                    className={`px-5 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                        filtroTipo === filtro 
                        ? 'bg-emerald-100 border-emerald-200 text-emerald-700 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    {filtro}
                </button>
            ))}
         </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 flex-grow w-full">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Filter size={12}/> Catálogo Disponible
        </h2>
        
        {productosFiltrados.length === 0 ? (
            <div className="text-center py-20 opacity-50">
                <p className="text-6xl mb-4">🔍</p>
                <p className="font-medium text-slate-600">No encontramos productos.</p>
                <button onClick={() => setBusqueda('')} className="mt-2 text-emerald-600 font-bold underline">Ver todo</button>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {productosFiltrados.map(prod => (
                <div key={prod.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-xl hover:border-emerald-200 transition-all duration-300 relative overflow-hidden">
                
                {prod.popular && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-sm">
                        <Star size={8} fill="currentColor" /> POPULAR
                    </div>
                )}

                <div className="text-center mt-4 mb-2">
                    <div className="text-6xl md:text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">{prod.imagen}</div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{prod.marca}</p>
                    <h3 className="font-bold text-slate-800 leading-tight text-sm md:text-base h-10 flex items-center justify-center">{prod.nombre}</h3>
                    <p className="text-xs text-slate-500">{prod.desc}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-50">
                    <div className="flex justify-between items-end">
                        <p className="text-lg md:text-xl font-black text-slate-800">${prod.precio.toLocaleString('es-CL')}</p>
                        <button 
                            onClick={() => agregarAlCarrito(prod)}
                            className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90 shadow-sm flex items-center justify-center"
                        >
                            <Plus size={20} strokeWidth={3}/>
                        </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
      </main>
      
      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-xs mt-auto">
         <div className="max-w-4xl mx-auto px-4">
             <div className="mb-6 flex justify-center">
                 <PawPrint size={40} className="text-slate-700"/>
             </div>
             <p className="font-black text-white text-base mb-2">CABURGUAU MELIPILLA</p>
             <p className="mb-6">Av. Libertad 2031 • +56 9 4474 3753</p>
             <div className="border-t border-slate-800 pt-6">
                <p className="opacity-40">Desarrollado con ❤️ por Matías Pajarito</p>
             </div>
         </div>
      </footer>

      {/* MODAL CARRITO */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-sm transition-all">
           <div className="bg-white w-full max-w-md md:rounded-3xl rounded-t-3xl p-6 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <ShoppingCart className="text-emerald-500" fill="currentColor" /> Tu Pedido
                </h2>
                <button onClick={() => setModalAbierto(false)} className="bg-slate-100 text-slate-400 p-2 rounded-full hover:bg-slate-200 transition-colors"><X size={20}/></button>
              </div>

              {carrito.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl border border-slate-100">🦴</div>
                    <p className="text-slate-800 font-bold text-lg">Tu carrito está vacío</p>
                    <p className="text-slate-400 text-sm mb-6">¡Agrega algo rico para tu mascota!</p>
                    <button onClick={() => setModalAbierto(false)} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors w-full">Volver al Catálogo</button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                    {carrito.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100 group">
                        <div className="flex items-center gap-3">
                           <span className="text-3xl bg-white p-2 rounded-xl border border-slate-100 shadow-sm">{item.imagen}</span>
                           <div>
                             <p className="font-bold text-slate-700 text-sm leading-tight">{item.nombre}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{item.desc}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right">
                                <p className="font-black text-slate-700">${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
                                <p className="text-xs text-slate-400 font-medium">x{item.cantidad}</p>
                           </div>
                          <button onClick={() => eliminarDelCarrito(item.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-6 text-lg font-black text-emerald-900 bg-emerald-100 p-5 rounded-2xl border border-emerald-200 dashed-border">
                     <span>Total Estimado:</span>
                     <span>${totalCarrito.toLocaleString('es-CL')}</span>
                  </div>

                  <form onSubmit={enviarPedido} className="space-y-4">
                     <div>
                       <label className="block text-xs font-extrabold text-slate-400 uppercase mb-1 ml-1">Tu Nombre</label>
                       <input required type="text" placeholder="Ej: Matías Pajarito" className="w-full bg-white border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-bold text-slate-700"
                         onChange={e => setDatosCliente({...datosCliente, nombre: e.target.value})} />
                     </div>
                     <div>
                       <label className="block text-xs font-extrabold text-slate-400 uppercase mb-1 ml-1">Dirección de Entrega</label>
                       <div className="relative">
                         <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                         <input required type="text" placeholder="Calle, Número, Villa..." className="w-full bg-white border-2 border-slate-100 rounded-xl p-3 pl-10 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-bold text-slate-700"
                           onChange={e => setDatosCliente({...datosCliente, direccion: e.target.value})} />
                       </div>
                     </div>
                     
                     <div>
                       <label className="block text-xs font-extrabold text-slate-400 uppercase mb-1 ml-1 flex items-center gap-2">
                           Horario de Reparto <span className="bg-emerald-100 text-emerald-700 px-1.5 rounded text-[9px]">INTELIGENTE</span>
                       </label>
                       <div className="relative">
                         <Clock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                         <select 
                            className="w-full bg-white border-2 border-slate-100 rounded-xl p-3 pl-10 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                            onChange={e => setDatosCliente({...datosCliente, horario: e.target.value})}
                         >
                           {horariosDisponibles.map((horario, index) => (
                               <option key={index} value={horario}>{horario}</option>
                           ))}
                         </select>
                       </div>
                     </div>

                     <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all mt-6">
                        <Send size={20} /> FINALIZAR PEDIDO EN WHATSAPP
                     </button>
                  </form>
                </>
              )}
           </div>
        </div>
      )}
    </div>
  )
}
