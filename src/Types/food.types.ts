import type { SerializedError } from "@reduxjs/toolkit"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface foodCard {
    name: string
    kkal: number
    protein: number
    fat: number
    carbs: number
    fiber: number | null
}

interface foodMeal {
    name: string
    items: foodCard[]
}

export interface foodDayRequest {
    date: string
    meals: foodMeal[]
    totals: foodCard
}

export interface foodDayRequestProps {
    data: foodDayRequest
    error: FetchBaseQueryError | SerializedError | undefined
    isLoading: boolean
}

export interface cardItemProps {
    text: number | null
    field: string
    flag: string
}

