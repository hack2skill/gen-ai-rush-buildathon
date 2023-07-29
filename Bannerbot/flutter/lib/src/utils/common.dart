import 'dart:io';

import 'package:bannerbot_youtube_thumbnail/src/utils/api_exception.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:path_provider/path_provider.dart';

void showToastMessage(String message) {
  Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM);
}

void logApiErrorAndShowMessage(BuildContext context,
    {required dynamic exception}) {
  if (exception is ApiException) {
    String message = exception.error.message ?? exception.message;
    if (message.isEmpty) {
      message =
          exception.error.code ?? exception.error.cause ?? 'Request failed';
    }
    showSnackBar(context, message: message);
  } else {
    if (kDebugMode) {
      print(exception);
    }
    showSnackBar(context, message: 'Something went wrong');
  }
}

void logGenericError(error) {
  debugPrint('logGenericError: $error');
}

void showSnackBar(BuildContext context, {required String message}) {
  final scaffold = ScaffoldMessenger.of(context);
  scaffold.showSnackBar(
    SnackBar(
      content: Text(message),
      action: SnackBarAction(
          label: 'X',
          textColor: Colors.white,
          onPressed: scaffold.hideCurrentSnackBar),
    ),
  );
}

// Ext storage for Android & Downloads for ios
// https://pub.dev/packages/path_provider
Future<String> getExtStorageOrDownloadsDirPath() async {
  final documentsDir = await getApplicationDocumentsDirectory();
  if (Platform.isAndroid) {
    //final extStorageDir = await getExternalStorageDirectory();
    //return extStorageDir?.path ?? documentsDir.path;
    return '/storage/emulated/0/Download';
  } else {
    final downloadsDir = await getDownloadsDirectory();
    return downloadsDir?.path ?? documentsDir.path;
  }
}

// String is in the format "aabbcc" or "ffaabbcc" with an optional leading "#".
Color getColorFromHex(String? hexString, Color? fallbackColor) {
  if (hexString == null || hexString == '') {
    return fallbackColor ?? Colors.white;
  }
  final buffer = StringBuffer();
  if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
  buffer.write(hexString.replaceFirst('#', ''));
  return Color(int.parse(buffer.toString(), radix: 16));
}
