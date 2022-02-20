from rest_framework import serializers

from topic.models import Topic, TopicFile, TopicLink, TopicRevision
from subject.serializers import SubjectSerializer


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class TopicDisplaySerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Topic
        fields = "__all__"


class TopicFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicFile
        fields = "__all__"


class TopicFileDisplaySerializer(serializers.ModelSerializer):
    topic = TopicDisplaySerializer(read_only=True)

    class Meta:
        model = TopicFile
        fields = "__all__"


class TopicLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicLink
        fields = "__all__"


class TopicLinkDisplaySerializer(serializers.ModelSerializer):
    topic = TopicDisplaySerializer(read_only=True)

    class Meta:
        model = TopicLink
        fields = "__all__"


class TopicRevisionSerializer(serializers.ModelSerializer):
    topic = TopicDisplaySerializer(read_only=True)

    class Meta:
        model = TopicRevision
        fields = "__all__"
