"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";
import Swal from "sweetalert2";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import CustomInput from "../../Form/CustomInput";
import toast from "react-hot-toast";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomFileUpload from "../../Form/CustomFileUpload";
import { useCreateBlog } from "@/src/hook/projectAndBlog.hook";

const CreateBlogForm = () => {
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleCreateProject,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useCreateBlog();

  useEffect(() => {
    if (isExpError) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while creating the category.",
        icon: "error",
      });
    }

    if (isExpSuccess || expData) {
      toast.success("create done");
    }
  }, [isExpError, isExpSuccess, expData]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectImages.length) {
      toast.error("At least one image is required");
      return;
    }
    const images = await uploadImagesToImgBB(selectImages);
    if (images?.length < 1) {
      return toast.error("Please Select image");
    }
    if (images?.length > 3) {
      return toast.error("Max 3");
    }
    const newPayload = {
      payload: {
        ...data,
        images,
      },
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCreateProject(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit}>
        <CustomInput name="title" label="Title *" type="string" />
        <CustomReactQuill name="description" label="description *" />
        <div>
          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="images"
            label="Images *"
          />
        </div>
        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default CreateBlogForm;
