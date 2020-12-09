(window.webpackJsonp = window.webpackJsonp || []).push([[6], {
  1222: function (t, e, r) {
    "use strict";
    r.r(e);
    r(210), r(79), r(80), r(31), r(143);
    var n = r(140), o = (r(57), r(11)), header = r(715), c = r(725);

    function l(object, t) {
      var e = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(object);
        t && (r = r.filter((function (t) {
          return Object.getOwnPropertyDescriptor(object, t).enumerable
        }))), e.push.apply(e, r)
      }
      return e
    }

    function d(t) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? l(Object(source), !0).forEach((function (e) {
          Object(n.a)(t, e, source[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source)) : l(Object(source)).forEach((function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e))
        }))
      }
      return t
    }

    var f = {
      components: {Header: header.default}, data: function () {
        return {
          number: 0,
          shareReports: [],
          userAddress: null,
          dialog: !1,
          loading: !1,
          formLabelWidth: "80px",
          timer: null,
          inputNumber: 0,
          toAddress: null,
          amount: 0,
          purchaseValue: 0,
          sendValue: 0,
          userAmount: 0,
          form: {amount: null},
          purchasedReport: [],
          buying: [],
          count: 0,
          ownAmount: 0,
          winners: [],
          isWinner: !1,
          winner_doc: null
        }
      }, computed: {}, methods: {
        reward: function () {
          var t = this;
          return Object(o.a)(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function (e) {
              for (; ;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, t.$reportTokenContract.methods.withdraw(t.ownAddress).send({from: t.ownAddress});
                case 2:
                  return e.sent, e.next = 5, c.a.collection("winners").doc(t.winner_doc).update({received: !0});
                case 5:
                case"end":
                  return e.stop()
              }
            }), e)
          })))()
        }, handleClose: function (t) {
          var e = this;
          return Object(o.a)(regeneratorRuntime.mark((function r() {
            return regeneratorRuntime.wrap((function (r) {
              for (; ;) switch (r.prev = r.next) {
                case 0:
                  if (!e.loading) {
                    r.next = 2;
                    break
                  }
                  return r.abrupt("return");
                case 2:
                  return r.next = 4, e.$confirm(e.form.amount + "RPTを本当に購入しますか？").then((function (r) {
                    e.loading = !0, e.timer = setTimeout((function () {
                      t(), setTimeout((function () {
                        e.loading = !1
                      }), 400)
                    }), 2e3)
                  }));
                case 4:
                  return r.next = 6, e.purchaseToken().catch((function (t) {
                  }));
                case 6:
                case"end":
                  return r.stop()
              }
            }), r)
          })))()
        }, cancelForm: function () {
          var t = this;
          return Object(o.a)(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function (e) {
              for (; ;) switch (e.prev = e.next) {
                case 0:
                  t.loading = !1, t.dialog = !1, clearTimeout(t.timer);
                case 3:
                case"end":
                  return e.stop()
              }
            }), e)
          })))()
        }, purchaseToken: function () {
          var t = this;
          return Object(o.a)(regeneratorRuntime.mark((function e() {
            var r, n;
            return regeneratorRuntime.wrap((function (e) {
              for (; ;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, t.$web3.utils.toBN(18);
                case 2:
                  return r = e.sent, e.next = 5, t.$web3.utils.toBN(t.form.amount);
                case 5:
                  return t.amount = e.sent, e.next = 8, t.amount.valueOf(t.$web3.utils.toBN(10).pow(r));
                case 8:
                  return t.sendValue = e.sent, e.next = 11, t.$reportTokenContract.methods.purchaseToken(t.userAddress, t.sendValue).send({
                    from: t.userAddress,
                    value: t.sendValue
                  });
                case 11:
                  return n = e.sent, t.number = n, e.next = 15, t.$reportTokenContract.methods.balanceOf(t.userAddress).call();
                case 15:
                  t.ownAmount = e.sent;
                case 16:
                case"end":
                  return e.stop()
              }
            }), e)
          })))()
        }
      }, mounted: function () {
        var t = this;
        return Object(o.a)(regeneratorRuntime.mark((function e() {
          var r;
          return regeneratorRuntime.wrap((function (e) {
            for (; ;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, t.$web3.eth.getAccounts();
              case 2:
                return r = e.sent, t.userAddress = r[0], e.next = 6, t.$reportTokenContract.methods.balanceOf(t.userAddress).call();
              case 6:
                if (t.ownAmount = e.sent, null == t.userAddress) {
                  e.next = 13;
                  break
                }
                return c.a.collection("users").doc(t.userAddress).collection("buying_list").get().then((function (e) {
                  e.forEach((function (e) {
                    t.buying.push(e.data())
                  }))
                })), e.next = 11, c.a.collection("winners").get().then((function (e) {
                  e.forEach((function (e) {
                    e.data().winner_address == t.userAddress && 0 == e.data().received && (t.isWinner = !0), t.winner_doc = e.id
                  }))
                }));
              case 11:
                return e.next = 13, c.a.collection("reports").get().then((function (e) {
                  e.forEach((function (e) {
                    if (e.data().shareUser == t.userAddress && t.shareReports.push(d({id: e.id}, e.data())), 0 != t.buying.length && null != t.buying) for (var r = 0, i = 0; i < t.buying.length; i++) t.buying[r].report_doc == e.id && t.purchasedReport.push(e.data()), r++
                  }))
                }));
              case 13:
              case"end":
                return e.stop()
            }
          }), e)
        })))()
      }
    }, v = (r(879), r(56)), component = Object(v.a)(f, (function () {
      var t = this, e = t.$createElement, r = t._self._c || e;
      return r("div", {staticClass: "app-layout"}, [r("Header"), t._v(" "), 1 == t.isWinner ? r("div", {staticClass: "reward-content"}, [r("h3", [t._v("ご褒美を受け取ってください")]), t._v(" "), r("el-button", {
        staticStyle: {"text-align": "center"},
        on: {click: t.reward}
      }, [t._v("テスト用のボタン")])], 1) : t._e(), t._v(" "), r("div", {staticClass: "main-contents"}, [null == t.userAddress ? r("div", {staticClass: "main-content__notuser"}, [r("el-alert", {
        attrs: {
          title: "エラー",
          type: "error",
          description: "Metamaskと連携ができないためマイページが開けません。",
          "show-icon": "",
          closable: !1
        }
      })], 1) : t._e(), t._v(" "), null != t.userAddress ? r("div", {staticClass: "main-content"}, [r("div", {staticClass: "about-account"}, [r("h4", [t._v("アカウント")]), t._v(" "), r("el-avatar", {attrs: {src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"}}), t._v(" "), r("p", [t._v(t._s(t.userAddress))])], 1), t._v(" "), r("h3", [r("p", [t._v("ownAmount: " + t._s(t.ownAmount) + " RPT")])]), t._v(" "), r("div", {staticClass: "wallet_btn"}, [r("el-button", {
        attrs: {type: "primary"},
        on: {
          click: function (e) {
            t.dialog = !0
          }
        }
      }, [t._v("購入する")]), t._v(" "), r("el-drawer", {
        ref: "drawer",
        attrs: {
          title: "トークンの購入量を指定してください",
          "before-close": t.handleClose,
          visible: t.dialog,
          direction: "ltr",
          "custom-class": "demo-drawer"
        },
        on: {
          "update:visible": function (e) {
            t.dialog = e
          }
        }
      }, [r("div", {staticClass: "demo-drawer__content"}, [r("el-form", {attrs: {model: t.form}}, [r("el-form-item", {
        attrs: {
          label: "購入量",
          "label-width": t.formLabelWidth
        }
      }, [r("el-input", {
        attrs: {autocomplete: "off"}, model: {
          value: t.form.amount, callback: function (e) {
            t.$set(t.form, "amount", e)
          }, expression: "form.amount"
        }
      })], 1)], 1), t._v(" "), r("div", {staticClass: "demo-drawer__footer"}, [r("el-button", {on: {click: t.cancelForm}}, [t._v("キャンセル")]), t._v(" "), r("el-button", {
        attrs: {
          type: "primary",
          loading: t.loading
        }, on: {
          click: function (e) {
            return t.$refs.drawer.closeDrawer()
          }
        }
      }, [t._v("\n                " + t._s(t.loading ? "購入しています ..." : "購入") + "\n              ")])], 1)], 1)])], 1), t._v(" "), r("div", {staticClass: "purchased-report"}, [r("h3", [t._v("購入したレポート")]), t._v(" "), r("Filecards", {attrs: {reports: t.purchasedReport}})], 1), t._v(" "), r("div", {staticClass: "wallet-detail_content"})]) : t._e(), t._v(" "), r("div", {staticClass: "side-content"}, [r("Folder", {attrs: {shareReports: t.shareReports}})], 1)]), t._v(" "), r("Upload"), t._v(" "), r("Footer")], 1)
    }), [], !1, null, null, null);
    e.default = component.exports;
    installComponents(component, {
      Header: r(715).default,
      Filecards: r(765).default,
      Folder: r(764).default,
      Upload: r(739).default,
      Footer: r(731).default
    })
  }, 713: function (t, e, r) {
    var content = r(721);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("141f8560", content, !0, {sourceMap: !1})
  }, 715: function (t, e, r) {
    "use strict";
    r.r(e);
    var n = r(3), o = r(209), c = r.n(o), l = (r(349), r(724)), d = r.n(l), f = r(105);
    r.n(f).a.use(d.a), n.default.use(c.a);
    var v = {
      data: function () {
        return {}
      }
    }, x = (r(720), r(56)), component = Object(x.a)(v, (function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "header-content"}, [e("nuxt-link", {attrs: {to: "/"}}, [e("img", {
        staticClass: "reportoken-logo_header",
        attrs: {src: r(716)}
      })]), this._v(" "), e("div", {staticClass: "page-link"}, [e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/serchPage"}
      }, [e("i", {staticClass: "el-icon-search"})]), this._v(" "), e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/myPage"}
      }, [e("i", {staticClass: "el-icon-user"})])], 1)], 1)
    }), [], !1, null, null, null);
    e.default = component.exports
  }, 716: function (t, e, r) {
    t.exports = r.p + "img/reportoken-logo_header.274e63e.png"
  }, 719: function (t, e, r) {
    var content = r(729);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("96b7bbe8", content, !0, {sourceMap: !1})
  }, 720: function (t, e, r) {
    "use strict";
    r(713)
  }, 721: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, ".header-content{display:flex;width:100%;height:60px;background-color:#f4f4f4}.reportoken-logo_header{padding:5px 10px 10px;width:50px;height:50px;margin-left:50px}.page-link{position:absolute;right:30px;top:20px}.el-icon-message-solid{color:#fff}.link-detail,.link-detail_notification{text-decoration:none}.link-detail{color:#000;font-size:20px;padding:8px}", ""]), t.exports = e
  }, 722: function (t, e, r) {
    var content = r(737);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("470a9ade", content, !0, {sourceMap: !1})
  }, 725: function (t, e, r) {
    "use strict";
    r.d(e, "a", (function () {
      return c
    }));
    var n = r(732), o = r.n(n);
    r.d(e, "b", (function () {
      return o.a
    }));
    r(750);
    if (!o.a.apps.length) {
      o.a.initializeApp({
        apiKey: "AIzaSyBotcmeQoR09-ZfunIrT7BojpQF9VxA4IQ",
        authDomain: "firestorepractice-c365c.firebaseapp.com",
        databaseURL: "https://firestorepractice-c365c.firebaseio.com",
        projectId: '"firestorepractice-c365c";',
        storageBucket: "firestorepractice-c365c.appspot.com",
        messagingSenderId: "728875149926"
      })
    }
    var c = o.a.firestore()
  }, 727: function (t, e, r) {
    var content = r(745);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("22f38e0d", content, !0, {sourceMap: !1})
  }, 728: function (t, e, r) {
    "use strict";
    r(719)
  }, 729: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, ".footer-main_content[data-v-f2fcc6fe]{height:200px}.footer-content[data-v-f2fcc6fe]{display:flex;background-color:#f4f4f4;height:180px}h5[data-v-f2fcc6fe]{color:#93a5b1}p[data-v-f2fcc6fe]{color:#000;font-size:.9rem;padding-top:15px}.reportoken-logo_footer[data-v-f2fcc6fe]{padding:10px;width:50px;height:50px;margin-left:50px}.footer-link[data-v-f2fcc6fe]{text-decoration:none}.footer-link[data-v-f2fcc6fe]:hover{text-decoration:underline}.footer-content_title[data-v-f2fcc6fe]{position:relative;margin-right:auto}.footer-content_title p[data-v-f2fcc6fe]{color:#93a5b1;width:150px;position:absolute;left:50px;top:50px;padding-top:5px;font-size:.8rem}.footer-content_about[data-v-f2fcc6fe],.footer-content_legal[data-v-f2fcc6fe],.footer-content_links[data-v-f2fcc6fe]{margin:0 auto}@media screen and (max-width:750px){.footer-content_title[data-v-f2fcc6fe]{opacity:0;z-index:-10;position:absolute}}.divider[data-v-f2fcc6fe]{padding:0;margin:0}.copyright-text[data-v-f2fcc6fe]{text-align:center;padding-bottom:10px;color:#93a5b1}", ""]), t.exports = e
  }, 731: function (t, e, r) {
    "use strict";
    r.r(e);
    var n = {
      data: function () {
        return {}
      }
    }, o = (r(728), r(56)), component = Object(o.a)(n, (function () {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return n("div", {staticClass: "footer-main_content"}, [n("el-divider"), t._v(" "), n("div", {staticClass: "footer-content"}, [n("div", {staticClass: "footer-content_title"}, [n("nuxt-link", {attrs: {to: "/"}}, [n("img", {
        staticClass: "reportoken-logo_footer",
        attrs: {src: r(716)}
      })]), t._v(" "), t._m(0)], 1), t._v(" "), n("div", {staticClass: "footer-content_about"}, [n("h5", [t._v("About")]), t._v(" "), n("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [n("p", [t._v("レポートークンについて")])]), t._v(" "), n("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [n("p", [t._v("使い方")])])], 1), t._v(" "), n("div", {staticClass: "footer-content_legal"}, [n("h5", [t._v("Legal")]), t._v(" "), n("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [n("p", [t._v("利用規約")])]), t._v(" "), n("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [n("p", [t._v("プライバシーポリシー")])])], 1), t._v(" "), n("div", {staticClass: "footer-content_links"}, [n("h5", [t._v("Contact")]), t._v(" "), n("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [n("p", [t._v("よくある質問")])])], 1)]), t._v(" "), n("el-divider", {staticClass: "divider"}), t._v(" "), t._m(1)], 1)
    }), [function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("p", [this._v("全ての学生のための"), e("br"), this._v("レポート共有アプリ")])
    }, function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "copyright-text"}, [e("p", [this._v("© 2020 BitPickers.")])])
    }], !1, null, "f2fcc6fe", null);
    e.default = component.exports
  }, 736: function (t, e, r) {
    "use strict";
    r(722)
  }, 737: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, ".upload_content[data-v-63671d62]{position:fixed;z-index:2;bottom:60px;right:60px}.upload_btn[data-v-63671d62]{width:100px;height:100px;box-shadow:5px 5px 37px #b8b8b8,-5px -5px 37px #fff}", ""]), t.exports = e
  }, 739: function (t, e, r) {
    "use strict";
    r.r(e);
    r(736);
    var n = r(56), component = Object(n.a)({}, (function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "upload_content"}, [e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/uploadPage"}
      }, [e("el-button", {
        staticClass: "upload_btn",
        attrs: {type: "primary", circle: ""}
      }, [e("h3", [this._v("共有")]), this._v(" "), e("i", {staticClass: "el-icon-upload2"})])], 1)], 1)
    }), [], !1, null, "63671d62", null);
    e.default = component.exports
  }, 740: function (t, e, r) {
    var content = r(749);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("e4adb8e4", content, !0, {sourceMap: !1})
  }, 741: function (t, e, r) {
    var content = r(752);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("ee9b1f9e", content, !0, {sourceMap: !1})
  }, 742: function (t, e, r) {
    "use strict";
    r.r(e);
    r(725);
    var n = {
      props: ["report"], data: function () {
        return {value: 3.7, reportIndex: 0, shareUserAddress: "", reports: [], Report: null}
      }
    }, o = (r(744), r(56)), component = Object(o.a)(n, (function () {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return null != t.report ? n("div", {staticClass: "filecard-content"}, [n("h3", {staticClass: "report-subject"}, [t._v("科目:" + t._s(t.report.subject))]), t._v(" "), n("div", {staticClass: "file-card"}, [n("div", {staticClass: "report-details"}, [n("h5", {staticClass: "report-title"}, [t._v(t._s(t.report.detail))]), t._v(" "), n("img", {
        staticClass: "reportoken",
        staticStyle: {"text-align": "center"},
        attrs: {src: r(743)}
      })])])]) : t._e()
    }), [], !1, null, "057b405e", null);
    e.default = component.exports
  }, 743: function (t, e, r) {
    t.exports = r.p + "img/reportoken-logo.d95760d.png"
  }, 744: function (t, e, r) {
    "use strict";
    r(727)
  }, 745: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, '.filecard-content[data-v-057b405e]{display:inline-block}.file-card[data-v-057b405e]{display:block;background-color:#fff;position:relative;width:200px;height:282px;margin:15px;border-radius:5px;overflow:hidden;box-shadow:10 10px 10px #000}.file-card[data-v-057b405e]:before{border-top:30px solid #f4f4f4;border-left:30px solid transparent;box-shadow:0 2px 2px rgba(0,0,0,.3),-2px 2px 2px rgba(0,0,0,.2)}.file-card[data-v-057b405e]:after,.file-card[data-v-057b405e]:before{height:0;position:absolute;right:0;content:""}.file-card[data-v-057b405e]:after{display:block;border-bottom:30px solid hsla(0,0%,100%,.8);border-right:30px solid transparent;top:0}.report-details[data-v-057b405e]{position:relative;padding:10px;text-align:center}.report-semester[data-v-057b405e]{position:absolute;top:-9px;right:-5px}.report-grade[data-v-057b405e]{position:absolute;top:-9px;right:50px}.report-exp[data-v-057b405e]{margin:0;padding:0;height:75px;overflow:scroll}.report-title[data-v-057b405e]{display:flex;justify-content:center;align-items:center}.reportoken[data-v-057b405e]{margin:100px auto 0;width:80px;height:auto}.report-subject[data-v-057b405e]{color:rgba(0,0,0,.38)}.download[data-v-057b405e]{position:absolute;display:flex;right:-10px;bottom:75px}', ""]), t.exports = e
  }, 748: function (t, e, r) {
    "use strict";
    r(740)
  }, 749: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, "h4[data-v-24b72f1c]{text-align:center;padding:15px}.folder-content[data-v-24b72f1c]{overflow:scroll}.folder-repository[data-v-24b72f1c]{padding-left:20px;margin:10px}.side-contents[data-v-24b72f1c]{position:fixed;max-height:450px;min-width:200px;overflow:hidden;margin:30px 10px 10px;right:20px;padding-bottom:50px;border-radius:10px;background:#f4f4f4;box-shadow:8px 8px 25px #8b8b8b,-8px -8px 25px #fff}", ""]), t.exports = e
  }, 751: function (t, e, r) {
    "use strict";
    r(741)
  }, 752: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, ".filecards[data-v-f098eec8]{display:flex;justify-content:center;flex-wrap:wrap}", ""]), t.exports = e
  }, 764: function (t, e, r) {
    "use strict";
    r.r(e);
    var n = {
      props: ["shareReports"], data: function () {
        return {}
      }
    }, o = (r(748), r(56)), component = Object(o.a)(n, (function () {
      var t = this, e = t.$createElement, r = t._self._c || e;
      return r("div", {staticClass: "side-contents"}, [r("h4", [t._v("共有したレポート")]), t._v(" "), r("div", {staticClass: "folder-content"}, t._l(t.shareReports, (function (e) {
        return r("div", {key: e.index}, [r("nuxt-link", {
          attrs: {
            to: {
              name: "folders-id",
              params: {id: e.shareUser + e.index}
            }
          }
        }, [r("el-badge", {
          staticClass: "item folder-repository",
          attrs: {value: e.downloads, type: "primary"}
        }, [r("el-button", {attrs: {size: "small"}}, [t._v(t._s(e.subject))])], 1)], 1)], 1)
      })), 0)])
    }), [], !1, null, "24b72f1c", null);
    e.default = component.exports
  }, 765: function (t, e, r) {
    "use strict";
    r.r(e);
    var n = {
      props: ["reports"], data: function () {
        return {report: null}
      }
    }, o = (r(751), r(56)), component = Object(o.a)(n, (function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "filecards"}, this._l(this.reports, (function (t) {
        return e("div", {
          key: t.shareUser + t.index,
          staticClass: "filecard"
        }, [e("nuxt-link", {
          attrs: {
            to: {
              name: "folders-id",
              params: {id: t.shareUser + t.index}
            }
          }
        }, [e("Filecard", {attrs: {report: t}})], 1)], 1)
      })), 0)
    }), [], !1, null, "f098eec8", null);
    e.default = component.exports;
    installComponents(component, {Filecard: r(742).default})
  }, 804: function (t, e, r) {
    var content = r(880);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("6ac3a60a", content, !0, {sourceMap: !1})
  }, 879: function (t, e, r) {
    "use strict";
    r(804)
  }, 880: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, "body{margin:0}h1{padding-left:10px;text-align:center}p{margin-left:10px}.main-contents{min-height:700px}.side-content{width:300px;height:400px;z-index:1}.about-account,.wallet_btn{text-align:center}.wallet-detail_content{overflow:scroll}element.style{width:26%}.el-drawer.ltr,.el-drawer__container{top:50px;bottom:0;width:50%;height:57%}.el-input__inner{width:93%;margin-left:-30px}.reward-content{text-align:center}", ""]), t.exports = e
  }
}]);
