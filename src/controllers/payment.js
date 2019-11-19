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

  editPayment: async (req, res) => {
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

    const { paymentId } = req.params

    try {
      const editedPayment = await Pagamento.findByIdAndUpdate(paymentId, {
        descricao,
        dt_vencimento,
        valor,
        dt_pgto,
        vr_multa,
        vr_juro,
        id_tipo_pgto: tipo_pgto,
        id_tipo_despesa: tipo_despesa
      })
      return res.status(200).json(editedPayment)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },

  payments: async (req, res) => {
    try {
      const { startDate, endDate, isPaid, expenseType, paymentType, isAll } = req.query
      const query = {}

      if (isAll === 'false') {
        query.dt_vencimento = {}
        if (startDate) query.dt_vencimento.$gte = startDate
        if (endDate) query.dt_vencimento.$lte = endDate
      }
      if (isPaid !== undefined) query.dt_pgto = { [isPaid === 'true' ? '$ne' : '$eq']: null }
      if (expenseType !== 'all') query.id_tipo_despesa = { $eq: expenseType }
      if (paymentType !== 'all') query.id_tipo_pgto = { $eq: paymentType }
      console.log(query)

      const payments = await Pagamento.find(query).sort('dt_vencimento').populate('id_tipo_pgto id_tipo_despesa')
      return res.status(200).json(payments)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  
  payment: async (req, res) => {
    try {
      const { paymentId } = req.params
      if (!paymentId) throw new Error('ID de pagamento inválido')
      const payment = await Pagamento.findById(paymentId).populate('id_tipo_pgto id_tipo_despesa')
      return res.status(200).json(payment)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  
  deletePayment: async (req, res) => {
    try {
      const { paymentId } = req.params
      if (!paymentId) throw new Error('ID de pagamento inválido')
      const payment = await Pagamento.findByIdAndRemove(paymentId).populate('id_tipo_pgto id_tipo_despesa')
      return res.status(200).json(payment)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
}