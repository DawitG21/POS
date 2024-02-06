// Core Module
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CommonModule, DatePipe, JsonPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

// Plugins
import { ToastrModule } from "ngx-toastr";
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from "ngx-scrollbar";
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxMasonryModule } from "ngx-masonry";
import {
  NgbDatepickerModule,
  NgbAlertModule,
  NgbTypeaheadModule,
  NgbTimepickerModule,
} from "@ng-bootstrap/ng-bootstrap";
import { ColorSketchModule } from "ngx-color/sketch";
import { TagInputModule } from "ngx-chips";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { QuillModule } from "ngx-quill";
import { NgSelectModule } from "@ng-select/ng-select";
import { CountdownModule } from "ngx-countdown";
import { NgChartsModule } from "ng2-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxPrintModule } from 'ngx-print';

// App Component
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SidebarMobileBackdropComponent } from "./components/sidebar-mobile-backdrop/sidebar-mobile-backdrop.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ThemePanelComponent } from "./components/theme-panel/theme-panel.component";
import { NavScrollComponent } from "./components/nav-scroll/nav-scroll.component";
import {
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardFooterComponent,
  CardImgOverlayComponent,
  CardGroupComponent,
  CardExpandTogglerComponent,
} from "./components/card/card.component";

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
import { FilterUnitsPipe } from "./pages/unit/filterUnits.pipe";
import { CustomFilterTaxsPipe } from "./pages/tax/filterTax.pipe";
import { CustomFilterCompaniesPipe } from "./pages/company/view-company/filter.company.pipe";
import { CustomFilterStoresPipe } from "./pages/store/filter.store.pipe";
import { CustomFilterSuppliersPipe } from "./pages/supplier/view-supplier/filer.supplier.pipe";
import { CustomFilterCustomersPipe } from "./pages/customer/view-customer/filter.customer.pipe";
import { CustomFilterAccountsPipe } from "./pages/accounts/filter.account.pipe";

import { TransfersComponent } from "./pages/transfers/transfers.component";
import { CreateTransfersComponent } from "./pages/transfers/create-transfers/create-transfers.component";
import { EditTransfersComponent } from "./pages/transfers/edit-transfers/edit-transfers.component";
import { TransferService } from "./pages/transfers/transfer.service";
import { CustomFilterTransfersPipe } from "./pages/transfers/filter.transfer.pipe";

import { RegisterPage } from "./pages/page/register/page-register";
import { MessengerPage } from "./pages/page/messenger/page-messenger";
import { DataManagementPage } from "./pages/page/data-management/page-data-management";
import { FileManagerPage } from "./pages/page/file-manager/page-file-manager";
import { PricingPage } from "./pages/page/pricing/page-pricing";

import { ProfilePage } from "./pages/profile/profile";
import { CalendarPage } from "./pages/calendar/calendar";
import { SettingsPage } from "./pages/settings/settings";
import { HelperPage } from "./pages/helper/helper";

import { LoginService } from "./pages/page/login/login.service";

import { AllUnitService } from "./pages/unit/unit.service";
import { AllSettingsService } from "./pages/settings/settings.service";
import { ChangePasswords } from "./pages/password/password.service";

import { AllTaxService } from "./pages/tax/tax.service";
import { AccountsService } from "./pages/accounts/accounts.service";

import { StoreService } from "./pages/store/store.service";
import { ReportService } from './pages/report/report.service';

import { CreateCompanyComponent } from "./pages/company/create-company/create-company.component";
import { ViewCompanyComponent } from "./pages/company/view-company/view-company.component";
import { UserComponent } from "./pages/users/user/user.component";
import { StoreComponent } from "./pages/store/store.component";
import { UserCreateComponent } from "./pages/users/user-create/user-create.component";
import { UserEditComponent } from "./pages/users/user-edit/user-edit.component";
import { EditCompanyComponent } from "./pages/company/edit-company/edit-company.component";
import { CreateStoreComponent } from "./pages/store/create-store/create-store.component";
import { ToastService } from "./service/toast.service";
import { EditStoreComponent } from "./pages/store/edit-store/edit-store.component";
import { UnitComponent } from "./pages/unit/unit.component";
import { AccountsComponent } from "./pages/accounts/accounts.component";
import { CreateAccountComponent } from "./pages/accounts/create-account/create-account.component";
import { EditAccountComponent } from "./pages/accounts/edit-account/edit-account.component";

