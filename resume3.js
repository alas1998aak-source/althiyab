(function () {
var R = window.R;
var $ = R.$, show = R.show;
var SHAM_CODE = "c59083cd3afc0ae6251247f649f20fd2";
var PRICE = 2;
function newId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 3 | 8)).toString(16);
  });
}
$("priceTxt").textContent = PRICE;
$("priceTxt2").textContent = PRICE;
$("shamCode").textContent = SHAM_CODE;
sb.from("settings").select("key,value").then(function (r) {
  if (r.error || !r.data) return;
  r.data.forEach(function (x) {
    if (x.key === "resume_price" && Number(x.value) > 0) PRICE = x.value;
    if (x.key === "sham_code" && x.value) SHAM_CODE = x.value;
  });
  $("priceTxt").textContent = PRICE;
  $("priceTxt2").textContent = PRICE;
  $("shamCode").textContent = SHAM_CODE;
});
  R.addExp(); R.addEdu();
$("addExp").onclick = R.addExp;
$("addEdu").onclick = R.addEdu;
$("btnNoPhoto").onclick = R.clearPhoto;
$("photo").onchange = R.onPhoto;
$("btnPrev").onclick = function () {
  var d = R.collect();
  if (d.name.length < 3) { $("err1").textContent = "اكتب الاسم الكامل"; return; }
  if (String(d.phone).replace(/[^0-9]/g, "").length < 8) { $("err1").textContent = "اكتب رقم هاتف صحيح"; return; }
  $("err1").textContent = "";
  $("prev").innerHTML = R.render(d);
  show("formArea", false); show("prevArea", true);
  window.scrollTo(0, 0);
};
$("btnEdit").onclick = function () {
  show("prevArea", false); show("payArea", false); show("formArea", true);
};
$("btnPay").onclick = function () {
  show("payArea", true); $("payArea").scrollIntoView();
};
$("btnCopy").onclick = function () { R.copy(SHAM_CODE, this); };
$("btnCopy2").onclick = function () { R.copy($("orderCode").textContent, this); };
$("btnSend").onclick = async function () {
  var ref = R.val("ref");
  if (ref.length < 4) { $("err2").textContent = "اكتب رقم العملية"; return; }
  var b = this; b.disabled = true; $("err2").textContent = "جاري الإرسال...";
  var d = R.collect();
  var id = newId();
  var res = await sb.from("resume_orders").insert({ id: id, full_name: d.name, data: d, pay_ref: ref });
  if (res.error) { b.disabled = false; $("err2").textContent = "تعذر الإرسال، حاول مرة ثانية"; return; }
  show("prevArea", false); show("payArea", false); show("doneArea", true);
  $("orderCode").textContent = id;
  window.scrollTo(0, 0);
};
})();
/* end3 */
