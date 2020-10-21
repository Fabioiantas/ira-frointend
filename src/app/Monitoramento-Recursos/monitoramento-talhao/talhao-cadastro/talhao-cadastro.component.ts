import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-talhao-cadastro',
  templateUrl: './talhao-cadastro.component.html',
  styleUrls: ['./talhao-cadastro.component.sass']
})
export class TalhaoCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_talhao: new FormControl('', Validators.required),
    qt_area_agricultavel: new FormControl(''),
    ie_situacao: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }



}
