"use client";
import React, { useEffect } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomButton from "../Button/CustomButton";

import Swal from "sweetalert2";
import { useCreateSkill } from "@/src/hook/expAndSkill.hook";

import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import CustomInput from "../../Form/CustomInput";
import CustomSelect from "../../Form/CustomSelect";
import toast from "react-hot-toast";

const CreateSkillForm = () => {
  const {
    mutate: handleCreateSkill,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useCreateSkill();

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
  }, [isExpError, isExpSuccess,expData]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newPayload = {
      payload: {
        skillName: data?.skillName,
        skillPercentage: Number(data?.skillPercentage),
        skillType: data?.skillType,
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
        handleCreateSkill(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit}>
        <div className="flex justify-between gap-4">
          <CustomInput name="skillName" label="skillName" type="string" />

          <CustomSelect
            label="Select Skill Type"
            name="skillType"
            options={[
              { label: "Frontend", value: "Frontend" },
              { label: "Backend", value: "Backend" },
            ]}
          />
          <CustomInput
            name="skillPercentage"
            label="skillPercentage"
            type="number"
          />
        </div>

        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default CreateSkillForm;
