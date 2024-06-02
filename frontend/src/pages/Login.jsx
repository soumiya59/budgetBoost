import LoginForm from "../components/LoginForm";

const Login = () => {

  return (
            <section className="bg-light-grey font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-center pt-12 md:pl-12 md:-mb-12">
                        <a href="#" className="flex items-center space-x-3 space-y-2 rtl:space-x-reverse">
                            <img src="logo.svg" className="h-14" alt="" />
                            <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-mat-green font-mono">BudgetBoost</span>
                        </a>
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Log in.</p>

                        <LoginForm />
                          
                        <div className="text-center pt-12 pb-12">
                            <p>Don&apos;t have an account? <a href="/register" className="underline font-semibold">Register here.</a></p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 shadow-2xl">
                    <img className="object-cover w-full h-screen hidden md:block" src="https://plus.unsplash.com/premium_photo-1679397476787-9a93bb39c701?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" /> </div>
            </div>
        </section>
  );
};

export default Login;

