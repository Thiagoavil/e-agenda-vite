import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./models/contato.model";
import { ContatoRepositoryLocalStorage } from "./repositories/contato.repository.Local-Storage";


class TarefaPaginaCadastro implements IPaginaHTML,IPaginaFormulario{
  private txtnome:HTMLInputElement;
  private txtemail:HTMLInputElement;
  private txttelefone:HTMLInputElement;
  private txtempresa:HTMLInputElement;
  private txtcargo:HTMLInputElement;
  private btnSalvar:HTMLButtonElement;

  private idSelecionado:string;

  constructor(private repositorio:IRepositorio<Contato>,id?:string){
    
    this.configurarElementos();

    if(id){
      this.idSelecionado=id;

      const ContatoSelecionado = this.repositorio.selecionarPorId(this.idSelecionado);

      if(ContatoSelecionado){
        this.preencherFormulario(ContatoSelecionado);
      }
    }
    
  }
  private preencherFormulario(ContatoSelecionado: Contato) {
    this.txtnome.value = ContatoSelecionado.nome;
    this.txtemail.value = ContatoSelecionado.email;
    this.txttelefone.value = ContatoSelecionado.telefone;
    this.txtempresa.value = ContatoSelecionado.empresa;
    this.txtcargo.value = ContatoSelecionado.cargo;
  }
  
  
  gravarRegistros(): void { 
    const contato = this.ObterDadosFormulario();

    if(!this.idSelecionado)
      this.repositorio.inserir(contato);
    else
      this.repositorio.editar(contato.id,contato);

    window.location.href = "contato.list.html";
  }

  private ObterDadosFormulario():Contato{
    const nome = this.txtnome.value;
    const email = this.txtemail.value;
    const telefone = this.txttelefone.value;
    const empresa = this.txtempresa.value;
    const cargo = this.txtcargo.value;

    let contato = null;

    if(!this.idSelecionado)
      contato = new Contato(nome,email,telefone,empresa,cargo);
    else
     contato = new Contato(nome,email,telefone,empresa,cargo,this.idSelecionado);

    return contato;
  }

  configurarElementos(): void {
    this.txtnome = document.getElementById("txtnome") as HTMLInputElement;
    this.txtemail = document.getElementById("txtemail") as HTMLInputElement;
    this.txttelefone = document.getElementById("txttelefone") as HTMLInputElement;
    this.txtempresa = document.getElementById("txtempresa") as HTMLInputElement;
    this.txtcargo = document.getElementById("txtcargo") as HTMLInputElement;
    this.btnSalvar= document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click",(_evt)=> this.gravarRegistros());
  }
  
}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TarefaPaginaCadastro(new ContatoRepositoryLocalStorage(), id);