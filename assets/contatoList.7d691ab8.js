var h=Object.defineProperty;var m=(o,t,e)=>t in o?h(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var c=(o,t,e)=>(m(o,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.c7c6310f.js";/* empty css              */class u{constructor(){c(this,"LocalStorage");c(this,"contatos");this.LocalStorage=window.localStorage,this.contatos=this.selecionarTodos()}excluir(t){this.contatos=this.contatos.filter(e=>e.id!==t),this.gravar()}editar(t,e){const a=this.contatos.findIndex(s=>s.id===t);this.contatos[a]={id:t,nome:e.nome,email:e.email,telefone:e.telefone,cargo:e.cargo,empresa:e.empresa},this.gravar()}gravar(){const t=JSON.stringify(this.contatos);this.LocalStorage.setItem("contatos",t)}inserir(t){this.contatos.push(t),this.gravar()}selecionarTodos(){const t=this.LocalStorage.getItem("contatos");return t?JSON.parse(t):[]}selecionarPorId(t){return this.contatos.find(e=>e.id===t)}}class g{constructor(t){c(this,"tabela");this.repositorioTarefas=t,this.configurarElementos(),this.atualizarTabela()}configurarElementos(){this.tabela=document.getElementById("tabela")}atualizarTabela(){const t=this.repositorioTarefas.selecionarTodos();let e=this.tabela.getElementsByTagName("tbody")[0];t.forEach(a=>{const s=e.insertRow();Object.values(a).forEach(n=>{const d=s.insertCell();d.innerText=n});const l=s.insertCell(),i=document.createElement("a");i.innerText="Editar",i.className="btn btn-primary me-2",i.addEventListener("click",()=>{const n=a.id;window.location.href=`contato.create.html?id=${n}`});const r=document.createElement("a");r.innerText="Excluir",r.className="btn btn-outline-warning",r.addEventListener("click",()=>{const n=a.id;this.repositorioTarefas.excluir(n),window.location.reload()}),l.appendChild(i),l.appendChild(r)})}}new g(new u);
