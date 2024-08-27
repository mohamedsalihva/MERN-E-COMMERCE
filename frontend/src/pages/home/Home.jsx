import React from 'react'
import ProductCategory from '../../component/productcategory/ProductListCategory'
import Banner from '../../component/banner/Banner'
import ProductCard from '../../component/productcard/ProductCard'
import Footer from '../../component/footer/Footer'

function Home() {
  return (
    <div id='Home'>
      <ProductCategory />
      <Banner />
      <ProductCard category={"airpodes"} heading={"Top Selling Airpodes"} />
      <ProductCard category={"mobile"} heading={"Top Selling SmartPhones"} />
      <ProductCard category={"speakers"} heading={"Popular speaker Brands"} />
      <ProductCard category={"earphones"} heading={"Best earphones"} />
      <ProductCard category={"tv"} heading={"Televisions"} />
      <ProductCard category={"watches"} heading={"Watches"} />
      <Footer /> 
    </div>
  )
}

export default Home
