const supabase = require('../config/database');

class SportCategory {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('sport_categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching sport categories: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('sport_categories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching sport category: ${error.message}`);
    }
  }

  static async create(categoryData) {
    try {
      const { data, error } = await supabase
        .from('sport_categories')
        .insert([categoryData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating sport category: ${error.message}`);
    }
  }

  static async update(id, categoryData) {
    try {
      const { data, error } = await supabase
        .from('sport_categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating sport category: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('sport_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting sport category: ${error.message}`);
    }
  }
}

module.exports = SportCategory;
