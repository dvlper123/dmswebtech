from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactViewSet,
    ServiceViewSet,
    TestimonialViewSet,
    CompanyInfoView,
    admin_dashboard,
    view_contacts,
    view_services,
    view_testimonials,
    add_service,
    edit_service,
    delete_service,
    add_testimonial,
    edit_testimonial,
    delete_testimonial,
    edit_company_info,
    delete_contact,
    view_clients,
    add_client,
    edit_client,
    delete_client,
    view_payments,
    add_payment,
    edit_payment,
    delete_payment,
    view_expenses,
    add_expense,
    edit_expense,
    delete_expense,
    profit_loss_report, 
    
)

router = DefaultRouter()
router.register(r'contacts', ContactViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('company-info/', CompanyInfoView.as_view(), name='company_info'),
    # Custom Admin Panel URLs
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),
    path('admin/contacts/', view_contacts, name='admin_contacts'),
    path('admin/services/', view_services, name='admin_services'),
    path('admin/services/add/', add_service, name='add_service'),
    path('admin/services/edit/<int:service_id>/', edit_service, name='edit_service'),
    path('admin/services/delete/<int:service_id>/', delete_service, name='delete_service'),
    path('admin/testimonials/', view_testimonials, name='admin_testimonials'),
    path('admin/testimonials/add/', add_testimonial, name='add_testimonial'),
    path('admin/testimonials/edit/<int:testimonial_id>/', edit_testimonial, name='edit_testimonial'),
    path('admin/testimonials/delete/<int:testimonial_id>/', delete_testimonial, name='delete_testimonial'),
    path('admin/company-info/edit/', edit_company_info, name='edit_company_info'),
    path('admin/contacts/delete/<int:contact_id>/', delete_contact, name='delete_contact'),
    path('admin/payments/', view_payments, name='admin_payments'),
    path('admin/payments/add/', add_payment, name='add_payment'),
    path('admin/payments/edit/<int:payment_id>/', edit_payment, name='edit_payment'),
    path('admin/payments/delete/<int:payment_id>/', delete_payment, name='delete_payment'),
    path('admin/clients/', view_clients, name='admin_clients'),
    path('admin/clients/add/', add_client, name='add_client'),  
    path('admin/clients/edit/<int:client_id>/', edit_client, name='edit_client'),
    path('admin/clients/delete/<int:client_id>/', delete_client, name='delete_client'),
    path('admin/expenses/', view_expenses, name='admin_expenses'),
    path('admin/expenses/add/', add_expense, name='add_expense'),
    path('admin/expenses/edit/<int:expense_id>/', edit_expense, name='edit_expense'),
    path('admin/expenses/delete/<int:expense_id>/', delete_expense, name='delete_expense'),
    path('admin/reports/profit-loss/', profit_loss_report, name='profit_loss_report'),

]