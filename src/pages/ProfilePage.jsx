import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
    setError('');
    setSuccessMsg('');

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
    setSuccessMsg('');
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

  if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container my-5 bg-white p-5 text-center" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">My Profile</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="mb-4">
        <img
          src={formData.profilePicUrl || 'https://placehold.co/150x150'}
          alt="Profile"
          className="rounded-circle border"
          style={{ width: 150, height: 150, objectFit: 'cover' }}
        />
      </div>

      {editing && (
        <div className="mb-3 text-start">
          <label htmlFor="profilePicUpload" className="form-label">
            Upload Profile Picture
          </label>
          <input
            id="profilePicUpload"
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
          />
        </div>
      )}

      {editing ? (
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              className="form-control"
              disabled={saving}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              className="form-control"
              disabled={saving}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              id="company"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              className="form-control"
              disabled={saving}
            />
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || uploading}
              className="btn btn-primary"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <strong>Company:</strong> {profile.company || 'N/A'}
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
