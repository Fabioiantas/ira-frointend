import { FonteEntidadeComponent } from './gee/fonte-entidade/fonte-entidade.component';
import { GeeComponent } from './gee/gee.component';
import { RecursoComponent } from './Recurso/Recurso.component';
import { ProgramacaoComponent } from './programacao/programacao.component';
import { ProdutosLiberadosComponent } from './produtos-liberados/produtos-liberados.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { AdicionarUsuarioComponent } from './usuario/adicionar-usuario/adicionar-usuario.component';
import { ProdutoComponent } from './produto/produto.component';
import { AdicionarCampanhaComponent } from './campanhas/adicionar-campanha/adicionar-campanha.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './dashboard/home/home.component';
// import { RecursoComponent } from './recurso-component/recurso-component.component';
// Pages
import { AppsLayoutComponent } from './layout/apps-layout/apps-layout.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './_models/role';
import { AdminComponent } from './admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginBoxedComponent } from './login/login-boxed.component';
import { ForgotPasswordBoxedComponent } from './login/forgot-password/forgot-password-boxed.component';
import { CampanhasComponent } from './campanhas/campanhas.component';
import { AdicionarProdutoComponent } from './produto/adicionar-produto/adicionar-produto.component';
import { ProgramacaoPendenteAnaliseComponent } from './programacao-pendente-analise/programacao-pendente-analise.component';
import { LicencaAmbientalComponent } from './licenca-ambiental/licenca-ambiental.component';
import { OrgaoResponsavelComponent } from './orgao-responsavel/orgao-responsavel.component';
import { OrgaoResponsavelCadastroComponent } from './orgao-responsavel/orgao-responsavel-cadastro/orgao-responsavel-cadastro.component';
import { TipoAtividadeComponent } from './tipo-atividade/tipo-atividade.component';
import { TipoAtividadeCadastroComponent } from './tipo-atividade/tipo-atividade-cadastro/tipo-atividade-cadastro.component';
import { TipoLicencaComponent } from './tipo-licenca/tipo-licenca.component';
import { TipoLicencaCadastroComponent } from './tipo-licenca/tipo-licenca-cadastro/tipo-licenca-cadastro.component';
import { EntidadeComponent } from './entidade/entidade.component';
import { EntidadeCadastroComponent } from './entidade/entidade-cadastro/entidade-cadastro.component';
import { LicencaAmbientalCadastroComponent } from './licenca-ambiental/licenca-ambiental-cadastro/licenca-ambiental-cadastro.component';
import { LicencaEntidadeComponent } from './licenca-ambiental/licenca-entidade/licenca-entidade.component';
import { LicenciamentoComponent } from './licenca-ambiental/licenca-ambiental-licenciamento/licenca-ambiental-licenciamento.component';
import { ProtocolacaoComponent } from './licenca-ambiental/licenca-ambiental-protocolacao/licenca-ambiental-protocolacao.component';
import { LicencaAmbientalRenovaComponent } from './licenca-ambiental/licenca-ambiental-renova/licenca-ambiental-renova.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { GeeCadastroComponent } from './gee/gee-cadastro/gee-cadastro.component';
import { GeeFonteCadastroComponent } from './gee/gee-fonte-cadastro/gee-fonte-cadastro.component';
// import { FonteEmissaoComponent } from './fonte-emissao/fonte-emissao.component';
import { FonteEmissaoCadastroComponent } from './gee/fonte-emissao/fonte-emissao-cadastro/fonte-emissao-cadastro.component';
import { CombustivelComponent } from './gee/combustivel/combustivel.component';
import { CombustivelCadastroComponent } from './gee/combustivel/combustivel-cadastro/combustivel-cadastro.component';
import { EscopoCadastroGeeComponent } from './gee/escopo/escopo-cadastro-gee/escopo-cadastro-gee.component';
import { FonteEmissaoComponent } from './gee/fonte-emissao/fonte-emissao.component';
import { EscopoComponent } from './gee/escopo/escopo.component';
import { FonteEmissoraComponent } from './Monitoramento-Recursos/fonte-emissora/fonte-emissora.component';
import { ParametroComponent } from './Monitoramento-Recursos/parametro/parametro.component';
import { ParametroCadastroComponent } from './Monitoramento-Recursos/parametro/parametro-cadastro/parametro-cadastro.component';
import { RecursoCadastroComponent } from './Monitoramento-Recursos/recurso/recurso-cadastro/recurso-cadastro.component';
import { ProcessoAnaliseComponent } from './Monitoramento-Recursos/processo-analise/processo-analise.component';
import { ProcessoAnaliseCadastroComponent } from './Monitoramento-Recursos/processo-analise/processo-analise-cadastro/processo-analise-cadastro.component';
import { FonteEmissoraCadastroComponent } from './Monitoramento-Recursos/fonte-emissora/fonte-emissora-cadastro/fonte-emissora-cadastro.component';
import { MonitoramentoCadastroComponent } from './Monitoramento-Recursos/monitoramento-cadastro/monitoramento-cadastro.component';
import { MonitoramentoAmostraCadastroComponent } from './Monitoramento-Recursos/monitoramento-amostra-cadastro/monitoramento-amostra-cadastro.component';
import { TipoMonitoramento } from './models/tipoMonitoramento';
import { TipoMonitoramentoCadastroComponent } from './Monitoramento-Recursos/tipo-monitoramento/tipo-monitoramento-cadastro/tipo-monitoramento-cadastro.component';
import { TipoMonitoramentoComponent } from './Monitoramento-Recursos/tipo-monitoramento/tipo-monitoramento.component';
import { MonitoramentoTalhaoComponent } from './Monitoramento-Recursos/monitoramento-talhao/monitoramento-talhao.component';
import { TalhaoCadastroComponent } from './Monitoramento-Recursos/monitoramento-talhao/talhao-cadastro/talhao-cadastro.component';
import { UnidadeParametroComponent } from './Monitoramento-Recursos/unidade-parametro/unidade-parametro.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { extraParameter: 'dashboardsMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'pagesMenu3' }
      },

    ]
  },
