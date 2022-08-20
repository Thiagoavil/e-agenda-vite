import { GUID } from "./guid.mod.js";

export abstract class EntidadeBase{

  public id:string;

  constructor(){
    this.id = new GUID().gerarNovoId();
  }
}