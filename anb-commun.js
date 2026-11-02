/* ==========================================================================
   anb-commun.js — code commun du site BTSa ANABIOTEC (LEGTA Le Gros Chêne)
   Chaque page le charge avec :
   <script src="https://philrob56.github.io/anabiotec-commun/anb-commun.js"></script>
   Toute modification ici s'applique à toutes les pages (délai ~10 min).
   v2 : version imprimable avec champs Nom / Classe à compléter.
   v3 : sauvegarde automatique des saisies (pages listées dans ANB_SAUVEGARDE).
   v4 : stockage durable via stockage.html (l'adresse du code intégré change à chaque chargement).
   ========================================================================== */

/* 1. Charte graphique : polices et style du bandeau */
(function(){
  if (document.getElementById('anb-charte')) return;
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
  head.appendChild(l);
  var s = document.createElement('style');
  s.id = 'anb-charte';
  s.textContent = "\nbody{font-family:Inter,system-ui,-apple-system,sans-serif!important}\nh1,h2,h3,h4{font-family:Outfit,Inter,sans-serif!important;letter-spacing:-.2px}\n.anb-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;box-sizing:border-box;width:100%;align-self:stretch;margin:0 0 16px;padding:10px 18px;border-radius:14px;background:linear-gradient(135deg,#0a4f4f 0%,#0e7c7b 60%,#2a9d8f 100%);color:#fff;font:500 13px/1.3 Inter,system-ui,sans-serif;box-shadow:0 4px 14px rgba(10,79,79,.18)}\n.anb-head b{font-family:Outfit,Inter,sans-serif;font-weight:600;font-size:14px;letter-spacing:.2px}\n.anb-crumb{display:flex;align-items:center;gap:8px;min-width:0}\n.anb-crumb i{display:block;width:7px;height:7px;border-radius:50%;background:#b8d63a;flex:0 0 7px}\n.anb-crumb span{opacity:.75}\n.anb-tag{opacity:.8;font-size:12px}\n@media (max-width:560px){.anb-head{padding:8px 12px;border-radius:12px;margin-bottom:12px}.anb-tag{display:none}}\n.anb-right{display:flex;align-items:center;gap:12px}.anb-print{display:inline-flex;align-items:center;gap:6px;font:600 12.5px/1 Inter,system-ui,sans-serif;color:#17330a;background:#b8d63a;border:0;border-radius:999px;padding:7px 12px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)}.anb-print:hover{filter:brightness(1.05)}.anb-print svg{width:14px;height:14px}@media print{.anb-print{display:none}}\n";
  head.appendChild(s);
})();

