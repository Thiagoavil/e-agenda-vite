var m=Object.defineProperty;var b=(a,e,t)=>e in a?m(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var c=(a,e,t)=>(b(a,typeof e!="symbol"?e+"":e,t),t);import"./modulepreload-polyfill.c7c6310f.js";/* empty css              */import{C as u}from"./contato.repository.Local-Storage.f37eb0c4.js";class h{constructor(e){c(this,"tabela");this.repositorioTarefas=e,this.configurarElementos(),this.atualizarTabela()}configurarElementos(){this.tabela=document.getElementById("tabela")}atualizarTabela(){const e=this.repositorioTarefas.selecionarTodos();let t=this.tabela.getElementsByTagName("tbody")[0];e.forEach(r=>{const l=t.insertRow();Object.values(r).forEach(o=>{const d=l.insertCell();d.innerText=o});const s=l.insertCell(),n=document.createElement("a");n.innerText="Editar",n.className="btn btn-primary me-2",n.addEventListener("click",()=>{const o=r.id;window.location.href=`contato.create.html?id=${o}`});const i=document.createElement("a");i.innerText="Excluir",i.className="btn btn-outline-warning",i.addEventListener("click",()=>{const o=r.id;this.repositorioTarefas.excluir(o),window.location.reload()}),s.appendChild(n),s.appendChild(i)})}}new h(new u);