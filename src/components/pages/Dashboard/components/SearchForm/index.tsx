import { useFormik } from 'formik'
import * as Yup from 'yup';
import { AlertService } from '../../../../../services';
import { Input } from '../../../../tokens';
import { SelectNew } from '../../../../tokens/SelectNew';



const TesteSchema = Yup.object().shape({
  select: Yup.string().required('Campo obrigatório'),
  data: Yup.string().required('Campo obrigatório'),
});

export function SearchForm() {
 
  const { handleChange, submitForm, setFieldValue, values, validateForm, errors } = useFormik({
    initialValues: {
      data: '',
      select: '',

    },
    validationSchema: TesteSchema,
    onSubmit: values => {
      AlertService.success('Formulário sem erros!')
    }
  });



  function validar() {
    validateForm().then(errors => {
      if (Object.keys(errors).length) {
        AlertService.error('Formulário inválido')
      } else {
        submitForm();
      }
    })
  }

  return (
    <div className="App ">
      <div className="" >
        <div className="row">
          <div className="col-md-6" >
            <SelectNew 
              options={[{ label: 'Todos', value: 1 },]}
              value={values.select} 
              label="Categotia" 
              name="select" 
              onChange={handleChange} 
              error={errors.select} 
              placeholder='Todos'
            />
          </div>
          <div className="col-md-4">
            <Input  
              value={values.data} 
              name='data' 
              label="Data" 
              onChange={handleChange} 
              type="date"
              placeholder='Selecione uma data' 
            />
          </div>
          <div className="col-md-1  d-flex">
            <div className='pt-3 d-flex justify-content-end align-items-center'>
              <div className='m-btn primary' onClick={() => validar()}> 
              <i className="material-icons">search</i>Filtrar
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
