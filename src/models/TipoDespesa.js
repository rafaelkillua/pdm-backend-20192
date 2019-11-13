const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tipoDespesaSchema = new Schema({
  descricao: {
    required: true,
    type: String
  }
}, {
  timestamps: false
})

module.exports = mongoose.model('TipoDespesa', tipoDespesaSchema, 'tipo_despesa')
