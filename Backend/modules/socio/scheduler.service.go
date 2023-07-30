package socio

import (
	"context"
	smartsocial "genai/integrations/smart_social"
)

func SchedulerPickUp(ctx *context.Context) {

	scheduledPost := GetScheduledPosts(ctx)

	for _, post := range scheduledPost {

		postModel := GetPostById(ctx, post.PostId)

		if postOnMedia, ok := AppPublishedFun[post.AppName]; ok {
			postOnMedia(ctx, postModel)
		}
	}
}

func postOnSmartSocial(ctx *context.Context, post *Post) {

	smartsocial.PostOnSmartSocial(ctx, &smartsocial.SmartSocialPublishPost{
		Content: post.Caption,
		Image:   post.ImageName,
	})

}
