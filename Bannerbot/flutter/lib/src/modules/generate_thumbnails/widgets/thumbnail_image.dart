import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/models/thumbnail_data.dart';
import 'package:bannerbot_youtube_thumbnail/src/utils/common.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_text.dart';
import 'package:flutter/material.dart';

class ThumbnailImage extends StatelessWidget {
  final ThumbnailData thumbnailData;
  final int selectedImageIndex;

  const ThumbnailImage(
      {super.key,
      required this.thumbnailData,
      required this.selectedImageIndex});

  double getFontSize() {
    // all texts will be of same size
    for (var text in thumbnailData.thumbnailTexts) {
      if (text.value != null) {
        if (text.value!.length >= 12) {
          return 16;
        } else if (text.value!.length >= 8) {
          return 18;
        }
      }
    }
    return 20;
  }

  List<Color> getBackgroundGradientColors() {
    //return [getColorFromHex('#000000', null), getColorFromHex('#303030', null)];
    if (selectedImageIndex == 0) {
      return [
        getColorFromHex('#000000', null),
        getColorFromHex('#303030', null)
      ];
    } else if (selectedImageIndex == 1) {
      return [
        getColorFromHex('#FFD700', null),
        getColorFromHex('#B8860B', null)
      ];
    } else {
      /*return [
        getColorFromHex('#E2E8F0', null),
        getColorFromHex('#AEC0D9', null)
      ];*/
      return [
        getColorFromHex('#000000', null),
        getColorFromHex('#303030', null)
      ];
    }
  }

  Color getTextBackgroundColor() {
    if (selectedImageIndex == 0) {
      return Colors.white;
    } else if (selectedImageIndex == 1) {
      return Colors.white;
    } else {
      return Colors.red;
    }
  }

  Color getTextColor() {
    if (selectedImageIndex == 0) {
      return Colors.black;
    } else if (selectedImageIndex == 1) {
      return Colors.black;
    } else {
      return Colors.white;
    }
  }

  Color getBorderColor() {
    if (selectedImageIndex == 0) {
      return Colors.green;
    } else if (selectedImageIndex == 1) {
      return Colors.red;
    } else {
      return Colors.red;
    }
  }

  void hardcodeHumanImagePosition() {
    if (selectedImageIndex == 0) {
      thumbnailData.humanImagePosition = 'right';
    } else if (selectedImageIndex == 1) {
      thumbnailData.humanImagePosition = 'left';
    } else {
      thumbnailData.humanImagePosition = 'right';
    }
  }

  @override
  Widget build(BuildContext context) {
    // hardcoding position for now
    hardcodeHumanImagePosition();

    CrossAxisAlignment humanImageAlignment = CrossAxisAlignment.center;
    CrossAxisAlignment textItemsAlignment = CrossAxisAlignment.center;

    // image & texts alignment will always be opposite for readability
    if (thumbnailData.humanImagePosition == 'left') {
      humanImageAlignment = CrossAxisAlignment.start;
      textItemsAlignment = CrossAxisAlignment.end;
    } else if (thumbnailData.humanImagePosition == 'right') {
      humanImageAlignment = CrossAxisAlignment.end;
      textItemsAlignment = CrossAxisAlignment.start;
    }

    ImageData humanImage = thumbnailData.humanImages[selectedImageIndex];

    return Container(
        width: 300,
        height: 168.75,
        decoration: BoxDecoration(
            border: Border.all(color: getBorderColor(), width: 5),
            gradient: LinearGradient(colors: getBackgroundGradientColors())),
        clipBehavior: Clip.hardEdge,
        //padding: const EdgeInsets.all(16),
        child: Stack(
          children: [
            SizedBox.expand(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: humanImageAlignment,
                children: [
                  humanImage.imageUrl == null
                      ? Container()
                      : Image.network(
                          humanImage.imageUrl!,
                          height: 168.75 - 5 * 2,
                        )
                ],
              ),
            ),
            SizedBox.expand(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: textItemsAlignment,
                children: thumbnailData.thumbnailTexts
                    .map((item) => Container(
                          margin: const EdgeInsets.only(
                              left: 16, right: 16, top: 4, bottom: 4),
                          padding: const EdgeInsets.all(4),
                          //color: getColorFromHex(item.backgroundColor, null),
                          color: getTextBackgroundColor(),
                          child: CustomText(
                            item.value?.toUpperCase() ?? '',
                            style: TextStyle(
                                //color: getColorFromHex(item.color, null),
                                fontSize: getFontSize(),
                                color: getTextColor(),
                                fontWeight: FontWeight.w600),
                          ),
                        ))
                    .toList(),
              ),
            )
          ],
        ));
  }
}
