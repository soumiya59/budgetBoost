/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
function Goal({name, current_amount, currency, id}) {

  // const backgroundColor = type === 'saving' ? '#ddc1ee' :
  //                         type === 'creditcard' ? '#b5ebba' : 
  //                         type === 'general' ? '#b5e2eb' : 
  //                         type === 'cash' ? '#bab5eb' : 
  //                         type === 'loan' ? '#b7cdeb' : 
  //                         type === 'bank' ? '#bcd5ec' : 
  //                         '#aca7cb';
  // const imageSrc = type === 'saving' ? 'saving.png' : 
  //                  type === 'cash' ? 'cash.png' : 
  //                  type === 'general' ? 'general.png' : 
  //                  type === 'creditcard' ? 'creditcard.png' : 
  //                  type === 'loan' ? 'loan.png' : 
  //                  type === 'bank' ? 'bank.png' : 
  //                  'general.png';
  
  return (
        <a  href={`/goals/${id}`} >
        <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-5 sm:flex-row flex-col bg-light-grey items-center">

          <div className="w-16 h-10 sm:mr-8 inline-flex items-center justify-center rounded-full flex-shrink-0 ">
            <img src="/goals/cash.png" alt="" />
          </div>

          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{name}</h2>
            <p className="leading-relaxed text-base">{current_amount} MAD</p>
          
            <p className="mt-2 inline-flex items-center">
            ligne de avancement
            </p>
          </div>

          <div className="flex">
            <button className="btn btn-primary">Edit 
            </button>
          </div>
      </div>
    </a>
  );
}

export default Goal;