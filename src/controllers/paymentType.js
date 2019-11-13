const TipoPagamento = require('../models/TipoPagamento')

module.exports = {
  newPaymentType: async (req, res) => {
    const { descricao } = req.body

    try {
      const newPaymentType = await TipoPagamento.create({ descricao })
      return res.status(200).json(newPaymentType)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  
  paymentTypes: async (req, res) => {
    try {
      const types = await TipoPagamento.find().sort('descricao asc')
      return res.status(200).json(types)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}