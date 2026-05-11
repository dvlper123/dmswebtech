from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.db.models import Sum
from django.utils import timezone
from datetime import datetime, timedelta
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Contact, Service, Testimonial, CompanyInfo, ClientInfo, PaymentDetails, Expense
from .serializers import (
    ContactSerializer,
    ServiceSerializer,
    TestimonialSerializer,
    CompanyInfoSerializer,
    ClientInfoSerializer,
    PaymentDetailsSerializer,
    ExpenseSerializer,
)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True).order_by('title')
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class CompanyInfoView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def get(self, request):
        company_info = CompanyInfo.objects.filter(is_active=True).order_by('-updated_at').first()
        serializer = CompanyInfoSerializer(company_info, context={'request': request})
        return Response(serializer.data if company_info else {})


# Custom Admin Panel Views
@login_required
def admin_dashboard(request):
    total_contacts = Contact.objects.count()
    total_services = Service.objects.count()
    active_services = Service.objects.filter(is_active=True).count()
    total_testimonials = Testimonial.objects.filter(is_active=True).count()
    recent_contacts = Contact.objects.order_by('-created_at')[:5]

    context = {
        'total_contacts': total_contacts,
        'total_services': total_services,
        'active_services': active_services,
        'total_testimonials': total_testimonials,
        'recent_contacts': recent_contacts,
    }
    return render(request, 'admin/dashboard.html', context)


@login_required
def view_contacts(request):
    contacts = Contact.objects.all().order_by('-created_at')
    return render(request, 'admin/contacts.html', {'contacts': contacts})


@login_required
def view_services(request):
    services = Service.objects.all().order_by('-created_at')
    return render(request, 'admin/services.html', {'services': services})


@login_required
def view_testimonials(request):
    testimonials = Testimonial.objects.all().order_by('-created_at')
    return render(request, 'admin/testimonials.html', {'testimonials': testimonials})


