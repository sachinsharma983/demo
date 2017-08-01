/**
 * Moviemappingendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviemappingendpoint from './moviemappingendpoint.model';
var MoviemappingendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviemappingendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Moviemappingendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviemappingendpointEvents.emit(event + ':' + doc._id, doc);
    MoviemappingendpointEvents.emit(event, doc);
  }
}

export default MoviemappingendpointEvents;
