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
                <p>{JSON.stringify(ele.publications)}</p>
                <p>{JSON.stringify(ele.journals)}</p>
                <p>{JSON.stringify(ele.conferences)}</p>
                <p>{JSON.stringify(ele.books)}</p>
                <p>{JSON.stringify(ele.patents)}</p>
                <p>{JSON.stringify(ele.copyrights)}</p>
            </div>)
         }
    </div>
  )
}

export default Table