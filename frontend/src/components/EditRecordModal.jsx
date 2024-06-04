/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecordApi from '../services/api/RecordApi'; 
import AccountApi from "../services/api/AccountApi";

const formSchema = z.object({
    accountName:z.string(),
    account_id:z.coerce.number(),
    type:z.string(),
    amount: z.coerce.number(),
    currency:z.string(),
    category:z.string(),
    option:z.string(),
    description:z.string()
});

function EditRecordModal({ id,onClose , onRecordEdited, onRecordDeleted}) {
    const [record, setRecord] = useState([]);
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState({});
    // const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            account_id:0,
            accountName:"",
            type: "",
            amount: 0,
            currency: "",
            category: "",
            description: "",
        },
    });

    useEffect(() => {
        RecordApi.getCategories()
            .then(({ data }) => {
                setCategories(data.categories);
            })
            .catch((err) => {
                console.log(err);
            });

        RecordApi.getRecord(id)
        .then(({ data }) => {
            form.setValue("accountName","general");
            form.setValue("account_id", data.record.account_id);
            form.setValue("type", data.record.type);
            form.setValue("amount", data.record.amount);
            form.setValue("currency", data.record.currency);
            form.setValue("category", data.record.category);
            form.setValue("description", data.record.description);
            setRecord(data.record);
        })
        .catch((err) => {
            console.log(err);
        });

        AccountApi.getAccounts()
            .then(({ data }) => {
                setAccounts(data.accounts);
                setAccount(data.accounts.filter((acc) => acc.id ===  record.account_id))
                console.log("🚀 ~ .then ~ record:", record)
                console.log(account)
            })
            .catch((err) => {
                console.log(err);
            })
  }, []);

    async function onSubmit(values) {
        await RecordApi.editRecord(id,values.account_id,values.amount,values.type, values.currency, values.category, values.description ).then(({ data }) => {
            console.log(data);
            onRecordEdited();
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
                        name="account_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {accounts.map((acc) => (
                                            <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="expense">Expense</SelectItem>
                                        <SelectItem value="income">Income</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} defaultValue={field.value} type='number' />
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="mad">MAD</SelectItem>
                                        <SelectItem value="usd">USD</SelectItem>
                                        <SelectItem value="euro">EURO</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.type}>{category.type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {form.watch("category") && (
                        <FormField
                            control={form.control}
                            name="option"
                            render={({ field }) => {
                                const selectedCategory = categories.find(category => category.type === form.watch("category"));
                                const options = selectedCategory ? JSON.parse(selectedCategory.options) : [];
                                return (
                                    <FormItem>
                                        <FormLabel>Category Option</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select option" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {options.map((option, index) => (
                                                    <SelectItem key={index} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                            />
                        )}
                    
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="">
                        <FormLabel className="">Note</FormLabel>
                        <FormControl>
                            <Input placeholder="note.." {...field}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                   

                    <div className="flex justify-end">
                        <Button name="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-400 me-4">Cancel</Button>
                        <Button name="button" onClick={onRecordDeleted} className="bg-red-500 hover:bg-red-400 me-4">Delete</Button>
                        <Button name="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditRecordModal ;
