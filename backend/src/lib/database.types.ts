export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          product_name: string
          description: string | null
          price: number
          unit: string | null
          category: string | null
          location: string | null
          latitude: number | null
          longitude: number | null
          rating: number | null
          image: string | null
          seller_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_name: string
          description?: string | null
          price: number
          unit?: string | null
          category?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          rating?: number | null
          image?: string | null
          seller_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_name?: string
          description?: string | null
          price?: number
          unit?: string | null
          category?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          rating?: number | null
          image?: string | null
          seller_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}