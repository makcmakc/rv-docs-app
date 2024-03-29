!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).shortAndSweet = e())
})(this, function() {
  'use strict'
  return (function(t) {
    if (typeof window === 'undefined' ? null : window) {
      var e = function(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = document.createElement(t)
          return (
            Object.keys(e).forEach(function(t) {
              n.setAttribute(t, e[t])
            }),
            n
          )
        },
        n = 0,
        i = function(t, i) {
          if (t.getAttribute('maxlength')) {
            var a = t.dataset.counterLabel || i.counterLabel,
              r = (function(t) {
                var i = t.assistDelay,
                  a = t.counterClassName,
                  r = e('span', { class: a, 'aria-hidden': 'true' }),
                  o = e('span', {
                    style:
                      'position:absolute;overflow:hidden;height:1px;width:1px;padding:0;border:0;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);white-space:nowrap;',
                    id: 'short-and-sweet-counter-'.concat(n++),
                    role: 'status',
                    'aria-live': 'polite',
                  }),
                  s = document.createDocumentFragment()
                s.appendChild(r), s.appendChild(o)
                var u = null
                return {
                  id: o.id,
                  fragment: s,
                  updateText: function(t) {
                    r.textContent = t
                  },
                  updateAssist: function(t, e) {
                    clearTimeout(u),
                      e
                        ? (o.textContent = t)
                        : (u = setTimeout(function() {
                            o.textContent = t
                          }, i))
                  },
                  syncAssist: function() {
                    clearTimeout(u), (o.textContent = r.textContent)
                  },
                  resetAssist: function() {
                    clearTimeout(u), (o.textContent = '')
                  },
                }
              })(i)
            t.setAttribute('aria-controls', r.id), i.append(t, r.fragment)
            var o = !0,
              s = function() {
                var e,
                  n = null != (e = t.getAttribute('maxlength')) ? parseInt(e, 10) : null,
                  i = t.value.length > n
                i &&
                  (function(e) {
                    t.value = t.value.substr(0, e)
                  })(n)
                var s,
                  u = t.value.length,
                  l =
                    ((s = { maxlength: n, length: u, remaining: n - u }),
                    a.replace(/(?:{([a-zA-Z]+)})/g, function(t, e) {
                      return s[e]
                    }))
                r.updateText(l), o ? (o = !1) : r.updateAssist(l, i)
              }
            t.addEventListener('focus', r.syncAssist),
              t.addEventListener('blur', r.resetAssist),
              t.addEventListener('input', s),
              s()
          }
        },
        a = {
          counterClassName: 'el-input__count',
          counterLabel: '{remaining} characters left',
          assistDelay: 2e3,
          append: function(t, e) {
            t.parentNode.appendChild(e)
          },
        },
        r = function(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          return t.map(function(t) {
            return i(t, Object.assign({}, a, e))
          })
        }
      return function(t, e) {
        return 'string' == typeof t
          ? r(((n = document.querySelectorAll(t)), Array.prototype.slice.call(n)), e)
          : r([t], e)[0]
        var n
      }
    }
  })()
})
