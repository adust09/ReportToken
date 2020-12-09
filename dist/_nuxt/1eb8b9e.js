(window.webpackJsonp = window.webpackJsonp || []).push([[5], {
  1217: function (t, e, o) {
    t.exports = o.p + "img/top-view.a1be6ec.png"
  }, 1218: function (t, e, o) {
    "use strict";
    o(874)
  }, 1219: function (t, e, o) {
    (e = o(103)(!1)).push([t.i, 'html{font-family:"Oswald",sans-serif}h3{text-align:center}.main-contents{display:flex}.main-content{width:100%;background-color:#f4f4f4}.top-view{display:flex}.view-text_en{font-weight:700;font-size:2.8rem}.top-view_text{margin:0 auto;width:500px;text-align:center;padding-top:100px;font-weight:300}@media screen and (max-width:850px){.top-view_media img{width:400px}.top-view_text{margin:0 auto;width:300px;padding-top:80px;font-weight:100}.view-text_en{font-weight:700;font-size:2rem}}@media screen and (max-width:750px){.top-view{display:block;text-align:center}.top-view_media img{width:350px}.top-view_text{width:500px;padding-top:0;margin:0 auto;font-weight:100}.view-text_en{font-weight:700;font-size:1.4rem}}.top-view_media{margin:0 auto}.buttons{display:flex;display:block;text-align:center}.button-content{text-decoration:none;color:#0e0e0e;font-weight:700}.reportoken-logo{width:500px;height:auto}.rank-content{height:auto;overflow-x:scroll;margin:0 40px 10px}', ""]), t.exports = e
  }, 1227: function (t, e, o) {
    "use strict";
    o.r(e);
    var r = [function () {
        var t = this.$createElement, e = this._self._c || t;
        return e("div", {staticClass: "top-view_media"}, [e("img", {
          staticClass: "reportoken-logo",
          attrs: {src: o(1217)}
        })])
      }], n = (o(57), o(11)), l = o(3), c = o(209), d = o.n(c), f = (o(349), o(724)), v = o.n(f), x = o(105), h = o.n(x),
      header = o(715), _ = o(725);
    h.a.use(v.a), l.default.use(d.a);
    var m = {
      components: {Header: header.default}, data: function () {
        return {
          reports: [],
          users: [],
          userAddress: null,
          reportsAbove: [],
          RP1Table: [],
          RP2Table: [],
          RPTable: [],
          downloadsArray: [],
          tokens: [],
          rp2Receiver: [],
          hitNumber: null,
          totalInssuance: 0
        }
      }, mounted: function () {
        var t = this;
        return Object(n.a)(regeneratorRuntime.mark((function e() {
          var o, r, i;
          return regeneratorRuntime.wrap((function (e) {
            for (; ;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, _.a.collection("users").get().then((function (e) {
                  e.forEach((function (e) {
                    t.users.push(e.data())
                  }))
                }));
              case 2:
                return e.next = 4, t.$web3.eth.getAccounts();
              case 4:
                for (o = e.sent, t.userAddress = o[0], r = 0, i = 0; i < t.users.length; i++) t.users[i].address == t.userAddress && r++;
                if (0 != r) {
                  e.next = 11;
                  break
                }
                return e.next = 11, _.a.collection("users").doc(t.userAddress).set({
                  address: t.userAddress,
                  purchased_token_amount: 0,
                  shares: 0,
                  tokens: 0
                });
              case 11:
                _.a.collection("reports").orderBy("downloads", "desc").get().then((function (e) {
                  e.forEach((function (e) {
                    t.reports.push(e.data()), t.report = t.reports[0]
                  }))
                }));
              case 12:
              case"end":
                return e.stop()
            }
          }), e)
        })))()
      }, methods: {
        connectMetamask: function () {
          this.userAddress = "仮アカウント"
        }
      }
    }, k = (o(1218), o(56)), component = Object(k.a)(m, (function () {
      var t = this, e = t.$createElement, o = t._self._c || e;
      return o("div", {staticClass: "app-layout"}, [o("Header"), t._v(" "), o("div", {staticClass: "main-contents"}, [o("div", {staticClass: "main-content"}, [o("div", {staticClass: "account-check"}, [null == t.userAddress ? o("el-alert", {
        attrs: {
          title: "アカウント接続失敗",
          type: "error",
          description: "「アプリを始める」をクリックしてMetamaskと接続してください",
          "show-icon": "",
          closable: !1
        }
      }) : t._e()], 1), t._v(" "), o("div", {staticClass: "top-view"}, [o("div", {staticClass: "top-view_text"}, [o("h1", {staticClass: "view-text_en"}, [t._v("Share your experience.")]), t._v(" "), o("p", [t._v("学生のための世界初分散型レポート共有アプリ")]), t._v(" "), o("p", [t._v("あなたの知識には価値がある。")]), t._v(" "), o("div", {staticClass: "buttons"}, [o("el-button", {
        staticStyle: {"font-weight": "bold"},
        attrs: {type: "primary"}
      }, [o("a", {
        staticStyle: {color: "white", "text-decoration": "none"},
        attrs: {
          href: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja",
          target: "_brank"
        }
      }, [t._v("アプリを始める")])]), t._v(" "), o("el-button", {
        attrs: {
          type: "info",
          plain: ""
        }
      }, [o("nuxt-link", {
        staticClass: "button-content",
        attrs: {to: "/tutorialPage"}
      }, [t._v("レポートークンについて")])], 1)], 1)]), t._v(" "), t._m(0)]), t._v(" "), null != t.userAddress ? o("div", {staticClass: "rank-content"}, [o("Filecards", {attrs: {reports: t.reports}})], 1) : t._e(), t._v(" "), null != t.userAddress ? o("Upload") : t._e(), t._v(" "), o("Footer")], 1)])], 1)
    }), r, !1, null, null, null);
    e.default = component.exports;
    installComponents(component, {
      Header: o(715).default,
      Filecards: o(765).default,
      Upload: o(739).default,
      Footer: o(731).default
    })
  }, 713: function (t, e, o) {
    var content = o(721);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, o(104).default)("141f8560", content, !0, {sourceMap: !1})
  }, 715: function (t, e, o) {
    "use strict";
    o.r(e);
    var r = o(3), n = o(209), l = o.n(n), c = (o(349), o(724)), d = o.n(c), f = o(105);
    o.n(f).a.use(d.a), r.default.use(l.a);
    var v = {
      data: function () {
        return {}
      }
    }, x = (o(720), o(56)), component = Object(x.a)(v, (function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "header-content"}, [e("nuxt-link", {attrs: {to: "/"}}, [e("img", {
        staticClass: "reportoken-logo_header",
        attrs: {src: o(716)}
      })]), this._v(" "), e("div", {staticClass: "page-link"}, [e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/serchPage"}
      }, [e("i", {staticClass: "el-icon-search"})]), this._v(" "), e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/myPage"}
      }, [e("i", {staticClass: "el-icon-user"})])], 1)], 1)
    }), [], !1, null, null, null);
    e.default = component.exports
  }, 716: function (t, e, o) {
    t.exports = o.p + "img/reportoken-logo_header.274e63e.png"
  }, 719: function (t, e, o) {
    var content = o(729);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, o(104).default)("96b7bbe8", content, !0, {sourceMap: !1})
  }, 720: function (t, e, o) {
    "use strict";
    o(713)
  }, 721: function (t, e, o) {
    (e = o(103)(!1)).push([t.i, ".header-content{display:flex;width:100%;height:60px;background-color:#f4f4f4}.reportoken-logo_header{padding:5px 10px 10px;width:50px;height:50px;margin-left:50px}.page-link{position:absolute;right:30px;top:20px}.el-icon-message-solid{color:#fff}.link-detail,.link-detail_notification{text-decoration:none}.link-detail{color:#000;font-size:20px;padding:8px}", ""]), t.exports = e
  }, 722: function (t, e, o) {
    var content = o(737);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, o(104).default)("470a9ade", content, !0, {sourceMap: !1})
  }, 725: function (t, e, o) {
    "use strict";
    o.d(e, "a", (function () {
      return l
    }));
    var r = o(732), n = o.n(r);
    o.d(e, "b", (function () {
      return n.a
    }));
    o(750);
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
    var l = n.a.firestore()
  }, 727: function (t, e, o) {
    var content = o(745);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, o(104).default)("22f38e0d", content, !0, {sourceMap: !1})
  }, 728: function (t, e, o) {
    "use strict";
    o(719)
  }, 729: function (t, e, o) {
    (e = o(103)(!1)).push([t.i, ".footer-main_content[data-v-f2fcc6fe]{height:200px}.footer-content[data-v-f2fcc6fe]{display:flex;background-color:#f4f4f4;height:180px}h5[data-v-f2fcc6fe]{color:#93a5b1}p[data-v-f2fcc6fe]{color:#000;font-size:.9rem;padding-top:15px}.reportoken-logo_footer[data-v-f2fcc6fe]{padding:10px;width:50px;height:50px;margin-left:50px}.footer-link[data-v-f2fcc6fe]{text-decoration:none}.footer-link[data-v-f2fcc6fe]:hover{text-decoration:underline}.footer-content_title[data-v-f2fcc6fe]{position:relative;margin-right:auto}.footer-content_title p[data-v-f2fcc6fe]{color:#93a5b1;width:150px;position:absolute;left:50px;top:50px;padding-top:5px;font-size:.8rem}.footer-content_about[data-v-f2fcc6fe],.footer-content_legal[data-v-f2fcc6fe],.footer-content_links[data-v-f2fcc6fe]{margin:0 auto}@media screen and (max-width:750px){.footer-content_title[data-v-f2fcc6fe]{opacity:0;z-index:-10;position:absolute}}.divider[data-v-f2fcc6fe]{padding:0;margin:0}.copyright-text[data-v-f2fcc6fe]{text-align:center;padding-bottom:10px;color:#93a5b1}", ""]), t.exports = e
  }, 731: function (t, e, o) {
    "use strict";
    o.r(e);
    var r = {
      data: function () {
        return {}
      }
    }, n = (o(728), o(56)), component = Object(n.a)(r, (function () {
      var t = this, e = t.$createElement, r = t._self._c || e;
      return r("div", {staticClass: "footer-main_content"}, [r("el-divider"), t._v(" "), r("div", {staticClass: "footer-content"}, [r("div", {staticClass: "footer-content_title"}, [r("nuxt-link", {attrs: {to: "/"}}, [r("img", {
        staticClass: "reportoken-logo_footer",
        attrs: {src: o(716)}
      })]), t._v(" "), t._m(0)], 1), t._v(" "), r("div", {staticClass: "footer-content_about"}, [r("h5", [t._v("About")]), t._v(" "), r("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [r("p", [t._v("レポートークンについて")])]), t._v(" "), r("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [r("p", [t._v("使い方")])])], 1), t._v(" "), r("div", {staticClass: "footer-content_legal"}, [r("h5", [t._v("Legal")]), t._v(" "), r("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [r("p", [t._v("利用規約")])]), t._v(" "), r("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [r("p", [t._v("プライバシーポリシー")])])], 1), t._v(" "), r("div", {staticClass: "footer-content_links"}, [r("h5", [t._v("Contact")]), t._v(" "), r("nuxt-link", {
        staticClass: "footer-link",
        attrs: {to: "/tutorialPage"}
      }, [r("p", [t._v("よくある質問")])])], 1)]), t._v(" "), r("el-divider", {staticClass: "divider"}), t._v(" "), t._m(1)], 1)
    }), [function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("p", [this._v("全ての学生のための"), e("br"), this._v("レポート共有アプリ")])
    }, function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "copyright-text"}, [e("p", [this._v("© 2020 BitPickers.")])])
    }], !1, null, "f2fcc6fe", null);
    e.default = component.exports
  }, 736: function (t, e, o) {
    "use strict";
    o(722)
  }, 737: function (t, e, o) {
    (e = o(103)(!1)).push([t.i, ".upload_content[data-v-63671d62]{position:fixed;z-index:2;bottom:60px;right:60px}.upload_btn[data-v-63671d62]{width:100px;height:100px;box-shadow:5px 5px 37px #b8b8b8,-5px -5px 37px #fff}", ""]), t.exports = e
  }, 739: function (t, e, o) {
    "use strict";
    o.r(e);
    o(736);
    var r = o(56), component = Object(r.a)({}, (function () {
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
  }, 741: function (t, e, o) {
    var content = o(752);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, o(104).default)("ee9b1f9e", content, !0, {sourceMap: !1})
  }, 742: function (t, e, o) {
    "use strict";
    o.r(e);
    o(725);
    var r = {
      props: ["report"], data: function () {
        return {value: 3.7, reportIndex: 0, shareUserAddress: "", reports: [], Report: null}
      }
    }, n = (o(744), o(56)), component = Object(n.a)(r, (function () {
      var t = this, e = t.$createElement, r = t._self._c || e;
      return null != t.report ? r("div", {staticClass: "filecard-content"}, [r("h3", {staticClass: "report-subject"}, [t._v("科目:" + t._s(t.report.subject))]), t._v(" "), r("div", {staticClass: "file-card"}, [r("div", {staticClass: "report-details"}, [r("h5", {staticClass: "report-title"}, [t._v(t._s(t.report.detail))]), t._v(" "), r("img", {
        staticClass: "reportoken",
        staticStyle: {"text-align": "center"},
        attrs: {src: o(743)}
      })])])]) : t._e()
    }), [], !1, null, "057b405e", null);
    e.default = component.exports
  }, 743: function (t, e, o) {
    t.exports = o.p + "img/reportoken-logo.d95760d.png"
  }, 744: function (t, e, o) {
    "use strict";
    o(727)
  }, 745: function (t, e, o) {
    (e = o(103)(!1)).push([t.i, '.filecard-content[data-v-057b405e]{display:inline-block}.file-card[data-v-057b405e]{display:block;background-color:#fff;position:relative;width:200px;height:282px;margin:15px;border-radius:5px;overflow:hidden;box-shadow:10 10px 10px #000}.file-card[data-v-057b405e]:before{border-top:30px solid #f4f4f4;border-left:30px solid transparent;box-shadow:0 2px 2px rgba(0,0,0,.3),-2px 2px 2px rgba(0,0,0,.2)}.file-card[data-v-057b405e]:after,.file-card[data-v-057b405e]:before{height:0;position:absolute;right:0;content:""}.file-card[data-v-057b405e]:after{display:block;border-bottom:30px solid hsla(0,0%,100%,.8);border-right:30px solid transparent;top:0}.report-details[data-v-057b405e]{position:relative;padding:10px;text-align:center}.report-semester[data-v-057b405e]{position:absolute;top:-9px;right:-5px}.report-grade[data-v-057b405e]{position:absolute;top:-9px;right:50px}.report-exp[data-v-057b405e]{margin:0;padding:0;height:75px;overflow:scroll}.report-title[data-v-057b405e]{display:flex;justify-content:center;align-items:center}.reportoken[data-v-057b405e]{margin:100px auto 0;width:80px;height:auto}.report-subject[data-v-057b405e]{color:rgba(0,0,0,.38)}.download[data-v-057b405e]{position:absolute;display:flex;right:-10px;bottom:75px}', ""]), t.exports = e
  }, 751: function (t, e, o) {
    "use strict";
    o(741)
  }, 752: function (t, e, o) {
    (e = o(103)(!1)).push([t.i, ".filecards[data-v-f098eec8]{display:flex;justify-content:center;flex-wrap:wrap}", ""]), t.exports = e
  }, 765: function (t, e, o) {
    "use strict";
    o.r(e);
    var r = {
      props: ["reports"], data: function () {
        return {report: null}
      }
    }, n = (o(751), o(56)), component = Object(n.a)(r, (function () {
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
    installComponents(component, {Filecard: o(742).default})
  }, 874: function (t, e, o) {
    var content = o(1219);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, o(104).default)("1b7833da", content, !0, {sourceMap: !1})
  }
}]);
