import { FaHome, FaUser } from "react-icons/fa";
import { TbCategory, TbTransactionDollar } from "react-icons/tb";
import { ReactNode } from "react"; // Import ReactNode for JSX types
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import {
  MdOutlineManageAccounts,
  MdOutlineManageSearch,
  MdPayment,
} from "react-icons/md";

// Define the type for the sidebar items
interface SidebarItem {
  name: string;
  path?: string;
  icon?: ReactNode; // Allow icon as ReactNode (JSX element)
  children?: SidebarItem[]; // Optional children property for nested links
}

export const sidebarItems: {
  admin: SidebarItem[];
  user?: SidebarItem[];
  vendor?: SidebarItem[];
} = {
  admin: [
    {
      name: "Project",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Skill",
      path: "/admin/skill",
      icon: <FaUser />,
    },

    {
      name: "Experience",
      path: "/admin/experience",
      icon: <FaUser />,
    },
    {
      name: "Blog",
      path: "/admin/blog",
      icon: <FaUser />,
    },
  ],
};

//* children example
// admin: [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <FaHome />,
//     children: [
//       { name: "Overview", path: "/admin/overview" },
//       { name: "Reports", path: "/admin/reports" },
//     ],
//   },
//   {
//     name: "Users",
//     path: "/admin/users", // its optional when its nested
//     icon: <FiUsers />,
//     children: [
//       { name: "Manage Users", path: "/admin/users/manage" },
//       { name: "Add New User", path: "/admin/users/add" },
//     ],
//   },
// ],
