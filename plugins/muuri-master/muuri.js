/*!
 * Muuri v0.5.4
 * https://github.com/haltu/muuri
 * Copyright (c) 2015, Haltu Oy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(global, factory) {
    var namespace = 'Muuri';
    var Hammer;
    if (typeof module === 'object' && module.exports) {
        try {
            Hammer = require('hammerjs');
        } catch (e) {}
        module.exports = factory(namespace, Hammer);
    } else if (typeof define === 'function' && define.amd) {
        define(['hammerjs'], function(Hammer) {
            return factory(namespace, Hammer);
        });
    } else {
        global[namespace] = factory(namespace, global.Hammer);
    }
}(typeof window !== 'undefined' ? window : this, function(namespace, Hammer, undefined) {
    'use strict';
    var global = window;
    var Object = global.Object;
    var Array = global.Array;
    var Math = global.Math;
    var Error = global.Error;
    var Element = global.Element;
    var doc = global.document;
    var docElem = doc.documentElement;
    var body = doc.body;
    var typeFunction = 'function';
    var typeString = 'string';
    var typeNumber = 'number';
    var rafLoop = createRafLoop();
    var rafQueueLayout = 'layout';
    var rafQueueVisibility = 'visibility';
    var rafQueueMove = 'move';
    var rafQueueScroll = 'scroll';
    var startPredicateInactive = 0;
    var startPredicatePending = 1;
    var startPredicateResolved = 2;
    var startPredicateRejected = 3;
    var gridInstances = {};
    var itemInstances = {};
    var noop = function() {};
    var uuid = 0;
    var elementMatches = getSupportedElementMatches();
    var transform = getSupportedStyle('transform');
    var transformLeaksFixed = body ? doesTransformLeakFixed() : null;
    var evSynchronize = 'synchronize';
    var evLayoutStart = 'layoutStart';
    var evLayoutEnd = 'layoutEnd';
    var evAdd = 'add';
    var evRemove = 'remove';
    var evShowStart = 'showStart';
    var evShowEnd = 'showEnd';
    var evHideStart = 'hideStart';
    var evHideEnd = 'hideEnd';
    var evFilter = 'filter';
    var evSort = 'sort';
    var evMove = 'move';
    var evSend = 'send';
    var evBeforeSend = 'beforeSend';
    var evReceive = 'receive';
    var evBeforeReceive = 'beforeReceive';
    var evDragInit = 'dragInit';
    var evDragStart = 'dragStart';
    var evDragMove = 'dragMove';
    var evDragScroll = 'dragScroll';
    var evDragEnd = 'dragEnd';
    var evDragReleaseStart = 'dragReleaseStart';
    var evDragReleaseEnd = 'dragReleaseEnd';
    var evDestroy = 'destroy';

    function Grid(element, options) {
        var inst = this;
        var settings;
        var items;
        var layoutOnResize;
        if (!body) {
            body = document.body;
            transformLeaksFixed = doesTransformLeakFixed();
        }
        element = inst._element = typeof element === typeString ? doc.querySelector(element) : element;
        if (!body.contains(element)) {
            throw new Error('Container element must be an existing DOM element');
        }
        settings = inst._settings = mergeSettings(Grid.defaultOptions, options);
        if (typeof settings.dragSort !== typeFunction) {
            settings.dragSort = !!settings.dragSort;
        }
        gridInstances[inst._id = ++uuid] = inst;
        inst._isDestroyed = false;
        inst._layout = null;
        inst._emitter = new Grid.Emitter();
        inst._itemShowHandler = getItemVisibilityHandler('show', settings);
        inst._itemHideHandler = getItemVisibilityHandler('hide', settings);
        addClass(element, settings.containerClass);
        inst._items = [];
        items = settings.items;
        if (typeof items === typeString) {
            nodeListToArray(inst._element.children).forEach(function(itemElement) {
                if (items === '*' || elementMatches(itemElement, items)) {
                    inst._items.push(new Grid.Item(inst, itemElement));
                }
            });
        } else if (Array.isArray(items) || isNodeList(items)) {
            inst._items = nodeListToArray(items).map(function(itemElement) {
                return new Grid.Item(inst, itemElement);
            });
        }
        layoutOnResize = settings.layoutOnResize;
        layoutOnResize = layoutOnResize === true ? 0 : typeof layoutOnResize === typeNumber ? layoutOnResize : -1;
        if (layoutOnResize >= 0) {
            global.addEventListener('resize', inst._resizeHandler = debounce(function() {
                inst.refreshItems().layout();
            }, layoutOnResize));
        }
        if (settings.layoutOnInit) {
            inst.layout(true);
        }
    }
    Grid.Item = Item;
    Grid.ItemDrag = ItemDrag;
    Grid.ItemRelease = ItemRelease;
    Grid.ItemMigrate = ItemMigrate;
    Grid.ItemAnimate = ItemAnimate;
    Grid.Layout = Layout;
    Grid.Emitter = Emitter;
    Grid.defaultOptions = {
        items: '*',
        showDuration: 300,
        showEasing: 'ease',
        hideDuration: 300,
        hideEasing: 'ease',
        visibleStyles: {
            opacity: '1',
            transform: 'scale(1)'
        },
        hiddenStyles: {
            opacity: '0',
            transform: 'scale(0.5)'
        },
        layout: {
            fillGaps: false,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: true
        },
        layoutOnResize: 100,
        layoutOnInit: true,
        layoutDuration: 300,
        layoutEasing: 'ease',
        sortData: null,
        dragEnabled: false,
        dragContainer: null,
        dragStartPredicate: {
            distance: 0,
            delay: 0,
            handle: false
        },
        dragAxis: null,
        dragSort: true,
        dragSortInterval: 100,
        dragSortPredicate: {
            threshold: 50,
            action: 'move'
        },
        dragReleaseDuration: 300,
        dragReleaseEasing: 'ease',
        dragHammerSettings: {
            touchAction: 'none'
        },
        containerClass: 'muuri',
        itemClass: 'muuri-item',
        itemVisibleClass: 'muuri-item-shown',
        itemHiddenClass: 'muuri-item-hidden',
        itemPositioningClass: 'muuri-item-positioning',
        itemDraggingClass: 'muuri-item-dragging',
        itemReleasingClass: 'muuri-item-releasing'
    };
    Grid._maxRafBatchSize = 100;
    Grid.prototype.on = function(event, listener) {
        var inst = this;
        if (!inst._isDestroyed) {
            inst._emitter.on(event, listener);
        }
        return inst;
    };
    Grid.prototype.once = function(event, listener) {
        var inst = this;
        if (!inst._isDestroyed) {
            inst._emitter.once(event, listener);
        }
        return inst;
    };
    Grid.prototype.off = function(event, listener) {
        var inst = this;
        if (!inst._isDestroyed) {
            inst._emitter.off(event, listener);
        }
        return inst;
    };
    Grid.prototype.getElement = function() {
        return this._element;
    };
    Grid.prototype.getItems = function(targets, state) {
        var inst = this;
        if (inst._isDestroyed) {
            return [];
        }
        var hasTargets = targets === 0 || (targets && typeof targets !== typeString);
        var targetItems = !hasTargets ? null : isNodeList(targets) ? nodeListToArray(targets) : [].concat(targets);
        var targetState = !hasTargets ? targets : state;
        var ret = [];
        var item;
        var i;
        targetState = typeof targetState === typeString ? targetState : null;
        if (targetState || targetItems) {
            targetItems = targetItems || inst._items;
            for (i = 0; i < targetItems.length; i++) {
                item = hasTargets ? inst._getItem(targetItems[i]) : targetItems[i];
                if (item && (!targetState || isItemInState(item, targetState))) {
                    ret.push(item);
                }
            }
            return ret;
        } else {
            return ret.concat(inst._items);
        }
    };
    Grid.prototype.refreshItems = function(items) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var targetItems = inst.getItems(items || 'active');
        var i;
        for (i = 0; i < targetItems.length; i++) {
            targetItems[i]._refreshDimensions();
        }
        return inst;
    };
    Grid.prototype.refreshSortData = function(items) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var targetItems = inst.getItems(items);
        var i;
        for (i = 0; i < targetItems.length; i++) {
            targetItems[i]._refreshSortData();
        }
        return inst;
    };
    Grid.prototype.synchronize = function() {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var container = inst._element;
        var items = inst._items;
        var fragment;
        var element;
        var i;
        if (items.length) {
            for (i = 0; i < items.length; i++) {
                element = items[i]._element;
                if (element.parentNode === container) {
                    fragment = fragment || doc.createDocumentFragment();
                    fragment.appendChild(element);
                }
            }
            if (fragment) {
                container.appendChild(fragment);
            }
        }
        inst._emit(evSynchronize);
        return inst;
    };
    Grid.prototype.layout = function(instant, onFinish) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var callback = typeof instant === typeFunction ? instant : onFinish;
        var isInstant = instant === true;
        var items = inst.getItems('active');
        var layout = inst._layout = new Grid.Layout(inst, items);
        var counter = items.length;
        var isBorderBox;
        var containerStyles;
        var item;
        var position;
        var i;

        function tryFinish() {
            if (--counter <= 0) {
                if (typeof callback === typeFunction) {
                    callback(inst._layout !== layout, items.concat());
                }
                if (inst._layout === layout) {
                    inst._emit(evLayoutEnd, items.concat());
                }
            }
        }
        if (layout.setWidth || layout.setHeight) {
            containerStyles = {};
            isBorderBox = getStyle(inst._element, 'box-sizing') === 'border-box';
            if (layout.setHeight) {
                if (typeof layout.height === typeNumber) {
                    containerStyles.height = (isBorderBox ? layout.height + inst._border.top + inst._border.bottom : layout.height) + 'px';
                } else {
                    containerStyles.height = layout.height;
                }
            }
            if (layout.setWidth) {
                if (typeof layout.width === typeNumber) {
                    containerStyles.width = (isBorderBox ? layout.width + inst._border.left + inst._border.right : layout.width) + 'px';
                } else {
                    containerStyles.width = layout.width;
                }
            }
            setStyles(inst._element, containerStyles);
        }
        inst._emit(evLayoutStart, items.concat());
        if (!items.length) {
            tryFinish();
            return inst;
        }
        for (i = 0; i < items.length; i++) {
            item = items[i];
            position = layout.slots[item._id];
            item._left = position.left;
            item._top = position.top;
            if (item.isDragging()) {
                tryFinish(true, item);
            } else {
                item._layout(isInstant, tryFinish);
            }
        }
        return inst;
    };
    Grid.prototype.add = function(elements, options) {
        var inst = this;
        if (inst._isDestroyed) {
            return [];
        }
        var targetElements = isNodeList(elements) ? nodeListToArray(elements) : [].concat(elements);
        var newItems = [];
        if (!targetElements.length) {
            return newItems;
        }
        var opts = options || {};
        var layout = opts.layout ? opts.layout : opts.layout === undefined;
        var items = inst._items;
        var needsLayout = false;
        var elementIndex;
        var item;
        var i;
        for (i = 0; i < items.length; i++) {
            elementIndex = targetElements.indexOf(items[i]._element);
            if (elementIndex > -1) {
                targetElements.splice(elementIndex, 1);
                if (!targetElements.length) {
                    return newItems;
                }
            }
        }
        for (i = 0; i < targetElements.length; i++) {
            item = new Grid.Item(inst, targetElements[i]);
            newItems.push(item);
            if (item._isActive) {
                needsLayout = true;
                item._skipNextLayoutAnimation = true;
            }
        }
        insertItemsToArray(items, newItems, opts.index);
        inst._emit(evAdd, newItems.concat());
        if (needsLayout && layout) {
            inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
        }
        return newItems;
    };
    Grid.prototype.remove = function(items, options) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var opts = options || {};
        var layout = opts.layout ? opts.layout : opts.layout === undefined;
        var needsLayout = false;
        var allItems = inst.getItems();
        var targetItems = inst.getItems(items);
        var indices = [];
        var item;
        var i;
        for (i = 0; i < targetItems.length; i++) {
            item = targetItems[i];
            indices.push(allItems.indexOf(item));
            if (item._isActive) {
                needsLayout = true;
            }
            item._destroy(opts.removeElements);
        }
        inst._emit(evRemove, targetItems.concat(), indices);
        if (needsLayout && layout) {
            inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
        }
        return targetItems;
    };
    Grid.prototype.show = function(items, options) {
        return this._isDestroyed ? this : gridShowHideHandler(this, 'show', items, options);
    };
    Grid.prototype.hide = function(items, options) {
        return this._isDestroyed ? this : gridShowHideHandler(this, 'hide', items, options);
    };
    Grid.prototype.filter = function(predicate, options) {
        var inst = this;
        if (inst._isDestroyed || !inst._items.length) {
            return inst;
        }
        var items = inst._items;
        var predicateType = typeof predicate;
        var isPredicateString = predicateType === typeString;
        var isPredicateFn = predicateType === typeFunction;
        var opts = options || {};
        var isInstant = opts.instant === true;
        var layout = opts.layout ? opts.layout : opts.layout === undefined;
        var onFinish = typeof opts.onFinish === typeFunction ? opts.onFinish : null;
        var itemsToShow = [];
        var itemsToHide = [];
        var tryFinishCounter = -1;
        var tryFinish = !onFinish ? noop : function() {
            ++tryFinishCounter && onFinish(itemsToShow.concat(), itemsToHide.concat());
        };
        var item;
        var i;
        if (isPredicateFn || isPredicateString) {
            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (isPredicateFn ? predicate(item) : elementMatches(item._element, predicate)) {
                    itemsToShow.push(item);
                } else {
                    itemsToHide.push(item);
                }
            }
        }
        if (itemsToShow.length) {
            inst.show(itemsToShow, {
                instant: isInstant,
                onFinish: tryFinish,
                layout: false
            });
        } else {
            tryFinish();
        }
        if (itemsToHide.length) {
            inst.hide(itemsToHide, {
                instant: isInstant,
                onFinish: tryFinish,
                layout: false
            });
        } else {
            tryFinish();
        }
        if (itemsToShow.length || itemsToHide.length) {
            inst._emit(evFilter, itemsToShow.concat(), itemsToHide.concat());
            if (layout) {
                inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
            }
        }
        return inst;
    };
    Grid.prototype.sort = function(comparer, options) {
        var inst = this;
        if (inst._isDestroyed || inst._items.length < 2) {
            return inst;
        }
        var items = inst._items;
        var opts = options || {};
        var isDescending = !!opts.descending;
        var layout = opts.layout ? opts.layout : opts.layout === undefined;
        var origItems = items.concat();
        var indexMap;
        if (typeof comparer === typeFunction) {
            items.sort(function(a, b) {
                var result = comparer(a, b);
                return (isDescending && result !== 0 ? -result : result) || compareItemIndices(a, b, isDescending, indexMap || (indexMap = getItemIndexMap(origItems)));
            });
        } else if (typeof comparer === typeString) {
            comparer = comparer.trim().split(' ').map(function(val) {
                return val.split(':');
            });
            items.sort(function(a, b) {
                return compareItems(a, b, isDescending, comparer) || compareItemIndices(a, b, isDescending, indexMap || (indexMap = getItemIndexMap(origItems)));
            });
        } else if (Array.isArray(comparer)) {
            sortItemsByReference(items, comparer);
            if (isDescending) {
                items.reverse();
            }
        } else {
            return inst;
        }
        inst._emit(evSort, items.concat(), origItems);
        if (layout) {
            inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
        }
        return inst;
    };
    Grid.prototype.move = function(item, position, options) {
        var inst = this;
        if (inst._isDestroyed || inst._items.length < 2) {
            return inst;
        }
        var items = inst._items;
        var opts = options || {};
        var layout = opts.layout ? opts.layout : opts.layout === undefined;
        var isSwap = opts.action === 'swap';
        var action = isSwap ? 'swap' : 'move';
        var fromItem = inst._getItem(item);
        var toItem = inst._getItem(position);
        var fromIndex;
        var toIndex;
        if (fromItem && toItem && (fromItem !== toItem)) {
            fromIndex = items.indexOf(fromItem);
            toIndex = items.indexOf(toItem);
            (isSwap ? arraySwap : arrayMove)(items, fromIndex, toIndex);
            inst._emit(evMove, {
                item: fromItem,
                fromIndex: fromIndex,
                toIndex: toIndex,
                action: action
            });
            if (layout) {
                inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
            }
        }
        return inst;
    };
    Grid.prototype.send = function(item, grid, position, options) {
        var currentGrid = this;
        if (currentGrid._isDestroyed || grid._isDestroyed || currentGrid === grid || !(item = currentGrid._getItem(item))) {
            return currentGrid;
        }
        var targetGrid = grid;
        var opts = options || {};
        var container = opts.appendTo || body;
        var layoutSender = opts.layoutSender ? opts.layoutSender : opts.layoutSender === undefined;
        var layoutReceiver = opts.layoutReceiver ? opts.layoutReceiver : opts.layoutReceiver === undefined;
        item._migrate.start(targetGrid, position, container);
        if (item._migrate.isActive && item.isActive()) {
            if (layoutSender) {
                currentGrid.layout(layoutSender === 'instant', typeof layoutSender === typeFunction ? layoutSender : undefined);
            }
            if (layoutReceiver) {
                targetGrid.layout(layoutReceiver === 'instant', typeof layoutReceiver === typeFunction ? layoutReceiver : undefined);
            }
        }
        return currentGrid;
    };
    Grid.prototype.destroy = function(removeElements) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var container = inst._element;
        var items = inst._items.concat();
        var i;
        if (inst._resizeHandler) {
            global.removeEventListener('resize', inst._resizeHandler);
        }
        for (i = 0; i < items.length; i++) {
            items[i]._destroy(removeElements);
        }
        removeClass(container, inst._settings.containerClass);
        setStyles(container, {
            height: ''
        });
        inst._emit(evDestroy);
        inst._emitter.destroy();
        gridInstances[inst._id] = undefined;
        inst._isDestroyed = true;
        return inst;
    };
    Grid.prototype._getItem = function(target) {
        var inst = this;
        var items = inst._items;
        var i;
        if (inst._isDestroyed || !target) {
            return items[0] || null;
        } else if (typeof target === typeNumber) {
            return items[target > -1 ? target : items.length + target] || null;
        } else if (target instanceof Item) {
            return target._gridId === inst._id ? target : null;
        } else {
            for (i = 0; i < items.length; i++) {
                if (items[i]._element === target) {
                    return items[i];
                }
            }
            return null;
        }
    };
    Grid.prototype._emit = function() {
        var inst = this;
        if (!inst._isDestroyed) {
            inst._emitter.emit.apply(inst._emitter, arguments);
        }
        return inst;
    };
    Grid.prototype._refreshDimensions = function() {
        var inst = this;
        var element = inst._element;
        var rect = element.getBoundingClientRect();
        var sides = ['left', 'right', 'top', 'bottom'];
        var i;
        inst._width = rect.width;
        inst._height = rect.height;
        inst._left = rect.left;
        inst._top = rect.top;
        inst._border = {};
        for (i = 0; i < sides.length; i++) {
            inst._border[sides[i]] = getStyleAsFloat(element, 'border-' + sides[i] + '-width');
        }
        return inst;
    };

    function Item(grid, element) {
        var inst = this;
        var settings = grid._settings;
        var isHidden;
        inst._id = ++uuid;
        itemInstances[inst._id] = inst;
        inst._isDestroyed = false;
        if (element.parentNode !== grid._element) {
            grid._element.appendChild(element);
        }
        addClass(element, settings.itemClass);
        isHidden = getStyle(element, 'display') === 'none';
        addClass(element, isHidden ? settings.itemHiddenClass : settings.itemVisibleClass);
        inst._gridId = grid._id;
        inst._element = element;
        inst._child = element.children[0];
        inst._animate = new Grid.ItemAnimate(inst, element);
        inst._animateChild = new Grid.ItemAnimate(inst, inst._child);
        inst._isActive = isHidden ? false : true;
        inst._isPositioning = false;
        inst._isHidden = isHidden;
        inst._isHiding = false;
        inst._isShowing = false;
        inst._visibilityQueue = [];
        inst._layoutQueue = [];
        inst._left = 0;
        inst._top = 0;
        setStyles(element, {
            left: '0',
            top: '0',
            transform: getTranslateString(0, 0),
            display: isHidden ? 'none' : 'block'
        });
        inst._refreshDimensions()._refreshSortData();
        if (isHidden) {
            grid._itemHideHandler.start(inst, true);
        } else {
            grid._itemShowHandler.start(inst, true);
        }
        inst._migrate = new Grid.ItemMigrate(inst);
        inst._release = new Grid.ItemRelease(inst);
        inst._drag = settings.dragEnabled ? new Grid.ItemDrag(inst) : null;
    }
    Item.prototype.getGrid = function() {
        return gridInstances[this._gridId];
    };
    Item.prototype.getElement = function() {
        return this._element;
    };
    Item.prototype.getWidth = function() {
        return this._width;
    };
    Item.prototype.getHeight = function() {
        return this._height;
    };
    Item.prototype.getMargin = function() {
        return {
            left: this._margin.left,
            right: this._margin.right,
            top: this._margin.top,
            bottom: this._margin.bottom
        };
    };
    Item.prototype.getPosition = function() {
        return {
            left: this._left,
            top: this._top
        };
    };
    Item.prototype.isActive = function() {
        return this._isActive;
    };
    Item.prototype.isVisible = function() {
        return !this._isHidden;
    };
    Item.prototype.isShowing = function() {
        return this._isShowing;
    };
    Item.prototype.isHiding = function() {
        return this._isHiding;
    };
    Item.prototype.isPositioning = function() {
        return this._isPositioning;
    };
    Item.prototype.isDragging = function() {
        return !!this._drag && this._drag._data.isActive;
    };
    Item.prototype.isReleasing = function() {
        return this._release.isActive;
    };
    Item.prototype.isDestroyed = function() {
        return this._isDestroyed;
    };
    Item.prototype._refreshDimensions = function() {
        var inst = this;
        if (inst._isDestroyed || inst._isHidden) {
            return inst;
        }
        var element = inst._element;
        var rect = element.getBoundingClientRect();
        var sides = ['left', 'right', 'top', 'bottom'];
        var margin = inst._margin = inst._margin || {};
        var side;
        var i;
        inst._width = rect.width;
        inst._height = rect.height;
        for (i = 0; i < 4; i++) {
            side = getStyleAsFloat(element, 'margin-' + sides[i]);
            margin[sides[i]] = side > 0 ? side : 0;
        }
        return inst;
    };
    Item.prototype._refreshSortData = function() {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var sortData = {};
        var getters = inst.getGrid()._settings.sortData;
        if (getters) {
            Object.keys(getters).forEach(function(key) {
                sortData[key] = getters[key](inst, inst._element);
            });
        }
        inst._sortData = sortData;
        return inst;
    };
    Item.prototype._layout = function(instant, onFinish) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var element = inst._element;
        var isPositioning = inst._isPositioning;
        var migrate = inst._migrate;
        var release = inst._release;
        var isJustReleased = release.isActive && release.isPositioningStarted === false;
        var grid = inst.getGrid();
        var settings = grid._settings;
        var animDuration = isJustReleased ? settings.dragReleaseDuration : settings.layoutDuration;
        var animEasing = isJustReleased ? settings.dragReleaseEasing : settings.layoutEasing;
        var animEnabled = !instant && !inst._skipNextLayoutAnimation && animDuration > 0;
        var isAnimating;
        var offsetLeft;
        var offsetTop;
        var currentLeft;
        var currentTop;
        var targetStyles;
        if (isPositioning) {
            processQueue(inst._layoutQueue, true, inst);
        }
        if (isJustReleased) {
            release.isPositioningStarted = true;
        }
        if (typeof onFinish === typeFunction) {
            inst._layoutQueue.push(onFinish);
        }
        offsetLeft = release.isActive ? release.containerDiffX : migrate.isActive ? migrate.containerDiffX : 0;
        offsetTop = release.isActive ? release.containerDiffY : migrate.isActive ? migrate.containerDiffY : 0;
        targetStyles = {
            transform: getTranslateString(inst._left + offsetLeft, inst._top + offsetTop)
        };
        if (!animEnabled) {
            isPositioning && rafLoop.cancel(rafQueueLayout, inst._id);
            isAnimating = inst._animate.isAnimating();
            inst._stopLayout(false, targetStyles);
            !isAnimating && setStyles(element, targetStyles);
            inst._skipNextLayoutAnimation = false;
            return inst._finishLayout();
        }
        inst._isPositioning = true;
        rafLoop.add(rafQueueLayout, inst._id, function() {
            currentLeft = getTranslateAsFloat(element, 'x') - offsetLeft;
            currentTop = getTranslateAsFloat(element, 'y') - offsetTop;
        }, function() {
            if (inst._left === currentLeft && inst._top === currentTop) {
                isPositioning && inst._stopLayout(false, targetStyles);
                inst._isPositioning = false;
                return inst._finishLayout();
            }!isPositioning && addClass(element, settings.itemPositioningClass);
            inst._animate.start({
                transform: getTranslateString(currentLeft + offsetLeft, currentTop + offsetTop)
            }, targetStyles, {
                duration: animDuration,
                easing: animEasing,
                onFinish: function() {
                    inst._finishLayout();
                }
            });
        });
        return inst;
    };
    Item.prototype._finishLayout = function() {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        if (inst._isPositioning) {
            inst._isPositioning = false;
            removeClass(inst._element, inst.getGrid()._settings.itemPositioningClass);
        }
        if (inst._release.isActive) {
            inst._release.stop();
        }
        if (inst._migrate.isActive) {
            inst._migrate.stop();
        }
        processQueue(inst._layoutQueue, false, inst);
        return inst;
    };
    Item.prototype._stopLayout = function(processLayoutQueue, targetStyles) {
        var inst = this;
        if (inst._isDestroyed || !inst._isPositioning) {
            return inst;
        }
        rafLoop.cancel(rafQueueLayout, inst._id);
        inst._animate.stop(targetStyles);
        removeClass(inst._element, inst.getGrid()._settings.itemPositioningClass);
        inst._isPositioning = false;
        if (processLayoutQueue) {
            processQueue(inst._layoutQueue, true, inst);
        }
        return inst;
    };
    Item.prototype._show = function(instant, onFinish) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var element = inst._element;
        var queue = inst._visibilityQueue;
        var callback = typeof onFinish === typeFunction ? onFinish : null;
        var grid = inst.getGrid();
        var settings = grid._settings;
        if (!inst._isShowing && !inst._isHidden) {
            callback && callback(false, inst);
            return inst;
        }
        if (inst._isShowing && !instant) {
            callback && queue.push(callback);
            return inst;
        }
        if (!inst._isShowing) {
            processQueue(queue, true, inst);
            removeClass(element, settings.itemHiddenClass);
            addClass(element, settings.itemVisibleClass);
            !inst._isHiding && setStyles(element, {
                display: 'block'
            });
        }
        callback && queue.push(callback);
        inst._isActive = inst._isShowing = true;
        inst._isHiding = inst._isHidden = false;
        if (instant) {
            grid._itemShowHandler.stop(inst, settings.visibleStyles);
            inst._isShowing = false;
            processQueue(queue, false, inst);
        } else {
            grid._itemShowHandler.start(inst, instant, function() {
                if (!inst._isHidden) {
                    inst._isShowing = false;
                    processQueue(queue, false, inst);
                }
            });
        }
        return inst;
    };
    Item.prototype._hide = function(instant, onFinish) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var element = inst._element;
        var queue = inst._visibilityQueue;
        var callback = typeof onFinish === typeFunction ? onFinish : null;
        var grid = inst.getGrid();
        var settings = grid._settings;
        if (!inst._isHiding && inst._isHidden) {
            callback && callback(false, inst);
            return inst;
        }
        if (inst._isHiding && !instant) {
            callback && queue.push(callback);
            return inst;
        }
        if (!inst._isHiding) {
            processQueue(queue, true, inst);
            addClass(element, settings.itemHiddenClass);
            removeClass(element, settings.itemVisibleClass);
        }
        callback && queue.push(callback);
        inst._isHidden = inst._isHiding = true;
        inst._isActive = inst._isShowing = false;
        if (instant) {
            grid._itemHideHandler.stop(inst, settings.hiddenStyles);
            inst._isHiding = false;
            inst._stopLayout(true, {
                transform: getTranslateString(0, 0)
            });
            setStyles(element, {
                display: 'none'
            });
            processQueue(queue, false, inst);
        } else {
            grid._itemHideHandler.start(inst, instant, function() {
                if (inst._isHidden) {
                    inst._isHiding = false;
                    inst._stopLayout(true, {
                        transform: getTranslateString(0, 0)
                    });
                    setStyles(element, {
                        display: 'none'
                    });
                    processQueue(queue, false, inst);
                }
            });
        }
        return inst;
    };
    Item.prototype._destroy = function(removeElement) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var element = inst._element;
        var grid = inst.getGrid();
        var settings = grid._settings;
        var index = grid._items.indexOf(inst);
        inst._release.destroy();
        inst._migrate.destroy();
        inst._stopLayout(true, {});
        grid._itemShowHandler.stop(inst, {});
        grid._itemHideHandler.stop(inst, {});
        inst._drag && inst._drag.destroy();
        inst._animate.destroy();
        inst._animateChild.destroy();
        processQueue(inst._visibilityQueue, true, inst);
        element.removeAttribute('style');
        inst._child.removeAttribute('style');
        removeClass(element, settings.itemPositioningClass);
        removeClass(element, settings.itemDraggingClass);
        removeClass(element, settings.itemReleasingClass);
        removeClass(element, settings.itemClass);
        removeClass(element, settings.itemVisibleClass);
        removeClass(element, settings.itemHiddenClass);
        index > -1 && grid._items.splice(index, 1);
        removeElement && element.parentNode.removeChild(element);
        itemInstances[inst._id] = undefined;
        inst._isActive = inst._isPositioning = inst._isHiding = inst._isShowing = false;
        inst._isDestroyed = inst._isHidden = true;
        return inst;
    };

    function Layout(grid, items) {
        var inst = this;
        var layoutSettings = grid._settings.layout;
        items = items.concat();
        grid._refreshDimensions();
        var width = grid._width - grid._border.left - grid._border.right;
        var height = grid._height - grid._border.top - grid._border.bottom;
        var isCustomLayout = typeof layoutSettings === typeFunction;
        var layout = isCustomLayout ? layoutSettings(items, width, height) : muuriLayout(items, width, height, isPlainObject(layoutSettings) ? layoutSettings : {});
        inst.slots = layout.slots;
        inst.setWidth = layout.setWidth || false;
        inst.setHeight = layout.setHeight || false;
        inst.width = layout.width;
        inst.height = layout.height;
    }

    function Emitter() {
        this._events = {};
        this._isDestroyed = false;
    }
    Emitter.prototype.on = function(event, listener) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var listeners = inst._events[event] || [];
        listeners.push(listener);
        inst._events[event] = listeners;
        return inst;
    };
    Emitter.prototype.once = function(event, listener) {
        var inst = this;
        return this.on(event, function callback() {
            inst.off(event, callback);
            listener.apply(null, arguments);
        });
    };
    Emitter.prototype.off = function(event, listener) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var listeners = inst._events[event] || [];
        var i = listeners.length;
        while (i--) {
            if (listener === listeners[i]) {
                listeners.splice(i, 1);
            }
        }
        return inst;
    };
    Emitter.prototype.emit = function(event, arg1, arg2, arg3) {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var listeners = inst._events[event] || [];
        var listenersLength = listeners.length;
        var argsLength = arguments.length - 1;
        var i;
        if (listenersLength) {
            listeners = listeners.concat();
            for (i = 0; i < listenersLength; i++) {
                argsLength === 0 ? listeners[i]() : argsLength === 1 ? listeners[i](arg1) : argsLength === 2 ? listeners[i](arg1, arg2) : listeners[i](arg1, arg2, arg3);
            }
        }
        return inst;
    };
    Emitter.prototype.destroy = function() {
        var inst = this;
        if (inst._isDestroyed) {
            return inst;
        }
        var eventNames = Object.keys(inst._events);
        var i;
        for (i = 0; i < eventNames.length; i++) {
            inst._events[eventNames[i]] = null;
        }
        inst._isDestroyed = true;
        return inst;
    };

    function ItemAnimate(item, element) {
        var inst = this;
        inst._item = item;
        inst._element = element;
        inst._animation = null;
        inst._propsTo = null;
        inst._isDestroyed = false;
    }
    ItemAnimate.prototype.start = function(propsFrom, propsTo, options) {
        var inst = this;
        if (inst._isDestroyed) {
            return;
        }
        var opts = options || {};
        var callback = typeof opts.onFinish === typeFunction ? opts.onFinish : null;
        var shouldStop;
        if (inst._animation) {
            shouldStop = Object.keys(propsTo).some(function(propName) {
                return propsTo[propName] !== inst._propsTo[propName];
            });
            if (shouldStop) {
                inst._animation.cancel();
            } else {
                inst._animation.onfinish = function() {
                    inst._animation = inst._propsTo = null;
                    callback && callback();
                };
                return;
            }
        }
        inst._propsTo = propsTo;
        inst._animation = inst._element.animate([propsFrom, propsTo], {
            duration: opts.duration || 300,
            easing: opts.easing || 'ease'
        });
        inst._animation.onfinish = function() {
            inst._animation = inst._propsTo = null;
            callback && callback();
        };
        setStyles(inst._element, propsTo);
    };
    ItemAnimate.prototype.stop = function(currentProps) {
        var inst = this;
        if (!inst._isDestroyed && inst._animation) {
            setStyles(inst._element, currentProps || getCurrentStyles(inst._element, inst._propsTo));
            inst._animation.cancel();
            inst._animation = inst._propsTo = null;
        }
    };
    ItemAnimate.prototype.isAnimating = function() {
        return !!this._animation;
    };
    ItemAnimate.prototype.destroy = function() {
        var inst = this;
        if (!inst._isDestroyed) {
            inst.stop();
            inst._item = inst._element = null;
            inst._isDestroyed = true;
        }
    };

    function ItemMigrate(item) {
        var migrate = this;
        migrate._itemId = item._id;
        migrate._isDestroyed = false;
        migrate.isActive = false;
        migrate.container = false;
        migrate.containerDiffX = 0;
        migrate.containerDiffY = 0;
    }
    ItemMigrate.prototype.destroy = function() {
        var migrate = this;
        if (!migrate._isDestroyed) {
            migrate.stop(true);
            migrate._isDestroyed = true;
        }
        return migrate;
    };
    ItemMigrate.prototype.getItem = function() {
        return itemInstances[this._itemId] || null;
    };
    ItemMigrate.prototype.start = function(targetGrid, position, container) {
        var migrate = this;
        if (migrate._isDestroyed) {
            return migrate;
        }
        var item = migrate.getItem();
        var itemElement = item._element;
        var isItemVisible = item.isVisible();
        var currentGrid = item.getGrid();
        var currentGridStn = currentGrid._settings;
        var targetGridStn = targetGrid._settings;
        var targetGridElement = targetGrid._element;
        var currentIndex = currentGrid._items.indexOf(item);
        var targetIndex = typeof position === typeNumber ? position : targetGrid._items.indexOf(targetGrid._getItem(position));
        var targetContainer = container || body;
        var currentContainer;
        var offsetDiff;
        var containerDiff;
        var translateX;
        var translateY;
        if (targetIndex === null) {
            return migrate;
        }
        targetIndex = normalizeArrayIndex(targetGrid._items, targetIndex, true);
        if (item.isPositioning() || migrate.isActive || item.isReleasing()) {
            translateX = getTranslateAsFloat(itemElement, 'x');
            translateY = getTranslateAsFloat(itemElement, 'y');
        }
        if (item.isPositioning()) {
            item._stopLayout(true, {
                transform: getTranslateString(translateX, translateY)
            });
        }
        if (migrate.isActive) {
            translateX -= migrate.containerDiffX;
            translateY -= migrate.containerDiffY;
            migrate.stop(true, {
                transform: getTranslateString(translateX, translateY)
            });
        }
        if (item.isReleasing()) {
            translateX -= item._release.containerDiffX;
            translateY -= item._release.containerDiffY;
            item._release.stop(true, {
                transform: getTranslateString(translateX, translateY)
            });
        }
        currentGrid._itemShowHandler.stop(item);
        currentGrid._itemHideHandler.stop(item);
        if (item._drag) {
            item._drag.destroy();
        }
        item._animate.destroy();
        item._animateChild.destroy();
        processQueue(item._visibilityQueue, true, item);
        currentGrid._emit(evBeforeSend, {
            item: item,
            fromGrid: currentGrid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        targetGrid._emit(evBeforeReceive, {
            item: item,
            fromGrid: currentGrid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        removeClass(itemElement, currentGridStn.itemClass);
        removeClass(itemElement, currentGridStn.itemVisibleClass);
        removeClass(itemElement, currentGridStn.itemHiddenClass);
        addClass(itemElement, targetGridStn.itemClass);
        addClass(itemElement, isItemVisible ? targetGridStn.itemVisibleClass : targetGridStn.itemHiddenClass);
        currentGrid._items.splice(currentIndex, 1);
        insertItemsToArray(targetGrid._items, item, targetIndex);
        item._gridId = targetGrid._id;
        item._animate = new Grid.ItemAnimate(item, itemElement);
        item._animateChild = new Grid.ItemAnimate(item, item._child);
        currentContainer = itemElement.parentNode;
        if (targetContainer !== currentContainer) {
            targetContainer.appendChild(itemElement);
            offsetDiff = getOffsetDiff(targetContainer, currentContainer, true);
            if (translateX === undefined) {
                translateX = getTranslateAsFloat(itemElement, 'x');
                translateY = getTranslateAsFloat(itemElement, 'y');
            }
            setStyles(itemElement, {
                transform: getTranslateString(translateX + offsetDiff.left, translateY + offsetDiff.top)
            });
        }
        item._child.removeAttribute('style');
        if (isItemVisible) {
            targetGrid._itemShowHandler.start(item, true);
        } else {
            targetGrid._itemHideHandler.start(item, true);
        }
        setStyles(itemElement, {
            display: isItemVisible ? 'block' : 'hidden'
        });
        containerDiff = getOffsetDiff(targetContainer, targetGridElement, true);
        item._refreshDimensions()._refreshSortData();
        item._drag = targetGridStn.dragEnabled ? new Grid.ItemDrag(item) : null;
        migrate.isActive = true;
        migrate.container = targetContainer;
        migrate.containerDiffX = containerDiff.left;
        migrate.containerDiffY = containerDiff.top;
        currentGrid._emit(evSend, {
            item: item,
            fromGrid: currentGrid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        targetGrid._emit(evReceive, {
            item: item,
            fromGrid: currentGrid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        return migrate;
    };
    ItemMigrate.prototype.stop = function(abort, currentStyles) {
        var migrate = this;
        if (migrate._isDestroyed || !migrate.isActive) {
            return migrate;
        }
        var item = migrate.getItem();
        var element = item._element;
        var grid = item.getGrid();
        var gridElement = grid._element;
        var translateX;
        var translateY;
        if (migrate.container !== gridElement) {
            if (!currentStyles) {
                translateX = abort ? getTranslateAsFloat(element, 'x') - migrate.containerDiffX : item._left;
                translateY = abort ? getTranslateAsFloat(element, 'y') - migrate.containerDiffY : item._top;
                currentStyles = {
                    transform: getTranslateString(translateX, translateY)
                };
            }
            gridElement.appendChild(element);
            setStyles(element, currentStyles);
        }
        migrate.isActive = false;
        migrate.container = null;
        migrate.containerDiffX = 0;
        migrate.containerDiffY = 0;
        return migrate;
    };

    function ItemRelease(item) {
        var release = this;
        release._itemId = item._id;
        release._isDestroyed = false;
        release.isActive = false;
        release.isPositioningStarted = false;
        release.containerDiffX = 0;
        release.containerDiffY = 0;
    }
    ItemRelease.prototype.destroy = function() {
        var release = this;
        if (!release._isDestroyed) {
            release.stop(true);
            release._isDestroyed = true;
        }
        return release;
    };
    ItemRelease.prototype.getItem = function() {
        return itemInstances[this._itemId] || null;
    };
    ItemRelease.prototype.reset = function() {
        var release = this;
        if (release._isDestroyed) {
            return release;
        }
        var item = release.getItem();
        release.isActive = false;
        release.isPositioningStarted = false;
        release.containerDiffX = 0;
        release.containerDiffY = 0;
        removeClass(item._element, item.getGrid()._settings.itemReleasingClass);
        return release;
    };
    ItemRelease.prototype.start = function() {
        var release = this;
        if (release._isDestroyed || release.isActive) {
            return release;
        }
        var item = release.getItem();
        var grid = item.getGrid();
        release.isActive = true;
        addClass(item._element, grid._settings.itemReleasingClass);
        grid._emit(evDragReleaseStart, item);
        item._layout(false);
        return release;
    };
    ItemRelease.prototype.stop = function(abort, currentStyles) {
        var release = this;
        if (release._isDestroyed || !release.isActive) {
            return release;
        }
        var item = release.getItem();
        var element = item._element;
        var grid = item.getGrid();
        var container = grid._element;
        var containerDiffX = release.containerDiffX;
        var containerDiffY = release.containerDiffY;
        var translateX;
        var translateY;
        release.reset();
        if (element.parentNode !== container) {
            if (!currentStyles) {
                translateX = abort ? getTranslateAsFloat(element, 'x') - containerDiffX : item._left;
                translateY = abort ? getTranslateAsFloat(element, 'y') - containerDiffY : item._top;
                currentStyles = {
                    transform: getTranslateString(translateX, translateY)
                };
            }
            container.appendChild(element);
            setStyles(element, currentStyles);
        }
        if (!abort) {
            grid._emit(evDragReleaseEnd, item);
        }
        return release;
    };

    function ItemDrag(item) {
        if (!Hammer) {
            throw new Error('[' + namespace + '] required dependency Hammer is not defined.');
        }
        var drag = this;
        var element = item._element;
        var grid = item.getGrid();
        var settings = grid._settings;
        var hammer;
        var startPredicate = typeof settings.dragStartPredicate === typeFunction ? settings.dragStartPredicate : ItemDrag.defaultStartPredicate;
        var startPredicateState = startPredicateInactive;
        var startPredicateResult;
        drag._itemId = item._id;
        drag._gridId = grid._id;
        drag._hammer = hammer = new Hammer.Manager(element);
        drag._isDestroyed = false;
        drag._isMigrating = false;
        drag._data = {};
        drag._resolveStartPredicate = function(event) {
            if (!drag._isDestroyed && startPredicateState === startPredicatePending) {
                startPredicateState = startPredicateResolved;
                drag.onStart(event);
            }
        };
        drag._scrollListener = function(e) {
            drag.onScroll(e);
        };
        drag._checkSortOverlap = debounce(function() {
            drag._data.isActive && drag.checkOverlap();
        }, settings.dragSortInterval);
        drag._sortPredicate = typeof settings.dragSortPredicate === typeFunction ? settings.dragSortPredicate : ItemDrag.defaultSortPredicate;
        drag.reset();
        hammer.add(new Hammer.Pan({
            event: 'drag',
            pointers: 1,
            threshold: 0,
            direction: Hammer.DIRECTION_ALL
        }));
        hammer.add(new Hammer.Press({
            event: 'draginit',
            pointers: 1,
            threshold: 1000,
            time: 0
        }));
        if (isPlainObject(settings.dragHammerSettings)) {
            hammer.set(settings.dragHammerSettings);
        }
        hammer.on('draginit dragstart dragmove', function(e) {
            if (startPredicateState === startPredicateInactive) {
                startPredicateState = startPredicatePending;
            }
            if (startPredicateState === startPredicatePending) {
                startPredicateResult = startPredicate(drag.getItem(), e);
                if (startPredicateResult === true) {
                    startPredicateState = startPredicateResolved;
                    drag.onStart(e);
                } else if (startPredicateResult === false) {
                    startPredicateState = startPredicateRejected;
                }
            } else if (startPredicateState === startPredicateResolved && drag._data.isActive) {
                drag.onMove(e);
            }
        }).on('dragend dragcancel draginitup', function(e) {
            var isResolved = startPredicateState === startPredicateResolved;
            startPredicate(drag.getItem(), e);
            startPredicateState = startPredicateInactive;
            if (isResolved && drag._data.isActive) {
                drag.onEnd(e);
            }
        });
        element.addEventListener('dragstart', preventDefault, false);
    }
    ItemDrag.defaultStartPredicate = function(item, event, options) {
        var element = item._element;
        var predicate = item._drag._startPredicateData;
        var config;
        var isAnchor;
        var href;
        var target;
        if (!predicate) {
            config = options || item._drag.getGrid()._settings.dragStartPredicate;
            config = isPlainObject(config) ? config : {};
            predicate = item._drag._startPredicateData = {
                distance: Math.abs(config.distance) || 0,
                delay: Math.max(config.delay, 0) || 0,
                handle: typeof config.handle === 'string' ? config.handle : false
            };
        }
        if (event.isFinal) {
            isAnchor = element.tagName.toLowerCase() === 'a';
            href = element.getAttribute('href');
            target = element.getAttribute('target');
            dragStartPredicateReset(item);
            if (isAnchor && href && Math.abs(event.deltaX) < 2 && Math.abs(event.deltaY) < 2 && event.deltaTime < 200) {
                if (target && target !== '_self') {
                    global.open(href, target);
                } else {
                    global.location.href = href;
                }
            }
            return;
        }
        if (!predicate.handleElement) {
            if (predicate.handle) {
                predicate.handleElement = (event.changedPointers[0] || {}).target;
                while (predicate.handleElement && !elementMatches(predicate.handleElement, predicate.handle)) {
                    predicate.handleElement = predicate.handleElement !== element ? predicate.handleElement.parentElement : null;
                }
                if (!predicate.handleElement) {
                    return false;
                }
            } else {
                predicate.handleElement = element;
            }
        }
        if (predicate.delay) {
            predicate.event = event;
            if (!predicate.delayTimer) {
                predicate.delayTimer = global.setTimeout(function() {
                    predicate.delay = 0;
                    if (dragStartPredicateResolve(item, predicate.event)) {
                        item._drag._resolveStartPredicate(predicate.event);
                        dragStartPredicateReset(item);
                    }
                }, predicate.delay);
            }
        }
        return dragStartPredicateResolve(item, event);
    };
    ItemDrag.defaultSortPredicate = function(item) {
        var drag = item._drag;
        var dragData = drag._data;
        var rootGrid = drag.getGrid();
        var settings = rootGrid._settings;
        var config = settings.dragSortPredicate || {};
        var sortThreshold = config.threshold || 50;
        var sortAction = config.action || 'move';
        var itemRect = {
            width: item._width,
            height: item._height,
            left: dragData.elementClientX,
            top: dragData.elementClientY
        };
        var grid = getTargetGrid(item, rootGrid, itemRect, sortThreshold);
        var gridOffsetLeft = 0;
        var gridOffsetTop = 0;
        var matchScore = -1;
        var matchIndex;
        var hasValidTargets;
        var target;
        var score;
        var i;
        if (!grid) {
            return false;
        }
        if (grid === rootGrid) {
            itemRect.left = dragData.gridX + item._margin.left;
            itemRect.top = dragData.gridY + item._margin.top;
        } else {
            gridOffsetLeft = grid._left + grid._border.left;
            gridOffsetTop = grid._top + grid._border.top;
        }
        for (i = 0; i < grid._items.length; i++) {
            target = grid._items[i];
            if (!target._isActive || target === item) {
                continue;
            }
            hasValidTargets = true;
            score = getRectOverlapScore(itemRect, {
                width: target._width,
                height: target._height,
                left: target._left + target._margin.left + gridOffsetLeft,
                top: target._top + target._margin.top + gridOffsetTop
            });
            if (score > matchScore) {
                matchIndex = i;
                matchScore = score;
            }
        }
        if (matchScore < sortThreshold && item.getGrid() !== grid) {
            matchIndex = hasValidTargets ? -1 : 0;
            matchScore = Infinity;
        }
        if (matchScore >= sortThreshold) {
            return {
                grid: grid,
                index: matchIndex,
                action: sortAction
            };
        }
        return false;
    };
    ItemDrag.prototype.destroy = function() {
        var drag = this;
        if (!drag._isDestroyed) {
            drag.stop();
            drag._hammer.destroy();
            drag.getItem()._element.removeEventListener('dragstart', preventDefault, false);
            drag._isDestroyed = true;
        }
        return drag;
    };
    ItemDrag.prototype.getItem = function() {
        return itemInstances[this._itemId] || null;
    };
    ItemDrag.prototype.getGrid = function() {
        return gridInstances[this._gridId] || null;
    };
    ItemDrag.prototype.reset = function() {
        var drag = this;
        var dragData = drag._data;
        dragData.isActive = false;
        dragData.container = null;
        dragData.containingBlock = null;
        dragData.startEvent = null;
        dragData.currentEvent = null;
        dragData.scrollers = [];
        dragData.left = 0;
        dragData.top = 0;
        dragData.gridX = 0;
        dragData.gridY = 0;
        dragData.elementClientX = 0;
        dragData.elementClientY = 0;
        dragData.containerDiffX = 0;
        dragData.containerDiffY = 0;
        return drag;
    };
    ItemDrag.prototype.bindScrollListeners = function() {
        var drag = this;
        var gridContainer = drag.getGrid()._element;
        var dragContainer = drag._data.container;
        var scrollers = getScrollParents(drag.getItem()._element);
        var i;
        if (dragContainer !== gridContainer) {
            scrollers = arrayUnique(scrollers.concat(gridContainer).concat(getScrollParents(gridContainer)));
        }
        for (i = 0; i < scrollers.length; i++) {
            scrollers[i].addEventListener('scroll', drag._scrollListener);
        }
        drag._data.scrollers = scrollers;
        return drag;
    };
    ItemDrag.prototype.unbindScrollListeners = function() {
        var drag = this;
        var dragData = drag._data;
        var scrollers = dragData.scrollers;
        var i;
        for (i = 0; i < scrollers.length; i++) {
            scrollers[i].removeEventListener('scroll', drag._scrollListener);
        }
        dragData.scrollers = [];
        return drag;
    };
    ItemDrag.prototype.checkOverlap = function() {
        var drag = this;
        var item = drag.getItem();
        var result = drag._sortPredicate(item, drag._data.currentEvent);
        var currentGrid;
        var currentIndex;
        var targetGrid;
        var targetIndex;
        var sortAction;
        var isMigration;
        if (!isPlainObject(result) || typeof result.index !== typeNumber) {
            return drag;
        }
        currentGrid = item.getGrid();
        targetGrid = result.grid || currentGrid;
        isMigration = currentGrid !== targetGrid;
        currentIndex = currentGrid._items.indexOf(item);
        targetIndex = normalizeArrayIndex(targetGrid._items, result.index, isMigration);
        sortAction = result.action === 'swap' ? 'swap' : 'move';
        if (!isMigration) {
            if (currentIndex !== targetIndex) {
                (sortAction === 'swap' ? arraySwap : arrayMove)(currentGrid._items, currentIndex, targetIndex);
                currentGrid._emit(evMove, {
                    item: item,
                    fromIndex: currentIndex,
                    toIndex: targetIndex,
                    action: sortAction
                });
                currentGrid.layout();
            }
        } else {
            currentGrid._emit(evBeforeSend, {
                item: item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            targetGrid._emit(evBeforeReceive, {
                item: item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            item._gridId = targetGrid._id;
            drag._isMigrating = item._gridId !== drag._gridId;
            currentGrid._items.splice(currentIndex, 1);
            insertItemsToArray(targetGrid._items, item, targetIndex);
            item._sortData = null;
            currentGrid._emit(evSend, {
                item: item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            targetGrid._emit(evReceive, {
                item: item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            currentGrid.layout();
            targetGrid.layout();
        }
        return drag;
    };
    ItemDrag.prototype.finishMigration = function() {
        var drag = this;
        var item = drag.getItem();
        var release = item._release;
        var element = item._element;
        var targetGrid = item.getGrid();
        var targetGridElement = targetGrid._element;
        var targetSettings = targetGrid._settings;
        var targetContainer = targetSettings.dragContainer || targetGridElement;
        var currentSettings = drag.getGrid()._settings;
        var currentContainer = element.parentNode;
        var translateX;
        var translateY;
        var offsetDiff;
        drag._isMigrating = false;
        drag.destroy();
        item._animate.destroy();
        item._animateChild.destroy();
        removeClass(element, currentSettings.itemClass);
        removeClass(element, currentSettings.itemVisibleClass);
        removeClass(element, currentSettings.itemHiddenClass);
        addClass(element, targetSettings.itemClass);
        addClass(element, targetSettings.itemVisibleClass);
        item._animate = new Grid.ItemAnimate(item, element);
        item._animateChild = new Grid.ItemAnimate(item, item._child);
        if (targetContainer !== currentContainer) {
            targetContainer.appendChild(element);
            offsetDiff = getOffsetDiff(currentContainer, targetContainer, true);
            translateX = getTranslateAsFloat(element, 'x') - offsetDiff.left;
            translateY = getTranslateAsFloat(element, 'y') - offsetDiff.top;
        }
        item._refreshDimensions()._refreshSortData();
        offsetDiff = getOffsetDiff(targetContainer, targetGridElement, true);
        release.containerDiffX = offsetDiff.left;
        release.containerDiffY = offsetDiff.top;
        item._drag = targetSettings.dragEnabled ? new Grid.ItemDrag(item) : null;
        if (targetContainer !== currentContainer) {
            setStyles(element, {
                transform: getTranslateString(translateX, translateY)
            });
        }
        item._child.removeAttribute('style');
        targetGrid._itemShowHandler.start(item, true);
        release.start();
        return drag;
    };
    ItemDrag.prototype.cancelRafLoop = function() {
        var id = this.getItem()._id;
        rafLoop.cancel(rafQueueScroll, id);
        rafLoop.cancel(rafQueueMove, id);
        return this;
    };
    ItemDrag.prototype.stop = function() {
        var drag = this;
        var dragData = drag._data;
        var item = drag.getItem();
        var element = item._element;
        var grid = drag.getGrid();
        if (!dragData.isActive) {
            return drag;
        }
        if (drag._isMigrating) {
            return drag.finishMigration(dragData.currentEvent);
        }
        drag.cancelRafLoop();
        drag.unbindScrollListeners();
        drag._checkSortOverlap('cancel');
        if (element.parentNode !== grid._element) {
            grid._element.appendChild(element);
            setStyles(element, {
                transform: getTranslateString(dragData.gridX, dragData.gridY)
            });
        }
        removeClass(element, grid._settings.itemDraggingClass);
        drag.reset();
        return drag;
    };
    ItemDrag.prototype.onStart = function(event) {
        var drag = this;
        var item = drag.getItem();
        if (!item._isActive) {
            return drag;
        }
        var element = item._element;
        var grid = drag.getGrid();
        var settings = grid._settings;
        var dragData = drag._data;
        var release = item._release;
        var migrate = item._migrate;
        var gridContainer = grid._element;
        var dragContainer = settings.dragContainer || gridContainer;
        var containingBlock = getContainingBlock(dragContainer, true);
        var offsetDiff = dragContainer !== gridContainer ? getOffsetDiff(containingBlock, gridContainer) : 0;
        var currentLeft = getTranslateAsFloat(element, 'x');
        var currentTop = getTranslateAsFloat(element, 'y');
        var elementRect = element.getBoundingClientRect();
        if (item.isPositioning()) {
            item._stopLayout(true, {
                transform: getTranslateString(currentLeft, currentTop)
            });
        }
        if (migrate.isActive) {
            currentLeft -= migrate.containerDiffX;
            currentTop -= migrate.containerDiffY;
            migrate.stop(true, {
                transform: getTranslateString(currentLeft, currentTop)
            });
        }
        if (item.isReleasing()) {
            release.reset();
        }
        dragData.isActive = true;
        dragData.startEvent = dragData.currentEvent = event;
        dragData.container = dragContainer;
        dragData.containingBlock = containingBlock;
        dragData.elementClientX = elementRect.left;
        dragData.elementClientY = elementRect.top;
        dragData.left = dragData.gridX = currentLeft;
        dragData.top = dragData.gridY = currentTop;
        grid._emit(evDragInit, item, event);
        if (dragContainer !== gridContainer) {
            dragData.containerDiffX = offsetDiff.left;
            dragData.containerDiffY = offsetDiff.top;
            if (element.parentNode === dragContainer) {
                dragData.gridX = currentLeft - dragData.containerDiffX;
                dragData.gridY = currentTop - dragData.containerDiffY;
            } else {
                dragData.left = currentLeft + dragData.containerDiffX;
                dragData.top = currentTop + dragData.containerDiffY;
                dragContainer.appendChild(element);
                setStyles(element, {
                    transform: getTranslateString(dragData.left, dragData.top)
                });
            }
        }
        addClass(element, settings.itemDraggingClass);
        drag.bindScrollListeners();
        grid._emit(evDragStart, item, event);
        return drag;
    };
    ItemDrag.prototype.onMove = function(event) {
        var drag = this;
        var item = drag.getItem();
        if (!item._isActive) {
            return drag.stop();
        }
        var element = item._element;
        var grid = drag.getGrid();
        var settings = grid._settings;
        var dragData = drag._data;
        var axis = settings.dragAxis;
        var xDiff = event.deltaX - dragData.currentEvent.deltaX;
        var yDiff = event.deltaY - dragData.currentEvent.deltaY;
        rafLoop.add(rafQueueMove, item._id, function() {
            dragData.currentEvent = event;
            if (axis !== 'y') {
                dragData.left += xDiff;
                dragData.gridX += xDiff;
                dragData.elementClientX += xDiff;
            }
            if (axis !== 'x') {
                dragData.top += yDiff;
                dragData.gridY += yDiff;
                dragData.elementClientY += yDiff;
            }
            settings.dragSort && drag._checkSortOverlap();
        }, function() {
            setStyles(element, {
                transform: getTranslateString(dragData.left, dragData.top)
            });
            grid._emit(evDragMove, item, event);
        });
        return drag;
    };
    ItemDrag.prototype.onScroll = function(event) {
        var drag = this;
        var item = drag.getItem();
        var element = item._element;
        var grid = drag.getGrid();
        var settings = grid._settings;
        var axis = settings.dragAxis;
        var dragData = drag._data;
        var gridContainer = grid._element;
        var elementRect;
        var xDiff;
        var yDiff;
        var offsetDiff;
        rafLoop.add(rafQueueScroll, item._id, function() {
            elementRect = element.getBoundingClientRect();
            xDiff = dragData.elementClientX - elementRect.left;
            yDiff = dragData.elementClientY - elementRect.top;
            if (dragData.container !== gridContainer) {
                offsetDiff = getOffsetDiff(dragData.containingBlock, gridContainer);
                dragData.containerDiffX = offsetDiff.left;
                dragData.containerDiffY = offsetDiff.top;
            }
            if (axis !== 'y') {
                dragData.left += xDiff;
                dragData.gridX = dragData.left - dragData.containerDiffX;
            }
            if (axis !== 'x') {
                dragData.top += yDiff;
                dragData.gridY = dragData.top - dragData.containerDiffY;
            }
            settings.dragSort && drag._checkSortOverlap();
        }, function() {
            setStyles(element, {
                transform: getTranslateString(dragData.left, dragData.top)
            });
            grid._emit(evDragScroll, item, event);
        });
        return drag;
    };
    ItemDrag.prototype.onEnd = function(event) {
        var drag = this;
        var item = drag.getItem();
        var element = item._element;
        var grid = drag.getGrid();
        var settings = grid._settings;
        var dragData = drag._data;
        var release = item._release;
        if (!item._isActive) {
            return drag.stop();
        }
        drag.cancelRafLoop();
        settings.dragSort && drag._checkSortOverlap('finish');
        drag.unbindScrollListeners();
        release.containerDiffX = dragData.containerDiffX;
        release.containerDiffY = dragData.containerDiffY;
        drag.reset();
        removeClass(element, settings.itemDraggingClass);
        grid._emit(evDragEnd, item, event);
        drag._isMigrating ? drag.finishMigration() : release.start();
        return drag;
    };

    function normalizeArrayIndex(array, index, isMigration) {
        var length = array.length;
        var maxIndex = Math.max(0, isMigration ? length : length - 1);
        return index > maxIndex ? maxIndex : index < 0 ? Math.max(maxIndex + index + 1, 0) : index;
    }

    function arraySwap(array, index, withIndex) {
        if (array.length < 2) {
            return;
        }
        var indexA = normalizeArrayIndex(array, index);
        var indexB = normalizeArrayIndex(array, withIndex);
        var temp;
        if (indexA !== indexB) {
            temp = array[indexA];
            array[indexA] = array[indexB];
            array[indexB] = temp;
        }
    }

    function arrayMove(array, fromIndex, toIndex) {
        if (array.length < 2) {
            return;
        }
        var from = normalizeArrayIndex(array, fromIndex);
        var to = normalizeArrayIndex(array, toIndex);
        if (from !== to) {
            array.splice(to, 0, array.splice(from, 1)[0]);
        }
    }

    function arrayUnique(array) {
        var ret = [];
        var len = array.length;
        var i;
        if (len) {
            ret[0] = array[0];
            for (i = 1; i < len; i++) {
                if (ret.indexOf(array[i]) < 0) {
                    ret.push(array[i]);
                }
            }
        }
        return ret;
    }

    function isPlainObject(val) {
        return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
    }

    function isNodeList(val) {
        var type = Object.prototype.toString.call(val);
        return type === '[object HTMLCollection]' || type === '[object NodeList]';
    }

    function mergeObjects(target, source) {
        Object.keys(source).forEach(function(propName) {
            var isObject = isPlainObject(source[propName]);
            if (isPlainObject(target[propName]) && isObject) {
                target[propName] = mergeObjects({}, target[propName]);
                target[propName] = mergeObjects(target[propName], source[propName]);
            } else {
                target[propName] = isObject ? mergeObjects({}, source[propName]) : Array.isArray(source[propName]) ? source[propName].concat() : source[propName];
            }
        });
        return target;
    }

    function insertItemsToArray(array, items, index) {
        var targetIndex = typeof index === typeNumber ? index : -1;
        array.splice.apply(array, [targetIndex < 0 ? array.length - targetIndex + 1 : targetIndex, 0].concat(items));
    }

    function debounce(fn, wait) {
        var timeout;
        var actionCancel = 'cancel';
        var actionFinish = 'finish';
        return wait > 0 ? function(action) {
            if (timeout !== undefined) {
                timeout = global.clearTimeout(timeout);
                if (action === actionFinish) {
                    fn();
                }
            }
            if (action !== actionCancel && action !== actionFinish) {
                timeout = global.setTimeout(function() {
                    timeout = undefined;
                    fn();
                }, wait);
            }
        } : function(action) {
            if (action !== actionCancel) {
                fn();
            }
        };
    }

    function createRafLoop() {
        var nextTick = null;
        var queue = [];
        var map = {};
        var raf = (global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.msRequestAnimationFrame || function(cb) {
            return global.setTimeout(cb, 16);
        }).bind(global);

        function add(type, id, readCallback, writeCallback) {
            var currentIndex = queue.indexOf(type + id);
            if (currentIndex > -1) {
                queue.splice(currentIndex, 1);
            }
            type === rafQueueMove || type === rafQueueScroll ? queue.unshift(type + id) : queue.push(type + id);
            map[type + id] = [readCallback, writeCallback];
            !nextTick && (nextTick = raf(flush));
        }

        function cancel(type, id) {
            var currentIndex = queue.indexOf(type + id);
            if (currentIndex > -1) {
                queue.splice(currentIndex, 1);
                map[type + id] = undefined;
            }
        }

        function flush() {
            var maxBatchSize = +Grid._maxRafBatchSize || 100;
            var batch = queue.splice(0, Math.min(maxBatchSize, queue.length));
            var batchMap = {};
            var i;
            nextTick = null;
            for (i = 0; i < batch.length; i++) {
                batchMap[batch[i]] = map[batch[i]];
                map[batch[i]] = undefined;
            }
            for (i = 0; i < batch.length; i++) {
                batchMap[batch[i]][0]();
            }
            for (i = 0; i < batch.length; i++) {
                batchMap[batch[i]][1]();
            }
            if (!nextTick && queue.length) {
                nextTick = raf(flush);
            }
        }
        return {
            add: add,
            cancel: cancel
        };
    }

    function getStyleName(string) {
        return string.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    function getStyle(element, style) {
        return global.getComputedStyle(element, null).getPropertyValue(style === 'transform' ? transform.styleName || style : style);
    }

    function getStyleAsFloat(el, style) {
        return parseFloat(getStyle(el, style)) || 0;
    }

    function getTranslateAsFloat(element, axis) {
        return parseFloat((getStyle(element, 'transform') || '').replace('matrix(', '').split(',')[axis === 'x' ? 4 : 5]) || 0;
    }

    function getTranslateString(translateX, translateY) {
        return 'translateX(' + translateX + 'px) translateY(' + translateY + 'px)';
    }

    function getCurrentStyles(element, styles) {
        var current = {};
        var keys = Object.keys(styles);
        var i;
        for (i = 0; i < keys.length; i++) {
            current[keys[i]] = getStyle(element, getStyleName(keys[i]));
        }
        return current;
    }

    function setStyles(element, styles) {
        var props = Object.keys(styles);
        var i;
        for (i = 0; i < props.length; i++) {
            element.style[props[i] === 'transform' && transform ? transform.propName : props[i]] = styles[props[i]];
        }
    }

    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else if (!elementMatches(element, '.' + className)) {
            element.className += ' ' + className;
        }
    }

    function removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        } else if (elementMatches(element, '.' + className)) {
            element.className = (' ' + element.className + ' ').replace(' ' + className + ' ', ' ').trim();
        }
    }

    function nodeListToArray(nodeList) {
        return [].slice.call(nodeList);
    }

    function getSupportedElementMatches() {
        var p = Element.prototype;
        var fn = p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
        return function(el, selector) {
            return fn.call(el, selector);
        };
    }

    function getSupportedStyle(style) {
        var styleCap = style.charAt(0).toUpperCase() + style.slice(1);
        var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
        var prefix;
        var propName;
        var i;
        for (i = 0; i < prefixes.length; i++) {
            prefix = prefixes[i];
            propName = prefix ? prefix + styleCap : style;
            if (docElem.style[propName] !== undefined) {
                prefix = prefix.toLowerCase();
                return {
                    prefix: prefix,
                    propName: propName,
                    styleName: prefix ? '-' + prefix + '-' + style : style
                };
            }
        }
        return null;
    }

    function getOffsetDiff(elemA, elemB, compareContainingBlocks) {
        if (elemA === elemB) {
            return {
                left: 0,
                top: 0
            };
        }
        if (compareContainingBlocks) {
            elemA = getContainingBlock(elemA, true);
            elemB = getContainingBlock(elemB, true);
        }
        var aOffset = getOffset(elemA, true);
        var bOffset = getOffset(elemB, true);
        return {
            left: bOffset.left - aOffset.left,
            top: bOffset.top - aOffset.top
        };
    }

    function getOffset(element, excludeElementBorders) {
        var rect;
        var ret = {
            left: 0,
            top: 0
        };
        if (element === doc) {
            return ret;
        }
        ret.left = global.pageXOffset || 0;
        ret.top = global.pageYOffset || 0;
        if (element.self === global.self) {
            return ret;
        }
        rect = element.getBoundingClientRect();
        ret.left += rect.left;
        ret.top += rect.top;
        if (excludeElementBorders) {
            ret.left += getStyleAsFloat(element, 'border-left-width');
            ret.top += getStyleAsFloat(element, 'border-top-width');
        }
        return ret;
    }

    function getContainingBlock(element, isParent) {
        var ret = (isParent ? element : element.parentElement) || doc;
        while (ret && ret !== doc && getStyle(ret, 'position') === 'static' && !isTransformed(ret)) {
            ret = ret.parentElement || doc;
        }
        return ret;
    }

    function getScrollParents(element) {
        var ret = [];
        var overflowRegex = /(auto|scroll)/;
        var parent = element.parentNode;
        if (transformLeaksFixed) {
            if (getStyle(element, 'position') === 'fixed') {
                return ret;
            }
            while (parent && parent !== doc && parent !== docElem) {
                if (overflowRegex.test(getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x'))) {
                    ret.push(parent);
                }
                parent = getStyle(parent, 'position') === 'fixed' ? null : parent.parentNode;
            }
            parent !== null && ret.push(global);
        } else {
            while (parent && parent !== doc) {
                if (getStyle(element, 'position') === 'fixed' && !isTransformed(parent)) {
                    parent = parent.parentNode;
                    continue;
                }
                if (overflowRegex.test(getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x'))) {
                    ret.push(parent);
                }
                element = parent;
                parent = parent.parentNode;
            }
            if (ret[ret.length - 1] === docElem) {
                ret[ret.length - 1] = global;
            } else {
                ret.push(global);
            }
        }
        return ret;
    }

    function doesTransformLeakFixed() {
        if (!transform) {
            return true;
        }
        var elems = [0, 1].map(function(elem, isInner) {
            elem = doc.createElement('div');
            setStyles(elem, {
                position: isInner ? 'fixed' : 'absolute',
                display: 'block',
                visibility: 'hidden',
                left: isInner ? '0px' : '1px',
                transform: 'none'
            });
            return elem;
        });
        var outer = body.appendChild(elems[0]);
        var inner = outer.appendChild(elems[1]);
        var left = inner.getBoundingClientRect().left;
        setStyles(outer, {
            transform: 'scale(1)'
        });
        var isLeaking = left === inner.getBoundingClientRect().left;
        body.removeChild(outer);
        return isLeaking;
    }

    function isTransformed(element) {
        var transform = getStyle(element, 'transform');
        var display = getStyle(element, 'display');
        return transform !== 'none' && display !== 'inline' && display !== 'none';
    }

    function getRectOverlapScore(a, b) {
        if (!muuriLayout.doRectsOverlap(a, b)) {
            return 0;
        }
        var width = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
        var height = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
        var maxWidth = Math.min(a.width, b.width);
        var maxHeight = Math.min(a.height, b.height);
        return (width * height) / (maxWidth * maxHeight) * 100;
    }

    function getItemIndexMap(items) {
        var ret = {};
        var i;
        for (i = 0; i < items.length; i++) {
            ret[items[i]._id] = i;
        }
        return ret;
    }

    function compareItemIndices(itemA, itemB, isDescending, indexMap) {
        var indexA = indexMap[itemA._id];
        var indexB = indexMap[itemB._id];
        return isDescending ? indexB - indexA : indexA - indexB;
    }

    function compareItems(itemA, itemB, isDescending, criterias) {
        var ret = 0;
        var criteriaName;
        var criteriaOrder;
        var valA;
        var valB;
        var i;
        for (i = 0; i < criterias.length; i++) {
            criteriaName = criterias[i][0];
            criteriaOrder = criterias[i][1];
            valA = (itemA._sortData ? itemA : itemA._refreshSortData())._sortData[criteriaName];
            valB = (itemB._sortData ? itemB : itemB._refreshSortData())._sortData[criteriaName];
            if (criteriaOrder === 'desc' || (!criteriaOrder && isDescending)) {
                ret = valB < valA ? -1 : valB > valA ? 1 : 0;
            } else {
                ret = valA < valB ? -1 : valA > valB ? 1 : 0;
            }
            if (ret !== 0) {
                return ret;
            }
        }
        return ret;
    }

    function sortItemsByReference(items, refItems) {
        var newItems = [];
        var currentItems = items.concat();
        var item;
        var currentIndex;
        var i;
        for (i = 0; i < refItems.length; i++) {
            item = refItems[i];
            currentIndex = currentItems.indexOf(item);
            if (currentIndex > -1) {
                newItems.push(item);
                currentItems.splice(currentIndex, 1);
            }
        }
        items.splice.apply(items, [0, items.length].concat(newItems).concat(currentItems));
        return items;
    }

    function isPointWithinRect(x, y, rect) {
        return rect.width && rect.height && x >= rect.left && x < (rect.left + rect.width) && y >= rect.top && y < (rect.top + rect.height);
    }

    function gridShowHideHandler(inst, method, items, options) {
        var targetItems = inst.getItems(items);
        var opts = options || {};
        var isInstant = opts.instant === true;
        var callback = opts.onFinish;
        var layout = opts.layout ? opts.layout : opts.layout === undefined;
        var counter = targetItems.length;
        var isShow = method === 'show';
        var startEvent = isShow ? evShowStart : evHideStart;
        var endEvent = isShow ? evShowEnd : evHideEnd;
        var needsLayout = false;
        var completedItems = [];
        var hiddenItems = [];
        var item;
        var i;
        if (!counter) {
            if (typeof callback === typeFunction) {
                callback(targetItems);
            }
        } else {
            inst._emit(startEvent, targetItems.concat());
            for (i = 0; i < targetItems.length; i++) {
                item = targetItems[i];
                if ((isShow && !item._isActive) || (!isShow && item._isActive)) {
                    needsLayout = true;
                }
                if (isShow && !item._isActive) {
                    item._skipNextLayoutAnimation = true;
                }
                isShow && item._isHidden && hiddenItems.push(item);
                item['_' + method](isInstant, function(interrupted, item) {
                    if (!interrupted) {
                        completedItems.push(item);
                    }
                    if (--counter < 1) {
                        if (typeof callback === typeFunction) {
                            callback(completedItems.concat());
                        }
                        inst._emit(endEvent, completedItems.concat());
                    }
                });
            }
            hiddenItems.length && inst.refreshItems(hiddenItems);
            if (needsLayout && layout) {
                inst.layout(layout === 'instant', typeof layout === typeFunction ? layout : undefined);
            }
        }
        return inst;
    }

    function getItemVisibilityHandler(type, settings) {
        var isShow = type === 'show';
        var duration = parseInt(isShow ? settings.showDuration : settings.hideDuration) || 0;
        var easing = (isShow ? settings.showEasing : settings.hideEasing) || 'ease';
        var styles = isShow ? settings.visibleStyles : settings.hiddenStyles;
        var isEnabled = duration > 0;
        var currentStyles;
        styles = isPlainObject(styles) ? styles : null;
        return {
            start: function(item, instant, onFinish) {
                if (!styles) {
                    onFinish && onFinish();
                } else {
                    rafLoop.cancel(rafQueueVisibility, item._id);
                    if (!isEnabled || instant) {
                        if (item._animateChild.isAnimating()) {
                            item._animateChild.stop(styles);
                        } else {
                            setStyles(item._child, styles);
                        }
                        onFinish && onFinish();
                    } else {
                        rafLoop.add(rafQueueVisibility, item._id, function() {
                            currentStyles = getCurrentStyles(item._child, styles);
                        }, function() {
                            item._animateChild.start(currentStyles, styles, {
                                duration: duration,
                                easing: easing,
                                onFinish: onFinish
                            });
                        });
                    }
                }
            },
            stop: function(item, targetStyles) {
                rafLoop.cancel(rafQueueVisibility, item._id);
                item._animateChild.stop(targetStyles);
            }
        };
    }

    function getTargetGrid(item, rootGrid, itemRect, threshold) {
        var ret = null;
        var dragSort = rootGrid._settings.dragSort;
        var grids = dragSort === true ? [rootGrid] : dragSort.call(rootGrid, item);
        var bestScore = -1;
        var gridScore;
        var grid;
        var i;
        if (!Array.isArray(grids)) {
            return ret;
        }
        for (i = 0; i < grids.length; i++) {
            grid = grids[i];
            if (grid._isDestroyed) {
                continue;
            }
            grid._refreshDimensions();
            gridScore = getRectOverlapScore(itemRect, {
                width: grid._width,
                height: grid._height,
                left: grid._left,
                top: grid._top
            });
            if (gridScore > threshold && gridScore > bestScore) {
                bestScore = gridScore;
                ret = grid;
            }
        }
        return ret;
    }

    function processQueue(queue, interrupted, instance) {
        var callbacks = queue.splice(0, queue.length);
        var i;
        for (i = 0; i < callbacks.length; i++) {
            callbacks[i](interrupted, instance);
        }
    }

    function isItemInState(item, state) {
        var methodName;
        if (state === 'inactive') {
            return !item.isActive();
        }
        if (state === 'hidden') {
            return !item.isVisible();
        }
        methodName = 'is' + state.charAt(0).toUpperCase() + state.slice(1);
        return typeof item[methodName] === typeFunction ? item[methodName]() : false;
    }

    function preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
    }

    function mergeSettings(defaultSettings, userSettings) {
        var ret = mergeObjects({}, defaultSettings);
        ret = userSettings ? mergeObjects(ret, userSettings) : ret;
        ret.visibleStyles = (userSettings || {}).visibleStyles || (defaultSettings || {}).visibleStyles;
        ret.hiddenStyles = (userSettings || {}).hiddenStyles || (defaultSettings || {}).hiddenStyles;
        return ret;
    }

    function dragStartPredicateResolve(item, event) {
        var predicate = item._drag._startPredicateData;
        var pointer = event.changedPointers[0];
        var pageX = pointer && pointer.pageX || 0;
        var pageY = pointer && pointer.pageY || 0;
        var handleRect;
        if (event.distance < predicate.distance || predicate.delay) {
            return;
        }
        handleRect = predicate.handleElement.getBoundingClientRect();
        dragStartPredicateReset(item);
        return isPointWithinRect(pageX, pageY, {
            width: handleRect.width,
            height: handleRect.height,
            left: handleRect.left + (global.pageXOffset || 0),
            top: handleRect.top + (global.pageYOffset || 0)
        });
    }

    function dragStartPredicateReset(item) {
        var predicate = item._drag._startPredicateData;
        if (predicate) {
            if (predicate.delayTimer) {
                predicate.delayTimer = global.clearTimeout(predicate.delayTimer);
            }
            item._drag._startPredicateData = null;
        }
    }
    /*!
     * muuriLayout v0.5.4
     * Copyright (c) 2016 Niklas Rämö <inramo@gmail.com>
     * Released under the MIT license
     */
    function muuriLayout(items, width, height, options) {
        var fillGaps = !!options.fillGaps;
        var isHorizontal = !!options.horizontal;
        var alignRight = !!options.alignRight;
        var alignBottom = !!options.alignBottom;
        var rounding = !!options.rounding;
        var layout = {
            slots: {},
            width: isHorizontal ? 0 : (rounding ? Math.round(width) : width),
            height: !isHorizontal ? 0 : (rounding ? Math.round(height) : height),
            setWidth: isHorizontal,
            setHeight: !isHorizontal
        };
        var freeSlots = [];
        var slotIds;
        var slotData;
        var slot;
        var item;
        var itemWidth;
        var itemHeight;
        var i;
        if (!items.length) {
            return layout;
        }
        for (i = 0; i < items.length; i++) {
            item = items[i];
            itemWidth = item._width + item._margin.left + item._margin.right;
            itemHeight = item._height + item._margin.top + item._margin.bottom;
            if (rounding) {
                itemWidth = Math.round(itemWidth);
                itemHeight = Math.round(itemHeight);
            }
            slotData = muuriLayout.getSlot(layout, freeSlots, itemWidth, itemHeight, !isHorizontal, fillGaps);
            slot = slotData[0];
            freeSlots = slotData[1];
            if (isHorizontal) {
                layout.width = Math.max(layout.width, slot.left + slot.width);
            } else {
                layout.height = Math.max(layout.height, slot.top + slot.height);
            }
            layout.slots[item._id] = slot;
        }
        if (alignRight || alignBottom) {
            slotIds = Object.keys(layout.slots);
            for (i = 0; i < slotIds.length; i++) {
                slot = layout.slots[slotIds[i]];
                if (alignRight) {
                    slot.left = layout.width - (slot.left + slot.width);
                }
                if (alignBottom) {
                    slot.top = layout.height - (slot.top + slot.height);
                }
            }
        }
        return layout;
    }
    muuriLayout.getSlot = function(layout, slots, itemWidth, itemHeight, vertical, fillGaps) {
        var leeway = 0.001;
        var newSlots = [];
        var item = {
            left: null,
            top: null,
            width: itemWidth,
            height: itemHeight
        };
        var slot;
        var potentialSlots;
        var ignoreCurrentSlots;
        var i;
        var ii;
        for (i = 0; i < slots.length; i++) {
            slot = slots[i];
            if (item.width <= (slot.width + leeway) && item.height <= (slot.height + leeway)) {
                item.left = slot.left;
                item.top = slot.top;
                break;
            }
        }
        if (item.left === null) {
            item.left = vertical ? 0 : layout.width;
            item.top = vertical ? layout.height : 0;
            if (!fillGaps) {
                ignoreCurrentSlots = true;
            }
        }
        if (vertical && (item.top + item.height) > layout.height) {
            if (item.left > 0) {
                newSlots.push({
                    left: 0,
                    top: layout.height,
                    width: item.left,
                    height: Infinity
                });
            }
            if ((item.left + item.width) < layout.width) {
                newSlots.push({
                    left: item.left + item.width,
                    top: layout.height,
                    width: layout.width - item.left - item.width,
                    height: Infinity
                });
            }
            layout.height = item.top + item.height;
        }
        if (!vertical && (item.left + item.width) > layout.width) {
            if (item.top > 0) {
                newSlots.push({
                    left: layout.width,
                    top: 0,
                    width: Infinity,
                    height: item.top
                });
            }
            if ((item.top + item.height) < layout.height) {
                newSlots.push({
                    left: layout.width,
                    top: item.top + item.height,
                    width: Infinity,
                    height: layout.height - item.top - item.height
                });
            }
            layout.width = item.left + item.width;
        }
        for (i = fillGaps ? 0 : ignoreCurrentSlots ? slots.length : i; i < slots.length; i++) {
            potentialSlots = muuriLayout.splitRect(slots[i], item);
            for (ii = 0; ii < potentialSlots.length; ii++) {
                slot = potentialSlots[ii];
                if (slot.width > 0.49 && slot.height > 0.49 && ((vertical && slot.top < layout.height) || (!vertical && slot.left < layout.width))) {
                    newSlots.push(slot);
                }
            }
        }
        if (newSlots.length) {
            newSlots = muuriLayout.purgeRects(newSlots).sort(vertical ? muuriLayout.sortRectsTopLeft : muuriLayout.sortRectsLeftTop);
        }
        return [item, newSlots];
    };
    muuriLayout.splitRect = function(rect, hole) {
        var ret = [];
        if (!muuriLayout.doRectsOverlap(rect, hole)) {
            return [{
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
            }];
        }
        if (rect.left < hole.left) {
            ret.push({
                left: rect.left,
                top: rect.top,
                width: hole.left - rect.left,
                height: rect.height
            });
        }
        if ((rect.left + rect.width) > (hole.left + hole.width)) {
            ret.push({
                left: hole.left + hole.width,
                top: rect.top,
                width: (rect.left + rect.width) - (hole.left + hole.width),
                height: rect.height
            });
        }
        if (rect.top < hole.top) {
            ret.push({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: hole.top - rect.top
            });
        }
        if ((rect.top + rect.height) > (hole.top + hole.height)) {
            ret.push({
                left: rect.left,
                top: hole.top + hole.height,
                width: rect.width,
                height: (rect.top + rect.height) - (hole.top + hole.height)
            });
        }
        return ret;
    };
    muuriLayout.doRectsOverlap = function(a, b) {
        return !((a.left + a.width) <= b.left || (b.left + b.width) <= a.left || (a.top + a.height) <= b.top || (b.top + b.height) <= a.top);
    };
    muuriLayout.isRectWithinRect = function(a, b) {
        return a.left >= b.left && a.top >= b.top && (a.left + a.width) <= (b.left + b.width) && (a.top + a.height) <= (b.top + b.height);
    };
    muuriLayout.purgeRects = function(rects) {
        var i = rects.length;
        var ii;
        var rectA;
        var rectB;
        while (i--) {
            rectA = rects[i];
            ii = rects.length;
            while (ii--) {
                rectB = rects[ii];
                if (i !== ii && muuriLayout.isRectWithinRect(rectA, rectB)) {
                    rects.splice(i, 1);
                    break;
                }
            }
        }
        return rects;
    };
    muuriLayout.sortRectsTopLeft = function(a, b) {
        return a.top - b.top || a.left - b.left;
    };
    muuriLayout.sortRectsLeftTop = function(a, b) {
        return a.left - b.left || a.top - b.top;
    };
    return Grid;
}));