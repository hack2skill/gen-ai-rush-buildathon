import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:finovo/Data/data.dart';
import 'package:finovo/model/Transactions.dart';
import 'package:flutter/material.dart';

class Crud {
  final db = FirebaseFirestore.instance;

  Future<int> read(String mail) async {
    int accnumber = 0;
    await FirebaseFirestore.instance
        .collection('accounts')
        .get()
        .then((QuerySnapshot querySnapshot) {
      // Process the data in the query snapshot

      if (querySnapshot.size == 0) {
      } else {
        querySnapshot.docs.forEach((doc) {
          var rawdata = doc.data() as Map<String, dynamic>;

          if (mail == rawdata['Mail']) {
            accnumber = rawdata['Account number'];
            Mydata.balance = rawdata['Balance'].toString();
            Mydata.name = rawdata['Name'].toString();
          }
        });
      }
    });
    return accnumber;
  }

  Future<int> getpayeenaccnumber(String name) async {
    int accnumber = 0;
    await FirebaseFirestore.instance
        .collection('accounts')
        .get()
        .then((QuerySnapshot querySnapshot) {
      // Process the data in the query snapshot

      if (querySnapshot.size == 0) {
      } else {
        querySnapshot.docs.forEach((doc) {
          var rawdata = doc.data() as Map<String, dynamic>;
          if (Mydata.accnumber == rawdata['Account number']) {
            print(rawdata['Payee name']);
            for (var i = 0; i < rawdata['Payee name'].length; i++) {
              if (name == rawdata['Payee name'][i]) {
                accnumber = rawdata['Payee'][i];
                print(accnumber);
              }
            }
          }
        });
      }
    });
    return accnumber;
  }

  Future<void> gettransactions() async {
    int accnumber = 0;
    List<Transactionsclass> transaction = [];
    await FirebaseFirestore.instance
        .collection('Transactions')
        .get()
        .then((QuerySnapshot querySnapshot) {
      // Process the data in the query snapshot

      if (querySnapshot.size == 0) {
      } else {
        querySnapshot.docs.forEach((doc) {
          var rawdata = doc.data() as Map<String, dynamic>;
          // print(doc.id);
          if (Mydata.accnumber == rawdata['t24'][0]) {
          List<dynamic> data = rawdata['t24'];
          Transactionsclass t = Transactionsclass(
              amount: data[2].toString(),
              date: data[3],
              fromacc: data[0].toString(),
              toacc: data[1].toString());
          transaction.add(t);
          print(t);
          }
        });
      }
    });
    Mydata.transaction = transaction;
  }

  void write(
      String fromacc, String toacc, String amount, BuildContext context) async {
    final docRef = db.collection('Transactions').doc();
    var appt = {
      "t24": [fromacc, toacc, amount, DateTime.now()]
    };
    await FirebaseFirestore.instance
        .collection('accounts')
        .get()
        .then((QuerySnapshot querySnapshot) {
      // Process the data in the query snapshot

      if (querySnapshot.size == 0) {
      } else {
        querySnapshot.docs.forEach((doc) {
          var rawdata = doc.data() as Map<String, dynamic>;
          if (Mydata.accnumber == rawdata['Account number']) {
            if (int.parse(rawdata['Balance'].toString()) < int.parse(amount)) {
              const snackBar = SnackBar(
                content: Text('You have low Balance'),
              );
              ScaffoldMessenger.of(context).showSnackBar(snackBar);

              return;
            }
          }
        });
      }
    });
    var balance;
    var recbalance;
    FirebaseFirestore.instance
        .collection('accounts')
        .doc(toacc)
        .get()
        .then((var querySnapshot) {
      var rdata = querySnapshot.data() as Map<String, dynamic>;
      //  var rdatajson=json.decode(rdata.toString());
      recbalance = rdata['Balance'];
    });
    await FirebaseFirestore.instance
        .collection('accounts')
        .get()
        .then((QuerySnapshot querySnapshot) {
      // Process the data in the query snapshot

      if (querySnapshot.size == 0) {
      } else {
        querySnapshot.docs.forEach((doc) {
          var rawdata = doc.data() as Map<String, dynamic>;

          if (Mydata.accnumber == rawdata['Account number']) {
            balance = rawdata['Balance'];
            FirebaseFirestore.instance
                .collection('accounts')
                .doc(Mydata.accnumber.toString())
                .update({
              'Balance': int.parse(balance.toString()) - int.parse(amount)
            });
            FirebaseFirestore.instance
                .collection('accounts')
                .doc(toacc)
                .update({
              'Balance': int.parse(recbalance.toString()) + int.parse(amount)
            });
            Mydata.balance =
                (int.parse(Mydata.balance) - int.parse(amount)).toString();
          }
        });
      }
    });
    await docRef.set(appt).then(
        (value) => print("Appointment booked successfully!"),
        onError: (e) => print("Error booking appointment: $e"));
  }
}
