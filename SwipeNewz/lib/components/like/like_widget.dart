import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'like_model.dart';
export 'like_model.dart';

class LikeWidget extends StatefulWidget {
  const LikeWidget({Key? key}) : super(key: key);

  @override
  _LikeWidgetState createState() => _LikeWidgetState();
}

class _LikeWidgetState extends State<LikeWidget> {
  late LikeModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => LikeModel());

    // On component load action.
    SchedulerBinding.instance.addPostFrameCallback((_) async {
      logFirebaseEvent('LIKE_COMP_like_ON_INIT_STATE');
      logFirebaseEvent('like_update_widget_state');
      setState(() {
        _model.isclicked = false;
      });
    });
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (_model.isclicked)
          Icon(
            Icons.favorite_rounded,
            color: Color(0xFFBE4244),
            size: 24.0,
          ),
        if (valueOrDefault<bool>(
          _model.isclicked == false,
          true,
        ))
          InkWell(
            splashColor: Colors.transparent,
            focusColor: Colors.transparent,
            hoverColor: Colors.transparent,
            highlightColor: Colors.transparent,
            onTap: () async {
              logFirebaseEvent('LIKE_COMP_Icon_ugaoqke5_ON_TAP');
              logFirebaseEvent('Icon_update_widget_state');
              setState(() {
                _model.isclicked = true;
              });
            },
            child: Icon(
              Icons.favorite_border,
              color: FlutterFlowTheme.of(context).white,
              size: 24.0,
            ),
          ),
      ],
    );
  }
}
