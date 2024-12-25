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
import { useAdminFindALLProject } from "../hook/projectAndBlog.hook";
import CreateProject from "../Components/ui/ProjectAndBlog/CreateProject";
import UpdateProjectForm from "../Components/ui/ProjectAndBlog/UpdateProjectForm";

const CProjectPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");

  const {
    data: expData,
    isPending: isExpPending,
    isError: isExpError,
    isSuccess,
  } = useAdminFindALLProject();

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
          <UpdateProjectForm defaultValue={defaultValue} />
        </CustomModal>{" "}
      </div>

      {/* table section  */}
      <div>
        <div className="flex justify-end text-center py-3">
          <CreateProject />
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
              <TableColumn>projectImage</TableColumn>
              <TableColumn>projectName</TableColumn>

              <TableColumn>liveLink</TableColumn>
              <TableColumn>clientGitHubLink</TableColumn>
              <TableColumn>backendGitHubLink</TableColumn>

              <TableColumn>description</TableColumn>
              <TableColumn>challengesFaced</TableColumn>
              <TableColumn>Solutions</TableColumn>
              <TableColumn>technologies</TableColumn>
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
                          {ct?.projectImage ? (
                            <div className="flex gap-2">
                              <Image
                                height={80}
                                width={80}
                                src={ct?.projectImage ? ct?.projectImage : ""}
                                alt="projectImage"
                                className=" object-cover rounded"
                              />
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>{ct?.projectName}</TableCell>

                        <TableCell>
                          <a
                            className="underline text-blue-600"
                            href={ct?.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            className="underline text-blue-600"
                            href={ct?.clientGitHubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            className="underline text-blue-600"
                            href={ct?.backendGitHubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click
                          </a>
                        </TableCell>

                        <TableCell>{ct?.description.slice(0, 30)}</TableCell>
                        <TableCell>
                          {ct?.challengesFaced.slice(0, 30)}
                        </TableCell>
                        <TableCell>{ct?.Solutions.slice(0, 30)}</TableCell>
                        <TableCell>{ct?.technologies.slice(0, 30)}</TableCell>
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

export default CProjectPage;
