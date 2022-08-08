import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {

  public listas = [
    {
        "_id": "6268399f5b9fcdc8f412dc2e",
        "categoria": "cuchillos",
        "url": "https://res.cloudinary.com/hernanpedrino/image/upload/v1650997663/listas/cuchillos.pdf",
        "createdAt": "2022-04-26T18:27:43.565Z",
        "updatedAt": "2022-04-26T18:27:43.565Z"
    },
    {
        "_id": "62683a7cf8d90224046a3370",
        "categoria": "cuchillos-eskiltuna",
        "url": "https://res.cloudinary.com/hernanpedrino/image/upload/v1650997884/listas/cuchillos-eskiltuna.pdf",
        "createdAt": "2022-04-26T18:31:24.594Z",
        "updatedAt": "2022-04-26T18:31:24.594Z"
    },
    {
        "_id": "62bcb3097b041f14a8c22dcb",
        "categoria": "aditivos",
        "url": "https://res.cloudinary.com/hernanpedrino/image/upload/v1656533769/listas/aditivos.pdf",
        "createdAt": "2022-06-29T20:16:09.585Z",
        "updatedAt": "2022-06-29T20:16:09.585Z"
    },
    {
        "_id": "62bcc5ed7b041f14a8c22dee",
        "categoria": "especias",
        "url": "https://res.cloudinary.com/hernanpedrino/image/upload/v1656538605/listas/especias.pdf",
        "createdAt": "2022-06-29T21:36:45.441Z",
        "updatedAt": "2022-06-29T21:36:45.441Z"
    }
]

  constructor() { }

  ngOnInit(): void {
  }

}
