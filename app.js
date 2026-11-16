'use strict';
const initial = [
  {"id": 1, "nome": "Mouse Gamer RGB", "categoria": "Periféricos", "preco": 79.9, "estoque": 12, "descricao": "Mouse USB com iluminação RGB.", "ativo": true},
  {"id": 2, "nome": "Teclado Mecânico", "categoria": "Periféricos", "preco": 189.9, "estoque": 8, "descricao": "Teclado confortável para estudar e jogar.", "ativo": true},
  {"id": 3, "nome": "Fone Bluetooth", "categoria": "Áudio", "preco": 129, "estoque": 15, "descricao": "Fone sem fio com microfone.", "ativo": true},
  {"id": 4, "nome": "Suporte para Notebook", "categoria": "Acessórios", "preco": 59.9, "estoque": 20, "descricao": "Suporte ajustável para notebook.", "ativo": true},
  {"id": 5, "nome": "Webcam Full HD", "categoria": "Acessórios", "preco": 149.9, "estoque": 6, "descricao": "Webcam para aulas e reuniões.", "ativo": true},
  {"id": 6, "nome": "Caixa de Som USB", "categoria": "Áudio", "preco": 89.9, "estoque": 10, "descricao": "Caixa de som compacta.", "ativo": true},
  {"id": 7, "nome": "Mouse Sem Fio Slim", "categoria": "Periféricos", "preco": 49.9, "estoque": 24, "descricao": "Mouse leve e confortável para o dia a dia.", "ativo": true},
  {"id": 8, "nome": "Teclado Compacto USB", "categoria": "Periféricos", "preco": 69.9, "estoque": 18, "descricao": "Teclado compacto com conexão USB.", "ativo": true},
  {"id": 9, "nome": "Mousepad Gamer XL", "categoria": "Periféricos", "preco": 45.9, "estoque": 30, "descricao": "Mousepad grande com base antiderrapante.", "ativo": true},
  {"id": 10, "nome": "Headset Gamer", "categoria": "Áudio", "preco": 159.9, "estoque": 11, "descricao": "Headset com microfone ajustável.", "ativo": true},
  {"id": 11, "nome": "Fone de Ouvido com Fio", "categoria": "Áudio", "preco": 39.9, "estoque": 26, "descricao": "Fone com entrada P2 e som estéreo.", "ativo": true},
  {"id": 12, "nome": "Mini Caixa Bluetooth", "categoria": "Áudio", "preco": 119.9, "estoque": 14, "descricao": "Caixa portátil com conexão Bluetooth.", "ativo": true},
  {"id": 13, "nome": "Hub USB 4 Portas", "categoria": "Acessórios", "preco": 54.9, "estoque": 22, "descricao": "Expanda as conexões USB do computador.", "ativo": true},
  {"id": 14, "nome": "Cabo USB-C 2 Metros", "categoria": "Acessórios", "preco": 29.9, "estoque": 40, "descricao": "Cabo reforçado para carregar e transferir dados.", "ativo": true},
  {"id": 15, "nome": "Carregador USB-C 20W", "categoria": "Acessórios", "preco": 79.9, "estoque": 20, "descricao": "Carregador compacto de 20 watts.", "ativo": true},
  {"id": 16, "nome": "Base Refrigerada Notebook", "categoria": "Acessórios", "preco": 109.9, "estoque": 12, "descricao": "Base com ventilação para notebooks.", "ativo": true},
  {"id": 17, "nome": "Luminária LED de Mesa", "categoria": "Escritório", "preco": 89.9, "estoque": 16, "descricao": "Luminária com ajuste de intensidade.", "ativo": true},
  {"id": 18, "nome": "Organizador de Cabos", "categoria": "Escritório", "preco": 24.9, "estoque": 35, "descricao": "Kit para organizar cabos na mesa.", "ativo": true},
  {"id": 19, "nome": "Suporte de Celular", "categoria": "Escritório", "preco": 34.9, "estoque": 28, "descricao": "Suporte ajustável para mesa.", "ativo": true},
  {"id": 20, "nome": "Pendrive 64 GB", "categoria": "Armazenamento", "preco": 49.9, "estoque": 23, "descricao": "Pendrive USB com capacidade de 64 GB.", "ativo": true},
  {"id": 21, "nome": "Cartão microSD 128 GB", "categoria": "Armazenamento", "preco": 89.9, "estoque": 17, "descricao": "Cartão de memória para dispositivos compatíveis.", "ativo": true},
  {"id": 22, "nome": "SSD Externo 500 GB", "categoria": "Armazenamento", "preco": 329.9, "estoque": 9, "descricao": "Unidade de armazenamento portátil USB.", "ativo": true},
  {"id": 23, "nome": "Adaptador USB-C para HDMI", "categoria": "Acessórios", "preco": 94.9, "estoque": 13, "descricao": "Adaptador para conectar monitor HDMI.", "ativo": true},
  {"id": 24, "nome": "Microfone USB de Mesa", "categoria": "Áudio", "preco": 139.9, "estoque": 10, "descricao": "Microfone USB para aulas e chamadas.", "ativo": true}
];

