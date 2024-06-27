/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import GoalApi from '../../services/api/GoalApi'; 

const formSchema = z.object({
    name:z.string(),
    target_amount:z.coerce.number(),
    current_amount:z.coerce.number(),
    completion_date:z.string(),
    currency:z.string()
});

function EditGoalModal({ id,onClose , onGoalEdited, onGoalDeleted}) {
    const [goal, setGoal] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            target_amount: 0,
            current_amount: 0,
            completion_date: new Date(),
            currency: "mad",
        },
    });

    useEffect(() => {
        GoalApi.getGoal(id).then((response) => {
            setGoal(response.data);
            form.setValue("name", response.data.goal.name);
            form.setValue("target_amount", response.data.goal.target_amount);
            form.setValue("current_amount", response.data.goal.current_amount);
            form.setValue("completion_date", response.data.goal.completion_date);
            form.setValue("currency", response.data.goal.currency);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }, []);

    async function onSubmit(values) {
        await GoalApi.editGoal(id,values.name,values.target_amount,values.current_amount,values.completion_date,values.currency).then(() => {
            onGoalEdited();
            onClose(); 
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-md w-1/3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Goal Name</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="target_amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Amount</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="current_amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Saved Already</FormLabel>
                                <FormControl>
                                    <Input {...field}  type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="completion_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Completion Date</FormLabel>
                                <FormControl>
                                    <Input {...field} type='date' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-end">
                        <Button name="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-400 me-4">Cancel</Button>
                        <Button name="submit" className="me-4">Edit</Button>
                        <Button name="button" onClick={onGoalDeleted} className="bg-red-500 hover:bg-red-400">Delete</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditGoalModal ;
