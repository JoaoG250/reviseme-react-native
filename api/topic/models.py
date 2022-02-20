from datetime import datetime, timedelta

from django.db import models

from django.dispatch import receiver
from core.models import TimeStampedModel
from django.db.models.signals import post_save
from core.utils.models import file_upload_path
from subject.models import Subject

CHOICES_REVISION_PHASE = [
    ("1D", "1 Day"),
    ("7D", "7 Days"),
    ("30D", "30 Days"),
    ("90D", "90 Days"),
]

CHOICES_TOPIC_FILE_TYPE = [
    ("PDF", "PDF"),
    ("IMAGE", "Image"),
    ("VIDEO", "Video"),
    ("AUDIO", "Audio"),
]


class Topic(TimeStampedModel):
    subject = models.ForeignKey(
        to=Subject, on_delete=models.CASCADE, related_name="topics"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    image = models.ImageField(upload_to=file_upload_path, null=True)
    active = models.BooleanField(default=True)

    def complete_revision(self):
        # Mark the revision as complete
        revision = self.revisions.latest("revision_date")
        revision.complete = True
        revision.save()

        # Create the next revision
        if revision.phase == "1D":
            next_phase = "7D"
            next_revision_date = datetime.now() + timedelta(days=7)
        elif revision.phase == "7D":
            next_phase = "30D"
            next_revision_date = datetime.now() + timedelta(days=30)
        elif revision.phase == "30D":
            next_phase = "90D"
            next_revision_date = datetime.now() + timedelta(days=90)
        elif revision.phase == "90D":
            # Disable topic
            self.active = False
            self.save()

            return revision
        else:
            raise ValueError("Invalid phase")

        next_revision = TopicRevision(
            topic=revision.topic,
            phase=next_phase,
            revision_date=next_revision_date.date(),
        )
        next_revision.save()

        return next_revision

    def __str__(self):
        return f"{self.name} - {self.subject.name}"

    class Meta:
        unique_together = ("subject", "name")


class TopicFile(TimeStampedModel):
    topic = models.ForeignKey(to=Topic, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to=file_upload_path)
    file_type = models.CharField(max_length=10, choices=CHOICES_TOPIC_FILE_TYPE)

    def __str__(self):
        return f"{self.file_type} - {self.topic.name}"


class TopicLink(TimeStampedModel):
    topic = models.ForeignKey(to=Topic, on_delete=models.CASCADE, related_name="links")
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.topic.name


def revision_date_default_value():
    return datetime.now()


class TopicRevision(TimeStampedModel):
    topic = models.ForeignKey(
        to=Topic, on_delete=models.CASCADE, related_name="revisions"
    )
    phase = models.CharField(
        max_length=10, choices=CHOICES_REVISION_PHASE, default="1D"
    )
    revision_date = models.DateField(default=revision_date_default_value)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.topic.name} - {self.revision_date}"

    class Meta:
        unique_together = ("topic", "phase")


@receiver(post_save, sender=Topic)
def post_topic(sender, created, instance, **kwargs):
    if created:
        TopicRevision.objects.create(topic=instance)
