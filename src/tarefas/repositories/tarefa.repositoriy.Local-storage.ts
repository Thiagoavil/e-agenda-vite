import { IRepositorio } from "../../shared/repositorio.interface";
import { IRepositorioSerializavel } from "../../shared/repository-serializavel.interface";
import { Tarefa } from "../models/tarefa.model";

export class TarefaRepositoryLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel{
  private readonly LocalStorage:Storage;
  private tarefas:Tarefa[];
  
  constructor(){
    this.LocalStorage=window.localStorage;

    this.tarefas=this.selecionarTodos();
  }


  excluir(id: string): void {
    this.tarefas = this.tarefas.filter(x=>x.id !== id);

    this.gravar();
  }


  editar(id: string, registroEditado: Tarefa): void {
   const indexSelecionado = this.tarefas.findIndex(x=>x.id===id);

   this.tarefas[indexSelecionado] ={
    id:id,
    descricao:registroEditado.descricao,
    dataCriacao:registroEditado.dataCriacao,
    prioridade:registroEditado.prioridade
   }

   this.gravar();
  }
  
  
  public gravar(): void {
    const tarefasJasonString =JSON.stringify(this.tarefas);
    
    this.LocalStorage.setItem("tarefas",tarefasJasonString);
  }
  
  public inserir(registro: Tarefa): void {
    this.tarefas.push(registro);
    this.gravar();
  }
  
  
  public selecionarTodos(): Tarefa[] {
    const dados = this.LocalStorage.getItem("tarefas");
    
    if(!dados)
    return[];
    
    return JSON.parse(dados);
  }
  
  public selecionarPorId(id: string): Tarefa | undefined {
    return this.tarefas.find(x=>x.id===id);
  }
  
}