import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardPage } from "./pages/dashboard/dashboard";

import { AnalyticsPage } from "./pages/analytics/analytics";

import { EmailInboxPage } from "./pages/email/inbox/email-inbox";
import { EmailComposePage } from "./pages/email/compose/email-compose";
import { EmailDetailPage } from "./pages/email/detail/email-detail";

import { WidgetsPage } from "./pages/widgets/widgets";

import { PosCustomerOrderPage } from "./pages/pos/customer-order/pos-customer-order";
import { PosKitchenOrderPage } from "./pages/pos/kitchen-order/pos-kitchen-order";
import { PosCounterCheckoutPage } from "./pages/pos/counter-checkout/pos-counter-checkout";
import { PosTableBookingPage } from "./pages/pos/table-booking/pos-table-booking";
import { PosMenuStockPage } from "./pages/pos/menu-stock/pos-menu-stock";

import { UiBootstrapPage } from "./pages/ui/bootstrap/ui-bootstrap";
import { UiButtonsPage } from "./pages/ui/buttons/ui-buttons";
import { UiCardPage } from "./pages/ui/card/ui-card";
import { UiIconsPage } from "./pages/ui/icons/ui-icons";
import { UiModalNotificationsPage } from "./pages/ui/modal-notifications/ui-modal-notifications";
import { UiTypographyPage } from "./pages/ui/typography/ui-typography";
import { UiTabsAccordionsPage } from "./pages/ui/tabs-accordions/ui-tabs-accordions";

import { FormElementsPage } from "./pages/form/elements/form-elements";
import { FormPluginsPage } from "./pages/form/plugins/form-plugins";
import { FormWizardsPage } from "./pages/form/wizards/form-wizards";

import { TableElementsPage } from "./pages/table/elements/table-elements";
import { TablePluginsPage } from "./pages/table/plugins/table-plugins";

import { ChartJsPage } from "./pages/chart/js/chart-js";
import { ChartApexPage } from "./pages/chart/apex/chart-apex";

import { MapPage } from "./pages/map/map";

import { LayoutStarterPage } from "./pages/layout/starter/layout-starter";
import { LayoutFixedFooterPage } from "./pages/layout/fixed-footer/layout-fixed-footer";
import { LayoutFullHeightPage } from "./pages/layout/full-height/layout-full-height";
import { LayoutFullWidthPage } from "./pages/layout/full-width/layout-full-width";
import { LayoutBoxedLayoutPage } from "./pages/layout/boxed-layout/layout-boxed-layout";
import { LayoutCollapsedSidebarPage } from "./pages/layout/collapsed-sidebar/layout-collapsed-sidebar";
import { LayoutTopNavPage } from "./pages/layout/top-nav/layout-top-nav";
import { LayoutMixedNavPage } from "./pages/layout/mixed-nav/layout-mixed-nav";
import { LayoutMixedNavBoxedLayoutPage } from "./pages/layout/mixed-nav-boxed-layout/layout-mixed-nav-boxed-layout";

import { ScrumBoardPage } from "./pages/page/scrum-board/page-scrum-board";
import { ProductsPage } from "./pages/page/products/page-products";
import { ProductDetailsPage } from "./pages/page/product-details/page-product-details";
import { OrdersPage } from "./pages/page/orders/page-orders";
import { OrderDetailsPage } from "./pages/page/order-details/page-order-details";
import { GalleryPage } from "./pages/page/gallery/page-gallery";
import { SearchResultsPage } from "./pages/page/search-results/page-search-results";
import { ComingSoonPage } from "./pages/page/coming-soon/page-coming-soon";
import { ErrorPage } from "./pages/page/error/page-error";
import { LoginPage } from "./pages/page/login/page-login";

import { CreateUnitComponent } from "./pages/unit/create-unit/create-unit.component";

import { RegisterPage } from "./pages/page/register/page-register";
import { MessengerPage } from "./pages/page/messenger/page-messenger";
import { DataManagementPage } from "./pages/page/data-management/page-data-management";
import { FileManagerPage } from "./pages/page/file-manager/page-file-manager";
import { PricingPage } from "./pages/page/pricing/page-pricing";

