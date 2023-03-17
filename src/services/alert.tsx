import { alert, defaults, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

export class AlertService {

  constructor() {
    defaults.delay = 4000;
    defaults.icons = 'material';
    defaults.styling = 'material';

    defaultModules.set(PNotifyMobile, {});
  }

  static success(message = 'Operação realizada com êxito.', title = 'Sucesso!') {
    this.showMessage('success', title, message);
  }

  static error(message = 'Tente realizar a operação novamente.', title = 'Erro!') {
    this.showMessage('error', title, message);
  }

  static notice(message = "", title = 'Atenção!') {
    this.showMessage('notice', title, message);
  }

  static showMessage(type: 'notice' | 'info' | 'success' | 'error', title: string, message: string) {
    alert({
      addClass: type,
      type: type,
      title: title,
      text: message,
      icon: '',
      hide: true,
      modules: new Map([
        ...defaultModules,
        [PNotifyMobile, {
          swipeDismiss: true
        }]
      ])
    });
  }

}