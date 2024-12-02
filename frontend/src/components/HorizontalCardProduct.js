import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(14).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

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

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none text-lg transition-all' ref={scrollElement}>

                <button
                    className='bg-white shadow-md rounded-full p-2 opacity-50 left-0 absolute text-3xl hidden md:block transition-all z-20'
                    onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>

                <button
                    className='bg-white shadow-md rounded-full p-2 opacity-50 right-0 absolute text-3xl hidden md:block transition-all z-20'
                    onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[300px] md:min-w-[360px] max-w-[300px] md:max-w-[360px]  h-36 bg-white rounded-xl shadow-md flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-xl animate-pulse'>
                                        
                                    </div>

                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 py-'></h2>
                                        <p className='capitalize text-slate-600 p-1 bg-slate-200 animate-pulse'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse'></p>
                                            <p className='text-slate-600 line-through p-1 bg-slate-200 w-full animate-pulse'></p>
                                        </div>

                                        <button className='rounded-full text-base text-white px-3 py-0.5 w-full bg-slate-200 animate-pulse'></button>

                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"product/"+product?._id} className='w-full min-w-[300px] md:min-w-[360px] max-w-[300px] md:max-w-[360px]  h-36 bg-white rounded-xl shadow-md flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-xl'>
                                        <img src={product.productImage[0]} alt='' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>

                                    <div className='p-4 grid'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-600'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium w-full'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-600 line-through w-full'>{displayINRCurrency(product?.price)}</p>
                                        </div>

                                        <button className='bg-red-600 hover:bg-red-800 rounded-full text-base text-white px-3 py-0.5 w-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>

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

export default HorizontalCardProduct