const TipoDespesa = require('../models/TipoDespesa')

module.exports = {
  newExpenseType: async (req, res) => {
    const { descricao } = req.body

    try {
      const newExpenseType = await TipoDespesa.create({ descricao })
      return res.status(200).json(newExpenseType)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },

  expenseTypes: async (req, res) => {
    try {
      const types = await TipoDespesa.find().sort('descricao asc')
      return res.status(200).json(types)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}