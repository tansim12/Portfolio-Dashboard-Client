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

const UpdateSkillForm = ({ defaultValue }: { defaultValue: any }) => {
  const { skillType, _id, ...mDefaultValue } = defaultValue;
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const {
    mutate: handleUpdateSkill,
    data: expData,
    isError: isExpError,
    isSuccess: isExpSuccess,
  } = useAdminUpdateSkill();

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
    const newPayload = {
      id: _id,
      payload: {
        skillPercentage: data?.skillPercentage,
        isDelete: data?.isDelete,
        skillType: data?.skillType,
        skillName: data?.skillName,
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
        handleUpdateSkill(newPayload);
      }
    });
  };

  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={mDefaultValue}>
        <div className="flex justify-between gap-4">
          <CustomInput name="skillName" label="skillName" type="string" />

          <CustomSelect
            label="Select Skill Type"
            name="skillType"
            options={[
              { label: "Frontend", value: "Frontend" },
              { label: "Backend", value: "Backend" },
            ]}
            defaultValue={[skillType]}
          />
          <CustomInput
            name="skillPercentage"
            label="skillPercentage"
            type="number"
          />
        </div>
        <CustomToggle label="Is Delete" name="isDelete" />
        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default UpdateSkillForm;