@login_required
def add_testimonial(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        role = request.POST.get('role')
        company = request.POST.get('company', '')
        feedback = request.POST.get('feedback')
        is_active = request.POST.get('is_active') == 'on'

        Testimonial.objects.create(
            name=name,
            role=role,
            company=company,
            feedback=feedback,
            is_active=is_active,
        )
        messages.success(request, 'Testimonial added successfully!')
        return redirect('admin_testimonials')

    return render(request, 'admin/add_testimonial.html')


@login_required
def edit_testimonial(request, testimonial_id):
    testimonial = get_object_or_404(Testimonial, id=testimonial_id)

    if request.method == 'POST':
        testimonial.name = request.POST.get('name')
        testimonial.role = request.POST.get('role')
        testimonial.company = request.POST.get('company', '')
        testimonial.feedback = request.POST.get('feedback')
        testimonial.is_active = request.POST.get('is_active') == 'on'
        testimonial.save()

        messages.success(request, 'Testimonial updated successfully!')
        return redirect('admin_testimonials')

    return render(request, 'admin/edit_testimonial.html', {'testimonial': testimonial})


@login_required
def delete_testimonial(request, testimonial_id):
    testimonial = get_object_or_404(Testimonial, id=testimonial_id)
    testimonial.delete()
    messages.success(request, 'Testimonial deleted successfully!')
    return redirect('admin_testimonials')


@login_required
def edit_company_info(request):
    company_info = CompanyInfo.objects.filter(is_active=True).order_by('-updated_at').first()
    if not company_info:
        company_info = CompanyInfo.objects.create()

    if request.method == 'POST':
        company_info.company_name = request.POST.get('company_name', company_info.company_name)
        company_info.hero_title = request.POST.get('hero_title', '')
        company_info.hero_subtitle = request.POST.get('hero_subtitle', '')
        company_info.description = request.POST.get('description', '')
        company_info.email = request.POST.get('email', company_info.email)
        company_info.phone = request.POST.get('phone', company_info.phone)
        company_info.location = request.POST.get('location', company_info.location)
        company_info.website = request.POST.get('website', '')
        company_info.is_active = request.POST.get('is_active') == 'on'
        company_info.save()

        messages.success(request, 'Company information updated successfully!')
        return redirect('admin_dashboard')

    return render(request, 'admin/edit_company_info.html', {'company_info': company_info})


@require_http_methods(['GET', 'POST'])
def custom_logout(request):
    logout(request)
    return redirect('login')


@login_required
def add_service(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        highlights = request.POST.get('highlights', '')
        image = request.FILES.get('image')
        price = request.POST.get('price')
        duration = request.POST.get('duration')
        is_active = request.POST.get('is_active') == 'on'

        Service.objects.create(
            title=title,
            description=description,
            highlights=highlights,
            image=image,
            price=price if price else None,
            duration=duration,
            is_active=is_active,
        )
        messages.success(request, 'Service added successfully!')
        return redirect('admin_services')

    return render(request, 'admin/add_service.html')


@login_required
def edit_service(request, service_id):
    service = get_object_or_404(Service, id=service_id)

    if request.method == 'POST':
        service.title = request.POST.get('title')
        service.description = request.POST.get('description')
        service.highlights = request.POST.get('highlights', '')
        image = request.FILES.get('image')
        if image:
            service.image = image
        service.price = request.POST.get('price') if request.POST.get('price') else None
        service.duration = request.POST.get('duration')
        service.is_active = request.POST.get('is_active') == 'on'
        service.save()

        messages.success(request, 'Service updated successfully!')
        return redirect('admin_services')

    return render(request, 'admin/edit_service.html', {'service': service})


@login_required
def delete_service(request, service_id):
    service = get_object_or_404(Service, id=service_id)
    service.delete()
    messages.success(request, 'Service deleted successfully!')
    return redirect('admin_services')


@login_required
def delete_contact(request, contact_id):
    contact = get_object_or_404(Contact, id=contact_id)
    contact.delete()
    messages.success(request, 'Contact deleted successfully!')
    return redirect('admin_contacts')


# Client Information CRUD Views
@login_required
def view_clients(request):
    clients = ClientInfo.objects.all().order_by('-created_at')
    return render(request, 'admin/clients.html', {'clients': clients})


@login_required
def add_client(request):
    if request.method == 'POST':
        client = ClientInfo.objects.create(
            client_name=request.POST.get('client_name'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            company=request.POST.get('company', ''),
            address=request.POST.get('address', ''),
            city=request.POST.get('city', ''),
            state=request.POST.get('state', ''),
            zip_code=request.POST.get('zip_code', ''),
            gstin=request.POST.get('gstin', ''),
            contact_person=request.POST.get('contact_person', ''),
            contact_designation=request.POST.get('contact_designation', ''),
            is_active=request.POST.get('is_active') == 'on'
        )
        messages.success(request, 'Client added successfully!')
        return redirect('admin_clients')
    return render(request, 'admin/add_client.html')


@login_required
def edit_client(request, client_id):
    client = get_object_or_404(ClientInfo, id=client_id)
    if request.method == 'POST':
        client.client_name = request.POST.get('client_name')
        client.email = request.POST.get('email')
        client.phone = request.POST.get('phone')
        client.company = request.POST.get('company', '')
        client.address = request.POST.get('address', '')
        client.city = request.POST.get('city', '')
        client.state = request.POST.get('state', '')
        client.zip_code = request.POST.get('zip_code', '')
        client.gstin = request.POST.get('gstin', '')
        client.contact_person = request.POST.get('contact_person', '')
        client.contact_designation = request.POST.get('contact_designation', '')
        client.is_active = request.POST.get('is_active') == 'on'
        client.save()
        messages.success(request, 'Client updated successfully!')
        return redirect('admin_clients')
    return render(request, 'admin/edit_client.html', {'client': client})


@login_required
def delete_client(request, client_id):
    client = get_object_or_404(ClientInfo, id=client_id)
    client.delete()
    messages.success(request, 'Client deleted successfully!')
    return redirect('admin_clients')


# Payment Details CRUD Views
@login_required
def view_payments(request):
    payments = PaymentDetails.objects.all().order_by('-payment_date')
    return render(request, 'admin/payments.html', {'payments': payments})


@login_required
def add_payment(request):
    if request.method == 'POST':
        payment = PaymentDetails.objects.create(
            client_id=request.POST.get('client'),
            invoice_number=request.POST.get('invoice_number'),
            amount=request.POST.get('amount'),
            payment_date=request.POST.get('payment_date'),
            payment_method=request.POST.get('payment_method'),
            status=request.POST.get('status', 'pending'),
            description=request.POST.get('description', ''),
            reference_number=request.POST.get('reference_number', '')
        )
        messages.success(request, 'Payment added successfully!')
        return redirect('admin_payments')
    clients = ClientInfo.objects.filter(is_active=True)
    return render(request, 'admin/add_payment.html', {'clients': clients})


@login_required
def edit_payment(request, payment_id):
    payment = get_object_or_404(PaymentDetails, id=payment_id)
    if request.method == 'POST':
        payment.client_id = request.POST.get('client')
        payment.invoice_number = request.POST.get('invoice_number')
        payment.amount = request.POST.get('amount')
        payment.payment_date = request.POST.get('payment_date')
        payment.payment_method = request.POST.get('payment_method')
        payment.status = request.POST.get('status')
        payment.description = request.POST.get('description', '')
        payment.reference_number = request.POST.get('reference_number', '')
        payment.save()
        messages.success(request, 'Payment updated successfully!')
        return redirect('admin_payments')
    clients = ClientInfo.objects.filter(is_active=True)
    return render(request, 'admin/edit_payment.html', {'payment': payment, 'clients': clients})


@login_required
def delete_payment(request, payment_id):
    payment = get_object_or_404(PaymentDetails, id=payment_id)
    payment.delete()
    messages.success(request, 'Payment deleted successfully!')
    return redirect('admin_payments')


# Expense CRUD Views
@login_required
def view_expenses(request):
    expenses = Expense.objects.all().order_by('-expense_date')
    return render(request, 'admin/expenses.html', {'expenses': expenses})


@login_required
def add_expense(request):
    if request.method == 'POST':
        expense = Expense.objects.create(
            category=request.POST.get('category'),
            description=request.POST.get('description'),
            amount=request.POST.get('amount'),
            expense_date=request.POST.get('expense_date'),
            payment_method=request.POST.get('payment_method', ''),
            reference_number=request.POST.get('reference_number', ''),
            notes=request.POST.get('notes', '')
        )
        messages.success(request, 'Expense added successfully!')
        return redirect('admin_expenses')
    return render(request, 'admin/add_expense.html', {'expense_categories': Expense.EXPENSE_CATEGORY_CHOICES})


@login_required
def edit_expense(request, expense_id):
    expense = get_object_or_404(Expense, id=expense_id)
    if request.method == 'POST':
        expense.category = request.POST.get('category')
        expense.description = request.POST.get('description')
        expense.amount = request.POST.get('amount')
        expense.expense_date = request.POST.get('expense_date')
        expense.payment_method = request.POST.get('payment_method', '')
        expense.reference_number = request.POST.get('reference_number', '')
        expense.notes = request.POST.get('notes', '')
        expense.save()
        messages.success(request, 'Expense updated successfully!')
        return redirect('admin_expenses')
    return render(request, 'admin/edit_expense.html', {'expense': expense, 'expense_categories': Expense.EXPENSE_CATEGORY_CHOICES})


@login_required
def delete_expense(request, expense_id):
    expense = get_object_or_404(Expense, id=expense_id)
    expense.delete()
    messages.success(request, 'Expense deleted successfully!')
    return redirect('admin_expenses')


# Report Generation Views
@login_required
def profit_loss_report(request):
    # Get date range for report
    report_type = request.GET.get('type', 'monthly')
    
    if report_type == 'daily':
        date_str = request.GET.get('date')
        if date_str:
            report_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            total_income = PaymentDetails.objects.filter(
                payment_date=report_date,
                status='completed'
            ).aggregate(Sum('amount'))['amount__sum'] or 0
            total_expense = Expense.objects.filter(
                expense_date=report_date
            ).aggregate(Sum('amount'))['amount__sum'] or 0
            net_profit = total_income - total_expense
            
            context = {
                'report_type': 'daily',
                'date': report_date,
                'total_income': total_income,
                'total_expense': total_expense,
                'net_profit': net_profit,
            }
        else:
            context = {'report_type': 'daily', 'error': 'Please select a date'}
    
    elif report_type == 'monthly':
        month = request.GET.get('month')
        year = int(request.GET.get('year', timezone.now().year))
        
        if month:
            total_income = PaymentDetails.objects.filter(
                payment_date__month=month,
                payment_date__year=year,
                status='completed'
            ).aggregate(Sum('amount'))['amount__sum'] or 0
            total_expense = Expense.objects.filter(
                expense_date__month=month,
                expense_date__year=year
            ).aggregate(Sum('amount'))['amount__sum'] or 0
            net_profit = total_income - total_expense
            
            month_name = datetime(year, int(month), 1).strftime('%B %Y')
            context = {
                'report_type': 'monthly',
                'month': month_name,
                'total_income': total_income,
                'total_expense': total_expense,
                'net_profit': net_profit,
            }
        else:
            context = {'report_type': 'monthly'}
    
    elif report_type == 'yearly':
        year = request.GET.get('year', timezone.now().year)
        
        total_income = PaymentDetails.objects.filter(
            payment_date__year=year,
            status='completed'
        ).aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense = Expense.objects.filter(
            expense_date__year=year
        ).aggregate(Sum('amount'))['amount__sum'] or 0
        net_profit = total_income - total_expense
        
        context = {
            'report_type': 'yearly',
            'year': year,
            'total_income': total_income,
            'total_expense': total_expense,
            'net_profit': net_profit,
        }
    
    return render(request, 'admin/profit_loss_report.html', context)
