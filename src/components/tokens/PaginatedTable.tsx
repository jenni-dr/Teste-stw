import React from "react";

type TableType = {
  columns: PaginatedTableHeader[];
  data?: any[];
  page: number;
  id?: string;
  totalPages?: number;
  onChangePage: (page: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
};

export type PaginatedTableHeader = {
  title: string;
  field?: string;
  render?: (data: any) => React.ReactNode;
};

export const PaginatedTable: React.FC<TableType> = ({
  columns,
  data,
  page,
  id = "",
  totalPages,
  onChangePage,
  isLoading,
  emptyMessage,
}) => {
  function renderData(data: any[] | undefined) {
    if (!(data && columns)) return;
    if (!data?.length) {
      return (
        <tr key={`data-row-empty`}>
          <td colSpan={columns.length}>
            {emptyMessage ? emptyMessage : "Sem dados"}
          </td>
        </tr>
      );
    }
    let newData: any[] = [];
    data.forEach((data) => {
      let aux: { [key: string]: React.ReactNode } = {};
      if(!data) return;

      columns.forEach((h) => {
        if(!h) return;

        const currentValue = h?.field ? data[h?.field] : {};
        const currentData = data;
        aux[h.title] = h.render ? h.render(currentData) : currentValue;
      });
      newData.push(aux);
    });

    return newData.map((data, index) => (
      <tr key={`data-row-${index}`}>
        {columns.map((column, i) => (
          <>
            {!isNaN(Number(i)) &&
              <td
                key={`data-td-${typeof data[column.title] === "string" && column.title
                  ? data[column.title]
                  : `${index}-${i}`
                  }`}
              >
                {data[column.title]}
              </td>
            }
          </>
        ))}
      </tr>
    ));
  }

  function renderPages() {
    if (!(totalPages && page)) {
      return (
        <div
          key={`pagina-1-${id}`}
          onClick={() => null}
          className={" page current-page"}
        >
          1
        </div>
      );
    }

    let paginas = calculateRange();
    const classNamePage = (pagina: any) => (pagina === "" ? "" : " page");
    const classNameCurrentPage = (pagina: any) =>
      pagina !== "" && pagina === page ? " current-page" : "";

    return paginas.map((pagina) => (
      <div
        key={`pagina-${pagina}-${id}`}
        style={{lineHeight: 0}}
        onClick={() => (pagina === "" ? null : onChangePage(pagina))}
        className={
          "p-2" +
          "  cursor-pointer " +
          classNamePage(pagina) +
          classNameCurrentPage(pagina)
        }
      >
        {pagina ? pagina :  '...'}
      </div>
    ));
  }

  const calculateRange = (): any[] => {
    if (!totalPages) return [];
    const range = [];
    const pagina = page;
    let i = pagina >= Math.abs(totalPages - 5) ? totalPages - 5 : pagina;
    i = i < 1 ? 1 : i;

    for (i; i <= totalPages && range.length < 5; i++) {
      range.push(i);
    }

    const lastPageOnArray = range[range.length - 1];
    const firstPageOnArray = range[0];

    if (lastPageOnArray !== totalPages && range.length >= 5) {
      if (lastPageOnArray !== totalPages - 1) {
        range.push("");
      }
      range.push(totalPages);
    }

    if (firstPageOnArray !== 1) {
      if (range.length >= 5) {
        range.unshift("");
      }
      range.unshift(1);
    }

    return range;
  };

  return (
    <div className="paginated-table">
      <table className="m-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={`cabeçalho-${column.title}`}>
                {column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderData(data)}</tbody>
      </table>
      <div className="d-flex align-items-center mt-3 mb-3 justify-content-center ">
        <button
          disabled={page === 1}
          style={{ border: "none", background: "transparent" }}
          onClick={() => onChangePage(page - 1)}
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <div className="d-flex pl-3 pr-3">{renderPages()}</div>
        <button
          style={{ border: "none", background: "transparent" }}
          disabled={!totalPages || (page) === (totalPages ? totalPages : 0)}
          onClick={() => onChangePage(page + 1)}
        >
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
      {isLoading && (
        <div className="loader-container noselect">
          <i className="material-icons">autorenew</i>
        </div>
      )}
    </div>
  );
};
