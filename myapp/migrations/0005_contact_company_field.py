from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_companyinfo_testimonial_service_highlights_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='company',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
