import Account from '../components/Account'
import { useState,useEffect } from 'react';
import AccountApi from '../services/api/AccountApi';
import RecordApi from '../services/api/RecordApi';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';

function Dashboard() {
  const [accounts,setAccounts] = useState([])
  const [records,setRecords] = useState([])
  const lastRecords = records.slice(-5)
  lastRecords.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const chartData = {
        labels: records.map((record) => record.category),
        datasets: [
            {
                label: 'Expenses',
                data: records.map((record) => record.amount) ,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
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
            colors: {
              forceOverride: true,
              enabled: false
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
        <div className="flex flex-wrap items-center justify-start py-6 border-b-2 border-slate-400 pt-10">
            {accounts.map((item) => (
              <Account key={item.id} type={item.name} balance={item.balance} currency={item.currency} />
            ))}
        </div>
        
        {/* charts */}
        <div className="grid md:grid-cols-3 gap-5 mt-10 mx-auto items-center justify-start" >
          {/* balance */}
            <div className="flex rounded-lg h-full bg-purple-200 p-3 flex-col text-purple-950">
              <div className="flex items-center mb-3  border-b-2 border-purple-400">
                <h2 className="text-base title-font font-medium">Balance Trend</h2>
              </div>
              <div className="flex-grow py-10 px-3">
                <LineChart chartData={chartData} options={options}/>
              </div>
            </div>
          {/* records */}
            <div className="flex rounded-lg h-full bg-purple-200 p-3 flex-col text-purple-950">
              <div className="flex items-center ">
                <h2 className="text-base title-font font-medium">Last Records</h2>
              </div>
              <div className="flex-grow ">
                  {lastRecords.map((record) => ( 

                    <div key={record.id} className='flex items-center justify-around py-4 border-t-2 border-purple-400'>
                    
                      <div className='flex-none '>
                        <img src={`/accounts/${accounts.find(acc=>acc.id === parseInt(record.account_id)).name}.png`} alt="recordLogo" className=" w-8 me-5 " />
                      </div>

                      <div className='flex-grow'>
                        <p>{record.category} </p>
                        <p className='text-sm'>{accounts.find(acc=>acc.id === parseInt(record.account_id)).name}</p>
                      </div>

                      <div className='ms-5 text-lg flex-grow text-end'>
                        {accounts.find(acc=>acc.id === parseInt(record.account_id)).type=="income" ? 
                        <p><span className="uppercase text-green-800">{record.currency}</span>
                          <span className="text-green-800"> +{record.amount}</span>  
                        </p> :
                        <p><span className="uppercase text-red-800">{record.currency}</span>
                          <span className='text-red-800'> -{record.amount}</span>
                        </p>
                        }
                        <p className='text-xs'>
                        {record.updated_at.substr(0,10)} {record.updated_at.substr(11,5)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          {/* expense structure */}
            <div className="flex rounded-lg h-full bg-purple-200 p-3 flex-col text-purple-950">
              <div className="flex items-center mb-3  border-b-2 border-purple-400">
                <h2 className="text-base title-font font-medium">Expenses Structure</h2>
              </div>
              <div className="flex-grow h-20 mx-auto pb-5">
                <PieChart chartData={chartData} options={options}/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
