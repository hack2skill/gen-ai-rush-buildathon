import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:http/http.dart' as http;

class FAQ extends StatefulWidget {
  const FAQ({super.key});

  @override
  State<FAQ> createState() => _FAQState();
}

class _FAQState extends State<FAQ> {
  bool isListening1 = false;
  final stt.SpeechToText _speachtotext = stt.SpeechToText();
  String speechToText = "Press the button and start speaking";
 String ans="";

  listeneng() async {
    if (isListening1 == false) {
      bool available = await _speachtotext.initialize(
          onStatus: (v) => {}, onError: (v) => {});
      if (available) {
        setState(() {
          isListening1 = true;
        });
        _speachtotext.listen(
          onResult: (value) {
            speechToText = value.recognizedWords;
          },
        );
      }
      // await send(speechToText).toString();
    } else {
      setState(() {
        isListening1 = false;
      });
    }
  }

  late String responce;

  var output;
  Future<String> send(String text) async {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization':
          'Bearer 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'
    };
    var request = http.Request(
        'POST', Uri.parse('https://api.openai.com/v1/completions'));
    request.body = json.encode({
      "model": "text-davinci-003",
      "prompt": "Yes,This application can be used on multiple devices. Download the app, enter your personal details and create a login to sign up successfully.During the registration process, you'll typically need to provide your full name, date of birth, address, phone number, email, and identification details.Yes, reputable banking apps implement robust security measures to protect user data and transactions, ensuring a safe user experience.To log in, open the app, enter your registered username/email and password, or use biometric authentication if enabled. Biometric authentication is not available in this application. Yes, banking app allow you to transfer funds easily between your linked accounts within the app.To add a new payee for fund transfers, go to the app's Transfer or Payments section, select Add Payee, and provide the payee's details.The daily transaction limit for the banking app may vary depending on the bank's policies and your account type.To set up recurring payments, access the app's Bill Pay or Recurring Payments section, specify payee details, amount, frequency, and duration.You can view your transaction history in the banking app by navigating to the Transactions section.No, you only view in application only.To report a lost or stolen card, go to the app's Card Services or Support section, select the card in question, and report it immediately.To apply for a new credit card or loan through the app, find the Apply or Credit/Loan section, provide necessary details, and follow the application process.Yes, banking app allow you to block or unblock your debit/credit card for added security and convenience.To activate a new debit/credit card, go to the app's Card Services or Manage Cards section, select the new card, and follow the activation instructions.Yes, you can often apply for an overdraft facility through the app by navigating to the Services or Overdraft section and following the application process.To check your account balance on the app, go to the Accounts or Balance section, and your current balance will be displayed. Yes, banking app offer a feature to set spending limits on your debit/credit card for better financial control and security.Yes, you can often request a new checkbook through the app by visiting the Services or Request Checkbook section and following the steps.To change your mobile number or email address on the app, access the Profile or Settings section, select Contact Information, and update the details.If you encounter an error while using the app, try restarting it first. If the issue persists, contact customer support for assistance. To set up account alerts and notifications, access the app's Settings or Notifications section, choose the alert types, and specify your preferences.Yes, banking app allow you to schedule future transactions by selecting the desired date and time during the transfer process.To redeem credit card reward points, access the app's Rewards or Redeem Points section, choose the rewards, and follow the redemption process.Yes, you can often apply for a fixed deposit or investment through the app by visiting the Investments or Fixed Deposit section and following the application process.To update communication preferences, access the app's Profile or Settings section, select Communication Preferences, and customize your settings accordingly.Yes, banking app offer a feature to request a temporary increase in your card's spending limit for specific transactions or time periods. To find the nearest ATM or branch, use the app's Locator or Find Us feature, and it will display nearby locations.To dispute a transaction made through the app, contact customer support immediately and provide details to initiate the dispute process.Yes, many banking apps offer the option to apply for new insurance policies for added convenience and financial services.To set up a travel notification for your card, go to the app's Card Services or Travel Notifications section, specify your travel dates and destinations.Yes, many banking apps allow you to download and export transaction data in formats like CSV for budgeting and financial management.To change your app's login PIN or pattern, go to the app's Security or Settings section, select Change PIN/Pattern, and follow the instructions.Some banking apps offer a feature to split expenses and bills with friends, allowing you to divide costs and make payments collaboratively. banking app offer a feature to split expenses and bills with friends, allowing you to divide costs and make payments collaboratively.To check the status of a loan or credit card application, access the app's Applications or Status section, and look for your specific application. Alternatively, contact customer support for assistance.Yes, you can make bill payments through the app by selecting the Bill Pay or Payments section and following the payment process for your utility, credit card, or other bills.To contact customer support through the app, look for the Support, Help, or Contact Us section. You may find options for chat, email, or phone support.Yes, banking app are available in multiple languages to cater to a diverse range of users and provide a better user experience.If your device supports fingerprint authentication and you have set up your fingerprint as a security method, you should see the option to enable or disable it within the app's security settings. Yes, you can set up recurring transfers to external bank accounts for regular payments through the banking app. ans the question$text",
      "max_tokens": 250,
      "temperature": 0,
      "top_p": 1
    });
    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();
    if (response.statusCode == 200) {
      responce = await response.stream.bytesToString();
      // print("responce");      print(responce);

      return responce;
    } else {
      print(response.reasonPhrase);
      return "Error";
    }
  }
bool load=false;
  @override
  Widget build(BuildContext context) {
        double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Stack(
      children: [          Image.asset("assets/background.jpg",width: width,height: height,fit: BoxFit.cover,),

        Scaffold(backgroundColor: Colors.transparent
        ,
          appBar: AppBar(
            title: Text("FAQ"),
          ),body:Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(ans,style: TextStyle(color: Colors.white,fontSize: 20),),
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: () async {
              setState(() {
                load=true;
              });
              await listeneng();

              output = await send(speechToText);
              var output2 = json.decode(output);
              print("output");
              print(output2);
              // var output3=json.decode(output2['choices'][0]['text']);
               ans = output2['choices'][0]['text'].toString();
              setState(() {
                load=false;
              });
            },
            child: Icon(Icons.search),
          ),
        ),
      ],
    );
  }
}