/* 2. Impression : bouton « Imprimer / PDF » du bandeau (anbPrint) */
function anbPrint(){
 try{
  var src=document.documentElement, doc=src.cloneNode(true);
  var a=src.querySelectorAll('input,select,textarea'), b=doc.querySelectorAll('input,select,textarea');
  for(var i=0;i<a.length;i++){var e=a[i],d=b[i]; if(!d) continue;
   if(e.tagName==='SELECT'){for(var j=0;j<d.options.length;j++){ if(e.options[j]&&e.options[j].selected) d.options[j].setAttribute('selected',''); else d.options[j].removeAttribute('selected'); }}
   else if(e.type==='checkbox'||e.type==='radio'){ if(e.checked) d.setAttribute('checked',''); else d.removeAttribute('checked'); }
   else if(e.tagName==='TEXTAREA'){ d.textContent=e.value; }
   else { d.setAttribute('value',e.value); } }
  var c1=src.querySelectorAll('canvas'), c2=doc.querySelectorAll('canvas');
  for(var k=0;k<c1.length;k++){ try{ var r=c1[k].getBoundingClientRect(); if(!c2[k]) continue; var im=doc.ownerDocument? document.createElement('img'):null; im=document.createElement('img'); im.src=c1[k].toDataURL('image/png'); im.style.maxWidth='100%'; if(r.width) im.style.width=r.width+'px'; c2[k].parentNode.replaceChild(im,c2[k]); }catch(err){} }
  var rm=doc.querySelectorAll('script,.anb-print,iframe,#anb-toast'); for(var m=0;m<rm.length;m++) rm[m].parentNode.removeChild(rm[m]);
  var head=doc.querySelector('head'); var st=document.createElement('style');
  st.textContent='@page{size:A4;margin:12mm}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}html,body{background:#fff!important}.anb-bar{position:sticky;top:0;z-index:99;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:#0f2a2e;color:#fff;padding:10px 16px;font:500 14px Inter,system-ui,sans-serif}.anb-bar button{font:600 14px Inter,system-ui,sans-serif;background:#b8d63a;color:#17330a;border:0;border-radius:10px;padding:9px 16px;cursor:pointer}.anb-id{display:flex;gap:24px;flex-wrap:wrap;margin:0 0 14px;padding:10px 14px;border:1.5px dashed #9fb3b1;border-radius:10px;font:500 13.5px Inter,system-ui,sans-serif;color:#0f2a2e;background:#fff}.anb-id span{flex:1 1 160px;white-space:nowrap}@media print{.anb-bar{display:none}}';
  head.appendChild(st);
  var body=doc.querySelector('body');
  var now=new Date(); var dd=('0'+now.getDate()).slice(-2)+'/'+('0'+(now.getMonth()+1)).slice(-2)+'/'+now.getFullYear();
  var id=document.createElement('div'); id.className='anb-id'; id.innerHTML='<label>Nom et prénom : <input class="anb-in" id="anb-nom" placeholder="à compléter" autocomplete="off" value="'+anbEsc(window.anbNomMemo||'')+'"></label><label>Classe : <input class="anb-in anb-in-court" id="anb-classe" placeholder="à compléter" autocomplete="off" value="'+anbEsc(window.anbClasseMemo||'')+'"></label><span>Date : '+dd+'</span>';
  var hd=body.querySelector('.anb-head'); if(hd&&hd.nextSibling) hd.parentNode.insertBefore(id,hd.nextSibling); else body.insertBefore(id,body.firstChild);
  var bar=document.createElement('div'); bar.className='anb-bar'; bar.innerHTML='<span>Version imprimable — indiquez votre nom et votre classe, puis imprimez ou enregistrez en PDF</span><button onclick="anbDoPrint()">Imprimer / Enregistrer en PDF</button>';
  body.insertBefore(bar,body.firstChild);
  /* Champs Nom / Classe de la version imprimable : pré-remplis et mémorisés (via anbStore) */
  var st2=document.createElement('style');
  st2.textContent='.anb-id label{flex:1 1 220px;display:flex;align-items:baseline;gap:6px;white-space:nowrap}.anb-in{flex:1;min-width:120px;font:600 13.5px Inter,system-ui,sans-serif;color:#0f2a2e;border:0;border-bottom:1.5px solid #9fb3b1;background:transparent;padding:2px 4px;outline:none}.anb-in:focus{border-bottom-color:#0e7c7b}.anb-in.anb-manque{border-bottom-color:#b91c1c;background:#fdecec}.anb-in-court{max-width:140px}.anb-id label:first-child{flex:2 1 280px}@media print{.anb-in{border-bottom-color:#0f2a2e}.anb-in::placeholder{color:transparent}}';
  head.appendChild(st2);
  var sc=document.createElement('script');
  sc.textContent='(function(){'
   +'var n=document.getElementById("anb-nom"),c=document.getElementById("anb-classe");'
   +'if(!n||!c){window.anbDoPrint=function(){window.print();};return;}'
   +'n.oninput=function(){n.classList.remove("anb-manque");};'
   +'window.anbDoPrint=function(){'
   +'if(!n.value.trim()){n.classList.add("anb-manque");n.placeholder="Indiquez votre nom avant d\\u2019imprimer";n.focus();return;}'
   +'try{if(window.opener&&window.opener.anbMemo)window.opener.anbMemo(n.value.trim(),c.value.trim());}catch(e){}'
   +'window.print();};'
   +'if(!n.value)setTimeout(function(){n.focus();},300);'
   +'})();';
  body.appendChild(sc);
  var html='<!doctype html>'+doc.outerHTML;
  var w=window.open('','_blank');
  if(w&&w.document){ w.document.open(); w.document.write(html); w.document.close(); try{w.document.title='Impression – '+(document.title||'outil');}catch(e){} return; }
 }catch(e){}
 try{ window.print(); }catch(e){ }
}

/* 3. Messages : Google Sites bloque alert() et confirm() dans les intégrations,
      ils sont donc affichés directement dans la page. */
