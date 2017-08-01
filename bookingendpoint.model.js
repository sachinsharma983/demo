'use strict';

import mongoose from 'mongoose';

var BookingendpointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Bookingendpoint', BookingendpointSchema);
