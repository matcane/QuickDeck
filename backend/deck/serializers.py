from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Deck, FlashCard


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class DeckModelSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    flashcards = serializers.SerializerMethodField()

    class Meta:
        model = Deck
        fields = ['id', 'title', 'owner', 'created', 'description', 'flashcards']
        id = serializers.ReadOnlyField()

    def get_flashcards(self, obj):
        flashcards = obj.flashcards.all()
        serialized_cards = FlashCardModelSerializer(flashcards, many=True).data
        return serialized_cards


class FlashCardModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashCard
        fields = ['id', 'deck', 'front', 'back']
        id = serializers.ReadOnlyField()
