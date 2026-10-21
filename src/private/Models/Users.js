const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'empleado', 'cajero'], default: 'empleado' },
  activo: { type: Boolean, default: true }
}, { timestamps: true });
