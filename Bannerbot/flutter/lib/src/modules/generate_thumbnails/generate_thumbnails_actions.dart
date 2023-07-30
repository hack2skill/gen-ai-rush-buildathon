import 'dart:io';

import 'package:bannerbot_youtube_thumbnail/src/network.dart';

Future<Map<String, dynamic>> getThumbnailsData(String prompt) {
  String endpoint =
      'https://kt6q22xmv3zz6qxfnbjyfel5fe0lyezq.lambda-url.ap-south-1.on.aws/';

  return Network.postRequest(
      endpoint,
      {'Platform': Platform.isAndroid ? 'android' : 'ios'},
      {'deviceId': '', 'query': prompt});
}
