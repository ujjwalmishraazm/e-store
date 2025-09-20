import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";


const admindashboardSideMenu = [
  {
    title: "Dashboard",
    icon: AiOutlineDashboard,
    route: "/admin/dashboard"
  },

  {
    title: "Categories",    
    icon: BiCategory,
    route: "/hhhhhhh",
    subMenu: [
      {
        title: "Add Category",
        route: "#"
      },
      {
        title: "All Categories",
        route: "#"
      }
    ]
  },
  {
    title: "Products",
    icon: IoShirtOutline,
    route: "#",
    subMenu: [
      {
        title: "Add Product",
        route: "#"
      },
      {
        title: "All variat",
        route: "#"
      },{
        title:"All product",
        route:"#"
      },{
        title:"Product Varient",
        route:"#"
      }
    ]
  }
  ,
  {
    title: "Coupons",
    icon: RiCoupon2Line,
    route: "#",
    subMenu: [
      {
        title: "Add Coupon",
        route: "#"
      },
      {
        title: "All Coupons",
        route: "#"
      }
    ]
  },
  {
    title: "Orders",    
    icon: MdOutlineShoppingBag,
    route: "#",
    
  } 
  ,
  {
    title: "Customers",
    icon: LuUserRound,
    route: "#"
  },    
  {
    title: "Ratings",
    icon: IoMdStarOutline,
    route: "#",
  }
  ,
  {     
    title: "Media",
    icon: MdOutlinePermMedia,
    route: "#"
  }
];
export default admindashboardSideMenu;