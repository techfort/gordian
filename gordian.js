var gordian = require('./index.js'),
	args = process.argv,
	path = args[2],
	fs = require('fs');

function totalPasses(results) {
	var passes = 0,
		fails = 0;
	results.forEach(function (i) {
		passes += i.passes;
		fails += i.fails;
	});
	return {
		passes: passes,
		fails: fails
	};
}

function runFiles(err, files) {
	if (err) {
		console.log('Error reading tests directory.');
		return;
	}
	var fullpathfiles = files.map(function (p) {
		return __dirname + '/' + path + '/' + p;
	});
	console.log(totalPasses(fullpathfiles.map(require)));
}

fs.readdir(path, runFiles);