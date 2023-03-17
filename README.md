# Teste-stw

Projeto de uma página : Home (dashboard),

Clone projeto que está no GitHub:https://github.com/jenni-dr/Teste-stw.git

Link do Figma:https://www.figma.com/file/c5SFmtaL529dpyjjPvoaXs/dashboard?node-id=1-2&t=rwt3rhArjKHIP7jd-0


## Instalação

A estrutura do projeto está em Vite 

```
npm install
npm run dev
```




#  Front End
## Conteúdo encontrado

Boilerplate Front End foi feito como um pontapé inicial para projetos front-end . Você encontra

- Formulários usando Formik;
- Componentes de formulário como Input, Select, feitos para usar com ou sem formik;
- Tokens, tipografia, componentes, criados a partir do metaDS. Você encontrará tamanhos de fonte, espaçamentos, etc;
- Um arquivo de rotas com um boilerplate já pronto, usando react.lazy e suspense, com suporte a rotas privadas até por tipo de usuário;
- Serviços de validação, CepService devidamente tipado, formatação de textos para moeda, telefone, e uma Api com endpoint espelhado a partir do arquivo .env
- Entre outras coisas


## Rotas

O arquivo de rotas é o router.tsx, que se encontra na pasta src

### Rotas Privadas

Para criar uma rota privada, note que você precisa encapsular o componente da sua página num component chamado PrivateRoute.
Com o PrivateRoute, você define qual a regra de rota privada, sendo allow='*' checando apenas se existe algum usuário logado. 
Por não haver definição de como fica o campo de tipo de usuário pelo backend, reescreva a lógica de tipo de usuário do PrivateRoute em router.tsx para melhor
adequar a sua estrutura de backend. Por padrão, se um usuário não for autenticado, a rota de cospe de volta para a raiz '/', mas você pode usar a prop to=""
para definir um caminho caso queira um redirect para um local diferente

```javascript
<Route path="/private" element={
    <PrivateRoute allow="*" to="/home">
        <Exemplos />
    </PrivateRoute>
} />
```

### Títulos de Rota

Para melhor lembrança de setar um título ao criar uma página, um component e um hook foram criados para isso, e funcionam dentro de router.tsx, para garantir 
que sempre que defina um path para uma página nova, traga a lembrança de escolher também um titulo para ela (não obrigatório).
Observe que o prefixo de título não muda, sendo mudado/definido apenas no arquivo .env. Já o sufixo segue usando o component RouteTitle, dentro do arquivo de rota.
As rotas seguem a extrutura 'NOMEDOPROJETO - NOMEDAPAGINA'

```javascript
<Route path="/exemplos" element={
    <>
        <RouteTitle name="Exemplos" />
        <Exemplos />
    </>
} />
```

## Formulários

Os formulários desse projeto foram pensados para serem usados com o Formik e Yup para validações;

```javascript
    const TesteSchema = Yup.object().shape({
        email: Yup.string().required('Campo obrigatorio').email('Email inválido')
    });

    const { handleChange, submitForm, values, errros } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: TesteSchema,
        onSubmit: values => {
            console.log('values', values);
        }
    });
```

O input de email para o formulário acima ficaria assim:
```javascript
<Input value={values.email} name='email' label="Email" onChange={handleChange} error={errors.email} />

<div className="m-btn" onClick={() => submitForm()}>Confirmar<div/>
```

## Estrutura
A estrutura desse projeto ficou assim

- components (tokens, páginas, e componentes react em geral)
- hooks (onde haverá hooks para auxiliar nos projetos. Contém out of the box apenas hook de debounce)
- recoil (usando recoil para gerenciamento de estados. Você pode remover e usar Context se preferir)
- services (serviços diversos, api, máscaras, validadores, conversores, etc..)
- styles (onde ficam os estilos core do projeto, como bootstrap, tokens diversos, loaders, animações...)


## Componentes (Tokens)

Inspirados no MetaDS, alguns tokens se tornaram estilos css apenas, já outros mais complexos se tornaram componentes React. Como:

