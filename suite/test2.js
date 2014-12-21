var gordian = require('../index.js'),
  suite2 = new gordian('test2', module);

suite2.assertEqual('Test bool', true, true);
suite2.assertEqual('Test string', 'hello', 'world', 'Test failed!!');

suite2.report();