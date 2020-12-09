(window.webpackJsonp = window.webpackJsonp || []).push([[4], {
  1221: function (t, e, n) {
    "use strict";
    n.r(e);
    var o = {
      components: {Header: n(715).default}, data: function () {
        return {
          tableData: [{
            reportname: "情報工学通信実験",
            date: "2020/05/03",
            name: "Aoi",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "デジタル回路レポート",
            date: "2020/05/02",
            name: "Oshita",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "デジタル回路レポート",
            date: "2020/07/04",
            name: "Onishi",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "情報工学通信実験",
            date: "2020/07/04",
            name: "Nishino",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "情報工学通信実験",
            date: "2020/07/04",
            name: "Onishi",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "解析Ⅱ",
            date: "2020/07/04",
            name: "Onishi",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "化学中間レポート",
            date: "2020/07/04",
            name: "Onishi",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }, {
            reportname: "情報工学通信実験",
            date: "2020/06/01",
            name: "Konishi",
            address: "0x1062Bb912a6D1B43D901DE9087E5B1200Db877f8"
          }]
        }
      }, methods: {
        formatter: function (t, e) {
          return t.address
        }
      }
    }, r = (n(875), n(56)), component = Object(r.a)(o, (function () {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return n("div", {staticClass: "app-layout"}, [n("Header"), t._v(" "), n("div", {staticClass: "main-contents"}, [n("div", {staticClass: "side-content"}, [n("Folder")], 1), t._v(" "), n("div", {staticClass: "main-content"}, [n("h1", [t._v("履歴")]), t._v(" "), n("div", {staticClass: "home-btn"}, [n("el-button", {attrs: {type: "primary"}}, [n("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/homePage"}
      }, [t._v("HOMEへ")])], 1)], 1), t._v(" "), n("div", {staticClass: "report-table_info"}, [n("el-table", {
        staticStyle: {width: "100%"},
        attrs: {data: t.tableData, "default-sort": {prop: "date", order: "descending"}}
      }, [n("el-table-column", {
        attrs: {
          prop: "reportname",
          label: "レポート名",
          sortable: "",
          width: "150"
        }
      }), t._v(" "), n("el-table-column", {
        attrs: {
          prop: "date",
          label: "日付",
          sortable: "",
          width: "120"
        }
      }), t._v(" "), n("el-table-column", {
        attrs: {
          prop: "name",
          label: "ユーザー名",
          width: "180"
        }
      }), t._v(" "), n("el-table-column", {
        attrs: {
          prop: "address",
          label: "アドレス",
          formatter: t.formatter
        }
      })], 1)], 1), t._v(" "), n("Upload")], 1)])], 1)
    }), [], !1, null, null, null);
    e.default = component.exports;
    installComponents(component, {Header: n(715).default, Folder: n(764).default, Upload: n(739).default})
  }, 713: function (t, e, n) {
    var content = n(721);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, n(104).default)("141f8560", content, !0, {sourceMap: !1})
  }, 715: function (t, e, n) {
    "use strict";
    n.r(e);
    var o = n(3), r = n(209), l = n.n(r), d = (n(349), n(724)), c = n.n(d), f = n(105);
    n.n(f).a.use(c.a), o.default.use(l.a);
    var h = {
      data: function () {
        return {}
      }
    }, m = (n(720), n(56)), component = Object(m.a)(h, (function () {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", {staticClass: "header-content"}, [e("nuxt-link", {attrs: {to: "/"}}, [e("img", {
        staticClass: "reportoken-logo_header",
        attrs: {src: n(716)}
      })]), this._v(" "), e("div", {staticClass: "page-link"}, [e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/serchPage"}
      }, [e("i", {staticClass: "el-icon-search"})]), this._v(" "), e("nuxt-link", {
        staticClass: "link-detail",
        attrs: {to: "/myPage"}
      }, [e("i", {staticClass: "el-icon-user"})])], 1)], 1)
    }), [], !1, null, null, null);
    e.default = component.exports
  }, 716: function (t, e, n) {
    t.exports = n.p + "img/reportoken-logo_header.274e63e.png"
  }, 720: function (t, e, n) {
    "use strict";
    n(713)
  }, 721: function (t, e, n) {
    (e = n(103)(!1)).push([t.i, ".header-content{display:flex;width:100%;height:60px;background-color:#f4f4f4}.reportoken-logo_header{padding:5px 10px 10px;width:50px;height:50px;margin-left:50px}.page-link{position:absolute;right:30px;top:20px}.el-icon-message-solid{color:#fff}.link-detail,.link-detail_notification{text-decoration:none}.link-detail{color:#000;font-size:20px;padding:8px}", ""]), t.exports = e
  }, 722: function (t, e, n) {
    var content = n(737);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, n(104).default)("470a9ade", content, !0, {sourceMap: !1})
  }, 724: function (t, e, n) {
    "use strict";
    e.__esModule = !0, e.default = {
      el: {
        colorpicker: {confirm: "OK", clear: "クリア"},
        datepicker: {
          now: "現在",
          today: "今日",
          cancel: "キャンセル",
          clear: "クリア",
          confirm: "OK",
          selectDate: "日付を選択",
          selectTime: "時間を選択",
          startDate: "開始日",
          startTime: "開始時間",
          endDate: "終了日",
          endTime: "終了時間",
          prevYear: "前年",
          nextYear: "翌年",
          prevMonth: "前月",
          nextMonth: "翌月",
          year: "年",
          month1: "1月",
          month2: "2月",
          month3: "3月",
          month4: "4月",
          month5: "5月",
          month6: "6月",
          month7: "7月",
          month8: "8月",
          month9: "9月",
          month10: "10月",
          month11: "11月",
          month12: "12月",
          weeks: {sun: "日", mon: "月", tue: "火", wed: "水", thu: "木", fri: "金", sat: "土"},
          months: {
            jan: "1月",
            feb: "2月",
            mar: "3月",
            apr: "4月",
            may: "5月",
            jun: "6月",
            jul: "7月",
            aug: "8月",
            sep: "9月",
            oct: "10月",
            nov: "11月",
            dec: "12月"
          }
        },
        select: {loading: "ロード中", noMatch: "データなし", noData: "データなし", placeholder: "選択してください"},
        cascader: {noMatch: "データなし", loading: "ロード中", placeholder: "選択してください", noData: "データなし"},
        pagination: {goto: "", pagesize: "件/ページ", total: "総計 {total} 件", pageClassifier: "ページ目へ"},
        messagebox: {title: "メッセージ", confirm: "OK", cancel: "キャンセル", error: "正しくない入力"},
        upload: {deleteTip: "Delキーを押して削除する", delete: "削除する", preview: "プレビュー", continue: "続行する"},
        table: {emptyText: "データなし", confirmFilter: "確認", resetFilter: "初期化", clearFilter: "すべて", sumText: "合計"},
        tree: {emptyText: "データなし"},
        transfer: {
          noMatch: "データなし",
          noData: "データなし",
          titles: ["リスト 1", "リスト 2"],
          filterPlaceholder: "キーワードを入力",
          noCheckedFormat: "総計 {total} 件",
          hasCheckedFormat: "{checked}/{total} を選択した"
        },
        image: {error: "FAILED"},
        pageHeader: {title: "Back"},
        popconfirm: {confirmButtonText: "Yes", cancelButtonText: "No"}
      }
    }
  }, 736: function (t, e, n) {
    "use strict";
    n(722)
  }, 737: function (t, e, n) {
    (e = n(103)(!1)).push([t.i, ".upload_content[data-v-63671d62]{position:fixed;z-index:2;bottom:60px;right:60px}.upload_btn[data-v-63671d62]{width:100px;height:100px;box-shadow:5px 5px 37px #b8b8b8,-5px -5px 37px #fff}", ""]), t.exports = e
  }, 739: function (t, e, n) {
    "use strict";
    n.r(e);
    n(736);
    var o = n(56), component = Object(o.a)({}, (function () {
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
  }, 740: function (t, e, n) {
    var content = n(749);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, n(104).default)("e4adb8e4", content, !0, {sourceMap: !1})
  }, 748: function (t, e, n) {
    "use strict";
    n(740)
  }, 749: function (t, e, n) {
    (e = n(103)(!1)).push([t.i, "h4[data-v-24b72f1c]{text-align:center;padding:15px}.folder-content[data-v-24b72f1c]{overflow:scroll}.folder-repository[data-v-24b72f1c]{padding-left:20px;margin:10px}.side-contents[data-v-24b72f1c]{position:fixed;max-height:450px;min-width:200px;overflow:hidden;margin:30px 10px 10px;right:20px;padding-bottom:50px;border-radius:10px;background:#f4f4f4;box-shadow:8px 8px 25px #8b8b8b,-8px -8px 25px #fff}", ""]), t.exports = e
  }, 764: function (t, e, n) {
    "use strict";
    n.r(e);
    var o = {
      props: ["shareReports"], data: function () {
        return {}
      }
    }, r = (n(748), n(56)), component = Object(r.a)(o, (function () {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return n("div", {staticClass: "side-contents"}, [n("h4", [t._v("共有したレポート")]), t._v(" "), n("div", {staticClass: "folder-content"}, t._l(t.shareReports, (function (e) {
        return n("div", {key: e.index}, [n("nuxt-link", {
          attrs: {
            to: {
              name: "folders-id",
              params: {id: e.shareUser + e.index}
            }
          }
        }, [n("el-badge", {
          staticClass: "item folder-repository",
          attrs: {value: e.downloads, type: "primary"}
        }, [n("el-button", {attrs: {size: "small"}}, [t._v(t._s(e.subject))])], 1)], 1)], 1)
      })), 0)])
    }), [], !1, null, "24b72f1c", null);
    e.default = component.exports
  }, 800: function (t, e, n) {
    var content = n(876);
    "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals);
    (0, n(104).default)("6502ae3a", content, !0, {sourceMap: !1})
  }, 875: function (t, e, n) {
    "use strict";
    n(800)
  }, 876: function (t, e, n) {
    (e = n(103)(!1)).push([t.i, ".home-btn{text-align:center;padding:10px}", ""]), t.exports = e
  }
}]);
