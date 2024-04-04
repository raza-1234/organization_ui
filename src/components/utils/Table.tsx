import "../../css/Table.css";

import React from 'react';
import Loader from "./Loader";
import { ColumnType } from "../../types/types";
import Pagination from "./Pagination";

type ParentProp = {
  columns?: ColumnType[],
  data?: any[],
  isLoading?: boolean,
  didFail?: boolean,
  error?: string,
  onRowClicked?: () => void,
  pageCount?: number,
  onPageChange: (value: number) => void,
  // onSortChanged: () => void, what this prop will do?
  onPageSizeChanged: (value: string) => void
  currentDataCount: number;
  totalDataCount: number;
  moreData: boolean;
  currentPage: number
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
    currentDataCount,
    totalDataCount,
    moreData,
    currentPage
  } = prop;

  const rowClickHandler = () => {
    onRowClicked && onRowClicked();
  }

  return (
    <>
      {
        !didFail && !error && data?.length && !isLoading ?
        <div className="table_Wrapper container">
          <table className='table'>
            <thead className='table_header'>
              <tr className='table-header_row'>
                {columns?.map((column, index) => (
                  <th
                    key={index + 1}
                    className={`table-header_cell ${column.className}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                data?.map((item) => (
                  <tr 
                    key={item.id}
                    className="table-body_row"
                    onClick={rowClickHandler}
                  >
                    {
                      columns?.map((column, index) => (
                        <td 
                          key={index + 1}
                          className="table-body_Cell"
                        >
                          {
                            !column.render?
                            (column.field && item[column.field])
                            :column.render(column.field && item[column.field], item)
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
            }
            </tbody>
          </table>
          <Pagination
            onPageChange={onPageChange}
            pageCount = {pageCount}
            onPageSizeChanged = {onPageSizeChanged}
            currentDataCount={currentDataCount}
            totalDataCount={totalDataCount}
            moreData={moreData}
            currentPage={currentPage}
          />
        </div>
        :
          <div className="status">
            {
              isLoading ?
              <>
                <Loader/>
                <h4>Loading ...</h4>
              </>
              :
              !error && !data?.length ? 
              <h4 className="tableError">Nothing To Show In Table</h4>
              : error && <h4 className="tableError">{error}</h4>
            }
          </div>
      }
    </>
  )
}

export default Table
