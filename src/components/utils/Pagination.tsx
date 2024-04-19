import "../../css/Pagination.css";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import classNames from "classnames";
import SearchableSelect from "./SearchableSelect";

type ParentProp = {
  currentDataCount?: number;
  totalDataCount?: number;
  moreData?: boolean;
  currentPage: number;
  onPageChange: (value: number) => void;
  pageCount?: number;
  onPageSizeChanged: (value: string) => void
}

const Pagination = (prop: ParentProp) => {
  const {
    onPageChange,
    onPageSizeChanged,
    pageCount,
    moreData,
    currentPage,
    totalDataCount
  } = prop;

  const totalPages = (totalData?: number, currentData?: number) => {    
    const pages = [];
    if (totalData && currentData){
      const totalPages = Math.ceil(totalData/currentData);
      for (let i = 1; i <= totalPages; i++){
        pages.push(i);
      }
    }
    return pages;
  }

  const dataPerPage = () => {
    const limit = [];
    for (let i = 5; i <= 50; i += 5 ){
      limit.push({
        id: i,
        value: i.toString()
      });
    }
    return limit;
  }

  const previousPageButtonClasses = classNames({
    "page_switcher_button": true,
    "disabled_cursor": currentPage === 1 ,
    "cursor": currentPage !== 1
  })

  const nextPageButtonClasses = classNames({
    "page_switcher_button": true,
    "disabled_cursor": !moreData,
    "cursor": moreData
  })

  const pages = totalPages(totalDataCount, pageCount);  
  
  return (
    <div className='pagination_wrapper'>
      <div className="pages_link_wrapper">
        <button 
          disabled={currentPage === 1} 
          className={previousPageButtonClasses}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <GrFormPrevious />
          <p className="previous_page">Previous</p>
        </button>
        {
          pages.map((page, index) => (
            <p key = {++index} 
            className={classNames({
              "cursor": true,
              "selected_page": page === currentPage
            })}
 
              onClick={() => onPageChange(page)}
            >
              {page}
            </p>
          ))
        }
        <button
          disabled = {!moreData}
          className={nextPageButtonClasses}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <p className="next_page">Next</p>
          <GrFormNext />
        </button>
      </div>
      <div className="data_limit_wrapper">
        <span className="select_limit_label">Rows Per Page</span>
        <SearchableSelect //instead of this we can use html select tag
          placeholder={pageCount?.toString()}
          onChange = {onPageSizeChanged}
          payLoad={dataPerPage()}
        />
        {/* <select 
          className="select_page_limit"
          onChange={(e) => onPageSizeChanged(e.target.value)}
        >
          <option disabled hidden>{pageCount}</option>
          {
            dataPerPage().map((data) => (
              <option key={data.id} value={data.value}>
                {data.value}
              </option>
            ))
          }
        </select> */}
      </div>
    </div>
  )
}

export default Pagination
