import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const tieneSesionActiva = () => {
  const token = sessionStorage.getItem('token');
  const usuario = sessionStorage.getItem('usuario');
  return Boolean(token || usuario);
};

export default function ProtectedRoute() {
  const [autenticado, setAutenticado] = useState(tieneSesionActiva);

  useEffect(() => {
    setAutenticado(tieneSesionActiva());

    const alMostrarPagina = () => {
      setAutenticado(tieneSesionActiva());
    };

    window.addEventListener('pageshow', alMostrarPagina);
    return () => window.removeEventListener('pageshow', alMostrarPagina);
  }, []);

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}