import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Prioridade } from "./models/prioridade.enum";
import { Tarefa } from "./models/tarefa.model";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefa.repositoriy.Local-storage";

class TarefaPaginaCadastro implements IPaginaHTML,IPaginaFormulario{
  private txtDescricao:HTMLInputElement;
  private rdbPrioridade : HTMLInputElement;
  private btnSalvar:HTMLButtonElement;

  private idSelecionado:string;

  constructor(private repositorio:IRepositorio<Tarefa>,id?:string){
    
    this.configurarElementos();

    if(id){
      this.idSelecionado=id;

      const tarefaSelecionada = this.repositorio.selecionarPorId(this.idSelecionado);

      if(tarefaSelecionada){
        this.preencherFormulario(tarefaSelecionada);
      }
    }
    
  }
  private preencherFormulario(tarefaSelecionada: Tarefa) {
    this.txtDescricao.value = tarefaSelecionada.descricao;

    switch(tarefaSelecionada.prioridade){
      
      case Prioridade.Baixa:
        this.rdbPrioridade = document.querySelector("input[value='Baixa']") as HTMLInputElement;
        break;
      case Prioridade.Media:
        this.rdbPrioridade = document.querySelector("input[value='Média']") as HTMLInputElement;
        break;
      case Prioridade.Alta:
          this.rdbPrioridade = document.querySelector("input[value='Alta']") as HTMLInputElement;
          break;
    }

    this.rdbPrioridade.checked=true;
  }
  
  
  gravarRegistros(): void { 
    const tarefa = this.ObterDadosFormulario();

    if(!this.idSelecionado)
      this.repositorio.inserir(tarefa);
    else
      this.repositorio.editar(tarefa.id,tarefa);

    window.location.href = "tarefa.list.html";
  }

  private ObterDadosFormulario():Tarefa{
    const descricao = this.txtDescricao.value;
    const prioridade = this.ObterPrioridadeSelecionada();

    let tarefa = null;

    if(!this.idSelecionado)
      tarefa = new Tarefa(descricao,prioridade);
    else
     tarefa = new Tarefa(descricao,prioridade,this.idSelecionado);

    return tarefa;
  }

  ObterPrioridadeSelecionada():Prioridade {
    this.rdbPrioridade = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;

    return this.rdbPrioridade.value as Prioridade;
  }


  configurarElementos(): void {
    this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
    this.btnSalvar= document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click",(_evt)=> this.gravarRegistros());
  }
  
}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);