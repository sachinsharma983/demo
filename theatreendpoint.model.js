'use strict';

import mongoose from 'mongoose';

var TheatreendpointSchema = new mongoose.Schema({
  TheatreName: String,
   City: String,
   Location: String
});

export default mongoose.model('Theatreendpoint', TheatreendpointSchema);
