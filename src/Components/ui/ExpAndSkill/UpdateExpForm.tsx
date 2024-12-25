"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdminUpdateExp, useCreateExp } from "@/src/hook/expAndSkill.hook";

import CustomFileUpload from "../../Form/CustomFileUpload";
import CustomReactQuill from "../../Form/CustomReactQuill";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import Image from "next/image";
import CustomToggle from "../../Form/CustomToggle";

const UpdateExpForm = ({ defaultValue }: { defaultValue: any }) => {
  const { companyLogo, _id, ...mDefaultValue } = defaultValue;
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleUpdateExp,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useAdminUpdateExp();

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
    const images = await uploadImagesToImgBB(selectImages);
    const newPayload = {
      id: _id,
      payload: {
        details: data?.details,
        companyLogo: images?.length > 0 ? images?.[0] : companyLogo,
        isDelete:data?.isDelete
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
        handleUpdateExp(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={mDefaultValue}>
        <div className="mb-5">
          {/* @ts-ignore */}
          <CustomReactQuill name="details" label="Details *" />
        </div>
        <CustomToggle label="Is Delete" name="isDelete" />
        <div className="  my-10">
          <Image
            width={80}
            height={80}
            alt={`Image `} // Provide a meaningful alt text
            src={companyLogo} // Ensure `img` is a valid URL
          />
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

export default UpdateExpForm;
