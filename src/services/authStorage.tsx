const MANTER_LOGIN = 'MANTER_LOGIN';
export class AuthStorage {
  static getItem(key: string) {
    const manter = localStorage.getItem(MANTER_LOGIN);
    return manter ? localStorage.getItem(key) : sessionStorage.getItem(key);
  }

  static setItem(key: string, value: any) {
    // const manter = localStorage.getItem(MANTER_LOGIN);
    localStorage.setItem(key, value)
    // return manter ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
  }

  static clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  static canKeepLogin(keep: boolean = false) {
    keep ? localStorage.setItem(MANTER_LOGIN, 'true') : localStorage.removeItem(MANTER_LOGIN);
  }
}