"use client";

import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import CustomModal from "../Custom Modal/CustomModal";
import { useDisclosure, Button } from "@nextui-org/react";
import CreateExpForm from "./CreateExpForm";

const CreateExp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");

  return (
    <>
      <CustomModal
        title="Edit Category"
        isOpen={isOpen}
        backdrop={backdrop as "opaque" | "blur" | "transparent"}
        onCancel={onClose}
        cancelText="Cancel"
        size="4xl"
      >
        <CreateExpForm />
      </CustomModal>{" "}
      <Button
        onClick={() => {
          onOpen();
        }}
        className=" flex justify-center items-center gap-2"
        color="primary"
        size="sm"
      >
        <BsPlus size={20} /> Create Category
      </Button>
    </>
  );
};

export default CreateExp;
