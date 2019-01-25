from rest_framework_jwt.views import ObtainJSONWebToken
from django.http import Http404

from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import generics, permissions, status, views
from rest_framework import viewsets, mixins
from rest_framework.response import Response

from ..models.accounts import UserProfile
from ..serializers.accounts import (UserRegistrationSerializer, UserLoginSerializer, UserSerializer,
 UserProfileSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer)

User = get_user_model()

# Email
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string

from rest_framework.response import Response
from rest_framework import status


class UserRegistrationAPIView(generics.CreateAPIView):
    """
    Endpoint for user registration.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()


class UserEmailVerificationAPIView(views.APIView):
    """
    Endpoint for verifying email address.
    """

    permission_classes = (permissions.AllowAny, )

    def get(self, request, verification_key):
        activated_user = self.activate(verification_key)
        if activated_user:
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def activate(self, verification_key):
        return UserProfile.objects.activate_user(verification_key)


class UserLoginView(ObtainJSONWebToken):
    serializer_class = UserLoginSerializer


class PasswordResetAPIView(views.APIView):
    """
    Endpoint to send email to user with password reset link.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = PasswordResetSerializer

    def post(self, request):
        user_profile = self.get_user_profile(request.data.get('email'))
        if user_profile:
            user_profile.send_password_reset_email(
                site=get_current_site(request)
            )  # To be made asynchronous in production
            return Response(status=status.HTTP_200_OK)

        # Forcing Http status to 200 even if failure to support user privacy.
        # Will show message at frontend like "If the email is valid, you must have received password reset email"
        return Response(status=status.HTTP_200_OK)

    def get_user_profile(self, email):
        try:
            user_profile = UserProfile.objects.get(user__email=email)
        except:
            return None
        return user_profile


class PasswordResetConfirmView(views.APIView):
    """
    Endpoint to change user password.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(
            data=request.data,
            context={
                'uidb64': kwargs['uidb64'],
                'token': kwargs['token']
            })

        if serializer.is_valid(raise_exception=True):
            new_password = serializer.validated_data.get('new_password')
            user = serializer.user
            user.set_password(new_password)
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(generics.RetrieveAPIView):
    """
    Endpoint to retrieve user profile.
    """

    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserProfileSerializer

    def get_object(self):
        try:
            return self.request.user.userprofile
        except UserProfile.DoesNotExist:
            raise Http404

# Contact Email View 
class ContactUsAPIView(views.APIView):
    """
    docstring here
        :param APIView: 
    """
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = request.data
        first_name = data['first_name']
        last_name = data['last_name']
        email_address = data['email']
        phone_number = data['phone_number']
        description = data['description']
        
        mail_subject = data['subject']

        if first_name and email_address and phone_number and description and mail_subject:
            mail_message = render_to_string('contact_mail.html', {
                'first_name': first_name,
                'last_name': last_name,
                'email_address': email_address,
                'phone_number': phone_number,
                'description':description,
            })
            to_email = "parasharvk@akgec.ac.in"
            send_mail = EmailMessage(
                        mail_subject, mail_message, to=[to_email]
            )
            send_mail.send()
            return Response({"status":"Email Sent"}, status=status.HTTP_201_CREATED)
        return Response({"status":"Email Not Sent"}, status=status.HTTP_400_BAD_REQUEST)

