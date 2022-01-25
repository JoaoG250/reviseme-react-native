from rest_framework import viewsets

from topic.models import Topic, TopicFile, TopicLink, TopicRevision
from topic.serializers import (
    TopicSerializer,
    TopicFileSerializer,
    TopicLinkSerializer,
    TopicRevisionSerializer,
)


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class TopicFileViewSet(viewsets.ModelViewSet):
    queryset = TopicFile.objects.all()
    serializer_class = TopicFileSerializer


class TopicLinkViewSet(viewsets.ModelViewSet):
    queryset = TopicLink.objects.all()
    serializer_class = TopicLinkSerializer


class TopicRevisionViewSet(viewsets.ModelViewSet):
    queryset = TopicRevision.objects.all()
    serializer_class = TopicRevisionSerializer
