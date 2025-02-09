"use client";

import { useEffect, useState } from "react";
import { getAllMenuItems } from "@/services/menuItemService";
import { MenuItemType } from "@/types/MenuItem";
import MenuItem from "./menuItem";
import { useAppSelector } from "@/store";

const Menu: React.FC = () => {
  const authUser = useAppSelector((state) => state.authUser.authUser);
  const [menuItems, setMenuItems] = useState([] as MenuItemType[]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const fetchedMenuItems = await getAllMenuItems(authUser.token);
        setMenuItems(fetchedMenuItems);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMenuItems();
  }, [authUser.token]);

  return (
    <div className="flex flex-wrap items-center justify-center h-screen">
      {menuItems.map((item) => (
        <MenuItem key={item.ID_MENU} {...item} />
      ))}
    </div>
  );
};

export default Menu;
