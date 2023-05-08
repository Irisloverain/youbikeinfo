import React from 'react'
import { useState,useEffect,useRef } from 'react';
import useYoubike from '../api/useYoubike';

function SelectArea(props) {
  const {AreaList,
  selectCity,
  setSelectCity,
  districts,
  setDistricts,
  selectedDistricts,
  setSelectedDistricts,
  query,
  setQuery} = props

  const {youbikes} = useYoubike(query,selectCity,selectedDistricts)

  //DropDown
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
      setIsOpen(!isOpen)
  }

  //點擊選單外的範圍，關閉選單
  const dropdownRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        // alert('You clicked outside of me!')
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleSelectChange = (e) => {
    console.log(e.target.textContent)
    setSelectCity(e.target.textContent);
  };

  //更新區域陣列
  useEffect(() => {
    const city = AreaList.find((area) => area.name === selectCity)?.districts || []
    const newDistList = city.map((district) => district.name);
    setDistricts(newDistList)
    setSelectedDistricts(newDistList)
  }, [selectCity])

  const handleDistChange = (e) => {
    const distName = e.target.value;
    const isChecked = e.target.checked;
    console.log("isChecked",isChecked)

    if (isChecked) {
      setSelectedDistricts([...selectedDistricts, distName]);
    } else {
      setIsCheckedAll(false)
      setSelectedDistricts(selectedDistricts.filter(dist => dist !== distName));
    }
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  const [isCheckedAll,setIsCheckedAll] = useState(true)
  const checkedAll = (e) => {
      setIsCheckedAll(e.target.checked)
      const city = AreaList.find((area) => area.name === selectCity)?.districts || []
      const newDistList = city.map((district) => district.name);
      setDistricts(newDistList)
      setSelectedDistricts(newDistList)
  }


  return (
    <>
    <div className='SearchBar d-flex'>
    
      <div
          className={isOpen ? 'C-Dropdown-open' : 'C-Dropdown'}
          ref={dropdownRef}
        >
          <ul
            className="list-unstyled"
            onClick={(event) => {
              handleOpen()
            }}
          >
            <li
              className="C-dropdown-selected"
              >
              {selectCity}
              <div className={isOpen ?  'dropdownIcon-active' : 'dropdownIcon'}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              ></div>
            </li>
            <div className={isOpen ? '' : 'ds-none'}>
              {AreaList.map((city) => {
                return (
                  <li key={city.name} value={city.name} onClick={(event)=>{handleSelectChange(event)}}>
                  {city.name}
                  </li>
                )
              })}
            </div>
          </ul>
      </div>

      <div className='querybox'>
        <input type="text" className='query' value={query} onChange={handleSearch} id="search" list="search-list" placeholder="搜尋站點"/>
        <datalist id="search-list">
        {youbikes.map((station)=>{<option value={station.sna}/>})}
        </datalist>
        <img src ="./query.svg"></img>
      </div>
    </div>
    <div className='d-flex'>
      <form className='dist'>
        <label className='w-100'>
        <input type="checkbox" onChange={checkedAll} checked={isCheckedAll}></input>
        全部勾選
        </label>
        {districts.map((dist, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={dist}
              checked={selectedDistricts.includes(dist)}
              onChange={handleDistChange}
            />
            {dist}
          </label>
        ))}
      </form>
      <div className='illustwrap'>
        <img src='./illust.svg'></img>
      </div>
    </div>
      </>
  );
}

export default SelectArea
