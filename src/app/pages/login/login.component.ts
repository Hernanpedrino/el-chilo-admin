import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import Swal from 'sweetalert2'

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
    Swal.showLoading();
    const{ email, password } = this.formLogin.value;
    this.datosService.loginUser(email!, password!)
    .subscribe((resp:any)=>{
      if (resp) {
        const token = resp.token;
        const userId = resp.usuario._id;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        Swal.hideLoading();
        Swal.fire({
          title:'Bienvenido',
          icon: 'success'
        });
        this.router.navigateByUrl('/home');
      }
    }, ()=>{
      Swal.fire({
        title: 'Error',
        text: 'Usuario o password incorrecto',
        icon: 'error'
      })
    });
  }
}