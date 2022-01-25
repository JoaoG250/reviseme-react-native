from rest_framework import viewsets

from subject.models import Subject
from subject.serializers import SubjectSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
