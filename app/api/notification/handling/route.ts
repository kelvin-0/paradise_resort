import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  //   const currentUser = await getCurrentUser();

  //   if (!currentUser) {
  //     return NextResponse.error();
  //   }

  const body = await request.json();
  console.log(body);

  //   const listingAndReservation = await prisma.listing.update({
  //     where: {
  //       id: listingId,
  //     },
  //     data: {
  //       reservations: {
  //         create: {
  //           userId: currentUser.id,
  //           startDate,
  //           endDate,
  //           totalPrice,
  //         },
  //       },
  //     },
  //   });
  return NextResponse.json({ success: true });
}
