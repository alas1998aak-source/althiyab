(function () {
var $ = function (id) { return document.getElementById(id); };
function safe(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function ul(a) {
  if (!a || !a.length) return "";
  return "<ul>" + a.map(function (x) { return "<li>" + safe(x) + "</li>"; }).join("") + "</ul>";
}
function render(d) {
  var h = "";
  if (d.photo && String(d.photo).indexOf("data:image/jpeg;base64,") === 0) {
    h += '<img class="pic" src="' + safe(d.photo) + '" alt="">';
  }
  h += "<h3>" + safe(d.name) + "</h3>";
  if (d.title) h += "<p><b>" + safe(d.title) + "</b></p>";
  h += "<p>" + safe(d.phone) + (d.email ? " | " + safe(d.email) : "") + (d.city ? " | " + safe(d.city) : "") + "</p>";
  if (d.summary) h += "<h4>نبذة مهنية</h4><p>" + safe(d.summary) + "</p>";
  if (d.exps && d.exps.length) {
    h += "<h4>الخبرات العملية</h4>" + d.exps.map(function (e) {
      return "<p><b>" + safe(e.job) + "</b> - " + safe(e.company) + " (" + safe(e.from) + (e.to ? " - " + safe(e.to) : "") + ")</p>";
    }).join("");
  }
  if (d.edus && d.edus.length) {
    h += "<h4>المؤهلات العلمية</h4>" + d.edus.map(function (e) {
      return "<p><b>" + safe(e.degree) + "</b> - " + safe(e.school) + (e.year ? " (" + safe(e.year) + ")" : "") + "</p>";
    }).join("");
  }
  if (d.skills && d.skills.length) h += "<h4>المهارات</h4>" + ul(d.skills);
  if (d.langs && d.langs.length) h += "<h4>اللغات</h4>" + ul(d.langs);
  if (d.courses && d.courses.length) h += "<h4>الدورات والشهادات</h4>" + ul(d.courses);
if (!document.getElementById("tplcss")) {
  var st = document.createElement("style"); st.id = "tplcss";
  st.textContent = ".tpl-2 h3{background:#12305a!important;color:#fff!important;padding:12px!important;border-radius:8px!important}";
  st.textContent += ".tpl-2 h4{color:#12305a!important;border-bottom:2px solid #12305a!important;padding-bottom:4px!important}";
  st.textContent += ".tpl-3{font-family:Georgia,serif!important}.tpl-3 h3{text-align:center!important;font-size:26px!important}";
  st.textContent += ".tpl-3 h4{border-bottom:1px solid #000!important;color:#000!important}";
  document.head.appendChild(st);
}
h = '<div class="tpl-' + safe(d.tpl || "1") + '">' + h + "</div>";
  return h;
}
async function go() {
  var id = $("code").value.trim().toLowerCase();
  var re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  $("err").textContent = "";
  if (!re.test(id)) { $("err").textContent = "الرمز غير صحيح، تأكد من نسخه كاملاً"; return; }
  $("err").textContent = "جاري البحث...";
  var r = await sb.rpc("get_paid_resume", { order_id: id });
  if (r.error) { $("err").textContent = "تعذر الاتصال، حاول مرة ثانية"; return; }
  if (!r.data) { $("err").textContent = "لم يتم تأكيد الدفع بعد، أو الرمز غير صحيح. جرّب لاحقاً أو تواصل معنا."; return; }
  $("err").textContent = "";
  $("cv").innerHTML = render(r.data);
  $("cvWrap").classList.remove("hide");
  $("actions").classList.remove("hide");
  document.title = "السيرة الذاتية - " + (r.data.name || "");
}
$("btnGo").onclick = go;
$("btnPdf").onclick = function () { window.print(); };
var q = new URLSearchParams(location.search).get("id");
if (q) { $("code").value = q; go(); }
})();
/* enddl */
