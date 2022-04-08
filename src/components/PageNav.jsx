const PageNav = ({ currentPage, nbrOfPages, setCurrentPage }) => {
  const buttons = []

  if (nbrOfPages <= 3) {
    for (let i = 0; i < nbrOfPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={
            currentPage === i + 1
              ? 'paginate_button current'
              : 'paginate_button'
          }
        >
          {i + 1}
        </button>
      )
    }
  } else if (nbrOfPages > 3 && currentPage <= 2) {
    for (let i = 0; i < 3; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={
            currentPage - 1 === i
              ? 'paginate_button current'
              : 'paginate_button'
          }
        >
          {i + 1}
        </button>
      )
    }
  } else {
    for (let i = -1; nbrOfPages === currentPage ? i < 1 : i < 2; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(currentPage + i)}
          className={i === 0 ? 'paginate_button current' : 'paginate_button'}
        >
          {currentPage + i}
        </button>
      )
    }
  }

  return (
    <div className="dataTable_paginate">
      {currentPage !== 1 && (
        <>
          <p onClick={() => setCurrentPage(1)} className="paginate_button">
            First
          </p>
          <p
            onClick={() => setCurrentPage(currentPage - 1)}
            className="paginate_button"
          >
            Previous
          </p>
        </>
      )}
      <span>
        {currentPage > 2 && '...'}
        {buttons}
        {nbrOfPages > 3 && currentPage < nbrOfPages - 1 && '...'}
      </span>

      {currentPage !== nbrOfPages && nbrOfPages !== 0 && (
        <>
          <p
            onClick={() => setCurrentPage(currentPage + 1)}
            className="paginate_button"
          >
            Next
          </p>
          <p
            onClick={() => setCurrentPage(nbrOfPages)}
            className="paginate_button"
          >
            Last
          </p>
        </>
      )}
    </div>
  )
}

export default PageNav
