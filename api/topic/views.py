from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from topic.filters import TopicFilter, TopicRevisionFilter
from topic.models import Topic, TopicFile, TopicLink, TopicRevision
from topic.serializers import (
    TopicDisplaySerializer,
    TopicSerializer,
    TopicFileSerializer,
    TopicLinkSerializer,
    TopicRevisionSerializer,
)


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    filterset_class = TopicFilter

    def get_queryset(self):
        return Topic.objects.filter(subject__user=self.request.user).order_by(
            "-updated_at"
        )

    def get_serializer_class(self):
        if self.action == "list":
            return TopicDisplaySerializer
        elif self.action == "retrieve":
            return TopicDisplaySerializer
        return self.serializer_class

    @action(detail=True, methods=["get"])
    def complete_revision(self, request, pk=None):
        topic = self.get_object()
        revision = topic.complete_revision()
        serializer = TopicRevisionSerializer(instance=revision)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def revision_progress(self, request):
        # Calculate the progress based on the number of revisions completed
        # and the number of revisions total.
        revision_count = TopicRevision.objects.filter(
            topic__subject__user=request.user
        ).count()
        completed_count = TopicRevision.objects.filter(
            topic__subject__user=request.user, complete=True
        ).count()
        try:
            progress = completed_count / revision_count * 100
            return Response({"progress": progress})
        except ZeroDivisionError:
            return Response({"progress": 0})


class TopicFileViewSet(viewsets.ModelViewSet):
    serializer_class = TopicFileSerializer

    def get_queryset(self):
        return TopicFile.objects.filter(
            topic__subject__user=self.request.user
        ).order_by("-updated_at")


class TopicLinkViewSet(viewsets.ModelViewSet):
    serializer_class = TopicLinkSerializer

    def get_queryset(self):
        return TopicLink.objects.filter(
            topic__subject__user=self.request.user
        ).order_by("-updated_at")


class TopicRevisionViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    serializer_class = TopicRevisionSerializer
    filterset_class = TopicRevisionFilter

    def get_queryset(self):
        return TopicRevision.objects.filter(
            topic__subject__user=self.request.user
        ).order_by("-updated_at")