import { ProfilePage } from "./pages/profile/profile";
import { CalendarPage } from "./pages/calendar/calendar";
import { SettingsPage } from "./pages/settings/settings";
import { HelperPage } from "./pages/helper/helper";
import { CreateCompanyComponent } from "./pages/company/create-company/create-company.component";
import { ViewCompanyComponent } from "./pages/company/view-company/view-company.component";
import { UserComponent } from "./pages/users/user/user.component";
import { StoreComponent } from "./pages/store/store.component";
import { UserEditComponent } from "./pages/users/user-edit/user-edit.component";
import { UserCreateComponent } from "./pages/users/user-create/user-create.component";
import { EditCompanyComponent } from "./pages/company/edit-company/edit-company.component";
import { CreateStoreComponent } from "./pages/store/create-store/create-store.component";
import { EditStoreComponent } from "./pages/store/edit-store/edit-store.component";
import { UnitComponent } from "./pages/unit/unit.component";
import { TaxComponent } from "./pages/tax/tax.component";

import { EditUnitComponent } from "./pages/unit/edit-unit/edit-unit.component";
import { CategoryComponent } from "./pages/category/category.component";
import { CreateCategoryComponent } from "./pages/category/create-category/create-category.component";
import { EditCategoryComponent } from "./pages/category/edit-category/edit-category.component";
import { CreateCustomerComponent } from "./pages/customer/create-customer/create-customer.component";
import { ViewCustomerComponent } from "./pages/customer/view-customer/view-customer.component";
import { EditCustomerComponent } from "./pages/customer/edit-customer/edit-customer.component";
import { ViewSupplierComponent } from "./pages/supplier/view-supplier/view-supplier.component";
import { CreateSupplierComponent } from "./pages/supplier/create-supplier/create-supplier.component";
import { EditSupplierComponent } from "./pages/supplier/edit-supplier/edit-supplier.component";
import { CreateTaxComponent } from "./pages/tax/create-tax/create-tax.component";
import { EditTaxComponent } from "./pages/tax/edit-tax/edit-tax.component";
import { CreateProductComponent } from "./pages/product/create-product/create-product.component";
import { EditProductComponent } from "./pages/product/edit-product/edit-product.component";
import { ViewProductComponent } from "./pages/product/view-product/view-product.component";
import { AccountsComponent } from "./pages/accounts/accounts.component";
import { CreateAccountComponent } from "./pages/accounts/create-account/create-account.component";
import { EditAccountComponent } from "./pages/accounts/edit-account/edit-account.component";

import { RestaurantTableComponent } from "./pages/restaurant-table/restaurant-table.component";
import { CreateRestaurantTableComponent } from "./pages/restaurant-table/create-restaurant-table/create-restaurant-table.component";
import { EditRestaurantTableComponent } from "./pages/restaurant-table/edit-restaurant-table/edit-restaurant-table.component";
import { ViewPurchaseComponent } from "./pages/purchase/view-purchase/view-purchase.component";
import { CreatePurchaseComponent } from "./pages/purchase/create-purchase/create-purchase.component";
import { EditPurchaseComponent } from "./pages/purchase/edit-purchase/edit-purchase.component";

import { TransfersComponent } from "./pages/transfers/transfers.component";
import { CreateTransfersComponent } from "./pages/transfers/create-transfers/create-transfers.component";
import { EditTransfersComponent } from "./pages/transfers/edit-transfers/edit-transfers.component";

