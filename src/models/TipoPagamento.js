const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tipoPagamentoSchema = new Schema({
  descricao: {
    required: true,
    type: String
  }
}, {
  timestamps: false
})

module.exports = mongoose.model('TipoPagamento', tipoPagamentoSchema, 'tipo_pgto')
