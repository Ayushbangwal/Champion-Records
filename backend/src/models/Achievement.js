const supabase = require('../config/database');

class Achievement {
  static async getBySportspersonId(sportspersonId) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .order('achievement_date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching achievements: ${error.message}`);
    }
  }

  static async create(achievementData) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert([achievementData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating achievement: ${error.message}`);
    }
  }

  static async update(id, achievementData) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update(achievementData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating achievement: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting achievement: ${error.message}`);
    }
  }

  static async getTopAchievements(sportspersonId, limit = 5) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .order('importance_level', { ascending: false })
        .order('achievement_date', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching top achievements: ${error.message}`);
    }
  }
}

module.exports = Achievement;
