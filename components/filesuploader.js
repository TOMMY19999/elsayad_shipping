import axios from "axios";

export const UploadFiles = async (files, user, type, order, filescount) => {
  const formData = new FormData();
  if (files && type === "proilepic") {
    console.log(files);
    formData.append("profile", files);
    formData.append("id", user.id);

    await axios
      .post(
        `/api/upload`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data ",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  }
};
