import {
  FaHamburger,
  FaPizzaSlice,
  FaCoffee,
  FaGlassWhiskey,
  FaLeaf,
  FaUtensils,
  FaBreadSlice,
  FaBirthdayCake,
  FaBox,
} from 'react-icons/fa';

// Esta función recibe un producto y devuelve su icono y color
export const getProductIcon = (product) => {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();

  // Burgers
  if (category === 'burgers' || name.includes('hamburguesa')) {
    return { Icon: FaHamburger, color: '#dd6b20' }; // naranja
  }
  // Pizza
  if (category === 'pizza' || name.includes('pizza')) {
    return { Icon: FaPizzaSlice, color: '#e53e3e' }; // rojo
  }
  // Coffee
  if (category === 'coffee' || name.includes('café') || name.includes('capuchino')) {
    return { Icon: FaCoffee, color: '#744210' }; // café
  }
  // Cold Drinks
  if (category === 'cold drinks' || name.includes('coca') || name.includes('jugo')) {
    return { Icon: FaGlassWhiskey, color: '#3182ce' }; // azul
  }
  // Salads
  if (category === 'salads' || name.includes('ensalada')) {
    return { Icon: FaLeaf, color: '#38a169' }; // verde
  }
  // Spaghetti
  if (category === 'spaghetti' || name.includes('spaghetti')) {
    return { Icon: FaUtensils, color: '#d69e2e' }; // dorado
  }
  // Breakfast
  if (category === 'breakfast' || name.includes('desayuno') || name.includes('hot cake')) {
    return { Icon: FaBreadSlice, color: '#dd6b20' }; // naranja
  }
  // Cakes
  if (category === 'cakes' || name.includes('pastel') || name.includes('cheesecake')) {
    return { Icon: FaBirthdayCake, color: '#d53f8c' }; // rosa
  }

  // Si no coincide nada, un icono genérico
  return { Icon: FaBox, color: '#718096' }; // gris
};