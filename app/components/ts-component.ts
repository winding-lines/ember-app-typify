
import Ember from 'ember';

function compute() : {value: string} {
  return { value: 'from ts'}
}
export default Ember.Component.extend({
  someValue: compute().value
});
