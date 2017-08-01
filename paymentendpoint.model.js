'use strict';

import mongoose from 'mongoose';

var PaymentendpointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Paymentendpoint', PaymentendpointSchema);
