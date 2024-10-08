/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountApi from '../../services/api/AccountApi'; 
import { useTranslation } from 'next-i18next';

const formSchema = z.object({
  name: z.string().min(2).max(30),
  balance: z.coerce.number().min(0),
  currency: z.string().min(3).max(9),
});

function EditAccountModal({ onClose , onAccountEdited}) {
    const { t } = useTranslation();
    const [account, setAccount] = useState([]);
    const { id } = useParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "", // Initial values are empty
            balance: 0,
            currency: "",
        },
    });
    
  useEffect(() => {
        AccountApi.getAccount(id)
        .then(({ data }) => {
            form.setValue("name", data.account.name);
            form.setValue("balance", data.account.balance);
            form.setValue("currency", data.account.currency);
            setAccount(data.account);
        })
        .catch((err) => {
            console.log(err);
        });
  }, []);

    async function onSubmit(values) {
        await AccountApi.editAccount(id, values.name, values.currency, values.balance).then(({ data }) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
        onAccountEdited();
        onClose(); 
    }

    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-md w-96">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Type')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="general">{t('general')}</SelectItem>
                                        <SelectItem value="cash">{t('cash')}</SelectItem>
                                        <SelectItem value="saving">{t('saving')}</SelectItem>
                                        <SelectItem value="creditcard">{t('credit card')}</SelectItem>
                                        <SelectItem value="loan">{t('loan')}</SelectItem>
                                        <SelectItem value="bank">{t('bank')}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Initial Balance')}</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} type='number' />
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
                                <FormLabel>{t('Currency')}</FormLabel>
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
                    <div className="flex justify-end">
                        <Button name="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-400 me-4">Cancel</Button>
                        <Button name="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditAccountModal;
