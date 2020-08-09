from django.apps import AppConfig
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.apps import apps

User = get_user_model()
# Snippet = apps.get_model('snippets', 'Snippet')
# Snippet = apps.get_model('records', 'Records')


class UserSerializer(serializers.ModelSerializer):
    # appConfig = AppConfig()
    # Snippet = appConfig.get_model(model_name='Snippet')
    # snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())

    class Meta:
        model = User

        fields = (
            'id', 'first_name', 'last_name', 'email', 'last_login',
            'is_active', 'date_joined', 'last_updated','is_staff','is_superuser'
        )
        default_permissions = ('add', 'change', 'delete', 'view_emailuser')
