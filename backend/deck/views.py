from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, DeckModelSerializer, FlashCardModelSerializer
from .models import Deck
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(username=username, password=password)
                return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logout successful'})
    else:
        return Response({'error': 'Only POST method allowed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def deck_list(request):
    if request.method == 'GET':
        decks = request.user.decks.all()
        serializer = DeckModelSerializer(decks, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def deck_detail(request, deck_id):
    try:
        deck = Deck.objects.get(id=deck_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DeckModelSerializer(deck).data
        return Response(serializer, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deck_create(request):
    if request.method == 'POST':
        serializer = DeckModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def deck_update(request, deck_id):
    try:
        deck = Deck.objects.get(id=deck_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DeckModelSerializer(deck, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deck_delete(request, deck_id):
    try:
        deck = Deck.objects.get(id=deck_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        deck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def flashcard_list(request, deck_id):
    try:
        deck = Deck.objects.get(id=deck_id)
        flashcards = deck.flashcards.all()
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FlashCardModelSerializer(flashcards).data
        return Response(serializer, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def flashcard_detail(request, deck_id, flashcard_id):
    try:
        deck = Deck.objects.get(id=deck_id)
        flashcards = deck.flashcards.all()
        flashcard = flashcards.get(id=flashcard_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FlashCardModelSerializer(flashcard).data
        return Response(serializer, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def flashcard_create(request, deck_id):
    if request.method == 'POST':
        serializer = FlashCardModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(deck=deck_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def flashcard_update(request, deck_id, flashcard_id):
    try:
        deck = Deck.objects.get(id=deck_id)
        flashcards = deck.flashcards.all()
        flashcard = flashcards.get(id=flashcard_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = FlashCardModelSerializer(flashcard, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(deck=deck_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def flashcard_delete(request, deck_id, flashcard_id):
    try:
        deck = Deck.objects.get(id=deck_id)
        flashcards = deck.flashcards.all()
        flashcard = flashcards.get(id=flashcard_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        flashcard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
