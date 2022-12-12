/**
 * Lightning v2.8.1
 *
 * https://github.com/rdkcentral/Lightning
 */ !function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).lng = e();
}(this, function() {
    "use strict";
    class StageUtils {
        static mergeNumbers(t, e, i) {
            return t * i + e * (1 - i);
        }
        static rgb(t, e, i) {
            return (t << 16) + (e << 8) + i + 4278190080;
        }
        static rgba(t, e, i, s) {
            return (t << 16) + (e << 8) + i + 16777216 * (255 * s | 0);
        }
        static getRgbString(t) {
            return "rgb(" + (t / 65536 | 0) % 256 + "," + (t / 256 | 0) % 256 + "," + t % 256 + ")";
        }
        static getRgbaString(t) {
            return "rgba(" + (t / 65536 | 0) % 256 + "," + (t / 256 | 0) % 256 + "," + t % 256 + "," + ((t / 16777216 | 0) / 255).toFixed(4) + ")";
        }
        static getRgbaStringFromArray(t) {
            return "rgba(" + Math.floor(255 * t[0]) + "," + Math.floor(255 * t[1]) + "," + Math.floor(255 * t[2]) + "," + (Math.floor(255 * t[3]) / 255).toFixed(4) + ")";
        }
        static getRgbaComponentsNormalized(t) {
            return [
                (t / 65536 | 0) % 256 / 255,
                (t / 256 | 0) % 256 / 255,
                t % 256 / 255,
                (t / 16777216 | 0) / 255
            ];
        }
        static getRgbComponentsNormalized(t) {
            return [
                (t / 65536 | 0) % 256 / 255,
                (t / 256 | 0) % 256 / 255,
                t % 256 / 255
            ];
        }
        static getRgbaComponents(t) {
            return [
                (t / 65536 | 0) % 256,
                (t / 256 | 0) % 256,
                t % 256,
                t / 16777216 | 0
            ];
        }
        static getArgbNumber(t) {
            t[0] = Math.max(0, Math.min(255, t[0])), t[1] = Math.max(0, Math.min(255, t[1])), t[2] = Math.max(0, Math.min(255, t[2])), t[3] = Math.max(0, Math.min(255, t[3]));
            let e = ((0 | t[3]) << 24) + ((0 | t[0]) << 16) + ((0 | t[1]) << 8) + (0 | t[2]);
            return e < 0 && (e = 4294967295 + e + 1), e;
        }
        static mergeColors(t, e, i) {
            let s = (t / 65536 | 0) % 256 * i + (e / 65536 | 0) % 256 * (1 - i), r = (t / 256 | 0) % 256 * i + (e / 256 | 0) % 256 * (1 - i), n = t % 256 * i + e % 256 * (1 - i), o = (t / 16777216 | 0) * i + (e / 16777216 | 0) * (1 - i);
            return 16777216 * Math.round(o) + 65536 * Math.round(s) + 256 * Math.round(r) + Math.round(n);
        }
        static mergeMultiColors(t, e) {
            let i = 0, s = 0, r = 0, n = 0, o = 0, a = t.length;
            for(let h = 0; h < a; h++){
                let a1 = (t[h] / 65536 | 0) % 256, l = (t[h] / 256 | 0) % 256, _ = t[h] % 256, u = t[h] / 16777216 | 0;
                i += a1 * e[h], s += l * e[h], r += _ * e[h], n += u * e[h], o += e[h];
            }
            return o = 1 / o, 16777216 * Math.round(n * o) + 65536 * Math.round(i * o) + 256 * Math.round(s * o) + Math.round(r * o);
        }
        static mergeMultiColorsEqual(t) {
            let e = 0, i = 0, s = 0, r = 0, n = 0, o = t.length;
            for(let a = 0; a < o; a++)e += (t[a] / 65536 | 0) % 256, i += (t[a] / 256 | 0) % 256, s += t[a] % 256, r += t[a] / 16777216 | 0, n += 1;
            return n = 1 / n, 16777216 * Math.round(r * n) + 65536 * Math.round(e * n) + 256 * Math.round(i * n) + Math.round(s * n);
        }
        static mergeColorAlpha(t, e) {
            let i = (t / 16777216 | 0) * e | 0;
            return ((t >> 16 & 255) * i / 255 & 255) + ((65280 & t) * i / 255 & 65280) + (((255 & t) << 16) * i / 255 & 16711680) + (i << 24);
        }
        static rad(t) {
            return t * (Math.PI / 180);
        }
        static getTimingBezier(t, e, i, s) {
            let r = 3 * t, n = 3 * (i - t) - r, o = 1 - r - n, a = 3 * e, h = 3 * (s - e) - a, l = 1 - a - h;
            return function(t) {
                if (t >= 1) return 1;
                if (t <= 0) return 0;
                let e, i, s, _ = .5;
                for(let u = 0; u < 20; u++){
                    if (e = _ * (_ * (_ * o + n) + r), s = t - e, s > -0.00000001 && s < 1e-8) return _ * (_ * (_ * l + h) + a);
                    if (i = _ * (_ * (3 * o) + 2 * n) + r, i > 1e-10 && i < 1e-10) break;
                    _ += s / i;
                }
                let u1 = 0, c = 1;
                for(let i1 = 0; i1 < 20; i1++){
                    if (_ = .5 * (u1 + c), e = _ * (_ * (_ * o + n) + r), s = t - e, s > -0.00000001 && s < 1e-8) return _ * (_ * (_ * l + h) + a);
                    s < 0 ? c = _ : u1 = _;
                }
            };
        }
        static getTimingFunction(t) {
            switch(t){
                case "linear":
                    return function(t) {
                        return t;
                    };
                case "ease":
                    return StageUtils.getTimingBezier(.25, .1, .25, 1);
                case "ease-in":
                    return StageUtils.getTimingBezier(.42, 0, 1, 1);
                case "ease-out":
                    return StageUtils.getTimingBezier(0, 0, .58, 1);
                case "ease-in-out":
                    return StageUtils.getTimingBezier(.42, 0, .58, 1);
                case "step-start":
                    return function() {
                        return 1;
                    };
                case "step-end":
                    return function(t) {
                        return 1 === t ? 1 : 0;
                    };
                default:
                    let e = "cubic-bezier(";
                    if (t && 0 === t.indexOf(e)) {
                        let i = t.substr(e.length, t.length - e.length - 1).split(",");
                        if (4 !== i.length) return console.warn("[Lightning] Unknown timing function: " + t), function(t) {
                            return t;
                        };
                        let s = parseFloat(i[0]), r = parseFloat(i[1]), n = parseFloat(i[2]), o = parseFloat(i[3]);
                        return isNaN(s) || isNaN(r) || isNaN(n) || isNaN(o) ? (console.warn("[Lightning] Unknown timing function: " + t), function(t) {
                            return t;
                        }) : StageUtils.getTimingBezier(s, r, n, o);
                    }
                    return console.warn("[Lightning] Unknown timing function: " + t), function(t) {
                        return t;
                    };
            }
        }
    }
    class Utils {
        static isFunction(t) {
            return "function" == typeof t;
        }
        static isNumber(t) {
            return "number" == typeof t;
        }
        static isInteger(t) {
            return "number" == typeof t && t % 1 == 0;
        }
        static isBoolean(t) {
            return !0 === t || !1 === t;
        }
        static isString(t) {
            return "string" == typeof t;
        }
        static clone(t) {
            return Utils.isObjectLiteral(t) || Array.isArray(t) ? Utils.getDeepClone(t) : t;
        }
        static cloneObjShallow(t) {
            let e = Object.keys(t), i = {};
            for(let s = 0; s < e.length; s++)i[e[s]] = t[e[s]];
            return i;
        }
        static merge(t, e) {
            let i = Object.keys(e);
            for(let s = 0; s < i.length; s++)t[i[s]] = e[i[s]];
            return t;
        }
        static isObject(t) {
            let e = typeof t;
            return !!t && ("object" === e || "function" === e);
        }
        static isPlainObject(t) {
            return !!t && "object" === typeof t;
        }
        static isObjectLiteral(t) {
            return "object" == typeof t && t && t.constructor === Object;
        }
        static getArrayIndex(t, e) {
            return Utils.getModuloIndex(t, e.length);
        }
        static getModuloIndex(t, e) {
            if (0 === e) return t;
            for(; t < 0;)t += Math.ceil(-t / e) * e;
            return t %= e;
        }
        static getDeepClone(t) {
            let e, i;
            if (Utils.isFunction(t)) return t;
            if (Array.isArray(t)) {
                i = [];
                let s = Object.keys(t);
                for(e = 0; e < s.length; e++)i[s[e]] = Utils.getDeepClone(t[s[e]]);
                return i;
            }
            if (Utils.isObject(t)) {
                i = {};
                let s1 = Object.keys(t);
                for(e = 0; e < s1.length; e++)i[s1[e]] = Utils.getDeepClone(t[s1[e]]);
                return i;
            }
            return t;
        }
        static equalValues(t, e) {
            return typeof t == typeof e && (Utils.isObjectLiteral(t) ? Utils.isObjectLiteral(e) && Utils.equalObjectLiterals(t, e) : Array.isArray(t) ? Array.isArray(e) && Utils.equalArrays(t, e) : t === e);
        }
        static equalObjectLiterals(t, e) {
            let i = Object.keys(t), s = Object.keys(e);
            if (i.length !== s.length) return !1;
            for(let r = 0, n = i.length; r < n; r++){
                const n1 = i[r], o = s[r];
                if (n1 !== o) return !1;
                const a = t[n1], h = e[o];
                if (!Utils.equalValues(a, h)) return !1;
            }
            return !0;
        }
        static equalArrays(t, e) {
            if (t.length !== e.length) return !1;
            for(let i = 0, s = t.length; i < s; i++)if (!this.equalValues(t[i], e[i])) return !1;
            return !0;
        }
        static setToArray(t) {
            let e = [];
            return t.forEach(function(t) {
                e.push(t);
            }), e;
        }
        static iteratorToArray(t) {
            let e = [], i = t.next();
            for(; !i.done;)e.push(i.value), i = t.next();
            return e;
        }
        static isUcChar(t) {
            return t >= 65 && t <= 90;
        }
    }
    Utils.isWeb = "undefined" != typeof window && "undefined" == typeof sparkscene, Utils.isWPE = Utils.isWeb && -1 !== navigator.userAgent.indexOf("WPE"), Utils.isSpark = "undefined" != typeof sparkscene, Utils.isNode = "undefined" == typeof window || Utils.isSpark, Utils.isPS4 = Utils.isWeb && -1 !== navigator.userAgent.indexOf("PlayStation 4"), Utils.isZiggo = Utils.isWeb && (-1 !== navigator.userAgent.indexOf("EOSSTB") || -1 !== navigator.userAgent.indexOf("HZNSTB"));
    class Base {
        static defaultSetter(t, e, i) {
            t[e] = i;
        }
        static patchObject(t, e) {
            if (Utils.isObjectLiteral(e)) {
                let i = Object.keys(e);
                for(let s = 0, r = i.length; s < r; s++){
                    let r1 = i[s];
                    this.patchObjectProperty(t, r1, e[r1]);
                }
            } else console.error("[Lightning] Settings must be object literal");
        }
        static patchObjectProperty(t, e, i) {
            let s = t.setSetting || Base.defaultSetter;
            "_" === e.charAt(0) ? "__create" !== e && console.error("[Lightning] Patch of private property '" + e + "' is not allowed") : "type" !== e && (Utils.isFunction(i) && i.__local && (i = i.__local(t)), s(t, e, i));
        }
        static local(t) {
            t.__local = !0;
        }
    }
    class SpacingCalculator {
        static getSpacing(t, e, i) {
            const s = e - 1;
            let r, n, o;
            switch(t){
                case "flex-start":
                    n = 0, o = 0;
                    break;
                case "flex-end":
                    n = i, o = 0;
                    break;
                case "center":
                    n = i / 2, o = 0;
                    break;
                case "space-between":
                    n = 0, o = Math.max(0, i) / s;
                    break;
                case "space-around":
                    if (i < 0) return this.getSpacing("center", e, i);
                    r = i / (s + 1), n = .5 * r, o = r;
                    break;
                case "space-evenly":
                    if (i < 0) return this.getSpacing("center", e, i);
                    r = i / (s + 2), n = r, o = r;
                    break;
                case "stretch":
                    n = 0, o = 0;
                    break;
                default:
                    throw new Error("Unknown mode: " + t);
            }
            return {
                spacingBefore: n,
                spacingBetween: o
            };
        }
    }
    class ContentAligner {
        constructor(t){
            this._layout = t, this._totalCrossAxisSize = 0;
        }
        get _lines() {
            return this._layout._lines;
        }
        init() {
            this._totalCrossAxisSize = this._getTotalCrossAxisSize();
        }
        align() {
            const t = this._layout.crossAxisSize - this._totalCrossAxisSize, { spacingBefore: e , spacingBetween: i  } = this._getSpacing(t), s = this._lines;
            let r = 0;
            "stretch" === this._layout._flexContainer.alignContent && s.length && t > 0 && (r = t / s.length);
            let n = e;
            for(let t1 = 0, e1 = s.length; t1 < e1; t1++){
                const e2 = n, o = s[t1].createItemAligner();
                let a = s[t1].crossAxisLayoutSize + r;
                o.setCrossAxisLayoutSize(a), o.setCrossAxisLayoutOffset(e2), o.align(), o.recursiveResizeOccured && s[t1].setItemPositions(), n += a, n += i;
            }
        }
        get totalCrossAxisSize() {
            return this._totalCrossAxisSize;
        }
        _getTotalCrossAxisSize() {
            const t = this._lines;
            let e = 0;
            for(let i = 0, s = t.length; i < s; i++)e += t[i].crossAxisLayoutSize;
            return e;
        }
        _getSpacing(t) {
            const e = this._layout._flexContainer.alignContent, i = this._lines.length;
            return SpacingCalculator.getSpacing(e, i, t);
        }
    }
    class FlexUtils {
        static getParentAxisSizeWithPadding(t, e) {
            const i = t.target.getParent();
            if (i) {
                const s = t.flexParent;
                return s ? this.getAxisLayoutSize(s, e) + this.getTotalPadding(s, e) : e ? i.w : i.h;
            }
            return 0;
        }
        static getRelAxisSize(t, e) {
            return e ? t.funcW ? this._allowRelAxisSizeFunction(t, !0) ? t.funcW(this.getParentAxisSizeWithPadding(t, !0)) : 0 : t.originalWidth : t.funcH ? this._allowRelAxisSizeFunction(t, !1) ? t.funcH(this.getParentAxisSizeWithPadding(t, !1)) : 0 : t.originalHeight;
        }
        static _allowRelAxisSizeFunction(t, e) {
            const i = t.flexParent;
            return !i || !i._flex._layout.isAxisFitToContents(e);
        }
        static isZeroAxisSize(t, e) {
            return e ? !t.originalWidth && !t.funcW : !t.originalHeight && !t.funcH;
        }
        static getAxisLayoutPos(t, e) {
            return e ? t.x : t.y;
        }
        static getAxisLayoutSize(t, e) {
            return e ? t.w : t.h;
        }
        static setAxisLayoutPos(t, e, i) {
            e ? t.x = i : t.y = i;
        }
        static setAxisLayoutSize(t, e, i) {
            e ? t.w = i : t.h = i;
        }
        static getAxisMinSize(t, e) {
            let i = this.getPlainAxisMinSize(t, e), s = 0;
            t.isFlexItemEnabled() && (s = t._flexItem._getMinSizeSetting(e));
            return s > 0 && (i = Math.max(i, s)), i;
        }
        static getPlainAxisMinSize(t, e) {
            if (t.isFlexEnabled()) return t._flex._layout.getAxisMinSize(e);
            return 0 !== t.flexItem.shrink ? 0 : this.getRelAxisSize(t, e);
        }
        static resizeAxis(t, e, i) {
            if (t.isFlexEnabled()) t._flex._horizontal === e ? t._flex._layout.resizeMainAxis(i) : t._flex._layout.resizeCrossAxis(i);
            else this.setAxisLayoutSize(t, e, i);
        }
        static getPaddingOffset(t, e) {
            if (t.isFlexEnabled()) {
                const i = t._flex;
                return e ? i.paddingLeft : i.paddingTop;
            }
            return 0;
        }
        static getTotalPadding(t, e) {
            if (t.isFlexEnabled()) {
                const i = t._flex;
                return e ? i.paddingRight + i.paddingLeft : i.paddingTop + i.paddingBottom;
            }
            return 0;
        }
        static getMarginOffset(t, e) {
            const i = t.flexItem;
            return i ? e ? i.marginLeft : i.marginTop : 0;
        }
        static getTotalMargin(t, e) {
            const i = t.flexItem;
            return i ? e ? i.marginRight + i.marginLeft : i.marginTop + i.marginBottom : 0;
        }
    }
    class SizeShrinker {
        constructor(t){
            this._line = t, this._amountRemaining = 0, this._shrunkSize = 0;
        }
        shrink(t) {
            this._shrunkSize = 0, this._amountRemaining = t;
            let e = this._getTotalShrinkAmount();
            if (e) {
                const t1 = this._line.items;
                do {
                    let i = this._amountRemaining / e;
                    for(let s = this._line.startIndex; s <= this._line.endIndex; s++){
                        const r = t1[s].flexItem, n = r.shrink;
                        if (n > 0) {
                            let t2 = n * i;
                            const s1 = r._getMainAxisMinSize(), o = r._getMainAxisLayoutSize();
                            if (o > s1) {
                                const i1 = o - s1;
                                t2 >= i1 && (t2 = i1, e -= n);
                                const a = o - t2;
                                if (r._resizeMainAxis(a), this._shrunkSize += t2, this._amountRemaining -= t2, Math.abs(this._amountRemaining) < 1e-5) return;
                            }
                        }
                    }
                }while (e && Math.abs(this._amountRemaining) > 1e-5);
            }
        }
        _getTotalShrinkAmount() {
            let t = 0;
            const e = this._line.items;
            for(let i = this._line.startIndex; i <= this._line.endIndex; i++){
                const s = e[i].flexItem;
                if (s.shrink) {
                    const e1 = s._getMainAxisMinSize();
                    s._getMainAxisLayoutSize() > e1 && (t += s.shrink);
                }
            }
            return t;
        }
        getShrunkSize() {
            return this._shrunkSize;
        }
    }
    class SizeGrower {
        constructor(t){
            this._line = t, this._amountRemaining = 0, this._grownSize = 0;
        }
        grow(t) {
            this._grownSize = 0, this._amountRemaining = t;
            let e = this._getTotalGrowAmount();
            if (e) {
                const t1 = this._line.items;
                do {
                    let i = this._amountRemaining / e;
                    for(let s = this._line.startIndex; s <= this._line.endIndex; s++){
                        const r = t1[s].flexItem, n = r.grow;
                        if (n > 0) {
                            let t2 = n * i;
                            const s1 = r._getMainAxisMaxSizeSetting(), o = r._getMainAxisLayoutSize();
                            if (s1 > 0) {
                                if (o >= s1) t2 = 0;
                                else {
                                    const i1 = s1 - o;
                                    t2 >= i1 && (t2 = i1, e -= n);
                                }
                            }
                            if (t2 > 0) {
                                const e1 = o + t2;
                                if (r._resizeMainAxis(e1), this._grownSize += t2, this._amountRemaining -= t2, Math.abs(this._amountRemaining) < 1e-5) return;
                            }
                        }
                    }
                }while (e && Math.abs(this._amountRemaining) > 1e-5);
            }
        }
        _getTotalGrowAmount() {
            let t = 0;
            const e = this._line.items;
            for(let i = this._line.startIndex; i <= this._line.endIndex; i++){
                const s = e[i].flexItem;
                if (s.grow) {
                    const e1 = s._getMainAxisMaxSizeSetting(), i1 = s._getMainAxisLayoutSize();
                    (0 === e1 || i1 < e1) && (t += s.grow);
                }
            }
            return t;
        }
        getGrownSize() {
            return this._grownSize;
        }
    }
    class ItemPositioner {
        constructor(t){
            this._line = t;
        }
        get _layout() {
            return this._line._layout;
        }
        position() {
            const { spacingBefore: t , spacingBetween: e  } = this._getSpacing();
            let i = t;
            const s = this._line.items;
            for(let t1 = this._line.startIndex; t1 <= this._line.endIndex; t1++){
                const r = s[t1];
                r.flexItem._setMainAxisLayoutPos(i), i += r.flexItem._getMainAxisLayoutSizeWithPaddingAndMargin(), i += e;
            }
        }
        _getSpacing() {
            const t = this._line._availableSpace;
            let e = this._layout._flexContainer.justifyContent;
            const i = this._line.numberOfItems;
            return SpacingCalculator.getSpacing(e, i, t);
        }
    }
    class ItemAligner {
        constructor(t){
            this._line = t, this._crossAxisLayoutSize = 0, this._crossAxisLayoutOffset = 0, this._alignItemsSetting = null, this._recursiveResizeOccured = !1, this._isCrossAxisFitToContents = !1;
        }
        get _layout() {
            return this._line._layout;
        }
        get _flexContainer() {
            return this._layout._flexContainer;
        }
        setCrossAxisLayoutSize(t) {
            this._crossAxisLayoutSize = t;
        }
        setCrossAxisLayoutOffset(t) {
            this._crossAxisLayoutOffset = t;
        }
        align() {
            this._alignItemsSetting = this._flexContainer.alignItems, this._isCrossAxisFitToContents = this._layout.isAxisFitToContents(!this._flexContainer._horizontal), this._recursiveResizeOccured = !1;
            const t = this._line.items;
            for(let e = this._line.startIndex; e <= this._line.endIndex; e++){
                const i = t[e];
                this._alignItem(i);
            }
        }
        get recursiveResizeOccured() {
            return this._recursiveResizeOccured;
        }
        _alignItem(t) {
            const e = t.flexItem;
            let i = e.alignSelf || this._alignItemsSetting;
            switch("stretch" === i && this._preventStretch(e) && (i = "flex-start"), "stretch" === i || this._isCrossAxisFitToContents || e._hasRelCrossAxisSize() && e._resetCrossAxisLayoutSize(), i){
                case "flex-start":
                    this._alignItemFlexStart(e);
                    break;
                case "flex-end":
                    this._alignItemFlexEnd(e);
                    break;
                case "center":
                    this._alignItemFlexCenter(e);
                    break;
                case "stretch":
                    this._alignItemStretch(e);
            }
        }
        _alignItemFlexStart(t) {
            t._setCrossAxisLayoutPos(this._crossAxisLayoutOffset);
        }
        _alignItemFlexEnd(t) {
            const e = t._getCrossAxisLayoutSizeWithPaddingAndMargin();
            t._setCrossAxisLayoutPos(this._crossAxisLayoutOffset + (this._crossAxisLayoutSize - e));
        }
        _alignItemFlexCenter(t) {
            const e = t._getCrossAxisLayoutSizeWithPaddingAndMargin(), i = (this._crossAxisLayoutSize - e) / 2;
            t._setCrossAxisLayoutPos(this._crossAxisLayoutOffset + i);
        }
        _alignItemStretch(t) {
            t._setCrossAxisLayoutPos(this._crossAxisLayoutOffset);
            const e = t._getMainAxisLayoutSize();
            let i = this._crossAxisLayoutSize - t._getCrossAxisMargin() - t._getCrossAxisPadding();
            const s = t._getCrossAxisMinSizeSetting();
            s > 0 && (i = Math.max(i, s));
            const r = t._getCrossAxisMaxSizeSetting();
            r > 0 && (i = Math.min(i, r)), t._resizeCrossAxis(i);
            t._getMainAxisLayoutSize() !== e && (this._recursiveResizeOccured = !0);
        }
        _preventStretch(t) {
            const e = t._hasFixedCrossAxisSize(), i = "stretch" === t.alignSelf;
            return e && !i;
        }
    }
    class LineLayout {
        constructor(t, e, i, s){
            this._layout = t, this.items = t.items, this.startIndex = e, this.endIndex = i, this._availableSpace = s;
        }
        performLayout() {
            this._setItemSizes(), this.setItemPositions(), this._calcLayoutInfo();
        }
        _setItemSizes() {
            this._availableSpace > 0 ? this._growItemSizes(this._availableSpace) : this._availableSpace < 0 && this._shrinkItemSizes(-this._availableSpace);
        }
        _growItemSizes(t) {
            const e = new SizeGrower(this);
            e.grow(t), this._availableSpace -= e.getGrownSize();
        }
        _shrinkItemSizes(t) {
            const e = new SizeShrinker(this);
            e.shrink(t), this._availableSpace += e.getShrunkSize();
        }
        setItemPositions() {
            new ItemPositioner(this).position();
        }
        createItemAligner() {
            return new ItemAligner(this);
        }
        _calcLayoutInfo() {
            this._calcCrossAxisMaxLayoutSize();
        }
        getMainAxisMinSize() {
            let t = 0;
            for(let e = this.startIndex; e <= this.endIndex; e++)t += this.items[e].flexItem._getMainAxisMinSizeWithPaddingAndMargin();
            return t;
        }
        get numberOfItems() {
            return this.endIndex - this.startIndex + 1;
        }
        get crossAxisLayoutSize() {
            const t = this._layout.isCrossAxisFitToContents() && !this._layout.resizingCrossAxis;
            return this._layout.isWrapping() || t ? this._crossAxisMaxLayoutSize : this._layout.crossAxisSize;
        }
        _calcCrossAxisMaxLayoutSize() {
            this._crossAxisMaxLayoutSize = this._getCrossAxisMaxLayoutSize();
        }
        _getCrossAxisMaxLayoutSize() {
            let t = 0;
            for(let e = this.startIndex; e <= this.endIndex; e++){
                const i = this.items[e];
                t = Math.max(t, i.flexItem._getCrossAxisLayoutSizeWithPaddingAndMargin());
            }
            return t;
        }
    }
    class LineLayouter {
        constructor(t){
            this._layout = t, this._mainAxisMinSize = -1, this._crossAxisMinSize = -1, this._mainAxisContentSize = 0;
        }
        get lines() {
            return this._lines;
        }
        get mainAxisMinSize() {
            return -1 === this._mainAxisMinSize && (this._mainAxisMinSize = this._getMainAxisMinSize()), this._mainAxisMinSize;
        }
        get crossAxisMinSize() {
            return -1 === this._crossAxisMinSize && (this._crossAxisMinSize = this._getCrossAxisMinSize()), this._crossAxisMinSize;
        }
        get mainAxisContentSize() {
            return this._mainAxisContentSize;
        }
        layoutLines() {
            this._setup();
            const t = this._layout.items, e = this._layout.isWrapping();
            let i, s = 0;
            const r = t.length;
            for(i = 0; i < r; i++){
                const r1 = t[i];
                this._layoutFlexItem(r1);
                const n = r1.flexItem._getMainAxisLayoutSizeWithPaddingAndMargin();
                if (e && i > s) this._curMainAxisPos + n > this._mainAxisSize && (this._layoutLine(s, i - 1), this._curMainAxisPos = 0, s = i);
                this._addToMainAxisPos(n);
            }
            s < i && this._layoutLine(s, i - 1);
        }
        _layoutFlexItem(t) {
            t.isFlexEnabled() ? t.flexLayout.updateTreeLayout() : t.flexItem._resetLayoutSize();
        }
        _setup() {
            this._mainAxisSize = this._layout.mainAxisSize, this._curMainAxisPos = 0, this._maxMainAxisPos = 0, this._lines = [], this._mainAxisMinSize = -1, this._crossAxisMinSize = -1, this._mainAxisContentSize = 0;
        }
        _addToMainAxisPos(t) {
            this._curMainAxisPos += t, this._curMainAxisPos > this._maxMainAxisPos && (this._maxMainAxisPos = this._curMainAxisPos);
        }
        _layoutLine(t, e) {
            const i = this._getAvailableMainAxisLayoutSpace(), s = new LineLayout(this._layout, t, e, i);
            s.performLayout(), this._lines.push(s), (0 === this._mainAxisContentSize || this._curMainAxisPos > this._mainAxisContentSize) && (this._mainAxisContentSize = this._curMainAxisPos);
        }
        _getAvailableMainAxisLayoutSpace() {
            return !this._layout.resizingMainAxis && this._layout.isMainAxisFitToContents() ? 0 : this._mainAxisSize - this._curMainAxisPos;
        }
        _getCrossAxisMinSize() {
            let t = 0;
            const e = this._layout.items;
            for(let i = 0, s = e.length; i < s; i++){
                const s1 = e[i].flexItem._getCrossAxisMinSizeWithPaddingAndMargin();
                t = Math.max(t, s1);
            }
            return t;
        }
        _getMainAxisMinSize() {
            return 1 === this._lines.length ? this._lines[0].getMainAxisMinSize() : this._layout.mainAxisSize;
        }
    }
    class ItemCoordinatesUpdater {
        constructor(t){
            this._layout = t, this._isReverse = this._flexContainer._reverse, this._horizontalPaddingOffset = this._layout._getHorizontalPaddingOffset(), this._verticalPaddingOffset = this._layout._getVerticalPaddingOffset();
        }
        get _flexContainer() {
            return this._layout._flexContainer;
        }
        finalize() {
            const t = this._layout.getParentFlexContainer();
            if (t) new ItemCoordinatesUpdater(t._layout)._finalizeItemAndChildren(this._flexContainer.item);
            else this._finalizeRoot(), this._finalizeItems();
        }
        _finalizeRoot() {
            const t = this._flexContainer.item;
            let e = FlexUtils.getAxisLayoutPos(t, !0), i = FlexUtils.getAxisLayoutPos(t, !1), s = FlexUtils.getAxisLayoutSize(t, !0), r = FlexUtils.getAxisLayoutSize(t, !1);
            s += this._layout._getHorizontalPadding(), r += this._layout._getVerticalPadding(), t.clearRecalcFlag(), t.setLayout(e, i, s, r);
        }
        _finalizeItems() {
            const t = this._layout.items;
            for(let e = 0, i = t.length; e < i; e++){
                const i1 = t[e], s = this._validateItemCache(i1);
                this._finalizeItem(i1), s || this._finalizeItemChildren(i1);
            }
        }
        _validateItemCache(t) {
            if (0 === t.recalc && t.isFlexEnabled()) {
                const e = t._flex._layout;
                if (t.w === t.target.w && t.h === t.target.h) return !0;
                {
                    const t1 = e.crossAxisSize;
                    e.performResizeMainAxis(e.mainAxisSize), e.performResizeCrossAxis(t1);
                }
            }
            return !1;
        }
        _finalizeItemAndChildren(t) {
            this._finalizeItem(t), this._finalizeItemChildren(t);
        }
        _finalizeItem(t) {
            this._isReverse && this._reverseMainAxisLayoutPos(t);
            let e = FlexUtils.getAxisLayoutPos(t, !0), i = FlexUtils.getAxisLayoutPos(t, !1), s = FlexUtils.getAxisLayoutSize(t, !0), r = FlexUtils.getAxisLayoutSize(t, !1);
            e += this._horizontalPaddingOffset, i += this._verticalPaddingOffset;
            t.flex && (s += t._flex._layout._getHorizontalPadding(), r += t._flex._layout._getVerticalPadding());
            const n = t.flexItem;
            n && (e += n._getHorizontalMarginOffset(), i += n._getVerticalMarginOffset()), t.clearRecalcFlag(), t.setLayout(e, i, s, r);
        }
        _finalizeItemChildren(t) {
            const e = t._flex;
            if (e) new ItemCoordinatesUpdater(e._layout)._finalizeItems();
        }
        _reverseMainAxisLayoutPos(t) {
            const e = t.flexItem._getMainAxisLayoutPos() + t.flexItem._getMainAxisLayoutSizeWithPaddingAndMargin(), i = this._layout.mainAxisSize - e;
            t.flexItem._setMainAxisLayoutPos(i);
        }
    }
    class FlexLayout {
        constructor(t){
            this._flexContainer = t, this._lineLayouter = new LineLayouter(this), this._resizingMainAxis = !1, this._resizingCrossAxis = !1, this._cachedMainAxisSizeAfterLayout = 0, this._cachedCrossAxisSizeAfterLayout = 0, this._shrunk = !1;
        }
        get shrunk() {
            return this._shrunk;
        }
        get recalc() {
            return this.item.recalc;
        }
        layoutTree() {
            null !== this.item.flexParent ? this._updateSubTreeLayout() : this.updateTreeLayout(), this.updateItemCoords();
        }
        updateTreeLayout() {
            this.recalc ? this._performUpdateLayoutTree() : this._performUpdateLayoutTreeFromCache();
        }
        _performUpdateLayoutTree() {
            this._setInitialAxisSizes(), this._layoutAxes(), this._refreshLayoutCache();
        }
        _refreshLayoutCache() {
            this._cachedMainAxisSizeAfterLayout = this.mainAxisSize, this._cachedCrossAxisSizeAfterLayout = this.crossAxisSize;
        }
        _performUpdateLayoutTreeFromCache() {
            this.item.funcW || this.item.funcH ? (this.item.enableLocalRecalcFlag(), this._performUpdateLayoutTree()) : (this.mainAxisSize = this._cachedMainAxisSizeAfterLayout, this.crossAxisSize = this._cachedCrossAxisSizeAfterLayout);
        }
        updateItemCoords() {
            new ItemCoordinatesUpdater(this).finalize();
        }
        _updateSubTreeLayout() {
            const t = this.crossAxisSize;
            this._layoutMainAxis(), this.performResizeCrossAxis(t);
        }
        _setInitialAxisSizes() {
            this.item.isFlexItemEnabled() ? this.item.flexItem._resetLayoutSize() : (this.mainAxisSize = this._getMainAxisBasis(), this.crossAxisSize = this._getCrossAxisBasis()), this._resizingMainAxis = !1, this._resizingCrossAxis = !1, this._shrunk = !1;
        }
        _layoutAxes() {
            this._layoutMainAxis(), this._layoutCrossAxis();
        }
        _layoutMainAxis() {
            this._layoutLines(), this._fitMainAxisSizeToContents();
        }
        _layoutLines() {
            this._lineLayouter.layoutLines();
        }
        get _lines() {
            return this._lineLayouter.lines;
        }
        _fitMainAxisSizeToContents() {
            this._resizingMainAxis || this.isMainAxisFitToContents() && (this.mainAxisSize = this._lineLayouter.mainAxisContentSize);
        }
        _layoutCrossAxis() {
            const t = new ContentAligner(this);
            t.init(), this._totalCrossAxisSize = t.totalCrossAxisSize, this._fitCrossAxisSizeToContents(), t.align();
        }
        _fitCrossAxisSizeToContents() {
            this._resizingCrossAxis || this.isCrossAxisFitToContents() && (this.crossAxisSize = this._totalCrossAxisSize);
        }
        isWrapping() {
            return this._flexContainer.wrap;
        }
        isAxisFitToContents(t) {
            return this._horizontal === t ? this.isMainAxisFitToContents() : this.isCrossAxisFitToContents();
        }
        isMainAxisFitToContents() {
            return !this.isWrapping() && !this._hasFixedMainAxisBasis();
        }
        isCrossAxisFitToContents() {
            return !this._hasFixedCrossAxisBasis();
        }
        _hasFixedMainAxisBasis() {
            return !FlexUtils.isZeroAxisSize(this.item, this._horizontal);
        }
        _hasFixedCrossAxisBasis() {
            return !FlexUtils.isZeroAxisSize(this.item, !this._horizontal);
        }
        getAxisMinSize(t) {
            return this._horizontal === t ? this._getMainAxisMinSize() : this._getCrossAxisMinSize();
        }
        _getMainAxisMinSize() {
            return this._lineLayouter.mainAxisMinSize;
        }
        _getCrossAxisMinSize() {
            return this._lineLayouter.crossAxisMinSize;
        }
        resizeMainAxis(t) {
            this.mainAxisSize !== t && (this.recalc > 0 ? this.performResizeMainAxis(t) : this._checkValidCacheMainAxisResize() ? (this.mainAxisSize = t, this._fitCrossAxisSizeToContents()) : (this.item.enableLocalRecalcFlag(), this.performResizeMainAxis(t)));
        }
        _checkValidCacheMainAxisResize(t) {
            if (t === this.targetMainAxisSize) return !0;
            return !this.isCrossAxisFitToContents();
        }
        performResizeMainAxis(t) {
            const e = t < this.mainAxisSize;
            this._shrunk = e, this.mainAxisSize = t, this._resizingMainAxis = !0, this._layoutAxes(), this._resizingMainAxis = !1;
        }
        resizeCrossAxis(t) {
            this.crossAxisSize !== t && (this.recalc > 0 ? this.performResizeCrossAxis(t) : this.crossAxisSize = t);
        }
        performResizeCrossAxis(t) {
            this.crossAxisSize = t, this._resizingCrossAxis = !0, this._layoutCrossAxis(), this._resizingCrossAxis = !1;
        }
        get targetMainAxisSize() {
            return this._horizontal ? this.item.target.w : this.item.target.h;
        }
        get targetCrossAxisSize() {
            return this._horizontal ? this.item.target.h : this.item.target.w;
        }
        getParentFlexContainer() {
            return this.item.isFlexItemEnabled() ? this.item.flexItem.ctr : null;
        }
        _getHorizontalPadding() {
            return FlexUtils.getTotalPadding(this.item, !0);
        }
        _getVerticalPadding() {
            return FlexUtils.getTotalPadding(this.item, !1);
        }
        _getHorizontalPaddingOffset() {
            return FlexUtils.getPaddingOffset(this.item, !0);
        }
        _getVerticalPaddingOffset() {
            return FlexUtils.getPaddingOffset(this.item, !1);
        }
        _getMainAxisBasis() {
            return FlexUtils.getRelAxisSize(this.item, this._horizontal);
        }
        _getCrossAxisBasis() {
            return FlexUtils.getRelAxisSize(this.item, !this._horizontal);
        }
        get _horizontal() {
            return this._flexContainer._horizontal;
        }
        get _reverse() {
            return this._flexContainer._reverse;
        }
        get item() {
            return this._flexContainer.item;
        }
        get items() {
            return this.item.items;
        }
        get resizingMainAxis() {
            return this._resizingMainAxis;
        }
        get resizingCrossAxis() {
            return this._resizingCrossAxis;
        }
        get numberOfItems() {
            return this.items.length;
        }
        get mainAxisSize() {
            return FlexUtils.getAxisLayoutSize(this.item, this._horizontal);
        }
        get crossAxisSize() {
            return FlexUtils.getAxisLayoutSize(this.item, !this._horizontal);
        }
        set mainAxisSize(t) {
            FlexUtils.setAxisLayoutSize(this.item, this._horizontal, t);
        }
        set crossAxisSize(t) {
            FlexUtils.setAxisLayoutSize(this.item, !this._horizontal, t);
        }
    }
    class FlexContainer {
        constructor(t){
            this._item = t, this._layout = new FlexLayout(this), this._horizontal = !0, this._reverse = !1, this._wrap = !1, this._alignItems = "stretch", this._justifyContent = "flex-start", this._alignContent = "flex-start", this._paddingLeft = 0, this._paddingTop = 0, this._paddingRight = 0, this._paddingBottom = 0;
        }
        get item() {
            return this._item;
        }
        _changedDimensions() {
            this._item.changedDimensions();
        }
        _changedContents() {
            this._item.changedContents();
        }
        get direction() {
            return (this._horizontal ? "row" : "column") + (this._reverse ? "-reverse" : "");
        }
        set direction(t) {
            this.direction !== t && (this._horizontal = "row" === t || "row-reverse" === t, this._reverse = "row-reverse" === t || "column-reverse" === t, this._changedContents());
        }
        set wrap(t) {
            this._wrap = t, this._changedContents();
        }
        get wrap() {
            return this._wrap;
        }
        get alignItems() {
            return this._alignItems;
        }
        set alignItems(t) {
            if (this._alignItems !== t) {
                if (-1 === FlexContainer.ALIGN_ITEMS.indexOf(t)) throw new Error("Unknown alignItems, options: " + FlexContainer.ALIGN_ITEMS.join(","));
                this._alignItems = t, this._changedContents();
            }
        }
        get alignContent() {
            return this._alignContent;
        }
        set alignContent(t) {
            if (this._alignContent !== t) {
                if (-1 === FlexContainer.ALIGN_CONTENT.indexOf(t)) throw new Error("Unknown alignContent, options: " + FlexContainer.ALIGN_CONTENT.join(","));
                this._alignContent = t, this._changedContents();
            }
        }
        get justifyContent() {
            return this._justifyContent;
        }
        set justifyContent(t) {
            if (this._justifyContent !== t) {
                if (-1 === FlexContainer.JUSTIFY_CONTENT.indexOf(t)) throw new Error("Unknown justifyContent, options: " + FlexContainer.JUSTIFY_CONTENT.join(","));
                this._justifyContent = t, this._changedContents();
            }
        }
        set padding(t) {
            this.paddingLeft = t, this.paddingTop = t, this.paddingRight = t, this.paddingBottom = t;
        }
        get padding() {
            return this.paddingLeft;
        }
        set paddingLeft(t) {
            this._paddingLeft = t, this._changedDimensions();
        }
        get paddingLeft() {
            return this._paddingLeft;
        }
        set paddingTop(t) {
            this._paddingTop = t, this._changedDimensions();
        }
        get paddingTop() {
            return this._paddingTop;
        }
        set paddingRight(t) {
            this._paddingRight = t, this._changedDimensions();
        }
        get paddingRight() {
            return this._paddingRight;
        }
        set paddingBottom(t) {
            this._paddingBottom = t, this._changedDimensions();
        }
        get paddingBottom() {
            return this._paddingBottom;
        }
        patch(t) {
            Base.patchObject(this, t);
        }
    }
    FlexContainer.ALIGN_ITEMS = [
        "flex-start",
        "flex-end",
        "center",
        "stretch"
    ], FlexContainer.ALIGN_CONTENT = [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch"
    ], FlexContainer.JUSTIFY_CONTENT = [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly"
    ];
    class FlexItem {
        constructor(t){
            this._ctr = null, this._item = t, this._grow = 0, this._shrink = FlexItem.SHRINK_AUTO, this._alignSelf = void 0, this._minWidth = 0, this._minHeight = 0, this._maxWidth = 0, this._maxHeight = 0, this._marginLeft = 0, this._marginTop = 0, this._marginRight = 0, this._marginBottom = 0;
        }
        get item() {
            return this._item;
        }
        get grow() {
            return this._grow;
        }
        set grow(t) {
            this._grow !== t && (this._grow = parseInt(t) || 0, this._changed());
        }
        get shrink() {
            return this._shrink === FlexItem.SHRINK_AUTO ? this._getDefaultShrink() : this._shrink;
        }
        _getDefaultShrink() {
            return this.item.isFlexEnabled() ? 1 : 0;
        }
        set shrink(t) {
            this._shrink !== t && (this._shrink = parseInt(t) || 0, this._changed());
        }
        get alignSelf() {
            return this._alignSelf;
        }
        set alignSelf(t) {
            if (this._alignSelf !== t) {
                if (void 0 === t) this._alignSelf = void 0;
                else {
                    if (-1 === FlexContainer.ALIGN_ITEMS.indexOf(t)) throw new Error("Unknown alignSelf, options: " + FlexContainer.ALIGN_ITEMS.join(","));
                    this._alignSelf = t;
                }
                this._changed();
            }
        }
        get minWidth() {
            return this._minWidth;
        }
        set minWidth(t) {
            this._minWidth = Math.max(0, t), this._item.changedDimensions(!0, !1);
        }
        get minHeight() {
            return this._minHeight;
        }
        set minHeight(t) {
            this._minHeight = Math.max(0, t), this._item.changedDimensions(!1, !0);
        }
        get maxWidth() {
            return this._maxWidth;
        }
        set maxWidth(t) {
            this._maxWidth = Math.max(0, t), this._item.changedDimensions(!0, !1);
        }
        get maxHeight() {
            return this._maxHeight;
        }
        set maxHeight(t) {
            this._maxHeight = Math.max(0, t), this._item.changedDimensions(!1, !0);
        }
        set margin(t) {
            this.marginLeft = t, this.marginTop = t, this.marginRight = t, this.marginBottom = t;
        }
        get margin() {
            return this.marginLeft;
        }
        set marginLeft(t) {
            this._marginLeft = t, this._changed();
        }
        get marginLeft() {
            return this._marginLeft;
        }
        set marginTop(t) {
            this._marginTop = t, this._changed();
        }
        get marginTop() {
            return this._marginTop;
        }
        set marginRight(t) {
            this._marginRight = t, this._changed();
        }
        get marginRight() {
            return this._marginRight;
        }
        set marginBottom(t) {
            this._marginBottom = t, this._changed();
        }
        get marginBottom() {
            return this._marginBottom;
        }
        _changed() {
            this.ctr && this.ctr._changedContents();
        }
        set ctr(t) {
            this._ctr = t;
        }
        get ctr() {
            return this._ctr;
        }
        patch(t) {
            Base.patchObject(this, t);
        }
        _resetLayoutSize() {
            this._resetHorizontalAxisLayoutSize(), this._resetVerticalAxisLayoutSize();
        }
        _resetCrossAxisLayoutSize() {
            this.ctr._horizontal ? this._resetVerticalAxisLayoutSize() : this._resetHorizontalAxisLayoutSize();
        }
        _resetHorizontalAxisLayoutSize() {
            let t = FlexUtils.getRelAxisSize(this.item, !0);
            this._minWidth && (t = Math.max(this._minWidth, t)), this._maxWidth && (t = Math.min(this._maxWidth, t)), FlexUtils.setAxisLayoutSize(this.item, !0, t);
        }
        _resetVerticalAxisLayoutSize() {
            let t = FlexUtils.getRelAxisSize(this.item, !1);
            this._minHeight && (t = Math.max(this._minHeight, t)), this._maxHeight && (t = Math.min(this._maxHeight, t)), FlexUtils.setAxisLayoutSize(this.item, !1, t);
        }
        _getCrossAxisMinSizeSetting() {
            return this._getMinSizeSetting(!this.ctr._horizontal);
        }
        _getCrossAxisMaxSizeSetting() {
            return this._getMaxSizeSetting(!this.ctr._horizontal);
        }
        _getMainAxisMaxSizeSetting() {
            return this._getMaxSizeSetting(this.ctr._horizontal);
        }
        _getMinSizeSetting(t) {
            return t ? this._minWidth : this._minHeight;
        }
        _getMaxSizeSetting(t) {
            return t ? this._maxWidth : this._maxHeight;
        }
        _getMainAxisMinSize() {
            return FlexUtils.getAxisMinSize(this.item, this.ctr._horizontal);
        }
        _getCrossAxisMinSize() {
            return FlexUtils.getAxisMinSize(this.item, !this.ctr._horizontal);
        }
        _getMainAxisLayoutSize() {
            return FlexUtils.getAxisLayoutSize(this.item, this.ctr._horizontal);
        }
        _getMainAxisLayoutPos() {
            return FlexUtils.getAxisLayoutPos(this.item, this.ctr._horizontal);
        }
        _setMainAxisLayoutPos(t) {
            return FlexUtils.setAxisLayoutPos(this.item, this.ctr._horizontal, t);
        }
        _setCrossAxisLayoutPos(t) {
            return FlexUtils.setAxisLayoutPos(this.item, !this.ctr._horizontal, t);
        }
        _getCrossAxisLayoutSize() {
            return FlexUtils.getAxisLayoutSize(this.item, !this.ctr._horizontal);
        }
        _resizeCrossAxis(t) {
            return FlexUtils.resizeAxis(this.item, !this.ctr._horizontal, t);
        }
        _resizeMainAxis(t) {
            return FlexUtils.resizeAxis(this.item, this.ctr._horizontal, t);
        }
        _getMainAxisPadding() {
            return FlexUtils.getTotalPadding(this.item, this.ctr._horizontal);
        }
        _getCrossAxisPadding() {
            return FlexUtils.getTotalPadding(this.item, !this.ctr._horizontal);
        }
        _getMainAxisMargin() {
            return FlexUtils.getTotalMargin(this.item, this.ctr._horizontal);
        }
        _getCrossAxisMargin() {
            return FlexUtils.getTotalMargin(this.item, !this.ctr._horizontal);
        }
        _getHorizontalMarginOffset() {
            return FlexUtils.getMarginOffset(this.item, !0);
        }
        _getVerticalMarginOffset() {
            return FlexUtils.getMarginOffset(this.item, !1);
        }
        _getMainAxisMinSizeWithPaddingAndMargin() {
            return this._getMainAxisMinSize() + this._getMainAxisPadding() + this._getMainAxisMargin();
        }
        _getCrossAxisMinSizeWithPaddingAndMargin() {
            return this._getCrossAxisMinSize() + this._getCrossAxisPadding() + this._getCrossAxisMargin();
        }
        _getMainAxisLayoutSizeWithPaddingAndMargin() {
            return this._getMainAxisLayoutSize() + this._getMainAxisPadding() + this._getMainAxisMargin();
        }
        _getCrossAxisLayoutSizeWithPaddingAndMargin() {
            return this._getCrossAxisLayoutSize() + this._getCrossAxisPadding() + this._getCrossAxisMargin();
        }
        _hasFixedCrossAxisSize() {
            return !FlexUtils.isZeroAxisSize(this.item, !this.ctr._horizontal);
        }
        _hasRelCrossAxisSize() {
            return !!(this.ctr._horizontal ? this.item.funcH : this.item.funcW);
        }
    }
    FlexItem.SHRINK_AUTO = -1;
    class FlexTarget {
        constructor(t){
            this._target = t, this._recalc = 0, this._enabled = !1, this.x = 0, this.y = 0, this.w = 0, this.h = 0, this._originalX = 0, this._originalY = 0, this._originalWidth = 0, this._originalHeight = 0, this._flex = null, this._flexItem = null, this._flexItemDisabled = !1, this._items = null;
        }
        get flexLayout() {
            return this.flex ? this.flex._layout : null;
        }
        layoutFlexTree() {
            this.isFlexEnabled() && this.isChanged() && this.flexLayout.layoutTree();
        }
        get target() {
            return this._target;
        }
        get flex() {
            return this._flex;
        }
        set flex(t) {
            t ? (this.isFlexEnabled() || this._enableFlex(), this._flex.patch(t)) : this.isFlexEnabled() && this._disableFlex();
        }
        get flexItem() {
            return !this._flexItemDisabled && (this._ensureFlexItem(), this._flexItem);
        }
        set flexItem(t) {
            if (!1 === t) {
                if (!this._flexItemDisabled) {
                    const t1 = this.flexParent;
                    this._flexItemDisabled = !0, this._checkEnabled(), t1 && (t1._clearFlexItemsCache(), t1.changedContents());
                }
            } else if (this._ensureFlexItem(), this._flexItem.patch(t), this._flexItemDisabled) {
                this._flexItemDisabled = !1, this._checkEnabled();
                const t2 = this.flexParent;
                t2 && (t2._clearFlexItemsCache(), t2.changedContents());
            }
        }
        _enableFlex() {
            this._flex = new FlexContainer(this), this._checkEnabled(), this.changedDimensions(), this._enableChildrenAsFlexItems();
        }
        _disableFlex() {
            this.changedDimensions(), this._flex = null, this._checkEnabled(), this._disableChildrenAsFlexItems();
        }
        _enableChildrenAsFlexItems() {
            const t = this._target._children;
            if (t) for(let e = 0, i = t.length; e < i; e++)t[e].layout._enableFlexItem();
        }
        _disableChildrenAsFlexItems() {
            const t = this._target._children;
            if (t) for(let e = 0, i = t.length; e < i; e++)t[e].layout._disableFlexItem();
        }
        _enableFlexItem() {
            this._ensureFlexItem();
            const t = this._target._parent._layout;
            this._flexItem.ctr = t._flex, t.changedContents(), this._checkEnabled();
        }
        _disableFlexItem() {
            this._flexItem && (this._flexItem.ctr = null), this._checkEnabled(), this._resetOffsets();
        }
        _resetOffsets() {
            this.x = 0, this.y = 0;
        }
        _ensureFlexItem() {
            this._flexItem || (this._flexItem = new FlexItem(this));
        }
        _checkEnabled() {
            const t = this.isEnabled();
            this._enabled !== t && (t ? this._enable() : this._disable(), this._enabled = t);
        }
        _enable() {
            this._setupTargetForFlex(), this._target.enableFlexLayout();
        }
        _disable() {
            this._restoreTargetToNonFlex(), this._target.disableFlexLayout();
        }
        isEnabled() {
            return this.isFlexEnabled() || this.isFlexItemEnabled();
        }
        isFlexEnabled() {
            return null !== this._flex;
        }
        isFlexItemEnabled() {
            return null !== this.flexParent;
        }
        _restoreTargetToNonFlex() {
            const t = this._target;
            t.x = this._originalX, t.y = this._originalY, t.setDimensions(this._originalWidth, this._originalHeight);
        }
        _setupTargetForFlex() {
            const t = this._target;
            this._originalX = t._x, this._originalY = t._y, this._originalWidth = t._w, this._originalHeight = t._h;
        }
        setParent(t, e) {
            t && t.isFlexContainer() && t._layout._changedChildren(), e && e.isFlexContainer() && (this._enableFlexItem(), e._layout._changedChildren()), this._checkEnabled();
        }
        get flexParent() {
            if (this._flexItemDisabled) return null;
            const t = this._target._parent;
            return t && t.isFlexContainer() ? t._layout : null;
        }
        setVisible(t) {
            const e = this.flexParent;
            e && e._changedChildren();
        }
        get items() {
            return this._items || (this._items = this._getFlexItems()), this._items;
        }
        _getFlexItems() {
            const t = [], e = this._target._children;
            if (e) for(let i = 0, s = e.length; i < s; i++){
                const s1 = e[i];
                s1.visible && s1.isFlexItem() && t.push(s1.layout);
            }
            return t;
        }
        _changedChildren() {
            this._clearFlexItemsCache(), this.changedContents();
        }
        _clearFlexItemsCache() {
            this._items = null;
        }
        setLayout(t, e, i, s) {
            let r = this._originalX, n = this._originalY;
            this.funcX && (r = this.funcX(FlexUtils.getParentAxisSizeWithPadding(this, !0))), this.funcY && (n = this.funcY(FlexUtils.getParentAxisSizeWithPadding(this, !1))), this.isFlexItemEnabled() ? this.target.setLayout(t + r, e + n, i, s) : this.target.setLayout(r, n, i, s);
        }
        changedDimensions(t = !0, e = !0) {
            this._updateRecalc(t, e);
        }
        changedContents() {
            this._updateRecalc();
        }
        forceLayout() {
            this._updateRecalc();
        }
        isChanged() {
            return this._recalc > 0;
        }
        _updateRecalc(t = !1, e = !1) {
            if (this.isFlexEnabled()) {
                const i = this._flex._layout;
                t = t || i.isAxisFitToContents(!0), e = e || i.isAxisFitToContents(!1);
            }
            const i1 = 1 + (t ? 2 : 0) + (e ? 4 : 0), s = this.getNewRecalcFlags(i1);
            this._recalc |= i1, s > 1 && this.flexParent ? this.flexParent._updateRecalcBottomUp(i1) : this._target.triggerLayout();
        }
        getNewRecalcFlags(t) {
            return 7 - this._recalc & t;
        }
        _updateRecalcBottomUp(t) {
            const e = this._getRecalcFromChangedChildRecalc(t), i = this.getNewRecalcFlags(e);
            if (this._recalc |= e, i > 1) {
                const t1 = this.flexParent;
                t1 ? t1._updateRecalcBottomUp(e) : this._target.triggerLayout();
            } else this._target.triggerLayout();
        }
        _getRecalcFromChangedChildRecalc(t) {
            const e = this._flex._layout, i = e._horizontal ? 1 : 2, s = e._horizontal ? 2 : 1;
            if (!(t & s)) {
                if (t & i) {
                    if (e.isWrapping()) e.isCrossAxisFitToContents() && (t += s);
                }
            }
            let r = e.isAxisFitToContents(!0), n = e.isAxisFitToContents(!1);
            e.shrunk && (e._horizontal ? r = !0 : n = !0);
            return t & 1 + (r ? 2 : 0) + (n ? 4 : 0);
        }
        get recalc() {
            return this._recalc;
        }
        clearRecalcFlag() {
            this._recalc = 0;
        }
        enableLocalRecalcFlag() {
            this._recalc = 1;
        }
        get originalX() {
            return this._originalX;
        }
        setOriginalXWithoutUpdatingLayout(t) {
            this._originalX = t;
        }
        get originalY() {
            return this._originalY;
        }
        setOriginalYWithoutUpdatingLayout(t) {
            this._originalY = t;
        }
        get originalWidth() {
            return this._originalWidth;
        }
        set originalWidth(t) {
            this._originalWidth !== t && (this._originalWidth = t, this.changedDimensions(!0, !1));
        }
        get originalHeight() {
            return this._originalHeight;
        }
        set originalHeight(t) {
            this._originalHeight !== t && (this._originalHeight = t, this.changedDimensions(!1, !0));
        }
        get funcX() {
            return this._target.funcX;
        }
        get funcY() {
            return this._target.funcY;
        }
        get funcW() {
            return this._target.funcW;
        }
        get funcH() {
            return this._target.funcH;
        }
    }
    class TextureSource {
        constructor(t, e = null){
            this.id = TextureSource.id++, this.manager = t, this.stage = t.stage, this.textures = new Set, this._activeTextureCount = 0, this.loader = e, this.lookupId = null, this._cancelCb = null, this.loadingSince = 0, this.w = 0, this.h = 0, this._nativeTexture = null, this.permanent = !1, this.renderInfo = null, this._isResultTexture = !this.loader, this._loadError = null, this._imageRef = null, this._hasAlpha = !1;
        }
        get hasAlpha() {
            return this._hasAlpha;
        }
        get loadError() {
            return this._loadError;
        }
        addTexture(t) {
            this.textures.has(t) || this.textures.add(t);
        }
        removeTexture(t) {
            this.textures.delete(t);
        }
        incActiveTextureCount() {
            this._activeTextureCount++, 1 === this._activeTextureCount && this.becomesUsed();
        }
        decActiveTextureCount() {
            this._activeTextureCount--, 0 === this._activeTextureCount && this.becomesUnused();
        }
        get isResultTexture() {
            return this._isResultTexture;
        }
        set isResultTexture(t) {
            this._isResultTexture = t;
        }
        forEachEnabledElement(t) {
            this.textures.forEach((e)=>{
                e.elements.forEach(t);
            });
        }
        hasEnabledElements() {
            return this.textures.size > 0;
        }
        forEachActiveElement(t) {
            this.textures.forEach((e)=>{
                e.elements.forEach((e)=>{
                    e.active && t(e);
                });
            });
        }
        getRenderWidth() {
            return this.w;
        }
        getRenderHeight() {
            return this.h;
        }
        allowCleanup() {
            return !this.permanent && !this.isUsed();
        }
        becomesUsed() {
            this.load();
        }
        becomesUnused() {
            this.cancel();
        }
        cancel() {
            this.isLoading() && (this._cancelCb && (this._cancelCb(this), this._cancelCb = null), this.loadingSince = 0);
        }
        isLoaded() {
            return !!this._nativeTexture;
        }
        isLoading() {
            return this.loadingSince > 0;
        }
        isError() {
            return !!this._loadError;
        }
        reload() {
            this.free(), this.isUsed() && this.load();
        }
        load(t = !1) {
            this.isResultTexture || this._nativeTexture || this.isLoading() || (this.loadingSince = (new Date).getTime(), this._cancelCb = this.loader((e, i)=>{
                if (this.isLoading()) {
                    if (this._cancelCb = null, this.manager.stage.destroyed) return;
                    if (e) this.onError(e);
                    else if (i && i.source) {
                        if (this.stage.isUpdatingFrame() || t || !1 === i.throttle) this.processLoadedSource(i);
                        else {
                            const t1 = this.stage.textureThrottler;
                            this._cancelCb = t1.genericCancelCb, t1.add(this, i);
                        }
                    }
                }
            }, this));
        }
        processLoadedSource(t) {
            this.loadingSince = 0, this.setSource(t);
        }
        setSource(t) {
            const e = t.source;
            this._hasAlpha = t && t.hasAlpha || !1, this.w = e.width || t && t.w || 0, this.h = e.height || t && t.h || 0, t && t.renderInfo && (this.renderInfo = t.renderInfo), this.permanent = !!t.permanent, t && t.imageRef && (this._imageRef = t.imageRef), t && t.flipTextureY ? this._flipTextureY = t.flipTextureY : this._flipTextureY = !1, this._isNativeTexture(e) ? (this._nativeTexture = e, this.w = this.w || e.w, this.h = this.h || e.h, this.permanent = !t.hasOwnProperty("permanent") || t.permanent) : this.manager.uploadTextureSource(this, t), this._loadError = null, this.onLoad();
        }
        isUsed() {
            return this._activeTextureCount > 0;
        }
        onLoad() {
            this.isUsed() && this.textures.forEach((t)=>{
                t.onLoad();
            });
        }
        forceRenderUpdate() {
            this._nativeTexture && (this._nativeTexture.update = this.stage.frameCounter), this.forEachActiveElement(function(t) {
                t.forceRenderUpdate();
            });
        }
        forceUpdateRenderCoords() {
            this.forEachActiveElement(function(t) {
                t._updateTextureCoords();
            });
        }
        get nativeTexture() {
            return this._nativeTexture;
        }
        clearNativeTexture() {
            this._nativeTexture = null, this._imageRef = null;
        }
        replaceNativeTexture(t, e, i) {
            let s = this._nativeTexture;
            this._nativeTexture = t, this.w = e, this.h = i, !s && this._nativeTexture && this.forEachActiveElement((t)=>t.onTextureSourceLoaded()), this._nativeTexture || this.forEachActiveElement((t)=>t._setDisplayedTexture(null)), this.forEachEnabledElement((t)=>t._updateDimensions());
        }
        onError(t) {
            this._loadError = t, this.loadingSince = 0, console.error("[Lightning] texture load error", t, this.lookupId), this.forEachActiveElement((e)=>e.onTextureSourceLoadError(t));
        }
        free() {
            this.isLoaded() && this.manager.freeTextureSource(this);
        }
        _isNativeTexture(t) {
            return Utils.isNode ? "WebGLTexture" === t.constructor.name : "WebGLTexture" in window && t instanceof WebGLTexture;
        }
    }
    TextureSource.prototype.isTextureSource = !0, TextureSource.id = 1;
    class ElementTexturizer {
        constructor(t){
            this._element = t.element, this._core = t, this.ctx = this._core.ctx, this._enabled = !1, this.lazy = !1, this._colorize = !1, this._renderTexture = null, this._renderTextureReused = !1, this._resultTextureSource = null, this._renderOffscreen = !1, this.empty = !1;
        }
        get enabled() {
            return this._enabled;
        }
        set enabled(t) {
            this._enabled = t, this._core.updateRenderToTextureEnabled();
        }
        get renderOffscreen() {
            return this._renderOffscreen;
        }
        set renderOffscreen(t) {
            this._renderOffscreen = t, this._core.setHasRenderUpdates(1), this._core._setRecalc(6);
        }
        get colorize() {
            return this._colorize;
        }
        set colorize(t) {
            this._colorize !== t && (this._colorize = t, this._core.setHasRenderUpdates(1));
        }
        _getTextureSource() {
            return this._resultTextureSource || (this._resultTextureSource = new TextureSource(this._element.stage.textureManager), this.updateResultTexture()), this._resultTextureSource;
        }
        hasResultTexture() {
            return !!this._resultTextureSource;
        }
        resultTextureInUse() {
            return this._resultTextureSource && this._resultTextureSource.hasEnabledElements();
        }
        updateResultTexture() {
            let t = this.getResultTexture();
            if (this._resultTextureSource) {
                if (this._resultTextureSource.nativeTexture !== t) {
                    let e = t ? t.w : 0, i = t ? t.h : 0;
                    this._resultTextureSource.replaceNativeTexture(t, e, i);
                }
                this._resultTextureSource.forEachEnabledElement((t)=>{
                    t._updateDimensions(), t.core.setHasRenderUpdates(3);
                });
            }
        }
        mustRenderToTexture() {
            return !(!this._enabled || this.lazy) || !!(this._enabled && this.lazy && this._core._hasRenderUpdates < 3);
        }
        deactivate() {
            this.release();
        }
        get renderTextureReused() {
            return this._renderTextureReused;
        }
        release() {
            this.releaseRenderTexture();
        }
        releaseRenderTexture() {
            this._renderTexture && (this._renderTextureReused || this.ctx.releaseRenderTexture(this._renderTexture), this._renderTexture = null, this._renderTextureReused = !1, this.updateResultTexture());
        }
        reuseTextureAsRenderTexture(t) {
            this._renderTexture !== t && (this.releaseRenderTexture(), this._renderTexture = t, this._renderTextureReused = !0);
        }
        hasRenderTexture() {
            return !!this._renderTexture;
        }
        getRenderTexture() {
            return this._renderTexture || (this._renderTexture = this.ctx.allocateRenderTexture(this._core._w, this._core._h), this._renderTextureReused = !1), this._renderTexture;
        }
        getResultTexture() {
            return this._renderTexture;
        }
    }
    class ElementCore {
        constructor(t){
            this._element = t, this.ctx = t.stage.ctx, this._recalc = 0, this._parent = null, this._onUpdate = null, this._pRecalc = 0, this._worldContext = new ElementCoreContext, this._hasUpdates = !1, this._localAlpha = 1, this._onAfterCalcs = null, this._onAfterUpdate = null, this._localPx = 0, this._localPy = 0, this._localTa = 1, this._localTb = 0, this._localTc = 0, this._localTd = 1, this._isComplex = !1, this._dimsUnknown = !1, this._clipping = !1, this._zSort = !1, this._outOfBounds = 0, this._displayedTextureSource = null, this._zContextUsage = 0, this._children = null, this._hasRenderUpdates = 0, this._zIndexedChildren = null, this._renderContext = this._worldContext, this.renderState = this.ctx.renderState, this._scissor = null, this._shaderOwner = null, this._updateTreeOrder = 0, this._colorUl = this._colorUr = this._colorBl = this._colorBr = 4294967295, this._x = 0, this._y = 0, this._w = 0, this._h = 0, this._optFlags = 0, this._funcX = null, this._funcY = null, this._funcW = null, this._funcH = null, this._scaleX = 1, this._scaleY = 1, this._pivotX = .5, this._pivotY = .5, this._mountX = 0, this._mountY = 0, this._rotation = 0, this._alpha = 1, this._visible = !0, this._ulx = 0, this._uly = 0, this._brx = 1, this._bry = 1, this._zIndex = 0, this._forceZIndexContext = !1, this._zParent = null, this._isRoot = !1, this._zIndexResort = !1, this._shader = null, this._renderToTextureEnabled = !1, this._texturizer = null, this._useRenderToTexture = !1, this._boundsMargin = null, this._recBoundsMargin = null, this._withinBoundsMargin = !1, this._viewport = null, this._clipbox = !0, this.render = this._renderSimple, this._layout = null;
        }
        get offsetX() {
            return this._funcX ? this._funcX : this.hasFlexLayout() ? this._layout.originalX : this._x;
        }
        set offsetX(t) {
            Utils.isFunction(t) ? this.funcX = t : (this._disableFuncX(), this.hasFlexLayout() ? (this.x += t - this._layout.originalX, this._layout.setOriginalXWithoutUpdatingLayout(t)) : this.x = t);
        }
        get x() {
            return this._x;
        }
        set x(t) {
            t !== this._x && (this._updateLocalTranslateDelta(t - this._x, 0), this._x = t);
        }
        get funcX() {
            return 1 & this._optFlags ? this._funcX : null;
        }
        set funcX(t) {
            this._funcX !== t && (this._optFlags |= 1, this._funcX = t, this.hasFlexLayout() ? (this._layout.setOriginalXWithoutUpdatingLayout(0), this.layout.forceLayout()) : (this._x = 0, this._triggerRecalcTranslate()));
        }
        _disableFuncX() {
            this._optFlags = 65534 & this._optFlags, this._funcX = null;
        }
        get offsetY() {
            return this._funcY ? this._funcY : this.hasFlexLayout() ? this._layout.originalY : this._y;
        }
        set offsetY(t) {
            Utils.isFunction(t) ? this.funcY = t : (this._disableFuncY(), this.hasFlexLayout() ? (this.y += t - this._layout.originalY, this._layout.setOriginalYWithoutUpdatingLayout(t)) : this.y = t);
        }
        get y() {
            return this._y;
        }
        set y(t) {
            t !== this._y && (this._updateLocalTranslateDelta(0, t - this._y), this._y = t);
        }
        get funcY() {
            return 2 & this._optFlags ? this._funcY : null;
        }
        set funcY(t) {
            this._funcY !== t && (this._optFlags |= 2, this._funcY = t, this.hasFlexLayout() ? (this._layout.setOriginalYWithoutUpdatingLayout(0), this.layout.forceLayout()) : (this._y = 0, this._triggerRecalcTranslate()));
        }
        _disableFuncY() {
            this._optFlags = 65533 & this._optFlags, this._funcY = null;
        }
        get funcW() {
            return 4 & this._optFlags ? this._funcW : null;
        }
        set funcW(t) {
            this._funcW !== t && (this._optFlags |= 4, this._funcW = t, this.hasFlexLayout() ? (this._layout._originalWidth = 0, this.layout.changedDimensions(!0, !1)) : (this._w = 0, this._triggerRecalcTranslate()));
        }
        disableFuncW() {
            this._optFlags = 65531 & this._optFlags, this._funcW = null;
        }
        get funcH() {
            return 8 & this._optFlags ? this._funcH : null;
        }
        set funcH(t) {
            this._funcH !== t && (this._optFlags |= 8, this._funcH = t, this.hasFlexLayout() ? (this._layout._originalHeight = 0, this.layout.changedDimensions(!1, !0)) : (this._h = 0, this._triggerRecalcTranslate()));
        }
        disableFuncH() {
            this._optFlags = 65527 & this._optFlags, this._funcH = null;
        }
        get w() {
            return this._w;
        }
        getRenderWidth() {
            return this.hasFlexLayout() ? this._layout.originalWidth : this._w;
        }
        get h() {
            return this._h;
        }
        getRenderHeight() {
            return this.hasFlexLayout() ? this._layout.originalHeight : this._h;
        }
        get scaleX() {
            return this._scaleX;
        }
        set scaleX(t) {
            this._scaleX !== t && (this._scaleX = t, this._updateLocalTransform());
        }
        get scaleY() {
            return this._scaleY;
        }
        set scaleY(t) {
            this._scaleY !== t && (this._scaleY = t, this._updateLocalTransform());
        }
        get scale() {
            return this.scaleX;
        }
        set scale(t) {
            this._scaleX === t && this._scaleY === t || (this._scaleX = t, this._scaleY = t, this._updateLocalTransform());
        }
        get pivotX() {
            return this._pivotX;
        }
        set pivotX(t) {
            this._pivotX !== t && (this._pivotX = t, this._updateLocalTranslate());
        }
        get pivotY() {
            return this._pivotY;
        }
        set pivotY(t) {
            this._pivotY !== t && (this._pivotY = t, this._updateLocalTranslate());
        }
        get pivot() {
            return this._pivotX;
        }
        set pivot(t) {
            this._pivotX === t && this._pivotY === t || (this._pivotX = t, this._pivotY = t, this._updateLocalTranslate());
        }
        get mountX() {
            return this._mountX;
        }
        set mountX(t) {
            this._mountX !== t && (this._mountX = t, this._updateLocalTranslate());
        }
        get mountY() {
            return this._mountY;
        }
        set mountY(t) {
            this._mountY !== t && (this._mountY = t, this._updateLocalTranslate());
        }
        get mount() {
            return this._mountX;
        }
        set mount(t) {
            this._mountX === t && this._mountY === t || (this._mountX = t, this._mountY = t, this._updateLocalTranslate());
        }
        get rotation() {
            return this._rotation;
        }
        set rotation(t) {
            this._rotation !== t && (this._rotation = t, this._updateLocalTransform());
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(t) {
            if (t = t > 1 ? 1 : t < 1e-14 ? 0 : t, this._alpha !== t) {
                let e = this._alpha;
                this._alpha = t, this._updateLocalAlpha(), 0 === e != (0 === t) && this._element._updateEnabledFlag();
            }
        }
        get visible() {
            return this._visible;
        }
        set visible(t) {
            this._visible !== t && (this._visible = t, this._updateLocalAlpha(), this._element._updateEnabledFlag(), this.hasFlexLayout() && this.layout.setVisible(t));
        }
        _updateLocalTransform() {
            if (0 !== this._rotation && this._rotation % (2 * Math.PI)) {
                let t = Math.sin(this._rotation), e = Math.cos(this._rotation);
                this._setLocalTransform(e * this._scaleX, -t * this._scaleY, t * this._scaleX, e * this._scaleY);
            } else this._setLocalTransform(this._scaleX, 0, 0, this._scaleY);
            this._updateLocalTranslate();
        }
        _updateLocalTranslate() {
            this._recalcLocalTranslate(), this._triggerRecalcTranslate();
        }
        _recalcLocalTranslate() {
            let t = this._pivotX * this._w, e = this._pivotY * this._h, i = this._x - (t * this._localTa + e * this._localTb) + t, s = this._y - (t * this._localTc + e * this._localTd) + e;
            i -= this._mountX * this._w, s -= this._mountY * this._h, this._localPx = i, this._localPy = s;
        }
        _updateLocalTranslateDelta(t, e) {
            this._addLocalTranslate(t, e);
        }
        _updateLocalAlpha() {
            this._setLocalAlpha(this._visible ? this._alpha : 0);
        }
        setHasRenderUpdates(t) {
            if (this._worldContext.alpha) {
                let e = this;
                for(e._hasRenderUpdates = Math.max(t, e._hasRenderUpdates); (e = e._parent) && 3 !== e._hasRenderUpdates;)e._hasRenderUpdates = 3;
            }
        }
        _setRecalc(t) {
            this._recalc |= t, this._setHasUpdates(), this._parent && this._parent.setHasRenderUpdates(3);
        }
        _setHasUpdates() {
            let t = this;
            for(; t && !t._hasUpdates;)t._hasUpdates = !0, t = t._parent;
        }
        getParent() {
            return this._parent;
        }
        setParent(t) {
            if (t !== this._parent) {
                let e = this.isZContext(), i = this._parent;
                if (this._parent = t, (this._layout || t && t.isFlexContainer()) && this.layout.setParent(i, t), i && i.setHasRenderUpdates(3), this._setRecalc(7), this._parent && this._parent._setHasUpdates(), 0 === this._zIndex ? this.setZParent(t) : this.setZParent(t ? t.findZContext() : null), e !== this.isZContext() && (this.isZContext() ? this.enableZContext(i.findZContext()) : this.disableZContext()), this._zIndexResort = !0, this._zParent && this._zParent.enableZSort(), !this._shader) {
                    let e1 = t && !t._renderToTextureEnabled ? t._shaderOwner : null;
                    e1 !== this._shaderOwner && (this.setHasRenderUpdates(1), this._setShaderOwnerRecursive(e1));
                }
            }
        }
        enableZSort(t = !1) {
            !this._zSort && this._zContextUsage > 0 && (this._zSort = !0, t && this.ctx.forceZSort(this));
        }
        addChildAt(t, e) {
            this._children || (this._children = []), this._children.splice(t, 0, e), e.setParent(this);
        }
        setChildAt(t, e) {
            this._children || (this._children = []), this._children[t].setParent(null), this._children[t] = e, e.setParent(this);
        }
        removeChildAt(t) {
            let e = this._children[t];
            this._children.splice(t, 1), e.setParent(null);
        }
        removeChildren() {
            if (this._children) {
                for(let t = 0, e = this._children.length; t < e; t++)this._children[t].setParent(null);
                this._children.splice(0), this._zIndexedChildren && this._zIndexedChildren.splice(0);
            }
        }
        syncChildren(t, e, i) {
            this._children = i;
            for(let e1 = 0, i1 = t.length; e1 < i1; e1++)t[e1].setParent(null);
            for(let t1 = 0, i2 = e.length; t1 < i2; t1++)e[t1].setParent(this);
        }
        moveChild(t, e) {
            let i = this._children[t];
            this._children.splice(t, 1), this._children.splice(e, 0, i), this._zIndexResort = !0, this._zParent && this._zParent.enableZSort();
        }
        _setLocalTransform(t, e, i, s) {
            this._setRecalc(4), this._localTa = t, this._localTb = e, this._localTc = i, this._localTd = s, this._isComplex = 0 !== e || 0 !== i || t < 0 || s < 0;
        }
        _addLocalTranslate(t, e) {
            this._localPx += t, this._localPy += e, this._triggerRecalcTranslate();
        }
        _setLocalAlpha(t) {
            !this._worldContext.alpha && this._parent && this._parent._worldContext.alpha && t ? this._setRecalc(129) : this._setRecalc(1), t < 1e-14 && (t = 0), this._localAlpha = t;
        }
        setDimensions(t, e, i = this._dimsUnknown) {
            if (this._dimsUnknown = i, this.hasFlexLayout()) this._layout.originalWidth = t, this._layout.originalHeight = e;
            else if (this._w !== t || this._h !== e) return this._updateDimensions(t, e), !0;
            return !1;
        }
        _updateDimensions(t, e) {
            this._w === t && this._h === e || (this._w = t, this._h = e, this._triggerRecalcTranslate(), this._texturizer && (this._texturizer.releaseRenderTexture(), this._texturizer.updateResultTexture()), this._updateLocalTranslate());
        }
        setTextureCoords(t, e, i, s) {
            this.setHasRenderUpdates(3), this._ulx = t, this._uly = e, this._brx = i, this._bry = s;
        }
        get displayedTextureSource() {
            return this._displayedTextureSource;
        }
        setDisplayedTextureSource(t) {
            this.setHasRenderUpdates(3), this._displayedTextureSource = t;
        }
        get isRoot() {
            return this._isRoot;
        }
        setAsRoot() {
            this._parent = new ElementCore(this._element), this._parent._hasRenderUpdates = 3, this._parent._hasUpdates = !0, this._isRoot = !0, this.ctx.root = this, this._parent._viewport = [
                0,
                0,
                this.ctx.stage.coordsWidth,
                this.ctx.stage.coordsHeight
            ], this._parent._scissor = this._parent._viewport, this._parent._recBoundsMargin = null, this._setRecalc(7);
        }
        isAncestorOf(t) {
            let e = t;
            for(; e = e._parent;)if (this === e) return !0;
            return !1;
        }
        isZContext() {
            return this._forceZIndexContext || this._renderToTextureEnabled || 0 !== this._zIndex || this._isRoot || !this._parent;
        }
        findZContext() {
            return this.isZContext() ? this : this._parent.findZContext();
        }
        setZParent(t) {
            if (this._zParent !== t) {
                if (null !== this._zParent && (0 !== this._zIndex && this._zParent.decZContextUsage(), this._zParent.enableZSort()), null !== t) {
                    let e = t._zContextUsage > 0;
                    0 !== this._zIndex && t.incZContextUsage(), t._zContextUsage > 0 && ((e || this._parent !== t) && t._zIndexedChildren.push(this), t.enableZSort());
                }
                this._zParent = t, this._zIndexResort = !0;
            }
        }
        incZContextUsage() {
            if (this._zContextUsage++, 1 === this._zContextUsage && (this._zIndexedChildren || (this._zIndexedChildren = []), this._children)) {
                for(let t = 0, e = this._children.length; t < e; t++)this._zIndexedChildren.push(this._children[t]);
                this._zSort = !1;
            }
        }
        decZContextUsage() {
            this._zContextUsage--, 0 === this._zContextUsage && (this._zSort = !1, this._zIndexedChildren.splice(0));
        }
        get zIndex() {
            return this._zIndex;
        }
        set zIndex(t) {
            if (this._zIndex !== t) {
                this.setHasRenderUpdates(1);
                let e = this._zParent, i = this.isZContext();
                0 === t && 0 !== this._zIndex ? this._parent === this._zParent ? this._zParent && this._zParent.decZContextUsage() : e = this._parent : 0 !== t && 0 === this._zIndex ? (e = this._parent ? this._parent.findZContext() : null, e === this._zParent && this._zParent && (this._zParent.incZContextUsage(), this._zParent.enableZSort())) : t !== this._zIndex && this._zParent && this._zParent._zContextUsage && this._zParent.enableZSort(), e !== this._zParent && this.setZParent(null), this._zIndex = t, e !== this._zParent && this.setZParent(e), i !== this.isZContext() && (this.isZContext() ? this.enableZContext(this._parent.findZContext()) : this.disableZContext()), this._zIndexResort = !0, this._zParent && this._zParent.enableZSort();
            }
        }
        get forceZIndexContext() {
            return this._forceZIndexContext;
        }
        set forceZIndexContext(t) {
            this.setHasRenderUpdates(1);
            let e = this.isZContext();
            this._forceZIndexContext = t, e !== this.isZContext() && (this.isZContext() ? this.enableZContext(this._parent.findZContext()) : this.disableZContext());
        }
        enableZContext(t) {
            if (t && t._zContextUsage > 0) this._getZIndexedDescs().forEach((t)=>{
                this.isAncestorOf(t) && 0 !== t._zIndex && t.setZParent(this);
            });
        }
        _getZIndexedDescs() {
            const t = [];
            if (this._children) for(let e = 0, i = this._children.length; e < i; e++)this._children[e]._getZIndexedDescsRec(t);
            return t;
        }
        _getZIndexedDescsRec(t) {
            if (this._zIndex) t.push(this);
            else if (this._children && !this.isZContext()) for(let e = 0, i = this._children.length; e < i; e++)this._children[e]._getZIndexedDescsRec(t);
        }
        disableZContext() {
            if (this._zContextUsage > 0) {
                let t = this._parent.findZContext();
                this._zSort && this.sortZIndexedChildren(), this._zIndexedChildren.slice().forEach(function(e) {
                    0 !== e._zIndex && e.setZParent(t);
                });
            }
        }
        get colorUl() {
            return this._colorUl;
        }
        set colorUl(t) {
            this._colorUl !== t && (this.setHasRenderUpdates(this._displayedTextureSource ? 3 : 1), this._colorUl = t);
        }
        get colorUr() {
            return this._colorUr;
        }
        set colorUr(t) {
            this._colorUr !== t && (this.setHasRenderUpdates(this._displayedTextureSource ? 3 : 1), this._colorUr = t);
        }
        get colorBl() {
            return this._colorBl;
        }
        set colorBl(t) {
            this._colorBl !== t && (this.setHasRenderUpdates(this._displayedTextureSource ? 3 : 1), this._colorBl = t);
        }
        get colorBr() {
            return this._colorBr;
        }
        set colorBr(t) {
            this._colorBr !== t && (this.setHasRenderUpdates(this._displayedTextureSource ? 3 : 1), this._colorBr = t);
        }
        set onUpdate(t) {
            this._onUpdate = t, this._setRecalc(7);
        }
        set onAfterUpdate(t) {
            this._onAfterUpdate = t, this._setRecalc(7);
        }
        set onAfterCalcs(t) {
            this._onAfterCalcs = t, this._setRecalc(7);
        }
        get shader() {
            return this._shader;
        }
        set shader(t) {
            this.setHasRenderUpdates(1);
            let e = this._shader;
            if (this._shader = t, !t && e) {
                let t1 = this._parent && !this._parent._renderToTextureEnabled ? this._parent._shaderOwner : null;
                this._setShaderOwnerRecursive(t1);
            } else t && this._setShaderOwnerRecursive(this);
        }
        get activeShader() {
            return this._shaderOwner ? this._shaderOwner.shader : this.renderState.defaultShader;
        }
        get activeShaderOwner() {
            return this._shaderOwner;
        }
        get clipping() {
            return this._clipping;
        }
        set clipping(t) {
            this._clipping !== t && (this._clipping = t, this._setRecalc(3));
        }
        get clipbox() {
            return this._clipbox;
        }
        set clipbox(t) {
            this._clipbox = t;
        }
        _setShaderOwnerRecursive(t) {
            if (this._shaderOwner = t, this._children && !this._renderToTextureEnabled) for(let e = 0, i = this._children.length; e < i; e++){
                let i1 = this._children[e];
                i1._shader || (i1._setShaderOwnerRecursive(t), i1._hasRenderUpdates = 3);
            }
        }
        _setShaderOwnerChildrenRecursive(t) {
            if (this._children) for(let e = 0, i = this._children.length; e < i; e++){
                let i1 = this._children[e];
                i1._shader || (i1._setShaderOwnerRecursive(t), i1._hasRenderUpdates = 3);
            }
        }
        _hasRenderContext() {
            return this._renderContext !== this._worldContext;
        }
        get renderContext() {
            return this._renderContext;
        }
        updateRenderToTextureEnabled() {
            this.texturizer._enabled ? this._enableRenderToTexture() : (this._disableRenderToTexture(), this._texturizer.releaseRenderTexture());
        }
        _enableRenderToTexture() {
            if (!this._renderToTextureEnabled) {
                let t = this.isZContext();
                this._renderToTextureEnabled = !0, this._renderContext = new ElementCoreContext, this._setShaderOwnerChildrenRecursive(null), t || this.enableZContext(this._parent ? this._parent.findZContext() : null), this.setHasRenderUpdates(3), this._setRecalc(7), this.render = this._renderAdvanced;
            }
        }
        _disableRenderToTexture() {
            this._renderToTextureEnabled && (this._renderToTextureEnabled = !1, this._setShaderOwnerChildrenRecursive(this._shaderOwner), this._renderContext = this._worldContext, this.isZContext() || this.disableZContext(), this._setRecalc(7), this.setHasRenderUpdates(3), this.render = this._renderSimple);
        }
        isWhite() {
            return 4294967295 === this._colorUl && 4294967295 === this._colorUr && 4294967295 === this._colorBl && 4294967295 === this._colorBr;
        }
        hasSimpleTexCoords() {
            return 0 === this._ulx && 0 === this._uly && 1 === this._brx && 1 === this._bry;
        }
        _stashTexCoords() {
            this._stashedTexCoords = [
                this._ulx,
                this._uly,
                this._brx,
                this._bry
            ], this._ulx = 0, this._uly = 0, this._brx = 1, this._bry = 1;
        }
        _unstashTexCoords() {
            this._ulx = this._stashedTexCoords[0], this._uly = this._stashedTexCoords[1], this._brx = this._stashedTexCoords[2], this._bry = this._stashedTexCoords[3], this._stashedTexCoords = null;
        }
        _stashColors() {
            this._stashedColors = [
                this._colorUl,
                this._colorUr,
                this._colorBr,
                this._colorBl
            ], this._colorUl = 4294967295, this._colorUr = 4294967295, this._colorBr = 4294967295, this._colorBl = 4294967295;
        }
        _unstashColors() {
            this._colorUl = this._stashedColors[0], this._colorUr = this._stashedColors[1], this._colorBr = this._stashedColors[2], this._colorBl = this._stashedColors[3], this._stashedColors = null;
        }
        isVisible() {
            return this._localAlpha > 1e-14;
        }
        get outOfBounds() {
            return this._outOfBounds;
        }
        set boundsMargin(t) {
            this._boundsMargin = t ? t.slice() : null, this._triggerRecalcTranslate();
        }
        get boundsMargin() {
            return this._boundsMargin;
        }
        update() {
            this._recalc |= this._parent._pRecalc, this._layout && this._layout.isEnabled() ? 256 & this._recalc && this._layout.layoutFlexTree() : 2 & this._recalc && this._optFlags && this._applyRelativeDimFuncs(), this._onUpdate && (this._hasUpdates = !0, this._onUpdate(this.element, this));
            const t = this._parent._worldContext;
            let e = this._worldContext;
            const i = t.alpha && this._localAlpha;
            if (this._hasUpdates || this._recalc && i || e.alpha && !i) {
                let s = this._recalc;
                1 & s && (!e.alpha && i && (this._hasRenderUpdates = 3), e.alpha = t.alpha * this._localAlpha, e.alpha < 1e-14 && (e.alpha = 0)), 6 & s && (e.px = t.px + this._localPx * t.ta, e.py = t.py + this._localPy * t.td, 0 !== t.tb && (e.px += this._localPy * t.tb), 0 !== t.tc && (e.py += this._localPx * t.tc)), 4 & s && (e.ta = this._localTa * t.ta, e.tb = this._localTd * t.tb, e.tc = this._localTa * t.tc, e.td = this._localTd * t.td, this._isComplex && (e.ta += this._localTc * t.tb, e.tb += this._localTb * t.ta, e.tc += this._localTc * t.td, e.td += this._localTb * t.tc));
                const r = this._parent._renderContext;
                if (this._parent._hasRenderContext()) {
                    const t1 = this._renderContext === this._worldContext;
                    t1 && (this._renderContext = new ElementCoreContext);
                    const e1 = this._renderContext;
                    (t1 || 1 & s) && (e1.alpha = r.alpha * this._localAlpha, e1.alpha < 1e-14 && (e1.alpha = 0)), (t1 || 6 & s) && (e1.px = r.px + this._localPx * r.ta, e1.py = r.py + this._localPy * r.td, 0 !== r.tb && (e1.px += this._localPy * r.tb), 0 !== r.tc && (e1.py += this._localPx * r.tc)), t1 && (s |= 2), (t1 || 4 & s) && (e1.ta = this._localTa * r.ta, e1.tb = this._localTd * r.tb, e1.tc = this._localTa * r.tc, e1.td = this._localTd * r.td, this._isComplex && (e1.ta += this._localTc * r.tb, e1.tb += this._localTb * r.ta, e1.tc += this._localTc * r.td, e1.td += this._localTb * r.tc));
                } else this._renderContext = this._worldContext;
                -1 === this.ctx.updateTreeOrder ? this.ctx.updateTreeOrder = this._updateTreeOrder + 1 : this._updateTreeOrder = this.ctx.updateTreeOrder++;
                const n = this._renderToTextureEnabled && this._texturizer.mustRenderToTexture();
                this._useRenderToTexture !== n && (this._recalc |= 6, s |= 2, this._useRenderToTexture || this._texturizer.release()), this._useRenderToTexture = n;
                const o = this._renderContext, a = this._dimsUnknown ? 2048 : this._w, h = this._dimsUnknown ? 2048 : this._h;
                let l, _, u, c;
                const d = 0 !== o.tb || 0 !== o.tc || o.ta < 0 || o.td < 0;
                if (d ? (l = Math.min(0, a * o.ta, a * o.ta + h * o.tb, h * o.tb) + o.px, u = Math.max(0, a * o.ta, a * o.ta + h * o.tb, h * o.tb) + o.px, _ = Math.min(0, a * o.tc, a * o.tc + h * o.td, h * o.td) + o.py, c = Math.max(0, a * o.tc, a * o.tc + h * o.td, h * o.td) + o.py) : (l = o.px, u = o.px + o.ta * a, _ = o.py, c = o.py + o.td * h), this._dimsUnknown && (d || this._localTa < 1 || this._localTb < 1)) {
                    const t2 = this._x * r.ta + this._y * r.tb + r.px, e2 = this._x * r.tc + this._y * r.td + r.py;
                    t2 < l && (l = t2), e2 < _ && (_ = e2), t2 > u && (u = t2), e2 > c && (c = e2);
                }
                if (6 & s || !this._scissor) {
                    if (this._clipping && o.isSquare()) {
                        const t3 = this._parent._useRenderToTexture ? this._parent._viewport : this._parent._scissor;
                        if (t3) {
                            const e3 = Math.max(t3[0], l), i1 = Math.max(t3[1], _);
                            this._scissor = [
                                e3,
                                i1,
                                Math.min(t3[2] + t3[0], u) - e3,
                                Math.min(t3[3] + t3[1], c) - i1
                            ];
                        } else this._scissor = [
                            l,
                            _,
                            u - l,
                            c - _
                        ];
                    } else this._scissor = this._parent._useRenderToTexture ? this._parent._viewport : this._parent._scissor;
                }
                if (this._boundsMargin ? this._recBoundsMargin = this._boundsMargin : this._recBoundsMargin = this._parent._recBoundsMargin, this._onAfterCalcs && this._onAfterCalcs(this.element) && (d ? (l = Math.min(0, a * o.ta, a * o.ta + h * o.tb, h * o.tb) + o.px, u = Math.max(0, a * o.ta, a * o.ta + h * o.tb, h * o.tb) + o.px, _ = Math.min(0, a * o.tc, a * o.tc + h * o.td, h * o.td) + o.py, c = Math.max(0, a * o.tc, a * o.tc + h * o.td, h * o.td) + o.py) : (l = o.px, u = o.px + o.ta * a, _ = o.py, c = o.py + o.td * h), this._dimsUnknown && (d || this._localTa < 1 || this._localTb < 1))) {
                    const t4 = this._x * r.ta + this._y * r.tb + r.px, e4 = this._x * r.tc + this._y * r.td + r.py;
                    t4 < l && (l = t4), e4 < _ && (_ = e4), t4 > u && (u = t4), e4 > c && (c = e4);
                }
                if (2 === this._parent._outOfBounds) this._outOfBounds = 2, this._withinBoundsMargin && (this._withinBoundsMargin = !1, this.element._disableWithinBoundsMargin());
                else if (6 & s) {
                    this._outOfBounds = 0;
                    let t5 = !0;
                    if (this._renderToTextureEnabled && this._texturizer && this._texturizer.renderOffscreen || (this._scissor && (this._scissor[2] <= 0 || this._scissor[3] <= 0) ? this._outOfBounds = 2 : ((this._scissor[0] > u || this._scissor[1] > c || l > this._scissor[0] + this._scissor[2] || _ > this._scissor[1] + this._scissor[3]) && (this._outOfBounds = 1), this._outOfBounds && (this._clipping || this._useRenderToTexture || this._clipbox && a && h) && (this._outOfBounds = 2)), t5 = 0 === this._outOfBounds, t5 || (t5 = this._recBoundsMargin ? !(u < this._scissor[0] - this._recBoundsMargin[2] || c < this._scissor[1] - this._recBoundsMargin[3] || l > this._scissor[0] + this._scissor[2] + this._recBoundsMargin[0] || _ > this._scissor[1] + this._scissor[3] + this._recBoundsMargin[1]) : !(u < this._scissor[0] - 100 || c < this._scissor[1] - 100 || l > this._scissor[0] + this._scissor[2] + 100 || _ > this._scissor[1] + this._scissor[3] + 100), t5 && 2 === this._outOfBounds && (this._outOfBounds = 1))), this._withinBoundsMargin !== t5) {
                        if (this._withinBoundsMargin = t5, this._withinBoundsMargin) {
                            this._hasUpdates = !0;
                            const t6 = this._recalc;
                            if (this._recalc = 0, this.element._enableWithinBoundsMargin(), this._recalc) return this.update();
                            this._recalc = t6;
                        } else this.element._disableWithinBoundsMargin();
                    }
                }
                if (this._useRenderToTexture && (this._viewport ? (this._viewport[2] = a, this._viewport[3] = h) : this._viewport = [
                    0,
                    0,
                    a,
                    h
                ]), this._pRecalc = 135 & this._recalc, this._recalc = 0, this._hasUpdates = !1, this._outOfBounds < 2) {
                    if (this._useRenderToTexture && (this._worldContext.isIdentity() ? this._renderContext = this._worldContext : this._renderContext = ElementCoreContext.IDENTITY), this._children) for(let t7 = 0, e5 = this._children.length; t7 < e5; t7++)this._children[t7].update();
                    this._useRenderToTexture && (this._renderContext = o);
                } else if (this._children) for(let t8 = 0, e6 = this._children.length; t8 < e6; t8++)this._children[t8]._hasUpdates ? this._children[t8].update() : (this._children[t8]._recalc |= this._pRecalc, this._children[t8].updateOutOfBounds());
                this._onAfterUpdate && this._onAfterUpdate(this.element);
            } else -1 === this.ctx.updateTreeOrder || this._updateTreeOrder >= this.ctx.updateTreeOrder ? this.ctx.updateTreeOrder = -1 : this.updateTreeOrder();
        }
        _applyRelativeDimFuncs() {
            if (1 & this._optFlags) {
                const t = this._funcX(this._parent.w);
                t !== this._x && (this._localPx += t - this._x, this._x = t);
            }
            if (2 & this._optFlags) {
                const t1 = this._funcY(this._parent.h);
                t1 !== this._y && (this._localPy += t1 - this._y, this._y = t1);
            }
            let t2 = !1;
            if (4 & this._optFlags) {
                const e = this._funcW(this._parent.w);
                e !== this._w && (this._w = e, t2 = !0);
            }
            if (8 & this._optFlags) {
                const e1 = this._funcH(this._parent.h);
                e1 !== this._h && (this._h = e1, t2 = !0);
            }
            t2 && (this._recalcLocalTranslate(), this.element.onDimensionsChanged(this._w, this._h));
        }
        updateOutOfBounds() {
            if (2 !== this._outOfBounds && this._renderContext.alpha > 0 && (this._outOfBounds = 2, this._withinBoundsMargin && (this._withinBoundsMargin = !1, this.element._disableWithinBoundsMargin()), this._children)) for(let t = 0, e = this._children.length; t < e; t++)this._children[t].updateOutOfBounds();
        }
        updateTreeOrder() {
            if (this._localAlpha && 2 !== this._outOfBounds && (this._updateTreeOrder = this.ctx.updateTreeOrder++, this._children)) for(let t = 0, e = this._children.length; t < e; t++)this._children[t].updateTreeOrder();
        }
        _renderSimple() {
            if (this._hasRenderUpdates = 0, this._zSort && this.sortZIndexedChildren(), this._outOfBounds < 2 && this._renderContext.alpha) {
                let t = this.renderState;
                if (0 === this._outOfBounds && this._displayedTextureSource && (t.setShader(this.activeShader, this._shaderOwner), t.setScissor(this._scissor), this.renderState.addQuad(this)), this._children) {
                    if (this._zContextUsage) for(let t1 = 0, e = this._zIndexedChildren.length; t1 < e; t1++)this._zIndexedChildren[t1].render();
                    else for(let t2 = 0, e1 = this._children.length; t2 < e1; t2++)0 === this._children[t2]._zIndex && this._children[t2].render();
                }
            }
        }
        _renderAdvanced() {
            const t = this._hasRenderUpdates;
            if (this._hasRenderUpdates = 0, this._zSort && this.sortZIndexedChildren(), this._outOfBounds < 2 && this._renderContext.alpha) {
                let e, i, s = this.renderState, r = !0;
                if (this._useRenderToTexture) {
                    if (0 === this._w || 0 === this._h) return;
                    if (!this._texturizer.hasRenderTexture() || t >= 3) {
                        if (this.ctx.renderToTextureCount++, s.setShader(s.defaultShader, this), i = s.renderTextureInfo, e = {
                            nativeTexture: null,
                            offset: 0,
                            w: this._w,
                            h: this._h,
                            empty: !0,
                            cleared: !1,
                            ignore: !1,
                            cache: !1
                        }, (this._texturizer.hasResultTexture() || !s.isCachingTexturizer && t < 3) && (e.cache = !0, s.isCachingTexturizer = !0), this._texturizer.hasResultTexture() || this._texturizer.releaseRenderTexture(), s.setRenderTextureInfo(e), s.setScissor(null), this._displayedTextureSource) {
                            let t1 = this._renderContext;
                            this._renderContext = ElementCoreContext.IDENTITY, this.renderState.addQuad(this), this._renderContext = t1;
                        }
                    } else r = !1;
                } else 0 === this._outOfBounds && this._displayedTextureSource && (s.setShader(this.activeShader, this._shaderOwner), s.setScissor(this._scissor), this.renderState.addQuad(this));
                if (r && this._children) {
                    if (this._zContextUsage) for(let t2 = 0, e1 = this._zIndexedChildren.length; t2 < e1; t2++)this._zIndexedChildren[t2].render();
                    else for(let t3 = 0, e2 = this._children.length; t3 < e2; t3++)0 === this._children[t3]._zIndex && this._children[t3].render();
                }
                if (this._useRenderToTexture) {
                    let t4 = !1;
                    if (r && (s.finishedRenderTexture(), this._texturizer.empty = e.empty, e.empty ? this._texturizer.releaseRenderTexture() : e.nativeTexture ? (this._texturizer.reuseTextureAsRenderTexture(e.nativeTexture), e.ignore = !0) : (this._texturizer.renderTextureReused && this._texturizer.releaseRenderTexture(), e.nativeTexture = this._texturizer.getRenderTexture()), s.setRenderTextureInfo(i), t4 = !0), !this._texturizer.empty) {
                        let i1 = this._texturizer.getResultTexture();
                        if (t4 && (i1 && (i1.update = s.stage.frameCounter), this._texturizer.updateResultTexture()), !this._texturizer.renderOffscreen) {
                            s.setShader(this.activeShader, this._shaderOwner), s.setScissor(this._scissor);
                            const t5 = !e || e.cache;
                            s.setTexturizer(this._texturizer, t5), this._stashTexCoords(), this._texturizer.colorize || this._stashColors(), this.renderState.addQuad(this, !0), this._texturizer.colorize || this._unstashColors(), this._unstashTexCoords(), s.setTexturizer(null);
                        }
                    }
                }
                e && e.cache && (s.isCachingTexturizer = !1);
            }
        }
        get zSort() {
            return this._zSort;
        }
        sortZIndexedChildren() {
            const t = this._zIndexedChildren.length;
            let e = 0;
            const i = this._zIndexedChildren, s = [];
            for(let r = 0; r < t; r++)i[r]._zParent === this && (i[r]._zIndexResort ? s.push(i[r]) : (e !== r && (i[e] = i[r]), e++));
            const r1 = s.length;
            if (r1) {
                for(let t1 = 0; t1 < r1; t1++)s[t1]._zIndexResort = !1;
                s.sort(ElementCore.sortZIndexedChildren);
                const t2 = e;
                if (t2) {
                    e = 0;
                    let n = 0, o = 0;
                    const a = [];
                    for(;;){
                        const h = (i[n]._zIndex === s[o]._zIndex ? i[n]._updateTreeOrder - s[o]._updateTreeOrder : i[n]._zIndex - s[o]._zIndex) > 0 ? s[o++] : i[n++];
                        if (0 !== e && a[e - 1] === h || (a[e++] = h), n >= t2) {
                            do {
                                const t3 = s[o++];
                                0 !== e && a[e - 1] === t3 || (a[e++] = t3);
                            }while (o < r1);
                            break;
                        }
                        if (o >= r1) {
                            do {
                                const t4 = i[n++];
                                0 !== e && a[e - 1] === t4 || (a[e++] = t4);
                            }while (n < t2);
                            break;
                        }
                    }
                    this._zIndexedChildren = a;
                } else {
                    e = 0;
                    let t5 = 0;
                    do i[e++] = s[t5++];
                    while (t5 < r1);
                    i.length > e && i.splice(e);
                }
            } else i.length > e && i.splice(e);
            this._zSort = !1;
        }
        get localTa() {
            return this._localTa;
        }
        get localTb() {
            return this._localTb;
        }
        get localTc() {
            return this._localTc;
        }
        get localTd() {
            return this._localTd;
        }
        get element() {
            return this._element;
        }
        get renderUpdates() {
            return this._hasRenderUpdates;
        }
        get texturizer() {
            return this._texturizer || (this._texturizer = new ElementTexturizer(this)), this._texturizer;
        }
        getCornerPoints() {
            let t = this._worldContext;
            return [
                t.px,
                t.py,
                t.px + this._w * t.ta,
                t.py + this._w * t.tc,
                t.px + this._w * t.ta + this._h * t.tb,
                t.py + this._w * t.tc + this._h * t.td,
                t.px + this._h * t.tb,
                t.py + this._h * t.td
            ];
        }
        getRenderTextureCoords(t, e) {
            let i = this._renderContext;
            return [
                i.px + i.ta * t + i.tb * e,
                i.py + i.tc * t + i.td * e
            ];
        }
        getAbsoluteCoords(t, e) {
            let i = this._renderContext;
            return [
                i.px + i.ta * t + i.tb * e,
                i.py + i.tc * t + i.td * e
            ];
        }
        collectAtCoord(t, e, i) {
            if (0 !== this._renderContext.alpha) {
                if (this.inBound(t, e) && (this._scissor ? this.inScissor() && i.push(this) : i.push(this)), this._children) {
                    const s = this._children.length;
                    for(let r = 0; r < s; r++)this._children[r].collectAtCoord(t, e, i);
                }
                return i.sort(ElementCore.sortZIndexedChildren);
            }
        }
        inBound(t, e) {
            const i = this.getCornerPoints();
            return t > i[0] && t < i[2] && e > i[1] && e < i[7];
        }
        inScissor() {
            const t = this._scissor, e = this.getCornerPoints();
            return e[2] >= t[0] && e[0] <= t[0] + t[2] && e[7] >= t[1] && e[1] <= t[1] + t[3];
        }
        get layout() {
            return this._ensureLayout(), this._layout;
        }
        get flex() {
            return this._layout ? this._layout.flex : null;
        }
        set flex(t) {
            this.layout.flex = t;
        }
        get flexItem() {
            return this._layout ? this._layout.flexItem : null;
        }
        set flexItem(t) {
            this.layout.flexItem = t;
        }
        isFlexItem() {
            return !!this._layout && this._layout.isFlexItemEnabled();
        }
        isFlexContainer() {
            return !!this._layout && this._layout.isFlexEnabled();
        }
        enableFlexLayout() {
            this._ensureLayout();
        }
        _ensureLayout() {
            this._layout || (this._layout = new FlexTarget(this));
        }
        disableFlexLayout() {
            this._triggerRecalcTranslate();
        }
        hasFlexLayout() {
            return this._layout && this._layout.isEnabled();
        }
        setLayout(t, e, i, s) {
            this.x = t, this.y = e, this._updateDimensions(i, s);
        }
        triggerLayout() {
            this._setRecalc(256);
        }
        _triggerRecalcTranslate() {
            this._setRecalc(2);
        }
    }
    class ElementCoreContext {
        constructor(){
            this.alpha = 1, this.px = 0, this.py = 0, this.ta = 1, this.tb = 0, this.tc = 0, this.td = 1;
        }
        isIdentity() {
            return 1 === this.alpha && 0 === this.px && 0 === this.py && 1 === this.ta && 0 === this.tb && 0 === this.tc && 1 === this.td;
        }
        isSquare() {
            return 0 === this.tb && 0 === this.tc;
        }
    }
    ElementCoreContext.IDENTITY = new ElementCoreContext, ElementCore.sortZIndexedChildren = function(t, e) {
        return t._zIndex === e._zIndex ? t._updateTreeOrder - e._updateTreeOrder : t._zIndex - e._zIndex;
    };
    class EventEmitter {
        constructor(){
            this._hasEventListeners = !1;
        }
        on(t, e) {
            this._hasEventListeners || (this._eventFunction = {}, this._eventListeners = {}, this._hasEventListeners = !0);
            this._eventFunction[t] ? this._eventFunction[t] !== EventEmitter.combiner ? (this._eventListeners[t] = [
                this._eventFunction[t],
                e
            ], this._eventFunction[t] = EventEmitter.combiner) : this._eventListeners[t].push(e) : this._eventFunction[t] = e;
        }
        once(t, e) {
            const wrapper = (i, s, r)=>{
                e(i, s, r), this.off(t, wrapper);
            };
            wrapper.__originalFunc = e, this.on(t, wrapper);
        }
        has(t, e) {
            if (this._hasEventListeners) {
                const i = this._eventFunction[t];
                if (i) {
                    if (i === EventEmitter.combiner) {
                        const i1 = this._eventListeners[t];
                        for (const t1 of i1)if (t1 === e || t1.__originalFunc == e) return !0;
                    } else if (this._eventFunction[t] === e || this._eventFunction[t].__originalFunc === e) return !0;
                }
            }
            return !1;
        }
        off(t, e) {
            if (this._hasEventListeners) {
                const i = this._eventFunction[t];
                if (i) {
                    if (i === EventEmitter.combiner) {
                        const i1 = this._eventListeners[t];
                        let s = i1.indexOf(e);
                        s >= 0 && i1.splice(s, 1), s = i1.map((t)=>t.__originalFunc).indexOf(e), s >= 0 && i1.splice(s, 1), 1 === i1.length && (this._eventFunction[t] = i1[0], this._eventListeners[t] = void 0);
                    } else this._eventFunction[t] !== e && this._eventFunction[t].__originalFunc !== e || (this._eventFunction[t] = void 0);
                }
            }
        }
        removeListener(t, e) {
            this.off(t, e);
        }
        emit(t, e, i, s) {
            if (this._hasEventListeners) {
                const r = this._eventFunction[t];
                r && (r === EventEmitter.combiner ? r(this, t, e, i, s) : r(e, i, s));
            }
        }
        listenerCount(t) {
            if (this._hasEventListeners) {
                const e = this._eventFunction[t];
                if (e) return e === EventEmitter.combiner ? this._eventListeners[t].length : 1;
            }
            return 0;
        }
        removeAllListeners(t) {
            this._hasEventListeners && (delete this._eventFunction[t], delete this._eventListeners[t]);
        }
    }
    EventEmitter.combiner = function(t, e, i, s, r) {
        const n = t._eventListeners[e];
        if (n) for (const t1 of [
            ...n
        ])t1(i, s, r);
    }, EventEmitter.addAsMixin = function(t) {
        t.prototype.on = EventEmitter.prototype.on, t.prototype.once = EventEmitter.prototype.once, t.prototype.has = EventEmitter.prototype.has, t.prototype.off = EventEmitter.prototype.off, t.prototype.removeListener = EventEmitter.prototype.removeListener, t.prototype.emit = EventEmitter.prototype.emit, t.prototype.listenerCount = EventEmitter.prototype.listenerCount, t.prototype.removeAllListeners = EventEmitter.prototype.removeAllListeners;
    };
    class Shader {
        constructor(t){
            this._initialized = !1, this.ctx = t, this._elements = new Set;
        }
        static create(t, e) {
            let i;
            if (Utils.isObjectLiteral(e)) i = e.type ? t.renderer.createShader(t.ctx, e) : this.shader, i && Base.patchObject(i, e);
            else if (null === e) i = t.ctx.renderState.defaultShader;
            else if (void 0 === e) i = null;
            else {
                if (!e.isShader) return void console.error("[Lightning] Please specify a shader type.");
                t.renderer.isValidShaderType(e.constructor) || (console.error("[Lightning] Invalid shader type"), e = null), i = e;
            }
            return i;
        }
        static getWebGL() {}
        static getC2d() {}
        addElement(t) {
            this._elements.add(t);
        }
        removeElement(t) {
            this._elements.delete(t), this._elements || this.cleanup();
        }
        redraw() {
            this._elements.forEach((t)=>{
                t.setHasRenderUpdates(2);
            });
        }
        patch(t) {
            Base.patchObject(this, t);
        }
        useDefault() {
            return !1;
        }
        addEmpty() {
            return !1;
        }
        cleanup() {}
        get isShader() {
            return !0;
        }
    }
    class Texture {
        constructor(t){
            this.stage = t, this.manager = this.stage.textureManager, this.id = Texture.id++, this.elements = new Set, this._activeCount = 0, this._source = null, this._resizeMode = null, this._x = 0, this._y = 0, this._w = 0, this._h = 0, this._precision = 1, this.mw = 0, this.mh = 0, this.clipping = !1, this._mustUpdate = !0;
        }
        get source() {
            return (this._mustUpdate || this.stage.hasUpdateSourceTexture(this)) && (this._performUpdateSource(!0), this.stage.removeUpdateSourceTexture(this)), this._source;
        }
        addElement(t) {
            this.elements.has(t) || (this.elements.add(t), 1 === this.elements.size && this._source && this._source.addTexture(this), t.active && this.incActiveCount());
        }
        removeElement(t) {
            this.elements.delete(t) && (0 === this.elements.size && this._source && this._source.removeTexture(this), t.active && this.decActiveCount());
        }
        incActiveCount() {
            this.source && this._checkForNewerReusableTextureSource(), this._activeCount++, 1 === this._activeCount && this.becomesUsed();
        }
        decActiveCount() {
            this.source;
            this._activeCount--, this._activeCount || this.becomesUnused();
        }
        becomesUsed() {
            this.source && this.source.incActiveTextureCount();
        }
        onLoad() {
            this._resizeMode && this._applyResizeMode(), this.elements.forEach((t)=>{
                t.active && t.onTextureSourceLoaded();
            });
        }
        _checkForNewerReusableTextureSource() {
            const t = this.source;
            if (t.isLoaded()) this._resizeMode && this._applyResizeMode();
            else {
                const e = this._getReusableTextureSource();
                e && e.isLoaded() && e !== t && this._replaceTextureSource(e);
            }
        }
        becomesUnused() {
            this.source && this.source.decActiveTextureCount();
        }
        isUsed() {
            return this._activeCount > 0;
        }
        _getLookupId() {
            return null;
        }
        _getSourceLoader() {
            throw new Error("Texture.generate must be implemented.");
        }
        get isValid() {
            return this._getIsValid();
        }
        _getIsValid() {
            return !0;
        }
        _changed() {
            this.isUsed() ? this._updateSource() : this._mustUpdate = !0;
        }
        _updateSource() {
            this.stage.addUpdateSourceTexture(this);
        }
        _performUpdateSource(t = !1) {
            if (t || this.isUsed()) {
                this._mustUpdate = !1;
                let t1 = this._getTextureSource();
                this._replaceTextureSource(t1);
            }
        }
        _getTextureSource() {
            let t = null;
            if (this._getIsValid()) {
                const e = this._getLookupId();
                t = this._getReusableTextureSource(e), t || (t = this.manager.getTextureSource(this._getSourceLoader(), e));
            }
            return t;
        }
        _getReusableTextureSource(t = this._getLookupId()) {
            return this._getIsValid() && t ? this.manager.getReusableTextureSource(t) : null;
        }
        _replaceTextureSource(t = null) {
            let e = this._source;
            if (this._source = t, this.elements.size && (e && (this._activeCount && e.decActiveTextureCount(), e.removeTexture(this)), t && (t.addTexture(this), this._activeCount && t.incActiveTextureCount())), this.isUsed()) {
                if (t) {
                    if (t.isLoaded()) this._resizeMode && this._applyResizeMode(), this.elements.forEach((t)=>{
                        t.active && t._setDisplayedTexture(this);
                    });
                    else {
                        const e1 = t.loadError;
                        e1 && this.elements.forEach((t)=>{
                            t.active && t.onTextureSourceLoadError(e1);
                        });
                    }
                } else this.elements.forEach((t)=>{
                    t.active && t._setDisplayedTexture(null);
                });
            }
        }
        load() {
            this.source && (this.isLoaded() || this.source.load(!0));
        }
        isLoaded() {
            return this._source && this._source.isLoaded();
        }
        get loadError() {
            return this._source && this._source.loadError;
        }
        free() {
            this._source && this._source.free();
        }
        set resizeMode({ type: t = "cover" , w: e = 0 , h: i = 0 , clipX: s = .5 , clipY: r = .5  }) {
            this._resizeMode = {
                type: t,
                w: e,
                h: i,
                clipX: s,
                clipY: r
            }, this.isLoaded() && this._applyResizeMode();
        }
        get resizeMode() {
            return this._resizeMode;
        }
        _clearResizeMode() {
            this._resizeMode = null;
        }
        _applyResizeMode() {
            "cover" === this._resizeMode.type ? this._applyResizeCover() : "contain" === this._resizeMode.type && this._applyResizeContain(), this._updatePrecision(), this._updateClipping();
        }
        _applyResizeCover() {
            const t = this._resizeMode.w / this._source.w, e = this._resizeMode.h / this._source.h;
            let i = Math.max(t, e);
            if (i) {
                if (this._precision = 1 / i, t && t < i) {
                    const t1 = this._precision * this._resizeMode.w, e1 = this._source.w - t1;
                    this._x = e1 * this._resizeMode.clipX, this._w = this._source.w - e1;
                }
                if (e && e < i) {
                    const t2 = this._precision * this._resizeMode.h, e2 = this._source.h - t2;
                    this._y = e2 * this._resizeMode.clipY, this._h = this._source.h - e2;
                }
            }
        }
        _applyResizeContain() {
            const t = this._resizeMode.w / this._source.w, e = this._resizeMode.h / this._source.h;
            let i = t;
            (!i || e < i) && (i = e), i && (this._precision = 1 / i);
        }
        enableClipping(t, e, i, s) {
            this._clearResizeMode(), t *= this._precision, e *= this._precision, i *= this._precision, s *= this._precision, this._x === t && this._y === e && this._w === i && this._h === s || (this._x = t, this._y = e, this._w = i, this._h = s, this._updateClipping(!0));
        }
        disableClipping() {
            this._clearResizeMode(), (this._x || this._y || this._w || this._h) && (this._x = 0, this._y = 0, this._w = 0, this._h = 0, this._updateClipping());
        }
        _updateClipping() {
            this.clipping = !!(this._x || this._y || this._w || this._h);
            let t = this;
            this.elements.forEach(function(e) {
                e.displayedTexture === t && e.onDisplayedTextureClippingChanged();
            });
        }
        _updatePrecision() {
            let t = this;
            this.elements.forEach(function(e) {
                e.displayedTexture === t && e.onPrecisionChanged();
            });
        }
        getNonDefaults() {
            let t = {};
            return t.type = this.constructor.name, 0 !== this.x && (t.x = this.x), 0 !== this.y && (t.y = this.y), 0 !== this.w && (t.w = this.w), 0 !== this.h && (t.h = this.h), 1 !== this.precision && (t.precision = this.precision), t;
        }
        get px() {
            return this._x;
        }
        get py() {
            return this._y;
        }
        get pw() {
            return this._w;
        }
        get ph() {
            return this._h;
        }
        get x() {
            return this._x / this._precision;
        }
        set x(t) {
            this._clearResizeMode(), t *= this._precision, this._x !== t && (this._x = t, this._updateClipping());
        }
        get y() {
            return this._y / this._precision;
        }
        set y(t) {
            this._clearResizeMode(), t *= this._precision, this._y !== t && (this._y = t, this._updateClipping());
        }
        get w() {
            return this._w / this._precision;
        }
        set w(t) {
            this._clearResizeMode(), t *= this._precision, this._w !== t && (this._w = t, this._updateClipping());
        }
        get h() {
            return this._h / this._precision;
        }
        set h(t) {
            this._clearResizeMode(), t *= this._precision, this._h !== t && (this._h = t, this._updateClipping());
        }
        get precision() {
            return this._precision;
        }
        set precision(t) {
            this._clearResizeMode(), this._precision !== t && (this._precision = t, this._updatePrecision());
        }
        isAutosizeTexture() {
            return !0;
        }
        getRenderWidth() {
            return this.isAutosizeTexture() ? (this._w || (this._source ? this._source.getRenderWidth() - this._x : 0)) / this._precision : 0;
        }
        getRenderHeight() {
            return this.isAutosizeTexture() ? (this._h || (this._source ? this._source.getRenderHeight() - this._y : 0)) / this._precision : 0;
        }
        patch(t) {
            Base.patchObject(this, t);
        }
    }
    Texture.prototype.isTexture = !0, Texture.id = 0;
    class ImageTexture extends Texture {
        constructor(t){
            super(t), this._src = void 0, this._hasAlpha = !1;
        }
        get src() {
            return this._src;
        }
        set src(t) {
            this._src !== t && (this._src = t, this._changed());
        }
        get hasAlpha() {
            return this._hasAlpha;
        }
        set hasAlpha(t) {
            this._hasAlpha !== t && (this._hasAlpha = t, this._changed());
        }
        _getIsValid() {
            return !!this._src;
        }
        _getLookupId() {
            return this._src;
        }
        _getSourceLoader() {
            let t = this._src, e = this._hasAlpha;
            if (this.stage.getOption("srcBasePath")) {
                var i = t.charCodeAt(0);
                -1 === t.indexOf("//") && (i >= 65 && i <= 90 || i >= 97 && i <= 122 || 46 == i) && (t = this.stage.getOption("srcBasePath") + t);
            }
            return (i)=>this.stage.platform.loadSrcTexture({
                    src: t,
                    hasAlpha: e
                }, i);
        }
        getNonDefaults() {
            const t = super.getNonDefaults();
            return this._src && (t.src = this._src), t;
        }
    }
    class TextTextureRenderer {
        constructor(t, e, i){
            this._stage = t, this._canvas = e, this._context = this._canvas.getContext("2d"), this._settings = i;
        }
        getPrecision() {
            return this._settings.precision;
        }
        setFontProperties() {
            this._context.font = Utils.isSpark ? this._stage.platform.getFontSetting(this) : this._getFontSetting(), this._context.textBaseline = this._settings.textBaseline;
        }
        _getFontSetting() {
            let t = this._settings.fontFace;
            Array.isArray(t) || (t = [
                t
            ]);
            let e = [];
            for(let i = 0, s = t.length; i < s; i++)"serif" === t[i] || "sans-serif" === t[i] ? e.push(t[i]) : e.push(`"${t[i]}"`);
            return `${this._settings.fontStyle} ${this._settings.fontSize * this.getPrecision()}px ${e.join(",")}`;
        }
        _load() {
            if (Utils.isWeb && document.fonts) {
                const t = this._getFontSetting();
                try {
                    if (!document.fonts.check(t, this._settings.text)) return document.fonts.load(t, this._settings.text).catch((e)=>{
                        console.warn("[Lightning] Font load error", e, t);
                    }).then(()=>{
                        document.fonts.check(t, this._settings.text) || console.warn("[Lightning] Font not found", t);
                    });
                } catch (e) {
                    console.warn("[Lightning] Can't check font loading for " + t);
                }
            }
        }
        draw() {
            const t = this._load();
            return t ? t.then(()=>Utils.isSpark ? this._stage.platform.drawText(this) : this._draw()) : Utils.isSpark ? this._stage.platform.drawText(this) : this._draw();
        }
        _calculateRenderInfo() {
            let t = {};
            const e = this.getPrecision(), i = this._settings.paddingLeft * e, s = this._settings.paddingRight * e, r = this._settings.fontSize * e;
            let n = null === this._settings.offsetY ? null : this._settings.offsetY * e, o = this._settings.lineHeight * e;
            const a = this._settings.w * e, h = this._settings.h * e;
            let l = this._settings.wordWrapWidth * e;
            const _ = this._settings.cutSx * e, u = this._settings.cutEx * e, c = this._settings.cutSy * e, d = this._settings.cutEy * e, g = (this._settings.letterSpacing || 0) * e, p = this._settings.textIndent * e;
            this.setFontProperties();
            let f, x = a || 2048 / this.getPrecision(), m = x - i;
            if (m < 10 && (x += 10 - m, m = 10), l || (l = m), this._settings.textOverflow && !this._settings.wordWrap) {
                let t1;
                switch(this._settings.textOverflow){
                    case "clip":
                        t1 = "";
                        break;
                    case "ellipsis":
                        t1 = this._settings.maxLinesSuffix;
                        break;
                    default:
                        t1 = this._settings.textOverflow;
                }
                this._settings.text = this.wrapWord(this._settings.text, l - p, t1);
            }
            if (this._settings.wordWrap) f = this.wrapText(this._settings.text, l, g, p);
            else {
                f = {
                    l: this._settings.text.split(/(?:\r\n|\r|\n)/),
                    n: []
                };
                let t2 = f.l.length;
                for(let e1 = 0; e1 < t2 - 1; e1++)f.n.push(e1);
            }
            let S = f.l;
            if (this._settings.maxLines && S.length > this._settings.maxLines) {
                let e2 = S.slice(0, this._settings.maxLines), i1 = null;
                if (this._settings.maxLinesSuffix) {
                    let t3 = this._settings.maxLinesSuffix ? this.measureText(this._settings.maxLinesSuffix) : 0, s1 = this.wrapText(e2[e2.length - 1], l - t3, g, p);
                    e2[e2.length - 1] = s1.l[0] + this._settings.maxLinesSuffix, i1 = [
                        s1.l.length > 1 ? s1.l[1] : ""
                    ];
                } else i1 = [
                    ""
                ];
                let s2, r1 = S.length, n1 = 0, o1 = f.n.length;
                for(s2 = this._settings.maxLines; s2 < r1; s2++)i1[n1] += (i1[n1] ? " " : "") + S[s2], s2 + 1 < o1 && f.n[s2 + 1] && n1++;
                t.remainingText = i1.join("\n"), t.moreTextLines = !0, S = e2;
            } else t.moreTextLines = !1, t.remainingText = "";
            let T, v = 0, y = [];
            for(let t4 = 0; t4 < S.length; t4++){
                let e3 = this.measureText(S[t4], g) + (0 === t4 ? p : 0);
                y.push(e3), v = Math.max(v, e3);
            }
            if (t.lineWidths = y, a || (x = v + i + s, m = v), o = o || r, h) T = h;
            else {
                const t5 = "bottom" != this._settings.textBaseline ? .5 * r : 0;
                T = o * (S.length - 1) + t5 + Math.max(o, r) + n;
            }
            return null === n && (n = r), t.w = x, t.h = T, t.lines = S, t.precision = e, x || (x = 1), T || (T = 1), (_ || u) && (x = Math.min(x, u - _)), (c || d) && (T = Math.min(T, d - c)), t.width = x, t.innerWidth = m, t.height = T, t.fontSize = r, t.cutSx = _, t.cutSy = c, t.cutEx = u, t.cutEy = d, t.lineHeight = o, t.lineWidths = y, t.offsetY = n, t.paddingLeft = i, t.paddingRight = s, t.letterSpacing = g, t.textIndent = p, t;
        }
        _draw() {
            const t = this._calculateRenderInfo(), e = this.getPrecision();
            let i, s;
            this._canvas.width = Math.ceil(t.width + this._stage.getOption("textRenderIssueMargin")), this._canvas.height = Math.ceil(t.height), this.setFontProperties(), t.fontSize >= 128 && (this._context.globalAlpha = .01, this._context.fillRect(0, 0, .01, .01), this._context.globalAlpha = 1), (t.cutSx || t.cutSy) && this._context.translate(-t.cutSx, -t.cutSy);
            let r = [];
            for(let e1 = 0, n = t.lines.length; e1 < n; e1++)i = 0 === e1 ? t.textIndent : 0, s = e1 * t.lineHeight + t.offsetY, "middle" == this._settings.verticalAlign ? s += (t.lineHeight - t.fontSize) / 2 : "bottom" == this._settings.verticalAlign && (s += t.lineHeight - t.fontSize), "right" === this._settings.textAlign ? i += t.innerWidth - t.lineWidths[e1] : "center" === this._settings.textAlign && (i += (t.innerWidth - t.lineWidths[e1]) / 2), i += t.paddingLeft, r.push({
                text: t.lines[e1],
                x: i,
                y: s,
                w: t.lineWidths[e1]
            });
            if (this._settings.highlight) {
                let i1 = this._settings.highlightColor || 0, s1 = this._settings.highlightHeight * e || 1.5 * t.fontSize;
                const n1 = this._settings.highlightOffset * e, o = null !== this._settings.highlightPaddingLeft ? this._settings.highlightPaddingLeft * e : t.paddingLeft, a = null !== this._settings.highlightPaddingRight ? this._settings.highlightPaddingRight * e : t.paddingRight;
                this._context.fillStyle = StageUtils.getRgbaString(i1);
                for(let e2 = 0; e2 < r.length; e2++){
                    let i2 = r[e2];
                    this._context.fillRect(i2.x - o, i2.y - t.offsetY + n1, i2.w + a + o, s1);
                }
            }
            let n2 = null;
            this._settings.shadow && (n2 = [
                this._context.shadowColor,
                this._context.shadowOffsetX,
                this._context.shadowOffsetY,
                this._context.shadowBlur
            ], this._context.shadowColor = StageUtils.getRgbaString(this._settings.shadowColor), this._context.shadowOffsetX = this._settings.shadowOffsetX * e, this._context.shadowOffsetY = this._settings.shadowOffsetY * e, this._context.shadowBlur = this._settings.shadowBlur * e), this._context.fillStyle = StageUtils.getRgbaString(this._settings.textColor);
            for(let e3 = 0, i3 = r.length; e3 < i3; e3++){
                let i4 = r[e3];
                if (0 === t.letterSpacing) this._context.fillText(i4.text, i4.x, i4.y);
                else {
                    const e4 = i4.text.split("");
                    let s2 = i4.x;
                    for(let r1 = 0, n3 = e4.length; r1 < n3; r1++)this._context.fillText(e4[r1], s2, i4.y), s2 += this.measureText(e4[r1], t.letterSpacing);
                }
            }
            n2 && (this._context.shadowColor = n2[0], this._context.shadowOffsetX = n2[1], this._context.shadowOffsetY = n2[2], this._context.shadowBlur = n2[3]), (t.cutSx || t.cutSy) && this._context.translate(t.cutSx, t.cutSy), this.renderInfo = t;
        }
        wrapWord(t, e, i) {
            const s = this._context.measureText(i).width, r = t.length, n = this._context.measureText(t).width;
            if (n <= e) return t;
            let o = Math.floor(e * r / n), a = this._context.measureText(t.substring(0, o)).width + s;
            if (a > e) for(; o > 0 && (a = this._context.measureText(t.substring(0, o)).width + s, a > e);)o -= 1;
            else for(; o < r;){
                if (a = this._context.measureText(t.substring(0, o)).width + s, !(a < e)) {
                    o -= 1;
                    break;
                }
                o += 1;
            }
            return t.substring(0, o) + (e >= s ? i : "");
        }
        wrapText(t, e, i, s = 0) {
            let r = t.split(/\r?\n/g), n = [], o = [];
            for(let t1 = 0; t1 < r.length; t1++){
                let a = [], h = "", l = e - s, _ = r[t1].split(" ");
                for(let t2 = 0; t2 < _.length; t2++){
                    const r1 = this.measureText(_[t2], i), n1 = r1 + this.measureText(" ", i);
                    0 === t2 || n1 > l ? (t2 > 0 && (a.push(h), h = ""), h += _[t2], l = e - r1 - (0 === t2 ? s : 0)) : (l -= n1, h += " " + _[t2]);
                }
                a.push(h), h = "", n = n.concat(a), t1 < r.length - 1 && o.push(n.length);
            }
            return {
                l: n,
                n: o
            };
        }
        measureText(t, e = 0) {
            return e ? t.split("").reduce((t, i)=>t + this._context.measureText(i).width + e, 0) : this._context.measureText(t).width;
        }
    }
    class TextTextureRendererAdvanced {
        constructor(t, e, i){
            this._stage = t, this._canvas = e, this._context = this._canvas.getContext("2d"), this._settings = i;
        }
        getPrecision() {
            return this._settings.precision;
        }
        setFontProperties() {
            const t = Utils.isSpark ? this._stage.platform.getFontSetting(this) : this._getFontSetting();
            return this._context.font = t, this._context.textBaseline = this._settings.textBaseline, t;
        }
        _getFontSetting() {
            let t = this._settings.fontFace;
            Array.isArray(t) || (t = [
                t
            ]);
            let e = [];
            for(let i = 0, s = t.length; i < s; i++)"serif" === t[i] || "sans-serif" === t[i] ? e.push(t[i]) : e.push(`"${t[i]}"`);
            return `${this._settings.fontStyle} ${this._settings.fontSize * this.getPrecision()}px ${e.join(",")}`;
        }
        _load() {
            if (Utils.isWeb && document.fonts) {
                const t = this._getFontSetting();
                try {
                    if (!document.fonts.check(t, this._settings.text)) return document.fonts.load(t, this._settings.text).catch((e)=>{
                        console.warn("Font load error", e, t);
                    }).then(()=>{
                        document.fonts.check(t, this._settings.text) || console.warn("Font not found", t);
                    });
                } catch (e) {
                    console.warn("Can't check font loading for " + t);
                }
            }
        }
        draw() {
            const t = this._load();
            return t ? t.then(()=>Utils.isSpark ? this._stage.platform.drawText(this) : this._draw()) : Utils.isSpark ? this._stage.platform.drawText(this) : this._draw();
        }
        _calculateRenderInfo() {
            let t = {};
            const e = this.getPrecision(), i = this._settings.paddingLeft * e, s = this._settings.paddingRight * e, r = this._settings.fontSize * e, n = this._settings.lineHeight * e || r, o = 0 != this._settings.w ? this._settings.w * e : 2048 / e, a = this._settings.wordWrapWidth * e, h = this._settings.cutSx * e, l = this._settings.cutEx * e, _ = this._settings.cutSy * e, u = this._settings.cutEy * e, c = this._settings.letterSpacing || 0;
            t.baseFont = this.setFontProperties(), t.w = o, t.width = o, t.text = this._settings.text, t.precision = e, t.fontSize = r, t.fontBaselineRatio = this._settings.fontBaselineRatio, t.lineHeight = n, t.letterSpacing = c, t.textAlign = this._settings.textAlign, t.textColor = this._settings.textColor, t.verticalAlign = this._settings.verticalAlign, t.highlight = this._settings.highlight, t.highlightColor = this._settings.highlightColor, t.highlightHeight = this._settings.highlightHeight, t.highlightPaddingLeft = this._settings.highlightPaddingLeft, t.highlightPaddingRight = this._settings.highlightPaddingRight, t.highlightOffset = this._settings.highlightOffset, t.paddingLeft = this._settings.paddingLeft, t.paddingRight = this._settings.paddingRight, t.maxLines = this._settings.maxLines, t.maxLinesSuffix = this._settings.maxLinesSuffix, t.textOverflow = this._settings.textOverflow, t.wordWrap = this._settings.wordWrap, t.wordWrapWidth = a, t.shadow = this._settings.shadow, t.shadowColor = this._settings.shadowColor, t.shadowOffsetX = this._settings.shadowOffsetX, t.shadowOffsetY = this._settings.shadowOffsetY, t.shadowBlur = this._settings.shadowBlur, t.cutSx = h, t.cutEx = l, t.cutSy = _, t.cutEy = u, t.textIndent = this._settings.textIndent * e, t.wordBreak = this._settings.wordBreak;
            let d = t.text, g = t.wordWrap && t.wordWrapWidth || t.width;
            if (t.textOverflow && !t.wordWrap) {
                let e1;
                switch(this._settings.textOverflow){
                    case "clip":
                        e1 = "";
                        break;
                    case "ellipsis":
                        e1 = this._settings.maxLinesSuffix;
                        break;
                    default:
                        e1 = this._settings.textOverflow;
                }
                d = this.wrapWord(d, a || t.w, e1);
            }
            d = this.tokenize(d), d = this.parse(d), d = this.measure(d, c, t.baseFont), t.textIndent && (d = this.indent(d, t.textIndent)), t.wordBreak && (d = d.reduce((e, i)=>e.concat(this.wordBreak(i, g, t.baseFont)), []), this.resetFontStyle());
            let p = i, f = 0;
            for (const e2 of d)(t.wordWrap && p + e2.width > g || "\n" == e2.text) && (p = i, f += 1), e2.lineNo = f, "\n" != e2.text && (e2.x = p, p += e2.width);
            t.lineNum = f + 1, this._settings.h ? t.h = this._settings.h : t.maxLines && t.maxLines < t.lineNum ? t.h = t.maxLines * t.lineHeight + r / 2 : t.lineHeight > r ? t.h = t.lineNum * t.lineHeight : t.h = t.lineNum * t.lineHeight + r / 2;
            const x = t.fontBaselineRatio * t.fontSize;
            let m = 0;
            "top" == t.verticalAlign && "alphabetic" == this._context.textBaseline ? m = -x : "middle" == t.verticalAlign ? m = (t.lineHeight - t.fontSize - x) / 2 : "bottom" == this._settings.verticalAlign && (m = t.lineHeight - t.fontSize), t.lines = [];
            for(let e3 = 0; e3 < t.lineNum; e3++)t.lines[e3] = {
                width: 0,
                x: 0,
                y: t.lineHeight * e3 + m,
                text: []
            };
            for (let e4 of d)t.lines[e4.lineNo].text.push(e4);
            for (const e5 of t.lines){
                if (0 == e5.text.length) continue;
                const t1 = e5.text[0].text, i1 = e5.text[e5.text.length - 1].text;
                "\n" == t1 && e5.text.shift(), " " != i1 && "\n" != i1 || e5.text.pop();
            }
            for (let e6 of t.lines)e6.width = e6.text.reduce((t, e)=>t + e.width, 0);
            if (t.width = 0 != this._settings.w ? this._settings.w * e : Math.max(...t.lines.map((t)=>t.width)) + s, t.w = t.width, t.maxLines && t.lineNum > t.maxLines && t.maxLinesSuffix) {
                const e7 = t.maxLines - 1;
                let i2 = d.filter((t)=>t.lineNo == e7), s1 = t.maxLinesSuffix;
                s1 = this.tokenize(s1), s1 = this.parse(s1), s1 = this.measure(s1, t.letterSpacing, t.baseFont)[0], s1.lineNo = e7, i2.length ? s1.x = i2[i2.length - 1].x + i2[i2.length - 1].width : s1.x = 0, i2.push(s1);
                let r1 = i2.reduce((t, e)=>t + e.width, 0);
                for(; r1 > t.width || " " == i2[i2.length - 2].text;){
                    i2.splice(i2.length - 2, 1), r1 = i2.reduce((t, e)=>t + e.width, 0);
                    const t2 = i2[i2.length - 2] || {
                        x: 0,
                        width: 0
                    };
                    if (s1.x = t2.x + t2.width, i2.length < 2) break;
                }
                t.lines[e7].text = i2, t.lines[e7].width = r1;
            }
            if ("center" == t.textAlign) for (let e8 of t.lines)e8.x = (t.width - e8.width - i) / 2;
            else if ("right" == t.textAlign) for (let e9 of t.lines)e9.x = t.width - e9.width - i;
            return t;
        }
        _draw() {
            const t = this._calculateRenderInfo(), e = this.getPrecision(), i = t.paddingLeft * e;
            let s = t.w || t.width;
            (t.cutSx || t.cutEx) && (s = Math.min(t.w, t.cutEx - t.cutSx));
            let r = t.h;
            if ((t.cutSy || t.cutEy) && (r = Math.min(t.h, t.cutEy - t.cutSy)), this._canvas.width = Math.ceil(s + this._stage.getOption("textRenderIssueMargin")), this._canvas.height = Math.ceil(r), this.setFontProperties(), t.fontSize >= 128 && (this._context.globalAlpha = .01, this._context.fillRect(0, 0, .01, .01), this._context.globalAlpha = 1), (t.cutSx || t.cutSy) && this._context.translate(-t.cutSx, -t.cutSy), t.highlight) {
                const s1 = t.highlightColor || 0, r1 = t.highlightHeight ? t.highlightHeight * e : 1.5 * t.fontSize, n = t.highlightOffset ? t.highlightOffset * e : 0, o = null !== t.highlightPaddingLeft ? t.highlightPaddingLeft * e : t.paddingLeft, a = null !== t.highlightPaddingRight ? t.highlightPaddingRight * e : t.paddingRight;
                this._context.fillStyle = StageUtils.getRgbaString(s1);
                const h = t.maxLines ? Math.min(t.maxLines, t.lineNum) : t.lineNum;
                for(let e1 = 0; e1 < h; e1++){
                    const s2 = t.lines[e1];
                    this._context.fillRect(s2.x - o + i, s2.y + n, s2.width + o + a, r1);
                }
            }
            let n1 = null;
            this._settings.shadow && (n1 = [
                this._context.shadowColor,
                this._context.shadowOffsetX,
                this._context.shadowOffsetY,
                this._context.shadowBlur
            ], this._context.shadowColor = StageUtils.getRgbaString(this._settings.shadowColor), this._context.shadowOffsetX = this._settings.shadowOffsetX * e, this._context.shadowOffsetY = this._settings.shadowOffsetY * e, this._context.shadowBlur = this._settings.shadowBlur * e);
            const o1 = StageUtils.getRgbaString(this._settings.textColor);
            let a1 = o1;
            this._context.fillStyle = o1;
            for (const e2 of t.lines)for (const i1 of e2.text){
                let e3 = 0;
                if ("\n" != i1.text && !(t.maxLines && i1.lineNo >= t.maxLines)) {
                    if (i1.color != a1 && (a1 = i1.color, this._context.fillStyle = a1), this._context.font = i1.fontStyle, i1.letters) for (let s3 of i1.letters){
                        const r2 = t.lines[i1.lineNo].x + i1.x + e3;
                        this._context.fillText(s3.text, r2, t.lines[i1.lineNo].y + t.fontSize), e3 += s3.width;
                    }
                    else {
                        const e4 = t.lines[i1.lineNo].x + i1.x;
                        this._context.fillText(i1.text, e4, t.lines[i1.lineNo].y + t.fontSize);
                    }
                }
            }
            n1 && (this._context.shadowColor = n1[0], this._context.shadowOffsetX = n1[1], this._context.shadowOffsetY = n1[2], this._context.shadowBlur = n1[3]), (t.cutSx || t.cutSy) && this._context.translate(t.cutSx, t.cutSy), t.lines = t.lines.map((t)=>t.text.reduce((t, e)=>t + e.text, "")), t.maxLines && (t.lines = t.lines.slice(0, t.maxLines)), this.renderInfo = t;
        }
        measureText(t, e = 0) {
            return e ? t.split("").reduce((t, i)=>t + this._context.measureText(i).width + e, 0) : this._context.measureText(t).width;
        }
        tokenize(t) {
            const e = / |\n|<i>|<\/i>|<b>|<\/b>|<color=0[xX][0-9a-fA-F]{8}>|<\/color>/g, i = t.match(e) || [], s = t.split(e) || [];
            let r = [];
            for(let t1 = 0; t1 < s.length; t1++)r.push(s[t1], i[t1]);
            return r.pop(), r.filter((t)=>"" != t);
        }
        parse(t) {
            let e = 0, i = 0, s = [
                StageUtils.getRgbaString(this._settings.textColor)
            ], r = 0;
            const n = /<color=(0[xX][0-9a-fA-F]{8})>/;
            return t.map((t)=>{
                if ("<i>" == t) e += 1, t = "";
                else if ("</i>" == t && e > 0) e -= 1, t = "";
                else if ("<b>" == t) i += 1, t = "";
                else if ("</b>" == t && i > 0) i -= 1, t = "";
                else if ("</color>" == t) s.length > 1 && (r -= 1, s.pop()), t = "";
                else if (n.test(t)) {
                    const e1 = n.exec(t);
                    s.push(StageUtils.getRgbaString(parseInt(e1[1]))), r += 1, t = "";
                }
                return {
                    text: t,
                    italic: e,
                    bold: i,
                    color: s[r]
                };
            }).filter((t)=>"" != t.text);
        }
        applyFontStyle(t, e) {
            let i = e;
            t.bold && (i = "bold " + i), t.italic && (i = "italic " + i), this._context.font = i, t.fontStyle = i;
        }
        resetFontStyle(t) {
            this._context.font = t;
        }
        measure(t, e = 0, i) {
            for (const s of t)if (this.applyFontStyle(s, i), s.width = this.measureText(s.text, e), e > 0) {
                s.letters = s.text.split("").map((t)=>({
                        text: t
                    }));
                for (let t1 of s.letters)t1.width = this.measureText(t1.text, e);
            }
            return this.resetFontStyle(i), t;
        }
        indent(t, e) {
            return t.splice(0, 0, {
                text: "",
                width: e
            }), t;
        }
        wrapWord(t, e, i) {
            const s = this._context.measureText(i).width, r = t.length, n = this._context.measureText(t).width;
            if (n <= e) return t;
            let o = Math.floor(e * r / n), a = this._context.measureText(t.substring(0, o)).width + s;
            if (a > e) for(; o > 0 && (a = this._context.measureText(t.substring(0, o)).width + s, a > e);)o -= 1;
            else for(; o < r;){
                if (a = this._context.measureText(t.substring(0, o)).width + s, !(a < e)) {
                    o -= 1;
                    break;
                }
                o += 1;
            }
            return t.substring(0, o) + (e >= s ? i : "");
        }
        _getBreakIndex(t, e) {
            const i = t.length, s = this.measureText(t);
            if (s <= e) return {
                breakIndex: t.length,
                truncWordWidth: s
            };
            let r = Math.floor(e * i / s), n = this.measureText(t.substring(0, r));
            if (n > e) for(; r > 0 && (n = this.measureText(t.substring(0, r)), n > e);)r -= 1;
            else for(; r < i;){
                if (n = this.measureText(t.substring(0, r)), !(n < e)) {
                    r -= 1, n = this.measureText(t.substring(0, r));
                    break;
                }
                r += 1;
            }
            return {
                breakIndex: r,
                truncWordWidth: n
            };
        }
        wordBreak(t, e, i) {
            if (!t.text) return t;
            this.applyFontStyle(t, i);
            const s = [];
            let r = t.text;
            if (t.letters) {
                let i1 = 0, n = [], o = 0;
                for (const a of t.letters)i1 + a.width >= e ? (s.push({
                    ...t
                }), s[s.length - 1].text = r.slice(0, o), s[s.length - 1].width = i1, s[s.length - 1].letters = n, r = r.slice(o), i1 = 0, n = [], o = 0) : (o += 1, n.push(a), i1 += a.width);
                i1 > 0 && (s.push({
                    ...t
                }), s[s.length - 1].text = r.slice(0, o), s[s.length - 1].width = i1, s[s.length - 1].letters = n);
            } else for(;;){
                const { breakIndex: i2 , truncWordWidth: n1  } = this._getBreakIndex(r, e);
                if (s.push({
                    ...t
                }), s[s.length - 1].text = r.slice(0, i2), s[s.length - 1].width = n1, i2 === r.length) break;
                r = r.slice(i2);
            }
            return s;
        }
    }
    class TextTexture extends Texture {
        constructor(t){
            super(t), this._precision = this.stage.getOption("precision");
        }
        static renderer(t, e, i) {
            return this.advancedRenderer ? new TextTextureRendererAdvanced(t, e, i) : new TextTextureRenderer(t, e, i);
        }
        get text() {
            return this._text;
        }
        set text(t) {
            this._text !== t && (this._text = "" + t, this._changed());
        }
        get w() {
            return this._w;
        }
        set w(t) {
            this._w !== t && (this._w = t, this._changed());
        }
        get h() {
            return this._h;
        }
        set h(t) {
            this._h !== t && (this._h = t, this._changed());
        }
        get fontStyle() {
            return this._fontStyle;
        }
        set fontStyle(t) {
            this._fontStyle !== t && (this._fontStyle = t, this._changed());
        }
        get fontBaselineRatio() {
            return this._fontBaselineRatio;
        }
        set fontBaselineRatio(t) {
            this._fontBaselineRatio !== t && (this._fontBaselineRatio = t, this._changed());
        }
        get fontSize() {
            return this._fontSize;
        }
        set fontSize(t) {
            this._fontSize !== t && (this._fontSize = t, this._changed());
        }
        get fontFace() {
            return this._fontFace;
        }
        set fontFace(t) {
            this._fontFace !== t && (this._fontFace = t, this._changed());
        }
        get wordWrap() {
            return this._wordWrap;
        }
        set wordWrap(t) {
            this._wordWrap !== t && (this._wordWrap = t, this._changed());
        }
        get wordWrapWidth() {
            return this._wordWrapWidth;
        }
        set wordWrapWidth(t) {
            this._wordWrapWidth !== t && (this._wordWrapWidth = t, this._changed());
        }
        get wordBreak() {
            return this._wordBreak;
        }
        set wordBreak(t) {
            this._wordBreak !== t && (this._wordBreak = t, this._changed());
        }
        get textOverflow() {
            return this._textOverflow;
        }
        set textOverflow(t) {
            t != this._textOverflow && (this._textOverflow = t, this._changed());
        }
        get lineHeight() {
            return this._lineHeight;
        }
        set lineHeight(t) {
            this._lineHeight !== t && (this._lineHeight = t, this._changed());
        }
        get textBaseline() {
            return this._textBaseline;
        }
        set textBaseline(t) {
            this._textBaseline !== t && (this._textBaseline = t, this._changed());
        }
        get textAlign() {
            return this._textAlign;
        }
        set textAlign(t) {
            this._textAlign !== t && (this._textAlign = t, this._changed());
        }
        get verticalAlign() {
            return this._verticalAlign;
        }
        set verticalAlign(t) {
            this._verticalAlign !== t && (this._verticalAlign = t, this._changed());
        }
        get offsetY() {
            return this._offsetY;
        }
        set offsetY(t) {
            this._offsetY !== t && (this._offsetY = t, this._changed());
        }
        get maxLines() {
            return this._maxLines;
        }
        set maxLines(t) {
            this._maxLines !== t && (this._maxLines = t, this._changed());
        }
        get maxLinesSuffix() {
            return this._maxLinesSuffix;
        }
        set maxLinesSuffix(t) {
            this._maxLinesSuffix !== t && (this._maxLinesSuffix = t, this._changed());
        }
        get textColor() {
            return this._textColor;
        }
        set textColor(t) {
            this._textColor !== t && (this._textColor = t, this._changed());
        }
        get paddingLeft() {
            return this._paddingLeft;
        }
        set paddingLeft(t) {
            this._paddingLeft !== t && (this._paddingLeft = t, this._changed());
        }
        get paddingRight() {
            return this._paddingRight;
        }
        set paddingRight(t) {
            this._paddingRight !== t && (this._paddingRight = t, this._changed());
        }
        get shadow() {
            return this._shadow;
        }
        set shadow(t) {
            this._shadow !== t && (this._shadow = t, this._changed());
        }
        get shadowColor() {
            return this._shadowColor;
        }
        set shadowColor(t) {
            this._shadowColor !== t && (this._shadowColor = t, this._changed());
        }
        get shadowOffsetX() {
            return this._shadowOffsetX;
        }
        set shadowOffsetX(t) {
            this._shadowOffsetX !== t && (this._shadowOffsetX = t, this._changed());
        }
        get shadowOffsetY() {
            return this._shadowOffsetY;
        }
        set shadowOffsetY(t) {
            this._shadowOffsetY !== t && (this._shadowOffsetY = t, this._changed());
        }
        get shadowBlur() {
            return this._shadowBlur;
        }
        set shadowBlur(t) {
            this._shadowBlur !== t && (this._shadowBlur = t, this._changed());
        }
        get highlight() {
            return this._highlight;
        }
        set highlight(t) {
            this._highlight !== t && (this._highlight = t, this._changed());
        }
        get highlightHeight() {
            return this._highlightHeight;
        }
        set highlightHeight(t) {
            this._highlightHeight !== t && (this._highlightHeight = t, this._changed());
        }
        get highlightColor() {
            return this._highlightColor;
        }
        set highlightColor(t) {
            this._highlightColor !== t && (this._highlightColor = t, this._changed());
        }
        get highlightOffset() {
            return this._highlightOffset;
        }
        set highlightOffset(t) {
            this._highlightOffset !== t && (this._highlightOffset = t, this._changed());
        }
        get highlightPaddingLeft() {
            return this._highlightPaddingLeft;
        }
        set highlightPaddingLeft(t) {
            this._highlightPaddingLeft !== t && (this._highlightPaddingLeft = t, this._changed());
        }
        get highlightPaddingRight() {
            return this._highlightPaddingRight;
        }
        set highlightPaddingRight(t) {
            this._highlightPaddingRight !== t && (this._highlightPaddingRight = t, this._changed());
        }
        get cutSx() {
            return this._cutSx;
        }
        set cutSx(t) {
            this._cutSx !== t && (this._cutSx = t, this._changed());
        }
        get cutEx() {
            return this._cutEx;
        }
        set cutEx(t) {
            this._cutEx !== t && (this._cutEx = t, this._changed());
        }
        get cutSy() {
            return this._cutSy;
        }
        set cutSy(t) {
            this._cutSy !== t && (this._cutSy = t, this._changed());
        }
        get cutEy() {
            return this._cutEy;
        }
        set cutEy(t) {
            this._cutEy !== t && (this._cutEy = t, this._changed());
        }
        get advancedRenderer() {
            return this._advancedRenderer;
        }
        set advancedRenderer(t) {
            this._advancedRenderer !== t && (this._advancedRenderer = t, this._changed());
        }
        set letterSpacing(t) {
            this._letterSpacing !== t && (this._letterSpacing = t, this._changed());
        }
        get letterSpacing() {
            return this._letterSpacing;
        }
        set textIndent(t) {
            this._textIndent !== t && (this._textIndent = t, this._changed());
        }
        get textIndent() {
            return this._textIndent;
        }
        get precision() {
            return super.precision;
        }
        set precision(t) {
            this.precision !== t && (super.precision = t, this._changed());
        }
        _getIsValid() {
            return !!this.text;
        }
        _getLookupId() {
            let t = [];
            return 0 !== this.w && t.push("w " + this.w), 0 !== this.h && t.push("h " + this.h), "normal" !== this.fontStyle && t.push("fS" + this.fontStyle), 40 !== this.fontSize && t.push("fs" + this.fontSize), 0 !== this.fontBaselineRatio && t.push("fb" + this.fontBaselineRatio), null !== this.fontFace && t.push("ff" + (Array.isArray(this.fontFace) ? this.fontFace.join(",") : this.fontFace)), !0 !== this.wordWrap && t.push("wr" + (this.wordWrap ? 1 : 0)), 0 !== this.wordWrapWidth && t.push("ww" + this.wordWrapWidth), !1 !== this.wordBreak && t.push((this.wordBreak, 1)), "" != this.textOverflow && t.push("to" + this.textOverflow), null !== this.lineHeight && t.push("lh" + this.lineHeight), "alphabetic" !== this.textBaseline && t.push("tb" + this.textBaseline), "left" !== this.textAlign && t.push("ta" + this.textAlign), "top" !== this.verticalAlign && t.push("va" + this.verticalAlign), null !== this.offsetY && t.push("oy" + this.offsetY), 0 !== this.maxLines && t.push("ml" + this.maxLines), ".." !== this.maxLinesSuffix && t.push("ms" + this.maxLinesSuffix), t.push("pc" + this.precision), 4294967295 !== this.textColor && t.push("co" + this.textColor.toString(16)), 0 !== this.paddingLeft && t.push("pl" + this.paddingLeft), 0 !== this.paddingRight && t.push("pr" + this.paddingRight), !1 !== this.shadow && t.push("sh" + (this.shadow ? 1 : 0)), 4278190080 !== this.shadowColor && t.push("sc" + this.shadowColor.toString(16)), 0 !== this.shadowOffsetX && t.push("sx" + this.shadowOffsetX), 0 !== this.shadowOffsetY && t.push("sy" + this.shadowOffsetY), 5 !== this.shadowBlur && t.push("sb" + this.shadowBlur), !1 !== this.highlight && t.push("hL" + (this.highlight ? 1 : 0)), 0 !== this.highlightHeight && t.push("hh" + this.highlightHeight), 4278190080 !== this.highlightColor && t.push("hc" + this.highlightColor.toString(16)), null !== this.highlightOffset && t.push("ho" + this.highlightOffset), null !== this.highlightPaddingLeft && t.push("hl" + this.highlightPaddingLeft), null !== this.highlightPaddingRight && t.push("hr" + this.highlightPaddingRight), null !== this.letterSpacing && t.push("ls" + this.letterSpacing), null !== this.textIndent && t.push("ti" + this.textIndent), this.cutSx && t.push("csx" + this.cutSx), this.cutEx && t.push("cex" + this.cutEx), this.cutSy && t.push("csy" + this.cutSy), this.cutEy && t.push("cey" + this.cutEy), this.advancedRenderer && t.push((this.advancedRenderer, 1)), "TX$" + t.join("|") + ":" + this.text;
        }
        _getSourceLoader() {
            const t = this.cloneArgs();
            null === t.fontFace && (t.fontFace = this.stage.getOption("defaultFontFace"));
            const e = this.stage.gl;
            return function(i) {
                const s = this.stage.platform.getDrawingCanvas(), r = t.advancedRenderer ? new TextTextureRendererAdvanced(this.stage, s, t) : new TextTextureRenderer(this.stage, s, t), n = r.draw(), o = {}, a = this.stage.getOption("fontSharp");
                let h = !1;
                if (Utils.isBoolean(a)) h = a;
                else if (Utils.isObject(a)) h = this.stage.getRenderPrecision() <= a.precision && t.fontSize <= a.fontSize;
                e && h && (o[e.TEXTURE_MAG_FILTER] = e.NEAREST), n ? n.then(()=>{
                    i(null, Object.assign({
                        renderInfo: r.renderInfo,
                        throttle: !1,
                        texParams: o
                    }, this.stage.platform.getTextureOptionsForDrawingCanvas(s)));
                }).catch((t)=>{
                    i(t);
                }) : i(null, Object.assign({
                    renderInfo: r.renderInfo,
                    throttle: !1,
                    texParams: o
                }, this.stage.platform.getTextureOptionsForDrawingCanvas(s)));
            };
        }
        getNonDefaults() {
            const t = super.getNonDefaults();
            return "" !== this.text && (t.text = this.text), 0 !== this.w && (t.w = this.w), 0 !== this.h && (t.h = this.h), "normal" !== this.fontStyle && (t.fontStyle = this.fontStyle), 40 !== this.fontSize && (t.fontSize = this.fontSize), 0 !== this.fontBaselineRatio && (t.fontBaselineRatio = this.fontBaselineRatio), null !== this.fontFace && (t.fontFace = this.fontFace), !0 !== this.wordWrap && (t.wordWrap = this.wordWrap), 0 !== this.wordWrapWidth && (t.wordWrapWidth = this.wordWrapWidth), !1 !== this.wordBreak && (t.wordBreak = this.wordBreak), "" != this.textOverflow && (t.textOverflow = this.textOverflow), null !== this.lineHeight && (t.lineHeight = this.lineHeight), "alphabetic" !== this.textBaseline && (t.textBaseline = this.textBaseline), "left" !== this.textAlign && (t.textAlign = this.textAlign), "top" !== this.verticalAlign && (t.verticalAlign = this.verticalAlign), null !== this.offsetY && (t.offsetY = this.offsetY), 0 !== this.maxLines && (t.maxLines = this.maxLines), ".." !== this.maxLinesSuffix && (t.maxLinesSuffix = this.maxLinesSuffix), this.precision !== this.stage.getOption("precision") && (t.precision = this.precision), 4294967295 !== this.textColor && (t.textColor = this.textColor), 0 !== this.paddingLeft && (t.paddingLeft = this.paddingLeft), 0 !== this.paddingRight && (t.paddingRight = this.paddingRight), !1 !== this.shadow && (t.shadow = this.shadow), 4278190080 !== this.shadowColor && (t.shadowColor = this.shadowColor), 0 !== this.shadowOffsetX && (t.shadowOffsetX = this.shadowOffsetX), 0 !== this.shadowOffsetY && (t.shadowOffsetY = this.shadowOffsetY), 5 !== this.shadowBlur && (t.shadowBlur = this.shadowBlur), !1 !== this.highlight && (t.highlight = this.highlight), 0 !== this.highlightHeight && (t.highlightHeight = this.highlightHeight), 4278190080 !== this.highlightColor && (t.highlightColor = this.highlightColor), 0 !== this.highlightOffset && (t.highlightOffset = this.highlightOffset), 0 !== this.highlightPaddingLeft && (t.highlightPaddingLeft = this.highlightPaddingLeft), 0 !== this.highlightPaddingRight && (t.highlightPaddingRight = this.highlightPaddingRight), 0 !== this.letterSpacing && (t.letterSpacing = this.letterSpacing), 0 !== this.textIndent && (t.textIndent = this.textIndent), this.cutSx && (t.cutSx = this.cutSx), this.cutEx && (t.cutEx = this.cutEx), this.cutSy && (t.cutSy = this.cutSy), this.cutEy && (t.cutEy = this.cutEy), this.advancedRenderer && (t.renderer = this.advancedRenderer), t;
        }
        cloneArgs() {
            let t = {};
            return t.text = this._text, t.w = this._w, t.h = this._h, t.fontStyle = this._fontStyle, t.fontSize = this._fontSize, t.fontBaselineRatio = this._fontBaselineRatio, t.fontFace = this._fontFace, t.wordWrap = this._wordWrap, t.wordWrapWidth = this._wordWrapWidth, t.wordBreak = this._wordBreak, t.textOverflow = this._textOverflow, t.lineHeight = this._lineHeight, t.textBaseline = this._textBaseline, t.textAlign = this._textAlign, t.verticalAlign = this._verticalAlign, t.offsetY = this._offsetY, t.maxLines = this._maxLines, t.maxLinesSuffix = this._maxLinesSuffix, t.precision = this._precision, t.textColor = this._textColor, t.paddingLeft = this._paddingLeft, t.paddingRight = this._paddingRight, t.shadow = this._shadow, t.shadowColor = this._shadowColor, t.shadowOffsetX = this._shadowOffsetX, t.shadowOffsetY = this._shadowOffsetY, t.shadowBlur = this._shadowBlur, t.highlight = this._highlight, t.highlightHeight = this._highlightHeight, t.highlightColor = this._highlightColor, t.highlightOffset = this._highlightOffset, t.highlightPaddingLeft = this._highlightPaddingLeft, t.highlightPaddingRight = this._highlightPaddingRight, t.letterSpacing = this._letterSpacing, t.textIndent = this._textIndent, t.cutSx = this._cutSx, t.cutEx = this._cutEx, t.cutSy = this._cutSy, t.cutEy = this._cutEy, t.advancedRenderer = this._advancedRenderer, t;
        }
    }
    let t = TextTexture.prototype;
    t._text = "", t._w = 0, t._h = 0, t._fontStyle = "normal", t._fontSize = 40, t._fontFace = null, t._wordWrap = !0, t._wordWrapWidth = 0, t._wordBreak = !1, t._textOverflow = "", t._lineHeight = null, t._textBaseline = "alphabetic", t._textAlign = "left", t._verticalAlign = "top", t._offsetY = null, t._maxLines = 0, t._maxLinesSuffix = "..", t._textColor = 4294967295, t._paddingLeft = 0, t._paddingRight = 0, t._shadow = !1, t._shadowColor = 4278190080, t._shadowOffsetX = 0, t._shadowOffsetY = 0, t._shadowBlur = 5, t._highlight = !1, t._highlightHeight = 0, t._highlightColor = 4278190080, t._highlightOffset = 0, t._highlightPaddingLeft = 0, t._highlightPaddingRight = 0, t._letterSpacing = 0, t._textIndent = 0, t._cutSx = 0, t._cutEx = 0, t._cutSy = 0, t._cutEy = 0, t._advancedRenderer = !1, t._fontBaselineRatio = 0;
    class SourceTexture extends Texture {
        constructor(t){
            super(t), this._textureSource = void 0;
        }
        get textureSource() {
            return this._textureSource;
        }
        set textureSource(t) {
            t !== this._textureSource && (t.isResultTexture && (this._precision = this.stage.getRenderPrecision()), this._textureSource = t, this._changed());
        }
        _getTextureSource() {
            return this._textureSource;
        }
    }
    class Transition extends EventEmitter {
        constructor(t, e, i, s){
            super(), this.manager = t, this._settings = e, this._element = i, this._getter = i.constructor.getGetter(s), this._setter = i.constructor.getSetter(s), this._merger = e.merger, this._merger || (this._merger = i.constructor.getMerger(s)), this._startValue = this._getter(this._element), this._targetValue = this._startValue, this._p = 1, this._delayLeft = 0;
        }
        start(t) {
            this._startValue = this._getter(this._element), this.isAttached() ? t === this._startValue ? this.reset(t, 1) : (this._targetValue = t, this._p = 0, this._delayLeft = this._settings.delay, this.emit("start"), this.add()) : (this._targetValue = t, this._p = 1, this._updateDrawValue());
        }
        finish() {
            this._p < 1 && (this._p = 1);
        }
        stop() {
            this.emit("stop"), this.manager.removeActive(this);
        }
        pause() {
            this.stop();
        }
        play() {
            this.manager.addActive(this);
        }
        reset(t, e) {
            this.isAttached() ? (this._startValue = this._getter(this._element), this._targetValue = t, this._p = e, this.add()) : (this._startValue = this._getter(this._element), this._targetValue = t, this._p = 1, this._updateDrawValue());
        }
        _updateDrawValue() {
            this._setter(this._element, this.getDrawValue());
        }
        add() {
            this.manager.addActive(this);
        }
        isAttached() {
            return this._element.attached;
        }
        isRunning() {
            return this._p < 1;
        }
        progress(t) {
            if (this.isAttached() || (this._p = 1), this.p < 1) {
                if (this.delayLeft > 0) {
                    if (this._delayLeft -= t, !(this.delayLeft < 0)) return;
                    t = -this.delayLeft, this._delayLeft = 0, this.emit("delayEnd");
                }
                0 == this._settings.duration ? this._p = 1 : this._p += t / this._settings.duration, this._p >= 1 && (this._p = 1);
            }
            this._updateDrawValue(), this.invokeListeners();
        }
        invokeListeners() {
            this.emit("progress", this.p), 1 === this.p && this.emit("finish");
        }
        updateTargetValue(t) {
            let e = this._settings.timingFunctionImpl(this.p);
            1 === e ? this._targetValue = t : 0 === e ? (this._startValue = this._targetValue, this._targetValue = t) : (this._startValue = t - (t - this._targetValue) / (1 - e), this._targetValue = t);
        }
        getDrawValue() {
            if (this.p >= 1) return this.targetValue;
            {
                let t = this._settings._timingFunctionImpl(this.p);
                return this._merger(this.targetValue, this.startValue, t);
            }
        }
        skipDelay() {
            this._delayLeft = 0;
        }
        get startValue() {
            return this._startValue;
        }
        get targetValue() {
            return this._targetValue;
        }
        get p() {
            return this._p;
        }
        get delayLeft() {
            return this._delayLeft;
        }
        get element() {
            return this._element;
        }
        get settings() {
            return this._settings;
        }
        set settings(t) {
            this._settings = t;
        }
    }
    Transition.prototype.isTransition = !0;
    class ObjectList {
        constructor(){
            this._items = [], this._refs = {};
        }
        get() {
            return this._items;
        }
        get first() {
            return this._items[0];
        }
        get last() {
            return this._items.length ? this._items[this._items.length - 1] : void 0;
        }
        add(t) {
            this.addAt(t, this._items.length);
        }
        addAt(t, e) {
            if (!(e >= 0 && e <= this._items.length)) throw new Error("addAt: The index " + e + " is out of bounds " + this._items.length);
            {
                let i = this._items.indexOf(t);
                if (i === e) return t;
                if (Utils.isObjectLiteral(t)) {
                    const e1 = t;
                    (t = this.createItem(e1)).patch(e1);
                }
                -1 != i ? this.setAt(t, e) : (t.ref && (this._refs[t.ref] = t), this._items.splice(e, 0, t), this.onAdd(t, e));
            }
        }
        replaceByRef(t) {
            if (!t.ref) throw new Error("replaceByRef: no ref specified in item");
            {
                const e = this.getByRef(t.ref);
                if (!e) throw new Error("replaceByRef: no item found with reference: " + t.ref);
                this.replace(t, e);
            }
            this.addAt(t, this._items.length);
        }
        replace(t, e) {
            const i = this.getIndex(e);
            if (-1 === i) throw new Error("replace: The previous item does not exist");
            this.setAt(t, i);
        }
        setAt(t, e) {
            if (!(e >= 0 && e < this._items.length)) throw new Error("setAt: The index " + e + " is out of bounds " + this._items.length);
            {
                if (Utils.isObjectLiteral(t)) {
                    const e1 = t;
                    (t = this.createItem(e1)).patch(e1);
                }
                let i = this._items.indexOf(t);
                if (-1 != i) {
                    if (i !== e) {
                        const s = i;
                        s !== e && (this._items.splice(s, 1), this._items.splice(e, 0, t), this.onMove(t, s, e));
                    }
                } else {
                    e < this._items.length && this._items[e].ref && (this._refs[this._items[e].ref] = void 0);
                    const i1 = this._items[e];
                    this._items[e] = t, t.ref && (this._refs[t.ref] = t), this.onSet(t, e, i1);
                }
            }
        }
        getAt(t) {
            return this._items[t];
        }
        getIndex(t) {
            return this._items.indexOf(t);
        }
        remove(t) {
            let e = this._items.indexOf(t);
            -1 !== e && this.removeAt(e);
        }
        removeAt(t) {
            if (t >= 0 && t < this._items.length) {
                const e = this._items[t];
                return e.ref && (this._refs[e.ref] = void 0), this._items.splice(t, 1), this.onRemove(e, t), e;
            }
            throw new Error(`removeAt: The index ${t} is out of bounds ${this._items.length - 1}`);
        }
        clear() {
            if (this._items.length) {
                let t = this._items;
                this._items = [], this._refs = {}, this.onSync(t, [], []);
            }
        }
        a(t) {
            if (Utils.isObjectLiteral(t)) {
                let e = this.createItem(t);
                return e.patch(t), this.add(e), e;
            }
            if (Array.isArray(t)) {
                for(let e1 = 0, i = t.length; e1 < i; e1++)this.a(t[e1]);
                return null;
            }
            if (this.isItem(t)) return this.add(t), t;
        }
        get length() {
            return this._items.length;
        }
        _getRefs() {
            return this._refs;
        }
        getByRef(t) {
            return this._refs[t];
        }
        clearRef(t) {
            delete this._refs[t];
        }
        setRef(t, e) {
            this._refs[t] = e;
        }
        patch(t) {
            Utils.isObjectLiteral(t) ? this._setByObject(t) : Array.isArray(t) && this._setByArray(t);
        }
        _setByObject(t) {
            let e = this._getRefs(), i = Object.keys(t);
            for(let s = 0, r = i.length; s < r; s++){
                let r1 = i[s], n = t[r1], o = e[r1];
                if (o) {
                    if (this.isItem(n)) {
                        if (o !== n) {
                            let t1 = this.getIndex(o);
                            n.ref = r1, this.setAt(n, t1);
                        }
                    } else o.patch(n);
                } else this.isItem(n) ? (n.ref = r1, this.add(n)) : (o = this.createItem(n), o.ref = r1, o.patch(n), this.add(o));
            }
        }
        _equalsArray(t) {
            let e = !0;
            if (t.length === this._items.length) for(let i = 0, s = this._items.length; i < s && e; i++)e = e && this._items[i] === t[i];
            else e = !1;
            return e;
        }
        _setByArray(t) {
            if (this._equalsArray(t)) return;
            for(let t1 = 0, e = this._items.length; t1 < e; t1++)this._items[t1].marker = !0;
            let e1, i = [];
            for(let s = 0, r = t.length; s < r; s++){
                let r1 = t[s];
                if (this.isItem(r1)) r1.marker = !1, i.push(r1);
                else {
                    let t2, s1 = r1.ref;
                    s1 && (e1 || (e1 = this._getRefs()), t2 = e1[s1]), t2 ? t2.marker = !1 : t2 = this.createItem(r1), Utils.isObjectLiteral(r1) && t2.patch(r1), i.push(t2);
                }
            }
            this._setItems(i);
        }
        _setItems(t) {
            let e = this._items;
            this._items = t;
            let i = e.filter((t)=>{
                let e = t.marker;
                return delete t.marker, e;
            }), s = t.filter((t)=>-1 === e.indexOf(t));
            if (i.length || s.length) {
                this._refs = {};
                for(let t1 = 0, e1 = this._items.length; t1 < e1; t1++){
                    let e2 = this._items[t1].ref;
                    e2 && (this._refs[e2] = this._items[t1]);
                }
            }
            this.onSync(i, s, t);
        }
        sort(t) {
            const e = this._items.slice();
            e.sort(t), this._setByArray(e);
        }
        onAdd(t, e) {}
        onRemove(t, e) {}
        onSync(t, e, i) {}
        onSet(t, e, i) {}
        onMove(t, e, i) {}
        createItem(t) {
            throw new Error("ObjectList.createItem must create and return a new object");
        }
        isItem(t) {
            return !1;
        }
        forEach(t) {
            this.get().forEach(t);
        }
    }
    class ElementChildList extends ObjectList {
        constructor(t){
            super(), this._element = t;
        }
        _connectParent(t) {
            const e = t.parent;
            if (e && e !== this._element) {
                const i = t.parent.childList, s = i.getIndex(t);
                t.ref && (i._refs[t.ref] = void 0), i._items.splice(s, 1), e.core.removeChildAt(s);
            }
            t._setParent(this._element);
        }
        onAdd(t, e) {
            this._connectParent(t), this._element.core.addChildAt(e, t.core);
        }
        onRemove(t, e) {
            t._setParent(null), this._element.core.removeChildAt(e);
        }
        onSync(t, e, i) {
            for(let e1 = 0, i1 = t.length; e1 < i1; e1++)t[e1]._setParent(null);
            for(let t1 = 0, i2 = e.length; t1 < i2; t1++)this._connectParent(e[t1]);
            let gc = (t)=>t.core;
            this._element.core.syncChildren(t.map(gc), e.map(gc), i.map(gc));
        }
        onSet(t, e, i) {
            i._setParent(null), this._connectParent(t), this._element.core.setChildAt(e, t.core);
        }
        onMove(t, e, i) {
            this._element.core.moveChild(e, i);
        }
        createItem(t) {
            return t.type ? new t.type(this._element.stage) : this._element.stage.createElement();
        }
        isItem(t) {
            return t.isElement;
        }
    }
    class Element {
        constructor(t){
            this.stage = t, this.__id = Element.id++, this.__start(), this._hasEventListeners = !1, this.__core = new ElementCore(this), this.__ref = null, this.__attached = !1, this.__enabled = !1, this.__active = !1, this.__parent = null, this.__texture = null, this.__displayedTexture = null, this.__tags = null, this.__treeTags = null, this.__tagRoot = !1, this.__childList = null, this._w = 0, this._h = 0;
        }
        __start() {}
        get id() {
            return this.__id;
        }
        set ref(t) {
            if (this.__ref !== t) {
                const e = t.charCodeAt(0);
                Utils.isUcChar(e) || this._throwError("Ref must start with an upper case character: " + t), null !== this.__ref && (this.removeTag(this.__ref), this.__parent && this.__parent.__childList.clearRef(this.__ref)), this.__ref = t, this.__ref && (this._addTag(this.__ref), this.__parent && this.__parent.__childList.setRef(this.__ref, this));
            }
        }
        get ref() {
            return this.__ref;
        }
        get core() {
            return this.__core;
        }
        setAsRoot() {
            this.__core.setAsRoot(), this._updateAttachedFlag(), this._updateEnabledFlag();
        }
        get isRoot() {
            return this.__core.isRoot;
        }
        _setParent(t) {
            this.__parent !== t && (this.__parent && this._unsetTagsParent(), this.__parent = t, t && this._setTagsParent(), this._updateAttachedFlag(), this._updateEnabledFlag(), this._updateCollision(), this.isRoot && t && this._throwError("Root should not be added as a child! Results are unspecified!"));
        }
        getDepth() {
            let t = 0, e = this.__parent;
            for(; e;)t++, e = e.__parent;
            return t;
        }
        getAncestor(t) {
            let e = this;
            for(; t > 0 && e.__parent;)e = e.__parent, t--;
            return e;
        }
        getAncestors() {
            const t = [];
            let e = this;
            for(; e;)t.push(e), e = e.__parent;
            return t;
        }
        getAncestorAtDepth(t) {
            let e = this.getDepth() - t;
            return e < 0 ? null : this.getAncestor(e);
        }
        isAncestorOf(t) {
            let e = t;
            for(; e = e.parent;)if (this === e) return !0;
            return !1;
        }
        getSharedAncestor(t) {
            let e = this, i = t, s = e.getDepth(), r = i.getDepth();
            s > r ? e = e.getAncestor(s - r) : r > s && (i = i.getAncestor(r - s));
            do {
                if (e === i) return e;
                e = e.__parent, i = i.__parent;
            }while (e && i);
            return null;
        }
        get attached() {
            return this.__attached;
        }
        get enabled() {
            return this.__enabled;
        }
        get active() {
            return this.__active;
        }
        _isAttached() {
            return this.__parent ? this.__parent.__attached : this.stage.root === this;
        }
        _isEnabled() {
            return this.__core.visible && this.__core.alpha > 0 && (this.__parent ? this.__parent.__enabled : this.stage.root === this);
        }
        _isActive() {
            return this._isEnabled() && this.withinBoundsMargin;
        }
        _updateAttachedFlag() {
            let t = this._isAttached();
            if (this.__attached !== t) {
                this.__attached = t, t && this._onSetup();
                let e = this._children.get();
                if (e) {
                    let t1 = e.length;
                    if (t1 > 0) for(let i = 0; i < t1; i++)e[i]._updateAttachedFlag();
                }
                t ? this._onAttach() : this._onDetach();
            }
        }
        _updateEnabledFlag() {
            let t = this._isEnabled();
            if (this.__enabled !== t) {
                t ? (this._onEnabled(), this._setEnabledFlag()) : (this._onDisabled(), this._unsetEnabledFlag());
                let e = this._children.get();
                if (e) {
                    let t1 = e.length;
                    if (t1 > 0) for(let i = 0; i < t1; i++)e[i]._updateEnabledFlag();
                }
            }
        }
        _setEnabledFlag() {
            this.__enabled = !0, this._updateDimensions(), this._updateTextureCoords(), this.__texture && this.__texture.addElement(this), this.withinBoundsMargin && this._setActiveFlag(), this.__core.shader && this.__core.shader.addElement(this.__core);
        }
        _unsetEnabledFlag() {
            this.__active && this._unsetActiveFlag(), this.__texture && this.__texture.removeElement(this), this.__core.shader && this.__core.shader.removeElement(this.__core), this._texturizer && this.texturizer.filters.forEach((t)=>t.removeElement(this.__core)), this.__enabled = !1;
        }
        _setActiveFlag() {
            this.__active = !0, this.__texture && this.__texture.incActiveCount(), this.__texture && this._enableTexture(), this._onActive();
        }
        _unsetActiveFlag() {
            this.__texture && this.__texture.decActiveCount(), this.__active = !1, this.__texture && this._disableTexture(), this._hasTexturizer() && this.texturizer.deactivate(), this._onInactive();
        }
        _onSetup() {}
        _onAttach() {}
        _onDetach() {}
        _onEnabled() {}
        _onDisabled() {}
        _onActive() {}
        _onInactive() {}
        _onResize() {}
        _getRenderWidth() {
            return this._w ? this._w : this.__displayedTexture ? this.__displayedTexture.getRenderWidth() : this.__texture ? this.__texture.getRenderWidth() : 0;
        }
        _getRenderHeight() {
            return this._h ? this._h : this.__displayedTexture ? this.__displayedTexture.getRenderHeight() : this.__texture ? this.__texture.getRenderHeight() : 0;
        }
        get renderWidth() {
            return this.__enabled ? this.__core.getRenderWidth() : this._getRenderWidth();
        }
        get renderHeight() {
            return this.__enabled ? this.__core.getRenderHeight() : this._getRenderHeight();
        }
        get finalX() {
            return this.__core.x;
        }
        get finalY() {
            return this.__core.y;
        }
        get finalW() {
            return this.__core.w;
        }
        get finalH() {
            return this.__core.h;
        }
        textureIsLoaded() {
            return this.__texture && this.__texture.isLoaded();
        }
        loadTexture() {
            this.__texture && (this.__texture.load(), this.__texture.isUsed() && this._isEnabled() || this._updateDimensions());
        }
        _enableTextureError() {
            const t = this.__texture.loadError;
            t && this.emit("txError", t, this.__texture._source);
        }
        _enableTexture() {
            this.__texture.isLoaded() ? this._setDisplayedTexture(this.__texture) : (this._setDisplayedTexture(null), this._enableTextureError());
        }
        _disableTexture() {
            this._setDisplayedTexture(null);
        }
        get texture() {
            return this.__texture;
        }
        set texture(t) {
            let e;
            if (Utils.isObjectLiteral(t)) e = t.type ? new t.type(this.stage) : this.texture, e && Base.patchObject(e, t);
            else if (t) {
                if (t.isTexture) e = t;
                else {
                    if (!t.isTextureSource) return void console.error("[Lightning] Please specify a texture type.");
                    e = new SourceTexture(this.stage), e.textureSource = t;
                }
            } else e = null;
            const i = this.__texture;
            e !== i && (this.__texture = e, this.__texture ? this.__enabled && (this.__texture.addElement(this), this.withinBoundsMargin && (this.__texture.isLoaded() ? this._setDisplayedTexture(this.__texture) : this._enableTextureError())) : this._setDisplayedTexture(null), i && i !== this.__displayedTexture && i.removeElement(this), this._updateDimensions());
        }
        get displayedTexture() {
            return this.__displayedTexture;
        }
        _setDisplayedTexture(t) {
            let e = this.__displayedTexture;
            e && t !== e && this.__texture !== e && e.removeElement(this);
            const i = this.__core.displayedTextureSource ? this.__core.displayedTextureSource._source : null, s = (t ? t._source : null) !== i;
            this.__displayedTexture = t, this._updateDimensions(), this.__displayedTexture ? s && (this._updateTextureCoords(), this.__core.setDisplayedTextureSource(this.__displayedTexture._source)) : this.__core.setDisplayedTextureSource(null), s && (this.__displayedTexture ? this.emit("txLoaded", this.__displayedTexture) : this.emit("txUnloaded", this.__displayedTexture));
        }
        onTextureSourceLoaded() {
            this.active && this._setDisplayedTexture(this.__texture);
        }
        onTextureSourceLoadError(t) {
            this.emit("txError", t, this.__texture._source);
        }
        forceRenderUpdate() {
            this.__core.setHasRenderUpdates(3);
        }
        onDisplayedTextureClippingChanged() {
            this._updateDimensions(), this._updateTextureCoords();
        }
        onPrecisionChanged() {
            this._updateDimensions();
        }
        onDimensionsChanged(t, e) {
            this.texture instanceof TextTexture && (this.texture.w = t, this.texture.h = e, this.w = t, this.h = e);
        }
        _updateDimensions() {
            let t = this._getRenderWidth(), e = this._getRenderHeight(), i = !1;
            t && e || !this.__displayedTexture && this.__texture && (t = t || this.__texture.mw, e = e || this.__texture.mh, t && e || !this.__texture.isAutosizeTexture() || (i = !0)), this.__core.setDimensions(t, e, i) && this._onResize();
        }
        _updateTextureCoords() {
            if (this.displayedTexture && this.displayedTexture._source) {
                let t = this.displayedTexture, e = this.displayedTexture._source, i = 0, s = 0, r = 1, n = 1;
                if (t.clipping) {
                    let o, a, h, l, _ = e.getRenderWidth(), u = e.getRenderHeight();
                    o = 1 / _, a = 1 / u, h = t.pw ? t.pw * o : (_ - t.px) * o, l = t.ph ? t.ph * a : (u - t.py) * a, o *= t.px, a *= t.py, i = o, s = a, r = r * h + o, n = n * l + a, i = Math.max(0, i), s = Math.max(0, s), r = Math.min(1, r), n = Math.min(1, n);
                }
                if (e._flipTextureY) {
                    let t1 = n;
                    n = s, s = t1;
                }
                this.__core.setTextureCoords(i, s, r, n);
            }
        }
        getCornerPoints() {
            return this.__core.getCornerPoints();
        }
        _unsetTagsParent() {
            this.__tags && this.__tags.forEach((t)=>{
                let e = this;
                for(; e = e.__parent;){
                    if (e.__treeTags.get(t).delete(this), e.__tagRoot) break;
                }
            });
            let t = null, e = 0;
            if (this.__treeTags && !this.__tagRoot && (t = Utils.iteratorToArray(this.__treeTags.keys()), e = t.length, e > 0)) for(let i = 0; i < e; i++){
                let e1 = this.__treeTags.get(t[i]), s = this;
                for(; s = s.__parent;){
                    let r = s.__treeTags.get(t[i]);
                    if (e1.forEach(function(t) {
                        r.delete(t);
                    }), s.__tagRoot) break;
                }
            }
        }
        _setTagsParent() {
            this.__tags && this.__tags.forEach((t)=>{
                let e = this;
                for(; e = e.__parent;){
                    e.__treeTags || (e.__treeTags = new Map);
                    let i = e.__treeTags.get(t);
                    if (i || (i = new Set, e.__treeTags.set(t, i)), i.add(this), e.__tagRoot) break;
                }
            }), this.__treeTags && this.__treeTags.size && (this.__tagRoot || this.__treeTags.forEach((t, e)=>{
                let i = this;
                for(; !i.__tagRoot && (i = i.__parent);){
                    i.__tagRoot, i.__treeTags || (i.__treeTags = new Map);
                    let s = i.__treeTags.get(e);
                    s || (s = new Set, i.__treeTags.set(e, s)), t.forEach(function(t) {
                        s.add(t);
                    });
                }
            }));
        }
        _getByTag(t) {
            if (!this.__treeTags) return [];
            let e = this.__treeTags.get(t);
            return e ? Utils.setToArray(e) : [];
        }
        getTags() {
            return this.__tags ? this.__tags : [];
        }
        setTags(t) {
            t = t.reduce((t, e)=>t.concat(e.split(" ")), []), this.__ref && t.push(this.__ref);
            let e, i = t.length, s = [], r = [];
            for(e = 0; e < i; e++)this.hasTag(t[e]) || r.push(t[e]);
            let n = this.tags || [];
            for(i = n.length, e = 0; e < i; e++)-1 == t.indexOf(n[e]) && s.push(n[e]);
            for(e = 0; e < s.length; e++)this.removeTag(s[e]);
            for(e = 0; e < r.length; e++)this.addTag(r[e]);
        }
        addTag(t) {
            if (-1 === t.indexOf(" ")) Utils.isUcChar(t.charCodeAt(0)) && this._throwError("Tag may not start with an upper case character."), this._addTag(t);
            else {
                const e = t.split(" ");
                for(let t1 = 0, i = e.length; t1 < i; t1++){
                    const i1 = e[t1];
                    Utils.isUcChar(i1.charCodeAt(0)) && this._throwError("Tag may not start with an upper case character."), this._addTag(i1);
                }
            }
        }
        _addTag(t) {
            if (this.__tags || (this.__tags = []), -1 === this.__tags.indexOf(t)) {
                this.__tags.push(t);
                let e = this.__parent;
                if (e) do {
                    e.__treeTags || (e.__treeTags = new Map);
                    let i = e.__treeTags.get(t);
                    i || (i = new Set, e.__treeTags.set(t, i)), i.add(this);
                }while (!e.__tagRoot && (e = e.__parent));
            }
        }
        removeTag(t) {
            let e = this.__tags.indexOf(t);
            if (-1 !== e) {
                this.__tags.splice(e, 1);
                let i = this.__parent;
                if (i) do {
                    let e1 = i.__treeTags.get(t);
                    e1 && e1.delete(this);
                }while (!i.__tagRoot && (i = i.__parent));
            }
        }
        hasTag(t) {
            return this.__tags && -1 !== this.__tags.indexOf(t);
        }
        _tag(t) {
            if (-1 !== t.indexOf(".")) return this.mtag(t)[0];
            if (this.__treeTags) {
                let e = this.__treeTags.get(t);
                if (e) {
                    const t1 = e.values().next();
                    return t1 ? t1.value : void 0;
                }
            }
        }
        get tag() {
            return this._tag;
        }
        set tag(t) {
            this.tags = t;
        }
        mtag(t) {
            if (t.indexOf(".") >= 0) {
                let e = t.split("."), i = this._getByTag(e[0]), s = 1, r = e.length;
                for(; i.length && s < r;){
                    let t1 = [];
                    for(let r1 = 0, n = i.length; r1 < n; r1++)t1 = t1.concat(i[r1]._getByTag(e[s]));
                    i = t1, s++;
                }
                return i;
            }
            return this._getByTag(t);
        }
        stag(t, e) {
            let i = this.mtag(t), s = i.length;
            for(let t1 = 0; t1 < s; t1++)Base.patchObject(i[t1], e);
        }
        get tagRoot() {
            return this.__tagRoot;
        }
        set tagRoot(t) {
            this.__tagRoot !== t && (t ? this._unsetTagsParent() : this._setTagsParent(), this.__tagRoot = t);
        }
        sel(t) {
            const e = this.select(t);
            return e.length ? e[0] : void 0;
        }
        select(t) {
            if (-1 !== t.indexOf(",")) {
                let e = t.split(","), i = [];
                for(let t1 = 0; t1 < e.length; t1++)i = i.concat(this._select(e[t1]));
                return i;
            }
            return this._select(t);
        }
        _select(t) {
            if ("" === t) return [
                this
            ];
            let e, i = t.indexOf("."), s = t.indexOf(">");
            return -1 === i && -1 === s ? this.mtag(t) : (0 === s ? (e = !0, t = t.substr(1)) : 0 === i ? (e = !1, t = t.substr(1)) : e = !1, this._selectChilds(t, e));
        }
        _selectChilds(t, e) {
            const i = t.indexOf("."), s = t.indexOf(">");
            if (-1 === i && -1 === s) {
                if (e) {
                    const e1 = this.getByRef(t);
                    return e1 ? [
                        e1
                    ] : [];
                }
                return this.mtag(t);
            }
            if (-1 === s || -1 !== i && i < s) {
                let s1;
                const r = t.substr(0, i);
                if (e) {
                    const t1 = this.getByRef(r);
                    s1 = t1 ? [
                        t1
                    ] : [];
                } else s1 = this.mtag(r);
                let n = [];
                const o = t.substr(i + 1);
                for(let t2 = 0, e2 = s1.length; t2 < e2; t2++)n = n.concat(s1[t2]._selectChilds(o, !1));
                return n;
            }
            {
                let i1;
                const r1 = t.substr(0, s);
                if (e) {
                    const t3 = this.getByRef(r1);
                    i1 = t3 ? [
                        t3
                    ] : [];
                } else i1 = this.mtag(r1);
                let n1 = [];
                const o1 = t.substr(s + 1);
                for(let t4 = 0, e3 = i1.length; t4 < e3; t4++)n1 = n1.concat(i1[t4]._selectChilds(o1, !0));
                return n1;
            }
        }
        getByRef(t) {
            return this.childList.getByRef(t);
        }
        getLocationString() {
            let t;
            t = this.__parent ? this.__parent._children.getIndex(this) : "R";
            let e = this.getTags(), i = this.__parent ? this.__parent.getLocationString() : "";
            return this.ref ? i += ":[" + t + "]" + this.ref : e.length ? i += ":[" + t + "]" + e.join(",") : i += ":[" + t + "]#" + this.id, i;
        }
        toString() {
            let t = this.getSettings();
            return Element.getPrettyString(t, "");
        }
        static getPrettyString(t, e) {
            let i = t.children;
            delete t.children;
            let s = [
                "color",
                "colorUl",
                "colorUr",
                "colorBl",
                "colorBr"
            ], r = JSON.stringify(t, function(t, e) {
                return -1 !== s.indexOf(t) ? "COLOR[" + e.toString(16) + "]" : e;
            });
            if (r = r.replace(/"COLOR\[([a-f0-9]{1,8})\]"/g, "0x$1"), i) {
                let t1 = "";
                if (Utils.isObjectLiteral(i)) {
                    let s1 = Object.keys(i);
                    t1 = "";
                    for(let r1 = 0, n = s1.length; r1 < n; r1++)t1 += `\n${e}  "${s1[r1]}":`, delete i[s1[r1]].ref, t1 += Element.getPrettyString(i[s1[r1]], e + "  ") + (r1 < n - 1 ? "," : "");
                    let n1 = "{}" === r;
                    r = r.substr(0, r.length - 1) + (n1 ? "" : ",") + t1 + "\n" + e + "}";
                } else {
                    let s2 = i.length;
                    t1 = "[";
                    for(let r2 = 0; r2 < s2; r2++)t1 += Element.getPrettyString(i[r2], e + "  ") + (r2 < s2 - 1 ? "," : "") + "\n";
                    t1 += e + "]}";
                    let n2 = "{}" === r;
                    r = r.substr(0, r.length - 1) + (n2 ? "" : ",") + '"children":\n' + e + t1 + "}";
                }
            }
            return r;
        }
        getSettings() {
            let t = this.getNonDefaults(), e = this._children.get();
            if (e) {
                let i = e.length;
                if (i) {
                    const s = [];
                    let r = !1;
                    for(let t1 = 0; t1 < i; t1++)s.push(e[t1].getSettings()), r = r || !e[t1].ref;
                    r ? t.children = s : (t.children = {}, s.forEach((e)=>{
                        t.children[e.ref] = e;
                    }));
                }
            }
            return t.id = this.id, t;
        }
        getNonDefaults() {
            let t = {};
            if (this.constructor !== Element && (t.type = this.constructor.name), this.__ref && (t.ref = this.__ref), this.__tags && this.__tags.length && (t.tags = this.__tags), 0 !== this.x && (t.x = this.x), 0 !== this.y && (t.y = this.y), 0 !== this.w && (t.w = this.w), 0 !== this.h && (t.h = this.h), this.scaleX === this.scaleY ? 1 !== this.scaleX && (t.scale = this.scaleX) : (1 !== this.scaleX && (t.scaleX = this.scaleX), 1 !== this.scaleY && (t.scaleY = this.scaleY)), this.pivotX === this.pivotY ? .5 !== this.pivotX && (t.pivot = this.pivotX) : (.5 !== this.pivotX && (t.pivotX = this.pivotX), .5 !== this.pivotY && (t.pivotY = this.pivotY)), this.mountX === this.mountY ? 0 !== this.mountX && (t.mount = this.mountX) : (0 !== this.mountX && (t.mountX = this.mountX), 0 !== this.mountY && (t.mountY = this.mountY)), 1 !== this.alpha && (t.alpha = this.alpha), this.visible || (t.visible = !1), 0 !== this.rotation && (t.rotation = this.rotation), this.colorUl === this.colorUr && this.colorBl === this.colorBr && this.colorUl === this.colorBl ? 4294967295 !== this.colorUl && (t.color = this.colorUl.toString(16)) : (4294967295 !== this.colorUl && (t.colorUl = this.colorUl.toString(16)), 4294967295 !== this.colorUr && (t.colorUr = this.colorUr.toString(16)), 4294967295 !== this.colorBl && (t.colorBl = this.colorBl.toString(16)), 4294967295 !== this.colorBr && (t.colorBr = this.colorBr.toString(16))), this.zIndex && (t.zIndex = this.zIndex), this.forceZIndexContext && (t.forceZIndexContext = !0), this.clipping && (t.clipping = this.clipping), this.clipbox || (t.clipbox = this.clipbox), this.__texture) {
                let e = this.__texture.getNonDefaults();
                Object.keys(e).length && (t.texture = e);
            }
            if (this.shader && Utils.isFunction(this.shader.getNonDefaults)) {
                let e1 = this.shader.getNonDefaults();
                Object.keys(e1).length && (t.shader = e1);
            }
            return this._hasTexturizer() && (this.texturizer.enabled && (t.renderToTexture = this.texturizer.enabled), this.texturizer.lazy && (t.renderToTextureLazy = this.texturizer.lazy), this.texturizer.colorize && (t.colorizeResultTexture = this.texturizer.colorize), this.texturizer.renderOffscreen && (t.renderOffscreen = this.texturizer.renderOffscreen)), t;
        }
        static getGetter(t) {
            let e = Element.PROP_GETTERS.get(t);
            return e || (e = new Function("obj", "return obj." + t), Element.PROP_GETTERS.set(t, e)), e;
        }
        static getSetter(t) {
            let e = Element.PROP_SETTERS.get(t);
            return e || (e = new Function("obj", "v", "obj." + t + " = v"), Element.PROP_SETTERS.set(t, e)), e;
        }
        get withinBoundsMargin() {
            return this.__core._withinBoundsMargin;
        }
        _enableWithinBoundsMargin() {
            this.__enabled && this._setActiveFlag();
        }
        _disableWithinBoundsMargin() {
            this.__active && this._unsetActiveFlag();
        }
        set boundsMargin(t) {
            if (!Array.isArray(t) && null !== t) throw new Error("boundsMargin should be an array of left-top-right-bottom values or null (inherit margin)");
            this.__core.boundsMargin = t;
        }
        get boundsMargin() {
            return this.__core.boundsMargin;
        }
        get x() {
            return this.__core.offsetX;
        }
        set x(t) {
            this.__core.offsetX = t;
        }
        get y() {
            return this.__core.offsetY;
        }
        set y(t) {
            this.__core.offsetY = t;
        }
        get w() {
            return this._w;
        }
        set w(t) {
            Utils.isFunction(t) ? (this._w = 0, this.__core.funcW = t) : (t = Math.max(t, 0), this._w !== t && (this.__core.disableFuncW(), this._w = t, this._updateDimensions()));
        }
        get h() {
            return this._h;
        }
        set h(t) {
            Utils.isFunction(t) ? (this._h = 0, this.__core.funcH = t) : (t = Math.max(t, 0), this._h !== t && (this.__core.disableFuncH(), this._h = t, this._updateDimensions()));
        }
        get collision() {
            return this._collision;
        }
        set collision(t) {
            this._collision = t;
        }
        _updateCollision() {
            this.collision && this.__parent && void 0 === this.__parent.collision && (this.__parent.collision = 2);
        }
        get scaleX() {
            return this.__core.scaleX;
        }
        set scaleX(t) {
            this.__core.scaleX = t;
        }
        get scaleY() {
            return this.__core.scaleY;
        }
        set scaleY(t) {
            this.__core.scaleY = t;
        }
        get scale() {
            return this.__core.scale;
        }
        set scale(t) {
            this.__core.scale = t;
        }
        get pivotX() {
            return this.__core.pivotX;
        }
        set pivotX(t) {
            this.__core.pivotX = t;
        }
        get pivotY() {
            return this.__core.pivotY;
        }
        set pivotY(t) {
            this.__core.pivotY = t;
        }
        get pivot() {
            return this.__core.pivot;
        }
        set pivot(t) {
            this.__core.pivot = t;
        }
        get mountX() {
            return this.__core.mountX;
        }
        set mountX(t) {
            this.__core.mountX = t;
        }
        get mountY() {
            return this.__core.mountY;
        }
        set mountY(t) {
            this.__core.mountY = t;
        }
        get mount() {
            return this.__core.mount;
        }
        set mount(t) {
            this.__core.mount = t;
        }
        get rotation() {
            return this.__core.rotation;
        }
        set rotation(t) {
            this.__core.rotation = t;
        }
        get alpha() {
            return this.__core.alpha;
        }
        set alpha(t) {
            this.__core.alpha = t;
        }
        get visible() {
            return this.__core.visible;
        }
        set visible(t) {
            this.__core.visible = t;
        }
        get colorUl() {
            return this.__core.colorUl;
        }
        set colorUl(t) {
            this.__core.colorUl = t;
        }
        get colorUr() {
            return this.__core.colorUr;
        }
        set colorUr(t) {
            this.__core.colorUr = t;
        }
        get colorBl() {
            return this.__core.colorBl;
        }
        set colorBl(t) {
            this.__core.colorBl = t;
        }
        get colorBr() {
            return this.__core.colorBr;
        }
        set colorBr(t) {
            this.__core.colorBr = t;
        }
        get color() {
            return this.__core.colorUl;
        }
        set color(t) {
            this.colorUl === t && this.colorUr === t && this.colorBl === t && this.colorBr === t || (this.colorUl = t, this.colorUr = t, this.colorBl = t, this.colorBr = t);
        }
        get colorTop() {
            return this.colorUl;
        }
        set colorTop(t) {
            this.colorUl === t && this.colorUr === t || (this.colorUl = t, this.colorUr = t);
        }
        get colorBottom() {
            return this.colorBl;
        }
        set colorBottom(t) {
            this.colorBl === t && this.colorBr === t || (this.colorBl = t, this.colorBr = t);
        }
        get colorLeft() {
            return this.colorUl;
        }
        set colorLeft(t) {
            this.colorUl === t && this.colorBl === t || (this.colorUl = t, this.colorBl = t);
        }
        get colorRight() {
            return this.colorUr;
        }
        set colorRight(t) {
            this.colorUr === t && this.colorBr === t || (this.colorUr = t, this.colorBr = t);
        }
        get zIndex() {
            return this.__core.zIndex;
        }
        set zIndex(t) {
            this.__core.zIndex = t;
        }
        get forceZIndexContext() {
            return this.__core.forceZIndexContext;
        }
        set forceZIndexContext(t) {
            this.__core.forceZIndexContext = t;
        }
        get clipping() {
            return this.__core.clipping;
        }
        set clipping(t) {
            this.__core.clipping = t;
        }
        get clipbox() {
            return this.__core.clipbox;
        }
        set clipbox(t) {
            this.__core.clipbox = t;
        }
        get tags() {
            return this.getTags();
        }
        set tags(t) {
            Array.isArray(t) || (t = [
                t
            ]), this.setTags(t);
        }
        set t(t) {
            this.tags = t;
        }
        get _children() {
            return this.__childList || (this.__childList = new ElementChildList(this, !1)), this.__childList;
        }
        get childList() {
            return this._allowChildrenAccess() || this._throwError("Direct access to children is not allowed in " + this.getLocationString()), this._children;
        }
        hasChildren() {
            return this._allowChildrenAccess() && this.__childList && this.__childList.length > 0;
        }
        _allowChildrenAccess() {
            return !0;
        }
        get children() {
            return this.childList.get();
        }
        set children(t) {
            this.childList.patch(t);
        }
        add(t) {
            return this.childList.a(t);
        }
        get p() {
            return this.__parent;
        }
        get parent() {
            return this.__parent;
        }
        get src() {
            return this.texture && this.texture instanceof ImageTexture ? this.texture._src : void 0;
        }
        set src(t) {
            const e = new ImageTexture(this.stage);
            e.src = t, this.texture = e;
        }
        set mw(t) {
            this.texture ? (this.texture.mw = t, this._updateDimensions()) : this._throwError("Please set mw after setting a texture.");
        }
        set mh(t) {
            this.texture ? (this.texture.mh = t, this._updateDimensions()) : this._throwError("Please set mh after setting a texture.");
        }
        get rect() {
            return this.texture === this.stage.rectangleTexture;
        }
        set rect(t) {
            this.texture = t ? this.stage.rectangleTexture : null;
        }
        enableTextTexture() {
            return this.texture && this.texture instanceof TextTexture || (this.texture = new TextTexture(this.stage), this.texture.w || this.texture.h || (this.texture.w = this.w, this.texture.h = this.h)), this.texture;
        }
        get text() {
            return this.texture && this.texture instanceof TextTexture ? this.texture : null;
        }
        set text(t) {
            this.texture && this.texture instanceof TextTexture || this.enableTextTexture(), Utils.isString(t) ? this.texture.text = t : this.texture.patch(t);
        }
        set onUpdate(t) {
            this.__core.onUpdate = t;
        }
        set onAfterCalcs(t) {
            this.__core.onAfterCalcs = t;
        }
        set onAfterUpdate(t) {
            this.__core.onAfterUpdate = t;
        }
        forceUpdate() {
            this.__core._setHasUpdates();
        }
        get shader() {
            return this.__core.shader;
        }
        set shader(t) {
            if (Utils.isObjectLiteral(t) && !t.type) this.shader && this.shader.patch(t);
            else {
                const e = Shader.create(this.stage, t);
                this.__enabled && this.__core.shader && this.__core.shader.removeElement(this.__core), this.__core.shader = e, this.__enabled && this.__core.shader && this.__core.shader.addElement(this.__core);
            }
        }
        _hasTexturizer() {
            return !!this.__core._texturizer;
        }
        get renderToTexture() {
            return this.rtt;
        }
        set renderToTexture(t) {
            this.rtt = t;
        }
        get rtt() {
            return this._hasTexturizer() && this.texturizer.enabled;
        }
        set rtt(t) {
            this.texturizer.enabled = t;
        }
        get rttLazy() {
            return this._hasTexturizer() && this.texturizer.lazy;
        }
        set rttLazy(t) {
            this.texturizer.lazy = t;
        }
        get renderOffscreen() {
            return this._hasTexturizer() && this.texturizer.renderOffscreen;
        }
        set renderOffscreen(t) {
            this.texturizer.renderOffscreen = t;
        }
        get colorizeResultTexture() {
            return this._hasTexturizer() && this.texturizer.colorize;
        }
        set colorizeResultTexture(t) {
            this.texturizer.colorize = t;
        }
        getTexture() {
            return this.texturizer._getTextureSource();
        }
        get texturizer() {
            return this.__core.texturizer;
        }
        patch(t) {
            let e = Object.keys(t);
            for(let i = 0, s = e.length; i < s; i++){
                let s1 = e[i];
                const r = t[s1], n = s1.charCodeAt(0);
                if (Utils.isUcChar(n)) {
                    const t1 = this.getByRef(s1);
                    if (t1) void 0 === r ? t1.parent && t1.parent.childList.remove(t1) : Utils.isObjectLiteral(r) ? t1.patch(r) : r.isElement ? (r.ref = s1, this.childList.replace(r, t1)) : this._throwError("Unexpected value for path: " + s1);
                    else if (void 0 !== r) {
                        let t2;
                        Utils.isObjectLiteral(r) ? (t2 = this.childList.createItem(r), t2.patch(r)) : Utils.isObject(r) && (t2 = r), t2.isElement && (t2.ref = s1), this.childList.a(t2);
                    }
                } else Base.patchObjectProperty(this, s1, r);
            }
        }
        _throwError(t) {
            throw new Error(this.constructor.name + " (" + this.getLocationString() + "): " + t);
        }
        animation(t) {
            return this.stage.animations.createAnimation(this, t);
        }
        transition(t, e = null) {
            return null === e ? this._getTransition(t) : (this._setTransition(t, e), null);
        }
        set transitions(t) {
            Object.keys(t).forEach((e)=>{
                this.transition(e, t[e]);
            });
        }
        set smooth(t) {
            Object.keys(t).forEach((e)=>{
                let i = t[e];
                Array.isArray(i) ? this.setSmooth(e, i[0], i[1]) : this.setSmooth(e, i);
            });
        }
        fastForward(t) {
            if (this._transitions) {
                let e = this._transitions[t];
                e && e.isTransition && e.finish();
            }
        }
        _getTransition(t) {
            this._transitions || (this._transitions = {});
            let e = this._transitions[t];
            return e ? e.isTransitionSettings && (e = new Transition(this.stage.transitions, e, this, t)) : e = new Transition(this.stage.transitions, this.stage.transitions.defaultTransitionSettings, this, t), this._transitions[t] = e, e;
        }
        _setTransition(t, e) {
            if (e) {
                Utils.isObjectLiteral(e) && (e = this.stage.transitions.createSettings(e)), this._transitions || (this._transitions = {});
                let i = this._transitions[t];
                if (i && i.isTransition) return i.settings = e, i;
                this._transitions[t] = e;
            } else this._removeTransition(t);
        }
        _removeTransition(t) {
            this._transitions && delete this._transitions[t];
        }
        getSmooth(t, e) {
            let i = this._getTransition(t);
            return i && i.isAttached() ? i.targetValue : e;
        }
        setSmooth(t, e, i) {
            i && this._setTransition(t, i);
            let s = this._getTransition(t);
            return s.start(e), s;
        }
        get flex() {
            return this.__core.flex;
        }
        set flex(t) {
            this.__core.flex = t;
        }
        get flexItem() {
            return this.__core.flexItem;
        }
        set flexItem(t) {
            this.__core.flexItem = t;
        }
        static isColorProperty(t) {
            return t.toLowerCase().indexOf("color") >= 0;
        }
        static getMerger(t) {
            return Element.isColorProperty(t) ? StageUtils.mergeColors : StageUtils.mergeNumbers;
        }
        toJSON() {
            const t = [
                "" + this.constructor.name
            ], e = {};
            return e[t] = {}, this.hasChildren() ? Element.collectChildren(e[t], this.__childList) : e[t] = {
                ...Element.getProperties(this)
            }, e;
        }
        static collectChildren(t, e) {
            const i = e;
            for(let e1 = 0, s = i.length; e1 < s; e1++){
                const s1 = i.getAt(e1), r = "" + (s1.__ref || "Element-" + s1.id), n = this.getProperties(s1);
                t[r] = {
                    ...n
                }, s1.hasChildren() && (t[r].children = {}, this.collectChildren(t[r].children, s1.__childList));
            }
        }
        static getProperties(t) {
            const e = {}, i = [
                "alpha",
                "active",
                "attached",
                "boundsMargin",
                "color",
                "clipping",
                "enabled",
                "h",
                "id",
                "isComponent",
                "mount",
                "mountY",
                "mountX",
                "pivot",
                "pivotX",
                "pivotY",
                "ref",
                "renderOfScreen",
                "renderToTexture",
                "scale",
                "scaleX",
                "scaleY",
                "state",
                "tag",
                "visible",
                "w",
                "x",
                "y",
                "zIndex",
                "!!flex",
                "!!flexItem",
                "hasFocus()",
                "hasFinalFocus()"
            ];
            let s = i.length;
            for(; s--;){
                let r = i[s];
                const n = /\(\)$/;
                /^!{2}/.test(r) ? (r = r.substring(2, r.length), e[r] = !!t[r]) : n.test(r) ? (r = r.substring(0, r.length - 2), "function" == typeof t[r] && (e[r] = t[r]())) : e[r] = t[r];
            }
            return {
                ...e,
                ...t.getNonDefaults()
            };
        }
    }
    EventEmitter.addAsMixin(Element), Element.prototype.isElement = 1, Element.id = 1, Element.PROP_GETTERS = new Map, Element.PROP_SETTERS = new Map;
    class StateMachine {
        constructor(){
            StateMachine.setupStateMachine(this);
        }
        static setupStateMachine(t) {
            const e = t.constructor, i = StateMachine.create(e);
            Object.setPrototypeOf(t, i.prototype), t.constructor = e, t._initStateMachine();
        }
        static create(t) {
            if (!t.hasOwnProperty("_sm")) {
                const e = new StateMachineType(t);
                t._sm = e;
            }
            return t._sm.router;
        }
        fire(t, ...e) {
            if (this._hasMethod(t)) return this[t](...e);
        }
        _getState() {
            return this._state.__path;
        }
        _inState(t, e = this._state.__path) {
            const i = this._sm.getStateByPath(t), s = this._sm.getStateByPath(e), r = i.__level;
            return StateMachine._getStateAtLevel(s, r) === i;
        }
        _hasMember(t) {
            return !!this.constructor.prototype[t];
        }
        _hasMethod(t) {
            const e = this.constructor.prototype[t];
            return !!e && "function" == typeof e;
        }
        _setState(t, e) {
            const i = ++this._setStateCounter;
            if (this._setStateId = i, this._state.__path !== t) {
                let s = this._sm._stateMap[t];
                s || (s = this._sm.getStateByPath(t));
                const r = this._state, n = s.prototype.$enter !== this._state.prototype.$enter, o = s.prototype.$exit !== this._state.prototype.$exit;
                if (n || o) {
                    const t1 = StateMachine._getSharedState(this._state, s), a = {
                        newState: s.__path,
                        prevState: r.__path,
                        sharedState: t1.__path
                    }, h = t1.__level;
                    if (o) {
                        const t2 = StateMachine._getStatesUntilLevel(this._state, h);
                        for(let s1 = 0, r1 = t2.length; s1 < r1; s1++){
                            this.__setState(t2[s1]), this._callExit(this._state, e, a);
                            if (this._setStateId !== i) return;
                        }
                    }
                    if (n) {
                        const t3 = StateMachine._getStatesUntilLevel(s, h).reverse();
                        for(let s2 = 0, r2 = t3.length; s2 < r2; s2++){
                            this.__setState(t3[s2]), this._callEnter(this._state, e, a);
                            if (this._setStateId !== i) return;
                        }
                    }
                }
                if (this.__setState(s), this._changedState) {
                    const t4 = {
                        newState: s.__path,
                        prevState: r.__path
                    };
                    e ? this._changedState(t4, ...e) : this._changedState(t4);
                }
                if (this._onStateChange) {
                    const t5 = {
                        newState: s.__path,
                        prevState: r.__path
                    };
                    this._onStateChange(t5);
                }
            }
        }
        _callEnter(t, e = [], i) {
            const s = !!t.__parent;
            t.prototype.$enter && (s && t.__parent.prototype.$enter === t.prototype.$enter || t.prototype.$enter.apply(this, [
                i,
                ...e
            ]));
        }
        _callExit(t, e = [], i) {
            const s = !!t.__parent;
            t.prototype.$exit && (s && t.__parent.prototype.$exit === t.prototype.$exit || t.prototype.$exit.apply(this, [
                i,
                ...e
            ]));
        }
        __setState(t) {
            this._state = t, this._stateIndex = t.__index, this.constructor = t;
        }
        _initStateMachine() {
            this._state = null, this._stateIndex = 0, this._setStateCounter = 0, this._sm = this._routedType._sm, this.__setState(this._sm.getStateByPath(""));
            const t = {
                newState: "",
                prevState: void 0,
                sharedState: void 0
            };
            this._callEnter(this._state, [], t), this._onStateChange = void 0;
        }
        _getMostSpecificHandledMember(t) {
            let e = this._state;
            do {
                for(let i = 0, s = t.length; i < s; i++){
                    const s1 = t[i];
                    if (e.__parent) {
                        if (this[StateMachineType.getStateMemberAlias(e.__path, s1)]) return s1;
                    } else if (e.prototype[s1]) return s1;
                }
                e = e.__parent;
            }while (e);
        }
        static _getStatesUntilLevel(t, e) {
            const i = [];
            for(; t.__level > e;)i.push(t), t = t.__parent;
            return i;
        }
        static _getSharedState(t, e) {
            const i = StateMachine._getAncestorStates(t), s = StateMachine._getAncestorStates(e), r = Math.min(i.length, s.length);
            for(let t1 = 0; t1 < r; t1++)if (i[t1] !== s[t1]) return i[t1 - 1];
            return i[r - 1];
        }
        static _getAncestorStates(t) {
            const e = [];
            do e.push(t);
            while (t = t.__parent);
            return e.reverse();
        }
        static _getStateAtLevel(t, e) {
            if (!(e > t.__level)) {
                for(; e < t.__level;)t = t.__parent;
                return t;
            }
        }
    }
    class StateMachineType {
        constructor(t){
            this._type = t, this._router = null, this.init();
        }
        get router() {
            return this._router;
        }
        init() {
            this._router = this._createRouter(), this._stateMap = this._getStateMap(), this._addStateMemberDelegatorsToRouter();
        }
        _createRouter() {
            const t = this._type, e = class StateMachineRouter extends t {
                constructor(){
                    if (super(...arguments), !this.constructor.hasOwnProperty("_isRouter")) throw new Error(`You need to extend ${t.name}.original instead of ${t.name}.`);
                }
            };
            return e._isRouter = !0, e.prototype._routedType = t, e.original = t, this._mixinStateMachineMethods(e), e;
        }
        _mixinStateMachineMethods(t) {
            const e = Object.getOwnPropertyNames(StateMachine.prototype);
            for(let i = 0, s = e.length; i < s; i++){
                const s1 = e[i];
                if ("constructor" !== s1) {
                    const e1 = Object.getOwnPropertyDescriptor(StateMachine.prototype, s1);
                    Object.defineProperty(t.prototype, s1, e1);
                }
            }
        }
        _addStateMemberDelegatorsToRouter() {
            this._getAllMemberNames().forEach((t)=>{
                this._addMemberRouter(t);
            });
        }
        _addMemberRouter(t) {
            const e = Object.keys(this._stateMap), i = [], s = [];
            e.forEach((e, r)=>{
                const n = this._stateMap[e], o = this._getDescriptor(n, t);
                if (o) {
                    i[r] = o;
                    const e1 = StateMachineType.getStateMemberAlias(o._source.__path, t);
                    s[r] = e1, this._router.prototype.hasOwnProperty(e1) || Object.defineProperty(this._router.prototype, e1, o);
                } else i[r] = null, s[r] = null;
            });
            let r = void 0;
            switch(i.forEach((e)=>{
                if (e) {
                    const i = this._getDescriptorType(e);
                    if (r && r !== i) return void console.warn(`[Lightning] Member ${t} in ${this._type.name} has inconsistent types.`);
                    r = i;
                }
            }), r){
                case "method":
                    this._addMethodRouter(t, i, s);
                    break;
                case "getter":
                    this._addGetterSetterRouters(t);
                    break;
                case "property":
                    console.warn("[Lightning] Fixed properties are not supported; please use a getter instead!");
            }
        }
        _getDescriptor(t, e, i = ()=>!0) {
            let s = t, r = t;
            do {
                const t1 = Object.getOwnPropertyDescriptor(s.prototype, e);
                if (t1 && i(t1)) return t1._source = r, t1;
                s = Object.getPrototypeOf(s), s && s.hasOwnProperty("__state") && (r = s);
            }while (s && s.prototype);
        }
        _getDescriptorType(t) {
            return t.get || t.set ? "getter" : "function" == typeof t.value ? "method" : "property";
        }
        static _supportsSpread() {
            if (void 0 === this.__supportsSpread) {
                this.__supportsSpread = !1;
                try {
                    new Function("return [].concat(...arguments);")(), this.__supportsSpread = !0;
                } catch (t) {}
            }
            return this.__supportsSpread;
        }
        _addMethodRouter(t, e, i) {
            const s = [
                "//@ sourceURL=StateMachineRouter.js",
                "var i = this._stateIndex;"
            ];
            let r = i[0];
            const n = StateMachineType._supportsSpread();
            for(let t1 = 1, e1 = i.length; t1 < e1; t1++){
                const e2 = i[t1];
                e2 !== r && (r ? n ? s.push(`if (i < ${t1}) return this["${r}"](...arguments); else`) : s.push(`if (i < ${t1}) return this["${r}"].apply(this, arguments); else`) : s.push(`if (i < ${t1}) return ; else`)), r = e2;
            }
            r ? n ? s.push(`return this["${r}"](...arguments);`) : s.push(`return this["${r}"].apply(this, arguments);`) : s.push(";");
            const o = s.join("\n"), a = {
                value: new Function([], o)
            };
            Object.defineProperty(this._router.prototype, t, a);
        }
        _addGetterSetterRouters(t) {
            const e = {
                get: this._getGetterRouter(t),
                set: this._getSetterRouter(t)
            };
            Object.defineProperty(this._router.prototype, t, e);
        }
        _getGetterRouter(t) {
            const e = Object.keys(this._stateMap), i = [], s = [];
            e.forEach((e, r)=>{
                const n = this._stateMap[e], o = this._getDescriptor(n, t, (t)=>t.get);
                if (o) {
                    i[r] = o;
                    const e1 = StateMachineType.getStateMemberAlias(o._source.__path, t);
                    s[r] = e1, this._router.prototype.hasOwnProperty(e1) || Object.defineProperty(this._router.prototype, e1, o);
                } else i[r] = null, s[r] = null;
            });
            const r = [
                "//@ sourceURL=StateMachineRouter.js",
                "var i = this._stateIndex;"
            ];
            let n = s[0];
            for(let t1 = 1, e1 = s.length; t1 < e1; t1++){
                const e2 = s[t1];
                e2 !== n && (n ? r.push(`if (i < ${t1}) return this["${n}"]; else`) : r.push(`if (i < ${t1}) return ; else`)), n = e2;
            }
            n ? r.push(`return this["${n}"];`) : r.push(";");
            const o = r.join("\n");
            return new Function([], o);
        }
        _getSetterRouter(t) {
            const e = Object.keys(this._stateMap), i = [], s = [];
            e.forEach((e, r)=>{
                const n = this._stateMap[e], o = this._getDescriptor(n, t, (t)=>t.set);
                if (o) {
                    i[r] = o;
                    const e1 = StateMachineType.getStateMemberAlias(o._source.__path, t);
                    s[r] = e1, this._router.prototype.hasOwnProperty(e1) || Object.defineProperty(this._router.prototype, e1, o);
                } else i[r] = null, s[r] = null;
            });
            const r = [
                "//@ sourceURL=StateMachineRouter.js",
                "var i = this._stateIndex;"
            ];
            let n = s[0];
            for(let t1 = 1, e1 = s.length; t1 < e1; t1++){
                const e2 = s[t1];
                e2 !== n && (n ? r.push(`if (i < ${t1}) this["${n}"] = arg; else`) : r.push(`if (i < ${t1}) ; else`)), n = e2;
            }
            n ? r.push(`this["${n}"] = arg;`) : r.push(";");
            const o = r.join("\n");
            return new Function([
                "arg"
            ], o);
        }
        static getStateMemberAlias(t, e) {
            return "$" + (t ? t + "." : "") + e;
        }
        _getAllMemberNames() {
            const t = this._stateMap, e = Object.keys(t);
            let i = new Set;
            return e.forEach((e)=>{
                if ("" === e) return;
                const s = t[e];
                this._getStateMemberNames(s).forEach((t)=>{
                    i.add(t);
                });
            }), [
                ...i
            ];
        }
        _getStateMemberNames(t) {
            let e = t, i = new Set;
            const s = this._type === t;
            do this._getStateMemberNamesForType(e).forEach((t)=>{
                i.add(t);
            }), e = Object.getPrototypeOf(e);
            while (e && e.prototype && (!e.hasOwnProperty("__state") || s));
            return i;
        }
        _getStateMemberNamesForType(t) {
            return Object.getOwnPropertyNames(t.prototype).filter((t)=>"constructor" !== t && !StateMachineType._isStateLocalMember(t));
        }
        static _isStateLocalMember(t) {
            return "$enter" === t || "$exit" === t;
        }
        getStateByPath(t) {
            if (this._stateMap[t]) return this._stateMap[t];
            const e = t.split(".");
            for(; e.pop();){
                const t1 = e.join(".");
                if (this._stateMap[t1]) return this._stateMap[t1];
            }
        }
        _getStateMap() {
            return this._stateMap || (this._stateMap = this._createStateMap()), this._stateMap;
        }
        _createStateMap() {
            const t = {};
            return this._addState(this._type, null, "", t), t;
        }
        _addState(t, e, i, s) {
            t.__state = !0, t.__name = i, this._addStaticStateProperty(t, e);
            const r = e ? e.__path : "";
            let n = (r ? r + "." : "") + i;
            t.__path = n, t.__level = e ? e.__level + 1 : 0, t.__parent = e, t.__index = Object.keys(s).length, s[n] = t;
            const o = t._states;
            if (o) {
                if (!(e && e._states === o)) t._states().forEach((e)=>{
                    const i = StateMachineType._getStateName(e);
                    this._addState(e, t, i, s);
                });
            }
        }
        static _getStateName(t) {
            const e = t.name, i = e.indexOf("$");
            return i > 0 ? e.substr(0, i) : e;
        }
        _addStaticStateProperty(t, e) {
            if (e) e && !e.__parent ? this._router[t.__name] = t : e[t.__name] = t;
        }
    }
    class Component extends Element {
        constructor(t, e){
            super(t), this.tagRoot = !0, Utils.isObjectLiteral(e) && Object.assign(this, e), this.__initialized = !1, this.__firstActive = !1, this.__firstEnable = !1, this.__signals = void 0, this.__passSignals = void 0, this.__construct();
            const i = this.constructor.getTemplateFunc(this);
            i.f(this, i.a), this._build();
        }
        __start() {
            StateMachine.setupStateMachine(this), this._onStateChange = Component.prototype.__onStateChange;
        }
        get state() {
            return this._getState();
        }
        __onStateChange() {
            this.application && this.application.updateFocusPath();
        }
        _refocus() {
            this.application && this.application.updateFocusPath();
        }
        static bindProp(t, e = null) {
            return {
                __propertyBinding: !0,
                __name: t,
                __func: e
            };
        }
        __bindProperty(t, e, i) {
            const s = e, r = i, n = Array.isArray(t.__name) ? t.__name : [
                t.__name
            ];
            for(let e1 = 0; e1 < n.length; e1++){
                const i1 = n[e1], o = t.__func ? t.__func : (t)=>t[i1];
                this.hasOwnProperty(i1) ? this["__prop_bindings_" + i1].push({
                    __obj: s,
                    __prop: r,
                    __func: o
                }) : (this["__prop_bindings_" + i1] = [
                    {
                        __obj: s,
                        __prop: r,
                        __func: o
                    }
                ], Object.defineProperty(this, i1, {
                    set: (t)=>{
                        this["__prop_" + i1] = t;
                        for (const { __obj: t1 , __prop: e , __func: s  } of this["__prop_bindings_" + i1])t1[e] = s(this);
                    },
                    get: ()=>this["__prop_" + i1]
                }));
            }
        }
        static getTemplateFunc(t) {
            const e = "_templateFunc";
            return this.__has_templateFunc !== this && (this.__has_templateFunc = this, this[e] = this.parseTemplate(this._template(t))), this[e];
        }
        static parseTemplate(t) {
            const e = {
                loc: [],
                store: [],
                rid: 0
            };
            this.parseTemplateRec(t, e, "element");
            const i = e.loc.join(";\n");
            return {
                f: new Function("element", "store", i),
                a: e.store
            };
        }
        static parseTemplateRec(t, e, i) {
            const s = e.store, r = e.loc;
            Object.keys(t).forEach((n)=>{
                let o = t[n];
                if (Utils.isUcChar(n.charCodeAt(0))) {
                    if (Utils.isObjectLiteral(o)) {
                        const t1 = "r" + (n.replace(/[^a-z0-9]/gi, "") + e.rid);
                        let a = o.type ? o.type : Element;
                        a === Element ? r.push(`var ${t1} = element.stage.createElement()`) : (s.push(a), r.push(`var ${t1} = new store[${s.length - 1}](${i}.stage)`)), r.push(`${t1}.ref = "${n}"`), e.rid++, this.parseTemplateRec(o, e, t1), r.push(`${i}.childList.add(${t1})`);
                    } else Utils.isObject(o) && (s.push(o), r.push(`${i}.childList.add(store[${s.length - 1}])`));
                } else if ("text" === n) {
                    const t2 = i + "__text";
                    r.push(`var ${t2} = ${i}.enableTextTexture()`), !0 === o.__propertyBinding ? (s.push(o), r.push(`element.__bindProperty(store[${s.length - 1}], ${i}, "${n}")`)) : this.parseTemplatePropRec(o, e, t2);
                } else if ("shader" === n && Utils.isObjectLiteral(o)) {
                    const t3 = i + '["shader"]';
                    s.push(o), r.push(`${i}["${n}"] = store[${s.length - 1}]`), this.parsePropertyBindings(o, e, t3);
                } else if ("texture" === n && Utils.isObjectLiteral(o)) {
                    const t4 = i + "__texture", a1 = o.type;
                    a1 ? (s.push(a1), r.push(`var ${t4} = new store[${s.length - 1}](${i}.stage)`), this.parseTemplatePropRec(o, e, t4), r.push(`${i}["${n}"] = ${t4}`)) : (r.push(`${t4} = ${i}.texture`), this.parseTemplatePropRec(o, e, t4));
                } else Utils.isObjectLiteral(o) && !0 === o.__propertyBinding ? (s.push(o), r.push(`element.__bindProperty(store[${s.length - 1}], ${i}, "${n}")`)) : Utils.isNumber(o) ? r.push(`${i}["${n}"] = ${o}`) : Utils.isBoolean(o) ? r.push(`${i}["${n}"] = ${o ? "true" : "false"}`) : Utils.isObject(o) || Array.isArray(o) ? (s.push(o), r.push(`${i}["${n}"] = store[${s.length - 1}]`)) : r.push(`${i}["${n}"] = ${JSON.stringify(o)}`);
            });
        }
        static parseTemplatePropRec(t, e, i) {
            const s = e.store, r = e.loc;
            Object.keys(t).forEach((e)=>{
                if ("type" !== e) {
                    const n = t[e];
                    Utils.isNumber(n) ? r.push(`${i}["${e}"] = ${n}`) : Utils.isBoolean(n) ? r.push(`${i}["${e}"] = ${n ? "true" : "false"}`) : Utils.isObject(n) && !0 === n.__propertyBinding ? (s.push(n), r.push(`element.__bindProperty(store[${s.length - 1}], ${i}, "${e}")`)) : Utils.isObject(n) || Array.isArray(n) ? (s.push(n), r.push(`${i}["${e}"] = store[${s.length - 1}]`)) : r.push(`${i}["${e}"] = ${JSON.stringify(n)}`);
                }
            });
        }
        static parsePropertyBindings(t, e, i) {
            const s = e.store, r = e.loc;
            Object.keys(t).forEach((e)=>{
                if ("type" !== e) {
                    const n = t[e];
                    Utils.isObjectLiteral(n) && !0 === n.__propertyBinding && (s.push(n), r.push(`element.__bindProperty(store[${s.length - 1}], ${i}, "${e}")`));
                }
            });
        }
        _onSetup() {
            this.__initialized || this._setup();
        }
        _setup() {}
        _onAttach() {
            this.__initialized || (this.__init(), this.__initialized = !0), this._attach();
        }
        _attach() {}
        _onDetach() {
            this._detach();
        }
        _detach() {}
        _onEnabled() {
            this.__firstEnable || (this._firstEnable(), this.__firstEnable = !0), this._enable();
        }
        _firstEnable() {}
        _enable() {}
        _onDisabled() {
            this._disable();
        }
        _disable() {}
        _onActive() {
            this.__firstActive || (this._firstActive(), this.__firstActive = !0), this._active();
        }
        _firstActive() {}
        _active() {}
        _onInactive() {
            this._inactive();
        }
        _inactive() {}
        get application() {
            return this.stage.application;
        }
        __construct() {
            this._construct();
        }
        _construct() {}
        _build() {}
        __init() {
            this._init();
        }
        _init() {}
        _focus(t, e) {}
        _unfocus(t) {}
        _focusChange(t, e) {}
        _getFocused() {
            return this;
        }
        _setFocusSettings(t) {}
        _handleFocusSettings(t) {}
        static _template() {
            return {};
        }
        hasFinalFocus() {
            let t = this.application._focusPath;
            return t && t.length && t[t.length - 1] === this;
        }
        hasFocus() {
            let t = this.application._focusPath;
            return t && t.indexOf(this) >= 0;
        }
        get cparent() {
            return Component.getParent(this);
        }
        seekAncestorByType(t) {
            let e = this.cparent;
            for(; e;){
                if (e.constructor === t) return e;
                e = e.cparent;
            }
        }
        getSharedAncestorComponent(t) {
            let e = this.getSharedAncestor(t);
            for(; e && !e.isComponent;)e = e.parent;
            return e;
        }
        get signals() {
            return this.__signals;
        }
        set signals(t) {
            Utils.isObjectLiteral(t) || this._throwError("Signals: specify an object with signal-to-fire mappings"), this.__signals = t;
        }
        set alterSignals(t) {
            Utils.isObjectLiteral(t) || this._throwError("Signals: specify an object with signal-to-fire mappings"), this.__signals || (this.__signals = {});
            for(let e in t)void 0 === t[e] ? delete this.__signals[e] : this.__signals[e] = t;
        }
        get passSignals() {
            return this.__passSignals || {};
        }
        set passSignals(t) {
            this.__passSignals = Object.assign(this.__passSignals || {}, t);
        }
        set alterPassSignals(t) {
            Utils.isObjectLiteral(t) || this._throwError("Signals: specify an object with signal-to-fire mappings"), this.__passSignals || (this.__passSignals = {});
            for(let e in t)void 0 === t[e] ? delete this.__passSignals[e] : this.__passSignals[e] = t;
        }
        signal(t, ...e) {
            return this._signal(t, e);
        }
        _signal(t, e) {
            const i = this._getParentSignalHandler();
            if (i) {
                if (this.__signals) {
                    let s = this.__signals[t];
                    if (!1 === s) return;
                    if (s) {
                        if (!0 === s && (s = t), Utils.isFunction(s)) return s(...e);
                        if (i._hasMethod(s)) return i[s](...e);
                    }
                }
                let s1 = this.__passSignals && this.__passSignals[t];
                if (s1) return s1 && !0 !== s1 && (t = s1), i._signal(t, e);
            }
        }
        _getParentSignalHandler() {
            return this.cparent ? this.cparent._getSignalHandler() : null;
        }
        _getSignalHandler() {
            return this._signalProxy ? this.cparent ? this.cparent._getSignalHandler() : null : this;
        }
        get _signalProxy() {
            return !1;
        }
        fireAncestors(t, ...e) {
            if (!t.startsWith("$")) throw new Error("Ancestor event name must be prefixed by dollar sign.");
            const i = this._getParentSignalHandler();
            if (i) return i._doFireAncestors(t, e);
        }
        _doFireAncestors(t, e) {
            if (this._hasMethod(t)) return this.fire(t, ...e);
            {
                const i = this._getParentSignalHandler();
                if (i) return i._doFireAncestors(t, e);
            }
        }
        static collectSubComponents(t, e) {
            if (e.hasChildren()) {
                const i = e.__childList;
                for(let e1 = 0, s = i.length; e1 < s; e1++){
                    const s1 = i.getAt(e1);
                    s1.isComponent ? t.push(s1) : Component.collectSubComponents(t, s1);
                }
            }
        }
        static getComponent(t) {
            let e = t;
            for(; e && !e.isComponent;)e = e.parent;
            return e;
        }
        static getParent(t) {
            return Component.getComponent(t.parent);
        }
    }
    Component.prototype.isComponent = !0;
    class CoreQuadList {
        constructor(t){
            this.ctx = t, this.quadTextures = [], this.quadElements = [];
        }
        get length() {
            return this.quadTextures.length;
        }
        reset() {
            this.quadTextures = [], this.quadElements = [], this.dataLength = 0;
        }
        getElement(t) {
            return this.quadElements[t]._element;
        }
        getElementCore(t) {
            return this.quadElements[t];
        }
        getTexture(t) {
            return this.quadTextures[t];
        }
        getTextureWidth(t) {
            let e = this.quadTextures[t];
            return e.w ? e.w : this.quadElements[t]._displayedTextureSource.w;
        }
        getTextureHeight(t) {
            let e = this.quadTextures[t];
            return e.h ? e.h : this.quadElements[t]._displayedTextureSource.h;
        }
    }
    class WebGLCoreQuadList extends CoreQuadList {
        constructor(t){
            super(t);
            const e = t.stage.getOption("bufferMemory");
            this.dataLength = 0, this.data = new ArrayBuffer(e), this.floats = new Float32Array(this.data), this.uints = new Uint32Array(this.data);
        }
        getAttribsDataByteOffset(t) {
            return 80 * t;
        }
        getQuadContents() {
            let t = this.floats, e = this.uints, i = [];
            for(let s = 1; s <= this.length; s++){
                let r = "entry " + s + ": ";
                for(let i1 = 0; i1 < 4; i1++){
                    let n = 20 * s + 4 * i1;
                    r += t[n] + "," + t[n + 1] + ":" + t[n + 2] + "," + t[n + 3] + "[" + e[n + 4].toString(16) + "] ";
                }
                i.push(r);
            }
            return i;
        }
    }
    class CoreQuadOperation {
        constructor(t, e, i, s, r, n){
            this.ctx = t, this.shader = e, this.shaderOwner = i, this.renderTextureInfo = s, this.scissor = r, this.index = n, this.length = 0;
        }
        get quads() {
            return this.ctx.renderState.quads;
        }
        getTexture(t) {
            return this.quads.getTexture(this.index + t);
        }
        getElementCore(t) {
            return this.quads.getElementCore(this.index + t);
        }
        getElement(t) {
            return this.quads.getElement(this.index + t);
        }
        getElementWidth(t) {
            return this.getElement(t).renderWidth;
        }
        getElementHeight(t) {
            return this.getElement(t).renderHeight;
        }
        getTextureWidth(t) {
            return this.quads.getTextureWidth(this.index + t);
        }
        getTextureHeight(t) {
            return this.quads.getTextureHeight(this.index + t);
        }
        getRenderWidth() {
            return this.renderTextureInfo ? this.renderTextureInfo.w : this.ctx.stage.w;
        }
        getRenderHeight() {
            return this.renderTextureInfo ? this.renderTextureInfo.h : this.ctx.stage.h;
        }
    }
    class WebGLCoreQuadOperation extends CoreQuadOperation {
        constructor(t, e, i, s, r, n){
            super(t, e, i, s, r, n), this.extraAttribsDataByteOffset = 0;
        }
        getAttribsDataByteOffset(t) {
            return this.quads.getAttribsDataByteOffset(this.index + t);
        }
        getNormalRenderTextureCoords(t, e) {
            let i = this.shaderOwner.getRenderTextureCoords(t, e);
            return i[0] /= this.getRenderWidth(), i[1] /= this.getRenderHeight(), i[0] = 2 * i[0] - 1, i[1] = 1 - 2 * i[1], i;
        }
        getProjection() {
            return null === this.renderTextureInfo ? this.ctx.renderExec._projection : this.renderTextureInfo.nativeTexture.projection;
        }
    }
    class CoreRenderExecutor {
        constructor(t){
            this.ctx = t, this.renderState = t.renderState, this.gl = this.ctx.stage.gl;
        }
        destroy() {}
        _reset() {
            this._bindRenderTexture(null), this._setScissor(null), this._clearRenderTexture();
        }
        execute() {
            this._reset();
            let t = this.renderState.quadOperations, e = 0, i = t.length;
            for(; e < i;)this._processQuadOperation(t[e]), e++;
        }
        _processQuadOperation(t) {
            t.renderTextureInfo && t.renderTextureInfo.ignore || (this._setupQuadOperation(t), this._execQuadOperation(t));
        }
        _setupQuadOperation(t) {}
        _execQuadOperation(t) {
            let e = t.renderTextureInfo ? t.renderTextureInfo.nativeTexture : null;
            this._renderTexture !== e && this._bindRenderTexture(e), t.renderTextureInfo && !t.renderTextureInfo.cleared ? (this._setScissor(null), this._clearRenderTexture(), t.renderTextureInfo.cleared = !0, this._setScissor(t.scissor)) : this._setScissor(t.scissor), this._renderQuadOperation(t);
        }
        _renderQuadOperation(t) {}
        _bindRenderTexture(t) {
            this._renderTexture = t;
        }
        _clearRenderTexture(t) {}
        _setScissor(t) {}
    }
    class WebGLCoreRenderExecutor extends CoreRenderExecutor {
        constructor(t){
            super(t), this.gl = this.ctx.stage.gl, this.init();
        }
        init() {
            let t = this.gl;
            this._attribsBuffer = t.createBuffer();
            let e = Math.floor(this.renderState.quads.data.byteLength / 80), i = new Uint16Array(6 * e);
            for(let t1 = 0, s = 0; t1 < e; t1 += 6, s += 4)i[t1] = s, i[t1 + 1] = s + 1, i[t1 + 2] = s + 2, i[t1 + 3] = s, i[t1 + 4] = s + 2, i[t1 + 5] = s + 3;
            this._quadsBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this._quadsBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, i, t.STATIC_DRAW), this._projection = new Float32Array([
                2 / this.ctx.stage.coordsWidth,
                -2 / this.ctx.stage.coordsHeight
            ]);
        }
        destroy() {
            super.destroy(), this.gl.deleteBuffer(this._attribsBuffer), this.gl.deleteBuffer(this._quadsBuffer);
        }
        _reset() {
            super._reset();
            let t = this.gl;
            t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.enable(t.BLEND), t.disable(t.DEPTH_TEST), this._stopShaderProgram(), this._setupBuffers();
        }
        _setupBuffers() {
            let t = this.gl;
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this._quadsBuffer);
            let e = new Float32Array(this.renderState.quads.data, 0, this.renderState.quads.dataLength);
            t.bindBuffer(t.ARRAY_BUFFER, this._attribsBuffer), t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW);
        }
        _setupQuadOperation(t) {
            super._setupQuadOperation(t), this._useShaderProgram(t.shader, t);
        }
        _renderQuadOperation(t) {
            let e = t.shader;
            (t.length || t.shader.addEmpty()) && (e.beforeDraw(t), e.draw(t), e.afterDraw(t));
        }
        _useShaderProgram(t, e) {
            t.hasSameProgram(this._currentShaderProgram) || (this._currentShaderProgram && this._currentShaderProgram.stopProgram(), t.useProgram(), this._currentShaderProgram = t), t.setupUniforms(e);
        }
        _stopShaderProgram() {
            this._currentShaderProgram && (this._currentShaderProgram.stopProgram(), this._currentShaderProgram = null);
        }
        _bindRenderTexture(t) {
            super._bindRenderTexture(t);
            let e = this.gl;
            this._renderTexture ? (e.bindFramebuffer(e.FRAMEBUFFER, this._renderTexture.framebuffer), e.viewport(0, 0, this._renderTexture.w, this._renderTexture.h)) : (e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, this.ctx.stage.w, this.ctx.stage.h));
        }
        _clearRenderTexture() {
            super._clearRenderTexture();
            let t = this.gl;
            if (this._renderTexture) t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT);
            else {
                let e = this.ctx.stage.getClearColor();
                e && (t.clearColor(e[0] * e[3], e[1] * e[3], e[2] * e[3], e[3]), t.clear(t.COLOR_BUFFER_BIT));
            }
        }
        _setScissor(t) {
            if (super._setScissor(t), this._scissor === t) return;
            this._scissor = t;
            let e = this.gl;
            if (t) {
                e.enable(e.SCISSOR_TEST);
                let i = this.ctx.stage.getRenderPrecision(), s = t[1];
                null === this._renderTexture && (s = this.ctx.stage.h / i - (t[1] + t[3])), e.scissor(Math.round(t[0] * i), Math.round(s * i), Math.round(t[2] * i), Math.round(t[3] * i));
            } else e.disable(e.SCISSOR_TEST);
        }
    }
    class CoreRenderState {
        constructor(t){
            this.ctx = t, this.stage = t.stage, this.defaultShader = this.stage.renderer.getDefaultShader(t), this.renderer = t.stage.renderer, this.quads = this.renderer.createCoreQuadList(t);
        }
        reset() {
            this._renderTextureInfo = null, this._scissor = null, this._shader = null, this._shaderOwner = null, this._realShader = null, this._check = !1, this.quadOperations = [], this._texturizer = null, this._texturizerTemporary = !1, this._quadOperation = null, this.quads.reset(), this._temporaryTexturizers = [], this._isCachingTexturizer = !1;
        }
        get length() {
            return this.quads.quadTextures.length;
        }
        setShader(t, e) {
            this._shaderOwner === e && this._realShader === t || (this._realShader = t, t.useDefault() && (t = this.defaultShader), this._shader === t && this._shaderOwner === e || (this._shader = t, this._shaderOwner = e, this._check = !0));
        }
        get renderTextureInfo() {
            return this._renderTextureInfo;
        }
        setScissor(t) {
            this._scissor !== t && (this._scissor = t || null, this._check = !0);
        }
        getScissor() {
            return this._scissor;
        }
        setRenderTextureInfo(t) {
            this._renderTextureInfo !== t && (this._renderTextureInfo = t, this._scissor = null, this._check = !0);
        }
        setTexturizer(t, e = !1) {
            this._texturizer = t, this._cacheTexturizer = e;
        }
        set isCachingTexturizer(t) {
            this._isCachingTexturizer = t;
        }
        get isCachingTexturizer() {
            return this._isCachingTexturizer;
        }
        addQuad(t) {
            this._quadOperation ? this._check && this._hasChanges() && (this._finishQuadOperation(), this._check = !1) : this._createQuadOperation();
            let e = null;
            this._texturizer && (e = this._texturizer.getResultTexture(), this._cacheTexturizer || this._temporaryTexturizers.push(this._texturizer)), e || (e = t._displayedTextureSource.nativeTexture), this._renderTextureInfo && (this._shader === this.defaultShader && this._renderTextureInfo.empty ? (this._renderTextureInfo.nativeTexture = e, this._renderTextureInfo.offset = this.length) : this._renderTextureInfo.nativeTexture = null, this._renderTextureInfo.empty = !1), this.quads.quadTextures.push(e), this.quads.quadElements.push(t), this._quadOperation.length++, this.renderer.addQuad(this, this.quads, this.length - 1);
        }
        finishedRenderTexture() {
            this._renderTextureInfo.nativeTexture && (this._isRenderTextureReusable() || (this._renderTextureInfo.nativeTexture = null));
        }
        _isRenderTextureReusable() {
            const t = this._renderTextureInfo.offset;
            return this.quads.quadTextures[t].w === this._renderTextureInfo.w && this.quads.quadTextures[t].h === this._renderTextureInfo.h && this.renderer.isRenderTextureReusable(this, this._renderTextureInfo);
        }
        _hasChanges() {
            let t = this._quadOperation;
            return this._shader !== t.shader || this._shaderOwner !== t.shaderOwner || this._renderTextureInfo !== t.renderTextureInfo || this._scissor !== t.scissor && (this._scissor[0] !== t.scissor[0] || this._scissor[1] !== t.scissor[1] || this._scissor[2] !== t.scissor[2] || this._scissor[3] !== t.scissor[3]);
        }
        _finishQuadOperation(t = !0) {
            if (this._quadOperation) {
                if ((this._quadOperation.length || this._shader.addEmpty()) && (!this._quadOperation.scissor || this._quadOperation.scissor[2] > 0 && this._quadOperation.scissor[3] > 0) && this.quadOperations.push(this._quadOperation), this._temporaryTexturizers.length) {
                    for(let t1 = 0, e = this._temporaryTexturizers.length; t1 < e; t1++)this._temporaryTexturizers[t1].releaseRenderTexture();
                    this._temporaryTexturizers = [];
                }
                this._quadOperation = null;
            }
            t && this._createQuadOperation();
        }
        _createQuadOperation() {
            this._quadOperation = this.renderer.createCoreQuadOperation(this.ctx, this._shader, this._shaderOwner, this._renderTextureInfo, this._scissor, this.length), this._check = !1;
        }
        finish() {
            this._quadOperation && this._finishQuadOperation(!1), this.renderer.finishRenderState(this);
        }
    }
    class WebGLShaderProgram {
        constructor(t, e){
            this.vertexShaderSource = t, this.fragmentShaderSource = e, this._program = null, this._uniformLocations = new Map, this._attributeLocations = new Map, this._currentUniformValues = {};
        }
        compile(t) {
            if (this._program) return;
            this.gl = t, this._program = t.createProgram();
            let e = this._glCompile(t.VERTEX_SHADER, this.vertexShaderSource), i = this._glCompile(t.FRAGMENT_SHADER, this.fragmentShaderSource);
            t.attachShader(this._program, e), t.attachShader(this._program, i), t.linkProgram(this._program), t.getProgramParameter(this._program, t.LINK_STATUS) || (console.error("[Lightning] Error: Could not initialize shader."), console.error("[Lightning] gl.VALIDATE_STATUS", t.getProgramParameter(this._program, t.VALIDATE_STATUS)), console.error("[Lightning] gl.getError()", t.getError()), "" !== t.getProgramInfoLog(this._program) && console.warn("[Lightning] Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(this._program)), t.deleteProgram(this._program), this._program = null), t.deleteShader(e), t.deleteShader(i);
        }
        _glCompile(t, e) {
            let i = this.gl.createShader(t);
            if (this.gl.shaderSource(i, e), this.gl.compileShader(i), !this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS)) {
                console.error("[Lightning]", this.constructor.name, "Type: " + (t === this.gl.VERTEX_SHADER ? "vertex shader" : "fragment shader")), console.error("[Lightning]", this.gl.getShaderInfoLog(i));
                let s = 0;
                return console.error("[Lightning]", "========== source ==========\n" + e.split("\n").map((t)=>++s + ": " + t).join("\n")), null;
            }
            return i;
        }
        getUniformLocation(t) {
            let e = this._uniformLocations.get(t);
            return void 0 === e && (e = this.gl.getUniformLocation(this._program, t), this._uniformLocations.set(t, e)), e;
        }
        getAttribLocation(t) {
            let e = this._attributeLocations.get(t);
            return void 0 === e && (e = this.gl.getAttribLocation(this._program, t), this._attributeLocations.set(t, e)), e;
        }
        destroy() {
            this._program && (this.gl.deleteProgram(this._program), this._program = null);
        }
        get glProgram() {
            return this._program;
        }
        get compiled() {
            return !!this._program;
        }
        _valueEquals(t, e) {
            if (t.length && e.length) {
                for(let i = 0, s = t.length; i < s; i++)if (t[i] !== e[i]) return !1;
                return !0;
            }
            return t === e;
        }
        _valueClone(t) {
            return t.length ? t.slice(0) : t;
        }
        setUniformValue(t, e, i) {
            let s = this._currentUniformValues[t];
            if (void 0 === s || !this._valueEquals(s, e)) {
                let s1 = this._valueClone(e);
                this._currentUniformValues[t] = s1;
                let r = this.getUniformLocation(t);
                if (r) i === this.gl.uniformMatrix2fv || i === this.gl.uniformMatrix3fv || i === this.gl.uniformMatrix4fv ? i.call(this.gl, r, !1, s1) : i.call(this.gl, r, s1);
            }
        }
    }
    class WebGLShader extends Shader {
        constructor(t){
            super(t);
            const e = t.stage;
            this._program = e.renderer.shaderPrograms.get(this.constructor), this._program || (this._program = new WebGLShaderProgram(this.constructor.vertexShaderSource, this.constructor.fragmentShaderSource), e.renderer.shaderPrograms.set(this.constructor, this._program)), this.gl = e.gl;
        }
        get glProgram() {
            return this._program.glProgram;
        }
        _init() {
            this._initialized || (this.initialize(), this._initialized = !0);
        }
        initialize() {
            this._program.compile(this.gl);
        }
        get initialized() {
            return this._initialized;
        }
        _uniform(t) {
            return this._program.getUniformLocation(t);
        }
        _attrib(t) {
            return this._program.getAttribLocation(t);
        }
        _setUniform(t, e, i) {
            this._program.setUniformValue(t, e, i);
        }
        useProgram() {
            this._init(), this.gl.useProgram(this.glProgram), this.beforeUsage(), this.enableAttribs();
        }
        stopProgram() {
            this.afterUsage(), this.disableAttribs();
        }
        hasSameProgram(t) {
            return t && (t === this || t._program === this._program);
        }
        beforeUsage() {}
        afterUsage() {}
        enableAttribs() {}
        disableAttribs() {}
        getExtraAttribBytesPerVertex() {
            return 0;
        }
        getVertexAttribPointerOffset(t) {
            return t.extraAttribsDataByteOffset - 4 * t.index * this.getExtraAttribBytesPerVertex();
        }
        setExtraAttribsInBuffer(t) {}
        setupUniforms(t) {}
        _getProjection(t) {
            return t.getProjection();
        }
        getFlipY(t) {
            return this._getProjection(t)[1] < 0;
        }
        beforeDraw(t) {}
        draw(t) {}
        afterDraw(t) {}
        cleanup() {
            this._initialized = !1;
        }
    }
    class DefaultShader extends WebGLShader {
        enableAttribs() {
            let t = this.gl;
            t.vertexAttribPointer(this._attrib("aVertexPosition"), 2, t.FLOAT, !1, 20, 0), t.enableVertexAttribArray(this._attrib("aVertexPosition")), -1 !== this._attrib("aTextureCoord") && (t.vertexAttribPointer(this._attrib("aTextureCoord"), 2, t.FLOAT, !1, 20, 8), t.enableVertexAttribArray(this._attrib("aTextureCoord"))), -1 !== this._attrib("aColor") && (t.vertexAttribPointer(this._attrib("aColor"), 4, t.UNSIGNED_BYTE, !0, 20, 16), t.enableVertexAttribArray(this._attrib("aColor")));
        }
        disableAttribs() {
            let t = this.gl;
            t.disableVertexAttribArray(this._attrib("aVertexPosition")), -1 !== this._attrib("aTextureCoord") && t.disableVertexAttribArray(this._attrib("aTextureCoord")), -1 !== this._attrib("aColor") && t.disableVertexAttribArray(this._attrib("aColor"));
        }
        setupUniforms(t) {
            this._setUniform("projection", this._getProjection(t), this.gl.uniform2fv, !1);
        }
        draw(t) {
            let e = this.gl, i = t.length;
            if (i) {
                let s = t.getTexture(0), r = 0;
                for(let n = 0; n < i; n++){
                    let i1 = t.getTexture(n);
                    s !== i1 && (e.bindTexture(e.TEXTURE_2D, s), e.drawElements(e.TRIANGLES, 6 * (n - r), e.UNSIGNED_SHORT, 6 * (r + t.index) * 2), s = i1, r = n);
                }
                r < i && (e.bindTexture(e.TEXTURE_2D, s), e.drawElements(e.TRIANGLES, 6 * (i - r), e.UNSIGNED_SHORT, 6 * (r + t.index) * 2));
            }
        }
    }
    DefaultShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", DefaultShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    void main(void){\n        gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n    }\n";
    class Renderer {
        constructor(t){
            this.stage = t, this._defaultShader = void 0;
        }
        gc(t) {}
        destroy() {}
        getDefaultShader(t = this.stage.ctx) {
            return this._defaultShader || (this._defaultShader = this._createDefaultShader(t)), this._defaultShader;
        }
        _createDefaultShader(t) {}
        isValidShaderType(t) {
            return t.prototype instanceof this._getShaderBaseType();
        }
        createShader(t, e) {
            const i = e.type;
            if (this.isValidShaderType(i)) {
                const s = new i(t);
                return Base.patchObject(this, e), s;
            }
            {
                const e1 = this._getShaderAlternative(i);
                return e1 ? new e1(t) : (console.warn("[Lightning] Shader has no implementation for render target: " + i.name), this._createDefaultShader(t));
            }
        }
        _getShaderBaseType() {}
        _getShaderAlternative(t) {
            return this.getDefaultShader();
        }
        copyRenderTexture(t, e, i) {
            console.warn("[Lightning] copyRenderTexture not supported by renderer");
        }
    }
    class WebGLRenderer extends Renderer {
        constructor(t){
            super(t), this.shaderPrograms = new Map, this._compressedTextureExtensions = {
                astc: t.gl.getExtension("WEBGL_compressed_texture_astc"),
                etc1: t.gl.getExtension("WEBGL_compressed_texture_etc1"),
                s3tc: t.gl.getExtension("WEBGL_compressed_texture_s3tc"),
                pvrtc: t.gl.getExtension("WEBGL_compressed_texture_pvrtc")
            };
        }
        getCompressedTextureExtensions() {
            return this._compressedTextureExtensions;
        }
        destroy() {
            this.shaderPrograms.forEach((t)=>t.destroy());
        }
        _createDefaultShader(t) {
            return new DefaultShader(t);
        }
        _getShaderBaseType() {
            return WebGLShader;
        }
        _getShaderAlternative(t) {
            return t.getWebGL && t.getWebGL();
        }
        createCoreQuadList(t) {
            return new WebGLCoreQuadList(t);
        }
        createCoreQuadOperation(t, e, i, s, r, n) {
            return new WebGLCoreQuadOperation(t, e, i, s, r, n);
        }
        createCoreRenderExecutor(t) {
            return new WebGLCoreRenderExecutor(t);
        }
        createCoreRenderState(t) {
            return new CoreRenderState(t);
        }
        createRenderTexture(t, e, i, s) {
            const r = this.stage.gl, n = r.createTexture();
            return r.bindTexture(r.TEXTURE_2D, n), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, i, s, 0, r.RGBA, r.UNSIGNED_BYTE, null), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), n.params = {}, n.params[r.TEXTURE_MAG_FILTER] = r.LINEAR, n.params[r.TEXTURE_MIN_FILTER] = r.LINEAR, n.params[r.TEXTURE_WRAP_S] = r.CLAMP_TO_EDGE, n.params[r.TEXTURE_WRAP_T] = r.CLAMP_TO_EDGE, n.options = {
                format: r.RGBA,
                internalFormat: r.RGBA,
                type: r.UNSIGNED_BYTE
            }, n.framebuffer = r.createFramebuffer(), n.projection = new Float32Array([
                2 / t,
                2 / e
            ]), r.bindFramebuffer(r.FRAMEBUFFER, n.framebuffer), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, n, 0), n;
        }
        freeRenderTexture(t) {
            let e = this.stage.gl;
            e.deleteFramebuffer(t.framebuffer), e.deleteTexture(t);
        }
        _getBytesPerPixel(t, e) {
            const i = this.stage.gl;
            if (t === i.RGBA) switch(e){
                case i.UNSIGNED_BYTE:
                    return 4;
                case i.UNSIGNED_SHORT_4_4_4_4:
                case i.UNSIGNED_SHORT_5_5_5_1:
                    return 2;
                default:
                    throw new Error("Invalid type specified for GL_RGBA format");
            }
            else {
                if (t !== i.RGB) throw new Error("Invalid format specified in call to _getBytesPerPixel()");
                switch(e){
                    case i.UNSIGNED_BYTE:
                        return 3;
                    case i.UNSIGNED_BYTE_5_6_5:
                        return 2;
                    default:
                        throw new Error("Invalid type specified for GL_RGB format");
                }
            }
        }
        uploadTextureSource(t, e) {
            const i = this.stage.gl, s = e.source;
            let r = !1;
            e.renderInfo && (r = e.renderInfo.compressed || !1);
            const n = {
                premultiplyAlpha: !0,
                hasAlpha: !0
            };
            e && e.hasOwnProperty("premultiplyAlpha") && (n.premultiplyAlpha = e.premultiplyAlpha), e && e.hasOwnProperty("flipBlueRed") && (n.flipBlueRed = e.flipBlueRed), e && e.hasOwnProperty("hasAlpha") && (n.hasAlpha = e.hasAlpha), n.hasAlpha || (n.premultiplyAlpha = !1), n.texParams = e.texParams || {}, n.texOptions = e.texOptions || {};
            let o = i.createTexture();
            i.bindTexture(i.TEXTURE_2D, o), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), Utils.isNode && i.pixelStorei(i.UNPACK_FLIP_BLUE_RED, !!n.flipBlueRed);
            const a = n.texParams;
            if (a[i.TEXTURE_MAG_FILTER] || (a[i.TEXTURE_MAG_FILTER] = i.LINEAR), a[i.TEXTURE_MIN_FILTER] || (a[i.TEXTURE_MIN_FILTER] = i.LINEAR), a[i.TEXTURE_WRAP_S] || (a[i.TEXTURE_WRAP_S] = i.CLAMP_TO_EDGE), a[i.TEXTURE_WRAP_T] || (a[i.TEXTURE_WRAP_T] = i.CLAMP_TO_EDGE), Object.keys(a).forEach((t)=>{
                const e = a[t];
                i.texParameteri(i.TEXTURE_2D, parseInt(t), e);
            }), r) return this.stage.platform.uploadCompressedGlTexture(i, t, s), o;
            const h = n.texOptions;
            return h.format = h.format || (n.hasAlpha ? i.RGBA : i.RGB), h.type = h.type || i.UNSIGNED_BYTE, h.internalFormat = h.internalFormat || h.format, e && e.imageRef && (h.imageRef = e.imageRef), this.stage.platform.uploadGlTexture(i, t, s, h), o.params = Utils.cloneObjShallow(a), o.options = Utils.cloneObjShallow(h), o.bytesPerPixel = this._getBytesPerPixel(h.format, h.type), o;
        }
        freeTextureSource(t) {
            this.stage.gl.deleteTexture(t.nativeTexture);
        }
        addQuad(t, e, i) {
            let s = 20 * i;
            const r = e.quadElements[i];
            let n = r._renderContext, o = t.quads.floats, a = t.quads.uints;
            const h = StageUtils.mergeColorAlpha;
            if (0 !== n.tb || 0 !== n.tc) o[s++] = n.px, o[s++] = n.py, o[s++] = r._ulx, o[s++] = r._uly, a[s++] = h(r._colorUl, n.alpha), o[s++] = n.px + r._w * n.ta, o[s++] = n.py + r._w * n.tc, o[s++] = r._brx, o[s++] = r._uly, a[s++] = h(r._colorUr, n.alpha), o[s++] = n.px + r._w * n.ta + r._h * n.tb, o[s++] = n.py + r._w * n.tc + r._h * n.td, o[s++] = r._brx, o[s++] = r._bry, a[s++] = h(r._colorBr, n.alpha), o[s++] = n.px + r._h * n.tb, o[s++] = n.py + r._h * n.td, o[s++] = r._ulx, o[s++] = r._bry, a[s] = h(r._colorBl, n.alpha);
            else {
                let t1 = n.px + r._w * n.ta, e1 = n.py + r._h * n.td;
                o[s++] = n.px, o[s++] = n.py, o[s++] = r._ulx, o[s++] = r._uly, a[s++] = h(r._colorUl, n.alpha), o[s++] = t1, o[s++] = n.py, o[s++] = r._brx, o[s++] = r._uly, a[s++] = h(r._colorUr, n.alpha), o[s++] = t1, o[s++] = e1, o[s++] = r._brx, o[s++] = r._bry, a[s++] = h(r._colorBr, n.alpha), o[s++] = n.px, o[s++] = e1, o[s++] = r._ulx, o[s++] = r._bry, a[s] = h(r._colorBl, n.alpha);
            }
        }
        isRenderTextureReusable(t, e) {
            let i = 80 * t._renderTextureInfo.offset / 4, s = t.quads.floats, r = t.quads.uints;
            return 0 === s[i] && 0 === s[i + 1] && 0 === s[i + 2] && 0 === s[i + 3] && 4294967295 === r[i + 4] && s[i + 5] === e.w && 0 === s[i + 6] && 1 === s[i + 7] && 0 === s[i + 8] && 4294967295 === r[i + 9] && s[i + 10] === e.w && s[i + 11] === e.h && 1 === s[i + 12] && 1 === s[i + 13] && 4294967295 === r[i + 14] && 0 === s[i + 15] && s[i + 16] === e.h && 0 === s[i + 17] && 1 === s[i + 18] && 4294967295 === r[i + 19];
        }
        finishRenderState(t) {
            let e = 80 * t.length;
            for(let i = 0, s = t.quadOperations.length; i < s; i++){
                t.quadOperations[i].extraAttribsDataByteOffset = e;
                let s1 = 4 * t.quadOperations[i].shader.getExtraAttribBytesPerVertex() * t.quadOperations[i].length;
                e += s1, s1 && t.quadOperations[i].shader.setExtraAttribsInBuffer(t.quadOperations[i], t.quads);
            }
            t.quads.dataLength = e;
        }
        copyRenderTexture(t, e, i) {
            const s = this.stage.gl;
            s.bindTexture(s.TEXTURE_2D, e), s.bindFramebuffer(s.FRAMEBUFFER, t.framebuffer);
            const r = t.precision;
            s.copyTexSubImage2D(s.TEXTURE_2D, 0, r * (i.sx || 0), r * (i.sy || 0), r * (i.x || 0), r * (i.y || 0), r * (i.w || t.ow), r * (i.h || t.oh));
        }
    }
    class C2dCoreQuadList extends CoreQuadList {
        constructor(t){
            super(t), this.renderContexts = [], this.modes = [];
        }
        setRenderContext(t, e) {
            this.renderContexts[t] = e;
        }
        setSimpleTc(t, e) {
            e ? this.modes[t] |= 1 : this.modes[t] -= 1 & this.modes[t];
        }
        setWhite(t, e) {
            e ? this.modes[t] |= 2 : this.modes[t] -= 2 & this.modes[t];
        }
        getRenderContext(t) {
            return this.renderContexts[t];
        }
        getSimpleTc(t) {
            return 1 & this.modes[t];
        }
        getWhite(t) {
            return 2 & this.modes[t];
        }
    }
    class C2dCoreQuadOperation extends CoreQuadOperation {
        getRenderContext(t) {
            return this.quads.getRenderContext(this.index + t);
        }
        getSimpleTc(t) {
            return this.quads.getSimpleTc(this.index + t);
        }
        getWhite(t) {
            return this.quads.getWhite(this.index + t);
        }
    }
    class C2dCoreRenderExecutor extends CoreRenderExecutor {
        init() {
            this._mainRenderTexture = this.ctx.stage.getCanvas();
        }
        _renderQuadOperation(t) {
            let e = t.shader;
            if (t.length || t.shader.addEmpty()) {
                const i = this._renderTexture || this._mainRenderTexture;
                e.beforeDraw(t, i), e.draw(t, i), e.afterDraw(t, i);
            }
        }
        _clearRenderTexture() {
            const t = this._getContext();
            let e = [
                0,
                0,
                0,
                0
            ];
            this._mainRenderTexture.ctx === t && (e = this.ctx.stage.getClearColor());
            const i = t.canvas;
            t.setTransform(1, 0, 0, 1, 0, 0), e[0] || e[1] || e[2] || e[3] ? (t.fillStyle = StageUtils.getRgbaStringFromArray(e), t.globalCompositeOperation = "copy", t.beginPath(), t.rect(0, 0, i.width, i.height), t.closePath(), t.fill(), t.globalCompositeOperation = "source-over") : t.clearRect(0, 0, i.width, i.height);
        }
        _getContext() {
            return this._renderTexture ? this._renderTexture.ctx : this._mainRenderTexture.ctx;
        }
        _restoreContext() {
            const t = this._getContext();
            t.restore(), t.save(), t._scissor = null;
        }
        _setScissor(t) {
            const e = this._getContext();
            if (!C2dCoreRenderExecutor._equalScissorAreas(e.canvas, e._scissor, t)) {
                this._restoreContext();
                let i = this.ctx.stage.getRenderPrecision();
                t && (e.beginPath(), e.rect(Math.round(t[0] * i), Math.round(t[1] * i), Math.round(t[2] * i), Math.round(t[3] * i)), e.closePath(), e.clip()), e._scissor = t;
            }
        }
        static _equalScissorAreas(t, e, i) {
            return e || (e = [
                0,
                0,
                t.width,
                t.height
            ]), i || (i = [
                0,
                0,
                t.width,
                t.height
            ]), Utils.equalValues(e, i);
        }
    }
    class C2dShader extends Shader {
        beforeDraw(t) {}
        draw(t) {}
        afterDraw(t) {}
    }
    class DefaultShader$1 extends C2dShader {
        constructor(t){
            super(t), this._rectangleTexture = t.stage.rectangleTexture.source.nativeTexture, this._tintManager = this.ctx.stage.renderer.tintManager;
        }
        draw(t, e) {
            const i = e.ctx;
            let s = t.length;
            for(let r = 0; r < s; r++){
                const s1 = t.getTexture(r), n = t.getElementCore(r), o = t.getRenderContext(r), a = t.getWhite(r), h = t.getSimpleTc(r), l = this.ctx.stage.getRenderPrecision();
                i.setTransform(o.ta * l, o.tc * l, o.tb * l, o.td * l, o.px * l, o.py * l);
                const _ = s1 === this._rectangleTexture, u = {
                    operation: t,
                    target: e,
                    index: r,
                    rect: _
                };
                if (_) a ? i.fillStyle = "white" : this._setColorGradient(i, n), i.globalAlpha = o.alpha, this._beforeDrawEl(u), i.fillRect(0, 0, n.w, n.h), this._afterDrawEl(u), i.globalAlpha = 1;
                else {
                    i.globalAlpha = o.alpha, this._beforeDrawEl(u);
                    const t1 = h ? 0 : n._ulx * s1.w, e1 = h ? 0 : n._uly * s1.h, r1 = (h ? 1 : n._brx - n._ulx) * s1.w, l1 = (h ? 1 : n._bry - n._uly) * s1.h;
                    if (!a) {
                        let o1 = n._colorUl;
                        n._colorUl === n._colorUr && n._colorUr === n._colorBl && n._colorBr === n._colorBl || (o1 = StageUtils.mergeMultiColorsEqual([
                            n._colorUl,
                            n._colorUr,
                            n._colorBl,
                            n._colorBr
                        ]));
                        const a1 = (o1 / 16777216 | 0) / 255;
                        i.globalAlpha *= a1;
                        const h1 = 16777215 & o1, _1 = this._tintManager.getTintTexture(s1, h1);
                        i.fillStyle = "white", i.drawImage(_1, t1, e1, r1, l1, 0, 0, n.w, n.h);
                    } else i.fillStyle = "white", i.drawImage(s1, t1, e1, r1, l1, 0, 0, n.w, n.h);
                    this._afterDrawEl(u), i.globalAlpha = 1;
                }
            }
        }
        _setColorGradient(t, e, i = e.w, s = e.h, r = !0) {
            let n, o = e._colorUl;
            e._colorUl === e._colorUr ? e._colorBl === e._colorBr && (e._colorUl === e.colorBl || (n = t.createLinearGradient(0, 0, 0, s), r ? (n.addColorStop(0, StageUtils.getRgbaString(e._colorUl)), n.addColorStop(1, StageUtils.getRgbaString(e._colorBl))) : (n.addColorStop(0, StageUtils.getRgbString(e._colorUl)), n.addColorStop(1, StageUtils.getRgbString(e._colorBl))))) : e._colorUl === e._colorBl && e._colorUr === e._colorBr && (n = t.createLinearGradient(0, 0, i, 0), r ? (n.addColorStop(0, StageUtils.getRgbaString(e._colorUl)), n.addColorStop(1, StageUtils.getRgbaString(e._colorBr))) : (n.addColorStop(0, StageUtils.getRgbString(e._colorUl)), n.addColorStop(1, StageUtils.getRgbString(e._colorBr)))), t.fillStyle = n || (r ? StageUtils.getRgbaString(o) : StageUtils.getRgbString(o));
        }
        _beforeDrawEl(t) {}
        _afterDrawEl(t) {}
    }
    class C2dTextureTintManager {
        constructor(t){
            this.stage = t, this._usedMemory = 0, this._cachedNativeTextures = new Set;
        }
        destroy() {
            this.gc(!0);
        }
        _addMemoryUsage(t) {
            this._usedMemory += t, this.stage.addMemoryUsage(t);
        }
        delete(t) {
            if (this._hasCache(t)) {
                const e = this._getCache(t), i = e.memoryUsage;
                e.clear(), this._cachedNativeTextures.delete(t), this._addMemoryUsage(e.memoryUsage - i);
            }
        }
        getTintTexture(t, e) {
            const i = this.stage.frameCounter;
            this._cachedNativeTextures.add(t);
            const s = this._getCache(t), r = s.get(e);
            if (r.lf = i, r.tx) return t.update > r.u && this._tintTexture(r.tx, t, e), r.tx;
            {
                const r1 = s.memoryUsage;
                let n = s.reuseTexture(i);
                n ? n.ctx.clearRect(0, 0, n.width, n.height) : (n = document.createElement("canvas"), n.width = t.w, n.height = t.h, n.ctx = n.getContext("2d")), this._tintTexture(n, t, e), s.set(e, n, i);
                const o = s.memoryUsage;
                return o !== r1 && this._addMemoryUsage(o - r1), n;
            }
        }
        _tintTexture(t, e, i) {
            let s = i.toString(16);
            for(; s.length < 6;)s = "0" + s;
            t.ctx.fillStyle = "#" + s, t.ctx.globalCompositeOperation = "copy", t.ctx.fillRect(0, 0, e.w, e.h), t.ctx.globalCompositeOperation = "multiply", t.ctx.drawImage(e, 0, 0, e.w, e.h, 0, 0, t.width, t.height), t.ctx.globalCompositeOperation = "destination-in", t.ctx.drawImage(e, 0, 0, e.w, e.h, 0, 0, t.width, t.height);
        }
        _hasCache(t) {
            return !!t._tintCache;
        }
        _getCache(t) {
            return t._tintCache || (t._tintCache = new C2dTintCache(t)), t._tintCache;
        }
        gc(t = !1) {
            const e = this.stage.frameCounter;
            let i = 0;
            this._cachedNativeTextures.forEach((s)=>{
                const r = this._getCache(s);
                if (t) i += r.memoryUsage, r.clear();
                else {
                    const t1 = r.memoryUsage;
                    r.cleanup(e), r.releaseBlancoTextures(), i += r.memoryUsage - t1;
                }
            }), t && this._cachedNativeTextures.clear(), i && this._addMemoryUsage(i);
        }
    }
    class C2dTintCache {
        constructor(t){
            this._tx = t, this._colors = new Map, this._blancoTextures = null, this._lastCleanupFrame = 0, this._memTextures = 0;
        }
        get memoryUsage() {
            return this._memTextures * this._tx.w * this._tx.h;
        }
        releaseBlancoTextures() {
            this._memTextures -= this._blancoTextures.length, this._blancoTextures = [];
        }
        clear() {
            this._blancoTextures = null, this._colors.clear(), this._memTextures = 0;
        }
        get(t) {
            let e = this._colors.get(t);
            return e || (e = {
                lf: -1,
                tx: void 0,
                u: -1
            }, this._colors.set(t, e)), e;
        }
        set(t, e, i) {
            const s = this.get(t);
            s.lf = i, s.tx = e, s.u = i, this._memTextures++;
        }
        cleanup(t) {
            this._lastCleanupFrame !== t && (this._blancoTextures = [], this._colors.forEach((e, i)=>{
                e.lf < t - 1 && (e.tx && this._blancoTextures.push(e.tx), this._colors.delete(i));
            }), this._lastCleanupFrame = t);
        }
        reuseTexture(t) {
            if (this.cleanup(t), this._blancoTextures && this._blancoTextures.length) return this._memTextures--, this._blancoTextures.pop();
        }
    }
    class C2dRenderer extends Renderer {
        constructor(t){
            super(t), this.tintManager = new C2dTextureTintManager(t), this.setupC2d(this.stage.c2d.canvas);
        }
        destroy() {
            this.tintManager.destroy();
        }
        _createDefaultShader(t) {
            return new DefaultShader$1(t);
        }
        _getShaderBaseType() {
            return C2dShader;
        }
        _getShaderAlternative(t) {
            return t.getC2d && t.getC2d();
        }
        createCoreQuadList(t) {
            return new C2dCoreQuadList(t);
        }
        createCoreQuadOperation(t, e, i, s, r, n) {
            return new C2dCoreQuadOperation(t, e, i, s, r, n);
        }
        createCoreRenderExecutor(t) {
            return new C2dCoreRenderExecutor(t);
        }
        createCoreRenderState(t) {
            return new CoreRenderState(t);
        }
        createRenderTexture(t, e, i, s) {
            const r = document.createElement("canvas");
            return r.width = i, r.height = s, this.setupC2d(r), r;
        }
        freeRenderTexture(t) {
            this.tintManager.delete(t);
        }
        gc(t) {
            this.tintManager.gc(t);
        }
        uploadTextureSource(t, e) {
            if (e.source.buffer) {
                const t1 = document.createElement("canvas");
                t1.width = e.w, t1.height = e.h;
                const i = new ImageData(new Uint8ClampedArray(e.source.buffer), e.w, e.h);
                return t1.getContext("2d").putImageData(i, 0, 0), t1;
            }
            return e.source;
        }
        freeTextureSource(t) {
            this.tintManager.delete(t.nativeTexture);
        }
        addQuad(t, e, i) {
            const s = e.quadElements[i];
            e.setRenderContext(i, s._renderContext), e.setWhite(i, s.isWhite()), e.setSimpleTc(i, s.hasSimpleTexCoords());
        }
        isRenderTextureReusable(t, e) {
            return !1;
        }
        finishRenderState(t) {}
        setupC2d(t) {
            const e = t.getContext("2d");
            t.ctx = e, e._scissor = null, t.ctx.save();
        }
    }
    class SparkShader extends WebGLShader {
        enableAttribs() {
            let t = this.gl;
            t.vertexAttribPointer(this._attrib("aVertexPosition"), 2, t.FLOAT, !1, 20, 0), t.enableVertexAttribArray(this._attrib("aVertexPosition")), -1 !== this._attrib("aTextureCoord") && (t.vertexAttribPointer(this._attrib("aTextureCoord"), 2, t.FLOAT, !1, 20, 8), t.enableVertexAttribArray(this._attrib("aTextureCoord"))), -1 !== this._attrib("aColor") && (t.vertexAttribPointer(this._attrib("aColor"), 4, t.UNSIGNED_BYTE, !0, 20, 16), t.enableVertexAttribArray(this._attrib("aColor")));
        }
        disableAttribs() {
            let t = this.gl;
            t.disableVertexAttribArray(this._attrib("aVertexPosition")), -1 !== this._attrib("aTextureCoord") && t.disableVertexAttribArray(this._attrib("aTextureCoord")), -1 !== this._attrib("aColor") && t.disableVertexAttribArray(this._attrib("aColor"));
        }
        setupUniforms(t) {
            this._setUniform("projection", this._getProjection(t), this.gl.uniform2fv, !1);
        }
        draw(t) {
            let e = this.gl, i = t.length;
            if (i) {
                let s = t.getTexture(0), r = 0;
                for(let n = 0; n < i; n++){
                    let i1 = t.getTexture(n);
                    if (s !== i1) {
                        if (s.options && s.options.imageRef) {
                            let i2 = n > 0 ? n - 1 : n;
                            const r1 = this.ctx.stage.getOption("precision");
                            let o = t.getElementCore(i2);
                            this.ctx.stage.platform.paint(e, s.options.imageRef, o._worldContext.px * r1, o._worldContext.py * r1, o._colorUl, o);
                        } else e.bindTexture(e.TEXTURE_2D, s), e.drawElements(e.TRIANGLES, 6 * (n - r), e.UNSIGNED_SHORT, 6 * (r + t.index) * 2);
                        s = i1, r = n;
                    }
                }
                if (r < i) {
                    if (s.options && s.options.imageRef) {
                        const i3 = this.ctx.stage.getOption("precision");
                        let n1 = t.getElementCore(r);
                        this.ctx.stage.platform.paint(e, s.options.imageRef, n1._worldContext.px * i3, n1._worldContext.py * i3, n1._colorUl, n1);
                    } else e.bindTexture(e.TEXTURE_2D, s), e.drawElements(e.TRIANGLES, 6 * (i - r), e.UNSIGNED_SHORT, 6 * (r + t.index) * 2);
                }
            }
        }
    }
    SparkShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", SparkShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    void main(void){\n        gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n    }\n";
    class SparkRenderer extends WebGLRenderer {
        constructor(t){
            super(t);
        }
        _createDefaultShader(t) {
            return new SparkShader(t);
        }
        createCoreRenderExecutor(t) {
            global.beginDrawing();
            let e = super.createCoreRenderExecutor(t);
            return global.endDrawing(), e;
        }
    }
    class ImageWorker {
        constructor(t = {}){
            this._items = new Map, this._id = 0, this._initWorker();
        }
        destroy() {
            this._worker && this._worker.terminate();
        }
        _initWorker() {
            const t = `(${createWorker.toString()})()`, e = new Blob([
                t.replace('"use strict";', "")
            ]), i = (window.URL ? URL : webkitURL).createObjectURL(e, {
                type: "application/javascript; charset=utf-8"
            });
            this._worker = new Worker(i), this._worker.postMessage({
                type: "config",
                config: {
                    path: window.location.href,
                    protocol: window.location.protocol
                }
            }), this._worker.onmessage = (t)=>{
                if (t.data && t.data.id) {
                    const e = t.data.id, i = this._items.get(e);
                    i && ("data" == t.data.type ? this.finish(i, t.data.info) : this.error(i, t.data.info));
                }
            };
        }
        create(t) {
            const e = ++this._id, i = new ImageWorkerImage(this, e, t);
            return this._items.set(e, i), this._worker.postMessage({
                type: "add",
                id: e,
                src: t
            }), i;
        }
        cancel(t) {
            this._worker.postMessage({
                type: "cancel",
                id: t.id
            }), this._items.delete(t.id);
        }
        error(t, e) {
            t.error(e), this._items.delete(t.id);
        }
        finish(t, e) {
            t.load(e), this._items.delete(t.id);
        }
    }
    class ImageWorkerImage {
        constructor(t, e, i){
            this._manager = t, this._id = e, this._src = i, this._onError = null, this._onLoad = null;
        }
        get id() {
            return this._id;
        }
        get src() {
            return this._src;
        }
        set onError(t) {
            this._onError = t;
        }
        set onLoad(t) {
            this._onLoad = t;
        }
        cancel() {
            this._manager.cancel(this);
        }
        load(t) {
            this._onLoad && this._onLoad(t);
        }
        error(t) {
            this._onError && this._onError(t);
        }
    }
    const createWorker = function() {
        function ImageWorkerServer() {
            this.items = new Map;
            var t = this;
            onmessage = function(e) {
                t._receiveMessage(e);
            };
        }
        function ImageWorkerServerItem(t, e) {
            this._onError = void 0, this._onFinish = void 0, this._id = t, this._src = e, this._xhr = void 0, this._mimeType = void 0, this._canceled = !1;
        }
        ImageWorkerServer.isPathAbsolute = function(t) {
            return /^(?:\/|[a-z]+:\/\/)/.test(t) || "data:" == t.substr(0, 5);
        }, ImageWorkerServer.prototype._receiveMessage = function(t) {
            if ("config" === t.data.type) {
                this.config = t.data.config;
                var e = this.config.path;
                /#.*?\//.test(e) && (e = e.replace(/#.*$/, ""));
                var i = e.split("/");
                i.pop(), this._relativeBase = i.join("/") + "/";
            } else "add" === t.data.type ? this.add(t.data.id, t.data.src) : "cancel" === t.data.type && this.cancel(t.data.id);
        }, ImageWorkerServer.prototype.add = function(t, e) {
            ImageWorkerServer.isPathAbsolute(e) || (e = this._relativeBase + e), "//" === e.substr(0, 2) && (e = this.config.protocol + e);
            var i = new ImageWorkerServerItem(t, e), s = this;
            i.onFinish = function(t) {
                s.finish(i, t);
            }, i.onError = function(t) {
                s.error(i, t);
            }, this.items.set(t, i), i.start();
        }, ImageWorkerServer.prototype.cancel = function(t) {
            var e = this.items.get(t);
            e && (e.cancel(), this.items.delete(t));
        }, ImageWorkerServer.prototype.finish = function(t, { imageBitmap: e , hasAlphaChannel: i  }) {
            postMessage({
                type: "data",
                id: t.id,
                info: {
                    imageBitmap: e,
                    hasAlphaChannel: i
                }
            }, [
                e
            ]), this.items.delete(t.id);
        }, ImageWorkerServer.prototype.error = function(t, { type: e , message: i  }) {
            postMessage({
                type: "error",
                id: t.id,
                info: {
                    type: e,
                    message: i
                }
            }), this.items.delete(t.id);
        }, ImageWorkerServer.isWPEBrowser = function() {
            return -1 !== navigator.userAgent.indexOf("WPE");
        }, Object.defineProperty(ImageWorkerServerItem.prototype, "id", {
            get: function() {
                return this._id;
            }
        }), Object.defineProperty(ImageWorkerServerItem.prototype, "onFinish", {
            get: function() {
                return this._onFinish;
            },
            set: function(t) {
                this._onFinish = t;
            }
        }), Object.defineProperty(ImageWorkerServerItem.prototype, "onError", {
            get: function() {
                return this._onError;
            },
            set: function(t) {
                this._onError = t;
            }
        }), ImageWorkerServerItem.prototype.start = function() {
            this._xhr = new XMLHttpRequest, this._xhr.open("GET", this._src, !0), this._xhr.responseType = "blob";
            var t = this;
            this._xhr.onerror = function(e) {
                t.error({
                    type: "connection",
                    message: "Connection error"
                });
            }, this._xhr.onload = function(e) {
                var i = t._xhr.response;
                t._mimeType = i.type, t._createImageBitmap(i);
            }, this._xhr.send();
        }, ImageWorkerServerItem.prototype._createImageBitmap = function(t) {
            var e = this;
            createImageBitmap(t, {
                premultiplyAlpha: "premultiply",
                colorSpaceConversion: "none",
                imageOrientation: "none"
            }).then(function(t) {
                e.finish({
                    imageBitmap: t,
                    hasAlphaChannel: e._hasAlphaChannel()
                });
            }).catch(function(t) {
                e.error({
                    type: "parse",
                    message: "Error parsing image data"
                });
            });
        }, ImageWorkerServerItem.prototype._hasAlphaChannel = function() {
            return !!ImageWorkerServer.isWPEBrowser() || -1 !== this._mimeType.indexOf("image/png");
        }, ImageWorkerServerItem.prototype.cancel = function() {
            this._canceled || (this._xhr && this._xhr.abort(), this._canceled = !0);
        }, ImageWorkerServerItem.prototype.error = function(t, e) {
            !this._canceled && this._onError && this._onError({
                type: t,
                message: e
            });
        }, ImageWorkerServerItem.prototype.finish = function(t) {
            !this._canceled && this._onFinish && this._onFinish(t);
        };
        new ImageWorkerServer;
    };
    class WebPlatform {
        init(t) {
            this.stage = t, this._looping = !1, this._awaitingLoop = !1, this._loopHandler = null, this._idleLoopCounter = 0, this._idleLoopDelay = 60, this.stage.getOption("useImageWorker") && (window.createImageBitmap && window.Worker ? this._imageWorker = new ImageWorker : console.warn("[Lightning] Can't use image worker because browser does not have createImageBitmap and Web Worker support")), this._registerVisibilityChangeHandler();
        }
        destroy() {
            this._imageWorker && this._imageWorker.destroy(), this._removeKeyHandler(), this._removeClickHandler(), this._removeHoverHandler(), this._removeScrollWheelHandler(), this._removeVisibilityChangeHandler();
        }
        startLoop() {
            this._looping = !0, this._awaitingLoop || this.loop();
        }
        stopLoop() {
            this._looping = !1;
        }
        switchLoop() {
            this._idleLoopCounter < this._idleLoopDelay ? this._idleLoopCounter++ : this.stage.ctx.hasRenderUpdates() ? this._idleLoopCounter = 0 : (this.stopLoop(), this._loopHandler = setInterval(()=>{
                this.stage.updateFrame(), this.stage.idleFrame(), this.stage.ctx.hasRenderUpdates() && (clearInterval(this._loopHandler), this.startLoop());
            }, 1e3 / 60));
        }
        loop() {
            let t = this, lp = function() {
                t._awaitingLoop = !1, t._looping && (t.stage.updateFrame(), t.stage.getOption("pauseRafLoopOnIdle") && t.switchLoop(), t.stage.renderFrame(), requestAnimationFrame(lp), t._awaitingLoop = !0);
            };
            requestAnimationFrame(lp);
        }
        uploadCompressedGlTexture(t, e, i, s) {
            const r = i.pvr ? i.mipmaps[0] : new DataView(i.mipmaps[0]);
            t.compressedTexImage2D(t.TEXTURE_2D, 0, i.glInternalFormat, i.pixelWidth, i.pixelHeight, 0, r), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
        }
        uploadGlTexture(t, e, i, s) {
            if (i instanceof ImageData || i instanceof HTMLImageElement || i instanceof HTMLVideoElement || window.ImageBitmap && i instanceof ImageBitmap) t.texImage2D(t.TEXTURE_2D, 0, s.internalFormat, s.format, s.type, i);
            else if (i instanceof HTMLCanvasElement) {
                if (Utils.isZiggo || this.stage.getOption("forceTxCanvasSource")) t.texImage2D(t.TEXTURE_2D, 0, s.internalFormat, s.format, s.type, i);
                else if (i.width > 0 && i.height > 0) {
                    const e1 = i.getContext("2d");
                    t.texImage2D(t.TEXTURE_2D, 0, s.internalFormat, s.format, s.type, e1.getImageData(0, 0, i.width, i.height));
                }
            } else t.texImage2D(t.TEXTURE_2D, 0, s.internalFormat, e.w, e.h, 0, s.format, s.type, i);
        }
        handleKtxLoad(t, e) {
            var i = this;
            return function() {
                var s = this.response, r = new DataView(s);
                3632701469 !== r.getUint32(0) + r.getUint32(4) + r.getUint32(8) && t("Parsing failed: identifier ktx mismatch:", e);
                var n = 16909060 === r.getUint32(12), o = {
                    glType: r.getUint32(16, n),
                    glTypeSize: r.getUint32(20, n),
                    glFormat: r.getUint32(24, n),
                    glInternalFormat: r.getUint32(28, n),
                    glBaseInternalFormat: r.getUint32(32, n),
                    pixelWidth: r.getUint32(36, n),
                    pixelHeight: r.getUint32(40, n),
                    pixelDepth: r.getUint32(44, n),
                    numberOfArrayElements: r.getUint32(48, n),
                    numberOfFaces: r.getUint32(52, n),
                    numberOfMipmapLevels: r.getUint32(56, n),
                    bytesOfKeyValueData: r.getUint32(60, n),
                    kvps: [],
                    mipmaps: [],
                    get width () {
                        return this.pixelWidth;
                    },
                    get height () {
                        return this.pixelHeight;
                    }
                };
                Object.values(i.stage.renderer.getCompressedTextureExtensions()).filter((t)=>null != t).map((t)=>((t)=>{
                        const e = [];
                        for(let i in t)e.push(t[i]);
                        return e;
                    })(t)).reduce((t, e)=>t.concat(e)).includes(o.glInternalFormat) || console.warn("[Lightning] Unrecognized texture extension format:", e, o.glInternalFormat, i.stage.renderer.getCompressedTextureExtensions());
                var a = 64;
                a += o.bytesOfKeyValueData;
                for(var h = 0; h < o.numberOfMipmapLevels; h++){
                    var l = r.getUint32(a);
                    a += 4, o.mipmaps.push(r.buffer.slice(a, l)), a += l;
                }
                t(null, {
                    source: o,
                    renderInfo: {
                        src: e,
                        compressed: !0
                    }
                });
            };
        }
        handlePvrLoad(t, e) {
            return function() {
                const i = this.response, s = new Int32Array(i, 0, 13), r = s[12] + 52, n = new Uint8Array(i, r);
                var o = {
                    glInternalFormat: 36196,
                    pixelWidth: s[7],
                    pixelHeight: s[6],
                    numberOfMipmapLevels: s[11],
                    mipmaps: [],
                    pvr: !0,
                    get width () {
                        return this.pixelWidth;
                    },
                    get height () {
                        return this.pixelHeight;
                    }
                };
                let a = 0, h = o.pixelWidth, l = o.pixelHeight;
                for(var _ = 0; _ < o.numberOfMipmapLevels; _++){
                    const t1 = (h + 3 >> 2) * (l + 3 >> 2) * 8, e1 = new Uint8Array(i, n.byteOffset + a, t1);
                    o.mipmaps.push(e1), a += t1, h >>= 1, l >>= 1;
                }
                t(null, {
                    source: o,
                    renderInfo: {
                        src: e,
                        compressed: !0
                    }
                });
            };
        }
        loadSrcTexture({ src: t , hasAlpha: e  }, i) {
            let s = void 0, r = t.indexOf(".png") >= 0 || "data:image/png;base64" == t.substr(0, 21), n = t.indexOf(".ktx") >= 0, o = t.indexOf(".pvr") >= 0;
            if (n || o) {
                let e1 = new XMLHttpRequest;
                e1.addEventListener("load", n ? this.handleKtxLoad(i, t) : this.handlePvrLoad(i, t)), e1.open("GET", t), e1.responseType = "arraybuffer", e1.send(), s = function() {
                    e1.abort();
                };
            } else if (this._imageWorker) {
                const e2 = this._imageWorker.create(t);
                e2.onError = function(t) {
                    return i("Image load error");
                }, e2.onLoad = function({ imageBitmap: e , hasAlphaChannel: s  }) {
                    i(null, {
                        source: e,
                        renderInfo: {
                            src: t,
                            compressed: !1
                        },
                        hasAlpha: s,
                        premultiplyAlpha: !0
                    });
                }, s = function() {
                    e2.cancel();
                };
            } else {
                let n1 = new Image;
                "data:" == t.substr(0, 5) || Utils.isPS4 || (n1.crossOrigin = "Anonymous"), n1.onerror = function(t) {
                    if (n1.src) return i("Image load error");
                }, n1.onload = function() {
                    i(null, {
                        source: n1,
                        renderInfo: {
                            src: t,
                            compressed: !1
                        },
                        hasAlpha: r || e
                    });
                }, n1.src = t, s = function() {
                    n1.onerror = null, n1.onload = null, n1.removeAttribute("src");
                };
            }
            return s;
        }
        createWebGLContext(t, e) {
            let i = this.stage.getOption("canvas") || document.createElement("canvas");
            t && e && (i.width = t, i.height = e);
            let s = {
                alpha: !0,
                antialias: !1,
                premultipliedAlpha: !0,
                stencil: !0,
                preserveDrawingBuffer: !1
            }, r = i.getContext("webgl", s) || i.getContext("experimental-webgl", s);
            if (!r) throw new Error("This browser does not support webGL.");
            return r;
        }
        createCanvasContext(t, e) {
            let i = this.stage.getOption("canvas") || document.createElement("canvas");
            t && e && (i.width = t, i.height = e);
            let s = i.getContext("2d");
            if (!s) throw new Error("This browser does not support 2d canvas.");
            return s;
        }
        getHrTime() {
            return window.performance ? window.performance.now() : (new Date).getTime();
        }
        getDrawingCanvas() {
            return document.createElement("canvas");
        }
        getTextureOptionsForDrawingCanvas(t) {
            let e = {};
            return e.source = t, e;
        }
        nextFrame(t) {}
        registerKeydownHandler(t) {
            this._keydownListener = (e)=>{
                t(e);
            }, window.addEventListener("keydown", this._keydownListener);
        }
        registerKeyupHandler(t) {
            this._keyupListener = (e)=>{
                t(e);
            }, window.addEventListener("keyup", this._keyupListener);
        }
        _removeKeyHandler() {
            this._keydownListener && window.removeEventListener("keydown", this._keydownListener), this._keyupListener && window.removeEventListener("keyup", this._keyupListener);
        }
        registerClickHandler(t) {
            this._clickListener = (e)=>{
                t(e);
            }, window.addEventListener("mousedown", this._clickListener);
        }
        _removeClickHandler() {
            this._clickListener && window.removeEventListener("mousedown", this._clickListener);
        }
        registerHoverHandler(t) {
            this._hoverListener = (e)=>{
                t(e);
            }, window.addEventListener("mousemove", this._hoverListener);
        }
        _removeHoverHandler() {
            this._hoverListener && window.removeEventListener("mousemove", this._hoverListener);
        }
        registerScrollWheelHandler(t) {
            this._scrollWheelListener = (e)=>{
                t(e);
            }, window.addEventListener("wheel", this._scrollWheelListener);
        }
        _removeScrollWheelHandler() {
            this._scrollWheelListener && window.removeEventListener("wheel", this._scrollWheelListener);
        }
        _registerVisibilityChangeHandler() {
            this._visibilityChangeHandler = ()=>{
                "visible" === document.visibilityState && (this.stage.root.core.setHasRenderUpdates(2), this.stage.renderFrame());
            }, document.addEventListener("visibilitychange", this._visibilityChangeHandler);
        }
        _removeVisibilityChangeHandler() {
            this._visibilityChangeHandler && document.removeEventListener("visibilitychange", this._visibilityChangeHandler);
        }
    }
    class Utils$1 {
        static isFunction(t) {
            return "function" == typeof t;
        }
        static isNumber(t) {
            return "number" == typeof t;
        }
        static isInteger(t) {
            return "number" == typeof t && t % 1 == 0;
        }
        static isBoolean(t) {
            return !0 === t || !1 === t;
        }
        static isString(t) {
            return "string" == typeof t;
        }
        static isObject(t) {
            let e = typeof t;
            return !!t && ("object" == e || "function" == e);
        }
        static isPlainObject(t) {
            return !!t && "object" == typeof t;
        }
        static isObjectLiteral(t) {
            return "object" == typeof t && t && t.constructor === Object;
        }
        static getArrayIndex(t, e) {
            return Utils$1.getModuloIndex(t, e.length);
        }
        static equalValues(t, e) {
            return typeof t == typeof e && (Utils$1.isObjectLiteral(t) ? Utils$1.isObjectLiteral(e) && Utils$1.equalObjectLiterals(t, e) : Array.isArray(t) ? Array.isArray(e) && Utils$1.equalArrays(t, e) : t === e);
        }
        static equalObjectLiterals(t, e) {
            let i = Object.keys(t), s = Object.keys(e);
            if (i.length !== s.length) return !1;
            for(let r = 0, n = i.length; r < n; r++){
                const n1 = i[r], o = s[r];
                if (n1 !== o) return !1;
                const a = t[n1], h = e[o];
                if (!Utils$1.equalValues(a, h)) return !1;
            }
            return !0;
        }
        static equalArrays(t, e) {
            if (t.length !== e.length) return !1;
            for(let i = 0, s = t.length; i < s; i++)if (!this.equalValues(t[i], e[i])) return !1;
            return !0;
        }
    }
    class WebGLState {
        constructor(t, e){
            this._id = t, this._gl = e, this._program = void 0, this._buffers = new Map, this._framebuffers = new Map, this._renderbuffers = new Map, this._vertexAttribs = new Array(16), this._nonDefaultFlags = new Set, this._settings = new Map, this._textures = new Array(8), this._maxTexture = 0, this._activeTexture = e.TEXTURE0, this._pixelStorei = new Array(5);
        }
        _getDefaultFlag(t) {
            return t === this._gl.DITHER;
        }
        setFlag(t, e) {
            return e === this._getDefaultFlag(t) ? this._nonDefaultFlags.delete(t) : !this._nonDefaultFlags.has(t) && (this._nonDefaultFlags.add(t), !0);
        }
        setBuffer(t, e) {
            const i = this._buffers.get(t) !== e;
            return this._buffers.set(t, e), i && t === this._gl.ARRAY_BUFFER && (this._vertexAttribs = []), i;
        }
        setFramebuffer(t, e) {
            const i = this._framebuffers.get(t) !== e;
            return this._framebuffers.set(t, e), i;
        }
        setRenderbuffer(t, e) {
            const i = this._renderbuffers.get(t) !== e;
            return this._renderbuffers.set(t, e), i;
        }
        setProgram(t) {
            const e = this._program !== t;
            return this._program = t, e;
        }
        setSetting(t, e) {
            const i = this._settings.get(t), s = !i || !Utils$1.equalValues(i, e);
            return this._settings.set(t, e), s;
        }
        disableVertexAttribArray(t) {
            const e = this._vertexAttribs[t];
            return !(!e || !e[5]) && (e[5] = !1, !0);
        }
        enableVertexAttribArray(t) {
            const e = this._vertexAttribs[t];
            return e ? !e[0] && (e[0] = !0, !0) : (this._vertexAttribs[t] = [
                0,
                0,
                0,
                0,
                0,
                !0
            ], !0);
        }
        vertexAttribPointer(t, e) {
            let i = this._vertexAttribs[t], s = !1;
            return i && (s = i[0] === e[0] && i[1] === e[1] && i[2] === e[2] && i[3] === e[3] && i[4] === e[4]), !s && (e[5] = !!i && i[5], !0);
        }
        setActiveTexture(t) {
            const e = this._activeTexture !== t;
            return this._activeTexture = t, e;
        }
        bindTexture(t, e) {
            const i = WebGLState._getTextureIndex(this._activeTexture);
            this._maxTexture = Math.max(this._maxTexture, i + 1);
            const s = this._textures[i], r = WebGLState._getTextureTargetIndex(t);
            return s ? s[r] !== e && (s[r] = e, !0) : !!e && (this._textures[i] = [], this._textures[i][r] = e, !0);
        }
        setPixelStorei(t, e) {
            const i = WebGLState._getPixelStoreiIndex(t), s = !Utils$1.equalValues(this._pixelStorei[i], e);
            return this._pixelStorei[i] = e, s;
        }
        migrate(t) {
            const e = this;
            this._migrateFlags(e, t), t._program !== e._program && this._gl._useProgram(t._program), this._migrateFramebuffers(e, t), this._migrateRenderbuffers(e, t);
            const i = this._migrateBuffers(e, t);
            this._migrateAttributes(e, t, i), this._migrateFlags(e, t), this._migrateSettings(e, t), this._migratePixelStorei(e, t), this._migrateTextures(e, t);
        }
        _migratePixelStorei(t, e) {
            for(let i = 0, s = t._pixelStorei.length; i < s; i++)if (t._pixelStorei[i] !== e._pixelStorei[i]) {
                const t1 = void 0 !== e._pixelStorei[i] ? e._pixelStorei[i] : WebGLState._getDefaultPixelStoreiByIndex(i);
                this._gl._pixelStorei(WebGLState._getPixelStoreiByIndex(i), t1);
            }
        }
        _migrateTextures(t, e) {
            const i = Math.max(t._maxTexture, e._maxTexture);
            let s = t._activeTexture;
            for(let r = 0; r < i; r++){
                const i1 = e._textures[r], n = t._textures[r], o = WebGLState._getTextureByIndex(r);
                for(let t1 = 0, e1 = Math.max(n ? n.length : 0, i1 ? i1.length : 0); t1 < e1; t1++){
                    const e2 = WebGLState._getTextureTargetByIndex(t1);
                    s !== o && (this._gl._activeTexture(o), s = o);
                    const r1 = i1 && i1[t1] || null;
                    this._gl._bindTexture(e2, r1);
                }
            }
            e._activeTexture !== s && this._gl._activeTexture(e._activeTexture);
        }
        _migrateBuffers(t, e) {
            return e._buffers.forEach((e, i)=>{
                t._buffers.get(i) !== e && this._gl._bindBuffer(i, e);
            }), t._buffers.forEach((t, i)=>{
                void 0 === e._buffers.get(i) && this._gl._bindBuffer(i, null);
            }), e._buffers.get(this._gl.ARRAY_BUFFER) !== t._buffers.get(this._gl.ARRAY_BUFFER);
        }
        _migrateFramebuffers(t, e) {
            e._framebuffers.forEach((e, i)=>{
                t._framebuffers.get(i) !== e && this._gl._bindFramebuffer(i, e);
            }), t._framebuffers.forEach((t, i)=>{
                void 0 === e._framebuffers.get(i) && this._gl._bindFramebuffer(i, null);
            });
        }
        _migrateRenderbuffers(t, e) {
            e._renderbuffers.forEach((e, i)=>{
                t._renderbuffers.get(i) !== e && this._gl._bindRenderbuffer(i, e);
            }), t._renderbuffers.forEach((t, i)=>{
                void 0 === e._renderbuffers.get(i) && this._gl._bindRenderbuffer(i, null);
            });
        }
        _migrateAttributes(t, e, i) {
            i ? e._vertexAttribs.forEach((t, e)=>{
                t[0] && this._gl._vertexAttribPointer(e, t[0], t[1], t[2], t[3], t[4]), t[5] && this._gl._enableVertexAttribArray(e);
            }) : (t._vertexAttribs.forEach((t, i)=>{
                e._vertexAttribs[i] || this._gl._disableVertexAttribArray(i);
            }), e._vertexAttribs.forEach((t, e)=>{
                this._gl._vertexAttribPointer(e, t[0], t[1], t[2], t[4]), t[5] ? this._gl._enableVertexAttribArray(e) : this._gl._disableVertexAttribArray(e);
            }));
        }
        _migrateSettings(t, e) {
            const i = this.constructor.getDefaultSettings();
            t._settings.forEach((t, s)=>{
                const r = s.name || s.xname;
                if (!e._settings.has(s)) {
                    let t1 = i.get(r);
                    Utils$1.isFunction(t1) && (t1 = t1(this._gl)), e._settings.set(s, t1), s.apply(this._gl, t1);
                }
            }), e._settings.forEach((e, i)=>{
                const s = t._settings.get(i);
                s && Utils$1.equalValues(s, e) || i.apply(this._gl, e);
            });
        }
        _migrateFlags(t, e) {
            t._nonDefaultFlags.forEach((t)=>{
                e._nonDefaultFlags.has(t) || (this._getDefaultFlag(t) ? this._gl._enable(t) : this._gl._disable(t));
            }), e._nonDefaultFlags.forEach((e)=>{
                t._nonDefaultFlags.has(e) || (this._getDefaultFlag(e) ? this._gl._disable(e) : this._gl._enable(e));
            });
        }
        static getDefaultSettings() {
            if (!this._defaultSettings) {
                this._defaultSettings = new Map;
                const t = this._defaultSettings, e = WebGLRenderingContext.prototype;
                t.set("viewport", function(t) {
                    return [
                        0,
                        0,
                        t.canvas.width,
                        t.canvas.height
                    ];
                }), t.set("scissor", function(t) {
                    return [
                        0,
                        0,
                        t.canvas.width,
                        t.canvas.height
                    ];
                }), t.set("blendColor", [
                    0,
                    0,
                    0,
                    0
                ]), t.set("blendEquation", [
                    e.FUNC_ADD
                ]), t.set("blendEquationSeparate", [
                    e.FUNC_ADD,
                    e.FUNC_ADD
                ]), t.set("blendFunc", [
                    e.ONE,
                    e.ZERO
                ]), t.set("blendFuncSeparate", [
                    e.ONE,
                    e.ZERO,
                    e.ONE,
                    e.ZERO
                ]), t.set("clearColor", [
                    0,
                    0,
                    0,
                    0
                ]), t.set("clearDepth", [
                    1
                ]), t.set("clearStencil", [
                    0
                ]), t.set("colorMask", [
                    !0,
                    !0,
                    !0,
                    !0
                ]), t.set("cullFace", [
                    e.BACK
                ]), t.set("depthFunc", [
                    e.LESS
                ]), t.set("depthMask", [
                    !0
                ]), t.set("depthRange", [
                    0,
                    1
                ]), t.set("frontFace", [
                    e.CCW
                ]), t.set("lineWidth", [
                    1
                ]), t.set("polygonOffset", [
                    0,
                    0
                ]), t.set("sampleCoverage", [
                    1,
                    !1
                ]), t.set("stencilFunc", [
                    e.ALWAYS,
                    0,
                    1
                ]), t.set("_stencilFuncSeparateFront", [
                    e.ALWAYS,
                    0,
                    1
                ]), t.set("_stencilFuncSeparateBack", [
                    e.ALWAYS,
                    0,
                    1
                ]), t.set("_stencilFuncSeparateFrontAndBack", [
                    e.ALWAYS,
                    0,
                    1
                ]), t.set("stencilMask", [
                    1
                ]), t.set("_stencilMaskSeparateFront", [
                    1
                ]), t.set("_stencilMaskSeparateBack", [
                    1
                ]), t.set("_stencilMaskSeparateFrontAndBack", [
                    1
                ]), t.set("stencilOp", [
                    e.KEEP,
                    e.KEEP,
                    e.KEEP
                ]), t.set("_stencilOpSeparateFront", [
                    e.KEEP,
                    e.KEEP,
                    e.KEEP
                ]), t.set("_stencilOpSeparateBack", [
                    e.KEEP,
                    e.KEEP,
                    e.KEEP
                ]), t.set("_stencilOpSeparateFrontAndBack", [
                    e.KEEP,
                    e.KEEP,
                    e.KEEP
                ]), t.set("vertexAttrib1f", []), t.set("vertexAttrib1fv", []), t.set("vertexAttrib2f", []), t.set("vertexAttrib2fv", []), t.set("vertexAttrib3f", []), t.set("vertexAttrib3fv", []), t.set("vertexAttrib4f", []), t.set("vertexAttrib4fv", []);
            }
            return this._defaultSettings;
        }
        static _getTextureTargetIndex(t) {
            switch(t){
                case 3553:
                    return 0;
                case 34067:
                    return 1;
                default:
                    throw new Error("Unknown texture target: " + t);
            }
        }
        static _getTextureTargetByIndex(t) {
            return this._textureTargetIndices || (this._textureTargetIndices = [
                3553,
                34067
            ]), this._textureTargetIndices[t];
        }
        static _getTextureIndex(t) {
            return t - 33984;
        }
        static _getTextureByIndex(t) {
            return t + 33984;
        }
        static _getPixelStoreiIndex(t) {
            switch(t){
                case 3333:
                    return 0;
                case 3317:
                    return 1;
                case 37440:
                    return 2;
                case 37441:
                    return 3;
                case 37443:
                    return 4;
                case 37445:
                    return 5;
                default:
                    throw new Error("Unknown pixelstorei: " + t);
            }
        }
        static _getPixelStoreiByIndex(t) {
            return this._pixelStoreiIndices || (this._pixelStoreiIndices = [
                3333,
                3317,
                37440,
                37441,
                37443
            ]), this._pixelStoreiIndices[t];
        }
        static _getDefaultPixelStoreiByIndex(t) {
            return this._pixelStoreiDefaults || (this._pixelStoreiDefaults = [
                4,
                4,
                !1,
                !1,
                WebGLRenderingContext.prototype.BROWSER_DEFAULT_WEBGL
            ]), this._pixelStoreiDefaults[t];
        }
    }
    class WebGLStateManager {
        _initStateManager(t = "default") {
            this._states = {}, this._state = this._getState(t);
        }
        _getState(t) {
            return this._states[t] || (this._states[t] = new WebGLState(t, this)), this._states[t];
        }
        switchState(t = "default") {
            if (this._state._id !== t) {
                const e = this._getState(t);
                this._state.migrate(e), this._state = e;
            }
        }
        $useProgram(t) {
            this._state.setProgram(t) && this._useProgram(t);
        }
        $bindBuffer(t, e) {
            this._state.setBuffer(t, e) && this._bindBuffer(t, e);
        }
        $bindFramebuffer(t, e) {
            this._state.setFramebuffer(t, e) && this._bindFramebuffer(t, e);
        }
        $bindRenderbuffer(t, e) {
            this._state.setRenderbuffer(t, e) && this._bindRenderbuffer(t, e);
        }
        $enable(t) {
            this._state.setFlag(t, !0) && this._enable(t);
        }
        $disable(t) {
            this._state.setFlag(t, !1) && this._disable(t);
        }
        $viewport(t, e, i, s) {
            this._state.setSetting(this._viewport, [
                t,
                e,
                i,
                s
            ]) && this._viewport(t, e, i, s);
        }
        $scissor(t, e, i, s) {
            this._state.setSetting(this._scissor, [
                t,
                e,
                i,
                s
            ]) && this._scissor(t, e, i, s);
        }
        $disableVertexAttribArray(t) {
            this._state.disableVertexAttribArray(t) && this._disableVertexAttribArray(t);
        }
        $enableVertexAttribArray(t) {
            this._state.enableVertexAttribArray(t) && this._enableVertexAttribArray(t);
        }
        $vertexAttribPointer(t, e, i, s, r, n) {
            this._state.vertexAttribPointer(t, [
                e,
                i,
                s,
                r,
                n
            ]) && this._vertexAttribPointer(t, e, i, s, r, n);
        }
        $activeTexture(t) {
            this._state.setActiveTexture(t) && this._activeTexture(t);
        }
        $bindTexture(t, e) {
            this._state.bindTexture(t, e) && this._bindTexture(t, e);
        }
        $pixelStorei(t, e) {
            this._state.setPixelStorei(t, e) && this._pixelStorei(t, e);
        }
        $stencilFuncSeparate(t, e, i, s) {
            let r;
            switch(t){
                case this.FRONT:
                    r = this._stencilFuncSeparateFront;
                    break;
                case this.BACK:
                    r = this._stencilFuncSeparateBack;
                    break;
                case this.FRONT_AND_BACK:
                    r = this._stencilFuncSeparateFrontAndBack;
            }
            this._state.setSetting(r, [
                e,
                i,
                s
            ]) && r.apply(this, [
                e,
                i,
                s
            ]);
        }
        _stencilFuncSeparateFront(t, e, i) {
            this._stencilFuncSeparate(this.FRONT, t, e, i);
        }
        _stencilFuncSeparateBack(t, e, i) {
            this._stencilFuncSeparate(this.BACK, t, e, i);
        }
        _stencilFuncSeparateFrontAndBack(t, e, i) {
            this._stencilFuncSeparate(this.FRONT_AND_BACK, t, e, i);
        }
        $stencilMaskSeparate(t, e) {
            let i;
            switch(t){
                case this.FRONT:
                    i = this._stencilMaskSeparateFront;
                    break;
                case this.BACK:
                    i = this._stencilMaskSeparateBack;
                    break;
                case this.FRONT_AND_BACK:
                    i = this._stencilMaskSeparateFrontAndBack;
            }
            this._state.setSetting(i, [
                e
            ]) && i.apply(this, [
                e
            ]);
        }
        _stencilMaskSeparateFront(t) {
            this._stencilMaskSeparate(this.FRONT, t);
        }
        _stencilMaskSeparateBack(t) {
            this._stencilMaskSeparate(this.BACK, t);
        }
        _stencilMaskSeparateFrontAndBack(t) {
            this._stencilMaskSeparate(this.FRONT_AND_BACK, t);
        }
        $stencilOpSeparate(t, e, i, s) {
            let r;
            switch(t){
                case this.FRONT:
                    r = this._stencilOpSeparateFront;
                    break;
                case this.BACK:
                    r = this._stencilOpSeparateBack;
                    break;
                case this.FRONT_AND_BACK:
                    r = this._stencilOpSeparateFrontAndBack;
            }
            this._state.setSetting(r, [
                e,
                i,
                s
            ]) && r.apply(this, [
                e,
                i,
                s
            ]);
        }
        _stencilOpSeparateFront(t, e, i) {
            this._stencilOpSeparate(this.FRONT, t, e, i);
        }
        _stencilOpSeparateBack(t, e, i) {
            this._stencilOpSeparate(this.BACK, t, e, i);
        }
        _stencilOpSeparateFrontAndBack(t, e, i) {
            this._stencilOpSeparate(this.FRONT_AND_BACK, t, e, i);
        }
        $blendColor(t, e, i, s) {
            this._state.setSetting(this._blendColor, [
                t,
                e,
                i,
                s
            ]) && this._blendColor(t, e, i, s);
        }
        $blendEquation(t) {
            this._state.setSetting(this._blendEquation, [
                t
            ]) && this._blendEquation(t);
        }
        $blendEquationSeparate(t, e) {
            this._state.setSetting(this._blendEquationSeparate, [
                t,
                e
            ]) && this._blendEquationSeparate(t, e);
        }
        $blendFunc(t, e) {
            this._state.setSetting(this._blendFunc, [
                t,
                e
            ]) && this._blendFunc(t, e);
        }
        $blendFuncSeparate(t, e, i, s) {
            this._state.setSetting(this._blendFuncSeparate, [
                t,
                e,
                i,
                s
            ]) && this._blendFuncSeparate(t, e, i, s);
        }
        $clearColor(t, e, i, s) {
            this._state.setSetting(this._clearColor, [
                t,
                e,
                i,
                s
            ]) && this._clearColor(t, e, i, s);
        }
        $clearDepth(t) {
            this._state.setSetting(this._clearDepth, [
                t
            ]) && this._clearDepth(t);
        }
        $clearStencil(t) {
            this._state.setSetting(this._clearStencil, [
                t
            ]) && this._clearStencil(t);
        }
        $colorMask(t, e, i, s) {
            this._state.setSetting(this._colorMask, [
                t,
                e,
                i,
                s
            ]) && this._colorMask(t, e, i, s);
        }
        $cullFace(t) {
            this._state.setSetting(this._cullFace, [
                t
            ]) && this._cullFace(t);
        }
        $depthFunc(t) {
            this._state.setSetting(this._depthFunc, [
                t
            ]) && this._depthFunc(t);
        }
        $depthMask(t) {
            this._state.setSetting(this._depthMask, [
                t
            ]) && this._depthMask(t);
        }
        $depthRange(t, e) {
            this._state.setSetting(this._depthRange, [
                t,
                e
            ]) && this._depthRange(t, e);
        }
        $frontFace(t) {
            this._state.setSetting(this._frontFace, [
                t
            ]) && this._frontFace(t);
        }
        $lineWidth(t) {
            this._state.setSetting(this._lineWidth, [
                t
            ]) && this._lineWidth(t);
        }
        $polygonOffset(t, e) {
            this._state.setSetting(this._polygonOffset, [
                t,
                e
            ]) && this._polygonOffset(t, e);
        }
        $sampleCoverage(t, e) {
            this._state.setSetting(this._sampleCoverage, [
                t,
                e
            ]) && this._sampleCoverage(t, e);
        }
        $stencilFunc(t, e, i) {
            this._state.setSetting(this._stencilFunc, [
                t,
                e,
                i
            ]) && this._stencilFunc(t, e, i);
        }
        $stencilMask(t) {
            this._state.setSetting(this._stencilMask, [
                t
            ]) && this._stencilMask(t);
        }
        $stencilOp(t, e, i) {
            this._state.setSetting(this._stencilOp, [
                t,
                e,
                i
            ]) && this._stencilOp(t, e, i);
        }
        $vertexAttrib1f(t, e) {
            this._state.setSetting(this._vertexAttrib1f, [
                t,
                e
            ]) && this._vertexAttrib1f(t, e);
        }
        $vertexAttrib1fv(t, e) {
            this._state.setSetting(this._vertexAttrib1fv, [
                t,
                e
            ]) && this._vertexAttrib1fv(t, e);
        }
        $vertexAttrib2f(t, e, i) {
            this._state.setSetting(this._vertexAttrib2f, [
                t,
                e,
                i
            ]) && this._vertexAttrib2f(t, e, i);
        }
        $vertexAttrib2fv(t, e) {
            this._state.setSetting(this._vertexAttrib2fv, [
                t,
                e
            ]) && this._vertexAttrib2fv(t, e);
        }
        $vertexAttrib3f(t, e, i, s) {
            this._state.setSetting(this._vertexAttrib3f, [
                t,
                e,
                i,
                s
            ]) && this._vertexAttrib3f(t, e, i, s);
        }
        $vertexAttrib3fv(t, e) {
            this._state.setSetting(this._vertexAttrib3fv, [
                t,
                e
            ]) && this._vertexAttrib3fv(t, e);
        }
        $vertexAttrib4f(t, e, i, s, r) {
            this._state.setSetting(this._vertexAttrib4f, [
                t,
                e,
                i,
                s,
                r
            ]) && this._vertexAttrib4f(t, e, i, s, r);
        }
        $vertexAttrib4fv(t, e) {
            this._state.setSetting(this._vertexAttrib4fv, [
                t,
                e
            ]) && this._vertexAttrib4fv(t, e);
        }
        static enable(t, e = "default") {
            const i = Object.getOwnPropertyNames(WebGLStateManager.prototype);
            t.__proto__;
            return i.forEach((e)=>{
                if ("constructor" !== e) {
                    const i = WebGLStateManager.prototype[e];
                    "$" === e.charAt(0) && (e = e.substr(1)), t[e] !== i && (t[e] && (t[e].name || (t[e].xname = e), t["_" + e] = t[e]), t[e] = i);
                }
            }), WebGLStateManager.prototype._initStateManager.call(t, e), t;
        }
    }
    class TextureManager {
        constructor(t){
            this.stage = t, this._usedMemory = 0, this._uploadedTextureSources = [], this.textureSourceHashmap = new Map;
        }
        get usedMemory() {
            return this._usedMemory;
        }
        destroy() {
            for(let t = 0, e = this._uploadedTextureSources.length; t < e; t++)this._nativeFreeTextureSource(this._uploadedTextureSources[t]);
            this.textureSourceHashmap.clear(), this._usedMemory = 0;
        }
        getReusableTextureSource(t) {
            return this.textureSourceHashmap.get(t);
        }
        getTextureSource(t, e) {
            let i = e ? this.textureSourceHashmap.get(e) : null;
            return i || (i = new TextureSource(this, t), e && (i.lookupId = e, this.textureSourceHashmap.set(e, i))), i;
        }
        uploadTextureSource(t, e) {
            if (t.isLoaded()) return;
            this._addMemoryUsage(t.w * t.h);
            const i = this._nativeUploadTextureSource(t, e);
            t._nativeTexture = i, i.w = t.w, i.h = t.h, i.update = this.stage.frameCounter, this._uploadedTextureSources.push(t), this.addToLookupMap(t), this._updateVramUsage(t, 1);
        }
        _addMemoryUsage(t) {
            this._usedMemory += t, this.stage.addMemoryUsage(t);
        }
        _updateVramUsage(t, e) {
            const i = t.nativeTexture;
            var s;
            Stage.isWebglSupported() && t.isLoaded() && i.hasOwnProperty("bytesPerPixel") && !isNaN(i.bytesPerPixel) && (s = e * (t.w * t.h * i.bytesPerPixel), this.stage.addVramUsage(s, t.hasAlpha));
        }
        addToLookupMap(t) {
            const e = t.lookupId;
            e && (this.textureSourceHashmap.has(e) || this.textureSourceHashmap.set(e, t));
        }
        gc() {
            this.freeUnusedTextureSources(), this._cleanupLookupMap();
        }
        freeUnusedTextureSources() {
            let t = [];
            for(let e = 0, i = this._uploadedTextureSources.length; e < i; e++){
                let i1 = this._uploadedTextureSources[e];
                i1.allowCleanup() ? this._freeManagedTextureSource(i1) : t.push(i1);
            }
            this._uploadedTextureSources = t, this._cleanupLookupMap();
        }
        _freeManagedTextureSource(t) {
            t.isLoaded() && (this._nativeFreeTextureSource(t), this._addMemoryUsage(-t.w * t.h), this._updateVramUsage(t, -1)), t.loadingSince = null;
        }
        _cleanupLookupMap() {
            this.textureSourceHashmap.forEach((t, e)=>{
                t.isLoaded() || t.isLoading() || t.isUsed() || this.textureSourceHashmap.delete(e);
            });
        }
        freeTextureSource(t) {
            const e = this._uploadedTextureSources.indexOf(t), i = -1 !== e;
            t.isLoaded() && (i && (this._addMemoryUsage(-t.w * t.h), this._uploadedTextureSources.splice(e, 1)), this._nativeFreeTextureSource(t)), t.loadingSince = null;
        }
        _nativeUploadTextureSource(t, e) {
            return this.stage.renderer.uploadTextureSource(t, e);
        }
        _nativeFreeTextureSource(t) {
            this.stage.renderer.freeTextureSource(t), t.clearNativeTexture();
        }
    }
    class TextureThrottler {
        constructor(t){
            this.stage = t, this.genericCancelCb = (t)=>{
                this._remove(t);
            }, this._sources = [], this._data = [];
        }
        destroy() {
            this._sources = [], this._data = [];
        }
        processSome() {
            if (this._sources.length) {
                const t = Date.now();
                do this._processItem();
                while (this._sources.length && Date.now() - t < TextureThrottler.MAX_UPLOAD_TIME_PER_FRAME);
            }
        }
        _processItem() {
            const t = this._sources.pop(), e = this._data.pop();
            t.isLoading() && t.processLoadedSource(e);
        }
        add(t, e) {
            this._sources.push(t), this._data.push(e);
        }
        _remove(t) {
            const e = this._sources.indexOf(t);
            e >= 0 && (this._sources.splice(e, 1), this._data.splice(e, 1));
        }
    }
    TextureThrottler.MAX_UPLOAD_TIME_PER_FRAME = 10;
    class CoreContext {
        constructor(t){
            this.stage = t, this.root = null, this.updateTreeOrder = 0, this.renderState = this.stage.renderer.createCoreRenderState(this), this.renderExec = this.stage.renderer.createCoreRenderExecutor(this), this.renderExec.init(), this._usedMemory = 0, this._renderTexturePool = [], this._renderTextureId = 1, this._zSorts = [], this.renderToTextureCount = 0;
        }
        get usedMemory() {
            return this._usedMemory;
        }
        destroy() {
            this._renderTexturePool.forEach((t)=>this._freeRenderTexture(t)), this._usedMemory = 0;
        }
        hasRenderUpdates() {
            return !!this.root._parent._hasRenderUpdates;
        }
        render() {
            this.root._parent._hasRenderUpdates = 0, this._render();
        }
        update() {
            this._update(), this.root._hasUpdates && this._update(), this._performForcedZSorts();
        }
        _performForcedZSorts() {
            if (this._zSorts.length) {
                for(let t = 0, e = this._zSorts.length; t < e; t++)this._zSorts[t].zSort && this._zSorts[t].sortZIndexedChildren();
                this._zSorts = [];
            }
        }
        _update() {
            this.updateTreeOrder = 0, this.root.update();
        }
        _render() {
            const t = this.stage.getOption("debugFrame");
            this._fillRenderState(), this.stage.getOption("readPixelsBeforeDraw") && this._readPixels(), this._performRender(), t && console.log("[Lightning] RTT Renders in frame: " + this.renderToTextureCount), this.stage.getOption("readPixelsAfterDraw") && this.renderToTextureCount >= this.stage.getOption("readPixelsAfterDrawThreshold") && (t && console.log("[Lightning] readPixelsAfterDraw behavior triggered"), this._readPixels()), this.renderToTextureCount = 0;
        }
        _readPixels() {
            const t = new Uint8Array(4), e = this.stage.gl;
            e.readPixels(0, 0, 1, 1, e.RGBA, e.UNSIGNED_BYTE, t);
        }
        _fillRenderState() {
            this.renderState.reset(), this.root.render(), this.renderState.finish();
        }
        _performRender() {
            this.renderExec.execute();
        }
        _addMemoryUsage(t) {
            this._usedMemory += t, this.stage.addMemoryUsage(t);
        }
        allocateRenderTexture(t, e) {
            let i = this.stage.getRenderPrecision(), s = Math.max(1, Math.round(t * i)), r = Math.max(1, Math.round(e * i));
            for(let t1 = this._renderTexturePool.length - 1; t1 >= 0; t1--){
                const e1 = this._renderTexturePool[t1];
                if (e1.w === s && e1.h === r && e1.update !== this.stage.frameCounter) return e1.f = this.stage.frameCounter, this._renderTexturePool.splice(t1, 1), e1;
            }
            const n = this._createRenderTexture(t, e, s, r);
            return n.precision = i, n;
        }
        releaseRenderTexture(t) {
            this._renderTexturePool.push(t);
        }
        freeUnusedRenderTextures(t = 60) {
            let e = this.stage.frameCounter - t;
            this._renderTexturePool = this._renderTexturePool.filter((t)=>!(t.f <= e) || (this._freeRenderTexture(t), !1));
        }
        _createRenderTexture(t, e, i, s) {
            this._addMemoryUsage(i * s);
            const r = this.stage.renderer.createRenderTexture(t, e, i, s);
            return r.id = this._renderTextureId++, r.f = this.stage.frameCounter, r.ow = t, r.oh = e, r.w = i, r.h = s, r;
        }
        _freeRenderTexture(t) {
            this.stage.renderer.freeRenderTexture(t), this._addMemoryUsage(-t.w * t.h);
        }
        copyRenderTexture(t, e, i) {
            this.stage.renderer.copyRenderTexture(t, e, i);
        }
        forceZSort(t) {
            this._zSorts.push(t);
        }
    }
    class TransitionSettings {
        constructor(t){
            this.stage = t, this._timingFunction = "ease", this._timingFunctionImpl = StageUtils.getTimingFunction(this._timingFunction), this.delay = 0, this.duration = .2, this.merger = null;
        }
        get timingFunction() {
            return this._timingFunction;
        }
        set timingFunction(t) {
            this._timingFunction = t, this._timingFunctionImpl = StageUtils.getTimingFunction(t);
        }
        get timingFunctionImpl() {
            return this._timingFunctionImpl;
        }
        patch(t) {
            Base.patchObject(this, t);
        }
    }
    TransitionSettings.prototype.isTransitionSettings = !0;
    class TransitionManager {
        constructor(t){
            this.stage = t, this.stage.on("frameStart", ()=>this.progress()), this.active = new Set, this.defaultTransitionSettings = new TransitionSettings(this.stage);
        }
        progress() {
            if (this.active.size) {
                let t = this.stage.dt, e = !1;
                this.active.forEach(function(i) {
                    i.progress(t), i.isRunning() || (e = !0);
                }), e && (this.active = new Set([
                    ...this.active
                ].filter((t)=>t.isRunning())));
            }
        }
        createSettings(t) {
            const e = new TransitionSettings;
            return Base.patchObject(e, t), e;
        }
        addActive(t) {
            this.active.add(t);
        }
        removeActive(t) {
            this.active.delete(t);
        }
    }
    class MultiSpline {
        constructor(){
            this._clear();
        }
        _clear() {
            this._p = [], this._pe = [], this._idp = [], this._f = [], this._v = [], this._lv = [], this._sm = [], this._s = [], this._ve = [], this._sme = [], this._se = [], this._length = 0;
        }
        parse(t, e) {
            let i, s;
            Utils.isObjectLiteral(e) || (e = {
                0: e
            });
            let r = .5, n = [];
            for(let t1 in e)if (e.hasOwnProperty(t1)) {
                let i1 = e[t1];
                Utils.isObjectLiteral(i1) || (i1 = {
                    v: i1
                });
                let s1 = parseFloat(t1);
                "sm" === t1 ? r = i1.v : !isNaN(s1) && s1 >= 0 && s1 <= 2 && (i1.p = s1, i1.f = Utils.isFunction(i1.v), i1.lv = i1.f ? i1.v(0, 0) : i1.v, n.push(i1));
            }
            for(n = n.sort(function(t, e) {
                return t.p - e.p;
            }), s = n.length, i = 0; i < s; i++){
                let t2 = i === s - 1;
                if (n[i].hasOwnProperty("pe")) {
                    const t3 = i < s - 1 ? n[i + 1].p : 1;
                    n[i].pe > t3 && (n[i].pe = t3);
                } else n[i].pe = t2 ? n[i].p <= 1 ? 1 : 2 : n[i + 1].p;
                n[i].pe === n[i].p ? n[i].idp = 0 : n[i].idp = 1 / (n[i].pe - n[i].p);
            }
            for(i = 0; i < s; i++)if (n[i].hasOwnProperty("sm") || (n[i].sm = r), !n[i].hasOwnProperty("s")) {
                if (0 === i || i === s - 1 || 1 === n[i].p) n[i].s = t ? [
                    0,
                    0,
                    0,
                    0
                ] : 0;
                else {
                    const e1 = n[i - 1], s2 = n[i + 1];
                    if (e1.p === s2.p) n[i].s = t ? [
                        0,
                        0,
                        0,
                        0
                    ] : 0;
                    else if (t) {
                        const t4 = MultiSpline.getRgbaComponents(s2.lv), r1 = MultiSpline.getRgbaComponents(e1.lv), o = 1 / (s2.p - e1.p);
                        n[i].s = [
                            o * (t4[0] - r1[0]),
                            o * (t4[1] - r1[1]),
                            o * (t4[2] - r1[2]),
                            o * (t4[3] - r1[3])
                        ];
                    } else n[i].s = (s2.lv - e1.lv) / (s2.p - e1.p);
                }
            }
            for(i = 0; i < s - 1; i++)if (!n[i].f) {
                let e2 = i === s - 1;
                n[i].hasOwnProperty("ve") || (n[i].ve = e2 ? n[i].lv : n[i + 1].lv), Utils.isNumber(n[i].v) && Utils.isNumber(n[i].lv) && (n[i].hasOwnProperty("sme") || (n[i].sme = e2 ? r : n[i + 1].sm), n[i].hasOwnProperty("se") || (n[i].se = e2 ? t ? [
                    0,
                    0,
                    0,
                    0
                ] : 0 : n[i + 1].s), n[i].v = t ? MultiSpline.getSplineRgbaValueFunction(n[i].v, n[i].ve, n[i].p, n[i].pe, n[i].sm, n[i].sme, n[i].s, n[i].se) : MultiSpline.getSplineValueFunction(n[i].v, n[i].ve, n[i].p, n[i].pe, n[i].sm, n[i].sme, n[i].s, n[i].se), n[i].f = !0);
            }
            for(this.length && this._clear(), i = 0, s = n.length; i < s; i++)this._add(n[i]);
        }
        _add(t) {
            this._p.push(t.p || 0), this._pe.push(t.pe || 0), this._idp.push(t.idp || 0), this._f.push(t.f || !1), this._v.push(t.hasOwnProperty("v") ? t.v : 0), this._lv.push(t.lv || 0), this._sm.push(t.sm || 0), this._s.push(t.s || 0), this._ve.push(t.ve || 0), this._sme.push(t.sme || 0), this._se.push(t.se || 0), this._length++;
        }
        _getItem(t) {
            const e = this._length;
            if (!e) return -1;
            if (t < this._p[0]) return 0;
            for(let i = 0; i < e; i++)if (this._p[i] <= t && t < this._pe[i]) return i;
            return e - 1;
        }
        getValue(t) {
            const e = this._getItem(t);
            if (-1 !== e) {
                if (this._f[e]) {
                    const i = Math.min(1, Math.max(0, (t - this._p[e]) * this._idp[e]));
                    return this._v[e](i);
                }
                return this._v[e];
            }
        }
        get length() {
            return this._length;
        }
        static getRgbaComponents(t) {
            return [
                (t / 65536 | 0) % 256,
                (t / 256 | 0) % 256,
                t % 256,
                t / 16777216 | 0
            ];
        }
        static getSplineValueFunction(t, e, i, s, r, n, o, a) {
            let h = s - i;
            o *= h, a *= h;
            let l = MultiSpline.getSplineHelpers(t, e, r, n, o, a);
            return l ? function(i) {
                return 0 === i ? t : 1 === i ? e : MultiSpline.calculateSpline(l, i);
            } : function(i) {
                return 0 === i ? t : 1 === i ? e : e * i + t * (1 - i);
            };
        }
        static getSplineRgbaValueFunction(t, e, i, s, r, n, o, a) {
            let h = s - i;
            o[0] *= h, o[1] *= h, o[2] *= h, o[3] *= h, a[0] *= h, a[1] *= h, a[2] *= h, a[3] *= h;
            let l = MultiSpline.getRgbaComponents(t), _ = MultiSpline.getRgbaComponents(e), u = [
                MultiSpline.getSplineHelpers(l[0], _[0], r, n, o[0], a[0]),
                MultiSpline.getSplineHelpers(l[1], _[1], r, n, o[1], a[1]),
                MultiSpline.getSplineHelpers(l[2], _[2], r, n, o[2], a[2]),
                MultiSpline.getSplineHelpers(l[3], _[3], r, n, o[3], a[3])
            ];
            return u[0] ? function(i) {
                return 0 === i ? t : 1 === i ? e : MultiSpline.getArgbNumber([
                    Math.min(255, MultiSpline.calculateSpline(u[0], i)),
                    Math.min(255, MultiSpline.calculateSpline(u[1], i)),
                    Math.min(255, MultiSpline.calculateSpline(u[2], i)),
                    Math.min(255, MultiSpline.calculateSpline(u[3], i))
                ]);
            } : function(i) {
                return 0 === i ? t : 1 === i ? e : MultiSpline.mergeColors(e, t, i);
            };
        }
        static getSplineHelpers(t, e, i, s, r, n) {
            if (!i && !s) return null;
            let o = t + r * i, a = 1 - s, h = e - n * s;
            return [
                3 * i - 3 * a + 1,
                -6 * i + 3 * a,
                3 * i,
                3 * o - 3 * h + e - t,
                3 * (h + t) - 6 * o,
                3 * (o - t),
                t
            ];
        }
        static calculateSpline(t, e) {
            let i = t[0], s = t[1], r = t[2], n = t[3], o = t[4], a = t[5], h = t[6];
            if (-2 === i && -2 === n && 0 === r && 0 === a) return e;
            let l, _, u = .5;
            for(let t1 = 0; t1 < 20; t1++){
                if (l = u * (u * (u * i + s) + r), _ = e - l, _ > -0.00000001 && _ < 1e-8) return u * (u * (u * n + o) + a) + h;
                let t2 = u * (u * (3 * i) + 2 * s) + r;
                if (t2 > 1e-10 && t2 < 1e-10) break;
                u += _ / t2;
            }
            let c = 0, d = 1;
            for(let t3 = 0; t3 < 20; t3++){
                if (u = .5 * (c + d), l = u * (u * (u * i + s) + r), _ = e - l, _ > -0.00000001 && _ < 1e-8) return u * (u * (u * n + o) + a) + h;
                _ < 0 ? d = u : c = u;
            }
            return u;
        }
        static mergeColors(t, e, i) {
            let s = (t / 65536 | 0) % 256 * i + (e / 65536 | 0) % 256 * (1 - i), r = (t / 256 | 0) % 256 * i + (e / 256 | 0) % 256 * (1 - i), n = t % 256 * i + e % 256 * (1 - i), o = (t / 16777216 | 0) * i + (e / 16777216 | 0) * (1 - i);
            return 16777216 * Math.round(o) + 65536 * Math.round(s) + 256 * Math.round(r) + Math.round(n);
        }
        static getArgbNumber(t) {
            t[0] = Math.max(0, Math.min(255, t[0])), t[1] = Math.max(0, Math.min(255, t[1])), t[2] = Math.max(0, Math.min(255, t[2])), t[3] = Math.max(0, Math.min(255, t[3]));
            let e = ((0 | t[3]) << 24) + ((0 | t[0]) << 16) + ((0 | t[1]) << 8) + (0 | t[2]);
            return e < 0 && (e = 4294967295 + e + 1), e;
        }
    }
    class AnimationActionSettings {
        constructor(t){
            this.animationSettings = t, this._selector = "", this._items = new MultiSpline, this._props = [], this._propSetters = [], this._resetValue = void 0, this._hasResetValue = !1, this._hasColorProperty = void 0;
        }
        getResetValue() {
            return this._hasResetValue ? this._resetValue : this._items.getValue(0);
        }
        apply(t, e, i) {
            const s = this.getAnimatedElements(t);
            let r = this._items.getValue(e);
            if (void 0 === r || !s.length) return;
            if (1 !== i) {
                let t1 = this.getResetValue();
                Utils.isNumber(r) && Utils.isNumber(t1) && (r = this.hasColorProperty() ? StageUtils.mergeColors(r, t1, i) : StageUtils.mergeNumbers(r, t1, i));
            }
            const n = this._propSetters.length, o = s.length;
            for(let t2 = 0; t2 < o; t2++)for(let e1 = 0; e1 < n; e1++)this._propSetters[e1](s[t2], r);
        }
        getAnimatedElements(t) {
            return t.select(this._selector);
        }
        reset(t) {
            const e = this.getAnimatedElements(t);
            let i = this.getResetValue();
            if (void 0 === i || !e.length) return;
            const s = this._propSetters.length, r = e.length;
            for(let t1 = 0; t1 < r; t1++)for(let r1 = 0; r1 < s; r1++)this._propSetters[r1](e[t1], i);
        }
        set selector(t) {
            this._selector = t;
        }
        set t(t) {
            this.selector = t;
        }
        get resetValue() {
            return this._resetValue;
        }
        set resetValue(t) {
            this._resetValue = t, this._hasResetValue = void 0 !== t;
        }
        set rv(t) {
            this.resetValue = t;
        }
        set value(t) {
            this._items.parse(this.hasColorProperty(), t);
        }
        set v(t) {
            this.value = t;
        }
        set properties(t) {
            Array.isArray(t) || (t = [
                t
            ]), this._props = [], t.forEach((t)=>{
                this._props.push(t), this._propSetters.push(Element.getSetter(t));
            });
        }
        set property(t) {
            this._hasColorProperty = void 0, this.properties = t;
        }
        set p(t) {
            this.properties = t;
        }
        patch(t) {
            Base.patchObject(this, t);
        }
        hasColorProperty() {
            return void 0 === this._hasColorProperty && (this._hasColorProperty = !!this._props.length && Element.isColorProperty(this._props[0])), this._hasColorProperty;
        }
    }
    AnimationActionSettings.prototype.isAnimationActionSettings = !0;
    class AnimationSettings {
        constructor(){
            this._actions = [], this.delay = 0, this.duration = 1, this.repeat = 0, this.repeatOffset = 0, this.repeatDelay = 0, this.autostop = !1, this.stopMethod = AnimationSettings.STOP_METHODS.FADE, this._stopTimingFunction = "ease", this._stopTimingFunctionImpl = StageUtils.getTimingFunction(this._stopTimingFunction), this.stopDuration = 0, this.stopDelay = 0;
        }
        get actions() {
            return this._actions;
        }
        set actions(t) {
            this._actions = [];
            for(let e = 0, i = t.length; e < i; e++){
                const i1 = t[e];
                if (i1.isAnimationActionSettings) this._actions.push(i1);
                else {
                    const t1 = new AnimationActionSettings(this);
                    t1.patch(i1), this._actions.push(t1);
                }
            }
        }
        apply(t, e, i = 1) {
            this._actions.forEach(function(s) {
                s.apply(t, e, i);
            });
        }
        reset(t) {
            this._actions.forEach(function(e) {
                e.reset(t);
            });
        }
        get stopTimingFunction() {
            return this._stopTimingFunction;
        }
        set stopTimingFunction(t) {
            this._stopTimingFunction = t, this._stopTimingFunctionImpl = StageUtils.getTimingFunction(t);
        }
        get stopTimingFunctionImpl() {
            return this._stopTimingFunctionImpl;
        }
        patch(t) {
            Base.patchObject(this, t);
        }
    }
    AnimationSettings.STOP_METHODS = {
        FADE: "fade",
        REVERSE: "reverse",
        FORWARD: "forward",
        IMMEDIATE: "immediate",
        ONETOTWO: "onetotwo"
    };
    class Animation extends EventEmitter {
        constructor(t, e, i){
            super(), this.manager = t, this._settings = e, this._element = i, this._state = Animation.STATES.IDLE, this._p = 0, this._delayLeft = 0, this._repeatsLeft = 0, this._stopDelayLeft = 0, this._stopP = 0;
        }
        start() {
            this._element && this._element.attached ? (this._p = 0, this._delayLeft = this.settings.delay, this._repeatsLeft = this.settings.repeat, this._state = Animation.STATES.PLAYING, this.emit("start"), this.checkActive()) : console.warn("[Lightning] Element must be attached before starting animation");
        }
        play() {
            this._state === Animation.STATES.PAUSED ? (this._state = Animation.STATES.PLAYING, this.checkActive(), this.emit("resume")) : this._state == Animation.STATES.STOPPING && this.settings.stopMethod == AnimationSettings.STOP_METHODS.REVERSE ? (this._state = Animation.STATES.PLAYING, this.emit("stopContinue")) : this._state != Animation.STATES.PLAYING && this._state != Animation.STATES.FINISHED && this.start();
        }
        pause() {
            this._state === Animation.STATES.PLAYING && (this._state = Animation.STATES.PAUSED, this.emit("pause"));
        }
        replay() {
            this._state == Animation.STATES.FINISHED ? this.start() : this.play();
        }
        skipDelay() {
            this._delayLeft = 0, this._stopDelayLeft = 0;
        }
        finish() {
            this._state === Animation.STATES.PLAYING ? (this._delayLeft = 0, this._p = 1) : this._state === Animation.STATES.STOPPING && (this._stopDelayLeft = 0, this._p = 0);
        }
        stop() {
            this._state !== Animation.STATES.STOPPED && this._state !== Animation.STATES.IDLE && (this._stopDelayLeft = this.settings.stopDelay || 0, this.settings.stopMethod === AnimationSettings.STOP_METHODS.IMMEDIATE && !this._stopDelayLeft || this._delayLeft > 0 ? (this._state = Animation.STATES.STOPPING, this.emit("stop")) : (this.settings.stopMethod === AnimationSettings.STOP_METHODS.FADE && (this._stopP = 0), this._state = Animation.STATES.STOPPING, this.emit("stop")), this.checkActive());
        }
        stopNow() {
            this._state === Animation.STATES.STOPPED && this._state === Animation.STATES.IDLE || (this._state = Animation.STATES.STOPPING, this._p = 0, this.emit("stop"), this.reset(), this._state = Animation.STATES.STOPPED, this.emit("stopFinish"));
        }
        isPaused() {
            return this._state === Animation.STATES.PAUSED;
        }
        isPlaying() {
            return this._state === Animation.STATES.PLAYING;
        }
        isStopping() {
            return this._state === Animation.STATES.STOPPING;
        }
        isFinished() {
            return this._state === Animation.STATES.FINISHED;
        }
        checkActive() {
            this.isActive() && this.manager.addActive(this);
        }
        isActive() {
            return (this._state == Animation.STATES.PLAYING || this._state == Animation.STATES.STOPPING) && this._element && this._element.attached;
        }
        progress(t) {
            this._element && (this._progress(t), this.apply());
        }
        _progress(t) {
            if (this._state != Animation.STATES.STOPPING) {
                if (this._state == Animation.STATES.PLAYING) {
                    if (this._delayLeft > 0) {
                        if (this._delayLeft -= t, !(this._delayLeft < 0)) return;
                        t = -this._delayLeft, this._delayLeft = 0, this.emit("delayEnd");
                    }
                    0 === this.settings.duration ? this._p = 1 : this.settings.duration > 0 && (this._p += t / this.settings.duration), this._p >= 1 ? -1 == this.settings.repeat || this._repeatsLeft > 0 ? (this._repeatsLeft > 0 && this._repeatsLeft--, this._p = this.settings.repeatOffset, this.emit("progress", this._p), this.settings.repeatDelay && (this._delayLeft = this.settings.repeatDelay), this.emit("repeat", this._repeatsLeft)) : (this._p = 1, this.emit("progress", this._p), this._state = Animation.STATES.FINISHED, this.emit("finish"), this.settings.autostop && this.stop()) : this.emit("progress", this._p);
                }
            } else this._stopProgress(t);
        }
        _stopProgress(t) {
            let e = this._getStopDuration();
            if (this._stopDelayLeft > 0) {
                if (this._stopDelayLeft -= t, !(this._stopDelayLeft < 0)) return;
                t = -this._stopDelayLeft, this._stopDelayLeft = 0, this.emit("stopDelayEnd");
            }
            this.settings.stopMethod == AnimationSettings.STOP_METHODS.IMMEDIATE ? (this._state = Animation.STATES.STOPPED, this.emit("stopFinish")) : this.settings.stopMethod == AnimationSettings.STOP_METHODS.REVERSE ? (0 === e ? this._p = 0 : e > 0 && (this._p -= t / e), this._p <= 0 && (this._p = 0, this._state = Animation.STATES.STOPPED, this.emit("stopFinish"))) : this.settings.stopMethod == AnimationSettings.STOP_METHODS.FADE ? (this._progressStopTransition(t), this._stopP >= 1 && (this._p = 0, this._state = Animation.STATES.STOPPED, this.emit("stopFinish"))) : this.settings.stopMethod == AnimationSettings.STOP_METHODS.ONETOTWO ? this._p < 2 && (0 === e ? this._p = 2 : e > 0 && (this._p < 1 ? this._p += t / this.settings.duration : this._p += t / e), this._p >= 2 ? (this._p = 2, this._state = Animation.STATES.STOPPED, this.emit("stopFinish")) : this.emit("progress", this._p)) : this.settings.stopMethod == AnimationSettings.STOP_METHODS.FORWARD && this._p < 1 && (0 == this.settings.duration ? this._p = 1 : this._p += t / this.settings.duration, this._p >= 1 ? this.settings.stopMethod == AnimationSettings.STOP_METHODS.FORWARD ? (this._p = 1, this._state = Animation.STATES.STOPPED, this.emit("stopFinish")) : this._repeatsLeft > 0 ? (this._repeatsLeft--, this._p = 0, this.emit("repeat", this._repeatsLeft)) : (this._p = 1, this._state = Animation.STATES.STOPPED, this.emit("stopFinish")) : this.emit("progress", this._p));
        }
        _progressStopTransition(t) {
            if (this._stopP < 1) {
                if (this._stopDelayLeft > 0) {
                    if (this._stopDelayLeft -= t, !(this._stopDelayLeft < 0)) return;
                    t = -this._stopDelayLeft, this._stopDelayLeft = 0, this.emit("delayEnd");
                }
                const e = this._getStopDuration();
                0 == e ? this._stopP = 1 : this._stopP += t / e, this._stopP >= 1 && (this._stopP = 1);
            }
        }
        _getStopDuration() {
            return this.settings.stopDuration || this.settings.duration;
        }
        apply() {
            if (this._state === Animation.STATES.STOPPED) this.reset();
            else {
                let t = 1;
                this._state === Animation.STATES.STOPPING && this.settings.stopMethod === AnimationSettings.STOP_METHODS.FADE && (t = 1 - this.settings.stopTimingFunctionImpl(this._stopP)), this._settings.apply(this._element, this._p, t);
            }
        }
        reset() {
            this._settings.reset(this._element);
        }
        get state() {
            return this._state;
        }
        get p() {
            return this._p;
        }
        get delayLeft() {
            return this._delayLeft;
        }
        get element() {
            return this._element;
        }
        get frame() {
            return Math.round(this._p * this._settings.duration * 60);
        }
        get settings() {
            return this._settings;
        }
    }
    Animation.STATES = {
        IDLE: 0,
        PLAYING: 1,
        STOPPING: 2,
        STOPPED: 3,
        FINISHED: 4,
        PAUSED: 5
    };
    class AnimationManager {
        constructor(t){
            this.stage = t, this.stage.on("frameStart", ()=>this.progress()), this.active = new Set;
        }
        progress() {
            if (this.active.size) {
                let t = this.stage.dt, e = !1;
                this.active.forEach(function(i) {
                    i.isActive() ? i.progress(t) : e = !0;
                }), e && (this.active = new Set([
                    ...this.active
                ].filter((t)=>t.isActive())));
            }
        }
        createAnimation(t, e) {
            return Utils.isObjectLiteral(e) && (e = this.createSettings(e)), new Animation(this, e, t);
        }
        createSettings(t) {
            const e = new AnimationSettings;
            return Base.patchObject(e, t), e;
        }
        addActive(t) {
            this.active.add(t);
        }
    }
    class RectangleTexture extends Texture {
        _getLookupId() {
            return "__whitepix";
        }
        _getSourceLoader() {
            return function(t) {
                t(null, {
                    source: new Uint8Array([
                        255,
                        255,
                        255,
                        255
                    ]),
                    w: 1,
                    h: 1,
                    permanent: !0
                });
            };
        }
        isAutosizeTexture() {
            return !1;
        }
    }
    class Stage extends EventEmitter {
        constructor(t = {}){
            super(), this._setOptions(t), this._usedMemory = 0, this._lastGcFrame = 0, this._usedVramAlpha = 0, this._usedVramNonAlpha = 0;
            const e = Stage.platform ? Stage.platform : (class PlatformLoader {
                static load(t) {
                    return t.platform ? t.platform : WebPlatform;
                }
            }).load(t);
            this.platform = new e, this.platform.init && this.platform.init(this), this.gl = null, this.c2d = null;
            const i = this.getOption("context");
            i ? i.useProgram ? this.gl = i : this.c2d = i : !Utils.isWeb || Stage.isWebglSupported() && !this.getOption("canvas2d") ? this.gl = this.platform.createWebGLContext(this.getOption("w"), this.getOption("h")) : this.c2d = this.platform.createCanvasContext(this.getOption("w"), this.getOption("h")), this.gl && WebGLStateManager.enable(this.gl, "lightning"), this._mode = this.gl ? 0 : 1, this.getCanvas() && (this._options.w = this.getCanvas().width, this._options.h = this.getCanvas().height), 0 === this._mode ? Utils.isSpark ? this._renderer = new SparkRenderer(this) : this._renderer = new WebGLRenderer(this) : this._renderer = new C2dRenderer(this), this.setClearColor(this.getOption("clearColor")), this.frameCounter = 0, this.transitions = new TransitionManager(this), this.animations = new AnimationManager(this), this.textureManager = new TextureManager(this), this.textureThrottler = new TextureThrottler(this), this.startTime = 0, this.currentTime = 0, this.dt = 0, this.rectangleTexture = new RectangleTexture(this), this.rectangleTexture.load(), this.rectangleTexture.source.permanent = !0, this.ctx = new CoreContext(this), this._updateSourceTextures = new Set;
        }
        get renderer() {
            return this._renderer;
        }
        static isWebglSupported() {
            if (Utils.isNode) return !0;
            try {
                return !!window.WebGLRenderingContext;
            } catch (t) {
                return !1;
            }
        }
        get mode() {
            return this._mode;
        }
        isWebgl() {
            return 0 === this.mode;
        }
        isC2d() {
            return 1 === this.mode;
        }
        getOption(t) {
            return this._options[t];
        }
        _setOptions(t) {
            this._options = {};
            let opt = (e, i)=>{
                let s = t[e];
                this._options[e] = void 0 === s ? i : s;
            };
            opt("canvas", null), opt("context", null), opt("w", 1920), opt("h", 1080), opt("srcBasePath", null), opt("memoryPressure", 24e6), opt("bufferMemory", 2e6), opt("textRenderIssueMargin", 0), opt("fontSharp", {
                precision: .6666666667,
                fontSize: 24
            }), opt("clearColor", [
                0,
                0,
                0,
                0
            ]), opt("defaultFontFace", "sans-serif"), opt("fixedDt", 0), opt("useImageWorker", !0), opt("autostart", !0), opt("precision", 1), opt("canvas2d", !1), opt("platform", null), opt("readPixelsBeforeDraw", !1), opt("readPixelsAfterDraw", !1), opt("readPixelsAfterDrawThreshold", 0), opt("debugFrame", !1), opt("forceTxCanvasSource", !1), opt("pauseRafLoopOnIdle", !1);
        }
        setApplication(t) {
            this.application = t;
        }
        init() {
            this.application.getOption("debug") && this.platform._imageWorker && console.log("[Lightning] Using image worker!"), this.application.getOption("debug") && this.c2d && console.log("[Lightning] Using canvas2d renderer"), this.application.setAsRoot(), this.getOption("autostart") && this.platform.startLoop();
        }
        destroy() {
            this.platform.stopLoop(), this.platform.destroy(), this.ctx.destroy(), this.textureManager.destroy(), this._renderer.destroy();
        }
        stop() {
            this.platform.stopLoop();
        }
        resume() {
            this.platform.startLoop();
        }
        get root() {
            return this.application;
        }
        getCanvas() {
            return this._mode ? this.c2d.canvas : this.gl.canvas;
        }
        getRenderPrecision() {
            return this._options.precision;
        }
        addUpdateSourceTexture(t) {
            this._updatingFrame ? t._performUpdateSource() : this._updateSourceTextures.add(t);
        }
        removeUpdateSourceTexture(t) {
            this._updateSourceTextures && this._updateSourceTextures.delete(t);
        }
        hasUpdateSourceTexture(t) {
            return this._updateSourceTextures && this._updateSourceTextures.has(t);
        }
        _performUpdateSource() {
            this._updateSourceTextures.size && (this._updateSourceTextures.forEach((t)=>{
                t._performUpdateSource();
            }), this._updateSourceTextures = new Set);
        }
        _calculateDt() {
            this.startTime = this.currentTime, this.currentTime = this.platform.getHrTime(), this._options.fixedDt ? this.dt = this._options.fixedDt : this.dt = this.startTime ? .001 * (this.currentTime - this.startTime) : .02;
        }
        updateFrame() {
            this._calculateDt(), this.emit("frameStart"), this._performUpdateSource(), this.emit("update");
        }
        idleFrame() {
            this.textureThrottler.processSome(), this.emit("frameEnd"), this.frameCounter++;
        }
        renderFrame() {
            const t = this.ctx.hasRenderUpdates();
            this.textureThrottler.processSome(), t && (this._updatingFrame = !0, this.ctx.update(), this.ctx.render(), this._updatingFrame = !1), this.platform.nextFrame(t), this.emit("frameEnd"), this.frameCounter++;
        }
        isUpdatingFrame() {
            return this._updatingFrame;
        }
        drawFrame() {
            this.updateFrame(), this.renderFrame();
        }
        forceRenderUpdate() {
            this.root && this.root.core._parent.setHasRenderUpdates(1);
        }
        setClearColor(t) {
            this.forceRenderUpdate(), null === t ? this._clearColor = null : Array.isArray(t) ? this._clearColor = t : this._clearColor = StageUtils.getRgbaComponentsNormalized(t);
        }
        getClearColor() {
            return this._clearColor;
        }
        createElement(t) {
            return t ? this.element(t) : new Element(this);
        }
        createShader(t) {
            return Shader.create(this, t);
        }
        element(t) {
            if (t.isElement) return t;
            let e;
            return e = t.type ? new t.type(this) : new Element(this), e.patch(t), e;
        }
        c(t) {
            return this.element(t);
        }
        get w() {
            return this._options.w;
        }
        get h() {
            return this._options.h;
        }
        get coordsWidth() {
            return this.w / this._options.precision;
        }
        get coordsHeight() {
            return this.h / this._options.precision;
        }
        addMemoryUsage(t) {
            this._usedMemory += t, this._lastGcFrame !== this.frameCounter && this._usedMemory > this.getOption("memoryPressure") && (this.gc(!1), this._usedMemory > this.getOption("memoryPressure") - 2e6 && this.gc(!0));
        }
        get usedMemory() {
            return this._usedMemory;
        }
        addVramUsage(t, e) {
            e ? this._usedVramAlpha += t : this._usedVramNonAlpha += t;
        }
        get usedVramAlpha() {
            return this._usedVramAlpha;
        }
        get usedVramNonAlpha() {
            return this._usedVramNonAlpha;
        }
        get usedVram() {
            return this._usedVramAlpha + this._usedVramNonAlpha;
        }
        gc(t) {
            if (this._lastGcFrame !== this.frameCounter) {
                this._lastGcFrame = this.frameCounter;
                const e = this._usedMemory;
                if (this.gcTextureMemory(t), this.gcRenderTextureMemory(t), this.renderer.gc(t), this.application.getOption("debug")) {
                    console.log(`[Lightning] GC${t ? "[aggressive]" : ""}! Frame ${this._lastGcFrame} Freed ${((e - this._usedMemory) / 1e6).toFixed(2)}MP from GPU memory. Remaining: ${(this._usedMemory / 1e6).toFixed(2)}MP`);
                    const i = this._usedMemory - this.textureManager.usedMemory - this.ctx.usedMemory;
                    console.log(`[Lightning] Textures: ${(this.textureManager.usedMemory / 1e6).toFixed(2)}MP, Render Textures: ${(this.ctx.usedMemory / 1e6).toFixed(2)}MP, Renderer caches: ${(i / 1e6).toFixed(2)}MP`);
                }
            }
        }
        gcTextureMemory(t = !1) {
            t && this.ctx.root.visible ? (this.ctx.root.visible = !1, this.textureManager.gc(), this.ctx.root.visible = !0) : this.textureManager.gc();
        }
        gcRenderTextureMemory(t = !1) {
            t && this.root.visible ? (this.root.visible = !1, this.ctx.freeUnusedRenderTextures(0), this.root.visible = !0) : this.ctx.freeUnusedRenderTextures(0);
        }
        getDrawingCanvas() {
            return this.platform.getDrawingCanvas();
        }
        update() {
            this.ctx.update();
        }
        addServiceProvider(t) {
            Utils.isSpark && this.platform.addServiceProvider(t);
        }
        getChildrenByPosition(t, e) {
            const i = [];
            return this.root.core.update(), this.root.core.collectAtCoord(t, e, i), i;
        }
    }
    class Application extends Component {
        constructor(t = {}, e){
            Application._temp_options = t, Application.booting = !0;
            super(new Stage(t.stage), e), Application.booting = !1, this.__updateFocusCounter = 0, this.__keypressTimers = new Map, this.__hoveredChild = null, this.stage.init(), this.updateFocusSettings(), this.__keymap = this.getOption("keys"), this.__keymap && (this.stage.platform.registerKeydownHandler((t)=>{
                this._receiveKeydown(t);
            }), this.stage.platform.registerKeyupHandler((t)=>{
                this._receiveKeyup(t);
            })), this.getOption("enablePointer") && (this.stage.platform.registerClickHandler((t)=>{
                this._receiveClick(t);
            }), this.stage.platform.registerHoverHandler((t)=>{
                this._receiveHover(t);
            }), this.stage.platform.registerScrollWheelHandler((t)=>{
                this._recieveScrollWheel(t);
            }), this.cursor = "default");
        }
        getOption(t) {
            return this.__options[t];
        }
        _setOptions(t) {
            this.__options = {};
            let opt = (e, i)=>{
                let s = t[e];
                this.__options[e] = void 0 === s ? i : s;
            };
            opt("debug", !1), opt("keys", {
                38: "Up",
                40: "Down",
                37: "Left",
                39: "Right",
                13: "Enter",
                8: "Back",
                27: "Exit"
            }), opt("enablePointer", !1);
        }
        __construct() {
            this.stage.setApplication(this), this._setOptions(Application._temp_options), delete Application._temp_options, super.__construct();
        }
        __init() {
            super.__init(), this.__updateFocus();
        }
        updateFocusPath() {
            this.__updateFocus();
        }
        __updateFocus() {
            const t = this.__updateFocusRec();
            !Application.booting && t && this.updateFocusSettings();
        }
        __updateFocusRec() {
            const t = ++this.__updateFocusCounter;
            this.__updateFocusId = t;
            const e = this.__getFocusPath(), i = e[e.length - 1], s = this._focusPath ? this._focusPath[this._focusPath.length - 1] : void 0;
            if (!s) {
                this._focusPath = [];
                for(let s1 = 0, r = e.length; s1 < r; s1++){
                    this._focusPath.push(e[s1]), this._focusPath[s1]._focus(i, void 0);
                    if (this.__updateFocusId !== t) return !1;
                }
                return !0;
            }
            {
                let r1, n = Math.min(this._focusPath.length, e.length);
                for(r1 = 0; r1 < n && this._focusPath[r1] === e[r1]; r1++);
                if (this._focusPath.length !== e.length || r1 !== e.length) {
                    this.getOption("debug") && console.log("[Lightning] Focus changed: " + i.getLocationString());
                    for(let e1 = this._focusPath.length - 1; e1 >= r1; e1--){
                        this._focusPath.pop()._unfocus(i, s);
                        if (this.__updateFocusId !== t) return !1;
                    }
                    for(let n1 = r1, o = e.length; n1 < o; n1++){
                        this._focusPath.push(e[n1]), this._focusPath[n1]._focus(i, s);
                        if (this.__updateFocusId !== t) return !1;
                    }
                    for(let t1 = 0; t1 < r1; t1++)this._focusPath[t1]._focusChange(i, s);
                }
            }
            return !0;
        }
        updateFocusSettings() {
            const t = this._focusPath[this._focusPath.length - 1], e = {}, i = Component.prototype._setFocusSettings;
            for(let t1 = 0, s = this._focusPath.length; t1 < s; t1++)this._focusPath[t1]._setFocusSettings !== i && this._focusPath[t1]._setFocusSettings(e);
            const s1 = Component.prototype._handleFocusSettings;
            for(let i1 = 0, r = this._focusPath.length; i1 < r; i1++)this._focusPath[i1]._handleFocusSettings !== s1 && this._focusPath[i1]._handleFocusSettings(e, this.__prevFocusSettings, t);
            this.__prevFocusSettings = e;
        }
        _handleFocusSettings(t, e, i, s) {}
        __getFocusPath() {
            const t = [
                this
            ];
            let e = this;
            for(;;){
                const i = e._getFocused();
                if (!i || i === e) break;
                let s = i.cparent;
                if (s === e) t.push(i);
                else {
                    const r = [
                        i
                    ];
                    do s || e._throwError("Return value for _getFocused must be an attached descendant component but its '" + i.getLocationString() + "'"), r.push(s), s = s.cparent;
                    while (s !== e);
                    for(let e1 = 0, i1 = r.length; e1 < i1; e1++)t.push(r[i1 - e1 - 1]);
                }
                e = i;
            }
            return t;
        }
        get focusPath() {
            return this._focusPath;
        }
        focusTopDownEvent(t, ...e) {
            const i = this.focusPath, s = i.length;
            for(let r = 0; r < s; r++){
                const s1 = i[r]._getMostSpecificHandledMember(t);
                if (void 0 !== s1) {
                    if (!1 !== i[r][s1](...e)) return !0;
                }
            }
            return !1;
        }
        focusBottomUpEvent(t, ...e) {
            const i = this.focusPath;
            for(let s = i.length - 1; s >= 0; s--){
                const r = i[s]._getMostSpecificHandledMember(t);
                if (void 0 !== r) {
                    if (!1 !== i[s][r](...e)) return !0;
                }
            }
            return !1;
        }
        _receiveKeydown(t) {
            const e = t, i = this.__keymap[t.keyCode], s = this.focusPath;
            let r;
            if (i && (r = Array.isArray(i) ? i : [
                i
            ]), r) for(let t1 = 0, i1 = r.length; t1 < i1; t1++){
                const i2 = this.__keypressTimers.has(r[t1]);
                if (s[s.length - 1].longpress && i2) return;
                this.stage.application.focusTopDownEvent([
                    "_capture" + r[t1],
                    "_captureKey"
                ], e) || this.stage.application.focusBottomUpEvent([
                    "_handle" + r[t1],
                    "_handleKey"
                ], e);
            }
            else this.stage.application.focusTopDownEvent([
                "_captureKey"
            ], e) || this.stage.application.focusBottomUpEvent([
                "_handleKey"
            ], e);
            this.updateFocusPath();
            const n = s[s.length - 1];
            if (r && n.longpress) for(let t2 = 0, e1 = r.length; t2 < e1; t2++)this._startLongpressTimer(r[t2], n);
        }
        _receiveKeyup(t) {
            const e = t, i = this.__keymap[t.keyCode];
            let s;
            if (i && (s = Array.isArray(i) ? i : [
                i
            ]), s) for(let t1 = 0, i1 = s.length; t1 < i1; t1++)this.stage.application.focusTopDownEvent([
                `_capture${s[t1]}Release`,
                "_captureKeyRelease"
            ], e) || this.stage.application.focusBottomUpEvent([
                `_handle${s[t1]}Release`,
                "_handleKeyRelease"
            ], e);
            else this.stage.application.focusTopDownEvent([
                "_captureKeyRelease"
            ], e) || this.stage.application.focusBottomUpEvent([
                "_handleKeyRelease"
            ], e);
            if (this.updateFocusPath(), s) for(let t2 = 0, e1 = s.length; t2 < e1; t2++)this.__keypressTimers.has(s[t2]) && (clearTimeout(this.__keypressTimers.get(s[t2])), this.__keypressTimers.delete(s[t2]));
        }
        _startLongpressTimer(t, e) {
            const i = e.longpress, s = t.toLowerCase();
            if (i[s]) {
                const r = i[s];
                Utils.isNumber(r) ? this.__keypressTimers.set(t, setTimeout(()=>{
                    this.stage.application.focusTopDownEvent([
                        `_capture${t}Long`,
                        "_captureKey"
                    ], {}) || this.stage.application.focusBottomUpEvent([
                        `_handle${t}Long`,
                        "_handleKey"
                    ], {}), this.__keypressTimers.delete(t);
                }, r || 500)) : e._throwError("config value for longpress must be a number");
            }
        }
        _recieveScrollWheel(t) {
            const e = t, { clientX: i , clientY: s  } = e;
            i <= this.stage.w && s <= this.stage.h && (this.fireTopDownScrollWheelHandler("_captureScroll", e) || this.fireBottomUpScrollWheelHandler("_handleScroll", e));
        }
        fireTopDownScrollWheelHandler(t, e) {
            let i = this.stage.application.children, s = this._findChildren([], i).reverse(), r = s.length;
            for(; r--;){
                const i1 = s[r];
                if (i1 && i1[t]) return i1._captureScroll(e), !0;
            }
            return !1;
        }
        fireBottomUpScrollWheelHandler(t, e) {
            const { clientX: i , clientY: s  } = e;
            let r = this._getTargetChild(i, s);
            for(; null !== r;){
                if (r && r[t]) return r._handleScroll(e), !0;
                r = r.parent;
            }
            return !1;
        }
        _receiveClick(t) {
            const e = t, { clientX: i , clientY: s  } = e;
            i <= this.stage.w && s <= this.stage.h && this.stage.application.fireBottomUpClickHandler(e);
        }
        fireBottomUpClickHandler(t) {
            const { clientX: e , clientY: i  } = t, s = this._getTargetChild(e, i);
            let r = s;
            for(; null !== r;){
                if (r && r._handleClick) {
                    r._handleClick(s);
                    break;
                }
                r = r.parent;
            }
        }
        _receiveHover(t) {
            const e = t, { clientX: i , clientY: s  } = e;
            i <= this.stage.w && s <= this.stage.h && this.stage.application.fireBottomUpHoverHandler(e);
        }
        fireBottomUpHoverHandler(t) {
            const { clientX: e , clientY: i  } = t, s = this._getTargetChild(e, i);
            if (s !== this.__hoveredChild) {
                let t1 = new Set, e1 = new Set;
                if (s && (e1 = new Set(s.getAncestors())), this.__hoveredChild) {
                    t1 = new Set(this.__hoveredChild.getAncestors());
                    for (const i1 of [
                        ...t1
                    ].filter((t)=>!e1.has(t))){
                        const t2 = Component.getComponent(i1);
                        t2._handleUnhover && t2._handleUnhover(i1), i1.parent && i1.parent.cursor && (this.stage.getCanvas().style.cursor = i1.parent.cursor);
                    }
                }
                this.__hoveredChild = s;
                const i2 = [
                    ...e1
                ].filter((e)=>!t1.has(e));
                for (const t3 of i2){
                    const e2 = Component.getComponent(t3);
                    e2._handleHover && e2._handleHover(t3);
                }
                const r = i2[0];
                if (r && r.cursor && (this.stage.getCanvas().style.cursor = r.cursor), 0 === i2.length && s) {
                    const t4 = Component.getComponent(s);
                    t4._handleHover && t4._handleHover(s);
                }
            }
        }
        _getTargetChild(t, e) {
            let i = this.stage.application.children, s = this._findChildren([], i), r = this._withinClickableRange(s, t, e);
            return r.sort((t, e)=>t.zIndex > e.zIndex ? 1 : t.zIndex < e.zIndex ? -1 : t.id > e.id ? 1 : -1), r.length ? r.slice(-1)[0] : null;
        }
        _findChildren(t, e) {
            let i = e.length;
            for(; i--;){
                const s = e[i];
                s.__active && s.collision && (!0 === s.collision && t.push(s), s.hasChildren() && this._findChildren(t, s.children));
            }
            return t;
        }
        _withinClickableRange(t, e, i) {
            let s = t.length;
            const r = [];
            for(; s--;){
                const n = t[s], o = this.stage.getRenderPrecision(), a = n.core._worldContext, h = a.px * o, l = a.py * o, _ = n.finalW * a.ta * o, u = n.finalH * a.td * o;
                if (!(h > this.stage.w || l > this.stage.h)) {
                    if (n.parent.core._scissor) {
                        const t1 = n.parent.core._scissor.map((t)=>t * o);
                        if (!this._testCollision(e, i, ...t1)) continue;
                    }
                    this._testCollision(e, i, h, l, _, u) && r.push(n);
                }
            }
            return r;
        }
        _testCollision(t, e, i, s, r, n) {
            return t >= i && t <= i + r && e >= s && e <= s + n;
        }
        destroy() {
            this._destroyed || (this._destroy(), this.stage.destroy(), this._destroyed = !0);
        }
        _destroy() {
            if (this.stage.setApplication(void 0), this._updateAttachedFlag(), this._updateEnabledFlag(), this.__keypressTimers.size) {
                for (const t of this.__keypressTimers.values())clearTimeout(t);
                this.__keypressTimers.clear();
            }
        }
        getCanvas() {
            return this.stage.getCanvas();
        }
    }
    class StaticCanvasTexture extends Texture {
        constructor(t){
            super(t), this._factory = void 0, this._lookupId = void 0;
        }
        set content({ factory: t , lookupId: e  }) {
            this._factory = t, this._lookupId = e, this._changed();
        }
        _getIsValid() {
            return !!this._factory;
        }
        _getLookupId() {
            return this._lookupId;
        }
        _getSourceLoader() {
            const t = this._factory;
            return (e)=>t((t, i)=>{
                    if (t) return e(t);
                    e(null, this.stage.platform.getTextureOptionsForDrawingCanvas(i));
                }, this.stage);
        }
    }
    class Tools {
        static getCanvasTexture(t, e) {
            return {
                type: StaticCanvasTexture,
                content: {
                    factory: t,
                    lookupId: e
                }
            };
        }
        static getRoundRect(t, e, i, s, r, n, o) {
            Array.isArray(i) || (i = [
                i,
                i,
                i,
                i
            ]);
            let a = "rect" + [
                t,
                e,
                s,
                r,
                n ? 1 : 0,
                o
            ].concat(i).join(",");
            return Tools.getCanvasTexture((a, h)=>{
                Utils.isSpark ? h.platform.createRoundRect(a, h, t, e, i, s, r, n, o) : a(null, this.createRoundRect(h, t, e, i, s, r, n, o));
            }, a);
        }
        static createRoundRect(t, e, i, s, r, n, o, a) {
            void 0 === o && (o = !0), void 0 === r && (r = 0);
            let h = t.platform.getDrawingCanvas(), l = h.getContext("2d");
            l.imageSmoothingEnabled = !0, h.width = e + r + 2, h.height = i + r + 2, l.beginPath();
            let _ = .5 * r + 1, u = .5 * r + 1;
            return l.moveTo(_ + s[0], u), l.lineTo(_ + e - s[1], u), l.arcTo(_ + e, u, _ + e, u + s[1], s[1]), l.lineTo(_ + e, u + i - s[2]), l.arcTo(_ + e, u + i, _ + e - s[2], u + i, s[2]), l.lineTo(_ + s[3], u + i), l.arcTo(_, u + i, _, u + i - s[3], s[3]), l.lineTo(_, u + s[0]), l.arcTo(_, u, _ + s[0], u, s[0]), l.closePath(), o && (Utils.isNumber(a) ? l.fillStyle = StageUtils.getRgbaString(a) : l.fillStyle = "white", l.fill()), r && (Utils.isNumber(n) ? l.strokeStyle = StageUtils.getRgbaString(n) : l.strokeStyle = "white", l.lineWidth = r, l.stroke()), h;
        }
        static getShadowRect(t, e, i = 0, s = 5, r = 2 * s) {
            Array.isArray(i) || (i = [
                i,
                i,
                i,
                i
            ]);
            let n = "shadow" + [
                t,
                e,
                s,
                r
            ].concat(i).join(",");
            return Tools.getCanvasTexture((n, o)=>{
                Utils.isSpark ? o.platform.createShadowRect(n, o, t, e, i, s, r) : n(null, this.createShadowRect(o, t, e, i, s, r));
            }, n);
        }
        static createShadowRect(t, e, i, s, r, n) {
            let o = t.platform.getDrawingCanvas(), a = o.getContext("2d");
            a.imageSmoothingEnabled = !0, o.width = e + 2 * n, o.height = i + 2 * n, a.globalAlpha = .01, a.fillRect(0, 0, .01, .01), a.globalAlpha = 1, a.shadowColor = StageUtils.getRgbaString(4294967295), a.fillStyle = StageUtils.getRgbaString(4294967295), a.shadowBlur = r, a.shadowOffsetX = e + 10 + n, a.shadowOffsetY = n, a.beginPath();
            const h = -(e + 10);
            return a.moveTo(h + s[0], 0), a.lineTo(h + e - s[1], 0), a.arcTo(h + e, 0, h + e, 0 + s[1], s[1]), a.lineTo(h + e, 0 + i - s[2]), a.arcTo(h + e, 0 + i, h + e - s[2], 0 + i, s[2]), a.lineTo(h + s[3], 0 + i), a.arcTo(h, 0 + i, h, 0 + i - s[3], s[3]), a.lineTo(h, 0 + s[0]), a.arcTo(h, 0, h + s[0], 0, s[0]), a.closePath(), a.fill(), o;
        }
        static getSvgTexture(t, e, i) {
            let s = "svg" + [
                e,
                i,
                t
            ].join(",");
            return Tools.getCanvasTexture((s, r)=>{
                Utils.isSpark ? r.platform.createSvg(s, r, t, e, i) : this.createSvg(s, r, t, e, i);
            }, s);
        }
        static createSvg(t, e, i, s, r) {
            let n = e.platform.getDrawingCanvas(), o = n.getContext("2d");
            o.imageSmoothingEnabled = !0;
            let a = new Image;
            a.onload = ()=>{
                n.width = s, n.height = r, o.drawImage(a, 0, 0, n.width, n.height), t(null, n);
            }, a.onError = (e)=>{
                t(e);
            }, Utils.isPS4 || (a.crossOrigin = "Anonymous"), a.src = i;
        }
    }
    class ObjMerger {
        static isMf(t) {
            return Utils.isFunction(t) && t.__mf;
        }
        static mf(t) {
            return t.__mf = !0, t;
        }
        static merge(t, e) {
            const i = Object.keys(t), s = Object.keys(e);
            if (!s.length) return t;
            const r = {}, n = {};
            for(let t1 = 0, e1 = s.length; t1 < e1; t1++){
                const e2 = s[t1];
                r[e2] = -1, n[e2] = t1;
            }
            for(let t2 = 0, e3 = i.length; t2 < e3; t2++){
                const e4 = i[t2];
                r[e4] = t2, void 0 === n[e4] && (n[e4] = -1);
            }
            const o = i.length, a = {};
            for(let o1 = 0, h = s.length; o1 < h; o1++){
                const h1 = s[o1], l = r[h1];
                let _ = l;
                for(; --_ >= 0;){
                    if (-1 !== n[i[_]]) break;
                }
                for(; ++_ < l;){
                    const e5 = i[_];
                    a[e5] = t[e5];
                }
                const u = e[h1], c = t[h1];
                let d;
                d = this.isMf(u) ? u(c) : Utils.isObjectLiteral(c) && Utils.isObjectLiteral(u) ? ObjMerger.merge(c, u) : u, void 0 !== d && (a[h1] = d);
            }
            let h2 = o;
            for(; --h2 >= 0;){
                if (-1 !== n[i[h2]]) break;
            }
            for(; ++h2 < o;){
                const e6 = i[h2];
                a[e6] = t[e6];
            }
            return a;
        }
    }
    class ObjectListProxy extends ObjectList {
        constructor(t){
            super(), this._target = t;
        }
        onAdd(t, e) {
            this._target.addAt(t, e);
        }
        onRemove(t, e) {
            this._target.removeAt(e);
        }
        onSync(t, e, i) {
            this._target._setByArray(i);
        }
        onSet(t, e) {
            this._target.setAt(t, e);
        }
        onMove(t, e, i) {
            this._target.setAt(t, i);
        }
        createItem(t) {
            return this._target.createItem(t);
        }
        isItem(t) {
            return this._target.isItem(t);
        }
    }
    class ObjectListWrapper extends ObjectListProxy {
        constructor(t, e){
            super(t), this._wrap = e;
        }
        wrap(t) {
            let e = this._wrap(t);
            return t._wrapper = e, e;
        }
        onAdd(t, e) {
            t = this.wrap(t), super.onAdd(t, e);
        }
        onRemove(t, e) {
            super.onRemove(t, e);
        }
        onSync(t, e, i) {
            e.forEach((t)=>this.wrap(t)), i = i.map((t)=>t._wrapper), super.onSync(t, e, i);
        }
        onSet(t, e) {
            t = this.wrap(t), super.onSet(t, e);
        }
        onMove(t, e, i) {
            super.onMove(t, e, i);
        }
    }
    class NoiseTexture extends Texture {
        _getLookupId() {
            return "__noise";
        }
        _getSourceLoader() {
            const t = this.stage.gl;
            return function(e) {
                const i = new Uint8Array(65536);
                for(let t1 = 0; t1 < 65536; t1 += 4){
                    const e1 = Math.floor(256 * Math.random());
                    i[t1] = e1, i[t1 + 1] = e1, i[t1 + 2] = e1, i[t1 + 3] = 255;
                }
                const s = {};
                t && (s[t.TEXTURE_WRAP_S] = t.REPEAT, s[t.TEXTURE_WRAP_T] = t.REPEAT, s[t.TEXTURE_MIN_FILTER] = t.NEAREST, s[t.TEXTURE_MAG_FILTER] = t.NEAREST), e(null, {
                    source: i,
                    w: 128,
                    h: 128,
                    texParams: s
                });
            };
        }
    }
    class HtmlTexture extends Texture {
        constructor(t){
            super(t), this._htmlElement = void 0, this._scale = 1;
        }
        set htmlElement(t) {
            this._htmlElement = t, this._changed();
        }
        get htmlElement() {
            return this._htmlElement;
        }
        set scale(t) {
            this._scale = t, this._changed();
        }
        get scale() {
            return this._scale;
        }
        set html(t) {
            if (t) {
                const e = document.createElement("div");
                e.innerHTML = "<div>" + t + "</div>", this.htmlElement = e.firstElementChild;
            } else this.htmlElement = void 0;
        }
        get html() {
            return this._htmlElement.innerHTML;
        }
        _getIsValid() {
            return this.htmlElement;
        }
        _getLookupId() {
            return this._scale + ":" + this._htmlElement.innerHTML;
        }
        _getSourceLoader() {
            const t = this._htmlElement, e = this._scale;
            return function(i) {
                if (!window.html2canvas) return i(new Error("Please include html2canvas (https://html2canvas.hertzen.com/)"));
                const s = HtmlTexture.getPreloadArea();
                s.appendChild(t), html2canvas(t, {
                    backgroundColor: null,
                    scale: e
                }).then(function(e) {
                    if (s.removeChild(t), 0 === e.height) return i(new Error("Canvas height is 0"));
                    i(null, {
                        source: e,
                        width: e.width,
                        height: e.height
                    });
                }).catch((t)=>{
                    console.error("[Lightning]", t);
                });
            };
        }
        static getPreloadArea() {
            return this._preloadArea || (this._preloadArea = document.createElement("div"), this._preloadArea.attachShadow && this._preloadArea.attachShadow({
                mode: "closed"
            }), this._preloadArea.style.opacity = 0, this._preloadArea.style.pointerEvents = "none", this._preloadArea.style.position = "fixed", this._preloadArea.style.display = "block", this._preloadArea.style.top = "100vh", this._preloadArea.style.overflow = "hidden", document.body.appendChild(this._preloadArea)), this._preloadArea;
        }
    }
    class ListItems extends ObjectListWrapper {
        constructor(t){
            super(t._wrapper._children, (t)=>{
                let e = t.stage.createElement();
                return e.add(t), e.visible = !1, e;
            }), this.list = t;
        }
        onAdd(t, e) {
            super.onAdd(t, e), this.checkStarted(e);
        }
        checkStarted(t) {
            this.list._reloadVisibleElements = !0, this.list._started ? (1 === this.list.length ? this.list.setIndex(0, !0, !0) : this.list._index >= this.list.length && this.list.setIndex(0), this.list.update()) : this.list.start();
        }
        onRemove(t, e) {
            super.onRemove(t, e);
            let i = this.list.realIndex;
            i === e ? (i === this.list.length && i--, i >= 0 && this.list.setIndex(i)) : i > e && this.list.setIndex(i - 1), this.list._reloadVisibleElements = !0;
        }
        onSet(t, e) {
            super.onSet(t, e), this.checkStarted(e);
        }
        onSync(t, e, i) {
            super.onSync(t, e, i), this.checkStarted(0);
        }
        get _signalProxy() {
            return !0;
        }
    }
    class LinearBlurShader extends DefaultShader {
        constructor(t){
            super(t), this._direction = new Float32Array([
                1,
                0
            ]), this._kernelRadius = 1;
        }
        get x() {
            return this._direction[0];
        }
        set x(t) {
            this._direction[0] = t, this.redraw();
        }
        get y() {
            return this._direction[1];
        }
        set y(t) {
            this._direction[1] = t, this.redraw();
        }
        get kernelRadius() {
            return this._kernelRadius;
        }
        set kernelRadius(t) {
            this._kernelRadius = t, this.redraw();
        }
        useDefault() {
            return 0 === this._kernelRadius;
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("direction", this._direction, this.gl.uniform2fv), this._setUniform("kernelRadius", this._kernelRadius, this.gl.uniform1i);
            const e = t.getRenderWidth(), i = t.getRenderHeight();
            this._setUniform("resolution", new Float32Array([
                e,
                i
            ]), this.gl.uniform2fv);
        }
    }
    LinearBlurShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    uniform vec2 resolution;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform vec2 direction;\n    uniform int kernelRadius;\n    \n    vec4 blur1(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n        vec4 color = vec4(0.0);\n        vec2 off1 = vec2(1.3333333333333333) * direction;\n        color += texture2D(image, uv) * 0.29411764705882354;\n        color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;\n        color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;\n        return color; \n    }\n    \n    vec4 blur2(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n        vec4 color = vec4(0.0);\n        vec2 off1 = vec2(1.3846153846) * direction;\n        vec2 off2 = vec2(3.2307692308) * direction;\n        color += texture2D(image, uv) * 0.2270270270;\n        color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n        color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n        color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n        color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n        return color;\n    }\n    \n    vec4 blur3(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n        vec4 color = vec4(0.0);\n        vec2 off1 = vec2(1.411764705882353) * direction;\n        vec2 off2 = vec2(3.2941176470588234) * direction;\n        vec2 off3 = vec2(5.176470588235294) * direction;\n        color += texture2D(image, uv) * 0.1964825501511404;\n        color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;\n        color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;\n        color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;\n        color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;\n        color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;\n        color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;\n        return color;\n    }    \n\n    void main(void){\n        if (kernelRadius == 1) {\n            gl_FragColor = blur1(uSampler, vTextureCoord, resolution, direction) * vColor;\n        } else if (kernelRadius == 2) {\n            gl_FragColor = blur2(uSampler, vTextureCoord, resolution, direction) * vColor;\n        } else {\n            gl_FragColor = blur3(uSampler, vTextureCoord, resolution, direction) * vColor;\n        }\n    }\n";
    class BoxBlurShader extends DefaultShader {
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = 1 / t.getTextureWidth(0), i = 1 / t.getTextureHeight(0);
            this._setUniform("stepTextureCoord", new Float32Array([
                e,
                i
            ]), this.gl.uniform2fv);
        }
    }
    BoxBlurShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    uniform vec2 stepTextureCoord;\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec4 vColor;\n    varying vec2 vTextureCoordUl;\n    varying vec2 vTextureCoordUr;\n    varying vec2 vTextureCoordBl;\n    varying vec2 vTextureCoordBr;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoordUl = aTextureCoord - stepTextureCoord;\n        vTextureCoordBr = aTextureCoord + stepTextureCoord;\n        vTextureCoordUr = vec2(vTextureCoordBr.x, vTextureCoordUl.y);\n        vTextureCoordBl = vec2(vTextureCoordUl.x, vTextureCoordBr.y);\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", BoxBlurShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoordUl;\n    varying vec2 vTextureCoordUr;\n    varying vec2 vTextureCoordBl;\n    varying vec2 vTextureCoordBr;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    void main(void){\n        vec4 color = 0.25 * (texture2D(uSampler, vTextureCoordUl) + texture2D(uSampler, vTextureCoordUr) + texture2D(uSampler, vTextureCoordBl) + texture2D(uSampler, vTextureCoordBr));\n        gl_FragColor = color * vColor;\n    }\n";
    class BlurShader extends DefaultShader$1 {
        constructor(t){
            super(t), this._kernelRadius = 1;
        }
        get kernelRadius() {
            return this._kernelRadius;
        }
        set kernelRadius(t) {
            this._kernelRadius = t, this.redraw();
        }
        useDefault() {
            return 0 === this._amount;
        }
        _beforeDrawEl({ target: t  }) {
            t.ctx.filter = "blur(" + this._kernelRadius + "px)";
        }
        _afterDrawEl({ target: t  }) {
            t.ctx.filter = "none";
        }
    }
    class C2dFastBlurComponent extends Component {
        static _template() {
            return {
                forceZIndexContext: !0,
                rtt: !0,
                Textwrap: {
                    shader: {
                        type: BlurShader
                    },
                    Content: {}
                }
            };
        }
        constructor(t){
            super(t), this._textwrap = this.sel("Textwrap"), this._wrapper = this.sel("Textwrap>Content"), this._amount = 0, this._paddingX = 0, this._paddingY = 0;
        }
        static getSpline() {
            return this._multiSpline || (this._multiSpline = new MultiSpline, this._multiSpline.parse(!1, {
                0: 0,
                .25: 1.5,
                .5: 5.5,
                .75: 18,
                1: 39
            })), this._multiSpline;
        }
        get content() {
            return this.sel("Textwrap>Content");
        }
        set content(t) {
            this.sel("Textwrap>Content").patch(t, !0);
        }
        set padding(t) {
            this._paddingX = t, this._paddingY = t, this._updateBlurSize();
        }
        set paddingX(t) {
            this._paddingX = t, this._updateBlurSize();
        }
        set paddingY(t) {
            this._paddingY = t, this._updateBlurSize();
        }
        _updateBlurSize() {
            let t = this.renderWidth, e = this.renderHeight, i = this._paddingX, s = this._paddingY;
            this._wrapper.x = i, this._textwrap.x = -i, this._wrapper.y = s, this._textwrap.y = -s, this._textwrap.w = t + 2 * i, this._textwrap.h = e + 2 * s;
        }
        get amount() {
            return this._amount;
        }
        set amount(t) {
            this._amount = t, this._textwrap.shader.kernelRadius = C2dFastBlurComponent._amountToKernelRadius(t);
        }
        static _amountToKernelRadius(t) {
            return C2dFastBlurComponent.getSpline().getValue(Math.min(1, .25 * t));
        }
        get _signalProxy() {
            return !0;
        }
    }
    class WebGLFastBlurComponent extends Component {
        static _template() {
            const onUpdate = function(t, e) {
                if (130 & e._recalc) {
                    const t1 = e.w, i = e.h;
                    let s = e;
                    do s = s._children[0], s._element.w = t1, s._element.h = i;
                    while (s._children);
                }
            };
            return {
                Textwrap: {
                    rtt: !0,
                    forceZIndexContext: !0,
                    renderOffscreen: !0,
                    Content: {}
                },
                Layers: {
                    L0: {
                        rtt: !0,
                        onUpdate: onUpdate,
                        renderOffscreen: !0,
                        visible: !1,
                        Content: {
                            shader: {
                                type: BoxBlurShader
                            }
                        }
                    },
                    L1: {
                        rtt: !0,
                        onUpdate: onUpdate,
                        renderOffscreen: !0,
                        visible: !1,
                        Content: {
                            shader: {
                                type: BoxBlurShader
                            }
                        }
                    },
                    L2: {
                        rtt: !0,
                        onUpdate: onUpdate,
                        renderOffscreen: !0,
                        visible: !1,
                        Content: {
                            shader: {
                                type: BoxBlurShader
                            }
                        }
                    },
                    L3: {
                        rtt: !0,
                        onUpdate: onUpdate,
                        renderOffscreen: !0,
                        visible: !1,
                        Content: {
                            shader: {
                                type: BoxBlurShader
                            }
                        }
                    }
                },
                Result: {
                    shader: {
                        type: FastBlurOutputShader
                    },
                    visible: !1
                }
            };
        }
        get _signalProxy() {
            return !0;
        }
        constructor(t){
            super(t), this._textwrap = this.sel("Textwrap"), this._wrapper = this.sel("Textwrap>Content"), this._layers = this.sel("Layers"), this._output = this.sel("Result"), this._amount = 0, this._paddingX = 0, this._paddingY = 0;
        }
        _buildLayers() {
            const t = [
                {
                    x: 1,
                    y: 0,
                    kernelRadius: 1
                },
                {
                    x: 0,
                    y: 1,
                    kernelRadius: 1
                },
                {
                    x: 1.5,
                    y: 0,
                    kernelRadius: 1
                },
                {
                    x: 0,
                    y: 1.5,
                    kernelRadius: 1
                }
            ].map((t)=>Shader.create(this.stage, Object.assign({
                    type: LinearBlurShader
                }, t)));
            this._setLayerTexture(this.getLayerContents(0), this._textwrap.getTexture(), []), this._setLayerTexture(this.getLayerContents(1), this.getLayer(0).getTexture(), [
                t[0],
                t[1]
            ]), this._setLayerTexture(this.getLayerContents(2), this.getLayer(1).getTexture(), [
                t[0],
                t[1],
                t[2],
                t[3]
            ]), this._setLayerTexture(this.getLayerContents(3), this.getLayer(2).getTexture(), [
                t[0],
                t[1],
                t[2],
                t[3]
            ]);
        }
        _setLayerTexture(t, e, i) {
            if (i.length) {
                const s = i.pop(), r = t.stage.c({
                    rtt: !0,
                    shader: s
                });
                this._setLayerTexture(r, e, i), t.childList.add(r);
            } else t.texture = e;
            return t;
        }
        get content() {
            return this.sel("Textwrap>Content");
        }
        set content(t) {
            this.sel("Textwrap>Content").patch(t, !0);
        }
        set padding(t) {
            this._paddingX = t, this._paddingY = t, this._updateBlurSize();
        }
        set paddingX(t) {
            this._paddingX = t, this._updateBlurSize();
        }
        set paddingY(t) {
            this._paddingY = t, this._updateBlurSize();
        }
        getLayer(t) {
            return this._layers.sel("L" + t);
        }
        getLayerContents(t) {
            return this.getLayer(t).sel("Content");
        }
        _onResize() {
            this._updateBlurSize();
        }
        _updateBlurSize() {
            let t = this.renderWidth, e = this.renderHeight, i = this._paddingX, s = this._paddingY, r = t + 2 * i, n = e + 2 * s;
            this._textwrap.w = r, this._wrapper.x = i, this.getLayer(0).w = this.getLayerContents(0).w = r / 2, this.getLayer(1).w = this.getLayerContents(1).w = r / 4, this.getLayer(2).w = this.getLayerContents(2).w = r / 8, this.getLayer(3).w = this.getLayerContents(3).w = r / 16, this._output.x = -i, this._textwrap.x = -i, this._output.w = r, this._textwrap.h = n, this._wrapper.y = s, this.getLayer(0).h = this.getLayerContents(0).h = n / 2, this.getLayer(1).h = this.getLayerContents(1).h = n / 4, this.getLayer(2).h = this.getLayerContents(2).h = n / 8, this.getLayer(3).h = this.getLayerContents(3).h = n / 16, this._output.y = -s, this._textwrap.y = -s, this._output.h = n, this.w = t, this.h = e;
        }
        set amount(t) {
            this._amount = t, this._update();
        }
        get amount() {
            return this._amount;
        }
        _update() {
            let t = Math.min(4, Math.max(0, this._amount));
            0 === t ? (this._textwrap.renderToTexture = !1, this._output.shader.otherTextureSource = null, this._output.visible = !1) : (this._textwrap.renderToTexture = !0, this._output.visible = !0, this.getLayer(0).visible = t > 0, this.getLayer(1).visible = t > 1, this.getLayer(2).visible = t > 2, this.getLayer(3).visible = t > 3, t <= 1 ? (this._output.texture = this._textwrap.getTexture(), this._output.shader.otherTextureSource = this.getLayer(0).getTexture(), this._output.shader.a = t) : t <= 2 ? (this._output.texture = this.getLayer(0).getTexture(), this._output.shader.otherTextureSource = this.getLayer(1).getTexture(), this._output.shader.a = t - 1) : t <= 3 ? (this._output.texture = this.getLayer(1).getTexture(), this._output.shader.otherTextureSource = this.getLayer(2).getTexture(), this._output.shader.a = t - 2) : t <= 4 && (this._output.texture = this.getLayer(2).getTexture(), this._output.shader.otherTextureSource = this.getLayer(3).getTexture(), this._output.shader.a = t - 3));
        }
        set shader(t) {
            super.shader = t, this.renderToTexture || console.warn("[Lightning] Please enable renderToTexture to use with a shader.");
        }
        _firstActive() {
            this._buildLayers();
        }
    }
    class FastBlurOutputShader extends DefaultShader {
        constructor(t){
            super(t), this._a = 0, this._otherTextureSource = null;
        }
        get a() {
            return this._a;
        }
        set a(t) {
            this._a = t, this.redraw();
        }
        set otherTextureSource(t) {
            this._otherTextureSource = t, this.redraw();
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("a", this._a, this.gl.uniform1f), this._setUniform("uSampler2", 1, this.gl.uniform1i);
        }
        beforeDraw(t) {
            let e = this._otherTextureSource ? this._otherTextureSource.nativeTexture : null, i = this.gl;
            i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, e), i.activeTexture(i.TEXTURE0);
        }
    }
    FastBlurOutputShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform sampler2D uSampler2;\n    uniform float a;\n    void main(void){\n        if (a == 1.0) {\n            gl_FragColor = texture2D(uSampler2, vTextureCoord) * vColor;\n        } else {\n            gl_FragColor = ((1.0 - a) * texture2D(uSampler, vTextureCoord) + (a * texture2D(uSampler2, vTextureCoord))) * vColor;\n        }\n    }\n";
    class BloomBaseShader extends DefaultShader {
    }
    BloomBaseShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    void main(void){\n        vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n        float m = max(max(color.r, color.g), color.b);\n        float c = max(0.0, (m - 0.80)) * 5.0;\n        color = color * c;\n        gl_FragColor = color;\n    }\n";
    class SmoothScaleComponent extends Component {
        static _template() {
            return {
                ContentWrap: {
                    renderOffscreen: !0,
                    forceZIndexContext: !0,
                    onAfterUpdate: SmoothScaleComponent._updateDimensions,
                    Content: {}
                },
                Scale: {
                    visible: !1
                }
            };
        }
        constructor(t){
            super(t), this._smoothScale = 1, this._iterations = 0;
        }
        get content() {
            return this.tag("Content");
        }
        set content(t) {
            this.tag("Content").patch(t, !0);
        }
        get smoothScale() {
            return this._smoothScale;
        }
        set smoothScale(t) {
            if (this._smoothScale !== t) {
                let e = 0;
                for(; t < .5 && e < 12;)e++, t *= 2;
                this.scale = t, this._setIterations(e), this._smoothScale = t;
            }
        }
        _setIterations(t) {
            if (this._iterations !== t) {
                const e = this.sel("Scale").childList, i = this.sel("ContentWrap");
                for(; e.length < t;){
                    const t1 = 0 === e.length ? i.getTexture() : e.last.getTexture();
                    e.a({
                        rtt: !0,
                        renderOffscreen: !0,
                        texture: t1
                    });
                }
                SmoothScaleComponent._updateDimensions(this.tag("ContentWrap"), !0);
                const s = t > 0;
                this.patch({
                    ContentWrap: {
                        renderToTexture: s
                    },
                    Scale: {
                        visible: s
                    }
                });
                for(let i1 = 0, s1 = e.length; i1 < s1; i1++)e.getAt(i1).patch({
                    visible: i1 < t,
                    renderOffscreen: i1 !== t - 1
                });
                this._iterations = t;
            }
        }
        static _updateDimensions(t, e) {
            const i = t.children[0];
            let s = i.renderWidth, r = i.renderHeight;
            if (s !== t.w || r !== t.h || e) {
                t.w = s, t.h = r;
                const e1 = t.parent.tag("Scale").children;
                for(let t1 = 0, i1 = e1.length; t1 < i1; t1++)s *= .5, r *= .5, e1[t1].w = s, e1[t1].h = r;
            }
        }
        get _signalProxy() {
            return !0;
        }
    }
    class WebGLGrayscaleShader extends DefaultShader {
        constructor(t){
            super(t), this._amount = 1;
        }
        static getC2d() {
            return C2dGrayscaleShader;
        }
        set amount(t) {
            this._amount = t, this.redraw();
        }
        get amount() {
            return this._amount;
        }
        useDefault() {
            return 0 === this._amount;
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("amount", this._amount, this.gl.uniform1f);
        }
    }
    WebGLGrayscaleShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform float amount;\n    void main(void){\n        vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n        float grayness = 0.2 * color.r + 0.6 * color.g + 0.2 * color.b;\n        gl_FragColor = vec4(amount * vec3(grayness, grayness, grayness) + (1.0 - amount) * color.rgb, color.a);\n    }\n";
    class C2dGrayscaleShader extends DefaultShader$1 {
        constructor(t){
            super(t), this._amount = 1;
        }
        static getWebGL() {
            return WebGLGrayscaleShader;
        }
        set amount(t) {
            this._amount = t, this.redraw();
        }
        get amount() {
            return this._amount;
        }
        useDefault() {
            return 0 === this._amount;
        }
        _beforeDrawEl({ target: t  }) {
            t.ctx.filter = "grayscale(" + this._amount + ")";
        }
        _afterDrawEl({ target: t  }) {
            t.ctx.filter = "none";
        }
    }
    class DitheringShader extends DefaultShader {
        constructor(t){
            super(t), this._noiseTexture = new NoiseTexture(t.stage), this._graining = 1 / 256, this._random = !1;
        }
        set graining(t) {
            this._graining = t, this.redraw();
        }
        set random(t) {
            this._random = t, this.redraw();
        }
        setExtraAttribsInBuffer(t) {
            this._noiseTexture.load();
            let e = t.extraAttribsDataByteOffset / 4, i = t.quads.floats, s = t.length;
            for(let r = 0; r < s; r++){
                let s1 = t.getElementWidth(r) / this._noiseTexture.getRenderWidth(), n = t.getElementHeight(r) / this._noiseTexture.getRenderHeight(), o = 0, a = 0;
                if (this._random) {
                    if (o = Math.random(), a = Math.random(), s1 += o, n += a, Math.random() < .5) {
                        const t1 = o;
                        o = s1, s1 = t1;
                    }
                    if (Math.random() < .5) {
                        const t2 = a;
                        a = n, n = t2;
                    }
                }
                i[e] = o, i[e + 1] = a, i[e + 2] = s1, i[e + 3] = a, i[e + 4] = s1, i[e + 5] = n, i[e + 6] = o, i[e + 7] = n, e += 8;
            }
        }
        beforeDraw(t) {
            let e = this.gl;
            e.vertexAttribPointer(this._attrib("aNoiseTextureCoord"), 2, e.FLOAT, !1, 8, this.getVertexAttribPointerOffset(t));
            let i = this._noiseTexture.source.nativeTexture;
            e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, i), e.activeTexture(e.TEXTURE0);
        }
        getExtraAttribBytesPerVertex() {
            return 8;
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("uNoiseSampler", 1, this.gl.uniform1i), this._setUniform("graining", 2 * this._graining, this.gl.uniform1f);
        }
        enableAttribs() {
            super.enableAttribs(), this.gl.enableVertexAttribArray(this._attrib("aNoiseTextureCoord"));
        }
        disableAttribs() {
            super.disableAttribs(), this.gl.disableVertexAttribArray(this._attrib("aNoiseTextureCoord"));
        }
        useDefault() {
            return 0 === this._graining;
        }
        afterDraw(t) {
            this._random && this.redraw();
        }
    }
    DitheringShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec2 aNoiseTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec2 vNoiseTextureCoord;\n    varying vec4 vColor;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vNoiseTextureCoord = aNoiseTextureCoord;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", DitheringShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec2 vNoiseTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform sampler2D uNoiseSampler;\n    uniform float graining;\n    void main(void){\n        vec4 noise = texture2D(uNoiseSampler, vNoiseTextureCoord);\n        vec4 color = texture2D(uSampler, vTextureCoord);\n        gl_FragColor = (color * vColor) + graining * (noise.r - 0.5);\n    }\n";
    class CircularPushShader extends DefaultShader {
        constructor(t){
            super(t), this._inputValue = 0, this._maxDerivative = .01, this._normalizedValue = 0, this._offset = 0, this._amount = .1, this._aspectRatio = 1, this._offsetX = 0, this._offsetY = 0, this.buckets = 100;
        }
        get aspectRatio() {
            return this._aspectRatio;
        }
        set aspectRatio(t) {
            this._aspectRatio = t, this.redraw();
        }
        get offsetX() {
            return this._offsetX;
        }
        set offsetX(t) {
            this._offsetX = t, this.redraw();
        }
        get offsetY() {
            return this._offsetY;
        }
        set offsetY(t) {
            this._offsetY = t, this.redraw();
        }
        set amount(t) {
            this._amount = t, this.redraw();
        }
        get amount() {
            return this._amount;
        }
        set inputValue(t) {
            this._inputValue = t;
        }
        get inputValue() {
            return this._inputValue;
        }
        set maxDerivative(t) {
            this._maxDerivative = t;
        }
        get maxDerivative() {
            return this._maxDerivative;
        }
        set buckets(t) {
            t > 100 && (console.warn("[Lightning] CircularPushShader: supports max 100 buckets"), t = 100), this._buckets = t, this._values = new Uint8Array(this._getValues(t)), this.redraw();
        }
        get buckets() {
            return this._buckets;
        }
        _getValues(t) {
            const e = [];
            for(let i = 0; i < t; i++)e.push(this._inputValue);
            return e;
        }
        progress(t) {
            this._offset += t * this._buckets;
            const e = Math.floor(this._offset);
            this._offset -= e, this._shiftBuckets(e), this.redraw();
        }
        _shiftBuckets(t) {
            for(let e = this._buckets - 1; e >= 0; e--){
                const i = e - t;
                i < 0 ? (this._normalizedValue = Math.min(this._normalizedValue + this._maxDerivative, Math.max(this._normalizedValue - this._maxDerivative, this._inputValue)), this._values[e] = 255 * this._normalizedValue) : this._values[e] = this._values[i];
            }
        }
        set offset(t) {
            this._offset = t, this.redraw();
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("aspectRatio", this._aspectRatio, this.gl.uniform1f), this._setUniform("offsetX", this._offsetX, this.gl.uniform1f), this._setUniform("offsetY", this._offsetY, this.gl.uniform1f), this._setUniform("amount", this._amount, this.gl.uniform1f), this._setUniform("offset", this._offset, this.gl.uniform1f), this._setUniform("buckets", this._buckets, this.gl.uniform1f), this._setUniform("uValueSampler", 1, this.gl.uniform1i);
        }
        useDefault() {
            return 0 === this._amount;
        }
        beforeDraw(t) {
            const e = this.gl;
            e.activeTexture(e.TEXTURE1), this._valuesTexture ? e.bindTexture(e.TEXTURE_2D, this._valuesTexture) : (this._valuesTexture = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this._valuesTexture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), Utils.isNode && e.pixelStorei(e.UNPACK_FLIP_BLUE_RED, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1)), e.texImage2D(e.TEXTURE_2D, 0, e.ALPHA, this._buckets, 1, 0, e.ALPHA, e.UNSIGNED_BYTE, this._values), e.activeTexture(e.TEXTURE0);
        }
        cleanup() {
            this._valuesTexture && this.gl.deleteTexture(this._valuesTexture);
        }
    }
    CircularPushShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    uniform float offsetX;\n    uniform float offsetY;\n    uniform float aspectRatio;\n    varying vec2 vTextureCoord;\n    varying vec2 vPos;\n    varying vec4 vColor;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vPos = vTextureCoord * 2.0 - 1.0;\n        vPos.y = vPos.y * aspectRatio;\n        vPos.y = vPos.y + offsetY;\n        vPos.x = vPos.x + offsetX;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", CircularPushShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec2 vPos;\n    uniform float amount;\n    uniform float offset;\n    uniform float values[100];\n    uniform float buckets;\n    uniform sampler2D uSampler;\n    uniform sampler2D uValueSampler;\n    void main(void){\n        float l = length(vPos);\n        float m = (l * buckets * 0.678 - offset) / buckets;\n        float f = texture2D(uValueSampler, vec2(m, 0.0)).a * amount;\n        vec2 unit = vPos / l;\n        gl_FragColor = texture2D(uSampler, vTextureCoord - f * unit) * vColor;\n    }\n";
    class InversionShader extends DefaultShader {
        constructor(t){
            super(t), this._amount = 1;
        }
        set amount(t) {
            this._amount = t, this.redraw();
        }
        get amount() {
            return this._amount;
        }
        useDefault() {
            return 0 === this._amount;
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("amount", this._amount, this.gl.uniform1f);
        }
    }
    InversionShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform float amount;\n    void main(void){\n        vec4 color = texture2D(uSampler, vTextureCoord);\n        color.rgb = color.rgb * (1.0 - amount) + amount * (1.0 * color.a - color.rgb); \n        gl_FragColor = color * vColor;\n    }\n";
    class OutlineShader extends DefaultShader {
        constructor(t){
            super(t), this._width = 5, this._col = 4294967295, this._color = [
                1,
                1,
                1,
                1
            ];
        }
        set width(t) {
            this._width = t, this.redraw();
        }
        get color() {
            return this._col;
        }
        set color(t) {
            if (this._col !== t) {
                const e = StageUtils.getRgbaComponentsNormalized(t);
                e[0] = e[0] * e[3], e[1] = e[1] * e[3], e[2] = e[2] * e[3], this._color = e, this.redraw(), this._col = t;
            }
        }
        useDefault() {
            return 0 === this._width || 0 === this._col[3];
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            let e = this.gl;
            this._setUniform("color", new Float32Array(this._color), e.uniform4fv);
        }
        enableAttribs() {
            super.enableAttribs(), this.gl.enableVertexAttribArray(this._attrib("aCorner"));
        }
        disableAttribs() {
            super.disableAttribs(), this.gl.disableVertexAttribArray(this._attrib("aCorner"));
        }
        setExtraAttribsInBuffer(t) {
            let e = t.extraAttribsDataByteOffset / 4, i = t.quads.floats, s = t.length;
            for(let r = 0; r < s; r++){
                const s1 = t.getElementCore(r), n = this._width / s1.w, o = n / (1 - 2 * n), a = this._width / s1.h, h = a / (1 - 2 * a);
                i[e] = -o, i[e + 1] = -h, i[e + 2] = 1 + o, i[e + 3] = -h, i[e + 4] = 1 + o, i[e + 5] = 1 + h, i[e + 6] = -o, i[e + 7] = 1 + h, e += 8;
            }
        }
        beforeDraw(t) {
            let e = this.gl;
            e.vertexAttribPointer(this._attrib("aCorner"), 2, e.FLOAT, !1, 8, this.getVertexAttribPointerOffset(t));
        }
        getExtraAttribBytesPerVertex() {
            return 8;
        }
    }
    OutlineShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    attribute vec2 aCorner;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec2 vCorner;\n    varying vec4 vColor;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vCorner = aCorner;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", OutlineShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec2 vCorner;\n    uniform vec4 color;\n    uniform sampler2D uSampler;\n    void main(void){\n        vec2 m = min(vCorner, 1.0 - vCorner);\n        float value = step(0.0, min(m.x, m.y));\n        gl_FragColor = mix(color, texture2D(uSampler, vTextureCoord) * vColor, value);\n    }\n";
    class PixelateShader extends DefaultShader {
        constructor(t){
            super(t), this._size = new Float32Array([
                4,
                4
            ]);
        }
        get x() {
            return this._size[0];
        }
        set x(t) {
            this._size[0] = t, this.redraw();
        }
        get y() {
            return this._size[1];
        }
        set y(t) {
            this._size[1] = t, this.redraw();
        }
        get size() {
            return this._size[0];
        }
        set size(t) {
            this._size[0] = t, this._size[1] = t, this.redraw();
        }
        useDefault() {
            return 0 === this._size[0] && 0 === this._size[1];
        }
        static getWebGLImpl() {
            return WebGLPixelateShaderImpl;
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            let e = this.gl;
            this._setUniform("size", new Float32Array(this._size), e.uniform2fv);
        }
        getExtraAttribBytesPerVertex() {
            return 8;
        }
        enableAttribs() {
            super.enableAttribs(), this.gl.enableVertexAttribArray(this._attrib("aTextureRes"));
        }
        disableAttribs() {
            super.disableAttribs(), this.gl.disableVertexAttribArray(this._attrib("aTextureRes"));
        }
        setExtraAttribsInBuffer(t) {
            let e = t.extraAttribsDataByteOffset / 4, i = t.quads.floats, s = t.length;
            for(let r = 0; r < s; r++){
                let s1 = t.quads.getTextureWidth(t.index + r), n = t.quads.getTextureHeight(t.index + r);
                i[e] = s1, i[e + 1] = n, i[e + 2] = s1, i[e + 3] = n, i[e + 4] = s1, i[e + 5] = n, i[e + 6] = s1, i[e + 7] = n, e += 8;
            }
        }
        beforeDraw(t) {
            let e = this.gl;
            e.vertexAttribPointer(this._attrib("aTextureRes"), 2, e.FLOAT, !1, this.getExtraAttribBytesPerVertex(), this.getVertexAttribPointerOffset(t));
        }
    }
    PixelateShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    attribute vec2 aTextureRes;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec2 vTextureRes;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        vTextureRes = aTextureRes;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", PixelateShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec2 vTextureRes;\n\n    uniform vec2 size;\n    uniform sampler2D uSampler;\n    \n    vec2 mapCoord( vec2 coord )\n    {\n        coord *= vTextureRes.xy;\n        return coord;\n    }\n    \n    vec2 unmapCoord( vec2 coord )\n    {\n        coord /= vTextureRes.xy;\n        return coord;\n    }\n    \n    vec2 pixelate(vec2 coord, vec2 size)\n    {\n        return floor( coord / size ) * size;\n    }\n    \n    void main(void)\n    {\n        vec2 coord = mapCoord(vTextureCoord);\n        coord = pixelate(coord, size);\n        coord = unmapCoord(coord);\n        gl_FragColor = texture2D(uSampler, coord) * vColor;\n    }\n";
    class RadialFilterShader extends DefaultShader {
        constructor(t){
            super(t), this._radius = 0, this._cutoff = 1;
        }
        set radius(t) {
            this._radius = t, this.redraw();
        }
        get radius() {
            return this._radius;
        }
        set cutoff(t) {
            this._cutoff = t, this.redraw();
        }
        get cutoff() {
            return this._cutoff;
        }
        useDefault() {
            return 0 === this._radius;
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("radius", 2 * (this._radius - .5) / t.getRenderWidth(), this.gl.uniform1f), this._setUniform("cutoff", .5 * t.getRenderWidth() / this._cutoff, this.gl.uniform1f);
        }
    }
    RadialFilterShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 pos;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n        pos = gl_Position.xy;\n    }\n", RadialFilterShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec2 pos;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform float radius;\n    uniform float cutoff;\n    void main(void){\n        vec4 color = texture2D(uSampler, vTextureCoord);\n        float f = max(0.0, min(1.0, 1.0 - (length(pos) - radius) * cutoff));\n        gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * f;\n    }\n";
    class RoundedRectangleShader extends DefaultShader {
        constructor(t){
            super(t), this._blend = 0, this._radius = [
                1,
                1,
                1,
                1
            ], this._stroke = 0, this._fc = 16777215, this._fillColor = this._getNormalizedColor(4294967295), this._strokeColor = this._getNormalizedColor(16777215);
        }
        set blend(t) {
            this._blend = Math.min(Math.max(t, 0), 1);
        }
        set radius(t) {
            Array.isArray(t) ? 2 === t.length ? this._radius = [
                t[0],
                t[1],
                t[0],
                t[1]
            ] : 3 === t.length ? this._radius = [
                t[0],
                t[1],
                t[2],
                this._radius[3]
            ] : 4 === t.length ? this._radius = t : this._radius = [
                t[0],
                t[0],
                t[0],
                t[0]
            ] : this._radius = [
                t,
                t,
                t,
                t
            ], this.redraw();
        }
        get radius() {
            return this._radius;
        }
        set topLeft(t) {
            this._radius[0] = t, this.redraw();
        }
        get topLeft() {
            return this._radius[0];
        }
        set topRight(t) {
            this._radius[1] = t, this.redraw();
        }
        get topRight() {
            return this._radius[1];
        }
        set bottomRight(t) {
            this._radius[2] = t, this.redraw();
        }
        get bottomRight() {
            return this._radius[2];
        }
        set bottomLeft(t) {
            this._radius[3] = t, this.redraw();
        }
        get bottomLeft() {
            return this._radius[4];
        }
        set strokeColor(t) {
            this._sc = t, this._strokeColor = this._getNormalizedColor(t), this.redraw();
        }
        get strokeColor() {
            return this._sc;
        }
        set fillColor(t) {
            this._fc = t, this._fillColor = this._getNormalizedColor(t), this.redraw();
        }
        get fillColor() {
            return this._fc;
        }
        set stroke(t) {
            this._stroke = t, this.redraw();
        }
        get stroke() {
            return this._stroke;
        }
        _getNormalizedColor(t) {
            const e = StageUtils.getRgbaComponentsNormalized(t);
            return e[0] *= e[3], e[1] *= e[3], e[2] *= e[3], new Float32Array(e);
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner, i = this.ctx.stage.getRenderPrecision(), s = this._radius.map((t)=>(t + .5) * i);
            this._setUniform("radius", new Float32Array(s), this.gl.uniform4fv), this._setUniform("alpha", t.getElementCore(0).renderContext.alpha, this.gl.uniform1f), this._setUniform("blend", this._blend, this.gl.uniform1f), this._setUniform("strokeColor", this._strokeColor, this.gl.uniform4fv), this._setUniform("fillColor", this._fillColor, this.gl.uniform4fv), this._setUniform("stroke", this._stroke * i, this.gl.uniform1f), this._setUniform("resolution", new Float32Array([
                e._w * i,
                e._h * i
            ]), this.gl.uniform2fv);
        }
    }
    RoundedRectangleShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n\n    void main(void){\n        gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", RoundedRectangleShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n\n    #define PI 3.14159265359\n\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n\n    uniform sampler2D uSampler;\n    uniform vec2 resolution;\n    uniform vec4 radius;\n    uniform float stroke;\n    uniform vec4 strokeColor;\n    uniform vec4 fillColor;\n    uniform float alpha;\n    uniform float fill;\n    uniform float blend;\n    \n    float boxDist(vec2 p, vec2 size, float radius){\n        size -= vec2(radius);\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;\n    }\n    \n    float fillMask(float dist){\n        return clamp(-dist, 0.0, 1.0);\n    }\n    \n    float innerBorderMask(float dist, float width){\n        float alpha1 = clamp(dist + width, 0.0, 1.0);\n        float alpha2 = clamp(dist, 0.0, 1.0);\n        return alpha1 - alpha2;\n    }\n\n    void main() {\n        vec2 halfRes = 0.5 * resolution.xy;\n        float r = 0.0;\n        if (vTextureCoord.x < 0.5 && vTextureCoord.y < 0.5) {\n            r = radius[0];\n        } else if (vTextureCoord.x >= 0.5 && vTextureCoord.y < 0.5) {\n            r = radius[1];\n        } else if (vTextureCoord.x >= 0.5 && vTextureCoord.y >= 0.5) {\n            r = radius[2];\n        } else {\n            r = radius[3];\n        }\n        \n        float b = boxDist(vTextureCoord.xy * resolution - halfRes, halfRes - 0.005, r);\n        vec4 tex = texture2D(uSampler, vTextureCoord) * vColor;\n        vec4 blend = mix(vec4(1.0) * alpha, tex, blend);     \n        vec4 layer1 = mix(vec4(0.0), tex * fillColor, fillMask(b));\n        gl_FragColor = mix(layer1, blend * strokeColor, innerBorderMask(b, stroke));\n    }\n";
    class FadeOutShader extends DefaultShader {
        constructor(t){
            super(t), this._fade = [
                0,
                0,
                0,
                0
            ];
        }
        set top(t) {
            this._fade[0] = t, this.redraw();
        }
        get top() {
            return this._fade[0];
        }
        set right(t) {
            this._fade[1] = t, this.redraw();
        }
        get right() {
            return this._fade[1];
        }
        set bottom(t) {
            this._fade[2] = t, this.redraw();
        }
        get bottom() {
            return this._fade[2];
        }
        set left(t) {
            this._fade[3] = t, this.redraw();
        }
        get left() {
            return this._fade[3];
        }
        set fade(t) {
            Array.isArray(t) ? 2 === t.length ? this._fade = [
                t[0],
                t[1],
                t[0],
                t[1]
            ] : 3 === t.length ? this._fade = [
                t[0],
                t[1],
                t[2],
                this._fade[3]
            ] : 4 === t.length ? this._fade = t : this._fade = [
                t[0],
                t[0],
                t[0],
                t[0]
            ] : this._fade = [
                t,
                t,
                t,
                t
            ], this.redraw();
        }
        get fade() {
            return this._fade;
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner, i = this.ctx.stage.getRenderPrecision(), s = this._fade.map((t)=>t * i);
            this._setUniform("fade", new Float32Array(s), this.gl.uniform4fv), this._setUniform("resolution", new Float32Array([
                e._w * i,
                e._h * i
            ]), this.gl.uniform2fv);
        }
    }
    FadeOutShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform vec2 resolution;\n    uniform vec4 fade;\n    \n    void main() {\n        vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n        vec2 halfRes = 0.5 * resolution.xy;\n        vec2 point = vTextureCoord.xy * resolution.xy;\n        \n        vec2 pos1;\n        vec2 pos2;\n        vec2 d;\n        float c;\n        float t = 0.0;\n             \n        if(fade[0] > 0.0) {\n            pos1 = vec2(point.x, point.y);\n            pos2 = vec2(point.x, point.y + fade[0]);\n            d = pos2 - pos1;\n            c = dot(pos1, d) / dot(d, d);\n            t = smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0));\n            color = mix(vec4(0.0), color, t);\n        }\n        \n        if(fade[1] > 0.0) {\n            vec2 pos1 = vec2(point.x - resolution.x - fade[1], vTextureCoord.y);\n            vec2 pos2 = vec2(point.x - resolution.x, vTextureCoord.y);\n            d = pos1 - pos2;\n            c = dot(pos2, d) / dot(d, d);\n            t = smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0));\n            color = mix(vec4(0.0), color, t);\n        }\n        \n        if(fade[2] > 0.0) {\n            vec2 pos1 = vec2(vTextureCoord.x, point.y - resolution.y - fade[2]);\n            vec2 pos2 = vec2(vTextureCoord.x, point.y - resolution.y);\n            d = pos1 - pos2;\n            c = dot(pos2, d) / dot(d, d);\n            t = smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0));\n            color = mix(vec4(0.0), color, t);\n        }\n        \n        if(fade[3] > 0.0) {\n            pos1 = vec2(point.x, point.y);\n            pos2 = vec2(point.x + fade[3], point.y);\n            d = pos2 - pos1;\n            c = dot(pos1, d) / dot(d, d);\n            t = smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0));\n            color = mix(vec4(0.0), color, t);\n        }\n        \n        gl_FragColor = color;\n    }\n";
    class VignetteShader extends DefaultShader {
        constructor(t){
            super(t), this._magnitude = 1.3, this._intensity = .7, this._pivot = [
                .5,
                .5
            ];
        }
        setupUniforms(t) {
            super.setupUniforms(t), this._setUniform("magnitude", this._magnitude, this.gl.uniform1f), this._setUniform("intensity", this._intensity, this.gl.uniform1f), this._setUniform("pivot", new Float32Array(this._pivot), this.gl.uniform2fv), this.redraw();
        }
        set pivot(t) {
            Array.isArray(t) ? this._pivot = t : this._pivot = [
                t,
                t
            ], this.redraw();
        }
        get pivotX() {
            return this._pivot[0];
        }
        set pivotX(t) {
            this._pivot[0] = t, this.redraw();
        }
        get pivotY() {
            return this._pivot[1];
        }
        set pivotY(t) {
            this._pivot[1] = t, this.redraw();
        }
        get intensity() {
            return this._intensity;
        }
        set intensity(t) {
            this._intensity = t, this.redraw();
        }
        get magnitude() {
            return this._magnitude;
        }
        set magnitude(t) {
            this._magnitude = t, this.redraw();
        }
    }
    VignetteShader.vertexShaderSource = DefaultShader.vertexShaderSource, VignetteShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n\n    uniform float magnitude;\n    uniform float intensity;\n    uniform vec2 pivot;\n\n    void main() {\n        vec2 uv = vTextureCoord.xy - pivot + vec2(0.5);\n        uv.x = clamp(uv.x, 0.0, 1.0);\n        uv.y = clamp(uv.y, 0.0, 1.0);\n   \n        uv *=  1.00 - uv.yx;\n        float vig = uv.x * uv.y * 25.0 * intensity;\n        vig = pow(vig, 0.45 * magnitude);\n        vec4 fragColor = vec4(vig) * vColor;\n        gl_FragColor = texture2D(uSampler, vTextureCoord) * fragColor;\n\n    }\n";
    class SpinnerShader extends DefaultShader {
        constructor(t){
            super(t), this._radius = 100, this._width = 50, this._period = 1, this._angle = .5, this._smooth = .005, this._color = 4294967295, this._backgroundColor = 4278190080, this._time = Date.now();
        }
        set radius(t) {
            this._radius = t, this.redraw();
        }
        set width(t) {
            this._width = t, this.redraw();
        }
        set period(t) {
            this._period = t, this.redraw();
        }
        set angle(t) {
            this._angle = t, this.redraw();
        }
        set smooth(t) {
            this._smooth = t, this.redraw();
        }
        set color(t) {
            this._color = t, this.redraw();
        }
        set backgroundColor(t) {
            this._backgroundColor = t, this.redraw();
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner;
            this._setUniform("iTime", Date.now() - this._time, this.gl.uniform1f);
            const i = this.ctx.stage.getRenderPrecision();
            this._setUniform("radius", this._radius * i, this.gl.uniform1f), this._setUniform("width", this._width * i, this.gl.uniform1f), this._setUniform("period", this._period, this.gl.uniform1f), this._setUniform("angle", this._angle, this.gl.uniform1f), this._setUniform("smooth", this._smooth, this.gl.uniform1f), this._setUniform("color", new Float32Array(StageUtils.getRgbaComponentsNormalized(this._color)), this.gl.uniform4fv), this._setUniform("backgroundColor", new Float32Array(StageUtils.getRgbaComponentsNormalized(this._backgroundColor)), this.gl.uniform4fv), this._setUniform("resolution", new Float32Array([
                e._w * i,
                e._h * i
            ]), this.gl.uniform2fv), this.redraw();
        }
    }
    SpinnerShader.vertexShaderSource = DefaultShader.vertexShaderSource, SpinnerShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n\n    uniform float iTime;\n    uniform float radius;\n    uniform float width;\n    uniform float period;\n    uniform float angle;\n    uniform float smooth;\n    uniform vec2 resolution;\n\n    uniform vec4 color;\n    uniform vec4 backgroundColor;\n\n    float ratio = resolution.y / resolution.x;\n\n    vec2 transpose_pos(vec2 pos) {\n        if (ratio < 1.) {\n            float diff = 0.5 - pos.x;\n            pos.x = 0.5 - diff / ratio;\n        } else {\n            float diff = 0.5 - pos.y;\n            pos.y = 0.5 - diff * ratio;\n        }\n        return pos;\n    }\n\n    float get_angle(vec2 pos) {\n        pos = transpose_pos(pos);\n        float a = atan(pos.y - 0.5, pos.x - 0.5);\n        a = (1.0+a/3.14159)/2.0;\n        \n        return a;\n    }\n\n    float dist(vec2 pos1, vec2 pos2) {\n        pos1 = transpose_pos(pos1);\n        return distance(pos1, pos2);\n    }\n\n    void main()\n    {\n        vec2 fragCoord = vTextureCoord;\n        vec4 fragColor = vColor;\n        \n        vec2 st = vTextureCoord;\n        float pct = dist(st, vec2(0.5));\n\n        float a = get_angle(st);\n        float t = iTime / 1000.0 / period;\n\n        float inner = max((radius - width) / resolution.x, (radius - width) / resolution.y);\n        float outer = max(radius / resolution.x, radius / resolution.y);\n\n        float x1 = mod(t, 1.0);\n        float x2 = mod(t + angle, 1.0);\n\n        if (x1 < x2) {\n            if (a > x1 && a < x2) {\n                float val = (1.0 - (x2 - a) / angle) * smoothstep(0.0, 3. * smooth, (x2 - a));\n                fragColor = mix(backgroundColor, color, val);\n            } else {\n                fragColor = backgroundColor;\n            }\n        } else {\n            if (a < x2) {\n                float val = (1.0 - (x2 - a) / angle) * smoothstep(0.0, 3. * smooth, (x2 - a));\n                fragColor = mix(backgroundColor, color, val);\n            } else if (a > x1) {\n                float val = (1.0 - (1.0 + x2 - a) / angle) * smoothstep(0.0, 3. * smooth, (1.0 + x2 - a));\n                fragColor = mix(backgroundColor, color, val);\n            } else {\n                fragColor = backgroundColor;\n            }\n        }\n\n        float s = smoothstep(inner, inner + smooth + 0.00001, pct) * (1.0 - smoothstep(outer, outer + smooth + 0.00001, pct));\n        gl_FragColor = texture2D(uSampler, fragCoord) * vColor * (1. - s * fragColor.a) + fragColor * s;\n    }\n";
    class HoleShader extends DefaultShader {
        constructor(t){
            super(t), this._x = 0, this._y = 0, this._w = 0, this._h = 0, this._radius = 0;
        }
        get x() {
            return this._x;
        }
        set x(t) {
            this._x = t, this.redraw();
        }
        get y() {
            return this._y;
        }
        set y(t) {
            this._y = t, this.redraw();
        }
        get w() {
            return this._w;
        }
        set w(t) {
            this._w = t, this.redraw();
        }
        get h() {
            return this._h;
        }
        set h(t) {
            this._h = t, this.redraw();
        }
        get radius() {
            return this._radius;
        }
        set radius(t) {
            this._radius = t, this.redraw();
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner, i = this.ctx.stage.getRenderPrecision();
            this._setUniform("x", this._x * i, this.gl.uniform1f), this._setUniform("y", this._y * i, this.gl.uniform1f), this._setUniform("w", this._w * i, this.gl.uniform1f), this._setUniform("h", this._h * i, this.gl.uniform1f), this._setUniform("radius", (this._radius + .5) * i, this.gl.uniform1f), this._setUniform("resolution", new Float32Array([
                e._w * i,
                e._h * i
            ]), this.gl.uniform2fv);
        }
        useDefault() {
            return 0 === this._x && 0 === this._y && 0 === this._w && 0 === this._h;
        }
    }
    HoleShader.vertexShaderSource = DefaultShader.vertexShaderSource, HoleShader.fragmentShaderSource = "\n   #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform float x;\n    uniform float y;\n    uniform float w;\n    uniform float h;\n    uniform vec2 resolution;\n    uniform float radius;\n\n    float roundBox(vec2 p, vec2 b, float r) {\n        float d = length(max(abs(p)-b+r, 0.1))-r;\n        return smoothstep(1.0, 0.0, d);\n    }\n\n    void main(void){\n        vec4 color = texture2D(uSampler, vTextureCoord);\n        vec2 pos = vTextureCoord.xy * resolution - vec2(x, y) - vec2(w, h) / 2.0;\n        vec2 size = vec2(w, h) / 2.0;\n        float b = roundBox(pos, size, radius);\n        gl_FragColor = mix(color, vec4(0.0), b);\n    }\n";
    class RadialGradientShader extends DefaultShader {
        constructor(t){
            super(t), this._pivot = [
                0,
                0
            ], this._ic = 4294967295, this._normalizedIC = this._getNormalizedColor(this._ic), this._oc = 16777215, this._normalizedOC = this._getNormalizedColor(this._oc), this._radius = 0;
        }
        set radiusX(t) {
            this.radius = t;
        }
        get radiusX() {
            return this._radius;
        }
        set radiusY(t) {
            this._radiusY = t, this.redraw();
        }
        get radiusY() {
            return this._radiusY;
        }
        set radius(t) {
            this._radius = t, this.redraw();
        }
        set innerColor(t) {
            this._ic = t, this._normalizedIC = this._getNormalizedColor(t), this.redraw();
        }
        get innerColor() {
            return this._ic;
        }
        set outerColor(t) {
            this._oc = t, this._normalizedOC = this._getNormalizedColor(t), this.redraw();
        }
        set color(t) {
            this.innerColor = t;
        }
        get color() {
            return this.innerColor;
        }
        get outerColor() {
            return this._ic;
        }
        set x(t) {
            this._x = t, this.redraw();
        }
        set y(t) {
            this._y = t, this.redraw();
        }
        set pivot(t) {
            Array.isArray(t) && 2 === t.length ? this._pivot = t : Array.isArray(t) ? this._pivot = [
                t[0],
                t[1] || t[0]
            ] : this._pivot = [
                t,
                t
            ], this.redraw();
        }
        get pivot() {
            return this._pivot[0];
        }
        set pivotY(t) {
            this._pivot[1] = t, this.redraw();
        }
        get pivotY() {
            return this._pivot[1];
        }
        set pivotX(t) {
            this._pivot[0] = t, this.redraw();
        }
        get pivotX() {
            return this._pivot[0];
        }
        _getNormalizedColor(t) {
            const e = StageUtils.getRgbaComponentsNormalized(t);
            return e[0] *= e[3], e[1] *= e[3], e[2] *= e[3], new Float32Array(e);
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner;
            this._x && (this._pivot[0] = this._x / e.w), this._y && (this._pivot[1] = this._y / e.h), 0 === this._radius && (this._radius = .5 * e.w), this._setUniform("innerColor", this._normalizedIC, this.gl.uniform4fv), this._setUniform("fill", StageUtils.getRgbaComponentsNormalized(this._oc)[3], this.gl.uniform1f), this._setUniform("outerColor", this._normalizedOC, this.gl.uniform4fv), this._setUniform("pivot", new Float32Array(this._pivot), this.gl.uniform2fv), this._setUniform("resolution", new Float32Array([
                e._w,
                e._h
            ]), this.gl.uniform2fv), this._setUniform("alpha", t.getElementCore(0).renderContext.alpha, this.gl.uniform1f), this._setUniform("radius", this._radius, this.gl.uniform1f), this._setUniform("radiusY", this._radiusY || this._radius, this.gl.uniform1f);
        }
    }
    RadialGradientShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    \n    #define PI 3.14159265359\n    \n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n    uniform vec2 resolution;\n    uniform vec2 pivot;\n    uniform vec4 innerColor;\n    uniform vec4 outerColor;\n    uniform float radius;\n    uniform float radiusY;\n    uniform float alpha;\n    uniform float fill;\n    uniform float aspectRatio;\n    \n    void main() {\n        vec2 point = vTextureCoord.xy * resolution;\n        vec2 projection = vec2(pivot.x * resolution.x, pivot.y * resolution.y);\n        float d = length((point - projection) / vec2(radius * 2.0, radiusY * 2.0));\n        vec4 color = mix(texture2D(uSampler, vTextureCoord) * vColor, outerColor * alpha, fill);\n        gl_FragColor = mix(innerColor * alpha, color, smoothstep(0.0, 1.0, d));\n    }\n";
    class Light3dShader extends DefaultShader {
        constructor(t){
            super(t), this._strength = .5, this._ambient = .5, this._fudge = .4, this._rx = 0, this._ry = 0, this._z = 0, this._pivotX = NaN, this._pivotY = NaN, this._pivotZ = 0, this._lightY = 0, this._lightZ = 0;
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            let e = t.shaderOwner, i = e.element, s = isNaN(this._pivotX) ? i.pivotX * e.w : this._pivotX, r = isNaN(this._pivotY) ? i.pivotY * e.h : this._pivotY, n = e.getRenderTextureCoords(s, r), o = -Math.atan2(e._renderContext.tc, e._renderContext.ta), a = this.gl;
            this._setUniform("pivot", new Float32Array([
                n[0],
                n[1],
                this._pivotZ
            ]), a.uniform3fv), this._setUniform("rot", new Float32Array([
                this._rx,
                this._ry,
                o
            ]), a.uniform3fv), this._setUniform("z", this._z, a.uniform1f), this._setUniform("lightY", this.lightY, a.uniform1f), this._setUniform("lightZ", this.lightZ, a.uniform1f), this._setUniform("strength", this._strength, a.uniform1f), this._setUniform("ambient", this._ambient, a.uniform1f), this._setUniform("fudge", this._fudge, a.uniform1f);
        }
        set strength(t) {
            this._strength = t, this.redraw();
        }
        get strength() {
            return this._strength;
        }
        set ambient(t) {
            this._ambient = t, this.redraw();
        }
        get ambient() {
            return this._ambient;
        }
        set fudge(t) {
            this._fudge = t, this.redraw();
        }
        get fudge() {
            return this._fudge;
        }
        get rx() {
            return this._rx;
        }
        set rx(t) {
            this._rx = t, this.redraw();
        }
        get ry() {
            return this._ry;
        }
        set ry(t) {
            this._ry = t, this.redraw();
        }
        get z() {
            return this._z;
        }
        set z(t) {
            this._z = t, this.redraw();
        }
        get pivotX() {
            return this._pivotX;
        }
        set pivotX(t) {
            this._pivotX = t + 1, this.redraw();
        }
        get pivotY() {
            return this._pivotY;
        }
        set pivotY(t) {
            this._pivotY = t + 1, this.redraw();
        }
        get lightY() {
            return this._lightY;
        }
        set lightY(t) {
            this._lightY = t, this.redraw();
        }
        get pivotZ() {
            return this._pivotZ;
        }
        set pivotZ(t) {
            this._pivotZ = t, this.redraw();
        }
        get lightZ() {
            return this._lightZ;
        }
        set lightZ(t) {
            this._lightZ = t, this.redraw();
        }
        useDefault() {
            return 0 === this._rx && 0 === this._ry && 0 === this._z && 0 === this._strength && 1 === this._ambient;
        }
    }
    Light3dShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n\n    uniform float fudge;\n    uniform float strength;\n    uniform float ambient;\n    uniform float z;\n    uniform float lightY;\n    uniform float lightZ;\n    uniform vec3 pivot;\n    uniform vec3 rot;\n    varying vec3 pos;\n\n    void main(void) {\n        pos = vec3(aVertexPosition.xy, z);\n        \n        pos -= pivot;\n        \n        // Undo XY rotation\n        mat2 iRotXy = mat2( cos(rot.z), sin(rot.z), \n                           -sin(rot.z), cos(rot.z));\n        pos.xy = iRotXy * pos.xy;\n        \n        // Perform 3d rotations\n        gl_Position.x = cos(rot.x) * pos.x - sin(rot.x) * pos.z;\n        gl_Position.y = pos.y;\n        gl_Position.z = sin(rot.x) * pos.x + cos(rot.x) * pos.z;\n        \n        pos.x = gl_Position.x;\n        pos.y = cos(rot.y) * gl_Position.y - sin(rot.y) * gl_Position.z;\n        pos.z = sin(rot.y) * gl_Position.y + cos(rot.y) * gl_Position.z;\n        \n        // Redo XY rotation\n        iRotXy[0][1] = -iRotXy[0][1];\n        iRotXy[1][0] = -iRotXy[1][0];\n        pos.xy = iRotXy * pos.xy; \n\n        // Undo translate to pivot position\n        pos.xyz += pivot;\n\n        pos = vec3(pos.x * projection.x - 1.0, pos.y * -abs(projection.y) + 1.0, pos.z * projection.x);\n        \n        // Set depth perspective\n        float perspective = 1.0 + fudge * pos.z;\n\n        pos.z += lightZ * projection.x;\n\n        // Map coords to gl coordinate space.\n        // Set z to 0 because we don't want to perform z-clipping\n        gl_Position = vec4(pos.xy, 0.0, perspective);\n\n        // Correct light source position.\n        pos.y += lightY * abs(projection.y);\n\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        \n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", Light3dShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    varying vec3 pos;\n    uniform sampler2D uSampler;\n    uniform float ambient;\n    uniform float strength;\n    void main(void){\n        vec4 rgba = texture2D(uSampler, vTextureCoord);\n        float d = length(pos);\n        float n = 1.0 / max(0.1, d);\n        rgba.rgb = rgba.rgb * (strength * n + ambient);\n        gl_FragColor = rgba * vColor;\n    }\n";
    class PerspectiveShader extends DefaultShader {
        constructor(t){
            super(t), this._fudge = .2, this._rx = 0, this._ry = 0, this._z = 1;
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner, i = e.element, s = i.pivotX * e.w, r = i.pivotY * e.h, n = e.getRenderTextureCoords(s, r), o = -Math.atan2(e._renderContext.tc, e._renderContext.ta), a = this.gl;
            this._setUniform("pivot", new Float32Array([
                n[0],
                n[1],
                0
            ]), a.uniform3fv), this._setUniform("rot", new Float32Array([
                this._rx,
                this._ry,
                o
            ]), a.uniform3fv), this._setUniform("z", this._z, a.uniform1f), this._setUniform("fudge", this._fudge, a.uniform1f);
        }
        set fudge(t) {
            this._fudge = t, this.redraw();
        }
        get fudge() {
            return this._fudge;
        }
        get rx() {
            return this._rx;
        }
        set rx(t) {
            this._rx = t, this.redraw();
        }
        get ry() {
            return this._ry;
        }
        set ry(t) {
            this._ry = t, this.redraw();
        }
        get z() {
            return this._z;
        }
        set z(t) {
            this._z = t, this.redraw();
        }
        useDefault() {
            return 0 === this._rx && 0 === this._ry && 0 === this._z;
        }
    }
    PerspectiveShader.vertexShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    attribute vec2 aVertexPosition;\n    attribute vec2 aTextureCoord;\n    attribute vec4 aColor;\n    uniform vec2 projection;\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n\n    uniform float z;\n    uniform vec3 pivot;\n    uniform vec3 rot;\n    varying vec3 pos;\n\n    void main(void) {\n        pos = vec3(aVertexPosition.xy, z);\n        \n        pos -= pivot;\n        \n        // Undo XY rotation\n        mat2 iRotXy = mat2( cos(rot.z), sin(rot.z), \n                           -sin(rot.z), cos(rot.z));\n        pos.xy = iRotXy * pos.xy;\n        \n        // Perform 3d rotations\n        gl_Position.x = cos(rot.x) * pos.x - sin(rot.x) * pos.z;\n        gl_Position.y = pos.y;\n        gl_Position.z = sin(rot.x) * pos.x + cos(rot.x) * pos.z;\n        \n        pos.x = gl_Position.x;\n        pos.y = cos(rot.y) * gl_Position.y - sin(rot.y) * gl_Position.z;\n        pos.z = sin(rot.y) * gl_Position.y + cos(rot.y) * gl_Position.z;\n        \n        // Redo XY rotation\n        iRotXy[0][1] = -iRotXy[0][1];\n        iRotXy[1][0] = -iRotXy[1][0];\n        pos.xy = iRotXy * pos.xy; \n\n        // Undo translate to pivot position\n        pos.xyz += pivot;\n\n        pos = vec3(pos.x * projection.x - 1.0, pos.y * -abs(projection.y) + 1.0, pos.z * projection.x);\n        \n        // Map coords to gl coordinate space.\n        // Set z to 0 because we don't want to perform z-clipping\n        gl_Position = vec4(pos.xy, 0.0, z);\n\n        vTextureCoord = aTextureCoord;\n        vColor = aColor;\n        \n        gl_Position.y = -sign(projection.y) * gl_Position.y;\n    }\n", PerspectiveShader.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    uniform sampler2D uSampler;\n\n    uniform vec3 rot;\n    uniform float fudge;\n\n    void main(void) {\n        vec2 coords = vTextureCoord;\n\n        coords.xy -= vec2(0.5);\n        coords.y = coords.y + (sign(rot[0]) * 0.5 - coords.x) * sin(rot[0]) * fudge * coords.y;\n        coords.x = coords.x + (sign(rot[1]) * 0.5 - coords.y) * sin(rot[1]) * fudge * coords.x;\n        coords.xy += vec2(0.5);\n\n        if (coords.x < 0.0 || coords.x > 1.0 || coords.y < 0.0 || coords.y > 1.0) {\n            gl_FragColor = vec4(0.0);\n        } else {\n            gl_FragColor = texture2D(uSampler, coords) * vColor;\n        }\n    }\n";
    class MagnifierShader extends DefaultShader {
        constructor(t){
            super(t), this._x = 0, this._y = 0, this._w = 0, this._h = 0, this._radius = 0, this._magnification = .6;
        }
        get x() {
            return this._x;
        }
        set x(t) {
            this._x = t, this.redraw();
        }
        get y() {
            return this._y;
        }
        set y(t) {
            this._y = t, this.redraw();
        }
        get w() {
            return this._w;
        }
        set w(t) {
            this._w = t, this.redraw();
        }
        get h() {
            return this._h;
        }
        set h(t) {
            this._h = t, this.redraw();
        }
        get magnification() {
            return this._magnification;
        }
        set magnification(t) {
            this._magnification = t, this.redraw();
        }
        get radius() {
            return this._radius;
        }
        set radius(t) {
            this._radius = t, this.redraw();
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner, i = this.ctx.stage.getRenderPrecision();
            this._setUniform("x", this._x * i, this.gl.uniform1f), this._setUniform("y", this._y * i, this.gl.uniform1f), this._setUniform("w", this._w * i, this.gl.uniform1f), this._setUniform("h", this._h * i, this.gl.uniform1f), this._setUniform("magnification", this._magnification, this.gl.uniform1f), this._setUniform("radius", (this._radius + .5) * i, this.gl.uniform1f), this._setUniform("resolution", new Float32Array([
                e._w * i,
                e._h * i
            ]), this.gl.uniform2fv);
        }
        useDefault() {
            return 0 === this._w && 0 === this._h;
        }
    }
    MagnifierShader.vertexShaderSource = DefaultShader.vertexShaderSource, MagnifierShader.fragmentShaderSource = "\n	  #ifdef GL_ES\n		# ifdef GL_FRAGMENT_PRECISION_HIGH\n		precision highp float;\n		# else\n		precision lowp float;\n		# endif\n	  #endif\n\n	  varying vec2 vTextureCoord;\n	  varying vec4 vColor;\n	  uniform sampler2D uSampler;\n	  uniform float x;\n	  uniform float y;\n	  uniform float w;\n	  uniform float h;\n	  uniform vec2 resolution;\n	  uniform float radius;\n	  uniform float magnification;\n  \n	  float roundBox(vec2 p, vec2 b, float r) {\n		  float d = length(max(abs(p)-b+r, 0.1))-r;\n		  return smoothstep(1.0, 0.0, d);\n	  }\n\n	  float inside(vec2 v) {\n		vec2 s = step(vec2(0.0, 0.0), v) - step(vec2(1.0, 1.0), v);\n		return s.x * s.y;   \n      }\n  \n	  void main(void) {\n		vec4 color = texture2D(uSampler, vTextureCoord);\n		vec2 pos = vTextureCoord.xy * resolution - vec2(x, y) - vec2(w, h) / 2.0;\n		vec2 size = vec2(w, h) / 2.0;\n		float b = roundBox(pos, size, radius);\n		vec2 pos2 = (vTextureCoord.xy * magnification * resolution + vec2(x, y) * magnification) / resolution;\n		gl_FragColor = mix(color, texture2D(uSampler, pos2) * inside(pos2), b) * vColor;\n	  }\n  ";
    class SpinnerShader2 extends DefaultShader {
        constructor(t){
            super(t), this._period = 1, this._stroke = 0, this._showDot = !0, this._clockwise = !0, this._bc = 4278190080, this._normalizedBC = this._getNormalizedColor(this._bc), this._c = 4294967295, this._normalizedC = this._getNormalizedColor(this._c);
        }
        set radius(t) {
            0 === t && (t = 1), this._radius = t;
        }
        set stroke(t) {
            this._stroke = Math.abs(t);
        }
        get stroke() {
            return this._stroke;
        }
        set color(t) {
            this._c = t, this._normalizedC = this._getNormalizedColor(t);
        }
        get color() {
            return this._c;
        }
        set backgroundColor(t) {
            this._bc = t, this._normalizedBC = this._getNormalizedColor(t);
        }
        get backgroundColor() {
            return this._sc;
        }
        set showDot(t) {
            this._showDot = t;
        }
        get showDot() {
            return this._showDot;
        }
        set clockwise(t) {
            this._clockwise = t;
        }
        get clockwise() {
            return this._clockwise;
        }
        set period(t) {
            this._period = t;
        }
        get period() {
            return this._period;
        }
        _getNormalizedColor(t) {
            const e = StageUtils.getRgbaComponentsNormalized(t);
            return e[0] *= e[3], e[1] *= e[3], e[2] *= e[3], new Float32Array(e);
        }
        setupUniforms(t) {
            super.setupUniforms(t);
            const e = t.shaderOwner, i = this._radius || e._w / 2;
            0 === this._stroke && (this._stroke = .33 * i), this._setUniform("resolution", new Float32Array([
                e._w,
                e._h
            ]), this.gl.uniform2fv), this._setUniform("color", this._normalizedC, this.gl.uniform4fv), this._setUniform("backgroundColor", this._normalizedBC, this.gl.uniform4fv), this._setUniform("stroke", this._stroke, this.gl.uniform1f), this._setUniform("radius", i, this.gl.uniform1f), this._setUniform("direction", this._clockwise ? -1 : 1, this.gl.uniform1f), this._setUniform("showDot", !!this._showDot, this.gl.uniform1f), this._setUniform("time", Date.now() - SpinnerShader2.spinSync, this.gl.uniform1f), this._setUniform("period", this._period, this.gl.uniform1f), this._setUniform("alpha", t.getElementCore(0).renderContext.alpha, this.gl.uniform1f), this._sc === this._bc && this._stroke === .5 * i || this.redraw();
        }
    }
    SpinnerShader2.spinSync = Date.now(), SpinnerShader2.fragmentShaderSource = "\n    #ifdef GL_ES\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision lowp float;\n    # endif\n    #endif\n    \n    #define PI 3.14159265359\n    \n    varying vec2 vTextureCoord;\n    varying vec4 vColor;\n    \n    uniform sampler2D uSampler;\n    uniform vec2 resolution;\n    uniform vec4 color;\n    uniform vec4 backgroundColor;\n    uniform float direction;\n    uniform float radius;\n    uniform float time;\n    uniform float stroke;\n    uniform float showDot;\n    uniform float period;\n    uniform float alpha;\n    \n    float circleDist(vec2 p, float radius){\n        return length(p) - radius;\n    }\n    \n    float fillMask(float dist){\n        return clamp(-dist, 0.0, 1.0);\n    }\n    \n    void main() {\n        vec2 halfRes = 0.5 * resolution.xy;\n        vec2 center = vTextureCoord.xy * resolution - halfRes;\n        \n        float c = max(-circleDist(center, radius - stroke), circleDist(center, radius));\n        float rot = -(time / 1000.0 / period) * 6.0 * direction;\n        center *= mat2(cos(rot), sin(rot), -sin(rot), cos(rot));\n        \n        float a = direction * atan(center.x, center.y) * PI * 0.05 + 0.45;\n        \n        float strokeRad = stroke * 0.5;\n        a = mix(a, max(a, fillMask(circleDist(vec2(center.x, center.y + (radius - strokeRad)), strokeRad))), showDot);\n        vec4 base = mix(vec4(0.0), backgroundColor * alpha, fillMask(c));\n        gl_FragColor = mix(base, color * alpha, fillMask(c) * a);\n    }\n";
    const e = {
        Application: Application,
        Component: Component,
        Base: Base,
        Utils: Utils,
        StageUtils: StageUtils,
        Element: Element,
        Tools: Tools,
        Stage: Stage,
        ElementCore: ElementCore,
        ElementTexturizer: ElementTexturizer,
        Texture: Texture,
        EventEmitter: EventEmitter,
        shaders: {
            Grayscale: WebGLGrayscaleShader,
            BoxBlur: BoxBlurShader,
            Dithering: DitheringShader,
            CircularPush: CircularPushShader,
            Inversion: InversionShader,
            LinearBlur: LinearBlurShader,
            Outline: OutlineShader,
            Pixelate: PixelateShader,
            RadialFilter: RadialFilterShader,
            RoundedRectangle: RoundedRectangleShader,
            Spinner2: SpinnerShader2,
            FadeOut: FadeOutShader,
            Hole: HoleShader,
            Vignette: VignetteShader,
            Spinner: SpinnerShader,
            RadialGradient: RadialGradientShader,
            Light3d: Light3dShader,
            Perspective: PerspectiveShader,
            Magnifier: MagnifierShader,
            WebGLShader: WebGLShader,
            WebGLDefaultShader: DefaultShader,
            C2dShader: C2dShader,
            C2dDefaultShader: DefaultShader$1,
            c2d: {
                Grayscale: C2dGrayscaleShader,
                Blur: BlurShader
            }
        },
        textures: {
            RectangleTexture: RectangleTexture,
            NoiseTexture: NoiseTexture,
            TextTexture: TextTexture,
            ImageTexture: ImageTexture,
            HtmlTexture: HtmlTexture,
            StaticTexture: class StaticTexture extends Texture {
                constructor(t, e){
                    super(t), this._options = e;
                }
                set options(t) {
                    this._options !== t && (this._options = t, this._changed());
                }
                get options() {
                    return this._options;
                }
                _getIsValid() {
                    return !!this._options;
                }
                _getSourceLoader() {
                    return (t)=>{
                        t(null, this._options);
                    };
                }
            },
            StaticCanvasTexture: StaticCanvasTexture,
            SourceTexture: SourceTexture
        },
        components: {
            FastBlurComponent: class FastBlurComponent extends Component {
                static _template() {
                    return {};
                }
                get wrap() {
                    return this.tag("Wrap");
                }
                set content(t) {
                    return this.wrap.content = t;
                }
                get content() {
                    return this.wrap.content;
                }
                set padding(t) {
                    this.wrap._paddingX = t, this.wrap._paddingY = t, this.wrap._updateBlurSize();
                }
                set paddingX(t) {
                    this.wrap._paddingX = t, this.wrap._updateBlurSize();
                }
                set paddingY(t) {
                    this.wrap._paddingY = t, this.wrap._updateBlurSize();
                }
                set amount(t) {
                    return this.wrap.amount = t;
                }
                get amount() {
                    return this.wrap.amount;
                }
                _onResize() {
                    this.wrap.w = this.renderWidth, this.wrap.h = this.renderHeight;
                }
                get _signalProxy() {
                    return !0;
                }
                _build() {
                    this.patch({
                        Wrap: {
                            type: this.stage.gl ? WebGLFastBlurComponent : C2dFastBlurComponent
                        }
                    });
                }
            },
            BloomComponent: class BloomComponent extends Component {
                static _template() {
                    const onUpdate = function(t, e) {
                        if (130 & e._recalc) {
                            const t1 = e.w, i = e.h;
                            let s = e;
                            do s = s._children[0], s._element.w = t1, s._element.h = i;
                            while (s._children);
                        }
                    };
                    return {
                        Textwrap: {
                            rtt: !0,
                            forceZIndexContext: !0,
                            renderOffscreen: !0,
                            BloomBase: {
                                shader: {
                                    type: BloomBaseShader
                                },
                                Content: {}
                            }
                        },
                        Layers: {
                            L0: {
                                rtt: !0,
                                onUpdate: onUpdate,
                                scale: 2,
                                pivot: 0,
                                visible: !1,
                                Content: {
                                    shader: {
                                        type: BoxBlurShader
                                    }
                                }
                            },
                            L1: {
                                rtt: !0,
                                onUpdate: onUpdate,
                                scale: 4,
                                pivot: 0,
                                visible: !1,
                                Content: {
                                    shader: {
                                        type: BoxBlurShader
                                    }
                                }
                            },
                            L2: {
                                rtt: !0,
                                onUpdate: onUpdate,
                                scale: 8,
                                pivot: 0,
                                visible: !1,
                                Content: {
                                    shader: {
                                        type: BoxBlurShader
                                    }
                                }
                            },
                            L3: {
                                rtt: !0,
                                onUpdate: onUpdate,
                                scale: 16,
                                pivot: 0,
                                visible: !1,
                                Content: {
                                    shader: {
                                        type: BoxBlurShader
                                    }
                                }
                            }
                        }
                    };
                }
                get _signalProxy() {
                    return !0;
                }
                constructor(t){
                    super(t), this._textwrap = this.sel("Textwrap"), this._wrapper = this.sel("Textwrap.Content"), this._layers = this.sel("Layers"), this._amount = 0, this._paddingX = 0, this._paddingY = 0;
                }
                _build() {
                    const t = [
                        {
                            x: 1,
                            y: 0,
                            kernelRadius: 3
                        },
                        {
                            x: 0,
                            y: 1,
                            kernelRadius: 3
                        },
                        {
                            x: 1.5,
                            y: 0,
                            kernelRadius: 3
                        },
                        {
                            x: 0,
                            y: 1.5,
                            kernelRadius: 3
                        }
                    ].map((t)=>this.stage.createShader(Object.assign({
                            type: LinearBlurShader
                        }, t)));
                    this._setLayerTexture(this.getLayerContents(0), this._textwrap.getTexture(), []), this._setLayerTexture(this.getLayerContents(1), this.getLayer(0).getTexture(), [
                        t[0],
                        t[1]
                    ]), this._setLayerTexture(this.getLayerContents(2), this.getLayer(1).getTexture(), [
                        t[0],
                        t[1],
                        t[2],
                        t[3]
                    ]), this._setLayerTexture(this.getLayerContents(3), this.getLayer(2).getTexture(), [
                        t[0],
                        t[1],
                        t[2],
                        t[3]
                    ]);
                }
                _setLayerTexture(t, e, i) {
                    if (i.length) {
                        const s = i.pop(), r = t.stage.c({
                            rtt: !0,
                            shader: s
                        });
                        this._setLayerTexture(r, e, i), t.childList.add(r);
                    } else t.texture = e;
                    return t;
                }
                get content() {
                    return this.sel("Textwrap.Content");
                }
                set content(t) {
                    this.sel("Textwrap.Content").patch(t);
                }
                set padding(t) {
                    this._paddingX = t, this._paddingY = t, this._updateBlurSize();
                }
                set paddingX(t) {
                    this._paddingX = t, this._updateBlurSize();
                }
                set paddingY(t) {
                    this._paddingY = t, this._updateBlurSize();
                }
                getLayer(t) {
                    return this._layers.sel("L" + t);
                }
                getLayerContents(t) {
                    return this.getLayer(t).sel("Content");
                }
                _onResize() {
                    this._updateBlurSize();
                }
                _updateBlurSize() {
                    let t = this.renderWidth, e = this.renderHeight, i = this._paddingX, s = this._paddingY, r = t + 2 * i, n = e + 2 * s;
                    this._textwrap.w = r, this._wrapper.x = i, this.getLayer(0).w = this.getLayerContents(0).w = r / 2, this.getLayer(1).w = this.getLayerContents(1).w = r / 4, this.getLayer(2).w = this.getLayerContents(2).w = r / 8, this.getLayer(3).w = this.getLayerContents(3).w = r / 16, this._textwrap.x = -i, this._textwrap.h = n, this._wrapper.y = s, this.getLayer(0).h = this.getLayerContents(0).h = n / 2, this.getLayer(1).h = this.getLayerContents(1).h = n / 4, this.getLayer(2).h = this.getLayerContents(2).h = n / 8, this.getLayer(3).h = this.getLayerContents(3).h = n / 16, this._textwrap.y = -s, this.w = t, this.h = e;
                }
                set amount(t) {
                    this._amount = t, this._update();
                }
                get amount() {
                    return this._amount;
                }
                _update() {
                    let t = Math.min(4, Math.max(0, this._amount));
                    t > 0 && (this.getLayer(0).visible = t > 0, this.getLayer(1).visible = t > 1, this.getLayer(2).visible = t > 2, this.getLayer(3).visible = t > 3);
                }
                set shader(t) {
                    super.shader = t, this.renderToTexture || console.warn("[Lightning] Please enable renderToTexture to use with a shader.");
                }
                _firstActive() {
                    this._build();
                }
            },
            SmoothScaleComponent: SmoothScaleComponent,
            BorderComponent: class BorderComponent extends Component {
                static _template() {
                    return {
                        Content: {},
                        Borders: {
                            Top: {
                                rect: !0,
                                visible: !1,
                                mountY: 1
                            },
                            Right: {
                                rect: !0,
                                visible: !1
                            },
                            Bottom: {
                                rect: !0,
                                visible: !1
                            },
                            Left: {
                                rect: !0,
                                visible: !1,
                                mountX: 1
                            }
                        }
                    };
                }
                get _signalProxy() {
                    return !0;
                }
                constructor(t){
                    super(t), this._borderTop = this.tag("Top"), this._borderRight = this.tag("Right"), this._borderBottom = this.tag("Bottom"), this._borderLeft = this.tag("Left"), this.onAfterUpdate = function(t) {
                        const e = t.childList.first;
                        let i = t.core.w || e.renderWidth, s = t.core.h || e.renderHeight;
                        t._borderTop.w = i, t._borderBottom.y = s, t._borderBottom.w = i, t._borderLeft.h = s + t._borderTop.h + t._borderBottom.h, t._borderLeft.y = -t._borderTop.h, t._borderRight.x = i, t._borderRight.h = s + t._borderTop.h + t._borderBottom.h, t._borderRight.y = -t._borderTop.h;
                    }, this.borderWidth = 1;
                }
                get content() {
                    return this.sel("Content");
                }
                set content(t) {
                    this.sel("Content").patch(t, !0);
                }
                get borderWidth() {
                    return this.borderWidthTop;
                }
                get borderWidthTop() {
                    return this._borderTop.h;
                }
                get borderWidthRight() {
                    return this._borderRight.w;
                }
                get borderWidthBottom() {
                    return this._borderBottom.h;
                }
                get borderWidthLeft() {
                    return this._borderLeft.w;
                }
                set borderWidth(t) {
                    this.borderWidthTop = t, this.borderWidthRight = t, this.borderWidthBottom = t, this.borderWidthLeft = t;
                }
                set borderWidthTop(t) {
                    this._borderTop.h = t, this._borderTop.visible = t > 0;
                }
                set borderWidthRight(t) {
                    this._borderRight.w = t, this._borderRight.visible = t > 0;
                }
                set borderWidthBottom(t) {
                    this._borderBottom.h = t, this._borderBottom.visible = t > 0;
                }
                set borderWidthLeft(t) {
                    this._borderLeft.w = t, this._borderLeft.visible = t > 0;
                }
                get colorBorder() {
                    return this.colorBorderTop;
                }
                get colorBorderTop() {
                    return this._borderTop.color;
                }
                get colorBorderRight() {
                    return this._borderRight.color;
                }
                get colorBorderBottom() {
                    return this._borderBottom.color;
                }
                get colorBorderLeft() {
                    return this._borderLeft.color;
                }
                set colorBorder(t) {
                    this.colorBorderTop = t, this.colorBorderRight = t, this.colorBorderBottom = t, this.colorBorderLeft = t;
                }
                set colorBorderTop(t) {
                    this._borderTop.color = t;
                }
                set colorBorderRight(t) {
                    this._borderRight.color = t;
                }
                set colorBorderBottom(t) {
                    this._borderBottom.color = t;
                }
                set colorBorderLeft(t) {
                    this._borderLeft.color = t;
                }
                get borderTop() {
                    return this._borderTop;
                }
                set borderTop(t) {
                    this.borderTop.patch(t);
                }
                get borderRight() {
                    return this._borderRight;
                }
                set borderRight(t) {
                    this.borderRight.patch(t);
                }
                get borderBottom() {
                    return this._borderBottom;
                }
                set borderBottom(t) {
                    this.borderBottom.patch(t);
                }
                get borderLeft() {
                    return this._borderLeft;
                }
                set borderLeft(t) {
                    this.borderLeft.patch(t);
                }
                set borders(t) {
                    this.borderTop = t, this.borderLeft = t, this.borderBottom = t, this.borderRight = t;
                }
            },
            ListComponent: class ListComponent extends Component {
                constructor(t){
                    super(t), this._wrapper = super._children.a({}), this._reloadVisibleElements = !1, this._visibleItems = new Set, this._index = 0, this._started = !1, this._scrollTransitionSettings = this.stage.transitions.createSettings({}), this._itemSize = 100, this._viewportScrollOffset = 0, this._itemScrollOffset = 0, this._roll = !1, this._rollMin = 0, this._rollMax = 0, this._progressAnimation = null, this._invertDirection = !1, this._horizontal = !0, this.itemList = new ListItems(this);
                }
                _allowChildrenAccess() {
                    return !1;
                }
                get items() {
                    return this.itemList.get();
                }
                set items(t) {
                    this.itemList.patch(t);
                }
                start() {
                    this._wrapper.transition(this.property, this._scrollTransitionSettings), this._scrollTransition = this._wrapper.transition(this.property), this._scrollTransition.on("progress", (t)=>this.update()), this.setIndex(0, !0, !0), this._started = !0, this.update();
                }
                setIndex(t, e = !1, i = !1) {
                    let s = this.length;
                    if (!s) return;
                    if (this.emit("unfocus", this.getElement(this.realIndex), this._index, this.realIndex), i) {
                        let e1 = Utils.getModuloIndex(t, s) - Utils.getModuloIndex(this.index, s);
                        e1 > .5 * s ? e1 -= s : e1 < -0.5 * s && (e1 += s), this._index += e1;
                    } else this._index = t;
                    (this._roll || this.viewportSize > this._itemSize * s) && (this._index = Utils.getModuloIndex(this._index, s));
                    let r = this._horizontal ^ this._invertDirection ? -1 : 1, n = r * this._index * this._itemSize;
                    if (this._roll) {
                        let t1, e2, i1;
                        if (1 == r) e2 = (s - 1) * this._itemSize, i1 = this._viewportScrollOffset * this.viewportSize - this._itemScrollOffset * this._itemSize, e2 -= i1, t1 = this.viewportSize - (this._itemSize + i1), this._rollMin && (t1 -= this._rollMin), this._rollMax && (e2 += this._rollMax), n = Math.max(Math.min(n, e2), t1);
                        else {
                            e2 = s * this._itemSize - this.viewportSize, i1 = this._viewportScrollOffset * this.viewportSize - this._itemScrollOffset * this._itemSize, e2 += i1;
                            let t2 = i1;
                            this._rollMin && (t2 -= this._rollMin), this._rollMax && (e2 += this._rollMax), n = Math.min(Math.max(-e2, n), -t2);
                        }
                    }
                    this._scrollTransition.start(n), e && this._scrollTransition.finish(), this.emit("focus", this.getElement(this.realIndex), this._index, this.realIndex);
                }
                getAxisPosition() {
                    let t = -this._scrollTransition._targetValue, e = -(this._horizontal ^ this._invertDirection ? -1 : 1) * this._index * this._itemSize;
                    return this._viewportScrollOffset * this.viewportSize + (e - t);
                }
                update() {
                    if (!this._started) return;
                    let t = this.length;
                    if (!t) return;
                    let e, i, s, r, n = this._horizontal ^ this._invertDirection ? -1 : 1, o = this._horizontal ? this._wrapper.x : this._wrapper.y, a = this.viewportSize, h = this._viewportScrollOffset * a - this._itemScrollOffset * this._itemSize;
                    o += h, -1 == n ? (e = Math.floor(-o / this._itemSize), s = 1 - (-o / this._itemSize - e), i = Math.floor((a - o) / this._itemSize), r = (a - o) / this._itemSize - i) : (e = Math.ceil(o / this._itemSize), s = 1 + o / this._itemSize - e, i = Math.ceil((o - a) / this._itemSize), r = i - (o - a) / this._itemSize), (this._roll || a > this._itemSize * t) && (i >= t && (i = t - 1, r = 1), e >= t && (e = t - 1, s = 1), i <= -1 && (i = 0, r = 1), e <= -1 && (e = 0, s = 1));
                    let l, _ = -n * e * this._itemSize;
                    for(let o1 = e; -1 == n ? o1 <= i : o1 >= i; -1 == n ? o1++ : o1--){
                        let n1 = Utils.getModuloIndex(o1, t), a1 = this.getElement(n1);
                        l = a1.parent, this._visibleItems.delete(l), this._horizontal ? l.x = _ + h : l.y = _ + h;
                        let u = l.visible;
                        if (l.visible = !0, u && !this._reloadVisibleElements || this.emit("visible", o1, n1), this._progressAnimation) {
                            let t1 = 1;
                            o1 == e ? t1 = s : o1 == i && (t1 = r), this._progressAnimation.apply(a1, t1);
                        }
                        _ += this._itemSize;
                    }
                    let u1 = this;
                    this._visibleItems.forEach(function(t) {
                        t.visible = !1, u1._visibleItems.delete(t);
                    });
                    for(let s1 = e; -1 == n ? s1 <= i : s1 >= i; -1 == n ? s1++ : s1--){
                        let e1 = Utils.getModuloIndex(s1, t);
                        this._visibleItems.add(this.getWrapper(e1));
                    }
                    this._reloadVisibleElements = !1;
                }
                setPrevious() {
                    this.setIndex(this._index - 1);
                }
                setNext() {
                    this.setIndex(this._index + 1);
                }
                getWrapper(t) {
                    return this._wrapper.children[t];
                }
                getElement(t) {
                    let e = this._wrapper.children[t];
                    return e ? e.children[0] : null;
                }
                reload() {
                    this._reloadVisibleElements = !0, this.update();
                }
                get element() {
                    let t = this._wrapper.children[this.realIndex];
                    return t ? t.children[0] : null;
                }
                get length() {
                    return this._wrapper.children.length;
                }
                get property() {
                    return this._horizontal ? "x" : "y";
                }
                get viewportSize() {
                    return this._horizontal ? this.w : this.h;
                }
                get index() {
                    return this._index;
                }
                get realIndex() {
                    return Utils.getModuloIndex(this._index, this.length);
                }
                get itemSize() {
                    return this._itemSize;
                }
                set itemSize(t) {
                    this._itemSize = t, this.update();
                }
                get viewportScrollOffset() {
                    return this._viewportScrollOffset;
                }
                set viewportScrollOffset(t) {
                    this._viewportScrollOffset = t, this.update();
                }
                get itemScrollOffset() {
                    return this._itemScrollOffset;
                }
                set itemScrollOffset(t) {
                    this._itemScrollOffset = t, this.update();
                }
                get scrollTransitionSettings() {
                    return this._scrollTransitionSettings;
                }
                set scrollTransitionSettings(t) {
                    this._scrollTransitionSettings.patch(t);
                }
                set scrollTransition(t) {
                    this._scrollTransitionSettings.patch(t);
                }
                get scrollTransition() {
                    return this._scrollTransition;
                }
                get progressAnimation() {
                    return this._progressAnimation;
                }
                set progressAnimation(t) {
                    Utils.isObjectLiteral(t) ? this._progressAnimation = this.stage.animations.createSettings(t) : this._progressAnimation = t, this.update();
                }
                get roll() {
                    return this._roll;
                }
                set roll(t) {
                    this._roll = t, this.update();
                }
                get rollMin() {
                    return this._rollMin;
                }
                set rollMin(t) {
                    this._rollMin = t, this.update();
                }
                get rollMax() {
                    return this._rollMax;
                }
                set rollMax(t) {
                    this._rollMax = t, this.update();
                }
                get invertDirection() {
                    return this._invertDirection;
                }
                set invertDirection(t) {
                    this._started || (this._invertDirection = t);
                }
                get horizontal() {
                    return this._horizontal;
                }
                set horizontal(t) {
                    t !== this._horizontal && (this._started || (this._horizontal = t));
                }
            }
        },
        tools: {
            ObjMerger: ObjMerger,
            ObjectListProxy: ObjectListProxy,
            ObjectListWrapper: ObjectListWrapper
        }
    };
    return Utils.isWeb && (window.lng = e), e;
}); //# sourceMappingURL=lightning.min.js.map

//# sourceMappingURL=index.7697d6bc.js.map
