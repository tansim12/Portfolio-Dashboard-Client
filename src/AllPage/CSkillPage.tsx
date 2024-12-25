"use client";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";

import { FaEdit } from "react-icons/fa";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import CustomModal from "../Components/ui/Custom Modal/CustomModal";
import NoFoundData from "../Components/ui/No Found/NoFoundData";
import { useAdminFindALLSkill } from "../hook/expAndSkill.hook";
import CreateSkill from "../Components/ui/ExpAndSkill/CreateSkill";
import UpdateSkillForm from "../Components/ui/ExpAndSkill/UpdateSkillForm";

const CSkillPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");

  const {
    data: expData,
    isPending: isExpPending,
    isError: isExpError,
    isSuccess,
  } = useAdminFindALLSkill();

  const [defaultValue, setDefaultValue] = useState({});
  useEffect(() => {
    if (isExpError) {
      toast.error("All Category data get problem");
    }
  }, []);

  const handleEditCategory = (ct: any) => {
    const payload = {
      skillPercentage: ct?.skillPercentage,
      isDelete: ct?.isDelete,
      _id: ct?._id,
      skillType: ct?.skillType,
      skillName: ct?.skillName,
    };
    setDefaultValue(payload);
  };

  return (
    <div>
      {/* modal section  */}

      {/* edit category modal  */}
      <div>
        <CustomModal
          title="Edit Category"
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          <UpdateSkillForm defaultValue={defaultValue} />
        </CustomModal>{" "}
      </div>

      {/* table section  */}
      <div>
        <div className="flex justify-end text-center py-3">
          <CreateSkill />
        </div>
        {/* Responsive container for horizontal scrolling */}
        <div className="overflow-x-scroll ">
          <Table
            aria-label="User Management Table with Actions"
            className="min-w-full table-auto"
            fullWidth={false}
            bottomContent={isExpPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Skill Name</TableColumn>
              <TableColumn>skillPercentage</TableColumn>
              <TableColumn>skillType</TableColumn>
              <TableColumn>Is Delete</TableColumn>
              <TableColumn>createdAt</TableColumn>
              <TableColumn>updatedAt</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            {expData?.length > 0 ? (
              <TableBody>
                {expData?.length > 0
                  ? expData?.map((ct: any) => (
                      <TableRow key={ct?._id}>
                        <TableCell>{ct?.skillName}</TableCell>
                        <TableCell>{ct?.skillPercentage}</TableCell>
                        <TableCell>{ct?.skillType}</TableCell>
                        <TableCell
                          className={
                            ct?.isDelete ? "text-red-500" : "text-gray-500"
                          }
                        >
                          {ct?.isDelete.toString()}
                        </TableCell>

                        <TableCell>
                          {moment(ct?.createdAt).format("ll")}
                        </TableCell>
                        <TableCell>
                          {moment(ct?.updatedAt).format("ll")}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              onOpen();
                              handleEditCategory(ct);
                            }}
                            className=" flex justify-center items-center gap-2"
                            color="success"
                            size="sm"
                          >
                            <FaEdit /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : !isExpPending && <NoFoundData />}
              </TableBody>
            ) : (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CSkillPage;
