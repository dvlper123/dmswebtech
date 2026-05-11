from django.db import models
from django.utils.text import slugify

# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    highlights = models.TextField(blank=True, help_text='Enter each highlight on a new line')
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    duration = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            current_slug = base_slug
            counter = 1
            while Service.objects.filter(slug=current_slug).exclude(pk=self.pk).exists():
                current_slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = current_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'


class Testimonial(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150, blank=True)
    feedback = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.role}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'


class CompanyInfo(models.Model):
    company_name = models.CharField(max_length=150, default='Digital Apex')
    hero_title = models.CharField(max_length=200, blank=True, help_text='Primary hero headline for the website')
    hero_subtitle = models.CharField(max_length=250, blank=True, help_text='Subtitle displayed below the hero title')
    description = models.TextField(blank=True, help_text='Short description displayed on the contact or about sections')
    email = models.EmailField(default='hello@digitalapex.com')
    phone = models.CharField(max_length=30, default='+91 98765 43210')
    location = models.CharField(max_length=200, default='New Delhi, India')
    website = models.CharField(max_length=200, blank=True, default='')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name

    class Meta:
        verbose_name = 'Company Info'
        verbose_name_plural = 'Company Info'


class ClientInfo(models.Model):
    client_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    company = models.CharField(max_length=150, blank=True, null=True)
    address = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    gstin = models.CharField(max_length=15, blank=True, null=True, help_text='GST Identification Number')
    contact_person = models.CharField(max_length=150, blank=True, null=True)
    contact_designation = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.client_name

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Client Info'
        verbose_name_plural = 'Client Infos'


class PaymentDetails(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('cheque', 'Cheque'),
        ('online', 'Online Transfer'),
        ('card', 'Credit/Debit Card'),
        ('upi', 'UPI'),
    ]

    client = models.ForeignKey(ClientInfo, on_delete=models.CASCADE, related_name='payments')
    invoice_number = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    description = models.TextField(blank=True, null=True)
    reference_number = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.invoice_number} - {self.client.client_name}"

    class Meta:
        ordering = ['-payment_date']
        verbose_name = 'Payment Detail'
        verbose_name_plural = 'Payment Details'


class Expense(models.Model):
    EXPENSE_CATEGORY_CHOICES = [
        ('salary', 'Salary'),
        ('rent', 'Rent'),
        ('utilities', 'Utilities'),
        ('marketing', 'Marketing'),
        ('travel', 'Travel'),
        ('supplies', 'Supplies'),
        ('equipment', 'Equipment'),
        ('maintenance', 'Maintenance'),
        ('software', 'Software'),
        ('other', 'Other'),
    ]

    category = models.CharField(max_length=50, choices=EXPENSE_CATEGORY_CHOICES)
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    expense_date = models.DateField()
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    reference_number = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category} - {self.description}"

    class Meta:
        ordering = ['-expense_date']
        verbose_name = 'Expense'
        verbose_name_plural = 'Expenses'
