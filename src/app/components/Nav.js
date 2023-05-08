import React, { useState } from 'react'

function Nav() {
  const[isToggle, setIsToggle]= useState(false)
  const handleNav = ()=> {
    console.log(isToggle)
    setIsToggle(!isToggle)
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light f-500">
      <div className="container">
      <a className="navbar-brand" href="#">
        <img src="./logo.svg" width="95" height="95" className="d-inline-block align-top" alt=""/>
      </a>
    <button className="navbar-toggler-c" type="button" onClick={()=>{handleNav()}}>
      <img src={isToggle ? "./delete.svg" : "./hamburgur.svg"}></img>
    </button>
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item">
         <a className="nav-link f-Green" aria-current="page" href="Direction">使用說明</a>
        </li>
        <li className="nav-item">
         <a className="nav-link f-Green" href="/Payment">收費方式</a>
        </li>
        <li className="nav-item">
          <a className="nav-link f-Green" href="#">站點資訊</a>
        </li>
        <li className="nav-item">
          <a className="nav-link f-Green" href="/News" tabindex="-1" aria-disabled="true">最新消息</a>
        </li>
        <li className="nav-item">
          <a className="nav-link f-Green" href="/Event" tabindex="-1" aria-disabled="true">活動專區</a>
        </li>
      </ul>
      <button className='green-btn'>登入</button>
      </div>
      </div>
    </nav>
    <div className={isToggle ? "mobile-nav" : "ds-none"}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">使用說明</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">收費方式</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">站點資訊</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">最新消息</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">活動專區</a>
        </li>
      </ul>
      <button className='white-btn'>登入</button>
    </div>
  </>
  )
}

export default Nav