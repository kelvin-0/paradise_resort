"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  if (
    router?.query?.statusCode &&
    router?.query?.transaction_status === "capture"
  ) {
    toast.success("Kamar dipesan!");
  }
  return <div className="">{children}</div>;
};

export default ClientOnly;
