window.R = {};
(function () {
var R = window.R;
R.photo = "";
R.$ = function (id) { return document.getElementById(id); };
R.val = function (id) { return R.$(id).value.trim(); };
R.lines = function (id) {
  return R.val(id).split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
};
R.safe = function (s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};
R.show = function (id, on) { R.$(id).classList.toggle("hide", !on); };
R.copy = function (text, btn) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function () { btn.textContent = "تم النسخ ✓"; });
  } else { prompt("انسخ:", text); }
};
R.items = function (cls, keys) {
  var list = document.querySelectorAll("." + cls);
  return Array.prototype.map.call(list, function (d) {
    var o = {};
    keys.forEach(function (k) {
      o[k] = d.querySelector('[name="' + k + '"]').value.trim();
    });
    return o;
  }).filter(function (o) {
    return keys.some(function (k) { return o[k]; });
  });
};
R.collect = function () {
  return {
    name: R.val("name"), title: R.val("title"),
    phone: R.val("phone"), email: R.val("email"),
    city: R.val("city"), summary: R.val("summary"),
    photo: R.photo,
    exps: R.items("ex", ["company", "job", "from", "to"]),
    edus: R.items("ed", ["degree", "school", "year"]),
    skills: R.lines("skills"), langs: R.lines("langs"),
    courses: R.lines("courses")
  };
};
})();
/* end1 */
