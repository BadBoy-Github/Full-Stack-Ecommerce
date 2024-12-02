import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-4 px-4 rounded flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-4 rounded-full'
          onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap py-3 gap-3 h-[calc(100vh-210px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard 
              data={product} 
              key={index + "allProduct"} 
              fetchdata={fetchAllProduct} />

            )
          })
        }
      </div>

      { /**upload product component */}
      {
        openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchData={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProducts