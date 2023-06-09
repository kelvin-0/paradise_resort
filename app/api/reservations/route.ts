import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { PrismaClient, Prisma } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
// @ts-ignore
import midtransClient from "midtrans-client";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

// Create Snap API instance
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

console.log(snap);

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const randomId = uuidv4();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  let parameter = {
    transaction_details: {
      order_id: `ORDER-${randomId}`,
      gross_amount: totalPrice,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: currentUser.name || currentUser.email,
      email: currentUser.email,
    },
    // item_details: [
    //   {
    //     id: listingId,
    //     price: totalPrice,
    //     name: startDate + "-" + endDate,
    //   },
    // ],
  };

  const redirect_url = await snap.createTransaction(parameter);
  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            transactionId: randomId,
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
  console.log(redirect_url);
  return NextResponse.json({ redirect_url });
}
