(window.webpackJsonp = window.webpackJsonp || []).push([[3], {
  1215: function (t, e, r) {
    "use strict";
    r(873)
  }, 1216: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, ".report-info{text-align:center}.report-table_info{margin-left:10%;width:80%;text-align:center}", ""]), t.exports = e
  }, 1226: function (t, e, r) {
    "use strict";
    r.r(e);
    r(57);
    var o = r(11), header = r(715), n = r(742), c = r(725), l = {
      components: {Header: header.default, Filecard: n.default}, mounted: function () {
        var t = this;
        return Object(o.a)(regeneratorRuntime.mark((function e() {
          var r, o, i, n, l;
          return regeneratorRuntime.wrap((function (e) {
            for (; ;) switch (e.prev = e.next) {
              case 0:
                return r = t.$route.params.id, t.reportIndex = r.slice(-1), t.shareUserAddress = r.slice(0, 42), e.next = 5, t.$web3.eth.getAccounts();
              case 5:
                return o = e.sent, t.userAddress = o[0], e.next = 9, c.a.collection("reports").where("shareUser", "==", t.shareUserAddress).get().then((function (e) {
                  e.forEach((function (e) {
                    t.reportIndex == e.data().index && (t.reports.push(e.data()), t.report_doc = e.id, t.report = t.reports[0])
                  }))
                }));
              case 9:
                return e.next = 11, c.a.collection("reports").get().then((function (e) {
                  e.forEach((function (e) {
                    t.allReports.push(e.data())
                  }))
                }));
              case 11:
                return e.next = 13, c.a.collection("users").doc(t.userAddress).collection("buying_list").get().then((function (e) {
                  e.forEach((function (e) {
                    t.buying.push(e.data())
                  }))
                }));
              case 13:
                i = 0;
              case 14:
                if (!(i < t.allReports.length)) {
                  e.next = 38;
                  break
                }
                if (!(t.buying.length > i)) {
                  e.next = 25;
                  break
                }
                if (console.log(t.report_doc), console.log(t.buying[i].report_doc), t.report_doc != t.buying[i].report_doc) {
                  e.next = 25;
                  break
                }
                return t.canWatch = !0, e.next = 22, t.$reportInfoContract.methods.getReport(t.reportIndex, t.shareUserAddress).call();
              case 22:
                return n = e.sent, t.reportHash = n, e.abrupt("break", 38);
              case 25:
                if (t.shareUserAddress != t.userAddress) {
                  e.next = 35;
                  break
                }
                return t.canWatch = !0, console.log(t.reportIndex), e.next = 30, t.$reportInfoContract.methods.getOwnerReport(t.reportIndex).call();
              case 30:
                return l = e.sent, console.log(l), t.reportHash = l, console.log("fefefe", l), e.abrupt("break", 38);
              case 35:
                i++, e.next = 14;
                break;
              case 38:
              case"end":
                return e.stop()
            }
          }), e)
        })))()
      }, data: function () {
        return {
          canWatch: !1,
          reportIndex: null,
          shareUserAddress: null,
          userAddress: null,
          report: null,
          reports: [],
          reportHash: null,
          amount: null,
          sendValue: null,
          number: null,
          report_doc: null,
          buying: [],
          allReports: []
        }
      }, methods: {
        formatter: function (t, e) {
          return t.address
        }, getReport: function () {
          var t = this;
          return Object(o.a)(regeneratorRuntime.mark((function e() {
            var r, o, n;
            return regeneratorRuntime.wrap((function (e) {
              for (; ;) switch (e.prev = e.next) {
                case 0:
                  if (t.shareUserAddress == t.userAddress) {
                    e.next = 22;
                    break
                  }
                  return e.next = 3, t.$web3.utils.toBN(18);
                case 3:
                  return r = e.sent, t.amount = 1e12, e.next = 7, t.amount.valueOf(t.$web3.utils.toBN(10).pow(r));
                case 7:
                  return t.sendValue = e.sent, e.next = 10, t.$reportTokenContract.methods.transfer(t.shareUserAddress, t.sendValue).send({from: t.userAddress});
                case 10:
                  return o = e.sent, t.number = o, e.next = 14, c.a.collection("users").doc(t.userAddress).collection("buying_list").add({
                    report_doc: t.report_doc,
                    buyAt: new Date
                  });
                case 14:
                  return e.next = 16, c.a.collection("reports").doc(t.report_doc).update({
                    downloads: c.b.firestore.FieldValue.increment(1),
                    currentDownloads: c.b.firestore.FieldValue.increment(1)
                  });
                case 16:
                  return e.next = 18, t.$reportInfoContract.methods.getReport(t.reportIndex, t.shareUserAddress).call();
                case 18:
                  n = e.sent, t.reportHash = n, e.next = 23;
                  break;
                case 22:
                  console.log("error!");
                case 23:
                case"end":
                  return e.stop()
              }
            }), e)
          })))()
        }
      }
    }, d = (r(1215), r(56)), component = Object(d.a)(l, (function () {
      var t = this, e = t.$createElement, r = t._self._c || e;
      return r("div", {staticClass: "app-layout"}, [r("Header"), t._v(" "), r("div", {staticClass: "main-contents"}, [r("div", {staticClass: "main-content"}, [r("h1", [t._v("レポート情報")]), t._v(" "), r("div", {staticClass: "report-info"}, [r("Filecard", {attrs: {report: t.report}}), t._v(" "), r("div", {staticClass: "report-table_info"}), t._v(" "), null != t.report ? r("div", {staticClass: "report-info_detail"}, [r("h3", [t._v("レポートの詳細")]), t._v(" "), r("h5", [t._v(t._s(t.report.university))]), t._v(" "), r("p", {staticClass: "report-exp"}, [t._v(t._s(t.report.detail))])]) : t._e(), t._v(" "), t.canWatch ? t._e() : r("el-button", {on: {click: t.getReport}}, [t._v("レポートを見る")]), t._v(" "), null != t.reportHash ? r("div", {}, [r("iframe", {
        staticStyle: {height: "1200px"},
        attrs: {src: "https://ipfs.io/ipfs/" + t.reportHash, alt: "共有したレポートの画像", width: "75%"}
      })]) : t._e()], 1)])]), t._v(" "), r("Upload"), t._v(" "), r("Footer")], 1)
    }), [], !1, null, null, null);
    e.default = component.exports;
    installComponents(component, {
      Header: r(715).default,
      Filecard: r(742).default,
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
    var o = r(3), n = r(209), c = r.n(n), l = (r(349), r(724)), d = r.n(l), f = r(105);
    r.n(f).a.use(d.a), o.default.use(c.a);
    var x = {
      data: function () {
        return {}
      }
    }, v = (r(720), r(56)), component = Object(v.a)(x, (function () {
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
    var o = r(732), n = r.n(o);
    r.d(e, "b", (function () {
      return n.a
    }));
    r(750);
    if (!n.a.apps.length) {
      n.a.initializeApp({
        apiKey: "AIzaSyBotcmeQoR09-ZfunIrT7BojpQF9VxA4IQ",
        authDomain: "firestorepractice-c365c.firebaseapp.com",
        databaseURL: "https://firestorepractice-c365c.firebaseio.com",
        projectId: '"firestorepractice-c365c";',
        storageBucket: "firestorepractice-c365c.appspot.com",
        messagingSenderId: "728875149926"
      })
    }
    var c = n.a.firestore()
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
    var o = {
      data: function () {
        return {}
      }
    }, n = (r(728), r(56)), component = Object(n.a)(o, (function () {
      var t = this, e = t.$createElement, o = t._self._c || e;
      return o("div", {staticClass: "footer-main_content"}, [o("el-divider"), t._v(" "), o("div", {staticClass: "footer-content"}, [o("div", {staticClass: "footer-content_title"}, [o("nuxt-link", {attrs: {to: "/"}}, [o("img", {
        staticClass: "reportoken-logo_footer",
        attrs: {src: r(716)}
      })]), t._v(" "), t._m(0)], 1), t._v(" "), o("div", {staticClass: "footer-content_about"}, [o("h5", [t._v("About")]), t._v(" "), o("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [o("p", [t._v("レポートークンについて")])]), t._v(" "), o("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [o("p", [t._v("使い方")])])], 1), t._v(" "), o("div", {staticClass: "footer-content_legal"}, [o("h5", [t._v("Legal")]), t._v(" "), o("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [o("p", [t._v("利用規約")])]), t._v(" "), o("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [o("p", [t._v("プライバシーポリシー")])])], 1), t._v(" "), o("div", {staticClass: "footer-content_links"}, [o("h5", [t._v("Contact")]), t._v(" "), o("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [o("p", [t._v("よくある質問")])])], 1)]), t._v(" "), o("el-divider", {staticClass: "divider"}), t._v(" "), t._m(1)], 1)
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
    var o = r(56), component = Object(o.a)({}, (function () {
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
  }, 742: function (t, e, r) {
    "use strict";
    r.r(e);
    r(725);
    var o = {
      props: ["report"], data: function () {
        return {value: 3.7, reportIndex: 0, shareUserAddress: "", reports: [], Report: null}
      }
    }, n = (r(744), r(56)), component = Object(n.a)(o, (function () {
      var t = this, e = t.$createElement, o = t._self._c || e;
      return null != t.report ? o("div", {staticClass: "filecard-content"}, [o("h3", {staticClass: "report-subject"}, [t._v("科目:" + t._s(t.report.subject))]), t._v(" "), o("div", {staticClass: "file-card"}, [o("div", {staticClass: "report-details"}, [o("h5", {staticClass: "report-title"}, [t._v(t._s(t.report.detail))]), t._v(" "), o("img", {
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
  }, 873: function (t, e, r) {
    var content = r(1216);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("26105a6f", content, !0, {sourceMap: !1})
  }
}]);
