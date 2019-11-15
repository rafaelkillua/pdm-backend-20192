const paymentController = require('../controllers/payment')
const paymentTypeController = require('../controllers/paymentType')
const expenseTypeController = require('../controllers/expenseType')

module.exports = app => {
  // PAYMENT
  app.post('/payment/new', paymentController.newPayment)
  app.get('/payment/find', paymentController.payments)
  app.get('/payment/:paymentId', paymentController.payment)

  // PAYMENT TYPE
  app.post('/paymentType/new', paymentTypeController.newPaymentType)
  app.get('/paymentType/find', paymentTypeController.paymentTypes)
  
  // EXPENSE TYPE
  app.post('/expenseType/new', expenseTypeController.newExpenseType)
  app.get('/expenseType/find', expenseTypeController.expenseTypes)
}