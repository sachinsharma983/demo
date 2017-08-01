'use strict';

import mongoose from 'mongoose';

var ConfirmationendpointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Confirmationendpoint', ConfirmationendpointSchema);
