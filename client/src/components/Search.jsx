import React from 'react'

const Search = ({searchText,setSearchText}) => {

    return (
        <>
            <input className="form-control me-2 w-75" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
        </>
    )
}

export default Search