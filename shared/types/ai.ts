export interface UserAdvice {
  id: number;
  user_id: string;
  advice_markdown: string;
  advice_metadata?: Record<string, any>;
  advice_category_name: string;
  user_input: string;
  created_at: string;
}
