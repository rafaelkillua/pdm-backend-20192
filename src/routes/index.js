const paymentController = require('../controllers/payment')
const paymentTypeController = require('../controllers/paymentType')
const expenseTypeController = require('../controllers/expenseType')

module.exports = app => {
  // PAYMENT
  app.put('/payment', paymentController.newPayment)
  app.get('/payment/list', paymentController.payments)
  app.get('/payment/:paymentId', paymentController.payment)
  app.patch('/payment/:paymentId', paymentController.editPayment)
  app.delete('/payment/:paymentId', paymentController.deletePayment)

  // PAYMENT TYPE
  app.put('/paymentType', paymentTypeController.newPaymentType)
  app.get('/paymentType/list', paymentTypeController.paymentTypes)
  
  // EXPENSE TYPE
  app.put('/expenseType', expenseTypeController.newExpenseType)
  app.get('/expenseType/list', expenseTypeController.expenseTypes)
}