import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import POSPage from './pages/POSPage';
import InventoryPage from './pages/InventoryPage';
import BranchesPage from './pages/BranchesPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<LandingPage />} />
          {/* Login y Registro */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* App con sidebar (después de iniciar sesión) */}
          <Route element={<Layout />}>
            <Route path="/pos" element={<POSPage />} />
            <Route path="/inventario" element={<InventoryPage />} />
            <Route path="/sucursales" element={<BranchesPage />} />
            <Route path="/suscripciones" element={<SubscriptionsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Route>

          {/* Cualquier otra ruta redirige a la landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}