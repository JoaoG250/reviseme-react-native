from django.db import models


class TimeStampedModel(models.Model):
    """Abstract model class with times stamp values.

    Parameters
    ----------
    models : django.db.models.Model
        Django Model Class.
    """

    created_at = models.DateField("Creation date", auto_now_add=True)
    updated_at = models.DateField("Last modified date", auto_now=True)

    class Meta:
        abstract = True
