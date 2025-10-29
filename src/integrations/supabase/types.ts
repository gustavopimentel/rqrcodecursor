// Types for your Supabase tables will go here
// Example:
// export interface User {
//   id: string
//   email: string
//   created_at: string
// }

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
      // Define your tables here
    }
    Views: {
      // Define your views here
    }
    Functions: {
      // Define your functions here
    }
    Enums: {
      // Define your enums here
    }
  }
}

