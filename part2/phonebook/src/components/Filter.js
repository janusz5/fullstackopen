import React from 'react'
const Filter = ({ personFilter, handlePersonFilterChange }) => {
  return (
    <div>
            filter shown with <input value={personFilter} onChange={handlePersonFilterChange}/>
    </div>
  )
}

export default Filter