import { CreateUnitComponent } from "./pages/unit/create-unit/create-unit.component";
import { EditUnitComponent } from "./pages/unit/edit-unit/edit-unit.component";
import { CategoryComponent } from "./pages/category/category.component";
import { CategoryService } from "./pages/category/category.service";
import { CreateCategoryComponent } from "./pages/category/create-category/create-category.component";
import { EditCategoryComponent } from "./pages/category/edit-category/edit-category.component";
import { CreateCustomerComponent } from "./pages/customer/create-customer/create-customer.component";
import { ViewCustomerComponent } from "./pages/customer/view-customer/view-customer.component";
import { EditCustomerComponent } from "./pages/customer/edit-customer/edit-customer.component";
import { ViewSupplierComponent } from "./pages/supplier/view-supplier/view-supplier.component";
import { CreateSupplierComponent } from "./pages/supplier/create-supplier/create-supplier.component";
import { EditSupplierComponent } from "./pages/supplier/edit-supplier/edit-supplier.component";
import { RestaurantTableComponent } from "./pages/restaurant-table/restaurant-table.component";
import { CreateRestaurantTableComponent } from "./pages/restaurant-table/create-restaurant-table/create-restaurant-table.component";
import { EditRestaurantTableComponent } from "./pages/restaurant-table/edit-restaurant-table/edit-restaurant-table.component";
import { RestaurantTableService } from "./pages/restaurant-table/restaurant-table.service";
import { TaxComponent } from "./pages/tax/tax.component";
import { EditTaxComponent } from "./pages/tax/edit-tax/edit-tax.component";
import { CreateTaxComponent } from "./pages/tax/create-tax/create-tax.component";
import { CustomFilterRestaurantTablesPipe } from "./pages/restaurant-table/fitler.RestaurantTable.pipe";
import { CustomFilterCategoriesPipe } from "./pages/category/filter.category.pipe";
import { CustomFilterUsersPipe } from "./pages/users/user/filter.user.pipe";
import { SettingsComponent } from "./pages/settings/settings.component";
import { CreateSettingsComponent } from "./pages/settings/create-settings/create-settings.component";
import { EditSettingsComponent } from "./pages/settings/edit-settings/edit-settings.component";
import { CreateProductComponent } from "./pages/product/create-product/create-product.component";
import { EditProductComponent } from "./pages/product/edit-product/edit-product.component";
import { ViewProductComponent } from "./pages/product/view-product/view-product.component";
import { ViewPurchaseComponent } from "./pages/purchase/view-purchase/view-purchase.component";
import { EditPurchaseComponent } from "./pages/purchase/edit-purchase/edit-purchase.component";
import { AdjustmentsComponent } from "./pages/adjustments/adjustments.component";
import { CreateAdjustmentComponent } from "./pages/adjustments/create-adjustment/create-adjustment.component";
import { EditAdjustmentComponent } from "./pages/adjustments/edit-adjustment/edit-adjustment.component";
import { AdjustmentService } from "./pages/adjustments/adjustment.service";
import { CreatePurchaseComponent } from "./pages/purchase/create-purchase/create-purchase.component";
import { ViewPurchaseReturnComponent } from "./pages/purchase return/view-purchase-return/view-purchase-return.component";
import { CreatePurchaseReturnComponent } from "./pages/purchase return/create-purchase-return/create-purchase-return.component";
import { EditPurchaseReturnComponent } from "./pages/purchase return/edit-purchase-return/edit-purchase-return.component";
import { PasswordComponent } from "./pages/password/password.component";
import { ViewRoleComponent } from "./pages/role/view-role/view-role.component";
import { CreateRoleComponent } from "./pages/role/create-role/create-role.component";
import { EditRoleComponent } from "./pages/role/edit-role/edit-role.component";

