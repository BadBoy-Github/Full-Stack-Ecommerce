import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCartProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })

  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()


  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })

  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }



  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col md:flex-row gap-4'>
        {/* product Image */}
        <div className='h-96 flex flex-col md:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] md:h-96 md:w-96 bg-slate-200 rounded-xl relative'>
            <img src={activeImage} alt='' className='h-full w-full object-scale-down mix-blend-multiply rounded-xl p-2'
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom} />

            {/**Product Zoom */}
            {
              zoomImage && (
                <div className='hidden md:block overflow-hidden absolute min-w-[500px] min-h-[500px] bg-slate-200 p-1 -right-[520px] top-0 rounded-xl'>
                  <div className='w-full h-full mix-blend-multiply min-h-[500px] min-w-[500px] rounded-xl scale-100'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}>
                  </div>
                </div>
              )
            }


          </div>

          <div className='h-full'>
            {
              loading ? (
                // loading
                <div className='flex gap-2 md:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 animate-pulse rounded-xl' key={"loadingImage" + index}>

                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                // image
                <div className='flex gap-2 md:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imageURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded-xl' key={imageURL}>
                          <img src={imageURL} alt='' className='w-full h-full object-scale-down mix-blend-multiply p-1 cursor-pointer rounded-xl'
                            onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                            onClick={() => handleMouseEnterProduct(imageURL)} />
                        </div>
                      )
                    })
                  }
                </div>

              )
            }
          </div>

        </div>

        {/* product Details */}
        {
          loading ? (
            // loading
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse rounded-full h-6 md:h-8 w-full inline-block'></p>
              <h2 className='bg-slate-200 animate-pulse h-6 rounded w-full md:h-8'></h2>
              <p className='bg-slate-200 animate-pulse min-w-[100px] h-6 w-full md:h-8'></p>

              <div className='rounded-full w-full bg-slate-200 h-6 animate-pulse md:h-8'>

              </div>

              <div className='flex items-center gap-4 md:text-2xl text-xl font-medium my-1 h-6 md:h-8 animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button
                  className='h-6 md:h-8 bg-slate-200 rounded animate-pulse w-full'>
                </button>
                <button
                  className='h-6 md:h-8 bg-slate-200 rounded animate-pulse w-full'>
                </button>
              </div>

              <div className='w-full'>
                <p className='text-slate-600 font-medium my-2 h-6 md:h-8 bg-slate-200 rounded animate-pulse w-full '></p>
                <p className='h-10 md:h-16 bg-slate-200 rounded animate-pulse w-full'></p>
              </div>

            </div>
          ) :
            (
              // product
              <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl md:text-3xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1 py-1 px-2 border-2 rounded-full w-fit shadow-md'>
                  < FaStar />
                  < FaStar />
                  < FaStar />
                  < FaStar />
                  < FaStarHalf />
                </div>

                <div className='flex items-center gap-4 md:text-2xl text-xl font-medium my-1'>
                  <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button
                    className='border-2 border-red-600 rounded-full px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all'
                  onClick={(e)=>handleBuyProduct(e, data?._id)}>
                    Buy</button>
                  <button
                    className='border-2 border-red-600 rounded-full px-3 py-1 min-w-[120px] hover:text-red-600 hover:bg-white font-medium bg-red-600 text-white transition-all'
                    onClick={(e) => handleAddToCart(e, data?._id)}>
                    Add to Cart</button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-2 w-fit'>Description</p>
                  <p>{data?.description}</p>
                </div>

              </div>
            )
        }


      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"} />
        )
      }



    </div>
  )
}

export default ProductDetails