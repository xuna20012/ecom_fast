export interface Order {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  email?: string;
  quantity: number;
  total_price: number;
  product_name: string;
  product_price: number;
  status: OrderStatus;
  notes?: string;
  delivery_date?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';



export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
} 