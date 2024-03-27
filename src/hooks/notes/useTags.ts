import { useState } from "react"

export default function useTags() {
    const [tags, setTags] = useState<string[]>([])

    const addNewTag = (state: string) => {
        setTags(prev => {
            const newArray = [...prev, state]

            return newArray
        })
    }

    const removeTag = (index: number) => {

        setTags(prev => {

            const newarray = prev.filter((value, _index) => _index !== index)

            return newarray
        })
    }

    return {
        tags,
        addNewTag,
        setTags,
        removeTag
    }
}