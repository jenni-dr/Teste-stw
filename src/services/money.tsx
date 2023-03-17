export class Money {
    static floatToMoneyWithCurrency(value: number, moneyType = 'pt-br') {
        if (isNaN(value)) return ''
        return value.toLocaleString(moneyType, { style: 'currency', currency: 'BRL' });
    }

    static floatToMoney(value: number, moneyType = 'pt-br') {
        if (isNaN(value)) return ''
        return value.toLocaleString(moneyType, { minimumFractionDigits: 3 });
    }
}