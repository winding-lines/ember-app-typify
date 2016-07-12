
import Ember from 'ember';
import * as constants from '../lib/some-const';

function compute() : {value: string} {
  if (constants.CHANGE) {
    return { value: 'from ts'}
  } else {
    return { value: 'won\'t happen'}
  }
}
export default Ember.Component.extend({
  lyft: Ember.inject.service(),
  cars: Ember.computed.readOnly('lyft.cars'),
  someValue: compute().value
});
