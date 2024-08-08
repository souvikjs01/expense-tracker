'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getIncomeExpense(): Promise<{
    income?: number;
    expense?: number;
    error?: string;
}> {
    const { userId } = auth();
    if(!userId){
        return { error: 'User not found' }
    }
    try {
        const transactions = await db.transaction.findMany({
            where: {
                userId
            }
        })
        const amount = transactions.map((transaction) => transaction.amount)
        const income = amount.filter((item) => item>0 ).reduce((acc, item) => acc + item, 0)
        const expense = amount.filter((item) => item<0 ).reduce((acc, item) => acc + item, 0)

        return { income, expense: Math.abs(expense)}
    } catch (error) {
        return { error: 'Internal server error' }
    }
}