import { SettingsComponent } from "./pages/settings/settings.component";
import { CreateSettingsComponent } from "./pages/settings/create-settings/create-settings.component";
import { EditSettingsComponent } from "./pages/settings/edit-settings/edit-settings.component";
import { ViewPurchaseReturnComponent } from "./pages/purchase return/view-purchase-return/view-purchase-return.component";
import { EditPurchaseReturnComponent } from "./pages/purchase return/edit-purchase-return/edit-purchase-return.component";
import { CreatePurchaseReturnComponent } from "./pages/purchase return/create-purchase-return/create-purchase-return.component";
import { PasswordComponent } from "./pages/password/password.component";
import { AdjustmentsComponent } from "./pages/adjustments/adjustments.component";
import { EditAdjustmentComponent } from "./pages/adjustments/edit-adjustment/edit-adjustment.component";
import { CreateAdjustmentComponent } from "./pages/adjustments/create-adjustment/create-adjustment.component";
//import { CompanyComponent } from './pages/company/company.component';
import { ActivityLogsComponent } from "./pages/activity-logs/activity-logs.component";
//import { Company } from './pages/company/company.component';
import { AuthGuard } from "./service/login-guard.service";
import { ViewRoleComponent } from "./pages/role/view-role/view-role.component";
import { CreateRoleComponent } from "./pages/role/create-role/create-role.component";
import { EditRoleComponent } from "./pages/role/edit-role/edit-role.component";
import { UserSelectComponent } from "./pages/pos/user-select/user-select.component";
import { TableSelectComponent } from "./pages/pos/table-select/table-select.component";
import { UsertypesComponent } from "./pages/usertypes/usertypes.component";
import { CreateUsertypesComponent } from "./pages/usertypes/create-usertypes/create-usertypes.component";
import { EditUsertypesComponent } from "./pages/usertypes/edit-usertypes/edit-usertypes.component";
import { ReportStoresComponent } from "./pages/report/report-stores/report-stores.component";
import { ReportSuppliersComponent } from "./pages/report/report-suppliers/report-suppliers.component";

