(function () {
var R = window.R;
var $ = R.$, safe = R.safe, show = R.show;
function ul(a) {
  if (!a.length) return "";
  return "<ul>" + a.map(function (x) { return "<li>" + safe(x) + "</li>"; }).join("") + "</ul>";
}
R.render = function (d) {
  var h = "";
  if (d.photo && String(d.photo).indexOf("data:image/jpeg;base64,") === 0) {
    h += '<img class="pic" src="' + safe(d.photo) + '" alt="">';
  }
  h += "<h3>" + safe(d.name) + "</h3>";
  if (d.title) h += "<p><b>" + safe(d.title) + "</b></p>";
  h += "<p>" + safe(d.phone) + (d.email ? " | " + safe(d.email) : "") + (d.city ? " | " + safe(d.city) : "") + "</p>";
  if (d.summary) h += "<h4>نبذة مهنية</h4><p>" + safe(d.summary) + "</p>";
  if (d.exps.length) {
    h += "<h4>الخبرات العملية</h4>" + d.exps.map(function (e) {
      return "<p><b>" + safe(e.job) + "</b> - " + safe(e.company) + " (" + safe(e.from) + (e.to ? " - " + safe(e.to) : "") + ")</p>";
    }).join("");
  }
  if (d.edus.length) {
    h += "<h4>المؤهلات العلمية</h4>" + d.edus.map(function (e) {
      return "<p><b>" + safe(e.degree) + "</b> - " + safe(e.school) + (e.year ? " (" + safe(e.year) + ")" : "") + "</p>";
    }).join("");
  }
  if (d.skills.length) h += "<h4>المهارات</h4>" + ul(d.skills);
  if (d.langs.length) h += "<h4>اللغات</h4>" + ul(d.langs);
  if (d.courses.length) h += "<h4>الدورات والشهادات</h4>" + ul(d.courses);
  return h;
};
R.addExp = function () {
  var d = document.createElement("div");
  d.className = "item ex";
  d.innerHTML = '<input name="company" placeholder="اسم الشركة">' +
    '<input name="job" placeholder="المسمى الوظيفي">' +
    '<input name="from" placeholder="من (سنة/شهر)">' +
    '<input name="to" placeholder="إلى (أو: حتى الآن)">' +
    '<button type="button" class="g" onclick="this.parentNode.remove()">حذف</button>';
  $("exps").appendChild(d);
};
R.addEdu = function () {
  var d = document.createElement("div");
  d.className = "item ed";
  d.innerHTML = '<input name="degree" placeholder="المؤهل العلمي">' +
    '<input name="school" placeholder="الجامعة أو المعهد">' +
    '<input name="year" placeholder="سنة التخرج">' +
    '<button type="button" class="g" onclick="this.parentNode.remove()">حذف</button>';
  $("edus").appendChild(d);
};
R.clearPhoto = function () {
  R.photo = ""; $("photo").value = "";
  show("thumb", false); show("btnNoPhoto", false);
};
R.onPhoto = function () {
  var f = this.files && this.files[0];
  if (!f) { R.clearPhoto(); return; }
  if (!/^image\//.test(f.type)) { alert("اختار صورة فقط"); R.clearPhoto(); return; }
  var fr = new FileReader();
  fr.onload = function () {
    var im = new Image();
    im.onload = function () {
      var k = Math.min(1, 300 / Math.max(im.width, im.height));
      var c = document.createElement("canvas");
      c.width = Math.round(im.width * k);
      c.height = Math.round(im.height * k);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      R.photo = c.toDataURL("image/jpeg", 0.8);
      $("thumb").src = R.photo;
      show("thumb", true); show("btnNoPhoto", true);
    };
    im.onerror = function () { alert("تعذر قراءة الصورة، جرّب صورة تانية"); R.clearPhoto(); };
    im.src = fr.result;
  };
  fr.readAsDataURL(f);
};
})();
/* end2 */