const KEY='techfacil_v2_';

function load(name,fallback){try{const raw=localStorage.getItem(KEY+name);return raw===null?structuredClone(fallback):JSON.parse(raw)}catch{return structuredClone(fallback)}}
let produtos = load('produtos', initial);
if (Array.isArray(produtos)) {
  const existingIds = new Set(produtos.map(produto => produto.id));
  initial.forEach(produto => {
    if (!existingIds.has(produto.id)) produtos.push({...produto});
  });
} else {
  produtos = structuredClone(initial);
}
let carrinho = load('carrinho', {});
let pedidos = load('pedidos', []);
const $ = id => document.getElementById(id);
const money = n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function save(){localStorage.setItem(KEY+'produtos',JSON.stringify(produtos));localStorage.setItem(KEY+'carrinho',JSON.stringify(carrinho));localStorage.setItem(KEY+'pedidos',JSON.stringify(pedidos))}

function show(view){document.querySelectorAll('.view').forEach(e=>e.classList.toggle('hidden',e.id!==view));render()}

document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>show(b.dataset.view));

function render(){renderLoja();renderCarrinho();renderPedidos();renderAdmin();$('count').textContent=Object.values(carrinho).reduce((a,b)=>a+b,0)}


function renderLoja(){let cats=[...new Set(produtos.filter(p=>p.ativo).map(p=>p.categoria))].sort();let selected=$('categoria').value;$('categoria').innerHTML='<option value="">Todas as categorias</option>'+cats.map(c=>`<option value="${safe(c)}">${safe(c)}</option>`).join('');$('categoria').value=cats.includes(selected)?selected:'';let q=$('busca').value.toLowerCase(),c=$('categoria').value;let list=produtos.filter(p=>p.ativo&&(!c||p.categoria===c)&&(!q||(p.nome+' '+p.descricao).toLowerCase().includes(q)));$('produtos').innerHTML=list.map(p=>`<article class="card"><div class="emoji">${p.categoria==='Áudio'?'🎧':p.categoria==='Periféricos'?'⌨️':p.categoria==='Armazenamento'?'💾':p.categoria==='Escritório'?'🖥️':'💻'}</div><h3>${safe(p.nome)}</h3><div class="muted">${safe(p.categoria)}</div><p>${safe(p.descricao)}</p><p class="price">${money(p.preco)}</p><p class="small">Estoque: ${p.estoque}</p><button class="primary" data-add="${p.id}" ${p.estoque===0?'disabled':''}>${p.estoque?'Adicionar ao carrinho':'Esgotado'}</button></article>`).join('')||'<p>Nenhum produto encontrado.</p>';$('produtos').querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(Number(b.dataset.add)))}

$('busca').oninput=renderLoja;$('categoria').onchange=renderLoja;

