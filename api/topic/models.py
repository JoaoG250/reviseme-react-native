from django.db import models

from core.models import TimeStampedModel
from core.utils.models import file_upload_path
from subject.models import Subject

CHOICES_REVISION_STATUS = [
    ("PENDING", "Pending"),
    ("COMPLETED", "Completed"),
    ("FAILED", "Failed"),
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


class TopicFile(TimeStampedModel):
    topic = models.ForeignKey(to=Topic, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to=file_upload_path)
    file_type = models.CharField(max_length=10, choices=CHOICES_TOPIC_FILE_TYPE)


class TopicLink(TimeStampedModel):
    topic = models.ForeignKey(to=Topic, on_delete=models.CASCADE, related_name="links")
    url = models.URLField()
    url_type = models.CharField(max_length=10, choices=CHOICES_TOPIC_FILE_TYPE)


class TopicRevision(TimeStampedModel):
    topic = models.ForeignKey(
        to=Topic, on_delete=models.CASCADE, related_name="revisions"
    )
    date_revision_1d = models.DateField(null=True)
    date_revision_7d = models.DateField(null=True)
    date_revision_30d = models.DateField(null=True)
    date_revision_90d = models.DateField(null=True)
    status_revision_1d = models.CharField(
        max_length=10, choices=CHOICES_REVISION_STATUS, default="PENDING"
    )
    status_revision_7d = models.CharField(
        max_length=10, choices=CHOICES_REVISION_STATUS, default="PENDING"
    )
    status_revision_30d = models.CharField(
        max_length=10, choices=CHOICES_REVISION_STATUS, default="PENDING"
    )
    status_revision_90d = models.CharField(
        max_length=10, choices=CHOICES_REVISION_STATUS, default="PENDING"
    )
