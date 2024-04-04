from django.contrib import admin

from .models import Deck, FlashCard


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'owner', 'created', 'description']
    list_filter = ('title', 'owner', 'created')


@admin.register(FlashCard)
class FlashCardAdmin(admin.ModelAdmin):
    list_display = ['id', 'deck', 'front', 'back']
    list_filter = ('deck', 'front')
