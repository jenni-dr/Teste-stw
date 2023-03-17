import Period from '../../../../../assets/residuos.svg';

export function CardDasbord() {
  return (
    <div className="App" style={{ marginTop: '72px' }}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="m-card">
            <div className="d-flex justify-content-center align-items-center mt-3">
              <img src={Period} alt="" />
            </div>
            <div
              className="d-flex justify-content-center align-items-center mt-3"
              style={{ color: '#1474FF', fontSize: '38px' }}
            >
              200
            </div>
            <div
              className="d-flex justify-content-center align-items-center mt-2 mb-2"
              style={{ fontSize: '18px' }}
            >
              Mensal
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="m-card">
            <div className="d-flex justify-content-center align-items-center mt-3">
              <img src={Period} alt="" />
            </div>
            <div
              className="d-flex justify-content-center align-items-center mt-3"
              style={{ color: '#1474FF', fontSize: '38px' }}
            >
              432
            </div>
            <div
              className="d-flex justify-content-center align-items-center mt-2 mb-2"
              style={{ fontSize: '18px' }}
            >
              Bimestral
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
