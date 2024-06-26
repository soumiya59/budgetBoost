import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserStateContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
 
const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(4).max(30),
})

function LoginForm() {

    const {login,setAuthenticated,setUser,setToken} = useContext(UserStateContext);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "admin",
        },
    });
    
    async function onSubmit(values) {
    await login(values.email, values.password)
    .then((value) => {
          setAuthenticated(true)
          setUser(value.data)
          setToken(value.data.token)
          navigate('/')
      }).catch(({response}) => {
        console.log(response.data.errors.email.join())
        form.setError("email", {
            message: response.data.errors.email.join()
        });
      })

        // const data = axiosClient.post('/login', values).then((value)=>{
        //   if(value.status === 200 ){
        //     window.localStorage.setItem('ACCES_TOKEN', true);
        //     navigate('/')
        //   }
        // }
        // ).catch(({response}) => {    
        //     console.log(response.data.errors.email.join());
        // });
    }
    
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className="flex flex-col py-4">
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                    <Input placeholder="email" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className=" bg-blue1 text-white font-bold text-lg hover:bg-light-blue1 p-2 mt-8">Submit</Button>
        </form>
        </Form>
    )
}

export default LoginForm;