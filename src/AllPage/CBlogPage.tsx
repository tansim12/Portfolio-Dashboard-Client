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
import Image from "next/image";
import { useAdminFindALLBlog } from "../hook/projectAndBlog.hook";
import UpdateBlogForm from "../Components/ui/ProjectAndBlog/UpdateBlogForm";
import CreateBlog from "../Components/ui/ProjectAndBlog/CreateBlog";

const CBlogPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");

  const {
    data: expData,
    isPending: isExpPending,
    isError: isExpError,
    isSuccess,
  } = useAdminFindALLBlog();

  const [defaultValue, setDefaultValue] = useState({});
  useEffect(() => {
    if (isExpError) {
      toast.error("All Category data get problem");
    }
  }, []);

  const handleEditCategory = (ct: any) => {
    setDefaultValue(ct);
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
          <UpdateBlogForm defaultValue={defaultValue} />
        </CustomModal>{" "}
      </div>

      {/* table section  */}
      <div>
        <div className="flex justify-end text-center py-3">
          <CreateBlog />
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
              <TableColumn>images</TableColumn>
              <TableColumn>title</TableColumn>
              <TableColumn>description</TableColumn>
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
                          {ct?.images?.length > 0 ? (
                            <div className="flex gap-2">
                              <Image
                                height={80}
                                width={80}
                                src={ct?.images?.[0] ? ct?.images?.[0] : ""}
                                alt="projectImage"
                                className=" object-cover rounded"
                              />
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>{ct?.title}</TableCell>
                        <TableCell>{ct?.description.slice(0, 30)}</TableCell>
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

export default CBlogPage;
