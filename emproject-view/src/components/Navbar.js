import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-fuchsia-400 h-16 px-16 items-center flex">
      <h1 className="text-3xl text-white-500 font-bold font-serif"> 🔯 Employee Data </h1>
      <div className="space-x-4 ml-auto">
        <a  className="hover:text-purple-400 " href="/"> Home</a>
        <a  className="hover:text-purple-400"  href="/"> Profile</a>
        <a  className="hover:text-purple-400"  href="/"> Logout </a>
      </div>
    </div>

  )
}

export default Navbar