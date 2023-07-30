import '/auth/firebase_auth/auth_util.dart';
import '/backend/backend.dart';
import '/components/like/like_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_video_player.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

class SwipereelModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for PageView widget.
  PageController? pageViewController;

  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;
  // Models for like dynamic component.
  late FlutterFlowDynamicModels<LikeModel> likeModels;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {
    likeModels = FlutterFlowDynamicModels(() => LikeModel());
  }

  void dispose() {
    unfocusNode.dispose();
    likeModels.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
