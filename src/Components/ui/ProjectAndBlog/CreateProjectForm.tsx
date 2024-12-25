"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";

import Swal from "sweetalert2";
import { useCreateSkill } from "@/src/hook/expAndSkill.hook";

import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import CustomInput from "../../Form/CustomInput";
import CustomSelect from "../../Form/CustomSelect";
import toast from "react-hot-toast";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomFileUpload from "../../Form/CustomFileUpload";
import { useCreateProject } from "@/src/hook/projectAndBlog.hook";

const CreateProjectForm = () => {
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleCreateProject,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useCreateProject();

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
    const newPayload = {
      payload: {
        ...data,
        projectImage: images?.[0],
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
        <div className="grid grid-cols-3 gap-4">
          <CustomInput name="projectName" label="projectName *" type="string" />
          <CustomInput
            name="technologies"
            label="technologies *"
            type="string"
          />
          <CustomInput
            name="backendGitHubLink"
            label="backendGitHubLink *"
            type="string"
          />
          <CustomInput
            name="clientGitHubLink"
            label="clientGitHubLink *"
            type="string"
          />
          <CustomInput name="liveLink" label="liveLink *" type="string" />
        </div>

        <CustomReactQuill name="description" label="description *" />
        <CustomReactQuill name="challengesFaced" label="challengesFaced" />
        <CustomReactQuill name="Solutions" label="Solutions" />

        <div>
          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="projectImage"
            label="Images *"
          />
        </div>
        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default CreateProjectForm;
