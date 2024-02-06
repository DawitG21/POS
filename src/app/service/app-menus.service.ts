import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppMenuService {
  getAppMenus() {
    return [
      // { 'text': 'Navigation', 'is_header': true },
      {
        path: "/dashboard",
        icon: "bi bi-cpu",
        text: "Dashboard",
        accessBy: "Company",
      },
      {
        path: "/company/view-company",
        icon: "bi bi-building",
        text: "Company",
        flag: "access_companies",
        accessBy: "Company"
      },
      {
        path: "/customer/index",
        icon: "bi bi-person-bounding-box",
        text: "Customer",
        flag: "access_customers",
        accessBy: "Company"
      },
      {
        path: '/usertypes/index',
        icon: "bi bi-person-lines-fill",
        text: "User Types",
        flag: "access_usertypes",
        accessBy: "POS"
      },
      {
        icon: "bi bi-puzzle",
        text: "Setup",
        accessBy: "Company",
        children: [
          {
            path: "/store",
            icon: "bi bi-shop",
            text: "Store",
            flag: "access_stores",
          },
          {
            path: "/categories/index",
            icon: "bi bi-collection",
            text: "Categories",
            flag: "access_categories",
          },
          {
            path: "/restaurant-table/index",
            icon: "bi bi-box-fill",
            text: "Restaurant Table",
            flag: "access_restaurant tables",
          },
          {
            path: "/supplier/index",
            icon: "bi bi-shop",
            text: "Supplier",
            flag: "access_suppliers",
          },
          {
            path: "/pages/unit",
            icon: "bi bi-rulers",
            text: "Unit",
            flag: "access_units",
          },
          {
            path: "/pages/tax",
            icon: "bi bi-calculator",
            text: "Tax",
            flag: "access_taxes",
          },
        ],
      },
      {
        icon: "bi bi-collection",
        text: "Stock Management",
        accessBy: "Company",
        children: [
          {
            path: "/purchase/index",
            icon: "bi bi-bag",
            text: "Purchase",
            flag: "access_purchases",
          },
          {
            path: "/purchase-return/index",
            icon: "bi bi-arrow-bar-left",
            text: "Purchase Return",
            flag: "access_purchase returns",
          },
          {
            path: "/transfer/index",
            icon: "bi bi-arrow-left-right",
            text: "Transfer",
            flag: "access_transfers",
          },
          {
            path: "/adjustments/index",
            icon: "bi bi-clipboard2-data",
            text: "Adjustments",
            flag: "access_adjustments",
          },
        ],
      },
      {
        // path: "/pos",
        icon: "bi bi-bag-check",
        text: "POS System",
        isOwnerModule: false,
        accessBy: "Company",
        children: [
          {
            path: "/product/index",
            text: "Product",
            icon: "bi bi-bookshelf",
            flag: "access_products",
          },
          {
            // path: "/pos/customer-order",
            path: "/pos/select-user",
            text: "Customer Order",
            icon: "bi bi-bag",
            flag: "access_sales",
          },
          {
            path: "/pos/kitchen-order",
            text: "Kitchen Order",
            icon: "bi bi-cookie",
            flag: "access_sales",
          },
          {
            path: "/pos/counter-checkout",
            text: "Counter Checkout",
            icon: "bi bi-bag-check",
            flag: "access_sales",
          },
          {
            path: "/pos/table-booking",
            text: "Table Booking",
            icon: "bi bi-bookmark",
            flag: "access_sales",
          },
          {
            path: "/pos/menu-stock",
            text: "Menu Stock",
            icon: "bi bi-stack",
            flag: "access_stocks",
          },
        ],
      },
      {
        icon: "bi bi-people",
        text: "User Management",
        accessBy: "Company",
        children: [
          {
            path: "/user/view-user",
            icon: "bi bi-person",
            text: "Users",
            flag: "access_users",
          },
          {
            path: "/role/index",
            icon: "bi bi-person-gear",
            text: "Role",
            flag: "access_roles",
          },
        ],
      },
      {
        icon: "bi bi-journal",
        text: "Accounting",
        accessBy: "Company",
        children: [
          {
            path: "/pages/account",
            icon: "bi bi-person-square",
            text: "Accounts",
            flag: "access_accounts",
          },
          {
            path: "/pages/settings",
            icon: "bi bi-journal-check",
            text: "Account Settings",
            flag: "access_settings",
          },
        ],
      },
      {
        path: "/activity-logs/index",
        icon: "bi bi-activity",
        text: "Activity Log",
        flag: "access_activitylogs",
        accessBy: "POS"
      },
      {
        icon: "bi bi-clipboard-data",
        text: "Report",
        flag: "access_reports",
        accessBy: "Company",
        children: [
          {
            path: "/report/report-stores",
            icon: "bi bi-shop-window",
            text: "Report Stores",
            flag: "access_reports",
          },
          {
            path: "/report/report-suppliers",
            icon: "bi bi-cash-coin",
            text: "Report Suppliers",
            flag: "access_reports",
          },
        ],
      },

      // {
      //   path: "/form",
      //   icon: "bi bi-pen",
      //   text: "Forms",
      //   children: [
      //     { path: "/form/elements", text: "Form Elements" },
      //     { path: "/form/plugins", text: "Form Plugins" },
      //     { path: "/form/wizards", text: "Wizards" },
      //   ],
      // },
      // {
      //   path: "/table",
      //   icon: "bi bi-grid-3x3",
      //   text: "Tables",
      //   children: [
      //     { path: "/table/elements", text: "Table Elements" },
      //     { path: "/table/plugins", text: "Table Plugins" },
      //   ],
      // },
      // { 'path': '/chart', 'icon': 'bi bi-pie-chart', 'text': 'Charts', 'children': [
      // 	{ 'path': '/chart/js', 	'text': 'Chart.js'},
      // 	{ 'path': '/chart/apex', 	'text': 'Apexcharts.js' }]
      // },
      // { 'path': '/map', 'icon': 'bi bi-compass', 'text': 'Map' },
      // { 'path': '/layout', 'icon': 'bi bi-layout-sidebar', 'text': 'Layout', 'children': [
      // 	{ 'path': '/layout/starter', 	'text': 'Starter Page'},
      // 	{ 'path': '/layout/fixed-footer', 	'text': 'Fixed Footer'},
      // 	{ 'path': '/layout/full-height', 	'text': 'Full Height'},
      // 	{ 'path': '/layout/full-width', 	'text': 'Full Width'},
      // 	{ 'path': '/layout/boxed-layout', 	'text': 'Boxed Layout'},
      // 	{ 'path': '/layout/collapsed-sidebar', 	'text': 'Collapsed Sidebar'},
      // 	{ 'path': '/layout/top-nav', 	'text': 'Top Nav'},
      // 	{ 'path': '/layout/mixed-nav', 	'text': 'Mixed Nav'},
      // 	{ 'path': '/layout/mixed-nav-boxed-layout', 'text': 'Mixed Nav Boxed Layout'}]
      // },
      // { 'path': '/page', 'icon': 'bi bi-collection', 'text': 'Pages', 'children': [
      // 	{ 'path': '/page/scrum-board', 	'text': 'Scrum Board'},
      // 	{ 'path': '/page/products', 	'text': 'Products'},
      // 	{ 'path': '/page/product-details', 	'text': 'Product Details'},
      // 	{ 'path': '/page/orders', 	'text': 'Orders'},
      // 	{ 'path': '/page/order-details', 	'text': 'Order Details'},
      // 	{ 'path': '/page/gallery', 	'text': 'Gallery'},
      // 	{ 'path': '/page/search-results', 	'text': 'Search Results'},
      // 	{ 'path': '/page/coming-soon', 	'text': 'Coming Soon Page'},
      // 	{ 'path': '/page/error', 	'text': 'Error Page'},
      // 	{ 'path': '/page/login', 	'text': 'Login'},
      // 	{ 'path': '/page/register', 	'text': 'Register'},
      // 	{ 'path': '/page/messenger', 	'text': 'Messenger'},
      // 	{ 'path': '/page/data-management', 	'text': 'Data Management'},
      // 	{ 'path': '/page/file-manager', 	'text': 'File Manager'},
      // 	{ 'path': '/page/pricing', 	'text': 'Pricing Page'}]
      // },
      // { 'is_divider': true },
      // { 'text': 'Users', 'is_header': true },
      // { 'path': '/profile', 'icon': 'bi bi-people', 'text': 'Profile' },
      // { 'path': '/calendar', 'icon': 'bi bi-calendar4', 'text': 'Calendar' },
      // { 'path': '/settings', 'icon': 'bi bi-gear', 'text': 'Settings' },
      // { 'path': '/helper', 'icon': 'bi bi-gem', 'text': 'Helper' }
    ];
  }
}
