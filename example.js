var gordian = require('./index.js'),
	suite = new gordian('ExampleSuite');


suite.assertEqual('Equality', 1, 1, 'One is equal to one');
suite.assertEqual('Equality', 'hello', 'hello');
var o = {
	a: 1,
	n: 2
};

suite.assertStrictEqual('Srtict Equality', o, o, 'Strict equality passed');
suite.assertStrictEqual('Strict Equality', o, {
	a: 1,
	n: 2
}, 'Strict equality failed');
suite.assertThrows('Throws', function () {
	throw new TypeError;
}, TypeError);
suite.report();