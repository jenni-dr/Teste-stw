export class FormatadorService {

    static cpf(value: string) {
        return value ? value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') : '' // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    static cpfRaw(value: string) {
        return value ? value
            .replace(/\D/g, '') : '';
    }

    static cnpj(value: string) {
        return value ? value.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') : '';
    }

    static cnpjRaw(value: string) {
        return value ? value
            .replace(/\D/g, '') : '';
    }

    static phone(value: string) {
        let phone = value ? value : '';
        phone = phone.replace(/\D/g, "");
        phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
        phone = phone.replace(/(\d)(\d{4})$/, "$1-$2")
        return phone;
    }

    static phoneRaw(value: string) {
        return value.replace(/\D/g, "");
    }

    static cep(value: string) {
        let cep = value ? value : '';
        cep = cep.replace(/\D/g, "")
        cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
        cep = cep.replace(/\.(\d{3})(\d)/, ".$1-$2")
        return cep
    }

    static cepRaw(cep: string) {
        return cep.replace(/\D/g, "");
    }

    static dateRaw(date: Date) {
        return date = new Date("DD/MM/YYYY");
    }

}