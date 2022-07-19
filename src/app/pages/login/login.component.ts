import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private datosService: DatosService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginFormSubmit(){
    const{ email, password } = this.formLogin.value;
    this.datosService.loginUser(email!, password!)
    .subscribe((resp:any)=>{
      if (resp) {
        const token = resp.token;
        const userId = resp.usuario._id;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        this.router.navigateByUrl('/home');
      }
  
      
    }, err=>{
      //TODO: Mostrar un loading o los errores con sweet alert
      console.log(err);
    });
  }
}
//TODO: Mostrar validaciones visuales en los campos cuando hay error.