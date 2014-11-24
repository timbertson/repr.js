(function() {
	var global = this;
	var getProto = null;
	var getName = null;

	if(Object.hasOwnProperty('getPrototypeOf')) {
		getProto = function(o) { try {
			return Object.getPrototypeOf(o);
		} catch(e) { return undefined; }
		}
	} else if(Object.hasOwnProperty('__proto__')) {
		getProto = function(o) { return o.__proto__; }
	}

	if(getProto !== null) {
		getName = function(o, def) {
			var p = getProto(o);
			if(p != undefined && p.hasOwnProperty('constructor') && p.constructor.hasOwnProperty('name')) {
				return p.constructor.name;
			}
			return def;
		};

	} else {
		getName = function(o, def) {
			return def;
		}
	};

	function isPureObject(obj) {
		var proto = getProto(obj);
		return (proto && proto.constructor === Object);
	};

	var breakCycles = function() {
		var seen = [];
		return function(subject) {
			if(typeof(subject) === 'object') {
				if (seen.indexOf(subject) !== -1) {
					return true;
				}
				seen.push(subject);
			}
			return false;
		}
	};

	var summarizeFunction = function(f) {
		var name;
		if(f.hasOwnProperty('name')) {
			name = f.name;
		}
		if(!name) {
			return "<# anonymous function>";
		}
		return "<# function " + name + ">";
	};

	var _repr = function(o, cycle) {
		if(o === null) return 'null';
		if(o === undefined) return 'undefined';
		if(!o instanceof Object) {
			// use builtin conversion:
			return '' + o;
		} else {
			if (cycle(o)) return '< circular ... >';
			if(o === null) return 'null';
			if(o instanceof String || typeof(o) == 'string') { // javascript makes me sad
				try {
					return JSON.stringify(o);
				} catch(e) {
					return '"' + o.replace(/\\/, '\\\\').replace(/"/, '\\"') + '"';
				}
			}

			if(Array.isArray(o)) {
				var elems = "";
				for(var i=0; i<o.length; i++) {
					if(elems) {
						elems += ", ";
					}
					elems += _repr(o[i], cycle);
				}
				return "[" + elems + "]";
			}

			if(typeof(o) === 'function') {
				return summarizeFunction(o);
			}

			// ok, must just be an Object
			var objProto = getProto(o);
			if(objProto === undefined) {
				return o.valueOf() + '';
			}

			var attrs = "";
			for(var k in o) {
				if(!o.hasOwnProperty(k)) continue;
				var val = o[k];
				var desc=_repr(val, cycle);
				if(attrs) {
					attrs += ", ";
				}
				attrs += _repr(k, cycle) + ": " + desc;
			}
			if(isPureObject(o)) {
				return "{" + attrs + "}";
			}
			var content;
			if(attrs.length > 0) {
				attrs = "; " + attrs;
			}
			return "<# object " + getName(o, o.valueOf()) + attrs + ">";
		}
	};

	var repr = function(o) {
		return _repr(o, breakCycles());
	};

	repr.install = function(g, proto) {
		if(arguments.length == 0) {
			g = global;
			proto = Object.prototype;
		}
		if(g) {
			g.repr = repr;
		}
		if(proto) {
			proto.toString = function() {
				return _repr(this, breakCycles());
			};
		}
		return repr;
	};

	repr.repr = repr; // backwards compat with require('repr').repr;

	if(typeof(module) == 'undefined') {
		// auto-install in browser
		repr.install(global);
	} else {
		module.exports = repr;
	}
})();
