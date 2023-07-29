import 'dart:convert';

import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/models/thumbnail_data.dart';
import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/widgets/thumbnail_image_container.dart';
import 'package:bannerbot_youtube_thumbnail/src/utils/common.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_colors.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_text.dart';
import 'package:flutter/material.dart';

class ThumbnailsContainer extends StatefulWidget {
  final String openAiResponse;

  const ThumbnailsContainer({super.key, required this.openAiResponse});

  @override
  State<StatefulWidget> createState() => _ThumbnailsContainer();
}

class _ThumbnailsContainer extends State<ThumbnailsContainer> {
  List<ThumbnailData> thumbnails = [];

  @override
  void initState() {
    super.initState();

    try {
      List<dynamic> thumbnailsList =
          json.decode(widget.openAiResponse)['thumbnails'];
      for (int i = 0; i < thumbnailsList.length; i++) {
        var item = thumbnailsList[i];
        Map<String, dynamic> json = Map<String, dynamic>.from(item);
        thumbnails.add(ThumbnailData.fromJson(json));
      }
    } catch (error) {
      logGenericError(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    int decorationIndex = 0;
    int imageIndex = 0;
    return (Column(
        children: thumbnails.isEmpty
            ? [
                const CustomText(
                    'I am not able to generate thumbnail from your prompt. Please modify your prompt, taking reference from examples above.')
              ]
            : [
                ...thumbnails
                    .map((item) => Container(
                        padding: const EdgeInsets.only(bottom: 0),
                        margin: const EdgeInsets.only(top: 12, bottom: 12),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(
                                width: 0.5,
                                color:
                                    (decorationIndex++ == thumbnails.length - 1)
                                        ? Colors.white
                                        : CustomColors.lightText),
                          ),
                        ),
                        child: ThumbnailImageContainer(
                            thumbnailData: item,
                            selectedImageIndex: imageIndex++)))
                    .toList()
              ]));
  }
}
