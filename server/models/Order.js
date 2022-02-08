const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [],
  fullName: {
    type: String,
    required: true,
  },
  creditCard: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  shippingPrice: {
    type: String,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: String,
    required: true,
    default: 0,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
