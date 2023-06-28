import { NextResponse } from "next/server";

const midtransClient = require("midtrans-client");
// Create Core API / Snap instance (both have shared `transactions` methods)
let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: "YOUR_SERVER_KEY",
  clientKey: "YOUR_CLIENT_KEY",
});

import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  apiClient.transaction
    .notification(request)
    .then(async (statusResponse: any) => {
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      // Use regular expressions to extract the desired string
      const reservationId = orderId.split("ORDER-")[1];
      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      // Sample transactionStatus handling logic

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your database to 'challenge'
          // and response with 200 OK
          return NextResponse.json({ success: true });
        } else if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          return NextResponse.json({ success: true });
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        return NextResponse.json({ success: true });
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        const reservation = await prisma.reservation.deleteMany({
          where: {
            transactionId: reservationId,
          },
        });
        // and response with 200 OK
        return NextResponse.json({ success: true });
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        const reservation = await prisma.reservation.deleteMany({
          where: {
            transactionId: reservationId,
          },
        });
        return NextResponse.json({ success: true });
      }
    });

  return NextResponse.json({ success: true });
}
