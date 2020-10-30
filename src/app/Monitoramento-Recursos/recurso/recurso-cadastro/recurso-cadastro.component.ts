import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';

import { RecursoServiceService } from 'src/app/services/recurso-service.service';
import { Recurso } from 'src/app/models/recurso';

@Component({
  selector: 'app-recurso-cadastro',
  templateUrl: './recurso-cadastro.component.html',
  styleUrls: ['./recurso-cadastro.component.sass']
})
export class RecursoCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_recurso: new FormControl('', Validators.required),
    ds_recurso: new FormControl('', Validators.required)
  });

  recurso: Recurso = new Recurso();
  params: any;
  isLoading: any = false;

  id: any;
  nmRecurso: any;
  dsRecurso: any;

  registro: any;
  constructor(private recursoService: RecursoServiceService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.recursoService.getById(this.params.id).subscribe(recurso => {
        this.recurso = recurso;
        this.formGroup.patchValue({
          id: recurso.id,
          nm_recurso: recurso.nm_recurso,
          ds_recurso: recurso.ds_recurso
        });
      });
    }

  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.recursoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Recurso salvo com sucesso!', 'OK');
      this.router.navigate(['/recurso']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/recurso']);
  }

}
