export class ChangePasswordDto {
    contrasenya: string;
    confirmarContrasenya: string;
    tokenContrasenya: string | null;
  
      constructor(contrasenya: string, confirmarContrasenya: string, tokenContrasenya: string | null) {
          this.contrasenya = contrasenya;
          this.confirmarContrasenya = confirmarContrasenya;
          this.tokenContrasenya = tokenContrasenya;
      }
  }