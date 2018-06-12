# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics, status, pagination

from boards.models import User, Board, Topic, Subject, Post, Country, City
from boards.serializers import BoardSerializer, TopicSerializer, \
                               UserSerializer, SubjectSerializer, \
                               PostSerializer, CitySerializer, CountrySerializer


# Create your views here.


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class HeaderPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        headers = {'X-Page': self.page.number, 'X-Per-Page': self.page_size,
                   'X-Total': self.page.paginator.count,
                   'X-Total-Pages': self.page.paginator.num_pages,
                   'Access-Control-Expose-Headers': 'X-Page, X-Per-Page, X-Total, X-Total-Pages'}

        return Response(data, headers=headers)


class UserList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None


class UserPostsList(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    pagination_class = None

    def get_queryset(self):
        return Post.objects.filter(user_id=self.kwargs['pk'])


class CityList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = City.objects.all()
    serializer_class = CitySerializer
    pagination_class = None

#
# class TopicWithPostList(generics.ListCreateAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     queryset = Topic.objects.all()
#     serializer_class = TopicWithPostSerializer


class CountryList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    pagination_class = None


class SubjectList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    pagination_class = None


class TopicList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    # pagination_class = None

    def get_board(self):
        return get_object_or_404(Board, pk=self.kwargs['board_pk'])

    def get_queryset(self):
        return Topic.objects.filter(board=self.get_board())


class currentUser(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)


class PostList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_topic(self):
        return get_object_or_404(Topic, pk=self.kwargs['topic_pk'])

    def get_queryset(self):
        return Post.objects.filter(topic=self.get_topic())


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class TopicDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        return get_object_or_404(Topic, pk=pk)

    def get(self, request, pk, format=None):
        serializer = TopicSerializer(self.get_object(pk))
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        topic = self.get_object(pk)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BoardList(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    pagination_class = None


class BoardDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
