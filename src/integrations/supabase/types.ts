export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agent_logs: {
        Row: {
          created_at: string
          id: string
          input_message: string | null
          lead_id: string | null
          parsed_constraints: Json | null
          parsed_intent: string | null
          recommended_variant_id: string | null
          response_text: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          input_message?: string | null
          lead_id?: string | null
          parsed_constraints?: Json | null
          parsed_intent?: string | null
          recommended_variant_id?: string | null
          response_text?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          input_message?: string | null
          lead_id?: string | null
          parsed_constraints?: Json | null
          parsed_intent?: string | null
          recommended_variant_id?: string | null
          response_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_logs_recommended_variant_id_fkey"
            columns: ["recommended_variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      available_dates: {
        Row: {
          created_at: string
          date: string
          id: string
          is_available: boolean
          notes: string | null
          photographer: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          is_available?: boolean
          notes?: string | null
          photographer?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_available?: boolean
          notes?: string | null
          photographer?: string
        }
        Relationships: []
      }
      campaign_rules: {
        Row: {
          campaign_name: string
          created_at: string
          end_date: string | null
          id: string
          product_id: string
          seasonality: string | null
          slot_limit: number | null
          start_date: string | null
        }
        Insert: {
          campaign_name: string
          created_at?: string
          end_date?: string | null
          id?: string
          product_id: string
          seasonality?: string | null
          slot_limit?: number | null
          start_date?: string | null
        }
        Update: {
          campaign_name?: string
          created_at?: string
          end_date?: string | null
          id?: string
          product_id?: string
          seasonality?: string | null
          slot_limit?: number | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_rules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      copy_blocks: {
        Row: {
          audience_trigger: string | null
          closing_phrase: string | null
          created_at: string
          cta: string | null
          differentiation: string | null
          hero_headline: string | null
          id: string
          manifesto: string | null
          product_id: string
          updated_at: string
        }
        Insert: {
          audience_trigger?: string | null
          closing_phrase?: string | null
          created_at?: string
          cta?: string | null
          differentiation?: string | null
          hero_headline?: string | null
          id?: string
          manifesto?: string | null
          product_id: string
          updated_at?: string
        }
        Update: {
          audience_trigger?: string | null
          closing_phrase?: string | null
          created_at?: string
          cta?: string | null
          differentiation?: string | null
          hero_headline?: string | null
          id?: string
          manifesto?: string | null
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "copy_blocks_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_entries: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          product_id: string | null
          question: string
          variant_id: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          product_id?: string | null
          question: string
          variant_id?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          product_id?: string | null
          question?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faq_entries_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_entries_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_range: string | null
          city: string | null
          created_at: string
          desired_location: string | null
          email: string | null
          id: string
          name: string | null
          notes: string | null
          objective: string | null
          occasion_type: string | null
          people_count: number | null
          phone: string | null
          source: string | null
          wants_prints: boolean | null
          wants_strategy: boolean | null
          wants_video: boolean | null
        }
        Insert: {
          budget_range?: string | null
          city?: string | null
          created_at?: string
          desired_location?: string | null
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          objective?: string | null
          occasion_type?: string | null
          people_count?: number | null
          phone?: string | null
          source?: string | null
          wants_prints?: boolean | null
          wants_strategy?: boolean | null
          wants_video?: boolean | null
        }
        Update: {
          budget_range?: string | null
          city?: string | null
          created_at?: string
          desired_location?: string | null
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          objective?: string | null
          occasion_type?: string | null
          people_count?: number | null
          phone?: string | null
          source?: string | null
          wants_prints?: boolean | null
          wants_strategy?: boolean | null
          wants_video?: boolean | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_global: boolean
          title: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_global?: boolean
          title: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_global?: boolean
          title?: string
        }
        Relationships: []
      }
      pricing: {
        Row: {
          balance_rule: string | null
          booking_rule: string | null
          created_at: string
          currency: string
          extra_hour_price: number | null
          extra_photo_price: number | null
          id: string
          installment_value: number | null
          installments_qty: number | null
          price_cash: number
          updated_at: string
          variant_id: string
          video_addon_price: number | null
        }
        Insert: {
          balance_rule?: string | null
          booking_rule?: string | null
          created_at?: string
          currency?: string
          extra_hour_price?: number | null
          extra_photo_price?: number | null
          id?: string
          installment_value?: number | null
          installments_qty?: number | null
          price_cash: number
          updated_at?: string
          variant_id: string
          video_addon_price?: number | null
        }
        Update: {
          balance_rule?: string | null
          booking_rule?: string | null
          created_at?: string
          currency?: string
          extra_hour_price?: number | null
          extra_photo_price?: number | null
          id?: string
          installment_value?: number | null
          installments_qty?: number | null
          price_cash?: number
          updated_at?: string
          variant_id?: string
          video_addon_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_families: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          audience: string | null
          created_at: string
          family_id: string
          id: string
          is_active: boolean
          is_seasonal: boolean
          name: string
          objective: string | null
          slug: string
          theme: string | null
          updated_at: string
        }
        Insert: {
          audience?: string | null
          created_at?: string
          family_id: string
          id?: string
          is_active?: boolean
          is_seasonal?: boolean
          name: string
          objective?: string | null
          slug: string
          theme?: string | null
          updated_at?: string
        }
        Update: {
          audience?: string | null
          created_at?: string
          family_id?: string
          id?: string
          is_active?: boolean
          is_seasonal?: boolean
          name?: string
          objective?: string | null
          slug?: string
          theme?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "product_families"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendations: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          lead_id: string
          recommendation_reason: string | null
          recommended_product_id: string | null
          recommended_variant_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          lead_id: string
          recommendation_reason?: string | null
          recommended_product_id?: string | null
          recommended_variant_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          lead_id?: string
          recommendation_reason?: string | null
          recommended_product_id?: string | null
          recommended_variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_recommended_product_id_fkey"
            columns: ["recommended_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_recommended_variant_id_fkey"
            columns: ["recommended_variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_info: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      studio_services: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          price_igor: number | null
          price_team: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          price_igor?: number | null
          price_team?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          price_igor?: number | null
          price_team?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      variant_policies: {
        Row: {
          id: string
          policy_id: string
          variant_id: string
        }
        Insert: {
          id?: string
          policy_id: string
          variant_id: string
        }
        Update: {
          id?: string
          policy_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_policies_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variant_policies_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          all_photos_edited: boolean
          created_at: string
          delivery_business_days: number
          duration_minutes: number | null
          edited_photos: number | null
          expected_photo_range: string | null
          format_type: string | null
          id: string
          is_active: boolean
          limited_slots: number | null
          max_people: number | null
          minimum_edited_photos: number | null
          name: string
          outfit_changes: number | null
          outfit_changes_rule: string | null
          photographer_type: string
          printed_format: string | null
          printed_photos: number | null
          product_id: string
          selection_required: boolean
          slug: string
          strategy_included: boolean
          team_type: string | null
          updated_at: string
          venue_type: string | null
          video_included: boolean
          video_minutes: number | null
          video_type: string | null
        }
        Insert: {
          all_photos_edited?: boolean
          created_at?: string
          delivery_business_days?: number
          duration_minutes?: number | null
          edited_photos?: number | null
          expected_photo_range?: string | null
          format_type?: string | null
          id?: string
          is_active?: boolean
          limited_slots?: number | null
          max_people?: number | null
          minimum_edited_photos?: number | null
          name: string
          outfit_changes?: number | null
          outfit_changes_rule?: string | null
          photographer_type?: string
          printed_format?: string | null
          printed_photos?: number | null
          product_id: string
          selection_required?: boolean
          slug: string
          strategy_included?: boolean
          team_type?: string | null
          updated_at?: string
          venue_type?: string | null
          video_included?: boolean
          video_minutes?: number | null
          video_type?: string | null
        }
        Update: {
          all_photos_edited?: boolean
          created_at?: string
          delivery_business_days?: number
          duration_minutes?: number | null
          edited_photos?: number | null
          expected_photo_range?: string | null
          format_type?: string | null
          id?: string
          is_active?: boolean
          limited_slots?: number | null
          max_people?: number | null
          minimum_edited_photos?: number | null
          name?: string
          outfit_changes?: number | null
          outfit_changes_rule?: string | null
          photographer_type?: string
          printed_format?: string | null
          printed_photos?: number | null
          product_id?: string
          selection_required?: boolean
          slug?: string
          strategy_included?: boolean
          team_type?: string | null
          updated_at?: string
          venue_type?: string | null
          video_included?: boolean
          video_minutes?: number | null
          video_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
