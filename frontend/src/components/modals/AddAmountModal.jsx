/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoalApi from '../../services/api/GoalApi'; 

const formSchema = z.object({
  amount: z.coerce.number().min(0),
});

function AddGoalModal({id,  onClose, onAmountAdded }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
        },
    });

    async function onSubmit(values) {
        await GoalApi.addamount(id,values.amount).then(() => {
            onAmountAdded();
            onClose(); 
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-md w-96">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New amount</FormLabel>
                                <FormControl>
                                    <Input {...field}  type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button name="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-400 me-4">Cancel</Button>
                        <Button name="submit">Add</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default AddGoalModal;
