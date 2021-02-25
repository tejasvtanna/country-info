import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'

const CountryTable = () => {
    const [countryData, setCountryData] = useState([])
    const [filterCountry, setFilterCountry] = useState('')

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'capital', headerName: 'Capital', width: 130 },
        { field: 'region', headerName: 'Region', width: 130 },
        { field: 'domains', headerName: 'Top Level Domains', width: 200 },
        { field: 'borders', headerName: 'Borders', width: 200 },
    ]
    useEffect(() => {
        const fetchCountryData = async () => {
            const { data } = await axios.get(
                'https://restcountries.eu/rest/v2/all'
            )
            const dataRequired = data.map((obj, idx) => ({
                id: idx,
                name: obj.name,
                capital: obj.capital,
                region: obj.region,
                domains: obj.topLevelDomain.join(', '),
                borders: obj.borders.join(', '),
            }))
            setCountryData(dataRequired)
        }

        fetchCountryData()
    }, [])

    const rows = countryData.filter(
        (obj, index) =>
            !filterCountry ||
            obj.name.toLowerCase().indexOf(filterCountry.toLowerCase()) > -1
    )

    return (
        <div>
            <div>
                <span>Filter by Country:</span>
                <input
                    type="text"
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                />
            </div>
            <br />
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={50} />
            </div>
        </div>
    )
}

export default CountryTable
