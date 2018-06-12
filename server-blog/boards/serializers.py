from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework import serializers, exceptions
from django.shortcuts import get_object_or_404
import logging
import datetime
from boards.models import Board, Topic, User, Subject, Post, Country, City


logging.basicConfig(
    level=logging.DEBUG,
    format='---- %(asctime)s %(levelname)s %(message)s ----'
)


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ('id', 'name')


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = ('id', 'name')


class CitySerializer(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = City
        fields = ('id', 'name', 'country')


class BoardSerializer(serializers.ModelSerializer):
    creater = serializers.StringRelatedField(many=False)
    subject = SubjectSerializer()
    posts_count = serializers.SerializerMethodField()
    topics_count = serializers.SerializerMethodField()

    def get_posts_count(self, obj):
        return obj.get_posts_count()

    def get_topics_count(self, obj):
        return obj.get_topics_count()

    class Meta:
        model = Board
        fields = ('id', 'name', 'description', 'creater', 'subject',
                  'is_deleted', 'posts_count', 'topics_count')

    def create(self, validated_data):

        if self.context['request'].user.id is None:
            validated_data['creater_id'] = 1
        else:
            validated_data['creater_id'] = self.context['request'].user.id
        subject = validated_data.pop('subject', None)
        subject_id = Subject.objects.filter(name=subject['name'])[0].id
        validated_data['subject_id'] = subject_id
        validated_data.pop('subject', None)
        board = Board.objects.create(**validated_data)

        return board

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description',
                                                  instance.description)
        instance.is_deleted = validated_data.get('is_deleted',
                                                 instance.is_deleted)
        instance.creater = validated_data.get('creater', instance.creater)
        instance.save()
        return instance


class TopicSerializer(serializers.ModelSerializer):
    starter = serializers.StringRelatedField(many=False)
    board = BoardSerializer(write_only=True, required=False)
    board_id = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all(), source='board')
    # board_id = serializers.PrimaryKeyRelatedField(read_only=True)
    replies = serializers.SerializerMethodField()

    def get_replies(self, obj):
        return obj.get_replies()

    class Meta:
        model = Topic
        fields = ('id', 'subject', 'board', 'board_id', 'last_updated', 'replies', 'starter', 'views')

    def create(self, validated_data):
        if self.context['request'].user.id is None:
            validated_data['starter_id'] = 1
        else:
            validated_data['starter_id'] = self.context['request'].user.id

        return Topic.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.subject = validated_data.get('subject', instance.subject)
        instance.starter = validated_data.get('starter', instance.starter)
        instance.last_update = validated_data.get('last_updated',
                                                  instance.last_updated)
        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(many=False)
    topic = TopicSerializer(write_only=True, required=False)
    topic_id = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all(), source='topic')

    class Meta:
        model = Post
        fields = ('id', 'message', 'created_at', 'updated_at', 'topic', 'created_by', 'topic_id')

    def create(self, validated_data):
        if self.context['request'].user.id is None:
            validated_data['created_by_id'] = 1
        else:
            validated_data['created_by_id'] = self.context['request'].user.id
            logging.DEBUG(validated_data)
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.message = validated_data.get('message', instance.message)
        instance.updated_at = datetime.datetime.now()
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'username', 'city']

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user
