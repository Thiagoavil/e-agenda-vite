import { EntidadeBase } from "../../shared/Entidade.model";
import { Prioridade } from "./prioridade.enum";

export class Tarefa extends EntidadeBase{
  public descricao : string;
  public dataCriacao : Date;
  public prioridade : Prioridade;
  public dataConclusao? : Date;

  constructor(descricao : string,prioridade:Prioridade,id?:string){
    super();

    if(id){
      this.id = id;
    }
    
    this.descricao = descricao;
    this.dataCriacao= new Date();
    this.prioridade=prioridade;

  }
}