from django.conf.urls import re_path, include, url
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework import permissions

from .views.test import TestModelView

test_router = routers.DefaultRouter()
test_router.register(r'', TestModelView)

urlpatterns = [
   url(r'^test/', include(test_router.urls), name='test'),
   url(r'^docs/', include_docs_urls(title="api-doc", public=True, permission_classes=[]))
]