import { CustomFilterAdjustmentsPipe } from "./pages/adjustments/filter.adjustment.pipe";
import { ActivityLogsComponent } from "./pages/activity-logs/activity-logs.component";
import { CustomFilterActivityLogsPipe } from "./pages/activity-logs/filter.activity-logs.pipe";
import { ActivityLogsService } from "./pages/activity-logs/activity-logs.service";
import { UserSelectComponent } from './pages/pos/user-select/user-select.component';
import { TableSelectComponent } from './pages/pos/table-select/table-select.component';
import { UsertypesComponent } from './pages/usertypes/usertypes.component';
import { CreateUsertypesComponent } from './pages/usertypes/create-usertypes/create-usertypes.component';
import { EditUsertypesComponent } from './pages/usertypes/edit-usertypes/edit-usertypes.component';
import { UserTypeService } from './pages/usertypes/usertypes.service';
import { CustomFilterUserTypePipe } from './pages/usertypes/filter.usertypes.pipe';
import { ReportStoresComponent } from './pages/report/report-stores/report-stores.component';
import { ReportSuppliersComponent } from './pages/report/report-suppliers/report-suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopNavComponent,
    SidebarComponent,
    SidebarMobileBackdropComponent,
    FooterComponent,
    ThemePanelComponent,
    NavScrollComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardImgOverlayComponent,
    CardGroupComponent,
    CardExpandTogglerComponent,

    DashboardPage,

    AnalyticsPage,

    EmailInboxPage,
    EmailComposePage,
    EmailDetailPage,

    WidgetsPage,

    PosCustomerOrderPage,
    PosKitchenOrderPage,
    PosCounterCheckoutPage,
    PosTableBookingPage,
    PosMenuStockPage,

    UiBootstrapPage,
    UiButtonsPage,
    UiCardPage,
    UiIconsPage,
    UiModalNotificationsPage,
    UiTypographyPage,
    UiTabsAccordionsPage,

    FormElementsPage,
    FormPluginsPage,
    FormWizardsPage,

    TableElementsPage,
    TablePluginsPage,

    ChartJsPage,
    ChartApexPage,

    MapPage,

    LayoutStarterPage,
    LayoutFixedFooterPage,
    LayoutFullHeightPage,
    LayoutFullWidthPage,
    LayoutBoxedLayoutPage,
    LayoutCollapsedSidebarPage,
    LayoutTopNavPage,
    LayoutMixedNavPage,
    LayoutMixedNavBoxedLayoutPage,

    ScrumBoardPage,
    ProductsPage,
    ProductDetailsPage,
    OrdersPage,
    OrderDetailsPage,
    GalleryPage,
    SearchResultsPage,
    ComingSoonPage,
    ErrorPage,
    LoginPage,

    RegisterPage,
    MessengerPage,
    DataManagementPage,
    FileManagerPage,
    PricingPage,

    ProfilePage,
    CalendarPage,
    SettingsPage,
    HelperPage,
    FilterUnitsPipe,
    CustomFilterTaxsPipe,
    CustomFilterRestaurantTablesPipe,
    CustomFilterCategoriesPipe,
    CustomFilterCompaniesPipe,
    CustomFilterStoresPipe,
    CustomFilterSuppliersPipe,
    CustomFilterCustomersPipe,
    CustomFilterUsersPipe,
    CustomFilterAccountsPipe,
    CustomFilterTransfersPipe,
    CustomFilterAdjustmentsPipe,
    CustomFilterActivityLogsPipe,
    // new added
    LoginPage,
    CreateCompanyComponent,
    ViewCompanyComponent,
    UserComponent,

    StoreComponent,
    UserCreateComponent,
    UserEditComponent,
    EditCompanyComponent,
    CreateStoreComponent,
    EditStoreComponent,
    UnitComponent,
    CreateUnitComponent,
    EditUnitComponent,
    AccountsComponent,
    CategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CreateCustomerComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    ViewSupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    RestaurantTableComponent,
    CreateRestaurantTableComponent,
    EditRestaurantTableComponent,
    TaxComponent,
    EditTaxComponent,
    CreateTaxComponent,
    CreateAccountComponent,
    EditAccountComponent,
    TransfersComponent,
    CreateTransfersComponent,
    EditTransfersComponent,
    SettingsComponent,
    CreateSettingsComponent,
    EditSettingsComponent,
    CreateProductComponent,
    EditProductComponent,
    ViewProductComponent,
    ViewPurchaseComponent,
    EditPurchaseComponent,
    CreatePurchaseComponent,
    ViewPurchaseReturnComponent,
    CreatePurchaseReturnComponent,
    EditPurchaseReturnComponent,

    PasswordComponent,
    CreatePurchaseComponent,
    ViewPurchaseComponent,
    EditPurchaseComponent,
    AdjustmentsComponent,
    CreateAdjustmentComponent,
    EditAdjustmentComponent,
    ViewRoleComponent,
    CreateRoleComponent,
    EditRoleComponent,
    ActivityLogsComponent,
    UserSelectComponent,
    TableSelectComponent,
    UsertypesComponent,
    CreateUsertypesComponent,
    EditUsertypesComponent,
    CustomFilterUserTypePipe,
    ReportStoresComponent,
    ReportSuppliersComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JsonPipe,

    NgScrollbarModule,
    NgxMasonryModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule,
    NgChartsModule,
    NgApexchartsModule,
    HighlightModule,
    FullCalendarModule,
    ColorSketchModule,
    CountdownModule,
    TagInputModule,
    NgxPrintModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [
    Title,
    DatePipe,
    provideNgxMask(),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          typescript: () => import("highlight.js/lib/languages/typescript"),
          css: () => import("highlight.js/lib/languages/css"),
          xml: () => import("highlight.js/lib/languages/xml"),
        },
      },
    },
    {
      provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        visibility: "hover",
      },
    },
    // new added
    LoginService,

    StoreService,
    AllUnitService,
    CategoryService,
    RestaurantTableService,
    AllTaxService,
    AccountsService,

    AllSettingsService,
    ChangePasswords,
    AdjustmentService,
    ActivityLogsService,
    UserTypeService,
    ReportService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  title: string = "HUD";

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (
          this.route.snapshot.firstChild &&
          this.route.snapshot.firstChild.data["title"]
        ) {
          this.title = "POS | " + this.route.snapshot.firstChild.data["title"];
        }
        this.titleService.setTitle(this.title);

        var elm = document.getElementById("app");
        if (elm) {
          elm.classList.remove("app-sidebar-toggled");
          elm.classList.remove("app-sidebar-mobile-toggled");
        }
      }
    });
  }
}
