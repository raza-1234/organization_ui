import "../../css/Pagination.css";
import React, {useState, useEffect, Fragment} from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import classNames from "classnames";

import Select from "./Select";

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

  const [pages, setPages] = useState<number[]>();
  const [startPage, setStartPage] = useState<number>();
  const [endPage, setEndPage] = useState<number>();

  useEffect(() => {
    const pages = totalPages(totalDataCount, pageCount);
    if (pages.length){
      setPages(pages)
      paginationEllipse(currentPage, pages);
    }
  }, [totalDataCount, currentPage, pageCount]);

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
    pagnitation_page_change: true,
    disable_page_change_button: currentPage === 1,
    enable_page_change_button:  currentPage > 1,
  });

  const nextPageButtonClasses = classNames({
    pagnitation_page_change: true,
    disable_page_change_button: !moreData,
    enable_page_change_button:  moreData,
  });

  const paginationEllipse = (currentPage: number, pages: number[]) => {
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(3, pages.length);
    } else if (endPage > pages.length) {
      endPage = pages.length;
      startPage = Math.max(1, endPage - 2);
    }

    setStartPage(startPage)
    setEndPage(endPage);
  }

  return (
    <Fragment>
      {startPage && endPage && 
        <div className="pagination_wrapper">
          <div className="pages_link_wrapper">
            <button
              disabled={currentPage === 1}
              className={`${previousPageButtonClasses} ${previousButtonClass && previousButtonClass}`}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <GrFormPrevious className={previousArrowClass} /> 
              <p>Previous</p>
            </button>
            {startPage! > 1 && <p className={ellipsisClass}>...</p>}
            {pages?.slice(startPage! - 1, endPage).map((page) => (
              <p
                key={page}
                className={`cursor ${page === currentPage && `selected_page ${selectedPageClass}`}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </p>
            ))}
            {endPage! < pages!?.length && <p className={ellipsisClass}>...</p>}
            <button
              disabled={!moreData}
              className={`${nextPageButtonClasses} ${nextButtonClass}`}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <p>Next</p>
              <GrFormNext className={nextArrowClass} />
            </button>
          </div>
          <div className="data_limit_wrapper">
            <span className="select_limit_label">Rows Per Page</span>
            <Select
              onChange={onPageSizeChanged}
              payLoad={dataPerPage()}
              initialValue={pageCount?.toString()}
              searchAble={false}
              className="page_limit"
            />
          </div>
        </div>
      }
    </Fragment>
  );
};

export default Pagination;
