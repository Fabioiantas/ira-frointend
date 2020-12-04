import { RecursoComponent } from './Recurso/Recurso.component';
import { AgmCoreModule } from '@agm/core';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// BOOTSTRAP COMPONENTS
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { CountUpModule } from 'countup.js-angular2';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NouisliderModule } from 'ng2-nouislider';
import { ClipboardModule } from 'ngx-clipboard';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxLoadingModule } from 'ngx-loading';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ToastrModule } from 'ngx-toastr';
import { TrendModule } from 'ngx-trend';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// DEMO PAGES
// Dashboards
import { HomeComponent } from './dashboard/home/home.component';
// Pages
import { AppsLayoutComponent } from './layout/apps-layout/apps-layout.component';
// LAYOUT
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { FooterMenuComponent } from './layout/Components/footer/elements/footer-menu/footer-menu.component';
// FOOTER
import { FooterComponent } from './layout/Components/footer/footer.component';
import { SearchBoxComponent } from './layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './layout/Components/header/elements/user-box/user-box.component';
// HEADER
import { HeaderComponent } from './layout/Components/header/header.component';
import { PageTitleComponent } from './layout/Components/page-title/page-title.component';
import { LogoComponent } from './layout/Components/sidebar/elements/logo/logo.component';
// SIDEBAR
import { SidebarComponent } from './layout/Components/sidebar/sidebar.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { ThemeOptions } from './theme-options';
import { ArchitectUIState, rootReducer } from './themeOptions/store';
import { ConfigActions } from './themeOptions/store/config.actions';
import { DotsComponent } from './layout/Components/header/elements/dots/dots.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AdminComponent } from './admin/admin.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { UsuarioComponent } from './usuario/usuario.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { NgxDatatableFilterComponent } from './_components/ngx-datatable-filter/ngx-datatable-filter.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxResizeWatcherDirective } from './_helpers/ngx-resize-watcher.directive';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ForgotPasswordBoxedComponent } from './login/forgot-password/forgot-password-boxed.component';
import { LoginBoxedComponent } from './login/login-boxed.component';
import { CampanhasComponent } from './campanhas/campanhas.component';
import { AdicionarCampanhaComponent } from './campanhas/adicionar-campanha/adicionar-campanha.component';
import { I18n, CustomDatepickerI18n } from './_helpers/CustomDatepickerI18n';
import { NgbDatePTParserFormatter } from './_helpers/NgbDatePTParserFormatter';
import { NgbStringAdapter } from './_helpers/NgbStringAdapter';
import { ProgramacaoComponent } from './programacao/programacao.component';
import { ProdutoComponent } from './produto/produto.component';
import { AdicionarProdutoComponent } from './produto/adicionar-produto/adicionar-produto.component';
import { AdicionarUsuarioComponent } from './usuario/adicionar-usuario/adicionar-usuario.component';
import { ProdutosLiberadosComponent } from './produtos-liberados/produtos-liberados.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgramacaoPendenteAnaliseComponent } from './programacao-pendente-analise/programacao-pendente-analise.component';
import { OptionsDrawerComponent } from './themeOptions/options-drawer/options-drawer.component';
// import { FonteEmissaoComponent } from './fonte-emissao/fonte-emissao.component';
import { LicencaAmbientalComponent } from './licenca-ambiental/licenca-ambiental.component';
import { TipoAtividadeComponent } from './tipo-atividade/tipo-atividade.component';
import { TipoLicencaComponent } from './tipo-licenca/tipo-licenca.component';
import { OrgaoResponsavelComponent } from './orgao-responsavel/orgao-responsavel.component';
import { ArquivosComponent } from './arquivos/arquivos.component';
import { EntidadeComponent } from './entidade/entidade.component';
import { TipoAtividadeCadastroComponent } from './tipo-atividade/tipo-atividade-cadastro/tipo-atividade-cadastro.component';
import { TipoLicencaCadastroComponent } from './tipo-licenca/tipo-licenca-cadastro/tipo-licenca-cadastro.component';
import { OrgaoResponsavelCadastroComponent } from './orgao-responsavel/orgao-responsavel-cadastro/orgao-responsavel-cadastro.component';
import { EntidadeCadastroComponent } from './entidade/entidade-cadastro/entidade-cadastro.component';
import { LicencaAmbientalCadastroComponent } from './licenca-ambiental/licenca-ambiental-cadastro/licenca-ambiental-cadastro.component';
import { LicencaEntidadeComponent } from './licenca-ambiental/licenca-entidade/licenca-entidade.component';
import { LicenciamentoComponent } from './licenca-ambiental/licenca-ambiental-licenciamento/licenca-ambiental-licenciamento.component';
import { ProtocolacaoComponent } from './licenca-ambiental/licenca-ambiental-protocolacao/licenca-ambiental-protocolacao.component';
import { LicencaAmbientalRenovaComponent } from './licenca-ambiental/licenca-ambiental-renova/licenca-ambiental-renova.component';
import { LicencaDetalheComponent } from './licenca-ambiental/licenca-detalhe/licenca-detalhe.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

