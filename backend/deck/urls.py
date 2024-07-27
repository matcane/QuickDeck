from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('register/', views.register, name='register'),
    path('logout/', views.user_logout, name='logout'),

    path('deck_list/', views.deck_list, name='deck_list'),
    path('deck/<int:deck_id>/', views.deck_detail, name='deck_detail'),
    path('deck_create/', views.deck_create, name='deck_create'),
    path('deck_update/<int:deck_id>/', views.deck_update, name='deck_update'),
    path('deck_delete/<int:deck_id>/', views.deck_delete, name='deck_delete'),

    path('deck/<int:deck_id>/flashcards/', views.flashcard_list, name='flashcard_list'),
    path('deck/<int:deck_id>/flashcard_detail/<int:flashcard_id>/', views.flashcard_detail, name='stage_detail'),
    path('deck/<int:deck_id>/flashcard_create/', views.flashcard_create, name='flashcard_create'),
    path('deck/<int:deck_id>/flashcard_update/<int:flashcard_id>/', views.flashcard_update, name='flashcard_update'),
    path('deck/<int:deck_id>/flashcard_delete/<int:flashcard_id>/', views.flashcard_delete, name='flashcard_delete'),

]
