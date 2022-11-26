export class CustomError extends Error {
  constructor(public statusCode: number, message: string){
      super(message)
  }
}

export class InvalidName extends CustomError{ 
  constructor(){
      super(400, "Nome inválido")
  }
}

export class InvalidEmail extends CustomError{ 
  constructor(){
      super(400, "Email inválido")
  }
}

export class InvalidPassword extends CustomError{ 
  constructor(){
      super(400, "Senha inválida")
  }
}

export class Unauthorized extends CustomError {
  constructor(){
    super(401, "Não autorizado")
  }
}