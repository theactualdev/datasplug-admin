const menu = [
  {
    heading: "Welcome",
    show: ["dashboard", "crypto-transactions", "giftcard-transactions", "wallet-transactions", "transactions"],
  },
  {
    icon: "dashboard-fill",
    text: "Dashboard",
    link: "/",
    permission: "dashboard",
  },
  {
    icon: "sign-btc-alt",
    text: "Assets Transactions",
    permission: "crypto-transactions",
    link: "/assets",
    subMenu: [
      {
        text: "Buy",
        link: "/assets/buy",
        permission: "all",
      },
      {
        text: "Sell",
        link: "/assets/sell",
        permission: "all",
      },
    ],
  },
  {
    icon: "cc-jcb",
    text: "Giftcard Transactions",
    permission: "giftcard-transactions",
    link: "/giftcards",
    subMenu: [
      {
        text: "Buy",
        link: "/giftcards/buy",
        permission: "all",
      },
      {
        text: "Sell",
        link: "/giftcards/sell",
        permission: "all",
      },
    ],
  },
  {
    icon: "coins",
    text: "Wallet Transactions",
    permission: "wallet-transactions",
    // link: "/withdrawals",
    subMenu: [
      {
        text: "Deposit",
        link: "/wallet/deposit",
        permission: "all",
      },
      {
        text: "Transfer",
        link: "/wallet/transfer",
        permission: "all",
      },
      {
        text: "Withdrawal",
        link: "/wallet/withdrawal",
        permission: "all",
      },
    ],
  },
  {
    icon: "swap",
    text: "Services Transactions",
    permission: "transactions",
    // link: "/transactions",
    subMenu: [
      {
        text: "All Transactions",
        link: "/transactions/all",
        permission: "all",
      },

      {
        text: "Airtime Transactions",
        link: "/transactions/airtime",
        permission: "all",
      },
      {
        text: "Data Transactions",
        link: "/transactions/data",
        permission: "all",
      },
      {
        text: "Betting Transactions",
        link: "/transactions/bettings",
        permission: "all",
      },

      {
        text: "Cable TV Transactions",
        link: "/transactions/cable-tv",
        permission: "all",
      },
      {
        text: "Electricity Transactions",
        link: "/transactions/electricity",
        permission: "all",
      },
      {
        text: "Education",
        link: "/transactions/education",
        permission: "all",
      },

      // {
      //   text: "Services Transactions",
      //   link: "/transactions/services",
      //   permission: "all",
      // },
    ],
  },

  // {
  //   icon: "invest",
  //   text: "Requests",
  //   permission: "all",
  //   link: "/withdrawals",
  //   subMenu: [
  //     {
  //       text: "Deposit Requests",
  //       link: "/requests/deposit",
  //       permission: "all",
  //     },
  //     {
  //       text: "Withdrawal Requests",
  //       link: "/requests/withdrawal",
  //       permission: "all",
  //     },
  //   ],
  // },

  {
    heading: "Manage Users",
    show: ["users", "admins", "roles"],
  },
  {
    icon: "users-fill",
    text: "Users",
    link: "/user-management",
    permission: "users",
  },
  {
    icon: "user-alt-fill",
    text: "Admin",
    link: "/admin-management",
    permission: "admins",
  },
  {
    icon: "layers-fill",
    text: "Roles",
    link: "/roles-management",
    permission: "roles",
  },
  // {
  //   icon: "user-list-fill",
  //   text: "Referrals",
  //   link: "/referral-management",
  //   permission: "all",
  // },

  {
    heading: "New & updates",
    show: ["alerts", "announcement", "faqs", "referral-terms", "all"],
  },
  {
    icon: "inbox-fill",
    text: "Announcement",
    link: "/announcement",
    permission: "alerts",
  },
  {
    icon: "view-x7",
    text: "Banners",
    link: "/banners",
    permission: "banners",
  },
  {
    icon: "question",
    text: "FAQ",
    permission: "faq",
    subMenu: [
      {
        text: "FAQ Categories",
        link: "/faq-categories",
        permission: "faq-categories",
      },
      {
        text: "FAQs",
        link: "/faqs",
        permission: "faqs",
      },
    ],
  },
  // {
  //   icon: "mobile",
  //   text: "App Version",
  //   link: "/app-version",
  //   permission: "all",
  // },

  {
    icon: "notes",
    text: "Referral Terms",
    link: "/referral-terms",
    permission: "referral-terms",
  },

  {
    heading: "configuration",
    show: ["providers", "services", "route-actions"],
  },
  // {
  //   icon: "wallet",
  //   text: "System bank account",
  //   link: "/system-bank-account",
  //   permission: "all",
  // },
  {
    icon: "rss",
    text: "Service Providers",
    link: "/service-providers",
    permission: "providers",
  },
  {
    icon: "network",
    text: "Services",
    link: "/services",
    permission: "services",
  },
  {
    icon: "shield-star-fill",
    text: "Service Types",
    link: "/service-types",
    permission: "route-actions",
  },

  {
    heading: "preferences",
    show: ["all"],
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
