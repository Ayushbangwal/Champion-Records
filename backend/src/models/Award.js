const supabase = require('../config/database');

class Award {
  static async getBySportspersonId(sportspersonId) {
    try {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .order('award_date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching awards: ${error.message}`);
    }
  }

  static async create(awardData) {
    try {
      const { data, error } = await supabase
        .from('awards')
        .insert([awardData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating award: ${error.message}`);
    }
  }

  static async update(id, awardData) {
    try {
      const { data, error } = await supabase
        .from('awards')
        .update(awardData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating award: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('awards')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting award: ${error.message}`);
    }
  }

  static async getRecentAwards(sportspersonId, limit = 5) {
    try {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .order('award_date', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching recent awards: ${error.message}`);
    }
  }
}

module.exports = Award;