const routes: Routes = [
  { path: "", redirectTo: "/page/login", pathMatch: "full" },

  {
    path: "dashboard",
    component: DashboardPage,
    data: { title: "Dashboard" },
    canActivate: [AuthGuard],
  },

  {
    path: "analytics",
    component: AnalyticsPage,
    data: { title: "Analytics" },
    canActivate: [AuthGuard],
  },

  {
    path: "email/inbox",
    component: EmailInboxPage,
    data: { title: "Email Inbox" },
    canActivate: [AuthGuard],
  },
  {
    path: "email/compose",
    component: EmailComposePage,
    data: { title: "Email Compose" },
    canActivate: [AuthGuard],
  },
  {
    path: "email/detail",
    component: EmailDetailPage,
    data: { title: "Email Detail" },
    canActivate: [AuthGuard],
  },

  {
    path: "widgets",
    component: WidgetsPage,
    data: { title: "Widgets" },
    canActivate: [AuthGuard],
  },

  {
    path: "pos/customer-order",
    component: PosCustomerOrderPage,
    data: { title: "Pos Customer Order" },
    canActivate: [AuthGuard],
  },
  {
    path: "pos/kitchen-order",
    component: PosKitchenOrderPage,
    data: { title: "Pos Kitchen Order" },
    canActivate: [AuthGuard],
  },
  {
    path: "pos/counter-checkout",
    component: PosCounterCheckoutPage,
    data: { title: "Pos Counter Checkout" },
    canActivate: [AuthGuard],
  },
  {
    path: "pos/table-booking",
    component: PosTableBookingPage,
    data: { title: "Pos Table Booking" },
    canActivate: [AuthGuard],
  },
  {
    path: "pos/menu-stock",
    component: PosMenuStockPage,
    data: { title: "Pos Menu Stock" },
    canActivate: [AuthGuard],
  },

  //company route
  {
    path: "company/create-company",
    component: CreateCompanyComponent,
    data: { title: "Create Company" },
    canActivate: [AuthGuard],
  },
  {
    path: "company/view-company",
    component: ViewCompanyComponent,
    data: { title: "Companies" },
    canActivate: [AuthGuard],
  },
  {
    path: "company/edit-company",
    component: EditCompanyComponent,
    data: { title: "Edit Company" },
    canActivate: [AuthGuard],
  },

  {
    path: "user/view-user",
    component: UserComponent,
    data: { title: "Users" },
    canActivate: [AuthGuard],
  },
  {
    path: "user/edit-user",
    component: UserEditComponent,
    data: { title: "Edit User" },
    canActivate: [AuthGuard],
  },
  {
    path: "user/create-user",
    component: UserCreateComponent,
    data: { title: "Create User" },
    canActivate: [AuthGuard],
  },

  // customer route
  {
    path: "customer/index",
    component: ViewCustomerComponent,
    data: { title: "Customers" },
    canActivate: [AuthGuard],
  },
  {
    path: "customer/create",
    component: CreateCustomerComponent,
    data: { title: "Create Customer" },
    canActivate: [AuthGuard],
  },
  {
    path: "customer/edit",
    component: EditCustomerComponent,
    data: { title: "Edit Customer" },
    canActivate: [AuthGuard],
  },

  //categories route
  {
    path: "categories/index",
    component: CategoryComponent,
    data: { title: "Categories" },
    canActivate: [AuthGuard],
  },
  {
    path: "categories/create",
    component: CreateCategoryComponent,
    data: { title: "Create Category" },
    canActivate: [AuthGuard],
  },
  {
    path: "categories/edit",
    component: EditCategoryComponent,
    data: { title: "Edit Category" },
    canActivate: [AuthGuard],
  },
  //restaurant-table route
  {
    path: "restaurant-table/index",
    component: RestaurantTableComponent,
    data: { title: "Restaurant Tables" },
    canActivate: [AuthGuard],
  },
  {
    path: "restaurant-table/create",
    component: CreateRestaurantTableComponent,
    data: { title: "Create Table" },
    canActivate: [AuthGuard],
  },
  {
    path: "restaurant-table/edit",
    component: EditRestaurantTableComponent,
    data: { title: "Edit Table" },
    canActivate: [AuthGuard],
  },
  // supplier route
  {
    path: "supplier/index",
    component: ViewSupplierComponent,
    data: { title: "Suppliers" },
    canActivate: [AuthGuard],
  },
  {
    path: "supplier/create",
    component: CreateSupplierComponent,
    data: { title: "Create Supplier" },
    canActivate: [AuthGuard],
  },
  {
    path: "supplier/edit",
    component: EditSupplierComponent,
    data: { title: "Edit Supplier" },
    canActivate: [AuthGuard],
  },

  // Product route
  {
    path: "product/index",
    component: ViewProductComponent,
    data: { title: "Products" },
    canActivate: [AuthGuard],
  },
  {
    path: "product/create",
    component: CreateProductComponent,
    data: { title: "Create Product" },
    canActivate: [AuthGuard],
  },
  {
    path: "product/edit",
    component: EditProductComponent,
    data: { title: "Edit Product" },
    canActivate: [AuthGuard],
  },

  // Purchase route
  {
    path: "purchase/index",
    component: ViewPurchaseComponent,
    data: { title: "Purchases" },
    canActivate: [AuthGuard],
  },
  {
    path: "purchase/create",
    component: CreatePurchaseComponent,
    data: { title: "Create Purchase" },
    canActivate: [AuthGuard],
  },
  {
    path: "purchase/edit",
    component: EditPurchaseComponent,
    data: { title: "Edit Purchase" },
    canActivate: [AuthGuard],
  },

  // Purchase Return route
  {
    path: "purchase-return/index",
    component: ViewPurchaseReturnComponent,
    data: { title: "Purchase Returns" },
    canActivate: [AuthGuard],
  },
  {
    path: "purchase-return/create",
    component: CreatePurchaseReturnComponent,
    data: { title: "Create Purchase Return" },
    canActivate: [AuthGuard],
  },
  {
    path: "purchase-return/edit",
    component: EditPurchaseReturnComponent,
    data: { title: "Edit Purchase Return" },
    canActivate: [AuthGuard],
  },

  {
    path: "store",
    component: StoreComponent,
    data: { title: "Stores" },
    canActivate: [AuthGuard],
  },
  {
    path: "store/create",
    component: CreateStoreComponent,
    data: { title: "Create Store" },
    canActivate: [AuthGuard],
  },
  {
    path: "store/edit",
    component: EditStoreComponent,
    data: { title: "Edit Store" },
    canActivate: [AuthGuard],
  },

  // transfer route
  {
    path: "transfer/index",
    component: TransfersComponent,
    data: { title: "Transfers" },
    canActivate: [AuthGuard],
  },
  {
    path: "transfer/create",
    component: CreateTransfersComponent,
    data: { title: "Create Transfer" },
    canActivate: [AuthGuard],
  },
  {
    path: "transfer/edit",
    component: EditTransfersComponent,
    data: { title: "Edit Transfer" },
    canActivate: [AuthGuard],
  },

  //Adjustments route
  {
    path: "adjustments/index",
    component: AdjustmentsComponent,
    data: { title: "Adjustments" },
    canActivate: [AuthGuard],
  },
  {
    path: "adjustments/create",
    component: CreateAdjustmentComponent,
    data: { title: "Create Adjustments" },
    canActivate: [AuthGuard],
  },
  {
    path: "adjustments/edit",
    component: EditAdjustmentComponent,
    data: { title: "Edit Adjustments" },
    canActivate: [AuthGuard],
  },

  {
    path: "activity-logs/index",
    component: ActivityLogsComponent,
    data: { title: "Activity Logs" },
    canActivate: [AuthGuard],
  },

  {
    path: "pos/select-user",
    component: UserSelectComponent,
    data: { title: "Pos Select User" },
    canActivate: [AuthGuard],
  },
  {
    path: "pos/select-table",
    component: TableSelectComponent,
    data: { title: "Pos Select Table" },
    canActivate: [AuthGuard],
  },

  //Role route
  {
    path: "role/index",
    component: ViewRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "role/create",
    component: CreateRoleComponent,
    canActivate: [AuthGuard],
  },
  { path: "role/edit", component: EditRoleComponent, canActivate: [AuthGuard] },

  //UserTypes route
  {
    path: "usertypes/index",
    component: UsertypesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "usertypes/create",
    component: CreateUsertypesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "usertypes/edit",
    component: EditUsertypesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "report/report-stores",
    component: ReportStoresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "report/report-suppliers",
    component: ReportSuppliersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "ui/bootstrap",
    component: UiBootstrapPage,
    data: { title: "UI Bootstrap" },
  },
  {
    path: "ui/buttons",
    component: UiButtonsPage,
    data: { title: "UI Buttons" },
  },
  { path: "ui/card", component: UiCardPage, data: { title: "UI Card" } },
  { path: "ui/icons", component: UiIconsPage, data: { title: "UI Icons" } },
  {
    path: "ui/modal-notifications",
    component: UiModalNotificationsPage,
    data: { title: "UI Modal & Notifications" },
  },
  {
    path: "ui/typography",
    component: UiTypographyPage,
    data: { title: "UI Typography" },
  },
  {
    path: "ui/tabs-accordions",
    component: UiTabsAccordionsPage,
    data: { title: "UI Tabs & Accordions" },
  },

  {
    path: "form/elements",
    component: FormElementsPage,
    data: { title: "Form Elements" },
  },
  {
    path: "form/plugins",
    component: FormPluginsPage,
    data: { title: "Form Plugins" },
  },
  {
    path: "form/wizards",
    component: FormWizardsPage,
    data: { title: "Form Wizards" },
  },

  {
    path: "table/elements",
    component: TableElementsPage,
    data: { title: "Table Elements" },
  },
  {
    path: "table/plugins",
    component: TablePluginsPage,
    data: { title: "Table Plugins" },
  },

  { path: "chart/js", component: ChartJsPage, data: { title: "Chart JS" } },
  {
    path: "chart/apex",
    component: ChartApexPage,
    data: { title: "Chart Apex" },
  },

  { path: "map", component: MapPage, data: { title: "Map" } },

  {
    path: "layout/starter",
    component: LayoutStarterPage,
    data: { title: "Starter Page" },
  },
  {
    path: "layout/fixed-footer",
    component: LayoutFixedFooterPage,
    data: { title: "Fixed Footer Page" },
  },
  {
    path: "layout/full-height",
    component: LayoutFullHeightPage,
    data: { title: "Full Height Page" },
  },
  {
    path: "layout/full-width",
    component: LayoutFullWidthPage,
    data: { title: "Full Width Page" },
  },
  {
    path: "layout/boxed-layout",
    component: LayoutBoxedLayoutPage,
    data: { title: "Boxed Layout Page" },
  },
  {
    path: "layout/collapsed-sidebar",
    component: LayoutCollapsedSidebarPage,
    data: { title: "Collapsed Sidebar Page" },
  },
  {
    path: "layout/top-nav",
    component: LayoutTopNavPage,
    data: { title: "Top Nav Page" },
  },
  {
    path: "layout/mixed-nav",
    component: LayoutMixedNavPage,
    data: { title: "Mixed Nav Page" },
  },
  {
    path: "layout/mixed-nav-boxed-layout",
    component: LayoutMixedNavBoxedLayoutPage,
    data: { title: "Mixed Nav Boxed Layout Page" },
  },

  {
    path: "page/scrum-board",
    component: ScrumBoardPage,
    data: { title: "Scrum Board Page" },
  },
  {
    path: "page/products",
    component: ProductsPage,
    data: { title: "Products Page" },
  },
  {
    path: "page/product-details",
    component: ProductDetailsPage,
    data: { title: "Product Details Page" },
  },
  {
    path: "page/orders",
    component: OrdersPage,
    data: { title: "Orders Page" },
  },
  {
    path: "page/order-details",
    component: OrderDetailsPage,
    data: { title: "Order Details Page" },
  },
  {
    path: "page/gallery",
    component: GalleryPage,
    data: { title: "Gallery Page" },
  },
  {
    path: "page/search-results",
    component: SearchResultsPage,
    data: { title: "Search Results Page" },
  },
  {
    path: "page/coming-soon",
    component: ComingSoonPage,
    data: { title: "Coming Soon Page" },
  },
  { path: "page/error", component: ErrorPage, data: { title: "Error Page" } },
  { path: "page/login", component: LoginPage, data: { title: "Login Page" } },

  {
    path: "pages/unit",
    component: UnitComponent,
    data: { title: "Units Page" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/create-unit",
    component: CreateUnitComponent,
    data: { title: "Create Units" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/edit-unit",
    component: EditUnitComponent,
    data: { title: "Edit Units" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/tax",
    component: TaxComponent,
    data: { title: "Tax Page" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/create-tax",
    component: CreateTaxComponent,
    data: { title: "Create Tax" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/edit-tax",
    component: EditTaxComponent,
    data: { title: "Edit Tax" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/account",
    component: AccountsComponent,
    data: { title: "Account Page" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/create-account",
    component: CreateAccountComponent,
    data: { title: "Create Account" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/edit-account",
    component: EditAccountComponent,
    data: { title: "Edit Account" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/settings",
    component: SettingsComponent,
    data: { title: "Settings Page" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/create-settings",
    component: CreateSettingsComponent,
    data: { title: "Create Settings" },
    canActivate: [AuthGuard],
  },

  {
    path: "pages/edit-settings",
    component: EditSettingsComponent,
    data: { title: "Edit Settings" },
    canActivate: [AuthGuard],
  },

  {
    path: "page/register",
    component: RegisterPage,
    data: { title: "Register Page" },
  },
  {
    path: "page/messenger",
    component: MessengerPage,
    data: { title: "Messenger Page" },
  },
  {
    path: "page/data-management",
    component: DataManagementPage,
    data: { title: "Data Management Page" },
  },
  {
    path: "page/file-manager",
    component: FileManagerPage,
    data: { title: "File Manager Page" },
  },
  {
    path: "page/pricing",
    component: PricingPage,
    data: { title: "Pricing Page" },
  },

  {
    path: "pages/password",
    component: PasswordComponent,
    data: { title: "change Password Page" },
  },

  { path: "profile", component: ProfilePage, data: { title: "Profile" } },
  { path: "calendar", component: CalendarPage, data: { title: "Calendar" } },
  { path: "settings", component: SettingsPage, data: { title: "Settings" } },

  { path: "helper", component: HelperPage, data: { title: "Helper" } },

  {
    path: "**",
    pathMatch: "full",
    component: ErrorPage,
    data: { title: "Error Page" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
