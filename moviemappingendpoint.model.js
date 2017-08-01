'use strict';

import mongoose from 'mongoose';

var MoviemappingendpointSchema = new mongoose.Schema({
  CITYNAME: String,
   AMPM: String,
   MINUTE:Number,
   HOUR: Number,
   DATE:String,
   THEATRENAME: String,
   MOVIENAME: String
});

export default mongoose.model('Moviemapping', MoviemappingendpointSchema);
