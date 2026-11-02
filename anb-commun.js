/* ==========================================================================
   anb-commun.js — code commun du site BTSa ANABIOTEC (LEGTA Le Gros Chêne)
   Chaque page le charge avec :
   <script src="https://philrob56.github.io/anabiotec-commun/anb-commun.js"></script>
   Toute modification ici s'applique à toutes les pages (délai ~10 min).
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
  var id=document.createElement('div'); id.className='anb-id'; id.innerHTML='<span>Nom : ______________________</span><span>Classe : ____________</span><span>Date : '+dd+'</span>';
  var hd=body.querySelector('.anb-head'); if(hd&&hd.nextSibling) hd.parentNode.insertBefore(id,hd.nextSibling); else body.insertBefore(id,body.firstChild);
  var bar=document.createElement('div'); bar.className='anb-bar'; bar.innerHTML='<span>Version imprimable — vérifiez puis imprimez ou enregistrez en PDF</span><button onclick="window.print()">Imprimer / Enregistrer en PDF</button>';
  body.insertBefore(bar,body.firstChild);
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
