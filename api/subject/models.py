from django.db import models

from core.models import TimeStampedModel
from core.utils.models import file_upload_path


class Subject(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    image = models.ImageField(upload_to=file_upload_path)
