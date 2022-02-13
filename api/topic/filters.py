from django_filters import rest_framework as filters

from topic.models import Topic, TopicRevision


class TopicFilter(filters.FilterSet):
    class Meta:
        model = Topic
        fields = ("subject", "active")


class TopicRevisionFilter(filters.FilterSet):
    subject = filters.CharFilter(field_name="topic__subject__id")
    revision_date__lte = filters.DateFilter(
        field_name="revision_date", lookup_expr="lte"
    )

    class Meta:
        model = TopicRevision
        fields = (
            "subject",
            "topic",
            "phase",
            "revision_date",
            "revision_date__lte",
            "complete",
        )
