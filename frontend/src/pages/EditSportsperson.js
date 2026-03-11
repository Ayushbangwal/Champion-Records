import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ArrowLeft, Save, X, Loader2 } from 'lucide-react';
import { sportspersonAPI } from '../services/api';
import toast from 'react-hot-toast';

const EditSportsperson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    nationality: '',
    sport_category_id: '',
    photo_url: '',
    bio: ''
  });

  const { data: sportsperson, isLoading } = useQuery(
    ['sportsperson', id],
    () => sportspersonAPI.getById(id),
    {
      onSuccess: (response) => {
        const data = response.data.data;
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          date_of_birth: data.date_of_birth || '',
          nationality: data.nationality || '',
          sport_category_id: data.sport_category_id || '',
          photo_url: data.photo_url || '',
          bio: data.bio || ''
        });
      },
      select: (response) => response.data,
    }
  );

  const updateMutation = useMutation(
    (data) => sportspersonAPI.update(id, data),
    {
      onSuccess: () => {
        toast.success('Sportsperson updated successfully!');
        queryClient.invalidateQueries('sportspersons');
        queryClient.invalidateQueries(['sportsperson', id]);
        navigate(`/sportspersons/${id}`);
      },
      onError: (error) => {
        toast.error(`Error: ${error.response?.data?.message || 'Failed to update sportsperson'}`);
      }
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.first_name || !formData.last_name) {
      toast.error('First name and last name are required');
      return;
    }

    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading sportsperson data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/sportspersons/${id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sportsperson
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Sportsperson</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Nationality */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="e.g., United States, India, Argentina"
              className="input-field"
            />
          </div>

          {/* Sport Category */}
          <div>
            <label htmlFor="sport_category_id" className="block text-sm font-medium text-gray-700 mb-2">
              Sport Category
            </label>
            <select
              id="sport_category_id"
              name="sport_category_id"
              value={formData.sport_category_id}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a sport</option>
              <option value="1">Football</option>
              <option value="2">Basketball</option>
              <option value="3">Tennis</option>
              <option value="4">Cricket</option>
              <option value="5">Baseball</option>
              <option value="6">Swimming</option>
              <option value="7">Athletics</option>
            </select>
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>
            <input
              type="url"
              id="photo_url"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="input-field"
            />
          </div>
        </div>

        {/* Biography */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Biography
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Brief biography or career highlights..."
            className="input-field"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link
            to={`/sportspersons/${id}`}
            className="btn-secondary flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={updateMutation.isLoading}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {updateMutation.isLoading ? 'Updating...' : 'Update Sportsperson'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSportsperson;
