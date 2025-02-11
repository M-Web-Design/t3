!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.azlib = e())
    : (t.azlib = e());
})(this, function () {
  return (function () {
    var t = {
        591: function (t) {
          t.exports = (function () {
            "use strict";
            var t = {
                update: null,
                begin: null,
                loopBegin: null,
                changeBegin: null,
                change: null,
                changeComplete: null,
                loopComplete: null,
                complete: null,
                loop: 1,
                direction: "normal",
                autoplay: !0,
                timelineOffset: 0,
              },
              e = {
                duration: 1e3,
                delay: 0,
                endDelay: 0,
                easing: "easeOutElastic(1, .5)",
                round: 0,
              },
              n = [
                "translateX",
                "translateY",
                "translateZ",
                "rotate",
                "rotateX",
                "rotateY",
                "rotateZ",
                "scale",
                "scaleX",
                "scaleY",
                "scaleZ",
                "skew",
                "skewX",
                "skewY",
                "perspective",
                "matrix",
                "matrix3d",
              ],
              i = { CSS: {}, springs: {} };
            function o(t, e, n) {
              return Math.min(Math.max(t, e), n);
            }
            function r(t, e) {
              return t.indexOf(e) > -1;
            }
            function s(t, e) {
              return t.apply(null, e);
            }
            var a = {
              arr: function (t) {
                return Array.isArray(t);
              },
              obj: function (t) {
                return r(Object.prototype.toString.call(t), "Object");
              },
              pth: function (t) {
                return a.obj(t) && t.hasOwnProperty("totalLength");
              },
              svg: function (t) {
                return t instanceof SVGElement;
              },
              inp: function (t) {
                return t instanceof HTMLInputElement;
              },
              dom: function (t) {
                return t.nodeType || a.svg(t);
              },
              str: function (t) {
                return "string" == typeof t;
              },
              fnc: function (t) {
                return "function" == typeof t;
              },
              und: function (t) {
                return void 0 === t;
              },
              nil: function (t) {
                return a.und(t) || null === t;
              },
              hex: function (t) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
              },
              rgb: function (t) {
                return /^rgb/.test(t);
              },
              hsl: function (t) {
                return /^hsl/.test(t);
              },
              col: function (t) {
                return a.hex(t) || a.rgb(t) || a.hsl(t);
              },
              key: function (n) {
                return (
                  !t.hasOwnProperty(n) &&
                  !e.hasOwnProperty(n) &&
                  "targets" !== n &&
                  "keyframes" !== n
                );
              },
            };
            function u(t) {
              var e = /\(([^)]+)\)/.exec(t);
              return e
                ? e[1].split(",").map(function (t) {
                    return parseFloat(t);
                  })
                : [];
            }
            function c(t, e) {
              var n = u(t),
                r = o(a.und(n[0]) ? 1 : n[0], 0.1, 100),
                s = o(a.und(n[1]) ? 100 : n[1], 0.1, 100),
                c = o(a.und(n[2]) ? 10 : n[2], 0.1, 100),
                l = o(a.und(n[3]) ? 0 : n[3], 0.1, 100),
                d = Math.sqrt(s / r),
                p = c / (2 * Math.sqrt(s * r)),
                h = p < 1 ? d * Math.sqrt(1 - p * p) : 0,
                f = p < 1 ? (p * d - l) / h : -l + d;
              function g(t) {
                var n = e ? (e * t) / 1e3 : t;
                return (
                  (n =
                    p < 1
                      ? Math.exp(-n * p * d) *
                        (1 * Math.cos(h * n) + f * Math.sin(h * n))
                      : (1 + f * n) * Math.exp(-n * d)),
                  0 === t || 1 === t ? t : 1 - n
                );
              }
              return e
                ? g
                : function () {
                    var e = i.springs[t];
                    if (e) return e;
                    for (var n = 0, o = 0; ; )
                      if (1 === g((n += 1 / 6))) {
                        if (++o >= 16) break;
                      } else o = 0;
                    var r = n * (1 / 6) * 1e3;
                    return (i.springs[t] = r), r;
                  };
            }
            function l(t) {
              return (
                void 0 === t && (t = 10),
                function (e) {
                  return Math.ceil(o(e, 1e-6, 1) * t) * (1 / t);
                }
              );
            }
            var d,
              p,
              h = (function () {
                var t = 0.1;
                function e(t, e) {
                  return 1 - 3 * e + 3 * t;
                }
                function n(t, e) {
                  return 3 * e - 6 * t;
                }
                function i(t) {
                  return 3 * t;
                }
                function o(t, o, r) {
                  return ((e(o, r) * t + n(o, r)) * t + i(o)) * t;
                }
                function r(t, o, r) {
                  return 3 * e(o, r) * t * t + 2 * n(o, r) * t + i(o);
                }
                return function (e, n, i, s) {
                  if (0 <= e && e <= 1 && 0 <= i && i <= 1) {
                    var a = new Float32Array(11);
                    if (e !== n || i !== s)
                      for (var u = 0; u < 11; ++u) a[u] = o(u * t, e, i);
                    return function (t) {
                      return (e === n && i === s) || 0 === t || 1 === t
                        ? t
                        : o(c(t), n, s);
                    };
                  }
                  function c(n) {
                    for (var s = 0, u = 1; 10 !== u && a[u] <= n; ++u) s += t;
                    var c = s + ((n - a[--u]) / (a[u + 1] - a[u])) * t,
                      l = r(c, e, i);
                    return l >= 0.001
                      ? (function (t, e, n, i) {
                          for (var s = 0; s < 4; ++s) {
                            var a = r(e, n, i);
                            if (0 === a) return e;
                            e -= (o(e, n, i) - t) / a;
                          }
                          return e;
                        })(n, c, e, i)
                      : 0 === l
                      ? c
                      : (function (t, e, n, i, r) {
                          for (
                            var s, a, u = 0;
                            (s = o((a = e + (n - e) / 2), i, r) - t) > 0
                              ? (n = a)
                              : (e = a),
                              Math.abs(s) > 1e-7 && ++u < 10;

                          );
                          return a;
                        })(n, s, s + t, e, i);
                  }
                };
              })(),
              f =
                ((d = {
                  linear: function () {
                    return function (t) {
                      return t;
                    };
                  },
                }),
                (p = {
                  Sine: function () {
                    return function (t) {
                      return 1 - Math.cos((t * Math.PI) / 2);
                    };
                  },
                  Circ: function () {
                    return function (t) {
                      return 1 - Math.sqrt(1 - t * t);
                    };
                  },
                  Back: function () {
                    return function (t) {
                      return t * t * (3 * t - 2);
                    };
                  },
                  Bounce: function () {
                    return function (t) {
                      for (
                        var e, n = 4;
                        t < ((e = Math.pow(2, --n)) - 1) / 11;

                      );
                      return (
                        1 / Math.pow(4, 3 - n) -
                        7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                      );
                    };
                  },
                  Elastic: function (t, e) {
                    void 0 === t && (t = 1), void 0 === e && (e = 0.5);
                    var n = o(t, 1, 10),
                      i = o(e, 0.1, 2);
                    return function (t) {
                      return 0 === t || 1 === t
                        ? t
                        : -n *
                            Math.pow(2, 10 * (t - 1)) *
                            Math.sin(
                              ((t -
                                1 -
                                (i / (2 * Math.PI)) * Math.asin(1 / n)) *
                                (2 * Math.PI)) /
                                i
                            );
                    };
                  },
                }),
                ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (
                  t,
                  e
                ) {
                  p[t] = function () {
                    return function (t) {
                      return Math.pow(t, e + 2);
                    };
                  };
                }),
                Object.keys(p).forEach(function (t) {
                  var e = p[t];
                  (d["easeIn" + t] = e),
                    (d["easeOut" + t] = function (t, n) {
                      return function (i) {
                        return 1 - e(t, n)(1 - i);
                      };
                    }),
                    (d["easeInOut" + t] = function (t, n) {
                      return function (i) {
                        return i < 0.5
                          ? e(t, n)(2 * i) / 2
                          : 1 - e(t, n)(-2 * i + 2) / 2;
                      };
                    }),
                    (d["easeOutIn" + t] = function (t, n) {
                      return function (i) {
                        return i < 0.5
                          ? (1 - e(t, n)(1 - 2 * i)) / 2
                          : (e(t, n)(2 * i - 1) + 1) / 2;
                      };
                    });
                }),
                d);
            function g(t, e) {
              if (a.fnc(t)) return t;
              var n = t.split("(")[0],
                i = f[n],
                o = u(t);
              switch (n) {
                case "spring":
                  return c(t, e);
                case "cubicBezier":
                  return s(h, o);
                case "steps":
                  return s(l, o);
                default:
                  return s(i, o);
              }
            }
            function m(t) {
              try {
                return document.querySelectorAll(t);
              } catch (t) {
                return;
              }
            }
            function v(t, e) {
              for (
                var n = t.length,
                  i = arguments.length >= 2 ? arguments[1] : void 0,
                  o = [],
                  r = 0;
                r < n;
                r++
              )
                if (r in t) {
                  var s = t[r];
                  e.call(i, s, r, t) && o.push(s);
                }
              return o;
            }
            function y(t) {
              return t.reduce(function (t, e) {
                return t.concat(a.arr(e) ? y(e) : e);
              }, []);
            }
            function b(t) {
              return a.arr(t)
                ? t
                : (a.str(t) && (t = m(t) || t),
                  t instanceof NodeList || t instanceof HTMLCollection
                    ? [].slice.call(t)
                    : [t]);
            }
            function w(t, e) {
              return t.some(function (t) {
                return t === e;
              });
            }
            function A(t) {
              var e = {};
              for (var n in t) e[n] = t[n];
              return e;
            }
            function L(t, e) {
              var n = A(t);
              for (var i in t) n[i] = e.hasOwnProperty(i) ? e[i] : t[i];
              return n;
            }
            function x(t, e) {
              var n = A(t);
              for (var i in e) n[i] = a.und(t[i]) ? e[i] : t[i];
              return n;
            }
            function S(t) {
              var e =
                /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
                  t
                );
              if (e) return e[1];
            }
            function C(t, e) {
              return a.fnc(t) ? t(e.target, e.id, e.total) : t;
            }
            function T(t, e) {
              return t.getAttribute(e);
            }
            function E(t, e, n) {
              if (w([n, "deg", "rad", "turn"], S(e))) return e;
              var o = i.CSS[e + n];
              if (!a.und(o)) return o;
              var r = document.createElement(t.tagName),
                s =
                  t.parentNode && t.parentNode !== document
                    ? t.parentNode
                    : document.body;
              s.appendChild(r),
                (r.style.position = "absolute"),
                (r.style.width = 100 + n);
              var u = 100 / r.offsetWidth;
              s.removeChild(r);
              var c = u * parseFloat(e);
              return (i.CSS[e + n] = c), c;
            }
            function M(t, e, n) {
              if (e in t.style) {
                var i = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                  o =
                    t.style[e] ||
                    getComputedStyle(t).getPropertyValue(i) ||
                    "0";
                return n ? E(t, o, n) : o;
              }
            }
            function O(t, e) {
              return a.dom(t) &&
                !a.inp(t) &&
                (!a.nil(T(t, e)) || (a.svg(t) && t[e]))
                ? "attribute"
                : a.dom(t) && w(n, e)
                ? "transform"
                : a.dom(t) && "transform" !== e && M(t, e)
                ? "css"
                : null != t[e]
                ? "object"
                : void 0;
            }
            function I(t) {
              if (a.dom(t)) {
                for (
                  var e,
                    n = t.style.transform || "",
                    i = /(\w+)\(([^)]*)\)/g,
                    o = new Map();
                  (e = i.exec(n));

                )
                  o.set(e[1], e[2]);
                return o;
              }
            }
            function P(t, e, n, i) {
              switch (O(t, e)) {
                case "transform":
                  return (function (t, e, n, i) {
                    var o,
                      s = r(e, "scale")
                        ? 1
                        : 0 +
                          (r((o = e), "translate") || "perspective" === o
                            ? "px"
                            : r(o, "rotate") || r(o, "skew")
                            ? "deg"
                            : void 0),
                      a = I(t).get(e) || s;
                    return (
                      n &&
                        (n.transforms.list.set(e, a), (n.transforms.last = e)),
                      i ? E(t, a, i) : a
                    );
                  })(t, e, i, n);
                case "css":
                  return M(t, e, n);
                case "attribute":
                  return T(t, e);
                default:
                  return t[e] || 0;
              }
            }
            function k(t, e) {
              var n = /^(\*=|\+=|-=)/.exec(t);
              if (!n) return t;
              var i = S(t) || 0,
                o = parseFloat(e),
                r = parseFloat(t.replace(n[0], ""));
              switch (n[0][0]) {
                case "+":
                  return o + r + i;
                case "-":
                  return o - r + i;
                case "*":
                  return o * r + i;
              }
            }
            function q(t, e) {
              if (a.col(t))
                return (function (t) {
                  return a.rgb(t)
                    ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((e = t)))
                      ? "rgba(" + n[1] + ",1)"
                      : e
                    : a.hex(t)
                    ? ((i = t.replace(
                        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        function (t, e, n, i) {
                          return e + e + n + n + i + i;
                        }
                      )),
                      (o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i)),
                      "rgba(" +
                        parseInt(o[1], 16) +
                        "," +
                        parseInt(o[2], 16) +
                        "," +
                        parseInt(o[3], 16) +
                        ",1)")
                    : a.hsl(t)
                    ? (function (t) {
                        var e,
                          n,
                          i,
                          o =
                            /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) ||
                            /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(
                              t
                            ),
                          r = parseInt(o[1], 10) / 360,
                          s = parseInt(o[2], 10) / 100,
                          a = parseInt(o[3], 10) / 100,
                          u = o[4] || 1;
                        function c(t, e, n) {
                          return (
                            n < 0 && (n += 1),
                            n > 1 && (n -= 1),
                            n < 1 / 6
                              ? t + 6 * (e - t) * n
                              : n < 0.5
                              ? e
                              : n < 2 / 3
                              ? t + (e - t) * (2 / 3 - n) * 6
                              : t
                          );
                        }
                        if (0 == s) e = n = i = a;
                        else {
                          var l = a < 0.5 ? a * (1 + s) : a + s - a * s,
                            d = 2 * a - l;
                          (e = c(d, l, r + 1 / 3)),
                            (n = c(d, l, r)),
                            (i = c(d, l, r - 1 / 3));
                        }
                        return (
                          "rgba(" +
                          255 * e +
                          "," +
                          255 * n +
                          "," +
                          255 * i +
                          "," +
                          u +
                          ")"
                        );
                      })(t)
                    : void 0;
                  var e, n, i, o;
                })(t);
              if (/\s/g.test(t)) return t;
              var n = S(t),
                i = n ? t.substr(0, t.length - n.length) : t;
              return e ? i + e : i;
            }
            function N(t, e) {
              return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
            }
            function D(t) {
              for (
                var e, n = t.points, i = 0, o = 0;
                o < n.numberOfItems;
                o++
              ) {
                var r = n.getItem(o);
                o > 0 && (i += N(e, r)), (e = r);
              }
              return i;
            }
            function B(t) {
              if (t.getTotalLength) return t.getTotalLength();
              switch (t.tagName.toLowerCase()) {
                case "circle":
                  return (r = t), 2 * Math.PI * T(r, "r");
                case "rect":
                  return 2 * T((o = t), "width") + 2 * T(o, "height");
                case "line":
                  return N(
                    { x: T((i = t), "x1"), y: T(i, "y1") },
                    { x: T(i, "x2"), y: T(i, "y2") }
                  );
                case "polyline":
                  return D(t);
                case "polygon":
                  return (
                    (n = (e = t).points),
                    D(e) + N(n.getItem(n.numberOfItems - 1), n.getItem(0))
                  );
              }
              var e, n, i, o, r;
            }
            function W(t, e) {
              var n = e || {},
                i =
                  n.el ||
                  (function (t) {
                    for (
                      var e = t.parentNode;
                      a.svg(e) && a.svg(e.parentNode);

                    )
                      e = e.parentNode;
                    return e;
                  })(t),
                o = i.getBoundingClientRect(),
                r = T(i, "viewBox"),
                s = o.width,
                u = o.height,
                c = n.viewBox || (r ? r.split(" ") : [0, 0, s, u]);
              return {
                el: i,
                viewBox: c,
                x: c[0] / 1,
                y: c[1] / 1,
                w: s,
                h: u,
                vW: c[2],
                vH: c[3],
              };
            }
            function H(t, e, n) {
              function i(n) {
                void 0 === n && (n = 0);
                var i = e + n >= 1 ? e + n : 0;
                return t.el.getPointAtLength(i);
              }
              var o = W(t.el, t.svg),
                r = i(),
                s = i(-1),
                a = i(1),
                u = n ? 1 : o.w / o.vW,
                c = n ? 1 : o.h / o.vH;
              switch (t.property) {
                case "x":
                  return (r.x - o.x) * u;
                case "y":
                  return (r.y - o.y) * c;
                case "angle":
                  return (180 * Math.atan2(a.y - s.y, a.x - s.x)) / Math.PI;
              }
            }
            function F(t, e) {
              var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
                i = q(a.pth(t) ? t.totalLength : t, e) + "";
              return {
                original: i,
                numbers: i.match(n) ? i.match(n).map(Number) : [0],
                strings: a.str(t) || e ? i.split(n) : [],
              };
            }
            function j(t) {
              return v(
                t ? y(a.arr(t) ? t.map(b) : b(t)) : [],
                function (t, e, n) {
                  return n.indexOf(t) === e;
                }
              );
            }
            function R(t) {
              var e = j(t);
              return e.map(function (t, n) {
                return {
                  target: t,
                  id: n,
                  total: e.length,
                  transforms: { list: I(t) },
                };
              });
            }
            function X(t, e) {
              var n = A(e);
              if (
                (/^spring/.test(n.easing) && (n.duration = c(n.easing)),
                a.arr(t))
              ) {
                var i = t.length;
                2 !== i || a.obj(t[0])
                  ? a.fnc(e.duration) || (n.duration = e.duration / i)
                  : (t = { value: t });
              }
              var o = a.arr(t) ? t : [t];
              return o
                .map(function (t, n) {
                  var i = a.obj(t) && !a.pth(t) ? t : { value: t };
                  return (
                    a.und(i.delay) && (i.delay = n ? 0 : e.delay),
                    a.und(i.endDelay) &&
                      (i.endDelay = n === o.length - 1 ? e.endDelay : 0),
                    i
                  );
                })
                .map(function (t) {
                  return x(t, n);
                });
            }
            function z(t, e) {
              var n = [],
                i = e.keyframes;
              for (var o in (i &&
                (e = x(
                  (function (t) {
                    for (
                      var e = v(
                          y(
                            t.map(function (t) {
                              return Object.keys(t);
                            })
                          ),
                          function (t) {
                            return a.key(t);
                          }
                        ).reduce(function (t, e) {
                          return t.indexOf(e) < 0 && t.push(e), t;
                        }, []),
                        n = {},
                        i = function (i) {
                          var o = e[i];
                          n[o] = t.map(function (t) {
                            var e = {};
                            for (var n in t)
                              a.key(n)
                                ? n == o && (e.value = t[n])
                                : (e[n] = t[n]);
                            return e;
                          });
                        },
                        o = 0;
                      o < e.length;
                      o++
                    )
                      i(o);
                    return n;
                  })(i),
                  e
                )),
              e))
                a.key(o) && n.push({ name: o, tweens: X(e[o], t) });
              return n;
            }
            var Y = {
              css: function (t, e, n) {
                return (t.style[e] = n);
              },
              attribute: function (t, e, n) {
                return t.setAttribute(e, n);
              },
              object: function (t, e, n) {
                return (t[e] = n);
              },
              transform: function (t, e, n, i, o) {
                if ((i.list.set(e, n), e === i.last || o)) {
                  var r = "";
                  i.list.forEach(function (t, e) {
                    r += e + "(" + t + ") ";
                  }),
                    (t.style.transform = r);
                }
              },
            };
            function _(t, e) {
              R(t).forEach(function (t) {
                for (var n in e) {
                  var i = C(e[n], t),
                    o = t.target,
                    r = S(i),
                    s = P(o, n, r, t),
                    a = k(q(i, r || S(s)), s),
                    u = O(o, n);
                  Y[u](o, n, a, t.transforms, !0);
                }
              });
            }
            function V(t, e) {
              return v(
                y(
                  t.map(function (t) {
                    return e.map(function (e) {
                      return (function (t, e) {
                        var n = O(t.target, e.name);
                        if (n) {
                          var i = (function (t, e) {
                              var n;
                              return t.tweens.map(function (i) {
                                var o = (function (t, e) {
                                    var n = {};
                                    for (var i in t) {
                                      var o = C(t[i], e);
                                      a.arr(o) &&
                                        1 ===
                                          (o = o.map(function (t) {
                                            return C(t, e);
                                          })).length &&
                                        (o = o[0]),
                                        (n[i] = o);
                                    }
                                    return (
                                      (n.duration = parseFloat(n.duration)),
                                      (n.delay = parseFloat(n.delay)),
                                      n
                                    );
                                  })(i, e),
                                  r = o.value,
                                  s = a.arr(r) ? r[1] : r,
                                  u = S(s),
                                  c = P(e.target, t.name, u, e),
                                  l = n ? n.to.original : c,
                                  d = a.arr(r) ? r[0] : l,
                                  p = S(d) || S(c),
                                  h = u || p;
                                return (
                                  a.und(s) && (s = l),
                                  (o.from = F(d, h)),
                                  (o.to = F(k(s, d), h)),
                                  (o.start = n ? n.end : 0),
                                  (o.end =
                                    o.start +
                                    o.delay +
                                    o.duration +
                                    o.endDelay),
                                  (o.easing = g(o.easing, o.duration)),
                                  (o.isPath = a.pth(r)),
                                  (o.isPathTargetInsideSVG =
                                    o.isPath && a.svg(e.target)),
                                  (o.isColor = a.col(o.from.original)),
                                  o.isColor && (o.round = 1),
                                  (n = o),
                                  o
                                );
                              });
                            })(e, t),
                            o = i[i.length - 1];
                          return {
                            type: n,
                            property: e.name,
                            animatable: t,
                            tweens: i,
                            duration: o.end,
                            delay: i[0].delay,
                            endDelay: o.endDelay,
                          };
                        }
                      })(t, e);
                    });
                  })
                ),
                function (t) {
                  return !a.und(t);
                }
              );
            }
            function U(t, e) {
              var n = t.length,
                i = function (t) {
                  return t.timelineOffset ? t.timelineOffset : 0;
                },
                o = {};
              return (
                (o.duration = n
                  ? Math.max.apply(
                      Math,
                      t.map(function (t) {
                        return i(t) + t.duration;
                      })
                    )
                  : e.duration),
                (o.delay = n
                  ? Math.min.apply(
                      Math,
                      t.map(function (t) {
                        return i(t) + t.delay;
                      })
                    )
                  : e.delay),
                (o.endDelay = n
                  ? o.duration -
                    Math.max.apply(
                      Math,
                      t.map(function (t) {
                        return i(t) + t.duration - t.endDelay;
                      })
                    )
                  : e.endDelay),
                o
              );
            }
            var $ = 0,
              G = [],
              Z = (function () {
                var t;
                function e(n) {
                  for (var i = G.length, o = 0; o < i; ) {
                    var r = G[o];
                    r.paused ? (G.splice(o, 1), i--) : (r.tick(n), o++);
                  }
                  t = o > 0 ? requestAnimationFrame(e) : void 0;
                }
                return (
                  "undefined" != typeof document &&
                    document.addEventListener("visibilitychange", function () {
                      J.suspendWhenDocumentHidden &&
                        (Q()
                          ? (t = cancelAnimationFrame(t))
                          : (G.forEach(function (t) {
                              return t._onDocumentVisibility();
                            }),
                            Z()));
                    }),
                  function () {
                    t ||
                      (Q() && J.suspendWhenDocumentHidden) ||
                      !(G.length > 0) ||
                      (t = requestAnimationFrame(e));
                  }
                );
              })();
            function Q() {
              return !!document && document.hidden;
            }
            function J(n) {
              void 0 === n && (n = {});
              var i,
                r = 0,
                s = 0,
                a = 0,
                u = 0,
                c = null;
              function l(t) {
                var e =
                  window.Promise &&
                  new Promise(function (t) {
                    return (c = t);
                  });
                return (t.finished = e), e;
              }
              var d,
                p,
                h,
                f,
                g,
                m,
                y,
                b,
                w =
                  ((p = L(t, (d = n))),
                  (f = z((h = L(e, d)), d)),
                  (y = U((m = V((g = R(d.targets)), f)), h)),
                  (b = $),
                  $++,
                  x(p, {
                    id: b,
                    children: [],
                    animatables: g,
                    animations: m,
                    duration: y.duration,
                    delay: y.delay,
                    endDelay: y.endDelay,
                  }));
              function A() {
                var t = w.direction;
                "alternate" !== t &&
                  (w.direction = "normal" !== t ? "normal" : "reverse"),
                  (w.reversed = !w.reversed),
                  i.forEach(function (t) {
                    return (t.reversed = w.reversed);
                  });
              }
              function S(t) {
                return w.reversed ? w.duration - t : t;
              }
              function C() {
                (r = 0), (s = S(w.currentTime) * (1 / J.speed));
              }
              function T(t, e) {
                e && e.seek(t - e.timelineOffset);
              }
              function E(t) {
                for (var e = 0, n = w.animations, i = n.length; e < i; ) {
                  var r = n[e],
                    s = r.animatable,
                    a = r.tweens,
                    u = a.length - 1,
                    c = a[u];
                  u &&
                    (c =
                      v(a, function (e) {
                        return t < e.end;
                      })[0] || c);
                  for (
                    var l =
                        o(t - c.start - c.delay, 0, c.duration) / c.duration,
                      d = isNaN(l) ? 1 : c.easing(l),
                      p = c.to.strings,
                      h = c.round,
                      f = [],
                      g = c.to.numbers.length,
                      m = void 0,
                      y = 0;
                    y < g;
                    y++
                  ) {
                    var b = void 0,
                      A = c.to.numbers[y],
                      L = c.from.numbers[y] || 0;
                    (b = c.isPath
                      ? H(c.value, d * A, c.isPathTargetInsideSVG)
                      : L + d * (A - L)),
                      h &&
                        ((c.isColor && y > 2) || (b = Math.round(b * h) / h)),
                      f.push(b);
                  }
                  var x = p.length;
                  if (x) {
                    m = p[0];
                    for (var S = 0; S < x; S++) {
                      p[S];
                      var C = p[S + 1],
                        T = f[S];
                      isNaN(T) || (m += C ? T + C : T + " ");
                    }
                  } else m = f[0];
                  Y[r.type](s.target, r.property, m, s.transforms),
                    (r.currentValue = m),
                    e++;
                }
              }
              function M(t) {
                w[t] && !w.passThrough && w[t](w);
              }
              function O(t) {
                var e = w.duration,
                  n = w.delay,
                  d = e - w.endDelay,
                  p = S(t);
                (w.progress = o((p / e) * 100, 0, 100)),
                  (w.reversePlayback = p < w.currentTime),
                  i &&
                    (function (t) {
                      if (w.reversePlayback) for (var e = u; e--; ) T(t, i[e]);
                      else for (var n = 0; n < u; n++) T(t, i[n]);
                    })(p),
                  !w.began && w.currentTime > 0 && ((w.began = !0), M("begin")),
                  !w.loopBegan &&
                    w.currentTime > 0 &&
                    ((w.loopBegan = !0), M("loopBegin")),
                  p <= n && 0 !== w.currentTime && E(0),
                  ((p >= d && w.currentTime !== e) || !e) && E(e),
                  p > n && p < d
                    ? (w.changeBegan ||
                        ((w.changeBegan = !0),
                        (w.changeCompleted = !1),
                        M("changeBegin")),
                      M("change"),
                      E(p))
                    : w.changeBegan &&
                      ((w.changeCompleted = !0),
                      (w.changeBegan = !1),
                      M("changeComplete")),
                  (w.currentTime = o(p, 0, e)),
                  w.began && M("update"),
                  t >= e &&
                    ((s = 0),
                    w.remaining && !0 !== w.remaining && w.remaining--,
                    w.remaining
                      ? ((r = a),
                        M("loopComplete"),
                        (w.loopBegan = !1),
                        "alternate" === w.direction && A())
                      : ((w.paused = !0),
                        w.completed ||
                          ((w.completed = !0),
                          M("loopComplete"),
                          M("complete"),
                          !w.passThrough &&
                            "Promise" in window &&
                            (c(), l(w)))));
              }
              return (
                l(w),
                (w.reset = function () {
                  var t = w.direction;
                  (w.passThrough = !1),
                    (w.currentTime = 0),
                    (w.progress = 0),
                    (w.paused = !0),
                    (w.began = !1),
                    (w.loopBegan = !1),
                    (w.changeBegan = !1),
                    (w.completed = !1),
                    (w.changeCompleted = !1),
                    (w.reversePlayback = !1),
                    (w.reversed = "reverse" === t),
                    (w.remaining = w.loop),
                    (i = w.children);
                  for (var e = (u = i.length); e--; ) w.children[e].reset();
                  ((w.reversed && !0 !== w.loop) ||
                    ("alternate" === t && 1 === w.loop)) &&
                    w.remaining++,
                    E(w.reversed ? w.duration : 0);
                }),
                (w._onDocumentVisibility = C),
                (w.set = function (t, e) {
                  return _(t, e), w;
                }),
                (w.tick = function (t) {
                  (a = t), r || (r = a), O((a + (s - r)) * J.speed);
                }),
                (w.seek = function (t) {
                  O(S(t));
                }),
                (w.pause = function () {
                  (w.paused = !0), C();
                }),
                (w.play = function () {
                  w.paused &&
                    (w.completed && w.reset(),
                    (w.paused = !1),
                    G.push(w),
                    C(),
                    Z());
                }),
                (w.reverse = function () {
                  A(), (w.completed = !w.reversed), C();
                }),
                (w.restart = function () {
                  w.reset(), w.play();
                }),
                (w.remove = function (t) {
                  tt(j(t), w);
                }),
                w.reset(),
                w.autoplay && w.play(),
                w
              );
            }
            function K(t, e) {
              for (var n = e.length; n--; )
                w(t, e[n].animatable.target) && e.splice(n, 1);
            }
            function tt(t, e) {
              var n = e.animations,
                i = e.children;
              K(t, n);
              for (var o = i.length; o--; ) {
                var r = i[o],
                  s = r.animations;
                K(t, s), s.length || r.children.length || i.splice(o, 1);
              }
              n.length || i.length || e.pause();
            }
            return (
              (J.version = "3.2.1"),
              (J.speed = 1),
              (J.suspendWhenDocumentHidden = !0),
              (J.running = G),
              (J.remove = function (t) {
                for (var e = j(t), n = G.length; n--; ) tt(e, G[n]);
              }),
              (J.get = P),
              (J.set = _),
              (J.convertPx = E),
              (J.path = function (t, e) {
                var n = a.str(t) ? m(t)[0] : t,
                  i = e || 100;
                return function (t) {
                  return {
                    property: t,
                    el: n,
                    svg: W(n),
                    totalLength: B(n) * (i / 100),
                  };
                };
              }),
              (J.setDashoffset = function (t) {
                var e = B(t);
                return t.setAttribute("stroke-dasharray", e), e;
              }),
              (J.stagger = function (t, e) {
                void 0 === e && (e = {});
                var n = e.direction || "normal",
                  i = e.easing ? g(e.easing) : null,
                  o = e.grid,
                  r = e.axis,
                  s = e.from || 0,
                  u = "first" === s,
                  c = "center" === s,
                  l = "last" === s,
                  d = a.arr(t),
                  p = d ? parseFloat(t[0]) : parseFloat(t),
                  h = d ? parseFloat(t[1]) : 0,
                  f = S(d ? t[1] : t) || 0,
                  m = e.start || 0 + (d ? p : 0),
                  v = [],
                  y = 0;
                return function (t, e, a) {
                  if (
                    (u && (s = 0),
                    c && (s = (a - 1) / 2),
                    l && (s = a - 1),
                    !v.length)
                  ) {
                    for (var g = 0; g < a; g++) {
                      if (o) {
                        var b = c ? (o[0] - 1) / 2 : s % o[0],
                          w = c ? (o[1] - 1) / 2 : Math.floor(s / o[0]),
                          A = b - (g % o[0]),
                          L = w - Math.floor(g / o[0]),
                          x = Math.sqrt(A * A + L * L);
                        "x" === r && (x = -A), "y" === r && (x = -L), v.push(x);
                      } else v.push(Math.abs(s - g));
                      y = Math.max.apply(Math, v);
                    }
                    i &&
                      (v = v.map(function (t) {
                        return i(t / y) * y;
                      })),
                      "reverse" === n &&
                        (v = v.map(function (t) {
                          return r ? (t < 0 ? -1 * t : -t) : Math.abs(y - t);
                        }));
                  }
                  return (
                    m +
                    (d ? (h - p) / y : p) * (Math.round(100 * v[e]) / 100) +
                    f
                  );
                };
              }),
              (J.timeline = function (t) {
                void 0 === t && (t = {});
                var n = J(t);
                return (
                  (n.duration = 0),
                  (n.add = function (i, o) {
                    var r = G.indexOf(n),
                      s = n.children;
                    function u(t) {
                      t.passThrough = !0;
                    }
                    r > -1 && G.splice(r, 1);
                    for (var c = 0; c < s.length; c++) u(s[c]);
                    var l = x(i, L(e, t));
                    l.targets = l.targets || t.targets;
                    var d = n.duration;
                    (l.autoplay = !1),
                      (l.direction = n.direction),
                      (l.timelineOffset = a.und(o) ? d : k(o, d)),
                      u(n),
                      n.seek(l.timelineOffset);
                    var p = J(l);
                    u(p), s.push(p);
                    var h = U(s, t);
                    return (
                      (n.delay = h.delay),
                      (n.endDelay = h.endDelay),
                      (n.duration = h.duration),
                      n.seek(0),
                      n.reset(),
                      n.autoplay && n.play(),
                      n
                    );
                  }),
                  n
                );
              }),
              (J.easing = g),
              (J.penner = f),
              (J.random = function (t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t;
              }),
              J
            );
          })();
        },
      },
      e = {};
    function n(i) {
      var o = e[i];
      if (void 0 !== o) return o.exports;
      var r = (e[i] = { exports: {} });
      return t[i].call(r.exports, r, r.exports, n), r.exports;
    }
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, { a: e }), e;
    }),
      (n.d = function (t, e) {
        for (var i in e)
          n.o(e, i) &&
            !n.o(t, i) &&
            Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      });
    var i = {};
    return (
      (function () {
        "use strict";
        n.r(i),
          n.d(i, {
            AdjustSize: function () {
              return st;
            },
            FadeSlider: function () {
              return ct;
            },
            FlowVox: function () {
              return ut;
            },
            LazyLoadBg: function () {
              return ft;
            },
            PopupAdjust: function () {
              return at;
            },
            ReplaceImageSP: function () {
              return ht;
            },
            SimpleAccordion: function () {
              return dt;
            },
            SimpleCookie: function () {
              return pt;
            },
            SimpleSlider: function () {
              return lt;
            },
            Utilities: function () {
              return rt;
            },
            anime: function () {
              return nt;
            },
          });
        var t = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            timelineOffset: 0,
          },
          e = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0,
          },
          o = [
            "translateX",
            "translateY",
            "translateZ",
            "rotate",
            "rotateX",
            "rotateY",
            "rotateZ",
            "scale",
            "scaleX",
            "scaleY",
            "scaleZ",
            "skew",
            "skewX",
            "skewY",
            "perspective",
            "matrix",
            "matrix3d",
          ],
          r = { CSS: {}, springs: {} };
        function s(t, e, n) {
          return Math.min(Math.max(t, e), n);
        }
        function a(t, e) {
          return t.indexOf(e) > -1;
        }
        function u(t, e) {
          return t.apply(null, e);
        }
        var c = {
          arr: function (t) {
            return Array.isArray(t);
          },
          obj: function (t) {
            return a(Object.prototype.toString.call(t), "Object");
          },
          pth: function (t) {
            return c.obj(t) && t.hasOwnProperty("totalLength");
          },
          svg: function (t) {
            return t instanceof SVGElement;
          },
          inp: function (t) {
            return t instanceof HTMLInputElement;
          },
          dom: function (t) {
            return t.nodeType || c.svg(t);
          },
          str: function (t) {
            return "string" == typeof t;
          },
          fnc: function (t) {
            return "function" == typeof t;
          },
          und: function (t) {
            return void 0 === t;
          },
          nil: function (t) {
            return c.und(t) || null === t;
          },
          hex: function (t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
          },
          rgb: function (t) {
            return /^rgb/.test(t);
          },
          hsl: function (t) {
            return /^hsl/.test(t);
          },
          col: function (t) {
            return c.hex(t) || c.rgb(t) || c.hsl(t);
          },
          key: function (n) {
            return (
              !t.hasOwnProperty(n) &&
              !e.hasOwnProperty(n) &&
              "targets" !== n &&
              "keyframes" !== n
            );
          },
        };
        function l(t) {
          var e = /\(([^)]+)\)/.exec(t);
          return e
            ? e[1].split(",").map(function (t) {
                return parseFloat(t);
              })
            : [];
        }
        function d(t, e) {
          var n = l(t),
            i = s(c.und(n[0]) ? 1 : n[0], 0.1, 100),
            o = s(c.und(n[1]) ? 100 : n[1], 0.1, 100),
            a = s(c.und(n[2]) ? 10 : n[2], 0.1, 100),
            u = s(c.und(n[3]) ? 0 : n[3], 0.1, 100),
            d = Math.sqrt(o / i),
            p = a / (2 * Math.sqrt(o * i)),
            h = p < 1 ? d * Math.sqrt(1 - p * p) : 0,
            f = p < 1 ? (p * d - u) / h : -u + d;
          function g(t) {
            var n = e ? (e * t) / 1e3 : t;
            return (
              (n =
                p < 1
                  ? Math.exp(-n * p * d) *
                    (1 * Math.cos(h * n) + f * Math.sin(h * n))
                  : (1 + f * n) * Math.exp(-n * d)),
              0 === t || 1 === t ? t : 1 - n
            );
          }
          return e
            ? g
            : function () {
                var e = r.springs[t];
                if (e) return e;
                for (var n = 1 / 6, i = 0, o = 0; ; )
                  if (1 === g((i += n))) {
                    if (++o >= 16) break;
                  } else o = 0;
                var s = i * n * 1e3;
                return (r.springs[t] = s), s;
              };
        }
        function p(t) {
          return (
            void 0 === t && (t = 10),
            function (e) {
              return Math.ceil(s(e, 1e-6, 1) * t) * (1 / t);
            }
          );
        }
        var h,
          f,
          g = (function () {
            var t = 0.1;
            function e(t, e) {
              return 1 - 3 * e + 3 * t;
            }
            function n(t, e) {
              return 3 * e - 6 * t;
            }
            function i(t) {
              return 3 * t;
            }
            function o(t, o, r) {
              return ((e(o, r) * t + n(o, r)) * t + i(o)) * t;
            }
            function r(t, o, r) {
              return 3 * e(o, r) * t * t + 2 * n(o, r) * t + i(o);
            }
            return function (e, n, i, s) {
              if (0 <= e && e <= 1 && 0 <= i && i <= 1) {
                var a = new Float32Array(11);
                if (e !== n || i !== s)
                  for (var u = 0; u < 11; ++u) a[u] = o(u * t, e, i);
                return function (u) {
                  return (e === n && i === s) || 0 === u || 1 === u
                    ? u
                    : o(
                        (function (n) {
                          for (var s = 0, u = 1; 10 !== u && a[u] <= n; ++u)
                            s += t;
                          --u;
                          var c = s + ((n - a[u]) / (a[u + 1] - a[u])) * t,
                            l = r(c, e, i);
                          return l >= 0.001
                            ? (function (t, e, n, i) {
                                for (var s = 0; s < 4; ++s) {
                                  var a = r(e, n, i);
                                  if (0 === a) return e;
                                  e -= (o(e, n, i) - t) / a;
                                }
                                return e;
                              })(n, c, e, i)
                            : 0 === l
                            ? c
                            : (function (t, e, n, i, r) {
                                var s,
                                  a,
                                  u = 0;
                                do {
                                  (s = o((a = e + (n - e) / 2), i, r) - t) > 0
                                    ? (n = a)
                                    : (e = a);
                                } while (Math.abs(s) > 1e-7 && ++u < 10);
                                return a;
                              })(n, s, s + t, e, i);
                        })(u),
                        n,
                        s
                      );
                };
              }
            };
          })(),
          m =
            ((h = {
              linear: function () {
                return function (t) {
                  return t;
                };
              },
            }),
            (f = {
              Sine: function () {
                return function (t) {
                  return 1 - Math.cos((t * Math.PI) / 2);
                };
              },
              Circ: function () {
                return function (t) {
                  return 1 - Math.sqrt(1 - t * t);
                };
              },
              Back: function () {
                return function (t) {
                  return t * t * (3 * t - 2);
                };
              },
              Bounce: function () {
                return function (t) {
                  for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
                  return (
                    1 / Math.pow(4, 3 - n) -
                    7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                  );
                };
              },
              Elastic: function (t, e) {
                void 0 === t && (t = 1), void 0 === e && (e = 0.5);
                var n = s(t, 1, 10),
                  i = s(e, 0.1, 2);
                return function (t) {
                  return 0 === t || 1 === t
                    ? t
                    : -n *
                        Math.pow(2, 10 * (t - 1)) *
                        Math.sin(
                          ((t - 1 - (i / (2 * Math.PI)) * Math.asin(1 / n)) *
                            (2 * Math.PI)) /
                            i
                        );
                };
              },
            }),
            ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (
              t,
              e
            ) {
              f[t] = function () {
                return function (t) {
                  return Math.pow(t, e + 2);
                };
              };
            }),
            Object.keys(f).forEach(function (t) {
              var e = f[t];
              (h["easeIn" + t] = e),
                (h["easeOut" + t] = function (t, n) {
                  return function (i) {
                    return 1 - e(t, n)(1 - i);
                  };
                }),
                (h["easeInOut" + t] = function (t, n) {
                  return function (i) {
                    return i < 0.5
                      ? e(t, n)(2 * i) / 2
                      : 1 - e(t, n)(-2 * i + 2) / 2;
                  };
                }),
                (h["easeOutIn" + t] = function (t, n) {
                  return function (i) {
                    return i < 0.5
                      ? (1 - e(t, n)(1 - 2 * i)) / 2
                      : (e(t, n)(2 * i - 1) + 1) / 2;
                  };
                });
            }),
            h);
        function v(t, e) {
          if (c.fnc(t)) return t;
          var n = t.split("(")[0],
            i = m[n],
            o = l(t);
          switch (n) {
            case "spring":
              return d(t, e);
            case "cubicBezier":
              return u(g, o);
            case "steps":
              return u(p, o);
            default:
              return u(i, o);
          }
        }
        function y(t) {
          try {
            return document.querySelectorAll(t);
          } catch (t) {
            return;
          }
        }
        function b(t, e) {
          for (
            var n = t.length,
              i = arguments.length >= 2 ? arguments[1] : void 0,
              o = [],
              r = 0;
            r < n;
            r++
          )
            if (r in t) {
              var s = t[r];
              e.call(i, s, r, t) && o.push(s);
            }
          return o;
        }
        function w(t) {
          return t.reduce(function (t, e) {
            return t.concat(c.arr(e) ? w(e) : e);
          }, []);
        }
        function A(t) {
          return c.arr(t)
            ? t
            : (c.str(t) && (t = y(t) || t),
              t instanceof NodeList || t instanceof HTMLCollection
                ? [].slice.call(t)
                : [t]);
        }
        function L(t, e) {
          return t.some(function (t) {
            return t === e;
          });
        }
        function x(t) {
          var e = {};
          for (var n in t) e[n] = t[n];
          return e;
        }
        function S(t, e) {
          var n = x(t);
          for (var i in t) n[i] = e.hasOwnProperty(i) ? e[i] : t[i];
          return n;
        }
        function C(t, e) {
          var n = x(t);
          for (var i in e) n[i] = c.und(t[i]) ? e[i] : t[i];
          return n;
        }
        function T(t) {
          var e =
            /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
              t
            );
          if (e) return e[1];
        }
        function E(t, e) {
          return c.fnc(t) ? t(e.target, e.id, e.total) : t;
        }
        function M(t, e) {
          return t.getAttribute(e);
        }
        function O(t, e, n) {
          if (L([n, "deg", "rad", "turn"], T(e))) return e;
          var i = r.CSS[e + n];
          if (!c.und(i)) return i;
          var o = document.createElement(t.tagName),
            s =
              t.parentNode && t.parentNode !== document
                ? t.parentNode
                : document.body;
          s.appendChild(o),
            (o.style.position = "absolute"),
            (o.style.width = 100 + n);
          var a = 100 / o.offsetWidth;
          s.removeChild(o);
          var u = a * parseFloat(e);
          return (r.CSS[e + n] = u), u;
        }
        function I(t, e, n) {
          if (e in t.style) {
            var i = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              o = t.style[e] || getComputedStyle(t).getPropertyValue(i) || "0";
            return n ? O(t, o, n) : o;
          }
        }
        function P(t, e) {
          return c.dom(t) &&
            !c.inp(t) &&
            (!c.nil(M(t, e)) || (c.svg(t) && t[e]))
            ? "attribute"
            : c.dom(t) && L(o, e)
            ? "transform"
            : c.dom(t) && "transform" !== e && I(t, e)
            ? "css"
            : null != t[e]
            ? "object"
            : void 0;
        }
        function k(t) {
          if (c.dom(t)) {
            for (
              var e,
                n = t.style.transform || "",
                i = /(\w+)\(([^)]*)\)/g,
                o = new Map();
              (e = i.exec(n));

            )
              o.set(e[1], e[2]);
            return o;
          }
        }
        function q(t, e, n, i) {
          switch (P(t, e)) {
            case "transform":
              return (function (t, e, n, i) {
                var o = a(e, "scale")
                    ? 1
                    : 0 +
                      (function (t) {
                        return a(t, "translate") || "perspective" === t
                          ? "px"
                          : a(t, "rotate") || a(t, "skew")
                          ? "deg"
                          : void 0;
                      })(e),
                  r = k(t).get(e) || o;
                return (
                  n && (n.transforms.list.set(e, r), (n.transforms.last = e)),
                  i ? O(t, r, i) : r
                );
              })(t, e, i, n);
            case "css":
              return I(t, e, n);
            case "attribute":
              return M(t, e);
            default:
              return t[e] || 0;
          }
        }
        function N(t, e) {
          var n = /^(\*=|\+=|-=)/.exec(t);
          if (!n) return t;
          var i = T(t) || 0,
            o = parseFloat(e),
            r = parseFloat(t.replace(n[0], ""));
          switch (n[0][0]) {
            case "+":
              return o + r + i;
            case "-":
              return o - r + i;
            case "*":
              return o * r + i;
          }
        }
        function D(t, e) {
          if (c.col(t))
            return (function (t) {
              return c.rgb(t)
                ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((e = t)))
                  ? "rgba(" + n[1] + ",1)"
                  : e
                : c.hex(t)
                ? (function (t) {
                    var e = t.replace(
                        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        function (t, e, n, i) {
                          return e + e + n + n + i + i;
                        }
                      ),
                      n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                    return (
                      "rgba(" +
                      parseInt(n[1], 16) +
                      "," +
                      parseInt(n[2], 16) +
                      "," +
                      parseInt(n[3], 16) +
                      ",1)"
                    );
                  })(t)
                : c.hsl(t)
                ? (function (t) {
                    var e,
                      n,
                      i,
                      o =
                        /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) ||
                        /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(
                          t
                        ),
                      r = parseInt(o[1], 10) / 360,
                      s = parseInt(o[2], 10) / 100,
                      a = parseInt(o[3], 10) / 100,
                      u = o[4] || 1;
                    function c(t, e, n) {
                      return (
                        n < 0 && (n += 1),
                        n > 1 && (n -= 1),
                        n < 1 / 6
                          ? t + 6 * (e - t) * n
                          : n < 0.5
                          ? e
                          : n < 2 / 3
                          ? t + (e - t) * (2 / 3 - n) * 6
                          : t
                      );
                    }
                    if (0 == s) e = n = i = a;
                    else {
                      var l = a < 0.5 ? a * (1 + s) : a + s - a * s,
                        d = 2 * a - l;
                      (e = c(d, l, r + 1 / 3)),
                        (n = c(d, l, r)),
                        (i = c(d, l, r - 1 / 3));
                    }
                    return (
                      "rgba(" +
                      255 * e +
                      "," +
                      255 * n +
                      "," +
                      255 * i +
                      "," +
                      u +
                      ")"
                    );
                  })(t)
                : void 0;
              var e, n;
            })(t);
          if (/\s/g.test(t)) return t;
          var n = T(t),
            i = n ? t.substr(0, t.length - n.length) : t;
          return e ? i + e : i;
        }
        function B(t, e) {
          return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
        }
        function W(t) {
          for (var e, n = t.points, i = 0, o = 0; o < n.numberOfItems; o++) {
            var r = n.getItem(o);
            o > 0 && (i += B(e, r)), (e = r);
          }
          return i;
        }
        function H(t) {
          if (t.getTotalLength) return t.getTotalLength();
          switch (t.tagName.toLowerCase()) {
            case "circle":
              return (function (t) {
                return 2 * Math.PI * M(t, "r");
              })(t);
            case "rect":
              return (function (t) {
                return 2 * M(t, "width") + 2 * M(t, "height");
              })(t);
            case "line":
              return (function (t) {
                return B(
                  { x: M(t, "x1"), y: M(t, "y1") },
                  { x: M(t, "x2"), y: M(t, "y2") }
                );
              })(t);
            case "polyline":
              return W(t);
            case "polygon":
              return (function (t) {
                var e = t.points;
                return W(t) + B(e.getItem(e.numberOfItems - 1), e.getItem(0));
              })(t);
          }
        }
        function F(t, e) {
          var n = e || {},
            i =
              n.el ||
              (function (t) {
                for (var e = t.parentNode; c.svg(e) && c.svg(e.parentNode); )
                  e = e.parentNode;
                return e;
              })(t),
            o = i.getBoundingClientRect(),
            r = M(i, "viewBox"),
            s = o.width,
            a = o.height,
            u = n.viewBox || (r ? r.split(" ") : [0, 0, s, a]);
          return {
            el: i,
            viewBox: u,
            x: u[0] / 1,
            y: u[1] / 1,
            w: s,
            h: a,
            vW: u[2],
            vH: u[3],
          };
        }
        function j(t, e, n) {
          function i(n) {
            void 0 === n && (n = 0);
            var i = e + n >= 1 ? e + n : 0;
            return t.el.getPointAtLength(i);
          }
          var o = F(t.el, t.svg),
            r = i(),
            s = i(-1),
            a = i(1),
            u = n ? 1 : o.w / o.vW,
            c = n ? 1 : o.h / o.vH;
          switch (t.property) {
            case "x":
              return (r.x - o.x) * u;
            case "y":
              return (r.y - o.y) * c;
            case "angle":
              return (180 * Math.atan2(a.y - s.y, a.x - s.x)) / Math.PI;
          }
        }
        function R(t, e) {
          var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            i = D(c.pth(t) ? t.totalLength : t, e) + "";
          return {
            original: i,
            numbers: i.match(n) ? i.match(n).map(Number) : [0],
            strings: c.str(t) || e ? i.split(n) : [],
          };
        }
        function X(t) {
          return b(t ? w(c.arr(t) ? t.map(A) : A(t)) : [], function (t, e, n) {
            return n.indexOf(t) === e;
          });
        }
        function z(t) {
          var e = X(t);
          return e.map(function (t, n) {
            return {
              target: t,
              id: n,
              total: e.length,
              transforms: { list: k(t) },
            };
          });
        }
        function Y(t, e) {
          var n = x(e);
          if (
            (/^spring/.test(n.easing) && (n.duration = d(n.easing)), c.arr(t))
          ) {
            var i = t.length;
            2 !== i || c.obj(t[0])
              ? c.fnc(e.duration) || (n.duration = e.duration / i)
              : (t = { value: t });
          }
          var o = c.arr(t) ? t : [t];
          return o
            .map(function (t, n) {
              var i = c.obj(t) && !c.pth(t) ? t : { value: t };
              return (
                c.und(i.delay) && (i.delay = n ? 0 : e.delay),
                c.und(i.endDelay) &&
                  (i.endDelay = n === o.length - 1 ? e.endDelay : 0),
                i
              );
            })
            .map(function (t) {
              return C(t, n);
            });
        }
        var _ = {
          css: function (t, e, n) {
            return (t.style[e] = n);
          },
          attribute: function (t, e, n) {
            return t.setAttribute(e, n);
          },
          object: function (t, e, n) {
            return (t[e] = n);
          },
          transform: function (t, e, n, i, o) {
            if ((i.list.set(e, n), e === i.last || o)) {
              var r = "";
              i.list.forEach(function (t, e) {
                r += e + "(" + t + ") ";
              }),
                (t.style.transform = r);
            }
          },
        };
        function V(t, e) {
          z(t).forEach(function (t) {
            for (var n in e) {
              var i = E(e[n], t),
                o = t.target,
                r = T(i),
                s = q(o, n, r, t),
                a = N(D(i, r || T(s)), s),
                u = P(o, n);
              _[u](o, n, a, t.transforms, !0);
            }
          });
        }
        function U(t, e) {
          return b(
            w(
              t.map(function (t) {
                return e.map(function (e) {
                  return (function (t, e) {
                    var n = P(t.target, e.name);
                    if (n) {
                      var i = (function (t, e) {
                          var n;
                          return t.tweens.map(function (i) {
                            var o = (function (t, e) {
                                var n = {};
                                for (var i in t) {
                                  var o = E(t[i], e);
                                  c.arr(o) &&
                                    1 ===
                                      (o = o.map(function (t) {
                                        return E(t, e);
                                      })).length &&
                                    (o = o[0]),
                                    (n[i] = o);
                                }
                                return (
                                  (n.duration = parseFloat(n.duration)),
                                  (n.delay = parseFloat(n.delay)),
                                  n
                                );
                              })(i, e),
                              r = o.value,
                              s = c.arr(r) ? r[1] : r,
                              a = T(s),
                              u = q(e.target, t.name, a, e),
                              l = n ? n.to.original : u,
                              d = c.arr(r) ? r[0] : l,
                              p = T(d) || T(u),
                              h = a || p;
                            return (
                              c.und(s) && (s = l),
                              (o.from = R(d, h)),
                              (o.to = R(N(s, d), h)),
                              (o.start = n ? n.end : 0),
                              (o.end =
                                o.start + o.delay + o.duration + o.endDelay),
                              (o.easing = v(o.easing, o.duration)),
                              (o.isPath = c.pth(r)),
                              (o.isPathTargetInsideSVG =
                                o.isPath && c.svg(e.target)),
                              (o.isColor = c.col(o.from.original)),
                              o.isColor && (o.round = 1),
                              (n = o),
                              o
                            );
                          });
                        })(e, t),
                        o = i[i.length - 1];
                      return {
                        type: n,
                        property: e.name,
                        animatable: t,
                        tweens: i,
                        duration: o.end,
                        delay: i[0].delay,
                        endDelay: o.endDelay,
                      };
                    }
                  })(t, e);
                });
              })
            ),
            function (t) {
              return !c.und(t);
            }
          );
        }
        function $(t, e) {
          var n = t.length,
            i = function (t) {
              return t.timelineOffset ? t.timelineOffset : 0;
            },
            o = {};
          return (
            (o.duration = n
              ? Math.max.apply(
                  Math,
                  t.map(function (t) {
                    return i(t) + t.duration;
                  })
                )
              : e.duration),
            (o.delay = n
              ? Math.min.apply(
                  Math,
                  t.map(function (t) {
                    return i(t) + t.delay;
                  })
                )
              : e.delay),
            (o.endDelay = n
              ? o.duration -
                Math.max.apply(
                  Math,
                  t.map(function (t) {
                    return i(t) + t.duration - t.endDelay;
                  })
                )
              : e.endDelay),
            o
          );
        }
        var G = 0,
          Z = [],
          Q = (function () {
            var t;
            function e(n) {
              for (var i = Z.length, o = 0; o < i; ) {
                var r = Z[o];
                r.paused ? (Z.splice(o, 1), i--) : (r.tick(n), o++);
              }
              t = o > 0 ? requestAnimationFrame(e) : void 0;
            }
            return (
              "undefined" != typeof document &&
                document.addEventListener("visibilitychange", function () {
                  K.suspendWhenDocumentHidden &&
                    (J()
                      ? (t = cancelAnimationFrame(t))
                      : (Z.forEach(function (t) {
                          return t._onDocumentVisibility();
                        }),
                        Q()));
                }),
              function () {
                t ||
                  (J() && K.suspendWhenDocumentHidden) ||
                  !(Z.length > 0) ||
                  (t = requestAnimationFrame(e));
              }
            );
          })();
        function J() {
          return !!document && document.hidden;
        }
        function K(n) {
          void 0 === n && (n = {});
          var i,
            o = 0,
            r = 0,
            a = 0,
            u = 0,
            l = null;
          function d(t) {
            var e =
              window.Promise &&
              new Promise(function (t) {
                return (l = t);
              });
            return (t.finished = e), e;
          }
          var p = (function (n) {
            var i = S(t, n),
              o = S(e, n),
              r = (function (t, e) {
                var n = [],
                  i = e.keyframes;
                for (var o in (i &&
                  (e = C(
                    (function (t) {
                      for (
                        var e = b(
                            w(
                              t.map(function (t) {
                                return Object.keys(t);
                              })
                            ),
                            function (t) {
                              return c.key(t);
                            }
                          ).reduce(function (t, e) {
                            return t.indexOf(e) < 0 && t.push(e), t;
                          }, []),
                          n = {},
                          i = function (i) {
                            var o = e[i];
                            n[o] = t.map(function (t) {
                              var e = {};
                              for (var n in t)
                                c.key(n)
                                  ? n == o && (e.value = t[n])
                                  : (e[n] = t[n]);
                              return e;
                            });
                          },
                          o = 0;
                        o < e.length;
                        o++
                      )
                        i(o);
                      return n;
                    })(i),
                    e
                  )),
                e))
                  c.key(o) && n.push({ name: o, tweens: Y(e[o], t) });
                return n;
              })(o, n),
              s = z(n.targets),
              a = U(s, r),
              u = $(a, o),
              l = G;
            return (
              G++,
              C(i, {
                id: l,
                children: [],
                animatables: s,
                animations: a,
                duration: u.duration,
                delay: u.delay,
                endDelay: u.endDelay,
              })
            );
          })(n);
          function h() {
            var t = p.direction;
            "alternate" !== t &&
              (p.direction = "normal" !== t ? "normal" : "reverse"),
              (p.reversed = !p.reversed),
              i.forEach(function (t) {
                return (t.reversed = p.reversed);
              });
          }
          function f(t) {
            return p.reversed ? p.duration - t : t;
          }
          function g() {
            (o = 0), (r = f(p.currentTime) * (1 / K.speed));
          }
          function m(t, e) {
            e && e.seek(t - e.timelineOffset);
          }
          function v(t) {
            for (var e = 0, n = p.animations, i = n.length; e < i; ) {
              var o = n[e],
                r = o.animatable,
                a = o.tweens,
                u = a.length - 1,
                c = a[u];
              u &&
                (c =
                  b(a, function (e) {
                    return t < e.end;
                  })[0] || c);
              for (
                var l = s(t - c.start - c.delay, 0, c.duration) / c.duration,
                  d = isNaN(l) ? 1 : c.easing(l),
                  h = c.to.strings,
                  f = c.round,
                  g = [],
                  m = c.to.numbers.length,
                  v = void 0,
                  y = 0;
                y < m;
                y++
              ) {
                var w = void 0,
                  A = c.to.numbers[y],
                  L = c.from.numbers[y] || 0;
                (w = c.isPath
                  ? j(c.value, d * A, c.isPathTargetInsideSVG)
                  : L + d * (A - L)),
                  f && ((c.isColor && y > 2) || (w = Math.round(w * f) / f)),
                  g.push(w);
              }
              var x = h.length;
              if (x) {
                v = h[0];
                for (var S = 0; S < x; S++) {
                  h[S];
                  var C = h[S + 1],
                    T = g[S];
                  isNaN(T) || (v += C ? T + C : T + " ");
                }
              } else v = g[0];
              _[o.type](r.target, o.property, v, r.transforms),
                (o.currentValue = v),
                e++;
            }
          }
          function y(t) {
            p[t] && !p.passThrough && p[t](p);
          }
          function A(t) {
            var e = p.duration,
              n = p.delay,
              c = e - p.endDelay,
              g = f(t);
            (p.progress = s((g / e) * 100, 0, 100)),
              (p.reversePlayback = g < p.currentTime),
              i &&
                (function (t) {
                  if (p.reversePlayback) for (var e = u; e--; ) m(t, i[e]);
                  else for (var n = 0; n < u; n++) m(t, i[n]);
                })(g),
              !p.began && p.currentTime > 0 && ((p.began = !0), y("begin")),
              !p.loopBegan &&
                p.currentTime > 0 &&
                ((p.loopBegan = !0), y("loopBegin")),
              g <= n && 0 !== p.currentTime && v(0),
              ((g >= c && p.currentTime !== e) || !e) && v(e),
              g > n && g < c
                ? (p.changeBegan ||
                    ((p.changeBegan = !0),
                    (p.changeCompleted = !1),
                    y("changeBegin")),
                  y("change"),
                  v(g))
                : p.changeBegan &&
                  ((p.changeCompleted = !0),
                  (p.changeBegan = !1),
                  y("changeComplete")),
              (p.currentTime = s(g, 0, e)),
              p.began && y("update"),
              t >= e &&
                ((r = 0),
                p.remaining && !0 !== p.remaining && p.remaining--,
                p.remaining
                  ? ((o = a),
                    y("loopComplete"),
                    (p.loopBegan = !1),
                    "alternate" === p.direction && h())
                  : ((p.paused = !0),
                    p.completed ||
                      ((p.completed = !0),
                      y("loopComplete"),
                      y("complete"),
                      !p.passThrough && "Promise" in window && (l(), d(p)))));
          }
          return (
            d(p),
            (p.reset = function () {
              var t = p.direction;
              (p.passThrough = !1),
                (p.currentTime = 0),
                (p.progress = 0),
                (p.paused = !0),
                (p.began = !1),
                (p.loopBegan = !1),
                (p.changeBegan = !1),
                (p.completed = !1),
                (p.changeCompleted = !1),
                (p.reversePlayback = !1),
                (p.reversed = "reverse" === t),
                (p.remaining = p.loop),
                (i = p.children);
              for (var e = (u = i.length); e--; ) p.children[e].reset();
              ((p.reversed && !0 !== p.loop) ||
                ("alternate" === t && 1 === p.loop)) &&
                p.remaining++,
                v(p.reversed ? p.duration : 0);
            }),
            (p._onDocumentVisibility = g),
            (p.set = function (t, e) {
              return V(t, e), p;
            }),
            (p.tick = function (t) {
              (a = t), o || (o = a), A((a + (r - o)) * K.speed);
            }),
            (p.seek = function (t) {
              A(f(t));
            }),
            (p.pause = function () {
              (p.paused = !0), g();
            }),
            (p.play = function () {
              p.paused &&
                (p.completed && p.reset(),
                (p.paused = !1),
                Z.push(p),
                g(),
                Q());
            }),
            (p.reverse = function () {
              h(), (p.completed = !p.reversed), g();
            }),
            (p.restart = function () {
              p.reset(), p.play();
            }),
            (p.remove = function (t) {
              et(X(t), p);
            }),
            p.reset(),
            p.autoplay && p.play(),
            p
          );
        }
        function tt(t, e) {
          for (var n = e.length; n--; )
            L(t, e[n].animatable.target) && e.splice(n, 1);
        }
        function et(t, e) {
          var n = e.animations,
            i = e.children;
          tt(t, n);
          for (var o = i.length; o--; ) {
            var r = i[o],
              s = r.animations;
            tt(t, s), s.length || r.children.length || i.splice(o, 1);
          }
          n.length || i.length || e.pause();
        }
        (K.version = "3.2.1"),
          (K.speed = 1),
          (K.suspendWhenDocumentHidden = !0),
          (K.running = Z),
          (K.remove = function (t) {
            for (var e = X(t), n = Z.length; n--; ) et(e, Z[n]);
          }),
          (K.get = q),
          (K.set = V),
          (K.convertPx = O),
          (K.path = function (t, e) {
            var n = c.str(t) ? y(t)[0] : t,
              i = e || 100;
            return function (t) {
              return {
                property: t,
                el: n,
                svg: F(n),
                totalLength: H(n) * (i / 100),
              };
            };
          }),
          (K.setDashoffset = function (t) {
            var e = H(t);
            return t.setAttribute("stroke-dasharray", e), e;
          }),
          (K.stagger = function (t, e) {
            void 0 === e && (e = {});
            var n = e.direction || "normal",
              i = e.easing ? v(e.easing) : null,
              o = e.grid,
              r = e.axis,
              s = e.from || 0,
              a = "first" === s,
              u = "center" === s,
              l = "last" === s,
              d = c.arr(t),
              p = d ? parseFloat(t[0]) : parseFloat(t),
              h = d ? parseFloat(t[1]) : 0,
              f = T(d ? t[1] : t) || 0,
              g = e.start || 0 + (d ? p : 0),
              m = [],
              y = 0;
            return function (t, e, c) {
              if (
                (a && (s = 0),
                u && (s = (c - 1) / 2),
                l && (s = c - 1),
                !m.length)
              ) {
                for (var v = 0; v < c; v++) {
                  if (o) {
                    var b = u ? (o[0] - 1) / 2 : s % o[0],
                      w = u ? (o[1] - 1) / 2 : Math.floor(s / o[0]),
                      A = b - (v % o[0]),
                      L = w - Math.floor(v / o[0]),
                      x = Math.sqrt(A * A + L * L);
                    "x" === r && (x = -A), "y" === r && (x = -L), m.push(x);
                  } else m.push(Math.abs(s - v));
                  y = Math.max.apply(Math, m);
                }
                i &&
                  (m = m.map(function (t) {
                    return i(t / y) * y;
                  })),
                  "reverse" === n &&
                    (m = m.map(function (t) {
                      return r ? (t < 0 ? -1 * t : -t) : Math.abs(y - t);
                    }));
              }
              return (
                g + (d ? (h - p) / y : p) * (Math.round(100 * m[e]) / 100) + f
              );
            };
          }),
          (K.timeline = function (t) {
            void 0 === t && (t = {});
            var n = K(t);
            return (
              (n.duration = 0),
              (n.add = function (i, o) {
                var r = Z.indexOf(n),
                  s = n.children;
                function a(t) {
                  t.passThrough = !0;
                }
                r > -1 && Z.splice(r, 1);
                for (var u = 0; u < s.length; u++) a(s[u]);
                var l = C(i, S(e, t));
                l.targets = l.targets || t.targets;
                var d = n.duration;
                (l.autoplay = !1),
                  (l.direction = n.direction),
                  (l.timelineOffset = c.und(o) ? d : N(o, d)),
                  a(n),
                  n.seek(l.timelineOffset);
                var p = K(l);
                a(p), s.push(p);
                var h = $(s, t);
                return (
                  (n.delay = h.delay),
                  (n.endDelay = h.endDelay),
                  (n.duration = h.duration),
                  n.seek(0),
                  n.reset(),
                  n.autoplay && n.play(),
                  n
                );
              }),
              n
            );
          }),
          (K.easing = v),
          (K.penner = m),
          (K.random = function (t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t;
          });
        var nt = K,
          it = n(591),
          ot = n.n(it),
          rt = (function () {
            function t(t) {
              var e = void 0 === t ? {} : t,
                n = e.spBreakPoint,
                i = void 0 === n ? 768 : n,
                o = e.pageTopPoint,
                r = void 0 === o ? 100 : o,
                s = e.pageTopElemID,
                a = void 0 === s ? "js-pageTopVox" : s,
                u = e.isDebug,
                c = void 0 !== u && u,
                l = e.isRunInit,
                d = void 0 === l || l;
              (this.qsParm = []),
                (this.userAgent = ""),
                (this.browserIE = 0),
                (this.browser_v = 0),
                (this.browser_n = ""),
                (this.ua = ""),
                (this.isIE = !1),
                (this.isIE6 = !1),
                (this.isIE7 = !1),
                (this.isIE8 = !1),
                (this.isIE9 = !1),
                (this.isIE10 = !1),
                (this.isIE11 = !1),
                (this.isEdge = !1),
                (this.isiPhone = !1),
                (this.isiPad = !1),
                (this.isiPod = !1),
                (this.isAndroid = !1),
                (this.isMac = !1),
                (this.isWinPhone = !1),
                (this.isMobile = !1),
                (this.isNavOpen = !1),
                (this.spBreakPoint = i),
                (this.wWidth = 0),
                (this.wHeight = 0),
                (this.wIWidth = 0),
                (this.wIHeight = 0),
                (this.wIWidthCache = 0),
                (this.wIHeightCache = 0),
                (this.dspWidth = Number(window.parent.screen.width)),
                (this.dspHeight = Number(window.parent.screen.height)),
                (this.isRespMode = !1),
                (this.isChangeWIWidth = !1),
                (this.isChangeWIHeight = !1),
                (this.isPageTopShow = !1),
                (this.pageTopPoint = r),
                (this.pageTopElemID = a),
                (this.scrMode = ""),
                (this.scrTop = 0),
                (this.scrLeft = 0),
                (this.orgMode = null),
                (this.currentMode = null),
                (this.isChangeMode = !1),
                (this.viewOriMode = "landscape"),
                (this.isDebug = c),
                (this.rTimer = {
                  setRespMode: 0,
                  toggleSPTel: 0,
                  debug: 0,
                  pagetop: 0,
                }),
                (this.tmp = { query: "", parms: [] }),
                (this.isRunInit = d);
            }
            return (
              (t.prototype.init = function () {
                var t = this;
                this.setGETqs(),
                  this.setWb(),
                  this.setWbVer(),
                  this.setMobile(),
                  this.setRespMode(),
                  this.setScrPos(),
                  this.roImg(),
                  this.roOpa(),
                  this.pageTop(),
                  this.toggleSPTel(),
                  this.initDebug(),
                  window.addEventListener("resize", function () {
                    !1 !== t.rTimer.setRespMode &&
                      clearTimeout(Number(t.rTimer.setRespMode)),
                      (t.rTimer.setRespMode = window.setTimeout(function () {
                        t.setRespMode();
                      }, 250)),
                      !1 !== t.rTimer.toggleSPTel &&
                        clearTimeout(Number(t.rTimer.toggleSPTel)),
                      (t.rTimer.toggleSPTel = window.setTimeout(function () {
                        t.toggleSPTel();
                      }, 250));
                  }),
                  window.addEventListener("scroll", function () {
                    t.setScrPos(), t.pageTop();
                  }),
                  (this.orgMode = this.currentMode = this.isRespMode ? 2 : 1);
              }),
              (t.prototype.initDebug = function () {
                var t = this;
                if (this.isDebug) {
                  var e = document.createElement("div");
                  (e.id = "pDebug"),
                    Object.assign(e.style, {
                      position: "fixed",
                      zIndex: 99999,
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      padding: "1vw",
                      width: "30vw",
                      height: "100%",
                      overflow: "auto",
                    }),
                    document.body.appendChild(e),
                    (e.innerHTML =
                      '<div><a href="javascript:void(0)" class="toggle" style="color: #FFFFFF;">HIDE</a></div><div class="inner" />');
                  var n = {
                    toggle: e.querySelector(".toggle"),
                    inner: e.querySelector(".inner"),
                  };
                  n.toggle.addEventListener("click", function () {
                    "none" !== n.inner.style.display
                      ? ((n.inner.style.display = "none"),
                        (e.style.height = "auto"),
                        (n.toggle.textContent = "SHOW"))
                      : ((n.inner.style.display = "block"),
                        (e.style.height = "100%"),
                        (n.toggle.textContent = "HIDE"));
                  }),
                    this.showDebug(),
                    window.addEventListener("resize", function () {
                      !1 !== t.rTimer.debug &&
                        clearTimeout(Number(t.rTimer.debug)),
                        (t.rTimer.debug = window.setTimeout(function () {
                          t.showDebug();
                        }, 500));
                    }),
                    window.addEventListener("scroll", function () {
                      !1 !== t.rTimer.debug &&
                        clearTimeout(Number(t.rTimer.debug)),
                        (t.rTimer.debug = window.setTimeout(function () {
                          t.showDebug();
                        }, 500));
                    });
                }
              }),
              (t.prototype.showDebug = function () {
                var t = "";
                for (var e in this)
                  if ("function" != typeof this[e])
                    if ("qsParm" !== e)
                      t += '<div><span style="font-weight: bold;">'
                        .concat(e, "</span> : ")
                        .concat(this[e], "</div>");
                    else
                      for (var n in ((t += "qsParm : "), this[e]))
                        t += '<div><span style="font-weight: bold;">'
                          .concat(n, "</span> : ")
                          .concat(this[e][n], "</div>");
                document.querySelector("#pDebug .inner").innerHTML = t;
              }),
              (t.prototype.openBlank = function (t) {
                window.open(t);
              }),
              (t.prototype.preloadImg = function (t) {
                if ((void 0 === t && (t = []), t))
                  for (var e = 0; e < t.length; e++)
                    document.createElement("img").src = t[e];
              }),
              (t.prototype.getGETqs = function () {
                (this.tmp.query = window.location.search.substring(1)),
                  (this.tmp.parms = this.tmp.query.split("&"));
                for (var t = {}, e = 0, n = this.tmp.parms; e < n.length; e++) {
                  var i = n[e],
                    o = i.indexOf("=");
                  if (o > 0) {
                    var r = i.substring(0, o),
                      s = i.substring(o + 1);
                    t[r] = s;
                  }
                }
                return t;
              }),
              (t.prototype.setGETqs = function () {
                this.qsParm = this.getGETqs();
              }),
              (t.prototype.setWb = function () {
                if (
                  ((this.ua = window.navigator.userAgent.toLowerCase()),
                  (this.isIE =
                    this.ua.indexOf("msie") >= 0 ||
                    this.ua.indexOf("trident") >= 0),
                  this.isIE)
                ) {
                  var t = /(msie|rv:?)\s?([\d\.]+)/.exec(this.ua),
                    e = t ? t[2] : "";
                  (this.isIE6 = 0 === e.indexOf("6.", 0)),
                    (this.isIE7 = 0 === e.indexOf("7.", 0)),
                    (this.isIE8 = 0 === e.indexOf("8.", 0)),
                    (this.isIE9 = 0 === e.indexOf("9.", 0)),
                    (this.isIE10 = 0 === e.indexOf("10.", 0)),
                    (this.isIE11 = 0 === e.indexOf("11.", 0));
                }
                this.isEdge =
                  this.ua.indexOf("edge") >= 0 || this.ua.indexOf("edg") >= 0;
              }),
              (t.prototype.setWbVer = function () {
                this.ua.indexOf("firefox") > -1
                  ? (this.browser_n = "Firefox")
                  : this.ua.indexOf("opera") > -1
                  ? (this.browser_n = "Opera")
                  : this.ua.indexOf("chrome") > -1
                  ? (this.browser_n = "Chrome")
                  : this.ua.indexOf("safari") > -1
                  ? (this.browser_n = "Safari")
                  : (this.browser_n = "Unknown");
              }),
              (t.prototype.roImg = function () {
                var t = this,
                  e = [];
                document
                  .querySelectorAll("a > .roImg")
                  .forEach(function (n, i) {
                    var o = Date.now();
                    n.addEventListener("mouseenter", function () {
                      if (!t.isRespMode) {
                        var i = { src: "", srcDot: 0, srcOver: "" };
                        (i.src = n.src),
                          (i.srcDot = i.src.lastIndexOf(".")),
                          (i.srcOver = ""
                            .concat(i.src.substr(0, i.srcDot), "_on")
                            .concat(i.src.substr(i.srcDot, 4))),
                          (e[o] = i.src),
                          (n.src = i.srcOver);
                      }
                    }),
                      n.addEventListener("mouseleave", function (i) {
                        t.isRespMode || (n.src = e[o]);
                      });
                  }, this);
              }),
              (t.prototype.roOpa = function () {
                var t = this;
                document.querySelectorAll(".jqHover").forEach(function (e, n) {
                  e.addEventListener("mouseenter", function () {
                    t.isRespMode ||
                      ot()({ targets: e, opacity: 0.7, duration: 250 });
                  }),
                    e.addEventListener("mouseleave", function () {
                      t.isRespMode ||
                        ot()({ targets: e, opacity: 1, duration: 200 });
                    });
                });
              }),
              (t.prototype.sScroll = function (t, e, n, i) {
                var o = this;
                void 0 === i &&
                  (i = 'a[href*="#"].scroll, area[href*="#"].scroll'),
                  document.querySelectorAll(i).forEach(function (i, r) {
                    i.addEventListener("click", function (i) {
                      var r = {
                        anchor: "",
                        anchorURL: "",
                        current: "",
                        currentURL: "",
                        targetArray: [],
                        target: "",
                      };
                      if (
                        ((r.anchor = i.currentTarget.href),
                        (r.anchorURL = r.anchor.split("#")[0]),
                        (r.current = window.location.href),
                        (r.currentURL = r.current.split("#")[0]),
                        r.anchorURL === r.currentURL)
                      ) {
                        i.preventDefault(),
                          (r.targetArray = r.anchor.split("#")),
                          (r.target = r.targetArray.pop());
                        var s = t && Number.isInteger(t) ? t : 0,
                          a = e && 500 !== e && Number.isInteger(e) ? e : 500,
                          u =
                            n && "cubicBezier(0.11, 0, 0.5, 0)" !== n
                              ? n
                              : "cubicBezier(0.11, 0, 0.5, 0)",
                          c = document.getElementById(r.target),
                          l =
                            c.getBoundingClientRect().top +
                            window.pageYOffset +
                            s;
                        return (
                          ot().remove("html, body"),
                          ot()({
                            targets: "html, body",
                            scrollTop: l,
                            duration: a,
                            easing: u,
                            update: function () {
                              if (!o.isEdge) {
                                var t =
                                  c.getBoundingClientRect().top +
                                  window.pageYOffset +
                                  s;
                                l !== t &&
                                  ot().set("html, body", {
                                    scrollTop: function () {
                                      return t;
                                    },
                                  });
                              }
                            },
                            complete: function () {
                              var t =
                                c.getBoundingClientRect().top +
                                window.pageYOffset +
                                s;
                              l !== t &&
                                ot()({
                                  targets: "html, body",
                                  scrollTop: t,
                                  duration: 10,
                                  easing: u,
                                });
                            },
                          }),
                          !1
                        );
                      }
                    });
                  });
              }),
              (t.prototype.setRespMode = function () {
                (this.wHeight = Number(document.documentElement.clientHeight)),
                  (this.wWidth = Number(document.documentElement.clientWidth)),
                  (this.wIWidth = Number(window.innerWidth)),
                  (this.wIHeight = Number(window.innerHeight)),
                  (this.isRespMode = this.wIWidth < this.spBreakPoint);
                var t = this.currentMode;
                (this.currentMode = this.isRespMode ? 2 : 1),
                  (this.isChangeMode = t !== this.currentMode),
                  document.body.classList.remove(this.viewOriMode),
                  (this.viewOriMode =
                    this.wIHeight > this.wIWidth ? "portrait" : "landscape"),
                  this.wIWidthCache !== this.wIWidth
                    ? ((this.wIWidthCache = this.wIWidth),
                      (this.isChangeWIWidth = !0))
                    : (this.isChangeWIWidth = !1),
                  this.wIHeightCache !== this.wIHeight
                    ? ((this.wIHeightCache = this.wIHeight),
                      (this.isChangeWIHeight = !0))
                    : (this.isChangeWIHeight = !1),
                  document.body.classList.add(this.viewOriMode);
              }),
              (t.prototype.setScrPos = function () {
                var t = window.scrollY || window.pageYOffset;
                (this.scrMode = t <= this.scrTop ? "up" : "down"),
                  (this.scrTop = t),
                  (this.scrLeft = window.scrollX || window.pageXOffset);
              }),
              (t.prototype.pageTop = function () {
                var t = this,
                  e = document.getElementById(this.pageTopElemID);
                e &&
                  (!1 !== this.rTimer.pagetop &&
                    clearTimeout(Number(this.rTimer.pagetop)),
                  (this.rTimer.pagetop = window.setTimeout(function () {
                    t.scrTop >= t.pageTopPoint
                      ? t.isPageTopShow ||
                        ((t.isPageTopShow = !0),
                        (e.style.display = "block"),
                        ot()({ targets: e, opacity: 1, duration: 100 }))
                      : t.isPageTopShow &&
                        ((t.isPageTopShow = !1),
                        ot()({
                          targets: e,
                          opacity: 0,
                          duration: 200,
                          complete: function () {
                            e.style.display = "none";
                          },
                        }));
                  }, 100)));
              }),
              (t.prototype.setMobile = function () {
                (this.ua = window.navigator.userAgent.toLowerCase()),
                  (this.isiPhone = -1 != this.ua.indexOf("iphone")),
                  (this.isiPad =
                    -1 != this.ua.indexOf("ipad") ||
                    (-1 != this.ua.indexOf("macintosh") &&
                      "ontouchend" in document)),
                  (this.isiPod = -1 != this.ua.indexOf("ipod")),
                  (this.isAndroid =
                    -1 != this.ua.indexOf("android") ||
                    -1 != this.ua.indexOf("android")),
                  (this.isMac =
                    -1 != this.ua.indexOf("macintosh") ||
                    -1 != this.ua.indexOf("macintosh")),
                  (this.isWinPhone = -1 != this.ua.indexOf("windows phone")),
                  (this.isMobile = !!(
                    this.isiPhone ||
                    this.isiPad ||
                    this.isiPod ||
                    this.isAndroid ||
                    this.isWinPhone
                  ));
              }),
              (t.prototype.toggleSPTel = function () {
                this.isRespMode
                  ? document.querySelectorAll(".spTel").forEach(function (t) {
                      var e = t.getAttribute("data-tel");
                      if ("A" !== t.parentNode.tagName) {
                        var n = document.createElement("a");
                        t.before(n), n.append(t), (n.href = "tel:" + e);
                      }
                    })
                  : document.querySelectorAll(".spTel").forEach(function (t) {
                      var e = t.parentNode;
                      "A" === e.tagName && (e.before(t), e.remove());
                    });
              }),
              (t.printType = function (t) {
                console.log(
                  ""
                    .concat(typeof t, " ")
                    .concat(Object.prototype.toString.call(t))
                );
              }),
              t
            );
          })(),
          st = (function () {
            function t(t, e) {
              var n = void 0 === e ? {} : e,
                i = n.type,
                o = void 0 === i ? "inner" : i,
                r = n.plus,
                s = void 0 === r ? 0 : r,
                a = n.isResizeAuto,
                u = void 0 === a || a,
                c = n.tag,
                l = void 0 === c ? "is-completeAdjustSize" : c,
                d = n.onComplete,
                p = void 0 !== d && d;
              (this.collection = document.querySelectorAll(t)),
                this.rTimer,
                (this.setHeight = 0),
                (this.count = 0),
                (this.length = this.collection.length),
                this.length || this.die(),
                (this.options = {
                  type: o,
                  plus: s,
                  isResizeAuto: u,
                  tag: l,
                  onComplete: p,
                }),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                var t = this;
                this.options.isResizeAuto &&
                  window.addEventListener("resize", function () {
                    !1 !== t.rTimer &&
                      (clearTimeout(Number(t.rTimer)), (t.rTimer = !1)),
                      (t.rTimer = window.setTimeout(function () {
                        t.reload();
                      }, 500));
                  }),
                  this.adjust();
              }),
              (t.prototype.adjust = function () {
                var t = this;
                this.collection.forEach(function (e, n) {
                  e.style.height = "auto";
                  var i = 0,
                    o = [],
                    r = 0;
                  e.querySelectorAll("img").forEach(function (t) {
                    o.push(t.src);
                  });
                  var s = Promise.resolve(),
                    a = function () {
                      (i =
                        "inner" === t.options.type
                          ? e.clientHeight
                          : e.offsetHeight),
                        (t.setHeight = i > t.setHeight ? i : t.setHeight),
                        (s = s.then(function () {
                          t.count++,
                            t.count == t.length &&
                              (t.collection.forEach(function (e, n) {
                                e.style.height =
                                  t.setHeight + t.options.plus + "px";
                              }),
                              document.body.classList.add(t.options.tag),
                              "function" == typeof t.options.onComplete &&
                                t.options.onComplete());
                        }));
                    };
                  if (o.length)
                    for (var u = Promise.resolve(), c = 0; c < o.length; c++) {
                      document.createElement("img").src = o[c];
                      var l = new Image();
                      (l.src = o[c]),
                        (l.onerror = function () {
                          console.log("AdjustSize: error!File does not exist."),
                            (u = u.then(function () {
                              ++r === o.length && a();
                            }));
                        }),
                        (l.onload = function () {
                          u = u.then(function () {
                            ++r === o.length && a();
                          });
                        });
                    }
                  else a();
                });
              }),
              (t.prototype.destroy = function () {
                this.collection.forEach(function (t, e) {
                  t.style.removeProperty("height");
                }),
                  window.removeEventListener("resize", this.adjust);
              }),
              (t.prototype.reload = function () {
                this.destroy(), (this.count = 0), this.init();
              }),
              (t.prototype.die = function () {
                return !1;
              }),
              t
            );
          })(),
          at = (function () {
            function t(t, e) {
              var n = void 0 === e ? {} : e,
                i = n.wrapper,
                o = void 0 === i ? "#wrapper" : i,
                r = n.bg,
                s = void 0 === r ? "#alphaBg" : r,
                a = n.isUnlock,
                u = void 0 === a || a,
                c = n.isSpFixed,
                l = void 0 === c || c,
                d = n.isAdjust,
                p = void 0 === d || d,
                h = n.isA11y,
                f = void 0 === h || h,
                g = n.bgOpacity,
                m = void 0 === g ? 0.8 : g,
                v = n.durationChange,
                y = void 0 === v ? 200 : v,
                b = n.durationClose,
                w = void 0 === b ? 150 : b,
                A = n.durationBgChange,
                L = void 0 === A ? 50 : A,
                x = n.durationBgClose,
                S = void 0 === x ? 50 : x,
                C = n.onComplete,
                T = void 0 !== C && C,
                E = n.onOpen,
                M = void 0 !== E && E,
                O = n.onClose,
                I = void 0 !== O && O;
              (this.scrTopTemp = 0),
                (this.isOpen = !1),
                (this.isAllowClose = !1),
                (this.popupContent = "#popupContents"),
                (this.spBreakPoint = 768),
                (this.scrTop = 0),
                (this.scrLeft = 0),
                (this.wHeight = 0),
                (this.wWidth = 0),
                (this.wIWidth = 0),
                (this.wIHeight = 0),
                (this.isRespMode = !1),
                (this.options = {
                  btn: t,
                  wrapper: o,
                  bg: s,
                  isUnlock: u,
                  isSpFixed: l,
                  isAdjust: p,
                  isA11y: f,
                  bgOpacity: m,
                  durationChange: y,
                  durationClose: w,
                  durationBgChange: L,
                  durationBgClose: S,
                  onComplete: T,
                  onOpen: M,
                  onClose: I,
                });
              var P = document.createElement("style");
              document.head.appendChild(P),
                P.sheet.insertRule(
                  "body.is-pOpenUnlock { overflow: visible; }",
                  P.sheet.length
                ),
                P.sheet.insertRule(
                  "body.is-pOpenFixed { position: fixed; }",
                  P.sheet.length
                ),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                var t = this;
                if (!document.querySelector(this.options.bg)) {
                  var e = document.createElement("div");
                  (e.id = "alphaBg"),
                    Object.assign(e.style, { opacity: "0", display: "none" }),
                    document
                      .querySelector(this.options.wrapper)
                      .insertBefore(
                        e,
                        document.querySelector(this.options.wrapper)
                          .childNodes[0]
                      );
                }
                var n = [];
                document
                  .querySelectorAll(
                    "".concat(this.options.btn, ":not(.exclude)")
                  )
                  .forEach(function (t, e) {
                    var i = t.getAttribute("data-popup");
                    !0 !== n.includes(i) && n.push(i);
                  }),
                  document
                    .querySelectorAll("".concat(this.popupContent, " .content"))
                    .forEach(function (e, i) {
                      var o = e.innerHTML,
                        r = e.getAttribute("data-group"),
                        s = document.createElement("div");
                      (s.className = "popupWrapper vertical"),
                        (s.innerHTML =
                          '\n          <div class="closeVox">\n            <button aria-label="ポップアップを閉じる" class="popupCloseBt">\n              <span>\x3c!-- --\x3e</span>\n              <span>\x3c!-- --\x3e</span>\n            </button>\n          </div>\n          <div class="contentWrapper">\n            <div class="content">\x3c!-- --\x3e</div>\n          </div>\n        '),
                        Object.assign(s.style, {
                          opacity: "0",
                          display: "none",
                        }),
                        document
                          .querySelector(t.options.wrapper)
                          .appendChild(s),
                        (s.id = n[i]),
                        r && s.classList.add(r),
                        document
                          .querySelector("#".concat(n[i]))
                          .querySelector(".content")
                          .insertAdjacentHTML("beforeend", o),
                        e.remove();
                    }),
                  document
                    .querySelectorAll(".popupCloseBt, ".concat(this.options.bg))
                    .forEach(function (e, n) {
                      e.addEventListener("click", function () {
                        !document
                          .querySelector(".popupWrapper, ".concat(t.options.bg))
                          .classList.contains("is-animating") &&
                          t.isAllowClose &&
                          t.close();
                      });
                    }),
                  document.addEventListener("keydown", function (e) {
                    if (t.isOpen && "Escape" === e.key) {
                      if (
                        document
                          .querySelector(".popupWrapper, ".concat(t.options.bg))
                          .classList.contains("is-animating") ||
                        !t.isAllowClose
                      )
                        return;
                      t.close();
                    }
                  }),
                  document
                    .querySelectorAll(this.options.btn)
                    .forEach(function (e, n) {
                      e.addEventListener("click", function () {
                        document
                          .querySelectorAll(
                            ".popupWrapper, ".concat(t.options.bg)
                          )
                          .forEach(function (t) {
                            t.classList.contains("is-animating");
                          });
                        var n = e.getAttribute("data-popup");
                        (t.popupTarget = "#".concat(n)),
                          Object.assign(
                            document.querySelector(t.popupTarget).style,
                            { opacity: "0", display: "block" }
                          ),
                          t.change("#".concat(n)),
                          document.body.classList.add("is-pOpen");
                      });
                    }),
                  window.addEventListener("scroll", function () {
                    t.setScrPos();
                  }),
                  "function" == typeof this.options.onComplete &&
                    this.options.onComplete();
              }),
              (t.prototype.change = function (t) {
                var e = this;
                this.isOpen ||
                  ((this.isOpen = !0),
                  this.adjust(t),
                  (document.querySelector(this.options.bg).style.display =
                    "block"),
                  ot()({
                    targets: document.querySelector(this.options.bg),
                    opacity: [0, this.options.bgOpacity],
                    easing: "linear",
                    duration: this.options.durationBgChange,
                    complete: function () {
                      document.querySelector(t).style.display = "block";
                      var n = document.querySelector(
                        e.options.wrapper
                      ).children;
                      Array.from(n).forEach(function (n) {
                        n !== document.querySelector(t) &&
                          n !== document.querySelector(e.options.bg) &&
                          (n.setAttribute("aria-hidden", "true"),
                          n.setAttribute("inert", "true"));
                      }),
                        document
                          .querySelector(t)
                          .setAttribute("aria-hidden", "false"),
                        document.querySelector(t).removeAttribute("inert"),
                        document
                          .querySelector(".popupWrapper, ".concat(e.options.bg))
                          .classList.add("is-animating"),
                        ot()({
                          targets: document.querySelector(t),
                          opacity: [0, 1],
                          duration: e.options.durationChange,
                          complete: function () {
                            (e.isAllowClose = !0),
                              document
                                .querySelectorAll(
                                  ".popupWrapper, ".concat(e.options.bg)
                                )
                                .forEach(function (t) {
                                  return t.classList.remove("is-animating");
                                }),
                              document
                                .querySelector(t)
                                .querySelector(".popupCloseBt")
                                .focus(),
                              "function" == typeof e.options.onOpen &&
                                e.options.onOpen(e.popupTarget);
                          },
                        });
                    },
                  }));
              }),
              (t.prototype.close = function () {
                var t = this;
                document
                  .querySelectorAll(".popupWrapper")
                  .forEach(function (e, n) {
                    document.body.classList.remove(
                      "is-pOpen",
                      "is-pOpenUnlock"
                    ),
                      t.isRespMode &&
                        t.options.isSpFixed &&
                        (document.body.classList.remove("is-pOpenFixed"),
                        document.body.style.removeProperty("top"),
                        window.scrollTo(0, t.scrTopTemp)),
                      ot()({
                        targets: e,
                        opacity: [1, 0],
                        duration: t.options.durationClose,
                        complete: function () {
                          (e.style.display = "none"),
                            e.setAttribute("aria-hidden", "true"),
                            e.setAttribute("inert", "true");
                          var n = document.querySelector(
                            t.options.wrapper
                          ).children;
                          Array.from(n).forEach(function (t) {
                            t !== e &&
                              (t.removeAttribute("aria-hidden"),
                              t.removeAttribute("inert"));
                          }),
                            ot()({
                              targets: t.options.bg,
                              opacity: [1, 0],
                              duration: t.options.durationBgClose,
                              easing: "linear",
                              complete: function () {
                                (document.querySelector(
                                  t.options.bg
                                ).style.display = "none"),
                                  document
                                    .querySelectorAll(".popupWrapper")
                                    .forEach(function (t) {
                                      return (t.style.display = "none");
                                    }),
                                  (t.isOpen = !1),
                                  "function" == typeof t.options.onClose &&
                                    t.options.onClose(t.popupTarget);
                              },
                            });
                        },
                      }),
                      document
                        .querySelectorAll(".popupWrapper.movie .content")
                        .forEach(function (t, e) {
                          t && (t.innerHTML = "");
                        });
                  });
              }),
              (t.prototype.adjust = function (t) {
                if (this.options.isAdjust) {
                  t || (t = this.popupTarget),
                    this.setRespMode(),
                    this.setScrPos();
                  var e = document.querySelector(t).offsetHeight,
                    n = document.querySelector(t).offsetWidth,
                    i = this.wHeight > e ? (this.wHeight - e) / 2 : 0;
                  this.wWidth > n && this.wWidth,
                    (this.scrTopTemp = this.scrTop),
                    this.options.isUnlock ||
                      (e >= this.wHeight &&
                        document.body.classList.add("is-pOpenUnlock")),
                    (document.querySelector(t).style.top = "".concat(
                      i + this.scrTop,
                      "px"
                    )),
                    this.isRespMode &&
                      this.options.isSpFixed &&
                      (document.body.classList.add("is-pOpenFixed"),
                      (document.body.style.top = "-".concat(
                        this.scrTopTemp,
                        "px"
                      )));
                }
              }),
              (t.prototype.setScrPos = function () {
                (this.scrTop = window.scrollY || window.pageYOffset),
                  (this.scrLeft = window.scrollX || window.pageXOffset);
              }),
              (t.prototype.setRespMode = function () {
                (this.wHeight = Number(document.documentElement.clientHeight)),
                  (this.wWidth = Number(document.documentElement.clientWidth)),
                  (this.wIWidth = Number(window.innerWidth)),
                  (this.wIHeight = Number(window.innerHeight)),
                  (this.isRespMode = this.wIWidth < this.spBreakPoint);
              }),
              t
            );
          })(),
          ut = (function () {
            function t(t, e) {
              var n = void 0 === e ? {} : e,
                i = n.translate,
                o = void 0 === i ? 60 : i,
                r = n.duration,
                s = void 0 === r ? 600 : r,
                a = n.delay,
                u = void 0 === a ? 300 : a,
                c = n.easing,
                l = void 0 === c ? "cubicBezier(0.33, 1, 0.68, 1)" : c,
                d = n.per,
                p =
                  void 0 === d
                    ? Number(document.documentElement.clientWidth) >
                      Number(document.documentElement.clientHeight)
                      ? 0.3
                      : 0.2
                    : d,
                h = n.isRepeat,
                f = void 0 !== h && h,
                g = this;
              (this.time = Date.now()),
                (this.options = {
                  translate: o,
                  duration: s,
                  delay: u,
                  easing: l,
                  per: p,
                  isRepeat: f,
                }),
                (this.flowAnime = []),
                (this.isFlowDefault = !1),
                (this.observer = new IntersectionObserver(
                  function (t, e) {
                    t.forEach(function (t) {
                      var e = !!t.isIntersecting;
                      g.run(
                        g.flowAnime[t.target.getAttribute("data-flow-item")],
                        e
                      );
                    });
                  },
                  {
                    root: null,
                    rootMargin: "0px 0px -".concat(
                      window.innerHeight * this.options.per,
                      "px"
                    ),
                    threshold: 0,
                  }
                )),
                this.init(t);
            }
            return (
              (t.prototype.init = function (t) {
                var e = this;
                document.querySelectorAll(t).forEach(function (t, n) {
                  var i = {
                      elem: t,
                      mode: t.getAttribute("data-flow") || "up",
                      target: t.children.length > 1 ? t.children : t,
                      isDone: !1,
                      anime: null,
                    },
                    o = "".concat(e.time, "_").concat(n);
                  switch (
                    (t.setAttribute("data-flow-item", o),
                    t.classList.remove("is-finishedFlowAnime"),
                    i.mode)
                  ) {
                    case "down":
                      i.anime = ot()({
                        targets: i.target,
                        translateY: -e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "left":
                      i.anime = ot()({
                        targets: i.target,
                        translateX: e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "right":
                      i.anime = ot()({
                        targets: i.target,
                        translateX: -e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "leftdown":
                      i.anime = ot()({
                        targets: i.target,
                        translateX: e.options.translate,
                        translateY: -e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "rightdown":
                      i.anime = ot()({
                        targets: i.target,
                        translateX: -e.options.translate,
                        translateY: -e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "leftup":
                      i.anime = ot()({
                        targets: i.target,
                        translateX: e.options.translate,
                        translateY: e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "rightup":
                      i.anime = ot()({
                        targets: i.target,
                        translateX: -e.options.translate,
                        translateY: e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "zoom":
                      i.anime = ot()({
                        targets: i.target,
                        scale: 0,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "away":
                      i.anime = ot()({
                        targets: i.target,
                        opacity: 0,
                        duration: 10,
                      });
                      break;
                    case "mark":
                      var r = t.childElementCount > 1 ? t.children : [t];
                      Array.from(r).forEach(function (t, e) {
                        t.classList.remove("flowActive");
                      });
                      break;
                    default:
                      i.anime = ot()({
                        targets: i.target,
                        translateY: e.options.translate,
                        opacity: 0,
                        duration: 10,
                      });
                  }
                  e.observer.observe(i.elem), (e.flowAnime[o] = i);
                });
              }),
              (t.prototype.run = function (t, e) {
                var n = this;
                if (!t.isDone)
                  switch (
                    (e &&
                      (t.elem.classList.contains("is-beganFlowAnime") ||
                        t.elem.classList.add("is-beganFlowAnime")),
                    t.mode)
                  ) {
                    case "down":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateY: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateY: -this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "left":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateX: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateX: this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "right":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateX: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateX: -this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "leftdown":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateX: 0,
                            translateY: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateX: this.options.translate,
                            translateY: -this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "rightdown":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateX: 0,
                            translateY: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateX: -this.options.translate,
                            translateY: -this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "leftup":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateX: 0,
                            translateY: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateX: this.options.translate,
                            translateY: this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "rightup":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            translateX: 0,
                            translateY: 0,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            translateX: -this.options.translate,
                            translateY: this.options.translate,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "zoom":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            scale: [0, 1],
                            opacity: [0, 1],
                            duration: this.options.duration,
                            easing: "spring",
                            delay: ot().stagger(this.options.delay),
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            scale: [1, 0],
                            opacity: [1, 0],
                            duration: this.options.duration,
                            easing: "spring",
                            delay: ot().stagger(this.options.delay),
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "away":
                      e
                        ? ((t.anime = ot()({
                            targets: t.target,
                            opacity: [0, 1],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.add("is-finishedFlowAnime");
                            },
                          })),
                          this.options.isRepeat || (t.isDone = !0))
                        : (t.anime = ot()({
                            targets: t.target,
                            opacity: [1, 0],
                            duration: this.options.duration,
                            delay: ot().stagger(this.options.delay),
                            easing: this.options.easing,
                            complete: function () {
                              t.elem.classList.remove("is-finishedFlowAnime");
                            },
                          }));
                      break;
                    case "mark":
                      var i =
                        t.elem.childElementCount > 1
                          ? t.elem.children
                          : [t.elem];
                      e
                        ? (Array.from(i).forEach(function (t, e) {
                            setTimeout(function () {
                              t.classList.add("flowActive");
                            }, e * n.options.delay);
                          }),
                          this.options.isRepeat || (t.isDone = !0))
                        : Array.from(i).forEach(function (t, e) {
                            t.classList.remove("flowActive");
                          });
                      break;
                    default:
                      if (e)
                        (t.anime = ot()({
                          targets: t.target,
                          translateY: 0,
                          opacity: [0, 1],
                          duration: this.options.duration,
                          easing: this.options.easing,
                          delay: ot().stagger(this.options.delay),
                          complete: function () {
                            t.elem.classList.add("is-finishedFlowAnime");
                          },
                        })),
                          this.options.isRepeat || (t.isDone = !0);
                      else {
                        if (!t.elem.classList.contains("is-beganFlowAnime"))
                          return;
                        t.anime = ot()({
                          targets: t.target,
                          translateY: this.options.translate,
                          opacity: [1, 0],
                          duration: this.options.duration,
                          easing: this.options.easing,
                          delay: ot().stagger(this.options.delay),
                          complete: function () {
                            t.elem.classList.remove("is-finishedFlowAnime");
                          },
                        });
                      }
                  }
              }),
              (t.prototype.destroy = function () {}),
              t
            );
          })(),
          ct = (function () {
            function t(t, e) {
              var n = void 0 === e ? {} : e,
                i = n.isAuto,
                o = void 0 === i || i,
                r = n.isLoop,
                s = void 0 === r || r,
                a = n.isChangeOpacity,
                u = void 0 === a || a,
                c = n.pause,
                l = void 0 === c ? 5e3 : c,
                d = n.speed,
                p = void 0 === d ? 500 : d,
                h = n.easing,
                f = void 0 === h ? "cubicBezier(0.33, 1, 0.68, 1)" : h,
                g = n.ctrl,
                m = void 0 !== g && g,
                v = n.pager,
                y = void 0 !== v && v,
                b = n.wrapper,
                w = void 0 === b ? document.querySelector(t).parentNode : b,
                A = n.activeIndexInt,
                L = void 0 === A ? 52 : A,
                x = n.oldIndexInt,
                S = void 0 === x ? 51 : x,
                C = n.etcIndexInt,
                T = void 0 === C ? 50 : C,
                E = n.onSliderLoad,
                M = void 0 !== E && E,
                O = n.onSlideBefore,
                I = void 0 !== O && O,
                P = n.onSlideAfter,
                k = void 0 !== P && P;
              (this.time = Date.now()),
                (this.elem = document.querySelector(t)),
                (this.current = 0),
                (this.count = 0),
                (this.isAllowSlide = !1),
                (this.rTimer = !1),
                (this.pagerEvent = []),
                (this.options = {
                  isAuto: o,
                  isLoop: s,
                  isChangeOpacity: u,
                  pause: l,
                  speed: p,
                  easing: f,
                  ctrl: m,
                  pager: y,
                  wrapper: w,
                  activeIndexInt: L,
                  oldIndexInt: S,
                  etcIndexInt: T,
                  onSliderLoad: M,
                  onSlideBefore: I,
                  onSlideAfter: k,
                }),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                var t,
                  e = this;
                if (
                  (this.options.pause < this.options.speed &&
                    (this.options.speed = this.options.pause - 1),
                  (this.count = this.elem.children.length),
                  (this.elem.style.position = "relative"),
                  Array.from(this.elem.children).forEach(function (t, n) {
                    Object.assign(t.style, {
                      zIndex: e.options.etcIndexInt,
                      position: "absolute",
                      left: 0,
                      top: 0,
                    }),
                      e.options.isChangeOpacity && (t.style.opacity = "0"),
                      n === e.current &&
                        (Object.assign(t.style, {
                          zIndex: e.options.activeIndexInt,
                        }),
                        e.options.isChangeOpacity && (t.style.opacity = "1"));
                  }),
                  this.options.ctrl &&
                    (this.options.wrapper.insertAdjacentHTML(
                      "beforeend",
                      '\n        <div class="fs-ctrls">\n          <div class="fs-ctrls-direction" />\n        </div>\n      '
                    ),
                    this.options.wrapper
                      .querySelector(".fs-ctrls-direction")
                      .insertAdjacentHTML(
                        "beforeend",
                        '\n            <button class="fs-prev" aria-label="前のスライドへ">Prev</button>\n            <button class="fs-next" aria-label="次のスライドへ">Next</button>\n          '
                      ),
                    (this.pagerEvent.prev = this.options.wrapper
                      .querySelector(".fs-prev")
                      .addEventListener("click", function (t) {
                        e.isAllowSlide && e.change(e.getPrevSlide());
                      })),
                    (this.pagerEvent.next = this.options.wrapper
                      .querySelector(".fs-next")
                      .addEventListener("click", function (t) {
                        e.isAllowSlide && e.change(e.getNextSlide());
                      }))),
                  this.options.pager)
                ) {
                  this.options.wrapper.insertAdjacentHTML(
                    "beforeend",
                    '<div class="fs-pager" />'
                  );
                  for (var n = 0; n < this.count; n++)
                    this.options.wrapper
                      .querySelector(".fs-pager")
                      .insertAdjacentHTML(
                        "beforeend",
                        '\n          <div class="fs-pager-item">\n            <button data-index="'
                          .concat(n, '" aria-label="')
                          .concat(n + 1, 'のスライドへ">')
                          .concat(
                            n + 1,
                            "</button>\n          </div>\n        "
                          )
                      );
                  null ===
                    (t =
                      this.options.wrapper.querySelectorAll(".fs-pager-item")[
                        this.current
                      ]) ||
                    void 0 === t ||
                    t.querySelector("button").classList.add("is-active"),
                    (this.pagerEvent.pager = this.options.wrapper
                      .querySelectorAll(".fs-pager-item button")
                      .forEach(function (t, n) {
                        t.addEventListener("click", function (t) {
                          if (e.isAllowSlide) {
                            var n = t.target.getAttribute("data-index");
                            e.change(Number(n));
                          }
                        });
                      }));
                }
                (this.isAllowSlide = !0),
                  this.slideAuto(),
                  "function" == typeof this.options.onSliderLoad &&
                    this.options.onSliderLoad();
              }),
              (t.prototype.change = function (t) {
                var e = this;
                if (
                  (clearTimeout(Number(this.rTimer)),
                  this.isAllowSlide && !1 !== t)
                ) {
                  this.isAllowSlide = !1;
                  var n = this.current,
                    i =
                      Number(t) >= 0
                        ? Number(t)
                        : this.current !== this.count - 1
                        ? this.current + 1
                        : 0;
                  (this.current = i === this.count ? 0 : i),
                    "function" == typeof this.options.onSlideBefore &&
                      this.options.onSlideBefore(n, i),
                    this.options.pager && this.togglePager(),
                    Array.from(this.elem.children).forEach(function (t, e) {
                      t.classList.remove("slide-old", "slide-active");
                    }),
                    Array.from(this.elem.children).forEach(function (t, n) {
                      t.style.zIndex = String(e.options.etcIndexInt);
                    }),
                    Array.from(this.elem.children).forEach(function (t, i) {
                      i === n &&
                        ((t.style.zIndex = String(e.options.oldIndexInt)),
                        t.classList.add("slide-old"));
                    }),
                    Array.from(this.elem.children).forEach(function (t, i) {
                      i === e.current &&
                        ((t.style.zIndex = String(e.options.activeIndexInt)),
                        t.classList.add("slide-active"),
                        e.options.isChangeOpacity
                          ? ot()({
                              targets: t,
                              opacity: 1,
                              duration: e.options.speed,
                              easing: e.options.easing,
                              complete: function () {
                                "function" == typeof e.options.onSlideAfter &&
                                  e.options.onSlideAfter(n, e.current),
                                  Array.from(e.elem.children).forEach(function (
                                    t,
                                    n
                                  ) {
                                    n !== e.current && (t.style.opacity = "0");
                                  }),
                                  (e.isAllowSlide = !0),
                                  (e.options.isLoop ||
                                    e.current !== e.count - 1) &&
                                    e.slideAuto();
                              },
                            })
                          : ot()({
                              targets: t,
                              duration: e.options.speed,
                              easing: e.options.easing,
                              complete: function () {
                                "function" == typeof e.options.onSlideAfter &&
                                  e.options.onSlideAfter(n, e.current),
                                  (e.isAllowSlide = !0),
                                  (e.options.isLoop ||
                                    e.current !== e.count - 1) &&
                                    e.slideAuto();
                              },
                            }));
                    });
                }
              }),
              (t.prototype.togglePager = function () {
                var t;
                this.options.wrapper
                  .querySelectorAll(".fs-pager-item button")
                  .forEach(function (t) {
                    t.classList.remove("is-active");
                  }),
                  null ===
                    (t =
                      this.options.wrapper.querySelectorAll(".fs-pager-item")[
                        this.current
                      ]) ||
                    void 0 === t ||
                    t.querySelector("button").classList.add("is-active");
              }),
              (t.prototype.slideAuto = function () {
                this.isAllowSlide &&
                  this.options.isAuto &&
                  this.startSlideAuto();
              }),
              (t.prototype.startSlideAuto = function () {
                var t = this;
                (this.isAllowSlide = this.options.isAuto = !0),
                  (this.rTimer = window.setTimeout(function () {
                    t.change();
                  }, this.options.pause));
              }),
              (t.prototype.stopAuto = function () {
                clearTimeout(Number(this.rTimer)), (this.options.isAuto = !1);
              }),
              (t.prototype.getNextSlide = function () {
                return this.options.isLoop
                  ? this.current === this.count - 1
                    ? 0
                    : this.current + 1
                  : this.current !== this.count - 1 && this.current + 1;
              }),
              (t.prototype.getPrevSlide = function () {
                return this.options.isLoop
                  ? 0 === this.current
                    ? this.count - 1
                    : this.current - 1
                  : 0 !== this.current && this.current - 1;
              }),
              (t.prototype.updateParams = function (t) {
                for (var e in t) this.options[e] = t[e];
              }),
              (t.prototype.getParams = function () {
                return this;
              }),
              (t.prototype.reset = function () {
                (this.current = this.count - 1), this.change(0);
              }),
              (t.prototype.destroy = function () {
                clearTimeout(Number(this.rTimer));
                for (var t = 0, e = this.pagerEvent; t < e.length; t++) {
                  var n = e[t];
                  document.removeEventListener("click", this.pagerEvent[n]);
                }
                this.options.wrapper.querySelector(".fs-ctrls").remove(),
                  this.options.wrapper.querySelector(".fs-pager").remove(),
                  (this.length = 0);
              }),
              t
            );
          })(),
          lt = (function () {
            function t(t, e) {
              var n = void 0 === e ? {} : e,
                i = n.isAuto,
                o = void 0 === i || i,
                r = n.isLoop,
                s = void 0 === r || r,
                a = n.pause,
                u = void 0 === a ? 5e3 : a,
                c = n.speed,
                l = void 0 === c ? 500 : c,
                d = n.easing,
                p = void 0 === d ? "cubicBezier(0.33, 1, 0.68, 1)" : d,
                h = n.ctrl,
                f = void 0 !== h && h,
                g = n.pager,
                m = void 0 !== g && g,
                v = n.wrapper,
                y = void 0 === v ? document.querySelector(t).parentNode : v,
                b = n.rootCount,
                w = void 0 === b ? 0 : b,
                A = n.slideCount,
                L = void 0 === A ? 1 : A,
                x = n.cloneCount,
                S = void 0 === x ? 1 : x,
                C = n.threshold,
                T = void 0 === C ? 30 : C,
                E = n.onSliderLoad,
                M = void 0 !== E && E,
                O = n.onSlideBefore,
                I = void 0 !== O && O,
                P = n.onSlideAfter,
                k = void 0 !== P && P,
                q = n.isDebug,
                N = void 0 !== q && q;
              (this.time = Date.now()),
                (this.selector = t),
                (this.elem = document.querySelector(t)),
                (this.current = 0),
                (this.realCurrent = 0),
                (this.oldIndex = 0),
                (this.pageLength = 1),
                (this.itemLength = 0),
                (this.itemLengthOrg = 0),
                (this.remainder = 0),
                (this.isAllowSlide = !1),
                (this.rTimer = !1),
                (this.pagerEvent = []),
                (this.orgElement = document.querySelector(t)),
                (this.options = {
                  isAuto: o,
                  isLoop: s,
                  pause: u,
                  speed: l,
                  easing: p,
                  ctrl: f,
                  pager: m,
                  wrapper: y,
                  rootCount: w,
                  slideCount: L,
                  cloneCount: S,
                  threshold: T,
                  onSliderLoad: M,
                  onSlideBefore: I,
                  onSlideAfter: k,
                  isDebug: N,
                }),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                var t,
                  e = this;
                if (
                  (this.initDebug(),
                  this.options.isAuto || (this.options.pause = 0),
                  (this.itemLength = this.itemLengthOrg =
                    this.elem.children.length),
                  Object.assign(this.elem.style, {
                    display: "flex",
                    flexWrap: "wrap",
                  }),
                  this.itemLength > 1 &&
                    (this.options.rootCount
                      ? (1 === this.options.rootCount &&
                          (this.options.slideCount = 1),
                        (this.itemWidth = Math.floor(
                          this.options.wrapper.clientWidth /
                            Number(this.options.rootCount)
                        )))
                      : ((this.options.rootCount = 1),
                        (this.itemWidth = this.options.wrapper.clientWidth)),
                    this.options.isLoop &&
                      1 !== this.options.slideCount &&
                      (this.options.slideCount = Number(
                        this.options.rootCount
                      )),
                    Array.from(this.elem.children).forEach(function (t) {
                      return (t.style.width = "".concat(e.itemWidth, "px"));
                    }),
                    this.itemLength > this.options.rootCount))
                ) {
                  if (
                    ((this.elem.outerHTML =
                      '<div class="sliderContainer">'.concat(
                        this.elem.outerHTML,
                        "</div>"
                      )),
                    (this.elem = document.querySelector(this.selector)),
                    (this.container = this.elem.closest(".sliderContainer")),
                    Object.assign(this.container.style, { overflow: "hidden" }),
                    (this.elem.style.width = "".concat(
                      this.itemWidth * this.itemLengthOrg,
                      "px"
                    )),
                    (this.pageLength = Math.ceil(
                      this.itemLength / Number(this.options.rootCount)
                    )),
                    this.options.isLoop)
                  ) {
                    for (
                      var n = this.elem.innerHTML, i = 0;
                      i < this.options.cloneCount;
                      i++
                    )
                      this.elem.insertAdjacentHTML("afterbegin", n),
                        this.elem.insertAdjacentHTML("beforeend", n),
                        (this.itemLength = this.elem.childElementCount),
                        (this.elem.style.width = "".concat(
                          this.itemWidth * this.itemLength,
                          "px"
                        ));
                    (this.elem.style.transform = "translateX(-".concat(
                      this.itemWidth * this.itemLengthOrg,
                      "px)"
                    )),
                      this.options.rootCount <= 1
                        ? (this.realCurrent = this.current + this.pageLength)
                        : (this.realCurrent =
                            this.current + this.itemLengthOrg);
                  }
                  if (
                    ((this.remainder = this.getRemainder()),
                    this.options.ctrl &&
                      (this.options.wrapper.insertAdjacentHTML(
                        "beforeend",
                        '\n              <div class="ss-ctrls">\n                <div class="ss-ctrls-direction" />\n              </div>\n            '
                      ),
                      this.options.wrapper
                        .querySelector(".ss-ctrls-direction")
                        .insertAdjacentHTML(
                          "beforeend",
                          '\n                <button class="ss-prev" aria-label="前のスライドへ">Prev</button>\n                <button class="ss-next" aria-label="次のスライドへ">Next</button>\n              '
                        ),
                      (this.prevBtn =
                        this.options.wrapper.querySelector(".ss-prev")),
                      (this.nextBtn =
                        this.options.wrapper.querySelector(".ss-next")),
                      (this.pagerEvent.prev = this.prevBtn.addEventListener(
                        "click",
                        function (t) {
                          e.isAllowSlide &&
                            (t.target.classList.contains("is-disabled") ||
                              e.slide(e.getPrevSlide()));
                        },
                        !1
                      )),
                      (this.pagerEvent.next = this.nextBtn.addEventListener(
                        "click",
                        function (t) {
                          e.isAllowSlide &&
                            (t.target.classList.contains("is-disabled") ||
                              e.slide(e.getNextSlide()));
                        },
                        !1
                      ))),
                    this.options.pager)
                  ) {
                    for (
                      this.options.wrapper.insertAdjacentHTML(
                        "beforeend",
                        '<div class="ss-pager" />'
                      ),
                        i = 0;
                      i < this.pageLength;
                      i++
                    )
                      this.options.wrapper
                        .querySelector(".ss-pager")
                        .insertAdjacentHTML(
                          "beforeend",
                          '\n                <div class="ss-pager-item">\n                  <button data-index="'
                            .concat(i, '" aria-label="')
                            .concat(i + 1, 'のスライドへ">')
                            .concat(
                              i + 1,
                              "</button>\n                </div>\n              "
                            )
                        );
                    null ===
                      (t =
                        this.options.wrapper.querySelectorAll(".ss-pager-item")[
                          this.current
                        ]) ||
                      void 0 === t ||
                      t.querySelector("button").classList.add("is-active"),
                      (this.pagerEvent.pager = this.options.wrapper
                        .querySelectorAll(".ss-pager-item button")
                        .forEach(function (t, n) {
                          t.addEventListener("click", function (t) {
                            if (
                              e.isAllowSlide &&
                              !t.target.classList.contains("is-active")
                            ) {
                              var n,
                                i = t.target.getAttribute("data-index"),
                                o =
                                  ((n = Number(i) * e.options.slideCount),
                                  e.options.isLoop
                                    ? n
                                    : n + Number(e.options.rootCount) >
                                      e.itemLengthOrg
                                    ? e.current +
                                      e.getRemainder() -
                                      Number(e.options.rootCount)
                                    : n);
                              e.slide(o);
                            }
                          });
                        })),
                      this.elem.addEventListener("touchmove", function (t) {
                        t.preventDefault(),
                          (e.moveX = t.changedTouches[0].pageX);
                      }),
                      this.elem.addEventListener("touchstart", function (t) {
                        t.preventDefault(),
                          (e.startX = t.touches[0].pageX),
                          (e.moveX = 0);
                      }),
                      this.elem.addEventListener("touchend", function (t) {
                        if ((t.preventDefault(), 0 === e.moveX)) return !1;
                        if (e.startX + e.options.threshold < e.moveX) {
                          if (!e.isAllowSlide) return;
                          e.slide(e.getPrevSlide());
                        }
                        if (e.startX > e.moveX + e.options.threshold) {
                          if (!e.isAllowSlide) return;
                          e.slide(e.getNextSlide());
                        }
                      });
                  }
                }
                (this.isAllowSlide = !0),
                  this.slide(this.current),
                  this.slideAuto(),
                  "function" == typeof this.options.onSliderLoad &&
                    this.options.onSliderLoad();
              }),
              (t.prototype.slide = function (t) {
                var e = this;
                clearTimeout(Number(this.rTimer)),
                  this.isAllowSlide &&
                    !1 !== t &&
                    ((this.isAllowSlide = !1),
                    (this.oldIndex =
                      t !== this.realCurrent ? this.realCurrent : null),
                    (this.current = Number(t)),
                    this.options.isLoop
                      ? this.options.rootCount <= 1
                        ? (this.realCurrent = this.current + this.pageLength)
                        : (this.realCurrent = this.current + this.itemLengthOrg)
                      : (this.realCurrent = this.current),
                    (this.remainder = this.getRemainder()),
                    "function" == typeof this.options.onSlideBefore &&
                      this.options.onSlideBefore(
                        this.oldIndex,
                        this.realCurrent
                      ),
                    ot()({
                      targets: this.elem,
                      translateX: function () {
                        return e.realCurrent > e.oldIndex
                          ? "-=".concat(
                              e.itemWidth * (e.realCurrent - e.oldIndex),
                              "px"
                            )
                          : "+=".concat(
                              e.itemWidth * (e.oldIndex - e.realCurrent),
                              "px"
                            );
                      },
                      easing: this.options.easing,
                      duration: this.options.speed,
                      complete: function () {
                        var t;
                        e.options.isLoop &&
                          (e.options.rootCount <= 1
                            ? (e.current >= e.pageLength
                                ? ((e.elem.style.transform =
                                    "translateX(-".concat(
                                      e.itemWidth * e.itemLengthOrg,
                                      "px)"
                                    )),
                                  (e.current = 0))
                                : e.current < 0 &&
                                  ((e.elem.style.transform =
                                    "translateX(-".concat(
                                      e.itemWidth *
                                        (e.itemLengthOrg + (e.pageLength - 1)),
                                      "px)"
                                    )),
                                  (e.current = e.pageLength - 1)),
                              (e.realCurrent = e.current + e.pageLength))
                            : (e.current > e.itemLengthOrg - 1
                                ? ((e.elem.style.transform =
                                    "translateX(-".concat(
                                      e.itemWidth * e.itemLengthOrg,
                                      "px)"
                                    )),
                                  (e.current = 0))
                                : e.current < 0 &&
                                  (1 === e.options.rootCount
                                    ? (e.elem.style.transform =
                                        "translateX(-".concat(
                                          e.itemWidth *
                                            (e.itemLengthOrg + e.pageLength),
                                          "px)"
                                        ))
                                    : (e.elem.style.transform =
                                        "translateX(-".concat(
                                          e.itemWidth *
                                            (e.itemLengthOrg +
                                              e.pageLength *
                                                Number(e.options.rootCount) -
                                              Number(e.options.rootCount)),
                                          "px)"
                                        )),
                                  (e.current =
                                    e.itemLengthOrg -
                                    Number(e.options.rootCount))),
                              (e.realCurrent = e.current + e.itemLengthOrg)),
                          (e.oldIndex = e.oldIndex - e.pageLength)),
                          e.options.pager && e.togglePager(),
                          e.options.ctrl && e.toggleCtrls(),
                          Array.from(e.elem.children).forEach(function (t, e) {
                            t.classList.remove("slide-old", "slide-active");
                          }),
                          e.elem.children[e.realCurrent].classList.add(
                            "slide-active"
                          ),
                          null ===
                            (t = e.elem.children[e.oldIndex + e.pageLength]) ||
                            void 0 === t ||
                            t.classList.add("slide-old"),
                          (e.isAllowSlide = !0),
                          (e.options.isLoop ||
                            e.current !== e.pageLength - 1) &&
                            e.slideAuto();
                      },
                    }));
              }),
              (t.prototype.togglePager = function () {
                var t;
                this.options.wrapper
                  .querySelectorAll(".ss-pager-item button")
                  .forEach(function (t) {
                    t.classList.remove("is-active");
                  });
                var e = Math.ceil(
                  this.current / Number(this.options.rootCount)
                );
                null ===
                  (t =
                    this.options.wrapper.querySelectorAll(".ss-pager-item")[
                      e
                    ]) ||
                  void 0 === t ||
                  t.querySelector("button").classList.add("is-active");
              }),
              (t.prototype.toggleCtrls = function () {
                !this.options.isLoop &&
                  this.options.ctrl &&
                  (this.prevBtn.classList.remove("is-disabled"),
                  this.nextBtn.classList.remove("is-disabled"),
                  0 === this.current &&
                    this.prevBtn.classList.add("is-disabled"),
                  this.itemLengthOrg - this.current <= this.options.rootCount &&
                    this.nextBtn.classList.add("is-disabled"));
              }),
              (t.prototype.slideAuto = function () {
                this.isAllowSlide &&
                  this.options.isAuto &&
                  this.startSlideAuto();
              }),
              (t.prototype.startSlideAuto = function () {
                var t = this;
                (this.isAllowSlide = this.options.isAuto = !0),
                  (this.rTimer = window.setTimeout(function () {
                    t.slide(t.getNextSlide());
                  }, this.options.pause));
              }),
              (t.prototype.stopAuto = function () {
                clearTimeout(Number(this.rTimer)), (this.options.isAuto = !1);
              }),
              (t.prototype.getNextSlide = function () {
                return this.options.isLoop
                  ? this.itemLengthOrg % Number(this.options.rootCount) &&
                    0 !== this.current &&
                    this.remainder <= this.options.rootCount
                    ? 0
                    : this.current + this.options.slideCount
                  : this.current !== this.itemLength - 1 &&
                      (this.remainder - this.options.slideCount <
                      this.options.rootCount
                        ? this.current +
                          (this.remainder - 1 - this.options.slideCount)
                        : this.current + this.options.slideCount);
              }),
              (t.prototype.getPrevSlide = function () {
                if (this.options.isLoop) {
                  if (this.itemLengthOrg % Number(this.options.rootCount)) {
                    if (this.remainder === this.itemLengthOrg) {
                      var t = Math.floor(
                        this.itemLengthOrg % Number(this.options.rootCount)
                      );
                      return this.itemLengthOrg - t;
                    }
                    return this.current - this.options.slideCount;
                  }
                  return this.current - this.options.slideCount;
                }
                return (
                  0 !== this.current &&
                  (this.remainder + this.options.slideCount > this.itemLengthOrg
                    ? 0
                    : this.current - this.options.slideCount)
                );
              }),
              (t.prototype.getRemainder = function () {
                var t = this.itemLengthOrg - this.current;
                return t < 0 ? this.itemLengthOrg : t;
              }),
              (t.prototype.updateParams = function (t) {
                for (var e in t) this.options[e] = t[e];
              }),
              (t.prototype.getParams = function () {
                return this;
              }),
              (t.prototype.reset = function () {
                (this.current = this.itemLength - 1), this.slide(0);
              }),
              (t.prototype.destroy = function () {
                clearTimeout(Number(this.rTimer));
                for (var t = 0, e = this.pagerEvent; t < e.length; t++) {
                  var n = e[t];
                  document.removeEventListener("click", this.pagerEvent[n]);
                }
                this.options.wrapper.querySelector(".ss-ctrls").remove(),
                  this.options.wrapper.querySelector(".ss-pager").remove();
              }),
              (t.prototype.initDebug = function () {
                if (this.options.isDebug) {
                  var t = document.createElement("div");
                  (t.id = "ssDebug_".concat(Date.now())),
                    Object.assign(t.style, {
                      position: "fixed",
                      zIndex: 99999,
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(200,0,0,0.8)",
                      color: "#fff",
                      padding: "1vw",
                      width: "30vw",
                      height: "100%",
                      overflow: "auto",
                    }),
                    document.body.appendChild(t),
                    (t.innerHTML =
                      '<div><button class="toggle" style="color: #FFFFFF;">HIDE</button></div><div class="inner" />');
                  var e = {
                    toggle: t.querySelector(".toggle"),
                    inner: t.querySelector(".inner"),
                  };
                  e.toggle.addEventListener("click", function () {
                    "none" !== e.inner.style.display
                      ? ((e.inner.style.display = "none"),
                        (t.style.height = "auto"),
                        (e.toggle.textContent = "SHOW"))
                      : ((e.inner.style.display = "block"),
                        (t.style.height = "100%"),
                        (e.toggle.textContent = "HIDE"));
                  }),
                    this.showDebug(t.id);
                }
              }),
              (t.prototype.showDebug = function (t) {
                var e = "";
                for (var n in this)
                  if ("function" != typeof this[n])
                    if ("options" !== n)
                      e += '<div><span style="font-weight: bold;">'
                        .concat(n, "</span> : ")
                        .concat(this[n], "</div>");
                    else
                      for (var i in ((e += "options : "), this[n]))
                        e +=
                          '<div style="padding-left: 1em"><span style="font-weight: bold;">'
                            .concat(i, "</span> : ")
                            .concat(this[n][i], "</div>");
                (document.querySelector("#".concat(t, " .inner")).innerHTML =
                  e),
                  this.runDebugAuto(t);
              }),
              (t.prototype.runDebugAuto = function (t) {
                var e = this;
                this.debugTimer = window.setTimeout(function () {
                  e.showDebug(t);
                }, 500);
              }),
              t
            );
          })(),
          dt = (function () {
            function t(t, e) {
              void 0 === t && (t = ".accVox");
              var n,
                i = void 0 === e ? {} : e,
                o = i.openClassName,
                r = void 0 === o ? "is-open" : o,
                s = i.changeDisplay,
                a = void 0 === s ? "block" : s,
                u = i.speed,
                c = void 0 === u ? 400 : u,
                l = i.easing,
                d = void 0 === l ? "easeOutCubic" : l,
                p = i.parentContainer,
                h =
                  void 0 === p
                    ? null === (n = document.querySelector(t)) || void 0 === n
                      ? void 0
                      : n.parentElement
                    : p,
                f = i.isAutoClose,
                g = void 0 !== f && f,
                m = i.onCloseAfter,
                v = void 0 !== m && m,
                y = i.onOpenAfter,
                b = void 0 !== y && y,
                w = i.onComplete,
                A = void 0 !== w && w;
              (this.accParams = {}),
                (this.collection = document.querySelectorAll(t)),
                (this.selector = t),
                (this.options = {
                  openClassName: r,
                  changeDisplay: a,
                  speed: c,
                  easing: d,
                  parentContainer: h,
                  isAutoClose: g,
                  onCloseAfter: v,
                  onOpenAfter: b,
                  onComplete: A,
                }),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                var t = this;
                this.collection.length &&
                  this.collection.forEach(function (e, n) {
                    var i,
                      o = new Date().getTime(),
                      r = {
                        wrap: e,
                        opener: e.querySelector(".opener"),
                        body: e.querySelector(".accContent"),
                        height: 0,
                        isAllowChange: !1,
                        id:
                          ((i = parseInt("".concat(o).concat(n))),
                          "accItem_".concat(i)),
                      };
                    (t.accParams[r.id] = r),
                      (e.id = r.id),
                      (r.height = r.body.offsetHeight),
                      ot()({
                        targets: r.body,
                        height: 0,
                        duration: 1,
                        complete: function () {
                          (r.isAllowChange = !0),
                            Object.assign(r.body.style, {
                              display: "none",
                              overflow: "hidden",
                            }),
                            document.body.classList.add("is-allowChangeAcc");
                        },
                      }),
                      r.wrap.classList.remove(t.options.openClassName),
                      r.opener.setAttribute("aria-expanded", "false"),
                      r.opener.setAttribute(
                        "aria-controls",
                        "".concat(r.id, "_body")
                      ),
                      r.body.setAttribute("aria-hidden", "true"),
                      (r.body.id = "".concat(r.id, "_body")),
                      r.opener.addEventListener("click", function (e) {
                        r.isAllowChange &&
                          ((r.isAllowChange = !1),
                          r.body.style.display === t.options.changeDisplay
                            ? t.close(r.id)
                            : (t.open(r.id),
                              t.options.isAutoClose &&
                                t.options.parentContainer
                                  .querySelectorAll(t.selector)
                                  .forEach(function (e, n) {
                                    e.id !== r.id && t.close(e.id);
                                  })));
                      }),
                      n + 1 >= t.collection.length &&
                        "function" == typeof t.options.onComplete &&
                        t.options.onComplete();
                  });
              }),
              (t.prototype.open = function (t) {
                var e = this,
                  n = this.accParams[t];
                n.wrap.classList.add(this.options.openClassName),
                  Object.assign(n.body.style, {
                    display: this.options.changeDisplay,
                    visibility: "hidden",
                    position: "absolute",
                    height: "auto",
                  }),
                  Object.assign(n.body.style, {
                    visibility: "visible",
                    position: "static",
                    height: "0px",
                  }),
                  ot()({
                    targets: n.body,
                    height: [0, n.height],
                    duration: this.options.speed,
                    easing: this.options.easing,
                    complete: function () {
                      (n.body.style.height = "auto"),
                        n.body.setAttribute("aria-hidden", "false"),
                        n.opener.setAttribute("aria-expanded", "true"),
                        (n.height = n.body.clientHeight),
                        (n.isAllowChange = !0),
                        "function" == typeof e.options.onOpenAfter &&
                          e.options.onOpenAfter(n.id);
                    },
                  });
              }),
              (t.prototype.close = function (t) {
                var e = this,
                  n = this.accParams[t];
                n.wrap.classList.remove(this.options.openClassName),
                  n.body.style.removeProperty("height"),
                  ot()({
                    targets: n.body,
                    height: 0,
                    duration: this.options.speed,
                    easing: this.options.easing,
                    complete: function () {
                      (n.isAllowChange = !0),
                        (n.body.style.display = "none"),
                        n.body.setAttribute("aria-hidden", "true"),
                        n.opener.setAttribute("aria-expanded", "false"),
                        "function" == typeof e.options.onCloseAfter &&
                          e.options.onCloseAfter(n.id);
                    },
                  });
              }),
              t
            );
          })(),
          pt = (function () {
            function t() {
              (this.raw = ""), (this.cParam = []), this.update();
            }
            return (
              (t.prototype.update = function () {
                var t = this;
                (this.raw = document.cookie),
                  (this.cParam = []),
                  this.raw.split(";").forEach(function (e, n) {
                    var i = e.split("=");
                    t.cParam.push({ key: i[0], value: i[1] });
                  });
              }),
              (t.prototype.getRaw = function () {
                return this.raw;
              }),
              (t.prototype.get = function (t) {
                var e = this.cParam.filter(function (e) {
                  return e.key.trim() === t;
                });
                return !!e.length && e[0].value;
              }),
              (t.prototype.delete = function (t) {
                var e = this.get(t),
                  n = (document.cookie = ""
                    .concat(t, "=")
                    .concat(encodeURIComponent(e), ";max-age=0"));
                return this.update(), !!n;
              }),
              (t.prototype.set = function (t, e, n) {
                if ((void 0 === n && (n = {}), !t || !e)) return !1;
                var i = "".concat(t, "=").concat(encodeURIComponent(e), ";");
                Object.keys(n).length &&
                  Object.keys(n).forEach(function (t) {
                    i += " ".concat(t, "=").concat(n[t], ";");
                  });
                var o = (document.cookie = i);
                return this.update(), !!o;
              }),
              t
            );
          })(),
          ht = (function () {
            function t(t, e) {
              void 0 === t && (t = ".rplSPImg");
              var n = void 0 === e ? {} : e,
                i = n.pcName,
                o = void 0 === i ? "PC_" : i,
                r = n.spName,
                s = void 0 === r ? "SP_" : r,
                a = n.spBreakPoint,
                u = void 0 === a ? 768 : a,
                c = this;
              (this.collection = document.querySelectorAll(t)),
                (this.options = { pcName: o, spName: s, spBreakPoint: u }),
                (this.wHeight = 0),
                (this.wWidth = 0),
                (this.wIWidth = 0),
                (this.wIHeight = 0),
                (this.isRespMode = !1),
                (this.setEventAdjust = function () {
                  return c.adjust();
                }),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                window.addEventListener("load", this.setEventAdjust),
                  window.addEventListener("resize", this.setEventAdjust);
              }),
              (t.prototype.adjust = function () {
                var t = this;
                return (
                  this.setRespMode(),
                  this.collection.forEach(function (e, n) {
                    t.isRespMode
                      ? (e.src = e.src.replace(
                          t.options.pcName,
                          t.options.spName
                        ))
                      : (e.src = e.src.replace(
                          t.options.spName,
                          t.options.pcName
                        ));
                  })
                );
              }),
              (t.prototype.destroy = function () {
                window.removeEventListener("laod", this.setEventAdjust),
                  window.removeEventListener("resize", this.setEventAdjust);
              }),
              (t.prototype.setRespMode = function () {
                (this.wHeight = Number(document.documentElement.clientHeight)),
                  (this.wWidth = Number(document.documentElement.clientWidth)),
                  (this.wIWidth = Number(window.innerWidth)),
                  (this.wIHeight = Number(window.innerHeight)),
                  (this.isRespMode = this.wIWidth < this.options.spBreakPoint);
              }),
              t
            );
          })(),
          ft = (function () {
            function t(t, e) {
              var n = void 0 === e ? {} : e,
                i = n.root,
                o = void 0 === i ? null : i,
                r = n.rootMargin,
                s = void 0 === r ? "0px" : r,
                a = n.threshold,
                u = void 0 === a ? 1 : a,
                c = n.hideTag,
                l = void 0 === c ? "js-lazyBg" : c,
                d = n.showTag,
                p = void 0 === d ? "is-completeLazyBg" : d,
                h = n.onComplete,
                f = void 0 !== h && h;
              (this.collection = document.querySelectorAll(t)),
                (this.length = this.collection.length),
                this.length || this.die(),
                (this.options = {
                  root: o,
                  rootMargin: s,
                  threshold: u,
                  hideTag: l,
                  showTag: p,
                  onComplete: f,
                }),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                this.run();
              }),
              (t.prototype.run = function () {
                var t = this;
                (this.observer = new IntersectionObserver(function (e, n) {
                  e.forEach(function (e) {
                    e.isIntersecting &&
                      (e.target.classList.remove(t.options.hideTag),
                      e.target.classList.add(t.options.showTag));
                  });
                }, this.options)),
                  this.collection.forEach(function (e) {
                    t.observer.observe(e);
                  });
              }),
              (t.prototype.destroy = function () {
                var t = this;
                this.collection.forEach(function (e) {
                  e.classList.remove(t.options.showTag),
                    e.classList.add(t.options.hideTag);
                }),
                  (this.observer = null);
              }),
              (t.prototype.reload = function () {
                this.destroy(), this.init();
              }),
              (t.prototype.die = function () {
                return !1;
              }),
              t
            );
          })();
      })(),
      i
    );
  })();
});
