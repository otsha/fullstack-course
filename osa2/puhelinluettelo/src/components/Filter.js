import React from 'react'

const Filter = ({ value, setFilter }) => {

    return (
        <div>
            rajaa: <input
                value={value}
                onChange={(event) => {setFilter(event.target.value)}}
            />
        </div>
    )
}

export default Filter