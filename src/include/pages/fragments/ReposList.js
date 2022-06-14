import { v4 as uuid } from 'uuid';
import React, { Component, useState } from 'react';
import Pagination from 'rc-pagination';
import localeInfo from '../../../locale/en_US';
function ReposList(props) {

  const [PerPage, SetPerPage] = useState(4);
  const [Size, setSize] = useState(PerPage);
  const [current, setCurrent] = useState(1);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(props.isPageDetals.repos.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  }

  const getGitData = (current, pageSize) => {
    return props.isPageDetals.repos.slice((current - 1) * pageSize, current * pageSize);
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  }

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return <div className="pagination__button"><div className="pagination__icon-less-than"></div></div>;
    }
    if (type === 'next') {
      return <div className="pagination__button"><div className="pagination__icon-greater-than"></div></div>;
    }
    return originalElement;
  }

  return (
    <>
      <div className="works_size__repositories">
        <h1 className="works_size__repositories-count">Repositories ({props.isPageDetals.userDetal.public_repos})</h1>
        {getGitData(current, Size).map((data, index) => {
          return (
            <div className="repository" key={uuid()}>
              <div className="repository__content">
                <a href={data.html_url} className="repository__href"  target="_blank">{data.name}</a>
                <span className="repository__description">{data.description} </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="pagination pagination__position">

        <Pagination
          className="pagination__position pagination__font"
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={PaginationChange}
          total={props.isPageDetals.repos.length}
          current={current}
          pageSize={Size}
          showSizeChanger={false}
          itemRender={PrevNextArrow}
          onShowSizeChange={PerPageChange}
          locale={localeInfo}
        />
      </div>
    </>
  );

}

export default ReposList;