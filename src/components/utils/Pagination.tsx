import "../../css/Pagination.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import classNames from "classnames";

import SearchableSelect from "./SearchableSelect";
import Select from "./SelectInput";

type ParentProp = {
  currentDataCount?: number;
  totalDataCount?: number;
  moreData?: boolean;
  currentPage: number;
  onPageChange: (value: number) => void;
  pageCount?: number;
  onPageSizeChanged: (value: string) => void;
  previousButtonClass?: string;
  nextButtonClass?: string;
  previousArrowClass?: string;
  nextArrowClass?: string;
  selectedPageClass?: string;
  ellipsisClass?: string
};

const Pagination = (prop: ParentProp) => {
  const {
    onPageChange,
    onPageSizeChanged,
    pageCount,
    moreData,
    currentPage,
    totalDataCount,
    previousButtonClass,
    nextButtonClass,
    previousArrowClass,
    nextArrowClass,
    selectedPageClass,
    ellipsisClass
  } = prop;

  const totalPages = (totalData?: number, currentDataCount?: number) => {
    const pages = [];
    if (totalData && currentDataCount) {
      const totalPages = Math.ceil(totalData / currentDataCount);
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const dataPerPage = () => {
    const limit = [];
    for (let i = 5; i <= 50; i += 5) {
      limit.push({
        id: i,
        value: i.toString(),
      });
    }
    return limit;
  };

  const previousPageButtonClasses = classNames({
    page_switcher_button: true,
    disabled_cursor: currentPage === 1,
    cursor: currentPage !== 1,
  });

  const nextPageButtonClasses = classNames({
    page_switcher_button: true,
    disabled_cursor: !moreData,
    cursor: moreData,
  });

  const paginationEllipse = (currentPage: number) => {
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(3, pages.length);
    } else if (endPage > pages.length) {
      endPage = pages.length;
      startPage = Math.max(1, endPage - 2);
    }

    return {startPage, endPage};
  }

  const pages = totalPages(totalDataCount, pageCount);
  const { startPage, endPage } = paginationEllipse(currentPage);

  return (
    <div className="pagination_wrapper">
      <div className="pages_link_wrapper">
        <button
          disabled={currentPage === 1}
          className={`${previousPageButtonClasses} ${previousButtonClass}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <GrFormPrevious className={previousArrowClass} />
          <p className="previous_page">Previous</p>
        </button>
        {startPage > 1 && <p className={ellipsisClass}>...</p>}
        {pages.slice(startPage - 1, endPage).map((page) => (
          <p
            key={page}
            className={`cursor ${page === currentPage && `selected_page ${selectedPageClass}`}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </p>
        ))}
        {endPage < pages.length && <p className={ellipsisClass}>...</p>}
        <button
          disabled={!moreData}
          className={`${nextPageButtonClasses} ${nextButtonClass}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <p className="next_page">Next</p>
          <GrFormNext className={nextArrowClass} />
        </button>
      </div>
      <div className="data_limit_wrapper">
        <span className="select_limit_label">Rows Per Page</span>
        <Select
          onChange={onPageSizeChanged}
          payLoad={dataPerPage()}
          placeholder={pageCount?.toString()}
        />
      </div>
    </div>
  );
};

export default Pagination;
