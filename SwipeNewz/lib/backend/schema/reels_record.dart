import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ReelsRecord extends FirestoreRecord {
  ReelsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "created_at" field.
  DateTime? _createdAt;
  DateTime? get createdAt => _createdAt;
  bool hasCreatedAt() => _createdAt != null;

  // "video_url" field.
  String? _videoUrl;
  String get videoUrl => _videoUrl ?? '';
  bool hasVideoUrl() => _videoUrl != null;

  // "reporter_name" field.
  String? _reporterName;
  String get reporterName => _reporterName ?? '';
  bool hasReporterName() => _reporterName != null;

  // "reporter_profile_url" field.
  String? _reporterProfileUrl;
  String get reporterProfileUrl => _reporterProfileUrl ?? '';
  bool hasReporterProfileUrl() => _reporterProfileUrl != null;

  // "news_source" field.
  String? _newsSource;
  String get newsSource => _newsSource ?? '';
  bool hasNewsSource() => _newsSource != null;

  // "profile_picture" field.
  String? _profilePicture;
  String get profilePicture => _profilePicture ?? '';
  bool hasProfilePicture() => _profilePicture != null;

  // "likes" field.
  int? _likes;
  int get likes => _likes ?? 0;
  bool hasLikes() => _likes != null;

  void _initializeFields() {
    _createdAt = snapshotData['created_at'] as DateTime?;
    _videoUrl = snapshotData['video_url'] as String?;
    _reporterName = snapshotData['reporter_name'] as String?;
    _reporterProfileUrl = snapshotData['reporter_profile_url'] as String?;
    _newsSource = snapshotData['news_source'] as String?;
    _profilePicture = snapshotData['profile_picture'] as String?;
    _likes = castToType<int>(snapshotData['likes']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('Reels');

  static Stream<ReelsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ReelsRecord.fromSnapshot(s));

  static Future<ReelsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ReelsRecord.fromSnapshot(s));

  static ReelsRecord fromSnapshot(DocumentSnapshot snapshot) => ReelsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ReelsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ReelsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ReelsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ReelsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createReelsRecordData({
  DateTime? createdAt,
  String? videoUrl,
  String? reporterName,
  String? reporterProfileUrl,
  String? newsSource,
  String? profilePicture,
  int? likes,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'created_at': createdAt,
      'video_url': videoUrl,
      'reporter_name': reporterName,
      'reporter_profile_url': reporterProfileUrl,
      'news_source': newsSource,
      'profile_picture': profilePicture,
      'likes': likes,
    }.withoutNulls,
  );

  return firestoreData;
}

class ReelsRecordDocumentEquality implements Equality<ReelsRecord> {
  const ReelsRecordDocumentEquality();

  @override
  bool equals(ReelsRecord? e1, ReelsRecord? e2) {
    return e1?.createdAt == e2?.createdAt &&
        e1?.videoUrl == e2?.videoUrl &&
        e1?.reporterName == e2?.reporterName &&
        e1?.reporterProfileUrl == e2?.reporterProfileUrl &&
        e1?.newsSource == e2?.newsSource &&
        e1?.profilePicture == e2?.profilePicture &&
        e1?.likes == e2?.likes;
  }

  @override
  int hash(ReelsRecord? e) => const ListEquality().hash([
        e?.createdAt,
        e?.videoUrl,
        e?.reporterName,
        e?.reporterProfileUrl,
        e?.newsSource,
        e?.profilePicture,
        e?.likes
      ]);

  @override
  bool isValidKey(Object? o) => o is ReelsRecord;
}
