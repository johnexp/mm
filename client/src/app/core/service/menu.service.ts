import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  private menus: any = {
    cadastros: {
      name: 'cadastros',
      label: 'Cadastros',
      menus: [{
        name: 'Versões',
        icon: 'new_releases',
        path: 'versoes'
      }, {
        name: 'Membros',
        icon: 'face',
        path: 'membro'
      }, {
        name: 'Homologações',
        icon: 'backup',
        path: 'homologacao'
      }, {
        name: 'Apresentação do Site',
        icon: 'format_color_text',
        path: 'apresentacao-site'
      }, {
        name: 'Sobre o Portal',
        icon: 'format_color_text',
        path: 'sobre'
      }, {
        name: 'Banneres',
        icon: 'photo_size_select_actual',
        path: 'banner'
      }, {
        name: 'Item de Progresso',
        icon: 'format_list_bulleted',
        path: 'item-progresso'
      }, {
        name: 'Wiki',
        icon: 'language',
        path: 'wiki'
      }, {
        name: 'Arquivo',
        icon: 'attach_file',
        path: 'arquivo'
      }]
    },
    administracao: {
      name: 'administracao',
      label: 'Administração',
      menus: [{
        name: 'Teste',
        icon: 'done',
        path: 'teste'
      }, {
        name: 'Ação',
        icon: 'done',
        path: 'action'
      }, {
        name: 'Módulo',
        icon: 'done',
        path: 'module'
      }, {
        name: 'Permissão',
        icon: 'done',
        path: 'permission'
      }, {
        name: 'Menu da Seção',
        icon: 'done',
        path: 'menu-module'
      }]
    }
  };

  getMenu(menuName?: string) {
    if (menuName) {
      return this.menus[menuName];
    }
    return this.menus;
  }
}