// ############## ROTAS
  {
    path: 'licenca',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: LicencaAmbientalComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: LicencaAmbientalComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: LicencaAmbientalComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }

    ]
  },
  {
    path: 'orgao',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: OrgaoResponsavelComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: OrgaoResponsavelCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: OrgaoResponsavelCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }

    ]
  },
  {
    path: 'tipoatividade',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: TipoAtividadeComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: TipoAtividadeCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: TipoAtividadeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }

    ]
  },

  {
    path: 'tipolicenca',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: TipoLicencaComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: TipoLicencaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: TipoLicencaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }

    ]
  },
  {
    path: 'entidade',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: EntidadeComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: EntidadeCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: EntidadeCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }

    ]
  },
  {
    path: 'licencaambiental',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: LicencaAmbientalComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: LicencaAmbientalCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: LicencaAmbientalCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }

    ]
  },
  {
    path: 'licencaentidade',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: LicencaEntidadeComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'licencas/:id',
        component: LicencaAmbientalCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'licenciamentoMenu' }
      }
    ]
  },
  {
    path: 'licenciamento/:id',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: LicenciamentoComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'renova/:id',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: LicencaAmbientalRenovaComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'protocolacao/:id',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ProtocolacaoComponent,
        data: { extraParameter: 'licenciamentoMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },

  // ###### GEE #######//
  {
    path: 'gee',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: GeeComponent,
        data: {roles: [Role.Admin], extraParameter: 'geeMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: GeeCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      },
      {
        path: 'fontes',
        component: FonteEntidadeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      },
      {
        path: 'fontes/:id',
        component: FonteEntidadeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      },
      {
        path: 'fontes-cadastro/:id',
        component: GeeFonteCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      }

    ]
  },
  {
    path: 'fonte-emissao',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: FonteEmissaoComponent,
        data: { extraParameter: 'geeMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: FonteEmissaoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      },
      {
        path: 'adicionar/:id',
        component: FonteEmissaoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      }

    ]
  },
  {
    path: 'combustivel',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: CombustivelComponent,
        data: { extraParameter: 'geeMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: CombustivelCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      },
      {
        path: 'adicionar/:id',
        component: CombustivelCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      }
    ]
  },
  {
    path: 'escopo',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: EscopoComponent,
        data: { extraParameter: 'geeMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: EscopoCadastroGeeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      },
      {
        path: 'adicionar/:id',
        component: EscopoCadastroGeeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'geeMenu' }
      }
    ]
  },

  // #################################################//
  // ###### MONITORAMENTO -RECURSOS AMBIENTAIS #######//
  // #################################################//
  {
    path: 'recurso',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: RecursoComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: RecursoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: RecursoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      }
    ]
  },
  {
    path: 'fonteemissora',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: FonteEmissoraComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: FonteEmissoraCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: FonteEmissoraCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      }
    ]
  },
  {
    path: 'parametro',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ParametroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: ParametroCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: ParametroCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      }
    ]
  },
  {
    path: 'unidade',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: UnidadeParametroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'processo',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ProcessoAnaliseComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: ProcessoAnaliseCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      },
      {
        path: 'adicionar/:id',
        component: ProcessoAnaliseCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      }
    ]
  },
  {
    path: 'monitoramento',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: MonitoramentoCadastroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'monitoramento/:id',
        component: MonitoramentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      },
      {
        path: 'amostra/:id',
        component: MonitoramentoAmostraCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'mRecursoMenu' }
      }
    ]
  },
  // TALHAOO
  {
    path: 'talhao',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: MonitoramentoTalhaoComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: TalhaoCadastroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar/:id',
        component: TalhaoCadastroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'tipomonitoramento',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: TipoMonitoramentoComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: TipoMonitoramentoCadastroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar/:id',
        component: TipoMonitoramentoCadastroComponent,
        data: { extraParameter: 'mRecursoMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: 'login', component: LoginBoxedComponent, data: { extraParameter: '' } },
      { path: 'forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: { extraParameter: '' } },
    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: 'reset-password/:token', component: ResetPasswordComponent, data: { extraParameter: '' } },
    ]
  },
  {
    path: '',
    component: AppsLayoutComponent,
    children: [

    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
