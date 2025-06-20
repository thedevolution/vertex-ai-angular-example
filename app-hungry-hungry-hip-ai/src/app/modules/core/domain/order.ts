import { MenuItem } from "./restaurant";

export interface Order {
  nameOnOrder: string;
  dateOrdered: Date;
  orderedItems: MenuItem[];
}