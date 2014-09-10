var chalk = require('chalk');

function TestHub(testGroupName) {
	var tests = [];
	this.addResult = function (obj) {
		tests.push(obj);
	}
	this.report = function () {
		var successes = 0,
			fails = 0;
		tests.forEach(function (test) {
			if (test.result) {
				successes += 1;
			} else {
				fails += 1;
			}
			console.log(chalk[test.result ? 'green' : 'red'](test.title + ': ' + test.result + '. Message: ' + test.message));
		});

		console.log(chalk[fails > 0 ? 'red' : 'green']('Test completed: ' + tests.length + '. Passes: ' + successes + ', fails: ' + fails));
	};
}

function Test(title, result, message) {
	return {
		title: title,
		result: result,
		message: message || (result ? 'Test passed' : 'Test failed.')
	};
}

module.exports = function (testGroup) {
	var hub = new TestHub(testGroup);
	this.assertEqual = function (title, expected, actual, message) {
		var result;
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

		hub.addResult(Test(title, result, message));
	};

	this.assertStrictEqual = function (title, expected, actual, message) {
		var result = (expected === actual);
		hub.addResult(Test(title, result, message));
	};

	this.assertNotStrictEqual = function (title, expected, actual, message) {
		var result = (expected !== actual);
		hub.addResult(Test(title, result, message));
	};

	this.assertNotEqual = function (title, expected, actual, message) {
		var result = (expected != actual);
		hub.addResult(Test(title, result, message));
	};

	this.assertThrows = function (title, func, type, message) {
		var result = false;
		try {
			func.apply();
		} catch (err) {
			result = (err instanceof type);
		}
		hub.addResult(Test(title, result, message));
	};

	this.report = function () {
		hub.report();
	};
};