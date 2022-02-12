from django.core.management.base import BaseCommand

from subject.models import Subject
from core.models import User

SUBJECTS = [
    {
        "name": "Mathematics",
        "description": "Mathematics is the study of the properties of numbers, quantities, and the relationships between them.",
    },
    {
        "name": "Physics",
        "description": "Physics is the study of matter and its motion through space and time.",
    },
    {
        "name": "Chemistry",
        "description": "Chemistry is the study of matter and its properties, including its composition, structure, and behavior.",
    },
    {
        "name": "Biology",
        "description": "Biology is the natural science that studies life and living organisms.",
    },
    {
        "name": "English",
        "description": "English is the language of the world.",
    },
    {
        "name": "History",
        "description": "History is the study of past events and how they relate to present events.",
    },
    {
        "name": "Geography",
        "description": "Geography is the study of the earth and its natural resources.",
    },
    {
        "name": "Philosophy",
        "description": "Philosophy is the study of the nature and origin of knowledge.",
    },
]


class Command(BaseCommand):
    help = "Seed the database with test data."

    def handle(self, *args, **options):
        # Create test user
        user = User(
            first_name="John",
            last_name="Doe",
            email="johndoe@test.com",
            password="secret",
        )
        user.save()

        # Create test subjects

        for subject in SUBJECTS:
            Subject.objects.get_or_create(
                user=user, name=subject["name"], description=subject["description"]
            )

        self.stdout.write(self.style.SUCCESS("\nTest data seeded to the database.\n"))
