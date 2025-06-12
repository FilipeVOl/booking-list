import { useEffect } from "react"
import axios from "axios"

export const useFetchData = (searchInput: string) => {
    useEffect(() => {
    setTimeout(() => {
    const fetchData = async () => {
        const response = await axios.get("https://booking-list-production.up.railway.app/api/rooming-lists", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: { searchValue: searchInput }
        })
        const data = await response.data
        }
        fetchData()
    }, 1000)
}, [searchInput])
}