const supabase = require('../config/database');

class Statistics {
  static async getBySportspersonId(sportspersonId) {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .eq('sportsperson_id', sportspersonId)
        .order('season', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching statistics: ${error.message}`);
    }
  }

  static async create(statisticsData) {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .insert([statisticsData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating statistics: ${error.message}`);
    }
  }

  static async update(id, statisticsData) {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .update(statisticsData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating statistics: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('statistics')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Error deleting statistics: ${error.message}`);
    }
  }

  static async getCareerStats(sportspersonId) {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .eq('sportsperson_id', sportspersonId);
      
      if (error) throw error;
      
      // Calculate career totals
      const careerStats = data.reduce((acc, stat) => {
        return {
          total_matches: acc.total_matches + (stat.matches_played || 0),
          total_wins: acc.total_wins + (stat.wins || 0),
          total_losses: acc.total_losses + (stat.losses || 0),
          total_draws: acc.total_draws + (stat.draws || 0),
          total_points_scored: acc.total_points_scored + (stat.points_scored || 0),
          total_goals_scored: acc.total_goals_scored + (stat.goals_scored || 0),
          total_assists: acc.total_assists + (stat.assists || 0)
        };
      }, {
        total_matches: 0,
        total_wins: 0,
        total_losses: 0,
        total_draws: 0,
        total_points_scored: 0,
        total_goals_scored: 0,
        total_assists: 0
      });
      
      return careerStats;
    } catch (error) {
      throw new Error(`Error calculating career stats: ${error.message}`);
    }
  }
}

module.exports = Statistics;
