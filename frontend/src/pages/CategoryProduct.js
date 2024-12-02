import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  })



  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")


  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data || [])

  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }

      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    //format for url change when changing the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if(value === "ascend"){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value === "descend"){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=>{

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>

      {/**Desktop version */}
      <div className='hidden md:grid grid-cols-[200px,1fr]'>

        {/**left panel */}
        <div className='bg-white p-2 min-h-[calc(100vh-190px)] rounded-xl overflow-y-scroll scrollbar-none'>

          {/**sortBy */}
          <div className='p-1'>
            <h3 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-400'>Sort by</h3>

            <p className='mt-2'>Price</p>

            <form className='text-sm flex flex-col gap-2 py-2'>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === "ascend"} value={"ascend"} onChange={handleOnChangeSortBy}/>
                <label>Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === "descend"} value={"descend"} onChange={handleOnChangeSortBy}/>
                <label>High to Low</label>
              </div>

            </form>
          </div>

          {/** filter by category */}
          <div className='p-1'>
            <h3 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-400'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>

              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3'>
                      <input
                        type='checkbox'
                        name={"category"}
                        value={categoryName?.value}
                        id={categoryName?.value}
                        onChange={handleSelectCategory}
                        checked={selectCategory[categoryName.value]} />
                      <label htmlFor={categoryName.value}>{categoryName.label}</label>
                    </div>
                  )
                })
              }

            </form>
          </div>

        </div>

        {/**right panel (product) */}
        <div className='px-4'>
          <p className='font-medium text-lg text-slate-800 mb-2'>Search Results: {data.length}</p>
          <div className='min-h-[calc(100vh-190px)] overflow-scroll max-h-[calc(100vh-190px)] scrollbar-none'>
          {
            data.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )
          }
          </div>
        </div>

      </div>

    </div>
  )
}

export default CategoryProduct