(function(){
  var lastConfirm = null, lastTime = 0;
  function show(msg, color){
    var d = document.getElementById("anb-toast");
    if(!d){
      d = document.createElement("div"); d.id = "anb-toast";
      d.style.position = "absolute"; d.style.left = "50%"; d.style.transform = "translateX(-50%)";
      d.style.zIndex = "99999"; d.style.maxWidth = "90%"; d.style.padding = "10px 16px";
      d.style.borderRadius = "8px"; d.style.color = "#fff"; d.style.fontWeight = "600";
      d.style.fontSize = "14px"; d.style.lineHeight = "1.4"; d.style.fontFamily = "system-ui, sans-serif";
      d.style.boxShadow = "0 4px 14px rgba(0,0,0,.25)"; d.style.cursor = "pointer";
      d.style.whiteSpace = "pre-line"; d.style.textAlign = "center";
      d.onclick = function(){ d.style.display = "none"; };
      document.body.appendChild(d);
    }
    var el = document.activeElement, top = window.scrollY + 12;
    if(el && el !== document.body && el.getBoundingClientRect){ top = el.getBoundingClientRect().bottom + window.scrollY + 8; }
    d.style.top = top + "px"; d.style.background = color; d.textContent = String(msg); d.style.display = "block";
    clearTimeout(d._t); d._t = setTimeout(function(){ d.style.display = "none"; }, 7000);
  }
  window.anbToast = show;
  window.alert = function(msg){ show(msg, "#b91c1c"); };
  window.confirm = function(msg){
    var now = Date.now();
    if(lastConfirm === String(msg) && now - lastTime < 6000){
      lastConfirm = null; var d = document.getElementById("anb-toast"); if(d) d.style.display = "none";
      return true;
    }
    lastConfirm = String(msg); lastTime = now;
    show(msg + " — Cliquez à nouveau sur le même bouton pour confirmer.", "#b45309");
    return false;
  };
})();

/* 4. Sauvegarde automatique des saisies
      Les valeurs tapées sont gardées sur l'appareil de l'élève et restaurées
      à son retour. Activée seulement pour les pages dont le titre est listé ici. */
var ANB_SAUVEGARDE = [
  "Dosages Acide-Base - Application Interactive",
  "Extraction Liquide-Liquide",
  "TP Dosage de l'Aspirine - Comparaison de méthodes"
];
(function(){
  function demarrer(){
    if (ANB_SAUVEGARDE.indexOf(document.title) < 0) return;
    var CLE = "anb-saisies:" + document.title, pret = false, minuterie = null;
    var EXCLUS = ["button","submit","reset","file","password","hidden","image"];
    function champs(){
      return Array.prototype.filter.call(document.querySelectorAll("input,select,textarea"), function(el){
        return !(el.closest && el.closest(".anb-head")) && EXCLUS.indexOf((el.type || "").toLowerCase()) < 0;
      });
    }
    function cle(el, i){ return el.id ? "id:" + el.id : (el.name ? "name:" + el.name + ":" + i : "n:" + i); }
    function estCase(el){ var t = (el.type || "").toLowerCase(); return t === "checkbox" || t === "radio"; }
    function enregistrer(){
      if (!pret) return;
      var d = {}, n = 0;
      champs().forEach(function(el, i){
        if (estCase(el)) { if (el.checked === el.defaultChecked) return; d[cle(el, i)] = el.checked; }
        else if (el.tagName === "SELECT") { var o = el.options[el.selectedIndex]; if (!o || o.defaultSelected) return; d[cle(el, i)] = el.value; }
        else { if (el.value === el.defaultValue) return; d[cle(el, i)] = el.value; }
        n++;
      });
      if (n) anbStore.set(CLE, JSON.stringify({ t: Date.now(), d: d })); else anbStore.del(CLE);
    }
    function signaler(el){
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
    function restaurer(brut){
      var n = 0;
      if (brut) { try {
        var d = JSON.parse(brut).d || {}, touches = [];
        champs().forEach(function(el, i){
          var k = cle(el, i); if (!(k in d)) return;
          if (estCase(el)) el.checked = !!d[k]; else el.value = d[k];
          touches.push(el); n++;
        });
        touches.forEach(signaler);
      } catch(e){} }
      pret = true;
      if (n && window.anbToast) window.anbToast("Vos saisies précédentes ont été restaurées.", "#0e7c7b");
    }
    function effacer(){
      if (!window.confirm("Effacer toutes vos saisies sur cette page ?")) return;
      pret = false;
      anbStore.del(CLE);
      champs().forEach(function(el){
        if (estCase(el)) el.checked = el.defaultChecked;
        else if (el.tagName === "SELECT") { for (var j = 0; j < el.options.length; j++) el.options[j].selected = el.options[j].defaultSelected; }
        else el.value = el.defaultValue;
        signaler(el);
      });
      pret = true;
    }
    function planifier(){ clearTimeout(minuterie); minuterie = setTimeout(enregistrer, 400); }
    document.addEventListener("input", planifier, true);
    document.addEventListener("change", planifier, true);
    var zone = document.querySelector(".anb-head .anb-right");
    if (zone) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "anb-print anb-reset";
      b.textContent = "Effacer mes saisies";
      b.title = "Effacer les valeurs enregistrées sur cet appareil";
      b.style.background = "transparent"; b.style.color = "#fff";
      b.style.border = "1px solid rgba(255,255,255,.55)"; b.style.marginRight = "8px";
      b.onclick = effacer;
      zone.insertBefore(b, zone.firstChild);
    }
    anbStore.get(CLE).then(function(brut){ setTimeout(function(){ restaurer(brut); }, 50); });
  }
  if (document.readyState === "complete") demarrer(); else window.addEventListener("load", demarrer);
})();

