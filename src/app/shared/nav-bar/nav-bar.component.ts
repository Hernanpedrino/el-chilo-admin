import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logOut(){
    Swal.fire({
      title: 'Cerrar sesion?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Salir',
    }).then((result)=>{
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl('/login')
      } else {
        return;
      }
    })
  }

}
