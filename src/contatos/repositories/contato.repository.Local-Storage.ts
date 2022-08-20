import { IRepositorio } from "../../shared/repositorio.interface";
import { IRepositorioSerializavel } from "../../shared/repository-serializavel.interface";
import { Contato } from "../models/contato.model";



export class ContatoRepositoryLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel{
  private readonly LocalStorage:Storage;
  private contatos:Contato[];
  
  constructor(){
    this.LocalStorage=window.localStorage;

    this.contatos=this.selecionarTodos();
  }


  excluir(id: string): void {
    this.contatos = this.contatos.filter(x=>x.id !== id);

    this.gravar();
  }


  editar(id: string, registroEditado: Contato): void {
   const indexSelecionado = this.contatos.findIndex(x=>x.id===id);

   this.contatos[indexSelecionado] ={
    id:id,
    nome:registroEditado.nome,
    email:registroEditado.email,
    telefone:registroEditado.telefone,
    cargo:registroEditado.cargo,
    empresa:registroEditado.empresa
   }

   this.gravar();
  }
  
  
  public gravar(): void {
    const contatosJasonString =JSON.stringify(this.contatos);
    
    this.LocalStorage.setItem("contatos",contatosJasonString);
  }
  
  public inserir(registro: Contato): void {
    this.contatos.push(registro);
    this.gravar();
  }
  
  
  public selecionarTodos(): Contato[] {
    const dados = this.LocalStorage.getItem("contatos");
    
    if(!dados)
    return[];
    
    return JSON.parse(dados);
  }
  
  public selecionarPorId(id: string): Contato | undefined {
    return this.contatos.find(x=>x.id===id);
  }
  
}