// tslint:disable-next-line:max-line-length

import { GeeComponent } from './gee/gee.component';
import { GeeCadastroComponent } from './gee/gee-cadastro/gee-cadastro.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AmostraEditarComponent } from './gee/amostra-editar/amostra-editar.component';
import { FonteEntidadeComponent } from './gee/fonte-entidade/fonte-entidade.component';
import { GeeFonteCadastroComponent } from './gee/gee-fonte-cadastro/gee-fonte-cadastro.component';
import { CombustivelComponent } from './gee/combustivel/combustivel.component';
import { FonteEmissaoCadastroComponent } from './gee/fonte-emissao/fonte-emissao-cadastro/fonte-emissao-cadastro.component';
import { CombustivelCadastroComponent } from './gee/combustivel/combustivel-cadastro/combustivel-cadastro.component';
import { EscopoCadastroGeeComponent } from './gee/escopo/escopo-cadastro-gee/escopo-cadastro-gee.component';
import { FonteEmissaoComponent } from './gee/fonte-emissao/fonte-emissao.component';
import { EscopoComponent } from './gee/escopo/escopo.component';
import { ProcessoAnaliseComponent } from './Monitoramento-Recursos/processo-analise/processo-analise.component';
import { FonteEmissoraComponent } from './Monitoramento-Recursos/fonte-emissora/fonte-emissora.component';
import { RecursoCadastroComponent } from './Monitoramento-Recursos/recurso/recurso-cadastro/recurso-cadastro.component';
import { ParametroComponent } from './Monitoramento-Recursos/parametro/parametro.component';
import { ParametroCadastroComponent } from './Monitoramento-Recursos/parametro/parametro-cadastro/parametro-cadastro.component';
// tslint:disable-next-line:max-line-length
import { ProcessoAnaliseCadastroComponent } from './Monitoramento-Recursos/processo-analise/processo-analise-cadastro/processo-analise-cadastro.component';
// tslint:disable-next-line:max-line-length
import { FonteEmissoraCadastroComponent } from './Monitoramento-Recursos/fonte-emissora/fonte-emissora-cadastro/fonte-emissora-cadastro.component';
import { MonitoramentoCadastroComponent } from './Monitoramento-Recursos/monitoramento-cadastro/monitoramento-cadastro.component';
// tslint:disable-next-line:max-line-length
import { MonitoramentoAmostraCadastroComponent } from './Monitoramento-Recursos/monitoramento-amostra-cadastro/monitoramento-amostra-cadastro.component';
// tslint:disable-next-line:max-line-length
import { TipoMonitoramentoComponent } from './Monitoramento-Recursos/tipo-monitoramento/tipo-monitoramento.component';
// tslint:disable-next-line:max-line-length
import { TipoMonitoramentoCadastroComponent } from './Monitoramento-Recursos/tipo-monitoramento/tipo-monitoramento-cadastro/tipo-monitoramento-cadastro.component';
import { ParametroUnidadeComponent } from './Monitoramento-Recursos/parametro/parametro-unidade/parametro-unidade.component';
import { MonitoramentoTalhaoComponent } from './Monitoramento-Recursos/monitoramento-talhao/monitoramento-talhao.component';
import { TalhaoComponent } from './Monitoramento-Recursos/talhao/talhao.component';
import { TalhaoCadastroComponent } from './Monitoramento-Recursos/monitoramento-talhao/talhao-cadastro/talhao-cadastro.component';
import { UnidadeParametroComponent } from './Monitoramento-Recursos/unidade-parametro/unidade-parametro.component';
// tslint:disable-next-line:max-line-length
import { UnidadeParametroCadastroComponent } from './Monitoramento-Recursos/unidade-parametro/unidade-parametro-cadastro/unidade-parametro-cadastro.component';
import { MonitoramentoParametrosComponent } from './Monitoramento-Recursos/monitoramento-parametros/monitoramento-parametros.component';
import { AuditoriaNivelComponent } from './auditoria/auditoria-nivel/auditoria-nivel.component';
import { AuditoriaNivelCadastroComponent } from './auditoria/auditoria-nivel/auditoria-nivel-cadastro/auditoria-nivel-cadastro.component';
import { ClassificacaoRequisitoComponent } from './auditoria/classificacao-requisito/classificacao-requisito.component';
// tslint:disable-next-line:max-line-length
import { ClassificacaoRequisitoCadastroComponent } from './auditoria/classificacao-requisito/classificacao-requisito-cadastro/classificacao-requisito-cadastro.component';
import { AuditoriaItemComponent } from './auditoria/auditoria-item/auditoria-item.component';
import { AuditoriaItemCadastroComponent } from './auditoria/auditoria-item/auditoria-item-cadastro/auditoria-item-cadastro.component';
import { AuditoriaRequisitoComponent } from './auditoria/auditoria-requisito/auditoria-requisito.component';
// tslint:disable-next-line:max-line-length
import { AuditoriaRequisitoCadastroComponent } from './auditoria/auditoria-requisito/auditoria-requisito-cadastro/auditoria-requisito-cadastro.component';
import { AuditoriaNivelItemComponent } from './auditoria/auditoria-nivel-item/auditoria-nivel-item.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { AuditoriaNivelItRequisitoComponent } from './auditoria/auditoria-nivel-it-requisito/auditoria-nivel-it-requisito.component';
import { AuditoriaRequisitoParametroComponent } from './auditoria/auditoria-requisito-parametro/auditoria-requisito-parametro.component';
import { AuditoriaEntidadeCadastroComponent } from './auditoria/auditoria-entidade-cadastro/auditoria-entidade-cadastro.component';
import { AuditoriaEntidadeComponent } from './auditoria/auditoria-entidade/auditoria-entidade.component';
import { EntidadeAuditadaComponent } from './auditoria/entidade-auditada/entidade-auditada.component';
import { AuditarComponent } from './auditoria/auditar/auditar.component';
import { AuditarRequisitoComponent } from './auditoria/auditar-requisito/auditar-requisito.component';
import { PainelComponent } from './painel/painel.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT
    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER
    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    DotsComponent,

    // SIDEBAR
    SidebarComponent,
    LogoComponent,

    // FOOTER
    FooterComponent,
    FooterMenuComponent,

    // Dashboards
    HomeComponent,

    // User Pages
    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    AdminComponent,
    DialogBoxComponent,
    UsuarioComponent,
    TecnicoComponent,

    // Components
    RecursoComponent,
    NgxDatatableFilterComponent,
    NgxResizeWatcherDirective,
    CampanhasComponent,
    AdicionarCampanhaComponent,
    ProdutoComponent,
    TecnicoComponent,
    ProgramacaoComponent,
    UsuarioComponent,
    AdicionarProdutoComponent,
    AdicionarUsuarioComponent,
    ProdutosLiberadosComponent,
    ProgramacaoPendenteAnaliseComponent,
    OptionsDrawerComponent,
    RecursoCadastroComponent,
    ParametroComponent,
    ParametroCadastroComponent,
    FonteEmissaoComponent,
    LicencaAmbientalComponent,
    TipoAtividadeComponent,
    TipoLicencaComponent,
    OrgaoResponsavelComponent,
    ArquivosComponent,
    EntidadeComponent,
    TipoAtividadeCadastroComponent,
    TipoLicencaCadastroComponent,
    OrgaoResponsavelCadastroComponent,
    EntidadeCadastroComponent,
    LicencaAmbientalCadastroComponent,
    LicencaEntidadeComponent,
    LicenciamentoComponent,
    ProtocolacaoComponent,
    LicencaAmbientalRenovaComponent,
    LicencaDetalheComponent,
    ResetPasswordComponent,
    EscopoComponent,
    GeeComponent,
    GeeCadastroComponent,
    AmostraEditarComponent,
    FonteEntidadeComponent,
    GeeFonteCadastroComponent,
    CombustivelComponent,
    FonteEmissaoCadastroComponent,
    CombustivelCadastroComponent,
    EscopoCadastroGeeComponent,
    ProcessoAnaliseComponent,
    FonteEmissoraComponent,
    ProcessoAnaliseCadastroComponent,
    FonteEmissoraCadastroComponent,
    MonitoramentoCadastroComponent,
    MonitoramentoAmostraCadastroComponent,
    TipoMonitoramentoComponent,
    TipoMonitoramentoCadastroComponent,
    ParametroUnidadeComponent,
    MonitoramentoTalhaoComponent,
    TalhaoComponent,
    TalhaoCadastroComponent,
    UnidadeParametroComponent,
    UnidadeParametroCadastroComponent,
    MonitoramentoParametrosComponent,
    AuditoriaNivelComponent,
    AuditoriaNivelCadastroComponent,
    ClassificacaoRequisitoComponent,
    ClassificacaoRequisitoCadastroComponent,
    AuditoriaItemComponent,
    AuditoriaItemCadastroComponent,
    AuditoriaRequisitoComponent,
    AuditoriaRequisitoCadastroComponent,
    AuditoriaNivelItemComponent,
    HeaderLayoutComponent,
    AuditoriaNivelItRequisitoComponent,
    AuditoriaRequisitoParametroComponent,
    AuditoriaEntidadeCadastroComponent,
    AuditoriaEntidadeComponent,
    EntidadeAuditadaComponent,
    AuditarComponent,
    AuditarRequisitoComponent,
    PainelComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    ChartsModule,
    TrendModule,
    NgxDatatableModule,
    // Angular Bootstrap Components
    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    LaddaModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    ImageCropperModule,
    AngularStickyThingsModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,
    NgxSpinnerModule,
    AccordionModule.forRoot(),
  ],
  providers: [
    BsModalRef,
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
    {provide: NgbDateAdapter, useClass: NgbStringAdapter},
    ConfigActions,
    ThemeOptions
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogBoxComponent, AmostraEditarComponent, AuditoriaRequisitoParametroComponent, AuditarRequisitoComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
