import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData
}) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handelUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }

    /**upload product */

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.uploadProduct.url,{
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if(responseData.error){
            toast.error(responseData?.message)
        }

    }

    return (
        <div className='fixed w-full h-full bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className='bg-white shadow-md w-full max-w-2xl h-full max-h-[80%] p-4 rounded-md overflow-hidden'>
                <div className='placeCloseUploadProduct'>
                    <button className='block ml-auto p-1 bg-red-600 rounded-full hover:bg-red-800 absolute text-white' onClick={onClose}>
                        <IoClose />
                    </button>
                </div>
                <div className=''>
                    <h2 className='font-bold text-lg bg-white p-4'>Upload Product</h2>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='grid p-4 gap-2 overflow-y-scroll h-full pb-5 scrollbar-none'>
                    <label htmlFor='productName'>Product Name: </label>
                    <input type='text'
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-1 bg-slate-100 border rounded focus-within:shadow outline-none' 
                        required/>


                    <label htmlFor='brandName' className='mt-3'>Brand Name: </label>
                    <input type='text'
                        id='brandName'
                        placeholder='Enter Brand Name'
                        value={data.brandName}
                        name='brandName'
                        onChange={handleOnChange}
                        className='p-1 bg-slate-100 border rounded focus-within:shadow outline-none' 
                        required/>


                    <label htmlFor='category' className='mt-3'>Category: </label>
                    <select
                        value={data.category}
                        onChange={handleOnChange}
                        name='category'
                        className='p-1 bg-slate-100 border rounded focus-within:shadow outline-none'
                        required>
                        <option value={""} disabled>Select Category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index} required>{el.label}</option>
                                )
                            })
                        }
                    </select>


                    <label htmlFor='productImage' className='mt-3'>Product Image: </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-600 flex justify-center items-center flex-col gap-2'>
                                <span className='text-5xl'><IoMdCloudUpload /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' multiple id='uploadImageInput' className='hidden' onChange={handelUploadProduct} required/>
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img src={el}
                                                        width={80}
                                                        height={80}
                                                        alt={el}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }} />
                                                    <div className='absolute bottom-0 right-0 bg-red-400 p-1 rounded-full cursor-pointer hover:bg-red-600 hover:text-white hidden group-hover:block'
                                                        onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }
                    </div>


                    <label htmlFor='price' className='mt-3'>Price: </label>
                    <input type='number'
                        id='price'
                        placeholder='Enter Price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-1 bg-slate-100 border rounded focus-within:shadow outline-none' 
                        required/>


                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price: </label>
                    <input type='number'
                        id='sellingPrice'
                        placeholder='Enter Selling Price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-1 bg-slate-100 border rounded focus-within:shadow outline-none ' 
                        required/>


                    <label htmlFor='description' className='mt-3'>Description: </label>
                    <textarea
                        className='h-28 bg-slate-100 focus-within:shadow outline-none rounded p-1 border resize-none scrollbar-none'
                        id='description'
                        placeholder='Enter Product Description'
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                        required
                        
                        
                        rows={3}>

                    </textarea>


                    <button className='px-2 py-2 bg-red-600 hover:bg-red-800 text-white mb-14 rounded'>Upload Product</button>



                </form>



            </div>

            {/**display image in full screen */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default UploadProduct