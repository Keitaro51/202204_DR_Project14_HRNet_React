const PageNav = ({ currentPage, nbrOfPages, setCurrentPage }) => {
  const buttons = []

  for (let i = 0; i < nbrOfPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={
          currentPage === i + 1 ? 'paginate_button current' : 'paginate_button'
        }
      >
        {i + 1}
      </button>
    )
  }

  return (
    <div className="dataTable_paginate">
      {currentPage !== 1 && (
        <p
          onClick={() => setCurrentPage(currentPage - 1)}
          className="paginate_button"
        >
          Previous
        </p>
      )}
      <span>{buttons}</span>

      {currentPage !== nbrOfPages && nbrOfPages !== 0 && (
        <p
          onClick={() => setCurrentPage(currentPage + 1)}
          className="paginate_button"
        >
          Next
        </p>
      )}
    </div>
  )
}

export default PageNav
