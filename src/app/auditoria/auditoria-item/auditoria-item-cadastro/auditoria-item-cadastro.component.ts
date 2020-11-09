import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaItem } from 'src/app/models/auditoriaItem';
import { AuditoriaItemService } from 'src/app/services/auditoria/auditoria-item.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-auditoria-item-cadastro',
  templateUrl: './auditoria-item-cadastro.component.html',
  styleUrls: ['./auditoria-item-cadastro.component.sass']
})
export class AuditoriaItemCadastroComponent implements OnInit {

  // --pagecad
  formGroup = new FormGroup({
    id: new FormControl(''),
    ds_item: new FormControl('', Validators.required),
    ie_situacao: new FormControl('', Validators.required)
  });

  auditoriaItem: AuditoriaItem = new AuditoriaItem();
  params: any;
  isLoading: any = false;

  id: any;
  nmParametro: any;
  dsParametro: any;

  constructor(private auditoriaItemService: AuditoriaItemService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.formGroup.reset();
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.auditoriaItemService.getById(this.params.id).subscribe(auditoriaItem => {
        this.auditoriaItem = auditoriaItem;
        this.formGroup.patchValue({
          id: auditoriaItem.id,
          ds_item: auditoriaItem.ds_item,
          ie_situacao: auditoriaItem.ie_situacao
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    console.log(this.formGroup.value.id);

    this.auditoriaItemService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Item salvo com sucesso!', 'OK');
      this.router.navigate(['/auditoriaitem']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/auditoriaitem']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }
}
