import "../../css/Table.css";

import { Fragment } from 'react';

import { Column } from "../../types/types";
import Pagination from "./Pagination";
import DataStates from "./DataStates";

type ParentProp = {
  columns?: Column[],
  data: any[],
  isLoading?: boolean,
  didFail?: boolean,
  error?: string,
  onRowClicked?: () => void,
  pageCount?: number,
  onPageChange: (value: number) => void,
  // onSortChanged: () => void, what this prop will do?
  onPageSizeChanged: (value: string) => void
  totalDataCount: number;
  moreData: boolean;
  currentPage: number;
  refetchAssets?: () => void
}

const Table = (prop: ParentProp) => {
  const {
    columns,
    data,
    isLoading = false,
    didFail = false,
    error,
    onRowClicked,
    pageCount,
    onPageChange,
    onPageSizeChanged,
    totalDataCount,
    moreData,
    currentPage,
    refetchAssets
  } = prop;

  const rowClickHandler = () => {
    onRowClicked && onRowClicked();
  }

  const tableStates = (
    isDataLoading: boolean,
    isEmpty: boolean,
    isError: boolean,
    message: string
  ) => {
    return (
      <div className="table-status_wrapper">
      <DataStates
        isError={isError}
        errorMessage={message}
        isEmpty={isEmpty}
        isLoading={isDataLoading}
        loadingMessage={message}
        emptyMessage={message}
      />
    </div>
    )
  }

  const tableHeaders = (column: Column, index: number) => (
    <th
      key={index + 1}
      className={`table-header_cell ${column.className}`}
      style={{width: column.width}}
    >
        {column.header}
    </th>
  )


  return (
    <Fragment>
      {didFail && tableStates(isLoading, false, didFail, error || '')}
      <div className="table_Wrapper container">
        <table className='table'>
          <thead className='table_header'>
            <tr className='table-header_row'>
            {columns?.map((column, index) => (
              tableHeaders(column, index)
            ))}
            </tr>
          </thead>
          <tbody className='table_body'>
            {data?.length > 0 && data?.map((item) => (
              <tr
                key={item.id}
                className="table-body_row"
                onClick={rowClickHandler}
              >
                {columns?.map((column, index) => (
                    <td 
                      key={index + 1}
                      className="table-body_Cell"
                    >
                      {column.render? 
                        column.render(column.field && item[column.field], item)
                        : (column.field && item[column.field])
                      }
                    </td>
                  ))
                }
              </tr>
            ))}
            <tr className="table-body_status-row table-body_row">
              <td colSpan={columns?.length}>
                {tableStates(isLoading, 
                  !isLoading ? false : true, 
                  didFail,
                  isLoading ? 'Loading Table Data...' : data?.length === 0 ? "No Data Found" : ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {data?.length > 0 &&
          <Pagination
            onPageChange= {onPageChange}
            pageCount= {pageCount}
            onPageSizeChanged= {onPageSizeChanged}
            totalDataCount= {totalDataCount}
            moreData= {moreData}
            currentPage= {currentPage}
          />
        }
      </div>
    </Fragment>
  )
}

export default Table
