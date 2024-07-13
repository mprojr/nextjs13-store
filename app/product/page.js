"use client"
import useCart from "../(store)/store"

export default function ProductPage(props) {
  const { searchParams } = props
  const { price_id } = props
  const product = useCart(state => state.product)
  const {cost, productInfo, name, description } = product



  console.log(product)
  console.log(searchParams)

  /* To not loose information on refresh */
  if (!product?.name) {
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto">
        <div className="md:p-2 shadow">
          <img src={productInfo.images[0]} alt={name} className='w-full h-full object-cover'/>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex md:flex-col md:items-start text-xl justify-between gap">
            <h3>{name}</h3>
            <p className="md:text-base">${cost}</p>
          </div>
          <p className="text-sm flex-1">{description}</p>
          <button className="bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto px-4 py-2">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}