import { useState } from "react"

export default function useCategories() {
    const [categories, setCategories] = useState<string[]>([])

    const addNewCategory = (category: string) => {
        setCategories(prev => {
            const newArray = [...prev, category]

            return newArray
        })
    }

    const removeCategory = (index: number) => {

        setCategories(prev => {

            const newarray = prev.filter((value, _index) => _index !== index)

            return newarray
        })
    }

    return {
        categories,
        addNewCategory,
        setCategories,
        removeCategory
    }
}