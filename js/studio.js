document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('[data-st-menu]');
  const navigation=document.querySelector('#studio-navigation');
  if(toggle&&navigation){
    const close=()=>{navigation.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu ☰';};
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';navigation.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Chiudi ×':'Menu ☰';});
    document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const openMenu=document.querySelector('.st-menu[open]');if(openMenu){openMenu.open=false;openMenu.querySelector('summary').focus();}else if(toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});
    navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('click',event=>{if(!event.target.closest('.st-shell')){close();document.querySelectorAll('.st-menu[open]').forEach(x=>x.open=false);}});
  }
  const system=document.querySelector('#colour-system');
  const swatches=[...document.querySelectorAll('[data-swatch]')];
  const preview=document.querySelector('[data-room]');
  const name=document.querySelector('[data-colour-name]');
  const code=document.querySelector('[data-colour-code]');
  function choose(button){
    swatches.forEach(x=>x.setAttribute('aria-pressed',String(x===button)));
    if(preview)preview.style.setProperty('--wall',button.dataset.colour);
    if(name)name.textContent=button.dataset.name;
    if(code)code.textContent=button.dataset.code;
  }
  swatches.forEach(button=>button.addEventListener('click',()=>choose(button)));
  if(system)system.addEventListener('change',()=>{
    swatches.forEach(button=>{button.hidden=button.dataset.system!==system.value;});
    const selected=swatches.find(button=>!button.hidden&&button.getAttribute('aria-pressed')==='true');
    if(!selected){const first=swatches.find(button=>!button.hidden);if(first)choose(first);}
  });
  document.querySelectorAll('[data-light]').forEach(button=>{
    if(button.tagName!=='BUTTON')return;
    button.addEventListener('click',()=>{document.querySelectorAll('button[data-light]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));if(preview)preview.dataset.light=button.dataset.light;});
  });
});

const studioLegacySections={'#chi-siamo':'/chi-siamo/','#mazzetta-colori':'/mazzetta-colori/','#quale-colore-scegliere':'/quale-colore-scegliere/'};
if((location.pathname==='/'||location.pathname==='/index.html')&&studioLegacySections[location.hash])location.replace(studioLegacySections[location.hash]);
