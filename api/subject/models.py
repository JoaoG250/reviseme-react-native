from django.db import models

from core.models import TimeStampedModel, User
from core.utils.models import file_upload_path


class Subject(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subjects")
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    image = models.ImageField(
        upload_to=file_upload_path, default="default/subject-image.jpg"
    )

    def __str__(self):
        return f"{self.user.email} - {self.name}"

    class Meta:
        unique_together = ("user", "name")
