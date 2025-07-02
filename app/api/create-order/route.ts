import { NextResponse } from "next/server";
import Razorpay from "razorpay"

const razorpay = new Razorpay ({
    key_id: process.env.KEY_ID!,
    key_secret: process.env.KEY_SECRET!,
});

export async function POST() {
    try{
        const order = await razorpay.orders.create({
            amount: 100 * 100,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        });
        
        return NextResponse.json({ orderId : order.id }, {status : 200});
    }catch(err){
        console.error("error creating order :", err)
        return NextResponse.json (
            {
                error: "error creating order"
            },
            {
                status : 500
            }

        );
    }
}