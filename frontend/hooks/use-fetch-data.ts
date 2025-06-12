import { useEffect } from "react"
import axios from "axios"

export const useFetchData = (searchInput: string) => {
    useEffect(() => {
    setTimeout(() => {
    const fetchData = async () => {
        const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "api/rooming-lists", {
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