
import Ember from 'ember';
import * as constants from '../lib/some-const';
import config from '../config/environment';

// example of using a local-type definition
import Hopscotch from 'npm:hopscotch';

function compute(): { value: string } {
  if (constants.CHANGE) {
    return { value: 'from ts' }
  } else {
    return { value: 'won\'t happen' }
  }
}

let seen = false;

function teach() {
  let tour = {
    id: "introduction",
    showCloseButton: "true",
    steps: [
      {
        title: "Page Key Navigator",
        content: "The Map contains the known page keys clustered in groups.",
        target: document.querySelector("g.top"),
        xOffset: 200,
        arrowOffset: "center",
        showCloseButton: true,
        placement: "top"
      }]
  };
   Hopscotch.listen('end', () => {
        seen = true;
      });
  Hopscotch.startTour(tour);
}

export default Ember.Component.extend({
  lyft: Ember.inject.service(),
  cars: Ember.computed.readOnly('lyft.cars'),
  someValue: compute().value
});
