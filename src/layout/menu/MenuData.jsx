const menu = [
  {
    heading: "Welcome",
  },
  {
    icon: "dashboard-fill",
    text: "Dashboard",
    link: "/",
    permission: "all",
  },
  {
    icon: "sign-btc-alt",
    text: "Assets Transactions",
    permission: "all",
    link: "/assets",
  },
  {
    icon: "cc-jcb",
    text: "Giftcard Transactions",
    permission: "all",
    link: "/giftcards",
  },
  {
    icon: "coins",
    text: "Withdrawals",
    permission: "all",
    link: "/withdrawals",
  },
  {
    icon: "swap",
    text: "Transactions",
    permission: "all",
    link: "/transactions",
  },

  {
    heading: "Manage Users",
  },
  {
    icon: "users-fill",
    text: "Users",
    link: "/user-management",
    permission: "all",
  },
  {
    icon: "user-alt-fill",
    text: "Admin",
    link: "/admin-management",
    permission: "all",
  },
  {
    icon: "layers-fill",
    text: "Roles",
    link: "/roles-management",
    permission: "all",
  },
  {
    icon: "user-list-fill",
    text: "Referrals",
    link: "/referral-management",
    permission: "all",
  },

  {
    heading: "New & updates",
  },
  {
    icon: "inbox-fill",
    text: "Announcement",
    link: "/announcement",
    permission: "all",
  },
  {
    icon: "view-x7",
    text: "Banners",
    link: "/banners",
    permission: "all",
  },
  {
    icon: "question",
    text: "FAQs",
    link: "/faqs",
    permission: "all",
  },
  {
    icon: "mobile",
    text: "App Version",
    link: "/app-version",
    permission: "all",
  },

  {
    icon: "notes",
    text: "Referral Terms",
    link: "/referral-terms",
    permission: "all",
  },

  {
    heading: "configuration",
  },
  {
    icon: "wallet",
    text: "System bank account",
    link: "/system-bank-account",
    permission: "all",
  },
  {
    icon: "rss",
    text: "Service Providers",
    link: "/service-providers",
    permission: "all",
  },
  {
    icon: "network",
    text: "Services",
    link: "/services",
    permission: "all",
  },
  {
    icon: "shield-star-fill",
    text: "Trade Settings",
    link: "/trades-info",
    permission: "all",
  },

  {
    heading: "preferences",
  },
  // {
  //   icon: "account-setting",
  //   text: "Account",
  //   link: "/account settings",
  // },
  {
    icon: "opt-alt-fill",
    text: "Settings",
    link: "/settings",
    permission: "all",
  },
];
export default menu;
