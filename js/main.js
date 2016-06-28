
// DOM elements

var elements = {
	as: document.querySelectorAll('article > a'),
	contents: document.querySelectorAll('.content'),
	button: document.querySelector('aside > button')
};


// state

var state = {

	open: [],

	active: null,

	setActive: function (index) {
		this.active = this.active !== index ? index : null;
		this.setOpen(index, true);
		render.active();
	},

	setOpen: function (index, remove) {
		var i = this.open.indexOf(index);
		if (i === -1) {
			this.open.push(index);
		} else if (remove) {
			this.open.splice(i, 1);
		}
		render.open();
		render.button();
	}
};


// rendering

var render = {

	active: function () {
		var className = '-is-active';
		[].forEach.call(elements.as, function (a) {
			a.classList.remove(className);
		});
		if (state.active !== null) {
			elements.as[state.active].classList.add(className);
		}
	},

	open: function () {
		var className = '-is-expanded';
		[].forEach.call(elements.contents, function (content) {
			content.classList.remove(className);
		});
		state.open.forEach(function (index) {
			elements.contents[index].classList.add(className);
		});
	},

	button: function () {
		var className = '-is-hidden';
		if (state.open.length < elements.contents.length) {
			elements.button.classList.remove(className);
		} else {
			elements.button.classList.add(className);
		}
	}
};


// listeners

[].forEach.call(elements.as, function (a, index) {
	a.addEventListener('click', function (event) {
		event.preventDefault();
		state.setActive(index);
	});
});

elements.button.addEventListener('click', function (event) {
	[].forEach.call(elements.contents, function (_, index) {
		state.setOpen(index);
	});
});
