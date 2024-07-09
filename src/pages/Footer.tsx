import React from "react"

const Footer = () => {
  return (
    <menu className="h-1/6">
      <div className=" h-full flex m-auto justify-around">
        <button className="w-full border-2 border-none">
          <i className="fa-solid fa-layer-group fa-3x"></i>
        </button>
        <button className="w-full border-2 border-none">
          <i className="fa-solid fa-brain fa-3x"></i>
        </button>
        <button className="w-full border-2 border-none">
          <i className="fa-solid fa-chart-simple fa-3x"></i>
        </button>
        <button className="w-full border-2 border-none">
          <i className="fa-solid fa-gear fa-3x"></i>
        </button>
      </div>
    </menu>
  )
}

export default Footer
