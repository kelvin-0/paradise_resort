"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const statusCode = searchParams?.get("statusCode") || "";
  const transaction_status = searchParams?.get("transaction_status");
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  if (statusCode === "200" && transaction_status === "capture") {
    toast.success("Kamar dipesan!");
  }
  return <div className="">{children}</div>;
};

export default ClientOnly;
