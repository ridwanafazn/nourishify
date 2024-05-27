import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarStudent from '../component/NavbarStudent';
import '../style/UserProfile.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    nisn: '',
    name: '',
    gender: '',
    birthPlace: '',
    birthDate: '',
    school: '',
    major: '',
    class: '',
  });
  const [originalProfile, setOriginalProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://nourishify-api.vercel.app/api/students/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();
        setProfile(profileData);
        setOriginalProfile(profileData);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://nourishify-api.vercel.app/api/students/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setEditMode(false);
        setOriginalProfile(profile);
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleCancelEdit = () => {
    setProfile(originalProfile);
    setEditMode(false);
  };

  const handlePasswordUpdate = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://nourishify-api.vercel.app/api/students/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword }),
      });

      if (response.ok) {
        alert('Password updated successfully!');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage('Failed to update password: ' + errorData.msg);
        console.error('Failed to update password:', errorData);
      }
    } catch (err) {
      setErrorMessage('Failed to update password');
      console.error('Failed to update password:', err);
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  return (
    <>
      <NavbarStudent />
      <div className="profile-container">
        <h1>Data Siswa</h1>
        <div className="profile-details">
          <label>
            NISN
            <input
              type="text"
              name="nisn"
              value={profile.nisn}
              disabled
            />
          </label>
          <label>
            Nama
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          <label>
            Jenis Kelamin
            <select
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              disabled={!editMode}
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </label>
          <label>
            Kota Kelahiran
            <input
              type="text"
              name="birthPlace"
              value={profile.birthPlace}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          <label>
            Tanggal Lahir
            <input
              type="date"
              name="birthDate"
              value={profile.birthDate ? profile.birthDate.split('T')[0] : ''}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          <label>
            Sekolah
            <input
              type="text"
              name="school"
              value={profile.school}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          <label>
            Jurusan
            <select
              name="major"
              value={profile.major}
              onChange={handleInputChange}
              disabled={!editMode}
            >
              <option value="Ilmu Pengetahuan Alam">Ilmu Pengetahuan Alam</option>
              <option value="Ilmu Pengetahuan Sosial">Ilmu Pengetahuan Sosial</option>
            </select>
          </label>
          <label>
            Kelas
            <select
              name="class"
              value={profile.class}
              onChange={handleInputChange}
              disabled={!editMode}
            >
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </label>
        </div>
        <div className="button-group">
          {editMode ? (
            <>
              <button onClick={handleSaveProfile}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit</button>
          )}
        </div>
        <div className="password-change">
          <h2>Ubah Password</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label>
            Current Password:
            <div className="password-input">
              <input
                type={passwordVisibility.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
              <span onClick={() => togglePasswordVisibility('currentPassword')}>
                {passwordVisibility.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <label>
            New Password:
            <div className="password-input">
              <input
                type={passwordVisibility.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
              <span onClick={() => togglePasswordVisibility('newPassword')}>
                {passwordVisibility.newPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <label>
            Confirm Password:
            <div className="password-input">
              <input
                type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
              <span onClick={() => togglePasswordVisibility('confirmPassword')}>
                {passwordVisibility.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>
          <button onClick={handlePasswordUpdate}>Update Password</button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
