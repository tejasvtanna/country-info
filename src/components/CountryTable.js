import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'

const CountryTable = () => {
  const [allCountryData, setAllCountryData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'capital', headerName: 'Capital', width: 130 },
    { field: 'region', headerName: 'Region', width: 130 },
    { field: 'domains', headerName: 'Top Level Domains', width: 200 },
    { field: 'borders', headerName: 'Borders', width: 200 },
  ]
  useEffect(() => {
    const fetchCountryData = async () => {
      const { data } = await axios.get('https://restcountries.eu/rest/v2/all')
      const dataRequired = data.map((obj, idx) => ({
        id: idx,
        name: obj.name,
        capital: obj.capital,
        region: obj.region,
        domains: obj.topLevelDomain.join(', '),
        borders: obj.borders.join(', '),
      }))
      setAllCountryData(dataRequired)
    }

    fetchCountryData()
  }, [])

  useEffect(() => {
    if (!countryFilter) {
      setFilteredData([...allCountryData])
    } else {
      const rows = allCountryData.filter((obj) => obj.name.toLowerCase().indexOf(countryFilter.toLowerCase()) > -1)
      setFilteredData(rows)
    }
  }, [allCountryData, countryFilter])

  return (
    <div>
      <div>
        <span>Filter by Country:</span>
        <input type="text" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} />
      </div>
      <br />
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={filteredData} columns={columns} pageSize={50} />
      </div>
    </div>
  )
}

export default CountryTable
