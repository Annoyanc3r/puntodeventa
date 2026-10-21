const EmpresaSchema = new Schema({
  nombre: { type: String, required: true },
  rfc: { type: String }, // O identificación fiscal
  activo: { type: Boolean, default: true }
}, { timestamps: true });