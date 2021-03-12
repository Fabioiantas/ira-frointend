import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterTalhao } from 'src/app/models/filtertalhao';
import { DataService } from 'src/app/services/data.service';
import { PropriedadeService } from 'src/app/services/propriedade.service';
import { TalhaoService } from 'src/app/services/talhao.service';
import { DialogBoxService } from 'src/app/_services/dialog-box.service';

@Component({
  selector: 'app-talhao-cadastro',
  templateUrl: './talhao-cadastro.component.html',
  styleUrls: ['./talhao-cadastro.component.sass']
})
export class TalhaoCadastroComponent implements OnInit {

  propriedade: any;
  filter: any;
  params: any;
  isLoading = false;

  formGroup = new FormGroup({
    id: new FormControl(''),
    propriedade_id: new FormControl('',Validators.required),
    nm_talhao: new FormControl('', Validators.required),
    qt_area_agricultavel: new FormControl(''),
    ie_situacao: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogBox: DialogBoxService,
              private dataService: DataService,
              private talhaoService: TalhaoService,
              private propriedadeService: PropriedadeService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.params = data;
    });
    if (!this.params.id) {
      this.dataService.currentFilterTalhao.subscribe(data => {
        this.filter = data;
        if(!this.filter) {
          this.dialogBox.show('Propriedade não Selecionada!', 'ERROR');
          this.router.navigate(['/talhao']);
        } else {
          this.propriedade = this.filter.propriedade;
          this.formGroup.get('propriedade_id').setValue(this.propriedade.propriedade_id);
        }
      });
    } else {
      this.talhaoService.getById(this.params.id).subscribe(data => {
         this.formGroup.patchValue({
          id: data.id,
          propriedade_id: data.propriedade_id,
          nm_talhao:  data.nm_talhao,
          qt_area_agricultavel: data.qt_area_agricultavel,
          ie_situacao:  data.ie_situacao
        });
         this.propriedadeService.getById(data.propriedade_id).subscribe(data => {
          this.propriedade = data;
        });
      });
    }
  }

  salvar() {
    if (!this.formGroup.valid) { return; }
    this.talhaoService[this.formGroup.value.id ? 'edit' : 'add'](this.formGroup.value).subscribe(() => {
      this.dialogBox.show('Talhão salvo com sucesso!', 'OK');
      this.router.navigate(['/talhao']);
    });
  }

  handleReset() {
    this.formGroup.reset();
  }



}
