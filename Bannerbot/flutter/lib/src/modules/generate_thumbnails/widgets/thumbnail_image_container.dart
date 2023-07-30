import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/models/thumbnail_data.dart';
import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/widgets/thumbnail_image.dart';
import 'package:bannerbot_youtube_thumbnail/src/utils/common.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_colors.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_text.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:share_plus/share_plus.dart';
import 'package:widgets_to_image/widgets_to_image.dart';

class ThumbnailImageContainer extends StatefulWidget {
  final ThumbnailData thumbnailData;
  final int selectedImageIndex;

  const ThumbnailImageContainer(
      {super.key,
      required this.thumbnailData,
      required this.selectedImageIndex});

  @override
  State<StatefulWidget> createState() => _ThumbnailImageContainer();
}

class _ThumbnailImageContainer extends State<ThumbnailImageContainer> {
  WidgetsToImageController widgetsToImageController =
      WidgetsToImageController();

  @override
  void initState() {
    super.initState();
  }

  void onSharePressed() async {
    try {
      var imageBytes = await widgetsToImageController.capture();
      if (imageBytes != null) {
        Share.shareXFiles([XFile.fromData(imageBytes, mimeType: 'image/png')],
            text: 'BannerBot: Generate banners/thumbnails instantly!');
      }
    } catch (error) {
      logGenericError(error);
    }
  }

  void onSavePressed() async {
    try {
      var imageBytes = await widgetsToImageController.capture();
      if (imageBytes != null) {
        XFile xFile = XFile.fromData(imageBytes, mimeType: 'image/png');
        String documentsDirPath = await getExtStorageOrDownloadsDirPath();
        String filePath =
            '$documentsDirPath/bannerbot-thumbnail-${DateTime.now().millisecondsSinceEpoch}.png';
        if (await Permission.storage.request().isGranted) {
          // Either the permission was already granted before or the user just granted it.
          xFile.saveTo(filePath).then((value) async {
            showToastMessage('Saved to $filePath');
          }).catchError((error) {
            showSnackBar(context, message: error.toString());
          });
        }
      }
    } catch (error) {
      logGenericError(error);
      showSnackBar(context, message: error.toString());
    }
  }

  void onEditPressed() async {}

  Widget getThumbnailImageComp() {
    return ThumbnailImage(
        thumbnailData: widget.thumbnailData,
        selectedImageIndex: widget.selectedImageIndex);
  }

  @override
  Widget build(BuildContext context) {
    return (Column(
      children: [
        WidgetsToImage(
            controller: widgetsToImageController,
            child: getThumbnailImageComp()),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextButton.icon(
              onPressed: onSharePressed,
              icon: const Icon(
                Icons.share,
                color: CustomColors.primaryDark,
                size: 16,
              ),
              label: const CustomText(
                'Share',
                size: CustomTextSize.small,
              ),
            ),
            TextButton.icon(
                onPressed: onSavePressed,
                icon: const Icon(
                  Icons.save,
                  color: CustomColors.primaryDark,
                  size: 16,
                ),
                label: const CustomText(
                  'Save',
                  size: CustomTextSize.small,
                )),
            TextButton.icon(
                onPressed: onEditPressed,
                icon: const Icon(
                  Icons.edit,
                  color: CustomColors.primaryDark,
                  size: 16,
                ),
                label: const CustomText(
                  'Edit',
                  size: CustomTextSize.small,
                ))
          ],
        )
      ],
    ));
  }
}
