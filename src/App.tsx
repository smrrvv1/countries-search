import { useState, useEffect } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { BASE_URL } from "./constants"
import type { ICountryShort, ICountry } from "./types"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  const [countriesList, setcountriesList] = useState<ICountryShort[]>([])
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

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

  const getCountryByCode = async (code:string) => {
    try {
      const response = await fetch(`${BASE_URL}/alpha/${code}`)
      if (!response.ok) {
        throw new Error
      }
      const data: ICountry = await response.json()
      setSelectedCountry(data)
    } catch (e) {
      console.log(e)
    }
  }  

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar countries={countriesList} onSelect={getCountryByCode}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '250px' }}>
        {selectedCountry ? (
          <Box>
            <Typography variant="h4" gutterBottom>{selectedCountry.name}</Typography>
            <img src={selectedCountry!.flag} alt="flag" style={{ width: '150px', borderRadius: '4px' }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              столица: {selectedCountry.capital}
            </Typography>
            <Typography variant="body1">
                население: {selectedCountry.population.toLocaleString()}
            </Typography>

            <Typography 
              variant="h6" sx={{mt: 3}}>
                границы:
            </Typography>

            {selectedCountry.borders ? (
              <Box component="ul">
                {selectedCountry.borders.map(border => (
                  <Typography component="li" key={border}>
                    {border}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>нет сухопутных границ</Typography>
            )}
          </Box>
        ) : (
          <Typography variant="h5">
            выберите страну в списке слева
          </Typography>
        )}
      </Box>
    </Box>
  )         
}

export default App
