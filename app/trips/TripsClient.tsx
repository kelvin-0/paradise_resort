"use client";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios, { isCancel } from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import useCancelModal from "../hooks/useCancelModal";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let statusCode = searchParams?.get("status_code") || "";
  const transaction_status = searchParams?.get("transaction_status");
  const [deletingId, setDeletingId] = useState("");
  const cancelModal = useCancelModal();
  const [firstTimeValue, setFirstTimeValue] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onCancelModal = useCallback(
    (id: string) => {
      cancelModal.valueid = id;
      cancelModal.onOpen();
    },
    [cancelModal, currentUser, router]
  );
  // const onCancel = useCallback(
  //   (id: string) => {
  //     setDeletingId(id);
  //     console.log(id);
  //     axios
  //       .delete(`/api/reservations/${id}`)
  //       .then(() => {
  //         toast.success("Pesanan dibatalkan");
  //         router.refresh();
  //       })
  //       .catch((error) => {
  //         toast.error(error?.response?.data?.error);
  //       })
  //       .finally(() => {
  //         setDeletingId("");
  //       });
  //   },
  //   [router]
  // );
  if (
    statusCode === "200" &&
    transaction_status === "capture" &&
    firstTimeValue === 1
  ) {
    toast.success("Kamar dipesan!");
    setFirstTimeValue((value) => value + 1);
  }
  return (
    <Container>
      <section className="bg-custom-human-skin pt-24 pb-10 px-16">
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancelModal}
              isCancel={true}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default TripsClient;

// ("use client");

// import { useCallback, useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import useLoginModal from "@/app/hooks/useLoginModal";
// import useRegisterModal from "@/app/hooks/useRegisterModal";
// import useRentModal from "@/app/hooks/useRentModal";
// import { SafeUser } from "@/app/types";

// import MenuItem from "./MenuItem";
// import Avatar from "../Avatar";

// interface UserMenuProps {
//   currentUser?: SafeUser | null;
// }

// const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
//   const router = useRouter();

//   const loginModal = useLoginModal();
//   const registerModal = useRegisterModal();
//   const rentModal = useRentModal();

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleOpen = useCallback(() => {
//     setIsOpen((value) => !value);
//   }, []);

//   const onRent = useCallback(() => {
//     if (!currentUser) {
//       return loginModal.onOpen();
//     }

//     rentModal.onOpen();
//   }, [loginModal, rentModal, currentUser]);

//   return (
//     <div className="relative md:ml-auto">
//       <div className="flex flex-row items-center gap-3">
//         {currentUser?.isAdmin && (
//           <div
//             onClick={onRent}
//             className="
//           flex px-6 py-2 border gap-3 uppercase items-center

//             cursor-pointer rounded-full
//           "
//           >
//             Tambah Kamar
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 text-custom-orange"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//               />
//             </svg>
//           </div>
//         )}

//         <div
//           onClick={toggleOpen}
//           className="
//           p-4
//           md:py-1
//           md:px-2
//           border-[1px]
//           border-neutral-200
//           flex
//           flex-row
//           items-center
//           gap-3
//           rounded-full
//           cursor-pointer
//           hover:shadow-md
//           transition
//           "
//         >
//           <AiOutlineMenu />
//           <p>{currentUser?.name}</p>
//           <div className="hidden md:block">
//             <Avatar src={currentUser?.image} />
//           </div>
//         </div>
//       </div>
//       {isOpen && (
//         <div
//           className="
//             absolute
//             rounded-xl
//             shadow-md
//             w-[30vw]
//             md:w-[20vw]
//             bg-white
//             overflow-hidden
//             right-0
//             top-12
//             text-sm
//             text-slate-900
//           "
//         >
//           <div className="flex flex-col cursor-pointer">
//             {currentUser ? (
//               currentUser.isAdmin ? (
//                 <>
//                   <MenuItem
//                     label="Kelola Kamar"
//                     onClick={() => router.push("/properties")}
//                   />
//                   <MenuItem label="Tambah Kamar" onClick={rentModal.onOpen} />
//                   <MenuItem
//                     label="Reservasi Kamar"
//                     onClick={() => router.push("/reservations")}
//                   />
//                   <hr />
//                   <MenuItem label="Logout" onClick={() => signOut()} />
//                 </>
//               ) : (
//                 <>
//                   <MenuItem
//                     label="Pesanan saya"
//                     onClick={() => router.push("/trips")}
//                   />
//                   <MenuItem
//                     label="Kamar favorit"
//                     onClick={() => router.push("/favorites")}
//                   />
//                   <hr />
//                   <MenuItem label="Logout" onClick={() => signOut()} />
//                 </>
//               )
//             ) : (
//               <>
//                 <MenuItem label="Login" onClick={loginModal.onOpen} />
//                 <MenuItem label="Sign up" onClick={registerModal.onOpen} />
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserMenu;
