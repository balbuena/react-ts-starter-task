export interface IExpenses {
    id: number
    date: Date | string
    amount: number
    merchant: string
    category: string
}

export interface IResponse {
    totalPages: number
    currentPage: number
    transactions: IExpenses[]
}