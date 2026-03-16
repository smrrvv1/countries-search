import { ICountry } from '../../types'
import styles from './styles.module.css'

interface Props {
  country: ICountry | null
  borders: string[]
}

export const CountryInfo = ({ country, borders }: Props) => {
  if (!country) {
    return <div className={styles.details}>Выберите страну</div>
  }

  return (
    <div className={styles.details}>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Borders with:</h3>
      <ul>
        {borders.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  )
}