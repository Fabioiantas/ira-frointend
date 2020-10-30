import { Component, OnInit } from '@angular/core';
import { OrgaoService } from 'src/app/services/orgao.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Orgao } from 'src/app/models/orgao';

@Component({
  selector: 'app-orgao-responsavel-cadastro',
  templateUrl: './orgao-responsavel-cadastro.component.html',
  styleUrls: ['./orgao-responsavel-cadastro.component.sass']
})
export class OrgaoResponsavelCadastroComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl(''),
    nm_orgao: new FormControl('', Validators.required),
    sg_orgao: new FormControl('', Validators.required),
    nm_esfera: new FormControl('', Validators.required),
    sg_estado: new FormControl('', Validators.required)
  });

  orgao: Orgao = new Orgao();
  params: any;
  isLoading: any = false;

  id: any;
  nmOrgao: any;
  sgOrgao: any;
  nmEsfera: any;
  sgEstado: any;

  constructor(private orgaoService: OrgaoService,
              private dialogBox: DialogBoxService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (this.params.id) {
      this.orgaoService.getById(this.params.id).subscribe(orgao => {
        this.orgao = orgao;
        this.formGroup.patchValue({
          id: orgao.id,
          nmOrgao: orgao.nm_orgao,
          sgOrgao: orgao.sg_orgao,
          nmEsfera: orgao.nm_esfera,
          sgEstado: orgao.sg_estado
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.orgaoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Orgão salvo com sucesso!', 'OK');
      this.router.navigate(['/orgao']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/orgao']);
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

}
