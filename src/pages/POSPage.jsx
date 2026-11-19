import { useState, useEffect } from 'react';
import { categories as fallbackCategories, products as fallbackProducts } from '../data/products';
import { obtenerCategorias } from '../services/categoriaService';
import { obtenerProductos } from '../services/productoService';
import { useCart } from '../context/CartContext';
import { getProductIcon } from '../data/productIcons';
import { FiSearch, FiPlus, FiMinus, FiTrash2, FiCreditCard, FiDollarSign, FiPrinter } from 'react-icons/fi';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const normalizarProductoPOS = (p) => ({
  id: p._id || p.id,
  name: p.nombre || p.name,
  price: Number(p.precioBase ?? p.price ?? 0),
  category:
    typeof p.categoria === 'object' && p.categoria !== null
      ? p.categoria.nombre
      : p.categoria || p.category || '',
  image: p.imagen || p.image || '',
});

const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

export default function POSPage() {
  const [categoryNames, setCategoryNames] = useState(fallbackCategories);
  const [productList, setProductList] = useState(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState(fallbackCategories[0] || '');
  const [search, setSearch] = useState('');
  const { cart, addToCart, removeFromCart, updateQty, clearCart, subtotal, tax, total } = useCart();

  const [avisoPOS, setAvisoPOS] = useState(null);
  const [cobrando, setCobrando] = useState(false);
  const [ultimoTicket, setUltimoTicket] = useState(() => {
    try {
      const guardado = sessionStorage.getItem('ultimo_ticket_pos');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

const dispararImpresion = (ticketData) => {
    if (!ticketData) return;

    setUltimoTicket(ticketData);
    try {
      sessionStorage.setItem('ultimo_ticket_pos', JSON.stringify(ticketData));
    } catch {
      // Ignorar errores de almacenamiento
    }

    const filasHtml = (ticketData.items || [])
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px 6px; border-bottom: 1px solid #e2e8f0; font-size: 16px;">${item.name}</td>
          <td style="padding: 10px 6px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 16px; font-weight: 700;">${item.qty}</td>
          <td style="padding: 10px 6px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 16px;">$${Number(item.price).toFixed(2)}</td>
          <td style="padding: 10px 6px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 16px; font-weight: 700;">$${Number(item.subtotal).toFixed(2)}</td>
        </tr>`
      )
      .join('');

    const ventanaTicket = window.open('', '_blank', 'width=520,height=760');
    if (!ventanaTicket) {
      // Si el navegador bloquea ventanas emergentes, usa window.print() como respaldo
      window.print();
      return;
    }

    ventanaTicket.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Ticket ${ticketData.folio}</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 28px;
            color: #1a202c;
            background: #ffffff;
          }
          .ticket {
            max-width: 440px;
            margin: 0 auto;
            border: 2px solid #2c5282;
            border-radius: 12px;
            padding: 24px;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #cbd5e0;
            padding-bottom: 16px;
            margin-bottom: 16px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            color: #1e3a5f;
          }
          .header p {
            margin: 6px 0 0;
            font-size: 15px;
            color: #4a5568;
          }
          .meta {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 16px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
          }
          th {
            text-align: left;
            font-size: 14px;
            text-transform: uppercase;
            color: #2c5282;
            border-bottom: 2px solid #2c5282;
            padding: 8px 6px;
          }
          .totales {
            border-top: 2px dashed #cbd5e0;
            padding-top: 14px;
            font-size: 17px;
          }
          .fila-total {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .gran-total {
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            font-weight: 800;
            color: #1e3a5f;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #1e3a5f;
          }
          .footer {
            text-align: center;
            margin-top: 22px;
            font-size: 14px;
            color: #718096;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">
            <h1>POS Blue</h1>
            <p>Comprobante de Venta</p>
          </div>
          <div class="meta">
            <div><strong>Folio:</strong> ${ticketData.folio}</div>
            <div><strong>Fecha:</strong> ${ticketData.fecha}</div>
            <div><strong>Método de pago:</strong> ${String(ticketData.metodoPago || 'efectivo').toUpperCase()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align:center;">Cant.</th>
                <th style="text-align:right;">Precio</th>
                <th style="text-align:right;">Importe</th>
              </tr>
            </thead>
            <tbody>
              ${filasHtml}
            </tbody>
          </table>
          <div class="totales">
            <div class="fila-total">
              <span>Subtotal:</span>
              <strong>$${Number(ticketData.subtotal).toFixed(2)}</strong>
            </div>
            <div class="fila-total">
              <span>IVA (16%):</span>
              <strong>$${Number(ticketData.tax).toFixed(2)}</strong>
            </div>
            <div class="gran-total">
              <span>TOTAL:</span>
              <span>$${Number(ticketData.total).toFixed(2)}</span>
            </div>
          </div>
          <div class="footer">
            ¡Gracias por su compra!
          </div>
        </div>
        <script>
          window.onload = function() {
            window.focus();
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    ventanaTicket.document.close();
  };

  const registrarPedido = async (metodoPago = 'efectivo') => {
    if (cart.length === 0) {
      setAvisoPOS({ tipo: 'error', texto: 'Agrega al menos un producto al carrito.' });
      return;
    }

    setCobrando(true);
    setAvisoPOS(null);

    try {
      const userId =
        JSON.parse(sessionStorage.getItem('usuario') || 'null')?._id ||
        sessionStorage.getItem('user_ID');

      let sucursalId = null;
      if (userId) {
        const resSuc = await fetch(`${API_BASE}/api/sucursal/Sucursal_Usuario/${userId}`);
        if (resSuc.ok) {
          const dataSuc = await resSuc.json();
          sucursalId = dataSuc.sucursales?.[0]?._id || null;
        }
      }

      const detalles = cart
        .filter((item) => esObjectIdValido(item.id))
        .map((item) => ({
          producto: item.id,
          nombreProducto: item.name,
          cantidad: Number(item.qty),
          precioUnitario: Number(item.price),
          subtotal: Number(item.price) * Number(item.qty),
        }));

      if (detalles.length === 0) {
        throw new Error('Los productos en el carrito son de prueba; registra productos reales en Inventario para guardar en BD.');
      }

      const res = await fetch(`${API_BASE}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(sucursalId ? { sucursal: sucursalId } : {}),
          estado: 'pagado',
          total: Number(total.toFixed(2)),
          detalles,
          pagos: [
            {
              metodo: metodoPago,
              monto: Number(total.toFixed(2)),
              referencia: `POS-${Date.now()}`,
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.msg || 'No se pudo registrar el pedido');
      }

      const ticketCreado = {
        folio: data?._id
          ? `TKT-${String(data._id).slice(-6).toUpperCase()}`
          : `TKT-${Date.now().toString().slice(-6)}`,
        fecha: new Date().toLocaleString(),
        metodoPago,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          qty: Number(item.qty),
          price: Number(item.price),
          subtotal: Number(item.price) * Number(item.qty),
        })),
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        total: Number(total.toFixed(2)),
      };

      clearCart();
      setAvisoPOS({
        tipo: 'ok',
        texto: `Venta registrada (${metodoPago}) por $${Number(total).toFixed(2)}. Generando ticket...`,
      });
      dispararImpresion(ticketCreado);
    } catch (err) {
      setAvisoPOS({
        tipo: 'error',
        texto: err.message || 'Error al procesar el cobro',
      });
    } finally {
      setCobrando(false);
    }
  };

  useEffect(() => {
    const cargarPOS = async () => {
      try {
        const cats = await obtenerCategorias();
        if (cats.length > 0) {
          const nombres = cats.map((c) => c.nombre);
          setCategoryNames(nombres);
          setActiveCategory(nombres[0]);
        }
      } catch {
        // categorias por defecto
      }

      try {
        const prods = await obtenerProductos();
        if (prods.length > 0) {
          setProductList(prods.map(normalizarProductoPOS));
        }
      } catch {
        // productos por defecto
      }
    };
    cargarPOS();
  }, []);

  const filtered = productList.filter(
    (p) =>
      (!activeCategory || p.category === activeCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '1.5rem',
          height: 'calc(100vh - 180px)',
        }}
      >
        {/* Columna izquierda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflow: 'hidden' }}>
          {/* Buscador */}
          <div style={{ position: 'relative' }}>
            <FiSearch
              style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0',
              }}
            />
            <input
              className="input"
              placeholder="Buscar productos por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: '3rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                borderRadius: '0.85rem',
              }}
            />
          </div>

          {/* Categorías */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categoryNames.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.65rem 1.35rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                  background: activeCategory === cat ? '#3182ce' : 'white',
                  color: activeCategory === cat ? 'white' : '#2c5282',
                  boxShadow:
                    activeCategory === cat
                      ? '0 6px 16px rgba(49,130,206,0.35)'
                      : '0 2px 6px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease',
                  transform: activeCategory === cat ? 'translateY(-2px)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid productos */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              paddingRight: '0.5rem',
              paddingBottom: '1rem',
            }}
          >
            {filtered.map((product) => {
              const { Icon, color } = getProductIcon(product);

              return (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  style={{
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    border: '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(49,130,206,0.18)';
                    e.currentTarget.style.borderColor = '#63b3ed';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      height: '110px',
                      borderRadius: '0.75rem',
                      background: '#ebf8ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <Icon size={56} color={color} />
                  </div>
                  <h4
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#1e3a5f',
                      marginBottom: '0.35rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {product.name}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3182ce' }}>
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: '#4299e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 2px 6px rgba(49,130,206,0.3)',
                      }}
                    >
                      <FiPlus size={14} />
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: '#a0aec0',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ fontWeight: 600 }}>No se encontraron productos</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
                  Intenta con otra categoría o búsqueda
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Carrito */}
        <div
          style={{
            background: 'white',
            borderRadius: '1.25rem',
            boxShadow: '0 10px 40px rgba(16,42,67,0.12)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #bee3f8',
          }}
        >
          <div
            style={{
              padding: '1.5rem 1.5rem 1.25rem',
              background: '#2c5282',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>🛒 Orden Actual</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.25rem' }}>
                  {cart.length} producto{cart.length !== 1 ? 's' : ''} en el carrito
                </p>
              </div>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#a0aec0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.7 }}>🛒</div>
                <p style={{ fontWeight: 600, color: '#718096' }}>Carrito vacío</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#a0aec0' }}>
                  Agrega productos para comenzar
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const { Icon, color } = getProductIcon(item);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem',
                      borderRadius: '0.85rem',
                      marginBottom: '0.6rem',
                      background: '#f7fbff',
                      border: '1px solid #bee3f8',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '0.65rem',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} color={color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: '#1e3a5f',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: '#3182ce', fontWeight: 700, marginTop: '0.15rem' }}>
                        ${(Number(item.price) * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} style={qtyBtn}>
                        <FiMinus size={11} />
                      </button>
                      <span
                        style={{
                          fontWeight: 700,
                          minWidth: '22px',
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          color: '#1e3a5f',
                        }}
                      >
                        {item.qty}
                      </span>
                      <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} style={qtyBtn}>
                        <FiPlus size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        style={{ ...qtyBtn, color: '#e53e3e' }}
                      >
                        <FiTrash2 size={11} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: '#f7fbff',
              borderTop: '1px solid #bee3f8',
            }}
          >
            <Row label="Subtotal" value={subtotal} />
            <Row label="IVA (16%)" value={tax} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.85rem',
                paddingTop: '0.85rem',
                borderTop: '2px dashed #bee3f8',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e3a5f' }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: '1.6rem', color: '#2c5282' }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {avisoPOS && (
              <div
                style={{
                  marginTop: '0.75rem',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.6rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  background: avisoPOS.tipo === 'ok' ? '#e6fffa' : '#fff5f5',
                  color: avisoPOS.tipo === 'ok' ? '#234e52' : '#9b2c2c',
                  border: `1px solid ${avisoPOS.tipo === 'ok' ? '#81e6d9' : '#feb2b2'}`,
                }}
              >
                {avisoPOS.texto}
              </div>
            )}
          </div>

          <div style={{ padding: '0 1.5rem 1.5rem', display: 'grid', gap: '0.6rem' }}>
            <button
              type="button"
              className="btn btn-accent"
              disabled={cobrando}
              onClick={() => registrarPedido('efectivo')}
              style={{ padding: '1rem', borderRadius: '0.85rem', fontSize: '1rem' }}
            >
              <FiDollarSign /> {cobrando ? 'Procesando...' : `Cobrar $${total.toFixed(2)}`}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                disabled={cobrando}
                onClick={() => registrarPedido('tarjeta')}
                style={{ padding: '0.75rem' }}
              >
                <FiCreditCard /> Tarjeta
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  if (cart.length > 0) {
                    const ticketActual = {
                      folio: `BORR-${Date.now().toString().slice(-6)}`,
                      fecha: new Date().toLocaleString(),
                      metodoPago: 'pendiente',
                      items: cart.map((item) => ({
                        id: item.id,
                        name: item.name,
                        qty: Number(item.qty),
                        price: Number(item.price),
                        subtotal: Number(item.price) * Number(item.qty),
                      })),
                      subtotal: Number(subtotal.toFixed(2)),
                      tax: Number(tax.toFixed(2)),
                      total: Number(total.toFixed(2)),
                    };
                    dispararImpresion(ticketActual);
                  } else if (ultimoTicket) {
                    dispararImpresion(ultimoTicket);
                  } else {
                    setAvisoPOS({
                      tipo: 'error',
                      texto: 'No hay productos en el carrito ni una venta previa para imprimir.',
                    });
                  }
                }}
                style={{ padding: '0.75rem' }}
              >
                <FiPrinter /> Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>

      {cart.length === 0 && ultimoTicket && (
        <div
          style={{
            background: '#f7fbff',
            border: '1px dashed #3182ce',
            borderRadius: '0.85rem',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#1e3a5f',
          }}
        >
          <div>
            <strong>Última venta ({ultimoTicket.folio})</strong> — {ultimoTicket.fecha} · Pago:{' '}
            <strong>{ultimoTicket.metodoPago}</strong> ·{' '}
            {ultimoTicket.items.map((i) => `${i.name} x${i.qty}`).join(', ')}
          </div>
          <div style={{ fontWeight: 800, color: '#2c5282' }}>
            Total: ${Number(ultimoTicket.total).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

const qtyBtn = {
  width: '26px',
  height: '26px',
  borderRadius: '7px',
  border: 'none',
  background: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#3182ce',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.15s',
  flexShrink: 0,
};

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.9rem' }}>
      <span style={{ color: '#718096' }}>{label}</span>
      <span style={{ fontWeight: 600, color: '#1e3a5f' }}>${value.toFixed(2)}</span>
    </div>
  );
}