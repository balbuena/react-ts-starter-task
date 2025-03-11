import dayjs from 'dayjs'
import numeral from 'numeral'
import 'numeral/locales/en-gb';
import { IExpenses } from '../types';

numeral.locale('en-gb');

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ExpensesTable = ({ data }:{ data: IExpenses[] }) => {
    const sortedExpenses = [...data].sort((a, b) => a.id - b.id);

    return (
        <table>
            <thead>
                <tr>
                    <th scope="col" align="left">ID</th>
                    <th scope="col" align="left">Date</th>
                    <th scope="col" align="left">Amount</th>
                    <th scope="col" align="left">Merchant</th>
                    <th scope="col" align="left">Category</th>
                </tr>
            </thead>
            <tbody>
                {
                data?.length >= 0 ? sortedExpenses?.map((r: IExpenses) => (
                    <tr key={r.id}>
                        <td align="left">{r.id}</td>
                        <td align="left">{dayjs(r.date).format('HH:mm - DD/MM/YYYY')}</td>
                        <td align="left">{ numeral(r.amount).format('$0,0.00') }</td>
                        <td align="left">{r.merchant}</td>
                        <td align="left">{capitalizeFirstLetter(r.category)}</td>
                    </tr>
                )) : <tr><td colSpan={5} align='center'>No results</td></tr>
                }
            </tbody>
        </table>
    );
};

export default ExpensesTable;