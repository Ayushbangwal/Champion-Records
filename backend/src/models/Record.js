const supabase = require('../config/database');

class Record {
  static async getBySportspersonId(sportspersonId) {
    try {
      const { data, error } = await supabase
        .from('records')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .order('record_date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching records: ${error.message}`);
    }
  }

  static async create(recordData) {
    try {
      const { data, error } = await supabase
        .from('records')
        .insert([recordData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  static async update(id, recordData) {
    try {
      const { data, error } = await supabase
        .from('records')
        .update(recordData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('records')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  }

  static async getCurrentRecords(sportspersonId) {
    try {
      const { data, error } = await supabase
        .from('records')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .eq('is_current', true)
        .order('record_date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching current records: ${error.message}`);
    }
  }
}

module.exports = Record;
