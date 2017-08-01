/**
 * Confirmationendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Confirmationendpoint from './confirmationendpoint.model';
var ConfirmationendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConfirmationendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Confirmationendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ConfirmationendpointEvents.emit(event + ':' + doc._id, doc);
    ConfirmationendpointEvents.emit(event, doc);
  }
}

export default ConfirmationendpointEvents;
