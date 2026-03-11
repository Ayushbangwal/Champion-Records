const supabase = require('../config/database');

class Sportsperson {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('sportspersons')
        .select(`
          *,
          sport_categories (
            id,
            name,
            description
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching sportspersons: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('sportspersons')
        .select(`
          *,
          sport_categories (
            id,
            name,
            description
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching sportsperson: ${error.message}`);
    }
  }

  static async create(sportspersonData) {
    try {
      const { data, error } = await supabase
        .from('sportspersons')
        .insert([sportspersonData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating sportsperson: ${error.message}`);
    }
  }

  static async update(id, sportspersonData) {
    try {
      const { data, error } = await supabase
        .from('sportspersons')
        .update(sportspersonData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating sportsperson: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('sportspersons')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting sportsperson: ${error.message}`);
    }
  }

  static async getWithDetails(id) {
    try {
      const { data, error } = await supabase
        .from('sportspersons')
        .select(`
          *,
          sport_categories (
            id,
            name,
            description
          ),
          statistics (*),
          achievements (*),
          records (*),
          awards (*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching sportsperson details: ${error.message}`);
    }
  }

  static async search(query) {
    try {
      const { data, error } = await supabase
        .from('sportspersons')
        .select(`
          *,
          sport_categories (
            id,
            name,
            description
          )
        `)
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,nationality.ilike.%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error searching sportspersons: ${error.message}`);
    }
  }
}

module.exports = Sportsperson;
