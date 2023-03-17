export class MasksService {
    static PhoneMask = (rawValue: string) => {
        var numbers = rawValue.match(/\d/g);
        var numberLength = 0;
        if (numbers) {
            numberLength = numbers.join('').length;
        }
        if (numberLength < 11) {
            return [
                '(', /[1-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
            ];
        } else {
            return [
                '(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
            ];
        }
    }

    static PhoneMaskDDI = (rawValue: string) => {
        var numbers = rawValue.match(/\d/g);
        var numberLength = 0;
        if (numbers) {
            numberLength = numbers.join('').length;
        }
        if (numberLength < 13) {
            return [
                '+', /[1-9]/, /[1-9]/, ' ', '(', /[1-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
            ];
        } else {
            return [
                '+', /[1-9]/, /[1-9]/, ' ', '(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
            ];
        }
    }

    static CNPJMask = [
        /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', '0', '0', '0', '1', '-', /\d/, /\d/
    ];

    static CPFMask = [
        /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/
    ];

    static RGMask = [
        /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[a-zA-Z0-9_.-]/, /[a-zA-Z0-9_.-]/
    ];

    static CEPMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

    static ContaBancariaMask = [
        /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/
    ];

    static AgenciaBancariaMask = [
        /\d/, /\d/, /\d/, /\d/, '-', /\d/
    ];

}



