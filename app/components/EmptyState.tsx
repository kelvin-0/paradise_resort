"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import Search from "./navbar/Search";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Pencarian tidak ketemu",
  subtitle = "Coba hapus atau ubah filter anda",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
        mt-16
      "
    >
      <Search />
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Hapus semua filter"
            onClick={() => router.push("/rooms")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
