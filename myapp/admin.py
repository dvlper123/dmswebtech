from django.contrib import admin
from .models import Contact, Service, Testimonial, CompanyInfo

# Register your models here.

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'company', 'phone', 'subject', 'created_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'email', 'company', 'subject')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'price', 'duration', 'is_active', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_active', 'created_at', 'updated_at')
    search_fields = ('title', 'description', 'highlights')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'company', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at', 'updated_at')
    search_fields = ('name', 'role', 'company', 'feedback')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'email', 'phone', 'location', 'is_active', 'updated_at')
    list_filter = ('is_active', 'updated_at')
    search_fields = ('company_name', 'email', 'phone', 'location')
    readonly_fields = ('updated_at',)
