import 'package:flutter/material.dart';
import 'flutter_flow/request_manager.dart';
import '/backend/backend.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'flutter_flow/flutter_flow_util.dart';

class FFAppState extends ChangeNotifier {
  static final FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  Future initializePersistedState() async {}

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  final _reelcacheManager = FutureRequestManager<List<ReelsRecord>>();
  Future<List<ReelsRecord>> reelcache({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Future<List<ReelsRecord>> Function() requestFn,
  }) =>
      _reelcacheManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearReelcacheCache() => _reelcacheManager.clear();
  void clearReelcacheCacheKey(String? uniqueKey) =>
      _reelcacheManager.clearRequest(uniqueKey);

  final _reelcachecopyManager = StreamRequestManager<List<ReelsRecord>>();
  Stream<List<ReelsRecord>> reelcachecopy({
    String? uniqueQueryKey,
    bool? overrideCache,
    required Stream<List<ReelsRecord>> Function() requestFn,
  }) =>
      _reelcachecopyManager.performRequest(
        uniqueQueryKey: uniqueQueryKey,
        overrideCache: overrideCache,
        requestFn: requestFn,
      );
  void clearReelcachecopyCache() => _reelcachecopyManager.clear();
  void clearReelcachecopyCacheKey(String? uniqueKey) =>
      _reelcachecopyManager.clearRequest(uniqueKey);
}

LatLng? _latLngFromString(String? val) {
  if (val == null) {
    return null;
  }
  final split = val.split(',');
  final lat = double.parse(split.first);
  final lng = double.parse(split.last);
  return LatLng(lat, lng);
}

void _safeInit(Function() initializeField) {
  try {
    initializeField();
  } catch (_) {}
}

Future _safeInitAsync(Function() initializeField) async {
  try {
    await initializeField();
  } catch (_) {}
}
