export type Order = {
  OrderID: number;
  CustomerID: string;
  EmployeeID: number;
  Freight: number;
  ShipCity: string;
  Verified: boolean;
  OrderDate: Date;
  ShipName: string;
  ShipCountry: string;
  ShippedDate: Date;
  ShipAddress: string;
  ShipRegion: string;
  ShipPostalCode: string;
};