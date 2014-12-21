var gordian = require('../index.js'),
	suite = new gordian('test1', module);

suite.assertEqual('Test bool', true, true);

suite.assertEqual('Test bool', true, true);

suite.assertEqual('Test bool', true, true);
suite.assertEqual('Test string', 'hello', 'world');

suite.report();