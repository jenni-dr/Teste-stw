import axios, { AxiosResponse } from 'axios';

const ApiViaCEP = axios.create({ baseURL: 'https://viacep.com.br/ws/' });

type CEPResponse = {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: number,
    gia: number,
    ddd: number,
    siafi: number,
    longitude:number,
    latitude: number,
}

export class CEPService {
    static getDadosByCEP(cep: number | string): Promise<AxiosResponse<CEPResponse>> {
        return ApiViaCEP.get(`${cep}/json/`)
    }
}