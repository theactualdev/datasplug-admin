import User from "../../../../images/avatar/b-sm.jpg";
import User2 from "../../../../images/avatar/c-sm.jpg";
import User3 from "../../../../images/avatar/a-sm.jpg";

export const adminData = [
  {
    id: 1,
    avatarBg: "purple",
    name: "Abu Bin Ishtiyak",
    displayName: "Ishtiak",
    dob: "10 Aug, 1980",
    role: "Admin",
    checked: false,
    email: "info@softnio.com",
    balance: "35040.34",
    phone: "818474958",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "10 Feb 2020",
    status: "Active",
    address: "2337 Kildeer Drive",
    state: "Kentucky",
    country: "Canada",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 2,
    avatarBg: "purple",
    image: User3,
    name: "Ashley Lawson",
    dob: "10 Sept, 1990",
    role: "Manager",
    email: "ashley@softnio.com",
    balance: "580.00",
    checked: false,
    phone: "1243941787",
    emailStatus: "success",
    kycStatus: "pending",
    lastLogin: "07 Feb 2020",
    status: "Pending",
    country: "United States",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 3,
    avatarBg: "info",
    name: "Joe Larson",
    dob: "19 Jan, 1985",
    role: "Manager",
    email: "larson@example.com",
    balance: "32000.34",
    checked: false,
    phone: "1686032320",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "04 Feb 2020",
    status: "Active",
    country: "England",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 4,
    avatarBg: "danger",
    name: "Jane Montgomery",
    dob: "24 April, 1985",
    role: "Manager",
    email: "jane84@example.com",
    balance: "0.00",
    checked: false,
    phone: "4392715360",
    emailStatus: "alert",
    kycStatus: "alert",
    lastLogin: "01 Feb 2020",
    status: "Suspend",
    country: "United States",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 5,
    avatarBg: "purple",
    name: "Frances Burns",
    dob: "30 May, 2000",
    role: "Courier",
    image: User,
    email: "frances@example.com",
    balance: "42.50",
    checked: false,
    phone: "6391303150",
    emailStatus: "pending",
    kycStatus: "error",
    lastLogin: "31 Jan 2020",
    status: "Active",
    country: "Bangladesh",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 6,
    avatarBg: "primary",
    name: "Alan Butler",
    dob: "10 Feb, 1997",
    role: "Manager",
    image: User2,
    email: "butler@example.com",
    balance: "440.34",
    checked: false,
    phone: "9633091706",
    emailStatus: "pending",
    kycStatus: "warning",
    lastLogin: "18 Jan 2020",
    status: "Inactive",
    country: "India",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
  {
    id: 7,
    avatarBg: "warning",
    name: "Victoria Lynch",
    dob: "02 May, 1993",
    role: "Courier",
    email: "victoria@example.com",
    balance: "59400.68",
    checked: false,
    phone: "8119854846",
    emailStatus: "success",
    kycStatus: "success",
    lastLogin: "15 Jan 2020",
    status: "Active",
    country: "China",
    designation: "UI/UX Designer",
    projects: "213",
    performed: "87.5",
    tasks: "587",
  },
];

export const notes = [
  {
    id: 1,
    text: "Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.",
    date: "November 18, 2019",
    time: "5:34 pm",
    company: "Softnio",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend libero semper metus aliquam tempus. Sed efficitur elit et ligula lobortis",
    date: "December 27, 2019",
    time: "7:00 pm",
    company: "Softnio",
  },
];

export const filterStatus = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Courier", label: "Courier" },
];

// export const filterRole = [
//   { value: "Manager", label: "Manager" },
//   { value: "seller", label: "Seller" },
//   { value: "buyer", label: "Buyer" },
// ];

export const countryOptions = [
  { value: "Canada", label: "Canada" },
  { value: "USA", label: "USA" },
  { value: "India", label: "India" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "France", label: "France" },
  { value: "England", label: "England" },
];
