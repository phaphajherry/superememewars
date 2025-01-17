(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.videojs = factory());
}(this, (function() {
    var version = "6.6.3";
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
        return module = {
            exports: {}
        }, fn(module, module.exports), module.exports;
    }
    var win;
    if (typeof window !== "undefined") {
        win = window;
    } else if (typeof commonjsGlobal !== "undefined") {
        win = commonjsGlobal;
    } else if (typeof self !== "undefined") {
        win = self;
    } else {
        win = {};
    }
    var window_1 = win;
    var empty = {};
    var empty$1 = (Object.freeze || Object)({
        'default': empty
    });
    var minDoc = (empty$1 && empty) || empty$1;
    var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : {};
    var doccy;
    if (typeof document !== 'undefined') {
        doccy = document;
    } else {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
        if (!doccy) {
            doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
        }
    }
    var document_1 = doccy;
    var USER_AGENT = window_1.navigator && window_1.navigator.userAgent || '';
    var webkitVersionMap = /AppleWebKit\/([\d.]+)/i.exec(USER_AGENT);
    var appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
    var IS_IPAD = /iPad/i.test(USER_AGENT);
    var IS_IPHONE = /iPhone/i.test(USER_AGENT) && !IS_IPAD;
    var IS_IPOD = /iPod/i.test(USER_AGENT);
    var IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;
    var IOS_VERSION = function() {
        var match = USER_AGENT.match(/OS (\d+)_/i);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }();
    var IS_ANDROID = /Android/i.test(USER_AGENT);
    var ANDROID_VERSION = function() {
        var match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
        if (!match) {
            return null;
        }
        var major = match[1] && parseFloat(match[1]);
        var minor = match[2] && parseFloat(match[2]);
        if (major && minor) {
            return parseFloat(match[1] + '.' + match[2]);
        } else if (major) {
            return major;
        }
        return null;
    }();
    var IS_OLD_ANDROID = IS_ANDROID && /webkit/i.test(USER_AGENT) && ANDROID_VERSION < 2.3;
    var IS_NATIVE_ANDROID = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537;
    var IS_FIREFOX = /Firefox/i.test(USER_AGENT);
    var IS_EDGE = /Edge/i.test(USER_AGENT);
    var IS_CHROME = !IS_EDGE && /Chrome/i.test(USER_AGENT);
    var CHROME_VERSION = function() {
        var match = USER_AGENT.match(/Chrome\/(\d+)/);
        if (match && match[1]) {
            return parseFloat(match[1]);
        }
        return null;
    }();
    var IS_IE8 = /MSIE\s8\.0/.test(USER_AGENT);
    var IE_VERSION = function() {
        var result = /MSIE\s(\d+)\.\d/.exec(USER_AGENT);
        var version = result && parseFloat(result[1]);
        if (!version && /Trident\/7.0/i.test(USER_AGENT) && /rv:11.0/.test(USER_AGENT)) {
            version = 11.0;
        }
        return version;
    }();
    var IS_SAFARI = /Safari/i.test(USER_AGENT) && !IS_CHROME && !IS_ANDROID && !IS_EDGE;
    var IS_ANY_SAFARI = IS_SAFARI || IS_IOS;
    var TOUCH_ENABLED = isReal() && ('ontouchstart' in window_1 || window_1.DocumentTouch && window_1.document instanceof window_1.DocumentTouch);
    var BACKGROUND_SIZE_SUPPORTED = isReal() && 'backgroundSize' in window_1.document.createElement('video').style;
    var browser = (Object.freeze || Object)({
        IS_IPAD: IS_IPAD,
        IS_IPHONE: IS_IPHONE,
        IS_IPOD: IS_IPOD,
        IS_IOS: IS_IOS,
        IOS_VERSION: IOS_VERSION,
        IS_ANDROID: IS_ANDROID,
        ANDROID_VERSION: ANDROID_VERSION,
        IS_OLD_ANDROID: IS_OLD_ANDROID,
        IS_NATIVE_ANDROID: IS_NATIVE_ANDROID,
        IS_FIREFOX: IS_FIREFOX,
        IS_EDGE: IS_EDGE,
        IS_CHROME: IS_CHROME,
        CHROME_VERSION: CHROME_VERSION,
        IS_IE8: IS_IE8,
        IE_VERSION: IE_VERSION,
        IS_SAFARI: IS_SAFARI,
        IS_ANY_SAFARI: IS_ANY_SAFARI,
        TOUCH_ENABLED: TOUCH_ENABLED,
        BACKGROUND_SIZE_SUPPORTED: BACKGROUND_SIZE_SUPPORTED
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };
    var inherits = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };
    var possibleConstructorReturn = function(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };
    var taggedTemplateLiteralLoose = function(strings, raw) {
        strings.raw = raw;
        return strings;
    };
    var toString = Object.prototype.toString;
    var keys = function keys(object) {
        return isObject(object) ? Object.keys(object) : [];
    };

    function each(object, fn) {
        keys(object).forEach(function(key) {
            return fn(object[key], key);
        });
    }

    function reduce(object, fn) {
        var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return keys(object).reduce(function(accum, key) {
            return fn(accum, object[key], key);
        }, initial);
    }

    function assign(target) {
        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            sources[_key - 1] = arguments[_key];
        }
        if (Object.assign) {
            return Object.assign.apply(Object, [target].concat(sources));
        }
        sources.forEach(function(source) {
            if (!source) {
                return;
            }
            each(source, function(value, key) {
                target[key] = value;
            });
        });
        return target;
    }

    function isObject(value) {
        return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    }

    function isPlain(value) {
        return isObject(value) && toString.call(value) === '[object Object]' && value.constructor === Object;
    }
    var log = void 0;
    var level = 'info';
    var history = [];
    var logByType = function logByType(type, args) {
        var stringify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !!IE_VERSION && IE_VERSION < 11;
        var lvl = log.levels[level];
        var lvlRegExp = new RegExp('^(' + lvl + ')$');
        if (type !== 'log') {
            args.unshift(type.toUpperCase() + ':');
        }
        if (history) {
            history.push([].concat(args));
        }
        args.unshift('VIDEOJS:');
        if (!window_1.console) {
            return;
        }
        var fn = window_1.console[type];
        if (!fn && type === 'debug') {
            fn = window_1.console.info || window_1.console.log;
        }
        if (!fn || !lvl || !lvlRegExp.test(type)) {
            return;
        }
        if (stringify) {
            args = args.map(function(a) {
                if (isObject(a) || Array.isArray(a)) {
                    try {
                        return JSON.stringify(a);
                    } catch (x) {
                        return String(a);
                    }
                }
                return String(a);
            }).join(' ');
        }
        if (!fn.apply) {
            fn(args);
        } else {
            fn[Array.isArray(args) ? 'apply' : 'call'](window_1.console, args);
        }
    };
    log = function log() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        logByType('log', args);
    };
    log.levels = {
        all: 'debug|log|warn|error',
        off: '',
        debug: 'debug|log|warn|error',
        info: 'log|warn|error',
        warn: 'warn|error',
        error: 'error',
        DEFAULT: level
    };
    log.level = function(lvl) {
        if (typeof lvl === 'string') {
            if (!log.levels.hasOwnProperty(lvl)) {
                throw new Error('"' + lvl + '" in not a valid log level');
            }
            level = lvl;
        }
        return level;
    };
    log.history = function() {
        return history ? [].concat(history) : [];
    };
    log.history.clear = function() {
        if (history) {
            history.length = 0;
        }
    };
    log.history.disable = function() {
        if (history !== null) {
            history.length = 0;
            history = null;
        }
    };
    log.history.enable = function() {
        if (history === null) {
            history = [];
        }
    };
    log.error = function() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }
        return logByType('error', args);
    };
    log.warn = function() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }
        return logByType('warn', args);
    };
    log.debug = function() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }
        return logByType('debug', args);
    };
    var log$1 = log;

    function clean(s) {
        return s.replace(/\n\r?\s*/g, '')
    }
    var tsml = function tsml(sa) {
        var s = '',
            i = 0;
        for (; i < arguments.length; i++)
            s += clean(sa[i]) + (arguments[i + 1] || '');
        return s
    };

    function computedStyle(el, prop) {
        if (!el || !prop) {
            return '';
        }
        if (typeof window_1.getComputedStyle === 'function') {
            var cs = window_1.getComputedStyle(el);
            return cs ? cs[prop] : '';
        }
        return el.currentStyle[prop] || '';
    }
    var _templateObject = taggedTemplateLiteralLoose(['Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ', ' to ', '.'], ['Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ', ' to ', '.']);

    function isNonBlankString(str) {
        return typeof str === 'string' && /\S/.test(str);
    }

    function throwIfWhitespace(str) {
        if (/\s/.test(str)) {
            throw new Error('class has illegal whitespace characters');
        }
    }

    function classRegExp(className) {
        return new RegExp('(^|\\s)' + className + '($|\\s)');
    }

    function isReal() {
        return (document_1 === window_1.document && typeof document_1.createElement !== 'undefined');
    }

    function isEl(value) {
        return isObject(value) && value.nodeType === 1;
    }

    function isInFrame() {
        try {
            return window_1.parent !== window_1.self;
        } catch (x) {
            return true;
        }
    }

    function createQuerier(method) {
        return function(selector, context) {
            if (!isNonBlankString(selector)) {
                return document_1[method](null);
            }
            if (isNonBlankString(context)) {
                context = document_1.querySelector(context);
            }
            var ctx = isEl(context) ? context : document_1;
            return ctx[method] && ctx[method](selector);
        };
    }

    function createEl() {
        var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var content = arguments[3];
        var el = document_1.createElement(tagName);
        Object.getOwnPropertyNames(properties).forEach(function(propName) {
            var val = properties[propName];
            if (propName.indexOf('aria-') !== -1 || propName === 'role' || propName === 'type') {
                log$1.warn(tsml(_templateObject, propName, val));
                el.setAttribute(propName, val);
            } else if (propName === 'textContent') {
                textContent(el, val);
            } else {
                el[propName] = val;
            }
        });
        Object.getOwnPropertyNames(attributes).forEach(function(attrName) {
            el.setAttribute(attrName, attributes[attrName]);
        });
        if (content) {
            appendContent(el, content);
        }
        return el;
    }

    function textContent(el, text) {
        if (typeof el.textContent === 'undefined') {
            el.innerText = text;
        } else {
            el.textContent = text;
        }
        return el;
    }

    function prependTo(child, parent) {
        if (parent.firstChild) {
            parent.insertBefore(child, parent.firstChild);
        } else {
            parent.appendChild(child);
        }
    }

    function hasClass(element, classToCheck) {
        throwIfWhitespace(classToCheck);
        if (element.classList) {
            return element.classList.contains(classToCheck);
        }
        return classRegExp(classToCheck).test(element.className);
    }

    function addClass(element, classToAdd) {
        if (element.classList) {
            element.classList.add(classToAdd);
        } else if (!hasClass(element, classToAdd)) {
            element.className = (element.className + ' ' + classToAdd).trim();
        }
        return element;
    }

    function removeClass(element, classToRemove) {
        if (element.classList) {
            element.classList.remove(classToRemove);
        } else {
            throwIfWhitespace(classToRemove);
            element.className = element.className.split(/\s+/).filter(function(c) {
                return c !== classToRemove;
            }).join(' ');
        }
        return element;
    }

    function toggleClass(element, classToToggle, predicate) {
        var has = hasClass(element, classToToggle);
        if (typeof predicate === 'function') {
            predicate = predicate(element, classToToggle);
        }
        if (typeof predicate !== 'boolean') {
            predicate = !has;
        }
        if (predicate === has) {
            return;
        }
        if (predicate) {
            addClass(element, classToToggle);
        } else {
            removeClass(element, classToToggle);
        }
        return element;
    }

    function setAttributes(el, attributes) {
        Object.getOwnPropertyNames(attributes).forEach(function(attrName) {
            var attrValue = attributes[attrName];
            if (attrValue === null || typeof attrValue === 'undefined' || attrValue === false) {
                el.removeAttribute(attrName);
            } else {
                el.setAttribute(attrName, attrValue === true ? '' : attrValue);
            }
        });
    }

    function getAttributes(tag) {
        var obj = {};
        var knownBooleans = ',' + 'autoplay,controls,playsinline,loop,muted,default,defaultMuted' + ',';
        if (tag && tag.attributes && tag.attributes.length > 0) {
            var attrs = tag.attributes;
            for (var i = attrs.length - 1; i >= 0; i--) {
                var attrName = attrs[i].name;
                var attrVal = attrs[i].value;
                if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
                    attrVal = attrVal !== null ? true : false;
                }
                obj[attrName] = attrVal;
            }
        }
        return obj;
    }

    function getAttribute(el, attribute) {
        return el.getAttribute(attribute);
    }

    function setAttribute(el, attribute, value) {
        el.setAttribute(attribute, value);
    }

    function removeAttribute(el, attribute) {
        el.removeAttribute(attribute);
    }

    function blockTextSelection() {
        document_1.body.focus();
        document_1.onselectstart = function() {
            return false;
        };
    }

    function unblockTextSelection() {
        document_1.onselectstart = function() {
            return true;
        };
    }

    function getBoundingClientRect(el) {
        if (el && el.getBoundingClientRect && el.parentNode) {
            var rect = el.getBoundingClientRect();
            var result = {};
            ['bottom', 'height', 'left', 'right', 'top', 'width'].forEach(function(k) {
                if (rect[k] !== undefined) {
                    result[k] = rect[k];
                }
            });
            if (!result.height) {
                result.height = parseFloat(computedStyle(el, 'height'));
            }
            if (!result.width) {
                result.width = parseFloat(computedStyle(el, 'width'));
            }
            return result;
        }
    }

    function findPosition(el) {
        var box = void 0;
        if (el.getBoundingClientRect && el.parentNode) {
            box = el.getBoundingClientRect();
        }
        if (!box) {
            return {
                left: 0,
                top: 0
            };
        }
        var docEl = document_1.documentElement;
        var body = document_1.body;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        var scrollLeft = window_1.pageXOffset || body.scrollLeft;
        var left = box.left + scrollLeft - clientLeft;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var scrollTop = window_1.pageYOffset || body.scrollTop;
        var top = box.top + scrollTop - clientTop;
        return {
            left: Math.round(left),
            top: Math.round(top)
        };
    }

    function getPointerPosition(el, event) {
        var position = {};
        var box = findPosition(el);
        var boxW = el.offsetWidth;
        var boxH = el.offsetHeight;
        var boxY = box.top;
        var boxX = box.left;
        var pageY = event.pageY;
        var pageX = event.pageX;
        if (event.changedTouches) {
            pageX = event.changedTouches[0].pageX;
            pageY = event.changedTouches[0].pageY;
        }
        position.y = Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
        position.x = Math.max(0, Math.min(1, (pageX - boxX) / boxW));
        return position;
    }

    function isTextNode(value) {
        return isObject(value) && value.nodeType === 3;
    }

    function emptyEl(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        return el;
    }

    function normalizeContent(content) {
        if (typeof content === 'function') {
            content = content();
        }
        return (Array.isArray(content) ? content : [content]).map(function(value) {
            if (typeof value === 'function') {
                value = value();
            }
            if (isEl(value) || isTextNode(value)) {
                return value;
            }
            if (typeof value === 'string' && /\S/.test(value)) {
                return document_1.createTextNode(value);
            }
        }).filter(function(value) {
            return value;
        });
    }

    function appendContent(el, content) {
        normalizeContent(content).forEach(function(node) {
            return el.appendChild(node);
        });
        return el;
    }

    function insertContent(el, content) {
        return appendContent(emptyEl(el), content);
    }

    function isSingleLeftClick(event) {
        if (event.button === undefined && event.buttons === undefined) {
            return true;
        }
        if (event.button === 0 && event.buttons === undefined) {
            return true;
        }
        if (IE_VERSION === 9) {
            return true;
        }
        if (event.button !== 0 || event.buttons !== 1) {
            return false;
        }
        return true;
    }
    var $ = createQuerier('querySelector');
    var $$ = createQuerier('querySelectorAll');
    var Dom = (Object.freeze || Object)({
        isReal: isReal,
        isEl: isEl,
        isInFrame: isInFrame,
        createEl: createEl,
        textContent: textContent,
        prependTo: prependTo,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        setAttributes: setAttributes,
        getAttributes: getAttributes,
        getAttribute: getAttribute,
        setAttribute: setAttribute,
        removeAttribute: removeAttribute,
        blockTextSelection: blockTextSelection,
        unblockTextSelection: unblockTextSelection,
        getBoundingClientRect: getBoundingClientRect,
        findPosition: findPosition,
        getPointerPosition: getPointerPosition,
        isTextNode: isTextNode,
        emptyEl: emptyEl,
        normalizeContent: normalizeContent,
        appendContent: appendContent,
        insertContent: insertContent,
        isSingleLeftClick: isSingleLeftClick,
        $: $,
        $$: $$
    });
    var _guid = 1;

    function newGUID() {
        return _guid++;
    }
    var elData = {};
    var elIdAttr = 'vdata' + new Date().getTime();

    function getData(el) {
        var id = el[elIdAttr];
        if (!id) {
            id = el[elIdAttr] = newGUID();
        }
        if (!elData[id]) {
            elData[id] = {};
        }
        return elData[id];
    }

    function hasData(el) {
        var id = el[elIdAttr];
        if (!id) {
            return false;
        }
        return !!Object.getOwnPropertyNames(elData[id]).length;
    }

    function removeData(el) {
        var id = el[elIdAttr];
        if (!id) {
            return;
        }
        delete elData[id];
        try {
            delete el[elIdAttr];
        } catch (e) {
            if (el.removeAttribute) {
                el.removeAttribute(elIdAttr);
            } else {
                el[elIdAttr] = null;
            }
        }
    }

    function _cleanUpEvents(elem, type) {
        var data = getData(elem);
        if (data.handlers[type].length === 0) {
            delete data.handlers[type];
            if (elem.removeEventListener) {
                elem.removeEventListener(type, data.dispatcher, false);
            } else if (elem.detachEvent) {
                elem.detachEvent('on' + type, data.dispatcher);
            }
        }
        if (Object.getOwnPropertyNames(data.handlers).length <= 0) {
            delete data.handlers;
            delete data.dispatcher;
            delete data.disabled;
        }
        if (Object.getOwnPropertyNames(data).length === 0) {
            removeData(elem);
        }
    }

    function _handleMultipleEvents(fn, elem, types, callback) {
        types.forEach(function(type) {
            fn(elem, type, callback);
        });
    }

    function fixEvent(event) {
        function returnTrue() {
            return true;
        }

        function returnFalse() {
            return false;
        }
        if (!event || !event.isPropagationStopped) {
            var old = event || window_1.event;
            event = {};
            for (var key in old) {
                if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation' && key !== 'webkitMovementX' && key !== 'webkitMovementY') {
                    if (!(key === 'returnValue' && old.preventDefault)) {
                        event[key] = old[key];
                    }
                }
            }
            if (!event.target) {
                event.target = event.srcElement || document_1;
            }
            if (!event.relatedTarget) {
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            event.preventDefault = function() {
                if (old.preventDefault) {
                    old.preventDefault();
                }
                event.returnValue = false;
                old.returnValue = false;
                event.defaultPrevented = true;
            };
            event.defaultPrevented = false;
            event.stopPropagation = function() {
                if (old.stopPropagation) {
                    old.stopPropagation();
                }
                event.cancelBubble = true;
                old.cancelBubble = true;
                event.isPropagationStopped = returnTrue;
            };
            event.isPropagationStopped = returnFalse;
            event.stopImmediatePropagation = function() {
                if (old.stopImmediatePropagation) {
                    old.stopImmediatePropagation();
                }
                event.isImmediatePropagationStopped = returnTrue;
                event.stopPropagation();
            };
            event.isImmediatePropagationStopped = returnFalse;
            if (event.clientX !== null && event.clientX !== undefined) {
                var doc = document_1.documentElement;
                var body = document_1.body;
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            event.which = event.charCode || event.keyCode;
            if (event.button !== null && event.button !== undefined) {
                event.button = event.button & 1 ? 0 : event.button & 4 ? 1 : event.button & 2 ? 2 : 0;
            }
        }
        return event;
    }
    var _supportsPassive = false;
    (function() {
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function get() {
                    _supportsPassive = true;
                }
            });
            window_1.addEventListener('test', null, opts);
            window_1.removeEventListener('test', null, opts);
        } catch (e) {}
    })();
    var passiveEvents = ['touchstart', 'touchmove'];

    function on(elem, type, fn) {
        if (Array.isArray(type)) {
            return _handleMultipleEvents(on, elem, type, fn);
        }
        var data = getData(elem);
        if (!data.handlers) {
            data.handlers = {};
        }
        if (!data.handlers[type]) {
            data.handlers[type] = [];
        }
        if (!fn.guid) {
            fn.guid = newGUID();
        }
        data.handlers[type].push(fn);
        if (!data.dispatcher) {
            data.disabled = false;
            data.dispatcher = function(event, hash) {
                if (data.disabled) {
                    return;
                }
                event = fixEvent(event);
                var handlers = data.handlers[event.type];
                if (handlers) {
                    var handlersCopy = handlers.slice(0);
                    for (var m = 0, n = handlersCopy.length; m < n; m++) {
                        if (event.isImmediatePropagationStopped()) {
                            break;
                        } else {
                            try {
                                handlersCopy[m].call(elem, event, hash);
                            } catch (e) {
                                log$1.error(e);
                            }
                        }
                    }
                }
            };
        }
        if (data.handlers[type].length === 1) {
            if (elem.addEventListener) {
                var options = false;
                if (_supportsPassive && passiveEvents.indexOf(type) > -1) {
                    options = {
                        passive: true
                    };
                }
                elem.addEventListener(type, data.dispatcher, options);
            } else if (elem.attachEvent) {
                elem.attachEvent('on' + type, data.dispatcher);
            }
        }
    }

    function off(elem, type, fn) {
        if (!hasData(elem)) {
            return;
        }
        var data = getData(elem);
        if (!data.handlers) {
            return;
        }
        if (Array.isArray(type)) {
            return _handleMultipleEvents(off, elem, type, fn);
        }
        var removeType = function removeType(el, t) {
            data.handlers[t] = [];
            _cleanUpEvents(el, t);
        };
        if (type === undefined) {
            for (var t in data.handlers) {
                if (Object.prototype.hasOwnProperty.call(data.handlers || {}, t)) {
                    removeType(elem, t);
                }
            }
            return;
        }
        var handlers = data.handlers[type];
        if (!handlers) {
            return;
        }
        if (!fn) {
            removeType(elem, type);
            return;
        }
        if (fn.guid) {
            for (var n = 0; n < handlers.length; n++) {
                if (handlers[n].guid === fn.guid) {
                    handlers.splice(n--, 1);
                }
            }
        }
        _cleanUpEvents(elem, type);
    }

    function trigger(elem, event, hash) {
        var elemData = hasData(elem) ? getData(elem) : {};
        var parent = elem.parentNode || elem.ownerDocument;
        if (typeof event === 'string') {
            event = {
                type: event,
                target: elem
            };
        }
        event = fixEvent(event);
        if (elemData.dispatcher) {
            elemData.dispatcher.call(elem, event, hash);
        }
        if (parent && !event.isPropagationStopped() && event.bubbles === true) {
            trigger.call(null, parent, event, hash);
        } else if (!parent && !event.defaultPrevented) {
            var targetData = getData(event.target);
            if (event.target[event.type]) {
                targetData.disabled = true;
                if (typeof event.target[event.type] === 'function') {
                    event.target[event.type]();
                }
                targetData.disabled = false;
            }
        }
        return !event.defaultPrevented;
    }

    function one(elem, type, fn) {
        if (Array.isArray(type)) {
            return _handleMultipleEvents(one, elem, type, fn);
        }
        var func = function func() {
            off(elem, type, func);
            fn.apply(this, arguments);
        };
        func.guid = fn.guid = fn.guid || newGUID();
        on(elem, type, func);
    }
    var Events = (Object.freeze || Object)({
        fixEvent: fixEvent,
        on: on,
        off: off,
        trigger: trigger,
        one: one
    });
    var _windowLoaded = false;
    var videojs$2 = void 0;
    var autoSetup = function autoSetup() {
        if (!isReal()) {
            return;
        }
        var vids = document_1.getElementsByTagName('video');
        var audios = document_1.getElementsByTagName('audio');
        var divs = document_1.getElementsByTagName('video-js');
        var mediaEls = [];
        if (vids && vids.length > 0) {
            for (var i = 0, e = vids.length; i < e; i++) {
                mediaEls.push(vids[i]);
            }
        }
        if (audios && audios.length > 0) {
            for (var _i = 0, _e = audios.length; _i < _e; _i++) {
                mediaEls.push(audios[_i]);
            }
        }
        if (divs && divs.length > 0) {
            for (var _i2 = 0, _e2 = divs.length; _i2 < _e2; _i2++) {
                mediaEls.push(divs[_i2]);
            }
        }
        if (mediaEls && mediaEls.length > 0) {
            for (var _i3 = 0, _e3 = mediaEls.length; _i3 < _e3; _i3++) {
                var mediaEl = mediaEls[_i3];
                if (mediaEl && mediaEl.getAttribute) {
                    if (mediaEl.player === undefined) {
                        var options = mediaEl.getAttribute('data-setup');
                        if (options !== null) {
                            videojs$2(mediaEl);
                        }
                    }
                } else {
                    autoSetupTimeout(1);
                    break;
                }
            }
        } else if (!_windowLoaded) {
            autoSetupTimeout(1);
        }
    };

    function autoSetupTimeout(wait, vjs) {
        if (vjs) {
            videojs$2 = vjs;
        }
        window_1.setTimeout(autoSetup, wait);
    }
    if (isReal() && document_1.readyState === 'complete') {
        _windowLoaded = true;
    } else {
        one(window_1, 'load', function() {
            _windowLoaded = true;
        });
    }
    var createStyleElement = function createStyleElement(className) {
        var style = document_1.createElement('style');
        style.className = className;
        return style;
    };
    var setTextContent = function setTextContent(el, content) {
        if (el.styleSheet) {
            el.styleSheet.cssText = content;
        } else {
            el.textContent = content;
        }
    };
    var bind = function bind(context, fn, uid) {
        if (!fn.guid) {
            fn.guid = newGUID();
        }
        var bound = function bound() {
            return fn.apply(context, arguments);
        };
        bound.guid = uid ? uid + '_' + fn.guid : fn.guid;
        return bound;
    };
    var throttle = function throttle(fn, wait) {
        var last = Date.now();
        var throttled = function throttled() {
            var now = Date.now();
            if (now - last >= wait) {
                fn.apply(undefined, arguments);
                last = now;
            }
        };
        return throttled;
    };
    var EventTarget = function EventTarget() {};
    EventTarget.prototype.allowedEvents_ = {};
    EventTarget.prototype.on = function(type, fn) {
        var ael = this.addEventListener;
        this.addEventListener = function() {};
        on(this, type, fn);
        this.addEventListener = ael;
    };
    EventTarget.prototype.addEventListener = EventTarget.prototype.on;
    EventTarget.prototype.off = function(type, fn) {
        off(this, type, fn);
    };
    EventTarget.prototype.removeEventListener = EventTarget.prototype.off;
    EventTarget.prototype.one = function(type, fn) {
        var ael = this.addEventListener;
        this.addEventListener = function() {};
        one(this, type, fn);
        this.addEventListener = ael;
    };
    EventTarget.prototype.trigger = function(event) {
        var type = event.type || event;
        if (typeof event === 'string') {
            event = {
                type: type
            };
        }
        event = fixEvent(event);
        if (this.allowedEvents_[type] && this['on' + type]) {
            this['on' + type](event);
        }
        trigger(this, event);
    };
    EventTarget.prototype.dispatchEvent = EventTarget.prototype.trigger;
    var isEvented = function isEvented(object) {
        return object instanceof EventTarget || !!object.eventBusEl_ && ['on', 'one', 'off', 'trigger'].every(function(k) {
            return typeof object[k] === 'function';
        });
    };
    var isValidEventType = function isValidEventType(type) {
        return (typeof type === 'string' && /\S/.test(type) || Array.isArray(type) && !!type.length);
    };
    var validateTarget = function validateTarget(target) {
        if (!target.nodeName && !isEvented(target)) {
            throw new Error('Invalid target; must be a DOM node or evented object.');
        }
    };
    var validateEventType = function validateEventType(type) {
        if (!isValidEventType(type)) {
            throw new Error('Invalid event type; must be a non-empty string or array.');
        }
    };
    var validateListener = function validateListener(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Invalid listener; must be a function.');
        }
    };
    var normalizeListenArgs = function normalizeListenArgs(self, args) {
        var isTargetingSelf = args.length < 3 || args[0] === self || args[0] === self.eventBusEl_;
        var target = void 0;
        var type = void 0;
        var listener = void 0;
        if (isTargetingSelf) {
            target = self.eventBusEl_;
            if (args.length >= 3) {
                args.shift();
            }
            type = args[0];
            listener = args[1];
        } else {
            target = args[0];
            type = args[1];
            listener = args[2];
        }
        validateTarget(target);
        validateEventType(type);
        validateListener(listener);
        listener = bind(self, listener);
        return {
            isTargetingSelf: isTargetingSelf,
            target: target,
            type: type,
            listener: listener
        };
    };
    var listen = function listen(target, method, type, listener) {
        validateTarget(target);
        if (target.nodeName) {
            Events[method](target, type, listener);
        } else {
            target[method](type, listener);
        }
    };
    var EventedMixin = {
        on: function on$$1() {
            var _this = this;
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            var _normalizeListenArgs = normalizeListenArgs(this, args),
                isTargetingSelf = _normalizeListenArgs.isTargetingSelf,
                target = _normalizeListenArgs.target,
                type = _normalizeListenArgs.type,
                listener = _normalizeListenArgs.listener;
            listen(target, 'on', type, listener);
            if (!isTargetingSelf) {
                var removeListenerOnDispose = function removeListenerOnDispose() {
                    return _this.off(target, type, listener);
                };
                removeListenerOnDispose.guid = listener.guid;
                var removeRemoverOnTargetDispose = function removeRemoverOnTargetDispose() {
                    return _this.off('dispose', removeListenerOnDispose);
                };
                removeRemoverOnTargetDispose.guid = listener.guid;
                listen(this, 'on', 'dispose', removeListenerOnDispose);
                listen(target, 'on', 'dispose', removeRemoverOnTargetDispose);
            }
        },
        one: function one$$1() {
            var _this2 = this;
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }
            var _normalizeListenArgs2 = normalizeListenArgs(this, args),
                isTargetingSelf = _normalizeListenArgs2.isTargetingSelf,
                target = _normalizeListenArgs2.target,
                type = _normalizeListenArgs2.type,
                listener = _normalizeListenArgs2.listener;
            if (isTargetingSelf) {
                listen(target, 'one', type, listener);
            } else {
                var wrapper = function wrapper() {
                    for (var _len3 = arguments.length, largs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        largs[_key3] = arguments[_key3];
                    }
                    _this2.off(target, type, wrapper);
                    listener.apply(null, largs);
                };
                wrapper.guid = listener.guid;
                listen(target, 'one', type, wrapper);
            }
        },
        off: function off$$1(targetOrType, typeOrListener, listener) {
            if (!targetOrType || isValidEventType(targetOrType)) {
                off(this.eventBusEl_, targetOrType, typeOrListener);
            } else {
                var target = targetOrType;
                var type = typeOrListener;
                validateTarget(target);
                validateEventType(type);
                validateListener(listener);
                listener = bind(this, listener);
                this.off('dispose', listener);
                if (target.nodeName) {
                    off(target, type, listener);
                    off(target, 'dispose', listener);
                } else if (isEvented(target)) {
                    target.off(type, listener);
                    target.off('dispose', listener);
                }
            }
        },
        trigger: function trigger$$1(event, hash) {
            return trigger(this.eventBusEl_, event, hash);
        }
    };

    function evented(target) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var eventBusKey = options.eventBusKey;
        if (eventBusKey) {
            if (!target[eventBusKey].nodeName) {
                throw new Error('The eventBusKey "' + eventBusKey + '" does not refer to an element.');
            }
            target.eventBusEl_ = target[eventBusKey];
        } else {
            target.eventBusEl_ = createEl('span', {
                className: 'vjs-event-bus'
            });
        }
        assign(target, EventedMixin);
        target.on('dispose', function() {
            target.off();
            window_1.setTimeout(function() {
                target.eventBusEl_ = null;
            }, 0);
        });
        return target;
    }
    var StatefulMixin = {
        state: {},
        setState: function setState(stateUpdates) {
            var _this = this;
            if (typeof stateUpdates === 'function') {
                stateUpdates = stateUpdates();
            }
            var changes = void 0;
            each(stateUpdates, function(value, key) {
                if (_this.state[key] !== value) {
                    changes = changes || {};
                    changes[key] = {
                        from: _this.state[key],
                        to: value
                    };
                }
                _this.state[key] = value;
            });
            if (changes && isEvented(this)) {
                this.trigger({
                    changes: changes,
                    type: 'statechanged'
                });
            }
            return changes;
        }
    };

    function stateful(target, defaultState) {
        assign(target, StatefulMixin);
        target.state = assign({}, target.state, defaultState);
        if (typeof target.handleStateChanged === 'function' && isEvented(target)) {
            target.on('statechanged', target.handleStateChanged);
        }
        return target;
    }

    function toTitleCase(string) {
        if (typeof string !== 'string') {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function titleCaseEquals(str1, str2) {
        return toTitleCase(str1) === toTitleCase(str2);
    }

    function mergeOptions() {
        var result = {};
        for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
            sources[_key] = arguments[_key];
        }
        sources.forEach(function(source) {
            if (!source) {
                return;
            }
            each(source, function(value, key) {
                if (!isPlain(value)) {
                    result[key] = value;
                    return;
                }
                if (!isPlain(result[key])) {
                    result[key] = {};
                }
                result[key] = mergeOptions(result[key], value);
            });
        });
        return result;
    }
    var Component = function() {
        function Component(player, options, ready) {
            classCallCheck(this, Component);
            if (!player && this.play) {
                this.player_ = player = this;
            } else {
                this.player_ = player;
            }
            this.options_ = mergeOptions({}, this.options_);
            options = this.options_ = mergeOptions(this.options_, options);
            this.id_ = options.id || options.el && options.el.id;
            if (!this.id_) {
                var id = player && player.id && player.id() || 'no_player';
                this.id_ = id + '_component_' + newGUID();
            }
            this.name_ = options.name || null;
            if (options.el) {
                this.el_ = options.el;
            } else if (options.createEl !== false) {
                this.el_ = this.createEl();
            }
            if (options.evented !== false) {
                evented(this, {
                    eventBusKey: this.el_ ? 'el_' : null
                });
            }
            stateful(this, this.constructor.defaultState);
            this.children_ = [];
            this.childIndex_ = {};
            this.childNameIndex_ = {};
            if (options.initChildren !== false) {
                this.initChildren();
            }
            this.ready(ready);
            if (options.reportTouchActivity !== false) {
                this.enableTouchActivity();
            }
        }
        Component.prototype.dispose = function dispose() {
            this.trigger({
                type: 'dispose',
                bubbles: false
            });
            if (this.children_) {
                for (var i = this.children_.length - 1; i >= 0; i--) {
                    if (this.children_[i].dispose) {
                        this.children_[i].dispose();
                    }
                }
            }
            this.children_ = null;
            this.childIndex_ = null;
            this.childNameIndex_ = null;
            if (this.el_) {
                if (this.el_.parentNode) {
                    this.el_.parentNode.removeChild(this.el_);
                }
                removeData(this.el_);
                this.el_ = null;
            }
            this.player_ = null;
        };
        Component.prototype.player = function player() {
            return this.player_;
        };
        Component.prototype.options = function options(obj) {
            log$1.warn('this.options() has been deprecated and will be moved to the constructor in 6.0');
            if (!obj) {
                return this.options_;
            }
            this.options_ = mergeOptions(this.options_, obj);
            return this.options_;
        };
        Component.prototype.el = function el() {
            return this.el_;
        };
        Component.prototype.createEl = function createEl$$1(tagName, properties, attributes) {
            return createEl(tagName, properties, attributes);
        };
        Component.prototype.localize = function localize(string, tokens) {
            var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : string;
            var code = this.player_.language && this.player_.language();
            var languages = this.player_.languages && this.player_.languages();
            var language = languages && languages[code];
            var primaryCode = code && code.split('-')[0];
            var primaryLang = languages && languages[primaryCode];
            var localizedString = defaultValue;
            if (language && language[string]) {
                localizedString = language[string];
            } else if (primaryLang && primaryLang[string]) {
                localizedString = primaryLang[string];
            }
            if (tokens) {
                localizedString = localizedString.replace(/\{(\d+)\}/g, function(match, index) {
                    var value = tokens[index - 1];
                    var ret = value;
                    if (typeof value === 'undefined') {
                        ret = match;
                    }
                    return ret;
                });
            }
            return localizedString;
        };
        Component.prototype.contentEl = function contentEl() {
            return this.contentEl_ || this.el_;
        };
        Component.prototype.id = function id() {
            return this.id_;
        };
        Component.prototype.name = function name() {
            return this.name_;
        };
        Component.prototype.children = function children() {
            return this.children_;
        };
        Component.prototype.getChildById = function getChildById(id) {
            return this.childIndex_[id];
        };
        Component.prototype.getChild = function getChild(name) {
            if (!name) {
                return;
            }
            name = toTitleCase(name);
            return this.childNameIndex_[name];
        };
        Component.prototype.addChild = function addChild(child) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.children_.length;
            var component = void 0;
            var componentName = void 0;
            if (typeof child === 'string') {
                componentName = toTitleCase(child);
                var componentClassName = options.componentClass || componentName;
                options.name = componentName;
                var ComponentClass = Component.getComponent(componentClassName);
                if (!ComponentClass) {
                    throw new Error('Component ' + componentClassName + ' does not exist');
                }
                if (typeof ComponentClass !== 'function') {
                    return null;
                }
                component = new ComponentClass(this.player_ || this, options);
            } else {
                component = child;
            }
            this.children_.splice(index, 0, component);
            if (typeof component.id === 'function') {
                this.childIndex_[component.id()] = component;
            }
            componentName = componentName || component.name && toTitleCase(component.name());
            if (componentName) {
                this.childNameIndex_[componentName] = component;
            }
            if (typeof component.el === 'function' && component.el()) {
                var childNodes = this.contentEl().children;
                var refNode = childNodes[index] || null;
                this.contentEl().insertBefore(component.el(), refNode);
            }
            return component;
        };
        Component.prototype.removeChild = function removeChild(component) {
            if (typeof component === 'string') {
                component = this.getChild(component);
            }
            if (!component || !this.children_) {
                return;
            }
            var childFound = false;
            for (var i = this.children_.length - 1; i >= 0; i--) {
                if (this.children_[i] === component) {
                    childFound = true;
                    this.children_.splice(i, 1);
                    break;
                }
            }
            if (!childFound) {
                return;
            }
            this.childIndex_[component.id()] = null;
            this.childNameIndex_[component.name()] = null;
            var compEl = component.el();
            if (compEl && compEl.parentNode === this.contentEl()) {
                this.contentEl().removeChild(component.el());
            }
        };
        Component.prototype.initChildren = function initChildren() {
            var _this = this;
            var children = this.options_.children;
            if (children) {
                var parentOptions = this.options_;
                var handleAdd = function handleAdd(child) {
                    var name = child.name;
                    var opts = child.opts;
                    if (parentOptions[name] !== undefined) {
                        opts = parentOptions[name];
                    }
                    if (opts === false) {
                        return;
                    }
                    if (opts === true) {
                        opts = {};
                    }
                    opts.playerOptions = _this.options_.playerOptions;
                    var newChild = _this.addChild(name, opts);
                    if (newChild) {
                        _this[name] = newChild;
                    }
                };
                var workingChildren = void 0;
                var Tech = Component.getComponent('Tech');
                if (Array.isArray(children)) {
                    workingChildren = children;
                } else {
                    workingChildren = Object.keys(children);
                }
                workingChildren.concat(Object.keys(this.options_).filter(function(child) {
                    return !workingChildren.some(function(wchild) {
                        if (typeof wchild === 'string') {
                            return child === wchild;
                        }
                        return child === wchild.name;
                    });
                })).map(function(child) {
                    var name = void 0;
                    var opts = void 0;
                    if (typeof child === 'string') {
                        name = child;
                        opts = children[name] || _this.options_[name] || {};
                    } else {
                        name = child.name;
                        opts = child;
                    }
                    return {
                        name: name,
                        opts: opts
                    };
                }).filter(function(child) {
                    var c = Component.getComponent(child.opts.componentClass || toTitleCase(child.name));
                    return c && !Tech.isTech(c);
                }).forEach(handleAdd);
            }
        };
        Component.prototype.buildCSSClass = function buildCSSClass() {
            return '';
        };
        Component.prototype.ready = function ready(fn) {
            var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            if (!fn) {
                return;
            }
            if (!this.isReady_) {
                this.readyQueue_ = this.readyQueue_ || [];
                this.readyQueue_.push(fn);
                return;
            }
            if (sync) {
                fn.call(this);
            } else {
                this.setTimeout(fn, 1);
            }
        };
        Component.prototype.triggerReady = function triggerReady() {
            this.isReady_ = true;
            this.setTimeout(function() {
                var readyQueue = this.readyQueue_;
                this.readyQueue_ = [];
                if (readyQueue && readyQueue.length > 0) {
                    readyQueue.forEach(function(fn) {
                        fn.call(this);
                    }, this);
                }
                this.trigger('ready');
            }, 1);
        };
        Component.prototype.$ = function $$$1(selector, context) {
            return $(selector, context || this.contentEl());
        };
        Component.prototype.$$ = function $$$$1(selector, context) {
            return $$(selector, context || this.contentEl());
        };
        Component.prototype.hasClass = function hasClass$$1(classToCheck) {
            return hasClass(this.el_, classToCheck);
        };
        Component.prototype.addClass = function addClass$$1(classToAdd) {
            addClass(this.el_, classToAdd);
        };
        Component.prototype.removeClass = function removeClass$$1(classToRemove) {
            removeClass(this.el_, classToRemove);
        };
        Component.prototype.toggleClass = function toggleClass$$1(classToToggle, predicate) {
            toggleClass(this.el_, classToToggle, predicate);
        };
        Component.prototype.show = function show() {
            this.removeClass('vjs-hidden');
        };
        Component.prototype.hide = function hide() {
            this.addClass('vjs-hidden');
        };
        Component.prototype.lockShowing = function lockShowing() {
            this.addClass('vjs-lock-showing');
        };
        Component.prototype.unlockShowing = function unlockShowing() {
            this.removeClass('vjs-lock-showing');
        };
        Component.prototype.getAttribute = function getAttribute$$1(attribute) {
            return getAttribute(this.el_, attribute);
        };
        Component.prototype.setAttribute = function setAttribute$$1(attribute, value) {
            setAttribute(this.el_, attribute, value);
        };
        Component.prototype.removeAttribute = function removeAttribute$$1(attribute) {
            removeAttribute(this.el_, attribute);
        };
        Component.prototype.width = function width(num, skipListeners) {
            return this.dimension('width', num, skipListeners);
        };
        Component.prototype.height = function height(num, skipListeners) {
            return this.dimension('height', num, skipListeners);
        };
        Component.prototype.dimensions = function dimensions(width, height) {
            this.width(width, true);
            this.height(height);
        };
        Component.prototype.dimension = function dimension(widthOrHeight, num, skipListeners) {
            if (num !== undefined) {
                if (num === null || num !== num) {
                    num = 0;
                }
                if (('' + num).indexOf('%') !== -1 || ('' + num).indexOf('px') !== -1) {
                    this.el_.style[widthOrHeight] = num;
                } else if (num === 'auto') {
                    this.el_.style[widthOrHeight] = '';
                } else {
                    this.el_.style[widthOrHeight] = num + 'px';
                }
                if (!skipListeners) {
                    this.trigger('componentresize');
                }
                return;
            }
            if (!this.el_) {
                return 0;
            }
            var val = this.el_.style[widthOrHeight];
            var pxIndex = val.indexOf('px');
            if (pxIndex !== -1) {
                return parseInt(val.slice(0, pxIndex), 10);
            }
            return parseInt(this.el_['offset' + toTitleCase(widthOrHeight)], 10);
        };
        Component.prototype.currentDimension = function currentDimension(widthOrHeight) {
            var computedWidthOrHeight = 0;
            if (widthOrHeight !== 'width' && widthOrHeight !== 'height') {
                throw new Error('currentDimension only accepts width or height value');
            }
            if (typeof window_1.getComputedStyle === 'function') {
                var computedStyle = window_1.getComputedStyle(this.el_);
                computedWidthOrHeight = computedStyle.getPropertyValue(widthOrHeight) || computedStyle[widthOrHeight];
            }
            computedWidthOrHeight = parseFloat(computedWidthOrHeight);
            if (computedWidthOrHeight === 0) {
                var rule = 'offset' + toTitleCase(widthOrHeight);
                computedWidthOrHeight = this.el_[rule];
            }
            return computedWidthOrHeight;
        };
        Component.prototype.currentDimensions = function currentDimensions() {
            return {
                width: this.currentDimension('width'),
                height: this.currentDimension('height')
            };
        };
        Component.prototype.currentWidth = function currentWidth() {
            return this.currentDimension('width');
        };
        Component.prototype.currentHeight = function currentHeight() {
            return this.currentDimension('height');
        };
        Component.prototype.focus = function focus() {
            this.el_.focus();
        };
        Component.prototype.blur = function blur() {
            this.el_.blur();
        };
        Component.prototype.emitTapEvents = function emitTapEvents() {
            var touchStart = 0;
            var firstTouch = null;
            var tapMovementThreshold = 10;
            var touchTimeThreshold = 200;
            var couldBeTap = void 0;
            this.on('touchstart', function(event) {
                if (event.touches.length === 1) {
                    firstTouch = {
                        pageX: event.touches[0].pageX,
                        pageY: event.touches[0].pageY
                    };
                    touchStart = new Date().getTime();
                    couldBeTap = true;
                }
            });
            this.on('touchmove', function(event) {
                if (event.touches.length > 1) {
                    couldBeTap = false;
                } else if (firstTouch) {
                    var xdiff = event.touches[0].pageX - firstTouch.pageX;
                    var ydiff = event.touches[0].pageY - firstTouch.pageY;
                    var touchDistance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                    if (touchDistance > tapMovementThreshold) {
                        couldBeTap = false;
                    }
                }
            });
            var noTap = function noTap() {
                couldBeTap = false;
            };
            this.on('touchleave', noTap);
            this.on('touchcancel', noTap);
            this.on('touchend', function(event) {
                firstTouch = null;
                if (couldBeTap === true) {
                    var touchTime = new Date().getTime() - touchStart;
                    if (touchTime < touchTimeThreshold) {
                        event.preventDefault();
                        this.trigger('tap');
                    }
                }
            });
        };
        Component.prototype.enableTouchActivity = function enableTouchActivity() {
            if (!this.player() || !this.player().reportUserActivity) {
                return;
            }
            var report = bind(this.player(), this.player().reportUserActivity);
            var touchHolding = void 0;
            this.on('touchstart', function() {
                report();
                this.clearInterval(touchHolding);
                touchHolding = this.setInterval(report, 250);
            });
            var touchEnd = function touchEnd(event) {
                report();
                this.clearInterval(touchHolding);
            };
            this.on('touchmove', report);
            this.on('touchend', touchEnd);
            this.on('touchcancel', touchEnd);
        };
        Component.prototype.setTimeout = function setTimeout(fn, timeout) {
            var _this2 = this;
            fn = bind(this, fn);
            var timeoutId = window_1.setTimeout(fn, timeout);
            var disposeFn = function disposeFn() {
                return _this2.clearTimeout(timeoutId);
            };
            disposeFn.guid = 'vjs-timeout-' + timeoutId;
            this.on('dispose', disposeFn);
            return timeoutId;
        };
        Component.prototype.clearTimeout = function clearTimeout(timeoutId) {
            window_1.clearTimeout(timeoutId);
            var disposeFn = function disposeFn() {};
            disposeFn.guid = 'vjs-timeout-' + timeoutId;
            this.off('dispose', disposeFn);
            return timeoutId;
        };
        Component.prototype.setInterval = function setInterval(fn, interval) {
            var _this3 = this;
            fn = bind(this, fn);
            var intervalId = window_1.setInterval(fn, interval);
            var disposeFn = function disposeFn() {
                return _this3.clearInterval(intervalId);
            };
            disposeFn.guid = 'vjs-interval-' + intervalId;
            this.on('dispose', disposeFn);
            return intervalId;
        };
        Component.prototype.clearInterval = function clearInterval(intervalId) {
            window_1.clearInterval(intervalId);
            var disposeFn = function disposeFn() {};
            disposeFn.guid = 'vjs-interval-' + intervalId;
            this.off('dispose', disposeFn);
            return intervalId;
        };
        Component.prototype.requestAnimationFrame = function requestAnimationFrame(fn) {
            var _this4 = this;
            if (this.supportsRaf_) {
                fn = bind(this, fn);
                var id = window_1.requestAnimationFrame(fn);
                var disposeFn = function disposeFn() {
                    return _this4.cancelAnimationFrame(id);
                };
                disposeFn.guid = 'vjs-raf-' + id;
                this.on('dispose', disposeFn);
                return id;
            }
            return this.setTimeout(fn, 1000 / 60);
        };
        Component.prototype.cancelAnimationFrame = function cancelAnimationFrame(id) {
            if (this.supportsRaf_) {
                window_1.cancelAnimationFrame(id);
                var disposeFn = function disposeFn() {};
                disposeFn.guid = 'vjs-raf-' + id;
                this.off('dispose', disposeFn);
                return id;
            }
            return this.clearTimeout(id);
        };
        Component.registerComponent = function registerComponent(name, ComponentToRegister) {
            if (typeof name !== 'string' || !name) {
                throw new Error('Illegal component name, "' + name + '"; must be a non-empty string.');
            }
            var Tech = Component.getComponent('Tech');
            var isTech = Tech && Tech.isTech(ComponentToRegister);
            var isComp = Component === ComponentToRegister || Component.prototype.isPrototypeOf(ComponentToRegister.prototype);
            if (isTech || !isComp) {
                var reason = void 0;
                if (isTech) {
                    reason = 'techs must be registered using Tech.registerTech()';
                } else {
                    reason = 'must be a Component subclass';
                }
                throw new Error('Illegal component, "' + name + '"; ' + reason + '.');
            }
            name = toTitleCase(name);
            if (!Component.components_) {
                Component.components_ = {};
            }
            var Player = Component.getComponent('Player');
            if (name === 'Player' && Player && Player.players) {
                var players = Player.players;
                var playerNames = Object.keys(players);
                if (players && playerNames.length > 0 && playerNames.map(function(pname) {
                        return players[pname];
                    }).every(Boolean)) {
                    throw new Error('Can not register Player component after player has been created.');
                }
            }
            Component.components_[name] = ComponentToRegister;
            return ComponentToRegister;
        };
        Component.getComponent = function getComponent(name) {
            if (!name) {
                return;
            }
            name = toTitleCase(name);
            if (Component.components_ && Component.components_[name]) {
                return Component.components_[name];
            }
        };
        return Component;
    }();
    Component.prototype.supportsRaf_ = typeof window_1.requestAnimationFrame === 'function' && typeof window_1.cancelAnimationFrame === 'function';
    Component.registerComponent('Component', Component);

    function rangeCheck(fnName, index, maxIndex) {
        if (typeof index !== 'number' || index < 0 || index > maxIndex) {
            throw new Error('Failed to execute \'' + fnName + '\' on \'TimeRanges\': The index provided (' + index + ') is non-numeric or out of bounds (0-' + maxIndex + ').');
        }
    }

    function getRange(fnName, valueIndex, ranges, rangeIndex) {
        rangeCheck(fnName, rangeIndex, ranges.length - 1);
        return ranges[rangeIndex][valueIndex];
    }

    function createTimeRangesObj(ranges) {
        if (ranges === undefined || ranges.length === 0) {
            return {
                length: 0,
                start: function start() {
                    throw new Error('This TimeRanges object is empty');
                },
                end: function end() {
                    throw new Error('This TimeRanges object is empty');
                }
            };
        }
        return {
            length: ranges.length,
            start: getRange.bind(null, 'start', 0, ranges),
            end: getRange.bind(null, 'end', 1, ranges)
        };
    }

    function createTimeRanges(start, end) {
        if (Array.isArray(start)) {
            return createTimeRangesObj(start);
        } else if (start === undefined || end === undefined) {
            return createTimeRangesObj();
        }
        return createTimeRangesObj([
            [start, end]
        ]);
    }

    function bufferedPercent(buffered, duration) {
        var bufferedDuration = 0;
        var start = void 0;
        var end = void 0;
        if (!duration) {
            return 0;
        }
        if (!buffered || !buffered.length) {
            buffered = createTimeRanges(0, 0);
        }
        for (var i = 0; i < buffered.length; i++) {
            start = buffered.start(i);
            end = buffered.end(i);
            if (end > duration) {
                end = duration;
            }
            bufferedDuration += end - start;
        }
        return bufferedDuration / duration;
    }
    var FullscreenApi = {};
    var apiMap = [
        ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
        ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
        ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
        ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']
    ];
    var specApi = apiMap[0];
    var browserApi = void 0;
    for (var i = 0; i < apiMap.length; i++) {
        if (apiMap[i][1] in document_1) {
            browserApi = apiMap[i];
            break;
        }
    }
    if (browserApi) {
        for (var _i = 0; _i < browserApi.length; _i++) {
            FullscreenApi[specApi[_i]] = browserApi[_i];
        }
    }

    function MediaError(value) {
        if (value instanceof MediaError) {
            return value;
        }
        if (typeof value === 'number') {
            this.code = value;
        } else if (typeof value === 'string') {
            this.message = value;
        } else if (isObject(value)) {
            if (typeof value.code === 'number') {
                this.code = value.code;
            }
            assign(this, value);
        }
        if (!this.message) {
            this.message = MediaError.defaultMessages[this.code] || '';
        }
    }
    MediaError.prototype.code = 0;
    MediaError.prototype.message = '';
    MediaError.prototype.status = null;
    MediaError.errorTypes = ['MEDIA_ERR_CUSTOM', 'MEDIA_ERR_ABORTED', 'MEDIA_ERR_NETWORK', 'MEDIA_ERR_DECODE', 'MEDIA_ERR_SRC_NOT_SUPPORTED', 'MEDIA_ERR_ENCRYPTED'];
    MediaError.defaultMessages = {
        1: 'You aborted the media playback',
        2: 'A network error caused the media download to fail part-way.',
        3: 'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.',
        4: 'The media could not be loaded, either because the server or network failed or because the format is not supported.',
        5: 'The media is encrypted and we do not have the keys to decrypt it.'
    };
    for (var errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
        MediaError[MediaError.errorTypes[errNum]] = errNum;
        MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
    }
    var tuple = SafeParseTuple;

    function SafeParseTuple(obj, reviver) {
        var json;
        var error = null;
        try {
            json = JSON.parse(obj, reviver);
        } catch (err) {
            error = err;
        }
        return [error, json]
    }

    function isPromise(value) {
        return value !== undefined && typeof value.then === 'function';
    }

    function silencePromise(value) {
        if (isPromise(value)) {
            value.then(null, function(e) {});
        }
    }
    var trackToJson_ = function trackToJson_(track) {
        var ret = ['kind', 'label', 'language', 'id', 'inBandMetadataTrackDispatchType', 'mode', 'src'].reduce(function(acc, prop, i) {
            if (track[prop]) {
                acc[prop] = track[prop];
            }
            return acc;
        }, {
            cues: track.cues && Array.prototype.map.call(track.cues, function(cue) {
                return {
                    startTime: cue.startTime,
                    endTime: cue.endTime,
                    text: cue.text,
                    id: cue.id
                };
            })
        });
        return ret;
    };
    var textTracksToJson = function textTracksToJson(tech) {
        var trackEls = tech.$$('track');
        var trackObjs = Array.prototype.map.call(trackEls, function(t) {
            return t.track;
        });
        var tracks = Array.prototype.map.call(trackEls, function(trackEl) {
            var json = trackToJson_(trackEl.track);
            if (trackEl.src) {
                json.src = trackEl.src;
            }
            return json;
        });
        return tracks.concat(Array.prototype.filter.call(tech.textTracks(), function(track) {
            return trackObjs.indexOf(track) === -1;
        }).map(trackToJson_));
    };
    var jsonToTextTracks = function jsonToTextTracks(json, tech) {
        json.forEach(function(track) {
            var addedTrack = tech.addRemoteTextTrack(track).track;
            if (!track.src && track.cues) {
                track.cues.forEach(function(cue) {
                    return addedTrack.addCue(cue);
                });
            }
        });
        return tech.textTracks();
    };
    var textTrackConverter = {
        textTracksToJson: textTracksToJson,
        jsonToTextTracks: jsonToTextTracks,
        trackToJson_: trackToJson_
    };
    var MODAL_CLASS_NAME = 'vjs-modal-dialog';
    var ESC = 27;
    var ModalDialog = function(_Component) {
        inherits(ModalDialog, _Component);

        function ModalDialog(player, options) {
            classCallCheck(this, ModalDialog);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.opened_ = _this.hasBeenOpened_ = _this.hasBeenFilled_ = false;
            _this.closeable(!_this.options_.uncloseable);
            _this.content(_this.options_.content);
            _this.contentEl_ = createEl('div', {
                className: MODAL_CLASS_NAME + '-content'
            }, {
                role: 'document'
            });
            _this.descEl_ = createEl('p', {
                className: MODAL_CLASS_NAME + '-description vjs-control-text',
                id: _this.el().getAttribute('aria-describedby')
            });
            textContent(_this.descEl_, _this.description());
            _this.el_.appendChild(_this.descEl_);
            _this.el_.appendChild(_this.contentEl_);
            return _this;
        }
        ModalDialog.prototype.createEl = function createEl$$1() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: this.buildCSSClass(),
                tabIndex: -1
            }, {
                'aria-describedby': this.id() + '_description',
                'aria-hidden': 'true',
                'aria-label': this.label(),
                'role': 'dialog'
            });
        };
        ModalDialog.prototype.dispose = function dispose() {
            this.contentEl_ = null;
            this.descEl_ = null;
            this.previouslyActiveEl_ = null;
            _Component.prototype.dispose.call(this);
        };
        ModalDialog.prototype.buildCSSClass = function buildCSSClass() {
            return MODAL_CLASS_NAME + ' vjs-hidden ' + _Component.prototype.buildCSSClass.call(this);
        };
        ModalDialog.prototype.handleKeyPress = function handleKeyPress(e) {
            if (e.which === ESC && this.closeable()) {
                this.close();
            }
        };
        ModalDialog.prototype.label = function label() {
            return this.localize(this.options_.label || 'Modal Window');
        };
        ModalDialog.prototype.description = function description() {
            var desc = this.options_.description || this.localize('This is a modal window.');
            if (this.closeable()) {
                desc += ' ' + this.localize('This modal can be closed by pressing the Escape key or activating the close button.');
            }
            return desc;
        };
        ModalDialog.prototype.open = function open() {
            if (!this.opened_) {
                var player = this.player();
                this.trigger('beforemodalopen');
                this.opened_ = true;
                if (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) {
                    this.fill();
                }
                this.wasPlaying_ = !player.paused();
                if (this.options_.pauseOnOpen && this.wasPlaying_) {
                    player.pause();
                }
                if (this.closeable()) {
                    this.on(this.el_.ownerDocument, 'keydown', bind(this, this.handleKeyPress));
                }
                this.hadControls_ = player.controls();
                player.controls(false);
                this.show();
                this.conditionalFocus_();
                this.el().setAttribute('aria-hidden', 'false');
                this.trigger('modalopen');
                this.hasBeenOpened_ = true;
            }
        };
        ModalDialog.prototype.opened = function opened(value) {
            if (typeof value === 'boolean') {
                this[value ? 'open' : 'close']();
            }
            return this.opened_;
        };
        ModalDialog.prototype.close = function close() {
            if (!this.opened_) {
                return;
            }
            var player = this.player();
            this.trigger('beforemodalclose');
            this.opened_ = false;
            if (this.wasPlaying_ && this.options_.pauseOnOpen) {
                player.play();
            }
            if (this.closeable()) {
                this.off(this.el_.ownerDocument, 'keydown', bind(this, this.handleKeyPress));
            }
            if (this.hadControls_) {
                player.controls(true);
            }
            this.hide();
            this.el().setAttribute('aria-hidden', 'true');
            this.trigger('modalclose');
            this.conditionalBlur_();
            if (this.options_.temporary) {
                this.dispose();
            }
        };
        ModalDialog.prototype.closeable = function closeable(value) {
            if (typeof value === 'boolean') {
                var closeable = this.closeable_ = !!value;
                var close = this.getChild('closeButton');
                if (closeable && !close) {
                    var temp = this.contentEl_;
                    this.contentEl_ = this.el_;
                    close = this.addChild('closeButton', {
                        controlText: 'Close Modal Dialog'
                    });
                    this.contentEl_ = temp;
                    this.on(close, 'close', this.close);
                }
                if (!closeable && close) {
                    this.off(close, 'close', this.close);
                    this.removeChild(close);
                    close.dispose();
                }
            }
            return this.closeable_;
        };
        ModalDialog.prototype.fill = function fill() {
            this.fillWith(this.content());
        };
        ModalDialog.prototype.fillWith = function fillWith(content) {
            var contentEl = this.contentEl();
            var parentEl = contentEl.parentNode;
            var nextSiblingEl = contentEl.nextSibling;
            this.trigger('beforemodalfill');
            this.hasBeenFilled_ = true;
            parentEl.removeChild(contentEl);
            this.empty();
            insertContent(contentEl, content);
            this.trigger('modalfill');
            if (nextSiblingEl) {
                parentEl.insertBefore(contentEl, nextSiblingEl);
            } else {
                parentEl.appendChild(contentEl);
            }
            var closeButton = this.getChild('closeButton');
            if (closeButton) {
                parentEl.appendChild(closeButton.el_);
            }
        };
        ModalDialog.prototype.empty = function empty() {
            this.trigger('beforemodalempty');
            emptyEl(this.contentEl());
            this.trigger('modalempty');
        };
        ModalDialog.prototype.content = function content(value) {
            if (typeof value !== 'undefined') {
                this.content_ = value;
            }
            return this.content_;
        };
        ModalDialog.prototype.conditionalFocus_ = function conditionalFocus_() {
            var activeEl = document_1.activeElement;
            var playerEl = this.player_.el_;
            this.previouslyActiveEl_ = null;
            if (playerEl.contains(activeEl) || playerEl === activeEl) {
                this.previouslyActiveEl_ = activeEl;
                this.focus();
                this.on(document_1, 'keydown', this.handleKeyDown);
            }
        };
        ModalDialog.prototype.conditionalBlur_ = function conditionalBlur_() {
            if (this.previouslyActiveEl_) {
                this.previouslyActiveEl_.focus();
                this.previouslyActiveEl_ = null;
            }
            this.off(document_1, 'keydown', this.handleKeyDown);
        };
        ModalDialog.prototype.handleKeyDown = function handleKeyDown(event) {
            if (event.which !== 9) {
                return;
            }
            var focusableEls = this.focusableEls_();
            var activeEl = this.el_.querySelector(':focus');
            var focusIndex = void 0;
            for (var i = 0; i < focusableEls.length; i++) {
                if (activeEl === focusableEls[i]) {
                    focusIndex = i;
                    break;
                }
            }
            if (document_1.activeElement === this.el_) {
                focusIndex = 0;
            }
            if (event.shiftKey && focusIndex === 0) {
                focusableEls[focusableEls.length - 1].focus();
                event.preventDefault();
            } else if (!event.shiftKey && focusIndex === focusableEls.length - 1) {
                focusableEls[0].focus();
                event.preventDefault();
            }
        };
        ModalDialog.prototype.focusableEls_ = function focusableEls_() {
            var allChildren = this.el_.querySelectorAll('*');
            return Array.prototype.filter.call(allChildren, function(child) {
                return (child instanceof window_1.HTMLAnchorElement || child instanceof window_1.HTMLAreaElement) && child.hasAttribute('href') || (child instanceof window_1.HTMLInputElement || child instanceof window_1.HTMLSelectElement || child instanceof window_1.HTMLTextAreaElement || child instanceof window_1.HTMLButtonElement) && !child.hasAttribute('disabled') || child instanceof window_1.HTMLIFrameElement || child instanceof window_1.HTMLObjectElement || child instanceof window_1.HTMLEmbedElement || child.hasAttribute('tabindex') && child.getAttribute('tabindex') !== -1 || child.hasAttribute('contenteditable');
            });
        };
        return ModalDialog;
    }(Component);
    ModalDialog.prototype.options_ = {
        pauseOnOpen: true,
        temporary: true
    };
    Component.registerComponent('ModalDialog', ModalDialog);
    var TrackList = function(_EventTarget) {
        inherits(TrackList, _EventTarget);

        function TrackList() {
            var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var _ret;
            var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            classCallCheck(this, TrackList);
            var _this = possibleConstructorReturn(this, _EventTarget.call(this));
            if (!list) {
                list = _this;
                if (IS_IE8) {
                    list = document_1.createElement('custom');
                    for (var prop in TrackList.prototype) {
                        if (prop !== 'constructor') {
                            list[prop] = TrackList.prototype[prop];
                        }
                    }
                }
            }
            list.tracks_ = [];
            Object.defineProperty(list, 'length', {
                get: function get$$1() {
                    return this.tracks_.length;
                }
            });
            for (var i = 0; i < tracks.length; i++) {
                list.addTrack(tracks[i]);
            }
            return _ret = list, possibleConstructorReturn(_this, _ret);
        }
        TrackList.prototype.addTrack = function addTrack(track) {
            var index = this.tracks_.length;
            if (!('' + index in this)) {
                Object.defineProperty(this, index, {
                    get: function get$$1() {
                        return this.tracks_[index];
                    }
                });
            }
            if (this.tracks_.indexOf(track) === -1) {
                this.tracks_.push(track);
                this.trigger({
                    track: track,
                    type: 'addtrack'
                });
            }
        };
        TrackList.prototype.removeTrack = function removeTrack(rtrack) {
            var track = void 0;
            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i] === rtrack) {
                    track = this[i];
                    if (track.off) {
                        track.off();
                    }
                    this.tracks_.splice(i, 1);
                    break;
                }
            }
            if (!track) {
                return;
            }
            this.trigger({
                track: track,
                type: 'removetrack'
            });
        };
        TrackList.prototype.getTrackById = function getTrackById(id) {
            var result = null;
            for (var i = 0, l = this.length; i < l; i++) {
                var track = this[i];
                if (track.id === id) {
                    result = track;
                    break;
                }
            }
            return result;
        };
        return TrackList;
    }(EventTarget);
    TrackList.prototype.allowedEvents_ = {
        change: 'change',
        addtrack: 'addtrack',
        removetrack: 'removetrack'
    };
    for (var event in TrackList.prototype.allowedEvents_) {
        TrackList.prototype['on' + event] = null;
    }
    var disableOthers = function disableOthers(list, track) {
        for (var i = 0; i < list.length; i++) {
            if (!Object.keys(list[i]).length || track.id === list[i].id) {
                continue;
            }
            list[i].enabled = false;
        }
    };
    var AudioTrackList = function(_TrackList) {
        inherits(AudioTrackList, _TrackList);

        function AudioTrackList() {
            var _this, _ret;
            var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            classCallCheck(this, AudioTrackList);
            var list = void 0;
            for (var i = tracks.length - 1; i >= 0; i--) {
                if (tracks[i].enabled) {
                    disableOthers(tracks, tracks[i]);
                    break;
                }
            }
            if (IS_IE8) {
                list = document_1.createElement('custom');
                for (var prop in TrackList.prototype) {
                    if (prop !== 'constructor') {
                        list[prop] = TrackList.prototype[prop];
                    }
                }
                for (var _prop in AudioTrackList.prototype) {
                    if (_prop !== 'constructor') {
                        list[_prop] = AudioTrackList.prototype[_prop];
                    }
                }
            }
            list = (_this = possibleConstructorReturn(this, _TrackList.call(this, tracks, list)), _this);
            list.changing_ = false;
            return _ret = list, possibleConstructorReturn(_this, _ret);
        }
        AudioTrackList.prototype.addTrack = function addTrack(track) {
            var _this2 = this;
            if (track.enabled) {
                disableOthers(this, track);
            }
            _TrackList.prototype.addTrack.call(this, track);
            if (!track.addEventListener) {
                return;
            }
            track.addEventListener('enabledchange', function() {
                if (_this2.changing_) {
                    return;
                }
                _this2.changing_ = true;
                disableOthers(_this2, track);
                _this2.changing_ = false;
                _this2.trigger('change');
            });
        };
        return AudioTrackList;
    }(TrackList);
    var disableOthers$1 = function disableOthers(list, track) {
        for (var i = 0; i < list.length; i++) {
            if (!Object.keys(list[i]).length || track.id === list[i].id) {
                continue;
            }
            list[i].selected = false;
        }
    };
    var VideoTrackList = function(_TrackList) {
        inherits(VideoTrackList, _TrackList);

        function VideoTrackList() {
            var _this, _ret;
            var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            classCallCheck(this, VideoTrackList);
            var list = void 0;
            for (var i = tracks.length - 1; i >= 0; i--) {
                if (tracks[i].selected) {
                    disableOthers$1(tracks, tracks[i]);
                    break;
                }
            }
            if (IS_IE8) {
                list = document_1.createElement('custom');
                for (var prop in TrackList.prototype) {
                    if (prop !== 'constructor') {
                        list[prop] = TrackList.prototype[prop];
                    }
                }
                for (var _prop in VideoTrackList.prototype) {
                    if (_prop !== 'constructor') {
                        list[_prop] = VideoTrackList.prototype[_prop];
                    }
                }
            }
            list = (_this = possibleConstructorReturn(this, _TrackList.call(this, tracks, list)), _this);
            list.changing_ = false;
            Object.defineProperty(list, 'selectedIndex', {
                get: function get$$1() {
                    for (var _i = 0; _i < this.length; _i++) {
                        if (this[_i].selected) {
                            return _i;
                        }
                    }
                    return -1;
                },
                set: function set$$1() {}
            });
            return _ret = list, possibleConstructorReturn(_this, _ret);
        }
        VideoTrackList.prototype.addTrack = function addTrack(track) {
            var _this2 = this;
            if (track.selected) {
                disableOthers$1(this, track);
            }
            _TrackList.prototype.addTrack.call(this, track);
            if (!track.addEventListener) {
                return;
            }
            track.addEventListener('selectedchange', function() {
                if (_this2.changing_) {
                    return;
                }
                _this2.changing_ = true;
                disableOthers$1(_this2, track);
                _this2.changing_ = false;
                _this2.trigger('change');
            });
        };
        return VideoTrackList;
    }(TrackList);
    var TextTrackList = function(_TrackList) {
        inherits(TextTrackList, _TrackList);

        function TextTrackList() {
            var _this, _ret;
            var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            classCallCheck(this, TextTrackList);
            var list = void 0;
            if (IS_IE8) {
                list = document_1.createElement('custom');
                for (var prop in TrackList.prototype) {
                    if (prop !== 'constructor') {
                        list[prop] = TrackList.prototype[prop];
                    }
                }
                for (var _prop in TextTrackList.prototype) {
                    if (_prop !== 'constructor') {
                        list[_prop] = TextTrackList.prototype[_prop];
                    }
                }
            }
            list = (_this = possibleConstructorReturn(this, _TrackList.call(this, tracks, list)), _this);
            return _ret = list, possibleConstructorReturn(_this, _ret);
        }
        TextTrackList.prototype.addTrack = function addTrack(track) {
            _TrackList.prototype.addTrack.call(this, track);
            track.addEventListener('modechange', bind(this, function() {
                this.trigger('change');
            }));
            var nonLanguageTextTrackKind = ['metadata', 'chapters'];
            if (nonLanguageTextTrackKind.indexOf(track.kind) === -1) {
                track.addEventListener('modechange', bind(this, function() {
                    this.trigger('selectedlanguagechange');
                }));
            }
        };
        return TextTrackList;
    }(TrackList);
    var HtmlTrackElementList = function() {
        function HtmlTrackElementList() {
            var trackElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            classCallCheck(this, HtmlTrackElementList);
            var list = this;
            if (IS_IE8) {
                list = document_1.createElement('custom');
                for (var prop in HtmlTrackElementList.prototype) {
                    if (prop !== 'constructor') {
                        list[prop] = HtmlTrackElementList.prototype[prop];
                    }
                }
            }
            list.trackElements_ = [];
            Object.defineProperty(list, 'length', {
                get: function get$$1() {
                    return this.trackElements_.length;
                }
            });
            for (var i = 0, length = trackElements.length; i < length; i++) {
                list.addTrackElement_(trackElements[i]);
            }
            if (IS_IE8) {
                return list;
            }
        }
        HtmlTrackElementList.prototype.addTrackElement_ = function addTrackElement_(trackElement) {
            var index = this.trackElements_.length;
            if (!('' + index in this)) {
                Object.defineProperty(this, index, {
                    get: function get$$1() {
                        return this.trackElements_[index];
                    }
                });
            }
            if (this.trackElements_.indexOf(trackElement) === -1) {
                this.trackElements_.push(trackElement);
            }
        };
        HtmlTrackElementList.prototype.getTrackElementByTrack_ = function getTrackElementByTrack_(track) {
            var trackElement_ = void 0;
            for (var i = 0, length = this.trackElements_.length; i < length; i++) {
                if (track === this.trackElements_[i].track) {
                    trackElement_ = this.trackElements_[i];
                    break;
                }
            }
            return trackElement_;
        };
        HtmlTrackElementList.prototype.removeTrackElement_ = function removeTrackElement_(trackElement) {
            for (var i = 0, length = this.trackElements_.length; i < length; i++) {
                if (trackElement === this.trackElements_[i]) {
                    this.trackElements_.splice(i, 1);
                    break;
                }
            }
        };
        return HtmlTrackElementList;
    }();
    var TextTrackCueList = function() {
        function TextTrackCueList(cues) {
            classCallCheck(this, TextTrackCueList);
            var list = this;
            if (IS_IE8) {
                list = document_1.createElement('custom');
                for (var prop in TextTrackCueList.prototype) {
                    if (prop !== 'constructor') {
                        list[prop] = TextTrackCueList.prototype[prop];
                    }
                }
            }
            TextTrackCueList.prototype.setCues_.call(list, cues);
            Object.defineProperty(list, 'length', {
                get: function get$$1() {
                    return this.length_;
                }
            });
            if (IS_IE8) {
                return list;
            }
        }
        TextTrackCueList.prototype.setCues_ = function setCues_(cues) {
            var oldLength = this.length || 0;
            var i = 0;
            var l = cues.length;
            this.cues_ = cues;
            this.length_ = cues.length;
            var defineProp = function defineProp(index) {
                if (!('' + index in this)) {
                    Object.defineProperty(this, '' + index, {
                        get: function get$$1() {
                            return this.cues_[index];
                        }
                    });
                }
            };
            if (oldLength < l) {
                i = oldLength;
                for (; i < l; i++) {
                    defineProp.call(this, i);
                }
            }
        };
        TextTrackCueList.prototype.getCueById = function getCueById(id) {
            var result = null;
            for (var i = 0, l = this.length; i < l; i++) {
                var cue = this[i];
                if (cue.id === id) {
                    result = cue;
                    break;
                }
            }
            return result;
        };
        return TextTrackCueList;
    }();
    var VideoTrackKind = {
        alternative: 'alternative',
        captions: 'captions',
        main: 'main',
        sign: 'sign',
        subtitles: 'subtitles',
        commentary: 'commentary'
    };
    var AudioTrackKind = {
        'alternative': 'alternative',
        'descriptions': 'descriptions',
        'main': 'main',
        'main-desc': 'main-desc',
        'translation': 'translation',
        'commentary': 'commentary'
    };
    var TextTrackKind = {
        subtitles: 'subtitles',
        captions: 'captions',
        descriptions: 'descriptions',
        chapters: 'chapters',
        metadata: 'metadata'
    };
    var TextTrackMode = {
        disabled: 'disabled',
        hidden: 'hidden',
        showing: 'showing'
    };
    var Track = function(_EventTarget) {
        inherits(Track, _EventTarget);

        function Track() {
            var _ret;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            classCallCheck(this, Track);
            var _this = possibleConstructorReturn(this, _EventTarget.call(this));
            var track = _this;
            if (IS_IE8) {
                track = document_1.createElement('custom');
                for (var prop in Track.prototype) {
                    if (prop !== 'constructor') {
                        track[prop] = Track.prototype[prop];
                    }
                }
            }
            var trackProps = {
                id: options.id || 'vjs_track_' + newGUID(),
                kind: options.kind || '',
                label: options.label || '',
                language: options.language || ''
            };
            var _loop = function _loop(key) {
                Object.defineProperty(track, key, {
                    get: function get$$1() {
                        return trackProps[key];
                    },
                    set: function set$$1() {}
                });
            };
            for (var key in trackProps) {
                _loop(key);
            }
            return _ret = track, possibleConstructorReturn(_this, _ret);
        }
        return Track;
    }(EventTarget);
    var parseUrl = function parseUrl(url) {
        var props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];
        var a = document_1.createElement('a');
        a.href = url;
        var addToBody = a.host === '' && a.protocol !== 'file:';
        var div = void 0;
        if (addToBody) {
            div = document_1.createElement('div');
            div.innerHTML = '<a href="' + url + '"></a>';
            a = div.firstChild;
            div.setAttribute('style', 'display:none; position:absolute;');
            document_1.body.appendChild(div);
        }
        var details = {};
        for (var i = 0; i < props.length; i++) {
            details[props[i]] = a[props[i]];
        }
        if (details.protocol === 'http:') {
            details.host = details.host.replace(/:80$/, '');
        }
        if (details.protocol === 'https:') {
            details.host = details.host.replace(/:443$/, '');
        }
        if (!details.protocol) {
            details.protocol = window_1.location.protocol;
        }
        if (addToBody) {
            document_1.body.removeChild(div);
        }
        return details;
    };
    var getAbsoluteURL = function getAbsoluteURL(url) {
        if (!url.match(/^https?:\/\//)) {
            var div = document_1.createElement('div');
            div.innerHTML = '<a href="' + url + '">x</a>';
            url = div.firstChild.href;
        }
        return url;
    };
    var getFileExtension = function getFileExtension(path) {
        if (typeof path === 'string') {
            var splitPathRe = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i;
            var pathParts = splitPathRe.exec(path);
            if (pathParts) {
                return pathParts.pop().toLowerCase();
            }
        }
        return '';
    };
    var isCrossOrigin = function isCrossOrigin(url) {
        var winLoc = window_1.location;
        var urlInfo = parseUrl(url);
        var srcProtocol = urlInfo.protocol === ':' ? winLoc.protocol : urlInfo.protocol;
        var crossOrigin = srcProtocol + urlInfo.host !== winLoc.protocol + winLoc.host;
        return crossOrigin;
    };
    var Url = (Object.freeze || Object)({
        parseUrl: parseUrl,
        getAbsoluteURL: getAbsoluteURL,
        getFileExtension: getFileExtension,
        isCrossOrigin: isCrossOrigin
    });
    var isFunction_1 = isFunction;
    var toString$1 = Object.prototype.toString;

    function isFunction(fn) {
        var string = toString$1.call(fn);
        return string === '[object Function]' || (typeof fn === 'function' && string !== '[object RegExp]') || (typeof window !== 'undefined' && (fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt))
    }
    var trim_1 = createCommonjsModule(function(module, exports) {
        exports = module.exports = trim;

        function trim(str) {
            return str.replace(/^\s*|\s*$/g, '');
        }
        exports.left = function(str) {
            return str.replace(/^\s*/, '');
        };
        exports.right = function(str) {
            return str.replace(/\s*$/, '');
        };
    });
    var forEach_1 = forEach;
    var toString$2 = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function forEach(list, iterator, context) {
        if (!isFunction_1(iterator)) {
            throw new TypeError('iterator must be a function')
        }
        if (arguments.length < 3) {
            context = this;
        }
        if (toString$2.call(list) === '[object Array]')
            forEachArray$1(list, iterator, context);
        else if (typeof list === 'string')
            forEachString(list, iterator, context);
        else
            forEachObject(list, iterator, context);
    }

    function forEachArray$1(array, iterator, context) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (hasOwnProperty.call(array, i)) {
                iterator.call(context, array[i], i, array);
            }
        }
    }

    function forEachString(string, iterator, context) {
        for (var i = 0, len = string.length; i < len; i++) {
            iterator.call(context, string.charAt(i), i, string);
        }
    }

    function forEachObject(object, iterator, context) {
        for (var k in object) {
            if (hasOwnProperty.call(object, k)) {
                iterator.call(context, object[k], k, object);
            }
        }
    }
    var isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
    var parseHeaders = function(headers) {
        if (!headers)
            return {}
        var result = {};
        forEach_1(trim_1(headers).split('\n'), function(row) {
            var index = row.indexOf(':'),
                key = trim_1(row.slice(0, index)).toLowerCase(),
                value = trim_1(row.slice(index + 1));
            if (typeof(result[key]) === 'undefined') {
                result[key] = value;
            } else if (isArray(result[key])) {
                result[key].push(value);
            } else {
                result[key] = [result[key], value];
            }
        });
        return result
    };
    var immutable = extend;
    var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

    function extend() {
        var target = {};
        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (hasOwnProperty$1.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target
    }
    var xhr = createXHR;
    createXHR.XMLHttpRequest = window_1.XMLHttpRequest || noop;
    createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window_1.XDomainRequest;
    forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
        createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
            options = initParams(uri, options, callback);
            options.method = method.toUpperCase();
            return _createXHR(options)
        };
    });

    function forEachArray(array, iterator) {
        for (var i = 0; i < array.length; i++) {
            iterator(array[i]);
        }
    }

    function isEmpty(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) return false
        }
        return true
    }

    function initParams(uri, options, callback) {
        var params = uri;
        if (isFunction_1(options)) {
            callback = options;
            if (typeof uri === "string") {
                params = {
                    uri: uri
                };
            }
        } else {
            params = immutable(options, {
                uri: uri
            });
        }
        params.callback = callback;
        return params
    }

    function createXHR(uri, options, callback) {
        options = initParams(uri, options, callback);
        return _createXHR(options)
    }

    function _createXHR(options) {
        if (typeof options.callback === "undefined") {
            throw new Error("callback argument missing")
        }
        var called = false;
        var callback = function cbOnce(err, response, body) {
            if (!called) {
                called = true;
                options.callback(err, response, body);
            }
        };

        function readystatechange() {
            if (xhr.readyState === 4) {
                setTimeout(loadFunc, 0);
            }
        }

        function getBody() {
            var body = undefined;
            if (xhr.response) {
                body = xhr.response;
            } else {
                body = xhr.responseText || getXml(xhr);
            }
            if (isJson) {
                try {
                    body = JSON.parse(body);
                } catch (e) {}
            }
            return body
        }

        function errorFunc(evt) {
            clearTimeout(timeoutTimer);
            if (!(evt instanceof Error)) {
                evt = new Error("" + (evt || "Unknown XMLHttpRequest Error"));
            }
            evt.statusCode = 0;
            return callback(evt, failureResponse)
        }

        function loadFunc() {
            if (aborted) return
            var status;
            clearTimeout(timeoutTimer);
            if (options.useXDR && xhr.status === undefined) {
                status = 200;
            } else {
                status = (xhr.status === 1223 ? 204 : xhr.status);
            }
            var response = failureResponse;
            var err = null;
            if (status !== 0) {
                response = {
                    body: getBody(),
                    statusCode: status,
                    method: method,
                    headers: {},
                    url: uri,
                    rawRequest: xhr
                };
                if (xhr.getAllResponseHeaders) {
                    response.headers = parseHeaders(xhr.getAllResponseHeaders());
                }
            } else {
                err = new Error("Internal XMLHttpRequest Error");
            }
            return callback(err, response, response.body)
        }
        var xhr = options.xhr || null;
        if (!xhr) {
            if (options.cors || options.useXDR) {
                xhr = new createXHR.XDomainRequest();
            } else {
                xhr = new createXHR.XMLHttpRequest();
            }
        }
        var key;
        var aborted;
        var uri = xhr.url = options.uri || options.url;
        var method = xhr.method = options.method || "GET";
        var body = options.body || options.data;
        var headers = xhr.headers = options.headers || {};
        var sync = !!options.sync;
        var isJson = false;
        var timeoutTimer;
        var failureResponse = {
            body: undefined,
            headers: {},
            statusCode: 0,
            method: method,
            url: uri,
            rawRequest: xhr
        };
        if ("json" in options && options.json !== false) {
            isJson = true;
            headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json");
            if (method !== "GET" && method !== "HEAD") {
                headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json");
                body = JSON.stringify(options.json === true ? body : options.json);
            }
        }
        xhr.onreadystatechange = readystatechange;
        xhr.onload = loadFunc;
        xhr.onerror = errorFunc;
        xhr.onprogress = function() {};
        xhr.onabort = function() {
            aborted = true;
        };
        xhr.ontimeout = errorFunc;
        xhr.open(method, uri, !sync, options.username, options.password);
        if (!sync) {
            xhr.withCredentials = !!options.withCredentials;
        }
        if (!sync && options.timeout > 0) {
            timeoutTimer = setTimeout(function() {
                if (aborted) return
                aborted = true;
                xhr.abort("timeout");
                var e = new Error("XMLHttpRequest timeout");
                e.code = "ETIMEDOUT";
                errorFunc(e);
            }, options.timeout);
        }
        if (xhr.setRequestHeader) {
            for (key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        } else if (options.headers && !isEmpty(options.headers)) {
            throw new Error("Headers cannot be set on an XDomainRequest object")
        }
        if ("responseType" in options) {
            xhr.responseType = options.responseType;
        }
        if ("beforeSend" in options && typeof options.beforeSend === "function") {
            options.beforeSend(xhr);
        }
        xhr.send(body || null);
        return xhr
    }

    function getXml(xhr) {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror";
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
        return null
    }

    function noop() {}
    var parseCues = function parseCues(srcContent, track) {
        var parser = new window_1.WebVTT.Parser(window_1, window_1.vttjs, window_1.WebVTT.StringDecoder());
        var errors = [];
        parser.oncue = function(cue) {
            track.addCue(cue);
        };
        parser.onparsingerror = function(error) {
            errors.push(error);
        };
        parser.onflush = function() {
            track.trigger({
                type: 'loadeddata',
                target: track
            });
        };
        parser.parse(srcContent);
        if (errors.length > 0) {
            if (window_1.console && window_1.console.groupCollapsed) {
                window_1.console.groupCollapsed('Text Track parsing errors for ' + track.src);
            }
            errors.forEach(function(error) {
                return log$1.error(error);
            });
            if (window_1.console && window_1.console.groupEnd) {
                window_1.console.groupEnd();
            }
        }
        parser.flush();
    };
    var loadTrack = function loadTrack(src, track) {
        var opts = {
            uri: src
        };
        var crossOrigin = isCrossOrigin(src);
        if (crossOrigin) {
            opts.cors = crossOrigin;
        }
        xhr(opts, bind(this, function(err, response, responseBody) {
            if (err) {
                return log$1.error(err, response);
            }
            track.loaded_ = true;
            if (typeof window_1.WebVTT !== 'function') {
                if (track.tech_) {
                    var loadHandler = function loadHandler() {
                        return parseCues(responseBody, track);
                    };
                    track.tech_.on('vttjsloaded', loadHandler);
                    track.tech_.on('vttjserror', function() {
                        log$1.error('vttjs failed to load, stopping trying to process ' + track.src);
                        track.tech_.off('vttjsloaded', loadHandler);
                    });
                }
            } else {
                parseCues(responseBody, track);
            }
        }));
    };
    var TextTrack = function(_Track) {
        inherits(TextTrack, _Track);

        function TextTrack() {
            var _this, _ret;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            classCallCheck(this, TextTrack);
            if (!options.tech) {
                throw new Error('A tech was not provided.');
            }
            var settings = mergeOptions(options, {
                kind: TextTrackKind[options.kind] || 'subtitles',
                language: options.language || options.srclang || ''
            });
            var mode = TextTrackMode[settings.mode] || 'disabled';
            var default_ = settings['default'];
            if (settings.kind === 'metadata' || settings.kind === 'chapters') {
                mode = 'hidden';
            }
            var tt = (_this = possibleConstructorReturn(this, _Track.call(this, settings)), _this);
            tt.tech_ = settings.tech;
            if (IS_IE8) {
                for (var prop in TextTrack.prototype) {
                    if (prop !== 'constructor') {
                        tt[prop] = TextTrack.prototype[prop];
                    }
                }
            }
            tt.cues_ = [];
            tt.activeCues_ = [];
            var cues = new TextTrackCueList(tt.cues_);
            var activeCues = new TextTrackCueList(tt.activeCues_);
            var changed = false;
            var timeupdateHandler = bind(tt, function() {
                this.activeCues;
                if (changed) {
                    this.trigger('cuechange');
                    changed = false;
                }
            });
            if (mode !== 'disabled') {
                tt.tech_.ready(function() {
                    tt.tech_.on('timeupdate', timeupdateHandler);
                }, true);
            }
            Object.defineProperty(tt, 'default', {
                get: function get$$1() {
                    return default_;
                },
                set: function set$$1() {}
            });
            Object.defineProperty(tt, 'mode', {
                get: function get$$1() {
                    return mode;
                },
                set: function set$$1(newMode) {
                    var _this2 = this;
                    if (!TextTrackMode[newMode]) {
                        return;
                    }
                    mode = newMode;
                    if (mode === 'showing') {
                        this.tech_.ready(function() {
                            _this2.tech_.on('timeupdate', timeupdateHandler);
                        }, true);
                    }
                    this.trigger('modechange');
                }
            });
            Object.defineProperty(tt, 'cues', {
                get: function get$$1() {
                    if (!this.loaded_) {
                        return null;
                    }
                    return cues;
                },
                set: function set$$1() {}
            });
            Object.defineProperty(tt, 'activeCues', {
                get: function get$$1() {
                    if (!this.loaded_) {
                        return null;
                    }
                    if (this.cues.length === 0) {
                        return activeCues;
                    }
                    var ct = this.tech_.currentTime();
                    var active = [];
                    for (var i = 0, l = this.cues.length; i < l; i++) {
                        var cue = this.cues[i];
                        if (cue.startTime <= ct && cue.endTime >= ct) {
                            active.push(cue);
                        } else if (cue.startTime === cue.endTime && cue.startTime <= ct && cue.startTime + 0.5 >= ct) {
                            active.push(cue);
                        }
                    }
                    changed = false;
                    if (active.length !== this.activeCues_.length) {
                        changed = true;
                    } else {
                        for (var _i = 0; _i < active.length; _i++) {
                            if (this.activeCues_.indexOf(active[_i]) === -1) {
                                changed = true;
                            }
                        }
                    }
                    this.activeCues_ = active;
                    activeCues.setCues_(this.activeCues_);
                    return activeCues;
                },
                set: function set$$1() {}
            });
            if (settings.src) {
                tt.src = settings.src;
                loadTrack(settings.src, tt);
            } else {
                tt.loaded_ = true;
            }
            return _ret = tt, possibleConstructorReturn(_this, _ret);
        }
        TextTrack.prototype.addCue = function addCue(originalCue) {
            var cue = originalCue;
            if (window_1.vttjs && !(originalCue instanceof window_1.vttjs.VTTCue)) {
                cue = new window_1.vttjs.VTTCue(originalCue.startTime, originalCue.endTime, originalCue.text);
                for (var prop in originalCue) {
                    if (!(prop in cue)) {
                        cue[prop] = originalCue[prop];
                    }
                }
                cue.id = originalCue.id;
                cue.originalCue_ = originalCue;
            }
            var tracks = this.tech_.textTracks();
            for (var i = 0; i < tracks.length; i++) {
                if (tracks[i] !== this) {
                    tracks[i].removeCue(cue);
                }
            }
            this.cues_.push(cue);
            this.cues.setCues_(this.cues_);
        };
        TextTrack.prototype.removeCue = function removeCue(_removeCue) {
            var i = this.cues_.length;
            while (i--) {
                var cue = this.cues_[i];
                if (cue === _removeCue || cue.originalCue_ && cue.originalCue_ === _removeCue) {
                    this.cues_.splice(i, 1);
                    this.cues.setCues_(this.cues_);
                    break;
                }
            }
        };
        return TextTrack;
    }(Track);
    TextTrack.prototype.allowedEvents_ = {
        cuechange: 'cuechange'
    };
    var AudioTrack = function(_Track) {
        inherits(AudioTrack, _Track);

        function AudioTrack() {
            var _this, _ret;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            classCallCheck(this, AudioTrack);
            var settings = mergeOptions(options, {
                kind: AudioTrackKind[options.kind] || ''
            });
            var track = (_this = possibleConstructorReturn(this, _Track.call(this, settings)), _this);
            var enabled = false;
            if (IS_IE8) {
                for (var prop in AudioTrack.prototype) {
                    if (prop !== 'constructor') {
                        track[prop] = AudioTrack.prototype[prop];
                    }
                }
            }
            Object.defineProperty(track, 'enabled', {
                get: function get$$1() {
                    return enabled;
                },
                set: function set$$1(newEnabled) {
                    if (typeof newEnabled !== 'boolean' || newEnabled === enabled) {
                        return;
                    }
                    enabled = newEnabled;
                    this.trigger('enabledchange');
                }
            });
            if (settings.enabled) {
                track.enabled = settings.enabled;
            }
            track.loaded_ = true;
            return _ret = track, possibleConstructorReturn(_this, _ret);
        }
        return AudioTrack;
    }(Track);
    var VideoTrack = function(_Track) {
        inherits(VideoTrack, _Track);

        function VideoTrack() {
            var _this, _ret;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            classCallCheck(this, VideoTrack);
            var settings = mergeOptions(options, {
                kind: VideoTrackKind[options.kind] || ''
            });
            var track = (_this = possibleConstructorReturn(this, _Track.call(this, settings)), _this);
            var selected = false;
            if (IS_IE8) {
                for (var prop in VideoTrack.prototype) {
                    if (prop !== 'constructor') {
                        track[prop] = VideoTrack.prototype[prop];
                    }
                }
            }
            Object.defineProperty(track, 'selected', {
                get: function get$$1() {
                    return selected;
                },
                set: function set$$1(newSelected) {
                    if (typeof newSelected !== 'boolean' || newSelected === selected) {
                        return;
                    }
                    selected = newSelected;
                    this.trigger('selectedchange');
                }
            });
            if (settings.selected) {
                track.selected = settings.selected;
            }
            return _ret = track, possibleConstructorReturn(_this, _ret);
        }
        return VideoTrack;
    }(Track);
    var NONE = 0;
    var LOADING = 1;
    var LOADED = 2;
    var ERROR = 3;
    var HTMLTrackElement = function(_EventTarget) {
        inherits(HTMLTrackElement, _EventTarget);

        function HTMLTrackElement() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            classCallCheck(this, HTMLTrackElement);
            var _this = possibleConstructorReturn(this, _EventTarget.call(this));
            var readyState = void 0;
            var trackElement = _this;
            if (IS_IE8) {
                trackElement = document_1.createElement('custom');
                for (var prop in HTMLTrackElement.prototype) {
                    if (prop !== 'constructor') {
                        trackElement[prop] = HTMLTrackElement.prototype[prop];
                    }
                }
            }
            var track = new TextTrack(options);
            trackElement.kind = track.kind;
            trackElement.src = track.src;
            trackElement.srclang = track.language;
            trackElement.label = track.label;
            trackElement['default'] = track['default'];
            Object.defineProperty(trackElement, 'readyState', {
                get: function get$$1() {
                    return readyState;
                }
            });
            Object.defineProperty(trackElement, 'track', {
                get: function get$$1() {
                    return track;
                }
            });
            readyState = NONE;
            track.addEventListener('loadeddata', function() {
                readyState = LOADED;
                trackElement.trigger({
                    type: 'load',
                    target: trackElement
                });
            });
            if (IS_IE8) {
                var _ret;
                return _ret = trackElement, possibleConstructorReturn(_this, _ret);
            }
            return _this;
        }
        return HTMLTrackElement;
    }(EventTarget);
    HTMLTrackElement.prototype.allowedEvents_ = {
        load: 'load'
    };
    HTMLTrackElement.NONE = NONE;
    HTMLTrackElement.LOADING = LOADING;
    HTMLTrackElement.LOADED = LOADED;
    HTMLTrackElement.ERROR = ERROR;
    var NORMAL = {
        audio: {
            ListClass: AudioTrackList,
            TrackClass: AudioTrack,
            capitalName: 'Audio'
        },
        video: {
            ListClass: VideoTrackList,
            TrackClass: VideoTrack,
            capitalName: 'Video'
        },
        text: {
            ListClass: TextTrackList,
            TrackClass: TextTrack,
            capitalName: 'Text'
        }
    };
    Object.keys(NORMAL).forEach(function(type) {
        NORMAL[type].getterName = type + 'Tracks';
        NORMAL[type].privateName = type + 'Tracks_';
    });
    var REMOTE = {
        remoteText: {
            ListClass: TextTrackList,
            TrackClass: TextTrack,
            capitalName: 'RemoteText',
            getterName: 'remoteTextTracks',
            privateName: 'remoteTextTracks_'
        },
        remoteTextEl: {
            ListClass: HtmlTrackElementList,
            TrackClass: HTMLTrackElement,
            capitalName: 'RemoteTextTrackEls',
            getterName: 'remoteTextTrackEls',
            privateName: 'remoteTextTrackEls_'
        }
    };
    var ALL = mergeOptions(NORMAL, REMOTE);
    REMOTE.names = Object.keys(REMOTE);
    NORMAL.names = Object.keys(NORMAL);
    ALL.names = [].concat(REMOTE.names).concat(NORMAL.names);
    var _objCreate = Object.create || (function() {
        function F() {}
        return function(o) {
            if (arguments.length !== 1) {
                throw new Error('Object.create shim only accepts one parameter.');
            }
            F.prototype = o;
            return new F();
        };
    })();

    function ParsingError(errorData, message) {
        this.name = "ParsingError";
        this.code = errorData.code;
        this.message = message || errorData.message;
    }
    ParsingError.prototype = _objCreate(Error.prototype);
    ParsingError.prototype.constructor = ParsingError;
    ParsingError.Errors = {
        BadSignature: {
            code: 0,
            message: "Malformed WebVTT signature."
        },
        BadTimeStamp: {
            code: 1,
            message: "Malformed time stamp."
        }
    };

    function parseTimeStamp(input) {
        function computeSeconds(h, m, s, f) {
            return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
        }
        var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
        if (!m) {
            return null;
        }
        if (m[3]) {
            return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
        } else if (m[1] > 59) {
            return computeSeconds(m[1], m[2], 0, m[4]);
        } else {
            return computeSeconds(0, m[1], m[2], m[4]);
        }
    }

    function Settings() {
        this.values = _objCreate(null);
    }
    Settings.prototype = {
        set: function(k, v) {
            if (!this.get(k) && v !== "") {
                this.values[k] = v;
            }
        },
        get: function(k, dflt, defaultKey) {
            if (defaultKey) {
                return this.has(k) ? this.values[k] : dflt[defaultKey];
            }
            return this.has(k) ? this.values[k] : dflt;
        },
        has: function(k) {
            return k in this.values;
        },
        alt: function(k, v, a) {
            for (var n = 0; n < a.length; ++n) {
                if (v === a[n]) {
                    this.set(k, v);
                    break;
                }
            }
        },
        integer: function(k, v) {
            if (/^-?\d+$/.test(v)) {
                this.set(k, parseInt(v, 10));
            }
        },
        percent: function(k, v) {
            var m;
            if ((m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/))) {
                v = parseFloat(v);
                if (v >= 0 && v <= 100) {
                    this.set(k, v);
                    return true;
                }
            }
            return false;
        }
    };

    function parseOptions(input, callback, keyValueDelim, groupDelim) {
        var groups = groupDelim ? input.split(groupDelim) : [input];
        for (var i in groups) {
            if (typeof groups[i] !== "string") {
                continue;
            }
            var kv = groups[i].split(keyValueDelim);
            if (kv.length !== 2) {
                continue;
            }
            var k = kv[0];
            var v = kv[1];
            callback(k, v);
        }
    }

    function parseCue(input, cue, regionList) {
        var oInput = input;

        function consumeTimeStamp() {
            var ts = parseTimeStamp(input);
            if (ts === null) {
                throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed timestamp: " + oInput);
            }
            input = input.replace(/^[^\sa-zA-Z-]+/, "");
            return ts;
        }

        function consumeCueSettings(input, cue) {
            var settings = new Settings();
            parseOptions(input, function(k, v) {
                switch (k) {
                    case "region":
                        for (var i = regionList.length - 1; i >= 0; i--) {
                            if (regionList[i].id === v) {
                                settings.set(k, regionList[i].region);
                                break;
                            }
                        }
                        break;
                    case "vertical":
                        settings.alt(k, v, ["rl", "lr"]);
                        break;
                    case "line":
                        var vals = v.split(","),
                            vals0 = vals[0];
                        settings.integer(k, vals0);
                        settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
                        settings.alt(k, vals0, ["auto"]);
                        if (vals.length === 2) {
                            settings.alt("lineAlign", vals[1], ["start", "middle", "end"]);
                        }
                        break;
                    case "position":
                        vals = v.split(",");
                        settings.percent(k, vals[0]);
                        if (vals.length === 2) {
                            settings.alt("positionAlign", vals[1], ["start", "middle", "end"]);
                        }
                        break;
                    case "size":
                        settings.percent(k, v);
                        break;
                    case "align":
                        settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
                        break;
                }
            }, /:/, /\s/);
            cue.region = settings.get("region", null);
            cue.vertical = settings.get("vertical", "");
            cue.line = settings.get("line", "auto");
            cue.lineAlign = settings.get("lineAlign", "start");
            cue.snapToLines = settings.get("snapToLines", true);
            cue.size = settings.get("size", 100);
            cue.align = settings.get("align", "middle");
            cue.position = settings.get("position", {
                start: 0,
                left: 0,
                middle: 50,
                end: 100,
                right: 100
            }, cue.align);
            cue.positionAlign = settings.get("positionAlign", {
                start: "start",
                left: "start",
                middle: "middle",
                end: "end",
                right: "end"
            }, cue.align);
        }

        function skipWhitespace() {
            input = input.replace(/^\s+/, "");
        }
        skipWhitespace();
        cue.startTime = consumeTimeStamp();
        skipWhitespace();
        if (input.substr(0, 3) !== "-->") {
            throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " +
                oInput);
        }
        input = input.substr(3);
        skipWhitespace();
        cue.endTime = consumeTimeStamp();
        skipWhitespace();
        consumeCueSettings(input, cue);
    }
    var ESCAPE = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&lrm;": "\u200e",
        "&rlm;": "\u200f",
        "&nbsp;": "\u00a0"
    };
    var TAG_NAME = {
        c: "span",
        i: "i",
        b: "b",
        u: "u",
        ruby: "ruby",
        rt: "rt",
        v: "span",
        lang: "span"
    };
    var TAG_ANNOTATION = {
        v: "title",
        lang: "lang"
    };
    var NEEDS_PARENT = {
        rt: "ruby"
    };

    function parseContent(window, input) {
        function nextToken() {
            if (!input) {
                return null;
            }

            function consume(result) {
                input = input.substr(result.length);
                return result;
            }
            var m = input.match(/^([^<]*)(<[^>]+>?)?/);
            return consume(m[1] ? m[1] : m[2]);
        }

        function unescape1(e) {
            return ESCAPE[e];
        }

        function unescape(s) {
            while ((m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/))) {
                s = s.replace(m[0], unescape1);
            }
            return s;
        }

        function shouldAdd(current, element) {
            return !NEEDS_PARENT[element.localName] || NEEDS_PARENT[element.localName] === current.localName;
        }

        function createElement(type, annotation) {
            var tagName = TAG_NAME[type];
            if (!tagName) {
                return null;
            }
            var element = window.document.createElement(tagName);
            element.localName = tagName;
            var name = TAG_ANNOTATION[type];
            if (name && annotation) {
                element[name] = annotation.trim();
            }
            return element;
        }
        var rootDiv = window.document.createElement("div"),
            current = rootDiv,
            t, tagStack = [];
        while ((t = nextToken()) !== null) {
            if (t[0] === '<') {
                if (t[1] === "/") {
                    if (tagStack.length && tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
                        tagStack.pop();
                        current = current.parentNode;
                    }
                    continue;
                }
                var ts = parseTimeStamp(t.substr(1, t.length - 2));
                var node;
                if (ts) {
                    node = window.document.createProcessingInstruction("timestamp", ts);
                    current.appendChild(node);
                    continue;
                }
                var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                if (!m) {
                    continue;
                }
                node = createElement(m[1], m[3]);
                if (!node) {
                    continue;
                }
                if (!shouldAdd(current, node)) {
                    continue;
                }
                if (m[2]) {
                    node.className = m[2].substr(1).replace('.', ' ');
                }
                tagStack.push(m[1]);
                current.appendChild(node);
                current = node;
                continue;
            }
            current.appendChild(window.document.createTextNode(unescape(t)));
        }
        return rootDiv;
    }
    var strongRTLRanges = [
        [0x5be, 0x5be],
        [0x5c0, 0x5c0],
        [0x5c3, 0x5c3],
        [0x5c6, 0x5c6],
        [0x5d0, 0x5ea],
        [0x5f0, 0x5f4],
        [0x608, 0x608],
        [0x60b, 0x60b],
        [0x60d, 0x60d],
        [0x61b, 0x61b],
        [0x61e, 0x64a],
        [0x66d, 0x66f],
        [0x671, 0x6d5],
        [0x6e5, 0x6e6],
        [0x6ee, 0x6ef],
        [0x6fa, 0x70d],
        [0x70f, 0x710],
        [0x712, 0x72f],
        [0x74d, 0x7a5],
        [0x7b1, 0x7b1],
        [0x7c0, 0x7ea],
        [0x7f4, 0x7f5],
        [0x7fa, 0x7fa],
        [0x800, 0x815],
        [0x81a, 0x81a],
        [0x824, 0x824],
        [0x828, 0x828],
        [0x830, 0x83e],
        [0x840, 0x858],
        [0x85e, 0x85e],
        [0x8a0, 0x8a0],
        [0x8a2, 0x8ac],
        [0x200f, 0x200f],
        [0xfb1d, 0xfb1d],
        [0xfb1f, 0xfb28],
        [0xfb2a, 0xfb36],
        [0xfb38, 0xfb3c],
        [0xfb3e, 0xfb3e],
        [0xfb40, 0xfb41],
        [0xfb43, 0xfb44],
        [0xfb46, 0xfbc1],
        [0xfbd3, 0xfd3d],
        [0xfd50, 0xfd8f],
        [0xfd92, 0xfdc7],
        [0xfdf0, 0xfdfc],
        [0xfe70, 0xfe74],
        [0xfe76, 0xfefc],
        [0x10800, 0x10805],
        [0x10808, 0x10808],
        [0x1080a, 0x10835],
        [0x10837, 0x10838],
        [0x1083c, 0x1083c],
        [0x1083f, 0x10855],
        [0x10857, 0x1085f],
        [0x10900, 0x1091b],
        [0x10920, 0x10939],
        [0x1093f, 0x1093f],
        [0x10980, 0x109b7],
        [0x109be, 0x109bf],
        [0x10a00, 0x10a00],
        [0x10a10, 0x10a13],
        [0x10a15, 0x10a17],
        [0x10a19, 0x10a33],
        [0x10a40, 0x10a47],
        [0x10a50, 0x10a58],
        [0x10a60, 0x10a7f],
        [0x10b00, 0x10b35],
        [0x10b40, 0x10b55],
        [0x10b58, 0x10b72],
        [0x10b78, 0x10b7f],
        [0x10c00, 0x10c48],
        [0x1ee00, 0x1ee03],
        [0x1ee05, 0x1ee1f],
        [0x1ee21, 0x1ee22],
        [0x1ee24, 0x1ee24],
        [0x1ee27, 0x1ee27],
        [0x1ee29, 0x1ee32],
        [0x1ee34, 0x1ee37],
        [0x1ee39, 0x1ee39],
        [0x1ee3b, 0x1ee3b],
        [0x1ee42, 0x1ee42],
        [0x1ee47, 0x1ee47],
        [0x1ee49, 0x1ee49],
        [0x1ee4b, 0x1ee4b],
        [0x1ee4d, 0x1ee4f],
        [0x1ee51, 0x1ee52],
        [0x1ee54, 0x1ee54],
        [0x1ee57, 0x1ee57],
        [0x1ee59, 0x1ee59],
        [0x1ee5b, 0x1ee5b],
        [0x1ee5d, 0x1ee5d],
        [0x1ee5f, 0x1ee5f],
        [0x1ee61, 0x1ee62],
        [0x1ee64, 0x1ee64],
        [0x1ee67, 0x1ee6a],
        [0x1ee6c, 0x1ee72],
        [0x1ee74, 0x1ee77],
        [0x1ee79, 0x1ee7c],
        [0x1ee7e, 0x1ee7e],
        [0x1ee80, 0x1ee89],
        [0x1ee8b, 0x1ee9b],
        [0x1eea1, 0x1eea3],
        [0x1eea5, 0x1eea9],
        [0x1eeab, 0x1eebb],
        [0x10fffd, 0x10fffd]
    ];

    function isStrongRTLChar(charCode) {
        for (var i = 0; i < strongRTLRanges.length; i++) {
            var currentRange = strongRTLRanges[i];
            if (charCode >= currentRange[0] && charCode <= currentRange[1]) {
                return true;
            }
        }
        return false;
    }

    function determineBidi(cueDiv) {
        var nodeStack = [],
            text = "",
            charCode;
        if (!cueDiv || !cueDiv.childNodes) {
            return "ltr";
        }

        function pushNodes(nodeStack, node) {
            for (var i = node.childNodes.length - 1; i >= 0; i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }

        function nextTextNode(nodeStack) {
            if (!nodeStack || !nodeStack.length) {
                return null;
            }
            var node = nodeStack.pop(),
                text = node.textContent || node.innerText;
            if (text) {
                var m = text.match(/^.*(\n|\r)/);
                if (m) {
                    nodeStack.length = 0;
                    return m[0];
                }
                return text;
            }
            if (node.tagName === "ruby") {
                return nextTextNode(nodeStack);
            }
            if (node.childNodes) {
                pushNodes(nodeStack, node);
                return nextTextNode(nodeStack);
            }
        }
        pushNodes(nodeStack, cueDiv);
        while ((text = nextTextNode(nodeStack))) {
            for (var i = 0; i < text.length; i++) {
                charCode = text.charCodeAt(i);
                if (isStrongRTLChar(charCode)) {
                    return "rtl";
                }
            }
        }
        return "ltr";
    }

    function computeLinePos(cue) {
        if (typeof cue.line === "number" && (cue.snapToLines || (cue.line >= 0 && cue.line <= 100))) {
            return cue.line;
        }
        if (!cue.track || !cue.track.textTrackList || !cue.track.textTrackList.mediaElement) {
            return -1;
        }
        var track = cue.track,
            trackList = track.textTrackList,
            count = 0;
        for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
            if (trackList[i].mode === "showing") {
                count++;
            }
        }
        return ++count * -1;
    }

    function StyleBox() {}
    StyleBox.prototype.applyStyles = function(styles, div) {
        div = div || this.div;
        for (var prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                div.style[prop] = styles[prop];
            }
        }
    };
    StyleBox.prototype.formatStyle = function(val, unit) {
        return val === 0 ? 0 : val + unit;
    };

    function CueStyleBox(window, cue, styleOptions) {
        var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
        var color = "rgba(255, 255, 255, 1)";
        var backgroundColor = "rgba(0, 0, 0, 0.8)";
        if (isIE8) {
            color = "rgb(255, 255, 255)";
            backgroundColor = "rgb(0, 0, 0)";
        }
        StyleBox.call(this);
        this.cue = cue;
        this.cueDiv = parseContent(window, cue.text);
        var styles = {
            color: color,
            backgroundColor: backgroundColor,
            position: "relative",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "inline"
        };
        if (!isIE8) {
            styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl";
            styles.unicodeBidi = "plaintext";
        }
        this.applyStyles(styles, this.cueDiv);
        this.div = window.document.createElement("div");
        styles = {
            textAlign: cue.align === "middle" ? "center" : cue.align,
            font: styleOptions.font,
            whiteSpace: "pre-line",
            position: "absolute"
        };
        if (!isIE8) {
            styles.direction = determineBidi(this.cueDiv);
            styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext";
        }
        this.applyStyles(styles);
        this.div.appendChild(this.cueDiv);
        var textPos = 0;
        switch (cue.positionAlign) {
            case "start":
                textPos = cue.position;
                break;
            case "middle":
                textPos = cue.position - (cue.size / 2);
                break;
            case "end":
                textPos = cue.position - cue.size;
                break;
        }
        if (cue.vertical === "") {
            this.applyStyles({
                left: this.formatStyle(textPos, "%"),
                width: this.formatStyle(cue.size, "%")
            });
        } else {
            this.applyStyles({
                top: this.formatStyle(textPos, "%"),
                height: this.formatStyle(cue.size, "%")
            });
        }
        this.move = function(box) {
            this.applyStyles({
                top: this.formatStyle(box.top, "px"),
                bottom: this.formatStyle(box.bottom, "px"),
                left: this.formatStyle(box.left, "px"),
                right: this.formatStyle(box.right, "px"),
                height: this.formatStyle(box.height, "px"),
                width: this.formatStyle(box.width, "px")
            });
        };
    }
    CueStyleBox.prototype = _objCreate(StyleBox.prototype);
    CueStyleBox.prototype.constructor = CueStyleBox;

    function BoxPosition(obj) {
        var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
        var lh, height, width, top;
        if (obj.div) {
            height = obj.div.offsetHeight;
            width = obj.div.offsetWidth;
            top = obj.div.offsetTop;
            var rects = (rects = obj.div.childNodes) && (rects = rects[0]) && rects.getClientRects && rects.getClientRects();
            obj = obj.div.getBoundingClientRect();
            lh = rects ? Math.max((rects[0] && rects[0].height) || 0, obj.height / rects.length) : 0;
        }
        this.left = obj.left;
        this.right = obj.right;
        this.top = obj.top || top;
        this.height = obj.height || height;
        this.bottom = obj.bottom || (top + (obj.height || height));
        this.width = obj.width || width;
        this.lineHeight = lh !== undefined ? lh : obj.lineHeight;
        if (isIE8 && !this.lineHeight) {
            this.lineHeight = 13;
        }
    }
    BoxPosition.prototype.move = function(axis, toMove) {
        toMove = toMove !== undefined ? toMove : this.lineHeight;
        switch (axis) {
            case "+x":
                this.left += toMove;
                this.right += toMove;
                break;
            case "-x":
                this.left -= toMove;
                this.right -= toMove;
                break;
            case "+y":
                this.top += toMove;
                this.bottom += toMove;
                break;
            case "-y":
                this.top -= toMove;
                this.bottom -= toMove;
                break;
        }
    };
    BoxPosition.prototype.overlaps = function(b2) {
        return this.left < b2.right && this.right > b2.left && this.top < b2.bottom && this.bottom > b2.top;
    };
    BoxPosition.prototype.overlapsAny = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (this.overlaps(boxes[i])) {
                return true;
            }
        }
        return false;
    };
    BoxPosition.prototype.within = function(container) {
        return this.top >= container.top && this.bottom <= container.bottom && this.left >= container.left && this.right <= container.right;
    };
    BoxPosition.prototype.overlapsOppositeAxis = function(container, axis) {
        switch (axis) {
            case "+x":
                return this.left < container.left;
            case "-x":
                return this.right > container.right;
            case "+y":
                return this.top < container.top;
            case "-y":
                return this.bottom > container.bottom;
        }
    };
    BoxPosition.prototype.intersectPercentage = function(b2) {
        var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)),
            y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)),
            intersectArea = x * y;
        return intersectArea / (this.height * this.width);
    };
    BoxPosition.prototype.toCSSCompatValues = function(reference) {
        return {
            top: this.top - reference.top,
            bottom: reference.bottom - this.bottom,
            left: this.left - reference.left,
            right: reference.right - this.right,
            height: this.height,
            width: this.width
        };
    };
    BoxPosition.getSimpleBoxPosition = function(obj) {
        var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
        var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
        var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;
        obj = obj.div ? obj.div.getBoundingClientRect() : obj.tagName ? obj.getBoundingClientRect() : obj;
        var ret = {
            left: obj.left,
            right: obj.right,
            top: obj.top || top,
            height: obj.height || height,
            bottom: obj.bottom || (top + (obj.height || height)),
            width: obj.width || width
        };
        return ret;
    };

    function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {
        function findBestPosition(b, axis) {
            var bestPosition, specifiedPosition = new BoxPosition(b),
                percentage = 1;
            for (var i = 0; i < axis.length; i++) {
                while (b.overlapsOppositeAxis(containerBox, axis[i]) || (b.within(containerBox) && b.overlapsAny(boxPositions))) {
                    b.move(axis[i]);
                }
                if (b.within(containerBox)) {
                    return b;
                }
                var p = b.intersectPercentage(containerBox);
                if (percentage > p) {
                    bestPosition = new BoxPosition(b);
                    percentage = p;
                }
                b = new BoxPosition(specifiedPosition);
            }
            return bestPosition || specifiedPosition;
        }
        var boxPosition = new BoxPosition(styleBox),
            cue = styleBox.cue,
            linePos = computeLinePos(cue),
            axis = [];
        if (cue.snapToLines) {
            var size;
            switch (cue.vertical) {
                case "":
                    axis = ["+y", "-y"];
                    size = "height";
                    break;
                case "rl":
                    axis = ["+x", "-x"];
                    size = "width";
                    break;
                case "lr":
                    axis = ["-x", "+x"];
                    size = "width";
                    break;
            }
            var step = boxPosition.lineHeight,
                position = step * Math.round(linePos),
                maxPosition = containerBox[size] + step,
                initialAxis = axis[0];
            if (Math.abs(position) > maxPosition) {
                position = position < 0 ? -1 : 1;
                position *= Math.ceil(maxPosition / step) * step;
            }
            if (linePos < 0) {
                position += cue.vertical === "" ? containerBox.height : containerBox.width;
                axis = axis.reverse();
            }
            boxPosition.move(initialAxis, position);
        } else {
            var calculatedPercentage = (boxPosition.lineHeight / containerBox.height) * 100;
            switch (cue.lineAlign) {
                case "middle":
                    linePos -= (calculatedPercentage / 2);
                    break;
                case "end":
                    linePos -= calculatedPercentage;
                    break;
            }
            switch (cue.vertical) {
                case "":
                    styleBox.applyStyles({
                        top: styleBox.formatStyle(linePos, "%")
                    });
                    break;
                case "rl":
                    styleBox.applyStyles({
                        left: styleBox.formatStyle(linePos, "%")
                    });
                    break;
                case "lr":
                    styleBox.applyStyles({
                        right: styleBox.formatStyle(linePos, "%")
                    });
                    break;
            }
            axis = ["+y", "-x", "+x", "-y"];
            boxPosition = new BoxPosition(styleBox);
        }
        var bestPosition = findBestPosition(boxPosition, axis);
        styleBox.move(bestPosition.toCSSCompatValues(containerBox));
    }

    function WebVTT$1() {}
    WebVTT$1.StringDecoder = function() {
        return {
            decode: function(data) {
                if (!data) {
                    return "";
                }
                if (typeof data !== "string") {
                    throw new Error("Error - expected string data.");
                }
                return decodeURIComponent(encodeURIComponent(data));
            }
        };
    };
    WebVTT$1.convertCueToDOMTree = function(window, cuetext) {
        if (!window || !cuetext) {
            return null;
        }
        return parseContent(window, cuetext);
    };
    var FONT_SIZE_PERCENT = 0.05;
    var FONT_STYLE = "sans-serif";
    var CUE_BACKGROUND_PADDING = "1.5%";
    WebVTT$1.processCues = function(window, cues, overlay) {
        if (!window || !cues || !overlay) {
            return null;
        }
        while (overlay.firstChild) {
            overlay.removeChild(overlay.firstChild);
        }
        var paddedOverlay = window.document.createElement("div");
        paddedOverlay.style.position = "absolute";
        paddedOverlay.style.left = "0";
        paddedOverlay.style.right = "0";
        paddedOverlay.style.top = "0";
        paddedOverlay.style.bottom = "0";
        paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
        overlay.appendChild(paddedOverlay);

        function shouldCompute(cues) {
            for (var i = 0; i < cues.length; i++) {
                if (cues[i].hasBeenReset || !cues[i].displayState) {
                    return true;
                }
            }
            return false;
        }
        if (!shouldCompute(cues)) {
            for (var i = 0; i < cues.length; i++) {
                paddedOverlay.appendChild(cues[i].displayState);
            }
            return;
        }
        var boxPositions = [],
            containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay),
            fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
        var styleOptions = {
            font: fontSize + "px " + FONT_STYLE
        };
        (function() {
            var styleBox, cue;
            for (var i = 0; i < cues.length; i++) {
                cue = cues[i];
                styleBox = new CueStyleBox(window, cue, styleOptions);
                paddedOverlay.appendChild(styleBox.div);
                moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);
                cue.displayState = styleBox.div;
                boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
            }
        })();
    };
    WebVTT$1.Parser = function(window, vttjs, decoder) {
        if (!decoder) {
            decoder = vttjs;
            vttjs = {};
        }
        if (!vttjs) {
            vttjs = {};
        }
        this.window = window;
        this.vttjs = vttjs;
        this.state = "INITIAL";
        this.buffer = "";
        this.decoder = decoder || new TextDecoder("utf8");
        this.regionList = [];
    };
    WebVTT$1.Parser.prototype = {
        reportOrThrowError: function(e) {
            if (e instanceof ParsingError) {
                this.onparsingerror && this.onparsingerror(e);
            } else {
                throw e;
            }
        },
        parse: function(data) {
            var self = this;
            if (data) {
                self.buffer += self.decoder.decode(data, {
                    stream: true
                });
            }

            function collectNextLine() {
                var buffer = self.buffer;
                var pos = 0;
                while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
                    ++pos;
                }
                var line = buffer.substr(0, pos);
                if (buffer[pos] === '\r') {
                    ++pos;
                }
                if (buffer[pos] === '\n') {
                    ++pos;
                }
                self.buffer = buffer.substr(pos);
                return line;
            }

            function parseRegion(input) {
                var settings = new Settings();
                parseOptions(input, function(k, v) {
                    switch (k) {
                        case "id":
                            settings.set(k, v);
                            break;
                        case "width":
                            settings.percent(k, v);
                            break;
                        case "lines":
                            settings.integer(k, v);
                            break;
                        case "regionanchor":
                        case "viewportanchor":
                            var xy = v.split(',');
                            if (xy.length !== 2) {
                                break;
                            }
                            var anchor = new Settings();
                            anchor.percent("x", xy[0]);
                            anchor.percent("y", xy[1]);
                            if (!anchor.has("x") || !anchor.has("y")) {
                                break;
                            }
                            settings.set(k + "X", anchor.get("x"));
                            settings.set(k + "Y", anchor.get("y"));
                            break;
                        case "scroll":
                            settings.alt(k, v, ["up"]);
                            break;
                    }
                }, /=/, /\s/);
                if (settings.has("id")) {
                    var region = new(self.vttjs.VTTRegion || self.window.VTTRegion)();
                    region.width = settings.get("width", 100);
                    region.lines = settings.get("lines", 3);
                    region.regionAnchorX = settings.get("regionanchorX", 0);
                    region.regionAnchorY = settings.get("regionanchorY", 100);
                    region.viewportAnchorX = settings.get("viewportanchorX", 0);
                    region.viewportAnchorY = settings.get("viewportanchorY", 100);
                    region.scroll = settings.get("scroll", "");
                    self.onregion && self.onregion(region);
                    self.regionList.push({
                        id: settings.get("id"),
                        region: region
                    });
                }
            }

            function parseTimestampMap(input) {
                var settings = new Settings();
                parseOptions(input, function(k, v) {
                    switch (k) {
                        case "MPEGT":
                            settings.integer(k + 'S', v);
                            break;
                        case "LOCA":
                            settings.set(k + 'L', parseTimeStamp(v));
                            break;
                    }
                }, /[^\d]:/, /,/);
                self.ontimestampmap && self.ontimestampmap({
                    "MPEGTS": settings.get("MPEGTS"),
                    "LOCAL": settings.get("LOCAL")
                });
            }

            function parseHeader(input) {
                if (input.match(/X-TIMESTAMP-MAP/)) {
                    parseOptions(input, function(k, v) {
                        switch (k) {
                            case "X-TIMESTAMP-MAP":
                                parseTimestampMap(v);
                                break;
                        }
                    }, /=/);
                } else {
                    parseOptions(input, function(k, v) {
                        switch (k) {
                            case "Region":
                                parseRegion(v);
                                break;
                        }
                    }, /:/);
                }
            }
            try {
                var line;
                if (self.state === "INITIAL") {
                    if (!/\r\n|\n/.test(self.buffer)) {
                        return this;
                    }
                    line = collectNextLine();
                    var m = line.match(/^WEBVTT([ \t].*)?$/);
                    if (!m || !m[0]) {
                        throw new ParsingError(ParsingError.Errors.BadSignature);
                    }
                    self.state = "HEADER";
                }
                var alreadyCollectedLine = false;
                while (self.buffer) {
                    if (!/\r\n|\n/.test(self.buffer)) {
                        return this;
                    }
                    if (!alreadyCollectedLine) {
                        line = collectNextLine();
                    } else {
                        alreadyCollectedLine = false;
                    }
                    switch (self.state) {
                        case "HEADER":
                            if (/:/.test(line)) {
                                parseHeader(line);
                            } else if (!line) {
                                self.state = "ID";
                            }
                            continue;
                        case "NOTE":
                            if (!line) {
                                self.state = "ID";
                            }
                            continue;
                        case "ID":
                            if (/^NOTE($|[ \t])/.test(line)) {
                                self.state = "NOTE";
                                break;
                            }
                            if (!line) {
                                continue;
                            }
                            self.cue = new(self.vttjs.VTTCue || self.window.VTTCue)(0, 0, "");
                            self.state = "CUE";
                            if (line.indexOf("-->") === -1) {
                                self.cue.id = line;
                                continue;
                            }
                        case "CUE":
                            try {
                                parseCue(line, self.cue, self.regionList);
                            } catch (e) {
                                self.reportOrThrowError(e);
                                self.cue = null;
                                self.state = "BADCUE";
                                continue;
                            }
                            self.state = "CUETEXT";
                            continue;
                        case "CUETEXT":
                            var hasSubstring = line.indexOf("-->") !== -1;
                            if (!line || hasSubstring && (alreadyCollectedLine = true)) {
                                self.oncue && self.oncue(self.cue);
                                self.cue = null;
                                self.state = "ID";
                                continue;
                            }
                            if (self.cue.text) {
                                self.cue.text += "\n";
                            }
                            self.cue.text += line;
                            continue;
                        case "BADCUE":
                            if (!line) {
                                self.state = "ID";
                            }
                            continue;
                    }
                }
            } catch (e) {
                self.reportOrThrowError(e);
                if (self.state === "CUETEXT" && self.cue && self.oncue) {
                    self.oncue(self.cue);
                }
                self.cue = null;
                self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
            }
            return this;
        },
        flush: function() {
            var self = this;
            try {
                self.buffer += self.decoder.decode();
                if (self.cue || self.state === "HEADER") {
                    self.buffer += "\n\n";
                    self.parse();
                }
                if (self.state === "INITIAL") {
                    throw new ParsingError(ParsingError.Errors.BadSignature);
                }
            } catch (e) {
                self.reportOrThrowError(e);
            }
            self.onflush && self.onflush();
            return this;
        }
    };
    var vtt$1 = WebVTT$1;
    var autoKeyword = "auto";
    var directionSetting = {
        "": true,
        "lr": true,
        "rl": true
    };
    var alignSetting = {
        "start": true,
        "middle": true,
        "end": true,
        "left": true,
        "right": true
    };

    function findDirectionSetting(value) {
        if (typeof value !== "string") {
            return false;
        }
        var dir = directionSetting[value.toLowerCase()];
        return dir ? value.toLowerCase() : false;
    }

    function findAlignSetting(value) {
        if (typeof value !== "string") {
            return false;
        }
        var align = alignSetting[value.toLowerCase()];
        return align ? value.toLowerCase() : false;
    }

    function extend$1(obj) {
        var i = 1;
        for (; i < arguments.length; i++) {
            var cobj = arguments[i];
            for (var p in cobj) {
                obj[p] = cobj[p];
            }
        }
        return obj;
    }

    function VTTCue(startTime, endTime, text) {
        var cue = this;
        var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
        var baseObj = {};
        if (isIE8) {
            cue = document.createElement('custom');
        } else {
            baseObj.enumerable = true;
        }
        cue.hasBeenReset = false;
        var _id = "";
        var _pauseOnExit = false;
        var _startTime = startTime;
        var _endTime = endTime;
        var _text = text;
        var _region = null;
        var _vertical = "";
        var _snapToLines = true;
        var _line = "auto";
        var _lineAlign = "start";
        var _position = 50;
        var _positionAlign = "middle";
        var _size = 50;
        var _align = "middle";
        Object.defineProperty(cue, "id", extend$1({}, baseObj, {
            get: function() {
                return _id;
            },
            set: function(value) {
                _id = "" + value;
            }
        }));
        Object.defineProperty(cue, "pauseOnExit", extend$1({}, baseObj, {
            get: function() {
                return _pauseOnExit;
            },
            set: function(value) {
                _pauseOnExit = !!value;
            }
        }));
        Object.defineProperty(cue, "startTime", extend$1({}, baseObj, {
            get: function() {
                return _startTime;
            },
            set: function(value) {
                if (typeof value !== "number") {
                    throw new TypeError("Start time must be set to a number.");
                }
                _startTime = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "endTime", extend$1({}, baseObj, {
            get: function() {
                return _endTime;
            },
            set: function(value) {
                if (typeof value !== "number") {
                    throw new TypeError("End time must be set to a number.");
                }
                _endTime = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "text", extend$1({}, baseObj, {
            get: function() {
                return _text;
            },
            set: function(value) {
                _text = "" + value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "region", extend$1({}, baseObj, {
            get: function() {
                return _region;
            },
            set: function(value) {
                _region = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "vertical", extend$1({}, baseObj, {
            get: function() {
                return _vertical;
            },
            set: function(value) {
                var setting = findDirectionSetting(value);
                if (setting === false) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _vertical = setting;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "snapToLines", extend$1({}, baseObj, {
            get: function() {
                return _snapToLines;
            },
            set: function(value) {
                _snapToLines = !!value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "line", extend$1({}, baseObj, {
            get: function() {
                return _line;
            },
            set: function(value) {
                if (typeof value !== "number" && value !== autoKeyword) {
                    throw new SyntaxError("An invalid number or illegal string was specified.");
                }
                _line = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "lineAlign", extend$1({}, baseObj, {
            get: function() {
                return _lineAlign;
            },
            set: function(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _lineAlign = setting;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "position", extend$1({}, baseObj, {
            get: function() {
                return _position;
            },
            set: function(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Position must be between 0 and 100.");
                }
                _position = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "positionAlign", extend$1({}, baseObj, {
            get: function() {
                return _positionAlign;
            },
            set: function(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _positionAlign = setting;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "size", extend$1({}, baseObj, {
            get: function() {
                return _size;
            },
            set: function(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Size must be between 0 and 100.");
                }
                _size = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "align", extend$1({}, baseObj, {
            get: function() {
                return _align;
            },
            set: function(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _align = setting;
                this.hasBeenReset = true;
            }
        }));
        cue.displayState = undefined;
        if (isIE8) {
            return cue;
        }
    }
    VTTCue.prototype.getCueAsHTML = function() {
        return WebVTT.convertCueToDOMTree(window, this.text);
    };
    var vttcue = VTTCue;
    var scrollSetting = {
        "": true,
        "up": true
    };

    function findScrollSetting(value) {
        if (typeof value !== "string") {
            return false;
        }
        var scroll = scrollSetting[value.toLowerCase()];
        return scroll ? value.toLowerCase() : false;
    }

    function isValidPercentValue(value) {
        return typeof value === "number" && (value >= 0 && value <= 100);
    }

    function VTTRegion() {
        var _width = 100;
        var _lines = 3;
        var _regionAnchorX = 0;
        var _regionAnchorY = 100;
        var _viewportAnchorX = 0;
        var _viewportAnchorY = 100;
        var _scroll = "";
        Object.defineProperties(this, {
            "width": {
                enumerable: true,
                get: function() {
                    return _width;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("Width must be between 0 and 100.");
                    }
                    _width = value;
                }
            },
            "lines": {
                enumerable: true,
                get: function() {
                    return _lines;
                },
                set: function(value) {
                    if (typeof value !== "number") {
                        throw new TypeError("Lines must be set to a number.");
                    }
                    _lines = value;
                }
            },
            "regionAnchorY": {
                enumerable: true,
                get: function() {
                    return _regionAnchorY;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("RegionAnchorX must be between 0 and 100.");
                    }
                    _regionAnchorY = value;
                }
            },
            "regionAnchorX": {
                enumerable: true,
                get: function() {
                    return _regionAnchorX;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("RegionAnchorY must be between 0 and 100.");
                    }
                    _regionAnchorX = value;
                }
            },
            "viewportAnchorY": {
                enumerable: true,
                get: function() {
                    return _viewportAnchorY;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("ViewportAnchorY must be between 0 and 100.");
                    }
                    _viewportAnchorY = value;
                }
            },
            "viewportAnchorX": {
                enumerable: true,
                get: function() {
                    return _viewportAnchorX;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("ViewportAnchorX must be between 0 and 100.");
                    }
                    _viewportAnchorX = value;
                }
            },
            "scroll": {
                enumerable: true,
                get: function() {
                    return _scroll;
                },
                set: function(value) {
                    var setting = findScrollSetting(value);
                    if (setting === false) {
                        throw new SyntaxError("An invalid or illegal string was specified.");
                    }
                    _scroll = setting;
                }
            }
        });
    }
    var vttregion = VTTRegion;
    var browserIndex = createCommonjsModule(function(module) {
        var vttjs = module.exports = {
            WebVTT: vtt$1,
            VTTCue: vttcue,
            VTTRegion: vttregion
        };
        window_1.vttjs = vttjs;
        window_1.WebVTT = vttjs.WebVTT;
        var cueShim = vttjs.VTTCue;
        var regionShim = vttjs.VTTRegion;
        var nativeVTTCue = window_1.VTTCue;
        var nativeVTTRegion = window_1.VTTRegion;
        vttjs.shim = function() {
            window_1.VTTCue = cueShim;
            window_1.VTTRegion = regionShim;
        };
        vttjs.restore = function() {
            window_1.VTTCue = nativeVTTCue;
            window_1.VTTRegion = nativeVTTRegion;
        };
        if (!window_1.VTTCue) {
            vttjs.shim();
        }
    });

    function createTrackHelper(self, kind, label, language) {
        var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        var tracks = self.textTracks();
        options.kind = kind;
        if (label) {
            options.label = label;
        }
        if (language) {
            options.language = language;
        }
        options.tech = self;
        var track = new ALL.text.TrackClass(options);
        tracks.addTrack(track);
        return track;
    }
    var Tech = function(_Component) {
        inherits(Tech, _Component);

        function Tech() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var ready = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function() {};
            classCallCheck(this, Tech);
            options.reportTouchActivity = false;
            var _this = possibleConstructorReturn(this, _Component.call(this, null, options, ready));
            _this.hasStarted_ = false;
            _this.on('playing', function() {
                this.hasStarted_ = true;
            });
            _this.on('loadstart', function() {
                this.hasStarted_ = false;
            });
            ALL.names.forEach(function(name) {
                var props = ALL[name];
                if (options && options[props.getterName]) {
                    _this[props.privateName] = options[props.getterName];
                }
            });
            if (!_this.featuresProgressEvents) {
                _this.manualProgressOn();
            }
            if (!_this.featuresTimeupdateEvents) {
                _this.manualTimeUpdatesOn();
            }
            ['Text', 'Audio', 'Video'].forEach(function(track) {
                if (options['native' + track + 'Tracks'] === false) {
                    _this['featuresNative' + track + 'Tracks'] = false;
                }
            });
            if (options.nativeCaptions === false || options.nativeTextTracks === false) {
                _this.featuresNativeTextTracks = false;
            } else if (options.nativeCaptions === true || options.nativeTextTracks === true) {
                _this.featuresNativeTextTracks = true;
            }
            if (!_this.featuresNativeTextTracks) {
                _this.emulateTextTracks();
            }
            _this.autoRemoteTextTracks_ = new ALL.text.ListClass();
            _this.initTrackListeners();
            if (!options.nativeControlsForTouch) {
                _this.emitTapEvents();
            }
            if (_this.constructor) {
                _this.name_ = _this.constructor.name || 'Unknown Tech';
            }
            return _this;
        }
        Tech.prototype.manualProgressOn = function manualProgressOn() {
            this.on('durationchange', this.onDurationChange);
            this.manualProgress = true;
            this.one('ready', this.trackProgress);
        };
        Tech.prototype.manualProgressOff = function manualProgressOff() {
            this.manualProgress = false;
            this.stopTrackingProgress();
            this.off('durationchange', this.onDurationChange);
        };
        Tech.prototype.trackProgress = function trackProgress(event) {
            this.stopTrackingProgress();
            this.progressInterval = this.setInterval(bind(this, function() {
                var numBufferedPercent = this.bufferedPercent();
                if (this.bufferedPercent_ !== numBufferedPercent) {
                    this.trigger('progress');
                }
                this.bufferedPercent_ = numBufferedPercent;
                if (numBufferedPercent === 1) {
                    this.stopTrackingProgress();
                }
            }), 500);
        };
        Tech.prototype.onDurationChange = function onDurationChange(event) {
            this.duration_ = this.duration();
        };
        Tech.prototype.buffered = function buffered() {
            return createTimeRanges(0, 0);
        };
        Tech.prototype.bufferedPercent = function bufferedPercent$$1() {
            return bufferedPercent(this.buffered(), this.duration_);
        };
        Tech.prototype.stopTrackingProgress = function stopTrackingProgress() {
            this.clearInterval(this.progressInterval);
        };
        Tech.prototype.manualTimeUpdatesOn = function manualTimeUpdatesOn() {
            this.manualTimeUpdates = true;
            this.on('play', this.trackCurrentTime);
            this.on('pause', this.stopTrackingCurrentTime);
        };
        Tech.prototype.manualTimeUpdatesOff = function manualTimeUpdatesOff() {
            this.manualTimeUpdates = false;
            this.stopTrackingCurrentTime();
            this.off('play', this.trackCurrentTime);
            this.off('pause', this.stopTrackingCurrentTime);
        };
        Tech.prototype.trackCurrentTime = function trackCurrentTime() {
            if (this.currentTimeInterval) {
                this.stopTrackingCurrentTime();
            }
            this.currentTimeInterval = this.setInterval(function() {
                this.trigger({
                    type: 'timeupdate',
                    target: this,
                    manuallyTriggered: true
                });
            }, 250);
        };
        Tech.prototype.stopTrackingCurrentTime = function stopTrackingCurrentTime() {
            this.clearInterval(this.currentTimeInterval);
            this.trigger({
                type: 'timeupdate',
                target: this,
                manuallyTriggered: true
            });
        };
        Tech.prototype.dispose = function dispose() {
            this.clearTracks(NORMAL.names);
            if (this.manualProgress) {
                this.manualProgressOff();
            }
            if (this.manualTimeUpdates) {
                this.manualTimeUpdatesOff();
            }
            _Component.prototype.dispose.call(this);
        };
        Tech.prototype.clearTracks = function clearTracks(types) {
            var _this2 = this;
            types = [].concat(types);
            types.forEach(function(type) {
                var list = _this2[type + 'Tracks']() || [];
                var i = list.length;
                while (i--) {
                    var track = list[i];
                    if (type === 'text') {
                        _this2.removeRemoteTextTrack(track);
                    }
                    list.removeTrack(track);
                }
            });
        };
        Tech.prototype.cleanupAutoTextTracks = function cleanupAutoTextTracks() {
            var list = this.autoRemoteTextTracks_ || [];
            var i = list.length;
            while (i--) {
                var track = list[i];
                this.removeRemoteTextTrack(track);
            }
        };
        Tech.prototype.reset = function reset() {};
        Tech.prototype.error = function error(err) {
            if (err !== undefined) {
                this.error_ = new MediaError(err);
                this.trigger('error');
            }
            return this.error_;
        };
        Tech.prototype.played = function played() {
            if (this.hasStarted_) {
                return createTimeRanges(0, 0);
            }
            return createTimeRanges();
        };
        Tech.prototype.setCurrentTime = function setCurrentTime() {
            if (this.manualTimeUpdates) {
                this.trigger({
                    type: 'timeupdate',
                    target: this,
                    manuallyTriggered: true
                });
            }
        };
        Tech.prototype.initTrackListeners = function initTrackListeners() {
            var _this3 = this;
            NORMAL.names.forEach(function(name) {
                var props = NORMAL[name];
                var trackListChanges = function trackListChanges() {
                    _this3.trigger(name + 'trackchange');
                };
                var tracks = _this3[props.getterName]();
                tracks.addEventListener('removetrack', trackListChanges);
                tracks.addEventListener('addtrack', trackListChanges);
                _this3.on('dispose', function() {
                    tracks.removeEventListener('removetrack', trackListChanges);
                    tracks.removeEventListener('addtrack', trackListChanges);
                });
            });
        };
        Tech.prototype.addWebVttScript_ = function addWebVttScript_() {
            var _this4 = this;
            if (window_1.WebVTT) {
                return;
            }
            if (document_1.body.contains(this.el())) {
                if (!this.options_['vtt.js'] && isPlain(browserIndex) && Object.keys(browserIndex).length > 0) {
                    this.trigger('vttjsloaded');
                    return;
                }
                var script = document_1.createElement('script');
                script.src = this.options_['vtt.js'] || 'https://vjs.zencdn.net/vttjs/0.12.4/vtt.min.js';
                script.onload = function() {
                    _this4.trigger('vttjsloaded');
                };
                script.onerror = function() {
                    _this4.trigger('vttjserror');
                };
                this.on('dispose', function() {
                    script.onload = null;
                    script.onerror = null;
                });
                window_1.WebVTT = true;
                this.el().parentNode.appendChild(script);
            } else {
                this.ready(this.addWebVttScript_);
            }
        };
        Tech.prototype.emulateTextTracks = function emulateTextTracks() {
            var _this5 = this;
            var tracks = this.textTracks();
            var remoteTracks = this.remoteTextTracks();
            var handleAddTrack = function handleAddTrack(e) {
                return tracks.addTrack(e.track);
            };
            var handleRemoveTrack = function handleRemoveTrack(e) {
                return tracks.removeTrack(e.track);
            };
            remoteTracks.on('addtrack', handleAddTrack);
            remoteTracks.on('removetrack', handleRemoveTrack);
            this.addWebVttScript_();
            var updateDisplay = function updateDisplay() {
                return _this5.trigger('texttrackchange');
            };
            var textTracksChanges = function textTracksChanges() {
                updateDisplay();
                for (var i = 0; i < tracks.length; i++) {
                    var track = tracks[i];
                    track.removeEventListener('cuechange', updateDisplay);
                    if (track.mode === 'showing') {
                        track.addEventListener('cuechange', updateDisplay);
                    }
                }
            };
            textTracksChanges();
            tracks.addEventListener('change', textTracksChanges);
            tracks.addEventListener('addtrack', textTracksChanges);
            tracks.addEventListener('removetrack', textTracksChanges);
            this.on('dispose', function() {
                remoteTracks.off('addtrack', handleAddTrack);
                remoteTracks.off('removetrack', handleRemoveTrack);
                tracks.removeEventListener('change', textTracksChanges);
                tracks.removeEventListener('addtrack', textTracksChanges);
                tracks.removeEventListener('removetrack', textTracksChanges);
                for (var i = 0; i < tracks.length; i++) {
                    var track = tracks[i];
                    track.removeEventListener('cuechange', updateDisplay);
                }
            });
        };
        Tech.prototype.addTextTrack = function addTextTrack(kind, label, language) {
            if (!kind) {
                throw new Error('TextTrack kind is required but was not provided');
            }
            return createTrackHelper(this, kind, label, language);
        };
        Tech.prototype.createRemoteTextTrack = function createRemoteTextTrack(options) {
            var track = mergeOptions(options, {
                tech: this
            });
            return new REMOTE.remoteTextEl.TrackClass(track);
        };
        Tech.prototype.addRemoteTextTrack = function addRemoteTextTrack() {
            var _this6 = this;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var manualCleanup = arguments[1];
            var htmlTrackElement = this.createRemoteTextTrack(options);
            if (manualCleanup !== true && manualCleanup !== false) {
                log$1.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js');
                manualCleanup = true;
            }
            this.remoteTextTrackEls().addTrackElement_(htmlTrackElement);
            this.remoteTextTracks().addTrack(htmlTrackElement.track);
            if (manualCleanup !== true) {
                this.ready(function() {
                    return _this6.autoRemoteTextTracks_.addTrack(htmlTrackElement.track);
                });
            }
            return htmlTrackElement;
        };
        Tech.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
            var trackElement = this.remoteTextTrackEls().getTrackElementByTrack_(track);
            this.remoteTextTrackEls().removeTrackElement_(trackElement);
            this.remoteTextTracks().removeTrack(track);
            this.autoRemoteTextTracks_.removeTrack(track);
        };
        Tech.prototype.getVideoPlaybackQuality = function getVideoPlaybackQuality() {
            return {};
        };
        Tech.prototype.setPoster = function setPoster() {};
        Tech.prototype.playsinline = function playsinline() {};
        Tech.prototype.setPlaysinline = function setPlaysinline() {};
        Tech.prototype.canPlayType = function canPlayType() {
            return '';
        };
        Tech.canPlayType = function canPlayType() {
            return '';
        };
        Tech.canPlaySource = function canPlaySource(srcObj, options) {
            return Tech.canPlayType(srcObj.type);
        };
        Tech.isTech = function isTech(component) {
            return component.prototype instanceof Tech || component instanceof Tech || component === Tech;
        };
        Tech.registerTech = function registerTech(name, tech) {
            if (!Tech.techs_) {
                Tech.techs_ = {};
            }
            if (!Tech.isTech(tech)) {
                throw new Error('Tech ' + name + ' must be a Tech');
            }
            if (!Tech.canPlayType) {
                throw new Error('Techs must have a static canPlayType method on them');
            }
            if (!Tech.canPlaySource) {
                throw new Error('Techs must have a static canPlaySource method on them');
            }
            name = toTitleCase(name);
            Tech.techs_[name] = tech;
            if (name !== 'Tech') {
                Tech.defaultTechOrder_.push(name);
            }
            return tech;
        };
        Tech.getTech = function getTech(name) {
            if (!name) {
                return;
            }
            name = toTitleCase(name);
            if (Tech.techs_ && Tech.techs_[name]) {
                return Tech.techs_[name];
            }
            if (window_1 && window_1.videojs && window_1.videojs[name]) {
                log$1.warn('The ' + name + ' tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)');
                return window_1.videojs[name];
            }
        };
        return Tech;
    }(Component);
    ALL.names.forEach(function(name) {
        var props = ALL[name];
        Tech.prototype[props.getterName] = function() {
            this[props.privateName] = this[props.privateName] || new props.ListClass();
            return this[props.privateName];
        };
    });
    Tech.prototype.featuresVolumeControl = true;
    Tech.prototype.featuresFullscreenResize = false;
    Tech.prototype.featuresPlaybackRate = false;
    Tech.prototype.featuresProgressEvents = false;
    Tech.prototype.featuresTimeupdateEvents = false;
    Tech.prototype.featuresNativeTextTracks = false;
    Tech.withSourceHandlers = function(_Tech) {
        _Tech.registerSourceHandler = function(handler, index) {
            var handlers = _Tech.sourceHandlers;
            if (!handlers) {
                handlers = _Tech.sourceHandlers = [];
            }
            if (index === undefined) {
                index = handlers.length;
            }
            handlers.splice(index, 0, handler);
        };
        _Tech.canPlayType = function(type) {
            var handlers = _Tech.sourceHandlers || [];
            var can = void 0;
            for (var i = 0; i < handlers.length; i++) {
                can = handlers[i].canPlayType(type);
                if (can) {
                    return can;
                }
            }
            return '';
        };
        _Tech.selectSourceHandler = function(source, options) {
            var handlers = _Tech.sourceHandlers || [];
            var can = void 0;
            for (var i = 0; i < handlers.length; i++) {
                can = handlers[i].canHandleSource(source, options);
                if (can) {
                    return handlers[i];
                }
            }
            return null;
        };
        _Tech.canPlaySource = function(srcObj, options) {
            var sh = _Tech.selectSourceHandler(srcObj, options);
            if (sh) {
                return sh.canHandleSource(srcObj, options);
            }
            return '';
        };
        var deferrable = ['seekable', 'duration'];
        deferrable.forEach(function(fnName) {
            var originalFn = this[fnName];
            if (typeof originalFn !== 'function') {
                return;
            }
            this[fnName] = function() {
                if (this.sourceHandler_ && this.sourceHandler_[fnName]) {
                    return this.sourceHandler_[fnName].apply(this.sourceHandler_, arguments);
                }
                return originalFn.apply(this, arguments);
            };
        }, _Tech.prototype);
        _Tech.prototype.setSource = function(source) {
            var sh = _Tech.selectSourceHandler(source, this.options_);
            if (!sh) {
                if (_Tech.nativeSourceHandler) {
                    sh = _Tech.nativeSourceHandler;
                } else {
                    log$1.error('No source hander found for the current source.');
                }
            }
            this.disposeSourceHandler();
            this.off('dispose', this.disposeSourceHandler);
            if (sh !== _Tech.nativeSourceHandler) {
                this.currentSource_ = source;
            }
            this.sourceHandler_ = sh.handleSource(source, this, this.options_);
            this.on('dispose', this.disposeSourceHandler);
        };
        _Tech.prototype.disposeSourceHandler = function() {
            if (this.currentSource_) {
                this.clearTracks(['audio', 'video']);
                this.currentSource_ = null;
            }
            this.cleanupAutoTextTracks();
            if (this.sourceHandler_) {
                if (this.sourceHandler_.dispose) {
                    this.sourceHandler_.dispose();
                }
                this.sourceHandler_ = null;
            }
        };
    };
    Component.registerComponent('Tech', Tech);
    Tech.registerTech('Tech', Tech);
    Tech.defaultTechOrder_ = [];
    var middlewares = {};

    function use(type, middleware) {
        middlewares[type] = middlewares[type] || [];
        middlewares[type].push(middleware);
    }

    function setSource(player, src, next) {
        player.setTimeout(function() {
            return setSourceHelper(src, middlewares[src.type], next, player);
        }, 1);
    }

    function setTech(middleware, tech) {
        middleware.forEach(function(mw) {
            return mw.setTech && mw.setTech(tech);
        });
    }

    function get$1(middleware, tech, method) {
        return middleware.reduceRight(middlewareIterator(method), tech[method]());
    }

    function set$1(middleware, tech, method, arg) {
        return tech[method](middleware.reduce(middlewareIterator(method), arg));
    }
    var allowedGetters = {
        buffered: 1,
        currentTime: 1,
        duration: 1,
        seekable: 1,
        played: 1
    };
    var allowedSetters = {
        setCurrentTime: 1
    };

    function middlewareIterator(method) {
        return function(value, mw) {
            if (mw[method]) {
                return mw[method](value);
            }
            return value;
        };
    }

    function setSourceHelper() {
        var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var middleware = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var next = arguments[2];
        var player = arguments[3];
        var acc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
        var lastRun = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var mwFactory = middleware[0],
            mwrest = middleware.slice(1);
        if (typeof mwFactory === 'string') {
            setSourceHelper(src, middlewares[mwFactory], next, player, acc, lastRun);
        } else if (mwFactory) {
            var mw = mwFactory(player);
            mw.setSource(assign({}, src), function(err, _src) {
                if (err) {
                    return setSourceHelper(src, mwrest, next, player, acc, lastRun);
                }
                acc.push(mw);
                setSourceHelper(_src, src.type === _src.type ? mwrest : middlewares[_src.type], next, player, acc, lastRun);
            });
        } else if (mwrest.length) {
            setSourceHelper(src, mwrest, next, player, acc, lastRun);
        } else if (lastRun) {
            next(src, acc);
        } else {
            setSourceHelper(src, middlewares['*'], next, player, acc, true);
        }
    }
    var filterSource = function filterSource(src) {
        if (Array.isArray(src)) {
            var newsrc = [];
            src.forEach(function(srcobj) {
                srcobj = filterSource(srcobj);
                if (Array.isArray(srcobj)) {
                    newsrc = newsrc.concat(srcobj);
                } else if (isObject(srcobj)) {
                    newsrc.push(srcobj);
                }
            });
            src = newsrc;
        } else if (typeof src === 'string' && src.trim()) {
            src = [{
                src: src
            }];
        } else if (isObject(src) && typeof src.src === 'string' && src.src && src.src.trim()) {
            src = [src];
        } else {
            src = [];
        }
        return src;
    };
    var MediaLoader = function(_Component) {
        inherits(MediaLoader, _Component);

        function MediaLoader(player, options, ready) {
            classCallCheck(this, MediaLoader);
            var options_ = mergeOptions({
                createEl: false
            }, options);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options_, ready));
            if (!options.playerOptions.sources || options.playerOptions.sources.length === 0) {
                for (var i = 0, j = options.playerOptions.techOrder; i < j.length; i++) {
                    var techName = toTitleCase(j[i]);
                    var tech = Tech.getTech(techName);
                    if (!techName) {
                        tech = Component.getComponent(techName);
                    }
                    if (tech && tech.isSupported()) {
                        player.loadTech_(techName);
                        break;
                    }
                }
            } else {
                player.src(options.playerOptions.sources);
            }
            return _this;
        }
        return MediaLoader;
    }(Component);
    Component.registerComponent('MediaLoader', MediaLoader);
    var ClickableComponent = function(_Component) {
        inherits(ClickableComponent, _Component);

        function ClickableComponent(player, options) {
            classCallCheck(this, ClickableComponent);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.emitTapEvents();
            _this.enable();
            return _this;
        }
        ClickableComponent.prototype.createEl = function createEl$$1() {
            var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            props = assign({
                innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
                className: this.buildCSSClass(),
                tabIndex: 0
            }, props);
            if (tag === 'button') {
                log$1.error('Creating a ClickableComponent with an HTML element of ' + tag + ' is not supported; use a Button instead.');
            }
            attributes = assign({
                'role': 'button',
                'aria-live': 'polite'
            }, attributes);
            this.tabIndex_ = props.tabIndex;
            var el = _Component.prototype.createEl.call(this, tag, props, attributes);
            this.createControlTextEl(el);
            return el;
        };
        ClickableComponent.prototype.dispose = function dispose() {
            this.controlTextEl_ = null;
            _Component.prototype.dispose.call(this);
        };
        ClickableComponent.prototype.createControlTextEl = function createControlTextEl(el) {
            this.controlTextEl_ = createEl('span', {
                className: 'vjs-control-text'
            });
            if (el) {
                el.appendChild(this.controlTextEl_);
            }
            this.controlText(this.controlText_, el);
            return this.controlTextEl_;
        };
        ClickableComponent.prototype.controlText = function controlText(text) {
            var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.el();
            if (text === undefined) {
                return this.controlText_ || 'Need Text';
            }
            var localizedText = this.localize(text);
            this.controlText_ = text;
            textContent(this.controlTextEl_, localizedText);
            if (!this.nonIconControl) {
                el.setAttribute('title', localizedText);
            }
        };
        ClickableComponent.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-control vjs-button ' + _Component.prototype.buildCSSClass.call(this);
        };
        ClickableComponent.prototype.enable = function enable() {
            if (!this.enabled_) {
                this.enabled_ = true;
                this.removeClass('vjs-disabled');
                this.el_.setAttribute('aria-disabled', 'false');
                if (typeof this.tabIndex_ !== 'undefined') {
                    this.el_.setAttribute('tabIndex', this.tabIndex_);
                }
                this.on(['tap', 'click'], this.handleClick);
                this.on('focus', this.handleFocus);
                this.on('blur', this.handleBlur);
            }
        };
        ClickableComponent.prototype.disable = function disable() {
            this.enabled_ = false;
            this.addClass('vjs-disabled');
            this.el_.setAttribute('aria-disabled', 'true');
            if (typeof this.tabIndex_ !== 'undefined') {
                this.el_.removeAttribute('tabIndex');
            }
            this.off(['tap', 'click'], this.handleClick);
            this.off('focus', this.handleFocus);
            this.off('blur', this.handleBlur);
        };
        ClickableComponent.prototype.handleClick = function handleClick(event) {};
        ClickableComponent.prototype.handleFocus = function handleFocus(event) {
            on(document_1, 'keydown', bind(this, this.handleKeyPress));
        };
        ClickableComponent.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 32 || event.which === 13) {
                event.preventDefault();
                this.trigger('click');
            } else if (_Component.prototype.handleKeyPress) {
                _Component.prototype.handleKeyPress.call(this, event);
            }
        };
        ClickableComponent.prototype.handleBlur = function handleBlur(event) {
            off(document_1, 'keydown', bind(this, this.handleKeyPress));
        };
        return ClickableComponent;
    }(Component);
    Component.registerComponent('ClickableComponent', ClickableComponent);
    var PosterImage = function(_ClickableComponent) {
        inherits(PosterImage, _ClickableComponent);

        function PosterImage(player, options) {
            classCallCheck(this, PosterImage);
            var _this = possibleConstructorReturn(this, _ClickableComponent.call(this, player, options));
            _this.update();
            player.on('posterchange', bind(_this, _this.update));
            return _this;
        }
        PosterImage.prototype.dispose = function dispose() {
            this.player().off('posterchange', this.update);
            _ClickableComponent.prototype.dispose.call(this);
        };
        PosterImage.prototype.createEl = function createEl$$1() {
            var el = createEl('div', {
                className: 'vjs-poster',
                tabIndex: -1
            });
            if (!BACKGROUND_SIZE_SUPPORTED) {
                this.fallbackImg_ = createEl('img');
                el.appendChild(this.fallbackImg_);
            }
            return el;
        };
        PosterImage.prototype.update = function update(event) {
            var url = this.player().poster();
            this.setSrc(url);
            if (url) {
                this.show();
            } else {
                this.hide();
            }
        };
        PosterImage.prototype.setSrc = function setSrc(url) {
            if (this.fallbackImg_) {
                this.fallbackImg_.src = url;
            } else {
                var backgroundImage = '';
                if (url) {
                    backgroundImage = 'url("' + url + '")';
                }
                this.el_.style.backgroundImage = backgroundImage;
            }
        };
        PosterImage.prototype.handleClick = function handleClick(event) {
            if (!this.player_.controls()) {
                return;
            }
            if (this.player_.paused()) {
                this.player_.play();
            } else {
                this.player_.pause();
            }
        };
        return PosterImage;
    }(ClickableComponent);
    Component.registerComponent('PosterImage', PosterImage);
    var darkGray = '#222';
    var lightGray = '#ccc';
    var fontMap = {
        monospace: 'monospace',
        sansSerif: 'sans-serif',
        serif: 'serif',
        monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
        monospaceSerif: '"Courier New", monospace',
        proportionalSansSerif: 'sans-serif',
        proportionalSerif: 'serif',
        casual: '"Comic Sans MS", Impact, fantasy',
        script: '"Monotype Corsiva", cursive',
        smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
    };

    function constructColor(color, opacity) {
        return 'rgba(' +
            parseInt(color[1] + color[1], 16) + ',' + parseInt(color[2] + color[2], 16) + ',' + parseInt(color[3] + color[3], 16) + ',' + opacity + ')';
    }

    function tryUpdateStyle(el, style, rule) {
        try {
            el.style[style] = rule;
        } catch (e) {
            return;
        }
    }
    var TextTrackDisplay = function(_Component) {
        inherits(TextTrackDisplay, _Component);

        function TextTrackDisplay(player, options, ready) {
            classCallCheck(this, TextTrackDisplay);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options, ready));
            player.on('loadstart', bind(_this, _this.toggleDisplay));
            player.on('texttrackchange', bind(_this, _this.updateDisplay));
            player.on('loadstart', bind(_this, _this.preselectTrack));
            player.ready(bind(_this, function() {
                if (player.tech_ && player.tech_.featuresNativeTextTracks) {
                    this.hide();
                    return;
                }
                player.on('fullscreenchange', bind(this, this.updateDisplay));
                var tracks = this.options_.playerOptions.tracks || [];
                for (var i = 0; i < tracks.length; i++) {
                    this.player_.addRemoteTextTrack(tracks[i], true);
                }
                this.preselectTrack();
            }));
            return _this;
        }
        TextTrackDisplay.prototype.preselectTrack = function preselectTrack() {
            var modes = {
                captions: 1,
                subtitles: 1
            };
            var trackList = this.player_.textTracks();
            var userPref = this.player_.cache_.selectedLanguage;
            var firstDesc = void 0;
            var firstCaptions = void 0;
            var preferredTrack = void 0;
            for (var i = 0; i < trackList.length; i++) {
                var track = trackList[i];
                if (userPref && userPref.enabled && userPref.language === track.language) {
                    if (track.kind === userPref.kind) {
                        preferredTrack = track;
                    } else if (!preferredTrack) {
                        preferredTrack = track;
                    }
                } else if (userPref && !userPref.enabled) {
                    preferredTrack = null;
                    firstDesc = null;
                    firstCaptions = null;
                } else if (track['default']) {
                    if (track.kind === 'descriptions' && !firstDesc) {
                        firstDesc = track;
                    } else if (track.kind in modes && !firstCaptions) {
                        firstCaptions = track;
                    }
                }
            }
            if (preferredTrack) {
                preferredTrack.mode = 'showing';
            } else if (firstCaptions) {
                firstCaptions.mode = 'showing';
            } else if (firstDesc) {
                firstDesc.mode = 'showing';
            }
        };
        TextTrackDisplay.prototype.toggleDisplay = function toggleDisplay() {
            if (this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks) {
                this.hide();
            } else {
                this.show();
            }
        };
        TextTrackDisplay.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-text-track-display'
            }, {
                'aria-live': 'off',
                'aria-atomic': 'true'
            });
        };
        TextTrackDisplay.prototype.clearDisplay = function clearDisplay() {
            if (typeof window_1.WebVTT === 'function') {
                window_1.WebVTT.processCues(window_1, [], this.el_);
            }
        };
        TextTrackDisplay.prototype.updateDisplay = function updateDisplay() {
            var tracks = this.player_.textTracks();
            this.clearDisplay();
            var descriptionsTrack = null;
            var captionsSubtitlesTrack = null;
            var i = tracks.length;
            while (i--) {
                var track = tracks[i];
                if (track.mode === 'showing') {
                    if (track.kind === 'descriptions') {
                        descriptionsTrack = track;
                    } else {
                        captionsSubtitlesTrack = track;
                    }
                }
            }
            if (captionsSubtitlesTrack) {
                if (this.getAttribute('aria-live') !== 'off') {
                    this.setAttribute('aria-live', 'off');
                }
                this.updateForTrack(captionsSubtitlesTrack);
            } else if (descriptionsTrack) {
                if (this.getAttribute('aria-live') !== 'assertive') {
                    this.setAttribute('aria-live', 'assertive');
                }
                this.updateForTrack(descriptionsTrack);
            }
        };
        TextTrackDisplay.prototype.updateForTrack = function updateForTrack(track) {
            if (typeof window_1.WebVTT !== 'function' || !track.activeCues) {
                return;
            }
            var overrides = this.player_.textTrackSettings.getValues();
            var cues = [];
            for (var _i = 0; _i < track.activeCues.length; _i++) {
                cues.push(track.activeCues[_i]);
            }
            window_1.WebVTT.processCues(window_1, cues, this.el_);
            var i = cues.length;
            while (i--) {
                var cue = cues[i];
                if (!cue) {
                    continue;
                }
                var cueDiv = cue.displayState;
                if (overrides.color) {
                    cueDiv.firstChild.style.color = overrides.color;
                }
                if (overrides.textOpacity) {
                    tryUpdateStyle(cueDiv.firstChild, 'color', constructColor(overrides.color || '#fff', overrides.textOpacity));
                }
                if (overrides.backgroundColor) {
                    cueDiv.firstChild.style.backgroundColor = overrides.backgroundColor;
                }
                if (overrides.backgroundOpacity) {
                    tryUpdateStyle(cueDiv.firstChild, 'backgroundColor', constructColor(overrides.backgroundColor || '#000', overrides.backgroundOpacity));
                }
                if (overrides.windowColor) {
                    if (overrides.windowOpacity) {
                        tryUpdateStyle(cueDiv, 'backgroundColor', constructColor(overrides.windowColor, overrides.windowOpacity));
                    } else {
                        cueDiv.style.backgroundColor = overrides.windowColor;
                    }
                }
                if (overrides.edgeStyle) {
                    if (overrides.edgeStyle === 'dropshadow') {
                        cueDiv.firstChild.style.textShadow = '2px 2px 3px ' + darkGray + ', 2px 2px 4px ' + darkGray + ', 2px 2px 5px ' + darkGray;
                    } else if (overrides.edgeStyle === 'raised') {
                        cueDiv.firstChild.style.textShadow = '1px 1px ' + darkGray + ', 2px 2px ' + darkGray + ', 3px 3px ' + darkGray;
                    } else if (overrides.edgeStyle === 'depressed') {
                        cueDiv.firstChild.style.textShadow = '1px 1px ' + lightGray + ', 0 1px ' + lightGray + ', -1px -1px ' + darkGray + ', 0 -1px ' + darkGray;
                    } else if (overrides.edgeStyle === 'uniform') {
                        cueDiv.firstChild.style.textShadow = '0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray;
                    }
                }
                if (overrides.fontPercent && overrides.fontPercent !== 1) {
                    var fontSize = window_1.parseFloat(cueDiv.style.fontSize);
                    cueDiv.style.fontSize = fontSize * overrides.fontPercent + 'px';
                    cueDiv.style.height = 'auto';
                    cueDiv.style.top = 'auto';
                    cueDiv.style.bottom = '2px';
                }
                if (overrides.fontFamily && overrides.fontFamily !== 'default') {
                    if (overrides.fontFamily === 'small-caps') {
                        cueDiv.firstChild.style.fontVariant = 'small-caps';
                    } else {
                        cueDiv.firstChild.style.fontFamily = fontMap[overrides.fontFamily];
                    }
                }
            }
        };
        return TextTrackDisplay;
    }(Component);
    Component.registerComponent('TextTrackDisplay', TextTrackDisplay);
    var LoadingSpinner = function(_Component) {
        inherits(LoadingSpinner, _Component);

        function LoadingSpinner() {
            classCallCheck(this, LoadingSpinner);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        LoadingSpinner.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-loading-spinner',
                dir: 'ltr'
            });
        };
        return LoadingSpinner;
    }(Component);
    Component.registerComponent('LoadingSpinner', LoadingSpinner);
    var Button = function(_ClickableComponent) {
        inherits(Button, _ClickableComponent);

        function Button() {
            classCallCheck(this, Button);
            return possibleConstructorReturn(this, _ClickableComponent.apply(this, arguments));
        }
        Button.prototype.createEl = function createEl(tag) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            tag = 'button';
            props = assign({
                innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
                className: this.buildCSSClass()
            }, props);
            attributes = assign({
                'type': 'button',
                'aria-live': 'polite'
            }, attributes);
            var el = Component.prototype.createEl.call(this, tag, props, attributes);
            this.createControlTextEl(el);
            return el;
        };
        Button.prototype.addChild = function addChild(child) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var className = this.constructor.name;
            log$1.warn('Adding an actionable (user controllable) child to a Button (' + className + ') is not supported; use a ClickableComponent instead.');
            return Component.prototype.addChild.call(this, child, options);
        };
        Button.prototype.enable = function enable() {
            _ClickableComponent.prototype.enable.call(this);
            this.el_.removeAttribute('disabled');
        };
        Button.prototype.disable = function disable() {
            _ClickableComponent.prototype.disable.call(this);
            this.el_.setAttribute('disabled', 'disabled');
        };
        Button.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 32 || event.which === 13) {
                return;
            }
            _ClickableComponent.prototype.handleKeyPress.call(this, event);
        };
        return Button;
    }(ClickableComponent);
    Component.registerComponent('Button', Button);
    var BigPlayButton = function(_Button) {
        inherits(BigPlayButton, _Button);

        function BigPlayButton(player, options) {
            classCallCheck(this, BigPlayButton);
            var _this = possibleConstructorReturn(this, _Button.call(this, player, options));
            _this.mouseused_ = false;
            _this.on('mousedown', _this.handleMouseDown);
            return _this;
        }
        BigPlayButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-big-play-button';
        };
        BigPlayButton.prototype.handleClick = function handleClick(event) {
            var playPromise = this.player_.play();
            if (this.mouseused_ && event.clientX && event.clientY) {
                return;
            }
            var cb = this.player_.getChild('controlBar');
            var playToggle = cb && cb.getChild('playToggle');
            if (!playToggle) {
                this.player_.focus();
                return;
            }
            var playFocus = function playFocus() {
                return playToggle.focus();
            };
            if (isPromise(playPromise)) {
                playPromise.then(playFocus, function() {});
            } else {
                this.setTimeout(playFocus, 1);
            }
        };
        BigPlayButton.prototype.handleKeyPress = function handleKeyPress(event) {
            this.mouseused_ = false;
            _Button.prototype.handleKeyPress.call(this, event);
        };
        BigPlayButton.prototype.handleMouseDown = function handleMouseDown(event) {
            this.mouseused_ = true;
        };
        return BigPlayButton;
    }(Button);
    BigPlayButton.prototype.controlText_ = 'Play Video';
    Component.registerComponent('BigPlayButton', BigPlayButton);
    var CloseButton = function(_Button) {
        inherits(CloseButton, _Button);

        function CloseButton(player, options) {
            classCallCheck(this, CloseButton);
            var _this = possibleConstructorReturn(this, _Button.call(this, player, options));
            _this.controlText(options && options.controlText || _this.localize('Close'));
            return _this;
        }
        CloseButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-close-button ' + _Button.prototype.buildCSSClass.call(this);
        };
        CloseButton.prototype.handleClick = function handleClick(event) {
            this.trigger({
                type: 'close',
                bubbles: false
            });
        };
        return CloseButton;
    }(Button);
    Component.registerComponent('CloseButton', CloseButton);
    var PlayToggle = function(_Button) {
        inherits(PlayToggle, _Button);

        function PlayToggle(player, options) {
            classCallCheck(this, PlayToggle);
            var _this = possibleConstructorReturn(this, _Button.call(this, player, options));
            _this.on(player, 'play', _this.handlePlay);
            _this.on(player, 'pause', _this.handlePause);
            _this.on(player, 'ended', _this.handleEnded);
            return _this;
        }
        PlayToggle.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-play-control ' + _Button.prototype.buildCSSClass.call(this);
        };
        PlayToggle.prototype.handleClick = function handleClick(event) {
            if (this.player_.paused()) {
                this.player_.play();
            } else {
                this.player_.pause();
            }
        };
        PlayToggle.prototype.handleSeeked = function handleSeeked(event) {
            this.removeClass('vjs-ended');
            if (this.player_.paused()) {
                this.handlePause(event);
            } else {
                this.handlePlay(event);
            }
        };
        PlayToggle.prototype.handlePlay = function handlePlay(event) {
            this.removeClass('vjs-ended');
            this.removeClass('vjs-paused');
            this.addClass('vjs-playing');
            this.controlText('Pause');
        };
        PlayToggle.prototype.handlePause = function handlePause(event) {
            this.removeClass('vjs-playing');
            this.addClass('vjs-paused');
            this.controlText('Play');
        };
        PlayToggle.prototype.handleEnded = function handleEnded(event) {
            this.removeClass('vjs-playing');
            this.addClass('vjs-ended');
            this.controlText('Replay');
            this.one(this.player_, 'seeked', this.handleSeeked);
        };
        return PlayToggle;
    }(Button);
    PlayToggle.prototype.controlText_ = 'Play';
    Component.registerComponent('PlayToggle', PlayToggle);

    function formatTime(seconds) {
        var guide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : seconds;
        seconds = seconds < 0 ? 0 : seconds;
        var s = Math.floor(seconds % 60);
        var m = Math.floor(seconds / 60 % 60);
        var h = Math.floor(seconds / 3600);
        var gm = Math.floor(guide / 60 % 60);
        var gh = Math.floor(guide / 3600);
        if (isNaN(seconds) || seconds === Infinity) {
            h = m = s = '-';
        }
        h = h > 0 || gh > 0 ? h + ':' : '';
        m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';
        s = s < 10 ? '0' + s : s;
        return h + m + s;
    }
    var TimeDisplay = function(_Component) {
        inherits(TimeDisplay, _Component);

        function TimeDisplay(player, options) {
            classCallCheck(this, TimeDisplay);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.throttledUpdateContent = throttle(bind(_this, _this.updateContent), 25);
            _this.on(player, 'timeupdate', _this.throttledUpdateContent);
            return _this;
        }
        TimeDisplay.prototype.createEl = function createEl$$1(plainName) {
            var className = this.buildCSSClass();
            var el = _Component.prototype.createEl.call(this, 'div', {
                className: className + ' vjs-time-control vjs-control'
            });
            this.contentEl_ = createEl('div', {
                className: className + '-display'
            }, {
                'aria-live': 'off'
            }, createEl('span', {
                className: 'vjs-control-text',
                textContent: this.localize(this.controlText_)
            }));
            this.updateTextNode_();
            el.appendChild(this.contentEl_);
            return el;
        };
        TimeDisplay.prototype.dispose = function dispose() {
            this.contentEl_ = null;
            this.textNode_ = null;
            _Component.prototype.dispose.call(this);
        };
        TimeDisplay.prototype.updateTextNode_ = function updateTextNode_() {
            if (!this.contentEl_) {
                return;
            }
            while (this.contentEl_.firstChild) {
                this.contentEl_.removeChild(this.contentEl_.firstChild);
            }
            this.textNode_ = document_1.createTextNode(this.formattedTime_ || '0:00');
            this.contentEl_.appendChild(this.textNode_);
        };
        TimeDisplay.prototype.formatTime_ = function formatTime_(time) {
            return formatTime(time);
        };
        TimeDisplay.prototype.updateFormattedTime_ = function updateFormattedTime_(time) {
            var formattedTime = this.formatTime_(time);
            if (formattedTime === this.formattedTime_) {
                return;
            }
            this.formattedTime_ = formattedTime;
            this.requestAnimationFrame(this.updateTextNode_);
        };
        TimeDisplay.prototype.updateContent = function updateContent(event) {};
        return TimeDisplay;
    }(Component);
    TimeDisplay.prototype.controlText_ = 'Time';
    Component.registerComponent('TimeDisplay', TimeDisplay);
    var CurrentTimeDisplay = function(_TimeDisplay) {
        inherits(CurrentTimeDisplay, _TimeDisplay);

        function CurrentTimeDisplay(player, options) {
            classCallCheck(this, CurrentTimeDisplay);
            var _this = possibleConstructorReturn(this, _TimeDisplay.call(this, player, options));
            _this.on(player, 'ended', _this.handleEnded);
            return _this;
        }
        CurrentTimeDisplay.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-current-time';
        };
        CurrentTimeDisplay.prototype.updateContent = function updateContent(event) {
            var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
            this.updateFormattedTime_(time);
        };
        CurrentTimeDisplay.prototype.handleEnded = function handleEnded(event) {
            if (!this.player_.duration()) {
                return;
            }
            this.updateFormattedTime_(this.player_.duration());
        };
        return CurrentTimeDisplay;
    }(TimeDisplay);
    CurrentTimeDisplay.prototype.controlText_ = 'Current Time';
    Component.registerComponent('CurrentTimeDisplay', CurrentTimeDisplay);
    var DurationDisplay = function(_TimeDisplay) {
        inherits(DurationDisplay, _TimeDisplay);

        function DurationDisplay(player, options) {
            classCallCheck(this, DurationDisplay);
            var _this = possibleConstructorReturn(this, _TimeDisplay.call(this, player, options));
            _this.on(player, 'durationchange', _this.updateContent);
            _this.on(player, 'loadedmetadata', _this.throttledUpdateContent);
            return _this;
        }
        DurationDisplay.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-duration';
        };
        DurationDisplay.prototype.updateContent = function updateContent(event) {
            var duration = this.player_.duration();
            if (duration && this.duration_ !== duration) {
                this.duration_ = duration;
                this.updateFormattedTime_(duration);
            }
        };
        return DurationDisplay;
    }(TimeDisplay);
    DurationDisplay.prototype.controlText_ = 'Duration Time';
    Component.registerComponent('DurationDisplay', DurationDisplay);
    var TimeDivider = function(_Component) {
        inherits(TimeDivider, _Component);

        function TimeDivider() {
            classCallCheck(this, TimeDivider);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        TimeDivider.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-time-control vjs-time-divider',
                innerHTML: '<div><span>/</span></div>'
            });
        };
        return TimeDivider;
    }(Component);
    Component.registerComponent('TimeDivider', TimeDivider);
    var RemainingTimeDisplay = function(_TimeDisplay) {
        inherits(RemainingTimeDisplay, _TimeDisplay);

        function RemainingTimeDisplay(player, options) {
            classCallCheck(this, RemainingTimeDisplay);
            var _this = possibleConstructorReturn(this, _TimeDisplay.call(this, player, options));
            _this.on(player, 'durationchange', _this.throttledUpdateContent);
            _this.on(player, 'ended', _this.handleEnded);
            return _this;
        }
        RemainingTimeDisplay.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-remaining-time';
        };
        RemainingTimeDisplay.prototype.formatTime_ = function formatTime_(time) {
            return '-' + _TimeDisplay.prototype.formatTime_.call(this, time);
        };
        RemainingTimeDisplay.prototype.updateContent = function updateContent(event) {
            if (!this.player_.duration()) {
                return;
            }
            if (this.player_.remainingTimeDisplay) {
                this.updateFormattedTime_(this.player_.remainingTimeDisplay());
            } else {
                this.updateFormattedTime_(this.player_.remainingTime());
            }
        };
        RemainingTimeDisplay.prototype.handleEnded = function handleEnded(event) {
            if (!this.player_.duration()) {
                return;
            }
            this.updateFormattedTime_(0);
        };
        return RemainingTimeDisplay;
    }(TimeDisplay);
    RemainingTimeDisplay.prototype.controlText_ = 'Remaining Time';
    Component.registerComponent('RemainingTimeDisplay', RemainingTimeDisplay);
    var LiveDisplay = function(_Component) {
        inherits(LiveDisplay, _Component);

        function LiveDisplay(player, options) {
            classCallCheck(this, LiveDisplay);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.updateShowing();
            _this.on(_this.player(), 'durationchange', _this.updateShowing);
            return _this;
        }
        LiveDisplay.prototype.createEl = function createEl$$1() {
            var el = _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-live-control vjs-control'
            });
            this.contentEl_ = createEl('div', {
                className: 'vjs-live-display',
                innerHTML: '<span class="vjs-control-text">' + this.localize('Stream Type') + '</span>' + this.localize('LIVE')
            }, {
                'aria-live': 'off'
            });
            el.appendChild(this.contentEl_);
            return el;
        };
        LiveDisplay.prototype.dispose = function dispose() {
            this.contentEl_ = null;
            _Component.prototype.dispose.call(this);
        };
        LiveDisplay.prototype.updateShowing = function updateShowing(event) {
            if (this.player().duration() === Infinity) {
                this.show();
            } else {
                this.hide();
            }
        };
        return LiveDisplay;
    }(Component);
    Component.registerComponent('LiveDisplay', LiveDisplay);
    var Slider = function(_Component) {
        inherits(Slider, _Component);

        function Slider(player, options) {
            classCallCheck(this, Slider);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.bar = _this.getChild(_this.options_.barName);
            _this.vertical(!!_this.options_.vertical);
            _this.enable();
            return _this;
        }
        Slider.prototype.enabled = function enabled() {
            return this.enabled_;
        };
        Slider.prototype.enable = function enable() {
            if (this.enabled()) {
                return;
            }
            this.on('mousedown', this.handleMouseDown);
            this.on('touchstart', this.handleMouseDown);
            this.on('focus', this.handleFocus);
            this.on('blur', this.handleBlur);
            this.on('click', this.handleClick);
            this.on(this.player_, 'controlsvisible', this.update);
            if (this.playerEvent) {
                this.on(this.player_, this.playerEvent, this.update);
            }
            this.removeClass('disabled');
            this.setAttribute('tabindex', 0);
            this.enabled_ = true;
        };
        Slider.prototype.disable = function disable() {
            if (!this.enabled()) {
                return;
            }
            var doc = this.bar.el_.ownerDocument;
            this.off('mousedown', this.handleMouseDown);
            this.off('touchstart', this.handleMouseDown);
            this.off('focus', this.handleFocus);
            this.off('blur', this.handleBlur);
            this.off('click', this.handleClick);
            this.off(this.player_, 'controlsvisible', this.update);
            this.off(doc, 'mousemove', this.handleMouseMove);
            this.off(doc, 'mouseup', this.handleMouseUp);
            this.off(doc, 'touchmove', this.handleMouseMove);
            this.off(doc, 'touchend', this.handleMouseUp);
            this.removeAttribute('tabindex');
            this.addClass('disabled');
            if (this.playerEvent) {
                this.off(this.player_, this.playerEvent, this.update);
            }
            this.enabled_ = false;
        };
        Slider.prototype.createEl = function createEl$$1(type) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            props.className = props.className + ' vjs-slider';
            props = assign({
                tabIndex: 0
            }, props);
            attributes = assign({
                'role': 'slider',
                'aria-valuenow': 0,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'tabIndex': 0
            }, attributes);
            return _Component.prototype.createEl.call(this, type, props, attributes);
        };
        Slider.prototype.handleMouseDown = function handleMouseDown(event) {
            var doc = this.bar.el_.ownerDocument;
            event.preventDefault();
            blockTextSelection();
            this.addClass('vjs-sliding');
            this.trigger('slideractive');
            this.on(doc, 'mousemove', this.handleMouseMove);
            this.on(doc, 'mouseup', this.handleMouseUp);
            this.on(doc, 'touchmove', this.handleMouseMove);
            this.on(doc, 'touchend', this.handleMouseUp);
            this.handleMouseMove(event);
        };
        Slider.prototype.handleMouseMove = function handleMouseMove(event) {};
        Slider.prototype.handleMouseUp = function handleMouseUp() {
            var doc = this.bar.el_.ownerDocument;
            unblockTextSelection();
            this.removeClass('vjs-sliding');
            this.trigger('sliderinactive');
            this.off(doc, 'mousemove', this.handleMouseMove);
            this.off(doc, 'mouseup', this.handleMouseUp);
            this.off(doc, 'touchmove', this.handleMouseMove);
            this.off(doc, 'touchend', this.handleMouseUp);
            this.update();
        };
        Slider.prototype.update = function update() {
            if (!this.el_) {
                return;
            }
            var progress = this.getPercent();
            var bar = this.bar;
            if (!bar) {
                return;
            }
            if (typeof progress !== 'number' || progress !== progress || progress < 0 || progress === Infinity) {
                progress = 0;
            }
            var percentage = (progress * 100).toFixed(2) + '%';
            var style = bar.el().style;
            if (this.vertical()) {
                style.height = percentage;
            } else {
                style.width = percentage;
            }
            return progress;
        };
        Slider.prototype.calculateDistance = function calculateDistance(event) {
            var position = getPointerPosition(this.el_, event);
            if (this.vertical()) {
                return position.y;
            }
            return position.x;
        };
        Slider.prototype.handleFocus = function handleFocus() {
            this.on(this.bar.el_.ownerDocument, 'keydown', this.handleKeyPress);
        };
        Slider.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 37 || event.which === 40) {
                event.preventDefault();
                this.stepBack();
            } else if (event.which === 38 || event.which === 39) {
                event.preventDefault();
                this.stepForward();
            }
        };
        Slider.prototype.handleBlur = function handleBlur() {
            this.off(this.bar.el_.ownerDocument, 'keydown', this.handleKeyPress);
        };
        Slider.prototype.handleClick = function handleClick(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        };
        Slider.prototype.vertical = function vertical(bool) {
            if (bool === undefined) {
                return this.vertical_ || false;
            }
            this.vertical_ = !!bool;
            if (this.vertical_) {
                this.addClass('vjs-slider-vertical');
            } else {
                this.addClass('vjs-slider-horizontal');
            }
        };
        return Slider;
    }(Component);
    Component.registerComponent('Slider', Slider);
    var LoadProgressBar = function(_Component) {
        inherits(LoadProgressBar, _Component);

        function LoadProgressBar(player, options) {
            classCallCheck(this, LoadProgressBar);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.partEls_ = [];
            _this.on(player, 'progress', _this.update);
            return _this;
        }
        LoadProgressBar.prototype.createEl = function createEl$$1() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-load-progress',
                innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Loaded') + '</span>: 0%</span>'
            });
        };
        LoadProgressBar.prototype.dispose = function dispose() {
            this.partEls_ = null;
            _Component.prototype.dispose.call(this);
        };
        LoadProgressBar.prototype.update = function update(event) {
            var buffered = this.player_.buffered();
            var duration = this.player_.duration();
            var bufferedEnd = this.player_.bufferedEnd();
            var children = this.partEls_;
            var percentify = function percentify(time, end) {
                var percent = time / end || 0;
                return (percent >= 1 ? 1 : percent) * 100 + '%';
            };
            this.el_.style.width = percentify(bufferedEnd, duration);
            for (var i = 0; i < buffered.length; i++) {
                var start = buffered.start(i);
                var end = buffered.end(i);
                var part = children[i];
                if (!part) {
                    part = this.el_.appendChild(createEl());
                    children[i] = part;
                }
                part.style.left = percentify(start, bufferedEnd);
                part.style.width = percentify(end - start, bufferedEnd);
            }
            for (var _i = children.length; _i > buffered.length; _i--) {
                this.el_.removeChild(children[_i - 1]);
            }
            children.length = buffered.length;
        };
        return LoadProgressBar;
    }(Component);
    Component.registerComponent('LoadProgressBar', LoadProgressBar);
    var TimeTooltip = function(_Component) {
        inherits(TimeTooltip, _Component);

        function TimeTooltip() {
            classCallCheck(this, TimeTooltip);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        TimeTooltip.prototype.createEl = function createEl$$1() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-time-tooltip'
            });
        };
        TimeTooltip.prototype.update = function update(seekBarRect, seekBarPoint, content) {
            var tooltipRect = getBoundingClientRect(this.el_);
            var playerRect = getBoundingClientRect(this.player_.el());
            var seekBarPointPx = seekBarRect.width * seekBarPoint;
            if (!playerRect || !tooltipRect) {
                return;
            }
            var spaceLeftOfPoint = seekBarRect.left - playerRect.left + seekBarPointPx;
            var spaceRightOfPoint = seekBarRect.width - seekBarPointPx + (playerRect.right - seekBarRect.right);
            var pullTooltipBy = tooltipRect.width / 2;
            if (spaceLeftOfPoint < pullTooltipBy) {
                pullTooltipBy += pullTooltipBy - spaceLeftOfPoint;
            } else if (spaceRightOfPoint < pullTooltipBy) {
                pullTooltipBy = spaceRightOfPoint;
            }
            if (pullTooltipBy < 0) {
                pullTooltipBy = 0;
            } else if (pullTooltipBy > tooltipRect.width) {
                pullTooltipBy = tooltipRect.width;
            }
            this.el_.style.right = '-' + pullTooltipBy + 'px';
            textContent(this.el_, content);
        };
        return TimeTooltip;
    }(Component);
    Component.registerComponent('TimeTooltip', TimeTooltip);
    var PlayProgressBar = function(_Component) {
        inherits(PlayProgressBar, _Component);

        function PlayProgressBar() {
            classCallCheck(this, PlayProgressBar);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        PlayProgressBar.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-play-progress vjs-slider-bar',
                innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Progress') + '</span>: 0%</span>'
            });
        };
        PlayProgressBar.prototype.update = function update(seekBarRect, seekBarPoint) {
            var _this2 = this;
            if (this.rafId_) {
                this.cancelAnimationFrame(this.rafId_);
            }
            this.rafId_ = this.requestAnimationFrame(function() {
                var time = _this2.player_.scrubbing() ? _this2.player_.getCache().currentTime : _this2.player_.currentTime();
                var content = formatTime(time, _this2.player_.duration());
                var timeTooltip = _this2.getChild('timeTooltip');
                if (timeTooltip) {
                    timeTooltip.update(seekBarRect, seekBarPoint, content);
                }
            });
        };
        return PlayProgressBar;
    }(Component);
    PlayProgressBar.prototype.options_ = {
        children: []
    };
    if ((!IE_VERSION || IE_VERSION > 8) && !IS_IOS && !IS_ANDROID) {
        PlayProgressBar.prototype.options_.children.push('timeTooltip');
    }
    Component.registerComponent('PlayProgressBar', PlayProgressBar);
    var MouseTimeDisplay = function(_Component) {
        inherits(MouseTimeDisplay, _Component);

        function MouseTimeDisplay(player, options) {
            classCallCheck(this, MouseTimeDisplay);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.update = throttle(bind(_this, _this.update), 25);
            return _this;
        }
        MouseTimeDisplay.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-mouse-display'
            });
        };
        MouseTimeDisplay.prototype.update = function update(seekBarRect, seekBarPoint) {
            var _this2 = this;
            if (this.rafId_) {
                this.cancelAnimationFrame(this.rafId_);
            }
            this.rafId_ = this.requestAnimationFrame(function() {
                var duration = _this2.player_.duration();
                var content = formatTime(seekBarPoint * duration, duration);
                _this2.el_.style.left = seekBarRect.width * seekBarPoint + 'px';
                _this2.getChild('timeTooltip').update(seekBarRect, seekBarPoint, content);
            });
        };
        return MouseTimeDisplay;
    }(Component);
    MouseTimeDisplay.prototype.options_ = {
        children: ['timeTooltip']
    };
    Component.registerComponent('MouseTimeDisplay', MouseTimeDisplay);
    var STEP_SECONDS = 5;
    var UPDATE_REFRESH_INTERVAL = 30;
    var SeekBar = function(_Slider) {
        inherits(SeekBar, _Slider);

        function SeekBar(player, options) {
            classCallCheck(this, SeekBar);
            var _this = possibleConstructorReturn(this, _Slider.call(this, player, options));
            _this.update = throttle(bind(_this, _this.update), UPDATE_REFRESH_INTERVAL);
            _this.on(player, 'timeupdate', _this.update);
            _this.on(player, 'ended', _this.handleEnded);
            _this.updateInterval = null;
            _this.on(player, ['playing'], function() {
                _this.clearInterval(_this.updateInterval);
                _this.updateInterval = _this.setInterval(function() {
                    _this.requestAnimationFrame(function() {
                        _this.update();
                    });
                }, UPDATE_REFRESH_INTERVAL);
            });
            _this.on(player, ['ended', 'pause', 'waiting'], function() {
                _this.clearInterval(_this.updateInterval);
            });
            _this.on(player, ['timeupdate', 'ended'], _this.update);
            return _this;
        }
        SeekBar.prototype.createEl = function createEl$$1() {
            return _Slider.prototype.createEl.call(this, 'div', {
                className: 'vjs-progress-holder'
            }, {
                'aria-label': this.localize('Progress Bar')
            });
        };
        SeekBar.prototype.update_ = function update_(currentTime, percent) {
            var duration = this.player_.duration();
            this.el_.setAttribute('aria-valuenow', (percent * 100).toFixed(2));
            this.el_.setAttribute('aria-valuetext', this.localize('progress bar timing: currentTime={1} duration={2}', [formatTime(currentTime, duration), formatTime(duration, duration)], '{1} of {2}'));
            this.bar.update(getBoundingClientRect(this.el_), percent);
        };
        SeekBar.prototype.update = function update(event) {
            var percent = _Slider.prototype.update.call(this);
            this.update_(this.getCurrentTime_(), percent);
            return percent;
        };
        SeekBar.prototype.getCurrentTime_ = function getCurrentTime_() {
            return this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
        };
        SeekBar.prototype.handleEnded = function handleEnded(event) {
            this.update_(this.player_.duration(), 1);
        };
        SeekBar.prototype.getPercent = function getPercent() {
            var percent = this.getCurrentTime_() / this.player_.duration();
            return percent >= 1 ? 1 : percent;
        };
        SeekBar.prototype.handleMouseDown = function handleMouseDown(event) {
            if (!isSingleLeftClick(event)) {
                return;
            }
            this.player_.scrubbing(true);
            this.videoWasPlaying = !this.player_.paused();
            this.player_.pause();
            _Slider.prototype.handleMouseDown.call(this, event);
        };
        SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
            if (!isSingleLeftClick(event)) {
                return;
            }
            var newTime = this.calculateDistance(event) * this.player_.duration();
            if (newTime === this.player_.duration()) {
                newTime = newTime - 0.1;
            }
            this.player_.currentTime(newTime);
        };
        SeekBar.prototype.enable = function enable() {
            _Slider.prototype.enable.call(this);
            var mouseTimeDisplay = this.getChild('mouseTimeDisplay');
            if (!mouseTimeDisplay) {
                return;
            }
            mouseTimeDisplay.show();
        };
        SeekBar.prototype.disable = function disable() {
            _Slider.prototype.disable.call(this);
            var mouseTimeDisplay = this.getChild('mouseTimeDisplay');
            if (!mouseTimeDisplay) {
                return;
            }
            mouseTimeDisplay.hide();
        };
        SeekBar.prototype.handleMouseUp = function handleMouseUp(event) {
            _Slider.prototype.handleMouseUp.call(this, event);
            this.player_.scrubbing(false);
            this.player_.trigger({
                type: 'timeupdate',
                target: this,
                manuallyTriggered: true
            });
            if (this.videoWasPlaying) {
                silencePromise(this.player_.play());
            }
        };
        SeekBar.prototype.stepForward = function stepForward() {
            this.player_.currentTime(this.player_.currentTime() + STEP_SECONDS);
        };
        SeekBar.prototype.stepBack = function stepBack() {
            this.player_.currentTime(this.player_.currentTime() - STEP_SECONDS);
        };
        SeekBar.prototype.handleAction = function handleAction(event) {
            if (this.player_.paused()) {
                this.player_.play();
            } else {
                this.player_.pause();
            }
        };
        SeekBar.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 32 || event.which === 13) {
                event.preventDefault();
                this.handleAction(event);
            } else if (_Slider.prototype.handleKeyPress) {
                _Slider.prototype.handleKeyPress.call(this, event);
            }
        };
        return SeekBar;
    }(Slider);
    SeekBar.prototype.options_ = {
        children: ['loadProgressBar', 'playProgressBar'],
        barName: 'playProgressBar'
    };
    if ((!IE_VERSION || IE_VERSION > 8) && !IS_IOS && !IS_ANDROID) {
        SeekBar.prototype.options_.children.splice(1, 0, 'mouseTimeDisplay');
    }
    SeekBar.prototype.playerEvent = 'timeupdate';
    Component.registerComponent('SeekBar', SeekBar);
    var ProgressControl = function(_Component) {
        inherits(ProgressControl, _Component);

        function ProgressControl(player, options) {
            classCallCheck(this, ProgressControl);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.handleMouseMove = throttle(bind(_this, _this.handleMouseMove), 25);
            _this.throttledHandleMouseSeek = throttle(bind(_this, _this.handleMouseSeek), 25);
            _this.enable();
            return _this;
        }
        ProgressControl.prototype.createEl = function createEl$$1() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-progress-control vjs-control'
            });
        };
        ProgressControl.prototype.handleMouseMove = function handleMouseMove(event) {
            var seekBar = this.getChild('seekBar');
            var mouseTimeDisplay = seekBar.getChild('mouseTimeDisplay');
            var seekBarEl = seekBar.el();
            var seekBarRect = getBoundingClientRect(seekBarEl);
            var seekBarPoint = getPointerPosition(seekBarEl, event).x;
            if (seekBarPoint > 1) {
                seekBarPoint = 1;
            } else if (seekBarPoint < 0) {
                seekBarPoint = 0;
            }
            if (mouseTimeDisplay) {
                mouseTimeDisplay.update(seekBarRect, seekBarPoint);
            }
        };
        ProgressControl.prototype.handleMouseSeek = function handleMouseSeek(event) {
            var seekBar = this.getChild('seekBar');
            seekBar.handleMouseMove(event);
        };
        ProgressControl.prototype.enabled = function enabled() {
            return this.enabled_;
        };
        ProgressControl.prototype.disable = function disable() {
            this.children().forEach(function(child) {
                return child.disable && child.disable();
            });
            if (!this.enabled()) {
                return;
            }
            this.off(['mousedown', 'touchstart'], this.handleMouseDown);
            this.off(this.el_, 'mousemove', this.handleMouseMove);
            this.handleMouseUp();
            this.addClass('disabled');
            this.enabled_ = false;
        };
        ProgressControl.prototype.enable = function enable() {
            this.children().forEach(function(child) {
                return child.enable && child.enable();
            });
            if (this.enabled()) {
                return;
            }
            this.on(['mousedown', 'touchstart'], this.handleMouseDown);
            this.on(this.el_, 'mousemove', this.handleMouseMove);
            this.removeClass('disabled');
            this.enabled_ = true;
        };
        ProgressControl.prototype.handleMouseDown = function handleMouseDown(event) {
            var doc = this.el_.ownerDocument;
            this.on(doc, 'mousemove', this.throttledHandleMouseSeek);
            this.on(doc, 'touchmove', this.throttledHandleMouseSeek);
            this.on(doc, 'mouseup', this.handleMouseUp);
            this.on(doc, 'touchend', this.handleMouseUp);
        };
        ProgressControl.prototype.handleMouseUp = function handleMouseUp(event) {
            var doc = this.el_.ownerDocument;
            this.off(doc, 'mousemove', this.throttledHandleMouseSeek);
            this.off(doc, 'touchmove', this.throttledHandleMouseSeek);
            this.off(doc, 'mouseup', this.handleMouseUp);
            this.off(doc, 'touchend', this.handleMouseUp);
        };
        return ProgressControl;
    }(Component);
    ProgressControl.prototype.options_ = {
        children: ['seekBar']
    };
    Component.registerComponent('ProgressControl', ProgressControl);
    var FullscreenToggle = function(_Button) {
        inherits(FullscreenToggle, _Button);

        function FullscreenToggle(player, options) {
            classCallCheck(this, FullscreenToggle);
            var _this = possibleConstructorReturn(this, _Button.call(this, player, options));
            _this.on(player, 'fullscreenchange', _this.handleFullscreenChange);
            return _this;
        }
        FullscreenToggle.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-fullscreen-control ' + _Button.prototype.buildCSSClass.call(this);
        };
        FullscreenToggle.prototype.handleFullscreenChange = function handleFullscreenChange(event) {
            if (this.player_.isFullscreen()) {
                this.controlText('Non-Fullscreen');
            } else {
                this.controlText('Fullscreen');
            }
        };
        FullscreenToggle.prototype.handleClick = function handleClick(event) {
            if (!this.player_.isFullscreen()) {
                this.player_.requestFullscreen();
            } else {
                this.player_.exitFullscreen();
            }
        };
        return FullscreenToggle;
    }(Button);
    FullscreenToggle.prototype.controlText_ = 'Fullscreen';
    Component.registerComponent('FullscreenToggle', FullscreenToggle);
    var checkVolumeSupport = function checkVolumeSupport(self, player) {
        if (player.tech_ && !player.tech_.featuresVolumeControl) {
            self.addClass('vjs-hidden');
        }
        self.on(player, 'loadstart', function() {
            if (!player.tech_.featuresVolumeControl) {
                self.addClass('vjs-hidden');
            } else {
                self.removeClass('vjs-hidden');
            }
        });
    };
    var VolumeLevel = function(_Component) {
        inherits(VolumeLevel, _Component);

        function VolumeLevel() {
            classCallCheck(this, VolumeLevel);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        VolumeLevel.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-volume-level',
                innerHTML: '<span class="vjs-control-text"></span>'
            });
        };
        return VolumeLevel;
    }(Component);
    Component.registerComponent('VolumeLevel', VolumeLevel);
    var VolumeBar = function(_Slider) {
        inherits(VolumeBar, _Slider);

        function VolumeBar(player, options) {
            classCallCheck(this, VolumeBar);
            var _this = possibleConstructorReturn(this, _Slider.call(this, player, options));
            _this.on('slideractive', _this.updateLastVolume_);
            _this.on(player, 'volumechange', _this.updateARIAAttributes);
            player.ready(function() {
                return _this.updateARIAAttributes();
            });
            return _this;
        }
        VolumeBar.prototype.createEl = function createEl$$1() {
            return _Slider.prototype.createEl.call(this, 'div', {
                className: 'vjs-volume-bar vjs-slider-bar'
            }, {
                'aria-label': this.localize('Volume Level'),
                'aria-live': 'polite'
            });
        };
        VolumeBar.prototype.handleMouseDown = function handleMouseDown(event) {
            if (!isSingleLeftClick(event)) {
                return;
            }
            _Slider.prototype.handleMouseDown.call(this, event);
        };
        VolumeBar.prototype.handleMouseMove = function handleMouseMove(event) {
            if (!isSingleLeftClick(event)) {
                return;
            }
            this.checkMuted();
            this.player_.volume(this.calculateDistance(event));
        };
        VolumeBar.prototype.checkMuted = function checkMuted() {
            if (this.player_.muted()) {
                this.player_.muted(false);
            }
        };
        VolumeBar.prototype.getPercent = function getPercent() {
            if (this.player_.muted()) {
                return 0;
            }
            return this.player_.volume();
        };
        VolumeBar.prototype.stepForward = function stepForward() {
            this.checkMuted();
            this.player_.volume(this.player_.volume() + 0.1);
        };
        VolumeBar.prototype.stepBack = function stepBack() {
            this.checkMuted();
            this.player_.volume(this.player_.volume() - 0.1);
        };
        VolumeBar.prototype.updateARIAAttributes = function updateARIAAttributes(event) {
            var ariaValue = this.player_.muted() ? 0 : this.volumeAsPercentage_();
            this.el_.setAttribute('aria-valuenow', ariaValue);
            this.el_.setAttribute('aria-valuetext', ariaValue + '%');
        };
        VolumeBar.prototype.volumeAsPercentage_ = function volumeAsPercentage_() {
            return Math.round(this.player_.volume() * 100);
        };
        VolumeBar.prototype.updateLastVolume_ = function updateLastVolume_() {
            var _this2 = this;
            var volumeBeforeDrag = this.player_.volume();
            this.one('sliderinactive', function() {
                if (_this2.player_.volume() === 0) {
                    _this2.player_.lastVolume_(volumeBeforeDrag);
                }
            });
        };
        return VolumeBar;
    }(Slider);
    VolumeBar.prototype.options_ = {
        children: ['volumeLevel'],
        barName: 'volumeLevel'
    };
    VolumeBar.prototype.playerEvent = 'volumechange';
    Component.registerComponent('VolumeBar', VolumeBar);
    var VolumeControl = function(_Component) {
        inherits(VolumeControl, _Component);

        function VolumeControl(player) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, VolumeControl);
            options.vertical = options.vertical || false;
            if (typeof options.volumeBar === 'undefined' || isPlain(options.volumeBar)) {
                options.volumeBar = options.volumeBar || {};
                options.volumeBar.vertical = options.vertical;
            }
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            checkVolumeSupport(_this, player);
            _this.throttledHandleMouseMove = throttle(bind(_this, _this.handleMouseMove), 25);
            _this.on('mousedown', _this.handleMouseDown);
            _this.on('touchstart', _this.handleMouseDown);
            _this.on(_this.volumeBar, ['focus', 'slideractive'], function() {
                _this.volumeBar.addClass('vjs-slider-active');
                _this.addClass('vjs-slider-active');
                _this.trigger('slideractive');
            });
            _this.on(_this.volumeBar, ['blur', 'sliderinactive'], function() {
                _this.volumeBar.removeClass('vjs-slider-active');
                _this.removeClass('vjs-slider-active');
                _this.trigger('sliderinactive');
            });
            return _this;
        }
        VolumeControl.prototype.createEl = function createEl() {
            var orientationClass = 'vjs-volume-horizontal';
            if (this.options_.vertical) {
                orientationClass = 'vjs-volume-vertical';
            }
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-volume-control vjs-control ' + orientationClass
            });
        };
        VolumeControl.prototype.handleMouseDown = function handleMouseDown(event) {
            var doc = this.el_.ownerDocument;
            this.on(doc, 'mousemove', this.throttledHandleMouseMove);
            this.on(doc, 'touchmove', this.throttledHandleMouseMove);
            this.on(doc, 'mouseup', this.handleMouseUp);
            this.on(doc, 'touchend', this.handleMouseUp);
        };
        VolumeControl.prototype.handleMouseUp = function handleMouseUp(event) {
            var doc = this.el_.ownerDocument;
            this.off(doc, 'mousemove', this.throttledHandleMouseMove);
            this.off(doc, 'touchmove', this.throttledHandleMouseMove);
            this.off(doc, 'mouseup', this.handleMouseUp);
            this.off(doc, 'touchend', this.handleMouseUp);
        };
        VolumeControl.prototype.handleMouseMove = function handleMouseMove(event) {
            this.volumeBar.handleMouseMove(event);
        };
        return VolumeControl;
    }(Component);
    VolumeControl.prototype.options_ = {
        children: ['volumeBar']
    };
    Component.registerComponent('VolumeControl', VolumeControl);
    var MuteToggle = function(_Button) {
        inherits(MuteToggle, _Button);

        function MuteToggle(player, options) {
            classCallCheck(this, MuteToggle);
            var _this = possibleConstructorReturn(this, _Button.call(this, player, options));
            checkVolumeSupport(_this, player);
            _this.on(player, ['loadstart', 'volumechange'], _this.update);
            return _this;
        }
        MuteToggle.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-mute-control ' + _Button.prototype.buildCSSClass.call(this);
        };
        MuteToggle.prototype.handleClick = function handleClick(event) {
            var vol = this.player_.volume();
            var lastVolume = this.player_.lastVolume_();
            if (vol === 0) {
                var volumeToSet = lastVolume < 0.1 ? 0.1 : lastVolume;
                this.player_.volume(volumeToSet);
                this.player_.muted(false);
            } else {
                this.player_.muted(this.player_.muted() ? false : true);
            }
        };
        MuteToggle.prototype.update = function update(event) {
            this.updateIcon_();
            this.updateControlText_();
        };
        MuteToggle.prototype.updateIcon_ = function updateIcon_() {
            var vol = this.player_.volume();
            var level = 3;
            if (vol === 0 || this.player_.muted()) {
                level = 0;
            } else if (vol < 0.33) {
                level = 1;
            } else if (vol < 0.67) {
                level = 2;
            }
            for (var i = 0; i < 4; i++) {
                removeClass(this.el_, 'vjs-vol-' + i);
            }
            addClass(this.el_, 'vjs-vol-' + level);
        };
        MuteToggle.prototype.updateControlText_ = function updateControlText_() {
            var soundOff = this.player_.muted() || this.player_.volume() === 0;
            var text = soundOff ? 'Unmute' : 'Mute';
            if (this.controlText() !== text) {
                this.controlText(text);
            }
        };
        return MuteToggle;
    }(Button);
    MuteToggle.prototype.controlText_ = 'Mute';
    Component.registerComponent('MuteToggle', MuteToggle);
    var VolumePanel = function(_Component) {
        inherits(VolumePanel, _Component);

        function VolumePanel(player) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, VolumePanel);
            if (typeof options.inline !== 'undefined') {
                options.inline = options.inline;
            } else {
                options.inline = true;
            }
            if (typeof options.volumeControl === 'undefined' || isPlain(options.volumeControl)) {
                options.volumeControl = options.volumeControl || {};
                options.volumeControl.vertical = !options.inline;
            }
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            checkVolumeSupport(_this, player);
            _this.on(_this.volumeControl, ['slideractive'], _this.sliderActive_);
            _this.on(_this.volumeControl, ['sliderinactive'], _this.sliderInactive_);
            return _this;
        }
        VolumePanel.prototype.sliderActive_ = function sliderActive_() {
            this.addClass('vjs-slider-active');
        };
        VolumePanel.prototype.sliderInactive_ = function sliderInactive_() {
            this.removeClass('vjs-slider-active');
        };
        VolumePanel.prototype.createEl = function createEl() {
            var orientationClass = 'vjs-volume-panel-horizontal';
            if (!this.options_.inline) {
                orientationClass = 'vjs-volume-panel-vertical';
            }
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-volume-panel vjs-control ' + orientationClass
            });
        };
        return VolumePanel;
    }(Component);
    VolumePanel.prototype.options_ = {
        children: ['muteToggle', 'volumeControl']
    };
    Component.registerComponent('VolumePanel', VolumePanel);
    var Menu = function(_Component) {
        inherits(Menu, _Component);

        function Menu(player, options) {
            classCallCheck(this, Menu);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            if (options) {
                _this.menuButton_ = options.menuButton;
            }
            _this.focusedChild_ = -1;
            _this.on('keydown', _this.handleKeyPress);
            return _this;
        }
        Menu.prototype.addItem = function addItem(component) {
            this.addChild(component);
            component.on('click', bind(this, function(event) {
                if (this.menuButton_) {
                    this.menuButton_.unpressButton();
                    if (component.name() !== 'CaptionSettingsMenuItem') {
                        this.menuButton_.focus();
                    }
                }
            }));
        };
        Menu.prototype.createEl = function createEl$$1() {
            var contentElType = this.options_.contentElType || 'ul';
            this.contentEl_ = createEl(contentElType, {
                className: 'vjs-menu-content'
            });
            this.contentEl_.setAttribute('role', 'menu');
            var el = _Component.prototype.createEl.call(this, 'div', {
                append: this.contentEl_,
                className: 'vjs-menu'
            });
            el.appendChild(this.contentEl_);
            on(el, 'click', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            });
            return el;
        };
        Menu.prototype.dispose = function dispose() {
            this.contentEl_ = null;
            _Component.prototype.dispose.call(this);
        };
        Menu.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 37 || event.which === 40) {
                event.preventDefault();
                this.stepForward();
            } else if (event.which === 38 || event.which === 39) {
                event.preventDefault();
                this.stepBack();
            }
        };
        Menu.prototype.stepForward = function stepForward() {
            var stepChild = 0;
            if (this.focusedChild_ !== undefined) {
                stepChild = this.focusedChild_ + 1;
            }
            this.focus(stepChild);
        };
        Menu.prototype.stepBack = function stepBack() {
            var stepChild = 0;
            if (this.focusedChild_ !== undefined) {
                stepChild = this.focusedChild_ - 1;
            }
            this.focus(stepChild);
        };
        Menu.prototype.focus = function focus() {
            var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var children = this.children().slice();
            var haveTitle = children.length && children[0].className && /vjs-menu-title/.test(children[0].className);
            if (haveTitle) {
                children.shift();
            }
            if (children.length > 0) {
                if (item < 0) {
                    item = 0;
                } else if (item >= children.length) {
                    item = children.length - 1;
                }
                this.focusedChild_ = item;
                children[item].el_.focus();
            }
        };
        return Menu;
    }(Component);
    Component.registerComponent('Menu', Menu);
    var MenuButton = function(_Component) {
        inherits(MenuButton, _Component);

        function MenuButton(player) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, MenuButton);
            var _this = possibleConstructorReturn(this, _Component.call(this, player, options));
            _this.menuButton_ = new Button(player, options);
            _this.menuButton_.controlText(_this.controlText_);
            _this.menuButton_.el_.setAttribute('aria-haspopup', 'true');
            var buttonClass = Button.prototype.buildCSSClass();
            _this.menuButton_.el_.className = _this.buildCSSClass() + ' ' + buttonClass;
            _this.menuButton_.removeClass('vjs-control');
            _this.addChild(_this.menuButton_);
            _this.update();
            _this.enabled_ = true;
            _this.on(_this.menuButton_, 'tap', _this.handleClick);
            _this.on(_this.menuButton_, 'click', _this.handleClick);
            _this.on(_this.menuButton_, 'focus', _this.handleFocus);
            _this.on(_this.menuButton_, 'blur', _this.handleBlur);
            _this.on('keydown', _this.handleSubmenuKeyPress);
            return _this;
        }
        MenuButton.prototype.update = function update() {
            var menu = this.createMenu();
            if (this.menu) {
                this.menu.dispose();
                this.removeChild(this.menu);
            }
            this.menu = menu;
            this.addChild(menu);
            this.buttonPressed_ = false;
            this.menuButton_.el_.setAttribute('aria-expanded', 'false');
            if (this.items && this.items.length <= this.hideThreshold_) {
                this.hide();
            } else {
                this.show();
            }
        };
        MenuButton.prototype.createMenu = function createMenu() {
            var menu = new Menu(this.player_, {
                menuButton: this
            });
            this.hideThreshold_ = 0;
            if (this.options_.title) {
                var title = createEl('li', {
                    className: 'vjs-menu-title',
                    innerHTML: toTitleCase(this.options_.title),
                    tabIndex: -1
                });
                this.hideThreshold_ += 1;
                menu.children_.unshift(title);
                prependTo(title, menu.contentEl());
            }
            this.items = this.createItems();
            if (this.items) {
                for (var i = 0; i < this.items.length; i++) {
                    menu.addItem(this.items[i]);
                }
            }
            return menu;
        };
        MenuButton.prototype.createItems = function createItems() {};
        MenuButton.prototype.createEl = function createEl$$1() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: this.buildWrapperCSSClass()
            }, {});
        };
        MenuButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            var menuButtonClass = 'vjs-menu-button';
            if (this.options_.inline === true) {
                menuButtonClass += '-inline';
            } else {
                menuButtonClass += '-popup';
            }
            var buttonClass = Button.prototype.buildCSSClass();
            return 'vjs-menu-button ' + menuButtonClass + ' ' + buttonClass + ' ' + _Component.prototype.buildCSSClass.call(this);
        };
        MenuButton.prototype.buildCSSClass = function buildCSSClass() {
            var menuButtonClass = 'vjs-menu-button';
            if (this.options_.inline === true) {
                menuButtonClass += '-inline';
            } else {
                menuButtonClass += '-popup';
            }
            return 'vjs-menu-button ' + menuButtonClass + ' ' + _Component.prototype.buildCSSClass.call(this);
        };
        MenuButton.prototype.controlText = function controlText(text) {
            var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.menuButton_.el();
            return this.menuButton_.controlText(text, el);
        };
        MenuButton.prototype.handleClick = function handleClick(event) {
            this.one(this.menu.contentEl(), 'mouseleave', bind(this, function(e) {
                this.unpressButton();
                this.el_.blur();
            }));
            if (this.buttonPressed_) {
                this.unpressButton();
            } else {
                this.pressButton();
            }
        };
        MenuButton.prototype.focus = function focus() {
            this.menuButton_.focus();
        };
        MenuButton.prototype.blur = function blur() {
            this.menuButton_.blur();
        };
        MenuButton.prototype.handleFocus = function handleFocus() {
            on(document_1, 'keydown', bind(this, this.handleKeyPress));
        };
        MenuButton.prototype.handleBlur = function handleBlur() {
            off(document_1, 'keydown', bind(this, this.handleKeyPress));
        };
        MenuButton.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 27 || event.which === 9) {
                if (this.buttonPressed_) {
                    this.unpressButton();
                }
                if (event.which !== 9) {
                    event.preventDefault();
                    this.menuButton_.el_.focus();
                }
            } else if (event.which === 38 || event.which === 40) {
                if (!this.buttonPressed_) {
                    this.pressButton();
                    event.preventDefault();
                }
            }
        };
        MenuButton.prototype.handleSubmenuKeyPress = function handleSubmenuKeyPress(event) {
            if (event.which === 27 || event.which === 9) {
                if (this.buttonPressed_) {
                    this.unpressButton();
                }
                if (event.which !== 9) {
                    event.preventDefault();
                    this.menuButton_.el_.focus();
                }
            }
        };
        MenuButton.prototype.pressButton = function pressButton() {
            if (this.enabled_) {
                this.buttonPressed_ = true;
                this.menu.lockShowing();
                this.menuButton_.el_.setAttribute('aria-expanded', 'true');
                if (IS_IOS && isInFrame()) {
                    return;
                }
                this.menu.focus();
            }
        };
        MenuButton.prototype.unpressButton = function unpressButton() {
            if (this.enabled_) {
                this.buttonPressed_ = false;
                this.menu.unlockShowing();
                this.menuButton_.el_.setAttribute('aria-expanded', 'false');
            }
        };
        MenuButton.prototype.disable = function disable() {
            this.unpressButton();
            this.enabled_ = false;
            this.addClass('vjs-disabled');
            this.menuButton_.disable();
        };
        MenuButton.prototype.enable = function enable() {
            this.enabled_ = true;
            this.removeClass('vjs-disabled');
            this.menuButton_.enable();
        };
        return MenuButton;
    }(Component);
    Component.registerComponent('MenuButton', MenuButton);
    var TrackButton = function(_MenuButton) {
        inherits(TrackButton, _MenuButton);

        function TrackButton(player, options) {
            classCallCheck(this, TrackButton);
            var tracks = options.tracks;
            var _this = possibleConstructorReturn(this, _MenuButton.call(this, player, options));
            if (_this.items.length <= 1) {
                _this.hide();
            }
            if (!tracks) {
                return possibleConstructorReturn(_this);
            }
            var updateHandler = bind(_this, _this.update);
            tracks.addEventListener('removetrack', updateHandler);
            tracks.addEventListener('addtrack', updateHandler);
            _this.player_.on('ready', updateHandler);
            _this.player_.on('dispose', function() {
                tracks.removeEventListener('removetrack', updateHandler);
                tracks.removeEventListener('addtrack', updateHandler);
            });
            return _this;
        }
        return TrackButton;
    }(MenuButton);
    Component.registerComponent('TrackButton', TrackButton);
    var MenuItem = function(_ClickableComponent) {
        inherits(MenuItem, _ClickableComponent);

        function MenuItem(player, options) {
            classCallCheck(this, MenuItem);
            var _this = possibleConstructorReturn(this, _ClickableComponent.call(this, player, options));
            _this.selectable = options.selectable;
            _this.selected(options.selected);
            if (_this.selectable) {
                _this.el_.setAttribute('role', 'menuitemcheckbox');
            } else {
                _this.el_.setAttribute('role', 'menuitem');
            }
            return _this;
        }
        MenuItem.prototype.createEl = function createEl(type, props, attrs) {
            this.nonIconControl = true;
            return _ClickableComponent.prototype.createEl.call(this, 'li', assign({
                className: 'vjs-menu-item',
                innerHTML: '<span class="vjs-menu-item-text">' + this.localize(this.options_.label) + '</span>',
                tabIndex: -1
            }, props), attrs);
        };
        MenuItem.prototype.handleClick = function handleClick(event) {
            this.selected(true);
        };
        MenuItem.prototype.selected = function selected(_selected) {
            if (this.selectable) {
                if (_selected) {
                    this.addClass('vjs-selected');
                    this.el_.setAttribute('aria-checked', 'true');
                    this.controlText(', selected');
                } else {
                    this.removeClass('vjs-selected');
                    this.el_.setAttribute('aria-checked', 'false');
                    this.controlText('');
                }
            }
        };
        return MenuItem;
    }(ClickableComponent);
    Component.registerComponent('MenuItem', MenuItem);
    var TextTrackMenuItem = function(_MenuItem) {
        inherits(TextTrackMenuItem, _MenuItem);

        function TextTrackMenuItem(player, options) {
            classCallCheck(this, TextTrackMenuItem);
            var track = options.track;
            var tracks = player.textTracks();
            options.label = track.label || track.language || 'Unknown';
            options.selected = track.mode === 'showing';
            var _this = possibleConstructorReturn(this, _MenuItem.call(this, player, options));
            _this.track = track;
            var changeHandler = function changeHandler() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                _this.handleTracksChange.apply(_this, args);
            };
            var selectedLanguageChangeHandler = function selectedLanguageChangeHandler() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }
                _this.handleSelectedLanguageChange.apply(_this, args);
            };
            player.on(['loadstart', 'texttrackchange'], changeHandler);
            tracks.addEventListener('change', changeHandler);
            tracks.addEventListener('selectedlanguagechange', selectedLanguageChangeHandler);
            _this.on('dispose', function() {
                player.off(['loadstart', 'texttrackchange'], changeHandler);
                tracks.removeEventListener('change', changeHandler);
                tracks.removeEventListener('selectedlanguagechange', selectedLanguageChangeHandler);
            });
            if (tracks.onchange === undefined) {
                var event = void 0;
                _this.on(['tap', 'click'], function() {
                    if (_typeof(window_1.Event) !== 'object') {
                        try {
                            event = new window_1.Event('change');
                        } catch (err) {}
                    }
                    if (!event) {
                        event = document_1.createEvent('Event');
                        event.initEvent('change', true, true);
                    }
                    tracks.dispatchEvent(event);
                });
            }
            _this.handleTracksChange();
            return _this;
        }
        TextTrackMenuItem.prototype.handleClick = function handleClick(event) {
            var kind = this.track.kind;
            var kinds = this.track.kinds;
            var tracks = this.player_.textTracks();
            if (!kinds) {
                kinds = [kind];
            }
            _MenuItem.prototype.handleClick.call(this, event);
            if (!tracks) {
                return;
            }
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (track === this.track && kinds.indexOf(track.kind) > -1) {
                    if (track.mode !== 'showing') {
                        track.mode = 'showing';
                    }
                } else if (track.mode !== 'disabled') {
                    track.mode = 'disabled';
                }
            }
        };
        TextTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
            this.selected(this.track.mode === 'showing');
        };
        TextTrackMenuItem.prototype.handleSelectedLanguageChange = function handleSelectedLanguageChange(event) {
            if (this.track.mode === 'showing') {
                var selectedLanguage = this.player_.cache_.selectedLanguage;
                if (selectedLanguage && selectedLanguage.enabled && selectedLanguage.language === this.track.language && selectedLanguage.kind !== this.track.kind) {
                    return;
                }
                this.player_.cache_.selectedLanguage = {
                    enabled: true,
                    language: this.track.language,
                    kind: this.track.kind
                };
            }
        };
        TextTrackMenuItem.prototype.dispose = function dispose() {
            this.track = null;
            _MenuItem.prototype.dispose.call(this);
        };
        return TextTrackMenuItem;
    }(MenuItem);
    Component.registerComponent('TextTrackMenuItem', TextTrackMenuItem);
    var OffTextTrackMenuItem = function(_TextTrackMenuItem) {
        inherits(OffTextTrackMenuItem, _TextTrackMenuItem);

        function OffTextTrackMenuItem(player, options) {
            classCallCheck(this, OffTextTrackMenuItem);
            options.track = {
                player: player,
                kind: options.kind,
                kinds: options.kinds,
                'default': false,
                mode: 'disabled'
            };
            if (!options.kinds) {
                options.kinds = [options.kind];
            }
            if (options.label) {
                options.track.label = options.label;
            } else {
                options.track.label = options.kinds.join(' and ') + ' off';
            }
            options.selectable = true;
            return possibleConstructorReturn(this, _TextTrackMenuItem.call(this, player, options));
        }
        OffTextTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
            var tracks = this.player().textTracks();
            var selected = true;
            for (var i = 0, l = tracks.length; i < l; i++) {
                var track = tracks[i];
                if (this.options_.kinds.indexOf(track.kind) > -1 && track.mode === 'showing') {
                    selected = false;
                    break;
                }
            }
            this.selected(selected);
        };
        OffTextTrackMenuItem.prototype.handleSelectedLanguageChange = function handleSelectedLanguageChange(event) {
            var tracks = this.player().textTracks();
            var allHidden = true;
            for (var i = 0, l = tracks.length; i < l; i++) {
                var track = tracks[i];
                if (['captions', 'descriptions', 'subtitles'].indexOf(track.kind) > -1 && track.mode === 'showing') {
                    allHidden = false;
                    break;
                }
            }
            if (allHidden) {
                this.player_.cache_.selectedLanguage = {
                    enabled: false
                };
            }
        };
        return OffTextTrackMenuItem;
    }(TextTrackMenuItem);
    Component.registerComponent('OffTextTrackMenuItem', OffTextTrackMenuItem);
    var TextTrackButton = function(_TrackButton) {
        inherits(TextTrackButton, _TrackButton);

        function TextTrackButton(player) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, TextTrackButton);
            options.tracks = player.textTracks();
            return possibleConstructorReturn(this, _TrackButton.call(this, player, options));
        }
        TextTrackButton.prototype.createItems = function createItems() {
            var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var TrackMenuItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TextTrackMenuItem;
            var label = void 0;
            if (this.label_) {
                label = this.label_ + ' off';
            }
            items.push(new OffTextTrackMenuItem(this.player_, {
                kinds: this.kinds_,
                kind: this.kind_,
                label: label
            }));
            this.hideThreshold_ += 1;
            var tracks = this.player_.textTracks();
            if (!Array.isArray(this.kinds_)) {
                this.kinds_ = [this.kind_];
            }
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (this.kinds_.indexOf(track.kind) > -1) {
                    var item = new TrackMenuItem(this.player_, {
                        track: track,
                        selectable: true
                    });
                    item.addClass('vjs-' + track.kind + '-menu-item');
                    items.push(item);
                }
            }
            return items;
        };
        return TextTrackButton;
    }(TrackButton);
    Component.registerComponent('TextTrackButton', TextTrackButton);
    var ChaptersTrackMenuItem = function(_MenuItem) {
        inherits(ChaptersTrackMenuItem, _MenuItem);

        function ChaptersTrackMenuItem(player, options) {
            classCallCheck(this, ChaptersTrackMenuItem);
            var track = options.track;
            var cue = options.cue;
            var currentTime = player.currentTime();
            options.selectable = true;
            options.label = cue.text;
            options.selected = cue.startTime <= currentTime && currentTime < cue.endTime;
            var _this = possibleConstructorReturn(this, _MenuItem.call(this, player, options));
            _this.track = track;
            _this.cue = cue;
            track.addEventListener('cuechange', bind(_this, _this.update));
            return _this;
        }
        ChaptersTrackMenuItem.prototype.handleClick = function handleClick(event) {
            _MenuItem.prototype.handleClick.call(this);
            this.player_.currentTime(this.cue.startTime);
            this.update(this.cue.startTime);
        };
        ChaptersTrackMenuItem.prototype.update = function update(event) {
            var cue = this.cue;
            var currentTime = this.player_.currentTime();
            this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
        };
        return ChaptersTrackMenuItem;
    }(MenuItem);
    Component.registerComponent('ChaptersTrackMenuItem', ChaptersTrackMenuItem);
    var ChaptersButton = function(_TextTrackButton) {
        inherits(ChaptersButton, _TextTrackButton);

        function ChaptersButton(player, options, ready) {
            classCallCheck(this, ChaptersButton);
            return possibleConstructorReturn(this, _TextTrackButton.call(this, player, options, ready));
        }
        ChaptersButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-chapters-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
        };
        ChaptersButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-chapters-button ' + _TextTrackButton.prototype.buildWrapperCSSClass.call(this);
        };
        ChaptersButton.prototype.update = function update(event) {
            if (!this.track_ || event && (event.type === 'addtrack' || event.type === 'removetrack')) {
                this.setTrack(this.findChaptersTrack());
            }
            _TextTrackButton.prototype.update.call(this);
        };
        ChaptersButton.prototype.setTrack = function setTrack(track) {
            if (this.track_ === track) {
                return;
            }
            if (!this.updateHandler_) {
                this.updateHandler_ = this.update.bind(this);
            }
            if (this.track_) {
                var remoteTextTrackEl = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
                if (remoteTextTrackEl) {
                    remoteTextTrackEl.removeEventListener('load', this.updateHandler_);
                }
                this.track_ = null;
            }
            this.track_ = track;
            if (this.track_) {
                this.track_.mode = 'hidden';
                var _remoteTextTrackEl = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
                if (_remoteTextTrackEl) {
                    _remoteTextTrackEl.addEventListener('load', this.updateHandler_);
                }
            }
        };
        ChaptersButton.prototype.findChaptersTrack = function findChaptersTrack() {
            var tracks = this.player_.textTracks() || [];
            for (var i = tracks.length - 1; i >= 0; i--) {
                var track = tracks[i];
                if (track.kind === this.kind_) {
                    return track;
                }
            }
        };
        ChaptersButton.prototype.getMenuCaption = function getMenuCaption() {
            if (this.track_ && this.track_.label) {
                return this.track_.label;
            }
            return this.localize(toTitleCase(this.kind_));
        };
        ChaptersButton.prototype.createMenu = function createMenu() {
            this.options_.title = this.getMenuCaption();
            return _TextTrackButton.prototype.createMenu.call(this);
        };
        ChaptersButton.prototype.createItems = function createItems() {
            var items = [];
            if (!this.track_) {
                return items;
            }
            var cues = this.track_.cues;
            if (!cues) {
                return items;
            }
            for (var i = 0, l = cues.length; i < l; i++) {
                var cue = cues[i];
                var mi = new ChaptersTrackMenuItem(this.player_, {
                    track: this.track_,
                    cue: cue
                });
                items.push(mi);
            }
            return items;
        };
        return ChaptersButton;
    }(TextTrackButton);
    ChaptersButton.prototype.kind_ = 'chapters';
    ChaptersButton.prototype.controlText_ = 'Chapters';
    Component.registerComponent('ChaptersButton', ChaptersButton);
    var DescriptionsButton = function(_TextTrackButton) {
        inherits(DescriptionsButton, _TextTrackButton);

        function DescriptionsButton(player, options, ready) {
            classCallCheck(this, DescriptionsButton);
            var _this = possibleConstructorReturn(this, _TextTrackButton.call(this, player, options, ready));
            var tracks = player.textTracks();
            var changeHandler = bind(_this, _this.handleTracksChange);
            tracks.addEventListener('change', changeHandler);
            _this.on('dispose', function() {
                tracks.removeEventListener('change', changeHandler);
            });
            return _this;
        }
        DescriptionsButton.prototype.handleTracksChange = function handleTracksChange(event) {
            var tracks = this.player().textTracks();
            var disabled = false;
            for (var i = 0, l = tracks.length; i < l; i++) {
                var track = tracks[i];
                if (track.kind !== this.kind_ && track.mode === 'showing') {
                    disabled = true;
                    break;
                }
            }
            if (disabled) {
                this.disable();
            } else {
                this.enable();
            }
        };
        DescriptionsButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-descriptions-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
        };
        DescriptionsButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-descriptions-button ' + _TextTrackButton.prototype.buildWrapperCSSClass.call(this);
        };
        return DescriptionsButton;
    }(TextTrackButton);
    DescriptionsButton.prototype.kind_ = 'descriptions';
    DescriptionsButton.prototype.controlText_ = 'Descriptions';
    Component.registerComponent('DescriptionsButton', DescriptionsButton);
    var SubtitlesButton = function(_TextTrackButton) {
        inherits(SubtitlesButton, _TextTrackButton);

        function SubtitlesButton(player, options, ready) {
            classCallCheck(this, SubtitlesButton);
            return possibleConstructorReturn(this, _TextTrackButton.call(this, player, options, ready));
        }
        SubtitlesButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-subtitles-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
        };
        SubtitlesButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-subtitles-button ' + _TextTrackButton.prototype.buildWrapperCSSClass.call(this);
        };
        return SubtitlesButton;
    }(TextTrackButton);
    SubtitlesButton.prototype.kind_ = 'subtitles';
    SubtitlesButton.prototype.controlText_ = 'Subtitles';
    Component.registerComponent('SubtitlesButton', SubtitlesButton);
    var CaptionSettingsMenuItem = function(_TextTrackMenuItem) {
        inherits(CaptionSettingsMenuItem, _TextTrackMenuItem);

        function CaptionSettingsMenuItem(player, options) {
            classCallCheck(this, CaptionSettingsMenuItem);
            options.track = {
                player: player,
                kind: options.kind,
                label: options.kind + ' settings',
                selectable: false,
                'default': false,
                mode: 'disabled'
            };
            options.selectable = false;
            options.name = 'CaptionSettingsMenuItem';
            var _this = possibleConstructorReturn(this, _TextTrackMenuItem.call(this, player, options));
            _this.addClass('vjs-texttrack-settings');
            _this.controlText(', opens ' + options.kind + ' settings dialog');
            return _this;
        }
        CaptionSettingsMenuItem.prototype.handleClick = function handleClick(event) {
            this.player().getChild('textTrackSettings').open();
        };
        return CaptionSettingsMenuItem;
    }(TextTrackMenuItem);
    Component.registerComponent('CaptionSettingsMenuItem', CaptionSettingsMenuItem);
    var CaptionsButton = function(_TextTrackButton) {
        inherits(CaptionsButton, _TextTrackButton);

        function CaptionsButton(player, options, ready) {
            classCallCheck(this, CaptionsButton);
            return possibleConstructorReturn(this, _TextTrackButton.call(this, player, options, ready));
        }
        CaptionsButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-captions-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
        };
        CaptionsButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-captions-button ' + _TextTrackButton.prototype.buildWrapperCSSClass.call(this);
        };
        CaptionsButton.prototype.createItems = function createItems() {
            var items = [];
            if (!(this.player().tech_ && this.player().tech_.featuresNativeTextTracks)) {
                items.push(new CaptionSettingsMenuItem(this.player_, {
                    kind: this.kind_
                }));
                this.hideThreshold_ += 1;
            }
            return _TextTrackButton.prototype.createItems.call(this, items);
        };
        return CaptionsButton;
    }(TextTrackButton);
    CaptionsButton.prototype.kind_ = 'captions';
    CaptionsButton.prototype.controlText_ = 'Captions';
    Component.registerComponent('CaptionsButton', CaptionsButton);
    var SubsCapsMenuItem = function(_TextTrackMenuItem) {
        inherits(SubsCapsMenuItem, _TextTrackMenuItem);

        function SubsCapsMenuItem() {
            classCallCheck(this, SubsCapsMenuItem);
            return possibleConstructorReturn(this, _TextTrackMenuItem.apply(this, arguments));
        }
        SubsCapsMenuItem.prototype.createEl = function createEl(type, props, attrs) {
            var innerHTML = '<span class="vjs-menu-item-text">' + this.localize(this.options_.label);
            if (this.options_.track.kind === 'captions') {
                innerHTML += '\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> ' + this.localize('Captions') + '</span>\n      ';
            }
            innerHTML += '</span>';
            var el = _TextTrackMenuItem.prototype.createEl.call(this, type, assign({
                innerHTML: innerHTML
            }, props), attrs);
            return el;
        };
        return SubsCapsMenuItem;
    }(TextTrackMenuItem);
    Component.registerComponent('SubsCapsMenuItem', SubsCapsMenuItem);
    var SubsCapsButton = function(_TextTrackButton) {
        inherits(SubsCapsButton, _TextTrackButton);

        function SubsCapsButton(player) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, SubsCapsButton);
            var _this = possibleConstructorReturn(this, _TextTrackButton.call(this, player, options));
            _this.label_ = 'subtitles';
            if (['en', 'en-us', 'en-ca', 'fr-ca'].indexOf(_this.player_.language_) > -1) {
                _this.label_ = 'captions';
            }
            _this.menuButton_.controlText(toTitleCase(_this.label_));
            return _this;
        }
        SubsCapsButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-subs-caps-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
        };
        SubsCapsButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-subs-caps-button ' + _TextTrackButton.prototype.buildWrapperCSSClass.call(this);
        };
        SubsCapsButton.prototype.createItems = function createItems() {
            var items = [];
            if (!(this.player().tech_ && this.player().tech_.featuresNativeTextTracks)) {
                items.push(new CaptionSettingsMenuItem(this.player_, {
                    kind: this.label_
                }));
                this.hideThreshold_ += 1;
            }
            items = _TextTrackButton.prototype.createItems.call(this, items, SubsCapsMenuItem);
            return items;
        };
        return SubsCapsButton;
    }(TextTrackButton);
    SubsCapsButton.prototype.kinds_ = ['captions', 'subtitles'];
    SubsCapsButton.prototype.controlText_ = 'Subtitles';
    Component.registerComponent('SubsCapsButton', SubsCapsButton);
    var AudioTrackMenuItem = function(_MenuItem) {
        inherits(AudioTrackMenuItem, _MenuItem);

        function AudioTrackMenuItem(player, options) {
            classCallCheck(this, AudioTrackMenuItem);
            var track = options.track;
            var tracks = player.audioTracks();
            options.label = track.label || track.language || 'Unknown';
            options.selected = track.enabled;
            var _this = possibleConstructorReturn(this, _MenuItem.call(this, player, options));
            _this.track = track;
            var changeHandler = function changeHandler() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                _this.handleTracksChange.apply(_this, args);
            };
            tracks.addEventListener('change', changeHandler);
            _this.on('dispose', function() {
                tracks.removeEventListener('change', changeHandler);
            });
            return _this;
        }
        AudioTrackMenuItem.prototype.handleClick = function handleClick(event) {
            var tracks = this.player_.audioTracks();
            _MenuItem.prototype.handleClick.call(this, event);
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.enabled = track === this.track;
            }
        };
        AudioTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
            this.selected(this.track.enabled);
        };
        return AudioTrackMenuItem;
    }(MenuItem);
    Component.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
    var AudioTrackButton = function(_TrackButton) {
        inherits(AudioTrackButton, _TrackButton);

        function AudioTrackButton(player) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, AudioTrackButton);
            options.tracks = player.audioTracks();
            return possibleConstructorReturn(this, _TrackButton.call(this, player, options));
        }
        AudioTrackButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-audio-button ' + _TrackButton.prototype.buildCSSClass.call(this);
        };
        AudioTrackButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-audio-button ' + _TrackButton.prototype.buildWrapperCSSClass.call(this);
        };
        AudioTrackButton.prototype.createItems = function createItems() {
            var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            this.hideThreshold_ = 1;
            var tracks = this.player_.audioTracks();
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                items.push(new AudioTrackMenuItem(this.player_, {
                    track: track,
                    selectable: true
                }));
            }
            return items;
        };
        return AudioTrackButton;
    }(TrackButton);
    AudioTrackButton.prototype.controlText_ = 'Audio Track';
    Component.registerComponent('AudioTrackButton', AudioTrackButton);
    var PlaybackRateMenuItem = function(_MenuItem) {
        inherits(PlaybackRateMenuItem, _MenuItem);

        function PlaybackRateMenuItem(player, options) {
            classCallCheck(this, PlaybackRateMenuItem);
            var label = options.rate;
            var rate = parseFloat(label, 10);
            options.label = label;
            options.selected = rate === 1;
            options.selectable = true;
            var _this = possibleConstructorReturn(this, _MenuItem.call(this, player, options));
            _this.label = label;
            _this.rate = rate;
            _this.on(player, 'ratechange', _this.update);
            return _this;
        }
        PlaybackRateMenuItem.prototype.handleClick = function handleClick(event) {
            _MenuItem.prototype.handleClick.call(this);
            this.player().playbackRate(this.rate);
        };
        PlaybackRateMenuItem.prototype.update = function update(event) {
            this.selected(this.player().playbackRate() === this.rate);
        };
        return PlaybackRateMenuItem;
    }(MenuItem);
    PlaybackRateMenuItem.prototype.contentElType = 'button';
    Component.registerComponent('PlaybackRateMenuItem', PlaybackRateMenuItem);
    var PlaybackRateMenuButton = function(_MenuButton) {
        inherits(PlaybackRateMenuButton, _MenuButton);

        function PlaybackRateMenuButton(player, options) {
            classCallCheck(this, PlaybackRateMenuButton);
            var _this = possibleConstructorReturn(this, _MenuButton.call(this, player, options));
            _this.updateVisibility();
            _this.updateLabel();
            _this.on(player, 'loadstart', _this.updateVisibility);
            _this.on(player, 'ratechange', _this.updateLabel);
            return _this;
        }
        PlaybackRateMenuButton.prototype.createEl = function createEl$$1() {
            var el = _MenuButton.prototype.createEl.call(this);
            this.labelEl_ = createEl('div', {
                className: 'vjs-playback-rate-value',
                innerHTML: '1x'
            });
            el.appendChild(this.labelEl_);
            return el;
        };
        PlaybackRateMenuButton.prototype.dispose = function dispose() {
            this.labelEl_ = null;
            _MenuButton.prototype.dispose.call(this);
        };
        PlaybackRateMenuButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-playback-rate ' + _MenuButton.prototype.buildCSSClass.call(this);
        };
        PlaybackRateMenuButton.prototype.buildWrapperCSSClass = function buildWrapperCSSClass() {
            return 'vjs-playback-rate ' + _MenuButton.prototype.buildWrapperCSSClass.call(this);
        };
        PlaybackRateMenuButton.prototype.createMenu = function createMenu() {
            var menu = new Menu(this.player());
            var rates = this.playbackRates();
            if (rates) {
                for (var i = rates.length - 1; i >= 0; i--) {
                    menu.addChild(new PlaybackRateMenuItem(this.player(), {
                        rate: rates[i] + 'x'
                    }));
                }
            }
            return menu;
        };
        PlaybackRateMenuButton.prototype.updateARIAAttributes = function updateARIAAttributes() {
            this.el().setAttribute('aria-valuenow', this.player().playbackRate());
        };
        PlaybackRateMenuButton.prototype.handleClick = function handleClick(event) {
            var currentRate = this.player().playbackRate();
            var rates = this.playbackRates();
            var newRate = rates[0];
            for (var i = 0; i < rates.length; i++) {
                if (rates[i] > currentRate) {
                    newRate = rates[i];
                    break;
                }
            }
            this.player().playbackRate(newRate);
        };
        PlaybackRateMenuButton.prototype.playbackRates = function playbackRates() {
            return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates;
        };
        PlaybackRateMenuButton.prototype.playbackRateSupported = function playbackRateSupported() {
            return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && this.playbackRates().length > 0;
        };
        PlaybackRateMenuButton.prototype.updateVisibility = function updateVisibility(event) {
            if (this.playbackRateSupported()) {
                this.removeClass('vjs-hidden');
            } else {
                this.addClass('vjs-hidden');
            }
        };
        PlaybackRateMenuButton.prototype.updateLabel = function updateLabel(event) {
            if (this.playbackRateSupported()) {
                this.labelEl_.innerHTML = this.player().playbackRate() + 'x';
            }
        };
        return PlaybackRateMenuButton;
    }(MenuButton);
    PlaybackRateMenuButton.prototype.controlText_ = 'Playback Rate';
    Component.registerComponent('PlaybackRateMenuButton', PlaybackRateMenuButton);
    var Spacer = function(_Component) {
        inherits(Spacer, _Component);

        function Spacer() {
            classCallCheck(this, Spacer);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        Spacer.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-spacer ' + _Component.prototype.buildCSSClass.call(this);
        };
        Spacer.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: this.buildCSSClass()
            });
        };
        return Spacer;
    }(Component);
    Component.registerComponent('Spacer', Spacer);
    var CustomControlSpacer = function(_Spacer) {
        inherits(CustomControlSpacer, _Spacer);

        function CustomControlSpacer() {
            classCallCheck(this, CustomControlSpacer);
            return possibleConstructorReturn(this, _Spacer.apply(this, arguments));
        }
        CustomControlSpacer.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-custom-control-spacer ' + _Spacer.prototype.buildCSSClass.call(this);
        };
        CustomControlSpacer.prototype.createEl = function createEl() {
            var el = _Spacer.prototype.createEl.call(this, {
                className: this.buildCSSClass()
            });
            el.innerHTML = '\xA0';
            return el;
        };
        return CustomControlSpacer;
    }(Spacer);
    Component.registerComponent('CustomControlSpacer', CustomControlSpacer);
    var ControlBar = function(_Component) {
        inherits(ControlBar, _Component);

        function ControlBar() {
            classCallCheck(this, ControlBar);
            return possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        ControlBar.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
                className: 'vjs-control-bar',
                dir: 'ltr'
            }, {
                role: 'group'
            });
        };
        return ControlBar;
    }(Component);
    ControlBar.prototype.options_ = {
        children: ['playToggle', 'volumePanel', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'remainingTimeDisplay', 'customControlSpacer', 'playbackRateMenuButton', 'chaptersButton', 'descriptionsButton', 'subsCapsButton', 'audioTrackButton', 'fullscreenToggle']
    };
    Component.registerComponent('ControlBar', ControlBar);
    var ErrorDisplay = function(_ModalDialog) {
        inherits(ErrorDisplay, _ModalDialog);

        function ErrorDisplay(player, options) {
            classCallCheck(this, ErrorDisplay);
            var _this = possibleConstructorReturn(this, _ModalDialog.call(this, player, options));
            _this.on(player, 'error', _this.open);
            return _this;
        }
        ErrorDisplay.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-error-display ' + _ModalDialog.prototype.buildCSSClass.call(this);
        };
        ErrorDisplay.prototype.content = function content() {
            var error = this.player().error();
            return error ? this.localize(error.message) : '';
        };
        return ErrorDisplay;
    }(ModalDialog);
    ErrorDisplay.prototype.options_ = mergeOptions(ModalDialog.prototype.options_, {
        pauseOnOpen: false,
        fillAlways: true,
        temporary: false,
        uncloseable: true
    });
    Component.registerComponent('ErrorDisplay', ErrorDisplay);
    var LOCAL_STORAGE_KEY = 'vjs-text-track-settings';
    var COLOR_BLACK = ['#000', 'Black'];
    var COLOR_BLUE = ['#00F', 'Blue'];
    var COLOR_CYAN = ['#0FF', 'Cyan'];
    var COLOR_GREEN = ['#0F0', 'Green'];
    var COLOR_MAGENTA = ['#F0F', 'Magenta'];
    var COLOR_RED = ['#F00', 'Red'];
    var COLOR_WHITE = ['#FFF', 'White'];
    var COLOR_YELLOW = ['#FF0', 'Yellow'];
    var OPACITY_OPAQUE = ['1', 'Opaque'];
    var OPACITY_SEMI = ['0.5', 'Semi-Transparent'];
    var OPACITY_TRANS = ['0', 'Transparent'];
    var selectConfigs = {
        backgroundColor: {
            selector: '.vjs-bg-color > select',
            id: 'captions-background-color-%s',
            label: 'Color',
            options: [COLOR_BLACK, COLOR_WHITE, COLOR_RED, COLOR_GREEN, COLOR_BLUE, COLOR_YELLOW, COLOR_MAGENTA, COLOR_CYAN]
        },
        backgroundOpacity: {
            selector: '.vjs-bg-opacity > select',
            id: 'captions-background-opacity-%s',
            label: 'Transparency',
            options: [OPACITY_OPAQUE, OPACITY_SEMI, OPACITY_TRANS]
        },
        color: {
            selector: '.vjs-fg-color > select',
            id: 'captions-foreground-color-%s',
            label: 'Color',
            options: [COLOR_WHITE, COLOR_BLACK, COLOR_RED, COLOR_GREEN, COLOR_BLUE, COLOR_YELLOW, COLOR_MAGENTA, COLOR_CYAN]
        },
        edgeStyle: {
            selector: '.vjs-edge-style > select',
            id: '%s',
            label: 'Text Edge Style',
            options: [
                ['none', 'None'],
                ['raised', 'Raised'],
                ['depressed', 'Depressed'],
                ['uniform', 'Uniform'],
                ['dropshadow', 'Dropshadow']
            ]
        },
        fontFamily: {
            selector: '.vjs-font-family > select',
            id: 'captions-font-family-%s',
            label: 'Font Family',
            options: [
                ['proportionalSansSerif', 'Proportional Sans-Serif'],
                ['monospaceSansSerif', 'Monospace Sans-Serif'],
                ['proportionalSerif', 'Proportional Serif'],
                ['monospaceSerif', 'Monospace Serif'],
                ['casual', 'Casual'],
                ['script', 'Script'],
                ['small-caps', 'Small Caps']
            ]
        },
        fontPercent: {
            selector: '.vjs-font-percent > select',
            id: 'captions-font-size-%s',
            label: 'Font Size',
            options: [
                ['0.50', '50%'],
                ['0.75', '75%'],
                ['1.00', '100%'],
                ['1.25', '125%'],
                ['1.50', '150%'],
                ['1.75', '175%'],
                ['2.00', '200%'],
                ['3.00', '300%'],
                ['4.00', '400%']
            ],
            'default': 2,
            parser: function parser(v) {
                return v === '1.00' ? null : Number(v);
            }
        },
        textOpacity: {
            selector: '.vjs-text-opacity > select',
            id: 'captions-foreground-opacity-%s',
            label: 'Transparency',
            options: [OPACITY_OPAQUE, OPACITY_SEMI]
        },
        windowColor: {
            selector: '.vjs-window-color > select',
            id: 'captions-window-color-%s',
            label: 'Color'
        },
        windowOpacity: {
            selector: '.vjs-window-opacity > select',
            id: 'captions-window-opacity-%s',
            label: 'Transparency',
            options: [OPACITY_TRANS, OPACITY_SEMI, OPACITY_OPAQUE]
        }
    };
    selectConfigs.windowColor.options = selectConfigs.backgroundColor.options;

    function parseOptionValue(value, parser) {
        if (parser) {
            value = parser(value);
        }
        if (value && value !== 'none') {
            return value;
        }
    }

    function getSelectedOptionValue(el, parser) {
        var value = el.options[el.options.selectedIndex].value;
        return parseOptionValue(value, parser);
    }

    function setSelectedOption(el, value, parser) {
        if (!value) {
            return;
        }
        for (var i = 0; i < el.options.length; i++) {
            if (parseOptionValue(el.options[i].value, parser) === value) {
                el.selectedIndex = i;
                break;
            }
        }
    }
    var TextTrackSettings = function(_ModalDialog) {
        inherits(TextTrackSettings, _ModalDialog);

        function TextTrackSettings(player, options) {
            classCallCheck(this, TextTrackSettings);
            options.temporary = false;
            var _this = possibleConstructorReturn(this, _ModalDialog.call(this, player, options));
            _this.updateDisplay = bind(_this, _this.updateDisplay);
            _this.fill();
            _this.hasBeenOpened_ = _this.hasBeenFilled_ = true;
            _this.endDialog = createEl('p', {
                className: 'vjs-control-text',
                textContent: _this.localize('End of dialog window.')
            });
            _this.el().appendChild(_this.endDialog);
            _this.setDefaults();
            if (options.persistTextTrackSettings === undefined) {
                _this.options_.persistTextTrackSettings = _this.options_.playerOptions.persistTextTrackSettings;
            }
            _this.on(_this.$('.vjs-done-button'), 'click', function() {
                _this.saveSettings();
                _this.close();
            });
            _this.on(_this.$('.vjs-default-button'), 'click', function() {
                _this.setDefaults();
                _this.updateDisplay();
            });
            each(selectConfigs, function(config) {
                _this.on(_this.$(config.selector), 'change', _this.updateDisplay);
            });
            if (_this.options_.persistTextTrackSettings) {
                _this.restoreSettings();
            }
            return _this;
        }
        TextTrackSettings.prototype.dispose = function dispose() {
            this.endDialog = null;
            _ModalDialog.prototype.dispose.call(this);
        };
        TextTrackSettings.prototype.createElSelect_ = function createElSelect_(key) {
            var _this2 = this;
            var legendId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'label';
            var config = selectConfigs[key];
            var id = config.id.replace('%s', this.id_);
            return ['<' + type + ' id="' + id + '" class="' + (type === 'label' ? 'vjs-label' : '') + '">', this.localize(config.label), '</' + type + '>', '<select aria-labelledby="' + (legendId !== '' ? legendId + ' ' : '') + id + '">'].concat(config.options.map(function(o) {
                var optionId = id + '-' + o[1];
                return ['<option id="' + optionId + '" value="' + o[0] + '" ', 'aria-labelledby="' + (legendId !== '' ? legendId + ' ' : '') + id + ' ' + optionId + '">', _this2.localize(o[1]), '</option>'].join('');
            })).concat('</select>').join('');
        };
        TextTrackSettings.prototype.createElFgColor_ = function createElFgColor_() {
            var legendId = 'captions-text-legend-' + this.id_;
            return ['<fieldset class="vjs-fg-color vjs-track-setting">', '<legend id="' + legendId + '">', this.localize('Text'), '</legend>', this.createElSelect_('color', legendId), '<span class="vjs-text-opacity vjs-opacity">', this.createElSelect_('textOpacity', legendId), '</span>', '</fieldset>'].join('');
        };
        TextTrackSettings.prototype.createElBgColor_ = function createElBgColor_() {
            var legendId = 'captions-background-' + this.id_;
            return ['<fieldset class="vjs-bg-color vjs-track-setting">', '<legend id="' + legendId + '">', this.localize('Background'), '</legend>', this.createElSelect_('backgroundColor', legendId), '<span class="vjs-bg-opacity vjs-opacity">', this.createElSelect_('backgroundOpacity', legendId), '</span>', '</fieldset>'].join('');
        };
        TextTrackSettings.prototype.createElWinColor_ = function createElWinColor_() {
            var legendId = 'captions-window-' + this.id_;
            return ['<fieldset class="vjs-window-color vjs-track-setting">', '<legend id="' + legendId + '">', this.localize('Window'), '</legend>', this.createElSelect_('windowColor', legendId), '<span class="vjs-window-opacity vjs-opacity">', this.createElSelect_('windowOpacity', legendId), '</span>', '</fieldset>'].join('');
        };
        TextTrackSettings.prototype.createElColors_ = function createElColors_() {
            return createEl('div', {
                className: 'vjs-track-settings-colors',
                innerHTML: [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()].join('')
            });
        };
        TextTrackSettings.prototype.createElFont_ = function createElFont_() {
            return createEl('div', {
                className: 'vjs-track-settings-font">',
                innerHTML: ['<fieldset class="vjs-font-percent vjs-track-setting">', this.createElSelect_('fontPercent', '', 'legend'), '</fieldset>', '<fieldset class="vjs-edge-style vjs-track-setting">', this.createElSelect_('edgeStyle', '', 'legend'), '</fieldset>', '<fieldset class="vjs-font-family vjs-track-setting">', this.createElSelect_('fontFamily', '', 'legend'), '</fieldset>'].join('')
            });
        };
        TextTrackSettings.prototype.createElControls_ = function createElControls_() {
            var defaultsDescription = this.localize('restore all settings to the default values');
            return createEl('div', {
                className: 'vjs-track-settings-controls',
                innerHTML: ['<button class="vjs-default-button" title="' + defaultsDescription + '">', this.localize('Reset'), '<span class="vjs-control-text"> ' + defaultsDescription + '</span>', '</button>', '<button class="vjs-done-button">' + this.localize('Done') + '</button>'].join('')
            });
        };
        TextTrackSettings.prototype.content = function content() {
            return [this.createElColors_(), this.createElFont_(), this.createElControls_()];
        };
        TextTrackSettings.prototype.label = function label() {
            return this.localize('Caption Settings Dialog');
        };
        TextTrackSettings.prototype.description = function description() {
            return this.localize('Beginning of dialog window. Escape will cancel and close the window.');
        };
        TextTrackSettings.prototype.buildCSSClass = function buildCSSClass() {
            return _ModalDialog.prototype.buildCSSClass.call(this) + ' vjs-text-track-settings';
        };
        TextTrackSettings.prototype.getValues = function getValues() {
            var _this3 = this;
            return reduce(selectConfigs, function(accum, config, key) {
                var value = getSelectedOptionValue(_this3.$(config.selector), config.parser);
                if (value !== undefined) {
                    accum[key] = value;
                }
                return accum;
            }, {});
        };
        TextTrackSettings.prototype.setValues = function setValues(values) {
            var _this4 = this;
            each(selectConfigs, function(config, key) {
                setSelectedOption(_this4.$(config.selector), values[key], config.parser);
            });
        };
        TextTrackSettings.prototype.setDefaults = function setDefaults() {
            var _this5 = this;
            each(selectConfigs, function(config) {
                var index = config.hasOwnProperty('default') ? config['default'] : 0;
                _this5.$(config.selector).selectedIndex = index;
            });
        };
        TextTrackSettings.prototype.restoreSettings = function restoreSettings() {
            var values = void 0;
            try {
                values = JSON.parse(window_1.localStorage.getItem(LOCAL_STORAGE_KEY));
            } catch (err) {
                log$1.warn(err);
            }
            if (values) {
                this.setValues(values);
            }
        };
        TextTrackSettings.prototype.saveSettings = function saveSettings() {
            if (!this.options_.persistTextTrackSettings) {
                return;
            }
            var values = this.getValues();
            try {
                if (Object.keys(values).length) {
                    window_1.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
                } else {
                    window_1.localStorage.removeItem(LOCAL_STORAGE_KEY);
                }
            } catch (err) {
                log$1.warn(err);
            }
        };
        TextTrackSettings.prototype.updateDisplay = function updateDisplay() {
            var ttDisplay = this.player_.getChild('textTrackDisplay');
            if (ttDisplay) {
                ttDisplay.updateDisplay();
            }
        };
        TextTrackSettings.prototype.conditionalBlur_ = function conditionalBlur_() {
            this.previouslyActiveEl_ = null;
            this.off(document_1, 'keydown', this.handleKeyDown);
            var cb = this.player_.controlBar;
            var subsCapsBtn = cb && cb.subsCapsButton;
            var ccBtn = cb && cb.captionsButton;
            if (subsCapsBtn) {
                subsCapsBtn.focus();
            } else if (ccBtn) {
                ccBtn.focus();
            }
        };
        return TextTrackSettings;
    }(ModalDialog);
    Component.registerComponent('TextTrackSettings', TextTrackSettings);
    var _templateObject$2 = taggedTemplateLiteralLoose(['Text Tracks are being loaded from another origin but the crossorigin attribute isn\'t used.\n            This may prevent text tracks from loading.'], ['Text Tracks are being loaded from another origin but the crossorigin attribute isn\'t used.\n            This may prevent text tracks from loading.']);
    var Html5 = function(_Tech) {
        inherits(Html5, _Tech);

        function Html5(options, ready) {
            classCallCheck(this, Html5);
            var _this = possibleConstructorReturn(this, _Tech.call(this, options, ready));
            var source = options.source;
            var crossoriginTracks = false;
            if (source && (_this.el_.currentSrc !== source.src || options.tag && options.tag.initNetworkState_ === 3)) {
                _this.setSource(source);
            } else {
                _this.handleLateInit_(_this.el_);
            }
            if (_this.el_.hasChildNodes()) {
                var nodes = _this.el_.childNodes;
                var nodesLength = nodes.length;
                var removeNodes = [];
                while (nodesLength--) {
                    var node = nodes[nodesLength];
                    var nodeName = node.nodeName.toLowerCase();
                    if (nodeName === 'track') {
                        if (!_this.featuresNativeTextTracks) {
                            removeNodes.push(node);
                        } else {
                            _this.remoteTextTrackEls().addTrackElement_(node);
                            _this.remoteTextTracks().addTrack(node.track);
                            _this.textTracks().addTrack(node.track);
                            if (!crossoriginTracks && !_this.el_.hasAttribute('crossorigin') && isCrossOrigin(node.src)) {
                                crossoriginTracks = true;
                            }
                        }
                    }
                }
                for (var i = 0; i < removeNodes.length; i++) {
                    _this.el_.removeChild(removeNodes[i]);
                }
            }
            _this.proxyNativeTracks_();
            if (_this.featuresNativeTextTracks && crossoriginTracks) {
                log$1.warn(tsml(_templateObject$2));
            }
            _this.restoreMetadataTracksInIOSNativePlayer_();
            if ((TOUCH_ENABLED || IS_IPHONE || IS_NATIVE_ANDROID) && options.nativeControlsForTouch === true) {
                _this.setControls(true);
            }
            _this.proxyWebkitFullscreen_();
            _this.triggerReady();
            return _this;
        }
        Html5.prototype.dispose = function dispose() {
            Html5.disposeMediaElement(this.el_);
            this.options_ = null;
            _Tech.prototype.dispose.call(this);
        };
        Html5.prototype.restoreMetadataTracksInIOSNativePlayer_ = function restoreMetadataTracksInIOSNativePlayer_() {
            var textTracks = this.textTracks();
            var metadataTracksPreFullscreenState = void 0;
            var takeMetadataTrackSnapshot = function takeMetadataTrackSnapshot() {
                metadataTracksPreFullscreenState = [];
                for (var i = 0; i < textTracks.length; i++) {
                    var track = textTracks[i];
                    if (track.kind === 'metadata') {
                        metadataTracksPreFullscreenState.push({
                            track: track,
                            storedMode: track.mode
                        });
                    }
                }
            };
            takeMetadataTrackSnapshot();
            textTracks.addEventListener('change', takeMetadataTrackSnapshot);
            this.on('dispose', function() {
                return textTracks.removeEventListener('change', takeMetadataTrackSnapshot);
            });
            var restoreTrackMode = function restoreTrackMode() {
                for (var i = 0; i < metadataTracksPreFullscreenState.length; i++) {
                    var storedTrack = metadataTracksPreFullscreenState[i];
                    if (storedTrack.track.mode === 'disabled' && storedTrack.track.mode !== storedTrack.storedMode) {
                        storedTrack.track.mode = storedTrack.storedMode;
                    }
                }
                textTracks.removeEventListener('change', restoreTrackMode);
            };
            this.on('webkitbeginfullscreen', function() {
                textTracks.removeEventListener('change', takeMetadataTrackSnapshot);
                textTracks.removeEventListener('change', restoreTrackMode);
                textTracks.addEventListener('change', restoreTrackMode);
            });
            this.on('webkitendfullscreen', function() {
                textTracks.removeEventListener('change', takeMetadataTrackSnapshot);
                textTracks.addEventListener('change', takeMetadataTrackSnapshot);
                textTracks.removeEventListener('change', restoreTrackMode);
            });
        };
        Html5.prototype.proxyNativeTracks_ = function proxyNativeTracks_() {
            var _this2 = this;
            NORMAL.names.forEach(function(name) {
                var props = NORMAL[name];
                var elTracks = _this2.el()[props.getterName];
                var techTracks = _this2[props.getterName]();
                if (!_this2['featuresNative' + props.capitalName + 'Tracks'] || !elTracks || !elTracks.addEventListener) {
                    return;
                }
                var listeners = {
                    change: function change(e) {
                        techTracks.trigger({
                            type: 'change',
                            target: techTracks,
                            currentTarget: techTracks,
                            srcElement: techTracks
                        });
                    },
                    addtrack: function addtrack(e) {
                        techTracks.addTrack(e.track);
                    },
                    removetrack: function removetrack(e) {
                        techTracks.removeTrack(e.track);
                    }
                };
                var removeOldTracks = function removeOldTracks() {
                    var removeTracks = [];
                    for (var i = 0; i < techTracks.length; i++) {
                        var found = false;
                        for (var j = 0; j < elTracks.length; j++) {
                            if (elTracks[j] === techTracks[i]) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            removeTracks.push(techTracks[i]);
                        }
                    }
                    while (removeTracks.length) {
                        techTracks.removeTrack(removeTracks.shift());
                    }
                };
                Object.keys(listeners).forEach(function(eventName) {
                    var listener = listeners[eventName];
                    elTracks.addEventListener(eventName, listener);
                    _this2.on('dispose', function(e) {
                        return elTracks.removeEventListener(eventName, listener);
                    });
                });
                _this2.on('loadstart', removeOldTracks);
                _this2.on('dispose', function(e) {
                    return _this2.off('loadstart', removeOldTracks);
                });
            });
        };
        Html5.prototype.createEl = function createEl$$1() {
            var el = this.options_.tag;
            if (!el || !(this.options_.playerElIngest || this.movingMediaElementInDOM)) {
                if (el) {
                    var clone = el.cloneNode(true);
                    if (el.parentNode) {
                        el.parentNode.insertBefore(clone, el);
                    }
                    Html5.disposeMediaElement(el);
                    el = clone;
                } else {
                    el = document_1.createElement('video');
                    var tagAttributes = this.options_.tag && getAttributes(this.options_.tag);
                    var attributes = mergeOptions({}, tagAttributes);
                    if (!TOUCH_ENABLED || this.options_.nativeControlsForTouch !== true) {
                        delete attributes.controls;
                    }
                    setAttributes(el, assign(attributes, {
                        id: this.options_.techId,
                        'class': 'vjs-tech'
                    }));
                }
                el.playerId = this.options_.playerId;
            }
            if (typeof this.options_.preload !== 'undefined') {
                setAttribute(el, 'preload', this.options_.preload);
            }
            var settingsAttrs = ['loop', 'muted', 'playsinline', 'autoplay'];
            for (var i = 0; i < settingsAttrs.length; i++) {
                var attr = settingsAttrs[i];
                var value = this.options_[attr];
                if (typeof value !== 'undefined') {
                    if (value) {
                        setAttribute(el, attr, attr);
                    } else {
                        removeAttribute(el, attr);
                    }
                    el[attr] = value;
                }
            }
            return el;
        };
        Html5.prototype.handleLateInit_ = function handleLateInit_(el) {
            if (el.networkState === 0 || el.networkState === 3) {
                return;
            }
            if (el.readyState === 0) {
                var loadstartFired = false;
                var setLoadstartFired = function setLoadstartFired() {
                    loadstartFired = true;
                };
                this.on('loadstart', setLoadstartFired);
                var triggerLoadstart = function triggerLoadstart() {
                    if (!loadstartFired) {
                        this.trigger('loadstart');
                    }
                };
                this.on('loadedmetadata', triggerLoadstart);
                this.ready(function() {
                    this.off('loadstart', setLoadstartFired);
                    this.off('loadedmetadata', triggerLoadstart);
                    if (!loadstartFired) {
                        this.trigger('loadstart');
                    }
                });
                return;
            }
            var eventsToTrigger = ['loadstart'];
            eventsToTrigger.push('loadedmetadata');
            if (el.readyState >= 2) {
                eventsToTrigger.push('loadeddata');
            }
            if (el.readyState >= 3) {
                eventsToTrigger.push('canplay');
            }
            if (el.readyState >= 4) {
                eventsToTrigger.push('canplaythrough');
            }
            this.ready(function() {
                eventsToTrigger.forEach(function(type) {
                    this.trigger(type);
                }, this);
            });
        };
        Html5.prototype.setCurrentTime = function setCurrentTime(seconds) {
            try {
                this.el_.currentTime = seconds;
            } catch (e) {
                log$1(e, 'Video is not ready. (Video.js)');
            }
        };
        Html5.prototype.duration = function duration() {
            var _this3 = this;
            if (this.el_.duration === Infinity && IS_ANDROID && IS_CHROME && this.el_.currentTime === 0) {
                var checkProgress = function checkProgress() {
                    if (_this3.el_.currentTime > 0) {
                        if (_this3.el_.duration === Infinity) {
                            _this3.trigger('durationchange');
                        }
                        _this3.off('timeupdate', checkProgress);
                    }
                };
                this.on('timeupdate', checkProgress);
                return NaN;
            }
            return this.el_.duration || NaN;
        };
        Html5.prototype.width = function width() {
            return this.el_.offsetWidth;
        };
        Html5.prototype.height = function height() {
            return this.el_.offsetHeight;
        };
        Html5.prototype.proxyWebkitFullscreen_ = function proxyWebkitFullscreen_() {
            var _this4 = this;
            if (!('webkitDisplayingFullscreen' in this.el_)) {
                return;
            }
            var endFn = function endFn() {
                this.trigger('fullscreenchange', {
                    isFullscreen: false
                });
            };
            var beginFn = function beginFn() {
                if ('webkitPresentationMode' in this.el_ && this.el_.webkitPresentationMode !== 'picture-in-picture') {
                    this.one('webkitendfullscreen', endFn);
                    this.trigger('fullscreenchange', {
                        isFullscreen: true
                    });
                }
            };
            this.on('webkitbeginfullscreen', beginFn);
            this.on('dispose', function() {
                _this4.off('webkitbeginfullscreen', beginFn);
                _this4.off('webkitendfullscreen', endFn);
            });
        };
        Html5.prototype.supportsFullScreen = function supportsFullScreen() {
            if (typeof this.el_.webkitEnterFullScreen === 'function') {
                var userAgent = window_1.navigator && window_1.navigator.userAgent || '';
                if (/Android/.test(userAgent) || !/Chrome|Mac OS X 10.5/.test(userAgent)) {
                    return true;
                }
            }
            return false;
        };
        Html5.prototype.enterFullScreen = function enterFullScreen() {
            var video = this.el_;
            if (video.paused && video.networkState <= video.HAVE_METADATA) {
                this.el_.play();
                this.setTimeout(function() {
                    video.pause();
                    video.webkitEnterFullScreen();
                }, 0);
            } else {
                video.webkitEnterFullScreen();
            }
        };
        Html5.prototype.exitFullScreen = function exitFullScreen() {
            this.el_.webkitExitFullScreen();
        };
        Html5.prototype.src = function src(_src) {
            if (_src === undefined) {
                return this.el_.src;
            }
            this.setSrc(_src);
        };
        Html5.prototype.reset = function reset() {
            Html5.resetMediaElement(this.el_);
        };
        Html5.prototype.currentSrc = function currentSrc() {
            if (this.currentSource_) {
                return this.currentSource_.src;
            }
            return this.el_.currentSrc;
        };
        Html5.prototype.setControls = function setControls(val) {
            this.el_.controls = !!val;
        };
        Html5.prototype.addTextTrack = function addTextTrack(kind, label, language) {
            if (!this.featuresNativeTextTracks) {
                return _Tech.prototype.addTextTrack.call(this, kind, label, language);
            }
            return this.el_.addTextTrack(kind, label, language);
        };
        Html5.prototype.createRemoteTextTrack = function createRemoteTextTrack(options) {
            if (!this.featuresNativeTextTracks) {
                return _Tech.prototype.createRemoteTextTrack.call(this, options);
            }
            var htmlTrackElement = document_1.createElement('track');
            if (options.kind) {
                htmlTrackElement.kind = options.kind;
            }
            if (options.label) {
                htmlTrackElement.label = options.label;
            }
            if (options.language || options.srclang) {
                htmlTrackElement.srclang = options.language || options.srclang;
            }
            if (options['default']) {
                htmlTrackElement['default'] = options['default'];
            }
            if (options.id) {
                htmlTrackElement.id = options.id;
            }
            if (options.src) {
                htmlTrackElement.src = options.src;
            }
            return htmlTrackElement;
        };
        Html5.prototype.addRemoteTextTrack = function addRemoteTextTrack(options, manualCleanup) {
            var htmlTrackElement = _Tech.prototype.addRemoteTextTrack.call(this, options, manualCleanup);
            if (this.featuresNativeTextTracks) {
                this.el().appendChild(htmlTrackElement);
            }
            return htmlTrackElement;
        };
        Html5.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
            _Tech.prototype.removeRemoteTextTrack.call(this, track);
            if (this.featuresNativeTextTracks) {
                var tracks = this.$$('track');
                var i = tracks.length;
                while (i--) {
                    if (track === tracks[i] || track === tracks[i].track) {
                        this.el().removeChild(tracks[i]);
                    }
                }
            }
        };
        Html5.prototype.getVideoPlaybackQuality = function getVideoPlaybackQuality() {
            if (typeof this.el().getVideoPlaybackQuality === 'function') {
                return this.el().getVideoPlaybackQuality();
            }
            var videoPlaybackQuality = {};
            if (typeof this.el().webkitDroppedFrameCount !== 'undefined' && typeof this.el().webkitDecodedFrameCount !== 'undefined') {
                videoPlaybackQuality.droppedVideoFrames = this.el().webkitDroppedFrameCount;
                videoPlaybackQuality.totalVideoFrames = this.el().webkitDecodedFrameCount;
            }
            if (window_1.performance && typeof window_1.performance.now === 'function') {
                videoPlaybackQuality.creationTime = window_1.performance.now();
            } else if (window_1.performance && window_1.performance.timing && typeof window_1.performance.timing.navigationStart === 'number') {
                videoPlaybackQuality.creationTime = window_1.Date.now() - window_1.performance.timing.navigationStart;
            }
            return videoPlaybackQuality;
        };
        return Html5;
    }(Tech);
    if (isReal()) {
        Html5.TEST_VID = document_1.createElement('video');
        var track = document_1.createElement('track');
        track.kind = 'captions';
        track.srclang = 'en';
        track.label = 'English';
        Html5.TEST_VID.appendChild(track);
    }
    Html5.isSupported = function() {
        try {
            Html5.TEST_VID.volume = 0.5;
        } catch (e) {
            return false;
        }
        return !!(Html5.TEST_VID && Html5.TEST_VID.canPlayType);
    };
    Html5.canPlayType = function(type) {
        return Html5.TEST_VID.canPlayType(type);
    };
    Html5.canPlaySource = function(srcObj, options) {
        return Html5.canPlayType(srcObj.type);
    };
    Html5.canControlVolume = function() {
        try {
            var volume = Html5.TEST_VID.volume;
            Html5.TEST_VID.volume = volume / 2 + 0.1;
            return volume !== Html5.TEST_VID.volume;
        } catch (e) {
            return false;
        }
    };
    Html5.canControlPlaybackRate = function() {
        if (IS_ANDROID && IS_CHROME && CHROME_VERSION < 58) {
            return false;
        }
        try {
            var playbackRate = Html5.TEST_VID.playbackRate;
            Html5.TEST_VID.playbackRate = playbackRate / 2 + 0.1;
            return playbackRate !== Html5.TEST_VID.playbackRate;
        } catch (e) {
            return false;
        }
    };
    Html5.supportsNativeTextTracks = function() {
        return IS_ANY_SAFARI;
    };
    Html5.supportsNativeVideoTracks = function() {
        return !!(Html5.TEST_VID && Html5.TEST_VID.videoTracks);
    };
    Html5.supportsNativeAudioTracks = function() {
        return !!(Html5.TEST_VID && Html5.TEST_VID.audioTracks);
    };
    Html5.Events = ['loadstart', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'durationchange', 'timeupdate', 'progress', 'play', 'pause', 'ratechange', 'resize', 'volumechange'];
    Html5.prototype.featuresVolumeControl = Html5.canControlVolume();
    Html5.prototype.featuresPlaybackRate = Html5.canControlPlaybackRate();
    Html5.prototype.movingMediaElementInDOM = !IS_IOS;
    Html5.prototype.featuresFullscreenResize = true;
    Html5.prototype.featuresProgressEvents = true;
    Html5.prototype.featuresTimeupdateEvents = true;
    Html5.prototype.featuresNativeTextTracks = Html5.supportsNativeTextTracks();
    Html5.prototype.featuresNativeVideoTracks = Html5.supportsNativeVideoTracks();
    Html5.prototype.featuresNativeAudioTracks = Html5.supportsNativeAudioTracks();
    var canPlayType = Html5.TEST_VID && Html5.TEST_VID.constructor.prototype.canPlayType;
    var mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i;
    var mp4RE = /^video\/mp4/i;
    Html5.patchCanPlayType = function() {
        if (ANDROID_VERSION >= 4.0 && !IS_FIREFOX) {
            Html5.TEST_VID.constructor.prototype.canPlayType = function(type) {
                if (type && mpegurlRE.test(type)) {
                    return 'maybe';
                }
                return canPlayType.call(this, type);
            };
        } else if (IS_OLD_ANDROID) {
            Html5.TEST_VID.constructor.prototype.canPlayType = function(type) {
                if (type && mp4RE.test(type)) {
                    return 'maybe';
                }
                return canPlayType.call(this, type);
            };
        }
    };
    Html5.unpatchCanPlayType = function() {
        var r = Html5.TEST_VID.constructor.prototype.canPlayType;
        Html5.TEST_VID.constructor.prototype.canPlayType = canPlayType;
        return r;
    };
    Html5.patchCanPlayType();
    Html5.disposeMediaElement = function(el) {
        if (!el) {
            return;
        }
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }
        el.removeAttribute('src');
        if (typeof el.load === 'function') {
            (function() {
                try {
                    el.load();
                } catch (e) {}
            })();
        }
    };
    Html5.resetMediaElement = function(el) {
        if (!el) {
            return;
        }
        var sources = el.querySelectorAll('source');
        var i = sources.length;
        while (i--) {
            el.removeChild(sources[i]);
        }
        el.removeAttribute('src');
        if (typeof el.load === 'function') {
            (function() {
                try {
                    el.load();
                } catch (e) {}
            })();
        }
    };
    ['muted', 'defaultMuted', 'autoplay', 'controls', 'loop', 'playsinline'].forEach(function(prop) {
        Html5.prototype[prop] = function() {
            return this.el_[prop] || this.el_.hasAttribute(prop);
        };
    });
    ['muted', 'defaultMuted', 'autoplay', 'loop', 'playsinline'].forEach(function(prop) {
        Html5.prototype['set' + toTitleCase(prop)] = function(v) {
            this.el_[prop] = v;
            if (v) {
                this.el_.setAttribute(prop, prop);
            } else {
                this.el_.removeAttribute(prop);
            }
        };
    });
    ['paused', 'currentTime', 'buffered', 'volume', 'poster', 'preload', 'error', 'seeking', 'seekable', 'ended', 'playbackRate', 'defaultPlaybackRate', 'played', 'networkState', 'readyState', 'videoWidth', 'videoHeight'].forEach(function(prop) {
        Html5.prototype[prop] = function() {
            return this.el_[prop];
        };
    });
    ['volume', 'src', 'poster', 'preload', 'playbackRate', 'defaultPlaybackRate'].forEach(function(prop) {
        Html5.prototype['set' + toTitleCase(prop)] = function(v) {
            this.el_[prop] = v;
        };
    });
    ['pause', 'load', 'play'].forEach(function(prop) {
        Html5.prototype[prop] = function() {
            return this.el_[prop]();
        };
    });
    Tech.withSourceHandlers(Html5);
    Html5.nativeSourceHandler = {};
    Html5.nativeSourceHandler.canPlayType = function(type) {
        try {
            return Html5.TEST_VID.canPlayType(type);
        } catch (e) {
            return '';
        }
    };
    Html5.nativeSourceHandler.canHandleSource = function(source, options) {
        if (source.type) {
            return Html5.nativeSourceHandler.canPlayType(source.type);
        } else if (source.src) {
            var ext = getFileExtension(source.src);
            return Html5.nativeSourceHandler.canPlayType('video/' + ext);
        }
        return '';
    };
    Html5.nativeSourceHandler.handleSource = function(source, tech, options) {
        tech.setSrc(source.src);
    };
    Html5.nativeSourceHandler.dispose = function() {};
    Html5.registerSourceHandler(Html5.nativeSourceHandler);
    Tech.registerTech('Html5', Html5);
    var _templateObject$1 = taggedTemplateLiteralLoose(['\n        Using the tech directly can be dangerous. I hope you know what you\'re doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      '], ['\n        Using the tech directly can be dangerous. I hope you know what you\'re doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      ']);
    var TECH_EVENTS_RETRIGGER = ['progress', 'abort', 'suspend', 'emptied', 'stalled', 'loadedmetadata', 'loadeddata', 'timeupdate', 'ratechange', 'resize', 'volumechange', 'texttrackchange'];
    var Player = function(_Component) {
        inherits(Player, _Component);

        function Player(tag, options, ready) {
            classCallCheck(this, Player);
            tag.id = tag.id || 'vjs_video_' + newGUID();
            options = assign(Player.getTagSettings(tag), options);
            options.initChildren = false;
            options.createEl = false;
            options.evented = false;
            options.reportTouchActivity = false;
            if (!options.language) {
                if (typeof tag.closest === 'function') {
                    var closest = tag.closest('[lang]');
                    if (closest && closest.getAttribute) {
                        options.language = closest.getAttribute('lang');
                    }
                } else {
                    var element = tag;
                    while (element && element.nodeType === 1) {
                        if (getAttributes(element).hasOwnProperty('lang')) {
                            options.language = element.getAttribute('lang');
                            break;
                        }
                        element = element.parentNode;
                    }
                }
            }
            var _this = possibleConstructorReturn(this, _Component.call(this, null, options, ready));
            _this.isReady_ = false;
            _this.hasStarted_ = false;
            _this.userActive_ = false;
            if (!_this.options_ || !_this.options_.techOrder || !_this.options_.techOrder.length) {
                throw new Error('No techOrder specified. Did you overwrite ' + 'videojs.options instead of just changing the ' + 'properties you want to override?');
            }
            _this.tag = tag;
            _this.tagAttributes = tag && getAttributes(tag);
            _this.language(_this.options_.language);
            if (options.languages) {
                var languagesToLower = {};
                Object.getOwnPropertyNames(options.languages).forEach(function(name$$1) {
                    languagesToLower[name$$1.toLowerCase()] = options.languages[name$$1];
                });
                _this.languages_ = languagesToLower;
            } else {
                _this.languages_ = Player.prototype.options_.languages;
            }
            _this.cache_ = {};
            _this.poster_ = options.poster || '';
            _this.controls_ = !!options.controls;
            _this.cache_.lastVolume = 1;
            tag.controls = false;
            tag.removeAttribute('controls');
            _this.scrubbing_ = false;
            _this.el_ = _this.createEl();
            evented(_this, {
                eventBusKey: 'el_'
            });
            var playerOptionsCopy = mergeOptions(_this.options_);
            if (options.plugins) {
                var plugins = options.plugins;
                Object.keys(plugins).forEach(function(name$$1) {
                    if (typeof this[name$$1] === 'function') {
                        this[name$$1](plugins[name$$1]);
                    } else {
                        throw new Error('plugin "' + name$$1 + '" does not exist');
                    }
                }, _this);
            }
            _this.options_.playerOptions = playerOptionsCopy;
            _this.middleware_ = [];
            _this.initChildren();
            _this.isAudio(tag.nodeName.toLowerCase() === 'audio');
            if (_this.controls()) {
                _this.addClass('vjs-controls-enabled');
            } else {
                _this.addClass('vjs-controls-disabled');
            }
            _this.el_.setAttribute('role', 'region');
            if (_this.isAudio()) {
                _this.el_.setAttribute('aria-label', _this.localize('Audio Player'));
            } else {
                _this.el_.setAttribute('aria-label', _this.localize('Video Player'));
            }
            if (_this.isAudio()) {
                _this.addClass('vjs-audio');
            }
            if (_this.flexNotSupported_()) {
                _this.addClass('vjs-no-flex');
            }
            if (!IS_IOS) {
                _this.addClass('vjs-workinghover');
            }
            Player.players[_this.id_] = _this;
            var majorVersion = version.split('.')[0];
            _this.addClass('vjs-v' + majorVersion);
            _this.userActive(true);
            _this.reportUserActivity();
            _this.listenForUserActivity_();
            _this.on('fullscreenchange', _this.handleFullscreenChange_);
            _this.on('stageclick', _this.handleStageClick_);
            _this.changingSrc_ = false;
            _this.playWaitingForReady_ = false;
            _this.playOnLoadstart_ = null;
            _this.forceAutoplayInChrome_();
            return _this;
        }
        Player.prototype.dispose = function dispose() {
            this.trigger('dispose');
            this.off('dispose');
            if (this.styleEl_ && this.styleEl_.parentNode) {
                this.styleEl_.parentNode.removeChild(this.styleEl_);
                this.styleEl_ = null;
            }
            Player.players[this.id_] = null;
            if (this.tag && this.tag.player) {
                this.tag.player = null;
            }
            if (this.el_ && this.el_.player) {
                this.el_.player = null;
            }
            if (this.tech_) {
                this.tech_.dispose();
            }
            if (this.playerElIngest_) {
                this.playerElIngest_ = null;
            }
            if (this.tag) {
                this.tag = null;
            }
            _Component.prototype.dispose.call(this);
        };
        Player.prototype.createEl = function createEl$$1() {
            var tag = this.tag;
            var el = void 0;
            var playerElIngest = this.playerElIngest_ = tag.parentNode && tag.parentNode.hasAttribute && tag.parentNode.hasAttribute('data-vjs-player');
            var divEmbed = this.tag.tagName.toLowerCase() === 'video-js';
            if (playerElIngest) {
                el = this.el_ = tag.parentNode;
            } else if (!divEmbed) {
                el = this.el_ = _Component.prototype.createEl.call(this, 'div');
            }
            var attrs = getAttributes(tag);
            if (divEmbed) {
                el = this.el_ = tag;
                tag = this.tag = document_1.createElement('video');
                while (el.children.length) {
                    tag.appendChild(el.firstChild);
                }
                if (!hasClass(el, 'video-js')) {
                    addClass(el, 'video-js');
                }
                el.appendChild(tag);
                playerElIngest = this.playerElIngest_ = el;
            }
            tag.setAttribute('tabindex', '-1');
            tag.removeAttribute('width');
            tag.removeAttribute('height');
            Object.getOwnPropertyNames(attrs).forEach(function(attr) {
                if (attr === 'class') {
                    el.className += ' ' + attrs[attr];
                    if (divEmbed) {
                        tag.className += ' ' + attrs[attr];
                    }
                } else {
                    el.setAttribute(attr, attrs[attr]);
                    if (divEmbed) {
                        tag.setAttribute(attr, attrs[attr]);
                    }
                }
            });
            tag.playerId = tag.id;
            tag.id += '_html5_api';
            tag.className = 'vjs-tech';
            tag.player = el.player = this;
            this.addClass('vjs-paused');
            if (window_1.VIDEOJS_NO_DYNAMIC_STYLE !== true) {
                this.styleEl_ = createStyleElement('vjs-styles-dimensions');
                var defaultsStyleEl = $('.vjs-styles-defaults');
                var head = $('head');
                head.insertBefore(this.styleEl_, defaultsStyleEl ? defaultsStyleEl.nextSibling : head.firstChild);
            }
            this.width(this.options_.width);
            this.height(this.options_.height);
            this.fluid(this.options_.fluid);
            this.aspectRatio(this.options_.aspectRatio);
            var links = tag.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                var linkEl = links.item(i);
                addClass(linkEl, 'vjs-hidden');
                linkEl.setAttribute('hidden', 'hidden');
            }
            tag.initNetworkState_ = tag.networkState;
            if (tag.parentNode && !playerElIngest) {
                tag.parentNode.insertBefore(el, tag);
            }
            prependTo(tag, el);
            this.children_.unshift(tag);
            this.el_.setAttribute('lang', this.language_);
            this.el_ = el;
            return el;
        };
        Player.prototype.width = function width(value, skipListeners) {
            return this.dimension('width', value, skipListeners);
        };
        Player.prototype.height = function height(value, skipListeners) {
            return this.dimension('height', value, skipListeners);
        };
        Player.prototype.dimension = function dimension(_dimension, value, skipListeners) {
            var privDimension = _dimension + '_';
            if (value === undefined) {
                return this[privDimension] || 0;
            }
            if (value === '') {
                this[privDimension] = undefined;
                this.updateStyleEl_();
                return;
            }
            var parsedVal = parseFloat(value);
            if (isNaN(parsedVal)) {
                log$1.error('Improper value "' + value + '" supplied for for ' + _dimension);
                return;
            }
            this[privDimension] = parsedVal;
            this.updateStyleEl_();
            if (this.isReady_ && !skipListeners) {
                this.trigger('playerresize');
            }
        };
        Player.prototype.fluid = function fluid(bool) {
            if (bool === undefined) {
                return !!this.fluid_;
            }
            this.fluid_ = !!bool;
            if (bool) {
                this.addClass('vjs-fluid');
            } else {
                this.removeClass('vjs-fluid');
            }
            this.updateStyleEl_();
        };
        Player.prototype.aspectRatio = function aspectRatio(ratio) {
            if (ratio === undefined) {
                return this.aspectRatio_;
            }
            if (!/^\d+\:\d+$/.test(ratio)) {
                throw new Error('Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.');
            }
            this.aspectRatio_ = ratio;
            this.fluid(true);
            this.updateStyleEl_();
        };
        Player.prototype.updateStyleEl_ = function updateStyleEl_() {
            if (window_1.VIDEOJS_NO_DYNAMIC_STYLE === true) {
                var _width = typeof this.width_ === 'number' ? this.width_ : this.options_.width;
                var _height = typeof this.height_ === 'number' ? this.height_ : this.options_.height;
                var techEl = this.tech_ && this.tech_.el();
                if (techEl) {
                    if (_width >= 0) {
                        techEl.width = _width;
                    }
                    if (_height >= 0) {
                        techEl.height = _height;
                    }
                }
                return;
            }
            var width = void 0;
            var height = void 0;
            var aspectRatio = void 0;
            var idClass = void 0;
            if (this.aspectRatio_ !== undefined && this.aspectRatio_ !== 'auto') {
                aspectRatio = this.aspectRatio_;
            } else if (this.videoWidth() > 0) {
                aspectRatio = this.videoWidth() + ':' + this.videoHeight();
            } else {
                aspectRatio = '16:9';
            }
            var ratioParts = aspectRatio.split(':');
            var ratioMultiplier = ratioParts[1] / ratioParts[0];
            if (this.width_ !== undefined) {
                width = this.width_;
            } else if (this.height_ !== undefined) {
                width = this.height_ / ratioMultiplier;
            } else {
                width = this.videoWidth() || 300;
            }
            if (this.height_ !== undefined) {
                height = this.height_;
            } else {
                height = width * ratioMultiplier;
            }
            if (/^[^a-zA-Z]/.test(this.id())) {
                idClass = 'dimensions-' + this.id();
            } else {
                idClass = this.id() + '-dimensions';
            }
            this.addClass(idClass);
            setTextContent(this.styleEl_, '\n      .' + idClass + ' {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + idClass + '.vjs-fluid {\n        padding-top: ' + ratioMultiplier * 100 + '%;\n      }\n    ');
        };
        Player.prototype.loadTech_ = function loadTech_(techName, source) {
            var _this2 = this;
            if (this.tech_) {
                this.unloadTech_();
            }
            var titleTechName = toTitleCase(techName);
            var camelTechName = techName.charAt(0).toLowerCase() + techName.slice(1);
            if (titleTechName !== 'Html5' && this.tag) {
                Tech.getTech('Html5').disposeMediaElement(this.tag);
                this.tag.player = null;
                this.tag = null;
            }
            this.techName_ = titleTechName;
            this.isReady_ = false;
            var techOptions = {
                source: source,
                'nativeControlsForTouch': this.options_.nativeControlsForTouch,
                'playerId': this.id(),
                'techId': this.id() + '_' + titleTechName + '_api',
                'autoplay': this.options_.autoplay,
                'playsinline': this.options_.playsinline,
                'preload': this.options_.preload,
                'loop': this.options_.loop,
                'muted': this.options_.muted,
                'poster': this.poster(),
                'language': this.language(),
                'playerElIngest': this.playerElIngest_ || false,
                'vtt.js': this.options_['vtt.js']
            };
            ALL.names.forEach(function(name$$1) {
                var props = ALL[name$$1];
                techOptions[props.getterName] = _this2[props.privateName];
            });
            assign(techOptions, this.options_[titleTechName]);
            assign(techOptions, this.options_[camelTechName]);
            assign(techOptions, this.options_[techName.toLowerCase()]);
            if (this.tag) {
                techOptions.tag = this.tag;
            }
            if (source && source.src === this.cache_.src && this.cache_.currentTime > 0) {
                techOptions.startTime = this.cache_.currentTime;
            }
            var TechClass = Tech.getTech(techName);
            if (!TechClass) {
                throw new Error('No Tech named \'' + titleTechName + '\' exists! \'' + titleTechName + '\' should be registered using videojs.registerTech()\'');
            }
            this.tech_ = new TechClass(techOptions);
            this.tech_.ready(bind(this, this.handleTechReady_), true);
            textTrackConverter.jsonToTextTracks(this.textTracksJson_ || [], this.tech_);
            TECH_EVENTS_RETRIGGER.forEach(function(event) {
                _this2.on(_this2.tech_, event, _this2['handleTech' + toTitleCase(event) + '_']);
            });
            this.on(this.tech_, 'loadstart', this.handleTechLoadStart_);
            this.on(this.tech_, 'waiting', this.handleTechWaiting_);
            this.on(this.tech_, 'canplay', this.handleTechCanPlay_);
            this.on(this.tech_, 'canplaythrough', this.handleTechCanPlayThrough_);
            this.on(this.tech_, 'playing', this.handleTechPlaying_);
            this.on(this.tech_, 'ended', this.handleTechEnded_);
            this.on(this.tech_, 'seeking', this.handleTechSeeking_);
            this.on(this.tech_, 'seeked', this.handleTechSeeked_);
            this.on(this.tech_, 'play', this.handleTechPlay_);
            this.on(this.tech_, 'firstplay', this.handleTechFirstPlay_);
            this.on(this.tech_, 'pause', this.handleTechPause_);
            this.on(this.tech_, 'durationchange', this.handleTechDurationChange_);
            this.on(this.tech_, 'fullscreenchange', this.handleTechFullscreenChange_);
            this.on(this.tech_, 'error', this.handleTechError_);
            this.on(this.tech_, 'loadedmetadata', this.updateStyleEl_);
            this.on(this.tech_, 'posterchange', this.handleTechPosterChange_);
            this.on(this.tech_, 'textdata', this.handleTechTextData_);
            this.usingNativeControls(this.techGet_('controls'));
            if (this.controls() && !this.usingNativeControls()) {
                this.addTechControlsListeners_();
            }
            if (this.tech_.el().parentNode !== this.el() && (titleTechName !== 'Html5' || !this.tag)) {
                prependTo(this.tech_.el(), this.el());
            }
            if (this.tag) {
                this.tag.player = null;
                this.tag = null;
            }
        };
        Player.prototype.unloadTech_ = function unloadTech_() {
            var _this3 = this;
            ALL.names.forEach(function(name$$1) {
                var props = ALL[name$$1];
                _this3[props.privateName] = _this3[props.getterName]();
            });
            this.textTracksJson_ = textTrackConverter.textTracksToJson(this.tech_);
            this.isReady_ = false;
            this.tech_.dispose();
            this.tech_ = false;
        };
        Player.prototype.tech = function tech(safety) {
            if (safety === undefined) {
                log$1.warn(tsml(_templateObject$1));
            }
            return this.tech_;
        };
        Player.prototype.addTechControlsListeners_ = function addTechControlsListeners_() {
            this.removeTechControlsListeners_();
            this.on(this.tech_, 'mousedown', this.handleTechClick_);
            this.on(this.tech_, 'touchstart', this.handleTechTouchStart_);
            this.on(this.tech_, 'touchmove', this.handleTechTouchMove_);
            this.on(this.tech_, 'touchend', this.handleTechTouchEnd_);
            this.on(this.tech_, 'tap', this.handleTechTap_);
        };
        Player.prototype.removeTechControlsListeners_ = function removeTechControlsListeners_() {
            this.off(this.tech_, 'tap', this.handleTechTap_);
            this.off(this.tech_, 'touchstart', this.handleTechTouchStart_);
            this.off(this.tech_, 'touchmove', this.handleTechTouchMove_);
            this.off(this.tech_, 'touchend', this.handleTechTouchEnd_);
            this.off(this.tech_, 'mousedown', this.handleTechClick_);
        };
        Player.prototype.handleTechReady_ = function handleTechReady_() {
            this.triggerReady();
            if (this.cache_.volume) {
                this.techCall_('setVolume', this.cache_.volume);
            }
            this.handleTechPosterChange_();
            this.handleTechDurationChange_();
            if ((this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) {
                try {
                    delete this.tag.poster;
                } catch (e) {
                    log$1('deleting tag.poster throws in some browsers', e);
                }
            }
        };
        Player.prototype.handleTechLoadStart_ = function handleTechLoadStart_() {
            this.removeClass('vjs-ended');
            this.removeClass('vjs-seeking');
            this.error(null);
            if (!this.paused()) {
                this.trigger('loadstart');
                this.trigger('firstplay');
            } else {
                this.hasStarted(false);
                this.trigger('loadstart');
            }
        };
        Player.prototype.hasStarted = function hasStarted(request) {
            if (request === undefined) {
                return this.hasStarted_;
            }
            if (request === this.hasStarted_) {
                return;
            }
            this.hasStarted_ = request;
            if (this.hasStarted_) {
                this.addClass('vjs-has-started');
                this.trigger('firstplay');
            } else {
                this.removeClass('vjs-has-started');
            }
        };
        Player.prototype.handleTechPlay_ = function handleTechPlay_() {
            this.removeClass('vjs-ended');
            this.removeClass('vjs-paused');
            this.addClass('vjs-playing');
            this.hasStarted(true);
            this.trigger('play');
        };
        Player.prototype.handleTechWaiting_ = function handleTechWaiting_() {
            var _this4 = this;
            this.addClass('vjs-waiting');
            this.trigger('waiting');
            this.one('timeupdate', function() {
                return _this4.removeClass('vjs-waiting');
            });
        };
        Player.prototype.handleTechCanPlay_ = function handleTechCanPlay_() {
            this.removeClass('vjs-waiting');
            this.trigger('canplay');
        };
        Player.prototype.handleTechCanPlayThrough_ = function handleTechCanPlayThrough_() {
            this.removeClass('vjs-waiting');
            this.trigger('canplaythrough');
        };
        Player.prototype.handleTechPlaying_ = function handleTechPlaying_() {
            this.removeClass('vjs-waiting');
            this.trigger('playing');
        };
        Player.prototype.handleTechSeeking_ = function handleTechSeeking_() {
            this.addClass('vjs-seeking');
            this.trigger('seeking');
        };
        Player.prototype.handleTechSeeked_ = function handleTechSeeked_() {
            this.removeClass('vjs-seeking');
            this.trigger('seeked');
        };
        Player.prototype.handleTechFirstPlay_ = function handleTechFirstPlay_() {
            if (this.options_.starttime) {
                log$1.warn('Passing the `starttime` option to the player will be deprecated in 6.0');
                this.currentTime(this.options_.starttime);
            }
            this.addClass('vjs-has-started');
            this.trigger('firstplay');
        };
        Player.prototype.handleTechPause_ = function handleTechPause_() {
            this.removeClass('vjs-playing');
            this.addClass('vjs-paused');
            this.trigger('pause');
        };
        Player.prototype.handleTechEnded_ = function handleTechEnded_() {
            this.addClass('vjs-ended');
            if (this.options_.loop) {
                this.currentTime(0);
                this.play();
            } else if (!this.paused()) {
                this.pause();
            }
            this.trigger('ended');
        };
        Player.prototype.handleTechDurationChange_ = function handleTechDurationChange_() {
            this.duration(this.techGet_('duration'));
        };
        Player.prototype.handleTechClick_ = function handleTechClick_(event) {
            if (!isSingleLeftClick(event)) {
                return;
            }
            if (!this.controls_) {
                return;
            }
            if (this.paused()) {
                this.play();
            } else {
                this.pause();
            }
        };
        Player.prototype.handleTechTap_ = function handleTechTap_() {
            this.userActive(!this.userActive());
        };
        Player.prototype.handleTechTouchStart_ = function handleTechTouchStart_() {
            this.userWasActive = this.userActive();
        };
        Player.prototype.handleTechTouchMove_ = function handleTechTouchMove_() {
            if (this.userWasActive) {
                this.reportUserActivity();
            }
        };
        Player.prototype.handleTechTouchEnd_ = function handleTechTouchEnd_(event) {
            event.preventDefault();
        };
        Player.prototype.handleFullscreenChange_ = function handleFullscreenChange_() {
            if (this.isFullscreen()) {
                this.addClass('vjs-fullscreen');
            } else {
                this.removeClass('vjs-fullscreen');
            }
        };
        Player.prototype.handleStageClick_ = function handleStageClick_() {
            this.reportUserActivity();
        };
        Player.prototype.handleTechFullscreenChange_ = function handleTechFullscreenChange_(event, data) {
            if (data) {
                this.isFullscreen(data.isFullscreen);
            }
            this.trigger('fullscreenchange');
        };
        Player.prototype.handleTechError_ = function handleTechError_() {
            var error = this.tech_.error();
            this.error(error);
        };
        Player.prototype.handleTechTextData_ = function handleTechTextData_() {
            var data = null;
            if (arguments.length > 1) {
                data = arguments[1];
            }
            this.trigger('textdata', data);
        };
        Player.prototype.getCache = function getCache() {
            return this.cache_;
        };
        Player.prototype.techCall_ = function techCall_(method, arg) {
            this.ready(function() {
                if (method in allowedSetters) {
                    return set$1(this.middleware_, this.tech_, method, arg);
                }
                try {
                    if (this.tech_) {
                        this.tech_[method](arg);
                    }
                } catch (e) {
                    log$1(e);
                    throw e;
                }
            }, true);
        };
        Player.prototype.techGet_ = function techGet_(method) {
            if (!this.tech_ || !this.tech_.isReady_) {
                return;
            }
            if (method in allowedGetters) {
                return get$1(this.middleware_, this.tech_, method);
            }
            try {
                return this.tech_[method]();
            } catch (e) {
                if (this.tech_[method] === undefined) {
                    log$1('Video.js: ' + method + ' method not defined for ' + this.techName_ + ' playback technology.', e);
                    throw e;
                }
                if (e.name === 'TypeError') {
                    log$1('Video.js: ' + method + ' unavailable on ' + this.techName_ + ' playback technology element.', e);
                    this.tech_.isReady_ = false;
                    throw e;
                }
                log$1(e);
                throw e;
            }
        };
        Player.prototype.play = function play() {
            var _this5 = this;
            if (this.playOnLoadstart_) {
                this.off('loadstart', this.playOnLoadstart_);
            }
            if (!this.isReady_) {
                if (this.playWaitingForReady_) {
                    return;
                }
                this.playWaitingForReady_ = true;
                this.ready(function() {
                    _this5.playWaitingForReady_ = false;
                    silencePromise(_this5.play());
                });
            } else if (!this.changingSrc_ && (this.src() || this.currentSrc())) {
                return this.techGet_('play');
            } else {
                this.playOnLoadstart_ = function() {
                    _this5.playOnLoadstart_ = null;
                    silencePromise(_this5.play());
                };
                this.one('loadstart', this.playOnLoadstart_);
            }
        };
        Player.prototype.pause = function pause() {
            this.techCall_('pause');
        };
        Player.prototype.paused = function paused() {
            return this.techGet_('paused') === false ? false : true;
        };
        Player.prototype.played = function played() {
            return this.techGet_('played') || createTimeRanges(0, 0);
        };
        Player.prototype.scrubbing = function scrubbing(isScrubbing) {
            if (typeof isScrubbing === 'undefined') {
                return this.scrubbing_;
            }
            this.scrubbing_ = !!isScrubbing;
            if (isScrubbing) {
                this.addClass('vjs-scrubbing');
            } else {
                this.removeClass('vjs-scrubbing');
            }
        };
        Player.prototype.currentTime = function currentTime(seconds) {
            if (typeof seconds !== 'undefined') {
                if (seconds < 0) {
                    seconds = 0;
                }
                this.techCall_('setCurrentTime', seconds);
                return;
            }
            this.cache_.currentTime = this.techGet_('currentTime') || 0;
            return this.cache_.currentTime;
        };
        Player.prototype.duration = function duration(seconds) {
            if (seconds === undefined) {
                return this.cache_.duration !== undefined ? this.cache_.duration : NaN;
            }
            seconds = parseFloat(seconds);
            if (seconds < 0) {
                seconds = Infinity;
            }
            if (seconds !== this.cache_.duration) {
                this.cache_.duration = seconds;
                if (seconds === Infinity) {
                    this.addClass('vjs-live');
                } else {
                    this.removeClass('vjs-live');
                }
                this.trigger('durationchange');
            }
        };
        Player.prototype.remainingTime = function remainingTime() {
            return this.duration() - this.currentTime();
        };
        Player.prototype.remainingTimeDisplay = function remainingTimeDisplay() {
            return Math.floor(this.duration()) - Math.floor(this.currentTime());
        };
        Player.prototype.buffered = function buffered() {
            var buffered = this.techGet_('buffered');
            if (!buffered || !buffered.length) {
                buffered = createTimeRanges(0, 0);
            }
            return buffered;
        };
        Player.prototype.bufferedPercent = function bufferedPercent$$1() {
            return bufferedPercent(this.buffered(), this.duration());
        };
        Player.prototype.bufferedEnd = function bufferedEnd() {
            var buffered = this.buffered();
            var duration = this.duration();
            var end = buffered.end(buffered.length - 1);
            if (end > duration) {
                end = duration;
            }
            return end;
        };
        Player.prototype.volume = function volume(percentAsDecimal) {
            var vol = void 0;
            if (percentAsDecimal !== undefined) {
                vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal)));
                this.cache_.volume = vol;
                this.techCall_('setVolume', vol);
                if (vol > 0) {
                    this.lastVolume_(vol);
                }
                return;
            }
            vol = parseFloat(this.techGet_('volume'));
            return isNaN(vol) ? 1 : vol;
        };
        Player.prototype.muted = function muted(_muted) {
            if (_muted !== undefined) {
                this.techCall_('setMuted', _muted);
                return;
            }
            return this.techGet_('muted') || false;
        };
        Player.prototype.defaultMuted = function defaultMuted(_defaultMuted) {
            if (_defaultMuted !== undefined) {
                return this.techCall_('setDefaultMuted', _defaultMuted);
            }
            return this.techGet_('defaultMuted') || false;
        };
        Player.prototype.lastVolume_ = function lastVolume_(percentAsDecimal) {
            if (percentAsDecimal !== undefined && percentAsDecimal !== 0) {
                this.cache_.lastVolume = percentAsDecimal;
                return;
            }
            return this.cache_.lastVolume;
        };
        Player.prototype.supportsFullScreen = function supportsFullScreen() {
            return this.techGet_('supportsFullScreen') || false;
        };
        Player.prototype.isFullscreen = function isFullscreen(isFS) {
            if (isFS !== undefined) {
                this.isFullscreen_ = !!isFS;
                return;
            }
            return !!this.isFullscreen_;
        };
        Player.prototype.requestFullscreen = function requestFullscreen() {
            var fsApi = FullscreenApi;
            this.isFullscreen(true);
            if (fsApi.requestFullscreen) {
                on(document_1, fsApi.fullscreenchange, bind(this, function documentFullscreenChange(e) {
                    this.isFullscreen(document_1[fsApi.fullscreenElement]);
                    if (this.isFullscreen() === false) {
                        off(document_1, fsApi.fullscreenchange, documentFullscreenChange);
                    }
                    this.trigger('fullscreenchange');
                }));
                this.el_[fsApi.requestFullscreen]();
            } else if (this.tech_.supportsFullScreen()) {
                this.techCall_('enterFullScreen');
            } else {
                this.enterFullWindow();
                this.trigger('fullscreenchange');
            }
        };
        Player.prototype.exitFullscreen = function exitFullscreen() {
            var fsApi = FullscreenApi;
            this.isFullscreen(false);
            if (fsApi.requestFullscreen) {
                document_1[fsApi.exitFullscreen]();
            } else if (this.tech_.supportsFullScreen()) {
                this.techCall_('exitFullScreen');
            } else {
                this.exitFullWindow();
                this.trigger('fullscreenchange');
            }
        };
        Player.prototype.enterFullWindow = function enterFullWindow() {
            this.isFullWindow = true;
            this.docOrigOverflow = document_1.documentElement.style.overflow;
            on(document_1, 'keydown', bind(this, this.fullWindowOnEscKey));
            document_1.documentElement.style.overflow = 'hidden';
            addClass(document_1.body, 'vjs-full-window');
            this.trigger('enterFullWindow');
        };
        Player.prototype.fullWindowOnEscKey = function fullWindowOnEscKey(event) {
            if (event.keyCode === 27) {
                if (this.isFullscreen() === true) {
                    this.exitFullscreen();
                } else {
                    this.exitFullWindow();
                }
            }
        };
        Player.prototype.exitFullWindow = function exitFullWindow() {
            this.isFullWindow = false;
            off(document_1, 'keydown', this.fullWindowOnEscKey);
            document_1.documentElement.style.overflow = this.docOrigOverflow;
            removeClass(document_1.body, 'vjs-full-window');
            this.trigger('exitFullWindow');
        };
        Player.prototype.canPlayType = function canPlayType(type) {
            var can = void 0;
            for (var i = 0, j = this.options_.techOrder; i < j.length; i++) {
                var techName = j[i];
                var tech = Tech.getTech(techName);
                if (!tech) {
                    tech = Component.getComponent(techName);
                }
                if (!tech) {
                    log$1.error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
                    continue;
                }
                if (tech.isSupported()) {
                    can = tech.canPlayType(type);
                    if (can) {
                        return can;
                    }
                }
            }
            return '';
        };
        Player.prototype.selectSource = function selectSource(sources) {
            var _this6 = this;
            var techs = this.options_.techOrder.map(function(techName) {
                return [techName, Tech.getTech(techName)];
            }).filter(function(_ref) {
                var techName = _ref[0],
                    tech = _ref[1];
                if (tech) {
                    return tech.isSupported();
                }
                log$1.error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
                return false;
            });
            var findFirstPassingTechSourcePair = function findFirstPassingTechSourcePair(outerArray, innerArray, tester) {
                var found = void 0;
                outerArray.some(function(outerChoice) {
                    return innerArray.some(function(innerChoice) {
                        found = tester(outerChoice, innerChoice);
                        if (found) {
                            return true;
                        }
                    });
                });
                return found;
            };
            var foundSourceAndTech = void 0;
            var flip = function flip(fn) {
                return function(a, b) {
                    return fn(b, a);
                };
            };
            var finder = function finder(_ref2, source) {
                var techName = _ref2[0],
                    tech = _ref2[1];
                if (tech.canPlaySource(source, _this6.options_[techName.toLowerCase()])) {
                    return {
                        source: source,
                        tech: techName
                    };
                }
            };
            if (this.options_.sourceOrder) {
                foundSourceAndTech = findFirstPassingTechSourcePair(sources, techs, flip(finder));
            } else {
                foundSourceAndTech = findFirstPassingTechSourcePair(techs, sources, finder);
            }
            return foundSourceAndTech || false;
        };
        Player.prototype.src = function src(source) {
            var _this7 = this;
            if (typeof source === 'undefined') {
                return this.cache_.src || '';
            }
            var sources = filterSource(source);
            if (!sources.length) {
                this.setTimeout(function() {
                    this.error({
                        code: 4,
                        message: this.localize(this.options_.notSupportedMessage)
                    });
                }, 0);
                return;
            }
            this.cache_.sources = sources;
            this.changingSrc_ = true;
            this.cache_.source = sources[0];
            setSource(this, sources[0], function(middlewareSource, mws) {
                _this7.middleware_ = mws;
                var err = _this7.src_(middlewareSource);
                if (err) {
                    if (sources.length > 1) {
                        return _this7.src(sources.slice(1));
                    }
                    _this7.setTimeout(function() {
                        this.error({
                            code: 4,
                            message: this.localize(this.options_.notSupportedMessage)
                        });
                    }, 0);
                    _this7.triggerReady();
                    return;
                }
                _this7.changingSrc_ = false;
                _this7.cache_.src = middlewareSource.src;
                setTech(mws, _this7.tech_);
            });
        };
        Player.prototype.src_ = function src_(source) {
            var sourceTech = this.selectSource([source]);
            if (!sourceTech) {
                return true;
            }
            if (!titleCaseEquals(sourceTech.tech, this.techName_)) {
                this.changingSrc_ = true;
                this.loadTech_(sourceTech.tech, sourceTech.source);
                return false;
            }
            this.ready(function() {
                if (this.tech_.constructor.prototype.hasOwnProperty('setSource')) {
                    this.techCall_('setSource', source);
                } else {
                    this.techCall_('src', source.src);
                }
                if (this.options_.preload === 'auto') {
                    this.load();
                }
            }, true);
            return false;
        };
        Player.prototype.load = function load() {
            this.techCall_('load');
        };
        Player.prototype.reset = function reset() {
            this.loadTech_(this.options_.techOrder[0], null);
            this.techCall_('reset');
        };
        Player.prototype.currentSources = function currentSources() {
            var source = this.currentSource();
            var sources = [];
            if (Object.keys(source).length !== 0) {
                sources.push(source);
            }
            return this.cache_.sources || sources;
        };
        Player.prototype.currentSource = function currentSource() {
            return this.cache_.source || {};
        };
        Player.prototype.currentSrc = function currentSrc() {
            return this.currentSource() && this.currentSource().src || '';
        };
        Player.prototype.currentType = function currentType() {
            return this.currentSource() && this.currentSource().type || '';
        };
        Player.prototype.preload = function preload(value) {
            if (value !== undefined) {
                this.techCall_('setPreload', value);
                this.options_.preload = value;
                return;
            }
            return this.techGet_('preload');
        };
        Player.prototype.autoplay = function autoplay(value) {
            if (value !== undefined) {
                this.techCall_('setAutoplay', value);
                this.options_.autoplay = value;
                this.ready(this.forceAutoplayInChrome_);
                return;
            }
            return this.techGet_('autoplay', value);
        };
        Player.prototype.forceAutoplayInChrome_ = function forceAutoplayInChrome_() {
            if (this.paused() && (this.autoplay() || this.options_.autoplay) && IS_CHROME && !IS_ANDROID) {
                this.play();
            }
        };
        Player.prototype.playsinline = function playsinline(value) {
            if (value !== undefined) {
                this.techCall_('setPlaysinline', value);
                this.options_.playsinline = value;
                return this;
            }
            return this.techGet_('playsinline');
        };
        Player.prototype.loop = function loop(value) {
            if (value !== undefined) {
                this.techCall_('setLoop', value);
                this.options_.loop = value;
                return;
            }
            return this.techGet_('loop');
        };
        Player.prototype.poster = function poster(src) {
            if (src === undefined) {
                return this.poster_;
            }
            if (!src) {
                src = '';
            }
            this.poster_ = src;
            this.techCall_('setPoster', src);
            this.trigger('posterchange');
        };
        Player.prototype.handleTechPosterChange_ = function handleTechPosterChange_() {
            if (!this.poster_ && this.tech_ && this.tech_.poster) {
                this.poster_ = this.tech_.poster() || '';
                this.trigger('posterchange');
            }
        };
        Player.prototype.controls = function controls(bool) {
            if (bool === undefined) {
                return !!this.controls_;
            }
            bool = !!bool;
            if (this.controls_ === bool) {
                return;
            }
            this.controls_ = bool;
            if (this.usingNativeControls()) {
                this.techCall_('setControls', bool);
            }
            if (this.controls_) {
                this.removeClass('vjs-controls-disabled');
                this.addClass('vjs-controls-enabled');
                this.trigger('controlsenabled');
                if (!this.usingNativeControls()) {
                    this.addTechControlsListeners_();
                }
            } else {
                this.removeClass('vjs-controls-enabled');
                this.addClass('vjs-controls-disabled');
                this.trigger('controlsdisabled');
                if (!this.usingNativeControls()) {
                    this.removeTechControlsListeners_();
                }
            }
        };
        Player.prototype.usingNativeControls = function usingNativeControls(bool) {
            if (bool === undefined) {
                return !!this.usingNativeControls_;
            }
            bool = !!bool;
            if (this.usingNativeControls_ === bool) {
                return;
            }
            this.usingNativeControls_ = bool;
            if (this.usingNativeControls_) {
                this.addClass('vjs-using-native-controls');
                this.trigger('usingnativecontrols');
            } else {
                this.removeClass('vjs-using-native-controls');
                this.trigger('usingcustomcontrols');
            }
        };
        Player.prototype.error = function error(err) {
            if (err === undefined) {
                return this.error_ || null;
            }
            if (err === null) {
                this.error_ = err;
                this.removeClass('vjs-error');
                if (this.errorDisplay) {
                    this.errorDisplay.close();
                }
                return;
            }
            this.error_ = new MediaError(err);
            this.addClass('vjs-error');
            log$1.error('(CODE:' + this.error_.code + ' ' + MediaError.errorTypes[this.error_.code] + ')', this.error_.message, this.error_);
            this.trigger('error');
            return;
        };
        Player.prototype.reportUserActivity = function reportUserActivity(event) {
            this.userActivity_ = true;
        };
        Player.prototype.userActive = function userActive(bool) {
            if (bool === undefined) {
                return this.userActive_;
            }
            bool = !!bool;
            if (bool === this.userActive_) {
                return;
            }
            this.userActive_ = bool;
            if (this.userActive_) {
                this.userActivity_ = true;
                this.removeClass('vjs-user-inactive');
                this.addClass('vjs-user-active');
                this.trigger('useractive');
                return;
            }
            if (this.tech_) {
                this.tech_.one('mousemove', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
            this.userActivity_ = false;
            this.removeClass('vjs-user-active');
            this.addClass('vjs-user-inactive');
            this.trigger('userinactive');
        };
        Player.prototype.listenForUserActivity_ = function listenForUserActivity_() {
            var mouseInProgress = void 0;
            var lastMoveX = void 0;
            var lastMoveY = void 0;
            var handleActivity = bind(this, this.reportUserActivity);
            var handleMouseMove = function handleMouseMove(e) {
                if (e.screenX !== lastMoveX || e.screenY !== lastMoveY) {
                    lastMoveX = e.screenX;
                    lastMoveY = e.screenY;
                    handleActivity();
                }
            };
            var handleMouseDown = function handleMouseDown() {
                handleActivity();
                this.clearInterval(mouseInProgress);
                mouseInProgress = this.setInterval(handleActivity, 250);
            };
            var handleMouseUp = function handleMouseUp(event) {
                handleActivity();
                this.clearInterval(mouseInProgress);
            };
            this.on('mousedown', handleMouseDown);
            this.on('mousemove', handleMouseMove);
            this.on('mouseup', handleMouseUp);
            this.on('keydown', handleActivity);
            this.on('keyup', handleActivity);
            var inactivityTimeout = void 0;
            this.setInterval(function() {
                if (!this.userActivity_) {
                    return;
                }
                this.userActivity_ = false;
                this.userActive(true);
                this.clearTimeout(inactivityTimeout);
                var timeout = this.options_.inactivityTimeout;
                if (timeout <= 0) {
                    return;
                }
                inactivityTimeout = this.setTimeout(function() {
                    if (!this.userActivity_) {
                        this.userActive(false);
                    }
                }, timeout);
            }, 250);
        };
        Player.prototype.playbackRate = function playbackRate(rate) {
            if (rate !== undefined) {
                this.techCall_('setPlaybackRate', rate);
                return;
            }
            if (this.tech_ && this.tech_.featuresPlaybackRate) {
                return this.techGet_('playbackRate');
            }
            return 1.0;
        };
        Player.prototype.defaultPlaybackRate = function defaultPlaybackRate(rate) {
            if (rate !== undefined) {
                return this.techCall_('setDefaultPlaybackRate', rate);
            }
            if (this.tech_ && this.tech_.featuresPlaybackRate) {
                return this.techGet_('defaultPlaybackRate');
            }
            return 1.0;
        };
        Player.prototype.isAudio = function isAudio(bool) {
            if (bool !== undefined) {
                this.isAudio_ = !!bool;
                return;
            }
            return !!this.isAudio_;
        };
        Player.prototype.addTextTrack = function addTextTrack(kind, label, language) {
            if (this.tech_) {
                return this.tech_.addTextTrack(kind, label, language);
            }
        };
        Player.prototype.addRemoteTextTrack = function addRemoteTextTrack(options, manualCleanup) {
            if (this.tech_) {
                return this.tech_.addRemoteTextTrack(options, manualCleanup);
            }
        };
        Player.prototype.removeRemoteTextTrack = function removeRemoteTextTrack() {
            var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref3$track = _ref3.track,
                track = _ref3$track === undefined ? arguments[0] : _ref3$track;
            if (this.tech_) {
                return this.tech_.removeRemoteTextTrack(track);
            }
        };
        Player.prototype.getVideoPlaybackQuality = function getVideoPlaybackQuality() {
            return this.techGet_('getVideoPlaybackQuality');
        };
        Player.prototype.videoWidth = function videoWidth() {
            return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0;
        };
        Player.prototype.videoHeight = function videoHeight() {
            return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0;
        };
        Player.prototype.language = function language(code) {
            if (code === undefined) {
                return this.language_;
            }
            this.language_ = String(code).toLowerCase();
        };
        Player.prototype.languages = function languages() {
            return mergeOptions(Player.prototype.options_.languages, this.languages_);
        };
        Player.prototype.toJSON = function toJSON() {
            var options = mergeOptions(this.options_);
            var tracks = options.tracks;
            options.tracks = [];
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track = mergeOptions(track);
                track.player = undefined;
                options.tracks[i] = track;
            }
            return options;
        };
        Player.prototype.createModal = function createModal(content, options) {
            var _this8 = this;
            options = options || {};
            options.content = content || '';
            var modal = new ModalDialog(this, options);
            this.addChild(modal);
            modal.on('dispose', function() {
                _this8.removeChild(modal);
            });
            modal.open();
            return modal;
        };
        Player.getTagSettings = function getTagSettings(tag) {
            var baseOptions = {
                sources: [],
                tracks: []
            };
            var tagOptions = getAttributes(tag);
            var dataSetup = tagOptions['data-setup'];
            if (hasClass(tag, 'vjs-fluid')) {
                tagOptions.fluid = true;
            }
            if (dataSetup !== null) {
                var _safeParseTuple = tuple(dataSetup || '{}'),
                    err = _safeParseTuple[0],
                    data = _safeParseTuple[1];
                if (err) {
                    log$1.error(err);
                }
                assign(tagOptions, data);
            }
            assign(baseOptions, tagOptions);
            if (tag.hasChildNodes()) {
                var children = tag.childNodes;
                for (var i = 0, j = children.length; i < j; i++) {
                    var child = children[i];
                    var childName = child.nodeName.toLowerCase();
                    if (childName === 'source') {
                        baseOptions.sources.push(getAttributes(child));
                    } else if (childName === 'track') {
                        baseOptions.tracks.push(getAttributes(child));
                    }
                }
            }
            return baseOptions;
        };
        Player.prototype.flexNotSupported_ = function flexNotSupported_() {
            var elem = document_1.createElement('i');
            return !('flexBasis' in elem.style || 'webkitFlexBasis' in elem.style || 'mozFlexBasis' in elem.style || 'msFlexBasis' in elem.style || 'msFlexOrder' in elem.style);
        };
        return Player;
    }(Component);
    ALL.names.forEach(function(name$$1) {
        var props = ALL[name$$1];
        Player.prototype[props.getterName] = function() {
            if (this.tech_) {
                return this.tech_[props.getterName]();
            }
            this[props.privateName] = this[props.privateName] || new props.ListClass();
            return this[props.privateName];
        };
    });
    Player.players = {};
    var navigator$1 = window_1.navigator;
    Player.prototype.options_ = {
        techOrder: Tech.defaultTechOrder_,
        html5: {},
        flash: {},
        inactivityTimeout: 2000,
        playbackRates: [],
        children: ['mediaLoader', 'posterImage', 'textTrackDisplay', 'loadingSpinner', 'bigPlayButton', 'controlBar', 'errorDisplay', 'textTrackSettings'],
        language: navigator$1 && (navigator$1.languages && navigator$1.languages[0] || navigator$1.userLanguage || navigator$1.language) || 'en',
        languages: {},
        notSupportedMessage: 'No compatible source was found for this media.'
    };
    ['ended', 'seeking', 'seekable', 'networkState', 'readyState'].forEach(function(fn) {
        Player.prototype[fn] = function() {
            return this.techGet_(fn);
        };
    });
    TECH_EVENTS_RETRIGGER.forEach(function(event) {
        Player.prototype['handleTech' + toTitleCase(event) + '_'] = function() {
            return this.trigger(event);
        };
    });
    Component.registerComponent('Player', Player);
    var BASE_PLUGIN_NAME = 'plugin';
    var PLUGIN_CACHE_KEY = 'activePlugins_';
    var pluginStorage = {};
    var pluginExists = function pluginExists(name) {
        return pluginStorage.hasOwnProperty(name);
    };
    var getPlugin = function getPlugin(name) {
        return pluginExists(name) ? pluginStorage[name] : undefined;
    };
    var markPluginAsActive = function markPluginAsActive(player, name) {
        player[PLUGIN_CACHE_KEY] = player[PLUGIN_CACHE_KEY] || {};
        player[PLUGIN_CACHE_KEY][name] = true;
    };
    var triggerSetupEvent = function triggerSetupEvent(player, hash, before) {
        var eventName = (before ? 'before' : '') + 'pluginsetup';
        player.trigger(eventName, hash);
        player.trigger(eventName + ':' + hash.name, hash);
    };
    var createBasicPlugin = function createBasicPlugin(name, plugin) {
        var basicPluginWrapper = function basicPluginWrapper() {
            triggerSetupEvent(this, {
                name: name,
                plugin: plugin,
                instance: null
            }, true);
            var instance = plugin.apply(this, arguments);
            markPluginAsActive(this, name);
            triggerSetupEvent(this, {
                name: name,
                plugin: plugin,
                instance: instance
            });
            return instance;
        };
        Object.keys(plugin).forEach(function(prop) {
            basicPluginWrapper[prop] = plugin[prop];
        });
        return basicPluginWrapper;
    };
    var createPluginFactory = function createPluginFactory(name, PluginSubClass) {
        PluginSubClass.prototype.name = name;
        return function() {
            triggerSetupEvent(this, {
                name: name,
                plugin: PluginSubClass,
                instance: null
            }, true);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            var instance = new(Function.prototype.bind.apply(PluginSubClass, [null].concat([this].concat(args))))();
            this[name] = function() {
                return instance;
            };
            triggerSetupEvent(this, instance.getEventHash());
            return instance;
        };
    };
    var Plugin = function() {
        function Plugin(player) {
            classCallCheck(this, Plugin);
            if (this.constructor === Plugin) {
                throw new Error('Plugin must be sub-classed; not directly instantiated.');
            }
            this.player = player;
            evented(this);
            delete this.trigger;
            stateful(this, this.constructor.defaultState);
            markPluginAsActive(player, this.name);
            this.dispose = bind(this, this.dispose);
            player.on('dispose', this.dispose);
        }
        Plugin.prototype.version = function version() {
            return this.constructor.VERSION;
        };
        Plugin.prototype.getEventHash = function getEventHash() {
            var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            hash.name = this.name;
            hash.plugin = this.constructor;
            hash.instance = this;
            return hash;
        };
        Plugin.prototype.trigger = function trigger$$1(event) {
            var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return trigger(this.eventBusEl_, event, this.getEventHash(hash));
        };
        Plugin.prototype.handleStateChanged = function handleStateChanged(e) {};
        Plugin.prototype.dispose = function dispose() {
            var name = this.name,
                player = this.player;
            this.trigger('dispose');
            this.off();
            player.off('dispose', this.dispose);
            player[PLUGIN_CACHE_KEY][name] = false;
            this.player = this.state = null;
            player[name] = createPluginFactory(name, pluginStorage[name]);
        };
        Plugin.isBasic = function isBasic(plugin) {
            var p = typeof plugin === 'string' ? getPlugin(plugin) : plugin;
            return typeof p === 'function' && !Plugin.prototype.isPrototypeOf(p.prototype);
        };
        Plugin.registerPlugin = function registerPlugin(name, plugin) {
            if (typeof name !== 'string') {
                throw new Error('Illegal plugin name, "' + name + '", must be a string, was ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)) + '.');
            }
            if (pluginExists(name)) {
                log$1.warn('A plugin named "' + name + '" already exists. You may want to avoid re-registering plugins!');
            } else if (Player.prototype.hasOwnProperty(name)) {
                throw new Error('Illegal plugin name, "' + name + '", cannot share a name with an existing player method!');
            }
            if (typeof plugin !== 'function') {
                throw new Error('Illegal plugin for "' + name + '", must be a function, was ' + (typeof plugin === 'undefined' ? 'undefined' : _typeof(plugin)) + '.');
            }
            pluginStorage[name] = plugin;
            if (name !== BASE_PLUGIN_NAME) {
                if (Plugin.isBasic(plugin)) {
                    Player.prototype[name] = createBasicPlugin(name, plugin);
                } else {
                    Player.prototype[name] = createPluginFactory(name, plugin);
                }
            }
            return plugin;
        };
        Plugin.deregisterPlugin = function deregisterPlugin(name) {
            if (name === BASE_PLUGIN_NAME) {
                throw new Error('Cannot de-register base plugin.');
            }
            if (pluginExists(name)) {
                delete pluginStorage[name];
                delete Player.prototype[name];
            }
        };
        Plugin.getPlugins = function getPlugins() {
            var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.keys(pluginStorage);
            var result = void 0;
            names.forEach(function(name) {
                var plugin = getPlugin(name);
                if (plugin) {
                    result = result || {};
                    result[name] = plugin;
                }
            });
            return result;
        };
        Plugin.getPluginVersion = function getPluginVersion(name) {
            var plugin = getPlugin(name);
            return plugin && plugin.VERSION || '';
        };
        return Plugin;
    }();
    Plugin.getPlugin = getPlugin;
    Plugin.BASE_PLUGIN_NAME = BASE_PLUGIN_NAME;
    Plugin.registerPlugin(BASE_PLUGIN_NAME, Plugin);
    Player.prototype.usingPlugin = function(name) {
        return !!this[PLUGIN_CACHE_KEY] && this[PLUGIN_CACHE_KEY][name] === true;
    };
    Player.prototype.hasPlugin = function(name) {
        return !!pluginExists(name);
    };
    var _inherits = function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) {
            subClass.super_ = superClass;
        }
    };
    var extendFn = function extendFn(superClass) {
        var subClassMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var subClass = function subClass() {
            superClass.apply(this, arguments);
        };
        var methods = {};
        if ((typeof subClassMethods === 'undefined' ? 'undefined' : _typeof(subClassMethods)) === 'object') {
            if (subClassMethods.constructor !== Object.prototype.constructor) {
                subClass = subClassMethods.constructor;
            }
            methods = subClassMethods;
        } else if (typeof subClassMethods === 'function') {
            subClass = subClassMethods;
        }
        _inherits(subClass, superClass);
        for (var name in methods) {
            if (methods.hasOwnProperty(name)) {
                subClass.prototype[name] = methods[name];
            }
        }
        return subClass;
    };
    if (typeof HTMLVideoElement === 'undefined' && isReal()) {
        document_1.createElement('video');
        document_1.createElement('audio');
        document_1.createElement('track');
        document_1.createElement('video-js');
    }

    function videojs(id, options, ready) {
        var tag = void 0;
        if (typeof id === 'string') {
            var players = videojs.getPlayers();
            if (id.indexOf('#') === 0) {
                id = id.slice(1);
            }
            if (players[id]) {
                if (options) {
                    log$1.warn('Player "' + id + '" is already initialised. Options will not be applied.');
                }
                if (ready) {
                    players[id].ready(ready);
                }
                return players[id];
            }
            tag = $('#' + id);
        } else {
            tag = id;
        }
        if (!tag || !tag.nodeName) {
            throw new TypeError('The element or ID supplied is not valid. (videojs)');
        }
        if (tag.player || Player.players[tag.playerId]) {
            return tag.player || Player.players[tag.playerId];
        }
        if (isEl(tag) && !document_1.body.contains(tag)) {
            log$1.warn('The element supplied is not included in the DOM');
        }
        options = options || {};
        videojs.hooks('beforesetup').forEach(function(hookFunction) {
            var opts = hookFunction(tag, mergeOptions(options));
            if (!isObject(opts) || Array.isArray(opts)) {
                log$1.error('please return an object in beforesetup hooks');
                return;
            }
            options = mergeOptions(options, opts);
        });
        var PlayerComponent = Component.getComponent('Player');
        var player = new PlayerComponent(tag, options, ready);
        videojs.hooks('setup').forEach(function(hookFunction) {
            return hookFunction(player);
        });
        return player;
    }
    videojs.hooks_ = {};
    videojs.hooks = function(type, fn) {
        videojs.hooks_[type] = videojs.hooks_[type] || [];
        if (fn) {
            videojs.hooks_[type] = videojs.hooks_[type].concat(fn);
        }
        return videojs.hooks_[type];
    };
    videojs.hook = function(type, fn) {
        videojs.hooks(type, fn);
    };
    videojs.hookOnce = function(type, fn) {
        videojs.hooks(type, [].concat(fn).map(function(original) {
            var wrapper = function wrapper() {
                videojs.removeHook(type, wrapper);
                return original.apply(undefined, arguments);
            };
            return wrapper;
        }));
    };
    videojs.removeHook = function(type, fn) {
        var index = videojs.hooks(type).indexOf(fn);
        if (index <= -1) {
            return false;
        }
        videojs.hooks_[type] = videojs.hooks_[type].slice();
        videojs.hooks_[type].splice(index, 1);
        return true;
    };
    if (window_1.VIDEOJS_NO_DYNAMIC_STYLE !== true && isReal()) {
        var style = $('.vjs-styles-defaults');
        if (!style) {
            style = createStyleElement('vjs-styles-defaults');
            var head = $('head');
            if (head) {
                head.insertBefore(style, head.firstChild);
            }
            setTextContent(style, '\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ');
        }
    }
    autoSetupTimeout(1, videojs);
    videojs.VERSION = version;
    videojs.options = Player.prototype.options_;
    videojs.getPlayers = function() {
        return Player.players;
    };
    videojs.players = Player.players;
    videojs.getComponent = Component.getComponent;
    videojs.registerComponent = function(name$$1, comp) {
        if (Tech.isTech(comp)) {
            log$1.warn('The ' + name$$1 + ' tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)');
        }
        Component.registerComponent.call(Component, name$$1, comp);
    };
    videojs.getTech = Tech.getTech;
    videojs.registerTech = Tech.registerTech;
    videojs.use = use;
    videojs.browser = browser;
    videojs.TOUCH_ENABLED = TOUCH_ENABLED;
    videojs.extend = extendFn;
    videojs.mergeOptions = mergeOptions;
    videojs.bind = bind;
    videojs.registerPlugin = Plugin.registerPlugin;
    videojs.plugin = function(name$$1, plugin) {
        log$1.warn('videojs.plugin() is deprecated; use videojs.registerPlugin() instead');
        return Plugin.registerPlugin(name$$1, plugin);
    };
    videojs.getPlugins = Plugin.getPlugins;
    videojs.getPlugin = Plugin.getPlugin;
    videojs.getPluginVersion = Plugin.getPluginVersion;
    videojs.addLanguage = function(code, data) {
        var _mergeOptions;
        code = ('' + code).toLowerCase();
        videojs.options.languages = mergeOptions(videojs.options.languages, (_mergeOptions = {}, _mergeOptions[code] = data, _mergeOptions));
        return videojs.options.languages[code];
    };
    videojs.log = log$1;
    videojs.createTimeRange = videojs.createTimeRanges = createTimeRanges;
    videojs.formatTime = formatTime;
    videojs.parseUrl = parseUrl;
    videojs.isCrossOrigin = isCrossOrigin;
    videojs.EventTarget = EventTarget;
    videojs.on = on;
    videojs.one = one;
    videojs.off = off;
    videojs.trigger = trigger;
    videojs.xhr = xhr;
    videojs.TextTrack = TextTrack;
    videojs.AudioTrack = AudioTrack;
    videojs.VideoTrack = VideoTrack;
    ['isEl', 'isTextNode', 'createEl', 'hasClass', 'addClass', 'removeClass', 'toggleClass', 'setAttributes', 'getAttributes', 'emptyEl', 'appendContent', 'insertContent'].forEach(function(k) {
        videojs[k] = function() {
            log$1.warn('videojs.' + k + '() is deprecated; use videojs.dom.' + k + '() instead');
            return Dom[k].apply(null, arguments);
        };
    });
    videojs.computedStyle = computedStyle;
    videojs.dom = Dom;
    videojs.url = Url;
    return videojs;
})));
! function() {
    ! function(a) {
        var b = a && a.videojs;
        b && (b.CDN_VERSION = "6.6.3")
    }(window),
    function(a, b, c, d, e, f, g) {
        b && b.HELP_IMPROVE_VIDEOJS !== !1 && (e.random() > .01 || (f = b.location, g = b.videojs || {}, a.src = "//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-3&utmn=1&utmhn=" + d(f.hostname) + "&utmsr=" + b.screen.availWidth + "x" + b.screen.availHeight + "&utmul=" + (c.language || c.userLanguage || "").toLowerCase() + "&utmr=" + d(f.href) + "&utmp=" + d(f.hostname + f.pathname) + "&utmcc=__utma%3D1." + e.floor(1e10 * e.random()) + ".1.1.1.1%3B&utme=8(vjsv*cdnv)9(" + g.VERSION + "*" + g.CDN_VERSION + ")"))
    }(new Image, window, navigator, encodeURIComponent, Math)
}();