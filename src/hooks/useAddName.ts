import { useState } from "react"
import { saveName } from "../firebase/names.service"
import type { NameType } from "../app.types"

const useAddName = () => {
    const [loading, setLoading] = useState(false)

    const addName = async (data: NameType) => {
        try {
            setLoading(true)
            await saveName(data)
        } catch (error) {
            console.log({error})
        } finally {
            setLoading(false)
        }
    }

    return { loading, addName }
}

export default useAddName