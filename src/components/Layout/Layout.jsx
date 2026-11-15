import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    // 1. El contenedor principal mide exactamente 100vh y oculta lo que se salga
    <div style={{
      display: 'flex',
      height: '100vh',      // 👈 OJO: height, no minHeight
      overflow: 'hidden',   // 👈 Oculta cualquier scroll en el cuerpo
    }}>
      {/* 2. El Sidebar no se mueve porque el padre no hace scroll */}
      <Sidebar />

      {/* 3. La columna derecha (Topbar + main) ocupa el resto del ancho */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',       // 👈 También mide 100vh
        overflow: 'hidden',
      }}>
        {/* 4. El Topbar se queda arriba */}
        <Topbar />

        {/* 5. SOLO el main hace scroll si hay mucho contenido */}
        <main style={{
          flex: 1,
          overflowY: 'auto',   // 👈 Aquí sí hay scroll
          padding: '2rem',
          background:  '#f0f9ff',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}