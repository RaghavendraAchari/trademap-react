import { useState } from "react";

interface Props {
    categories: Array<string>;
    tags: Array<string>;
    keyWords: Array<string>;
}

export default function useNotesFilter({ categories, tags }: Props) {
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

    let remainingCategories = categories.map(it => !selectedCategories.includes(it));
    let remainingTags = tags.map(it => !selectedTags.includes(it));

    const onCategorySelect = (selected: string) => {
        setSelectedCategories((prev) => {
            prev = [...prev, selected]
            remainingCategories = categories.map(it => !selectedCategories.includes(it));

            return prev;
        })
    }

    const onTagSelect = (selected: string) => {
        setSelectedTags((prev) => {
            prev = [...prev, selected]
            remainingTags = tags.map(it => !selectedTags.includes(it));

            return prev;
        })
    }

    return {
        selectedCategories,
        selectedTags,
        remainingCategories,
        remainingTags,
        onCategorySelect,
        onTagSelect
    }
}