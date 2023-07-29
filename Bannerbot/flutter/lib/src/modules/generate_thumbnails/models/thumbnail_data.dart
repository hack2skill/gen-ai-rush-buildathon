const List<String> defaultBackgroundImageKeywords = [];
const List<ThumbnailText> defaultThumbnailTexts = [];
const List<ImageData> defaultHumanImages = [];

//enum HumanPosition { left, right, center }

class ThumbnailText {
  String? value;
  String? backgroundColor;
  String? color;

  ThumbnailText({this.value, this.backgroundColor, this.color});

  factory ThumbnailText.fromJson(Map<String, dynamic> jsonData) {
    return ThumbnailText(
        value: jsonData['value'] as String?,
        backgroundColor: jsonData['background_color'] as String?,
        color: jsonData['color'] as String?);
  }
}

class ImageData {
  String? imageUrl;
  int? id;
  String? imageOrientation; // horizontal / vertical / square / panoramic
  String? title;
  String? imageSize;

  ImageData(
      {this.imageUrl,
      this.id,
      this.imageOrientation,
      this.title,
      this.imageSize});

  factory ImageData.fromJson(Map<String, dynamic> jsonData) {
    return (ImageData(
        imageUrl: jsonData['image_url'],
        id: jsonData['id'],
        imageOrientation: jsonData['image_orientation'],
        title: jsonData['title'],
        imageSize: jsonData['image_size']));
  }
}

class ThumbnailData {
  String? backgroundImageUrl;
  List<String> backgroundImageKeywords;
  String? humanImageUrl;
  String? humanImageDescription;
  String? humanImagePosition;
  List<ThumbnailText> thumbnailTexts;
  List<ImageData> humanImages;

  ThumbnailData(
      {this.backgroundImageUrl,
      this.backgroundImageKeywords = defaultBackgroundImageKeywords,
      this.humanImageUrl,
      this.humanImageDescription,
      this.humanImagePosition,
      this.thumbnailTexts = defaultThumbnailTexts,
      this.humanImages = defaultHumanImages});

  factory ThumbnailData.fromJson(Map<String, dynamic> jsonData) {
    List<String> backgroundImageKeywords =
        List<String>.from(jsonData['background_image_keywords']);
    List<ThumbnailText> thumbnailTexts = [];
    List<ImageData> humanImages = [];
    List<dynamic> textsArr = jsonData['thumbnail_texts'];
    for (var element in textsArr) {
      thumbnailTexts.add(ThumbnailText.fromJson(element));
    }
    List<dynamic> humanImagesArr = jsonData['human_images'];
    for (var element in humanImagesArr) {
      humanImages.add(ImageData.fromJson(element));
    }

    return ThumbnailData(
        backgroundImageUrl: jsonData['background_image_url'] as String?,
        backgroundImageKeywords: backgroundImageKeywords,
        humanImageUrl: jsonData['human_image_url'] as String?,
        humanImageDescription: jsonData['human_image_description'] as String?,
        humanImagePosition: jsonData['human_image_position'] as String?,
        thumbnailTexts: thumbnailTexts,
        humanImages: humanImages);
  }

  Map<String, dynamic> toJson() => {
        'background_image_url': backgroundImageUrl,
        'background_image_keywords': backgroundImageKeywords,
        'human_image_url': humanImageUrl,
        'human_image_description': humanImageDescription,
        'human_position': humanImagePosition,
        'thumbnail_texts': thumbnailTexts,
        'human_images': humanImages
      };

  @override
  String toString() {
    return toJson().toString();
  }
}
