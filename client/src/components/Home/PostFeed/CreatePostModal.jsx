import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import PropTypes from "prop-types";
import { useCreatePostMutation } from "../../../features/posts/postapi";
import { toast } from "react-toastify";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [createpost] = useCreatePostMutation();
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, file]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prevImagePreviews) => [
          ...prevImagePreviews,
          e.target.result,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const newSelectedImages = [...prevSelectedImages];
      newSelectedImages.splice(index, 1);
      return newSelectedImages;
    });

    setImagePreviews((prevImagePreviews) => {
      const newImagePreviews = [...prevImagePreviews];
      newImagePreviews.splice(index, 1);
      return newImagePreviews;
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("postimage", selectedImages[i]);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const res = await createpost(formData).unwrap();
      toast.success("Post created");
      console.log("res", res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
    }
    onClose();
  };

  // const handleSubmit = (e) => {};

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-40 ${
        isOpen ? "" : "hidden"
      } transform transition-transform duration-300 ease-out hover:scale-110`}
    >
      <div className="modal-overlay">
        <div className="modal bg-white rounded-md w-96">
          <div className="modal-content m-4  ">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">Create Post</h1>
              <button
                className="px-4 py-2 bg-gray-100 rounded-md "
                onClick={onClose}
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>
            <textarea
              className="w-full h-32 p-2 border-2 border-gray-300 rounded-md  focus:outline-none"
              placeholder="Write your post here..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            {selectedImages.length > 0 && (
              <div className="mt-4 flex">
                {selectedImages.map((file, index) => (
                  <div key={index} className="mb-2 flex items-center relative ">
                    <img
                      src={imagePreviews[index]}
                      alt="Selected Image"
                      className="max-w-full h-32 "
                    />
                    <button
                      className="ml-2 px-2 py-1 text-white bg-red-500 rounded-md absolute top-0 right-0"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <AiOutlineClose className="text-md" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label htmlFor="fileInput" className=" ">
              <BsImages className="text-3xl m-auto cursor-pointer" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              name="postimage"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="modal-actions mt-4">
            <button
              className="px-4 py-2  text-white bg-blue-500 rounded-md w-full"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

CreatePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
