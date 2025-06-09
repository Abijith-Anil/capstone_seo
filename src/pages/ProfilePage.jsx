import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../assets/styles/ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setFormData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const user = auth.currentUser;
    const storageRef = ref(storage, `profilePics/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        setUploading(false);
        setError('Upload failed.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, profilePicUrl: downloadURL }));
        setUploading(false);
        setSuccessMsg('Profile picture uploaded.');
      }
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const user = auth.currentUser;
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, formData);
      setProfile(formData);
      setEditing(false);
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      setError('Failed to save profile.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
    setError('');
    setSuccessMsg('');
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}

      <img
        className="profile-pic"
        src={formData.profilePicUrl || 'https://via.placeholder.com/150'}
        alt="Profile"
      />

      {editing && (
        <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
      )}

      {editing ? (
        <div className="profile-form">
          <label>First Name <input name="firstName" value={formData.firstName || ''} onChange={handleChange} /></label>
          <label>Last Name <input name="lastName" value={formData.lastName || ''} onChange={handleChange} /></label>
          <label>Company <input name="company" value={formData.company || ''} onChange={handleChange} /></label>
          <button onClick={handleSave} disabled={saving || uploading}>{saving ? 'Saving...' : 'Save'}</button>
          <button onClick={handleCancel} disabled={saving}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Company:</strong> {profile.company || 'N/A'}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
