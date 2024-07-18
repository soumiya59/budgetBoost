import Account from '../components/Account'
import { useState, useEffect } from 'react';
import AccountApi from '../services/api/AccountApi';
import RecordApi from '../services/api/RecordApi';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import { useTranslation } from 'next-i18next';

function Dashboard() {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useState([]);
  const [records, setRecords] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [currentMonthCurrency, setCurrentMonthCurrency] = useState('');
  const [currentMonthChartData, setCurrentMonthChartData] = useState({ labels: [], datasets: [] });

  const lastRecords = records.slice(-5);
  lastRecords.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

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
        enabled: false,
      },
    },
  };

  useEffect(() => {
    AccountApi.getAccounts()
      .then(({ data }) => {
        setAccounts(data.accounts);
        setCurrentMonthCurrency(data.accounts[0]?.currency);
        const total = data.accounts.reduce((acc, account) => acc + parseFloat(account.balance), 0);
        setTotalBalance(total);
      })
      .catch((err) => {
        console.log(err);
      });

    RecordApi.getAllMyRecords()
      .then(({ data }) => {
        setRecords(data.records);

        // Filter records for the current month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const currentMonthRecords = data.records.filter(record => {
          const recordDate = new Date(record.updated_at);
          return (
            recordDate.getMonth() === currentMonth &&
            recordDate.getFullYear() === currentYear &&
            record.type === 'expense'
          );
        });

        // Calculate total expenses for the current month and get the currency
        const totalExpenses = currentMonthRecords.reduce((acc, record) => parseFloat(acc) + parseFloat(record.amount), 0);
        setCurrentMonthExpenses(totalExpenses);

        // Generate chart data for current month expenses
        // const categorySet = new Set(currentMonthRecords.map(record => record.category));
        // const categories = Array.from(categorySet);
        const categoryData = currentMonthRecords.reduce((acc, record) => {
      if (!acc[record.category]) {
        acc[record.category] = 0;
      }
      acc[record.category] += parseFloat(record.amount);
      return acc;
    }, {});

       const categories = Object.keys(categoryData);
       const categoryValues = Object.values(categoryData);
        
        const chartData = {
          labels: categories,
          datasets: [
            {
              label: 'Expenses',
              data: categoryValues,
              // data: categories.map(category =>
              //   currentMonthRecords
              //     .filter(record => record.category === category)
              //     .reduce((acc, record) => acc + record.amount, 0)
              // ),
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
        setCurrentMonthChartData(chartData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-screen-xl h-screen mx-auto px-6 ">
      <div className="flex flex-wrap items-center justify-start py-6 border-b-2 border-slate-400 pt-10">
        {accounts.map((item) => (
          <Account key={item.id} name={item.name} balance={item.balance} currency={item.currency} id={item.id} />
        ))}
      </div>

      {/* charts */}
      <div className="grid md:grid-cols-3 gap-5 mt-10 mx-auto items-center justify-start" >
        {/* balance */}
        <div className="flex rounded-lg h-full bg-purple-200 p-3 flex-col text-purple-950">
          <div className="flex items-center mb-3 border-b-2 border-purple-400">
            <h2 className="text-base title-font font-medium">{t('Balance Trend')}</h2>
          </div>
          <p><span className='text-sm uppercase'>{t('Total balance')} :</span> <span className='uppercase text-xl'>{currentMonthCurrency} {totalBalance} </span> </p>
          <div className="flex-grow py-10 px-3">
            <LineChart chartData={currentMonthChartData} options={options} />
          </div>
        </div>
        {/* records */}
        <div className="flex rounded-lg h-full bg-purple-200 p-3 flex-col text-purple-950">
          <div className="flex items-center ">
            <h2 className="text-base title-font font-medium">{t('Last Records')}</h2>
          </div>
          <div className="flex-grow ">
            {lastRecords.map((record) => (
              <div key={record.id} className='flex items-center justify-around py-4 border-t-2 border-purple-400'>
                <div className='flex-none '>
                  <img src={`/accounts/${accounts.find(acc => acc.id === parseInt(record.account_id)).name}.png`} alt="recordLogo" className=" w-8 me-5 " />
                </div>

                <div className='flex-grow'>
                  <p>{record.category} </p>
                  <p className='text-sm'>{accounts.find(acc => acc.id === parseInt(record.account_id)).name}</p>
                </div>

                <div className='ms-5 text-lg flex-grow text-end'>
                  {record.type === "income" ?
                    <p><span className="uppercase text-green-800">{record.currency}</span>
                      <span className="text-green-800"> +{record.amount}</span>
                    </p> :
                    <p><span className="uppercase text-red-800">{record.currency}</span>
                      <span className='text-red-800'> -{record.amount}</span>
                    </p>
                  }
                  <p className='text-xs'>
                    {record.updated_at.substr(0, 10)} {record.updated_at.substr(11, 5)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* expense structure */}
        <div className="flex rounded-lg h-full bg-purple-200 p-3 flex-col text-purple-950">
          <div className="flex items-center mb-3 border-b-2 border-purple-400">
            <h2 className="text-base title-font font-medium">{t('Expenses Structure')}</h2>
          </div>
          <p><span className='text-sm uppercase'>{t('This month')} :</span> <span className='uppercase text-xl'> -{currentMonthCurrency} {currentMonthExpenses}</span> </p>
          <div className="mx-auto my-auto">
            <PieChart chartData={currentMonthChartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
