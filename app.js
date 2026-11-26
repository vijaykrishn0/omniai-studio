let tab='chat',mod='Auto Router',aSty='Pixar 3D style',flw={r:'16:9',w:1280,h:720,d:'10s',b:'x1'};
let uKey=localStorage.getItem('omni_k')||'';
if(uKey){document.getElementById('kBtn').innerText='✅ Key ON';document.getElementById('kBadge').innerText='Personal Key';}

document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{
  tab=b.dataset.tab;
  document.querySelectorAll('.vw').forEach(e=>e.classList.add('hidden'));
  document.getElementById('vw-'+tab).classList.remove('hidden');
  document.querySelectorAll('.tbtn').forEach(x=>x.classList.remove('act'));
  let tb=document.querySelector('.tbtn[data-tab="'+tab+'"]');if(tb)tb.classList.add('act');
  document.getElementById('fDock').classList.toggle('hidden',tab==='chat'||tab==='court'||tab==='voice');
}));

document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.modal).classList.remove('hidden')));
document.querySelectorAll('.closeM').forEach(b=>b.addEventListener('click',()=>b.closest('.mbg').classList.add('hidden')));
document.querySelectorAll('.tog').forEach(b=>b.addEventListener('click',()=>b.classList.toggle('sel')));

document.querySelectorAll('#modelList .chip').forEach(c=>c.addEventListener('click',()=>{
  mod=c.dataset.mod;
  document.querySelectorAll('#modelList .chip').forEach(x=>x.classList.remove('sel'));
  c.classList.add('sel');
}));

document.querySelectorAll('#animGrid .sbox').forEach(c=>c.addEventListener('click',()=>{
  aSty=c.dataset.sty;
  document.querySelectorAll('#animGrid .sbox').forEach(x=>x.classList.remove('sel'));
  c.classList.add('sel');
}));

document.getElementById('saveKBtn').onclick=()=>{
  let v=document.getElementById('kInp').value.trim();
  if(v){localStorage.setItem('omni_k',v);uKey=v;document.getElementById('kBtn').innerText='✅ Key ON';document.getElementById('keyM').classList.add('hidden');}
};

