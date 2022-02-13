from pathlib import Path
import json as json_lib
from django.core.management.base import BaseCommand

from subject.models import Subject
from core.models import User
from topic.models import Topic


class Command(BaseCommand):
    help = "Seed the database with test data."

    def handle(self, *args, **options):
        # Get the superuser
        user = User.objects.filter(is_superuser=True).first()

        # Get the path of current file
        path = Path(__file__).parent

        # Load the subjects from data/subjects.json
        subjects_path = path.joinpath("data", "subjects.json")
        with open(subjects_path) as f:
            subjects = json_lib.load(f)

        subject_count = 0
        topic_count = 0
        # Create test subjects
        for subject in subjects:
            subject_object, created = Subject.objects.get_or_create(
                user=user, name=subject["name"], description=subject["description"]
            )
            if created:
                subject_count += 1

            # Create subject topics
            for topic in subject["topics"]:
                topic_object, created = Topic.objects.get_or_create(
                    subject=subject_object,
                    name=topic["name"],
                    description=topic["description"],
                )
                if created:
                    topic_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully created {subject_count} subjects and {topic_count} topics."
            )
        )
        self.stdout.write(self.style.SUCCESS("\nTest data seeded to the database.\n"))
