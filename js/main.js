var a = document.querySelectorAll('article > a');
var content = document.querySelectorAll('.content');
var button = document.querySelector('aside > button');

[].forEach.call(a, function (a, index) {
	a.addEventListener('click', function (event) {
		event.preventDefault();
		content[index].classList.toggle('expand');
	});
});

button.addEventListener('click', function (event) {
	[].forEach.call(content, function (content) {
		content.classList.add('expand');
	});
});