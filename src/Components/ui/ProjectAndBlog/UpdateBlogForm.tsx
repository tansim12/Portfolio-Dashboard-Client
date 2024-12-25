"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";
import Swal from "sweetalert2";
import CustomToggle from "../../Form/CustomToggle";
import CustomInput from "../../Form/CustomInput";
import {
  useAdminUpdateBlog,
  useAdminUpdateProject,
} from "@/src/hook/projectAndBlog.hook";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomFileUpload from "../../Form/CustomFileUpload";
import Image from "next/image";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";

const UpdateBlogForm = ({ defaultValue }: { defaultValue: any }) => {
  const { images, _id, ...mDefaultValue } = defaultValue;
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleUpdateBlog,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useAdminUpdateBlog();

  useEffect(() => {
    if (isExpError) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while creating the category.",
        icon: "error",
      });
    }

    if (isExpSuccess) {
      Swal.fire({
        title: "Create!",
        text: "Your file has been updated.",
        icon: "success",
      });
      setSelectImages([]); // Reset form state
    }
  }, [isExpError, isExpSuccess]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images2 = await uploadImagesToImgBB(selectImages);
    const newPayload = {
      id: _id,
      payload: {
        images: images2?.length > 0 ? images2 : images,
        title: data?.title,
        description: data?.description,
        isDelete: data?.isDelete,
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
        handleUpdateBlog(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={mDefaultValue}>
        <CustomInput name="title" label="Title *" type="string" />
        <CustomToggle name="isDelete" label="Is Delete" />
        <CustomReactQuill name="description" label="description *" />
        <div className=" flex flex-wrap gap-3 my-5">
          {images?.map((img: string, i: number) => (
            <Image
              key={i} // Add a key for each item in the list
              width={80}
              height={80}
              alt={`Image ${i + 1}`} // Provide a meaningful alt text
              src={img} // Ensure `img` is a valid URL
            />
          ))}
        </div>
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

export default UpdateBlogForm;
