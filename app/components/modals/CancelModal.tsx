"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useCancelModal from "@/app/hooks/useCancelModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";

const CancelModal = () => {
  const router = useRouter();
  const cancelModal = useCancelModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(cancelModal.valueid);
    axios
      .delete(`/api/reservations/${cancelModal.valueid}`)
      .then(() => {
        toast.success("Pesanan dibatalkan");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        cancelModal.valueid = "";
      });
    cancelModal.onClose();
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Apakah anda yakin?" />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={cancelModal.isOpen}
      title="Paradise Resort"
      actionLabel="Iya, saya yakin"
      onSubmit={handleSubmit(onSubmit)}
      onClose={cancelModal.onClose}
      body={bodyContent}
    />
  );
};

export default CancelModal;
