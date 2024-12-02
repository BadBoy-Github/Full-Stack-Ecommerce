import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common';
import Context from '../context';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {

        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
        })


        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData?.data)
        }

    }
    const handleLoading = async () => {
        await fetchData()

    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }

    }

    const handlePayment = async () => {

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                cartItems: data
            })
        })

        const responseData = await response.json()

        console.log("payment response", responseData)

        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id })
        }

    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)

    const totalPrice = data.reduce((preve, curr) => preve + (curr?.quantity * curr?.productId?.sellingPrice), 0)


    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <div className='absolute top-0 bottom-20 right-0 left-0 flex flex-col justify-center items-center'>
                            <div className=' h-60 w-60 rounded-xl'>
                                <img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png' alt='empty cart' className='p-2' />

                            </div>

                            <div>
                                <p className='font-semibold text-xl'>Cart is Empty</p>
                                <p className='font-normal'>Come here after adding products to your cart</p>
                            </div>

                        </div>
                    )
                }
            </div>

            <div className='flex flex-col md:flex-row gap-10 md:justify-between p-4'>
                {/**view product */}
                <div className='w-full max-w-4xl'>
                    {
                        loading ? (
                            // loading
                            loadingCart.map((el, index) => {
                                return (
                                    <div
                                        key={el + index}
                                        className='w-full bg-slate-200 h-32 my-2 border border-slate-300 rounded animate-pulse'>

                                    </div>
                                )
                            })
                        ) : (
                            // product view
                            data.map((product, index) => {
                                return (
                                    <div
                                        key={product + "Add To Cart Loading"}
                                        className='w-full bg-white h-32 my-2 border border-slate-300 rounded-xl grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200 rounded-xl p-1'>
                                            <img
                                                src={product?.productId?.productImage[0]}
                                                alt=''
                                                className='w-full h-full object-scale-down p-0.5 mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/**Delete product */}
                                            <div className='absolute flex justify-center items-center text-lg mr-2 right-0 border border-red-600 text-red-600 p-1 rounded-full hover:bg-red-600 hover:text-white cursor-pointer'
                                                onClick={() => deleteCartProduct(product?._id)}>
                                                < MdDelete />
                                            </div>

                                            <h2 className='text-lg md:text-xl md:max-w-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <div className='flex gap-4'>
                                                <p className='bg-red-200 text-red-600 text-sm px-2 rounded-full flex justify-center items-center'>{product?.productId?.brandName}</p>
                                                <p className='flex capitalize text-slate-400'>{product?.productId?.category}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white rounded-full w-6 h-6 flex justify-center items-center p-1.5'
                                                    onClick={() => decreaseQty(product?._id, product?.quantity)}><FaMinus /></button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white rounded-full w-6 h-6 flex justify-center items-center p-1.5'
                                                    onClick={() => increaseQty(product?._id, product?.quantity)}><FaPlus /></button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/**summary */}
                {
                    data[0] && (
                        <div className='mt-5 md:mt-0 w-full max-w-xl p-2'>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded'>

                                    </div>

                                ) : (
                                    <div className='h-40 bg-white rounded-xl border border-red-600'>
                                        <h2 className='text-white bg-red-600 px-4 py-1 rounded-t-xl font-medium'>Cart Summary</h2>
                                        <div className='px-4 flex items-center justify-between gap-2 font-medium text-lg text-slate-600'>
                                            <p>Quantity: </p>
                                            <p>{totalQty}</p>
                                        </div>
                                        <div className='px-4 flex items-center justify-between gap-2 font-medium text-lg text-slate-600'>
                                            <p>Total Price: </p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>

                                        <div className='flex justify-center mt-3 gap-4'>
                                            <button className='border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded min-w-60 font-semibold transition-all flex justify-center items-center'
                                                onClick={handlePayment}>Online Payment</button>
                                            
                                        </div>


                                    </div>

                                )
                            }
                        </div>
                    )
                }



            </div>

        </div>
    )
}

export default Cart