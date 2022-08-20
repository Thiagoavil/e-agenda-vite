export class GUID{
  
  gerarNovoId():string{
    const datestr = Date
    .now()
    .toString(36);

  const randomStr=Math
  .random()
  .toString(36)
  .substring(2, 8);

  return `${datestr}-${randomStr}`;
  }
}