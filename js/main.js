(self.webpackChunkmd_view = self.webpackChunkmd_view || []).push([
  [179],
  {
    255: (js) => {
      function gr(Bs) {
        return Promise.resolve().then(() => {
          var zn = new Error("Cannot find module '" + Bs + "'");
          throw ((zn.code = "MODULE_NOT_FOUND"), zn);
        });
      }
      (gr.keys = () => []), (gr.resolve = gr), (gr.id = 255), (js.exports = gr);
    },
    481: (js, gr, Bs) => {
      "use strict";
      function zn(n) {
        return "function" == typeof n;
      }
      let lc = !1;
      const sn = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(n) {
          if (n) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            lc &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          lc = n;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return lc;
        },
      };
      function Ei(n) {
        setTimeout(() => {
          throw n;
        }, 0);
      }
      const va = {
          closed: !0,
          next(n) {},
          error(n) {
            if (sn.useDeprecatedSynchronousErrorHandling) throw n;
            Ei(n);
          },
          complete() {},
        },
        Hs = Array.isArray || ((n) => n && "number" == typeof n.length);
      function uc(n) {
        return null !== n && "object" == typeof n;
      }
      const Ea = (() => {
        function n(e) {
          return (
            Error.call(this),
            (this.message = e
              ? `${e.length} errors occurred during unsubscription:\n${e
                  .map((t, r) => `${r + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = e),
            this
          );
        }
        return (n.prototype = Object.create(Error.prototype)), n;
      })();
      class _e {
        constructor(e) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
        }
        unsubscribe() {
          let e;
          if (this.closed) return;
          let {
            _parentOrParents: t,
            _ctorUnsubscribe: r,
            _unsubscribe: i,
            _subscriptions: s,
          } = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            t instanceof _e)
          )
            t.remove(this);
          else if (null !== t)
            for (let o = 0; o < t.length; ++o) t[o].remove(this);
          if (zn(i)) {
            r && (this._unsubscribe = void 0);
            try {
              i.call(this);
            } catch (o) {
              e = o instanceof Ea ? pg(o.errors) : [o];
            }
          }
          if (Hs(s)) {
            let o = -1,
              a = s.length;
            for (; ++o < a; ) {
              const l = s[o];
              if (uc(l))
                try {
                  l.unsubscribe();
                } catch (u) {
                  (e = e || []),
                    u instanceof Ea ? (e = e.concat(pg(u.errors))) : e.push(u);
                }
            }
          }
          if (e) throw new Ea(e);
        }
        add(e) {
          let t = e;
          if (!e) return _e.EMPTY;
          switch (typeof e) {
            case "function":
              t = new _e(e);
            case "object":
              if (t === this || t.closed || "function" != typeof t.unsubscribe)
                return t;
              if (this.closed) return t.unsubscribe(), t;
              if (!(t instanceof _e)) {
                const s = t;
                (t = new _e()), (t._subscriptions = [s]);
              }
              break;
            default:
              throw new Error(
                "unrecognized teardown " + e + " added to Subscription."
              );
          }
          let { _parentOrParents: r } = t;
          if (null === r) t._parentOrParents = this;
          else if (r instanceof _e) {
            if (r === this) return t;
            t._parentOrParents = [r, this];
          } else {
            if (-1 !== r.indexOf(this)) return t;
            r.push(this);
          }
          const i = this._subscriptions;
          return null === i ? (this._subscriptions = [t]) : i.push(t), t;
        }
        remove(e) {
          const t = this._subscriptions;
          if (t) {
            const r = t.indexOf(e);
            -1 !== r && t.splice(r, 1);
          }
        }
      }
      var n;
      function pg(n) {
        return n.reduce((e, t) => e.concat(t instanceof Ea ? t.errors : t), []);
      }
      _e.EMPTY = (((n = new _e()).closed = !0), n);
      const ba =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class Ce extends _e {
        constructor(e, t, r) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = va;
              break;
            case 1:
              if (!e) {
                this.destination = va;
                break;
              }
              if ("object" == typeof e) {
                e instanceof Ce
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new gg(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new gg(this, e, t, r));
          }
        }
        [ba]() {
          return this;
        }
        static create(e, t, r) {
          const i = new Ce(e, t, r);
          return (i.syncErrorThrowable = !1), i;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: e } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = e),
            this
          );
        }
      }
      class gg extends Ce {
        constructor(e, t, r, i) {
          super(), (this._parentSubscriber = e);
          let s,
            o = this;
          zn(t)
            ? (s = t)
            : t &&
              ((s = t.next),
              (r = t.error),
              (i = t.complete),
              t !== va &&
                ((o = Object.create(t)),
                zn(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = s),
            (this._error = r),
            (this._complete = i);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: t } = this;
            sn.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this,
              { useDeprecatedSynchronousErrorHandling: r } = sn;
            if (this._error)
              r && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (t.syncErrorThrowable)
              r ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : Ei(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), r)) throw e;
              Ei(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const t = () => this._complete.call(this._context);
              sn.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                : (this.__tryOrUnsub(t), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, t) {
          try {
            e.call(this._context, t);
          } catch (r) {
            if ((this.unsubscribe(), sn.useDeprecatedSynchronousErrorHandling))
              throw r;
            Ei(r);
          }
        }
        __tryOrSetError(e, t, r) {
          if (!sn.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            t.call(this._context, r);
          } catch (i) {
            return sn.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = i), (e.syncErrorThrown = !0), !0)
              : (Ei(i), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const Us =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Da(n) {
        return n;
      }
      let ae = (() => {
        class n {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(t) {
            const r = new n();
            return (r.source = this), (r.operator = t), r;
          }
          subscribe(t, r, i) {
            const { operator: s } = this,
              o = (function (n, e, t) {
                if (n) {
                  if (n instanceof Ce) return n;
                  if (n[ba]) return n[ba]();
                }
                return n || e || t ? new Ce(n, e, t) : new Ce(va);
              })(t, r, i);
            if (
              (o.add(
                s
                  ? s.call(o, this.source)
                  : this.source ||
                    (sn.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              sn.useDeprecatedSynchronousErrorHandling &&
                o.syncErrorThrowable &&
                ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (r) {
              sn.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = r)),
                (function (n) {
                  for (; n; ) {
                    const { closed: e, destination: t, isStopped: r } = n;
                    if (e || r) return !1;
                    n = t && t instanceof Ce ? t : null;
                  }
                  return !0;
                })(t)
                  ? t.error(r)
                  : console.warn(r);
            }
          }
          forEach(t, r) {
            return new (r = yg(r))((i, s) => {
              let o;
              o = this.subscribe(
                (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    s(l), o && o.unsubscribe();
                  }
                },
                s,
                i
              );
            });
          }
          _subscribe(t) {
            const { source: r } = this;
            return r && r.subscribe(t);
          }
          [Us]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (function (n) {
                  return 0 === n.length
                    ? Da
                    : 1 === n.length
                    ? n[0]
                    : function (t) {
                        return n.reduce((r, i) => i(r), t);
                      };
                })(t)(this);
          }
          toPromise(t) {
            return new (t = yg(t))((r, i) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => i(o),
                () => r(s)
              );
            });
          }
        }
        return (n.create = (e) => new n(e)), n;
      })();
      function yg(n) {
        if ((n || (n = sn.Promise || Promise), !n))
          throw new Error("no Promise impl found");
        return n;
      }
      const bi = (() => {
        function n() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (n.prototype = Object.create(Error.prototype)), n;
      })();
      class DS extends _e {
        constructor(e, t) {
          super(),
            (this.subject = e),
            (this.subscriber = t),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !t || 0 === t.length || e.isStopped || e.closed)
          )
            return;
          const r = t.indexOf(this.subscriber);
          -1 !== r && t.splice(r, 1);
        }
      }
      class _g extends Ce {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let jt = (() => {
        class n extends ae {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [ba]() {
            return new _g(this);
          }
          lift(t) {
            const r = new Cg(this, this);
            return (r.operator = t), r;
          }
          next(t) {
            if (this.closed) throw new bi();
            if (!this.isStopped) {
              const { observers: r } = this,
                i = r.length,
                s = r.slice();
              for (let o = 0; o < i; o++) s[o].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new bi();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: r } = this,
              i = r.length,
              s = r.slice();
            for (let o = 0; o < i; o++) s[o].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new bi();
            this.isStopped = !0;
            const { observers: t } = this,
              r = t.length,
              i = t.slice();
            for (let s = 0; s < r; s++) i[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new bi();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new bi();
            return this.hasError
              ? (t.error(this.thrownError), _e.EMPTY)
              : this.isStopped
              ? (t.complete(), _e.EMPTY)
              : (this.observers.push(t), new DS(this, t));
          }
          asObservable() {
            const t = new ae();
            return (t.source = this), t;
          }
        }
        return (n.create = (e, t) => new Cg(e, t)), n;
      })();
      class Cg extends jt {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          const { destination: t } = this;
          t && t.next && t.next(e);
        }
        error(e) {
          const { destination: t } = this;
          t && t.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: t } = this;
          return t ? this.source.subscribe(e) : _e.EMPTY;
        }
      }
      function Di(n) {
        return n && "function" == typeof n.schedule;
      }
      function te(n, e) {
        return function (r) {
          if ("function" != typeof n)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return r.lift(new wS(n, e));
        };
      }
      class wS {
        constructor(e, t) {
          (this.project = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new SS(e, this.project, this.thisArg));
        }
      }
      class SS extends Ce {
        constructor(e, t, r) {
          super(e),
            (this.project = t),
            (this.count = 0),
            (this.thisArg = r || this);
        }
        _next(e) {
          let t;
          try {
            t = this.project.call(this.thisArg, e, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(t);
        }
      }
      const vg = (n) => (e) => {
          for (let t = 0, r = n.length; t < r && !e.closed; t++) e.next(n[t]);
          e.complete();
        },
        wa =
          "function" == typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : "@@iterator",
        Eg = (n) => n && "number" == typeof n.length && "function" != typeof n;
      function bg(n) {
        return (
          !!n && "function" != typeof n.subscribe && "function" == typeof n.then
        );
      }
      const cc = (n) => {
        if (n && "function" == typeof n[Us])
          return ((n) => (e) => {
            const t = n[Us]();
            if ("function" != typeof t.subscribe)
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            return t.subscribe(e);
          })(n);
        if (Eg(n)) return vg(n);
        if (bg(n))
          return ((n) => (e) => (
            n
              .then(
                (t) => {
                  e.closed || (e.next(t), e.complete());
                },
                (t) => e.error(t)
              )
              .then(null, Ei),
            e
          ))(n);
        if (n && "function" == typeof n[wa])
          return ((n) => (e) => {
            const t = n[wa]();
            for (;;) {
              let r;
              try {
                r = t.next();
              } catch (i) {
                return e.error(i), e;
              }
              if (r.done) {
                e.complete();
                break;
              }
              if ((e.next(r.value), e.closed)) break;
            }
            return (
              "function" == typeof t.return &&
                e.add(() => {
                  t.return && t.return();
                }),
              e
            );
          })(n);
        {
          const t = `You provided ${
            uc(n) ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`;
          throw new TypeError(t);
        }
      };
      function dc(n, e) {
        return new ae((t) => {
          const r = new _e();
          let i = 0;
          return (
            r.add(
              e.schedule(function () {
                i !== n.length
                  ? (t.next(n[i++]), t.closed || r.add(this.schedule()))
                  : t.complete();
              })
            ),
            r
          );
        });
      }
      function Ye(n, e) {
        return e
          ? (function (n, e) {
              if (null != n) {
                if (
                  (function (n) {
                    return n && "function" == typeof n[Us];
                  })(n)
                )
                  return (function (n, e) {
                    return new ae((t) => {
                      const r = new _e();
                      return (
                        r.add(
                          e.schedule(() => {
                            const i = n[Us]();
                            r.add(
                              i.subscribe({
                                next(s) {
                                  r.add(e.schedule(() => t.next(s)));
                                },
                                error(s) {
                                  r.add(e.schedule(() => t.error(s)));
                                },
                                complete() {
                                  r.add(e.schedule(() => t.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(n, e);
                if (bg(n))
                  return (function (n, e) {
                    return new ae((t) => {
                      const r = new _e();
                      return (
                        r.add(
                          e.schedule(() =>
                            n.then(
                              (i) => {
                                r.add(
                                  e.schedule(() => {
                                    t.next(i),
                                      r.add(e.schedule(() => t.complete()));
                                  })
                                );
                              },
                              (i) => {
                                r.add(e.schedule(() => t.error(i)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(n, e);
                if (Eg(n)) return dc(n, e);
                if (
                  (function (n) {
                    return n && "function" == typeof n[wa];
                  })(n) ||
                  "string" == typeof n
                )
                  return (function (n, e) {
                    if (!n) throw new Error("Iterable cannot be null");
                    return new ae((t) => {
                      const r = new _e();
                      let i;
                      return (
                        r.add(() => {
                          i && "function" == typeof i.return && i.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (i = n[wa]()),
                              r.add(
                                e.schedule(function () {
                                  if (t.closed) return;
                                  let s, o;
                                  try {
                                    const a = i.next();
                                    (s = a.value), (o = a.done);
                                  } catch (a) {
                                    return void t.error(a);
                                  }
                                  o
                                    ? t.complete()
                                    : (t.next(s), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(n, e);
              }
              throw new TypeError(
                ((null !== n && typeof n) || n) + " is not observable"
              );
            })(n, e)
          : n instanceof ae
          ? n
          : new ae(cc(n));
      }
      class $s extends Ce {
        constructor(e) {
          super(), (this.parent = e);
        }
        _next(e) {
          this.parent.notifyNext(e);
        }
        _error(e) {
          this.parent.notifyError(e), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class Gs extends Ce {
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyError(e) {
          this.destination.error(e);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function qs(n, e) {
        if (e.closed) return;
        if (n instanceof ae) return n.subscribe(e);
        let t;
        try {
          t = cc(n)(e);
        } catch (r) {
          e.error(r);
        }
        return t;
      }
      function Je(n, e, t = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                Je((i, s) => Ye(n(i, s)).pipe(te((o, a) => e(i, o, s, a))), t)
              )
          : ("number" == typeof e && (t = e), (r) => r.lift(new kS(n, t)));
      }
      class kS {
        constructor(e, t = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = t);
        }
        call(e, t) {
          return t.subscribe(new VS(e, this.project, this.concurrent));
        }
      }
      class VS extends Gs {
        constructor(e, t, r = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = t),
            (this.concurrent = r),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let t;
          const r = this.index++;
          try {
            t = this.project(e, r);
          } catch (i) {
            return void this.destination.error(i);
          }
          this.active++, this._innerSub(t);
        }
        _innerSub(e) {
          const t = new $s(this),
            r = this.destination;
          r.add(t);
          const i = qs(e, t);
          i !== t && r.add(i);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyComplete() {
          const e = this.buffer;
          this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function Ws(n = Number.POSITIVE_INFINITY) {
        return Je(Da, n);
      }
      function fc(n, e) {
        return e ? dc(n, e) : new ae(vg(n));
      }
      function hc() {
        return function (e) {
          return e.lift(new jS(e));
        };
      }
      class jS {
        constructor(e) {
          this.connectable = e;
        }
        call(e, t) {
          const { connectable: r } = this;
          r._refCount++;
          const i = new BS(e, r),
            s = t.subscribe(i);
          return i.closed || (i.connection = r.connect()), s;
        }
      }
      class BS extends Ce {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const t = e._refCount;
          if (t <= 0) return void (this.connection = null);
          if (((e._refCount = t - 1), t > 1))
            return void (this.connection = null);
          const { connection: r } = this,
            i = e._connection;
          (this.connection = null), i && (!r || i === r) && i.unsubscribe();
        }
      }
      class Dg extends ae {
        constructor(e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let e = this._connection;
          return (
            e ||
              ((this._isComplete = !1),
              (e = this._connection = new _e()),
              e.add(this.source.subscribe(new US(this.getSubject(), this))),
              e.closed && ((this._connection = null), (e = _e.EMPTY))),
            e
          );
        }
        refCount() {
          return hc()(this);
        }
      }
      const HS = (() => {
        const n = Dg.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: n._subscribe },
          _isComplete: { value: n._isComplete, writable: !0 },
          getSubject: { value: n.getSubject },
          connect: { value: n.connect },
          refCount: { value: n.refCount },
        };
      })();
      class US extends _g {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const t = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              t && t.unsubscribe();
          }
        }
      }
      function WS() {
        return new jt();
      }
      function ne(n) {
        for (let e in n) if (n[e] === ne) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function z(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(z).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const e = n.toString();
        if (null == e) return "" + e;
        const t = e.indexOf("\n");
        return -1 === t ? e : e.substring(0, t);
      }
      function gc(n, e) {
        return null == n || "" === n
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? n
          : n + " " + e;
      }
      const QS = ne({ __forward_ref__: ne });
      function fe(n) {
        return (
          (n.__forward_ref__ = fe),
          (n.toString = function () {
            return z(this());
          }),
          n
        );
      }
      function I(n) {
        return (function (n) {
          return (
            "function" == typeof n &&
            n.hasOwnProperty(QS) &&
            n.__forward_ref__ === fe
          );
        })(n)
          ? n()
          : n;
      }
      class Hr extends Error {
        constructor(e, t) {
          super(
            (function (n, e) {
              return `${n ? `NG0${n}: ` : ""}${e}`;
            })(e, t)
          ),
            (this.code = e);
        }
      }
      function $(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function dt(n) {
        return "function" == typeof n
          ? n.name || n.toString()
          : "object" == typeof n && null != n && "function" == typeof n.type
          ? n.type.name || n.type.toString()
          : $(n);
      }
      function Sa(n, e) {
        const t = e ? ` in ${e}` : "";
        throw new Hr("201", `No provider for ${dt(n)} found${t}`);
      }
      function At(n, e) {
        null == n &&
          (function (n, e, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == r ? "" : ` [Expected=> ${t} ${r} ${e} <=Actual]`)
            );
          })(e, n, null, "!=");
      }
      function P(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function Be(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function Kn(n) {
        return Sg(n, Ta) || Sg(n, Ag);
      }
      function Sg(n, e) {
        return n.hasOwnProperty(e) ? n[e] : null;
      }
      function Tg(n) {
        return n && (n.hasOwnProperty(yc) || n.hasOwnProperty(tT))
          ? n[yc]
          : null;
      }
      const Ta = ne({ ɵprov: ne }),
        yc = ne({ ɵinj: ne }),
        Ag = ne({ ngInjectableDef: ne }),
        tT = ne({ ngInjectorDef: ne });
      var x = (() => (
        ((x = x || {})[(x.Default = 0)] = "Default"),
        (x[(x.Host = 1)] = "Host"),
        (x[(x.Self = 2)] = "Self"),
        (x[(x.SkipSelf = 4)] = "SkipSelf"),
        (x[(x.Optional = 8)] = "Optional"),
        x
      ))();
      let _c;
      function mr(n) {
        const e = _c;
        return (_c = n), e;
      }
      function Mg(n, e, t) {
        const r = Kn(n);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & x.Optional
          ? null
          : void 0 !== e
          ? e
          : void Sa(z(n), "Injector");
      }
      function yr(n) {
        return { toString: n }.toString();
      }
      var Bt = (() => (
          ((Bt = Bt || {})[(Bt.OnPush = 0)] = "OnPush"),
          (Bt[(Bt.Default = 1)] = "Default"),
          Bt
        ))(),
        Oe = (() => (
          ((Oe = Oe || {})[(Oe.Emulated = 0)] = "Emulated"),
          (Oe[(Oe.None = 2)] = "None"),
          (Oe[(Oe.ShadowDom = 3)] = "ShadowDom"),
          Oe
        ))();
      const rT = "undefined" != typeof globalThis && globalThis,
        iT = "undefined" != typeof window && window,
        sT =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        re = rT || ("undefined" != typeof global && global) || iT || sT,
        wi = {},
        le = [],
        Aa = ne({ ɵcmp: ne }),
        Cc = ne({ ɵdir: ne }),
        vc = ne({ ɵpipe: ne }),
        Ig = ne({ ɵmod: ne }),
        oT = ne({ ɵloc: ne }),
        Yn = ne({ ɵfac: ne }),
        zs = ne({ __NG_ELEMENT_ID__: ne });
      let aT = 0;
      function Si(n) {
        return yr(() => {
          const t = {},
            r = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === Bt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: n.selectors || le,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || Oe.Emulated,
              id: "c",
              styles: n.styles || le,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            i = n.directives,
            s = n.features,
            o = n.pipes;
          return (
            (r.id += aT++),
            (r.inputs = Rg(n.inputs, t)),
            (r.outputs = Rg(n.outputs)),
            s && s.forEach((a) => a(r)),
            (r.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Pg)
              : null),
            (r.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Ng)
              : null),
            r
          );
        });
      }
      function Pg(n) {
        return (
          ft(n) ||
          (function (n) {
            return n[Cc] || null;
          })(n)
        );
      }
      function Ng(n) {
        return (function (n) {
          return n[vc] || null;
        })(n);
      }
      const xg = {};
      function Ze(n) {
        return yr(() => {
          const e = {
            type: n.type,
            bootstrap: n.bootstrap || le,
            declarations: n.declarations || le,
            imports: n.imports || le,
            exports: n.exports || le,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null,
          };
          return null != n.id && (xg[n.id] = n.type), e;
        });
      }
      function Rg(n, e) {
        if (null == n) return wi;
        const t = {};
        for (const r in n)
          if (n.hasOwnProperty(r)) {
            let i = n[r],
              s = i;
            Array.isArray(i) && ((s = i[1]), (i = i[0])),
              (t[i] = r),
              e && (e[i] = s);
          }
        return t;
      }
      const O = Si;
      function Et(n) {
        return {
          type: n.type,
          name: n.name,
          factory: null,
          pure: !1 !== n.pure,
          onDestroy: n.type.prototype.ngOnDestroy || null,
        };
      }
      function ft(n) {
        return n[Aa] || null;
      }
      function Ht(n, e) {
        const t = n[Ig] || null;
        if (!t && !0 === e)
          throw new Error(`Type ${z(n)} does not have '\u0275mod' property.`);
        return t;
      }
      const q = 11;
      function Tn(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function an(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function Dc(n) {
        return 0 != (8 & n.flags);
      }
      function Na(n) {
        return 2 == (2 & n.flags);
      }
      function xa(n) {
        return 1 == (1 & n.flags);
      }
      function ln(n) {
        return null !== n.template;
      }
      function pT(n) {
        return 0 != (512 & n[2]);
      }
      function Wr(n, e) {
        return n.hasOwnProperty(Yn) ? n[Yn] : null;
      }
      class Fg {
        constructor(e, t, r) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Xe() {
        return kg;
      }
      function kg(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = _T), yT;
      }
      function yT() {
        const n = Lg(this),
          e = null == n ? void 0 : n.current;
        if (e) {
          const t = n.previous;
          if (t === wi) n.previous = e;
          else for (let r in e) t[r] = e[r];
          (n.current = null), this.ngOnChanges(e);
        }
      }
      function _T(n, e, t, r) {
        const i =
            Lg(n) ||
            (function (n, e) {
              return (n[Vg] = e);
            })(n, { previous: wi, current: null }),
          s = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[t],
          l = o[a];
        (s[a] = new Fg(l && l.currentValue, e, o === wi)), (n[r] = e);
      }
      Xe.ngInherit = !0;
      const Vg = "__ngSimpleChanges__";
      function Lg(n) {
        return n[Vg] || null;
      }
      let Tc;
      function Te(n) {
        return !!n.listen;
      }
      const Hg = {
        createRenderer: (n, e) =>
          void 0 !== Tc
            ? Tc
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Fe(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function Ra(n, e) {
        return Fe(e[n]);
      }
      function Gt(n, e) {
        return Fe(e[n.index]);
      }
      function Mc(n, e) {
        return n.data[e];
      }
      function Pi(n, e) {
        return n[e];
      }
      function It(n, e) {
        const t = e[n];
        return Tn(t) ? t : t[0];
      }
      function Ug(n) {
        return 4 == (4 & n[2]);
      }
      function Ic(n) {
        return 128 == (128 & n[2]);
      }
      function Cr(n, e) {
        return null == e ? null : n[e];
      }
      function $g(n) {
        n[18] = 0;
      }
      function Pc(n, e) {
        n[5] += e;
        let t = n,
          r = n[3];
        for (
          ;
          null !== r && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5]));

        )
          (r[5] += e), (t = r), (r = r[3]);
      }
      const V = {
        lFrame: Jg(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Gg() {
        return V.bindingsEnabled;
      }
      function C() {
        return V.lFrame.lView;
      }
      function Z() {
        return V.lFrame.tView;
      }
      function An(n) {
        return (V.lFrame.contextLView = n), n[8];
      }
      function He() {
        let n = qg();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function qg() {
        return V.lFrame.currentTNode;
      }
      function Mn(n, e) {
        const t = V.lFrame;
        (t.currentTNode = n), (t.isParent = e);
      }
      function Nc() {
        return V.lFrame.isParent;
      }
      function xc() {
        V.lFrame.isParent = !1;
      }
      function Oa() {
        return V.isInCheckNoChangesMode;
      }
      function Fa(n) {
        V.isInCheckNoChangesMode = n;
      }
      function Ni() {
        return V.lFrame.bindingIndex++;
      }
      function RT(n, e) {
        const t = V.lFrame;
        (t.bindingIndex = t.bindingRootIndex = n), Rc(e);
      }
      function Rc(n) {
        V.lFrame.currentDirectiveIndex = n;
      }
      function Qg() {
        return V.lFrame.currentQueryIndex;
      }
      function Fc(n) {
        V.lFrame.currentQueryIndex = n;
      }
      function FT(n) {
        const e = n[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null;
      }
      function Kg(n, e, t) {
        if (t & x.SkipSelf) {
          let i = e,
            s = n;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              t & x.Host ||
              ((i = FT(s)), null === i || ((s = s[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (e = i), (n = s);
        }
        const r = (V.lFrame = Yg());
        return (r.currentTNode = e), (r.lView = n), !0;
      }
      function ka(n) {
        const e = Yg(),
          t = n[1];
        (V.lFrame = e),
          (e.currentTNode = t.firstChild),
          (e.lView = n),
          (e.tView = t),
          (e.contextLView = n),
          (e.bindingIndex = t.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Yg() {
        const n = V.lFrame,
          e = null === n ? null : n.child;
        return null === e ? Jg(n) : e;
      }
      function Jg(n) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = e), e;
      }
      function Zg() {
        const n = V.lFrame;
        return (
          (V.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const Xg = Zg;
      function Va() {
        const n = Zg();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function pt() {
        return V.lFrame.selectedIndex;
      }
      function vr(n) {
        V.lFrame.selectedIndex = n;
      }
      function Ae() {
        const n = V.lFrame;
        return Mc(n.tView, n.selectedIndex);
      }
      function La(n, e) {
        for (let t = e.directiveStart, r = e.directiveEnd; t < r; t++) {
          const s = n.data[t].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = s;
          o && (n.contentHooks || (n.contentHooks = [])).push(-t, o),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(t, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
            u &&
              ((n.viewHooks || (n.viewHooks = [])).push(t, u),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, u)),
            null != c && (n.destroyHooks || (n.destroyHooks = [])).push(t, c);
        }
      }
      function ja(n, e, t) {
        em(n, e, 3, t);
      }
      function Ba(n, e, t, r) {
        (3 & n[2]) === t && em(n, e, t, r);
      }
      function kc(n, e) {
        let t = n[2];
        (3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t));
      }
      function em(n, e, t, r) {
        const s = null != r ? r : -1,
          o = e.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & n[18] : 0; l < o; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != r && a >= r)) break;
          } else
            e[l] < 0 && (n[18] += 65536),
              (a < s || -1 == s) &&
                (GT(n, t, e, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function GT(n, e, t, r) {
        const i = t[r] < 0,
          s = t[r + 1],
          a = n[i ? -t[r] : t[r]];
        if (i) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
            n[2] += 2048;
            try {
              s.call(a);
            } finally {
            }
          }
        } else
          try {
            s.call(a);
          } finally {
          }
      }
      class Zs {
        constructor(e, t, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r);
        }
      }
      function Ha(n, e, t) {
        const r = Te(n);
        let i = 0;
        for (; i < t.length; ) {
          const s = t[i];
          if ("number" == typeof s) {
            if (0 !== s) break;
            i++;
            const o = t[i++],
              a = t[i++],
              l = t[i++];
            r ? n.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = s,
              a = t[++i];
            Lc(o)
              ? r && n.setProperty(e, o, a)
              : r
              ? n.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              i++;
          }
        }
        return i;
      }
      function tm(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function Lc(n) {
        return 64 === n.charCodeAt(0);
      }
      function Ua(n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice();
          else {
            let t = -1;
            for (let r = 0; r < e.length; r++) {
              const i = e[r];
              "number" == typeof i
                ? (t = i)
                : 0 === t ||
                  nm(n, t, i, null, -1 === t || 2 === t ? e[++r] : null);
            }
          }
        return n;
      }
      function nm(n, e, t, r, i) {
        let s = 0,
          o = n.length;
        if (-1 === e) o = -1;
        else
          for (; s < n.length; ) {
            const a = n[s++];
            if ("number" == typeof a) {
              if (a === e) {
                o = -1;
                break;
              }
              if (a > e) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < n.length; ) {
          const a = n[s];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === r) return void (null !== i && (n[s + 1] = i));
            if (r === n[s + 1]) return void (n[s + 2] = i);
          }
          s++, null !== r && s++, null !== i && s++;
        }
        -1 !== o && (n.splice(o, 0, e), (s = o + 1)),
          n.splice(s++, 0, t),
          null !== r && n.splice(s++, 0, r),
          null !== i && n.splice(s++, 0, i);
      }
      function rm(n) {
        return -1 !== n;
      }
      function xi(n) {
        return 32767 & n;
      }
      function Ri(n, e) {
        let t = (function (n) {
            return n >> 16;
          })(n),
          r = e;
        for (; t > 0; ) (r = r[15]), t--;
        return r;
      }
      let jc = !0;
      function $a(n) {
        const e = jc;
        return (jc = n), e;
      }
      let YT = 0;
      function eo(n, e) {
        const t = Hc(n, e);
        if (-1 !== t) return t;
        const r = e[1];
        r.firstCreatePass &&
          ((n.injectorIndex = e.length),
          Bc(r.data, n),
          Bc(e, null),
          Bc(r.blueprint, null));
        const i = Ga(n, e),
          s = n.injectorIndex;
        if (rm(i)) {
          const o = xi(i),
            a = Ri(i, e),
            l = a[1].data;
          for (let u = 0; u < 8; u++) e[s + u] = a[o + u] | l[o + u];
        }
        return (e[s + 8] = i), s;
      }
      function Bc(n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Hc(n, e) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === e[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function Ga(n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let t = 0,
          r = null,
          i = e;
        for (; null !== i; ) {
          const s = i[1],
            o = s.type;
          if (((r = 2 === o ? s.declTNode : 1 === o ? i[6] : null), null === r))
            return -1;
          if ((t++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16);
        }
        return -1;
      }
      function qa(n, e, t) {
        !(function (n, e, t) {
          let r;
          "string" == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(zs) && (r = t[zs]),
            null == r && (r = t[zs] = YT++);
          const i = 255 & r;
          e.data[n + (i >> 5)] |= 1 << i;
        })(n, e, t);
      }
      function om(n, e, t) {
        if (t & x.Optional) return n;
        Sa(e, "NodeInjector");
      }
      function am(n, e, t, r) {
        if (
          (t & x.Optional && void 0 === r && (r = null),
          0 == (t & (x.Self | x.Host)))
        ) {
          const i = n[9],
            s = mr(void 0);
          try {
            return i ? i.get(e, r, t & x.Optional) : Mg(e, r, t & x.Optional);
          } finally {
            mr(s);
          }
        }
        return om(r, e, t);
      }
      function lm(n, e, t, r = x.Default, i) {
        if (null !== n) {
          const s = (function (n) {
            if ("string" == typeof n) return n.charCodeAt(0) || 0;
            const e = n.hasOwnProperty(zs) ? n[zs] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : XT) : e;
          })(t);
          if ("function" == typeof s) {
            if (!Kg(e, n, r)) return r & x.Host ? om(i, t, r) : am(e, t, r, i);
            try {
              const o = s(r);
              if (null != o || r & x.Optional) return o;
              Sa(t);
            } finally {
              Xg();
            }
          } else if ("number" == typeof s) {
            let o = null,
              a = Hc(n, e),
              l = -1,
              u = r & x.Host ? e[16][6] : null;
            for (
              (-1 === a || r & x.SkipSelf) &&
              ((l = -1 === a ? Ga(n, e) : e[a + 8]),
              -1 !== l && dm(r, !1)
                ? ((o = e[1]), (a = xi(l)), (e = Ri(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = e[1];
              if (cm(s, a, c.data)) {
                const d = eA(a, e, t, o, r, u);
                if (d !== um) return d;
              }
              (l = e[a + 8]),
                -1 !== l && dm(r, e[1].data[a + 8] === u) && cm(s, a, e)
                  ? ((o = c), (a = xi(l)), (e = Ri(l, e)))
                  : (a = -1);
            }
          }
        }
        return am(e, t, r, i);
      }
      const um = {};
      function XT() {
        return new Oi(He(), C());
      }
      function eA(n, e, t, r, i, s) {
        const o = e[1],
          a = o.data[n + 8],
          c = Wa(
            a,
            o,
            t,
            null == r ? Na(a) && jc : r != o && 0 != (3 & a.type),
            i & x.Host && s === a
          );
        return null !== c ? to(e, o, c, a) : um;
      }
      function Wa(n, e, t, r, i) {
        const s = n.providerIndexes,
          o = e.data,
          a = 1048575 & s,
          l = n.directiveStart,
          c = s >> 20,
          f = i ? a + c : n.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = o[h];
          if ((h < l && t === p) || (h >= l && p.type === t)) return h;
        }
        if (i) {
          const h = o[l];
          if (h && ln(h) && h.type === t) return l;
        }
        return null;
      }
      function to(n, e, t, r) {
        let i = n[t];
        const s = e.data;
        if (
          (function (n) {
            return n instanceof Zs;
          })(i)
        ) {
          const o = i;
          o.resolving &&
            (function (n, e) {
              throw new Hr(
                "200",
                `Circular dependency in DI detected for ${n}`
              );
            })(dt(s[t]));
          const a = $a(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? mr(o.injectImpl) : null;
          Kg(n, r, x.Default);
          try {
            (i = n[t] = o.factory(void 0, s, n, r)),
              e.firstCreatePass &&
                t >= r.directiveStart &&
                (function (n, e, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (r) {
                    const o = kg(e);
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(n, o),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, o);
                  }
                  i &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, i),
                    s &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, s));
                })(t, s[t], e);
          } finally {
            null !== l && mr(l), $a(a), (o.resolving = !1), Xg();
          }
        }
        return i;
      }
      function cm(n, e, t) {
        return !!(t[e + (n >> 5)] & (1 << n));
      }
      function dm(n, e) {
        return !(n & x.Self || (n & x.Host && e));
      }
      class Oi {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t, r) {
          return lm(this._tNode, this._lView, e, r, t);
        }
      }
      const ki = "__parameters__";
      function zr(n, e, t) {
        return yr(() => {
          const r = (function (n) {
            return function (...t) {
              if (n) {
                const r = n(...t);
                for (const i in r) this[i] = r[i];
              }
            };
          })(e);
          function i(...s) {
            if (this instanceof i) return r.apply(this, s), this;
            const o = new i(...s);
            return (a.annotation = o), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(ki)
                ? l[ki]
                : Object.defineProperty(l, ki, { value: [] })[ki];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(o), l;
            }
          }
          return (
            t && (i.prototype = Object.create(t.prototype)),
            (i.prototype.ngMetadataName = n),
            (i.annotationCls = i),
            i
          );
        });
      }
      class G {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = P({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const iA = new G("AnalyzeForEntryComponents"),
        za = Function;
      function Wt(n, e) {
        void 0 === e && (e = n);
        for (let t = 0; t < n.length; t++) {
          let r = n[t];
          Array.isArray(r)
            ? (e === n && (e = n.slice(0, t)), Wt(r, e))
            : e !== n && e.push(r);
        }
        return e;
      }
      function Pn(n, e) {
        n.forEach((t) => (Array.isArray(t) ? Pn(t, e) : e(t)));
      }
      function Ka(n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t);
      }
      function Qr(n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0];
      }
      function Pt(n, e, t) {
        let r = Li(n, e);
        return (
          r >= 0
            ? (n[1 | r] = t)
            : ((r = ~r),
              (function (n, e, t, r) {
                let i = n.length;
                if (i == e) n.push(t, r);
                else if (1 === i) n.push(r, n[0]), (n[0] = t);
                else {
                  for (i--, n.push(n[i - 1], n[i]); i > e; )
                    (n[i] = n[i - 2]), i--;
                  (n[e] = t), (n[e + 1] = r);
                }
              })(n, r, e, t)),
          r
        );
      }
      function Gc(n, e) {
        const t = Li(n, e);
        if (t >= 0) return n[1 | t];
      }
      function Li(n, e) {
        return (function (n, e, t) {
          let r = 0,
            i = n.length >> t;
          for (; i !== r; ) {
            const s = r + ((i - r) >> 1),
              o = n[s << t];
            if (e === o) return s << t;
            o > e ? (i = s) : (r = s + 1);
          }
          return ~(i << t);
        })(n, e, 1);
      }
      const oo = {},
        Wc = "__NG_DI_FLAG__",
        ji = "ngTempTokenPath",
        pA = /\n/gm,
        zc = "__source",
        Qc = ne({ provide: String, useValue: ne });
      let ao;
      function Bi(n) {
        const e = ao;
        return (ao = n), e;
      }
      function mA(n, e = x.Default) {
        if (void 0 === ao)
          throw new Error("inject() must be called from an injection context");
        return null === ao
          ? Mg(n, void 0, e)
          : ao.get(n, e & x.Optional ? null : void 0, e);
      }
      function E(n, e = x.Default) {
        return (_c || mA)(I(n), e);
      }
      function Kr(n) {
        const e = [];
        for (let t = 0; t < n.length; t++) {
          const r = I(n[t]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let i,
              s = x.Default;
            for (let o = 0; o < r.length; o++) {
              const a = r[o],
                l = yA(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (s |= l)
                : (i = a);
            }
            e.push(E(i, s));
          } else e.push(E(r));
        }
        return e;
      }
      function lo(n, e) {
        return (n[Wc] = e), (n.prototype[Wc] = e), n;
      }
      function yA(n) {
        return n[Wc];
      }
      function ym(n, e, t, r) {
        const i = n[ji];
        throw (
          (e[zc] && i.unshift(e[zc]),
          (n.message = (function (n, e, t, r = null) {
            n =
              n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                ? n.substr(2)
                : n;
            let i = z(e);
            if (Array.isArray(e)) i = e.map(z).join(" -> ");
            else if ("object" == typeof e) {
              let s = [];
              for (let o in e)
                if (e.hasOwnProperty(o)) {
                  let a = e[o];
                  s.push(
                    o + ":" + ("string" == typeof a ? JSON.stringify(a) : z(a))
                  );
                }
              i = `{${s.join(", ")}}`;
            }
            return `${t}${r ? "(" + r + ")" : ""}[${i}]: ${n.replace(
              pA,
              "\n  "
            )}`;
          })("\n" + n.message, i, t, r)),
          (n.ngTokenPath = i),
          (n[ji] = null),
          n)
        );
      }
      const Hi = lo(
          zr("Inject", (n) => ({ token: n })),
          -1
        ),
        Dt = lo(zr("Optional"), 8),
        Dr = lo(zr("SkipSelf"), 4);
      class Yr {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Nt(n) {
        return n instanceof Yr ? n.changingThisBreaksApplicationSecurity : n;
      }
      function Nn(n, e) {
        const t = (function (n) {
          return (n instanceof Yr && n.getTypeName()) || null;
        })(n);
        if (null != t && t !== e) {
          if ("ResourceURL" === t && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${t} (see https://g.co/ng/security#xss)`
          );
        }
        return t === e;
      }
      const HA =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        UA =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var de = (() => (
        ((de = de || {})[(de.NONE = 0)] = "NONE"),
        (de[(de.HTML = 1)] = "HTML"),
        (de[(de.STYLE = 2)] = "STYLE"),
        (de[(de.SCRIPT = 3)] = "SCRIPT"),
        (de[(de.URL = 4)] = "URL"),
        (de[(de.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        de
      ))();
      function ho(n) {
        const e = (function () {
          const n = C();
          return n && n[12];
        })();
        return e
          ? e.sanitize(de.URL, n) || ""
          : Nn(n, "URL")
          ? Nt(n)
          : (function (n) {
              return (n = String(n)).match(HA) || n.match(UA)
                ? n
                : "unsafe:" + n;
            })($(n));
      }
      const km = "__ngContext__";
      function rt(n, e) {
        n[km] = e;
      }
      function rd(n) {
        const e = (function (n) {
          return n[km] || null;
        })(n);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function nl(n) {
        return n.ngOriginalError;
      }
      function cM(n, ...e) {
        n.error(...e);
      }
      class Jr {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            r = this._findContext(e),
            i = (function (n) {
              return (n && n.ngErrorLogger) || cM;
            })(e);
          i(this._console, "ERROR", e),
            t && i(this._console, "ORIGINAL ERROR", t),
            r && i(this._console, "ERROR CONTEXT", r);
        }
        _findContext(e) {
          return e
            ? (function (n) {
                return n.ngDebugContext;
              })(e) || this._findContext(nl(e))
            : null;
        }
        _findOriginalError(e) {
          let t = e && nl(e);
          for (; t && nl(t); ) t = nl(t);
          return t || null;
        }
      }
      const qm = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(re))();
      function Rn(n) {
        return n instanceof Function ? n() : n;
      }
      var xt = (() => (
        ((xt = xt || {})[(xt.Important = 1)] = "Important"),
        (xt[(xt.DashCase = 2)] = "DashCase"),
        xt
      ))();
      function od(n, e) {
        return undefined(n, e);
      }
      function mo(n) {
        const e = n[3];
        return an(e) ? e[3] : e;
      }
      function ad(n) {
        return Ym(n[13]);
      }
      function ld(n) {
        return Ym(n[4]);
      }
      function Ym(n) {
        for (; null !== n && !an(n); ) n = n[4];
        return n;
      }
      function qi(n, e, t, r, i) {
        if (null != r) {
          let s,
            o = !1;
          an(r) ? (s = r) : Tn(r) && ((o = !0), (r = r[0]));
          const a = Fe(r);
          0 === n && null !== t
            ? null == i
              ? ny(e, t, a)
              : Zr(e, t, a, i || null, !0)
            : 1 === n && null !== t
            ? Zr(e, t, a, i || null, !0)
            : 2 === n
            ? (function (n, e, t) {
                const r = il(n, e);
                r &&
                  (function (n, e, t, r) {
                    Te(n) ? n.removeChild(e, t, r) : e.removeChild(t);
                  })(n, r, e, t);
              })(e, a, o)
            : 3 === n && e.destroyNode(a),
            null != s &&
              (function (n, e, t, r, i) {
                const s = t[7];
                s !== Fe(t) && qi(e, n, r, s, i);
                for (let a = 10; a < t.length; a++) {
                  const l = t[a];
                  yo(l[1], l, n, e, r, s);
                }
              })(e, n, s, t, i);
        }
      }
      function cd(n, e, t) {
        return Te(n)
          ? n.createElement(e, t)
          : null === t
          ? n.createElement(e)
          : n.createElementNS(t, e);
      }
      function Zm(n, e) {
        const t = n[9],
          r = t.indexOf(e),
          i = e[3];
        1024 & e[2] && ((e[2] &= -1025), Pc(i, -1)), t.splice(r, 1);
      }
      function dd(n, e) {
        if (n.length <= 10) return;
        const t = 10 + e,
          r = n[t];
        if (r) {
          const i = r[17];
          null !== i && i !== n && Zm(i, r), e > 0 && (n[t - 1][4] = r[4]);
          const s = Qr(n, 10 + e);
          !(function (n, e) {
            yo(n, e, e[q], 2, null, null), (e[0] = null), (e[6] = null);
          })(r[1], r);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Xm(n, e) {
        if (!(256 & e[2])) {
          const t = e[q];
          Te(t) && t.destroyNode && yo(n, e, t, 3, null, null),
            (function (n) {
              let e = n[13];
              if (!e) return fd(n[1], n);
              for (; e; ) {
                let t = null;
                if (Tn(e)) t = e[13];
                else {
                  const r = e[10];
                  r && (t = r);
                }
                if (!t) {
                  for (; e && !e[4] && e !== n; )
                    Tn(e) && fd(e[1], e), (e = e[3]);
                  null === e && (e = n), Tn(e) && fd(e[1], e), (t = e && e[4]);
                }
                e = t;
              }
            })(e);
        }
      }
      function fd(n, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (n, e) {
              let t;
              if (null != n && null != (t = n.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const i = e[t[r]];
                  if (!(i instanceof Zs)) {
                    const s = t[r + 1];
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const a = i[s[o]],
                          l = s[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(i);
                      } finally {
                      }
                  }
                }
            })(n, e),
            (function (n, e) {
              const t = n.cleanup,
                r = e[7];
              let i = -1;
              if (null !== t)
                for (let s = 0; s < t.length - 1; s += 2)
                  if ("string" == typeof t[s]) {
                    const o = t[s + 1],
                      a = "function" == typeof o ? o(e) : Fe(e[o]),
                      l = r[(i = t[s + 2])],
                      u = t[s + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(t[s], l, u)
                      : u >= 0
                      ? r[(i = u)]()
                      : r[(i = -u)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = r[(i = t[s + 1])];
                    t[s].call(o);
                  }
              if (null !== r) {
                for (let s = i + 1; s < r.length; s++) r[s]();
                e[7] = null;
              }
            })(n, e),
            1 === e[1].type && Te(e[q]) && e[q].destroy();
          const t = e[17];
          if (null !== t && an(e[3])) {
            t !== e[3] && Zm(t, e);
            const r = e[19];
            null !== r && r.detachView(n);
          }
        }
      }
      function ey(n, e, t) {
        return (function (n, e, t) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return t[0];
          if (2 & r.flags) {
            const i = n.data[r.directiveStart].encapsulation;
            if (i === Oe.None || i === Oe.Emulated) return null;
          }
          return Gt(r, t);
        })(n, e.parent, t);
      }
      function Zr(n, e, t, r, i) {
        Te(n) ? n.insertBefore(e, t, r, i) : e.insertBefore(t, r, i);
      }
      function ny(n, e, t) {
        Te(n) ? n.appendChild(e, t) : e.appendChild(t);
      }
      function ry(n, e, t, r, i) {
        null !== r ? Zr(n, e, t, r, i) : ny(n, e, t);
      }
      function il(n, e) {
        return Te(n) ? n.parentNode(e) : e.parentNode;
      }
      let oy = function (n, e, t) {
        return 40 & n.type ? Gt(n, t) : null;
      };
      function sl(n, e, t, r) {
        const i = ey(n, r, e),
          s = e[q],
          a = (function (n, e, t) {
            return oy(n, e, t);
          })(r.parent || e[6], r, e);
        if (null != i)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) ry(s, i, t[l], a, !1);
          else ry(s, i, t, a, !1);
      }
      function ol(n, e) {
        if (null !== e) {
          const t = e.type;
          if (3 & t) return Gt(e, n);
          if (4 & t) return pd(-1, n[e.index]);
          if (8 & t) {
            const r = e.child;
            if (null !== r) return ol(n, r);
            {
              const i = n[e.index];
              return an(i) ? pd(-1, i) : Fe(i);
            }
          }
          if (32 & t) return od(e, n)() || Fe(n[e.index]);
          {
            const r = ly(n, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ol(mo(n[16]), r)
              : ol(n, e.next);
          }
        }
        return null;
      }
      function ly(n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null;
      }
      function pd(n, e) {
        const t = 10 + n + 1;
        if (t < e.length) {
          const r = e[t],
            i = r[1].firstChild;
          if (null !== i) return ol(r, i);
        }
        return e[7];
      }
      function gd(n, e, t, r, i, s, o) {
        for (; null != t; ) {
          const a = r[t.index],
            l = t.type;
          if (
            (o && 0 === e && (a && rt(Fe(a), r), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & l) gd(n, e, t.child, r, i, s, !1), qi(e, n, i, a, s);
            else if (32 & l) {
              const u = od(t, r);
              let c;
              for (; (c = u()); ) qi(e, n, i, c, s);
              qi(e, n, i, a, s);
            } else 16 & l ? cy(n, e, r, t, i, s) : qi(e, n, i, a, s);
          t = o ? t.projectionNext : t.next;
        }
      }
      function yo(n, e, t, r, i, s) {
        gd(t, r, n.firstChild, e, i, s, !1);
      }
      function cy(n, e, t, r, i, s) {
        const o = t[16],
          l = o[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) qi(e, n, i, l[u], s);
        else gd(n, e, l, o[3], i, s, !0);
      }
      function dy(n, e, t) {
        Te(n) ? n.setAttribute(e, "style", t) : (e.style.cssText = t);
      }
      function md(n, e, t) {
        Te(n)
          ? "" === t
            ? n.removeAttribute(e, "class")
            : n.setAttribute(e, "class", t)
          : (e.className = t);
      }
      function fy(n, e, t) {
        let r = n.length;
        for (;;) {
          const i = n.indexOf(e, t);
          if (-1 === i) return i;
          if (0 === i || n.charCodeAt(i - 1) <= 32) {
            const s = e.length;
            if (i + s === r || n.charCodeAt(i + s) <= 32) return i;
          }
          t = i + 1;
        }
      }
      const hy = "ng-template";
      function kM(n, e, t) {
        let r = 0;
        for (; r < n.length; ) {
          let i = n[r++];
          if (t && "class" === i) {
            if (((i = n[r]), -1 !== fy(i.toLowerCase(), e, 0))) return !0;
          } else if (1 === i) {
            for (; r < n.length && "string" == typeof (i = n[r++]); )
              if (i.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function py(n) {
        return 4 === n.type && n.value !== hy;
      }
      function VM(n, e, t) {
        return e === (4 !== n.type || t ? n.value : hy);
      }
      function LM(n, e, t) {
        let r = 4;
        const i = n.attrs || [],
          s = (function (n) {
            for (let e = 0; e < n.length; e++) if (tm(n[e])) return e;
            return n.length;
          })(i);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !VM(n, l, t)) || ("" === l && 1 === e.length))
                ) {
                  if (un(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? l : e[++a];
                if (8 & r && null !== n.attrs) {
                  if (!kM(n.attrs, u, t)) {
                    if (un(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = jM(8 & r ? "class" : l, i, py(n), t);
                if (-1 === d) {
                  if (un(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > s ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== fy(h, u, 0)) || (2 & r && u !== f)) {
                    if (un(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !un(r) && !un(l)) return !1;
            if (o && un(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return un(r) || o;
      }
      function un(n) {
        return 0 == (1 & n);
      }
      function jM(n, e, t, r) {
        if (null === e) return -1;
        let i = 0;
        if (r || !t) {
          let s = !1;
          for (; i < e.length; ) {
            const o = e[i];
            if (o === n) return i;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let a = e[++i];
                for (; "string" == typeof a; ) a = e[++i];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                i += 4;
                continue;
              }
            }
            i += s ? 1 : 2;
          }
          return -1;
        }
        return (function (n, e) {
          let t = n.indexOf(4);
          if (t > -1)
            for (t++; t < n.length; ) {
              const r = n[t];
              if ("number" == typeof r) return -1;
              if (r === e) return t;
              t++;
            }
          return -1;
        })(e, n);
      }
      function gy(n, e, t = !1) {
        for (let r = 0; r < e.length; r++) if (LM(n, e[r], t)) return !0;
        return !1;
      }
      function my(n, e) {
        return n ? ":not(" + e.trim() + ")" : e;
      }
      function GM(n) {
        let e = n[0],
          t = 1,
          r = 2,
          i = "",
          s = !1;
        for (; t < n.length; ) {
          let o = n[t];
          if ("string" == typeof o)
            if (2 & r) {
              const a = n[++t];
              i += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + o) : 4 & r && (i += " " + o);
          else
            "" !== i && !un(o) && ((e += my(s, i)), (i = "")),
              (r = o),
              (s = s || !un(r));
          t++;
        }
        return "" !== i && (e += my(s, i)), e;
      }
      const j = {};
      function ue(n) {
        yy(Z(), C(), pt() + n, Oa());
      }
      function yy(n, e, t, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const s = n.preOrderCheckHooks;
            null !== s && ja(e, s, t);
          } else {
            const s = n.preOrderHooks;
            null !== s && Ba(e, s, 0, t);
          }
        vr(t);
      }
      function al(n, e) {
        return (n << 17) | (e << 2);
      }
      function cn(n) {
        return (n >> 17) & 32767;
      }
      function yd(n) {
        return 2 | n;
      }
      function Zn(n) {
        return (131068 & n) >> 2;
      }
      function _d(n, e) {
        return (-131069 & n) | (e << 2);
      }
      function Cd(n) {
        return 1 | n;
      }
      function Ay(n, e) {
        const t = n.contentQueries;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const i = t[r],
              s = t[r + 1];
            if (-1 !== s) {
              const o = n.data[s];
              Fc(i), o.contentQueries(2, e[s], s);
            }
          }
      }
      function _o(n, e, t, r, i, s, o, a, l, u) {
        const c = e.blueprint.slice();
        return (
          (c[0] = i),
          (c[2] = 140 | r),
          $g(c),
          (c[3] = c[15] = n),
          (c[8] = t),
          (c[10] = o || (n && n[10])),
          (c[q] = a || (n && n[q])),
          (c[12] = l || (n && n[12]) || null),
          (c[9] = u || (n && n[9]) || null),
          (c[6] = s),
          (c[16] = 2 == e.type ? n[16] : c),
          c
        );
      }
      function Wi(n, e, t, r, i) {
        let s = n.data[e];
        if (null === s)
          (s = (function (n, e, t, r, i) {
            const s = qg(),
              o = Nc(),
              l = (n.data[e] = (function (n, e, t, r, i, s) {
                return {
                  type: t,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? s : s && s.parent, t, e, r, i));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(n, e, t, r, i)),
            V.lFrame.inI18n && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = t), (s.value = r), (s.attrs = i);
          const o = (function () {
            const n = V.lFrame,
              e = n.currentTNode;
            return n.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return Mn(s, !0), s;
      }
      function zi(n, e, t, r) {
        if (0 === t) return -1;
        const i = e.length;
        for (let s = 0; s < t; s++)
          e.push(r), n.blueprint.push(r), n.data.push(null);
        return i;
      }
      function Co(n, e, t) {
        ka(e);
        try {
          const r = n.viewQuery;
          null !== r && Fd(1, r, t);
          const i = n.template;
          null !== i && My(n, e, i, 1, t),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && Ay(n, e),
            n.staticViewQueries && Fd(2, n.viewQuery, t);
          const s = n.components;
          null !== s &&
            (function (n, e) {
              for (let t = 0; t < e.length; t++) DI(n, e[t]);
            })(e, s);
        } catch (r) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[2] &= -5), Va();
        }
      }
      function Qi(n, e, t, r) {
        const i = e[2];
        if (256 == (256 & i)) return;
        ka(e);
        const s = Oa();
        try {
          $g(e),
            (function (n) {
              V.lFrame.bindingIndex = n;
            })(n.bindingStartIndex),
            null !== t && My(n, e, t, 2, r);
          const o = 3 == (3 & i);
          if (!s)
            if (o) {
              const u = n.preOrderCheckHooks;
              null !== u && ja(e, u, null);
            } else {
              const u = n.preOrderHooks;
              null !== u && Ba(e, u, 0, null), kc(e, 0);
            }
          if (
            ((function (n) {
              for (let e = ad(n); null !== e; e = ld(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let r = 0; r < t.length; r++) {
                  const i = t[r],
                    s = i[3];
                  0 == (1024 & i[2]) && Pc(s, 1), (i[2] |= 1024);
                }
              }
            })(e),
            (function (n) {
              for (let e = ad(n); null !== e; e = ld(e))
                for (let t = 10; t < e.length; t++) {
                  const r = e[t],
                    i = r[1];
                  Ic(r) && Qi(i, r, i.template, r[8]);
                }
            })(e),
            null !== n.contentQueries && Ay(n, e),
            !s)
          )
            if (o) {
              const u = n.contentCheckHooks;
              null !== u && ja(e, u);
            } else {
              const u = n.contentHooks;
              null !== u && Ba(e, u, 1), kc(e, 1);
            }
          !(function (n, e) {
            const t = n.hostBindingOpCodes;
            if (null !== t)
              try {
                for (let r = 0; r < t.length; r++) {
                  const i = t[r];
                  if (i < 0) vr(~i);
                  else {
                    const s = i,
                      o = t[++r],
                      a = t[++r];
                    RT(o, s), a(2, e[s]);
                  }
                }
              } finally {
                vr(-1);
              }
          })(n, e);
          const a = n.components;
          null !== a &&
            (function (n, e) {
              for (let t = 0; t < e.length; t++) bI(n, e[t]);
            })(e, a);
          const l = n.viewQuery;
          if ((null !== l && Fd(2, l, r), !s))
            if (o) {
              const u = n.viewCheckHooks;
              null !== u && ja(e, u);
            } else {
              const u = n.viewHooks;
              null !== u && Ba(e, u, 2), kc(e, 2);
            }
          !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Pc(e[3], -1));
        } finally {
          Va();
        }
      }
      function rI(n, e, t, r) {
        const i = e[10],
          s = !Oa(),
          o = Ug(e);
        try {
          s && !o && i.begin && i.begin(), o && Co(n, e, r), Qi(n, e, t, r);
        } finally {
          s && !o && i.end && i.end();
        }
      }
      function My(n, e, t, r, i) {
        const s = pt(),
          o = 2 & r;
        try {
          vr(-1), o && e.length > 20 && yy(n, e, 20, Oa()), t(r, i);
        } finally {
          vr(s);
        }
      }
      function Iy(n, e, t) {
        if (Dc(e)) {
          const i = e.directiveEnd;
          for (let s = e.directiveStart; s < i; s++) {
            const o = n.data[s];
            o.contentQueries && o.contentQueries(1, t[s], s);
          }
        }
      }
      function Ad(n, e, t) {
        !Gg() ||
          ((function (n, e, t, r) {
            const i = t.directiveStart,
              s = t.directiveEnd;
            n.firstCreatePass || eo(t, e), rt(r, e);
            const o = t.initialInputs;
            for (let a = i; a < s; a++) {
              const l = n.data[a],
                u = ln(l);
              u && yI(e, t, l);
              const c = to(e, n, a, t);
              rt(c, e),
                null !== o && _I(0, a - i, c, l, 0, o),
                u && (It(t.index, e)[8] = c);
            }
          })(n, e, t, Gt(t, e)),
          128 == (128 & t.flags) &&
            (function (n, e, t) {
              const r = t.directiveStart,
                i = t.directiveEnd,
                o = t.index,
                a = V.lFrame.currentDirectiveIndex;
              try {
                vr(o);
                for (let l = r; l < i; l++) {
                  const u = n.data[l],
                    c = e[l];
                  Rc(l),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      Vy(u, c);
                }
              } finally {
                vr(-1), Rc(a);
              }
            })(n, e, t));
      }
      function Md(n, e, t = Gt) {
        const r = e.localNames;
        if (null !== r) {
          let i = e.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const o = r[s + 1],
              a = -1 === o ? t(e, n) : n[o];
            n[i++] = a;
          }
        }
      }
      function Py(n) {
        const e = n.tView;
        return null === e || e.incompleteFirstPass
          ? (n.tView = cl(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : e;
      }
      function cl(n, e, t, r, i, s, o, a, l, u) {
        const c = 20 + r,
          d = c + i,
          f = (function (n, e) {
            const t = [];
            for (let r = 0; r < e; r++) t.push(r < n ? null : j);
            return t;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: n,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Ry(n, e, t, r) {
        const i = $y(e);
        null === t
          ? i.push(r)
          : (i.push(t), n.firstCreatePass && Gy(n).push(r, i.length - 1));
      }
      function Oy(n, e, t) {
        for (let r in n)
          if (n.hasOwnProperty(r)) {
            const i = n[r];
            (t = null === t ? {} : t).hasOwnProperty(r)
              ? t[r].push(e, i)
              : (t[r] = [e, i]);
          }
        return t;
      }
      function Id(n, e, t, r) {
        let i = !1;
        if (Gg()) {
          const s = (function (n, e, t) {
              const r = n.directiveRegistry;
              let i = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s];
                  gy(t, o.selectors, !1) &&
                    (i || (i = []),
                    qa(eo(t, e), n, o.type),
                    ln(o) ? (Ly(n, t), i.unshift(o)) : i.push(o));
                }
              return i;
            })(n, e, t),
            o = null === r ? null : { "": -1 };
          if (null !== s) {
            (i = !0), jy(t, n.data.length, s.length);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = zi(n, e, s.length, null);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              (t.mergedAttrs = Ua(t.mergedAttrs, d.hostAttrs)),
                By(n, t, e, u, d),
                mI(u, d, o),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (l = !0)),
                u++;
            }
            !(function (n, e) {
              const r = e.directiveEnd,
                i = n.data,
                s = e.attrs,
                o = [];
              let a = null,
                l = null;
              for (let u = e.directiveStart; u < r; u++) {
                const c = i[u],
                  d = c.inputs,
                  f = null === s || py(e) ? null : CI(d, s);
                o.push(f), (a = Oy(d, u, a)), (l = Oy(c.outputs, u, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = l);
            })(n, t);
          }
          o &&
            (function (n, e, t) {
              if (e) {
                const r = (n.localNames = []);
                for (let i = 0; i < e.length; i += 2) {
                  const s = t[e[i + 1]];
                  if (null == s)
                    throw new Hr(
                      "301",
                      `Export of name '${e[i + 1]}' not found!`
                    );
                  r.push(e[i], s);
                }
              }
            })(t, r, o);
        }
        return (t.mergedAttrs = Ua(t.mergedAttrs, t.attrs)), i;
      }
      function ky(n, e, t, r, i, s) {
        const o = s.hostBindings;
        if (o) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~e.index;
          (function (n) {
            let e = n.length;
            for (; e > 0; ) {
              const t = n[--e];
              if ("number" == typeof t && t < 0) return t;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, i, o);
        }
      }
      function Vy(n, e) {
        null !== n.hostBindings && n.hostBindings(1, e);
      }
      function Ly(n, e) {
        (e.flags |= 2), (n.components || (n.components = [])).push(e.index);
      }
      function mI(n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) t[e.exportAs[r]] = n;
          ln(e) && (t[""] = n);
        }
      }
      function jy(n, e, t) {
        (n.flags |= 1),
          (n.directiveStart = e),
          (n.directiveEnd = e + t),
          (n.providerIndexes = e);
      }
      function By(n, e, t, r, i) {
        n.data[r] = i;
        const s = i.factory || (i.factory = Wr(i.type)),
          o = new Zs(s, ln(i), null);
        (n.blueprint[r] = o),
          (t[r] = o),
          ky(n, e, 0, r, zi(n, t, i.hostVars, j), i);
      }
      function yI(n, e, t) {
        const r = Gt(e, n),
          i = Py(t),
          s = n[10],
          o = dl(
            n,
            _o(
              n,
              i,
              null,
              t.onPush ? 64 : 16,
              r,
              e,
              s,
              s.createRenderer(r, t),
              null,
              null
            )
          );
        n[e.index] = o;
      }
      function On(n, e, t, r, i, s) {
        const o = Gt(n, e);
        !(function (n, e, t, r, i, s, o) {
          if (null == s)
            Te(n) ? n.removeAttribute(e, i, t) : e.removeAttribute(i);
          else {
            const a = null == o ? $(s) : o(s, r || "", i);
            Te(n)
              ? n.setAttribute(e, i, a, t)
              : t
              ? e.setAttributeNS(t, i, a)
              : e.setAttribute(i, a);
          }
        })(e[q], o, s, n.value, t, r, i);
      }
      function _I(n, e, t, r, i, s) {
        const o = s[e];
        if (null !== o) {
          const a = r.setInput;
          for (let l = 0; l < o.length; ) {
            const u = o[l++],
              c = o[l++],
              d = o[l++];
            null !== a ? r.setInput(t, d, u, c) : (t[c] = d);
          }
        }
      }
      function CI(n, e) {
        let t = null,
          r = 0;
        for (; r < e.length; ) {
          const i = e[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              n.hasOwnProperty(i) &&
                (null === t && (t = []), t.push(i, n[i], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return t;
      }
      function Hy(n, e, t, r) {
        return new Array(n, !0, !1, e, null, 0, r, t, null, null);
      }
      function bI(n, e) {
        const t = It(e, n);
        if (Ic(t)) {
          const r = t[1];
          80 & t[2] ? Qi(r, t, r.template, t[8]) : t[5] > 0 && Nd(t);
        }
      }
      function Nd(n) {
        for (let r = ad(n); null !== r; r = ld(r))
          for (let i = 10; i < r.length; i++) {
            const s = r[i];
            if (1024 & s[2]) {
              const o = s[1];
              Qi(o, s, o.template, s[8]);
            } else s[5] > 0 && Nd(s);
          }
        const t = n[1].components;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const i = It(t[r], n);
            Ic(i) && i[5] > 0 && Nd(i);
          }
      }
      function DI(n, e) {
        const t = It(e, n),
          r = t[1];
        (function (n, e) {
          for (let t = e.length; t < n.blueprint.length; t++)
            e.push(n.blueprint[t]);
        })(r, t),
          Co(r, t, t[8]);
      }
      function dl(n, e) {
        return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e;
      }
      function xd(n) {
        for (; n; ) {
          n[2] |= 64;
          const e = mo(n);
          if (pT(n) && !e) return n;
          n = e;
        }
        return null;
      }
      function Od(n, e, t) {
        const r = e[10];
        r.begin && r.begin();
        try {
          Qi(n, e, n.template, t);
        } catch (i) {
          throw (Wy(e, i), i);
        } finally {
          r.end && r.end();
        }
      }
      function Uy(n) {
        !(function (n) {
          for (let e = 0; e < n.components.length; e++) {
            const t = n.components[e],
              r = rd(t),
              i = r[1];
            rI(i, r, i.template, t);
          }
        })(n[8]);
      }
      function Fd(n, e, t) {
        Fc(0), e(n, t);
      }
      const MI = (() => Promise.resolve(null))();
      function $y(n) {
        return n[7] || (n[7] = []);
      }
      function Gy(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function Wy(n, e) {
        const t = n[9],
          r = t ? t.get(Jr, null) : null;
        r && r.handleError(e);
      }
      function zy(n, e, t, r, i) {
        for (let s = 0; s < t.length; ) {
          const o = t[s++],
            a = t[s++],
            l = e[o],
            u = n.data[o];
          null !== u.setInput ? u.setInput(l, i, r, a) : (l[a] = i);
        }
      }
      function er(n, e, t) {
        const r = Ra(e, n);
        !(function (n, e, t) {
          Te(n) ? n.setValue(e, t) : (e.textContent = t);
        })(n[q], r, t);
      }
      function fl(n, e, t) {
        let r = t ? n.styles : null,
          i = t ? n.classes : null,
          s = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (i = gc(i, a))
              : 2 == s && (r = gc(r, a + ": " + e[++o] + ";"));
          }
        t ? (n.styles = r) : (n.stylesWithoutHost = r),
          t ? (n.classes = i) : (n.classesWithoutHost = i);
      }
      const Ki = new G("INJECTOR", -1);
      class Qy {
        get(e, t = oo) {
          if (t === oo) {
            const r = new Error(`NullInjectorError: No provider for ${z(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return t;
        }
      }
      const vo = new G("Set Injector scope."),
        Eo = {},
        NI = {};
      let kd;
      function Ky() {
        return void 0 === kd && (kd = new Qy()), kd;
      }
      function Yy(n, e = null, t = null, r) {
        return new RI(n, t, e || Ky(), r);
      }
      class RI {
        constructor(e, t, r, i = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          t && Pn(t, (a) => this.processProvider(a, e, t)),
            Pn([e], (a) => this.processInjectorType(a, [], s)),
            this.records.set(Ki, Yi(void 0, this));
          const o = this.records.get(vo);
          (this.scope = null != o ? o.value : null),
            (this.source = i || ("object" == typeof e ? null : z(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, t = oo, r = x.Default) {
          this.assertNotDestroyed();
          const i = Bi(this),
            s = mr(void 0);
          try {
            if (!(r & x.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function (n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof G)
                    );
                  })(e) && Kn(e);
                (a = l && this.injectableDefInScope(l) ? Yi(Vd(e), Eo) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (r & x.Self ? Ky() : this.parent).get(
              e,
              (t = r & x.Optional && t === oo ? null : t)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[ji] = o[ji] || []).unshift(z(e)), i)) throw o;
              return ym(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            mr(s), Bi(i);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((r, i) => e.push(z(i))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(e, t, r) {
          if (!(e = I(e))) return !1;
          let i = Tg(e);
          const s = (null == i && e.ngModule) || void 0,
            o = void 0 === s ? e : s,
            a = -1 !== r.indexOf(o);
          if ((void 0 !== s && (i = Tg(s)), null == i)) return !1;
          if (null != i.imports && !a) {
            let c;
            r.push(o);
            try {
              Pn(i.imports, (d) => {
                this.processInjectorType(d, t, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                Pn(h, (p) => this.processProvider(p, f, h || le));
              }
          }
          this.injectorDefTypes.add(o);
          const l = Wr(o) || (() => new o());
          this.records.set(o, Yi(l, Eo));
          const u = i.providers;
          if (null != u && !a) {
            const c = e;
            Pn(u, (d) => this.processProvider(d, c, u));
          }
          return void 0 !== s && void 0 !== e.providers;
        }
        processProvider(e, t, r) {
          let i = Ji((e = I(e))) ? e : I(e && e.provide);
          const s = (function (n, e, t) {
            return Zy(n)
              ? Yi(void 0, n.useValue)
              : Yi(
                  (function (n, e, t) {
                    let r;
                    if (Ji(n)) {
                      const i = I(n);
                      return Wr(i) || Vd(i);
                    }
                    if (Zy(n)) r = () => I(n.useValue);
                    else if (
                      (function (n) {
                        return !(!n || !n.useFactory);
                      })(n)
                    )
                      r = () => n.useFactory(...Kr(n.deps || []));
                    else if (
                      (function (n) {
                        return !(!n || !n.useExisting);
                      })(n)
                    )
                      r = () => E(I(n.useExisting));
                    else {
                      const i = I(n && (n.useClass || n.provide));
                      if (
                        !(function (n) {
                          return !!n.deps;
                        })(n)
                      )
                        return Wr(i) || Vd(i);
                      r = () => new i(...Kr(n.deps));
                    }
                    return r;
                  })(n),
                  Eo
                );
          })(e);
          if (Ji(e) || !0 !== e.multi) this.records.get(i);
          else {
            let o = this.records.get(i);
            o ||
              ((o = Yi(void 0, Eo, !0)),
              (o.factory = () => Kr(o.multi)),
              this.records.set(i, o)),
              (i = e),
              o.multi.push(e);
          }
          this.records.set(i, s);
        }
        hydrate(e, t) {
          return (
            t.value === Eo && ((t.value = NI), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function (n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(t.value) &&
              this.onDestroy.add(t.value),
            t.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = I(e.providedIn);
          return "string" == typeof t
            ? "any" === t || t === this.scope
            : this.injectorDefTypes.has(t);
        }
      }
      function Vd(n) {
        const e = Kn(n),
          t = null !== e ? e.factory : Wr(n);
        if (null !== t) return t;
        if (n instanceof G)
          throw new Error(`Token ${z(n)} is missing a \u0275prov definition.`);
        if (n instanceof Function)
          return (function (n) {
            const e = n.length;
            if (e > 0) {
              const r = (function (n, e) {
                const t = [];
                for (let r = 0; r < n; r++) t.push(e);
                return t;
              })(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${z(n)}: (${r.join(", ")}).`
              );
            }
            const t = (function (n) {
              const e = n && (n[Ta] || n[Ag]);
              if (e) {
                const t = (function (n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const e = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  e
                );
              }
              return null;
            })(n);
            return null !== t ? () => t.factory(n) : () => new n();
          })(n);
        throw new Error("unreachable");
      }
      function Yi(n, e, t = !1) {
        return { factory: n, value: e, multi: t ? [] : void 0 };
      }
      function Zy(n) {
        return null !== n && "object" == typeof n && Qc in n;
      }
      function Ji(n) {
        return "function" == typeof n;
      }
      const Xy = function (n, e, t) {
        return (function (n, e = null, t = null, r) {
          const i = Yy(n, e, t, r);
          return i._resolveInjectorDefTypes(), i;
        })({ name: t }, e, n, t);
      };
      let ie = (() => {
        class n {
          static create(t, r) {
            return Array.isArray(t)
              ? Xy(t, r, "")
              : Xy(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = oo),
          (n.NULL = new Qy()),
          (n.ɵprov = P({ token: n, providedIn: "any", factory: () => E(Ki) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function eP(n, e) {
        La(rd(n)[1], He());
      }
      let hl = null;
      function Zi() {
        if (!hl) {
          const n = re.Symbol;
          if (n && n.iterator) hl = n.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const r = e[t];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (hl = r);
            }
          }
        }
        return hl;
      }
      class fn {
        constructor(e) {
          this.wrapped = e;
        }
        static wrap(e) {
          return new fn(e);
        }
        static unwrap(e) {
          return fn.isWrapped(e) ? e.wrapped : e;
        }
        static isWrapped(e) {
          return e instanceof fn;
        }
      }
      function Do(n) {
        return (
          !!Gd(n) && (Array.isArray(n) || (!(n instanceof Map) && Zi() in n))
        );
      }
      function Gd(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n);
      }
      function it(n, e, t) {
        return !Object.is(n[e], t) && ((n[e] = t), !0);
      }
      function Kt(n, e, t, r) {
        const i = C();
        return it(i, Ni(), e) && (Z(), On(Ae(), i, n, e, t, r)), Kt;
      }
      function Ot(n, e, t, r, i, s, o, a) {
        const l = C(),
          u = Z(),
          c = n + 20,
          d = u.firstCreatePass
            ? (function (n, e, t, r, i, s, o, a, l) {
                const u = e.consts,
                  c = Wi(e, n, 4, o || null, Cr(u, a));
                Id(e, t, c, Cr(u, l)), La(e, c);
                const d = (c.tViews = cl(
                  2,
                  c,
                  r,
                  i,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (d.queries = e.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, e, t, r, i, s, o)
            : u.data[c];
        Mn(d, !1);
        const f = l[q].createComment("");
        sl(u, l, f, d),
          rt(f, l),
          dl(l, (l[c] = Hy(f, l, f, d))),
          xa(d) && Ad(u, l, d),
          null != o && Md(l, d, a);
      }
      function v(n, e = x.Default) {
        const t = C();
        return null === t ? E(n, e) : lm(He(), t, I(n), e);
      }
      function ye(n, e, t) {
        const r = C();
        return (
          it(r, Ni(), e) &&
            (function (n, e, t, r, i, s, o, a) {
              const l = Gt(e, t);
              let c,
                u = e.inputs;
              !a && null != u && (c = u[r])
                ? (zy(n, t, c, r, i),
                  Na(e) &&
                    (function (n, e) {
                      const t = It(e, n);
                      16 & t[2] || (t[2] |= 64);
                    })(t, e.index))
                : 3 & e.type &&
                  ((r = (function (n) {
                    return "class" === n
                      ? "className"
                      : "for" === n
                      ? "htmlFor"
                      : "formaction" === n
                      ? "formAction"
                      : "innerHtml" === n
                      ? "innerHTML"
                      : "readonly" === n
                      ? "readOnly"
                      : "tabindex" === n
                      ? "tabIndex"
                      : n;
                  })(r)),
                  (i = null != o ? o(i, e.value || "", r) : i),
                  Te(s)
                    ? s.setProperty(l, r, i)
                    : Lc(r) ||
                      (l.setProperty ? l.setProperty(r, i) : (l[r] = i)));
            })(Z(), Ae(), r, n, e, r[q], t, !1),
          ye
        );
      }
      function Kd(n, e, t, r, i) {
        const o = i ? "class" : "style";
        zy(n, t, e.inputs[o], o, r);
      }
      function A(n, e, t, r) {
        const i = C(),
          s = Z(),
          o = 20 + n,
          a = i[q],
          l = (i[o] = cd(a, e, V.lFrame.currentNamespace)),
          u = s.firstCreatePass
            ? (function (n, e, t, r, i, s, o) {
                const a = e.consts,
                  u = Wi(e, n, 2, i, Cr(a, s));
                return (
                  Id(e, t, u, Cr(a, o)),
                  null !== u.attrs && fl(u, u.attrs, !1),
                  null !== u.mergedAttrs && fl(u, u.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                );
              })(o, s, i, 0, e, t, r)
            : s.data[o];
        Mn(u, !0);
        const c = u.mergedAttrs;
        null !== c && Ha(a, l, c);
        const d = u.classes;
        null !== d && md(a, l, d);
        const f = u.styles;
        null !== f && dy(a, l, f),
          64 != (64 & u.flags) && sl(s, i, l, u),
          0 === V.lFrame.elementDepthCount && rt(l, i),
          V.lFrame.elementDepthCount++,
          xa(u) && (Ad(s, i, u), Iy(s, u, i)),
          null !== r && Md(i, u);
      }
      function M() {
        let n = He();
        Nc() ? xc() : ((n = n.parent), Mn(n, !1));
        const e = n;
        V.lFrame.elementDepthCount--;
        const t = Z();
        t.firstCreatePass && (La(t, n), Dc(n) && t.queries.elementEnd(n)),
          null != e.classesWithoutHost &&
            (function (n) {
              return 0 != (16 & n.flags);
            })(e) &&
            Kd(t, e, C(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (n) {
              return 0 != (32 & n.flags);
            })(e) &&
            Kd(t, e, C(), e.stylesWithoutHost, !1);
      }
      function kn(n, e, t, r) {
        A(n, e, t, r), M();
      }
      function nr() {
        return C();
      }
      function So(n) {
        return !!n && "function" == typeof n.then;
      }
      function L_(n) {
        return !!n && "function" == typeof n.subscribe;
      }
      const ml = L_;
      function Ee(n, e, t, r) {
        const i = C(),
          s = Z(),
          o = He();
        return (
          (function (n, e, t, r, i, s, o, a) {
            const l = xa(r),
              c = n.firstCreatePass && Gy(n),
              d = e[8],
              f = $y(e);
            let h = !0;
            if (3 & r.type || a) {
              const g = Gt(r, e),
                _ = a ? a(g) : g,
                y = f.length,
                b = a ? (D) => a(Fe(D[r.index])) : r.index;
              if (Te(t)) {
                let D = null;
                if (
                  (!a &&
                    l &&
                    (D = (function (n, e, t, r) {
                      const i = n.cleanup;
                      if (null != i)
                        for (let s = 0; s < i.length - 1; s += 2) {
                          const o = i[s];
                          if (o === t && i[s + 1] === r) {
                            const a = e[7],
                              l = i[s + 2];
                            return a.length > l ? a[l] : null;
                          }
                          "string" == typeof o && (s += 2);
                        }
                      return null;
                    })(n, e, i, r.index)),
                  null !== D)
                )
                  ((D.__ngLastListenerFn__ || D).__ngNextListenerFn__ = s),
                    (D.__ngLastListenerFn__ = s),
                    (h = !1);
                else {
                  s = Zd(r, e, d, s, !1);
                  const k = t.listen(_, i, s);
                  f.push(s, k), c && c.push(i, b, y, y + 1);
                }
              } else
                (s = Zd(r, e, d, s, !0)),
                  _.addEventListener(i, s, o),
                  f.push(s),
                  c && c.push(i, b, y, o);
            } else s = Zd(r, e, d, s, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[i])) {
              const g = m.length;
              if (g)
                for (let _ = 0; _ < g; _ += 2) {
                  const oe = e[m[_]][m[_ + 1]].subscribe(s),
                    ce = f.length;
                  f.push(s, oe), c && c.push(i, r.index, ce, -(ce + 1));
                }
            }
          })(s, i, i[q], o, n, e, !!t, r),
          Ee
        );
      }
      function H_(n, e, t, r) {
        try {
          return !1 !== t(r);
        } catch (i) {
          return Wy(n, i), !1;
        }
      }
      function Zd(n, e, t, r, i) {
        return function s(o) {
          if (o === Function) return r;
          const a = 2 & n.flags ? It(n.index, e) : e;
          0 == (32 & e[2]) && xd(a);
          let l = H_(e, 0, r, o),
            u = s.__ngNextListenerFn__;
          for (; u; ) (l = H_(e, 0, u, o) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function be(n = 1) {
        return (function (n) {
          return (V.lFrame.contextLView = (function (n, e) {
            for (; n > 0; ) (e = e[15]), n--;
            return e;
          })(n, V.lFrame.contextLView))[8];
        })(n);
      }
      function J_(n, e, t, r, i) {
        const s = n[t + 1],
          o = null === e;
        let a = r ? cn(s) : Zn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const c = n[a + 1];
          GP(n[a], e) && ((l = !0), (n[a + 1] = r ? Cd(c) : yd(c))),
            (a = r ? cn(c) : Zn(c));
        }
        l && (n[t + 1] = r ? yd(s) : Cd(s));
      }
      function GP(n, e) {
        return (
          null === n ||
          null == e ||
          (Array.isArray(n) ? n[1] : n) === e ||
          (!(!Array.isArray(n) || "string" != typeof e) && Li(n, e) >= 0)
        );
      }
      function cs(n, e, t) {
        return (
          (function (n, e, t, r) {
            const i = C(),
              s = Z(),
              o = (function (n) {
                const e = V.lFrame,
                  t = e.bindingIndex;
                return (e.bindingIndex = e.bindingIndex + n), t;
              })(2);
            s.firstUpdatePass &&
              (function (n, e, t, r) {
                const i = n.data;
                if (null === i[t + 1]) {
                  const s = i[pt()],
                    o = (function (n, e) {
                      return e >= n.expandoStartIndex;
                    })(n, t);
                  (function (n, e) {
                    return 0 != (n.flags & (e ? 16 : 32));
                  })(s, r) &&
                    null === e &&
                    !o &&
                    (e = !1),
                    (e = (function (n, e, t, r) {
                      const i = (function (n) {
                        const e = V.lFrame.currentDirectiveIndex;
                        return -1 === e ? null : n[e];
                      })(n);
                      let s = r ? e.residualClasses : e.residualStyles;
                      if (null === i)
                        0 === (r ? e.classBindings : e.styleBindings) &&
                          ((t = To((t = ef(null, n, e, t, r)), e.attrs, r)),
                          (s = null));
                      else {
                        const o = e.directiveStylingLast;
                        if (-1 === o || n[o] !== i)
                          if (((t = ef(i, n, e, t, r)), null === s)) {
                            let l = (function (n, e, t) {
                              const r = t ? e.classBindings : e.styleBindings;
                              if (0 !== Zn(r)) return n[cn(r)];
                            })(n, e, r);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = ef(null, n, e, l[1], r)),
                              (l = To(l, e.attrs, r)),
                              (function (n, e, t, r) {
                                n[cn(t ? e.classBindings : e.styleBindings)] =
                                  r;
                              })(n, e, r, l));
                          } else
                            s = (function (n, e, t) {
                              let r;
                              const i = e.directiveEnd;
                              for (
                                let s = 1 + e.directiveStylingLast;
                                s < i;
                                s++
                              )
                                r = To(r, n[s].hostAttrs, t);
                              return To(r, e.attrs, t);
                            })(n, e, r);
                      }
                      return (
                        void 0 !== s &&
                          (r
                            ? (e.residualClasses = s)
                            : (e.residualStyles = s)),
                        t
                      );
                    })(i, s, e, r)),
                    (function (n, e, t, r, i, s) {
                      let o = s ? e.classBindings : e.styleBindings,
                        a = cn(o),
                        l = Zn(o);
                      n[r] = t;
                      let c,
                        u = !1;
                      if (Array.isArray(t)) {
                        const d = t;
                        (c = d[1]), (null === c || Li(d, c) > 0) && (u = !0);
                      } else c = t;
                      if (i)
                        if (0 !== l) {
                          const f = cn(n[a + 1]);
                          (n[r + 1] = al(f, a)),
                            0 !== f && (n[f + 1] = _d(n[f + 1], r)),
                            (n[a + 1] = (function (n, e) {
                              return (131071 & n) | (e << 17);
                            })(n[a + 1], r));
                        } else
                          (n[r + 1] = al(a, 0)),
                            0 !== a && (n[a + 1] = _d(n[a + 1], r)),
                            (a = r);
                      else
                        (n[r + 1] = al(l, 0)),
                          0 === a ? (a = r) : (n[l + 1] = _d(n[l + 1], r)),
                          (l = r);
                      u && (n[r + 1] = yd(n[r + 1])),
                        J_(n, c, r, !0),
                        J_(n, c, r, !1),
                        (function (n, e, t, r, i) {
                          const s = i ? n.residualClasses : n.residualStyles;
                          null != s &&
                            "string" == typeof e &&
                            Li(s, e) >= 0 &&
                            (t[r + 1] = Cd(t[r + 1]));
                        })(e, c, n, r, s),
                        (o = al(a, l)),
                        s ? (e.classBindings = o) : (e.styleBindings = o);
                    })(i, s, e, t, o, r);
                }
              })(s, n, o, r),
              e !== j &&
                it(i, o, e) &&
                (function (n, e, t, r, i, s, o, a) {
                  if (!(3 & e.type)) return;
                  const l = n.data,
                    u = l[a + 1];
                  _l(
                    (function (n) {
                      return 1 == (1 & n);
                    })(u)
                      ? lC(l, e, t, i, Zn(u), o)
                      : void 0
                  ) ||
                    (_l(s) ||
                      ((function (n) {
                        return 2 == (2 & n);
                      })(u) &&
                        (s = lC(l, null, t, i, a, o))),
                    (function (n, e, t, r, i) {
                      const s = Te(n);
                      if (e)
                        i
                          ? s
                            ? n.addClass(t, r)
                            : t.classList.add(r)
                          : s
                          ? n.removeClass(t, r)
                          : t.classList.remove(r);
                      else {
                        let o = -1 === r.indexOf("-") ? void 0 : xt.DashCase;
                        if (null == i)
                          s
                            ? n.removeStyle(t, r, o)
                            : t.style.removeProperty(r);
                        else {
                          const a =
                            "string" == typeof i && i.endsWith("!important");
                          a && ((i = i.slice(0, -10)), (o |= xt.Important)),
                            s
                              ? n.setStyle(t, r, i, o)
                              : t.style.setProperty(r, i, a ? "important" : "");
                        }
                      }
                    })(r, o, Ra(pt(), t), i, s));
                })(
                  s,
                  s.data[pt()],
                  i,
                  i[q],
                  n,
                  (i[o + 1] = (function (n, e) {
                    return (
                      null == n ||
                        ("string" == typeof e
                          ? (n += e)
                          : "object" == typeof n && (n = z(Nt(n)))),
                      n
                    );
                  })(e, t)),
                  r,
                  o
                );
          })(n, e, t, !1),
          cs
        );
      }
      function ef(n, e, t, r, i) {
        let s = null;
        const o = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < o && ((s = e[a]), (r = To(r, s.hostAttrs, i)), s !== n);

        )
          a++;
        return null !== n && (t.directiveStylingLast = a), r;
      }
      function To(n, e, t) {
        const r = t ? 1 : 2;
        let i = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s];
            "number" == typeof o
              ? (i = o)
              : i === r &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                Pt(n, o, !!t || e[++s]));
          }
        return void 0 === n ? null : n;
      }
      function lC(n, e, t, r, i, s) {
        const o = null === e;
        let a;
        for (; i > 0; ) {
          const l = n[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = t[i + 1];
          f === j && (f = d ? le : void 0);
          let h = d ? Gc(f, r) : c === r ? f : void 0;
          if ((u && !_l(h) && (h = Gc(l, r)), _l(h) && ((a = h), o))) return a;
          const p = n[i + 1];
          i = o ? cn(p) : Zn(p);
        }
        if (null !== e) {
          let l = s ? e.residualClasses : e.residualStyles;
          null != l && (a = Gc(l, r));
        }
        return a;
      }
      function _l(n) {
        return void 0 !== n;
      }
      function X(n, e = "") {
        const t = C(),
          r = Z(),
          i = n + 20,
          s = r.firstCreatePass ? Wi(r, i, 1, e, null) : r.data[i],
          o = (t[i] = (function (n, e) {
            return Te(n) ? n.createText(e) : n.createTextNode(e);
          })(t[q], e));
        sl(r, t, o, s), Mn(s, !1);
      }
      function gn(n, e, t) {
        const r = C(),
          i = (function (n, e, t, r) {
            return it(n, Ni(), t) ? e + $(t) + r : j;
          })(r, n, e, t);
        return i !== j && er(r, pt(), i), gn;
      }
      const ei = void 0;
      var SN = [
        "en",
        [["a", "p"], ["AM", "PM"], ei],
        [["AM", "PM"], ei, ei],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        ei,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        ei,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ei, "{1} 'at' {0}", ei],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (n) {
          const e = Math.floor(Math.abs(n)),
            t = n.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === t ? 1 : 5;
        },
      ];
      let ds = {};
      function PC(n) {
        return (
          n in ds ||
            (ds[n] =
              re.ng &&
              re.ng.common &&
              re.ng.common.locales &&
              re.ng.common.locales[n]),
          ds[n]
        );
      }
      var S = (() => (
        ((S = S || {})[(S.LocaleId = 0)] = "LocaleId"),
        (S[(S.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (S[(S.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (S[(S.DaysFormat = 3)] = "DaysFormat"),
        (S[(S.DaysStandalone = 4)] = "DaysStandalone"),
        (S[(S.MonthsFormat = 5)] = "MonthsFormat"),
        (S[(S.MonthsStandalone = 6)] = "MonthsStandalone"),
        (S[(S.Eras = 7)] = "Eras"),
        (S[(S.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (S[(S.WeekendRange = 9)] = "WeekendRange"),
        (S[(S.DateFormat = 10)] = "DateFormat"),
        (S[(S.TimeFormat = 11)] = "TimeFormat"),
        (S[(S.DateTimeFormat = 12)] = "DateTimeFormat"),
        (S[(S.NumberSymbols = 13)] = "NumberSymbols"),
        (S[(S.NumberFormats = 14)] = "NumberFormats"),
        (S[(S.CurrencyCode = 15)] = "CurrencyCode"),
        (S[(S.CurrencySymbol = 16)] = "CurrencySymbol"),
        (S[(S.CurrencyName = 17)] = "CurrencyName"),
        (S[(S.Currencies = 18)] = "Currencies"),
        (S[(S.Directionality = 19)] = "Directionality"),
        (S[(S.PluralCase = 20)] = "PluralCase"),
        (S[(S.ExtraData = 21)] = "ExtraData"),
        S
      ))();
      const Cl = "en-US";
      let NC = Cl;
      function nf(n) {
        At(n, "Expected localeId to be defined"),
          "string" == typeof n && (NC = n.toLowerCase().replace(/_/g, "-"));
      }
      class nv {}
      const iv = "ngComponent";
      class Sx {
        resolveComponentFactory(e) {
          throw (function (n) {
            const e = Error(
              `No component factory found for ${z(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e[iv] = n), e;
          })(e);
        }
      }
      let ti = (() => {
        class n {}
        return (n.NULL = new Sx()), n;
      })();
      function wl(...n) {}
      function hs(n, e) {
        return new Ge(Gt(n, e));
      }
      const Mx = function () {
        return hs(He(), C());
      };
      let Ge = (() => {
        class n {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (n.__NG_ELEMENT_ID__ = Mx), n;
      })();
      function sv(n) {
        return n instanceof Ge ? n.nativeElement : n;
      }
      class ni {}
      let rr = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = () => Px()), n;
      })();
      const Px = function () {
        const n = C(),
          t = It(He().index, n);
        return (function (n) {
          return n[q];
        })(Tn(t) ? t : n);
      };
      let df = (() => {
        class n {}
        return (
          (n.ɵprov = P({ token: n, providedIn: "root", factory: () => null })),
          n
        );
      })();
      class No {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const ov = new No("12.2.15");
      class av {
        constructor() {}
        supports(e) {
          return Do(e);
        }
        create(e) {
          return new Ox(e);
        }
      }
      const Rx = (n, e) => e;
      class Ox {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || Rx);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            r = this._removalsHead,
            i = 0,
            s = null;
          for (; t || r; ) {
            const o = !r || (t && t.currentIndex < uv(r, i, s)) ? t : r,
              a = uv(o, i, s),
              l = o.currentIndex;
            if (o === r) i--, (r = r._nextRemoved);
            else if (((t = t._next), null == o.previousIndex)) i++;
            else {
              s || (s = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < s.length ? s[f] : (s[f] = 0),
                    p = h + f;
                  c <= p && p < u && (s[f] = h + 1);
                }
                s[o.previousIndex] = c - u;
              }
            }
            a !== l && e(o, a, l);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !Do(e)))
            throw new Error(
              `Error trying to diff '${z(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let i,
            s,
            o,
            t = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (s = e[a]),
                (o = this._trackByFn(a, s)),
                null !== t && Object.is(t.trackById, o)
                  ? (r && (t = this._verifyReinsertion(t, s, o, a)),
                    Object.is(t.item, s) || this._addIdentityChange(t, s))
                  : ((t = this._mismatch(t, s, o, a)), (r = !0)),
                (t = t._next);
          } else
            (i = 0),
              (function (n, e) {
                if (Array.isArray(n))
                  for (let t = 0; t < n.length; t++) e(n[t]);
                else {
                  const t = n[Zi()]();
                  let r;
                  for (; !(r = t.next()).done; ) e(r.value);
                }
              })(e, (a) => {
                (o = this._trackByFn(i, a)),
                  null !== t && Object.is(t.trackById, o)
                    ? (r && (t = this._verifyReinsertion(t, a, o, i)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, o, i)), (r = !0)),
                  (t = t._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(t), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, r, i) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, i))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, i))
              : (e = this._addAfter(new Fx(t, r), s, i)),
            e
          );
        }
        _verifyReinsertion(e, t, r, i) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, i))
              : e.currentIndex != i &&
                ((e.currentIndex = i), this._addToMoves(e, i)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const i = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
            null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
            this._insertAfter(e, t, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, t, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, t, r) {
          return (
            this._insertAfter(e, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, r) {
          const i = null === t ? this._itHead : t._next;
          return (
            (e._next = i),
            (e._prev = t),
            null === i ? (this._itTail = e) : (i._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new lv()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            r = e._next;
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new lv()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class Fx {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class kx {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            r = e._nextDup;
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          );
        }
      }
      class lv {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let r = this.map.get(t);
          r || ((r = new kx()), this.map.set(t, r)), r.add(e);
        }
        get(e, t) {
          const i = this.map.get(e);
          return i ? i.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function uv(n, e, t) {
        const r = n.previousIndex;
        if (null === r) return r;
        let i = 0;
        return t && r < t.length && (i = t[r]), r + e + i;
      }
      class cv {
        constructor() {}
        supports(e) {
          return e instanceof Map || Gd(e);
        }
        create() {
          return new Vx();
        }
      }
      class Vx {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Gd(e)))
              throw new Error(
                `Error trying to diff '${z(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, i) => {
              if (t && t.key === i)
                this._maybeAddToChanges(t, r),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(i, r);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let r = t; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const r = e._prev;
            return (
              (t._next = e),
              (t._prev = r),
              (e._prev = t),
              r && (r._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const i = this._records.get(e);
            this._maybeAddToChanges(i, t);
            const s = i._prev,
              o = i._next;
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new Lx(e);
          return (
            this._records.set(e, r),
            (r.currentValue = t),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((r) => t(e[r], r));
        }
      }
      class Lx {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function dv() {
        return new xo([new av()]);
      }
      let xo = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (null != r) {
              const i = r.factories.slice();
              t = t.concat(i);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (r) => n.create(t, r || dv()),
              deps: [[n, new Dr(), new Dt()]],
            };
          }
          find(t) {
            const r = this.factories.find((i) => i.supports(t));
            if (null != r) return r;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${(function (
                n
              ) {
                return n.name || typeof n;
              })(t)}'`
            );
          }
        }
        return (n.ɵprov = P({ token: n, providedIn: "root", factory: dv })), n;
      })();
      function fv() {
        return new ps([new cv()]);
      }
      let ps = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (r) {
              const i = r.factories.slice();
              t = t.concat(i);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (r) => n.create(t, r || fv()),
              deps: [[n, new Dr(), new Dt()]],
            };
          }
          find(t) {
            const r = this.factories.find((i) => i.supports(t));
            if (r) return r;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (n.ɵprov = P({ token: n, providedIn: "root", factory: fv })), n;
      })();
      function Sl(n, e, t, r, i = !1) {
        for (; null !== t; ) {
          const s = e[t.index];
          if ((null !== s && r.push(Fe(s)), an(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                u = l[1].firstChild;
              null !== u && Sl(l[1], l, u, r);
            }
          const o = t.type;
          if (8 & o) Sl(n, e, t.child, r);
          else if (32 & o) {
            const a = od(t, e);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & o) {
            const a = ly(e, t);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = mo(e[16]);
              Sl(l[1], l, a, r, !0);
            }
          }
          t = i ? t.projectionNext : t.next;
        }
        return r;
      }
      class Ro {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return Sl(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (an(e)) {
              const t = e[8],
                r = t ? t.indexOf(this) : -1;
              r > -1 && (dd(e, r), Qr(t, r));
            }
            this._attachedToViewContainer = !1;
          }
          Xm(this._lView[1], this._lView);
        }
        onDestroy(e) {
          Ry(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          xd(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Od(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (n, e, t) {
            Fa(!0);
            try {
              Od(n, e, t);
            } finally {
              Fa(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function (n, e) {
              yo(n, e, e[q], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
      }
      class Bx extends Ro {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          Uy(this._view);
        }
        checkNoChanges() {
          !(function (n) {
            Fa(!0);
            try {
              Uy(n);
            } finally {
              Fa(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Ux = function (n) {
        return (function (n, e, t) {
          if (Na(n) && !t) {
            const r = It(n.index, e);
            return new Ro(r, r);
          }
          return 47 & n.type ? new Ro(e[16], e) : null;
        })(He(), C(), 16 == (16 & n));
      };
      let ff = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Ux), n;
      })();
      const qx = [new cv()],
        zx = new xo([new av()]),
        Qx = new ps(qx),
        Yx = function () {
          return Tl(He(), C());
        };
      let ir = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Yx), n;
      })();
      const Jx = ir,
        Zx = class extends Jx {
          constructor(e, t, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = r);
          }
          createEmbeddedView(e) {
            const t = this._declarationTContainer.tViews,
              r = _o(
                this._declarationLView,
                t,
                e,
                16,
                null,
                t.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (r[19] = s.createEmbeddedView(t)),
              Co(t, r, e),
              new Ro(r)
            );
          }
        };
      function Tl(n, e) {
        return 4 & n.type ? new Zx(e, n, hs(n, e)) : null;
      }
      class jn {}
      class hv {}
      const tR = function () {
        return mv(He(), C());
      };
      let mn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = tR), n;
      })();
      const rR = mn,
        pv = class extends rR {
          constructor(e, t, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = r);
          }
          get element() {
            return hs(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Oi(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = Ga(this._hostTNode, this._hostLView);
            if (rm(e)) {
              const t = Ri(e, this._hostLView),
                r = xi(e);
              return new Oi(t[1].data[r + 8], t);
            }
            return new Oi(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const t = gv(this._lContainer);
            return (null !== t && t[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, t, r) {
            const i = e.createEmbeddedView(t || {});
            return this.insert(i, r), i;
          }
          createComponent(e, t, r, i, s) {
            const o = r || this.parentInjector;
            if (!s && null == e.ngModule && o) {
              const l = o.get(jn, null);
              l && (s = l);
            }
            const a = e.create(o, i, void 0, s);
            return this.insert(a.hostView, t), a;
          }
          insert(e, t) {
            const r = e._lView,
              i = r[1];
            if (
              (function (n) {
                return an(n[3]);
              })(r)
            ) {
              const c = this.indexOf(e);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new pv(d, d[6], d[3]);
                f.detach(f.indexOf(e));
              }
            }
            const s = this._adjustIndex(t),
              o = this._lContainer;
            !(function (n, e, t, r) {
              const i = 10 + r,
                s = t.length;
              r > 0 && (t[i - 1][4] = e),
                r < s - 10
                  ? ((e[4] = t[i]), Ka(t, 10 + r, e))
                  : (t.push(e), (e[4] = null)),
                (e[3] = t);
              const o = e[17];
              null !== o &&
                t !== o &&
                (function (n, e) {
                  const t = n[9];
                  e[16] !== e[3][3][16] && (n[2] = !0),
                    null === t ? (n[9] = [e]) : t.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(n), (e[2] |= 128);
            })(i, r, o, s);
            const a = pd(s, o),
              l = r[q],
              u = il(l, o[7]);
            return (
              null !== u &&
                (function (n, e, t, r, i, s) {
                  (r[0] = i), (r[6] = e), yo(n, r, t, 1, i, s);
                })(i, o[6], l, r, u, a),
              e.attachToViewContainerRef(),
              Ka(hf(o), s, e),
              e
            );
          }
          move(e, t) {
            return this.insert(e, t);
          }
          indexOf(e) {
            const t = gv(this._lContainer);
            return null !== t ? t.indexOf(e) : -1;
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              r = dd(this._lContainer, t);
            r && (Qr(hf(this._lContainer), t), Xm(r[1], r));
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              r = dd(this._lContainer, t);
            return r && null != Qr(hf(this._lContainer), t) ? new Ro(r) : null;
          }
          _adjustIndex(e, t = 0) {
            return null == e ? this.length + t : e;
          }
        };
      function gv(n) {
        return n[8];
      }
      function hf(n) {
        return n[8] || (n[8] = []);
      }
      function mv(n, e) {
        let t;
        const r = e[n.index];
        if (an(r)) t = r;
        else {
          let i;
          if (8 & n.type) i = Fe(r);
          else {
            const s = e[q];
            i = s.createComment("");
            const o = Gt(n, e);
            Zr(
              s,
              il(s, o),
              i,
              (function (n, e) {
                return Te(n) ? n.nextSibling(e) : e.nextSibling;
              })(s, o),
              !1
            );
          }
          (e[n.index] = t = Hy(r, e, i, n)), dl(e, t);
        }
        return new pv(t, n, e);
      }
      const _s = {};
      class kv extends ti {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = ft(e);
          return new Lv(t, this.ngModule);
        }
      }
      function Vv(n) {
        const e = [];
        for (let t in n)
          n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t });
        return e;
      }
      const XR = new G("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => qm,
      });
      class Lv extends nv {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = (function (n) {
              return n.map(GM).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return Vv(this.componentDef.inputs);
        }
        get outputs() {
          return Vv(this.componentDef.outputs);
        }
        create(e, t, r, i) {
          const s = (i = i || this.ngModule)
              ? (function (n, e) {
                  return {
                    get: (t, r, i) => {
                      const s = n.get(t, _s, i);
                      return s !== _s || r === _s ? s : e.get(t, r, i);
                    },
                  };
                })(e, i.injector)
              : e,
            o = s.get(ni, Hg),
            a = s.get(df, null),
            l = o.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function (n, e, t) {
                  if (Te(n)) return n.selectRootElement(e, t === Oe.ShadowDom);
                  let r = "string" == typeof e ? n.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(l, r, this.componentDef.encapsulation)
              : cd(
                  o.createRenderer(null, this.componentDef),
                  u,
                  (function (n) {
                    const e = n.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(u)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function (n, e) {
              return {
                components: [],
                scheduler: n || qm,
                clean: MI,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            h = cl(0, null, null, 1, 0, null, null, null, null, null),
            p = _o(null, h, f, d, null, null, o, l, a, s);
          let m, g;
          ka(p);
          try {
            const _ = (function (n, e, t, r, i, s) {
              const o = t[1];
              t[20] = n;
              const l = Wi(o, 20, 2, "#host", null),
                u = (l.mergedAttrs = e.hostAttrs);
              null !== u &&
                (fl(l, u, !0),
                null !== n &&
                  (Ha(i, n, u),
                  null !== l.classes && md(i, n, l.classes),
                  null !== l.styles && dy(i, n, l.styles)));
              const c = r.createRenderer(n, e),
                d = _o(
                  t,
                  Py(e),
                  null,
                  e.onPush ? 64 : 16,
                  t[20],
                  l,
                  r,
                  c,
                  s || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (qa(eo(l, t), o, e.type), Ly(o, l), jy(l, t.length, 1)),
                dl(t, d),
                (t[20] = d)
              );
            })(c, this.componentDef, p, o, l);
            if (c)
              if (r) Ha(l, c, ["ng-version", ov.full]);
              else {
                const { attrs: y, classes: b } = (function (n) {
                  const e = [],
                    t = [];
                  let r = 1,
                    i = 2;
                  for (; r < n.length; ) {
                    let s = n[r];
                    if ("string" == typeof s)
                      2 === i
                        ? "" !== s && e.push(s, n[++r])
                        : 8 === i && t.push(s);
                    else {
                      if (!un(i)) break;
                      i = s;
                    }
                    r++;
                  }
                  return { attrs: e, classes: t };
                })(this.componentDef.selectors[0]);
                y && Ha(l, c, y), b && b.length > 0 && md(l, c, b.join(" "));
              }
            if (((g = Mc(h, 20)), void 0 !== t)) {
              const y = (g.projection = []);
              for (let b = 0; b < this.ngContentSelectors.length; b++) {
                const D = t[b];
                y.push(null != D ? Array.from(D) : null);
              }
            }
            (m = (function (n, e, t, r, i) {
              const s = t[1],
                o = (function (n, e, t) {
                  const r = He();
                  n.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    By(n, r, e, zi(n, e, 1, null), t));
                  const i = to(e, n, r.directiveStart, r);
                  rt(i, e);
                  const s = Gt(r, e);
                  return s && rt(s, e), i;
                })(s, t, e);
              if (
                (r.components.push(o),
                (n[8] = o),
                i && i.forEach((l) => l(o, e)),
                e.contentQueries)
              ) {
                const l = He();
                e.contentQueries(1, o, l.directiveStart);
              }
              const a = He();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (vr(a.index),
                  ky(t[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  Vy(e, o)),
                o
              );
            })(_, this.componentDef, p, f, [eP])),
              Co(h, p, null);
          } finally {
            Va();
          }
          return new nO(this.componentType, m, hs(g, p), p, g);
        }
      }
      class nO extends class {} {
        constructor(e, t, r, i, s) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = s),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new Bx(i)),
            (this.componentType = e);
        }
        get injector() {
          return new Oi(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      const Cs = new Map();
      class sO extends jn {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new kv(this));
          const r = Ht(e),
            i = (function (n) {
              return n[oT] || null;
            })(e);
          i && nf(i),
            (this._bootstrapComponents = Rn(r.bootstrap)),
            (this._r3Injector = Yy(
              e,
              t,
              [
                { provide: jn, useValue: this },
                { provide: ti, useValue: this.componentFactoryResolver },
              ],
              z(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, t = ie.THROW_IF_NOT_FOUND, r = x.Default) {
          return e === ie || e === jn || e === Ki
            ? this
            : this._r3Injector.get(e, t, r);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Tf extends hv {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== Ht(e) &&
              (function (n) {
                const e = new Set();
                !(function t(r) {
                  const i = Ht(r, !0),
                    s = i.id;
                  null !== s &&
                    ((function (n, e, t) {
                      if (e && e !== t)
                        throw new Error(
                          `Duplicate module registered for ${n} - ${z(
                            e
                          )} vs ${z(e.name)}`
                        );
                    })(s, Cs.get(s), r),
                    Cs.set(s, r));
                  const o = Rn(i.imports);
                  for (const a of o) e.has(a) || (e.add(a), t(a));
                })(n);
              })(e);
        }
        create(e) {
          return new sO(this.moduleType, e);
        }
      }
      function Hv(n, e, t, r, i, s) {
        const o = e + t;
        return it(n, o, i)
          ? (function (n, e, t) {
              return (n[e] = t);
            })(n, o + 1, s ? r.call(s, i) : r(i))
          : (function (n, e) {
              const t = n[e];
              return t === j ? void 0 : t;
            })(n, o + 1);
      }
      function zv(n, e, t) {
        const r = n + 20,
          i = C(),
          s = Pi(i, r);
        return (function (n, e) {
          fn.isWrapped(e) &&
            ((e = fn.unwrap(e)), (n[V.lFrame.bindingIndex] = j));
          return e;
        })(
          i,
          (function (n, e) {
            return n[1].data[e].pure;
          })(i, r)
            ? Hv(
                i,
                (function () {
                  const n = V.lFrame;
                  let e = n.bindingRootIndex;
                  return (
                    -1 === e &&
                      (e = n.bindingRootIndex = n.tView.bindingStartIndex),
                    e
                  );
                })(),
                e,
                s.transform,
                t,
                s
              )
            : s.transform(t)
        );
      }
      function Af(n) {
        return (e) => {
          setTimeout(n, void 0, e);
        };
      }
      const xe = class extends jt {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, r) {
          var i, s, o;
          let a = e,
            l = t || (() => null),
            u = r;
          if (e && "object" == typeof e) {
            const d = e;
            (a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d)),
              (l = null === (s = d.error) || void 0 === s ? void 0 : s.bind(d)),
              (u =
                null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d));
          }
          this.__isAsync && ((l = Af(l)), a && (a = Af(a)), u && (u = Af(u)));
          const c = super.subscribe({ next: a, error: l, complete: u });
          return e instanceof _e && e.add(c), c;
        }
      };
      function bO() {
        return this._results[Zi()]();
      }
      class Nl {
        constructor(e = !1) {
          (this._emitDistinctChangesOnly = e),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = Zi(),
            r = Nl.prototype;
          r[t] || (r[t] = bO);
        }
        get changes() {
          return this._changes || (this._changes = new xe());
        }
        get(e) {
          return this._results[e];
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e, t) {
          const r = this;
          r.dirty = !1;
          const i = Wt(e);
          (this._changesDetected = !(function (n, e, t) {
            if (n.length !== e.length) return !1;
            for (let r = 0; r < n.length; r++) {
              let i = n[r],
                s = e[r];
              if ((t && ((i = t(i)), (s = t(s))), s !== i)) return !1;
            }
            return !0;
          })(r._results, i, t)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      class Mf {
        constructor(e) {
          (this.queryList = e), (this.matches = null);
        }
        clone() {
          return new Mf(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class If {
        constructor(e = []) {
          this.queries = e;
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const r =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              i = [];
            for (let s = 0; s < r; s++) {
              const o = t.getByIndex(s);
              i.push(this.queries[o.indexInDeclarationView].clone());
            }
            return new If(i);
          }
          return null;
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== Xv(e, t).matches && this.queries[t].setDirty();
        }
      }
      class Qv {
        constructor(e, t, r = null) {
          (this.predicate = e), (this.flags = t), (this.read = r);
        }
      }
      class Pf {
        constructor(e = []) {
          this.queries = e;
        }
        elementStart(e, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(e, t);
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e);
        }
        embeddedTView(e) {
          let t = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== t ? t.length : 0,
              s = this.getByIndex(r).embeddedTView(e, i);
            s &&
              ((s.indexInDeclarationView = r),
              null !== t ? t.push(s) : (t = [s]));
          }
          return null !== t ? new Pf(t) : null;
        }
        template(e, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(e, t);
        }
        getByIndex(e) {
          return this.queries[e];
        }
        get length() {
          return this.queries.length;
        }
        track(e) {
          this.queries.push(e);
        }
      }
      class Nf {
        constructor(e, t = -1) {
          (this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t);
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1);
        }
        template(e, t) {
          this.elementStart(e, t);
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new Nf(this.metadata))
            : null;
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let r = e.parent;
            for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent;
            return t === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(e, t) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const s = r[i];
              this.matchTNodeWithReadOption(e, t, SO(t, s)),
                this.matchTNodeWithReadOption(e, t, Wa(t, e, s, !1, !1));
            }
          else
            r === ir
              ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, Wa(t, e, r, !1, !1));
        }
        matchTNodeWithReadOption(e, t, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === Ge || i === mn || (i === ir && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const s = Wa(t, e, i, !1, !1);
                null !== s && this.addMatch(t.index, s);
              }
            else this.addMatch(t.index, r);
          }
        }
        addMatch(e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t);
        }
      }
      function SO(n, e) {
        const t = n.localNames;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) if (t[r] === e) return t[r + 1];
        return null;
      }
      function AO(n, e, t, r) {
        return -1 === t
          ? (function (n, e) {
              return 11 & n.type ? hs(n, e) : 4 & n.type ? Tl(n, e) : null;
            })(e, n)
          : -2 === t
          ? (function (n, e, t) {
              return t === Ge
                ? hs(e, n)
                : t === ir
                ? Tl(e, n)
                : t === mn
                ? mv(e, n)
                : void 0;
            })(n, e, r)
          : to(n, n[1], t, e);
      }
      function Kv(n, e, t, r) {
        const i = e[19].queries[r];
        if (null === i.matches) {
          const s = n.data,
            o = t.matches,
            a = [];
          for (let l = 0; l < o.length; l += 2) {
            const u = o[l];
            a.push(u < 0 ? null : AO(e, s[u], o[l + 1], t.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function xf(n, e, t, r) {
        const i = n.queries.getByIndex(t),
          s = i.matches;
        if (null !== s) {
          const o = Kv(n, e, i, t);
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a];
            if (l > 0) r.push(o[a / 2]);
            else {
              const u = s[a + 1],
                c = e[-l];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && xf(f[1], f, u, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  xf(h[1], h, u, r);
                }
              }
            }
          }
        }
        return r;
      }
      function xl(n) {
        const e = C(),
          t = Z(),
          r = Qg();
        Fc(r + 1);
        const i = Xv(t, r);
        if (n.dirty && Ug(e) === (2 == (2 & i.metadata.flags))) {
          if (null === i.matches) n.reset([]);
          else {
            const s = i.crossesNgTemplate ? xf(t, e, r, []) : Kv(t, e, i, r);
            n.reset(s, sv), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Yv(n, e, t) {
        const r = Z();
        r.firstCreatePass &&
          ((function (n, e, t) {
            null === n.queries && (n.queries = new Pf()),
              n.queries.track(new Nf(e, t));
          })(r, new Qv(n, e, t), -1),
          2 == (2 & e) && (r.staticViewQueries = !0)),
          (function (n, e, t) {
            const r = new Nl(4 == (4 & t));
            Ry(n, e, r, r.destroy),
              null === e[19] && (e[19] = new If()),
              e[19].queries.push(new Mf(r));
          })(r, C(), e);
      }
      function Xv(n, e) {
        return n.queries.getByIndex(e);
      }
      const qo = new G("Application Initializer");
      let Es = (() => {
        class n {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = wl),
              (this.reject = wl),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const s = this.appInits[i]();
                if (So(s)) t.push(s);
                else if (ml(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  t.push(o);
                }
              }
            Promise.all(t)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === t.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(qo, 8));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Wo = new G("AppId"),
        i1 = {
          provide: Wo,
          useFactory: function () {
            return `${jf()}${jf()}${jf()}`;
          },
          deps: [],
        };
      function jf() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const yE = new G("Platform Initializer"),
        kl = new G("Platform ID"),
        _E = new G("appBootstrapListener");
      let Vl = (() => {
        class n {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Ar = new G("LocaleId"),
        CE = new G("DefaultCurrencyCode");
      class o1 {
        constructor(e, t) {
          (this.ngModuleFactory = e), (this.componentFactories = t);
        }
      }
      const Bf = function (n) {
          return new Tf(n);
        },
        a1 = Bf,
        l1 = function (n) {
          return Promise.resolve(Bf(n));
        },
        vE = function (n) {
          const e = Bf(n),
            r = Rn(Ht(n).declarations).reduce((i, s) => {
              const o = ft(s);
              return o && i.push(new Lv(o)), i;
            }, []);
          return new o1(e, r);
        },
        u1 = vE,
        c1 = function (n) {
          return Promise.resolve(vE(n));
        };
      let si = (() => {
        class n {
          constructor() {
            (this.compileModuleSync = a1),
              (this.compileModuleAsync = l1),
              (this.compileModuleAndAllComponentsSync = u1),
              (this.compileModuleAndAllComponentsAsync = c1);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const h1 = (() => Promise.resolve(0))();
      function Hf(n) {
        "undefined" == typeof Zone
          ? h1.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class Ie {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new xe(!1)),
            (this.onMicrotaskEmpty = new xe(!1)),
            (this.onStable = new xe(!1)),
            (this.onError = new xe(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && t),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function () {
              let n = re.requestAnimationFrame,
                e = re.cancelAnimationFrame;
              if ("undefined" != typeof Zone && n && e) {
                const t = n[Zone.__symbol__("OriginalDelegate")];
                t && (n = t);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (n) {
              const e = () => {
                !(function (n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(re, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                $f(n),
                                (n.isCheckStableRunning = !0),
                                Uf(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    $f(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, i, s, o, a) => {
                  try {
                    return EE(n), t.invokeTask(i, s, o, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      e(),
                      bE(n);
                  }
                },
                onInvoke: (t, r, i, s, o, a, l) => {
                  try {
                    return EE(n), t.invoke(i, s, o, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), bE(n);
                  }
                },
                onHasTask: (t, r, i, s) => {
                  t.hasTask(i, s),
                    r === i &&
                      ("microTask" == s.change
                        ? ((n._hasPendingMicrotasks = s.microTask),
                          $f(n),
                          Uf(n))
                        : "macroTask" == s.change &&
                          (n.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (t, r, i, s) => (
                  t.handleError(i, s),
                  n.runOutsideAngular(() => n.onError.emit(s)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Ie.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Ie.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, r) {
          return this._inner.run(e, t, r);
        }
        runTask(e, t, r, i) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + i, e, g1, wl, wl);
          try {
            return s.runTask(o, t, r);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(e, t, r) {
          return this._inner.runGuarded(e, t, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const g1 = {};
      function Uf(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function $f(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function EE(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function bE(n) {
        n._nesting--, Uf(n);
      }
      class _1 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new xe()),
            (this.onMicrotaskEmpty = new xe()),
            (this.onStable = new xe()),
            (this.onError = new xe());
        }
        run(e, t, r) {
          return e.apply(t, r);
        }
        runGuarded(e, t, r) {
          return e.apply(t, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, r, i) {
          return e.apply(t, r);
        }
      }
      let Gf = (() => {
          class n {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ie.assertNotInAngularZone(),
                        Hf(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Hf(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, r, i) {
              let s = -1;
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: i });
            }
            whenStable(t, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, r, i) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(Ie));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        DE = (() => {
          class n {
            constructor() {
              (this._applications = new Map()), qf.addToWindow(this);
            }
            registerApplication(t, r) {
              this._applications.set(t, r);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, r = !0) {
              return qf.findTestabilityInTree(this, t, r);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      class C1 {
        addToWindow(e) {}
        findTestabilityInTree(e, t, r) {
          return null;
        }
      }
      let qf = new C1(),
        wE = !0,
        SE = !1;
      let Cn;
      const AE = new G("AllowMultipleToken");
      class Wf {
        constructor(e, t) {
          (this.name = e), (this.token = t);
        }
      }
      function ME(n, e, t = []) {
        const r = `Platform: ${e}`,
          i = new G(r);
        return (s = []) => {
          let o = IE();
          if (!o || o.injector.get(AE, !1))
            if (n) n(t.concat(s).concat({ provide: i, useValue: !0 }));
            else {
              const a = t
                .concat(s)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: vo, useValue: "platform" }
                );
              !(function (n) {
                if (Cn && !Cn.destroyed && !Cn.injector.get(AE, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Cn = n.get(PE);
                const e = n.get(yE, null);
                e && e.forEach((t) => t());
              })(ie.create({ providers: a, name: r }));
            }
          return (function (n) {
            const e = IE();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(n, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(i);
        };
      }
      function IE() {
        return Cn && !Cn.destroyed ? Cn : null;
      }
      let PE = (() => {
        class n {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, r) {
            const a = (function (n, e) {
                let t;
                return (
                  (t =
                    "noop" === n
                      ? new _1()
                      : ("zone.js" === n ? void 0 : n) ||
                        new Ie({
                          enableLongStackTrace: ((SE = !0), wE),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  t
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: Ie, useValue: a }];
            return a.run(() => {
              const u = ie.create({
                  providers: l,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                c = t.create(u),
                d = c.injector.get(Jr, null);
              if (!d)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    zf(this._modules, c), f.unsubscribe();
                  });
                }),
                (function (n, e, t) {
                  try {
                    const r = t();
                    return So(r)
                      ? r.catch((i) => {
                          throw (
                            (e.runOutsideAngular(() => n.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => n.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(Es);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        nf(c.injector.get(Ar, Cl) || Cl),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, r = []) {
            const i = NE({}, r);
            return (function (n, e, t) {
              const r = new Tf(t);
              return Promise.resolve(r);
            })(0, 0, t).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(bs);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${z(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(r);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ie));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function NE(n, e) {
        return Array.isArray(e)
          ? e.reduce(NE, n)
          : Object.assign(Object.assign({}, n), e);
      }
      let bs = (() => {
        class n {
          constructor(t, r, i, s, o) {
            (this._zone = t),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new ae((u) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    u.next(this._stable), u.complete();
                  });
              }),
              l = new ae((u) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Ie.assertNotInAngularZone(),
                      Hf(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), u.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  Ie.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        u.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function (...n) {
              let e = Number.POSITIVE_INFINITY,
                t = null,
                r = n[n.length - 1];
              return (
                Di(r)
                  ? ((t = n.pop()),
                    n.length > 1 &&
                      "number" == typeof n[n.length - 1] &&
                      (e = n.pop()))
                  : "number" == typeof r && (e = n.pop()),
                null === t && 1 === n.length && n[0] instanceof ae
                  ? n[0]
                  : Ws(e)(fc(n, t))
              );
            })(
              a,
              l.pipe((n) =>
                hc()(
                  (function (n, e) {
                    return function (r) {
                      let i;
                      i =
                        "function" == typeof n
                          ? n
                          : function () {
                              return n;
                            };
                      const s = Object.create(r, HS);
                      return (s.source = r), (s.subjectFactory = i), s;
                    };
                  })(WS)(n)
                )
              )
            );
          }
          bootstrap(t, r) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let i;
            (i =
              t instanceof nv
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(i.componentType);
            const s = (function (n) {
                return n.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(jn),
              a = i.create(ie.NULL, [], r || i.selector, s),
              l = a.location.nativeElement,
              u = a.injector.get(Gf, null),
              c = u && a.injector.get(DE);
            return (
              u && c && c.registerApplication(l, u),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  zf(this.components, a),
                  c && c.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const r = t;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(t) {
            const r = t;
            zf(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(_E, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(Ie), E(ie), E(Jr), E(ti), E(Es));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function zf(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1);
      }
      class jl {}
      class O1 {}
      const F1 = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let k1 = (() => {
        class n {
          constructor(t, r) {
            (this._compiler = t), (this._config = r || F1);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [r, i] = t.split("#");
            return (
              void 0 === i && (i = "default"),
              Bs(255)(r)
                .then((s) => s[i])
                .then((s) => FE(s, r, i))
                .then((s) => this._compiler.compileModuleAsync(s))
            );
          }
          loadFactory(t) {
            let [r, i] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === i && ((i = "default"), (s = "")),
              Bs(255)(
                this._config.factoryPathPrefix +
                  r +
                  this._config.factoryPathSuffix
              )
                .then((o) => o[i + s])
                .then((o) => FE(o, r, i))
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(si), E(O1, 8));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function FE(n, e, t) {
        if (!n) throw new Error(`Cannot find '${t}' in '${e}'`);
        return n;
      }
      const W1 = ME(null, "core", [
          { provide: kl, useValue: "unknown" },
          { provide: PE, deps: [ie] },
          { provide: DE, deps: [] },
          { provide: Vl, deps: [] },
        ]),
        J1 = [
          { provide: bs, useClass: bs, deps: [Ie, ie, Jr, ti, Es] },
          {
            provide: XR,
            deps: [Ie],
            useFactory: function (n) {
              let e = [];
              return (
                n.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: Es, useClass: Es, deps: [[new Dt(), qo]] },
          { provide: si, useClass: si, deps: [] },
          i1,
          {
            provide: xo,
            useFactory: function () {
              return zx;
            },
            deps: [],
          },
          {
            provide: ps,
            useFactory: function () {
              return Qx;
            },
            deps: [],
          },
          {
            provide: Ar,
            useFactory: function (n) {
              return (
                nf(
                  (n =
                    n ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    Cl)
                ),
                n
              );
            },
            deps: [[new Hi(Ar), new Dt(), new Dr()]],
          },
          { provide: CE, useValue: "USD" },
        ];
      let X1 = (() => {
          class n {
            constructor(t) {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(bs));
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({ providers: J1 })),
            n
          );
        })(),
        Kl = null;
      function Bn() {
        return Kl;
      }
      const ke = new G("DocumentToken");
      let li = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = P({ factory: ZF, token: n, providedIn: "platform" })),
          n
        );
      })();
      function ZF() {
        return E(sb);
      }
      const XF = new G("Location Initialized");
      let sb = (() => {
        class n extends li {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Bn().getBaseHref(this._doc);
          }
          onPopState(t) {
            const r = Bn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", t, !1),
              () => r.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const r = Bn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", t, !1),
              () => r.removeEventListener("hashchange", t)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, r, i) {
            ob() ? this._history.pushState(t, r, i) : (this.location.hash = i);
          }
          replaceState(t, r, i) {
            ob()
              ? this._history.replaceState(t, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ke));
          }),
          (n.ɵprov = P({ factory: ek, token: n, providedIn: "platform" })),
          n
        );
      })();
      function ob() {
        return !!window.history.pushState;
      }
      function ek() {
        return new sb(E(ke));
      }
      function lh(n, e) {
        if (0 == n.length) return e;
        if (0 == e.length) return n;
        let t = 0;
        return (
          n.endsWith("/") && t++,
          e.startsWith("/") && t++,
          2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e
        );
      }
      function ab(n) {
        const e = n.match(/#|\?|$/),
          t = (e && e.index) || n.length;
        return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t);
      }
      function or(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let Ss = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = P({ factory: tk, token: n, providedIn: "root" })),
          n
        );
      })();
      function tk(n) {
        const e = E(ke).location;
        return new lb(E(li), (e && e.origin) || "");
      }
      const uh = new G("appBaseHref");
      let lb = (() => {
          class n extends Ss {
            constructor(t, r) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return lh(this._baseHref, t);
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  or(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && t ? `${r}${i}` : r;
            }
            pushState(t, r, i, s) {
              const o = this.prepareExternalUrl(i + or(s));
              this._platformLocation.pushState(t, r, o);
            }
            replaceState(t, r, i, s) {
              const o = this.prepareExternalUrl(i + or(s));
              this._platformLocation.replaceState(t, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(li), E(uh, 8));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        nk = (() => {
          class n extends Ss {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(t) {
              const r = lh(this._baseHref, t);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(t, r, i, s) {
              let o = this.prepareExternalUrl(i + or(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, o);
            }
            replaceState(t, r, i, s) {
              let o = this.prepareExternalUrl(i + or(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(li), E(uh, 8));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Yl = (() => {
          class n {
            constructor(t, r) {
              (this._subject = new xe()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const i = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = ab(ub(i))),
                this._platformStrategy.onPopState((s) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, r = "") {
              return this.path() == this.normalize(t + or(r));
            }
            normalize(t) {
              return n.stripTrailingSlash(
                (function (n, e) {
                  return n && e.startsWith(n) ? e.substring(n.length) : e;
                })(this._baseHref, ub(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, r = "", i = null) {
              this._platformStrategy.pushState(i, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + or(r)),
                  i
                );
            }
            replaceState(t, r = "", i = null) {
              this._platformStrategy.replaceState(i, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + or(r)),
                  i
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(t = 0) {
              var r, i;
              null === (i = (r = this._platformStrategy).historyGo) ||
                void 0 === i ||
                i.call(r, t);
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", r) {
              this._urlChangeListeners.forEach((i) => i(t, r));
            }
            subscribe(t, r, i) {
              return this._subject.subscribe({
                next: t,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(Ss), E(li));
            }),
            (n.normalizeQueryParams = or),
            (n.joinWithSlash = lh),
            (n.stripTrailingSlash = ab),
            (n.ɵprov = P({ factory: rk, token: n, providedIn: "root" })),
            n
          );
        })();
      function rk() {
        return new Yl(E(Ss), E(li));
      }
      function ub(n) {
        return n.replace(/\/index.html$/, "");
      }
      var Ve = (() => (
        ((Ve = Ve || {})[(Ve.Zero = 0)] = "Zero"),
        (Ve[(Ve.One = 1)] = "One"),
        (Ve[(Ve.Two = 2)] = "Two"),
        (Ve[(Ve.Few = 3)] = "Few"),
        (Ve[(Ve.Many = 4)] = "Many"),
        (Ve[(Ve.Other = 5)] = "Other"),
        Ve
      ))();
      const dk = function (n) {
        return (function (n) {
          const e = (function (n) {
            return n.toLowerCase().replace(/_/g, "-");
          })(n);
          let t = PC(e);
          if (t) return t;
          const r = e.split("-")[0];
          if (((t = PC(r)), t)) return t;
          if ("en" === r) return SN;
          throw new Error(`Missing locale data for the locale "${n}".`);
        })(n)[S.PluralCase];
      };
      class ou {}
      let Bk = (() => {
        class n extends ou {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, r) {
            switch (dk(r || this.locale)(t)) {
              case Ve.Zero:
                return "zero";
              case Ve.One:
                return "one";
              case Ve.Two:
                return "two";
              case Ve.Few:
                return "few";
              case Ve.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(Ar));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function _b(n, e) {
        e = encodeURIComponent(e);
        for (const t of n.split(";")) {
          const r = t.indexOf("="),
            [i, s] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
          if (i.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      let Cb = (() => {
        class n {
          constructor(t, r, i, s) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = r),
              (this._ngEl = i),
              (this._renderer = s),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (Do(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((r) => this._toggleClass(r.key, r.currentValue)),
              t.forEachChangedItem((r) =>
                this._toggleClass(r.key, r.currentValue)
              ),
              t.forEachRemovedItem((r) => {
                r.previousValue && this._toggleClass(r.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((r) => {
              if ("string" != typeof r.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${z(
                    r.item
                  )}`
                );
              this._toggleClass(r.item, !0);
            }),
              t.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((r) => this._toggleClass(r, !0))
                : Object.keys(t).forEach((r) => this._toggleClass(r, !!t[r])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((r) => this._toggleClass(r, !1))
                : Object.keys(t).forEach((r) => this._toggleClass(r, !1)));
          }
          _toggleClass(t, r) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((i) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, i)
                  : this._renderer.removeClass(this._ngEl.nativeElement, i);
              });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(xo), v(ps), v(Ge), v(rr));
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
          })),
          n
        );
      })();
      class Uk {
        constructor(e, t, r, i) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let vb = (() => {
        class n {
          constructor(t, r, i) {
            (this._viewContainer = t),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              if (!this._differ && t)
                try {
                  this._differ = this._differs
                    .find(t)
                    .create(this.ngForTrackBy);
                } catch (r) {
                  throw new Error(
                    `Cannot find a differ supporting object '${t}' of type '${(function (
                      n
                    ) {
                      return n.name || typeof n;
                    })(
                      t
                    )}'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const r = [];
            t.forEachOperation((i, s, o) => {
              if (null == i.previousIndex) {
                const a = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Uk(null, this._ngForOf, -1, -1),
                    null === o ? void 0 : o
                  ),
                  l = new Eb(i, a);
                r.push(l);
              } else if (null == o)
                this._viewContainer.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = this._viewContainer.get(s);
                this._viewContainer.move(a, o);
                const l = new Eb(i, a);
                r.push(l);
              }
            });
            for (let i = 0; i < r.length; i++)
              this._perViewChange(r[i].view, r[i].record);
            for (let i = 0, s = this._viewContainer.length; i < s; i++) {
              const o = this._viewContainer.get(i);
              (o.context.index = i),
                (o.context.count = s),
                (o.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((i) => {
              this._viewContainer.get(i.currentIndex).context.$implicit =
                i.item;
            });
          }
          _perViewChange(t, r) {
            t.context.$implicit = r.item;
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(mn), v(ir), v(xo));
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          n
        );
      })();
      class Eb {
        constructor(e, t) {
          (this.record = e), (this.view = t);
        }
      }
      let _h = (() => {
        class n {
          constructor(t, r) {
            (this._viewContainer = t),
              (this._context = new Gk()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            bb("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            bb("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(v(mn), v(ir));
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          n
        );
      })();
      class Gk {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function bb(n, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${z(e)}'.`
          );
      }
      class Yk {
        createSubscription(e, t) {
          return e.subscribe({
            next: t,
            error: (r) => {
              throw r;
            },
          });
        }
        dispose(e) {
          e.unsubscribe();
        }
        onDestroy(e) {
          e.unsubscribe();
        }
      }
      class Jk {
        createSubscription(e, t) {
          return e.then(t, (r) => {
            throw r;
          });
        }
        dispose(e) {}
        onDestroy(e) {}
      }
      const Zk = new Jk(),
        Xk = new Yk();
      let wb = (() => {
          class n {
            constructor(t) {
              (this._ref = t),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(
                  t,
                  (r) => this._updateLatestValue(t, r)
                ));
            }
            _selectStrategy(t) {
              if (So(t)) return Zk;
              if (L_(t)) return Xk;
              throw (function (n, e) {
                return Error(`InvalidPipeArgument: '${e}' for pipe '${z(n)}'`);
              })(n, t);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, r) {
              t === this._obj &&
                ((this._latestValue = r), this._ref.markForCheck());
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(ff, 16));
            }),
            (n.ɵpipe = Et({ name: "async", type: n, pure: !1 })),
            n
          );
        })(),
        Tb = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({ providers: [{ provide: ou, useClass: Bk }] })),
            n
          );
        })();
      let Mb = (() => {
        class n {}
        return (
          (n.ɵprov = P({
            token: n,
            providedIn: "root",
            factory: () => new _V(E(ke), window),
          })),
          n
        );
      })();
      class _V {
        constructor(e, t) {
          (this.document = e), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (!this.supportsScrolling()) return;
          const t = (function (n, e) {
            const t = n.getElementById(e) || n.getElementsByName(e)[0];
            if (t) return t;
            if (
              "function" == typeof n.createTreeWalker &&
              n.body &&
              (n.body.createShadowRoot || n.body.attachShadow)
            ) {
              const r = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const s = i.shadowRoot;
                if (s) {
                  const o =
                    s.getElementById(e) || s.querySelector(`[name="${e}"]`);
                  if (o) return o;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, e);
          t && (this.scrollToElement(t), this.attemptFocus(t));
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const t = e.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            i = t.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(r - s[0], i - s[1]);
        }
        attemptFocus(e) {
          return e.focus(), this.document.activeElement === e;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const e =
              Ib(this.window.history) ||
              Ib(Object.getPrototypeOf(this.window.history));
            return !(!e || (!e.writable && !e.set));
          } catch (e) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (e) {
            return !1;
          }
        }
      }
      function Ib(n) {
        return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
      }
      class Pb {}
      class Dh extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function (n) {
            Kl || (Kl = n);
          })(new Dh());
        }
        onAndCancel(e, t, r) {
          return (
            e.addEventListener(t, r, !1),
            () => {
              e.removeEventListener(t, r, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const t =
            ((Xo = Xo || document.querySelector("base")),
            Xo ? Xo.getAttribute("href") : null);
          return null == t
            ? null
            : (function (n) {
                (au = au || document.createElement("a")),
                  au.setAttribute("href", n);
                const e = au.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(t);
        }
        resetBaseElement() {
          Xo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return _b(document.cookie, e);
        }
      }
      let au,
        Xo = null;
      const Nb = new G("TRANSITION_ID"),
        wV = [
          {
            provide: qo,
            useFactory: function (n, e, t) {
              return () => {
                t.get(Es).donePromise.then(() => {
                  const r = Bn(),
                    i = e.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let s = 0; s < i.length; s++) r.remove(i[s]);
                });
              };
            },
            deps: [Nb, ke, ie],
            multi: !0,
          },
        ];
      class wh {
        static init() {
          !(function (n) {
            qf = n;
          })(new wh());
        }
        addToWindow(e) {
          (re.getAngularTestability = (r, i = !0) => {
            const s = e.findTestabilityInTree(r, i);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (re.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (re.getAllAngularRootElements = () => e.getAllRootElements()),
            re.frameworkStabilizers || (re.frameworkStabilizers = []),
            re.frameworkStabilizers.push((r) => {
              const i = re.getAllAngularTestabilities();
              let s = i.length,
                o = !1;
              const a = function (l) {
                (o = o || l), s--, 0 == s && r(o);
              };
              i.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(e, t, r) {
          if (null == t) return null;
          const i = e.getTestability(t);
          return null != i
            ? i
            : r
            ? Bn().isShadowRoot(t)
              ? this.findTestabilityInTree(e, t.host, !0)
              : this.findTestabilityInTree(e, t.parentElement, !0)
            : null;
        }
      }
      let SV = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const ea = new G("EventManagerPlugins");
      let uu = (() => {
        class n {
          constructor(t, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((i) => (i.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, r, i) {
            return this._findPluginFor(r).addEventListener(t, r, i);
          }
          addGlobalEventListener(t, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(t, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const r = this._eventNameToPlugin.get(t);
            if (r) return r;
            const i = this._plugins;
            for (let s = 0; s < i.length; s++) {
              const o = i[s];
              if (o.supports(t)) return this._eventNameToPlugin.set(t, o), o;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ea), E(Ie));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Sh {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, r) {
          const i = Bn().getGlobalEventTarget(this._doc, e);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${t}`);
          return this.addEventListener(i, t, r);
        }
      }
      let Rb = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const r = new Set();
              t.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        ta = (() => {
          class n extends Rb {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, r, i) {
              t.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), i.push(r.appendChild(o));
              });
            }
            addHost(t) {
              const r = [];
              this._addStylesToHost(this._stylesSet, t, r),
                this._hostNodes.set(t, r);
            }
            removeHost(t) {
              const r = this._hostNodes.get(t);
              r && r.forEach(Ob), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(t, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(Ob));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(ke));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function Ob(n) {
        Bn().remove(n);
      }
      const Th = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Ah = /%COMP%/g;
      function cu(n, e, t) {
        for (let r = 0; r < e.length; r++) {
          let i = e[r];
          Array.isArray(i) ? cu(n, i, t) : ((i = i.replace(Ah, n)), t.push(i));
        }
        return t;
      }
      function Vb(n) {
        return (e) => {
          if ("__ngUnwrap__" === e) return n;
          !1 === n(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let du = (() => {
        class n {
          constructor(t, r, i) {
            (this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Mh(t));
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Oe.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new BV(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(t),
                  i
                );
              }
              case 1:
              case Oe.ShadowDom:
                return new HV(this.eventManager, this.sharedStylesHost, t, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = cu(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(uu), E(ta), E(Wo));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Mh {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(Th[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, r) {
          e && e.insertBefore(t, r);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let r = "string" == typeof e ? document.querySelector(e) : e;
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, r, i) {
          if (i) {
            t = i + ":" + t;
            const s = Th[i];
            s ? e.setAttributeNS(s, t, r) : e.setAttribute(t, r);
          } else e.setAttribute(t, r);
        }
        removeAttribute(e, t, r) {
          if (r) {
            const i = Th[r];
            i ? e.removeAttributeNS(i, t) : e.removeAttribute(`${r}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, r, i) {
          i & (xt.DashCase | xt.Important)
            ? e.style.setProperty(t, r, i & xt.Important ? "important" : "")
            : (e.style[t] = r);
        }
        removeStyle(e, t, r) {
          r & xt.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, r) {
          e[t] = r;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, r) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, Vb(r))
            : this.eventManager.addEventListener(e, t, Vb(r));
        }
      }
      class BV extends Mh {
        constructor(e, t, r, i) {
          super(e), (this.component = r);
          const s = cu(i + "-" + r.id, r.styles, []);
          t.addStyles(s),
            (this.contentAttr = (function (n) {
              return "_ngcontent-%COMP%".replace(Ah, n);
            })(i + "-" + r.id)),
            (this.hostAttr = (function (n) {
              return "_nghost-%COMP%".replace(Ah, n);
            })(i + "-" + r.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const r = super.createElement(e, t);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class HV extends Mh {
        constructor(e, t, r, i) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = cu(i.id, i.styles, []);
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement("style");
            (a.textContent = s[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, r);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let UV = (() => {
        class n extends Sh {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, r, i) {
            return (
              t.addEventListener(r, i, !1),
              () => this.removeEventListener(t, r, i)
            );
          }
          removeEventListener(t, r, i) {
            return t.removeEventListener(r, i);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ke));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Bb = ["alt", "control", "meta", "shift"],
        KV = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Hb = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        YV = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let JV = (() => {
        class n extends Sh {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != n.parseEventName(t);
          }
          addEventListener(t, r, i) {
            const s = n.parseEventName(r),
              o = n.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Bn().onAndCancel(t, s.domEventName, o));
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = n._normalizeKey(r.pop());
            let o = "";
            if (
              (Bb.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (o += l + "."));
              }),
              (o += s),
              0 != r.length || 0 === s.length)
            )
              return null;
            const a = {};
            return (a.domEventName = i), (a.fullKey = o), a;
          }
          static getEventFullKey(t) {
            let r = "",
              i = (function (n) {
                let e = n.key;
                if (null == e) {
                  if (((e = n.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === n.location && Hb.hasOwnProperty(e) && (e = Hb[e]));
                }
                return KV[e] || e;
              })(t);
            return (
              (i = i.toLowerCase()),
              " " === i ? (i = "space") : "." === i && (i = "dot"),
              Bb.forEach((s) => {
                s != i && YV[s](t) && (r += s + ".");
              }),
              (r += i),
              r
            );
          }
          static eventCallback(t, r, i) {
            return (s) => {
              n.getEventFullKey(s) === t && i.runGuarded(() => r(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ke));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const sL = ME(W1, "browser", [
          { provide: kl, useValue: "browser" },
          {
            provide: yE,
            useValue: function () {
              Dh.makeCurrent(), wh.init();
            },
            multi: !0,
          },
          {
            provide: ke,
            useFactory: function () {
              return (
                (function (n) {
                  Tc = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        oL = [
          [],
          { provide: vo, useValue: "root" },
          {
            provide: Jr,
            useFactory: function () {
              return new Jr();
            },
            deps: [],
          },
          { provide: ea, useClass: UV, multi: !0, deps: [ke, Ie, kl] },
          { provide: ea, useClass: JV, multi: !0, deps: [ke] },
          [],
          { provide: du, useClass: du, deps: [uu, ta, Wo] },
          { provide: ni, useExisting: du },
          { provide: Rb, useExisting: ta },
          { provide: ta, useClass: ta, deps: [ke] },
          { provide: Gf, useClass: Gf, deps: [Ie] },
          { provide: uu, useClass: uu, deps: [ea, Ie] },
          { provide: Pb, useClass: SV, deps: [] },
          [],
        ];
      let xh = (() => {
        class n {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(t) {
            return {
              ngModule: n,
              providers: [
                { provide: Wo, useValue: t.appId },
                { provide: Nb, useExisting: Wo },
                wV,
              ],
            };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(n, 12));
          }),
          (n.ɵmod = Ze({ type: n })),
          (n.ɵinj = Be({ providers: oL, imports: [Tb, X1] })),
          n
        );
      })();
      "undefined" != typeof window && window;
      const Ts_apiUrl = "https://md-service-app.herokuapp.com/api/v1";
      function H(...n) {
        let e = n[n.length - 1];
        return Di(e) ? (n.pop(), dc(n, e)) : fc(n);
      }
      function As(n, e) {
        return Je(n, e, 1);
      }
      function lr(n, e) {
        return function (r) {
          return r.lift(new pL(n, e));
        };
      }
      class pL {
        constructor(e, t) {
          (this.predicate = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new gL(e, this.predicate, this.thisArg));
        }
      }
      class gL extends Ce {
        constructor(e, t, r) {
          super(e), (this.predicate = t), (this.thisArg = r), (this.count = 0);
        }
        _next(e) {
          let t;
          try {
            t = this.predicate.call(this.thisArg, e, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          t && this.destination.next(e);
        }
      }
      class $b {}
      class Gb {}
      class en {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((t) => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                              const i = t.slice(0, r),
                                s = i.toLowerCase(),
                                o = t.slice(r + 1).trim();
                              this.maybeSetNormalizedName(i, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(o)
                                  : this.headers.set(s, [o]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((t) => {
                            let r = e[t];
                            const i = t.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(i, r),
                                this.maybeSetNormalizedName(t, i));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof en
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((t) => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new en();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof en
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let r = e.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const i = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              i.push(...r), this.headers.set(t, i);
              break;
            case "d":
              const s = e.value;
              if (s) {
                let o = this.headers.get(t);
                if (!o) return;
                (o = o.filter((a) => -1 === s.indexOf(a))),
                  0 === o.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, o);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class mL {
        encodeKey(e) {
          return qb(e);
        }
        encodeValue(e) {
          return qb(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const _L = /%(\d[a-f0-9])/gi,
        CL = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "2B": "+",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function qb(n) {
        return encodeURIComponent(n).replace(_L, (e, t) => {
          var r;
          return null !== (r = CL[t]) && void 0 !== r ? r : e;
        });
      }
      function Wb(n) {
        return `${n}`;
      }
      class Pr {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new mL()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (n, e) {
              const t = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const s = i.indexOf("="),
                        [o, a] =
                          -1 == s
                            ? [e.decodeKey(i), ""]
                            : [
                                e.decodeKey(i.slice(0, s)),
                                e.decodeValue(i.slice(s + 1)),
                              ],
                        l = t.get(o) || [];
                      l.push(a), t.set(o, l);
                    }),
                t
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((t) => {
                  const r = e.fromObject[t];
                  this.map.set(t, Array.isArray(r) ? r : [r]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        appendAll(e) {
          const t = [];
          return (
            Object.keys(e).forEach((r) => {
              const i = e[r];
              Array.isArray(i)
                ? i.forEach((s) => {
                    t.push({ param: r, value: s, op: "a" });
                  })
                : t.push({ param: r, value: i, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((r) => t + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const t = new Pr({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(e)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(Wb(e.value)), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let r = this.map.get(e.param) || [];
                      const i = r.indexOf(Wb(e.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(e.param, r)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class vL {
        constructor() {
          this.map = new Map();
        }
        set(e, t) {
          return this.map.set(e, t), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function zb(n) {
        return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer;
      }
      function Qb(n) {
        return "undefined" != typeof Blob && n instanceof Blob;
      }
      function Kb(n) {
        return "undefined" != typeof FormData && n instanceof FormData;
      }
      class na {
        constructor(e, t, r, i) {
          let s;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function (n) {
              switch (n) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (s = i))
              : (s = r),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new en()),
            this.context || (this.context = new vL()),
            this.params)
          ) {
            const o = this.params.toString();
            if (0 === o.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + o;
            }
          } else (this.params = new Pr()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : zb(this.body) ||
              Qb(this.body) ||
              Kb(this.body) ||
              (function (n) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  n instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Pr
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Kb(this.body)
            ? null
            : Qb(this.body)
            ? this.body.type || null
            : zb(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Pr
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          var t;
          const r = e.method || this.method,
            i = e.url || this.url,
            s = e.responseType || this.responseType,
            o = void 0 !== e.body ? e.body : this.body,
            a =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            l =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let u = e.headers || this.headers,
            c = e.params || this.params;
          const d = null !== (t = e.context) && void 0 !== t ? t : this.context;
          return (
            void 0 !== e.setHeaders &&
              (u = Object.keys(e.setHeaders).reduce(
                (f, h) => f.set(h, e.setHeaders[h]),
                u
              )),
            e.setParams &&
              (c = Object.keys(e.setParams).reduce(
                (f, h) => f.set(h, e.setParams[h]),
                c
              )),
            new na(r, i, o, {
              params: c,
              headers: u,
              context: d,
              reportProgress: l,
              responseType: s,
              withCredentials: a,
            })
          );
        }
      }
      var je = (() => (
        ((je = je || {})[(je.Sent = 0)] = "Sent"),
        (je[(je.UploadProgress = 1)] = "UploadProgress"),
        (je[(je.ResponseHeader = 2)] = "ResponseHeader"),
        (je[(je.DownloadProgress = 3)] = "DownloadProgress"),
        (je[(je.Response = 4)] = "Response"),
        (je[(je.User = 5)] = "User"),
        je
      ))();
      class Oh {
        constructor(e, t = 200, r = "OK") {
          (this.headers = e.headers || new en()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || r),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Fh extends Oh {
        constructor(e = {}) {
          super(e), (this.type = je.ResponseHeader);
        }
        clone(e = {}) {
          return new Fh({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class fu extends Oh {
        constructor(e = {}) {
          super(e),
            (this.type = je.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new fu({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class Yb extends Oh {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function kh(n, e) {
        return {
          body: e,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let hu = (() => {
        class n {
          constructor(t) {
            this.handler = t;
          }
          request(t, r, i = {}) {
            let s;
            if (t instanceof na) s = t;
            else {
              let l, u;
              (l = i.headers instanceof en ? i.headers : new en(i.headers)),
                i.params &&
                  (u =
                    i.params instanceof Pr
                      ? i.params
                      : new Pr({ fromObject: i.params })),
                (s = new na(t, r, void 0 !== i.body ? i.body : null, {
                  headers: l,
                  context: i.context,
                  params: u,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const o = H(s).pipe(As((l) => this.handler.handle(l)));
            if (t instanceof na || "events" === i.observe) return o;
            const a = o.pipe(lr((l) => l instanceof fu));
            switch (i.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      te((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      te((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      te((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  case "json":
                  default:
                    return a.pipe(te((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(t, r = {}) {
            return this.request("DELETE", t, r);
          }
          get(t, r = {}) {
            return this.request("GET", t, r);
          }
          head(t, r = {}) {
            return this.request("HEAD", t, r);
          }
          jsonp(t, r) {
            return this.request("JSONP", t, {
              params: new Pr().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, r = {}) {
            return this.request("OPTIONS", t, r);
          }
          patch(t, r, i = {}) {
            return this.request("PATCH", t, kh(i, r));
          }
          post(t, r, i = {}) {
            return this.request("POST", t, kh(i, r));
          }
          put(t, r, i = {}) {
            return this.request("PUT", t, kh(i, r));
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E($b));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Jb {
        constructor(e, t) {
          (this.next = e), (this.interceptor = t);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const Vh = new G("HTTP_INTERCEPTORS");
      let DL = (() => {
        class n {
          intercept(t, r) {
            return r.handle(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const wL = /^\)\]\}',?\n/;
      let Zb = (() => {
        class n {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ("JSONP" === t.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new ae((r) => {
              const i = this.xhrFactory.build();
              if (
                (i.open(t.method, t.urlWithParams),
                t.withCredentials && (i.withCredentials = !0),
                t.headers.forEach((h, p) => i.setRequestHeader(h, p.join(","))),
                t.headers.has("Accept") ||
                  i.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !t.headers.has("Content-Type"))
              ) {
                const h = t.detectContentTypeHeader();
                null !== h && i.setRequestHeader("Content-Type", h);
              }
              if (t.responseType) {
                const h = t.responseType.toLowerCase();
                i.responseType = "json" !== h ? h : "text";
              }
              const s = t.serializeBody();
              let o = null;
              const a = () => {
                  if (null !== o) return o;
                  const h = 1223 === i.status ? 204 : i.status,
                    p = i.statusText || "OK",
                    m = new en(i.getAllResponseHeaders()),
                    g =
                      (function (n) {
                        return "responseURL" in n && n.responseURL
                          ? n.responseURL
                          : /^X-Request-URL:/m.test(n.getAllResponseHeaders())
                          ? n.getResponseHeader("X-Request-URL")
                          : null;
                      })(i) || t.url;
                  return (
                    (o = new Fh({
                      headers: m,
                      status: h,
                      statusText: p,
                      url: g,
                    })),
                    o
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: m, url: g } = a(),
                    _ = null;
                  204 !== p &&
                    (_ = void 0 === i.response ? i.responseText : i.response),
                    0 === p && (p = _ ? 200 : 0);
                  let y = p >= 200 && p < 300;
                  if ("json" === t.responseType && "string" == typeof _) {
                    const b = _;
                    _ = _.replace(wL, "");
                    try {
                      _ = "" !== _ ? JSON.parse(_) : null;
                    } catch (D) {
                      (_ = b), y && ((y = !1), (_ = { error: D, text: _ }));
                    }
                  }
                  y
                    ? (r.next(
                        new fu({
                          body: _,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: g || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new Yb({
                          error: _,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: g || void 0,
                        })
                      );
                },
                u = (h) => {
                  const { url: p } = a(),
                    m = new Yb({
                      error: h,
                      status: i.status || 0,
                      statusText: i.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: je.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === t.responseType &&
                      !!i.responseText &&
                      (p.partialText = i.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: je.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                i.addEventListener("load", l),
                i.addEventListener("error", u),
                i.addEventListener("timeout", u),
                i.addEventListener("abort", u),
                t.reportProgress &&
                  (i.addEventListener("progress", d),
                  null !== s &&
                    i.upload &&
                    i.upload.addEventListener("progress", f)),
                i.send(s),
                r.next({ type: je.Sent }),
                () => {
                  i.removeEventListener("error", u),
                    i.removeEventListener("abort", u),
                    i.removeEventListener("load", l),
                    i.removeEventListener("timeout", u),
                    t.reportProgress &&
                      (i.removeEventListener("progress", d),
                      null !== s &&
                        i.upload &&
                        i.upload.removeEventListener("progress", f)),
                    i.readyState !== i.DONE && i.abort();
                }
              );
            });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(Pb));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Lh = new G("XSRF_COOKIE_NAME"),
        jh = new G("XSRF_HEADER_NAME");
      class Xb {}
      let TL = (() => {
          class n {
            constructor(t, r, i) {
              (this.doc = t),
                (this.platform = r),
                (this.cookieName = i),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = _b(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(ke), E(kl), E(Lh));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Bh = (() => {
          class n {
            constructor(t, r) {
              (this.tokenService = t), (this.headerName = r);
            }
            intercept(t, r) {
              const i = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                i.startsWith("http://") ||
                i.startsWith("https://")
              )
                return r.handle(t);
              const s = this.tokenService.getToken();
              return (
                null !== s &&
                  !t.headers.has(this.headerName) &&
                  (t = t.clone({ headers: t.headers.set(this.headerName, s) })),
                r.handle(t)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(Xb), E(jh));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        AL = (() => {
          class n {
            constructor(t, r) {
              (this.backend = t), (this.injector = r), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const r = this.injector.get(Vh, []);
                this.chain = r.reduceRight(
                  (i, s) => new Jb(i, s),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(Gb), E(ie));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        ML = (() => {
          class n {
            static disable() {
              return {
                ngModule: n,
                providers: [{ provide: Bh, useClass: DL }],
              };
            }
            static withOptions(t = {}) {
              return {
                ngModule: n,
                providers: [
                  t.cookieName ? { provide: Lh, useValue: t.cookieName } : [],
                  t.headerName ? { provide: jh, useValue: t.headerName } : [],
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({
              providers: [
                Bh,
                { provide: Vh, useExisting: Bh, multi: !0 },
                { provide: Xb, useClass: TL },
                { provide: Lh, useValue: "XSRF-TOKEN" },
                { provide: jh, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            n
          );
        })(),
        IL = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({
              providers: [
                hu,
                { provide: $b, useClass: AL },
                Zb,
                { provide: Gb, useExisting: Zb },
              ],
              imports: [
                [
                  ML.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            n
          );
        })(),
        eD = (() => {
          class n {
            constructor(t) {
              (this.httpClient = t),
                (this.headers = new en()),
                this.headers.append("Content-Type", "application/json");
            }
            getVideoInfoList(t) {
              return this.httpClient.get(`${Ts_apiUrl}/search`, {
                headers: this.headers,
                params: { query: t },
              });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(hu));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        kD = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({})),
            n
          );
        })();
      const np = new G("NgModelWithFormControlWarning");
      let XD = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({ imports: [[kD]] })),
            n
          );
        })(),
        w2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({ imports: [XD] })),
            n
          );
        })(),
        S2 = (() => {
          class n {
            static withConfig(t) {
              return {
                ngModule: n,
                providers: [
                  { provide: np, useValue: t.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({ imports: [XD] })),
            n
          );
        })();
      class ew {}
      const ur = "*";
      function tw(n, e = null) {
        return { type: 2, steps: n, options: e };
      }
      function nw(n) {
        return { type: 6, styles: n, offset: null };
      }
      function rw(n) {
        Promise.resolve(null).then(n);
      }
      class Is {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          rw(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
      }
      class iw {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            r = 0,
            i = 0;
          const s = this.players.length;
          0 == s
            ? rw(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++t == s && this._onFinish();
                }),
                  o.onDestroy(() => {
                    ++r == s && this._onDestroy();
                  }),
                  o.onStart(() => {
                    ++i == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((r) => {
            const i = r.totalTime ? Math.min(1, t / r.totalTime) : 1;
            r.setPosition(i);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (t, r) => (null === t || r.totalTime > t.totalTime ? r : t),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
      }
      function sw() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function cp() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Fr(n) {
        switch (n.length) {
          case 0:
            return new Is();
          case 1:
            return n[0];
          default:
            return new iw(n);
        }
      }
      function ow(n, e, t, r, i = {}, s = {}) {
        const o = [],
          a = [];
        let l = -1,
          u = null;
        if (
          (r.forEach((c) => {
            const d = c.offset,
              f = d == l,
              h = (f && u) || {};
            Object.keys(c).forEach((p) => {
              let m = p,
                g = c[p];
              if ("offset" !== p)
                switch (((m = e.normalizePropertyName(m, o)), g)) {
                  case "!":
                    g = i[p];
                    break;
                  case ur:
                    g = s[p];
                    break;
                  default:
                    g = e.normalizeStyleValue(p, m, g, o);
                }
              h[m] = g;
            }),
              f || a.push(h),
              (u = h),
              (l = d);
          }),
          o.length)
        ) {
          const c = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${c}${o.join(c)}`
          );
        }
        return a;
      }
      function dp(n, e, t, r) {
        switch (e) {
          case "start":
            n.onStart(() => r(t && fp(t, "start", n)));
            break;
          case "done":
            n.onDone(() => r(t && fp(t, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => r(t && fp(t, "destroy", n)));
        }
      }
      function fp(n, e, t) {
        const r = t.totalTime,
          s = hp(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            null == r ? n.totalTime : r,
            !!t.disabled
          ),
          o = n._data;
        return null != o && (s._data = o), s;
      }
      function hp(n, e, t, r, i = "", s = 0, o) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: r,
          phaseName: i,
          totalTime: s,
          disabled: !!o,
        };
      }
      function Ft(n, e, t) {
        let r;
        return (
          n instanceof Map
            ? ((r = n.get(e)), r || n.set(e, (r = t)))
            : ((r = n[e]), r || (r = n[e] = t)),
          r
        );
      }
      function aw(n) {
        const e = n.indexOf(":");
        return [n.substring(1, e), n.substr(e + 1)];
      }
      let pp = (n, e) => !1,
        gp = (n, e) => !1,
        lw = (n, e, t) => [];
      const uw = cp();
      (uw || "undefined" != typeof Element) &&
        ((pp = sw()
          ? (n, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === n) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (n, e) => n.contains(e)),
        (gp = (() => {
          if (uw || Element.prototype.matches) return (n, e) => n.matches(e);
          {
            const n = Element.prototype,
              e =
                n.matchesSelector ||
                n.mozMatchesSelector ||
                n.msMatchesSelector ||
                n.oMatchesSelector ||
                n.webkitMatchesSelector;
            return e ? (t, r) => e.apply(t, [r]) : gp;
          }
        })()),
        (lw = (n, e, t) => {
          let r = [];
          if (t) {
            const i = n.querySelectorAll(e);
            for (let s = 0; s < i.length; s++) r.push(i[s]);
          } else {
            const i = n.querySelector(e);
            i && r.push(i);
          }
          return r;
        }));
      let ci = null,
        cw = !1;
      function mp(n) {
        ci ||
          ((ci = ("undefined" != typeof document ? document.body : null) || {}),
          (cw = !!ci.style && "WebkitAppearance" in ci.style));
        let e = !0;
        return (
          ci.style &&
            !(function (n) {
              return "ebkit" == n.substring(1, 6);
            })(n) &&
            ((e = n in ci.style),
            !e &&
              cw &&
              (e =
                "Webkit" + n.charAt(0).toUpperCase() + n.substr(1) in
                ci.style)),
          e
        );
      }
      const yp = gp,
        _p = pp,
        Cp = lw;
      function dw(n) {
        const e = {};
        return (
          Object.keys(n).forEach((t) => {
            const r = t.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[r] = n[t];
          }),
          e
        );
      }
      let fw = (() => {
          class n {
            validateStyleProperty(t) {
              return mp(t);
            }
            matchesElement(t, r) {
              return yp(t, r);
            }
            containsElement(t, r) {
              return _p(t, r);
            }
            query(t, r, i) {
              return Cp(t, r, i);
            }
            computeStyle(t, r, i) {
              return i || "";
            }
            animate(t, r, i, s, o, a = [], l) {
              return new Is(i, s);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        vp = (() => {
          class n {}
          return (n.NOOP = new fw()), n;
        })();
      const Ep = "ng-enter",
        wu = "ng-leave",
        Su = "ng-trigger",
        Tu = ".ng-trigger",
        pw = "ng-animating",
        bp = ".ng-animating";
      function di(n) {
        if ("number" == typeof n) return n;
        const e = n.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Dp(parseFloat(e[1]), e[2]);
      }
      function Dp(n, e) {
        switch (e) {
          case "s":
            return 1e3 * n;
          default:
            return n;
        }
      }
      function Au(n, e, t) {
        return n.hasOwnProperty("duration")
          ? n
          : (function (n, e, t) {
              let i,
                s = 0,
                o = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return (
                    e.push(`The provided timing value "${n}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                i = Dp(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = Dp(parseFloat(l), a[4]));
                const u = a[5];
                u && (o = u);
              } else i = n;
              if (!t) {
                let a = !1,
                  l = e.length;
                i < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (a = !0)),
                  s < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (a = !0)),
                  a &&
                    e.splice(
                      l,
                      0,
                      `The provided timing value "${n}" is invalid.`
                    );
              }
              return { duration: i, delay: s, easing: o };
            })(n, e, t);
      }
      function Ps(n, e = {}) {
        return (
          Object.keys(n).forEach((t) => {
            e[t] = n[t];
          }),
          e
        );
      }
      function kr(n, e, t = {}) {
        if (e) for (let r in n) t[r] = n[r];
        else Ps(n, t);
        return t;
      }
      function mw(n, e, t) {
        return t ? e + ":" + t + ";" : "";
      }
      function yw(n) {
        let e = "";
        for (let t = 0; t < n.style.length; t++) {
          const r = n.style.item(t);
          e += mw(0, r, n.style.getPropertyValue(r));
        }
        for (const t in n.style)
          n.style.hasOwnProperty(t) &&
            !t.startsWith("_") &&
            (e += mw(0, O2(t), n.style[t]));
        n.setAttribute("style", e);
      }
      function Un(n, e, t) {
        n.style &&
          (Object.keys(e).forEach((r) => {
            const i = Sp(r);
            t && !t.hasOwnProperty(r) && (t[r] = n.style[i]),
              (n.style[i] = e[r]);
          }),
          cp() && yw(n));
      }
      function fi(n, e) {
        n.style &&
          (Object.keys(e).forEach((t) => {
            const r = Sp(t);
            n.style[r] = "";
          }),
          cp() && yw(n));
      }
      function aa(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : tw(n)) : n;
      }
      const wp = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function _w(n) {
        let e = [];
        if ("string" == typeof n) {
          let t;
          for (; (t = wp.exec(n)); ) e.push(t[1]);
          wp.lastIndex = 0;
        }
        return e;
      }
      function Mu(n, e, t) {
        const r = n.toString(),
          i = r.replace(wp, (s, o) => {
            let a = e[o];
            return (
              e.hasOwnProperty(o) ||
                (t.push(`Please provide a value for the animation param ${o}`),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? n : i;
      }
      function Iu(n) {
        const e = [];
        let t = n.next();
        for (; !t.done; ) e.push(t.value), (t = n.next());
        return e;
      }
      const R2 = /-+([a-z0-9])/g;
      function Sp(n) {
        return n.replace(R2, (...e) => e[1].toUpperCase());
      }
      function O2(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Cw(n, e) {
        return 0 === n || 0 === e;
      }
      function vw(n, e, t) {
        const r = Object.keys(t);
        if (r.length && e.length) {
          let s = e[0],
            o = [];
          if (
            (r.forEach((a) => {
              s.hasOwnProperty(a) || o.push(a), (s[a] = t[a]);
            }),
            o.length)
          )
            for (var i = 1; i < e.length; i++) {
              let a = e[i];
              o.forEach(function (l) {
                a[l] = Tp(n, l);
              });
            }
        }
        return e;
      }
      function kt(n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t);
          case 0:
            return n.visitState(e, t);
          case 1:
            return n.visitTransition(e, t);
          case 2:
            return n.visitSequence(e, t);
          case 3:
            return n.visitGroup(e, t);
          case 4:
            return n.visitAnimate(e, t);
          case 5:
            return n.visitKeyframes(e, t);
          case 6:
            return n.visitStyle(e, t);
          case 8:
            return n.visitReference(e, t);
          case 9:
            return n.visitAnimateChild(e, t);
          case 10:
            return n.visitAnimateRef(e, t);
          case 11:
            return n.visitQuery(e, t);
          case 12:
            return n.visitStagger(e, t);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${e.type}`
            );
        }
      }
      function Tp(n, e) {
        return window.getComputedStyle(n)[e];
      }
      function F2(n, e) {
        const t = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((r) =>
                (function (n, e, t) {
                  if (":" == n[0]) {
                    const l = (function (n, e) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, r) => parseFloat(r) > parseFloat(t);
                        case ":decrement":
                          return (t, r) => parseFloat(r) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${n}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(n, t);
                    if ("function" == typeof l) return void e.push(l);
                    n = l;
                  }
                  const r = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      t.push(
                        `The provided transition expression "${n}" is not supported`
                      ),
                      e
                    );
                  const i = r[1],
                    s = r[2],
                    o = r[3];
                  e.push(Ew(i, o));
                  "<" == s[0] && !("*" == i && "*" == o) && e.push(Ew(o, i));
                })(r, t, e)
              )
            : t.push(n),
          t
        );
      }
      const Nu = new Set(["true", "1"]),
        xu = new Set(["false", "0"]);
      function Ew(n, e) {
        const t = Nu.has(n) || xu.has(n),
          r = Nu.has(e) || xu.has(e);
        return (i, s) => {
          let o = "*" == n || n == i,
            a = "*" == e || e == s;
          return (
            !o && t && "boolean" == typeof i && (o = i ? Nu.has(n) : xu.has(n)),
            !a && r && "boolean" == typeof s && (a = s ? Nu.has(e) : xu.has(e)),
            o && a
          );
        };
      }
      const L2 = new RegExp("s*:selfs*,?", "g");
      function Ap(n, e, t) {
        return new j2(n).build(e, t);
      }
      class j2 {
        constructor(e) {
          this._driver = e;
        }
        build(e, t) {
          const r = new U2(t);
          return this._resetContextStyleTimingState(r), kt(this, aa(e), r);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let r = (t.queryCount = 0),
            i = (t.depCount = 0);
          const s = [],
            o = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const l = a,
                  u = l.name;
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((c) => {
                    (l.name = c), s.push(this.visitState(l, t));
                  }),
                  (l.name = u);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, t);
                (r += l.queryCount), (i += l.depCount), o.push(l);
              } else
                t.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: e.name,
              states: s,
              transitions: o,
              queryCount: r,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const r = this.visitStyle(e.styles, t),
            i = (e.options && e.options.params) || null;
          if (r.containsDynamicStyles) {
            const s = new Set(),
              o = i || {};
            if (
              (r.styles.forEach((a) => {
                if (Ru(a)) {
                  const l = a;
                  Object.keys(l).forEach((u) => {
                    _w(l[u]).forEach((c) => {
                      o.hasOwnProperty(c) || s.add(c);
                    });
                  });
                }
              }),
              s.size)
            ) {
              const a = Iu(s.values());
              t.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${a.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: r,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const r = kt(this, aa(e.animation), t);
          return {
            type: 1,
            matchers: F2(e.expr, t.errors),
            animation: r,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: hi(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((r) => kt(this, r, t)),
            options: hi(e.options),
          };
        }
        visitGroup(e, t) {
          const r = t.currentTime;
          let i = 0;
          const s = e.steps.map((o) => {
            t.currentTime = r;
            const a = kt(this, o, t);
            return (i = Math.max(i, t.currentTime)), a;
          });
          return (
            (t.currentTime = i), { type: 3, steps: s, options: hi(e.options) }
          );
        }
        visitAnimate(e, t) {
          const r = (function (n, e) {
            let t = null;
            if (n.hasOwnProperty("duration")) t = n;
            else if ("number" == typeof n) return Mp(Au(n, e).duration, 0, "");
            const r = n;
            if (
              r
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = Mp(0, 0, "");
              return (s.dynamic = !0), (s.strValue = r), s;
            }
            return (t = t || Au(r, e)), Mp(t.duration, t.delay, t.easing);
          })(e.timings, t.errors);
          t.currentAnimateTimings = r;
          let i,
            s = e.styles ? e.styles : nw({});
          if (5 == s.type) i = this.visitKeyframes(s, t);
          else {
            let o = e.styles,
              a = !1;
            if (!o) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (o = nw(u));
            }
            t.currentTime += r.duration + r.delay;
            const l = this.visitStyle(o, t);
            (l.isEmptyStep = a), (i = l);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          );
        }
        visitStyle(e, t) {
          const r = this._makeStyleAst(e, t);
          return this._validateStyleAst(r, t), r;
        }
        _makeStyleAst(e, t) {
          const r = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((o) => {
                "string" == typeof o
                  ? o == ur
                    ? r.push(o)
                    : t.errors.push(
                        `The provided style string value ${o} is not allowed.`
                      )
                  : r.push(o);
              })
            : r.push(e.styles);
          let i = !1,
            s = null;
          return (
            r.forEach((o) => {
              if (Ru(o)) {
                const a = o,
                  l = a.easing;
                if ((l && ((s = l), delete a.easing), !i))
                  for (let u in a)
                    if (a[u].toString().indexOf("{{") >= 0) {
                      i = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: i,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const r = t.currentAnimateTimings;
          let i = t.currentTime,
            s = t.currentTime;
          r && s > 0 && (s -= r.duration + r.delay),
            e.styles.forEach((o) => {
              "string" != typeof o &&
                Object.keys(o).forEach((a) => {
                  if (!this._driver.validateStyleProperty(a))
                    return void t.errors.push(
                      `The provided animation property "${a}" is not a supported CSS property for animations`
                    );
                  const l = t.collectedStyles[t.currentQuerySelector],
                    u = l[a];
                  let c = !0;
                  u &&
                    (s != i &&
                      s >= u.startTime &&
                      i <= u.endTime &&
                      (t.errors.push(
                        `The CSS property "${a}" that exists between the times of "${u.startTime}ms" and "${u.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${i}ms"`
                      ),
                      (c = !1)),
                    (s = u.startTime)),
                    c && (l[a] = { startTime: s, endTime: i }),
                    t.options &&
                      (function (n, e, t) {
                        const r = e.params || {},
                          i = _w(n);
                        i.length &&
                          i.forEach((s) => {
                            r.hasOwnProperty(s) ||
                              t.push(
                                `Unable to resolve the local animation param ${s} in the given list of values`
                              );
                          });
                      })(o[a], t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const r = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              r
            );
          let s = 0;
          const o = [];
          let a = !1,
            l = !1,
            u = 0;
          const c = e.steps.map((_) => {
            const y = this._makeStyleAst(_, t);
            let b =
                null != y.offset
                  ? y.offset
                  : (function (n) {
                      if ("string" == typeof n) return null;
                      let e = null;
                      if (Array.isArray(n))
                        n.forEach((t) => {
                          if (Ru(t) && t.hasOwnProperty("offset")) {
                            const r = t;
                            (e = parseFloat(r.offset)), delete r.offset;
                          }
                        });
                      else if (Ru(n) && n.hasOwnProperty("offset")) {
                        const t = n;
                        (e = parseFloat(t.offset)), delete t.offset;
                      }
                      return e;
                    })(y.styles),
              D = 0;
            return (
              null != b && (s++, (D = y.offset = b)),
              (l = l || D < 0 || D > 1),
              (a = a || D < u),
              (u = D),
              o.push(D),
              y
            );
          });
          l &&
            t.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            a &&
              t.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const d = e.steps.length;
          let f = 0;
          s > 0 && s < d
            ? t.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == s && (f = 1 / (d - 1));
          const h = d - 1,
            p = t.currentTime,
            m = t.currentAnimateTimings,
            g = m.duration;
          return (
            c.forEach((_, y) => {
              const b = f > 0 ? (y == h ? 1 : f * y) : o[y],
                D = b * g;
              (t.currentTime = p + m.delay + D),
                (m.duration = D),
                this._validateStyleAst(_, t),
                (_.offset = b),
                r.styles.push(_);
            }),
            r
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: kt(this, aa(e.animation), t),
            options: hi(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: hi(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: hi(e.options),
          };
        }
        visitQuery(e, t) {
          const r = t.currentQuerySelector,
            i = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [s, o] = (function (n) {
            const e = !!n.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (n = n.replace(L2, "")),
              [
                (n = n
                  .replace(/@\*/g, Tu)
                  .replace(/@\w+/g, (t) => Tu + "-" + t.substr(1))
                  .replace(/:animating/g, bp)),
                e,
              ]
            );
          })(e.selector);
          (t.currentQuerySelector = r.length ? r + " " + s : s),
            Ft(t.collectedStyles, t.currentQuerySelector, {});
          const a = kt(this, aa(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = r),
            {
              type: 11,
              selector: s,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: o,
              animation: a,
              originalSelector: e.selector,
              options: hi(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push("stagger() can only be used inside of query()");
          const r =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Au(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: kt(this, aa(e.animation), t),
            timings: r,
            options: null,
          };
        }
      }
      class U2 {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function Ru(n) {
        return !Array.isArray(n) && "object" == typeof n;
      }
      function hi(n) {
        return (
          n
            ? (n = Ps(n)).params &&
              (n.params = (function (n) {
                return n ? Ps(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function Mp(n, e, t) {
        return { duration: n, delay: e, easing: t };
      }
      function Ip(n, e, t, r, i, s, o = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: r,
          duration: i,
          delay: s,
          totalTime: i + s,
          easing: o,
          subTimeline: a,
        };
      }
      class Ou {
        constructor() {
          this._map = new Map();
        }
        consume(e) {
          let t = this._map.get(e);
          return t ? this._map.delete(e) : (t = []), t;
        }
        append(e, t) {
          let r = this._map.get(e);
          r || this._map.set(e, (r = [])), r.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const z2 = new RegExp(":enter", "g"),
        K2 = new RegExp(":leave", "g");
      function Pp(n, e, t, r, i, s = {}, o = {}, a, l, u = []) {
        return new Y2().buildKeyframes(n, e, t, r, i, s, o, a, l, u);
      }
      class Y2 {
        buildKeyframes(e, t, r, i, s, o, a, l, u, c = []) {
          u = u || new Ou();
          const d = new Np(e, t, u, i, s, c, []);
          (d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            kt(this, r, d);
          const f = d.timelines.filter((h) => h.containsAnimation());
          if (f.length && Object.keys(a).length) {
            const h = f[f.length - 1];
            h.allowOnlyTimelineStyles() || h.setStyles([a], null, d.errors, l);
          }
          return f.length
            ? f.map((h) => h.buildKeyframes())
            : [Ip(t, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const r = t.subInstructions.consume(t.element);
          if (r) {
            const i = t.createSubContext(e.options),
              s = t.currentTimeline.currentTime,
              o = this._visitSubInstructions(r, i, i.options);
            s != o && t.transformIntoNewTimeline(o);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const r = t.createSubContext(e.options);
          r.transformIntoNewTimeline(),
            this.visitReference(e.animation, r),
            t.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, r) {
          let s = t.currentTimeline.currentTime;
          const o = null != r.duration ? di(r.duration) : null,
            a = null != r.delay ? di(r.delay) : null;
          return (
            0 !== o &&
              e.forEach((l) => {
                const u = t.appendInstructionToTimeline(l, o, a);
                s = Math.max(s, u.duration + u.delay);
              }),
            s
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            kt(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const r = t.subContextCount;
          let i = t;
          const s = e.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((i = t.createSubContext(s)),
            i.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = Fu));
            const o = di(s.delay);
            i.delayNextStep(o);
          }
          e.steps.length &&
            (e.steps.forEach((o) => kt(this, o, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const r = [];
          let i = t.currentTimeline.currentTime;
          const s = e.options && e.options.delay ? di(e.options.delay) : 0;
          e.steps.forEach((o) => {
            const a = t.createSubContext(e.options);
            s && a.delayNextStep(s),
              kt(this, o, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((o) => t.currentTimeline.mergeTimelineCollectedStyles(o)),
            t.transformIntoNewTimeline(i),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const r = e.strValue;
            return Au(t.params ? Mu(r, t.params, t.errors) : r, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const r = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            i = t.currentTimeline;
          r.delay && (t.incrementTime(r.delay), i.snapshotCurrentStyles());
          const s = e.style;
          5 == s.type
            ? this.visitKeyframes(s, t)
            : (t.incrementTime(r.duration),
              this.visitStyle(s, t),
              i.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const r = t.currentTimeline,
            i = t.currentAnimateTimings;
          !i && r.getCurrentStyleProperties().length && r.forwardFrame();
          const s = (i && i.easing) || e.easing;
          e.isEmptyStep
            ? r.applyEmptyStep(s)
            : r.setStyles(e.styles, s, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const r = t.currentAnimateTimings,
            i = t.currentTimeline.duration,
            s = r.duration,
            a = t.createSubContext().currentTimeline;
          (a.easing = r.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, t.errors, t.options),
                a.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(i + s),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const r = t.currentTimeline.currentTime,
            i = e.options || {},
            s = i.delay ? di(i.delay) : 0;
          s &&
            (6 === t.previousNode.type ||
              (0 == r &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Fu));
          let o = r;
          const a = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!i.optional,
            t.errors
          );
          t.currentQueryTotal = a.length;
          let l = null;
          a.forEach((u, c) => {
            t.currentQueryIndex = c;
            const d = t.createSubContext(e.options, u);
            s && d.delayNextStep(s),
              u === t.element && (l = d.currentTimeline),
              kt(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(o),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const r = t.parentContext,
            i = t.currentTimeline,
            s = e.timings,
            o = Math.abs(s.duration),
            a = o * (t.currentQueryTotal - 1);
          let l = o * t.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = r.currentStaggerTime;
          }
          const c = t.currentTimeline;
          l && c.delayNextStep(l);
          const d = c.currentTime;
          kt(this, e.animation, t),
            (t.previousNode = e),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
        }
      }
      const Fu = {};
      class Np {
        constructor(e, t, r, i, s, o, a, l) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Fu),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new ku(this._driver, t, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const r = e;
          let i = this.options;
          null != r.duration && (i.duration = di(r.duration)),
            null != r.delay && (i.delay = di(r.delay));
          const s = r.params;
          if (s) {
            let o = i.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!t || !o.hasOwnProperty(a)) &&
                  (o[a] = Mu(s[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const r = (e.params = {});
              Object.keys(t).forEach((i) => {
                r[i] = t[i];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, r) {
          const i = t || this.element,
            s = new Np(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(e),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = Fu),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, r) {
          const i = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != r ? r : 0) +
                e.delay,
              easing: "",
            },
            s = new J2(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              i,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(s), i;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, r, i, s, o) {
          let a = [];
          if ((i && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(z2, "." + this._enterClassName)).replace(
              K2,
              "." + this._leaveClassName
            );
            let u = this._driver.query(this.element, e, 1 != r);
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u);
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                `\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`
              ),
            a
          );
        }
      }
      class ku {
        constructor(e, t, r, i) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new ku(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          (this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || ur),
                (this._currentKeyframe[t] = ur);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, t, r, i) {
          t && (this._previousKeyframe.easing = t);
          const s = (i && i.params) || {},
            o = (function (n, e) {
              const t = {};
              let r;
              return (
                n.forEach((i) => {
                  "*" === i
                    ? ((r = r || Object.keys(e)),
                      r.forEach((s) => {
                        t[s] = ur;
                      }))
                    : kr(i, !1, t);
                }),
                t
              );
            })(e, this._globalTimelineStyles);
          Object.keys(o).forEach((a) => {
            const l = Mu(o[a], s, r);
            (this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : ur),
              this._updateStyle(a, l);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach((r) => {
              this._currentKeyframe[r] = e[r];
            }),
            Object.keys(this._localTimelineStyles).forEach((r) => {
              this._currentKeyframe.hasOwnProperty(r) ||
                (this._currentKeyframe[r] = this._localTimelineStyles[r]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const t = this._localTimelineStyles[e];
            (this._pendingStyles[e] = t), this._updateStyle(e, t);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((t) => {
            const r = this._styleSummary[t],
              i = e._styleSummary[t];
            (!r || i.time > r.time) && this._updateStyle(t, i.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((a, l) => {
            const u = kr(a, !0);
            Object.keys(u).forEach((c) => {
              const d = u[c];
              "!" == d ? e.add(c) : d == ur && t.add(c);
            }),
              r || (u.offset = l / this.duration),
              i.push(u);
          });
          const s = e.size ? Iu(e.values()) : [],
            o = t.size ? Iu(t.values()) : [];
          if (r) {
            const a = i[0],
              l = Ps(a);
            (a.offset = 0), (l.offset = 1), (i = [a, l]);
          }
          return Ip(
            this.element,
            i,
            s,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class J2 extends ku {
        constructor(e, t, r, i, s, o, a = !1) {
          super(e, t, o.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: r, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const s = [],
              o = r + t,
              a = t / o,
              l = kr(e[0], !1);
            (l.offset = 0), s.push(l);
            const u = kr(e[0], !1);
            (u.offset = ww(a)), s.push(u);
            const c = e.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = kr(e[d], !1);
              (f.offset = ww((t + f.offset * r) / o)), s.push(f);
            }
            (r = o), (t = 0), (i = ""), (e = s);
          }
          return Ip(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            r,
            t,
            i,
            !0
          );
        }
      }
      function ww(n, e = 3) {
        const t = Math.pow(10, e - 1);
        return Math.round(n * t) / t;
      }
      class xp {}
      class X2 extends xp {
        normalizePropertyName(e, t) {
          return Sp(e);
        }
        normalizeStyleValue(e, t, r, i) {
          let s = "";
          const o = r.toString().trim();
          if (ej[t] && 0 !== r && "0" !== r)
            if ("number" == typeof r) s = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(`Please provide a CSS unit value for ${e}:${r}`);
            }
          return o + s;
        }
      }
      const ej = (() =>
        (function (n) {
          const e = {};
          return n.forEach((t) => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function Sw(n, e, t, r, i, s, o, a, l, u, c, d, f) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: i,
          fromState: t,
          fromStyles: s,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f,
        };
      }
      const Rp = {};
      class Tw {
        constructor(e, t, r) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = r);
        }
        match(e, t, r, i) {
          return (function (n, e, t, r, i) {
            return n.some((s) => s(e, t, r, i));
          })(this.ast.matchers, e, t, r, i);
        }
        buildStyles(e, t, r) {
          const i = this._stateStyles["*"],
            s = this._stateStyles[e],
            o = i ? i.buildStyles(t, r) : {};
          return s ? s.buildStyles(t, r) : o;
        }
        build(e, t, r, i, s, o, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || Rp,
            p = this.buildStyles(r, (a && a.params) || Rp, d),
            m = (l && l.params) || Rp,
            g = this.buildStyles(i, m, d),
            _ = new Set(),
            y = new Map(),
            b = new Map(),
            D = "void" === i,
            k = { params: Object.assign(Object.assign({}, f), m) },
            oe = c ? [] : Pp(e, t, this.ast.animation, s, o, p, g, k, u, d);
          let ce = 0;
          if (
            (oe.forEach((ut) => {
              ce = Math.max(ut.duration + ut.delay, ce);
            }),
            d.length)
          )
            return Sw(t, this._triggerName, r, i, D, p, g, [], [], y, b, ce, d);
          oe.forEach((ut) => {
            const ct = ut.element,
              hr = Ft(y, ct, {});
            ut.preStyleProps.forEach((Sn) => (hr[Sn] = !0));
            const pr = Ft(b, ct, {});
            ut.postStyleProps.forEach((Sn) => (pr[Sn] = !0)),
              ct !== t && _.add(ct);
          });
          const vt = Iu(_.values());
          return Sw(t, this._triggerName, r, i, D, p, g, oe, vt, y, b, ce);
        }
      }
      class rj {
        constructor(e, t, r) {
          (this.styles = e), (this.defaultParams = t), (this.normalizer = r);
        }
        buildStyles(e, t) {
          const r = {},
            i = Ps(this.defaultParams);
          return (
            Object.keys(e).forEach((s) => {
              const o = e[s];
              null != o && (i[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              if ("string" != typeof s) {
                const o = s;
                Object.keys(o).forEach((a) => {
                  let l = o[a];
                  l.length > 1 && (l = Mu(l, i, t));
                  const u = this.normalizer.normalizePropertyName(a, t);
                  (l = this.normalizer.normalizeStyleValue(a, u, l, t)),
                    (r[u] = l);
                });
              }
            }),
            r
          );
        }
      }
      class sj {
        constructor(e, t, r) {
          (this.name = e),
            (this.ast = t),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach((i) => {
              this.states[i.name] = new rj(
                i.style,
                (i.options && i.options.params) || {},
                r
              );
            }),
            Aw(this.states, "true", "1"),
            Aw(this.states, "false", "0"),
            t.transitions.forEach((i) => {
              this.transitionFactories.push(new Tw(e, i, this.states));
            }),
            (this.fallbackTransition = (function (n, e, t) {
              return new Tw(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, r, i) {
          return (
            this.transitionFactories.find((o) => o.match(e, t, r, i)) || null
          );
        }
        matchStyles(e, t, r) {
          return this.fallbackTransition.buildStyles(e, t, r);
        }
      }
      function Aw(n, e, t) {
        n.hasOwnProperty(e)
          ? n.hasOwnProperty(t) || (n[t] = n[e])
          : n.hasOwnProperty(t) && (n[e] = n[t]);
      }
      const aj = new Ou();
      class lj {
        constructor(e, t, r) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = r),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, t) {
          const r = [],
            i = Ap(this._driver, t, r);
          if (r.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${r.join(
                "\n"
              )}`
            );
          this._animations[e] = i;
        }
        _buildPlayer(e, t, r) {
          const i = e.element,
            s = ow(0, this._normalizer, 0, e.keyframes, t, r);
          return this._driver.animate(
            i,
            s,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, r = {}) {
          const i = [],
            s = this._animations[e];
          let o;
          const a = new Map();
          if (
            (s
              ? ((o = Pp(this._driver, t, s, Ep, wu, {}, {}, r, aj, i)),
                o.forEach((c) => {
                  const d = Ft(a, c.element, {});
                  c.postStyleProps.forEach((f) => (d[f] = null));
                }))
              : (i.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (o = [])),
            i.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${i.join(
                "\n"
              )}`
            );
          a.forEach((c, d) => {
            Object.keys(c).forEach((f) => {
              c[f] = this._driver.computeStyle(d, f, ur);
            });
          });
          const u = Fr(
            o.map((c) => {
              const d = a.get(c.element);
              return this._buildPlayer(c, {}, d);
            })
          );
          return (
            (this._playersById[e] = u),
            u.onDestroy(() => this.destroy(e)),
            this.players.push(u),
            u
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const r = this.players.indexOf(t);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t)
            throw new Error(
              `Unable to find the timeline player referenced by ${e}`
            );
          return t;
        }
        listen(e, t, r, i) {
          const s = hp(t, "", "", "");
          return dp(this._getPlayer(e), r, s, i), () => {};
        }
        command(e, t, r, i) {
          if ("register" == r) return void this.register(e, i[0]);
          if ("create" == r) return void this.create(e, t, i[0] || {});
          const s = this._getPlayer(e);
          switch (r) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const Mw = "ng-animate-queued",
        Iw = "ng-animate-disabled",
        Pw = ".ng-animate-disabled",
        fj = [],
        Nw = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        hj = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        tn = "__ng_removed";
      class Op {
        constructor(e, t = "") {
          this.namespaceId = t;
          const r = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function (n) {
              return null != n ? n : null;
            })(r ? e.value : e)),
            r)
          ) {
            const s = Ps(e);
            delete s.value, (this.options = s);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const r = this.options.params;
            Object.keys(t).forEach((i) => {
              null == r[i] && (r[i] = t[i]);
            });
          }
        }
      }
      const la = "void",
        Fp = new Op(la);
      class pj {
        constructor(e, t, r) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = r),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            nn(t, this._hostClassName);
        }
        listen(e, t, r, i) {
          if (!this._triggers.hasOwnProperty(t))
            throw new Error(
              `Unable to listen on the animation trigger event "${r}" because the animation trigger "${t}" doesn't exist!`
            );
          if (null == r || 0 == r.length)
            throw new Error(
              `Unable to listen on the animation trigger "${t}" because the provided event is undefined!`
            );
          if (
            !(function (n) {
              return "start" == n || "done" == n;
            })(r)
          )
            throw new Error(
              `The provided animation trigger event "${r}" for the animation trigger "${t}" is not supported!`
            );
          const s = Ft(this._elementListeners, e, []),
            o = { name: t, phase: r, callback: i };
          s.push(o);
          const a = Ft(this._engine.statesByElement, e, {});
          return (
            a.hasOwnProperty(t) ||
              (nn(e, Su), nn(e, Su + "-" + t), (a[t] = Fp)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o);
                l >= 0 && s.splice(l, 1), this._triggers[t] || delete a[t];
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`
            );
          return t;
        }
        trigger(e, t, r, i = !0) {
          const s = this._getTrigger(t),
            o = new kp(this.id, t, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (nn(e, Su),
            nn(e, Su + "-" + t),
            this._engine.statesByElement.set(e, (a = {})));
          let l = a[t];
          const u = new Op(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            (a[t] = u),
            l || (l = Fp),
            u.value !== la && l.value === u.value)
          ) {
            if (
              !(function (n, e) {
                const t = Object.keys(n),
                  r = Object.keys(e);
                if (t.length != r.length) return !1;
                for (let i = 0; i < t.length; i++) {
                  const s = t[i];
                  if (!e.hasOwnProperty(s) || n[s] !== e[s]) return !1;
                }
                return !0;
              })(l.params, u.params)
            ) {
              const m = [],
                g = s.matchStyles(l.value, l.params, m),
                _ = s.matchStyles(u.value, u.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    fi(e, g), Un(e, _);
                  });
            }
            return;
          }
          const f = Ft(this._engine.playersByElement, e, []);
          f.forEach((m) => {
            m.namespaceId == this.id &&
              m.triggerName == t &&
              m.queued &&
              m.destroy();
          });
          let h = s.matchTransition(l.value, u.value, e, u.params),
            p = !1;
          if (!h) {
            if (!i) return;
            (h = s.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: h,
              fromState: l,
              toState: u,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (nn(e, Mw),
              o.onStart(() => {
                Ns(e, Mw);
              })),
            o.onDone(() => {
              let m = this.players.indexOf(o);
              m >= 0 && this.players.splice(m, 1);
              const g = this._engine.playersByElement.get(e);
              if (g) {
                let _ = g.indexOf(o);
                _ >= 0 && g.splice(_, 1);
              }
            }),
            this.players.push(o),
            f.push(o),
            o
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, r) => {
              delete t[e];
            }),
            this._elementListeners.forEach((t, r) => {
              this._elementListeners.set(
                r,
                t.filter((i) => i.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
          const r = this._engine.driver.query(e, Tu, !0);
          r.forEach((i) => {
            if (i[tn]) return;
            const s = this._engine.fetchNamespacesByElement(i);
            s.size
              ? s.forEach((o) => o.triggerLeaveAnimation(i, t, !1, !0))
              : this.clearElementCache(i);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((i) => this.clearElementCache(i))
            );
        }
        triggerLeaveAnimation(e, t, r, i) {
          const s = this._engine.statesByElement.get(e);
          if (s) {
            const o = [];
            if (
              (Object.keys(s).forEach((a) => {
                if (this._triggers[a]) {
                  const l = this.trigger(e, a, la, i);
                  l && o.push(l);
                }
              }),
              o.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t),
                r && Fr(o).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            r = this._engine.statesByElement.get(e);
          if (t && r) {
            const i = new Set();
            t.forEach((s) => {
              const o = s.name;
              if (i.has(o)) return;
              i.add(o);
              const l = this._triggers[o].fallbackTransition,
                u = r[o] || Fp,
                c = new Op(la),
                d = new kp(this.id, o, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: o,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, t) {
          const r = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let i = !1;
          if (r.totalAnimations) {
            const s = r.players.length ? r.playersByQueriedElement.get(e) : [];
            if (s && s.length) i = !0;
            else {
              let o = e;
              for (; (o = o.parentNode); )
                if (r.statesByElement.get(o)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), i))
            r.markElementAsRemoved(this.id, e, !1, t);
          else {
            const s = e[tn];
            (!s || s === Nw) &&
              (r.afterFlush(() => this.clearElementCache(e)),
              r.destroyInnerAnimations(e),
              r._onRemovalComplete(e, t));
          }
        }
        insertNode(e, t) {
          nn(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((r) => {
              const i = r.player;
              if (i.destroyed) return;
              const s = r.element,
                o = this._elementListeners.get(s);
              o &&
                o.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const l = hp(
                      s,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = e), dp(r.player, a.phase, l, a.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : t.push(r);
            }),
            (this._queue = []),
            t.sort((r, i) => {
              const s = r.transition.ast.depCount,
                o = i.transition.ast.depCount;
              return 0 == s || 0 == o
                ? s - o
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((r) => r.element === e) || t),
            t
          );
        }
      }
      class gj {
        constructor(e, t, r) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, s) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((r) => {
                r.queued && e.push(r);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const r = new pj(e, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(r, t)
              : (this.newHostElements.set(t, r), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = r)
          );
        }
        _balanceNamespaceList(e, t) {
          const r = this._namespaceList.length - 1;
          if (r >= 0) {
            let i = !1;
            for (let s = r; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  t
                )
              ) {
                this._namespaceList.splice(s + 1, 0, e), (i = !0);
                break;
              }
            i || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e;
        }
        register(e, t) {
          let r = this._namespaceLookup[e];
          return r || (r = this.createNamespace(e, t)), r;
        }
        registerTrigger(e, t, r) {
          let i = this._namespaceLookup[e];
          i && i.register(t, r) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const r = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[e];
            const i = this._namespaceList.indexOf(r);
            i >= 0 && this._namespaceList.splice(i, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            r = this.statesByElement.get(e);
          if (r) {
            const i = Object.keys(r);
            for (let s = 0; s < i.length; s++) {
              const o = r[i[s]].namespaceId;
              if (o) {
                const a = this._fetchNamespace(o);
                a && t.add(a);
              }
            }
          }
          return t;
        }
        trigger(e, t, r, i) {
          if (Vu(t)) {
            const s = this._fetchNamespace(e);
            if (s) return s.trigger(t, r, i), !0;
          }
          return !1;
        }
        insertNode(e, t, r, i) {
          if (!Vu(t)) return;
          const s = t[tn];
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(t);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (e) {
            const o = this._fetchNamespace(e);
            o && o.insertNode(t, r);
          }
          i && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), nn(e, Iw))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), Ns(e, Iw));
        }
        removeNode(e, t, r, i) {
          if (Vu(t)) {
            const s = e ? this._fetchNamespace(e) : null;
            if (
              (s ? s.removeNode(t, i) : this.markElementAsRemoved(e, t, !1, i),
              r)
            ) {
              const o = this.namespacesByHostElement.get(t);
              o && o.id !== e && o.removeNode(t, i);
            }
          } else this._onRemovalComplete(t, i);
        }
        markElementAsRemoved(e, t, r, i) {
          this.collectedLeaveElements.push(t),
            (t[tn] = {
              namespaceId: e,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
            });
        }
        listen(e, t, r, i, s) {
          return Vu(t) ? this._fetchNamespace(e).listen(t, r, i, s) : () => {};
        }
        _buildInstruction(e, t, r, i, s) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            r,
            i,
            e.fromState.options,
            e.toState.options,
            t,
            s
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, Tu, !0);
          t.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, bp, !0)),
              t.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return Fr(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e[tn];
          if (t && t.setForRemoval) {
            if (((e[tn] = Nw), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const r = this._fetchNamespace(t.namespaceId);
              r && r.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          this.driver.matchesElement(e, Pw) &&
            this.markElementAsDisabled(e, !1),
            this.driver.query(e, Pw, !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              nn(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              t = this._flushAnimations(r, e);
            } finally {
              for (let i = 0; i < r.length; i++) r[i]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? Fr(t).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(e) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${e.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(e, t) {
          const r = new Ou(),
            i = [],
            s = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set();
          this.disabledNodes.forEach((T) => {
            c.add(T);
            const N = this.driver.query(T, ".ng-animate-queued", !0);
            for (let U = 0; U < N.length; U++) c.add(N[U]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = Ow(f, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          h.forEach((T, N) => {
            const U = Ep + m++;
            p.set(N, U), T.forEach((ee) => nn(ee, U));
          });
          const g = [],
            _ = new Set(),
            y = new Set();
          for (let T = 0; T < this.collectedLeaveElements.length; T++) {
            const N = this.collectedLeaveElements[T],
              U = N[tn];
            U &&
              U.setForRemoval &&
              (g.push(N),
              _.add(N),
              U.hasAnimation
                ? this.driver
                    .query(N, ".ng-star-inserted", !0)
                    .forEach((ee) => _.add(ee))
                : y.add(N));
          }
          const b = new Map(),
            D = Ow(f, Array.from(_));
          D.forEach((T, N) => {
            const U = wu + m++;
            b.set(N, U), T.forEach((ee) => nn(ee, U));
          }),
            e.push(() => {
              h.forEach((T, N) => {
                const U = p.get(N);
                T.forEach((ee) => Ns(ee, U));
              }),
                D.forEach((T, N) => {
                  const U = b.get(N);
                  T.forEach((ee) => Ns(ee, U));
                }),
                g.forEach((T) => {
                  this.processLeaveNode(T);
                });
            });
          const k = [],
            oe = [];
          for (let T = this._namespaceList.length - 1; T >= 0; T--)
            this._namespaceList[T].drainQueuedTransitions(t).forEach((U) => {
              const ee = U.player,
                Ke = U.element;
              if ((k.push(ee), this.collectedEnterElements.length)) {
                const Wn = Ke[tn];
                if (Wn && Wn.setForMove) return void ee.destroy();
              }
              const qn = !d || !this.driver.containsElement(d, Ke),
                Lt = b.get(Ke),
                Br = p.get(Ke),
                Pe = this._buildInstruction(U, r, Br, Lt, qn);
              if (Pe.errors && Pe.errors.length) oe.push(Pe);
              else {
                if (qn)
                  return (
                    ee.onStart(() => fi(Ke, Pe.fromStyles)),
                    ee.onDestroy(() => Un(Ke, Pe.toStyles)),
                    void i.push(ee)
                  );
                if (U.isFallbackTransition)
                  return (
                    ee.onStart(() => fi(Ke, Pe.fromStyles)),
                    ee.onDestroy(() => Un(Ke, Pe.toStyles)),
                    void i.push(ee)
                  );
                Pe.timelines.forEach((Wn) => (Wn.stretchStartingKeyframe = !0)),
                  r.append(Ke, Pe.timelines),
                  o.push({ instruction: Pe, player: ee, element: Ke }),
                  Pe.queriedElements.forEach((Wn) => Ft(a, Wn, []).push(ee)),
                  Pe.preStyleProps.forEach((Wn, Ca) => {
                    const ac = Object.keys(Wn);
                    if (ac.length) {
                      let vi = l.get(Ca);
                      vi || l.set(Ca, (vi = new Set())),
                        ac.forEach((hg) => vi.add(hg));
                    }
                  }),
                  Pe.postStyleProps.forEach((Wn, Ca) => {
                    const ac = Object.keys(Wn);
                    let vi = u.get(Ca);
                    vi || u.set(Ca, (vi = new Set())),
                      ac.forEach((hg) => vi.add(hg));
                  });
              }
            });
          if (oe.length) {
            const T = [];
            oe.forEach((N) => {
              T.push(`@${N.triggerName} has failed due to:\n`),
                N.errors.forEach((U) => T.push(`- ${U}\n`));
            }),
              k.forEach((N) => N.destroy()),
              this.reportError(T);
          }
          const ce = new Map(),
            vt = new Map();
          o.forEach((T) => {
            const N = T.element;
            r.has(N) &&
              (vt.set(N, N),
              this._beforeAnimationBuild(
                T.player.namespaceId,
                T.instruction,
                ce
              ));
          }),
            i.forEach((T) => {
              const N = T.element;
              this._getPreviousPlayers(
                N,
                !1,
                T.namespaceId,
                T.triggerName,
                null
              ).forEach((ee) => {
                Ft(ce, N, []).push(ee), ee.destroy();
              });
            });
          const ut = g.filter((T) => kw(T, l, u)),
            ct = new Map();
          Rw(ct, this.driver, y, u, ur).forEach((T) => {
            kw(T, l, u) && ut.push(T);
          });
          const pr = new Map();
          h.forEach((T, N) => {
            Rw(pr, this.driver, new Set(T), l, "!");
          }),
            ut.forEach((T) => {
              const N = ct.get(T),
                U = pr.get(T);
              ct.set(T, Object.assign(Object.assign({}, N), U));
            });
          const Sn = [],
            Vs = [],
            Ls = {};
          o.forEach((T) => {
            const { element: N, player: U, instruction: ee } = T;
            if (r.has(N)) {
              if (c.has(N))
                return (
                  U.onDestroy(() => Un(N, ee.toStyles)),
                  (U.disabled = !0),
                  U.overrideTotalTime(ee.totalTime),
                  void i.push(U)
                );
              let Ke = Ls;
              if (vt.size > 1) {
                let Lt = N;
                const Br = [];
                for (; (Lt = Lt.parentNode); ) {
                  const Pe = vt.get(Lt);
                  if (Pe) {
                    Ke = Pe;
                    break;
                  }
                  Br.push(Lt);
                }
                Br.forEach((Pe) => vt.set(Pe, Ke));
              }
              const qn = this._buildAnimation(U.namespaceId, ee, ce, s, pr, ct);
              if ((U.setRealPlayer(qn), Ke === Ls)) Sn.push(U);
              else {
                const Lt = this.playersByElement.get(Ke);
                Lt && Lt.length && (U.parentPlayer = Fr(Lt)), i.push(U);
              }
            } else
              fi(N, ee.fromStyles),
                U.onDestroy(() => Un(N, ee.toStyles)),
                Vs.push(U),
                c.has(N) && i.push(U);
          }),
            Vs.forEach((T) => {
              const N = s.get(T.element);
              if (N && N.length) {
                const U = Fr(N);
                T.setRealPlayer(U);
              }
            }),
            i.forEach((T) => {
              T.parentPlayer ? T.syncPlayerEvents(T.parentPlayer) : T.destroy();
            });
          for (let T = 0; T < g.length; T++) {
            const N = g[T],
              U = N[tn];
            if ((Ns(N, wu), U && U.hasAnimation)) continue;
            let ee = [];
            if (a.size) {
              let qn = a.get(N);
              qn && qn.length && ee.push(...qn);
              let Lt = this.driver.query(N, bp, !0);
              for (let Br = 0; Br < Lt.length; Br++) {
                let Pe = a.get(Lt[Br]);
                Pe && Pe.length && ee.push(...Pe);
              }
            }
            const Ke = ee.filter((qn) => !qn.destroyed);
            Ke.length ? Cj(this, N, Ke) : this.processLeaveNode(N);
          }
          return (
            (g.length = 0),
            Sn.forEach((T) => {
              this.players.push(T),
                T.onDone(() => {
                  T.destroy();
                  const N = this.players.indexOf(T);
                  this.players.splice(N, 1);
                }),
                T.play();
            }),
            Sn
          );
        }
        elementContainsData(e, t) {
          let r = !1;
          const i = t[tn];
          return (
            i && i.setForRemoval && (r = !0),
            this.playersByElement.has(t) && (r = !0),
            this.playersByQueriedElement.has(t) && (r = !0),
            this.statesByElement.has(t) && (r = !0),
            this._fetchNamespace(e).elementContainsData(t) || r
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, r, i, s) {
          let o = [];
          if (t) {
            const a = this.playersByQueriedElement.get(e);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !s || s == la;
              a.forEach((u) => {
                u.queued || (!l && u.triggerName != i) || o.push(u);
              });
            }
          }
          return (
            (r || i) &&
              (o = o.filter(
                (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            o
          );
        }
        _beforeAnimationBuild(e, t, r) {
          const s = t.element,
            o = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const l of t.timelines) {
            const u = l.element,
              c = u !== s,
              d = Ft(r, u, []);
            this._getPreviousPlayers(u, c, o, a, t.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          fi(s, t.fromStyles);
        }
        _buildAnimation(e, t, r, i, s, o) {
          const a = t.triggerName,
            l = t.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = t.timelines.map((p) => {
              const m = p.element;
              c.add(m);
              const g = m[tn];
              if (g && g.removedBeforeQueried)
                return new Is(p.duration, p.delay);
              const _ = m !== l,
                y = (function (n) {
                  const e = [];
                  return Fw(n, e), e;
                })((r.get(m) || fj).map((ce) => ce.getRealPlayer())).filter(
                  (ce) => !!ce.element && ce.element === m
                ),
                b = s.get(m),
                D = o.get(m),
                k = ow(0, this._normalizer, 0, p.keyframes, b, D),
                oe = this._buildPlayer(p, k, y);
              if ((p.subTimeline && i && d.add(m), _)) {
                const ce = new kp(e, a, m);
                ce.setRealPlayer(oe), u.push(ce);
              }
              return oe;
            });
          u.forEach((p) => {
            Ft(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function (n, e, t) {
                  let r;
                  if (n instanceof Map) {
                    if (((r = n.get(e)), r)) {
                      if (r.length) {
                        const i = r.indexOf(t);
                        r.splice(i, 1);
                      }
                      0 == r.length && n.delete(e);
                    }
                  } else if (((r = n[e]), r)) {
                    if (r.length) {
                      const i = r.indexOf(t);
                      r.splice(i, 1);
                    }
                    0 == r.length && delete n[e];
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            c.forEach((p) => nn(p, pw));
          const h = Fr(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => Ns(p, pw)), Un(l, t.toStyles);
            }),
            d.forEach((p) => {
              Ft(i, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(e, t, r) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                r
              )
            : new Is(e.duration, e.delay);
        }
      }
      class kp {
        constructor(e, t, r) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = r),
            (this._player = new Is()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((t) => {
              this._queuedCallbacks[t].forEach((r) => dp(e, t, void 0, r));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          Ft(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function Vu(n) {
        return n && 1 === n.nodeType;
      }
      function xw(n, e) {
        const t = n.style.display;
        return (n.style.display = null != e ? e : "none"), t;
      }
      function Rw(n, e, t, r, i) {
        const s = [];
        t.forEach((l) => s.push(xw(l)));
        const o = [];
        r.forEach((l, u) => {
          const c = {};
          l.forEach((d) => {
            const f = (c[d] = e.computeStyle(u, d, i));
            (!f || 0 == f.length) && ((u[tn] = hj), o.push(u));
          }),
            n.set(u, c);
        });
        let a = 0;
        return t.forEach((l) => xw(l, s[a++])), o;
      }
      function Ow(n, e) {
        const t = new Map();
        if ((n.forEach((a) => t.set(a, [])), 0 == e.length)) return t;
        const i = new Set(e),
          s = new Map();
        function o(a) {
          if (!a) return 1;
          let l = s.get(a);
          if (l) return l;
          const u = a.parentNode;
          return (l = t.has(u) ? u : i.has(u) ? 1 : o(u)), s.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = o(a);
            1 !== l && t.get(l).push(a);
          }),
          t
        );
      }
      const Lu = "$$classes";
      function nn(n, e) {
        if (n.classList) n.classList.add(e);
        else {
          let t = n[Lu];
          t || (t = n[Lu] = {}), (t[e] = !0);
        }
      }
      function Ns(n, e) {
        if (n.classList) n.classList.remove(e);
        else {
          let t = n[Lu];
          t && delete t[e];
        }
      }
      function Cj(n, e, t) {
        Fr(t).onDone(() => n.processLeaveNode(e));
      }
      function Fw(n, e) {
        for (let t = 0; t < n.length; t++) {
          const r = n[t];
          r instanceof iw ? Fw(r.players, e) : e.push(r);
        }
      }
      function kw(n, e, t) {
        const r = t.get(n);
        if (!r) return !1;
        let i = e.get(n);
        return i ? r.forEach((s) => i.add(s)) : e.set(n, r), t.delete(n), !0;
      }
      class ju {
        constructor(e, t, r) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, s) => {}),
            (this._transitionEngine = new gj(e, t, r)),
            (this._timelineEngine = new lj(e, t, r)),
            (this._transitionEngine.onRemovalComplete = (i, s) =>
              this.onRemovalComplete(i, s));
        }
        registerTrigger(e, t, r, i, s) {
          const o = e + "-" + i;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              u = Ap(this._driver, s, l);
            if (l.length)
              throw new Error(
                `The animation trigger "${i}" has failed to build due to the following errors:\n - ${l.join(
                  "\n - "
                )}`
              );
            (a = (function (n, e, t) {
              return new sj(n, e, t);
            })(i, u, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(t, i, a);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, r, i) {
          this._transitionEngine.insertNode(e, t, r, i);
        }
        onRemove(e, t, r, i) {
          this._transitionEngine.removeNode(e, t, i || !1, r);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, r, i) {
          if ("@" == r.charAt(0)) {
            const [s, o] = aw(r);
            this._timelineEngine.command(s, t, o, i);
          } else this._transitionEngine.trigger(e, t, r, i);
        }
        listen(e, t, r, i, s) {
          if ("@" == r.charAt(0)) {
            const [o, a] = aw(r);
            return this._timelineEngine.listen(o, t, a, s);
          }
          return this._transitionEngine.listen(e, t, r, i, s);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Vw(n, e) {
        let t = null,
          r = null;
        return (
          Array.isArray(e) && e.length
            ? ((t = Vp(e[0])), e.length > 1 && (r = Vp(e[e.length - 1])))
            : e && (t = Vp(e)),
          t || r ? new bj(n, t, r) : null
        );
      }
      let bj = (() => {
        class n {
          constructor(t, r, i) {
            (this._element = t),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0);
            let s = n.initialStylesByElement.get(t);
            s || n.initialStylesByElement.set(t, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Un(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Un(this._element, this._initialStyles),
                this._endStyles &&
                  (Un(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (fi(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (fi(this._element, this._endStyles),
                  (this._endStyles = null)),
                Un(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function Vp(n) {
        let e = null;
        const t = Object.keys(n);
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          Dj(i) && ((e = e || {}), (e[i] = n[i]));
        }
        return e;
      }
      function Dj(n) {
        return "display" === n || "position" === n;
      }
      const Lw = "animation",
        jw = "animationend";
      class Tj {
        constructor(e, t, r, i, s, o, a) {
          (this._element = e),
            (this._name = t),
            (this._duration = r),
            (this._delay = i),
            (this._easing = s),
            (this._fillMode = o),
            (this._onDoneFn = a),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (l) => this._handleCallback(l));
        }
        apply() {
          (function (n, e) {
            const t = jp(n, "").trim();
            let r = 0;
            t.length &&
              ((function (n, e) {
                let t = 0;
                for (let r = 0; r < n.length; r++) "," === n.charAt(r) && t++;
                return t;
              })(t) + 1,
              (e = `${t}, ${e}`)),
              Bu(n, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            Uw(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          Bw(this._element, this._name, "paused");
        }
        resume() {
          Bw(this._element, this._name, "running");
        }
        setPosition(e) {
          const t = Hw(this._element, this._name);
          (this._position = e * this._duration),
            Bu(this._element, "Delay", `-${this._position}ms`, t);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            r = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(t - this._startTime, 0) >= this._delay &&
            r >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            Uw(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (n, e) {
              const r = jp(n, "").split(","),
                i = Lp(r, e);
              i >= 0 && (r.splice(i, 1), Bu(n, "", r.join(",")));
            })(this._element, this._name));
        }
      }
      function Bw(n, e, t) {
        Bu(n, "PlayState", t, Hw(n, e));
      }
      function Hw(n, e) {
        const t = jp(n, "");
        return t.indexOf(",") > 0 ? Lp(t.split(","), e) : Lp([t], e);
      }
      function Lp(n, e) {
        for (let t = 0; t < n.length; t++) if (n[t].indexOf(e) >= 0) return t;
        return -1;
      }
      function Uw(n, e, t) {
        t ? n.removeEventListener(jw, e) : n.addEventListener(jw, e);
      }
      function Bu(n, e, t, r) {
        const i = Lw + e;
        if (null != r) {
          const s = n.style[i];
          if (s.length) {
            const o = s.split(",");
            (o[r] = t), (t = o.join(","));
          }
        }
        n.style[i] = t;
      }
      function jp(n, e) {
        return n.style[Lw + e] || "";
      }
      class $w {
        constructor(e, t, r, i, s, o, a, l) {
          (this.element = e),
            (this.keyframes = t),
            (this.animationName = r),
            (this._duration = i),
            (this._delay = s),
            (this._finalStyles = a),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = o || "linear"),
            (this.totalTime = i + s),
            this._buildStyler();
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            !(this._state >= 4) &&
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((e) => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            !(this._state >= 3) &&
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(e) {
          this._styler.setPosition(e);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          (this._state = 0),
            this._styler.destroy(),
            this._buildStyler(),
            this._styler.apply();
        }
        _buildStyler() {
          this._styler = new Tj(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach((r) => {
              "offset" != r &&
                (e[r] = t ? this._finalStyles[r] : Tp(this.element, r));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class xj extends Is {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = dw(t));
        }
        init() {
          this.__initialized ||
            !this._startingStyles ||
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((e) => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          !this._startingStyles ||
            (this.init(),
            Object.keys(this._styles).forEach((e) =>
              this.element.style.setProperty(e, this._styles[e])
            ),
            super.play());
        }
        destroy() {
          !this._startingStyles ||
            (Object.keys(this._startingStyles).forEach((e) => {
              const t = this._startingStyles[e];
              t
                ? this.element.style.setProperty(e, t)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class qw {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(e) {
          return mp(e);
        }
        matchesElement(e, t) {
          return yp(e, t);
        }
        containsElement(e, t) {
          return _p(e, t);
        }
        query(e, t, r) {
          return Cp(e, t, r);
        }
        computeStyle(e, t, r) {
          return window.getComputedStyle(e)[t];
        }
        buildKeyframeElement(e, t, r) {
          r = r.map((a) => dw(a));
          let i = `@keyframes ${t} {\n`,
            s = "";
          r.forEach((a) => {
            s = " ";
            const l = parseFloat(a.offset);
            (i += `${s}${100 * l}% {\n`),
              (s += " "),
              Object.keys(a).forEach((u) => {
                const c = a[u];
                switch (u) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      c && (i += `${s}animation-timing-function: ${c};\n`)
                    );
                  default:
                    return void (i += `${s}${u}: ${c};\n`);
                }
              }),
              (i += `${s}}\n`);
          }),
            (i += "}\n");
          const o = document.createElement("style");
          return (o.textContent = i), o;
        }
        animate(e, t, r, i, s, o = [], a) {
          const l = o.filter((g) => g instanceof $w),
            u = {};
          Cw(r, i) &&
            l.forEach((g) => {
              let _ = g.currentSnapshot;
              Object.keys(_).forEach((y) => (u[y] = _[y]));
            });
          const c = (function (n) {
            let e = {};
            return (
              n &&
                (Array.isArray(n) ? n : [n]).forEach((r) => {
                  Object.keys(r).forEach((i) => {
                    "offset" == i || "easing" == i || (e[i] = r[i]);
                  });
                }),
              e
            );
          })((t = vw(e, t, u)));
          if (0 == r) return new xj(e, c);
          const d = "gen_css_kf_" + this._count++,
            f = this.buildKeyframeElement(e, d, t);
          (function (n) {
            var e;
            const t =
              null === (e = n.getRootNode) || void 0 === e ? void 0 : e.call(n);
            return "undefined" != typeof ShadowRoot && t instanceof ShadowRoot
              ? t
              : document.head;
          })(e).appendChild(f);
          const p = Vw(e, t),
            m = new $w(e, t, d, r, i, s, c, p);
          return (
            m.onDestroy(() =>
              (function (n) {
                n.parentNode.removeChild(n);
              })(f)
            ),
            m
          );
        }
      }
      class zw {
        constructor(e, t, r, i) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, t, r) {
          return e.animate(t, r);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((t) => {
              "offset" != t &&
                (e[t] = this._finished
                  ? this._finalKeyframe[t]
                  : Tp(this.element, t));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((r) => r()), (t.length = 0);
        }
      }
      class Vj {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            Qw().toString()
          )),
            (this._cssKeyframesDriver = new qw());
        }
        validateStyleProperty(e) {
          return mp(e);
        }
        matchesElement(e, t) {
          return yp(e, t);
        }
        containsElement(e, t) {
          return _p(e, t);
        }
        query(e, t, r) {
          return Cp(e, t, r);
        }
        computeStyle(e, t, r) {
          return window.getComputedStyle(e)[t];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, t, r, i, s, o = [], a) {
          if (!a && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, t, r, i, s, o);
          const c = {
            duration: r,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          s && (c.easing = s);
          const d = {},
            f = o.filter((p) => p instanceof zw);
          Cw(r, i) &&
            f.forEach((p) => {
              let m = p.currentSnapshot;
              Object.keys(m).forEach((g) => (d[g] = m[g]));
            });
          const h = Vw(e, (t = vw(e, (t = t.map((p) => kr(p, !1))), d)));
          return new zw(e, t, c, h);
        }
      }
      function Qw() {
        return (sw() && Element.prototype.animate) || {};
      }
      let jj = (() => {
        class n extends ew {
          constructor(t, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(r.body, {
                id: "0",
                encapsulation: Oe.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(t) ? tw(t) : t;
            return (
              Kw(this._renderer, null, r, "register", [i]),
              new Bj(r, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ni), E(ke));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Bj extends class {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new Hj(this._id, e, t || {}, this._renderer);
        }
      }
      class Hj {
        constructor(e, t, r, i) {
          (this.id = e),
            (this.element = t),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return Kw(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          var e, t;
          return null !==
            (t =
              null === (e = this._renderer.engine.players[+this.id]) ||
              void 0 === e
                ? void 0
                : e.getPosition()) && void 0 !== t
            ? t
            : 0;
        }
      }
      function Kw(n, e, t, r, i) {
        return n.setProperty(e, `@@${t}:${r}`, i);
      }
      const Yw = "@.disabled";
      let Uj = (() => {
        class n {
          constructor(t, r, i) {
            (this.delegate = t),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (s, o) => {
                o && o.parentNode(s) && o.removeChild(s.parentNode, s);
              });
          }
          createRenderer(t, r) {
            const s = this.delegate.createRenderer(t, r);
            if (!(t && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(s);
              return (
                c ||
                  ((c = new Jw("", s, this.engine)),
                  this._rendererCache.set(s, c)),
                c
              );
            }
            const o = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, t);
            const l = (c) => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(o, a, t, c.name, c);
            };
            return r.data.animation.forEach(l), new $j(this, a, s, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, r, i) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((s) => {
                        const [o, a] = s;
                        o(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, i]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ni), E(ju), E(Ie));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Jw {
        constructor(e, t, r) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (i) => t.destroyNode(i)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, r, i = !0) {
          this.delegate.insertBefore(e, t, r),
            this.engine.onInsert(this.namespaceId, t, e, i);
        }
        removeChild(e, t, r) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, r);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, r, i) {
          this.delegate.setAttribute(e, t, r, i);
        }
        removeAttribute(e, t, r) {
          this.delegate.removeAttribute(e, t, r);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, r, i) {
          this.delegate.setStyle(e, t, r, i);
        }
        removeStyle(e, t, r) {
          this.delegate.removeStyle(e, t, r);
        }
        setProperty(e, t, r) {
          "@" == t.charAt(0) && t == Yw
            ? this.disableAnimations(e, !!r)
            : this.delegate.setProperty(e, t, r);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, r) {
          return this.delegate.listen(e, t, r);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class $j extends Jw {
        constructor(e, t, r, i) {
          super(t, r, i), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, r) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && t == Yw
              ? this.disableAnimations(e, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, e, t.substr(1), r)
            : this.delegate.setProperty(e, t, r);
        }
        listen(e, t, r) {
          if ("@" == t.charAt(0)) {
            const i = (function (n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(e);
            let s = t.substr(1),
              o = "";
            return (
              "@" != s.charAt(0) &&
                ([s, o] = (function (n) {
                  const e = n.indexOf(".");
                  return [n.substring(0, e), n.substr(e + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, i, s, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(e, t, r);
        }
      }
      let Wj = (() => {
        class n extends ju {
          constructor(t, r, i) {
            super(t.body, r, i);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ke), E(vp), E(xp));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Zw = new G("AnimationModuleType"),
        Xw = [
          { provide: ew, useClass: jj },
          {
            provide: xp,
            useFactory: function () {
              return new X2();
            },
          },
          { provide: ju, useClass: Wj },
          {
            provide: ni,
            useFactory: function (n, e, t) {
              return new Uj(n, e, t);
            },
            deps: [du, ju, Ie],
          },
        ],
        e0 = [
          {
            provide: vp,
            useFactory: function () {
              return "function" == typeof Qw() ? new Vj() : new qw();
            },
          },
          { provide: Zw, useValue: "BrowserAnimations" },
          ...Xw,
        ],
        t0 = [
          { provide: vp, useClass: fw },
          { provide: Zw, useValue: "NoopAnimations" },
          ...Xw,
        ];
      let Yj = (() => {
        class n {
          static withConfig(t) {
            return { ngModule: n, providers: t.disableAnimations ? t0 : e0 };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = Ze({ type: n })),
          (n.ɵinj = Be({ providers: e0, imports: [xh] })),
          n
        );
      })();
      class Vt extends jt {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return t && !t.closed && e.next(this._value), t;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new bi();
          return this._value;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      class Jj extends Ce {
        notifyNext(e, t, r, i, s) {
          this.destination.next(t);
        }
        notifyError(e, t) {
          this.destination.error(e);
        }
        notifyComplete(e) {
          this.destination.complete();
        }
      }
      class Zj extends Ce {
        constructor(e, t, r) {
          super(),
            (this.parent = e),
            (this.outerValue = t),
            (this.outerIndex = r),
            (this.index = 0);
        }
        _next(e) {
          this.parent.notifyNext(
            this.outerValue,
            e,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(e) {
          this.parent.notifyError(e, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function Xj(n, e, t, r, i = new Zj(n, t, r)) {
        if (!i.closed) return e instanceof ae ? e.subscribe(i) : cc(e)(i);
      }
      const n0 = {};
      function r0(...n) {
        let e, t;
        return (
          Di(n[n.length - 1]) && (t = n.pop()),
          "function" == typeof n[n.length - 1] && (e = n.pop()),
          1 === n.length && Hs(n[0]) && (n = n[0]),
          fc(n, t).lift(new eB(e))
        );
      }
      class eB {
        constructor(e) {
          this.resultSelector = e;
        }
        call(e, t) {
          return t.subscribe(new tB(e, this.resultSelector));
        }
      }
      class tB extends Jj {
        constructor(e, t) {
          super(e),
            (this.resultSelector = t),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(e) {
          this.values.push(n0), this.observables.push(e);
        }
        _complete() {
          const e = this.observables,
            t = e.length;
          if (0 === t) this.destination.complete();
          else {
            (this.active = t), (this.toRespond = t);
            for (let r = 0; r < t; r++) this.add(Xj(this, e[r], void 0, r));
          }
        }
        notifyComplete(e) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(e, t, r) {
          const i = this.values,
            o = this.toRespond
              ? i[r] === n0
                ? --this.toRespond
                : this.toRespond
              : 0;
          (i[r] = t),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(i)
                : this.destination.next(i.slice()));
        }
        _tryResultSelector(e) {
          let t;
          try {
            t = this.resultSelector.apply(this, e);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(t);
        }
      }
      class nB extends _e {
        constructor(e, t) {
          super();
        }
        schedule(e, t = 0) {
          return this;
        }
      }
      let i0 = (() => {
        class n {
          constructor(t, r = n.now) {
            (this.SchedulerAction = t), (this.now = r);
          }
          schedule(t, r = 0, i) {
            return new this.SchedulerAction(this, t).schedule(i, r);
          }
        }
        return (n.now = () => Date.now()), n;
      })();
      class Vr extends i0 {
        constructor(e, t = i0.now) {
          super(e, () =>
            Vr.delegate && Vr.delegate !== this ? Vr.delegate.now() : t()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(e, t = 0, r) {
          return Vr.delegate && Vr.delegate !== this
            ? Vr.delegate.schedule(e, t, r)
            : super.schedule(e, t, r);
        }
        flush(e) {
          const { actions: t } = this;
          if (this.active) return void t.push(e);
          let r;
          this.active = !0;
          do {
            if ((r = e.execute(e.state, e.delay))) break;
          } while ((e = t.shift()));
          if (((this.active = !1), r)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw r;
          }
        }
      }
      const s0 = new Vr(
        class extends nB {
          constructor(e, t) {
            super(e, t),
              (this.scheduler = e),
              (this.work = t),
              (this.pending = !1);
          }
          schedule(e, t = 0) {
            if (this.closed) return this;
            this.state = e;
            const r = this.id,
              i = this.scheduler;
            return (
              null != r && (this.id = this.recycleAsyncId(i, r, t)),
              (this.pending = !0),
              (this.delay = t),
              (this.id = this.id || this.requestAsyncId(i, this.id, t)),
              this
            );
          }
          requestAsyncId(e, t, r = 0) {
            return setInterval(e.flush.bind(e, this), r);
          }
          recycleAsyncId(e, t, r = 0) {
            if (null !== r && this.delay === r && !1 === this.pending) return t;
            clearInterval(t);
          }
          execute(e, t) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const r = this._execute(e, t);
            if (r) return r;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(e, t) {
            let i,
              r = !1;
            try {
              this.work(e);
            } catch (s) {
              (r = !0), (i = (!!s && s) || new Error(s));
            }
            if (r) return this.unsubscribe(), i;
          }
          _unsubscribe() {
            const e = this.id,
              t = this.scheduler,
              r = t.actions,
              i = r.indexOf(this);
            (this.work = null),
              (this.state = null),
              (this.pending = !1),
              (this.scheduler = null),
              -1 !== i && r.splice(i, 1),
              null != e && (this.id = this.recycleAsyncId(t, e, null)),
              (this.delay = null);
          }
        }
      );
      function o0(n) {
        return !Hs(n) && n - parseFloat(n) + 1 >= 0;
      }
      function a0(n = 0, e, t) {
        let r = -1;
        return (
          o0(e) ? (r = Number(e) < 1 ? 1 : Number(e)) : Di(e) && (t = e),
          Di(t) || (t = s0),
          new ae((i) => {
            const s = o0(n) ? n : +n - t.now();
            return t.schedule(iB, s, { index: 0, period: r, subscriber: i });
          })
        );
      }
      function iB(n) {
        const { index: e, period: t, subscriber: r } = n;
        if ((r.next(e), !r.closed)) {
          if (-1 === t) return r.complete();
          (n.index = e + 1), this.schedule(n, t);
        }
      }
      const pi = new ae((n) => n.complete());
      function Uu(n) {
        return n
          ? (function (n) {
              return new ae((e) => n.schedule(() => e.complete()));
            })(n)
          : pi;
      }
      class aB {
        constructor(e) {
          this.durationSelector = e;
        }
        call(e, t) {
          return t.subscribe(new lB(e, this.durationSelector));
        }
      }
      class lB extends Gs {
        constructor(e, t) {
          super(e), (this.durationSelector = t), (this.hasValue = !1);
        }
        _next(e) {
          try {
            const t = this.durationSelector.call(this, e);
            t && this._tryNext(e, t);
          } catch (t) {
            this.destination.error(t);
          }
        }
        _complete() {
          this.emitValue(), this.destination.complete();
        }
        _tryNext(e, t) {
          let r = this.durationSubscription;
          (this.value = e),
            (this.hasValue = !0),
            r && (r.unsubscribe(), this.remove(r)),
            (r = qs(t, new $s(this))),
            r && !r.closed && this.add((this.durationSubscription = r));
        }
        notifyNext() {
          this.emitValue();
        }
        notifyComplete() {
          this.emitValue();
        }
        emitValue() {
          if (this.hasValue) {
            const e = this.value,
              t = this.durationSubscription;
            t &&
              ((this.durationSubscription = void 0),
              t.unsubscribe(),
              this.remove(t)),
              (this.value = void 0),
              (this.hasValue = !1),
              super._next(e);
          }
        }
      }
      function cr(n, e) {
        return "function" == typeof e
          ? (t) =>
              t.pipe(
                cr((r, i) => Ye(n(r, i)).pipe(te((s, o) => e(r, s, i, o))))
              )
          : (t) => t.lift(new uB(n));
      }
      class uB {
        constructor(e) {
          this.project = e;
        }
        call(e, t) {
          return t.subscribe(new cB(e, this.project));
        }
      }
      class cB extends Gs {
        constructor(e, t) {
          super(e), (this.project = t), (this.index = 0);
        }
        _next(e) {
          let t;
          const r = this.index++;
          try {
            t = this.project(e, r);
          } catch (i) {
            return void this.destination.error(i);
          }
          this._innerSub(t);
        }
        _innerSub(e) {
          const t = this.innerSubscription;
          t && t.unsubscribe();
          const r = new $s(this),
            i = this.destination;
          i.add(r),
            (this.innerSubscription = qs(e, r)),
            this.innerSubscription !== r && i.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: e } = this;
          (!e || e.closed) && super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
      }
      function Lr() {}
      function lt(n, e, t) {
        return function (i) {
          return i.lift(new dB(n, e, t));
        };
      }
      class dB {
        constructor(e, t, r) {
          (this.nextOrObserver = e), (this.error = t), (this.complete = r);
        }
        call(e, t) {
          return t.subscribe(
            new fB(e, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class fB extends Ce {
        constructor(e, t, r, i) {
          super(e),
            (this._tapNext = Lr),
            (this._tapError = Lr),
            (this._tapComplete = Lr),
            (this._tapError = r || Lr),
            (this._tapComplete = i || Lr),
            zn(t)
              ? ((this._context = this), (this._tapNext = t))
              : t &&
                ((this._context = t),
                (this._tapNext = t.next || Lr),
                (this._tapError = t.error || Lr),
                (this._tapComplete = t.complete || Lr));
        }
        _next(e) {
          try {
            this._tapNext.call(this._context, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(e);
        }
        _error(e) {
          try {
            this._tapError.call(this._context, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(e);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (e) {
            return void this.destination.error(e);
          }
          return this.destination.complete();
        }
      }
      class wn {
        constructor(e, t, r) {
          (this.kind = e),
            (this.value = t),
            (this.error = r),
            (this.hasValue = "N" === e);
        }
        observe(e) {
          switch (this.kind) {
            case "N":
              return e.next && e.next(this.value);
            case "E":
              return e.error && e.error(this.error);
            case "C":
              return e.complete && e.complete();
          }
        }
        do(e, t, r) {
          switch (this.kind) {
            case "N":
              return e && e(this.value);
            case "E":
              return t && t(this.error);
            case "C":
              return r && r();
          }
        }
        accept(e, t, r) {
          return e && "function" == typeof e.next
            ? this.observe(e)
            : this.do(e, t, r);
        }
        toObservable() {
          switch (this.kind) {
            case "N":
              return H(this.value);
            case "E":
              return (function (n, e) {
                return new ae((t) => t.error(n));
              })(this.error);
            case "C":
              return Uu();
          }
          throw new Error("unexpected notification kind value");
        }
        static createNext(e) {
          return void 0 !== e ? new wn("N", e) : wn.undefinedValueNotification;
        }
        static createError(e) {
          return new wn("E", void 0, e);
        }
        static createComplete() {
          return wn.completeNotification;
        }
      }
      function l0(n, e = s0) {
        const r = (function (n) {
          return n instanceof Date && !isNaN(+n);
        })(n)
          ? +n - e.now()
          : Math.abs(n);
        return (i) => i.lift(new mB(r, e));
      }
      (wn.completeNotification = new wn("C")),
        (wn.undefinedValueNotification = new wn("N", void 0));
      class mB {
        constructor(e, t) {
          (this.delay = e), (this.scheduler = t);
        }
        call(e, t) {
          return t.subscribe(new Bp(e, this.delay, this.scheduler));
        }
      }
      class Bp extends Ce {
        constructor(e, t, r) {
          super(e),
            (this.delay = t),
            (this.scheduler = r),
            (this.queue = []),
            (this.active = !1),
            (this.errored = !1);
        }
        static dispatch(e) {
          const t = e.source,
            r = t.queue,
            i = e.scheduler,
            s = e.destination;
          for (; r.length > 0 && r[0].time - i.now() <= 0; )
            r.shift().notification.observe(s);
          if (r.length > 0) {
            const o = Math.max(0, r[0].time - i.now());
            this.schedule(e, o);
          } else this.unsubscribe(), (t.active = !1);
        }
        _schedule(e) {
          (this.active = !0),
            this.destination.add(
              e.schedule(Bp.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: e,
              })
            );
        }
        scheduleNotification(e) {
          if (!0 === this.errored) return;
          const t = this.scheduler,
            r = new yB(t.now() + this.delay, e);
          this.queue.push(r), !1 === this.active && this._schedule(t);
        }
        _next(e) {
          this.scheduleNotification(wn.createNext(e));
        }
        _error(e) {
          (this.errored = !0),
            (this.queue = []),
            this.destination.error(e),
            this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(wn.createComplete()), this.unsubscribe();
        }
      }
      class yB {
        constructor(e, t) {
          (this.time = e), (this.notification = t);
        }
      }
      function Hp(n) {
        return (e) => e.lift(new _B(n));
      }
      class _B {
        constructor(e) {
          this.callback = e;
        }
        call(e, t) {
          return t.subscribe(new CB(e, this.callback));
        }
      }
      class CB extends Ce {
        constructor(e, t) {
          super(e), this.add(new _e(t));
        }
      }
      class EB {
        constructor(e) {
          this.notifier = e;
        }
        call(e, t) {
          const r = new bB(e),
            i = qs(this.notifier, new $s(r));
          return i && !r.seenValue ? (r.add(i), t.subscribe(r)) : r;
        }
      }
      class bB extends Gs {
        constructor(e) {
          super(e), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      function DB(n, e) {
        if ((1 & n && kn(0, "div", 6), 2 & n)) {
          const t = be(2);
          cs("box-shadow", "0 0 10px " + t.color + ", 0 0 5px " + t.color);
        }
      }
      function wB(n, e) {
        if ((1 & n && (A(0, "div", 7), kn(1, "div", 8), M()), 2 & n)) {
          const t = be(2);
          ue(1), cs("border-top-color", t.color)("border-left-color", t.color);
        }
      }
      function SB(n, e) {
        if (
          (1 & n &&
            ((function (n, e, t) {
              const r = C(),
                i = Z(),
                s = n + 20,
                o = i.firstCreatePass
                  ? (function (n, e, t, r, i) {
                      const s = e.consts,
                        o = Cr(s, r),
                        a = Wi(e, n, 8, "ng-container", o);
                      return (
                        null !== o && fl(a, o, !0),
                        Id(e, t, a, Cr(s, i)),
                        null !== e.queries && e.queries.elementStart(e, a),
                        a
                      );
                    })(s, i, r, e, t)
                  : i.data[s];
              Mn(o, !0);
              const a = (r[s] = r[q].createComment(""));
              sl(i, r, a, o),
                rt(a, r),
                xa(o) && (Ad(i, r, o), Iy(i, o, r)),
                null != t && Md(r, o);
            })(0),
            A(1, "div", 1),
            A(2, "div", 2),
            A(3, "div", 3),
            Ot(4, DB, 1, 2, "div", 4),
            M(),
            M(),
            Ot(5, wB, 2, 4, "div", 5),
            M(),
            (function () {
              let n = He();
              const e = Z();
              Nc() ? xc() : ((n = n.parent), Mn(n, !1)),
                e.firstCreatePass &&
                  (La(e, n), Dc(n) && e.queries.elementEnd(n));
            })()),
          2 & n)
        ) {
          const t = e.$implicit,
            r = be();
          ue(1),
            cs("transition", "opacity " + r.speed + "ms " + r.ease),
            Kt("active", t.active),
            ue(2),
            cs("transform", t.transform)("background-color", r.color)(
              "transition",
              t.active ? "all " + r.speed + "ms " + r.ease : "none"
            ),
            ue(1),
            ye("ngIf", r.meteor),
            ue(1),
            ye("ngIf", r.spinner);
        }
      }
      class TB {
        constructor(e, t) {
          (this._onDestroyCallback = t),
            (this._started = new jt()),
            (this.started = this._started.pipe(lr(() => !this.isStarted))),
            (this._completed = new jt()),
            (this.completed = this._completed.pipe(lr(() => this.isStarted))),
            (this._trickling = new jt()),
            (this._worker = _e.EMPTY),
            (this._state = new Vt({ active: !1, value: 0 })),
            (this._config = new Vt(e)),
            (this.state = this._state.asObservable()),
            (this.config = this._config.asObservable()),
            (this._worker = r0([this._trickling, this._config])
              .pipe(
                (function (n) {
                  return (e) => e.lift(new aB(n));
                })(([r, i]) => a0(r ? i.debounceTime : 0)),
                cr(([r, i]) => (r ? this.onTrickling(i) : this.onComplete(i)))
              )
              .subscribe());
        }
        get snapshot() {
          return this._state.value;
        }
        get isStarted() {
          return this.snapshot.active;
        }
        start() {
          this._started.next(), this._trickling.next(!0);
        }
        complete() {
          this._trickling.next(!1);
        }
        inc(e) {
          const t = this.snapshot.value;
          this.isStarted
            ? ("number" != typeof e && (e = this._config.value.trickleFunc(t)),
              this.set(t + e))
            : this.start();
        }
        set(e) {
          this.setState({ value: this.clamp(e), active: !0 });
        }
        setConfig(e) {
          this._config.next(
            Object.assign(Object.assign({}, this._config.value), e)
          );
        }
        destroy() {
          this._worker.unsubscribe(),
            this._trickling.complete(),
            this._state.complete(),
            this._config.complete(),
            this._started.complete(),
            this._completed.complete(),
            this._onDestroyCallback();
        }
        setState(e) {
          this._state.next(Object.assign(Object.assign({}, this.snapshot), e));
        }
        clamp(e) {
          return Math.max(
            this._config.value.min,
            Math.min(this._config.value.max, e)
          );
        }
        onTrickling(e) {
          return (
            this.isStarted || this.set(this._config.value.min),
            a0(0, e.trickleSpeed).pipe(lt(() => this.inc()))
          );
        }
        onComplete(e) {
          return (
            this._completed.next(),
            this.isStarted
              ? H({}).pipe(
                  lt(() => this.setState({ value: 100 })),
                  l0(1.7 * e.speed),
                  lt(() => this.setState({ active: !1 })),
                  l0(e.speed),
                  Hp(() => this.setState({ value: 0 })),
                  (function (n) {
                    return (e) => e.lift(new EB(n));
                  })(this._started)
                )
              : pi
          );
        }
      }
      const u0 = new G("ngProgressConfig"),
        c0 = {
          min: 8,
          max: 100,
          speed: 200,
          debounceTime: 0,
          trickleSpeed: 300,
          fixed: !0,
          meteor: !0,
          thick: !1,
          spinner: !0,
          ease: "linear",
          color: "#1B95E0",
          direction: "ltr+",
          spinnerPosition: "right",
          trickleFunc: (n) =>
            n >= 0 && n < 20
              ? 10
              : n >= 20 && n < 50
              ? 4
              : n >= 50 && n < 80
              ? 2
              : n >= 80 && n < 99
              ? 0.5
              : 0,
        };
      let d0 = (() => {
          class n {
            constructor(t) {
              (this._instances = new Map()),
                (this.config = t
                  ? Object.assign(Object.assign({}, c0), t)
                  : c0);
            }
            ref(t = "root", r) {
              if (this._instances.has(t)) {
                const i = this._instances.get(t);
                return (
                  r &&
                    i.setConfig(
                      Object.assign(Object.assign({}, this.config), r)
                    ),
                  i
                );
              }
              {
                const i = new TB(
                  Object.assign(Object.assign({}, this.config), r),
                  this.deleteInstance(t)
                );
                return this._instances.set(t, i).get(t);
              }
            }
            destroyAll() {
              this._instances.forEach((t) => t.destroy());
            }
            deleteInstance(t) {
              return () => {
                this._instances.delete(t);
              };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(u0, 8));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        AB = (() => {
          class n {
            constructor(t) {
              (this._ngProgress = t),
                (this.id = "root"),
                (this.min = this._ngProgress.config.min),
                (this.max = this._ngProgress.config.max),
                (this.ease = this._ngProgress.config.ease),
                (this.color = this._ngProgress.config.color),
                (this.speed = this._ngProgress.config.speed),
                (this.thick = this._ngProgress.config.thick),
                (this.fixed = this._ngProgress.config.fixed),
                (this.meteor = this._ngProgress.config.meteor),
                (this.spinner = this._ngProgress.config.spinner),
                (this.trickleSpeed = this._ngProgress.config.trickleSpeed),
                (this.debounceTime = this._ngProgress.config.debounceTime),
                (this.trickleFunc = this._ngProgress.config.trickleFunc),
                (this.spinnerPosition =
                  this._ngProgress.config.spinnerPosition),
                (this.direction = this._ngProgress.config.direction),
                (this.started = new xe()),
                (this.completed = new xe());
            }
            get isStarted() {
              var t;
              return null === (t = this.progressRef) || void 0 === t
                ? void 0
                : t.isStarted;
            }
            ngOnChanges() {
              var t;
              null === (t = this.progressRef) ||
                void 0 === t ||
                t.setConfig({
                  max: this.max > 0 && this.max <= 100 ? this.max : 100,
                  min: this.min < 100 && this.min >= 0 ? this.min : 0,
                  speed: this.speed,
                  trickleSpeed: this.trickleSpeed,
                  trickleFunc: this.trickleFunc,
                  debounceTime: this.debounceTime,
                });
            }
            ngOnInit() {
              (this.progressRef = this._ngProgress.ref(this.id, {
                max: this.max,
                min: this.min,
                speed: this.speed,
                trickleSpeed: this.trickleSpeed,
                debounceTime: this.debounceTime,
              })),
                (this.state$ = this.progressRef.state.pipe(
                  te((t) => ({
                    active: t.active,
                    transform: `translate3d(${t.value}%,0,0)`,
                  }))
                )),
                this.started.observers.length &&
                  (this._started = this.progressRef.started.subscribe(() =>
                    this.started.emit()
                  )),
                this.completed.observers.length &&
                  (this._completed = this.progressRef.completed.subscribe(() =>
                    this.completed.emit()
                  ));
            }
            ngOnDestroy() {
              var t, r, i;
              null === (t = this._started) || void 0 === t || t.unsubscribe(),
                null === (r = this._completed) ||
                  void 0 === r ||
                  r.unsubscribe(),
                null === (i = this.progressRef) || void 0 === i || i.destroy();
            }
            start() {
              this.progressRef.start();
            }
            complete() {
              this.progressRef.complete();
            }
            inc(t) {
              this.progressRef.inc(t);
            }
            set(t) {
              this.progressRef.set(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(d0));
            }),
            (n.ɵcmp = Si({
              type: n,
              selectors: [["ng-progress"]],
              hostAttrs: ["role", "progressbar"],
              hostVars: 4,
              hostBindings: function (t, r) {
                2 & t &&
                  Kt("spinnerPosition", r.spinnerPosition)(
                    "direction",
                    r.direction
                  )("thick", r.thick)("fixed", r.fixed);
              },
              inputs: {
                id: "id",
                min: "min",
                max: "max",
                ease: "ease",
                color: "color",
                speed: "speed",
                thick: "thick",
                fixed: "fixed",
                meteor: "meteor",
                spinner: "spinner",
                trickleSpeed: "trickleSpeed",
                debounceTime: "debounceTime",
                trickleFunc: "trickleFunc",
                spinnerPosition: "spinnerPosition",
                direction: "direction",
              },
              outputs: { started: "started", completed: "completed" },
              features: [Xe],
              decls: 2,
              vars: 3,
              consts: [
                [4, "ngIf"],
                [1, "ng-progress-bar"],
                [1, "ng-bar-placeholder"],
                [1, "ng-bar"],
                ["class", "ng-meteor", 3, "boxShadow", 4, "ngIf"],
                ["class", "ng-spinner", 4, "ngIf"],
                [1, "ng-meteor"],
                [1, "ng-spinner"],
                [1, "ng-spinner-icon"],
              ],
              template: function (t, r) {
                1 & t &&
                  (Ot(0, SB, 6, 11, "ng-container", 0),
                  (function (n, e) {
                    const t = Z();
                    let r;
                    const i = n + 20;
                    t.firstCreatePass
                      ? ((r = (function (n, e) {
                          if (e)
                            for (let t = e.length - 1; t >= 0; t--) {
                              const r = e[t];
                              if (n === r.name) return r;
                            }
                          throw new Hr(
                            "302",
                            `The pipe '${n}' could not be found!`
                          );
                        })(e, t.pipeRegistry)),
                        (t.data[i] = r),
                        r.onDestroy &&
                          (t.destroyHooks || (t.destroyHooks = [])).push(
                            i,
                            r.onDestroy
                          ))
                      : (r = t.data[i]);
                    const s = r.factory || (r.factory = Wr(r.type)),
                      o = mr(v);
                    try {
                      const a = $a(!1),
                        l = s();
                      $a(a),
                        (function (n, e, t, r) {
                          t >= n.data.length &&
                            ((n.data[t] = null), (n.blueprint[t] = null)),
                            (e[t] = r);
                        })(t, C(), i, l);
                    } finally {
                      mr(o);
                    }
                  })(1, "async")),
                  2 & t && ye("ngIf", zv(1, 1, r.state$));
              },
              directives: [_h],
              pipes: [wb],
              styles: [
                '[_nghost-%COMP%]{z-index:999999;pointer-events:none}[fixed=true][_nghost-%COMP%]   .ng-progress-bar[_ngcontent-%COMP%], [fixed=true][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{position:fixed}[fixed=true][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{top:15px}[fixed=true][spinnerPosition=left][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{left:15px}[fixed=true][spinnerPosition=right][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{right:15px}[thick=true][_nghost-%COMP%]   .ng-spinner-icon[_ngcontent-%COMP%]{width:24px;height:24px;border-width:3px}[thick=true][_nghost-%COMP%]   .ng-bar-placeholder[_ngcontent-%COMP%]{height:3px!important}[direction="ltr+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=ltr-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{transform:rotate(3deg)}[direction="ltr+"][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=ltr-][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{transform:rotate(4deg)}[direction="ltr+"][_nghost-%COMP%]   .ng-bar[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-bar[_ngcontent-%COMP%]{margin-left:-100%}[direction="ltr+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{right:0}[direction="ltr+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=rtl-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{top:-3px}[direction="ltr+"][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=rtl-][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{top:-4px}[direction=ltr-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{bottom:-3px}[direction=ltr-][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction="rtl+"][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{bottom:-4px}[direction=ltr-][_nghost-%COMP%]   .ng-bar-placeholder[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-bar-placeholder[_ngcontent-%COMP%]{transform:rotate(180deg)}[direction=ltr-][_nghost-%COMP%]   .ng-spinner-icon[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-spinner-icon[_ngcontent-%COMP%]{animation-directionection:reverse}[direction="rtl+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=rtl-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{transform:rotate(-3deg)}[direction="rtl+"][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=rtl-][thick=true][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{transform:rotate(-4deg)}[spinnerPosition=left][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{left:10px}[spinnerPosition=right][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{right:10px}.ng-progress-bar[_ngcontent-%COMP%]{position:relative;z-index:999999;top:0;left:0;width:100%;zoom:1;filter:alpha(opacity=0);opacity:0}.ng-progress-bar[active=true][_ngcontent-%COMP%]{filter:alpha(opacity=100);opacity:1;transition:none}.ng-bar-placeholder[_ngcontent-%COMP%]{position:absolute;height:2px;width:100%}.ng-bar[_ngcontent-%COMP%]{width:100%;height:100%;transform:translate(-100%,0,0)}.ng-meteor[_ngcontent-%COMP%]{display:block;position:absolute;width:100px;height:100%;opacity:1}.ng-spinner[_ngcontent-%COMP%]{position:absolute;display:block;z-index:1031;top:10px}.ng-spinner-icon[_ngcontent-%COMP%]{width:18px;height:18px;box-sizing:border-box;-webkit-animation:spinner-animation .25s linear infinite;animation:spinner-animation .25s linear infinite;border:2px solid transparent;border-radius:50%}@-webkit-keyframes spinner-animation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spinner-animation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}',
              ],
              changeDetection: 0,
            })),
            n
          );
        })(),
        MB = (() => {
          class n {
            static withConfig(t) {
              return { ngModule: n, providers: [{ provide: u0, useValue: t }] };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({ imports: [[Tb]] })),
            n
          );
        })();
      const f0 = new G("ngProgressHttpConfig");
      let IB = (() => {
          class n {
            constructor(t, r) {
              (this.ngProgress = t),
                (this._inProgressCount = 0),
                (this._config = { id: "root", silentApis: [] }),
                (this._config = r
                  ? Object.assign(Object.assign({}, this._config), r)
                  : this._config);
            }
            intercept(t, r) {
              return t.headers.has("ignoreProgressBar")
                ? r.handle(
                    t.clone({ headers: t.headers.delete("ignoreProgressBar") })
                  )
                : this.checkUrl(t)
                ? r.handle(t)
                : (this._inProgressCount++,
                  (this._progressRef = this.ngProgress.ref(this._config.id)),
                  this._progressRef.isStarted || this._progressRef.start(),
                  r.handle(t).pipe(
                    Hp(() => {
                      this._inProgressCount--,
                        0 === this._inProgressCount &&
                          this._progressRef.complete();
                    })
                  ));
            }
            checkUrl(t) {
              const r = t.url.toLowerCase();
              return !!this._config.silentApis.find((s) => r.startsWith(s));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(d0), E(f0, 8));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        PB = (() => {
          class n {
            static withConfig(t) {
              return { ngModule: n, providers: [{ provide: f0, useValue: t }] };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n })),
            (n.ɵinj = Be({
              providers: [{ provide: Vh, useClass: IB, multi: !0 }],
            })),
            n
          );
        })();
      const $u = (() => {
        function n() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (n.prototype = Object.create(Error.prototype)), n;
      })();
      function Up(...n) {
        return Ws(1)(H(...n));
      }
      function h0(n) {
        return new ae((e) => {
          let t;
          try {
            t = n();
          } catch (i) {
            return void e.error(i);
          }
          return (t ? Ye(t) : Uu()).subscribe(e);
        });
      }
      const p0 = (() => {
        function n() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (n.prototype = Object.create(Error.prototype)), n;
      })();
      function $p(n) {
        return (e) => (0 === n ? Uu() : e.lift(new xB(n)));
      }
      class xB {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new p0();
        }
        call(e, t) {
          return t.subscribe(new RB(e, this.total));
        }
      }
      class RB extends Ce {
        constructor(e, t) {
          super(e), (this.total = t), (this.count = 0);
        }
        _next(e) {
          const t = this.total,
            r = ++this.count;
          r <= t &&
            (this.destination.next(e),
            r === t && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function g0(n, e) {
        let t = !1;
        return (
          arguments.length >= 2 && (t = !0),
          function (i) {
            return i.lift(new FB(n, e, t));
          }
        );
      }
      class FB {
        constructor(e, t, r = !1) {
          (this.accumulator = e), (this.seed = t), (this.hasSeed = r);
        }
        call(e, t) {
          return t.subscribe(
            new kB(e, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class kB extends Ce {
        constructor(e, t, r, i) {
          super(e),
            (this.accumulator = t),
            (this._seed = r),
            (this.hasSeed = i),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(e) {
          (this.hasSeed = !0), (this._seed = e);
        }
        _next(e) {
          if (this.hasSeed) return this._tryNext(e);
          (this.seed = e), this.destination.next(e);
        }
        _tryNext(e) {
          const t = this.index++;
          let r;
          try {
            r = this.accumulator(this.seed, e, t);
          } catch (i) {
            this.destination.error(i);
          }
          (this.seed = r), this.destination.next(r);
        }
      }
      function gi(n) {
        return function (t) {
          const r = new VB(n),
            i = t.lift(r);
          return (r.caught = i);
        };
      }
      class VB {
        constructor(e) {
          this.selector = e;
        }
        call(e, t) {
          return t.subscribe(new LB(e, this.selector, this.caught));
        }
      }
      class LB extends Gs {
        constructor(e, t, r) {
          super(e), (this.selector = t), (this.caught = r);
        }
        error(e) {
          if (!this.isStopped) {
            let t;
            try {
              t = this.selector(e, this.caught);
            } catch (s) {
              return void super.error(s);
            }
            this._unsubscribeAndRecycle();
            const r = new $s(this);
            this.add(r);
            const i = qs(t, r);
            i !== r && this.add(i);
          }
        }
      }
      function Gp(n) {
        return function (t) {
          return 0 === n ? Uu() : t.lift(new jB(n));
        };
      }
      class jB {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new p0();
        }
        call(e, t) {
          return t.subscribe(new BB(e, this.total));
        }
      }
      class BB extends Ce {
        constructor(e, t) {
          super(e),
            (this.total = t),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(e) {
          const t = this.ring,
            r = this.total,
            i = this.count++;
          t.length < r ? t.push(e) : (t[i % r] = e);
        }
        _complete() {
          const e = this.destination;
          let t = this.count;
          if (t > 0) {
            const r = this.count >= this.total ? this.total : this.count,
              i = this.ring;
            for (let s = 0; s < r; s++) {
              const o = t++ % r;
              e.next(i[o]);
            }
          }
          e.complete();
        }
      }
      function m0(n = $B) {
        return (e) => e.lift(new HB(n));
      }
      class HB {
        constructor(e) {
          this.errorFactory = e;
        }
        call(e, t) {
          return t.subscribe(new UB(e, this.errorFactory));
        }
      }
      class UB extends Ce {
        constructor(e, t) {
          super(e), (this.errorFactory = t), (this.hasValue = !1);
        }
        _next(e) {
          (this.hasValue = !0), this.destination.next(e);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function $B() {
        return new $u();
      }
      function y0(n = null) {
        return (e) => e.lift(new GB(n));
      }
      class GB {
        constructor(e) {
          this.defaultValue = e;
        }
        call(e, t) {
          return t.subscribe(new qB(e, this.defaultValue));
        }
      }
      class qB extends Ce {
        constructor(e, t) {
          super(e), (this.defaultValue = t), (this.isEmpty = !0);
        }
        _next(e) {
          (this.isEmpty = !1), this.destination.next(e);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function xs(n, e) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            n ? lr((i, s) => n(i, s, r)) : Da,
            $p(1),
            t ? y0(e) : m0(() => new $u())
          );
      }
      class dr {
        constructor(e, t) {
          (this.id = e), (this.url = t);
        }
      }
      class qp extends dr {
        constructor(e, t, r = "imperative", i = null) {
          super(e, t), (this.navigationTrigger = r), (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ua extends dr {
        constructor(e, t, r) {
          super(e, t), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class _0 extends dr {
        constructor(e, t, r) {
          super(e, t), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class zB extends dr {
        constructor(e, t, r) {
          super(e, t), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class QB extends dr {
        constructor(e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class KB extends dr {
        constructor(e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class YB extends dr {
        constructor(e, t, r, i, s) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class JB extends dr {
        constructor(e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ZB extends dr {
        constructor(e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class C0 {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class v0 {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class XB {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class eH {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class tH {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class nH {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class E0 {
        constructor(e, t, r) {
          (this.routerEvent = e), (this.position = t), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const K = "primary";
      class rH {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Rs(n) {
        return new rH(n);
      }
      const b0 = "ngNavigationCancelingError";
      function Wp(n) {
        const e = Error("NavigationCancelingError: " + n);
        return (e[b0] = !0), e;
      }
      function sH(n, e, t) {
        const r = t.path.split("/");
        if (
          r.length > n.length ||
          ("full" === t.pathMatch && (e.hasChildren() || r.length < n.length))
        )
          return null;
        const i = {};
        for (let s = 0; s < r.length; s++) {
          const o = r[s],
            a = n[s];
          if (o.startsWith(":")) i[o.substring(1)] = a;
          else if (o !== a.path) return null;
        }
        return { consumed: n.slice(0, r.length), posParams: i };
      }
      function $n(n, e) {
        const t = n ? Object.keys(n) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!t || !r || t.length != r.length) return !1;
        let i;
        for (let s = 0; s < t.length; s++)
          if (((i = t[s]), !D0(n[i], e[i]))) return !1;
        return !0;
      }
      function D0(n, e) {
        if (Array.isArray(n) && Array.isArray(e)) {
          if (n.length !== e.length) return !1;
          const t = [...n].sort(),
            r = [...e].sort();
          return t.every((i, s) => r[s] === i);
        }
        return n === e;
      }
      function w0(n) {
        return Array.prototype.concat.apply([], n);
      }
      function S0(n) {
        return n.length > 0 ? n[n.length - 1] : null;
      }
      function et(n, e) {
        for (const t in n) n.hasOwnProperty(t) && e(n[t], t);
      }
      function Gn(n) {
        return ml(n) ? n : So(n) ? Ye(Promise.resolve(n)) : H(n);
      }
      const lH = {
          exact: function M0(n, e, t) {
            if (
              !yi(n.segments, e.segments) ||
              !Gu(n.segments, e.segments, t) ||
              n.numberOfChildren !== e.numberOfChildren
            )
              return !1;
            for (const r in e.children)
              if (!n.children[r] || !M0(n.children[r], e.children[r], t))
                return !1;
            return !0;
          },
          subset: I0,
        },
        T0 = {
          exact: function (n, e) {
            return $n(n, e);
          },
          subset: function (n, e) {
            return (
              Object.keys(e).length <= Object.keys(n).length &&
              Object.keys(e).every((t) => D0(n[t], e[t]))
            );
          },
          ignored: () => !0,
        };
      function A0(n, e, t) {
        return (
          lH[t.paths](n.root, e.root, t.matrixParams) &&
          T0[t.queryParams](n.queryParams, e.queryParams) &&
          !("exact" === t.fragment && n.fragment !== e.fragment)
        );
      }
      function I0(n, e, t) {
        return P0(n, e, e.segments, t);
      }
      function P0(n, e, t, r) {
        if (n.segments.length > t.length) {
          const i = n.segments.slice(0, t.length);
          return !(!yi(i, t) || e.hasChildren() || !Gu(i, t, r));
        }
        if (n.segments.length === t.length) {
          if (!yi(n.segments, t) || !Gu(n.segments, t, r)) return !1;
          for (const i in e.children)
            if (!n.children[i] || !I0(n.children[i], e.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = t.slice(0, n.segments.length),
            s = t.slice(n.segments.length);
          return (
            !!(yi(n.segments, i) && Gu(n.segments, i, r) && n.children[K]) &&
            P0(n.children[K], e, s, r)
          );
        }
      }
      function Gu(n, e, t) {
        return e.every((r, i) => T0[t](n[i].parameters, r.parameters));
      }
      class mi {
        constructor(e, t, r) {
          (this.root = e), (this.queryParams = t), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Rs(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return hH.serialize(this);
        }
      }
      class J {
        constructor(e, t) {
          (this.segments = e),
            (this.children = t),
            (this.parent = null),
            et(t, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return qu(this);
        }
      }
      class ca {
        constructor(e, t) {
          (this.path = e), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Rs(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return O0(this);
        }
      }
      function yi(n, e) {
        return n.length === e.length && n.every((t, r) => t.path === e[r].path);
      }
      class zp {}
      class N0 {
        parse(e) {
          const t = new bH(e);
          return new mi(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(e) {
          return `${`/${da(e.root, !0)}`}${(function (n) {
            const e = Object.keys(n)
              .map((t) => {
                const r = n[t];
                return Array.isArray(r)
                  ? r.map((i) => `${Wu(t)}=${Wu(i)}`).join("&")
                  : `${Wu(t)}=${Wu(r)}`;
              })
              .filter((t) => !!t);
            return e.length ? `?${e.join("&")}` : "";
          })(e.queryParams)}${
            "string" == typeof e.fragment
              ? `#${(function (n) {
                  return encodeURI(n);
                })(e.fragment)}`
              : ""
          }`;
        }
      }
      const hH = new N0();
      function qu(n) {
        return n.segments.map((e) => O0(e)).join("/");
      }
      function da(n, e) {
        if (!n.hasChildren()) return qu(n);
        if (e) {
          const t = n.children[K] ? da(n.children[K], !1) : "",
            r = [];
          return (
            et(n.children, (i, s) => {
              s !== K && r.push(`${s}:${da(i, !1)}`);
            }),
            r.length > 0 ? `${t}(${r.join("//")})` : t
          );
        }
        {
          const t = (function (n, e) {
            let t = [];
            return (
              et(n.children, (r, i) => {
                i === K && (t = t.concat(e(r, i)));
              }),
              et(n.children, (r, i) => {
                i !== K && (t = t.concat(e(r, i)));
              }),
              t
            );
          })(n, (r, i) =>
            i === K ? [da(n.children[K], !1)] : [`${i}:${da(r, !1)}`]
          );
          return 1 === Object.keys(n.children).length && null != n.children[K]
            ? `${qu(n)}/${t[0]}`
            : `${qu(n)}/(${t.join("//")})`;
        }
      }
      function x0(n) {
        return encodeURIComponent(n)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Wu(n) {
        return x0(n).replace(/%3B/gi, ";");
      }
      function Qp(n) {
        return x0(n)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function zu(n) {
        return decodeURIComponent(n);
      }
      function R0(n) {
        return zu(n.replace(/\+/g, "%20"));
      }
      function O0(n) {
        return `${Qp(n.path)}${(function (n) {
          return Object.keys(n)
            .map((e) => `;${Qp(e)}=${Qp(n[e])}`)
            .join("");
        })(n.parameters)}`;
      }
      const yH = /^[^\/()?;=#]+/;
      function Qu(n) {
        const e = n.match(yH);
        return e ? e[0] : "";
      }
      const _H = /^[^=?&#]+/,
        vH = /^[^?&#]+/;
      class bH {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new J([], {})
              : new J([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (e.length > 0 || Object.keys(t).length > 0) && (r[K] = new J(e, t)),
            r
          );
        }
        parseSegment() {
          const e = Qu(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new ca(zu(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const t = Qu(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = Qu(this.remaining);
            i && ((r = i), this.capture(r));
          }
          e[zu(t)] = zu(r);
        }
        parseQueryParam(e) {
          const t = (function (n) {
            const e = n.match(_H);
            return e ? e[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = (function (n) {
              const e = n.match(vH);
              return e ? e[0] : "";
            })(this.remaining);
            o && ((r = o), this.capture(r));
          }
          const i = R0(t),
            s = R0(r);
          if (e.hasOwnProperty(i)) {
            let o = e[i];
            Array.isArray(o) || ((o = [o]), (e[i] = o)), o.push(s);
          } else e[i] = s;
        }
        parseParens(e) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Qu(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            r.indexOf(":") > -1
              ? ((s = r.substr(0, r.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : e && (s = K);
            const o = this.parseChildren();
            (t[s] = 1 === Object.keys(o).length ? o[K] : new J([], o)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class F0 {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const t = this.pathFromRoot(e);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(e) {
          const t = Kp(e, this._root);
          return t ? t.children.map((r) => r.value) : [];
        }
        firstChild(e) {
          const t = Kp(e, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(e) {
          const t = Yp(e, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== e);
        }
        pathFromRoot(e) {
          return Yp(e, this._root).map((t) => t.value);
        }
      }
      function Kp(n, e) {
        if (n === e.value) return e;
        for (const t of e.children) {
          const r = Kp(n, t);
          if (r) return r;
        }
        return null;
      }
      function Yp(n, e) {
        if (n === e.value) return [e];
        for (const t of e.children) {
          const r = Yp(n, t);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class fr {
        constructor(e, t) {
          (this.value = e), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function fa(n) {
        const e = {};
        return n && n.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class k0 extends F0 {
        constructor(e, t) {
          super(e), (this.snapshot = t), Jp(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function V0(n, e) {
        const t = (function (n, e) {
            const o = new Ku([], {}, {}, "", {}, K, e, null, n.root, -1, {});
            return new j0("", new fr(o, []));
          })(n, e),
          r = new Vt([new ca("", {})]),
          i = new Vt({}),
          s = new Vt({}),
          o = new Vt({}),
          a = new Vt(""),
          l = new Os(r, i, o, a, s, K, e, t.root);
        return (l.snapshot = t.root), new k0(new fr(l, []), t);
      }
      class Os {
        constructor(e, t, r, i, s, o, a, l) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(te((e) => Rs(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(te((e) => Rs(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function L0(n, e = "emptyOnly") {
        const t = n.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = t.length - 1; r >= 1; ) {
            const i = t[r],
              s = t[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (s.component) break;
              r--;
            }
          }
        return (function (n) {
          return n.reduce(
            (e, t) => ({
              params: Object.assign(Object.assign({}, e.params), t.params),
              data: Object.assign(Object.assign({}, e.data), t.data),
              resolve: Object.assign(
                Object.assign({}, e.resolve),
                t._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(r));
      }
      class Ku {
        constructor(e, t, r, i, s, o, a, l, u, c, d) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Rs(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Rs(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class j0 extends F0 {
        constructor(e, t) {
          super(t), (this.url = e), Jp(this, t);
        }
        toString() {
          return B0(this._root);
        }
      }
      function Jp(n, e) {
        (e.value._routerState = n), e.children.forEach((t) => Jp(n, t));
      }
      function B0(n) {
        const e =
          n.children.length > 0 ? ` { ${n.children.map(B0).join(", ")} } ` : "";
        return `${n.value}${e}`;
      }
      function Zp(n) {
        if (n.snapshot) {
          const e = n.snapshot,
            t = n._futureSnapshot;
          (n.snapshot = t),
            $n(e.queryParams, t.queryParams) ||
              n.queryParams.next(t.queryParams),
            e.fragment !== t.fragment && n.fragment.next(t.fragment),
            $n(e.params, t.params) || n.params.next(t.params),
            (function (n, e) {
              if (n.length !== e.length) return !1;
              for (let t = 0; t < n.length; ++t) if (!$n(n[t], e[t])) return !1;
              return !0;
            })(e.url, t.url) || n.url.next(t.url),
            $n(e.data, t.data) || n.data.next(t.data);
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
      }
      function Xp(n, e) {
        return (
          $n(n.params, e.params) &&
          (function (n, e) {
            return (
              yi(n, e) && n.every((t, r) => $n(t.parameters, e[r].parameters))
            );
          })(n.url, e.url) &&
          !(!n.parent != !e.parent) &&
          (!n.parent || Xp(n.parent, e.parent))
        );
      }
      function Yu(n, e, t) {
        if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
          const r = t.value;
          r._futureSnapshot = e.value;
          const i = (function (n, e, t) {
            return e.children.map((r) => {
              for (const i of t.children)
                if (n.shouldReuseRoute(r.value, i.value.snapshot))
                  return Yu(n, r, i);
              return Yu(n, r);
            });
          })(n, e, t);
          return new fr(r, i);
        }
        {
          if (n.shouldAttach(e.value)) {
            const s = n.retrieve(e.value);
            if (null !== s) {
              const o = s.route;
              return H0(e, o), o;
            }
          }
          const r = (function (n) {
              return new Os(
                new Vt(n.url),
                new Vt(n.params),
                new Vt(n.queryParams),
                new Vt(n.fragment),
                new Vt(n.data),
                n.outlet,
                n.component,
                n
              );
            })(e.value),
            i = e.children.map((s) => Yu(n, s));
          return new fr(r, i);
        }
      }
      function H0(n, e) {
        if (n.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot created from a different route"
          );
        if (n.children.length !== e.children.length)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot with a different number of children"
          );
        e.value._futureSnapshot = n.value;
        for (let t = 0; t < n.children.length; ++t)
          H0(n.children[t], e.children[t]);
      }
      function Ju(n) {
        return (
          "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        );
      }
      function ha(n) {
        return "object" == typeof n && null != n && n.outlets;
      }
      function eg(n, e, t, r, i) {
        let s = {};
        return (
          r &&
            et(r, (o, a) => {
              s[a] = Array.isArray(o) ? o.map((l) => `${l}`) : `${o}`;
            }),
          new mi(t.root === n ? e : U0(t.root, n, e), s, i)
        );
      }
      function U0(n, e, t) {
        const r = {};
        return (
          et(n.children, (i, s) => {
            r[s] = i === e ? t : U0(i, e, t);
          }),
          new J(n.segments, r)
        );
      }
      class $0 {
        constructor(e, t, r) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            e && r.length > 0 && Ju(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const i = r.find(ha);
          if (i && i !== S0(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class tg {
        constructor(e, t, r) {
          (this.segmentGroup = e), (this.processChildren = t), (this.index = r);
        }
      }
      function G0(n, e, t) {
        if (
          (n || (n = new J([], {})), 0 === n.segments.length && n.hasChildren())
        )
          return Zu(n, e, t);
        const r = (function (n, e, t) {
            let r = 0,
              i = e;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < n.segments.length; ) {
              if (r >= t.length) return s;
              const o = n.segments[i],
                a = t[r];
              if (ha(a)) break;
              const l = `${a}`,
                u = r < t.length - 1 ? t[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!W0(l, u, o)) return s;
                r += 2;
              } else {
                if (!W0(l, {}, o)) return s;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(n, e, t),
          i = t.slice(r.commandIndex);
        if (r.match && r.pathIndex < n.segments.length) {
          const s = new J(n.segments.slice(0, r.pathIndex), {});
          return (
            (s.children[K] = new J(n.segments.slice(r.pathIndex), n.children)),
            Zu(s, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new J(n.segments, {})
          : r.match && !n.hasChildren()
          ? ng(n, e, t)
          : r.match
          ? Zu(n, 0, i)
          : ng(n, e, t);
      }
      function Zu(n, e, t) {
        if (0 === t.length) return new J(n.segments, {});
        {
          const r = (function (n) {
              return ha(n[0]) ? n[0].outlets : { [K]: n };
            })(t),
            i = {};
          return (
            et(r, (s, o) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = G0(n.children[o], e, s));
            }),
            et(n.children, (s, o) => {
              void 0 === r[o] && (i[o] = s);
            }),
            new J(n.segments, i)
          );
        }
      }
      function ng(n, e, t) {
        const r = n.segments.slice(0, e);
        let i = 0;
        for (; i < t.length; ) {
          const s = t[i];
          if (ha(s)) {
            const l = OH(s.outlets);
            return new J(r, l);
          }
          if (0 === i && Ju(t[0])) {
            r.push(new ca(n.segments[e].path, q0(t[0]))), i++;
            continue;
          }
          const o = ha(s) ? s.outlets[K] : `${s}`,
            a = i < t.length - 1 ? t[i + 1] : null;
          o && a && Ju(a)
            ? (r.push(new ca(o, q0(a))), (i += 2))
            : (r.push(new ca(o, {})), i++);
        }
        return new J(r, {});
      }
      function OH(n) {
        const e = {};
        return (
          et(n, (t, r) => {
            "string" == typeof t && (t = [t]),
              null !== t && (e[r] = ng(new J([], {}), 0, t));
          }),
          e
        );
      }
      function q0(n) {
        const e = {};
        return et(n, (t, r) => (e[r] = `${t}`)), e;
      }
      function W0(n, e, t) {
        return n == t.path && $n(e, t.parameters);
      }
      class kH {
        constructor(e, t, r, i) {
          (this.routeReuseStrategy = e),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(e) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, r, e),
            Zp(this.futureState.root),
            this.activateChildRoutes(t, r, e);
        }
        deactivateChildRoutes(e, t, r) {
          const i = fa(t);
          e.children.forEach((s) => {
            const o = s.value.outlet;
            this.deactivateRoutes(s, i[o], r), delete i[o];
          }),
            et(i, (s, o) => {
              this.deactivateRouteAndItsChildren(s, r);
            });
        }
        deactivateRoutes(e, t, r) {
          const i = e.value,
            s = t ? t.value : null;
          if (i === s)
            if (i.component) {
              const o = r.getContext(i.outlet);
              o && this.deactivateChildRoutes(e, t, o.children);
            } else this.deactivateChildRoutes(e, t, r);
          else s && this.deactivateRouteAndItsChildren(t, r);
        }
        deactivateRouteAndItsChildren(e, t) {
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, t)
            : this.deactivateRouteAndOutlet(e, t);
        }
        detachAndStoreRouteSubtree(e, t) {
          const r = t.getContext(e.value.outlet);
          if (r && r.outlet) {
            const i = r.outlet.detach(),
              s = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: i,
              route: e,
              contexts: s,
            });
          }
        }
        deactivateRouteAndOutlet(e, t) {
          const r = t.getContext(e.value.outlet),
            i = r && e.value.component ? r.children : t,
            s = fa(e);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(e, t, r) {
          const i = fa(t);
          e.children.forEach((s) => {
            this.activateRoutes(s, i[s.value.outlet], r),
              this.forwardEvent(new nH(s.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new eH(e.value.snapshot));
        }
        activateRoutes(e, t, r) {
          const i = e.value,
            s = t ? t.value : null;
          if ((Zp(i), i === s))
            if (i.component) {
              const o = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(e, t, o.children);
            } else this.activateChildRoutes(e, t, r);
          else if (i.component) {
            const o = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                z0(a.route);
            } else {
              const a = (function (n) {
                  for (let e = n.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(i.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (o.attachRef = null),
                (o.route = i),
                (o.resolver = l),
                o.outlet && o.outlet.activateWith(i, l),
                this.activateChildRoutes(e, null, o.children);
            }
          } else this.activateChildRoutes(e, null, r);
        }
      }
      function z0(n) {
        Zp(n.value), n.children.forEach(z0);
      }
      class rg {
        constructor(e, t) {
          (this.routes = e), (this.module = t);
        }
      }
      function jr(n) {
        return "function" == typeof n;
      }
      function _i(n) {
        return n instanceof mi;
      }
      const pa = Symbol("INITIAL_VALUE");
      function ga() {
        return cr((n) =>
          r0(
            n.map((e) =>
              e.pipe(
                $p(1),
                (function (...n) {
                  const e = n[n.length - 1];
                  return Di(e)
                    ? (n.pop(), (t) => Up(n, t, e))
                    : (t) => Up(n, t);
                })(pa)
              )
            )
          ).pipe(
            g0((e, t) => {
              let r = !1;
              return t.reduce(
                (i, s, o) =>
                  i !== pa
                    ? i
                    : (s === pa && (r = !0),
                      r || (!1 !== s && o !== t.length - 1 && !_i(s)) ? i : s),
                e
              );
            }, pa),
            lr((e) => e !== pa),
            te((e) => (_i(e) ? e : !0 === e)),
            $p(1)
          )
        );
      }
      let Q0 = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵcmp = Si({
            type: n,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, r) {
              1 & t && kn(0, "router-outlet");
            },
            directives: function () {
              return [dS];
            },
            encapsulation: 2,
          })),
          n
        );
      })();
      function K0(n, e = "") {
        for (let t = 0; t < n.length; t++) {
          const r = n[t];
          $H(r, GH(e, r));
        }
      }
      function $H(n, e) {
        n.children && K0(n.children, e);
      }
      function GH(n, e) {
        return e
          ? n || e.path
            ? n && !e.path
              ? `${n}/`
              : !n && e.path
              ? e.path
              : `${n}/${e.path}`
            : ""
          : n;
      }
      function ig(n) {
        const e = n.children && n.children.map(ig),
          t = e
            ? Object.assign(Object.assign({}, n), { children: e })
            : Object.assign({}, n);
        return (
          !t.component &&
            (e || t.loadChildren) &&
            t.outlet &&
            t.outlet !== K &&
            (t.component = Q0),
          t
        );
      }
      function rn(n) {
        return n.outlet || K;
      }
      function Y0(n, e) {
        const t = n.filter((r) => rn(r) === e);
        return t.push(...n.filter((r) => rn(r) !== e)), t;
      }
      const J0 = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function Xu(n, e, t) {
        var r;
        if ("" === e.path)
          return "full" === e.pathMatch && (n.hasChildren() || t.length > 0)
            ? Object.assign({}, J0)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const s = (e.matcher || sH)(t, n, e);
        if (!s) return Object.assign({}, J0);
        const o = {};
        et(s.posParams, (l, u) => {
          o[u] = l.path;
        });
        const a =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, o),
                s.consumed[s.consumed.length - 1].parameters
              )
            : o;
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = s.posParams) && void 0 !== r ? r : {},
        };
      }
      function ec(n, e, t, r, i = "corrected") {
        if (
          t.length > 0 &&
          (function (n, e, t) {
            return t.some((r) => tc(n, e, r) && rn(r) !== K);
          })(n, t, r)
        ) {
          const o = new J(
            e,
            (function (n, e, t, r) {
              const i = {};
              (i[K] = r),
                (r._sourceSegment = n),
                (r._segmentIndexShift = e.length);
              for (const s of t)
                if ("" === s.path && rn(s) !== K) {
                  const o = new J([], {});
                  (o._sourceSegment = n),
                    (o._segmentIndexShift = e.length),
                    (i[rn(s)] = o);
                }
              return i;
            })(n, e, r, new J(t, n.children))
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === t.length &&
          (function (n, e, t) {
            return t.some((r) => tc(n, e, r));
          })(n, t, r)
        ) {
          const o = new J(
            n.segments,
            (function (n, e, t, r, i, s) {
              const o = {};
              for (const a of r)
                if (tc(n, t, a) && !i[rn(a)]) {
                  const l = new J([], {});
                  (l._sourceSegment = n),
                    (l._segmentIndexShift =
                      "legacy" === s ? n.segments.length : e.length),
                    (o[rn(a)] = l);
                }
              return Object.assign(Object.assign({}, i), o);
            })(n, e, t, r, n.children, i)
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: t }
          );
        }
        const s = new J(n.segments, n.children);
        return (
          (s._sourceSegment = n),
          (s._segmentIndexShift = e.length),
          { segmentGroup: s, slicedSegments: t }
        );
      }
      function tc(n, e, t) {
        return (
          (!(n.hasChildren() || e.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      function Z0(n, e, t, r) {
        return (
          !!(rn(n) === r || (r !== K && tc(e, t, n))) &&
          ("**" === n.path || Xu(e, n, t).matched)
        );
      }
      function X0(n, e, t) {
        return 0 === e.length && !n.children[t];
      }
      class ma {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class eS {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function nc(n) {
        return new ae((e) => e.error(new ma(n)));
      }
      function tS(n) {
        return new ae((e) => e.error(new eS(n)));
      }
      function KH(n) {
        return new ae((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${n}'`
            )
          )
        );
      }
      class ZH {
        constructor(e, t, r, i, s) {
          (this.configLoader = t),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(jn));
        }
        apply() {
          const e = ec(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new J(e.segments, e.children);
          return this.expandSegmentGroup(this.ngModule, this.config, t, K)
            .pipe(
              te((s) =>
                this.createUrlTree(
                  sg(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              gi((s) => {
                if (s instanceof eS)
                  return (this.allowRedirects = !1), this.match(s.urlTree);
                throw s instanceof ma ? this.noMatchError(s) : s;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(this.ngModule, this.config, e.root, K)
            .pipe(
              te((i) => this.createUrlTree(sg(i), e.queryParams, e.fragment))
            )
            .pipe(
              gi((i) => {
                throw i instanceof ma ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, t, r) {
          const i = e.segments.length > 0 ? new J([], { [K]: e }) : e;
          return new mi(i, t, r);
        }
        expandSegmentGroup(e, t, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(e, t, r).pipe(te((s) => new J([], s)))
            : this.expandSegment(e, r, t, r.segments, i, !0);
        }
        expandChildren(e, t, r) {
          const i = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? i.unshift(s) : i.push(s);
          return Ye(i).pipe(
            As((s) => {
              const o = r.children[s],
                a = Y0(t, s);
              return this.expandSegmentGroup(e, a, o, s).pipe(
                te((l) => ({ segment: l, outlet: s }))
              );
            }),
            g0((s, o) => ((s[o.outlet] = o.segment), s), {}),
            (function (n, e) {
              const t = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  n ? lr((i, s) => n(i, s, r)) : Da,
                  Gp(1),
                  t ? y0(e) : m0(() => new $u())
                );
            })()
          );
        }
        expandSegment(e, t, r, i, s, o) {
          return Ye(r).pipe(
            As((a) =>
              this.expandSegmentAgainstRoute(e, t, r, a, i, s, o).pipe(
                gi((u) => {
                  if (u instanceof ma) return H(null);
                  throw u;
                })
              )
            ),
            xs((a) => !!a),
            gi((a, l) => {
              if (a instanceof $u || "EmptyError" === a.name) {
                if (X0(t, i, s)) return H(new J([], {}));
                throw new ma(t);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(e, t, r, i, s, o, a) {
          return Z0(i, t, s, o)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(e, t, i, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, t, r, i, s, o)
              : nc(t)
            : nc(t);
        }
        expandSegmentAgainstRouteUsingRedirect(e, t, r, i, s, o) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, i, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                t,
                r,
                i,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, r, i) {
          const s = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? tS(s)
            : this.lineralizeSegments(r, s).pipe(
                Je((o) => {
                  const a = new J(o, {});
                  return this.expandSegment(e, a, t, o, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, t, r, i, s, o) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: u,
            positionalParamSegments: c,
          } = Xu(t, i, s);
          if (!a) return nc(t);
          const d = this.applyRedirectCommands(l, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? tS(d)
            : this.lineralizeSegments(i, d).pipe(
                Je((f) =>
                  this.expandSegment(e, t, r, f.concat(s.slice(u)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(e, t, r, i, s) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? H(r._loadedConfig)
                  : this.configLoader.load(e.injector, r)
                ).pipe(te((f) => ((r._loadedConfig = f), new J(i, {}))))
              : H(new J(i, {}));
          const { matched: o, consumedSegments: a, lastChild: l } = Xu(t, r, i);
          if (!o) return nc(t);
          const u = i.slice(l);
          return this.getChildConfig(e, r, i).pipe(
            Je((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: m } = ec(t, a, u, h),
                g = new J(p.segments, p.children);
              if (0 === m.length && g.hasChildren())
                return this.expandChildren(f, h, g).pipe(
                  te((D) => new J(a, D))
                );
              if (0 === h.length && 0 === m.length) return H(new J(a, {}));
              const _ = rn(r) === s;
              return this.expandSegment(f, g, h, m, _ ? K : s, !0).pipe(
                te((b) => new J(a.concat(b.segments), b.children))
              );
            })
          );
        }
        getChildConfig(e, t, r) {
          return t.children
            ? H(new rg(t.children, e))
            : t.loadChildren
            ? void 0 !== t._loadedConfig
              ? H(t._loadedConfig)
              : this.runCanLoadGuards(e.injector, t, r).pipe(
                  Je((i) =>
                    i
                      ? this.configLoader
                          .load(e.injector, t)
                          .pipe(te((s) => ((t._loadedConfig = s), s)))
                      : (function (n) {
                          return new ae((e) =>
                            e.error(
                              Wp(
                                `Cannot load children because the guard of the route "path: '${n.path}'" returned false`
                              )
                            )
                          );
                        })(t)
                  )
                )
            : H(new rg([], e));
        }
        runCanLoadGuards(e, t, r) {
          const i = t.canLoad;
          return i && 0 !== i.length
            ? H(
                i.map((o) => {
                  const a = e.get(o);
                  let l;
                  if (
                    (function (n) {
                      return n && jr(n.canLoad);
                    })(a)
                  )
                    l = a.canLoad(t, r);
                  else {
                    if (!jr(a)) throw new Error("Invalid CanLoad guard");
                    l = a(t, r);
                  }
                  return Gn(l);
                })
              ).pipe(
                ga(),
                lt((o) => {
                  if (!_i(o)) return;
                  const a = Wp(
                    `Redirecting to "${this.urlSerializer.serialize(o)}"`
                  );
                  throw ((a.url = o), a);
                }),
                te((o) => !0 === o)
              )
            : H(!0);
        }
        lineralizeSegments(e, t) {
          let r = [],
            i = t.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return H(r);
            if (i.numberOfChildren > 1 || !i.children[K])
              return KH(e.redirectTo);
            i = i.children[K];
          }
        }
        applyRedirectCommands(e, t, r) {
          return this.applyRedirectCreatreUrlTree(
            t,
            this.urlSerializer.parse(t),
            e,
            r
          );
        }
        applyRedirectCreatreUrlTree(e, t, r, i) {
          const s = this.createSegmentGroup(e, t.root, r, i);
          return new mi(
            s,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(e, t) {
          const r = {};
          return (
            et(e, (i, s) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[s] = t[a];
              } else r[s] = i;
            }),
            r
          );
        }
        createSegmentGroup(e, t, r, i) {
          const s = this.createSegments(e, t.segments, r, i);
          let o = {};
          return (
            et(t.children, (a, l) => {
              o[l] = this.createSegmentGroup(e, a, r, i);
            }),
            new J(s, o)
          );
        }
        createSegments(e, t, r, i) {
          return t.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(e, s, i)
              : this.findOrReturn(s, r)
          );
        }
        findPosParam(e, t, r) {
          const i = r[t.path.substring(1)];
          if (!i)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${t.path}'.`
            );
          return i;
        }
        findOrReturn(e, t) {
          let r = 0;
          for (const i of t) {
            if (i.path === e.path) return t.splice(r), i;
            r++;
          }
          return e;
        }
      }
      function sg(n) {
        const e = {};
        for (const r of Object.keys(n.children)) {
          const s = sg(n.children[r]);
          (s.segments.length > 0 || s.hasChildren()) && (e[r] = s);
        }
        return (function (n) {
          if (1 === n.numberOfChildren && n.children[K]) {
            const e = n.children[K];
            return new J(n.segments.concat(e.segments), e.children);
          }
          return n;
        })(new J(n.segments, e));
      }
      class nS {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class rc {
        constructor(e, t) {
          (this.component = e), (this.route = t);
        }
      }
      function tU(n, e, t) {
        const r = n._root;
        return ya(r, e ? e._root : null, t, [r.value]);
      }
      function ic(n, e, t) {
        const r = (function (n) {
          if (!n) return null;
          for (let e = n.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : t).get(n);
      }
      function ya(
        n,
        e,
        t,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = fa(e);
        return (
          n.children.forEach((o) => {
            (function (
              n,
              e,
              t,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = n.value,
                o = e ? e.value : null,
                a = t ? t.getContext(n.value.outlet) : null;
              if (o && s.routeConfig === o.routeConfig) {
                const l = (function (n, e, t) {
                  if ("function" == typeof t) return t(n, e);
                  switch (t) {
                    case "pathParamsChange":
                      return !yi(n.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !yi(n.url, e.url) || !$n(n.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Xp(n, e) || !$n(n.queryParams, e.queryParams);
                    case "paramsChange":
                    default:
                      return !Xp(n, e);
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new nS(r))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  ya(n, e, s.component ? (a ? a.children : null) : t, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new rc(a.outlet.component, o));
              } else
                o && _a(e, a, i),
                  i.canActivateChecks.push(new nS(r)),
                  ya(n, null, s.component ? (a ? a.children : null) : t, r, i);
            })(o, s[o.value.outlet], t, r.concat([o.value]), i),
              delete s[o.value.outlet];
          }),
          et(s, (o, a) => _a(o, t.getContext(a), i)),
          i
        );
      }
      function _a(n, e, t) {
        const r = fa(n),
          i = n.value;
        et(r, (s, o) => {
          _a(s, i.component ? (e ? e.children.getContext(o) : null) : e, t);
        }),
          t.canDeactivateChecks.push(
            new rc(
              i.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              i
            )
          );
      }
      class pU {}
      function rS(n) {
        return new ae((e) => e.error(n));
      }
      class mU {
        constructor(e, t, r, i, s, o) {
          (this.rootComponentType = e),
            (this.config = t),
            (this.urlTree = r),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          const e = ec(
              this.urlTree.root,
              [],
              [],
              this.config.filter((o) => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            t = this.processSegmentGroup(this.config, e, K);
          if (null === t) return null;
          const r = new Ku(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              K,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            i = new fr(r, t),
            s = new j0(this.url, i);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(e) {
          const t = e.value,
            r = L0(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            e.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(e, t, r) {
          return 0 === t.segments.length && t.hasChildren()
            ? this.processChildren(e, t)
            : this.processSegment(e, t, t.segments, r);
        }
        processChildren(e, t) {
          const r = [];
          for (const s of Object.keys(t.children)) {
            const o = t.children[s],
              a = Y0(e, s),
              l = this.processSegmentGroup(a, o, s);
            if (null === l) return null;
            r.push(...l);
          }
          const i = iS(r);
          return (
            (function (n) {
              n.sort((e, t) =>
                e.value.outlet === K
                  ? -1
                  : t.value.outlet === K
                  ? 1
                  : e.value.outlet.localeCompare(t.value.outlet)
              );
            })(i),
            i
          );
        }
        processSegment(e, t, r, i) {
          for (const s of e) {
            const o = this.processSegmentAgainstRoute(s, t, r, i);
            if (null !== o) return o;
          }
          return X0(t, r, i) ? [] : null;
        }
        processSegmentAgainstRoute(e, t, r, i) {
          if (e.redirectTo || !Z0(e, t, r, i)) return null;
          let s,
            o = [],
            a = [];
          if ("**" === e.path) {
            const h = r.length > 0 ? S0(r).parameters : {};
            s = new Ku(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              aS(e),
              rn(e),
              e.component,
              e,
              sS(t),
              oS(t) + r.length,
              lS(e)
            );
          } else {
            const h = Xu(t, e, r);
            if (!h.matched) return null;
            (o = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (s = new Ku(
                o,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                aS(e),
                rn(e),
                e.component,
                e,
                sS(t),
                oS(t) + o.length,
                lS(e)
              ));
          }
          const l = (function (n) {
              return n.children
                ? n.children
                : n.loadChildren
                ? n._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: u, slicedSegments: c } = ec(
              t,
              o,
              a,
              l.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && u.hasChildren()) {
            const h = this.processChildren(l, u);
            return null === h ? null : [new fr(s, h)];
          }
          if (0 === l.length && 0 === c.length) return [new fr(s, [])];
          const d = rn(e) === i,
            f = this.processSegment(l, u, c, d ? K : i);
          return null === f ? null : [new fr(s, f)];
        }
      }
      function CU(n) {
        const e = n.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function iS(n) {
        const e = [],
          t = new Set();
        for (const r of n) {
          if (!CU(r)) {
            e.push(r);
            continue;
          }
          const i = e.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), t.add(i)) : e.push(r);
        }
        for (const r of t) {
          const i = iS(r.children);
          e.push(new fr(r.value, i));
        }
        return e.filter((r) => !t.has(r));
      }
      function sS(n) {
        let e = n;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function oS(n) {
        let e = n,
          t = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (t += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return t - 1;
      }
      function aS(n) {
        return n.data || {};
      }
      function lS(n) {
        return n.resolve || {};
      }
      function og(n) {
        return cr((e) => {
          const t = n(e);
          return t ? Ye(t).pipe(te(() => e)) : H(e);
        });
      }
      class AU extends class {
        shouldDetach(e) {
          return !1;
        }
        store(e, t) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, t) {
          return e.routeConfig === t.routeConfig;
        }
      } {}
      const ag = new G("ROUTES");
      class uS {
        constructor(e, t, r, i) {
          (this.loader = e),
            (this.compiler = t),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = i);
        }
        load(e, t) {
          if (t._loader$) return t._loader$;
          this.onLoadStartListener && this.onLoadStartListener(t);
          const i = this.loadModuleFactory(t.loadChildren).pipe(
            te((s) => {
              this.onLoadEndListener && this.onLoadEndListener(t);
              const o = s.create(e);
              return new rg(
                w0(o.injector.get(ag, void 0, x.Self | x.Optional)).map(ig),
                o
              );
            }),
            gi((s) => {
              throw ((t._loader$ = void 0), s);
            })
          );
          return (
            (t._loader$ = new Dg(i, () => new jt()).pipe(hc())), t._loader$
          );
        }
        loadModuleFactory(e) {
          return "string" == typeof e
            ? Ye(this.loader.load(e))
            : Gn(e()).pipe(
                Je((t) =>
                  t instanceof hv
                    ? H(t)
                    : Ye(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class MU {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Fs()),
            (this.attachRef = null);
        }
      }
      class Fs {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(e, t) {
          const r = this.getOrCreateContext(e);
          (r.outlet = t), this.contexts.set(e, r);
        }
        onChildOutletDestroyed(e) {
          const t = this.getContext(e);
          t && ((t.outlet = null), (t.attachRef = null));
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let t = this.getContext(e);
          return t || ((t = new MU()), this.contexts.set(e, t)), t;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      class PU {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, t) {
          return e;
        }
      }
      function NU(n) {
        throw n;
      }
      function xU(n, e, t) {
        return e.parse("/");
      }
      function cS(n, e) {
        return H(null);
      }
      const RU = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        OU = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let St = (() => {
        class n {
          constructor(t, r, i, s, o, a, l, u) {
            (this.rootComponentType = t),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = s),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.lastLocationChangeInfo = null),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new jt()),
              (this.errorHandler = NU),
              (this.malformedUriErrorHandler = xU),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: cS,
                afterPreactivation: cS,
              }),
              (this.urlHandlingStrategy = new PU()),
              (this.routeReuseStrategy = new AU()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = o.get(jn)),
              (this.console = o.get(Vl));
            const f = o.get(Ie);
            (this.isNgZoneEnabled = f instanceof Ie && Ie.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = new mi(new J([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new uS(
                a,
                l,
                (h) => this.triggerEvent(new C0(h)),
                (h) => this.triggerEvent(new v0(h))
              )),
              (this.routerState = V0(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Vt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var t;
            return null === (t = this.location.getState()) || void 0 === t
              ? void 0
              : t.ɵrouterPageId;
          }
          setupNavigations(t) {
            const r = this.events;
            return t.pipe(
              lr((i) => 0 !== i.id),
              te((i) =>
                Object.assign(Object.assign({}, i), {
                  extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
                })
              ),
              cr((i) => {
                let s = !1,
                  o = !1;
                return H(i).pipe(
                  lt((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  cr((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        sc(a.source) && (this.browserUrlTree = a.extractedUrl),
                        H(a).pipe(
                          cr((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new qp(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? pi
                                : Promise.resolve(d)
                            );
                          }),
                          (function (n, e, t, r) {
                            return cr((i) =>
                              (function (n, e, t, r, i) {
                                return new ZH(n, e, t, r, i).apply();
                              })(n, e, t, i.extractedUrl, r).pipe(
                                te((s) =>
                                  Object.assign(Object.assign({}, i), {
                                    urlAfterRedirects: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          lt((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function (n, e, t, r, i) {
                            return Je((s) =>
                              (function (
                                n,
                                e,
                                t,
                                r,
                                i = "emptyOnly",
                                s = "legacy"
                              ) {
                                try {
                                  const o = new mU(
                                    n,
                                    e,
                                    t,
                                    r,
                                    i,
                                    s
                                  ).recognize();
                                  return null === o ? rS(new pU()) : H(o);
                                } catch (o) {
                                  return rS(o);
                                }
                              })(
                                n,
                                e,
                                s.urlAfterRedirects,
                                t(s.urlAfterRedirects),
                                r,
                                i
                              ).pipe(
                                te((o) =>
                                  Object.assign(Object.assign({}, s), {
                                    targetSnapshot: o,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          lt((d) => {
                            "eager" === this.urlUpdateStrategy &&
                              (d.extras.skipLocationChange ||
                                this.setBrowserUrl(d.urlAfterRedirects, d),
                              (this.browserUrlTree = d.urlAfterRedirects));
                            const f = new QB(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: g,
                        } = a,
                        _ = new qp(f, this.serializeUrl(h), p, m);
                      r.next(_);
                      const y = V0(h, this.rootComponentType).snapshot;
                      return H(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: y,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, g), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (
                      (this.rawUrlTree = a.rawUrl),
                      (this.browserUrlTree = a.urlAfterRedirects),
                      a.resolve(null),
                      pi
                    );
                  }),
                  og((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.beforePreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  lt((a) => {
                    const l = new KB(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  te((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: tU(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function (n, e) {
                    return Je((t) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: o,
                        },
                      } = t;
                      return 0 === o.length && 0 === s.length
                        ? H(
                            Object.assign(Object.assign({}, t), {
                              guardsResult: !0,
                            })
                          )
                        : (function (n, e, t, r) {
                            return Ye(n).pipe(
                              Je((i) =>
                                (function (n, e, t, r, i) {
                                  const s =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? H(
                                        s.map((a) => {
                                          const l = ic(a, e, i);
                                          let u;
                                          if (
                                            (function (n) {
                                              return n && jr(n.canDeactivate);
                                            })(l)
                                          )
                                            u = Gn(l.canDeactivate(n, e, t, r));
                                          else {
                                            if (!jr(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            u = Gn(l(n, e, t, r));
                                          }
                                          return u.pipe(xs());
                                        })
                                      ).pipe(ga())
                                    : H(!0);
                                })(i.component, i.route, t, e, r)
                              ),
                              xs((i) => !0 !== i, !0)
                            );
                          })(o, r, i, n).pipe(
                            Je((a) =>
                              a &&
                              (function (n) {
                                return "boolean" == typeof n;
                              })(a)
                                ? (function (n, e, t, r) {
                                    return Ye(e).pipe(
                                      As((i) =>
                                        Up(
                                          (function (n, e) {
                                            return (
                                              null !== n && e && e(new XB(n)),
                                              H(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function (n, e) {
                                            return (
                                              null !== n && e && e(new tH(n)),
                                              H(!0)
                                            );
                                          })(i.route, r),
                                          (function (n, e, t) {
                                            const r = e[e.length - 1],
                                              s = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function (n) {
                                                    const e = n.routeConfig
                                                      ? n.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return e && 0 !== e.length
                                                      ? { node: n, guards: e }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  h0(() =>
                                                    H(
                                                      o.guards.map((l) => {
                                                        const u = ic(
                                                          l,
                                                          o.node,
                                                          t
                                                        );
                                                        let c;
                                                        if (
                                                          (function (n) {
                                                            return (
                                                              n &&
                                                              jr(
                                                                n.canActivateChild
                                                              )
                                                            );
                                                          })(u)
                                                        )
                                                          c = Gn(
                                                            u.canActivateChild(
                                                              r,
                                                              n
                                                            )
                                                          );
                                                        else {
                                                          if (!jr(u))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = Gn(u(r, n));
                                                        }
                                                        return c.pipe(xs());
                                                      })
                                                    ).pipe(ga())
                                                  )
                                                );
                                            return H(s).pipe(ga());
                                          })(n, i.path, t),
                                          (function (n, e, t) {
                                            const r = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null;
                                            return r && 0 !== r.length
                                              ? H(
                                                  r.map((s) =>
                                                    h0(() => {
                                                      const o = ic(s, e, t);
                                                      let a;
                                                      if (
                                                        (function (n) {
                                                          return (
                                                            n &&
                                                            jr(n.canActivate)
                                                          );
                                                        })(o)
                                                      )
                                                        a = Gn(
                                                          o.canActivate(e, n)
                                                        );
                                                      else {
                                                        if (!jr(o))
                                                          throw new Error(
                                                            "Invalid CanActivate guard"
                                                          );
                                                        a = Gn(o(e, n));
                                                      }
                                                      return a.pipe(xs());
                                                    })
                                                  )
                                                ).pipe(ga())
                                              : H(!0);
                                          })(n, i.route, t)
                                        )
                                      ),
                                      xs((i) => !0 !== i, !0)
                                    );
                                  })(r, s, n, e)
                                : H(a)
                            ),
                            te((a) =>
                              Object.assign(Object.assign({}, t), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  lt((a) => {
                    if (_i(a.guardsResult)) {
                      const u = Wp(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((u.url = a.guardsResult), u);
                    }
                    const l = new YB(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  lr(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  og((a) => {
                    if (a.guards.canActivateChecks.length)
                      return H(a).pipe(
                        lt((l) => {
                          const u = new JB(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        cr((l) => {
                          let u = !1;
                          return H(l).pipe(
                            (function (n, e) {
                              return Je((t) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = t;
                                if (!i.length) return H(t);
                                let s = 0;
                                return Ye(i).pipe(
                                  As((o) =>
                                    (function (n, e, t, r) {
                                      return (function (n, e, t, r) {
                                        const i = Object.keys(n);
                                        if (0 === i.length) return H({});
                                        const s = {};
                                        return Ye(i).pipe(
                                          Je((o) =>
                                            (function (n, e, t, r) {
                                              const i = ic(n, e, r);
                                              return Gn(
                                                i.resolve
                                                  ? i.resolve(e, t)
                                                  : i(e, t)
                                              );
                                            })(n[o], e, t, r).pipe(
                                              lt((a) => {
                                                s[o] = a;
                                              })
                                            )
                                          ),
                                          Gp(1),
                                          Je(() =>
                                            Object.keys(s).length === i.length
                                              ? H(s)
                                              : pi
                                          )
                                        );
                                      })(n._resolve, n, e, r).pipe(
                                        te(
                                          (s) => (
                                            (n._resolvedData = s),
                                            (n.data = Object.assign(
                                              Object.assign({}, n.data),
                                              L0(n, t).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(o.route, r, n, e)
                                  ),
                                  lt(() => s++),
                                  Gp(1),
                                  Je((o) => (s === i.length ? H(t) : pi))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            lt({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        lt((l) => {
                          const u = new ZB(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  og((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.afterPreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  te((a) => {
                    const l = (function (n, e, t) {
                      const r = Yu(n, e._root, t ? t._root : void 0);
                      return new k0(r, e);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  lt((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((n, e, t) =>
                    te(
                      (r) => (
                        new kH(
                          e,
                          r.targetRouterState,
                          r.currentRouterState,
                          t
                        ).activate(n),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  lt({
                    next() {
                      s = !0;
                    },
                    complete() {
                      s = !0;
                    },
                  }),
                  Hp(() => {
                    var a;
                    if (!s && !o) {
                      const l = `Navigation ID ${i.id} is not equal to the current navigation id ${this.navigationId}`;
                      "replace" === this.canceledNavigationResolution
                        ? (this.restoreHistory(i),
                          this.cancelNavigationTransition(i, l))
                        : this.cancelNavigationTransition(i, l);
                    }
                    (null === (a = this.currentNavigation) || void 0 === a
                      ? void 0
                      : a.id) === i.id && (this.currentNavigation = null);
                  }),
                  gi((a) => {
                    if (
                      ((o = !0),
                      (function (n) {
                        return n && n[b0];
                      })(a))
                    ) {
                      const l = _i(a.url);
                      l || ((this.navigated = !0), this.restoreHistory(i, !0));
                      const u = new _0(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message
                      );
                      r.next(u),
                        l
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    i.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    sc(i.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: i.resolve,
                                  reject: i.reject,
                                  promise: i.promise,
                                }
                              );
                            }, 0)
                          : i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const l = new zB(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a
                      );
                      r.next(l);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (u) {
                        i.reject(u);
                      }
                    }
                    return pi;
                  })
                );
              })
            );
          }
          resetRootComponentType(t) {
            (this.rootComponentType = t),
              (this.routerState.root.component = this.rootComponentType);
          }
          getTransition() {
            const t = this.transitions.value;
            return (t.urlAfterRedirects = this.browserUrlTree), t;
          }
          setTransition(t) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.getTransition()), t)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const r = this.extractLocationChangeInfoFromEvent(t);
                this.shouldScheduleNavigation(this.lastLocationChangeInfo, r) &&
                  setTimeout(() => {
                    const { source: i, state: s, urlTree: o } = r,
                      a = { replaceUrl: !0 };
                    if (s) {
                      const l = Object.assign({}, s);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (a.state = l);
                    }
                    this.scheduleNavigation(o, i, s, a);
                  }, 0),
                  (this.lastLocationChangeInfo = r);
              }));
          }
          extractLocationChangeInfoFromEvent(t) {
            var r;
            return {
              source: "popstate" === t.type ? "popstate" : "hashchange",
              urlTree: this.parseUrl(t.url),
              state: (
                null === (r = t.state) || void 0 === r ? void 0 : r.navigationId
              )
                ? t.state
                : null,
              transitionId: this.getTransition().id,
            };
          }
          shouldScheduleNavigation(t, r) {
            if (!t) return !0;
            const i = r.urlTree.toString() === t.urlTree.toString();
            return (
              r.transitionId !== t.transitionId ||
              !i ||
              !(
                ("hashchange" === r.source && "popstate" === t.source) ||
                ("popstate" === r.source && "hashchange" === t.source)
              )
            );
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(t) {
            this.events.next(t);
          }
          resetConfig(t) {
            K0(t),
              (this.config = t.map(ig)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(t, r = {}) {
            const {
                relativeTo: i,
                queryParams: s,
                fragment: o,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = i || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : o;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  s
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function (n, e, t, r, i) {
                if (0 === t.length) return eg(e.root, e.root, e, r, i);
                const s = (function (n) {
                  if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
                    return new $0(!0, 0, n);
                  let e = 0,
                    t = !1;
                  const r = n.reduce((i, s, o) => {
                    if ("object" == typeof s && null != s) {
                      if (s.outlets) {
                        const a = {};
                        return (
                          et(s.outlets, (l, u) => {
                            a[u] = "string" == typeof l ? l.split("/") : l;
                          }),
                          [...i, { outlets: a }]
                        );
                      }
                      if (s.segmentPath) return [...i, s.segmentPath];
                    }
                    return "string" != typeof s
                      ? [...i, s]
                      : 0 === o
                      ? (s.split("/").forEach((a, l) => {
                          (0 == l && "." === a) ||
                            (0 == l && "" === a
                              ? (t = !0)
                              : ".." === a
                              ? e++
                              : "" != a && i.push(a));
                        }),
                        i)
                      : [...i, s];
                  }, []);
                  return new $0(t, e, r);
                })(t);
                if (s.toRoot()) return eg(e.root, new J([], {}), e, r, i);
                const o = (function (n, e, t) {
                    if (n.isAbsolute) return new tg(e.root, !0, 0);
                    if (-1 === t.snapshot._lastPathIndex) {
                      const s = t.snapshot._urlSegment;
                      return new tg(s, s === e.root, 0);
                    }
                    const r = Ju(n.commands[0]) ? 0 : 1;
                    return (function (n, e, t) {
                      let r = n,
                        i = e,
                        s = t;
                      for (; s > i; ) {
                        if (((s -= i), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        i = r.segments.length;
                      }
                      return new tg(r, !1, i - s);
                    })(
                      t.snapshot._urlSegment,
                      t.snapshot._lastPathIndex + r,
                      n.numberOfDoubleDots
                    );
                  })(s, e, n),
                  a = o.processChildren
                    ? Zu(o.segmentGroup, o.index, s.commands)
                    : G0(o.segmentGroup, o.index, s.commands);
                return eg(o.segmentGroup, a, e, r, i);
              })(u, this.currentUrlTree, t, d, null != c ? c : null)
            );
          }
          navigateByUrl(t, r = { skipLocationChange: !1 }) {
            const i = _i(t) ? t : this.parseUrl(t),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, r);
          }
          navigate(t, r = { skipLocationChange: !1 }) {
            return (
              (function (n) {
                for (let e = 0; e < n.length; e++) {
                  const t = n[e];
                  if (null == t)
                    throw new Error(
                      `The requested path contains ${t} segment at index ${e}`
                    );
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, r), r)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let r;
            try {
              r = this.urlSerializer.parse(t);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, t);
            }
            return r;
          }
          isActive(t, r) {
            let i;
            if (
              ((i =
                !0 === r
                  ? Object.assign({}, RU)
                  : !1 === r
                  ? Object.assign({}, OU)
                  : r),
              _i(t))
            )
              return A0(this.currentUrlTree, t, i);
            const s = this.parseUrl(t);
            return A0(this.currentUrlTree, s, i);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((r, i) => {
              const s = t[i];
              return null != s && (r[i] = s), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (t) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = t.id),
                  (this.currentPageId = t.targetPageId),
                  this.events.next(
                    new ua(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  t.resolve(!0);
              },
              (t) => {
                this.console.warn(`Unhandled Navigation Error: ${t}`);
              }
            );
          }
          scheduleNavigation(t, r, i, s, o) {
            var a, l;
            if (this.disposed) return Promise.resolve(!1);
            const u = this.getTransition(),
              c = sc(r) && u && !sc(u.source),
              h =
                (this.lastSuccessfulId === u.id || this.currentNavigation
                  ? u.rawUrl
                  : u.urlAfterRedirects
                ).toString() === t.toString();
            if (c && h) return Promise.resolve(!0);
            let p, m, g;
            o
              ? ((p = o.resolve), (m = o.reject), (g = o.promise))
              : (g = new Promise((b, D) => {
                  (p = b), (m = D);
                }));
            const _ = ++this.navigationId;
            let y;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (y =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : s.replaceUrl || s.skipLocationChange
                      ? null !== (a = this.browserPageId) && void 0 !== a
                        ? a
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l
                          ? l
                          : 0) + 1))
                : (y = 0),
              this.setTransition({
                id: _,
                targetPageId: y,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: s,
                resolve: p,
                reject: m,
                promise: g,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              g.catch((b) => Promise.reject(b))
            );
          }
          setBrowserUrl(t, r) {
            const i = this.urlSerializer.serialize(t),
              s = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", s)
              : this.location.go(i, "", s);
          }
          restoreHistory(t, r = !1) {
            var i, s;
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - t.targetPageId;
              ("popstate" !== t.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (i = this.currentNavigation) || void 0 === i
                    ? void 0
                    : i.finalUrl)) ||
              0 === o
                ? this.currentUrlTree ===
                    (null === (s = this.currentNavigation) || void 0 === s
                      ? void 0
                      : s.finalUrl) &&
                  0 === o &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(t, r) {
            const i = new _0(t.id, this.serializeUrl(t.extractedUrl), r);
            this.triggerEvent(i), t.resolve(!1);
          }
          generateNgRouterState(t, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: r }
              : { navigationId: t };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(
              E(za),
              E(zp),
              E(Fs),
              E(Yl),
              E(ie),
              E(jl),
              E(si),
              E(void 0)
            );
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function sc(n) {
        return "imperative" !== n;
      }
      let dS = (() => {
        class n {
          constructor(t, r, i, s, o) {
            (this.parentContexts = t),
              (this.location = r),
              (this.resolver = i),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new xe()),
              (this.deactivateEvents = new xe()),
              (this.name = s || K),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return (this.activated = null), (this._activatedRoute = null), t;
          }
          attach(t, r) {
            (this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const o = (r = r || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new LU(t, a, this.location.injector);
            (this.activated = this.location.createComponent(
              o,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(
              v(Fs),
              v(mn),
              v(ti),
              (function (n) {
                return (function (n, e) {
                  if ("class" === e) return n.classes;
                  if ("style" === e) return n.styles;
                  const t = n.attrs;
                  if (t) {
                    const r = t.length;
                    let i = 0;
                    for (; i < r; ) {
                      const s = t[i];
                      if (tm(s)) break;
                      if (0 === s) i += 2;
                      else if ("number" == typeof s)
                        for (i++; i < r && "string" == typeof t[i]; ) i++;
                      else {
                        if (s === e) return t[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(He(), n);
              })("name"),
              v(ff)
            );
          }),
          (n.ɵdir = O({
            type: n,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          n
        );
      })();
      class LU {
        constructor(e, t, r) {
          (this.route = e), (this.childContexts = t), (this.parent = r);
        }
        get(e, t) {
          return e === Os
            ? this.route
            : e === Fs
            ? this.childContexts
            : this.parent.get(e, t);
        }
      }
      class fS {}
      class hS {
        preload(e, t) {
          return H(null);
        }
      }
      let pS = (() => {
          class n {
            constructor(t, r, i, s, o) {
              (this.router = t),
                (this.injector = s),
                (this.preloadingStrategy = o),
                (this.loader = new uS(
                  r,
                  i,
                  (u) => t.triggerEvent(new C0(u)),
                  (u) => t.triggerEvent(new v0(u))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  lr((t) => t instanceof ua),
                  As(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(jn);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, r) {
              const i = [];
              for (const s of r)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const o = s._loadedConfig;
                  i.push(this.processRoutes(o.module, o.routes));
                } else
                  s.loadChildren && !s.canLoad
                    ? i.push(this.preloadConfig(t, s))
                    : s.children && i.push(this.processRoutes(t, s.children));
              return Ye(i).pipe(
                Ws(),
                te((s) => {})
              );
            }
            preloadConfig(t, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? H(r._loadedConfig)
                  : this.loader.load(t.injector, r)
                ).pipe(
                  Je(
                    (s) => (
                      (r._loadedConfig = s),
                      this.processRoutes(s.module, s.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(St), E(jl), E(si), E(ie), E(fS));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        cg = (() => {
          class n {
            constructor(t, r, i = {}) {
              (this.router = t),
                (this.viewportScroller = r),
                (this.options = i),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (i.scrollPositionRestoration =
                  i.scrollPositionRestoration || "disabled"),
                (i.anchorScrolling = i.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof qp
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof ua &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof E0 &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, r) {
              this.router.triggerEvent(
                new E0(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(St), E(Mb), E(void 0));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const Ci = new G("ROUTER_CONFIGURATION"),
        gS = new G("ROUTER_FORROOT_GUARD"),
        BU = [
          Yl,
          { provide: zp, useClass: N0 },
          {
            provide: St,
            useFactory: function (n, e, t, r, i, s, o, a = {}, l, u) {
              const c = new St(null, n, e, t, r, i, s, w0(o));
              return (
                l && (c.urlHandlingStrategy = l),
                u && (c.routeReuseStrategy = u),
                (function (n, e) {
                  n.errorHandler && (e.errorHandler = n.errorHandler),
                    n.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = n.malformedUriErrorHandler),
                    n.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = n.onSameUrlNavigation),
                    n.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        n.paramsInheritanceStrategy),
                    n.relativeLinkResolution &&
                      (e.relativeLinkResolution = n.relativeLinkResolution),
                    n.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = n.urlUpdateStrategy);
                })(a, c),
                a.enableTracing &&
                  c.events.subscribe((d) => {
                    var f, h;
                    null === (f = console.group) ||
                      void 0 === f ||
                      f.call(console, `Router Event: ${d.constructor.name}`),
                      console.log(d.toString()),
                      console.log(d),
                      null === (h = console.groupEnd) ||
                        void 0 === h ||
                        h.call(console);
                  }),
                c
              );
            },
            deps: [
              zp,
              Fs,
              Yl,
              ie,
              jl,
              si,
              ag,
              Ci,
              [class {}, new Dt()],
              [class {}, new Dt()],
            ],
          },
          Fs,
          {
            provide: Os,
            useFactory: function (n) {
              return n.routerState.root;
            },
            deps: [St],
          },
          { provide: jl, useClass: k1 },
          pS,
          hS,
          class {
            preload(e, t) {
              return t().pipe(gi(() => H(null)));
            }
          },
          { provide: Ci, useValue: { enableTracing: !1 } },
        ];
      function HU() {
        return new Wf("Router", St);
      }
      let mS = (() => {
        class n {
          constructor(t, r) {}
          static forRoot(t, r) {
            return {
              ngModule: n,
              providers: [
                BU,
                yS(t),
                {
                  provide: gS,
                  useFactory: GU,
                  deps: [[St, new Dt(), new Dr()]],
                },
                { provide: Ci, useValue: r || {} },
                {
                  provide: Ss,
                  useFactory: $U,
                  deps: [li, [new Hi(uh), new Dt()], Ci],
                },
                { provide: cg, useFactory: UU, deps: [St, Mb, Ci] },
                {
                  provide: fS,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : hS,
                },
                { provide: Wf, multi: !0, useFactory: HU },
                [
                  dg,
                  { provide: qo, multi: !0, useFactory: QU, deps: [dg] },
                  { provide: _S, useFactory: KU, deps: [dg] },
                  { provide: _E, multi: !0, useExisting: _S },
                ],
              ],
            };
          }
          static forChild(t) {
            return { ngModule: n, providers: [yS(t)] };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(gS, 8), E(St, 8));
          }),
          (n.ɵmod = Ze({ type: n })),
          (n.ɵinj = Be({})),
          n
        );
      })();
      function UU(n, e, t) {
        return t.scrollOffset && e.setOffset(t.scrollOffset), new cg(n, e, t);
      }
      function $U(n, e, t = {}) {
        return t.useHash ? new nk(n, e) : new lb(n, e);
      }
      function GU(n) {
        return "guarded";
      }
      function yS(n) {
        return [
          { provide: iA, multi: !0, useValue: n },
          { provide: ag, multi: !0, useValue: n },
        ];
      }
      let dg = (() => {
        class n {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new jt());
          }
          appInitializer() {
            return this.injector.get(XF, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const i = new Promise((a) => (r = a)),
                s = this.injector.get(St),
                o = this.injector.get(Ci);
              return (
                "disabled" === o.initialNavigation
                  ? (s.setUpLocationChangeListener(), r(!0))
                  : "enabled" === o.initialNavigation ||
                    "enabledBlocking" === o.initialNavigation
                  ? ((s.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? H(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    s.initialNavigation())
                  : r(!0),
                i
              );
            });
          }
          bootstrapListener(t) {
            const r = this.injector.get(Ci),
              i = this.injector.get(pS),
              s = this.injector.get(cg),
              o = this.injector.get(St),
              a = this.injector.get(bs);
            t === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                o.initialNavigation(),
              i.setUpPreloading(),
              s.init(),
              o.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(E(ie));
          }),
          (n.ɵprov = P({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function QU(n) {
        return n.appInitializer.bind(n);
      }
      function KU(n) {
        return n.bootstrapListener.bind(n);
      }
      const _S = new G("Router Initializer"),
        JU = [];
      let ZU = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = Ze({ type: n })),
          (n.ɵinj = Be({ imports: [[mS.forRoot(JU)], mS] })),
          n
        );
      })();
      var oc,
        XU = new Uint8Array(16);
      function e$() {
        if (
          !oc &&
          !(oc =
            ("undefined" != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ("undefined" != typeof msCrypto &&
              "function" == typeof msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return oc(XU);
      }
      const t$ =
          /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
        r$ = function (n) {
          return "string" == typeof n && t$.test(n);
        };
      for (var tt = [], fg = 0; fg < 256; ++fg)
        tt.push((fg + 256).toString(16).substr(1));
      const a$ = function (n, e, t) {
        var r = (n = n || {}).random || (n.rng || e$)();
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), e)) {
          t = t || 0;
          for (var i = 0; i < 16; ++i) e[t + i] = r[i];
          return e;
        }
        return (function (n) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            t = (
              tt[n[e + 0]] +
              tt[n[e + 1]] +
              tt[n[e + 2]] +
              tt[n[e + 3]] +
              "-" +
              tt[n[e + 4]] +
              tt[n[e + 5]] +
              "-" +
              tt[n[e + 6]] +
              tt[n[e + 7]] +
              "-" +
              tt[n[e + 8]] +
              tt[n[e + 9]] +
              "-" +
              tt[n[e + 10]] +
              tt[n[e + 11]] +
              tt[n[e + 12]] +
              tt[n[e + 13]] +
              tt[n[e + 14]] +
              tt[n[e + 15]]
            ).toLowerCase();
          if (!r$(t)) throw TypeError("Stringified UUID is invalid");
          return t;
        })(r);
      };
      let CS = (() => {
          class n {
            constructor(t) {
              (this.httpClient = t),
                (this.headers = new en()),
                this.headers.append("Content-Type", "application/json");
            }
            getVideoInfo(t) {
              return this.httpClient.get(`${Ts_apiUrl}/video-info`, {
                headers: this.headers,
                params: { url: t },
              });
            }
            downloadFromDisk(t, r, i) {
              return this.httpClient.get(`${Ts_apiUrl}/download/${r}`, {
                headers: this.headers,
                responseType: "blob",
                reportProgress: !0,
                params: { url: t, uuidLocalKey: i },
              });
            }
            downloadFromStream(t, r) {
              return this.httpClient.get(`${Ts_apiUrl}/download-stream/${r}`, {
                headers: this.headers,
                responseType: "blob",
                reportProgress: !0,
                params: { url: t },
              });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(hu));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        vS = (() => {
          class n {
            constructor(t) {
              (this.httpClient = t),
                (this.headers = new en()),
                this.headers.append("Content-Type", "application/json");
            }
            removeDownloadedFile(t) {
              return this.httpClient.get(`${Ts_apiUrl}/file-queue/remove`, {
                headers: this.headers,
                params: { uuid: t },
              });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(E(hu));
            }),
            (n.ɵprov = P({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const l$ = ["urlInput"];
      function u$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "button", 25),
            Ee("click", function () {
              return An(t), be(2).directDownloadGateway("audio");
            }),
            X(1, "Áudio"),
            M();
        }
        2 & n && ye("disabled", be(2).isDownloading);
      }
      function c$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "button", 25),
            Ee("click", function () {
              return An(t), be(2).directDownloadGateway("video");
            }),
            X(1, "Vídeo"),
            M();
        }
        2 & n && ye("disabled", be(2).isDownloading);
      }
      function d$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "button", 25),
            Ee("click", function () {
              return An(t), be(2).directDownloadGateway("video-no-sound");
            }),
            X(1, "Vídeo sem áudio"),
            M();
        }
        2 & n && ye("disabled", be(2).isDownloading);
      }
      function f$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "div", 16),
            A(1, "div", 17),
            kn(2, "img", 18),
            A(3, "label"),
            A(4, "strong"),
            X(5, "Título:"),
            M(),
            X(6),
            M(),
            A(7, "label"),
            A(8, "strong"),
            X(9, "Duração:"),
            M(),
            X(10),
            M(),
            A(11, "label"),
            A(12, "strong"),
            X(13, "Visualizações:"),
            M(),
            X(14),
            M(),
            A(15, "label"),
            A(16, "strong"),
            X(17, "Autor:"),
            M(),
            X(18),
            M(),
            M(),
            A(19, "div", 19),
            A(20, "div", 20),
            A(21, "label", 21),
            A(22, "strong"),
            X(23, ""),
            M(),
            M(),
            Ot(24, u$, 2, 1, "button", 22),
            Ot(25, c$, 2, 1, "button", 22),
            Ot(26, d$, 2, 1, "button", 22),
            M(),
            A(27, "div", 23),
            A(28, "label", 21),
            A(29, "strong"),
            X,
            M(),
            M(),
            A(31, "p"),
            X,
            M(),
            A(33, "button"),
            Ee("click", function () {
              return An(t), be().goToPatreon();
            }),
            M(),
            A(35, "button"),
            Ee("click", function () {
              return An(t), be().goToCoffee();
            }),
            X(36, ""),
            M(),
            M(),
            M(),
            M();
        }
        if (2 & n) {
          const t = be();
          ue(2),
            ye("src", t.getThumbnail(t.videoInfo), ho),
            ue(4),
            gn(" ", t.videoInfo.title, ""),
            ue(4),
            gn(" ", t.videoInfo.duration, ""),
            ue(4),
            gn(" ", t.videoInfo.viewCount, ""),
            ue(4),
            gn(" ", t.videoInfo.author, ""),
            ue(6),
            ye("ngIf", t.hasFormat(t.videoInfo, "audio")),
            ue(1),
            ye("ngIf", t.hasFormat(t.videoInfo, "audio/video")),
            ue(1),
            ye("ngIf", t.hasFormat(t.videoInfo, "video"));
        }
      }
      function h$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "button", 25),
            Ee("click", function () {
              An(t);
              const i = be().$implicit;
              return be(2).downloadGateway(i, "audio");
            }),
            X(1, "Áudio"),
            M();
        }
        2 & n && ye("disabled", be(3).isDownloading);
      }
      function p$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "button", 25),
            Ee("click", function () {
              An(t);
              const i = be().$implicit;
              return be(2).downloadGateway(i, "video");
            }),
            X(1, "Vídeo"),
            M();
        }
        2 & n && ye("disabled", be(3).isDownloading);
      }
      function g$(n, e) {
        if (1 & n) {
          const t = nr();
          A(0, "button", 25),
            Ee("click", function () {
              An(t);
              const i = be().$implicit;
              return be(2).downloadGateway(i, "video-no-sound");
            }),
            X(1, "Vídeo sem áudio"),
            M();
        }
        2 & n && ye("disabled", be(3).isDownloading);
      }
      function m$(n, e) {
        if (
          (1 & n &&
            (A(0, "div", 28),
            A(1, "div", 17),
            kn(2, "img", 18),
            A(3, "label"),
            A(4, "strong"),
            X(5, "Título:"),
            M(),
            X(6),
            M(),
            A(7, "label"),
            A(8, "strong"),
            X(9, "Duração:"),
            M(),
            X(10),
            M(),
            A(11, "label"),
            A(12, "strong"),
            X(13, "Visualizações:"),
            M(),
            X(14),
            M(),
            A(15, "label"),
            A(16, "strong"),
            X(17, "Autor:"),
            M(),
            X(18),
            M(),
            M(),
            A(19, "div", 19),
            A(20, "div", 20),
            A(21, "label", 21),
            A(22, "strong"),
            X(23, ""),
            M(),
            M(),
            Ot(24, h$, 2, 1, "button", 22),
            Ot(25, p$, 2, 1, "button", 22),
            Ot(26, g$, 2, 1, "button", 22),
            M(),
            M(),
            M()),
          2 & n)
        ) {
          const t = e.$implicit,
            r = be(2);
          ue(2),
            ye("src", r.getThumbnail(t), ho),
            ue(4),
            gn(" ", t.title, ""),
            ue(4),
            gn(" ", t.duration, ""),
            ue(4),
            gn(" ", t.viewCount, ""),
            ue(4),
            gn(" ", t.author, ""),
            ue(6),
            ye("ngIf", r.hasFormat(t, "audio")),
            ue(1),
            ye("ngIf", r.hasFormat(t, "audio/video")),
            ue(1),
            ye("ngIf", r.hasFormat(t, "video"));
        }
      }
      function y$(n, e) {
        if (
          (1 & n && (A(0, "div", 26), Ot(1, m$, 27, 8, "div", 27), M()), 2 & n)
        ) {
          const t = be();
          ue(1), ye("ngForOf", t.videoInfoList);
        }
      }
      let _$ = (() => {
          class n {
            constructor(t, r, i) {
              (this.downloadService = t),
                (this.fileQueueService = r),
                (this.searchService = i),
                (this.videoInfo = void 0),
                (this.videoInfoList = void 0),
                (this.isDownloading = !1),
                (this.isSearching = !1),
                (this.downloadUrl = ""),
                (this.input = new Ge("urlInput"));
            }
            ngOnInit() {
              (this.innerWidth = window.innerWidth),
                (this.innerHeight = window.innerHeight);
            }
            directDownloadGateway(t) {
              this.isDownloading = !0;
              let r = this.videoInfo.title;
              this.videoInfo.streamable
                ? this.downloadFromStream(t, r)
                : this.downloadFromDisk(t, r);
            }
            downloadGateway(t, r) {
              (this.isDownloading = !0),
                (this.videoInfo = t),
                (this.downloadUrl = t.videoId);
              let i = this.videoInfo.title;
              this.videoInfo.streamable
                ? this.downloadFromStream(r, i)
                : this.downloadFromDisk(r, i);
            }
            downloadFromDisk(t, r) {
              let i = a$();
              this.downloadService
                .downloadFromDisk(this.downloadUrl, t, i)
                .subscribe(
                  (s) => {
                    (this.isDownloading = !1),
                      this.download(s, r),
                      this.fileQueueService.removeDownloadedFile(i).subscribe();
                  },
                  (s) => {
                    (this.isDownloading = !1),
                      this.fileQueueService.removeDownloadedFile(i).subscribe(),
                      window.alert(
                        "Ocorreu um erro ao carregar este v\xeddeo, por favor verifique se o link inserido est\xe1 correto"
                      );
                  }
                );
            }
            downloadFromStream(t, r) {
              this.downloadService
                .downloadFromStream(this.downloadUrl, t)
                .subscribe(
                  (i) => {
                    (this.isDownloading = !1), this.download(i, (r += ".m4a"));
                  },
                  (i) => {
                    window.alert(
                      "Ocorreu um erro ao carregar este v\xeddeo, por favor verifique se o link inserido est\xe1 correto"
                    ),
                      (this.isDownloading = !1);
                  }
                );
            }
            download(t, r) {
              let i = t.type,
                s = [];
              s.push(t);
              let o = document.createElement("a");
              (o.href = window.URL.createObjectURL(new Blob(s, { type: i }))),
                o.setAttribute("download", r),
                document.body.appendChild(o),
                o.click();
            }
            searchVideo(t) {
              (this.videoInfo = void 0),
                (this.videoInfoList = void 0),
                this.isSearching ||
                  ((this.downloadUrl = t),
                  (this.isSearching = !0),
                  this.downloadService.getVideoInfo(t).subscribe(
                    (r) => {
                      (this.input.nativeElement.value = ""),
                        (this.videoInfo = r),
                        (this.isSearching = !1);
                    },
                    (r) => {
                      (this.isSearching = !1),
                        404 == r.status
                          ? this.searchVideoList(t)
                          : window.alert(
                              "Ocorreu um erro interno no servidor, tente novamente mais tarde"
                            );
                    }
                  ));
            }
            searchVideoList(t) {
              this.isSearching ||
                ((this.isSearching = !0),
                this.searchService.getVideoInfoList(t).subscribe(
                  (r) => {
                    (this.videoInfoList = r),
                      0 == this.videoInfoList.length &&
                        window.alert(
                          "A pesquisa n\xe3o encontrou nenhum resultado"
                        ),
                      (this.isSearching = !1);
                  },
                  (r) => {
                    window.alert(
                      "Ocorreu um erro interno no servidor, tente novamente mais tarde"
                    ),
                      (this.isSearching = !1);
                  }
                ));
            }
            getThumbnail(t) {
              return window.innerWidth < 600
                ? t.thumbnails[0]
                : window.innerWidth < 1480
                ? t.thumbnails[1]
                : t.thumbnails[2];
            }
            goToCoffee() {}
            goToPatreon() {}
            goToGithub() {}
            getInfoIconStyle() {
              return this.isDownloading
                ? "get-info-icon-downloading"
                : "get-info-icon";
            }
            hasFormat(t, r) {
              return null != t && t.formatTypes.includes(r);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(v(CS), v(vS), v(eD));
            }),
            (n.ɵcmp = Si({
              type: n,
              selectors: [["download-page"]],
              viewQuery: function (t, r) {
                if ((1 & t && Yv(l$, 5), 2 & t)) {
                  let i;
                  xl(
                    (i = (function (n, e) {
                      return n[19].queries[e].queryList;
                    })(C(), Qg()))
                  ) && (r.input = i.first);
                }
              },
              decls: 23,
              vars: 5,
              consts: [
                [1, "main-body"],
                [1, "def-text"],
                [1, "search-field"],
                [
                  "type",
                  "text",
                  "placeholder",
                  "Insira a URL ou pesquise um v\xeddeo...",
                  1,
                  "url-input",
                ],
                ["urlInput", ""],
                [
                  "src",
                  "https://cdn-icons-png.flaticon.com/128/25/25313.png",
                  3,
                  "ngClass",
                  "click",
                ],
                [3, "hidden"],
                [1, "download-body-1"],
                ["class", "direct-link-body", 4, "ngIf"],
                ["class", "search-string-body", 4, "ngIf"],
                [1, "sticky-icons"],
                [1, ""],
                [1, ""],
                ["src", ""],
                ["src", "", 1, "", 3, "click"],
                ["src", "", 1, "coffee-icon", 3, "click"],
                [1, "direct-link-body"],
                [1, "video-info-detail"],
                [1, "thumbnail-img", 3, "src"],
                [1, "right-box-div"],
                [1, "video-download-buttons-div"],
                [1, ""],
                [
                  "class",
                  "video-download-buttons-prop",
                  3,
                  "disabled",
                  "click",
                  4,
                  "ngIf",
                ],
                [1, ""],
                [1, ""],
                [1, "video-download-buttons-prop", 3, "disabled", "click"],
                [1, "search-string-body"],
                ["class", "direct-link-body-list", 4, "ngFor", "ngForOf"],
                [1, "direct-link-body-list"],
              ],
              template: function (t, r) {
                if (1 & t) {
                  const i = nr();
                  A(0, "body", 0),
                    A(1, "label", 1),
                    A(2, "strong"),
                    X(3, ""),
                    M(),
                    M(),
                    A(4, "div", 2),
                    kn(5, "input", 3, 4),
                    A(7, "img", 5),
                    Ee("click", function () {
                      An(i);
                      const o = (function (n) {
                        return Pi(V.lFrame.contextLView, 20 + n);
                      })(6);
                      return r.searchVideo(o.value);
                    }),
                    M(),
                    M(),
                    A(8, "span", 6),
                    X(9, "Baixando..."),
                    M(),
                    A(10, "span", 6),
                    X(11, "Buscando..."),
                    M(),
                    A(12, "div", 7),
                    Ot(13, f$, 37, 8, "div", 8),
                    Ot(14, y$, 2, 1, "div", 9),
                    M(),
                    M(),
                    A(15, "div", 10),
                    A(16, "div", 11),
                    A(17, "span", 12),
                    X(18, ""),
                    M(),
                    kn(19, "img", 13),
                    M(),
                    A(20, "img", 14),
                    Ee("click", function () {
                      return r.goToPatreon();
                    }),
                    M(),
                    A(21, "img", 15),
                    Ee("click", function () {
                      return r.goToCoffee();
                    }),
                    M(),
                    M(),
                    kn(22, "ng-progress");
                }
                2 & t &&
                  (ue(7),
                  ye("ngClass", r.getInfoIconStyle()),
                  ue(1),
                  ye("hidden", !r.isDownloading),
                  ue(2),
                  ye("hidden", !r.isSearching),
                  ue(3),
                  ye("ngIf", null != r.videoInfo && null == r.videoInfoList),
                  ue(1),
                  ye("ngIf", null != r.videoInfoList));
              },
              directives: [Cb, _h, AB, vb],
              //superstyles
              styles: [
                '.main-body[_ngcontent-%COMP%]{margin-top:3%;display:flex;flex-direction:column;align-items:center;justify-content:center;grid-gap:15px;gap:15px}.download-body-1[_ngcontent-%COMP%]{width:60%}.direct-link-body[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:flex-start;grid-gap:24px;gap:24px}.direct-link-body-list[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;grid-gap:10px}.search-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;grid-gap:20px;gap:20px}.search-string-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;grid-gap:40px;gap:40px}.sticky-icons[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100px;position:fixed;bottom:3%;right:1%;grid-gap:10px;gap:10px}input[_ngcontent-%COMP%]::-webkit-input-placeholder{opacity:.99;}.def-text[_ngcontent-%COMP%]{font-size:48px}.url-input[_ngcontent-%COMP%]{border-radius:.4rem;height:30px;width:600px;border:none;text-align:center;font-size:14px;color:#5f9ea0}.download-options[_ngcontent-%COMP%]{display:flex;grid-gap:25px;gap:25px}.right-box-div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch}.video-download-buttons-div[_ngcontent-%COMP%], .patreon-div[_ngcontent-%COMP%]{background-color:black;box-shadow: 0 0 8px #ff9900;display:flex;flex-direction:column;grid-gap:20px;gap:20px;margin-top:1%;border-style:solid;border-radius:.5rem;padding:8px;border-color:#6494ed21;height:100%}.patreon-div-button[_ngcontent-%COMP%]{background-image:linear-gradient(to right,#f86363 0%,#c95c74 51%,#c156ca 100%)}.video-download-buttons-prop[_ngcontent-%COMP%]{background-image:linear-gradient(to right,#cf7709 0%,#af7218 51%,#b1780c 100%)}.video-download-buttons-prop[_ngcontent-%COMP%], .patreon-div-button[_ngcontent-%COMP%]{padding:12px 19px;text-align:center;transition:.5s;background-size:200% auto;color:black;border:none;border-radius:10px;display:block;font-family:"Fjalla One",sans-serif;font-size:21px;font-weight:600}.video-download-buttons-prop[_ngcontent-%COMP%]:hover, .patreon-div-button[_ngcontent-%COMP%]:hover{background-position:right center;color:#fff;text-decoration:none;cursor:pointer}.video-download-buttons-prop[_ngcontent-%COMP%]:disabled, .patreon-div-button[_ngcontent-%COMP%]:disabled{color:#ff009d42;background-image:linear-gradient(to right,#49ca8e2a 0%,#96ded033 51%,#50c9c32c 100%)}.video-info-detail[_ngcontent-%COMP%]{box-shadow: 0 0 8px #ff9900;background-color:black;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;grid-gap:15px;grid-gap:7px;gap:7px;font-size:16px;align-content:center;width:68%;margin-top:1%;margin-bottom:1%;border-style:solid;border-radius:.5rem;padding:8px;border-color:#6494ed21}.thumbnail-img[_ngcontent-%COMP%]{margin-bottom: 40px;align-self:center;border-radius:10px;box-shadow:0 0 8px #ff9900}.patreon-icon[_ngcontent-%COMP%], .github-icon[_ngcontent-%COMP%], .coffee-icon[_ngcontent-%COMP%]{cursor:pointer}.get-info-icon[_ngcontent-%COMP%]{width:5%;cursor:pointer}.pix-icon-span[_ngcontent-%COMP%]{align-self:center}.pix-icon-div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.get-info-icon[_ngcontent-%COMP%]:hover{opacity:.7;box-shadow:#00cdac}.get-info-icon-downloading[_ngcontent-%COMP%]{opacity:.5}@media (max-width: 550px){.video-download-buttons-div[_ngcontent-%COMP%], .patreon-div[_ngcontent-%COMP%]{grid-gap:15px;gap:15px;width:90%}.video-download-buttons-prop[_ngcontent-%COMP%], .patreon-div-button[_ngcontent-%COMP%]{padding:10px 19px;font-size:18px}.download-body-1[_ngcontent-%COMP%]{width:90%}.direct-link-body[_ngcontent-%COMP%], .direct-link-body-list[_ngcontent-%COMP%]{grid-gap:8px;gap:8px;flex-direction:column;align-items:stretch}.video-info-detail[_ngcontent-%COMP%]{font-size:16px;width:90%}.url-input[_ngcontent-%COMP%]{width:318px}.def-text[_ngcontent-%COMP%]{font-size:29px}.main-body[_ngcontent-%COMP%]{margin-top:8%}.sticky-icons[_ngcontent-%COMP%]{display:none}.url-input[_ngcontent-%COMP%]{font-size:13px}}',
              ],
            })),
            n
          );
        })(),
        C$ = (() => {
          class n {
            constructor() {
              this.title = "md-view";
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = Si({
              type: n,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (t, r) {
                1 & t && kn(0, "download-page");
              },
              directives: [_$],
              styles: [""],
            })),
            n
          );
        })(),
        v$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = Ze({ type: n, bootstrap: [C$] })),
            (n.ɵinj = Be({
              providers: [CS, vS, eD],
              imports: [
                [
                  xh,
                  ZU,
                  w2,
                  S2,
                  IL,
                  Yj,
                  MB.withConfig({ color: "cornflowerblue", thick: !0 }),
                  PB,
                ],
              ],
            })),
            n
          );
        })();
      (function () {
        if (SE)
          throw new Error("Cannot enable prod mode after platform setup.");
        wE = !1;
      })(),
        sL()
          .bootstrapModule(v$)
          .catch((n) => console.error(n));
    },
  },
  (js) => {
    js((js.s = 481));
  },
]);
