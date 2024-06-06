import Account from '../components/Account'
import { useState,useEffect } from 'react';
import AccountApi from '../services/api/AccountApi';
import RecordApi from '../services/api/RecordApi';
import PieChart from '../components/charts/PieChart';

function Dashboard() {
  const [accounts,setAccounts] = useState([])
  const [records,setRecords] = useState([])
  const chartData = {
        labels: records.map((record) => record.category),
        datasets: [
            {
                label: 'Expenses',
                data: records.map((record) => record.amount) ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

  useEffect(() => {
    AccountApi.getAccounts().then(({data})=>{
      setAccounts(data.accounts)
    }).catch((err)=>{
      console.log(err)
    })
    RecordApi.getAllMyRecords().then(({data})=>{
      setRecords(data.records)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  return (
    <div className='h-screen max-w-screen-xl mx-auto'>
        <div className="flex flex-wrap items-center justify-start p-6 border-b-2 border-slate-500 pt-10">
            {accounts.map((item) => (
              <Account key={item.id} type={item.name} balance={item.balance} currency={item.currency} />
            ))}
        </div>
        <div className='w-1/4 mt-10'>
          <PieChart chartData={chartData} options={options}/>
        </div>
     </div>
  )
}

export default Dashboard
