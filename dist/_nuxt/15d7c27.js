(window.webpackJsonp = window.webpackJsonp || []).push([[10], {
  1213: function (t, e, r) {
    "use strict";
    r(872)
  }, 1214: function (t, e, r) {
    (e = r(103)(!1)).push([t.i, ".step-content[data-v-4cef5de2]{margin:0 0 0 10%;width:80%;padding:50px 0 0}.input-form_contents[data-v-4cef5de2]{margin-top:5px}.input-form[data-v-4cef5de2]{margin-left:30px}.next-step_btn[data-v-4cef5de2]{text-align:center}.iframe-report[data-v-4cef5de2]{height:100vh}.confirm-contents[data-v-4cef5de2],.upload-contents[data-v-4cef5de2]{margin-top:30px;text-align:center}.confirm-contents[data-v-4cef5de2]{margin-bottom:30px}", ""]), t.exports = e
  }, 1228: function (t, e, r) {
    "use strict";
    r.r(e);
    var n = r(772).a, o = (r(1213), r(56)), component = Object(o.a)(n, (function () {
      var t = this, e = t.$createElement, r = t._self._c || e;
      return r("div", {staticClass: "app-layout"}, [r("Header"), t._v(" "), r("div", {staticClass: "main-contents"}, [r("div", {staticClass: "main-content"}, [r("div", {staticClass: "step-content"}, [r("el-steps", {
        attrs: {
          active: t.active,
          "finish-status": "success",
          "align-center": ""
        }
      }, [r("el-step", {
        attrs: {
          title: "ステップ1",
          description: "レポート情報の登録"
        }
      }), t._v(" "), r("el-step", {
        attrs: {
          title: "ステップ2",
          description: "レポートアップロード"
        }
      }), t._v(" "), r("el-step", {
        attrs: {
          title: "ステップ3",
          description: "最終確認"
        }
      })], 1), t._v(" "), 0 == this.active ? r("div", {staticClass: "input-form_contents"}, [r("el-form", {
        ref: "ruleForm",
        staticClass: "demo-ruleForm",
        attrs: {model: t.ruleForm, rules: t.rules, "label-width": "150px"}
      }, [r("el-form-item", {
        staticStyle: {"margin-bottom": "5px"},
        attrs: {label: "大学名", prop: "university"}
      }, [r("el-input", {
        staticClass: "input-form", model: {
          value: t.ruleForm.university, callback: function (e) {
            t.$set(t.ruleForm, "university", e)
          }, expression: "ruleForm.university"
        }
      }, [t._v(t._s(this.ruleForm.university))])], 1), t._v(" "), r("el-form-item", {
        attrs: {
          label: "科目名",
          prop: "subject"
        }
      }, [r("el-input", {
        staticClass: "input-form", model: {
          value: t.ruleForm.subject, callback: function (e) {
            t.$set(t.ruleForm, "subject", e)
          }, expression: "ruleForm.subject"
        }
      }, [t._v(t._s(this.ruleForm.subject))])], 1), t._v(" "), r("el-form-item", {
        attrs: {
          label: "レポートの詳細",
          prop: "detail"
        }
      }, [r("el-input", {
        attrs: {type: "textarea"}, model: {
          value: t.ruleForm.detail, callback: function (e) {
            t.$set(t.ruleForm, "detail", e)
          }, expression: "ruleForm.detail"
        }
      })], 1), t._v(" "), r("el-form-item", {attrs: {label: "レポートの価格(RPT)"}}, [r("el-slider", {
        attrs: {step: 10},
        model: {
          value: t.amount, callback: function (e) {
            t.amount = e
          }, expression: "amount"
        }
      })], 1), t._v(" "), r("el-form-item", {staticClass: "next-step_btn"}, [r("el-button", {
        attrs: {type: "primary"},
        on: {
          click: function (e) {
            return t.submitForm("ruleForm")
          }
        }
      }, [t._v("レポートの選択へ進む")]), t._v(" "), r("el-button", {
        on: {
          click: function (e) {
            return t.resetForm("ruleForm")
          }
        }
      }, [t._v("リセット")])], 1)], 1)], 1) : t._e(), t._v(" "), 1 == this.active ? r("div", {staticClass: "upload-contents"}, [r("p", [t._v("科目名:" + t._s(this.ruleForm.subject))]), t._v(" "), r("p", [t._v("レポートの詳細:" + t._s(this.ruleForm.detail))]), t._v(" "), r("form", {attrs: {onSubmit: "onSubmit"}}, [r("input", {
        ref: "file",
        attrs: {type: "file"},
        on: {change: t.captureFile}
      }), t._v(" "), r("el-button", {
        staticStyle: {"margin-top": "12px"},
        on: {click: t.next}
      }, [t._v("確認")]), t._v(" "), r("el-button", {
        staticStyle: {"margin-top": "12px"},
        on: {click: t.back}
      }, [t._v("戻る")])], 1)]) : t._e(), t._v(" "), 2 == this.active ? r("div", {staticClass: "confirm-contents"}, [r("p", [t._v("大学名:" + t._s(this.ruleForm.university))]), t._v(" "), r("p", [t._v("学年:" + t._s(this.ruleForm.grade))]), t._v(" "), r("p", [t._v("レポートの詳細:" + t._s(this.ruleForm.detail))]), t._v(" "), r("el-button", {
        attrs: {slot: "reference"},
        on: {click: t.reportUpload},
        slot: "reference"
      }, [t._v("レポートを共有")]), t._v(" "), r("el-button", {
        staticStyle: {"margin-top": "12px"},
        on: {click: t.back}
      }, [t._v("戻る")])], 1) : t._e(), t._v(" "), 3 == this.active ? r("div", {staticClass: "finish-contents"}, [r("h1", [t._v("あなたの貢献度が上がりました。")]), t._v(" "), r("h3", [t._v("お疲れ様でした。レポートが共有されました。")]), t._v(" "), r("h2", [t._v("\n            誰かにあなたのレポートが閲覧された時、あなたにレポートークンが送信されます\n          ")]), t._v(" "), "" != t.ipfsHash ? r("div", {staticClass: "display-hash"}, [r("iframe", {
        staticClass: "iframe-report",
        attrs: {src: "https://ipfs.io/ipfs/" + t.ipfsHash, alt: "共有したレポートの画像", width: "100%", height: "100vh"}
      }), t._v(" "), r("div", {staticClass: "home-btn"}, [r("el-button", {attrs: {type: "primary"}}, [r("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/homePage"}
      }, [t._v("HOMEへ")])], 1)], 1)]) : r("div", {staticClass: "display-fash"}, [r("h5", [t._v("ファイルをアップロード中です。しばらくお待ちください.....")])])]) : t._e()], 1)])]), t._v(" "), r("Footer")], 1)
    }), [], !1, null, "4cef5de2", null);
    e.default = component.exports;
    installComponents(component, {Header: r(715).default, Footer: r(731).default})
  }, 713: function (t, e, r) {
    var content = r(721);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("141f8560", content, !0, {sourceMap: !1})
  }, 715: function (t, e, r) {
    "use strict";
    r.r(e);
    var n = r(3), o = r(209), c = r.n(o), l = (r(349), r(724)), f = r.n(l), d = r(105);
    r.n(d).a.use(f.a), n.default.use(c.a);
    var v = {
      data: function () {
        return {}
      }
    }, m = (r(720), r(56)), component = Object(m.a)(v, (function () {
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
  }, 772: function (t, e, r) {
    "use strict";
    (function (t) {
      r(57);
      var n = r(11), o = r(715), c = r(897), l = r(725);
      e.a = {
        components: {Header: o.default}, data: function () {
          return {
            amount: 0,
            setBuffer: [],
            ipfsHash: "",
            user: [],
            active: 0,
            visible: !1,
            ruleForm: {university: "", subject: "", detail: ""},
            rules: {
              university: [{required: !0, message: "大学名を記入してください", trigger: "blur"}],
              subject: [{required: !0, message: "科目名を記入してください", trigger: "blur"}],
              detail: [{required: !0, message: "レポートの詳細を記入してください", trigger: "blur"}]
            }
          }
        }, mounted: function () {
          var t = this;
          return Object(n.a)(regeneratorRuntime.mark((function e() {
            var r;
            return regeneratorRuntime.wrap((function (e) {
              for (; ;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, t.$web3.eth.getAccounts();
                case 2:
                  r = e.sent, t.userAddress = r[0], l.a.collection("users").doc(t.userAddress).get().then((function (e) {
                    t.user = e.data()
                  }));
                case 6:
                case"end":
                  return e.stop()
              }
            }), e)
          })))()
        }, methods: {
          captureFile: function (e) {
            var r = this;
            this.$refs.file.files[0];
            e.preventDefault();
            var n = e.target.files[0], o = new window.FileReader;
            o.readAsArrayBuffer(n), o.onloadend = function () {
              r.setBuffer = t(o.result)
            }
          }, reportUpload: function () {
            var t = this;
            return Object(n.a)(regeneratorRuntime.mark((function e() {
              var r;
              return regeneratorRuntime.wrap((function (e) {
                for (; ;) switch (e.prev = e.next) {
                  case 0:
                    return console.log("success"), e.next = 3, c.a.add(t.setBuffer).then((function (e) {
                      t.ipfsHash = e.path
                    }));
                  case 3:
                    return console.log(t.ipfsHash), e.next = 6, t.$reportInfoContract.methods.setReport(t.ipfsHash).send({from: t.userAddress});
                  case 6:
                    return r = e.sent, console.log(r), e.next = 10, l.a.collection("users").doc(t.userAddress).update({shares: l.b.firestore.FieldValue.increment(1)});
                  case 10:
                    return t.user.shares++, e.next = 13, l.a.collection("reports").add({
                      university: t.ruleForm.university,
                      subject: t.ruleForm.subject,
                      detail: t.ruleForm.detail,
                      index: t.user.shares,
                      shareUser: t.user.address,
                      downloads: 0,
                      currentDownloads: 0,
                      amount: t.amount
                    });
                  case 13:
                    t.active++ > 2 && (t.active = 0), t.$notify({
                      title: "成功",
                      message: "レポートの共有に成功しました！",
                      type: "success"
                    });
                  case 15:
                  case"end":
                    return e.stop()
                }
              }), e)
            })))()
          }, next: function () {
            this.active++ > 2 && (this.active = 0)
          }, back: function () {
            this.active-- < 1 && (this.active = 0)
          }, submitForm: function (t) {
            var e = this;
            this.$refs[t].validate((function (t) {
              if (!t) return !1;
              e.active++ > 2 && (e.active = 0)
            }))
          }, onSubmit: function (t) {
            var e = this;
            this.$refs[t].validate((function (t) {
              if (!t) return !1;
              e.active++ > 2 && (e.active = 0)
            }))
          }, resetForm: function (t) {
            this.$refs[t].resetFields()
          }, handleClose: function (t) {
            this.$confirm("本当に閉じてもよろしいですか？").then((function (e) {
              t()
            })).catch((function (t) {
            }))
          }
        }
      }
    }).call(this, r(2).Buffer)
  }, 872: function (t, e, r) {
    var content = r(1214);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, r(104).default)("2602e8d7", content, !0, {sourceMap: !1})
  }, 897: function (t, e, r) {
    "use strict";
    r.d(e, "a", (function () {
      return n
    }));
    var n = new (r(898))({host: "ipfs.infura.io", port: "5001", protocol: "https"})
  }, 937: function (t, e) {
  }
}]);
