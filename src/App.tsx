import { useState, useEffect } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { BASE_URL } from "./constants"
import type { ICountryShort } from "./types"

function App() {
  const [countriesList, setcountriesList] = useState<ICountryShort[]>([])

  useEffect(()=>{
    const getCountries = async() => {
      try{
        const response = await fetch(`${BASE_URL}/all?fields=alpha3Code,name`)
        if (!response.ok) {
          throw new Error
        }
        const data:ICountryShort[] = await response.json()
        setcountriesList(data)
      }catch(e) {
        console.log(e)
      }
    }
    getCountries()
  },[])

  const getCountriesByName

  return (
   <div>
      <Sidebar/>
   </div>
  )
}

export default App