function add(id){let p=produtos.find(x=>x.id===id);if(!p||!p.ativo)return;if((carrinho[id]||0)>=p.estoque)return alert('Quantidade maior que o estoque.');carrinho[id]=(carrinho[id]||0)+1;save();render();alert('Produto adicionado ao carrinho!')}

function setQty(id,n){let p=produtos.find(x=>x.id===id);if(!p)return;let qty=Math.max(0,Math.min(p.estoque,Math.floor(Number(n)||0)));if(qty)carrinho[id]=qty;else delete carrinho[id];save();render()}


function renderCarrinho(){let lines=Object.entries(carrinho).map(([id,q])=>({p:produtos.find(x=>x.id===Number(id)),q,id})).filter(x=>x.p);let total=lines.reduce((a,{p,q})=>a+p.preco*q,0);$('itensCarrinho').innerHTML=lines.map(({p,q,id})=>`<div class="cartline"><div><strong>${safe(p.nome)}</strong><br>${money(p.preco)} cada</div><div>Qtd. <input aria-label="Quantidade" type="number" min="0" max="${p.estoque}" value="${q}" data-qty="${id}"></div><strong>${money(p.preco*q)}</strong><button data-remove="${id}">Remover</button></div>`).join('')||'<p>Seu carrinho está vazio.</p>';$('total').textContent='Total: '+money(total);document.querySelectorAll('[data-qty]').forEach(e=>e.onchange=()=>setQty(e.dataset.qty,e.value));document.querySelectorAll('[data-remove]').forEach(e=>e.onclick=()=>setQty(e.dataset.remove,0))}

$('finalizar').onclick=()=>{let nome=$('cliente').value.trim();if(nome.length<2)return alert('Informe o nome do cliente.');let lines=Object.entries(carrinho).map(([id,q])=>({p:produtos.find(x=>x.id===Number(id)),q}));if(!lines.length)return alert('O carrinho está vazio.');if(lines.some(({p,q})=>!p||!p.ativo||q>p.estoque||q<1))return alert('Estoque insuficiente ou produto indisponível.');let itens=lines.map(({p,q})=>({produtoId:p.id,nome:p.nome,quantidade:q,precoUnitario:p.preco}));let pedido={id:pedidos.reduce((a,p)=>Math.max(a,p.id),0)+1,cliente:nome,data:new Date().toISOString(),pagamento:$('pagamento').value,itens,total:itens.reduce((a,i)=>a+i.quantidade*i.precoUnitario,0)};lines.forEach(({p,q})=>p.estoque-=q);pedidos.push(pedido);carrinho={};save();render();alert('Pedido #'+pedido.id+' confirmado! Pedido registrado com sucesso.');show('pedidos')};

function renderPedidos(){$('listaPedidos').innerHTML=pedidos.slice().reverse().map(p=>`<article class="order"><h3>Pedido #${p.id} — ${money(p.total)}</h3><p>${safe(p.cliente)} | ${new Date(p.data).toLocaleString('pt-BR')} | ${safe(p.pagamento)}</p><ul>${p.itens.map(i=>`<li>${safe(i.nome)} — ${i.quantidade} × ${money(i.precoUnitario)}</li>`).join('')}</ul></article>`).join('')||'<p>Nenhum pedido realizado ainda.</p>'}

function clearForm(){$('produtoForm').reset();$('editId').value='';$('formTitle').textContent='Cadastrar produto'}

$('cancelar').onclick=clearForm;

$('produtoForm').onsubmit=e=>{e.preventDefault();let id=Number($('editId').value),nome=$('nome').value.trim(),categoria=$('cat').value.trim(),preco=Number($('preco').value),estoque=Number($('estoque').value),descricao=$('descricao').value.trim();if(!nome||!categoria||!Number.isFinite(preco)||preco<=0||!Number.isInteger(estoque)||estoque<0)return alert('Preencha os campos corretamente.');if(id){let p=produtos.find(p=>p.id===id);if(p)Object.assign(p,{nome,categoria,preco,estoque,descricao})}else produtos.push({id:Math.max(0,...produtos.map(p=>p.id))+1,nome,categoria,preco,estoque,descricao,ativo:true});clearForm();save();render()};

