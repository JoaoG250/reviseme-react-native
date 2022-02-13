from django.contrib import admin

from topic.models import Topic, TopicFile, TopicLink, TopicRevision


class TopicAdmin(admin.ModelAdmin):
    pass


class TopicFileAdmin(admin.ModelAdmin):
    pass


class TopicLinkAdmin(admin.ModelAdmin):
    pass


class TopicRevisionAdmin(admin.ModelAdmin):
    pass


admin.site.register(Topic, TopicAdmin)
admin.site.register(TopicFile, TopicFileAdmin)
admin.site.register(TopicLink, TopicLinkAdmin)
admin.site.register(TopicRevision, TopicRevisionAdmin)
