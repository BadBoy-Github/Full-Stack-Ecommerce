import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })

    const responseData = await response.json()

    setData(responseData.data)

    console.log("order list", responseData)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])
  return (
    <div>
      {
        !data[0] && (
          <div className='flex flex-col justify-center items-center mt-8'>
            <img src="https://t3.ftcdn.net/jpg/01/95/11/48/360_F_195114824_QKrntCRxecs3MdqOT7oM9JJlOYxnT8nj.jpg" 
            alt=''
            className='w-72 h-72 mix-blend-multiply'/>
            <p className='font-bold text-xl'>No Order Available</p>
            <p className='font-normal'>Come here after ordering products</p>
          </div>
        )
      }

      <div className='p-4 w-full'>
      
      
        {
          
          data.map((item, index) => {
            return (
              
              <div key={item.userId + index} >

                <p className='font-medium text-lg mt-6 mb-2 hov_des w-fit'>{moment(item.createdAt).format('LLL')}</p>

                <div className='border rounded-xl'>
                  <div className='flex flex-col md:flex-row justify-between p-2'>
                    <div className='grid gap-2'>
                      {
                        item?.productDetails.map((product, index) => {
                          return (
                            <div key={product.productId + index} className='flex gap-4 '>
                              <img
                                src={product.image[0]}
                                alt=""
                                className='w-28 h-28 bg-slate-200 rounded-xl object-scale-down p-2 mix-blend-multiply' />
                              <div>
                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className='flex items-center gap-5 mt-1'>
                                  <div className='text-red-600 font-medium text-lg'>{displayINRCurrency(product.price)}</div>
                                  <div className='flex'>
                                    <p className='bg-red-200 text-red-600 px-2 py-0.5 rounded-full text-xs inline-block w-fit font-semibold'>Quantity : {product.quantity}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>

                    <div className='flex flex-col gap-4 py-2 min-w-[360px]'>
                      <div>
                        <div className='text-lg text-gray-800 font-semibold'>Payment Details</div>
                        <p className=' ml-2'> - Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                        <p className=' ml-2'> - Payment status : {item.paymentDetails.payment_status}</p>
                      </div>

                      <div>
                        <div className='text-lg text-gray-800 font-semibold'>Shipping Details</div>
                        {
                          item.shipping_options.map((shipping, index) => {
                            return (
                              <div key={shipping.shipping_rate + index}>
                                <p className=' ml-2'> - Shipping amount : {displayINRCurrency(shipping.shipping_amount)}</p>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className='text-lg font-semibold text-black ml-auto w-fit mb-2 mr-2'>
                    <h2 className='text-gray-800 font-semibold md:font-bold'>Total Amount : {displayINRCurrency(item.totalAmount)}</h2>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default OrderPage