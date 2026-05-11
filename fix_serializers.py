from pathlib import Path

path = Path('myapp/serializers.py')
text = path.read_text(encoding='utf-8')
old = """class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
"""
new = """class ServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'slug')

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'
        read_only_fields = ('updated_at',)
"""

if old not in text:
    raise SystemExit('pattern not found')

path.write_text(text.replace(old, new), encoding='utf-8')
print('updated')
