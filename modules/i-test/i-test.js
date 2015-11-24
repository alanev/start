(function () {
	var name = 'E';
	var str = `My name is ${name}`;
	console.log(str);
	
	var f = function (a = 10, ...b) {
		console.log(a, b)
	};
	f();
})();