from django.http import Http404
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import AbsentRequestSerializer, UserProfileSerializer, AbsentGetRequestSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserAbsentRequestData, UserProfile
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateAPIView



################################# for creating absent request ########################
class AbsentListCreate(generics.ListCreateAPIView):
    serializer_class = AbsentRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserAbsentRequestData.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            user_profile = self.request.user.userprofile
            serializer.save(author=self.request.user, team=user_profile.team, name=f"{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AbsentGetRequest(generics.ListAPIView):
    serializer_class = AbsentGetRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.userprofile
        return UserAbsentRequestData.objects.filter(team=user.team)
    
        
class AbsentUpdate(generics.UpdateAPIView):
    serializer_class = AbsentRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        query_set =  UserAbsentRequestData.objects.filter(author=user)
        return query_set
    
    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class AbsentDelete(generics.DestroyAPIView):
    serializer_class = AbsentRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserAbsentRequestData.objects.filter(author=user)


##############################for creating a user#################################
class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]


######################## for updating the user ##########################
class UpdateAddedUser(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        pk = self.kwargs["pk"]
        try:
            user_profile = UserProfile.objects.get(user_id=pk)
            return user_profile
        except UserProfile.DoesNotExist:
            raise Http404("UserProfile does not exist for the given pk.")

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)



################################### Delete User #######################################
class DeleteUserProfileView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        pk = self.kwargs["pk"]
        try:
            user_profile = UserProfile.objects.get(user_id=pk)
            return user_profile
        except UserProfile.DoesNotExist:
            raise Http404("UserProfile does not exist for the given pk.")

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        user.delete() 

class LoggedInUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        records = UserProfile.objects.all()
        serializer = UserProfileSerializer(records, many=True)
        return Response(serializer.data)
    

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the current authenticated user using request.user
        user = request.user
        
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found."}, status=404)
        
        serializer = UserProfileSerializer(profile)
        
        return Response(serializer.data)


class UserCreatedRequest(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the current authenticated user's profile
        user_profile = request.user.userprofile
        
        # Filter UserAbsentRequestData objects based on the user's position
        requested_data = UserAbsentRequestData.objects.filter(team=user_profile.position)

        # Serialize the filtered data
        serializer = AbsentRequestSerializer(requested_data, many=True)
        
        return Response(serializer.data)
    
