const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pagamentoSchema = new Schema({
  descricao: {
    required: true,
    type: String
  },
  dt_vencimento: {
    required: true,
    type: Date
  },
  valor: {
    required: true,
    type: Number
  },
  dt_pgto: {
    type: Date
  },
  vr_multa: {
    type: Number
  },
  vr_juro: {
    type: Number
  },
  id_tipo_pgto: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'TipoPagamento'
  },
  id_tipo_despesa: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'TipoDespesa'
  }
}, {
  timestamps: false
})

module.exports = mongoose.model('Pagamento', pagamentoSchema, 'pagamento')
