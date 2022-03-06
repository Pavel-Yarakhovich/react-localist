import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";

import Button from "../shared/Button";
import { convertUpdatedTableDataToJsonLikeStructure } from "../utils";

const Styles = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid ${({ theme }) => theme.white};

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.white};
      border-right: 1px solid ${({ theme }) => theme.white};

      :last-child {
        border-right: 0;
      }

      textarea {
        width: 100%;
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        resize: none;
        color: inherit;
        font-family: inherit;
        background-color: transparent;
      }
    }

    th {
      color: ${({ theme }) => theme.neon};
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const ButtonsWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <textarea rows={3} value={value} onChange={onChange} onBlur={onBlur} />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset, templateFile }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const props = column.getHeaderProps();
                console.log(
                  props.key,
                  props.key.replace("header_", "") === templateFile?.name
                );
                const is_template =
                  props.key.replace("header_", "") === templateFile?.name;
                return (
                  <th {...props} istemplate={is_template ? 1 : 0}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const DataTable = (props) => {
  console.log("PROSP ", props);
  const columns = React.useMemo(
    () => [
      {
        Header: "Languages",
        columns: props.data.columns,
      },
    ],
    [props.data]
  );

  const [data, setData] = React.useState(props.data?.data ?? []);
  const [originalData] = React.useState(props.data.data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const resetData = () => setData(originalData);

  const downloadUpdatedData = () => {
    convertUpdatedTableDataToJsonLikeStructure(data);
  };

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        templateFile={props.templateFile}
      />
      <ButtonsWrapper>
        <Button onClick={resetData}>Reset Data</Button>
        <Button onClick={downloadUpdatedData}>Download</Button>
      </ButtonsWrapper>
    </Styles>
  );
};

export default DataTable;
