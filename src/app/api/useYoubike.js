import { useEffect, useState } from "react"
import axios from 'axios'

function useYoubike(query,selectCity,selectedDistricts) {
  const [youbikes, setYoubikes] = useState([])
  useEffect(()=>{
    axios({
      method:'GET',
      url:'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
  }).then(res =>{
    if(selectCity === "台北市"){
      const filteredData = res.data.filter(
        (item) =>{
            if(query === ''){
                return selectedDistricts.includes(item.sarea)}
            else{
                console.log("query",query)
                console.log("item.sna",item.sna)
            return item.sna.includes(query) &&
            (selectedDistricts.length === 0 || selectedDistricts.includes(item.sarea))
        }}
      );
      setYoubikes(filteredData)
    }else{
      setYoubikes([])
    }

  })},[query,selectedDistricts])

  return { youbikes };
}

export default useYoubike