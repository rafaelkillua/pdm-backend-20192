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
      const { startDate, endDate, isPaid, tipo_despesa, tipo_pgto } = req.query
      const query = {}

      if (startDate) query.dt_vencimento = { $gte: startDate }
      if (endDate) query.dt_vencimento = { $lte: endDate }
      if (isPaid !== undefined) query.dt_pgto = { [isPaid ? '$ne' : '$eq']: null }
      if (tipo_despesa) query.id_tipo_despesa = { $eq: tipo_despesa }
      if (tipo_pgto) query.id_tipo_pgto = { $eq: tipo_pgto }
      console.log(req.query, query)

      const payments = await Pagamento.find(query).sort('dt_vencimento').populate('id_tipo_pgto id_tipo_despesa')
      return res.status(200).json(payments)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  
  payment: async (req, res) => {
    try {
      const { paymentId } = req.params
      const payment = await Pagamento.findById(paymentId).populate('id_tipo_pgto id_tipo_despesa')
      return res.status(200).json(payment)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}