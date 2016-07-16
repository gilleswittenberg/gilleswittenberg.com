(function (window, document) {

'use strict';

// feature detection

if (/no\-js/.test(document.body.className)) {
	return;
}


// utils

function changeLocationHash (str) {
	// guard feature detection
	if (!window.history || typeof window.history.replaceState !== 'function') return;
	var hash = '/' + (str ? '#' + str : '');
	window.history.replaceState(undefined, undefined, hash);
}


// email

var emailElement = document.querySelector('#email');
var emailText = emailElement.textContent;
var email = emailText.replace(/\s/g, '').replace('[at]', '@').replace('[dot]', '.');
var anchorElement = document.createElement('a');
anchorElement.textContent = email;
anchorElement.setAttribute('title', emailElement.getAttribute('title'));
anchorElement.setAttribute('href', 'mailto:' + email);
emailElement.parentNode.replaceChild(anchorElement, emailElement);


// DOM elements

var elements = {
	articles: document.querySelectorAll('article'),
	button: document.querySelector('aside > button')
};

var indexes = [];
var names = [];
Array.prototype.forEach.call(elements.articles, function (article, index) { 
	indexes.push(index);
	names.push(article.getAttribute('id'));
});


// state

var state = {

	expanded: {
		state: [],
		has: function (index) {
			return this.state.indexOf(index) > -1;
		},
		hasAll: function () {
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

	lastExpanded: null,

	dispatch: function (action, attributes) {
		switch (action) {
		case 'EXPAND_ALL':
			this.expanded.setAll();
			break;
		case 'TOGGLE_EXPANDED':
			this.lastExpanded = null;
			if (this.expanded.has(attributes.index)) {
				this.expanded.unset(attributes.index);
			} else {
				this.expanded.set(attributes.index);
				this.lastExpanded = attributes.index;
			}
			break;
		}
		render.all();
	}
};


// rendering

var render = {

	all: function () {
		this.expanded();
		this.button();
		this.scrollTo();
		this.locationHash();
	},

	expanded: function () {
		Array.prototype.forEach.call(elements.articles, function (article, index) {

			// expanded
			var classNameExpanded = '-is-expanded';
			if (state.expanded.has(index)) {
				article.classList.add(classNameExpanded);
			} else {
				article.classList.remove(classNameExpanded);
			}
		});
	},

	button: function () {
		var className = '-is-hidden';
		if (state.expanded.hasAll()) {
			elements.button.classList.add(className);
		} else {
			elements.button.classList.remove(className);
		}
	},

	scrollTo: function () {
		// guard
		if (state.lastExpanded === null) return;

		var rect = elements.articles[state.lastExpanded].getBoundingClientRect();
		var windowHeight = window.innerHeight || document.documentElement.clientHeight;

		// guard
		if (rect.bottom <= windowHeight) return;

		window.scrollBy(0, rect.bottom - windowHeight);
	},

	locationHash: function () {
		var hash = state.lastExpanded === null ? null : names[state.lastExpanded];
		changeLocationHash(hash);
	}
};

// listeners

Array.prototype.forEach.call(elements.articles, function (article, index) {
	var anchor = article.querySelector('h3 a');
	anchor.addEventListener('click', function (event) {
		event.preventDefault();
		state.dispatch('TOGGLE_EXPANDED', { index: index });
	});
});

elements.button.addEventListener('click', function () {
	state.dispatch('EXPAND_ALL');
});

// set from hash

var hash = window.location.hash.replace(/^#/, '');
var index = names.indexOf(hash);
if (index > -1) {
	state.dispatch('TOGGLE_EXPANDED', { index: index });
}


}(window, document));
