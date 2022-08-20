import { EntidadeBase } from "../../shared/Entidade.model";

export class Contato extends EntidadeBase{
  public nome : string;
  public email : string;
  public cargo : string;
  public empresa: string;
  public telefone:string;

  constructor(nome : string,email:string,cargo:string,empresa:string,telefone:string,id?:string){
    super();

    if(id){
      this.id = id;
    }
    
    this.nome = nome;
    this.email= email;
    this.telefone=telefone;
    this.empresa=empresa;
    this.cargo=cargo;
  }
}