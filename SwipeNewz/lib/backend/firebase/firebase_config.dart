import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyBVFvXSKB80IZzFP-e8qIe9ebJjWC_a_WY",
            authDomain: "swipenewz-b87d3.firebaseapp.com",
            projectId: "swipenewz-b87d3",
            storageBucket: "swipenewz-b87d3.appspot.com",
            messagingSenderId: "510150182089",
            appId: "1:510150182089:web:27873b444a7ea5aaa4f918",
            measurementId: "G-2CFMVR99XH"));
  } else {
    await Firebase.initializeApp();
  }
}
