import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecursoServiceService } from 'src/app/services/recurso-service.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recurso-cadastro',
  templateUrl: './recurso-cadastro.component.html',
  styleUrls: ['./recurso-cadastro.component.sass']
})
export class RecursoCadastroComponent implements OnInit {
   formGroup = new FormGroup({
    nm_recurso: new FormControl('', Validators.required),
    ds_recurso: new FormControl('', Validators.required)
  });

  params: any;
  isLoading: any = false;
  constructor(private recursoService: RecursoServiceService, private dialogBox: DialogBoxService,
    private route: ActivatedRoute, private router: Router) {
}

  ngOnInit() {
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

}
