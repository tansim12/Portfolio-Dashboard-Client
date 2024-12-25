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

import { useAdminFindALLExp } from "../hook/expAndSkill.hook";
import CreateExp from "../Components/ui/ExpAndSkill/CreateExp";
import Image from "next/image";
import UpdateExpForm from "../Components/ui/ExpAndSkill/UpdateExpForm";

const CExperiencePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");

  const {
    data: expData,
    isPending: isExpPending,
    isError: isExpError,
    isSuccess,
  } = useAdminFindALLExp();

  const [defaultValue, setDefaultValue] = useState({});
  useEffect(() => {
    if (isExpError) {
      toast.error("All Category data get problem");
    }
  }, []);

  const handleEditCategory = (ct: any) => {
    const payload = {
      details: ct?.details,
      isDelete: ct?.isDelete,
      _id: ct?._id,
      companyLogo: ct?.companyLogo,
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
          <UpdateExpForm defaultValue={defaultValue} />
        </CustomModal>{" "}
      </div>

      {/* table section  */}
      <div>
        <div className="flex justify-end text-center py-3">
          <CreateExp />
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
              <TableColumn>Company Logo</TableColumn>
              <TableColumn>Details</TableColumn>
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
                        <TableCell>
                          {ct?.companyLogo ? (
                            <div className="flex gap-2">
                              <Image
                                height={80}
                                width={80}
                                src={ct?.companyLogo ? ct?.companyLogo : ""}
                                alt="Company"
                                className=" object-cover rounded"
                              />
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>{ct?.details?.slice(0, 30)}</TableCell>
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

export default CExperiencePage;
