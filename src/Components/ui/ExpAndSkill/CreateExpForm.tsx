"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useCreateExp } from "@/src/hook/expAndSkill.hook";

import CustomFileUpload from "../../Form/CustomFileUpload";
import CustomReactQuill from "../../Form/CustomReactQuill";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";

interface CreateExpPayload {
  payload: {
    details: string;
    companyLogo: File[];
  };
}

const CreateExpForm = () => {
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleCreateExp,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useCreateExp();

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
    if (!data.details) {
      toast.error("Details field is required");
      return;
    }
    if (!selectImages.length) {
      toast.error("At least one image is required");
      return;
    }
    const images = await uploadImagesToImgBB(selectImages);
    if (images?.length < 1) {
      return toast.error("Please Select image");
    }
    const newPayload: CreateExpPayload = {
      payload: {
        details: data.details,
        companyLogo: images?.[0],
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
        handleCreateExp(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit}>
        <div>
          {/* @ts-ignore */}
          <CustomReactQuill name="details" label="Details *" />
        </div>
        <div>
          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="companyLogo"
            label="Images *"
          />
        </div>
        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default CreateExpForm;
