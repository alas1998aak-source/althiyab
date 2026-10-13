(function () {
  var c = window.APP_CONFIG;
  window.sb = window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_KEY);
  window.esc = function (s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  };
})();
