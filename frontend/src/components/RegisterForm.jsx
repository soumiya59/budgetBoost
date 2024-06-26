import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
 
const formSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email().min(2).max(30),
  password: z.string()
//   passwordConfirmation: z.string().min(4).max(30),
})

function RegisterForm() {

    const {setAuthenticated,register} = useUserContext();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            // passwordConfirmation: "",
        },
    });
    
    async function onSubmit(values) {
    console.log("🚀 ~ onSubmit ~ values:", values)
    await register(values.name, values.email, values.password)
    .then((res) => {
        console.log(res)
        setAuthenticated(true)
        // setUser(res.data)
        // setToken(res.data.token)
        navigate('/')
      }).catch(({response}) => {
        form.setError("password", {
            message: response.data.errors.password.join()
        });

      })
    }
    
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className="flex flex-col pt-4">
                <FormLabel className="text-lg">Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="name" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
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
            <Button type="submit" className="bg-blue1 text-white font-bold text-lg hover:bg-light-blue1 p-2 mt-8">Register</Button>
        </form>
        </Form>
    )
}

export default RegisterForm;