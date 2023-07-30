import 'dart:convert';
import 'package:finovo/Data/data.dart';
import 'package:finovo/Screens/faq.dart';
import 'package:finovo/core/utils/color_constant.dart';
import 'package:finovo/core/utils/size_utils.dart';
import 'package:finovo/presentation/home_screen/widgets/listbalance_item_widget.dart';
import 'package:finovo/presentation/home_screen/widgets/listvideocamera_item_widget.dart';
import 'package:finovo/services/crud.dart';
import 'package:finovo/theme/app_decoration.dart';
import 'package:finovo/theme/app_style.dart';
import 'package:finovo/widgets/app_bar/appbar_circleimage.dart';
import 'package:finovo/widgets/app_bar/appbar_image.dart';
import 'package:finovo/widgets/app_bar/appbar_title.dart';
import 'package:finovo/widgets/app_bar/custom_app_bar.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_chatgpt_api/flutter_chatgpt_api.dart';
import 'package:chat_gpt_sdk/chat_gpt_sdk.dart';
import 'package:http/http.dart' as http;
import 'package:google_mlkit_translation/google_mlkit_translation.dart';
import 'package:translator/translator.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late OpenAI? chatGPT;
  final translator = GoogleTranslator();
  bool isTranslate = true;
  bool isloded = false;
  final stt.SpeechToText _speachtotext = stt.SpeechToText();
  String speechToText = "Press the button and start speaking";

  Future<String> translate(String text) async {
    var output;
    await translator.translate(text, to: 'en').then((value) {
      setState(() {
        output = value;

        isTranslate = true;
      });
    });
    print(output.toString());
    return output.toString();
  }

  void speachtotext() {
    const url = "https://api.assemblyai.com/v2/upload";
  }

  bool isListening = false;
  bool isListening1 = false;
  TextEditingController group420Controller = TextEditingController();

  GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  late String responce;
  String _text = "Press the button and start speaking";
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
      "prompt": "Extract numerical amount and proper noun from $text",
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

  listen() async {
    if (isListening == false) {
      bool available = await _speachtotext.initialize(
          onStatus: (v) => {}, onError: (v) => {});
      if (available) {
        setState(() {
          isListening = true;
        });
        _speachtotext.listen(
          onResult: (value) {
            speechToText = value.recognizedWords;
          },
          localeId: 'hi-IN',
        );
      }
    } else {
      setState(() {
        isListening = false;
      });
    }
  }

  gett() async {
    await Crud().gettransactions();
    setState(() {
      isloded = true;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    gett();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    String output = "";
    // return Scaffold(
    //   appBar: AppBar(title: Text('Speech to Text Example')),
    //   body: Center(
    //     child: Column(
    //       mainAxisAlignment: MainAxisAlignment.center,
    //       children: [
    //         Text(isListening ? _text : speechToText),
    //         ElevatedButton(
    //           onPressed: () async {
    //             await listeneng();
    //             output = await send(speechToText);
    //             var output2 = json.decode(output);
    //             print("output");
    //             print(output2);
    //             // var output3=json.decode(output2['choices'][0]['text']);
    //             var ans = output2['choices'][0]['text'].toString();
    //             String amount = "";
    //             for (int i = 0; i < ans.length; i++) {
    //               if (ans.codeUnitAt(i) >= 48 && ans.codeUnitAt(i) <= 57) {
    //                 amount = amount + ans[i];
    //               } else {
    //                 amount = amount;
    //               }
    //             }
    //             String name = output2['choices'][0]['text']
    //                 .toString()
    //                 .substring(34 + amount.length);
    //             if (name.isNotEmpty && amount.isNotEmpty) {
    //                                 int toacc = await Crud().getpayeenaccnumber(name);

    //               Crud().write("",toacc.toString(),amount);
    //             }
    //           },
    //           child: Text(isListening1
    //               ? "Stop Listening"
    //               : "Start Listening in English"),
    //         ),
    //         SizedBox(
    //           height: 20,
    //         ),
    //         ElevatedButton(
    //           onPressed: () async {
    //             await listen();

    //             output = await send(speechToText);
    //             var output2 = json.decode(output);
    //             print("output");
    //             print(output2);
    //             // var output3=json.decode(output2['choices'][0]['text']);
    //             var ans = output2['choices'][0]['text'].toString();
    //             String amount = "";
    //             for (int i = 0; i < ans.length; i++) {
    //               if (ans.codeUnitAt(i) >= 48 && ans.codeUnitAt(i) <= 57) {
    //                 amount = amount + ans[i];
    //               } else {
    //                 amount = amount;
    //               }
    //             }
    //             String name = output2['choices'][0]['text']
    //                 .toString()
    //                 .substring(34 + amount.length);
    //             if (name.isNotEmpty && amount.isNotEmpty) {
    //               int toacc = await Crud().getpayeenaccnumber(name);

    //               Crud().write("",toacc.toString(),amount);
    //             }
    //           },
    //           child: Text(
    //               isListening ? "Stop Listening" : "Start Listening in Hindi"),
    //         ),
    //       ],
    //     ),
    //   ),
    // );
    return Stack(
      children: [
        Image.asset(
          "assets/background.jpg",
          width: width,
          height: height,
          fit: BoxFit.cover,
        ),
        SafeArea(
            child: Scaffold(
          key: _scaffoldKey,
          backgroundColor: Colors.transparent,
          appBar: CustomAppBar(
              height: getVerticalSize(122),
              centerTitle: true,
              title:
                  Column(mainAxisAlignment: MainAxisAlignment.start, children: [
                Row(children: [
                  AppbarImage(
                      height: getSize(24),
                      width: getSize(24),
                      //svgPath: ImageConstant.imgMenu,
                      margin: getMargin(top: 5, bottom: 6),
                      onTap: () {
                        onTapMenu(context);
                      }),
                  AppbarTitle(
                      text: "HomePage",
                      margin: getMargin(left: 133, top: 13, bottom: 6)),
                ]),
                SizedBox(
                  height: 30,
                )
              ]),
              styleType: Style.bgFillWhiteA700),
          body: isloded
              ? SizedBox(
                  width: size.width,
                  child: SingleChildScrollView(
                      child: Padding(
                          padding: getPadding(left: 24, top: 24, bottom: 5),
                          child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Padding(
                                    padding: getPadding(right: 24),
                                    child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text("My Card",
                                              overflow: TextOverflow.ellipsis,
                                              textAlign: TextAlign.left,
                                              style:
                                                  AppStyle.txtInterSemiBold16),
                                          GestureDetector(
                                              onTap: () {
                                                onTapTxtSeeAll(context);
                                              },
                                              child: Padding(
                                                  padding:
                                                      getPadding(bottom: 2),
                                                  child: Text("",
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                      textAlign: TextAlign.left,
                                                      style: AppStyle
                                                          .txtInterSemiBold14)))
                                        ])),
                                Align(
                                    alignment: Alignment.center,
                                    child: Container(
                                        height: getVerticalSize(184),
                                        child: ListView.separated(
                                            padding: getPadding(top: 14),
                                            scrollDirection: Axis.horizontal,
                                            separatorBuilder: (context, index) {
                                              return SizedBox(
                                                  height: getVerticalSize(20));
                                            },
                                            itemCount: 1,
                                            itemBuilder: (context, index) {
                                              return Center(
                                                  child:
                                                      ListbalanceItemWidget());
                                            }))),
                                SizedBox(
                                  height: 40,
                                ),
                                Center(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(isListening ? _text : speechToText,style: TextStyle(color: Colors.white),),
                                      ElevatedButton(
                                        onPressed: () async {
                                          await listeneng();
                                          output = await send(speechToText);
                                          var output2 = json.decode(output);
                                          print("output");
                                          print(output2);
                                          // var output3=json.decode(output2['choices'][0]['text']);
                                          var ans = output2['choices'][0]
                                                  ['text']
                                              .toString();
                                          String amount = "";
                                          for (int i = 0; i < ans.length; i++) {
                                            if (ans.codeUnitAt(i) >= 48 &&
                                                ans.codeUnitAt(i) <= 57) {
                                              amount = amount + ans[i];
                                            } else {
                                              amount = amount;
                                            }
                                          }
                                          String name = output2['choices'][0]
                                                  ['text']
                                              .toString()
                                              .substring(34 + amount.length);
                                          if (name.isNotEmpty &&
                                              amount.isNotEmpty) {
                                            int toacc = await Crud()
                                                .getpayeenaccnumber(name);

                                            Crud().write(
                                                Mydata.accnumber.toString(),
                                                toacc.toString(),
                                                amount,
                                                context);gett();
                                          }
                                        },
                                        child: Text(isListening1
                                            ? "Stop Listening"
                                            : "Start Listening in English"),
                                      ),
                                      SizedBox(
                                        height: 20,
                                      ),
                                      ElevatedButton(
                                        onPressed: () async {
                                          await listen();

                                          output = await send(speechToText);
                                          var output2 = json.decode(output);
                                          print("output");
                                          print(output2);
                                          // var output3=json.decode(output2['choices'][0]['text']);
                                          var ans = output2['choices'][0]
                                                  ['text']
                                              .toString();
                                          String amount = "";
                                          for (int i = 0; i < ans.length; i++) {
                                            if (ans.codeUnitAt(i) >= 48 &&
                                                ans.codeUnitAt(i) <= 57) {
                                              amount = amount + ans[i];
                                            } else {
                                              amount = amount;
                                            }
                                          }
                                          String name = output2['choices'][0]
                                                  ['text']
                                              .toString()
                                              .substring(34 + amount.length);
                                          if (name.isNotEmpty &&
                                              amount.isNotEmpty) {
                                            int toacc = await Crud()
                                                .getpayeenaccnumber(name);

                                            Crud().write(
                                                Mydata.accnumber.toString(),
                                                toacc.toString(),
                                                amount,
                                                context);
                                          }
                                          gett();
                                        },
                                        child: Text(isListening
                                            ? "Stop Listening"
                                            : "Start Listening in Hindi"),
                                      ),
                                      // ElevatedButton(
                                      //   onPressed: () async {
                                      //         gett();

                                      //   },
                                      //   child: Text(isListening
                                      //       ? "Stop Listening"
                                      //       : "Start Listening in Hindi"),
                                      // ),
                                    ],
                                  ),
                                ),
                                Padding(
                                    padding: getPadding(top: 22),
                                    child: Text("Transaction",
                                        overflow: TextOverflow.ellipsis,
                                        textAlign: TextAlign.left,
                                        style: AppStyle.txtInterSemiBold16)),
                                Container(
                                    margin: getMargin(top: 16, right: 24),
                                    padding: getPadding(
                                        left: 19,
                                        top: 20,
                                        right: 19,
                                        bottom: 20),
                                    decoration: AppDecoration.fillWhiteA700
                                        .copyWith(
                                            borderRadius: BorderRadiusStyle
                                                .roundedBorder15),
                                    child: ListView.builder(
                                        physics: NeverScrollableScrollPhysics(),
                                        shrinkWrap: true,
                                        itemCount: Mydata.transaction.length,
                                        itemBuilder: (context, index) {
                                          // print(Mydata
                                          //               .transaction[index].date.seconds);
                                          // var date1 =  DateTime.fromMillisecondsSinceEpoch(Mydata
                                          //               .transaction[index].date.toDate());

                                          return Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Card(
                                              color: Colors.black12,
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(8.0),
                                                child: Column(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      "To Account Number: " +
                                                          Mydata
                                                              .transaction[
                                                                  index]
                                                              .toacc
                                                              .toString(),
                                                    ),
                                                    Text(
                                                      "Amount" +
                                                          Mydata
                                                              .transaction[
                                                                  index]
                                                              .amount
                                                              .toString(),
                                                    ),
                                                    Text(
                                                      "Date : " +
                                                          Mydata
                                                              .transaction[
                                                                  index]
                                                              .date
                                                              .toDate()
                                                              .toString()
                                                              .substring(0, 10),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          );
                                        })),
                              ]))))
              : Center(child: CircularProgressIndicator()),
          floatingActionButton: FloatingActionButton(
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => const FAQ()));
            },
            child: Text("FAQ"),
          ),
        )),
      ],
    );
  }

  onTapTxtSeeAll(BuildContext context) {}

  onTapMenu(BuildContext context) {
    _scaffoldKey.currentState?.openDrawer();
  }
}
