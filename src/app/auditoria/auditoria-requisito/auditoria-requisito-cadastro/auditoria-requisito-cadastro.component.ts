import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaItem } from 'src/app/models/auditoriaItem';
import { AuditoriaRequisito } from 'src/app/models/auditoriaRequisito';
import { AuditoriaItemService } from 'src/app/services/auditoria/auditoria-item.service';
import { AuditoriaRequisitoService } from 'src/app/services/auditoria/auditoria-requisito.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-requisito-cadastro',
  templateUrl: './auditoria-requisito-cadastro.component.html',
  styleUrls: ['./auditoria-requisito-cadastro.component.sass']
})
export class AuditoriaRequisitoCadastroComponent implements OnInit {

  // --pagecad
  formGroup = new FormGroup({
    id: new FormControl(''),
    auditoria_item_id: new FormControl('', Validators.required),
    ds_requisito: new FormControl('', Validators.required)
  });

  auditoriaRequisito: AuditoriaRequisito = new AuditoriaRequisito();
  auditoriaItem: AuditoriaItem = new AuditoriaItem();
  listAuditoriaItem: any;
  params: any;
  isLoading: any = false;

  constructor(private auditoriaRequisitoService: AuditoriaRequisitoService,
              private auditoriaItemService: AuditoriaItemService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.formGroup.reset();
    this.getItens();
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.auditoriaRequisitoService.getById(this.params.id).subscribe(auditoriaRequisito => {
        this.auditoriaRequisito = auditoriaRequisito;
        this.auditoriaItem.id = this.auditoriaRequisito.auditoria_item_id;
        this.formGroup.patchValue({
          id: auditoriaRequisito.id,
          auditoria_item_id: auditoriaRequisito.auditoria_item_id,
          ds_requisito: auditoriaRequisito.ds_requisito
        });
      });
    }
  }

  getItens() {
    this.auditoriaItemService.list().subscribe((data: any) => {
      this.listAuditoriaItem = data;
    });
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.auditoriaRequisitoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Requisito salvo com sucesso, continuar cadastrando?', 'CONFIRM').then(sim => {
        if (sim) {
          this.formGroup.reset();
          this.changeItem();
        } else {
          this.router.navigate(['/auditoriarequisito']);
        }
      });
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/auditoriarequisito']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  changeItem() {
    this.formGroup.patchValue({
      auditoria_item_id: this.auditoriaItem.id
    });
  }

}
