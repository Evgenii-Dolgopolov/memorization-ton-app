import React from "react"

const Footer = () => {
  return (
    <menu className="bg-purple-200 h-1/6">
      <div className=" h-full flex m-auto justify-around">
      <button className="w-full border-2 border-indigo-800">Create deck</button>
      <button className="w-full border-2 border-indigo-800">Start learning</button>
      <button className="w-full border-2 border-indigo-800">Statistics</button>
      <button className="w-full border-2 border-indigo-800">Settings</button>
      </div>
    </menu>
  )
}

export default Footer