import RegisterForm from "../components/RegisterForm";

function Register() {

    return (
            <section className="bg-light-grey font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center pt-12  md:-mb-12">
                        <img src="logo2.png" alt="logo" />
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Join Us.</p>

                        <RegisterForm />
                          
                        <div className="text-center pt-12 pb-12">
                            <p>Already have an account? <a href="/login" className="underline font-semibold">Log in here.</a></p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 shadow-2xl">
                    <img className="object-cover w-full h-screen hidden md:block" src="https://plus.unsplash.com/premium_photo-1679397476787-9a93bb39c701?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" />
                </div>
            </div>
        </section>
    );
}

export default Register;
