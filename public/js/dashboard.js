// public/js/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const filePicker = document.getElementById("file-picker");
  const profilePicture = document.getElementById("profile-picture");
  const progressBar = document.getElementById("progress-bar");
  const imageUploadError = document.getElementById("image-upload-error");
  const submitButton = document.getElementById("submit-button");
  const updateSuccess = document.getElementById("update-success");
  const updateError = document.getElementById("update-error");
  const errorDiv = document.getElementById("error");

  filePicker.addEventListener("change", handleImageChange);

  document
    .getElementById("profile-form")
    .addEventListener("submit", handleSubmit);

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      profilePicture.src = url;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("File upload failed");
        }

        const data = await response.json();
        document.getElementById("profile-form").dataset.profilePicture =
          data.url;
      } catch (error) {
        imageUploadError.textContent =
          "Could not upload image. Please try again.";
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      profilePicture:
        document.getElementById("profile-form").dataset.profilePicture,
    };

    try {
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      updateSuccess.textContent = "Profile updated successfully";
      updateSuccess.style.display = "block";
    } catch (error) {
      updateError.textContent = "Could not update profile. Please try again.";
      updateError.style.display = "block";
    }
  }

  window.showModal = function () {
    document.getElementById("modal").style.display = "block";
  };

  window.closeModal = function () {
    document.getElementById("modal").style.display = "none";
  };

  window.deleteAccount = async function () {
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      window.location.href = "/";
    } catch (error) {
      errorDiv.textContent = "Could not delete account. Please try again.";
      errorDiv.style.display = "block";
    }
  };

  window.signOut = async function () {
    try {
      const response = await fetch("/api/users/signout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Sign out failed");
      }

      window.location.href = "/";
    } catch (error) {
      errorDiv.textContent = "Could not sign out. Please try again.";
      errorDiv.style.display = "block";
    }
  };
});
