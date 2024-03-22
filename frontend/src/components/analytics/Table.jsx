import React from 'react'
import "./Table.scss"
const Table = ({data}) => {
  return (
    <div className='out'>
         <div>
            <h2>Period</h2>
            <h2>Total</h2>
            <h2>Journals</h2>
            <h2>Conferences</h2>
            <h2>Book Chapters</h2>
            <h2>Patents</h2>
            <h2>Copyrights</h2>
         </div>
         {
            data.map(ele=><div>
                <p>{`${ele.periodS}-${ele.periodS+1}`}</p>
                <p>{ele.publications}</p>
                <p>{ele.journals}</p>
                <p>{ele.conferences}</p>
                <p>{ele.books}</p>
                <p>{ele.patents}</p>
                <p>{ele.copyrights}</p>
            </div>)
         }
    </div>
  )
}

export default Table