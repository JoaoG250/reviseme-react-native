from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response

from topic.filters import (
    TopicFileFilter,
    TopicFilter,
    TopicLinkFilter,
    TopicRevisionFilter,
)
from topic.models import Topic, TopicFile, TopicLink, TopicRevision
from topic.serializers import (
    TopicDisplaySerializer,
    TopicFileDisplaySerializer,
    TopicLinkDisplaySerializer,
    TopicSerializer,
    TopicFileSerializer,
    TopicLinkSerializer,
    TopicRevisionSerializer,
)


def return_display_after_create(viewset, request, display_serializer, *args, **kwargs):
    serializer = viewset.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    viewset.perform_create(serializer)
    headers = viewset.get_success_headers(serializer.data)
    return Response(
        display_serializer(instance=serializer.instance).data,
        status=status.HTTP_201_CREATED,
        headers=headers,
    )


def return_display_after_update(viewset, request, display_serializer, *args, **kwargs):
    partial = kwargs.pop("partial", False)
    instance = viewset.get_object()
    serializer = viewset.get_serializer(instance, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    viewset.perform_update(serializer)

    if getattr(instance, "_prefetched_objects_cache", None):
        # If 'prefetch_related' has been applied to a queryset, we need to
        # forcibly invalidate the prefetch cache on the instance.
        instance._prefetched_objects_cache = {}

    return Response(display_serializer(instance=serializer.instance).data)


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

    def create(self, request, *args, **kwargs):
        return return_display_after_create(
            self, request, TopicDisplaySerializer, *args, **kwargs
        )

    def update(self, request, *args, **kwargs):
        return return_display_after_update(
            self, request, TopicDisplaySerializer, *args, **kwargs
        )

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
            return Response({"progress": 0.0})


class TopicFileViewSet(viewsets.ModelViewSet):
    serializer_class = TopicFileSerializer
    filterset_class = TopicFileFilter

    def get_queryset(self):
        return TopicFile.objects.filter(
            topic__subject__user=self.request.user
        ).order_by("-updated_at")

    def get_serializer_class(self):
        if self.action == "list":
            return TopicFileDisplaySerializer
        elif self.action == "retrieve":
            return TopicFileDisplaySerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        return return_display_after_create(
            self, request, TopicFileDisplaySerializer, *args, **kwargs
        )


class TopicLinkViewSet(viewsets.ModelViewSet):
    serializer_class = TopicLinkSerializer
    filterset_class = TopicLinkFilter

    def get_queryset(self):
        return TopicLink.objects.filter(
            topic__subject__user=self.request.user
        ).order_by("-updated_at")

    def get_serializer_class(self):
        if self.action == "list":
            return TopicLinkDisplaySerializer
        elif self.action == "retrieve":
            return TopicLinkDisplaySerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        return return_display_after_create(
            self, request, TopicLinkDisplaySerializer, *args, **kwargs
        )


class TopicRevisionViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    serializer_class = TopicRevisionSerializer
    filterset_class = TopicRevisionFilter

    def get_queryset(self):
        return TopicRevision.objects.filter(
            topic__subject__user=self.request.user
        ).order_by("revision_date")
