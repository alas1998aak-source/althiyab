(function () {
var $ = function (id) { return document.getElementById(id); };
function show(id, on) { $(id).classList.toggle("hide", !on); }
function say(t, ok) { $("msg").className = ok ? "ok" : "err"; $("msg").textContent = t; }
async function load() {
  var r = await sb.from("settings").select("key,value");
  if (r.error) { say("تعذر التحميل: " + r.error.message, false); return; }
  r.data.forEach(function (x) {
    if (x.key === "resume_price") $("price").value = x.value;
    if (x.key === "sham_code") $("sham").value = x.value;
  });
}
async function start() {
  var s = await sb.auth.getSession();
  if (s.data && s.data.session) { show("loginArea", false); show("mainArea", true); load(); }
  else { show("mainArea", false); show("loginArea", true); }
}
$("btnLogin").onclick = async function () {
  $("errL").textContent = "جاري الدخول...";
  var r = await sb.auth.signInWithPassword({ email: $("em").value.trim(), password: $("pw").value });
  if (r.error) { $("errL").textContent = "بيانات الدخول غير صحيحة"; return; }
  start();
};
$("btnOut").onclick = async function () { await sb.auth.signOut(); show("mainArea", false); show("loginArea", true); };
$("btnSave").onclick = async function () {
  var p = $("price").value.trim().replace(",", ".");
  var c = $("sham").value.trim();
  if (!(Number(p) > 0)) { say("اكتب سعر صحيح", false); return; }
  if (c.length < 4) { say("اكتب كود شام كاش", false); return; }
  var b = this; b.disabled = true; say("جاري الحفظ...", true);
  var r = await sb.from("settings").upsert([
    { key: "resume_price", value: p, updated_at: new Date().toISOString() },
    { key: "sham_code", value: c, updated_at: new Date().toISOString() }
  ]);
  b.disabled = false;
  if (r.error) { say("تعذر الحفظ: " + r.error.message, false); return; }
  say("تم الحفظ ✅", true);
};
start();
})();
/* end1 */
