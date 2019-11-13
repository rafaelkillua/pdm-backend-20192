const Pagamento = require('../models/Pagamento')
const TipoDespesa = require('../models/TipoDespesa')
const TipoPagamento = require('../models/TipoPagamento')

module.exports = {
  newPayment: async (req, res) => {
    const { 
      descricao,
      dt_vencimento,
      valor,
      dt_pgto,
      vr_multa,
      vr_juro,
      tipo_pgto,
      tipo_despesa
    } = req.body

    try {
      const id_tipo_despesa = await TipoDespesa.findById(tipo_despesa)
      const id_tipo_pgto = await TipoPagamento.findById(tipo_pgto)

      const newPayment = await Pagamento.create({
        descricao,
        dt_vencimento,
        valor,
        dt_pgto,
        vr_multa,
        vr_juro,
        id_tipo_pgto,
        id_tipo_despesa
      })
      return res.status(200).json(newPayment)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },

  payments: async (req, res) => {
    try {
      const payments = await Pagamento.find().sort('dt_vencimento asc').populate('id_tipo_pgto id_tipo_despesa')
      return res.status(200).json(payments)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}