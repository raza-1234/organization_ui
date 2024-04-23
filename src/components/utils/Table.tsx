import "../../css/Table.css";

import React from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

import Loader from "./Loader";
import { Column } from "../../types/types";
import Pagination from "./Pagination";
import Status from "./Status";

type ParentProp = {
  columns?: Column[],
  data?: any[],
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
    totalDataCount,
    moreData,
    currentPage
  } = prop;

  const rowClickHandler = () => {
    onRowClicked && onRowClicked();
  }

  return (
    <>
    {console.log('errrrrr', error)}
      {
        !didFail && !error  ?
        <div className="table_Wrapper container">
          <table className='table'>
            <thead className='table_header'>
              <tr className='table-header_row'>
                {columns?.map((column, index) => (
                  <th
                    key={index + 1}
                    className={`table-header_cell ${column.className}`}
                    style={{width: column.width}}
                  >
                    {column.header}
                    {/* {
                      column.sort && 
                      <span className="sort_data_icons">
                        <MdOutlineKeyboardArrowUp/>
                        <MdOutlineKeyboardArrowDown/>
                      </span>
                    } */}

                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='table_body'>
              {
                data?.length ?
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
                :
                <tr className="table-body_status-row table-body_row">
                  <td colSpan={columns?.length}>
                    {
                      isLoading ? 
                      <div className="table-status_wrapper">
                        <Loader/>
                        <Status
                          message="Loading Table Data ..."
                          variant="information"
                        />
                      </div>
                      :
                      <Status
                        message="nothing to show in table"
                        variant="information"
                      />
                    }
                  </td>
                </tr>
            }
            </tbody>
          </table>
          {
            data?.length !== 0 && data?.length &&
            <Pagination
              onPageChange={onPageChange}
              pageCount = {pageCount}
              onPageSizeChanged = {onPageSizeChanged}
              totalDataCount={totalDataCount}
              moreData={moreData}
              currentPage={currentPage}
            />
          }
        </div>
        :
          <div className="table-status_wrapper">
            {
              error &&
              <Status
                variant="error"
                message={error}
              />
            }
          </div>
      }
    </>
  )
}

export default Table
