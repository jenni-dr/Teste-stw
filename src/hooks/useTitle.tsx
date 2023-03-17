import { useEffect } from "react"

export const useTitle = (titleSufix?: string) => {
    const TITLE_PREFIX = import.meta.env.VITE_TITLE;

    useEffect(() => {
        if (!titleSufix) document.title = TITLE_PREFIX;
        if (document.title && document.title !== titleSufix) document.title = `${TITLE_PREFIX} - ${titleSufix}`;
        if (!document.title && titleSufix) document.title = `${titleSufix}`;
        return () => {
            document.title = TITLE_PREFIX;
        }
    }, [titleSufix])
}