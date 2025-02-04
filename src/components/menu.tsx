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
    }
    fetchMenuItems();
  }, [])

  return (
    <div className="flex flex-wrap">
      {menuItems.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Menu;
