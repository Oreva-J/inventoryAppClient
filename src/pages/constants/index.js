import { GoGoal } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import {
  IoIosStats,
  IoIosSettings,
  IoIosPerson,
  IoIosPersonAdd,
  IoIosEyeOff,
  IoIosLogIn,
  IoIosLogOut,
} from "react-icons/io";
import {
  FaChartBar,
  FaCalendarAlt,
  FaFacebookMessenger,
  FaUsersCog,
  FaListAlt,
} from "react-icons/fa";


export const links = [
  {
    href: "/dashboard",
    icon: FaChartBar,
    text: "Dashboard",
  },
  {
    href: "kanban",
    icon: FaCalendarAlt,
    text: "Kanban",
    badge: {
      text: "Pro",
      color: "bg-gray-100 text-gray-800",
      darkColor: "dark:bg-gray-700 dark:text-gray-300",
    },
  },
  {
    href: "profile",
    icon: FaFacebookMessenger,
    text: "Profile",
    badge: {
      text: "4",
      color: "bg-blue-100 text-blue-800",
      darkColor: "dark:bg-blue-900 dark:text-blue-300",
    },
  },
  {
    href: "#",
    icon: FaUsersCog,
    text: "Users",
  },
  {
    href: "createProduct",
    icon: FaListAlt,
    text: "ADD Products",
  },
  {
    href: "/",
    icon: IoIosLogIn,
    text: "Home",
  },

];







