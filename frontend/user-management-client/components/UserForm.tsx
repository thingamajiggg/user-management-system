'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CreateUserDto, UpdateUserDto, User } from '../types';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserDto | UpdateUserDto) => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateUserDto | UpdateUserDto>({
    defaultValues: user
      ? {
          fullName: user.fullName,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        }
      : {},
  });

  const [dob, setDob] = useState<Date | null>(
    user?.dateOfBirth ? new Date(user.dateOfBirth) : null
  );

  const handleDateChange = (date: Date | null) => {
    setDob(date);
    if (date) {
      setValue('dateOfBirth', date.toISOString().split('T')[0]);
    }
  };

  const isEditMode = !!user;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? 'Edit User' : 'Create New User'}
      </h2>

      <div className="form-group">
        <label className="form-label" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          className="form-input"
          {...register('fullName', { required: 'Full name is required' })}
        />
        {errors.fullName && (
          <span className="form-error">{errors.fullName.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="dateOfBirth">
          Date of Birth
        </label>
        <DatePicker
          selected={dob}
          onChange={handleDateChange}
          className="form-input"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date of birth"
          maxDate={new Date()}
        />
        {errors.dateOfBirth && (
          <span className="form-error">{errors.dateOfBirth.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password {isEditMode && '(Leave blank to keep current password)'}
        </label>
        <input
          id="password"
          type="password"
          className="form-input"
          {...register('password', {
            required: isEditMode ? false : 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}