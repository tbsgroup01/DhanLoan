
import {
  FaTachometerAlt,
  FaUsers,
  FaUniversity,
  FaTags,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { ListRestart } from "lucide-react";
export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: FaTachometerAlt,
    },
    {
      title: "All Applications",
      url: "/all-applications",
      icon: FaUsers,
    },
    
    {
      title: "Loan Recovery",
      url: "/loan-recovery",
      icon: ListRestart ,
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