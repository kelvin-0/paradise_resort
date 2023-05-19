"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing, FaPeopleCarry } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
export const categories = [
  {
    label: "Standar",
    icon: MdOutlineVilla,
    description:
      "Kategori ini menyediakan kamar-kamar standar yang nyaman dan terjangkau bagi para tamu yang mencari akomodasi sederhana namun menyenangkan. ",
  },
  {
    label: "Suite",
    icon: GiCastle,
    description:
      "Suite merupakan kategori kamar yang dirancang khusus untuk para tamu yang menginginkan kemewahan dan kenyamanan ekstra",
  },
  {
    label: "Keluarga",
    icon: FaPeopleCarry,
    description:
      "Kamar Keluarga dirancang untuk memenuhi kebutuhan akomodasi keluarga. Dengan berbagai ukuran dan fasilitas, kamar-kamar ini memberikan ruang yang cukup untuk seluruh anggota keluarga.",
  },
  {
    label: "Bisnis",
    icon: IoDiamond,
    description:
      "Kategori Kamar Bisnis menyediakan fasilitas dan layanan yang dirancang khusus untuk para pelancong bisnis. Kamar-kamar ini dilengkapi dengan meja kerja yang nyaman, akses Wi-Fi cepat, dan fasilitas rapat.",
  },
];
// export const categories = [
//   {
//     label: "Beach",
//     icon: TbBeach,
//     description: "This property is close to the beach!",
//   },
//   {
//     label: "Windmills",
//     icon: GiWindmill,
//     description: "This property is has windmills!",
//   },
//   {
//     label: "Modern",
//     icon: MdOutlineVilla,
//     description: "This property is modern!",
//   },
//   {
//     label: "Countryside",
//     icon: TbMountain,
//     description: "This property is in the countryside!",
//   },
//   {
//     label: "Pools",
//     icon: TbPool,
//     description: "This is property has a beautiful pool!",
//   },
//   {
//     label: "Islands",
//     icon: GiIsland,
//     description: "This property is on an island!",
//   },
//   {
//     label: "Lake",
//     icon: GiBoatFishing,
//     description: "This property is near a lake!",
//   },
//   {
//     label: "Skiing",
//     icon: FaSkiing,
//     description: "This property has skiing activies!",
//   },
//   {
//     label: "Castles",
//     icon: GiCastle,
//     description: "This property is an ancient castle!",
//   },
//   {
//     label: "Caves",
//     icon: GiCaveEntrance,
//     description: "This property is in a spooky cave!",
//   },
//   {
//     label: "Camping",
//     icon: GiForestCamp,
//     description: "This property offers camping activities!",
//   },
//   {
//     label: "Arctic",
//     icon: BsSnow,
//     description: "This property is in arctic environment!",
//   },
//   {
//     label: "Desert",
//     icon: GiCactus,
//     description: "This property is in the desert!",
//   },
//   {
//     label: "Barns",
//     icon: GiBarn,
//     description: "This property is in a barn!",
//   },
//   {
//     label: "Lux",
//     icon: IoDiamond,
//     description: "This property is brand new and luxurious!",
//   },
// ];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/rooms";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
                  xl:px-20 
        md:px-10
        sm:px-2
        px-4
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
