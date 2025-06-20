export interface Restaurant {
  id: number;
  address: string;
  name: string;
  menuCategories: MenuCategory[];
}

export interface MenuCategory {
  id: number;
  name: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}