async function aiCall(p,r){
  if(uKey){
    let res=await fetch('https://googleapis.com,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:r+'\nUser:'+p}]}]})});
    let d=await res.json();
    if(d.candidates && d.candidates[0] && d.candidates[0].content){return d.candidates[0].content.parts[0].text;}
    return 'Check API Key';
  }
  let res=await fetch('https://pollinations.ai(r+' | '+p));
  return await res.text();
}

document.getElementById('sendBtn').onclick=async()=>{
  let i=document.getElementById('cInp'),t=i.value.trim();if(!t)return;
  let b=document.getElementById('cBox');
  b.innerHTML+='<div class="musr">'+t+'</div>';i.value='';
  let id='x'+Date.now();b.innerHTML+='<div class="mai" id="'+id+'">⚡ '+mod+' thinking...</div>';b.scrollTop=b.scrollHeight;
  try{let ans=await aiCall(t,'Act as '+mod+'. Reply in user exact language.');document.getElementById(id).innerHTML='<b style="color:#34d399;font-size:10px;">'+mod+'</b><br>'+ans;}catch(e){document.getElementById(id).innerText='Retry!';}
  b.scrollTop=b.scrollHeight;
};

document.getElementById('courtBtn').onclick=async()=>{
  let l1=document.getElementById('l1').value,l2=document.getElementById('l2').value,jg=document.getElementById('jg').value,tp=document.getElementById('cTop').value||'AI future';
  let o=document.getElementById('cOut');o.innerHTML='<div style="color:#fbbf24;">⚖️ Debating...</div>';
  let a1=await aiCall(tp,'Lawyer 1 ('+l1+') FOR topic in 2 short sentences. Match user language.');
  o.innerHTML='<div style="background:#05966922;border:1px solid #059669;padding:8px;border-radius:10px;"><b style="color:#34d399;">👨‍⚖️ '+l1+':</b> '+a1+'</div>';
  let a2=await aiCall(tp,'Lawyer 2 ('+l2+') AGAINST topic in 2 short sentences countering '+a1+'. Match user language.');
  o.innerHTML+='<div style="background:#db277722;border:1px solid #db2777;padding:8px;border-radius:10px;"><b style="color:#f472b6;">👩‍⚖️ '+l2+':</b> '+a2+'</div>';
  let v=await aiCall(tp,'Judge ('+jg+') final verdict in 2 sentences. Match user language.');
  o.innerHTML+='<div style="background:#d9770622;border:1px solid #d97706;padding:8px;border-radius:10px;"><b style="color:#fbbf24;">⚖️ Judge '+jg+':</b> '+v+'</div>';
};

document.getElementById('fToggle').onclick=()=>document.getElementById('fSheet').classList.toggle('hidden');
document.querySelectorAll('#ratioRow .sbox').forEach(b=>b.onclick=()=>{
  flw.r=b.dataset.r;flw.w=b.dataset.w;flw.h=b.dataset.h;
  document.querySelectorAll('#ratioRow .sbox').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');
  document.getElementById('fLbl').innerText='4K • '+flw.d+' • '+flw.r+' • '+flw.b;
});
document.querySelectorAll('#durRow .chip').forEach(b=>b.onclick=()=>{
  flw.d=b.dataset.d;
  document.querySelectorAll('#durRow .chip').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');
  document.getElementById('fLbl').innerText='4K • '+flw.d+' • '+flw.r+' • '+flw.b;
});
document.querySelectorAll('#batchRow .sbox').forEach(b=>b.onclick=()=>{
  flw.b=b.dataset.b;
  document.querySelectorAll('#batchRow .sbox').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');
  document.getElementById('fLbl').innerText='4K • '+flw.d+' • '+flw.r+' • '+flw.b;
});

document.getElementById('genBtn').onclick=()=>{
  document.getElementById('fSheet').classList.add('hidden');
  document.getElementById('tBar').classList.remove('hidden');
  document.getElementById('stTxt').innerText='🟢 10% Burst Active';
  let p='cinema 4k shot';
  if(tab==='image')p=document.getElementById('iPrm').value||p;
  if(tab==='anim')p=aSty+', '+(document.getElementById('aPrm').value||'hero');
  if(tab==='video')p=document.getElementById('vPrm').value||p;
  let u='https://pollinations.ai;
  let im=document.getElementById('oImg');im.src=u;
  im.onload=()=>{
    document.getElementById('dlA').href=u;
    document.getElementById('oMeta').innerText='Rendered ('+flw.r+' • '+flw.d+' • '+flw.b+')';
    document.getElementById('outCard').classList.remove('hidden');
    document.getElementById('tBar').classList.add('hidden');
    document.getElementById('stTxt').innerText='● Standby (0% Idle)';
  };
};

let vs=[{n:'Arjun',f:'🇮🇳',l:'Tamil',g:'Male'},{n:'Priya',f:'🇮🇳',l:'Tamil',g:'Female'},{n:'Adam',f:'🇺🇸',l:'English',g:'Male'}];
function renV(){
  let ff=document.getElementById('ff').value,fl=document.getElementById('fl').value,fg=document.getElementById('fg').value,bx=document.getElementById('vList');bx.innerHTML='';
  vs.filter(x=>(ff==='ALL'||x.f===ff)&&(fl==='ALL'||x.l===fl)&&(fg==='ALL'||x.g===fg)).forEach(x=>{bx.innerHTML+='<div style="background:#0e0e11;padding:8px;border-radius:10px;display:flex;justify-content:space-between;font-size:11px;"><span>'+x.f+' <b>'+x.n+'</b> ('+x.l+' • '+x.g+')</span><span style="color:#34d399;">Official</span></div>';});
}
renV();
['ff','fl','fg'].forEach(id=>document.getElementById(id).onchange=renV);
document.getElementById('saveVBtn').onclick=()=>{
  vs.unshift({n:document.getElementById('vn').value||'My Voice',f:document.getElementById('vf').value,l:document.getElementById('vl').value,g:document.getElementById('vg').value});
  renV();document.getElementById('vMod').classList.add('hidden');
};
document.getElementById('speakBtn').onclick=()=>speechSynthesis.speak(new SpeechSynthesisUtterance(document.getElementById('vTxt').value||'வணக்கம் மச்சான்!'));
document.querySelectorAll('.lopt').forEach(b=>b.onclick=()=>{document.getElementById('lFlag').innerText=b.dataset.f;document.getElementById('lTxt').innerText=b.dataset.l;document.getElementById('langM').classList.add('hidden');});
let tp=0;document.getElementById('brandLogo').onclick=()=>{if(++tp>=5){tp=0;document.getElementById('admM').classList.remove('hidden');}};
      