function renderAdmin(){$('adminProdutos').innerHTML=produtos.map(p=>`<div class="adminline"><div><strong>${safe(p.nome)}</strong> — ${money(p.preco)} — Estoque ${p.estoque} ${p.ativo?'':'(desativado)'}</div><div class="actions"><button data-edit="${p.id}">Editar</button><button data-toggle="${p.id}">${p.ativo?'Desativar':'Ativar'}</button></div></div>`).join('');document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{let p=produtos.find(p=>p.id===Number(b.dataset.edit));$('editId').value=p.id;$('nome').value=p.nome;$('cat').value=p.categoria;$('preco').value=p.preco;$('estoque').value=p.estoque;$('descricao').value=p.descricao;$('formTitle').textContent='Editar produto';window.scrollTo({top:0,behavior:'smooth'})});document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=()=>{let p=produtos.find(p=>p.id===Number(b.dataset.toggle));p.ativo=!p.ativo;save();render()})}

function csv(rows,columns){let cell=x=>'"'+String(x??'').replace(/"/g,'""')+'"';return '\ufeff'+[columns.join(';'),...rows.map(row=>columns.map(c=>cell(row[c])).join(';'))].join('\r\n')}

function download(name,content){let url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}

$('exportProdutos').onclick=()=>download('produtos.csv',csv(produtos,['id','nome','categoria','preco','estoque','descricao','ativo']));

$('exportPedidos').onclick=()=>download('pedidos.csv',csv(pedidos.map(({id,cliente,data,pagamento,total})=>({id,cliente,data,pagamento,total})),['id','cliente','data','pagamento','total']));

$('exportItens').onclick=()=>download('itens_pedido.csv',csv(pedidos.flatMap(p=>p.itens.map(i=>({pedidoId:p.id,...i}))),['pedidoId','produtoId','nome','quantidade','precoUnitario']));

function parseCSV(text){text=text.replace(/^\ufeff/,'');let rows=[],row=[],field='',quoted=false;for(let i=0;i<text.length;i++){let c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++}else quoted=!quoted}else if(c===';'&&!quoted){row.push(field);field=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(x=>x!==''))rows.push(row);row=[];field=''}else field+=c}if(quoted)throw Error('Aspas não fechadas no CSV.');row.push(field);if(row.some(x=>x!==''))rows.push(row);return rows}

$('importProdutos').onchange=async e=>{let file=e.target.files[0];if(!file)return;try{let rows=parseCSV(await file.text()),header=rows.shift(),expected=['id','nome','categoria','preco','estoque','descricao','ativo'];if(header.join('|')!==expected.join('|'))throw Error('Cabeçalho incompatível.');let list=rows.map(r=>{if(r.length!==7)throw Error('Linha com quantidade errada de colunas.');return{id:Number(r[0]),nome:r[1],categoria:r[2],preco:Number(r[3]),estoque:Number(r[4]),descricao:r[5],ativo:r[6]==='true'}});if(list.some(p=>!Number.isInteger(p.id)||p.id<1||!p.nome||!p.categoria||!Number.isFinite(p.preco)||p.preco<=0||!Number.isInteger(p.estoque)||p.estoque<0)||new Set(list.map(p=>p.id)).size!==list.length)throw Error('Dados inválidos.');if(confirm('Substituir todos os produtos pelos dados do CSV?')){produtos=list;carrinho={};save();render();alert('Importação concluída!')}}catch(err){alert('Erro ao importar: '+err.message)}e.target.value=''};

$('reset').onclick=()=>{if(confirm('Apagar pedidos e restaurar produtos?')){produtos=structuredClone(initial);carrinho={};pedidos=[];save();clearForm();render()}};

render();
