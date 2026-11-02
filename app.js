const money=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const avg=a=>a.reduce((s,x)=>s+x.valor,0)/a.length;
const combustiveis=[...new Set(dados.map(x=>x.combustivel))];
const postos=[...new Set(dados.map(x=>x.posto))];
const bairros=[...new Set(dados.map(x=>x.bairro))];

document.querySelector("#cards").innerHTML=
`<div class="card"><small>Postos</small><strong>${postos.length}</strong></div>
<div class="card"><small>Combustíveis</small><strong>${combustiveis.length}</strong></div>
<div class="card"><small>Registros</small><strong>${dados.length}</strong></div>
<div class="card"><small>Bairros</small><strong>${bairros.length}</strong></div>`;

const mediasC=combustiveis.map(c=>avg(dados.filter(x=>x.combustivel===c)));
new Chart(document.getElementById("porCombustivel"),{
type:"bar",data:{labels:combustiveis,datasets:[{label:"Preço médio",data:mediasC}]},
options:{responsive:true,maintainAspectRatio:false,scales:{y:{ticks:{callback:v=>money(v)}}},
plugins:{tooltip:{callbacks:{label:c=>" "+money(c.raw)}}}}});

const mediasP=postos.map(p=>avg(dados.filter(x=>x.posto===p)));
new Chart(document.getElementById("porPosto"),{
type:"bar",data:{labels:postos,datasets:[{label:"Preço médio",data:mediasP}]},
options:{responsive:true,maintainAspectRatio:false,scales:{y:{ticks:{callback:v=>money(v)}}},
plugins:{tooltip:{callbacks:{label:c=>" "+money(c.raw)}}}}});

const tbody=document.querySelector("#tabela");
dados.forEach(x=>{const tr=document.createElement("tr");tr.innerHTML=
`<td>${x.posto}</td><td>${x.bairro}</td><td>${x.combustivel}</td><td>${money(x.valor)}</td><td>${new Date(x.data+"T00:00:00").toLocaleDateString("pt-BR")}</td>`;tbody.appendChild(tr)});