- Input;
- TextArea;
- Select;
- MoneyInput;
- Modal;
- Accordion;
- Checkbox;
- DragDrop;
- DropDown;
- StepMenu;
- Tabs;

### Input e MoneyInput

Uso comum de um Input
```javascript
<Input value={values.cep} name='cep' label="CEP" mask={MasksService.CEPMask} onChange={handleChange}
    onEnterPresses={() => procurarEnderecoPorCep()} />
```
Note que a propriedade name, apesar de comum no HTML, serve obrigatoriamente para o funcionando com o Formik.
Input tem uma propriedade opcional chamada mask, que no caso acima é passado o serviço de mascaras que esse projeto já possui.
Essas máscaras são um array de expressão regular e o uso do mask faz o componente trocar de <input /> do HTML para <MaskedInput />
do pacote [react-text-mask](https://www.npmjs.com/package/react-text-mask) que esse projeto usa. O serviço MaskService contém muitas máscaras que usamos frequentemente, mas caso precise
escrever uma outra, dêem uma lida na documentação desse pacote.

O Input também pode ser usado sem o Formik, segue o exemplo abaixo:
```javascript
const [cep, setCep] = useState('');
<Input value={cep} label="CEP" mask={MasksService.CEPMask} onChange={event => setCep(event.target.value)} />
```
Note que o onChange muda bastante quando usado com state em vez do formik. Isso porque ele trás um Event padrão do javascript para changes de input.

Já o componente de input de dinheiro funciona quase semelhante
```javascript
<MoneyInput ref={ref} value={values.valor} name='valor' label="Valor" onChange={handleChange} />
```

### TextArea
O textarea funciona perfeitamente igual o Input, porém sem o evento de enter e com uma propriedade de quantidade de linhas

```javascript
<TextArea value={values.comments} rows={2} name='comments' label="Comentário" onChange={handleChange} error={errors.comments} />
```
Por padrão o textarea tem 4 linhas (rows = 4)

### Select
O Select montado foi usando o react-select, pelo nível de complexidade que os selects podem ter em projetos específicos.

```javascript
<Select options={[{ label: 'Casa', value: 1 }, { label: 'Apartamente', value: 2 }]}
    value={values.select} label="Tipo de residência" name="select" onChange={handleChange} />
```

Note que as opções que aparecerão no select são um array de objetos com propriedade label para o texto e value para o valor da opção que será retornado no onChange. Esse select suporta seleção múltiplas e pesquisa dentro do select, usando as propriedades 'isMulti' e 'isSearchable' respectivamente. Você também pode customizar a mensagem de vazio do input usando a propriedade 'emptyMessage'

```javascript
<Select options={enderecos}
    emptyMessage="Nenhum endereço encontrado"
    value={values.select} label="Endereço" name="select" isSearchable onChange={handleChange} />
```

### Checkbox

```javascript
<Checkbox id="checkbox-marcado" name='checkbox' label="marcado" value={values.checkbox} onChange={handleChange} />
```
Note que o componente tem ID como campo obrigatório, pois é usando ele juntamente a um html-for que
consigo facilmente performar a ação de marcar/desmarcar se clicar na caixa ou na label do checkbox.
Caso queira usar fora do formik, usar a propriedade onToggle em vez da onChange. Ela retorna o valor contrário do valor
booleano atual do switch, fazendo um toggle

### Switch

```javascript
<Switch id="switch-ligar" name='ligado' label="Ligar a luz" value={values.ligado} onChange={handleChange} />
```
Note que o componente tem ID como campo obrigatório, pois é usando ele juntamente a um html-for que
consigo facilmente performar a ação de marcar/desmarcar se clicar na caixa ou na label do switch. 
Caso queira usar fora do formik, usar a propriedade onToggle em vez da onChange. Ela retorna o valor contrário do valor
booleano atual do switch, fazendo um toggle

### Drag Drop
```javascript
<DragDrop label='Anexar arquivos (apenas pdf)' onFile={file => console.log('arquivo mandado', file)} />
```                    
Por padrão, o DragDrop aceita apenas pdf, mas isso pode ser alterado usando a propriedade 'fileTypes',
que espera sempre um array de strings, por exemplo 
```javascript
<DragDrop label='Anexar arquivos (apenas pdf)' fileTypes={['image/jpeg', 'image/png', 'image/gif']} />
```
Você pode configurar também a mensagem de quando o usuário submete um arquivo de formato diferente do que você quer aceitar, pela propriedade wrongFileTypeMessage="Apenas arquivos PDF são aceitos"

DragDrop aceita arquivos de até 5mb, mas pode ser configurado usado 'maxSize', um número em bites

### DropDown
Dropdown foi feito usando o pacote @popperjs/core para posicionamento automático do dropdown em cima de um m-btn-icon ou m-btn. Para escolher qual usar, se você usar a propriedade label, ele cria um botão que tem ação de dropdown no click, se não, ele tem um ícone de 3 pontinhos como dropdown por padrão. O ícone pode ser usando usando a propriedade icon='search', passando o nome do ícone em material-icons


```javascript
<DropDown>
    <div className="dropdown-item" onClick={() => AlertService.success('Visualizado')}>
        <i className="material-icons">visibility</i>
        Visualizar
    </div>
    <div className="dropdown-item" onClick={() => AlertService.success('Aberto')}>
        <i className="material-icons">visibility</i>
        Abrir
    </div>
</DropDown>
```
Note que Dropdown espera sempre um react node ou multiplos como children, obrigatóriamente. Dentro, coloque sempre uma div com a classe '"dropdown-item"' para que a estilização e espaçamento sejam aplicados automaticamente. Foi feito desse jeito em vez de um options como no Select, para garantir que se possa fazer um item de dropdown do jeito que você quiser. 

### PaginatedTable
PaginatedTable é o componente de tabela paginada, quando tiver necessidade de uma paginação FEITA PELO BACKEND. O component exibe um loader se 'isLoading' for usado. O componente foi feito para ser o mais genérico possível, então para usa-lo, você deve passar o array de dados que vem do backend (any[]), e um array de colunas do tipo PaginatedTableHeader[] (tipado pelo proprio component). Nele vc passa title, que é o cabeçado daquela coluna e você passa field, que ó nome do campo, do atributo de cada registro do array de dados. Caso o valor da coluna não possa ser usado field, ou por o campo necessitar de uma formatação que o backend não faça, ou se você precisa incrementar com um ícone, ou um botão adjascente, ou etc... saiba que é possível ignorar o campo field e passar divs, i, button, como JSX para o component de tabela rederizar. Isso é feito passando uma propriedade chamada render como função, ela retorna de callback o objeto de cada linha do array de dados passado na propriedade 'data', e lá você pode manipular a estrutura que será rederizada (por ser JSX, não esqueça que um return de template JSX é obrigatório). Segue o exemplo a baixo!

```javascript
const data = {//EXEMPLO DE RETORNO DO BACKEND
    totalPages: 20, 
    data: [{ name: 'Gabriel', age: 26, phone: '7599999999' }, { name: 'João', age: 29, phone: '7599999999' }], 
    page: 0
}
const columns: PaginatedTableHeader[] = [{ title: 'Nome', field: 'name' }, { title: 'Idade', field: 'age' }, {
    title: 'Telefone', render: data =>
        <div className="d-flex align-items-center"><i className="material-icons mr-3">phone</i>{FormatadorService.phone(data.phone)}</div>
}];

return (
    <PaginatedTable data={data.data} columns={columns} page={page} totalPages={data.totalPages} onChangePage={p => setPage(p)} />
)
```


## Serviços
Dentro da pasta services, podem ser encontrados os serviços;

- AlertService
- Api
- CepService
- ConfirmDialogService
- LoaderService
- MasksService
- Money
- ValidatorsService

### AlertService
Sistema de alerta foi feito usando @pnotify que a MTCorp usa na versão manetoni, porém numa versão mais nova. Foi usando ícones do Material Design e o arquivo alert.css dentro de styles para deixar o visual igual ao Meta DS. Seu uso é bem simples

```javascript
AlertService.success();//sucesso
AlertService.notice();//atenção
AlertService.error();//erro
```

### Api
Api usa o axios para fazer as chamadas ao backend do projeto que usar essa estrutura, o endpoint que será usado deverá ser colocado dentro do arquivo .env, na variável 'VITE_API_URL='. O arquivo também contém uma estrutura base que usa o localStorage a variável 'token' para fazer as autenticações implicitas usando interceptor. Existem também outro interceptor para refresh tokens, mas deverá ser escrito mais código, contendo apenas um boilerplate.

### QueryParamsService
Serviço que converte um objeto em uma string query params, com um prefíxo de '?'. Fortemente usado junto com Api, para chamadas GET.
```javascript
const response = await Api.get('/data' + QueryParamsService.convertObjToQuery({name: 'Testes', take: 14}));
```

### CepService
CepService recebe um cep válido como number ou string e faz a consulta ao ViaCep. Seu retorno já está devidamente tipado.

```javascript
const response = await CEPService.getDadosByCEP(cepCru);
const { bairro } = response.data;
```

### ConfirmDialogService
Esse serviço foi criado a partir do component Modal, mas foi feito como um serviço usando o createRoot do ReactJS versão 18. O serviço cria um Modal no body e uma Promise que fica Pending até que o usuário responda se confirma ou cancela a ação, retornando um resolve ou um reject respectivamente. O que é traduzido para a promise como o já conhecido 'then' ou 'catch'.

```javascript
try {
    await ConfirmDialogService.show("Teste de confirm dialog", "Deseja continuar os exemplos aqui? Então responda o confirm dialog");
    AlertService.success('Você confirmou');
} catch (error) {
    if (error === ConfirmDialogResponse.REJECT) {
        AlertService.error('Você cancelou');
    }
}
```          
ConfirmDialogResponse é um ENUM dentro do serviço, que trás os enums de RESOLVE e REJECT. Formalidades...

### LoaderService
O LoaderService, é um serviço idealizado para ser usado especialmente no momento de chamadas API. Ele trás um feedback visual de carregamento. 

```javascript
try {
    LoaderService.start();
    const response = await CEPService.getDadosByCEP(cepCru);
} finally {
    LoaderService.done();
}
```
.start() começa um carregamento infinito, e .done() termina o carregamento.

Você pode usar shimmers, que também existem nesse projeto, para feedbacks de carregamento
```html
<div className="shimmer"></div>
```
E ai você pode usar css para desenhar o shimmer/skeleton ao elemento que está esperando carregamento

### MasksService
Serviços simples de mascarás disponíveis, usadas em Inputs. Você encontra mascarás de:
- PhoneMask
- PhoneMaskDDI
- CNPJMask
- CPFMask
- RGMask
- CEPMask
- ContaBancariaMask
- AgenciaBancariaMask

Idealizadas para serem usadas no component input no formato do pacote [react-text-mask](https://www.npmjs.com/package/react-text-mask)

PhoneMask e PhoneMaskDDI são os únicos em formato de função, que espera que vc mande de volta o valor como parametro '.PhoneMask(values.telefone)'. Isso acontece porque é necessário para a mascára saber dizer se muda o formato para o nono dígito ou não.

### FormatadorService
FormatadorService é um serviço de formatar strings em formatos de telefone, cep, cnpj, etc.... e converte também de volta textos formatados para strings sem caracteres de formatação como '/' e '-'.

### ValidatorsService
Serviço de validação, simples, que usa regex para validações. Serviço conta com 

- validarTelefone
- validarCPF
- validarCNPJ

### Money
Money é um serviço simples, que converte dinheiro em float em dinheiro formatado, com R$ ou não, separador de virgula para centavos e ponto para milhares.

- floatToMoneyWithCurrency (converte para dinheiro com cifrão na frente)
- floatToMoney (converte para dinheiro)

## Feedback

Se você tiver algum feedback, por favor nos deixe saber por Email


