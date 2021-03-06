var chalk = require('chalk'),
	deepEqual = require('deep-equal');

function TestHub(testGroupName) {
	var tests = [],
		ouptut;
	this.addResult = function (obj) {
		tests.push(obj);
	}
	this.report = function (cb) {
		var successes = 0,
			fails = 0;
		tests.forEach(function (test) {
			if (test.result) {
				successes += 1;
			} else {
				fails += 1;
			}

			console.log(chalk[test.result ? 'green' : 'red'](output = test.title + ': ' + test.result + '. [' + test.exec[0] +
				's, ' + (test.exec[1] / 1000000) + 'ms] Message: ' + chalk.bold(test.message)));
			console.log(chalk[test.result ? 'green' : 'red'](new Array(output.length - 8).join('-')));
		});
		console.log(chalk[fails > 0 ? 'red' : 'green']('Test group ' + testGroupName + ' completed: ' + tests.length + '. Passes: ' + successes + ', fails: ' + fails));
		var result = {
			passes: successes,
			fails: fails
		};
		// if there's a cb pass tests 
		// this is presumably for emailing test results etc.
		if (cb) {
			cb.apply(null, [tests]);
		} else {
			console.log('Done.');
		}
		return result;
	};
}

function Test(title, result, message, exec, expected, actual) {
	return {
		title: title,
		result: result,
		message: message || (result ? 'Test passed' : 'Test failed, expected ' + expected + ', got ' + actual),
		exec: exec
	};
}

module.exports = function (testGroup, root /* the module */ ) {
	var hub = new TestHub(testGroup);
	this.assertEqual = function (title, expected, actual, message) {

		var result, start = process.hrtime();
		if (typeof actual === 'object') {
			if (Array.isArray(actual)) {
				var i = 0,
					len = actual.length,
					result = true;
				for (i; i < len; i += 1) {
					if (actual[i] != expected[i]) {
						result = false;
						break;
					}
				}
			} else {
				result = (JSON.stringify(expected) == JSON.stringify(actual));
			}
		} else {
			result = (expected == actual);
		}

		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
	};



	this.assertDeepEqual = function (title, expected, actual, message) {
		var start = process.hrtime(),
			result = deepEqual(expected, actual);
		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
	};

	this.assertStrictDeepEqual = function () {

		var start = process.hrtime(),
			result = deepEqual(expected, actual, {
				strict: true
			});
		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
	};

	this.assertStrictEqual = function (title, expected, actual, message) {
		var start = process.hrtime(),
			result = (expected === actual);
		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
	};

	this.assertNotStrictEqual = function (title, expected, actual, message) {
		var start = process.hrtime(),
			result = (expected !== actual);
		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
	};

	this.assertNotEqual = function (title, expected, actual, message) {
<<<<<<< HEAD
		var start = process.hrtime(),
			result;
=======
		var result, start = process.hrtime();
>>>>>>> 60a4082718582e0237a45c506d058d6edeb79926
		if (typeof actual === 'object') {
			if (Array.isArray(actual)) {
				var i = 0,
					len = actual.length,
					result = false;
				for (i; i < len; i += 1) {
					if (actual[i] != expected[i]) {
						result = true;
						break;
					}
				}
			} else {
				result = (JSON.stringify(expected) == JSON.stringify(actual));
			}

		} else {
			result = (expected != actual);
		}

<<<<<<< HEAD
		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
=======
		hub.addResult(Test(title, result, message, process.hrtime(start)));
>>>>>>> 60a4082718582e0237a45c506d058d6edeb79926
	};

	this.assertThrows = function (title, func, type, message) {
		var start = process.hrtime(),
			result = false;
		try {
			func.apply();
		} catch (err) {
			result = (err instanceof type);
		}
		hub.addResult(Test(title, result, message, process.hrtime(start), expected, actual));
	};

	this.report = function (cb) {
		var report = hub.report(cb);
		(root).exports = report;
		return report;
	};
};
