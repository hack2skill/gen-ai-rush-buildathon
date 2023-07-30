import 'package:cloud_firestore/cloud_firestore.dart';

class Transactionsclass {
  String fromacc;
  String toacc;
  String amount;
  Timestamp date;
  Transactionsclass({
    required this.amount,
    required this.date,
    required this.fromacc,
    required this.toacc,
  });
}
