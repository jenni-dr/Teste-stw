import { useState } from "react";
import { PaginatedTable, PaginatedTableHeader } from "../../../../tokens";



export function Produtos() {


  const [page, setPage] = useState(1);
  const [data, setData] = useState
    (
      {
        totalPages: 20, data:
          [
            { name: 'Mario Souza', result: 2025 },
            { name: 'Bruno Silva', result: 1882 },
            { name: 'Jennifer Silva', result: 1882 },
            { name: 'Bruna Souza', result: 1809 },
            { name: 'Lucas Souza', result: 1322 },
            { name: 'Raiza Leal', result: 1122 }]
      });

  function renderTable() {
    const columns: PaginatedTableHeader[] = [{ title: 'Nome', field: 'name' },
    { title: 'Jan', field: 'result' },
    { title: 'Fev', field: 'result' },
    { title: 'Mar', field: 'result' },
    { title: 'Abr', field: 'result' },
    { title: 'Mai', field: 'result' },
    { title: 'Jun', field: 'result' },
    { title: 'Jul', field: 'result' },
    { title: 'Ago', field: 'result' },
    { title: 'Set', field: 'result' },
    { title: 'Out', field: 'result' },
    { title: 'Nov', field: 'result' },
    { title: 'Dez', field: 'result' }

    ];

    return (
      <PaginatedTable
        data={data.data}
        columns={columns}
        page={page}
        totalPages={data.totalPages}
        onChangePage={p => setPage(p)}
      />
    )
  }


  return (
    <div style={{ 'marginTop': '72px' }}>
      <h3>Relção Mensal</h3>
      <div className="m-card">
        {renderTable()}
      </div>
    </div>




  )
}