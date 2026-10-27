/* Klarlöst demo – English/Spanish engine (lang=en|es), platform-safe mode (no contact details) and WhatsApp-style look (ui=wa).
   Swedish (no lang param) is handled by the original inline script and is not affected unless contact=0 or ui=wa is given. */
(function(){
"use strict";
var P=new URLSearchParams(location.search),L=window.KL_LANG||"sv",SAFE=!!window.KL_SAFE;
var WA=/^(wa|whatsapp)$/i.test(P.get("ui")||P.get("theme")||"");
function $(s){return document.querySelector(s)}
function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function clean(s,max){return (s||"").replace(/[\u0000-\u001f<>]/g,"").replace(/\s+/g," ").trim().slice(0,max)}

/* ---------- UI strings ---------- */
var UI={
en:{html:"en",def:"Your company",asst:" – digital assistant",title:" – digital assistant (demo by Klarlöst)",
 ribbon:"<b>Demo</b> – an example of what a digital assistant could look like for <span class=\"fn\"></span>. Answers are examples, not real information.",
 h1:"This is what a digital assistant could look like for <em class=\"fn\"></em>.",
 lead:"Try the chat – tap a suggested question or type your own. Everything runs in the browser; the answers are examples and get tailored to your business when the real bot is built.",
 panel:"What this bot would do for you",
 how:"<strong>How it works:</strong> the bot is built from your website, price list and FAQs (for example a Google Sheet you can edit). It answers 24/7, captures enquiries and bookings and passes them to your team by email, Slack, CRM or calendar – you decide what it may answer, and when it should hand over to a person.",
 eyebrow:"Demo · ",generic:"Digital assistant",status:"Online · replies instantly",ph:"Type a message…",send:"Send",
 disc:"Demo – example answers. Nothing is sent anywhere.",chatlabel:"Chat demo",
 today:"Today",prompt:"What can I help you with? Pick a question or type your own.",
 human:"Talk to a person",humanA:"Of course! Leave your details and someone from {F} will get in touch.",
 extra:"Good question! In the real bot I'd answer that from {G} own information – prices, terms and procedures are added when the bot is built. Would you like someone to get back to you?",
 days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],mon:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
 dayfmt:function(d,D,M){return D[d.getDay()]+" "+d.getDate()+" "+M[d.getMonth()]},at:" at ",
 pick:"Pick a time that suits you:",held:"Great – I've provisionally booked {S}. What's your name and how can we reach you?",
 titles:{book:"Confirm booking",quote:"Send enquiry",contact:"Request a callback",order:"Look up order"},
 name:"Name",reach:"Phone or email",desc:"Briefly describe what you need",descL:"Description",
 err:"Please enter your name and a phone number or email.",
 btn:{quote:"Send enquiry",book:"Confirm",contact:"Send",order:"Check status"},
 okBook:"All set, {N}! Your appointment {S} is booked. You'll get a confirmation and a reminder the day before.",
 okQuote:"Thanks {N}! Your enquiry has been sent to {F}. You'll hear back as soon as possible, usually within one business day.",
 okContact:"Thanks {N}! Someone from {F} will get in touch as soon as possible.",
 sysForm:"(Demo – in real life this goes straight to {F} by email/Slack or into your booking system/CRM, and is logged to a Google Sheet.)",
 more:"Anything else I can help you with?",
 orderPh:"Order number or email (e.g. #10234)",orderErr:"Please enter an order number (at least 4 characters).",
 orderOk:"Found it ✅ Order {O}: paid and shipped yesterday. Expected delivery: {D}. Tracking link sent to the email on the order.",
 orderSys:"(Demo – the real bot looks this up live in Shopify/WooCommerce/your order system. Lookup logged to the support sheet.)",
 orderStill:"Did that answer your question?",yes:"Yes, thanks!",no:"No – I need a person",
 yesA:"Great! Have a nice day 😊",
 handA:"I'm connecting you with a team member now. They'll see this whole conversation, so you won't need to repeat yourself.",
 handSys:"🔔 Handed over to a human agent · reason: {R} · full chat history ({C} messages) attached · logged to the support sheet",
 handWait:"A team member from {F} will reply right here – usually within a few minutes during opening hours.",
 rUser:"customer asked for a person",rLow:"no confident answer in the FAQ (low match score)",rRefund:"refund request needs approval",
 qualDone:"Thanks – that's everything the team needs. Let's book a short call:",qualSys:"(Demo – lead summary: {A} → sent to your CRM/inbox.)",
 fbUnsure:"I'm not sure about that – this demo only knows a selection of questions. The real bot is trained on {G} own information. Would you like someone to get back to you?",
 fbYes:"Yes, contact me",fbShow:"Show suggestions",fbGreat:"Great!",fbHere:"Here are some things you can ask about:",
 fbHand:"I'm not completely sure about that one, so I won't guess.",
 g:[{kw:["hello","hi ","hey","good morning","hola"],r:"Hi! What can I help you with?"},
  {kw:["thank"],r:"You're welcome! Let me know if there's anything else. 😊"},
  {kw:["opening","hours","open ","close"],r:"Opening hours are added from {G} own details when the bot is built – this demo has no real hours. The chat itself is open 24/7!"},
  {kw:["address","where are you","located","directions"],r:"In the real bot I show {G} address, directions and parking."},
  {kw:["human","person","call me","contact","phone","talk to","agent"],act:"human"},
  {kw:["book","booking","appointment","schedule"],act:"book",r:"Sure!"},
  {kw:["quote","cost","price","how much"],act:"quote",r:"Prices follow {G} price list. Describe what you need and you'll get a proposal."},
  {kw:["klarlöst","klarlost","who built","are you a bot","are you a robot","are you human"," ai "],r:"I'm an AI assistant demo built by Klarlöst to show how a digital assistant could work for {F}."}],
 credit:"Demo by Klarlöst · Jesper Johannesson · Sweden"},
es:{html:"es",def:"Su empresa",asst:" – asistente digital",title:" – asistente digital (demo de Klarlöst)",
 ribbon:"<b>Demo</b> – ejemplo de cómo podría ser un asistente digital para <span class=\"fn\"></span>. Las respuestas son ejemplos, no información real.",
 h1:"Así podría ser un asistente digital para <em class=\"fn\"></em>.",
 lead:"Prueba el chat – pulsa una pregunta sugerida o escribe la tuya. Todo funciona en el navegador; las respuestas son ejemplos y se adaptan a tu negocio cuando se construye el bot real.",
 panel:"Lo que este bot haría por ti",
 how:"<strong>Cómo funciona:</strong> el bot se construye a partir de tu web, lista de precios y preguntas frecuentes (por ejemplo, una Google Sheet editable). Responde 24/7, recoge solicitudes y reservas y las envía a tu equipo – tú decides qué puede responder y cuándo pasar la conversación a una persona.",
 eyebrow:"Demo · ",generic:"Asistente digital",status:"En línea · responde al instante",ph:"Escribe un mensaje…",send:"Enviar",
 disc:"Demo – respuestas de ejemplo. No se envía nada.",chatlabel:"Demo de chat",
 today:"Hoy",prompt:"¿En qué puedo ayudarte? Elige una pregunta o escribe la tuya.",
 human:"Hablar con una persona",humanA:"¡Claro! Deja tus datos y alguien de {F} se pondrá en contacto contigo.",
 extra:"¡Buena pregunta! En el bot real respondería con la información de {F}. ¿Quieres que alguien te conteste?",
 days:["dom","lun","mar","mié","jue","vie","sáb"],mon:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
 dayfmt:function(d,D,M){return D[d.getDay()]+" "+d.getDate()+" "+M[d.getMonth()]},at:" a las ",
 pick:"Elige una hora que te venga bien:",held:"Perfecto – he reservado provisionalmente {S}. ¿Cómo te llamas y cómo podemos contactarte?",
 titles:{book:"Confirmar reserva",quote:"Enviar solicitud",contact:"Solicitar contacto",order:"Consultar pedido"},
 name:"Nombre",reach:"Teléfono o correo",desc:"Describe brevemente lo que necesitas",descL:"Descripción",
 err:"Escribe tu nombre y un teléfono o correo.",
 btn:{quote:"Enviar solicitud",book:"Confirmar",contact:"Enviar",order:"Consultar"},
 okBook:"¡Listo, {N}! Tu cita {S} está reservada. Recibirás una confirmación y un recordatorio el día anterior.",
 okQuote:"¡Gracias {N}! Tu solicitud se ha enviado a {F}. Recibirás respuesta lo antes posible.",
 okContact:"¡Gracias {N}! Alguien de {F} se pondrá en contacto contigo lo antes posible.",
 sysForm:"(Demo – en la realidad esto llega directamente a {F} por correo/Slack o a tu sistema de reservas, y se registra en una Google Sheet.)",
 more:"¿Puedo ayudarte con algo más?",
 orderPh:"Número de pedido o correo (p. ej. #10234)",orderErr:"Escribe un número de pedido (mínimo 4 caracteres).",
 orderOk:"Encontrado ✅ Pedido {O}: pagado y enviado ayer. Entrega prevista: {D}. El enlace de seguimiento se envió al correo del pedido.",
 orderSys:"(Demo – el bot real lo consulta en vivo en tu sistema de pedidos. Consulta registrada en la hoja de soporte.)",
 orderStill:"¿Te ha servido la respuesta?",yes:"Sí, ¡gracias!",no:"No – necesito una persona",
 yesA:"¡Genial! Que tengas un buen día 😊",
 handA:"Te paso ahora con una persona del equipo. Verá toda esta conversación, así que no tendrás que repetir nada.",
 handSys:"🔔 Traspasado a un agente humano · motivo: {R} · historial completo ({C} mensajes) adjunto · registrado en la hoja de soporte",
 handWait:"Una persona de {F} te responderá aquí mismo – normalmente en pocos minutos en horario de atención.",
 rUser:"el cliente pidió una persona",rLow:"sin respuesta segura en las FAQ (coincidencia baja)",rRefund:"el reembolso necesita aprobación",
 qualDone:"Gracias – es todo lo que el equipo necesita. Reservemos una llamada corta:",qualSys:"(Demo – resumen del cliente potencial: {A} → enviado a tu CRM.)",
 fbUnsure:"No estoy seguro de eso – esta demo solo conoce algunas preguntas. El bot real se entrena con la información de {F}. ¿Quieres que alguien te conteste?",
 fbYes:"Sí, contactadme",fbShow:"Ver sugerencias",fbGreat:"¡Perfecto!",fbHere:"Puedes preguntarme por ejemplo:",
 fbHand:"No estoy completamente seguro de eso, así que no voy a adivinar.",
 g:[{kw:["hola","buenos días","buenos dias","buenas","hello"],r:"¡Hola! ¿En qué puedo ayudarte?"},
  {kw:["gracias"],r:"¡De nada! Dime si necesitas algo más. 😊"},
  {kw:["dirección","direccion","dónde están","donde estan"],r:"En el bot real muestro la dirección de {F} y cómo llegar."},
  {kw:["persona","humano","agente","llamar","hablar con"],act:"human"},
  {kw:["reservar","cita","reserva"],act:"book",r:"¡Claro!"},
  {kw:["presupuesto","cuesta","precio"],act:"quote",r:"Los precios siguen la lista de {F}. Describe lo que necesitas y recibirás una propuesta."},
  {kw:["klarlöst","klarlost","eres un bot","eres un robot","quién te hizo"," ia "],r:"Soy una demo de asistente con IA creada por Klarlöst para mostrar cómo podría funcionar un asistente digital para {F}."}],
 credit:"Demo de Klarlöst · Jesper Johannesson · Suecia"}
};

/* ---------- platform-safe mode: strip every contact detail ---------- */
function stripContacts(credit){
  $$(".top .cta, .contact, #mailbtn").forEach(function(e){e.remove()});
  var br=$(".brand");if(br){br.removeAttribute("href");br.style.cursor="default"}
  var ft=$("footer .wrap");if(ft){ft.innerHTML="";var s=document.createElement("span");s.textContent=credit||"Demo av Klarlöst · Jesper Johannesson";ft.appendChild(s)}
  $$("a[href^='tel:'],a[href^='mailto:']").forEach(function(a){a.remove()});
}

/* ---------- WhatsApp-style look ---------- */
function waTheme(){
  var st=document.createElement("style");st.textContent=
  "body.wa .chat{border-radius:18px;overflow:hidden}"+
  "body.wa .ch{background:#075E54;color:#fff;border-bottom:0}body.wa .ch .n{color:#fff}body.wa .ch .s{color:#cfe9e4}"+
  "body.wa .ch .av{background:#25D366;color:#fff}body.wa .ch .tag{background:rgba(255,255,255,.18);color:#fff;border-color:transparent}"+
  "body.wa #msgs{background:#ECE5DD;background-image:radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px);background-size:14px 14px}"+
  "body.wa .m{border-radius:10px;box-shadow:0 1px .5px rgba(0,0,0,.13);border:0}"+
  "body.wa .bot{background:#fff;border-top-left-radius:2px}"+
  "body.wa .me{background:#DCF8C6;color:#111;border-top-right-radius:2px;border-bottom-right-radius:10px}"+
  "body.wa .me::after{content:' ✓✓';color:#34B7F1;font-size:.72rem;white-space:nowrap}"+
  "body.wa .sys{background:#E1F2FB;color:#4a5a63;border-radius:8px;padding:.3rem .6rem;width:fit-content;max-width:90%;margin:.4rem auto .6rem;box-shadow:0 1px .5px rgba(0,0,0,.1)}"+
  "body.wa .sys.alert{background:#FFF3C4;color:#5b4a00}"+
  "body.wa .qr button{background:#fff;border:0;color:#027EB5;border-radius:8px;box-shadow:0 1px .5px rgba(0,0,0,.13);font-weight:600}"+
  "body.wa .qr button:hover{background:#f3f3f3;color:#027EB5}body.wa .qr button:disabled{color:#027EB5}"+
  "body.wa .typing{background:#fff;border:0;border-radius:10px;box-shadow:0 1px .5px rgba(0,0,0,.13)}"+
  "body.wa .mini{border:0;box-shadow:0 1px .5px rgba(0,0,0,.13)}body.wa .mini button{background:#25D366}"+
  "body.wa .slots button{border:0;box-shadow:0 1px .5px rgba(0,0,0,.13)}"+
  "body.wa form.in{background:#F0F0F0;padding:.45rem;gap:.4rem;border-top:0}body.wa form.in input{background:#fff;border-radius:999px;padding:.7rem 1rem}"+
  "body.wa form.in button{background:#25D366;color:#fff;border-radius:999px;padding:0 1rem}"+
  "body.wa .disc{background:#F0F0F0}";
  document.head.appendChild(st);document.body.classList.add("wa");
}
if(WA)waTheme();
if(L==="sv"){if(SAFE)stripContacts();return}

/* ---------- English / Spanish engine ---------- */
var T=UI[L];
var F=clean(P.get("f"),60)||T.def;
var G=L==="en"?(/[sS]$/.test(F)?F+"'":F+"'s"):F;
var ALIAS={"rör":"vvs","plumber":"vvs","plumbing":"vvs","heating":"vvs","electrician":"el","electrical":"el","construction":"bygg","builder":"bygg","painter":"maleri","painting":"maleri","accounting":"redovisning","accountant":"redovisning","bookkeeping":"redovisning","legal":"juridik","lawyer":"juridik","law":"juridik","realestate":"maklare","real-estate":"maklare","realtor":"maklare","dentist":"tandvard","dental":"tandvard","physio":"klinik","clinic":"klinik","vet":"veterinar","veterinary":"veterinar","fitness":"gym","restaurant":"restaurang","cafe":"restaurang","hotel":"hotell","car":"bil","cars":"bil","auto":"bil","automotive":"bil","dealer":"bil","dealership":"bil","garage":"bil","cleaning":"stad","removals":"flytt","moving":"flytt","logistics":"transport","shop":"ehandel","store":"ehandel","ecommerce":"ehandel","e-commerce":"ehandel","webshop":"ehandel","e-handel":"ehandel","recruitment":"rekrytering","staffing":"rekrytering","drivingschool":"trafikskola","insurance":"forsakring","manufacturing":"tillverkning","wholesale":"grossist","salon":"salong","hair":"salong","beauty":"salong","faq":"support","helpdesk":"support","customer-support":"support","customerservice":"support","course":"wellness","courses":"wellness","coaching":"wellness","health":"wellness","lead":"leadgen","leads":"leadgen","lead-gen":"leadgen","sales":"leadgen","catering":"catering","bemanning":"rekrytering","frisor":"salong","frisör":"salong","verkstad":"bil","bilhandel":"bil","städ":"stad","stadning":"stad","akeri":"transport","industri":"tillverkning","partihandel":"grossist","tandlakare":"tandvard","tandläkare":"tandvard","veterinär":"veterinar","mäklare":"maklare","målare":"maleri","advokat":"juridik","elektriker":"el","snickare":"bygg"};
var bk=clean(P.get("b"),30).toLowerCase();bk=ALIAS[bk]||bk;
var IND=(L==="es"?window.KL_IND_ES:window.KL_IND_EN)||{};
var D=IND[bk]||IND["default"];var isDefault=!IND[bk];
var extraQs=(P.get("q")||"").split("|").map(function(s){return clean(s,120)}).filter(Boolean).slice(0,4);
function t(s){return s.replace(/\{g\}/g,L==="en"?G:"{F}").replace(/de \{F\}/g,"de "+F).replace(/\{F\}/g,F).replace(/\{f\}/g,F)}
function u(s,o){s=s.replace(/\{F\}/g,F).replace(/\{G\}/g,G);for(var k in (o||{}))s=s.split("{"+k+"}").join(o[k]);return s}

/* static page */
document.documentElement.lang=T.html;
document.title=F+T.title;
var md=$("meta[name=description]");if(md)md.setAttribute("content",L==="es"?"Demo de asistente digital para "+F+".":"Digital assistant demo for "+F+".");
$(".ribbon").innerHTML=T.ribbon;$("main h1").innerHTML=T.h1;$("#lead").textContent=T.lead;
$(".panel h2").textContent=T.panel;$(".how").innerHTML=T.how;
$(".chat").setAttribute("aria-label",T.chatlabel);$(".ch .s").textContent=WA?(L==="es"?"en línea":"online"):T.status;
var inp=$("#inp");inp.placeholder=T.ph;inp.setAttribute("aria-label",T.ph.replace("…",""));
$("#form button").textContent=T.send;$(".disc").textContent=T.disc;
$$(".fn").forEach(function(e){e.textContent=F});
$("#botname").textContent=WA?F:F+T.asst;
$("#avatar").textContent=(F.replace(/[^A-Za-zÅÄÖåäöÉéÑñ0-9]/g,"").charAt(0)||"K").toUpperCase();
$("#eyebrow").textContent=T.eyebrow+(isDefault?T.generic:D.label)+(WA?" · WhatsApp-style":"");
var ul=$("#benefits");ul.innerHTML="";D.benefits.forEach(function(b){var li=document.createElement("li");li.textContent=t(b);ul.appendChild(li)});
if(SAFE)stripContacts(T.credit);
else{var cta=$(".top .cta");if(cta)cta.textContent=L==="es"?"Contactar con Jesper":"Contact Jesper";
 var c=$$(".contact a");if(c[0]){c[0].textContent=L==="es"?"Escribir a Jesper":"Email Jesper";c[0].href="mailto:jesper.klarlost@gmail.com?subject="+encodeURIComponent("Digital assistant for "+F)}
 var gb=$$("footer .wrap span")[1];if(gb)gb.textContent=L==="es"?"Gotemburgo, Suecia":"Gothenburg, Sweden";
 var fs=$$("footer .wrap span")[0];if(fs&&fs.firstChild)fs.firstChild.textContent=L==="es"?"Demo de ":"Demo by ";}

/* chat engine */
var box=$("#msgs");
function scroll(){box.scrollTop=box.scrollHeight}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
var count=0;
function say(txt,who){var m=el("div","m "+(who||"bot"),txt);box.appendChild(m);scroll();count++;return m}
function sys(txt,cls){var s=el("div","sys"+(cls?" "+cls:""),txt);box.appendChild(s);scroll();return s}
var busy=false;
function botReply(txt,after,delay){
  busy=true;var ty=el("div","typing");ty.innerHTML="<i></i><i></i><i></i>";box.appendChild(ty);scroll();
  setTimeout(function(){ty.remove();say(txt);if(after)after();busy=false;scroll()},delay||Math.min(1500,500+txt.length*6));
}
function chips(list){
  var w=el("div","qr");
  list.forEach(function(it){var b=el("button",null,it.label);b.type="button";b.onclick=function(){if(busy)return;Array.prototype.forEach.call(w.querySelectorAll("button"),function(x){x.disabled=true});it.fn(it.label)};w.appendChild(b)});
  box.appendChild(w);scroll();return w;
}
var answered={};
function humanChip(){return {label:T.human,fn:function(l){say(l,"me");if(D.handoff)handoff(T.rUser);else botReply(u(T.humanA),function(){action("contact")})}}}
function suggest(){
  var list=[];
  D.qs.forEach(function(q,i){if(!answered[i])list.push({label:q.q,fn:function(l){ask(l,i)}})});
  extraQs.forEach(function(q,i){if(!answered["x"+i])list.push({label:q,fn:function(l){askExtra(l,i)}})});
  if(!list.length)list.push(humanChip());
  chips(list.slice(0,6));
}
function run(q){botReply(t(q.a),function(){if(q.act)action(q.act,q);else followUp()})}
function ask(label,i){answered[i]=1;say(label,"me");run(D.qs[i])}
function askExtra(label,i){answered["x"+i]=1;say(label,"me");botReply(u(T.extra),function(){if(D.handoff)handoff(T.rLow,true);else action("contact")})}
function followUp(){setTimeout(function(){suggest()},250)}

function slotsFor(){
  var out=[],d=new Date(),times=["09:00","10:30","13:00","14:30","16:00","08:15","11:00","15:15"],k=0;
  while(out.length<6){d.setDate(d.getDate()+1);var wd=d.getDay();if(wd===0||(wd===6&&bk!=="restaurang"&&bk!=="hotell"&&bk!=="gym"&&bk!=="bil"))continue;
    out.push({day:T.dayfmt(d,T.days,T.mon),time:(bk==="restaurang"?["18:00","19:30","17:30","20:00","18:30","19:00"][k%6]:times[(k*3+d.getDate())%times.length])});k++}
  return out;
}
function handoff(reason,skipMsg){
  var go=function(){sys(u(T.handSys,{R:reason,C:count}),"alert");setTimeout(function(){botReply(u(T.handWait),function(){setTimeout(suggest,300)},800)},400)};
  if(skipMsg)go();else botReply(T.handA,go,900);
}
function qualify(){
  var Q=D.qualify||[],ans=[],i=0;
  (function next(){
    if(i>=Q.length){botReply(T.qualDone,function(){sys(u(T.qualSys,{A:ans.join(" · ")}));action("book")},800);return}
    var q=Q[i];botReply(q.q,function(){chips(q.opts.map(function(o){return {label:o,fn:function(l){say(l,"me");ans.push(l);i++;next()}}}))},600);
  })();
}
function action(kind,q){
  if(kind==="handoff"){var refund=q&&/refund|reembolso/i.test(q.q);sys(u(T.handSys,{R:refund?T.rRefund:T.rUser,C:count}),"alert");setTimeout(function(){botReply(u(T.handWait),function(){setTimeout(suggest,300)},800)},400);return}
  if(kind==="qualify")return qualify();
  if(kind==="order")return orderForm();
  if(kind==="book"){
    say(T.pick);var g=el("div","slots");
    slotsFor().forEach(function(s){var b=el("button");b.type="button";b.appendChild(document.createTextNode(s.time));b.appendChild(el("small",null,s.day));
      b.onclick=function(){if(busy)return;g.classList.add("done");b.classList.add("sel");var S=s.day+T.at+s.time;say(S,"me");
        botReply(u(T.held,{S:S}),function(){form("book",s)})};
      g.appendChild(b)});
    box.appendChild(g);scroll();
  } else form(kind);
}
function orderForm(){
  var f=el("form","mini");f.noValidate=true;f.appendChild(el("b",null,T.titles.order));
  var o=el("input");o.placeholder=T.orderPh;o.setAttribute("aria-label",T.titles.order);f.appendChild(o);
  var er=el("div","err",T.orderErr);f.appendChild(er);
  var b=el("button",null,T.btn.order);b.type="submit";f.appendChild(b);
  f.onsubmit=function(e){e.preventDefault();var v=clean(o.value,40);if(v.length<4){er.style.display="block";return}
    f.classList.add("sent");if(/^\d/.test(v))v="#"+v;say(v,"me");
    var d=new Date();d.setDate(d.getDate()+2);if(d.getDay()===0)d.setDate(d.getDate()+1);if(d.getDay()===6)d.setDate(d.getDate()+2);
    botReply(u(T.orderOk,{O:v,D:T.dayfmt(d,T.days,T.mon)}),function(){sys(T.orderSys);
      setTimeout(function(){botReply(T.orderStill,function(){chips([{label:T.yes,fn:function(l){say(l,"me");botReply(T.yesA,suggest,600)}},{label:T.no,fn:function(l){say(l,"me");handoff(T.rUser)}}])},700)},500)},1100);
  };
  box.appendChild(f);scroll();setTimeout(function(){try{o.focus({preventScroll:true})}catch(_){}},50);
}
function form(kind,slot){
  var f=el("form","mini");f.noValidate=true;f.appendChild(el("b",null,T.titles[kind]));
  var n=el("input");n.placeholder=T.name;n.setAttribute("aria-label",T.name);n.autocomplete="name";
  var c=el("input");c.placeholder=T.reach;c.setAttribute("aria-label",T.reach);
  f.appendChild(n);f.appendChild(c);
  var d=null;if(kind==="quote"){d=el("textarea");d.placeholder=T.desc;d.setAttribute("aria-label",T.descL);f.appendChild(d)}
  var er=el("div","err",T.err);f.appendChild(er);
  var b=el("button",null,T.btn[kind]||T.btn.contact);b.type="submit";f.appendChild(b);
  f.onsubmit=function(e){e.preventDefault();
    if(!n.value.trim()||c.value.trim().length<5){er.style.display="block";return}
    f.classList.add("sent");var name=n.value.trim().split(" ")[0];
    var msg=kind==="book"?u(T.okBook,{N:name,S:slot.day+T.at+slot.time}):kind==="quote"?u(T.okQuote,{N:name}):u(T.okContact,{N:name});
    say(msg).classList.add("ok");sys(u(T.sysForm));
    setTimeout(function(){botReply(T.more,suggest,700)},700);
  };
  box.appendChild(f);scroll();setTimeout(function(){try{n.focus({preventScroll:true})}catch(_){}},50);
}

/* typed input */
function norm(s){return s.toLowerCase().replace(/[?!.,:;¿¡]/g," ")}
function score(text,kws){var s=0;kws.forEach(function(k){if(text.indexOf(k)!==-1)s+=k.length>3?2:1});return s}
function global(g){
  if(g.act==="human"){if(D.handoff)handoff(T.rUser);else botReply(u(T.humanA),function(){action("contact")});return}
  if(g.act==="book"){botReply(g.r,function(){action("book")},600);return}
  if(g.act==="quote"){botReply(u(g.r),function(){action("quote")});return}
  botReply(u(g.r),suggest);
}
$("#form").onsubmit=function(e){
  e.preventDefault();var v=clean(inp.value,300);if(!v||busy)return;inp.value="";
  say(v,"me");var text=" "+norm(v)+" ";
  var best=-1,bs=0;D.qs.forEach(function(q,i){var s=score(text,q.kw);if(s>bs){bs=s;best=i}});
  if(best>=0&&bs>=2){answered[best]=1;run(D.qs[best]);return}
  for(var i=0;i<T.g.length;i++){if(score(text,T.g[i].kw)>0){global(T.g[i]);return}}
  if(best>=0){answered[best]=1;run(D.qs[best]);return}
  if(D.handoff){botReply(T.fbHand,function(){handoff(T.rLow)},900);return}
  botReply(u(T.fbUnsure),function(){chips([{label:T.fbYes,fn:function(l){say(l,"me");botReply(T.fbGreat,function(){action("contact")},500)}},{label:T.fbShow,fn:function(l){say(l,"me");botReply(T.fbHere,suggest,500)}}])});
};

/* start */
sys(T.today);
botReply(t(D.greet),function(){botReply(T.prompt,suggest,700)},700);
})();