/* 5. Stockage durable
      Google Sites donne une adresse différente au code intégré à chaque chargement,
      ce qui vide le stockage du navigateur. Les données passent donc par une petite
      page à adresse fixe, hébergée ici sur GitHub (stockage.html), chargée en arrière-plan.
      anbStore.get / set / del renvoient une promesse ; sans stockage disponible, rien ne casse. */
var anbStore = (function(){
  var ADRESSE = "https://philrob56.github.io/anabiotec-commun/stockage.html";
  var ORIGINE = "https://philrob56.github.io";
  var cadre = null, pret = false, dispo = false, attente = [], rappels = {}, compteur = 0;
  function vider(){ var a = attente; attente = []; a.forEach(function(f){ f(); }); }
  function initialiser(){
    if (cadre) return;
    cadre = document.createElement("iframe");
    cadre.src = ADRESSE; cadre.title = "stockage"; cadre.tabIndex = -1;
    cadre.setAttribute("aria-hidden", "true");
    cadre.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
    (document.body || document.documentElement).appendChild(cadre);
    setTimeout(function(){ if (!pret) { pret = true; vider(); } }, 4000);
  }
  window.addEventListener("message", function(ev){
    if (ev.origin !== ORIGINE || !ev.data || ev.data.anb !== 1) return;
    if (ev.data.pret) { pret = true; dispo = !!ev.data.ok; vider(); return; }
    var cb = rappels[ev.data.id];
    if (cb) { delete rappels[ev.data.id]; cb(ev.data.valeur == null ? null : ev.data.valeur); }
  });
  function envoyer(op, cle, valeur){
    return new Promise(function(res){
      function go(){
        if (!dispo) { res(null); return; }
        var id = ++compteur; rappels[id] = res;
        cadre.contentWindow.postMessage({ anb: 1, id: id, op: op, cle: cle, valeur: valeur }, ORIGINE);
        setTimeout(function(){ if (rappels[id]) { delete rappels[id]; res(null); } }, 3000);
      }
      if (pret) go(); else { attente.push(go); initialiser(); }
    });
  }
  return {
    get: function(k){ return envoyer("get", k); },
    set: function(k, v){ return envoyer("set", k, v); },
    del: function(k){ return envoyer("del", k); }
  };
})();
function anbEsc(s){ return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
/* Nom et classe de la version imprimable : mémorisés pour toutes les pages */
window.anbMemo = function(nom, classe){
  window.anbNomMemo = nom; window.anbClasseMemo = classe;
  anbStore.set("anb-nom", nom); anbStore.set("anb-classe", classe);
};
(function(){
  function charger(){
    if (!document.querySelector(".anb-head")) return;
    anbStore.get("anb-nom").then(function(v){ if (v) window.anbNomMemo = v; });
    anbStore.get("anb-classe").then(function(v){ if (v) window.anbClasseMemo = v; });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", charger); else charger();
})();
