import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import loadingIcons from "../assest/loading.gif";
import noDataIcons from "../assest/nodata.gif";

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.searchProduct.url + query.search)

    const dataResponse = await response.json()
    setLoading(false)

    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()

  }, [query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (

          <div className='grid justify-center items-center'>
            <div className="flex flex-col justify-center items-center m-4 w-fit h-fit">
              <iframe src="https://giphy.com/embed/kUTME7ABmhYg5J3psM" width="480" height="360" allowFullScreen  className='no-hover mix-blend-multiply'></iframe>
             
            </div>
          </div>


        )
      }


      {
        data.length === 0 && !loading && (
          <div className='grid justify-center items-center'>
            <div className="flex flex-col justify-center items-center m-4 w-fit h-fit">
              <img src={noDataIcons} alt="Login Icon" className="rounded-full w-52 h-52 m-4 mix-blend-multiply" />

              <p className='text-3xl text-center font-semibold text-red-600 m-4'>No Data Found!</p>
            </div>
          </div>
        )
      }

      {
        data.length !== 0 && !loading && (
          <div>
            <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>
            <VerticalCard loading={loading} data={data} />
          </div>

        )
      }



    </div>
  )
}

export default SearchProduct