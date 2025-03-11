import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import './App.css'
import ExpensesTable from './components/ExpensesTable'
import Skeleton from './components/Skeleton'
import { IResponse } from './types'

function App() {
    const [searchParams] = useSearchParams()
    const queryParams = searchParams.toString();
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['expenses'],
        queryFn: async ():Promise<IResponse> => {
            let url = 'https://tip-transactions.vercel.app/api/transactions';
            if (queryParams) {
                url += `?${queryParams}`;
            }
            const response = await fetch(
                url,
            )
            return await response.json()
        },
    })

    return (
      <main>
        <section aria-labelledby="expenses-table-heading">
            <h1 id="expenses-table-heading">Expenses</h1>
            <div aria-label="Expense Data Table">
                {
                    isFetching && <p>Fetching new data...</p>
                }
                {
                    isPending ? <Skeleton /> :
                    error ? <p>{error.message}</p> :
                    <ExpensesTable data={ data.transactions } />
                }
            </div>
        </section>
      </main>
    )
}

export default App
