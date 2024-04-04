from django.db import models
from django.contrib.auth.models import User


class Deck(models.Model):
    title = models.CharField(max_length=50)
    owner = models.ForeignKey(User, related_name='decks', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.title}"


class FlashCard(models.Model):
    deck = models.ForeignKey(Deck, related_name="flashcards", on_delete=models.CASCADE)
    front = models.TextField(max_length=255, blank=False)
    back = models.TextField(max_length=255, blank=False)

    def __str__(self):
        return f"{self.front}"
