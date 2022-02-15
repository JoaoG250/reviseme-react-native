from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from subject.models import Subject
from subject.serializers import CreateSubjectSerializer, SubjectSerializer
from topic.models import TopicRevision


class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        return Subject.objects.filter(user=self.request.user).order_by("-updated_at")

    def get_serializer_class(self):
        if self.action == "create":
            return CreateSubjectSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["get"])
    def revision_progress(self, request, pk=None):
        # Calculate the progress based on the number of revisions completed
        # and the number of revisions total.
        subject = self.get_object()
        revision_count = TopicRevision.objects.filter(topic__subject=subject).count()
        completed_count = TopicRevision.objects.filter(
            topic__subject=subject, complete=True
        ).count()
        try:
            progress = completed_count / revision_count * 100
            return Response({"progress": progress})
        except ZeroDivisionError:
            return Response({"progress": 0})
