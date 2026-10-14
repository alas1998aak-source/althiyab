(function () {
var SHAM_CODE = "c59083cd3afc0ae6251247f649f20fd2";
var PRICE = 2;
var photoData = "";
var $ = function (id) { return document.getElementById(id); };
function val(id) { return $(id).value.trim(); }
function lines(id) { return val(id).split("\n").map(function (s) { return s.trim(); }).filter(Boolean); }
function safe(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

function addExp() {
  var d = document.createElement("div");
  d.className = "item ex";
  d.innerHTML = '<input name="company" placeholder="اسم الشركة"><input name="job" placeholder="المسمى الوظيفي"><input name="from" placeholder="من (سنة/شهر)"><input name="to" placeholder="إلى (أو: حتى الآن)"><button type="button" class="g" onclick="this.parentNode.remove()">حذف</button>';
  $("exps").appendChild(d);
}
function addEdu() {
  var d = document.createElement("div");
  d.className = "item ed";
  d.innerHTML = '<input name="degree" placeholder="المؤهل العلمي"><input name="school" placeholder="الجامعة أو المعهد"><input name="year" placeholder="سنة التخرج"><button type="button" class="g" onclick="this.parentNode.remove()">حذف</button>';
  $("edus").appendChild(d);
}
function items(cls, keys) {
  return Array.prototype.map.call(document.querySelectorAll("." + cls), function (d) {
    var o = {};
    keys.forEach(function (k) { o[k] = d.querySelector('[name="' + k + '"]').value.trim(); });
    return o;
  }).filter(function (o) { return keys.some(function (k) { return o[k]; }); });
}
function collect() {
  return {
    name: val("name"), title: val("title"), phone: val("phone"), email: val("ema
