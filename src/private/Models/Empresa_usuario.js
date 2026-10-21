const EmpresaUsuarioSchema = new Schema({
  empresa: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  rolEnEmpresa: { type: String, default: 'admin' }
}, { timestamps: true });

// Índice compuesto para evitar duplicados
EmpresaUsuarioSchema.index({ empresa: 1, usuario: 1 }, { unique: true });