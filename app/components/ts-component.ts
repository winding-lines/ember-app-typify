
import Ember from 'ember';
import * as constants from '../lib/some-const';
import config from '../config/environment';

import * as CodeMirror from 'npm:codemirror';
import _CodeMirrorJs from 'npm:codemirror/mode/javascript/javascript';


type Promise<T> = Ember.RSVP.Promise<T, any>;

// example of using a local-type definition
import Hopscotch from 'npm:hopscotch';

/**
 * Associate a name with an age, model an intermediary step in some computation.
 */
class NameAge {
  constructor(public name: string, public age: number) {

  }
  static shape(pairs: [string, number][]): NameAge[] {
    let things = pairs.map( pair => new NameAge(pair[0], pair[1]));
    return things;
  }
}

/**
 * Represent a person, model a final step in some computation.
 */
class Person {
  constructor(public name: string, public age: number, public gender: string) {}

  static shape(pairs: NameAge[]): Promise<Person[]> {
    return new Ember.RSVP.Promise( resolve => {
      let people = pairs.map( pair => new Person(pair.name, pair.age, 'unknown'));
      resolve(people);
    });
  }
}

function fetchAges(names: string[]) : Promise<[string, number][]> {
  return new Ember.RSVP.Promise(resolve=>{
    resolve(names.map(n => {[n,42]}))
  });
}


function promisesPromises(names: string[]): Promise<Person[]> {
  return fetchAges(names)
    .then(NameAge.shape)
    .then(Person.shape);
}

function compute(): { value: string } {
  if (constants.CHANGE) {
    return { value: 'from ts' }
  } else {
    return { value: 'won\'t happen' + config.environment }
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
