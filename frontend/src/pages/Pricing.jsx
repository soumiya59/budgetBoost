import { useTranslation } from 'next-i18next';

function Pricing() {
  const { t } = useTranslation();
    return (
        <section className="body-font overflow-hidden h-screen">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-lg font-medium title-font mb-2 text-beig-light">{t('Pricing')}</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-light-grey">
        {t('Choose the Right Plan for You.')}
        </p>
      <div className="flex mx-auto border-2 border-purple-friend rounded overflow-hidden mt-6">
        <button className="py-1 px-4 bg-purple-friend text-white focus:outline-none">{t('Monthly')}</button>
        <button className="py-1 px-4 focus:outline-none text-slate-50">{t('Annually')}</button>
      </div>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden bg-purple-100">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{t('START')}</h2>
          <h1 className="text-5xl pb-4 mb-4 border-b border-gray-300 leading-none">{t('Free')}</h1>
          <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Limited access to basic features')}
          </p>
          <p className="flex items-center  mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Limited storage and limited user accounts')}
          </p>
          <p className="flex items-center  mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Basic customer support')}
          </p>
          <button className="flex items-center mt-auto bg-purple-friend border-0 py-2 px-4 w-full focus:outline-none hover:bg-bluegrey text-white rounded">{t('GET STARTED')}
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-purple-friend  flex flex-col relative overflow-hidden bg-purple-100">
          <span className="bg-dark-purple border-purple-friend text-white px-3 py-2 tracking-widest text-xs absolute right-0 top-0 rounded-bl">{t('POPULAR')}</span>
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{t('PRO')}</h2>
          <h1 className="text-5xl text-light-gery leading-none flex items-center pb-4 mb-4 border-b  border-gray-300">
            <span>{t('$38')}</span>
            <span className="text-lg ml-1 font-normal text-gray-600">{t('/mo')}</span>
          </h1>
          <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Full access to all features')}
          </p>
          <p className="flex items-center  mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400  rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Enhanced security features')}
          </p>
          <p className="flex items-center  mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Advanced reporting and analytics')}
          </p>
          <p className="flex items-center mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{t('Priority customer support')}
          </p>
          <button className="flex items-center mt-auto text-white bg-dark-purple border-0 py-2 px-4 w-full focus:outline-none hover:bg-purple-friend rounded">{t('GET STARTED')}
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden bg-purple-100">
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{t('BUSINESS')}</h2>
        <h1 className="text-5xl text-light-gery leading-none flex items-center pb-4 mb-4 border-b border-gray-300">
            <span>$56</span>
            <span className="text-lg ml-1 font-normal text-gray-600">/mo</span>
        </h1>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('All features from the Pro tier')}
        </p>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Unlimited storage and user accounts')}
        </p>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Advanced customization options')}
        </p>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('API access for integrations')}
        </p>
        <p className="flex items-center mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 rounded-full flex-shrink-0 text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Single sign-on (SSO) support')}
        </p>
        <button className="flex items-center mt-auto text-white bg-purple-friend border-0 py-2 px-4 w-full focus:outline-none hover:bg-bluegrey rounded">{t('GET STARTED')}
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
        </button>
    </div>
</div>
<div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden bg-purple-100">
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{t('SPECIAL')}</h2>
        <h1 className="text-5xl leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span>$72</span>
            <span className="text-lg ml-1 font-normal text-gray-600">/mo</span>
        </h1>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Exclusive features not available in other tiers')}
        </p>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Limited-time discounts or promotions')}
        </p>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Early access to new features')}
        </p>
        <p className="flex items-center mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('24/7 customer support')}
        </p>
        <p className="flex items-center mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            </span>{t('Specialized training or consulting services')}
        </p>
        <button className="flex items-center mt-auto text-white bg-purple-friend border-0 py-2 px-4 w-full focus:outline-none hover:bg-bluegrey rounded">{t('GET STARTED')}
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
        </button>
    </div>
</div>

    </div>
  </div>
</section>
    )
}

export default Pricing;