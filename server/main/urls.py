from django.conf.urls import re_path, include, url
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework import permissions

from .views.events import EventModelView, EventCoordinatorView, EventRegistrationView, EventParticipantView, EventFacultyView

from .views.accounts import (UserEmailVerificationAPIView, UserProfileAPIView, UserRegistrationAPIView, 
                           UserLoginView, PasswordResetAPIView, PasswordResetConfirmView)



events_router = routers.DefaultRouter()
events_router.register(r'', EventModelView)

registrations_router = routers.DefaultRouter()
registrations_router.register(r'', EventRegistrationView)

participants_router = routers.DefaultRouter()
participants_router.register(r'', EventParticipantView)

coordinators_router = routers.DefaultRouter()
coordinators_router.register(r'', EventCoordinatorView)

faculty_router = routers.DefaultRouter()
faculty_router.register(r'', EventFacultyView)


urlpatterns = [
   url(r'^events/', include(events_router.urls), name='events'),
   url(r'^docs/', include_docs_urls(title="api-doc", public=True, permission_classes=[])),
   url(r'^auth/login/', UserLoginView.as_view(), name='login'),
   url(r'^auth/register/', UserRegistrationAPIView.as_view(), name='regsiter'),
   url(r'^auth/verify/(?P<verification_key>.+)/$', UserEmailVerificationAPIView.as_view(), name='email_verify'),
   url(r'^auth/password_reset/$', PasswordResetAPIView.as_view(), name='password_change'),
   url(r'^auth/reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
   url(r'^user/profile/$', UserProfileAPIView.as_view(), name='user_profile'),
   url(r'^registrations/', include(registrations_router.urls), name='registrations'),
   url(r'^participants/', include(participants_router.urls), name='participants'),
   url(r'^coordinators/', include(coordinators_router.urls), name='coordinators'),
   url(r'^faculties/', include(faculty_router.urls), name='faculties'),
]