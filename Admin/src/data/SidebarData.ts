
import {
  FaTachometerAlt,
  FaUsers,
  FaUniversity,
  FaTags,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: FaTachometerAlt,
    },
    // {
    //   title: "CRM",
    //   url: "/crm",
    //   icon: FaUsers,
    // },
    // {
    //   title: "Finance",
    //   url: "/finance",
    //   icon: FaMoneyBill,
    // },

    {
      title: "All Applications",
      url: "/all-applications",
      icon: FaUsers,
    },

    {
      title: "White labeling",
      url: "/settings",
      icon: CiEdit,
      
    },

    {
      title: "Payment Settings",
      url: "/payment-settings",
      icon: FaUniversity ,
    },

    {
      title: "Tags",
      url: "/tags",
      icon: FaTags ,
    }

  ],
};