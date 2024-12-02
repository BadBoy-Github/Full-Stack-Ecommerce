import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Top's Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Popular's Mobiles"}/>
      <VerticalCardProduct category={"earphones"} heading={"Popular's Earphones"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Popular's Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Popular's Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"speakers"} heading={"Top's speakers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"trimmers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"refrigerator"}/>
      <VerticalCardProduct category={"printers"} heading={"printers"}/>
      <VerticalCardProduct category={"laptops"} heading={"laptops"}/>
      <VerticalCardProduct category={"processor"} heading={"processor"}/>
      <VerticalCardProduct category={"sarees"} heading={"sarees"}/>

      
      
      
    </div>
  )
}

export default Home