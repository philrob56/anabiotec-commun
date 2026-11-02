/* Google Sites bloque alert() et confirm() : messages affichés dans la page */
(function(){
  var lastConfirm = null, lastTime = 0;
  function show(msg, color){
    var d = document.getElementById("anb-toast");
    if(!d){
      d = document.createElement("div"); d.id = "anb-toast";
      d.style.cssText = "position:absolute;left:50%;transform:translateX(-50%);z-index:99999;max-width:90%;padding:10px 16px;border-radius:8px;color:#fff;font:600 14px/1.4 system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer;white-space:pre-line;text-align:center";
      d.onclick = function(){ d.style.display = "none"; };
      document.body.appendChild(d);
    }
    var el = document.activeElement, top = window.scrollY + 12;
    if(el && el !== document.body){ top = el.getBoundingClientRect().bottom + window.scrollY + 8; }
    d.style.top = top + "px"; d.style.background = color;
    d.textContent = String(msg); d.style.display = "block";
    clearTimeout(d._t); d._t = setTimeout(function(){ d.style.display = "none"; }, 7000);
  }
  window.alert = function(msg){ show(msg, "#b91c1c"); };
  window.confirm = function(msg){
    var now = Date.now();
    if(lastConfirm === String(msg) && now - lastTime < 6000){ lastConfirm = null; return true; }
    lastConfirm = String(msg); lastTime = now;
    show(msg + " — Cliquez à nouveau sur le même bouton pour confirmer.", "#b45309");
    return false;
  };
})();
