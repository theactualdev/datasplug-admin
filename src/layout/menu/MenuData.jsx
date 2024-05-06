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
    permission: "all",
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
    permission: "all",
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
    permission: "all",
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
  // {
  //   icon: "user-list-fill",
  //   text: "Referrals",
  //   link: "/referral-management",
  //   permission: "all",
  // },

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
    text: "FAQ",
    permission: "all",
    subMenu: [
      {
        text: "FAQ Categories",
        link: "/faq-categories",
        permission: "all",
      },
      {
        text: "FAQs",
        link: "/faqs",
        permission: "all",
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
  // {
  //   icon: "shield-star-fill",
  //   text: "Trade Settings",
  //   link: "/trades-info",
  //   permission: "all",
  // },

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
