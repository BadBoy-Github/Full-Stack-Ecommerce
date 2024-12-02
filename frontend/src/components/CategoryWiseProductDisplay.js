import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(14).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e, id)
        fetchUserAddToCart()

    }


    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)

    }

    useEffect(() => {
        fetchData()
    }, [])




    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className=' text-lg grid  grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-between md:gap-8 overflow-x-scroll scrollbar-none transition-all'>

                

                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-xl shadow-md'>
                                    <div className='bg-slate-200 h-52 p-4 min-w-[120px] md:min-w-[145px] rounded-xl flex justify-center items-center animate-pulse'>
                                    </div>

                                    <div className='p-4 grid gap-2 '>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></h2>
                                        <p className='capitalize text-slate-600 p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2 '></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2 '></p>
                                            <p className='text-slate-600 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2 '></p>
                                        </div>

                                        <button className='animate-pulse rounded-full bg-slate-200 text-base text-white px-3 w-full  py-2 '></button>

                                    </div>


                                </div>
                            )
                        })

                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-xl shadow-md'
                                onClick={scrollTop}>
                                    <div className='bg-slate-200 h-52 p-4 min-w-[120px] md:min-w-[145px] rounded-xl flex justify-center items-center'>
                                        <img src={product.productImage[0]} alt='' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>

                                    <div className='p-4 grid gap-2 '>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-600'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-600 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>

                                        <button className='bg-red-600 hover:bg-red-800 rounded-full text-base text-white px-3 py-0.5' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>

                                    </div>


                                </Link>
                            )
                        })

                    )

                }
            </div>


        </div>
    )
}

export default CategoryWiseProductDisplay