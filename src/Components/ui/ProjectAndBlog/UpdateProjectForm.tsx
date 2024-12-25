"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";
import Swal from "sweetalert2";
import { useAdminUpdateSkill } from "@/src/hook/expAndSkill.hook";

import CustomToggle from "../../Form/CustomToggle";
import CustomInput from "../../Form/CustomInput";
import CustomSelect from "../../Form/CustomSelect";
import { useAdminUpdateProject } from "@/src/hook/projectAndBlog.hook";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomFileUpload from "../../Form/CustomFileUpload";
import Image from "next/image";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";

const UpdateProjectForm = ({ defaultValue }: { defaultValue: any }) => {
  const { projectImage, _id, ...mDefaultValue } = defaultValue;
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleUpdateProject,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useAdminUpdateProject();

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
        projectImage: images?.length > 0 ? images?.[0] : projectImage,
        liveLink: data?.liveLink,
        clientGitHubLink: data?.clientGitHubLink,
        backendGitHubLink: data?.backendGitHubLink,
        technologies: data?.technologies,
        Solutions: data?.Solutions,
        challengesFaced: data?.challengesFaced,
        description: data?.description,
        projectName: data?.projectName,
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
        handleUpdateProject(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={mDefaultValue}>
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
          <CustomToggle name="isDelete" label="isDelete " />
        </div>

        <CustomReactQuill name="description" label="description *" />
        <CustomReactQuill name="challengesFaced" label="challengesFaced" />
        <CustomReactQuill name="Solutions" label="Solutions" />

        <div className="  my-10">
          <Image
            width={80}
            height={80}
            alt={`Image `} // Provide a meaningful alt text
            src={projectImage} // Ensure `img` is a valid URL
          />
        </div>
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

export default UpdateProjectForm;
