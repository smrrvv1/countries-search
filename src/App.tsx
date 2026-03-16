import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { CountryInfo } from './components/CountryInfo/CountryInfo'
import  { axiosApi } from './axiosApi'
import { ICountryShort, ICountry } from './types'

function App() {
  const [countries, setCountries] = useState<ICountryShort[]>([])
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)
  const [borderNames, setBorderNames] = useState<string[]>([])

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axiosApi.get<ICountryShort[]>('/all?fields=alpha3Code,name')
        setCountries(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    getCountries()
  }, [])

  const selectCountry = async (code: string) => {
    try {
      const {data} = await axiosApi.get<ICountry>(`/alpha/${code}`)
      
      const names: string[] = []
      if (data.borders && data.borders.length > 0) {
        for (const border of data.borders) {
          const { data: dataBorders } = await axiosApi.get<ICountry>(`/alpha/${border}`)
          names.push(dataBorders.name)
        }
      }
      
      setSelectedCountry(data)
      setBorderNames(names)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={{display: 'flex'}}>
      <Sidebar countries={countries} onSelect={selectCountry} />
      <CountryInfo country={selectedCountry} borders={borderNames} />
    </div>
  )
}

export default App