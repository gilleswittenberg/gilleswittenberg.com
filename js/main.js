
// initialize

document.body.classList.remove('no-js');


// DOM elements

var elements = {
	articles: document.querySelectorAll('article'),
	button: document.querySelector('aside > button')
};


// indexes range and names

var indexes = [];
var names = [];
elements.articles.forEach(function (article, index) {
	indexes.push(index);
	names.push(article.getAttribute('id'));
});


// state

var state = {

	open: {
		state: [],
		has: function (index) {
			return this.state.indexOf(index) > -1;
		},
		hasAll: function (index) {
			var hasAll = true;
			indexes.forEach(function (i) {
				if (!this.has(i)) {
					hasAll = false;
				}
			}.bind(this));
			return hasAll;
		},
		set: function (index) {
			// guard
			if (this.has(index)) return;

			this.state.push(index);
		},
		unset: function (index) {
			// guard
			if (!this.has(index)) return;

			var i = this.state.indexOf(index);
			this.state.splice(i, 1);
		},
		setAll: function () {
			indexes.forEach(function (i) {
				this.set(i);
			}.bind(this));
		}
	},

	active: { 
		state: null,
		is: function (index) {
			return this.state === index;
		},
		set: function (index) {
			// guard
			if (this.state === index) return;

			this.state = index;
		},
		unset: function () {
			// guard
			if (this.state === null) return;

			this.state = null;
		}	
	},

	dispatch: function (action, attributes) {
		switch (action) {
		case 'OPEN_ALL':
			this.open.setAll();
			break;
		case 'TOGGLE_ACTIVE':
			if (this.open.has(attributes.index)) {
				this.active.unset();
				this.open.unset(attributes.index);
			} else {
				this.active.set(attributes.index);
				this.open.set(attributes.index);
			}
			break;
		}
		render.all();
	}
};


// rendering

var render = {

	all: function () {
		this.activeAndOpen();
		this.button();
	},

	activeAndOpen: function () {
		[].forEach.call(elements.articles, function (article, index) {

			// active
			var classNameActive = '-is-active';
			if (state.active.is(index)) {
				article.classList.add(classNameActive);
			} else {
				article.classList.remove(classNameActive);
			}

			// open
			var classNameExpanded = '-is-expanded';
			if (state.open.has(index)) {
				article.classList.add(classNameExpanded);
			} else {
				article.classList.remove(classNameExpanded);
			}
		});
	},

	button: function () {
		var className = '-is-hidden';
		if (state.open.hasAll()) {
			elements.button.classList.add(className);
		} else {
			elements.button.classList.remove(className);
		}
	}
};


function scrollElementIntoView (index) {
	var top = elements.articles[index].offsetTop;
	window.scrollTo(0, top);
}


// listeners

[].forEach.call(elements.articles, function (article, index) {
	article.addEventListener('click', function (event) {
		event.preventDefault();
		if (event.target.nodeName === 'A') {
			state.dispatch('TOGGLE_ACTIVE', { index: index });
			// scroll to element
			if (state.active.is(index)) {
				scrollElementIntoView(index);
			}
		}
	});
});

elements.button.addEventListener('click', function (event) {
	state.dispatch('OPEN_ALL');
});
