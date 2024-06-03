import React from 'react'
import ProductCategory from '../../component/productcategory/ProductListCategory'
import Banner from '../../component/banner/Banner'
import ProductCard from '../../component/productcard/ProductCard'

function Home() {
  return (
    <div>
    <ProductCategory/>
    <Banner/>
    <ProductCard  category={"airpodes"} heading={"Top Selling Airpodes"}/>
    <ProductCard  category={"mobile"} heading={"Top Selling SmartPhones"}/>
    <ProductCard  category={"speakers"} heading={"Popular speaker Brands"}/>
    <ProductCard  category={"earphones"} heading={"Best earphones"}/>
    <ProductCard  category={"mouse"} heading={"Mouse"}/>
    <ProductCard  category={"processors"} heading={"Processors"}/>
    <ProductCard  category={"tv"} heading={"Televisions"}/>
    <ProductCard  category={"camera"} heading={"Cameras"}/>
    <ProductCard  category={"printers"} heading={"Printers"}/>
    <ProductCard  category={"refrigerator"} heading={"Refrigerator"}/>
    <ProductCard  category={"trimmers"} heading={"Trimmers"}/>
    <ProductCard  category={"watches"} heading={"Watches"}/>
    </div>
  )
}

export default Home
