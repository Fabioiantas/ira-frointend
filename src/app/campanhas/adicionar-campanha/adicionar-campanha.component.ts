import { DialogBoxService } from './../../_services/dialog-box.service';
import { CampanhaService } from './../../services/campanha.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adicionar-campanha',
  templateUrl: './adicionar-campanha.component.html',
  styleUrls: ['./adicionar-campanha.component.sass']
})
export class AdicionarCampanhaComponent implements OnInit {

  formGroup = new FormGroup({
    idCampanha: new FormControl(null),
    nmCampanha: new FormControl('', Validators.required),
    descCampanha: new FormControl('', Validators.required),
    dtIniProgramacao: new FormControl('', Validators.required),
    dtFimProgramacao: new FormControl('', Validators.required),
    dtIniVigencia: new FormControl('', Validators.required),
    dtFimVigencia: new FormControl('', Validators.required),
    dtIniRetirada: new FormControl('', Validators.required),
    dtFimRetirada: new FormControl('', Validators.required)
  });
  params: any;

  constructor(private campanhaService: CampanhaService, private dialogBox: DialogBoxService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });

    if (this.params.id) {
      this.campanhaService.getById(this.params.id).subscribe( campanha => {
        this.formGroup.patchValue({
          idCampanha: campanha.idCampanha,
          nmCampanha: campanha.nmCampanha,
          descCampanha: campanha.descCampanha,
          dtIniProgramacao: new Date(campanha.dtIniProgramacao),
          dtFimProgramacao: new Date(campanha.dtFimProgramacao),
          dtIniVigencia: new Date(campanha.dtIniVigencia),
          dtFimVigencia: new Date(campanha.dtFimVigencia),
          dtIniRetirada: new Date(campanha.dtIniRetirada),
          dtFimRetirada: new Date(campanha.dtFimRetirada)
        });
      });
    }
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  salvar() {
    if (!this.formGroup.valid) { return; }

    this.campanhaService[this.formGroup.value.idCampanha ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Campanha salva com sucesso!', 'OK');
      this.router.navigate(['/campanha']);
    });
  }

  handleReset() {
    this.formGroup.reset();
    this.router.navigate(['/campanha']);
  }

}
