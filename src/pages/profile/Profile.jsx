import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { selectUser, SET_USER } from '../../redux/features/auth/authSlice';
import { getUser, updateUser } from '../../redux/features/auth/authService';
import user01 from "../../assets/user01.png";
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUser);
  

  // Fetch user data from userService in useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      if (userData) {
        console.log(userData);
        
        dispatch(SET_USER(userData)); // Dispatch user data after resolving the promise
      }
    };
    
    fetchUserData();
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const { bio, email, name, photo, phone } = editedProfile;

  // Image useState
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));

  }

  useEffect(()=>{
    setEditedProfile(userProfile)
  },[userProfile])

  // Toggle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Loading state for handling profile update
  const [loading, setLoading] = useState(false);

 // Handle profile update
 const handleProfileUpdate = async () => {
  setLoading(true); // Set loading state before API call

  let imageURL = photo; // Default to the old photo URL if no new image is selected

  // If a new image is selected, upload it
  if (image && (
    image.type === "image/jpeg" ||
    image.type === "image/jpg" ||
    image.type === "image/png"
  )) {
    try {
      const profileImage = new FormData();
      profileImage.append("file", image)
      profileImage.append("cloud_name", "db4ewstgm")
      profileImage.append("upload_preset", "db4ewstgmmm")

      // first save mage to cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/db4ewstgm/image/upload", 
        {method: "post", body: profileImage });

      const imageData = await response.json();
      console.log("Cloudinary response:", imageData);
      imageURL = imageData.url.toString(); // Set the new image URL
      console.log("Image uploaded successfully:", imageURL);
    } catch (err) {
      console.error("Image upload failed:", err);
      setLoading(false);
      return; // Stop the update if image upload fails
    }
  }

  // Create the data object for the update
  const editedData = {
    bio,
    email,
    name,
    phone,
    photo: imageURL, // Use the new image URL (or the old one if no new image)
  };

  // Update the user profile
  try {
    const updatedUser = await updateUser(editedData);

    if (updatedUser) {
      dispatch(SET_USER(updatedUser)); // Update the Redux state with the new user data
      console.log(editedData, editedProfile);
      
      toast.success("Profile updated successfully");
    } else {
      console.error("Profile update failed");
    }
  } catch (error) {
    console.error("Profile update error:", error);
    toast.error("An error occurred while updating the profile");
  }

  setLoading(false); // Reset loading state
  handleClose(); // Close the modal
};


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle phone input change (adding simple validation)
 

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        {/* User Image */}
        <img
          src={userProfile.photo || user01} // Default to user01 if no photo is available
          alt="User"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold">{userProfile.name}</h1>
          <p className="text-gray-600">{userProfile.email}</p>
          <p className="text-gray-600">{userProfile.phone}</p>
          <p className="text-gray-500 mt-2">{userProfile.bio}</p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-6 text-right">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FaEdit />}
          onClick={handleOpen}
        >
          Edit Profile
        </Button>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>
          <form className="mt-4 space-y-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={editedProfile.name}
              onChange={handleChange}
              name="name"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={editedProfile.email}
              onChange={handleChange}
              name="email"
              disabled
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={editedProfile.phone}
              onChange={handleChange} // Use the custom handler for phone
              name="phone"
            />
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editedProfile.bio}
              onChange={handleChange}
              name="bio"
            />
            <div>
              <input type="file" onChange={handleImageChange} name="image" />
              {imagePreview && <img className="w-14" src={imagePreview} alt="Preview" />}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProfileUpdate}
                disabled={loading} // Disable the button while loading
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
