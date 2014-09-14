var gordian = require('./index.js'),
  suite = new gordian('ExampleSuite');


suite.assertEqual('Equality', 1, 1, 'One is equal to one');

var o = {
  a: 1,
  n: 2
};
suite.assertEqual('Equality', o, o);
suite.assertEqual('Array', [1, 2], [1, 2]);
suite.assertStrictEqual('Array Strict', [1, 2], [1, 2]);
suite.assertEqual('Object array', [{
  name: 'joe'
}], [{
  name: 'joe'
}]);

suite.assertDeepEqual('Object array deep', [{
  name: 'joe'
}], [{
  name: 'joe'
}]);

suite.assertEqual('Object array strict', [{
  name: 'joe'
}], [{
  name: 'joe'
}]);
suite.assertEqual('Falsy', null, undefined);
suite.assertStrictEqual('Falsy strict', null, undefined);
suite.assertStrictEqual('Srtict Equality', o, o, 'Strict equality passed');
suite.assertStrictEqual('Strict Equality', o, {
  a: 1,
  n: 2
}, 'Strict equality failed');
suite.assertThrows('Throws', function () {
  throw new TypeError;
}, TypeError);

suite.report(function () {
  console.log('completed.');
});