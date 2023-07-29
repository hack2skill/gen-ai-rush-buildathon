import 'dart:convert';

import 'package:bannerbot_youtube_thumbnail/src/constants.dart';
import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/generate_thumbnails_actions.dart';
import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/models/chat_message.dart';
import 'package:bannerbot_youtube_thumbnail/src/modules/generate_thumbnails/widgets/thumbnails_container.dart';
import 'package:bannerbot_youtube_thumbnail/src/utils/common.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/bot_or_user_message_bubble.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_colors.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_text.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/custom_text_form_field.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/heading.dart';
import 'package:bannerbot_youtube_thumbnail/src/widgets/system_message.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class GenerateThumbnailsScreen extends StatefulWidget {
  static const routeName = '/generate-thumbnails';

  const GenerateThumbnailsScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _GenerateThumbnailsScreen();
}

class _GenerateThumbnailsScreen extends State<GenerateThumbnailsScreen> {
  List<ChatMessage> chatMessages = [
    ChatMessage(
        content: AiBotConstants.introMessageForBannerGpt,
        role: ChatRole.assistant),
    ...AiBotConstants.bannerGptExamplePrompts
        .map((item) => ChatMessage(content: item, role: ChatRole.system))
  ];
  bool apiCallInProgress = false;

  TextEditingController bannerGptPromptController = TextEditingController();
  ScrollController listViewController = ScrollController();

  @override
  void initState() {
    super.initState();
  }

  void onChatMessageLongPress(ChatMessage chatItem) {
    if (chatItem.role == ChatRole.assistant) {
      return;
    }
    Clipboard.setData(ClipboardData(text: chatItem.content)).then((value) {
      showToastMessage('Copied to Clipboard');
    });
  }

  void onSendPress() {
    String prompt = bannerGptPromptController.text;
    if (prompt.isEmpty) {
      return;
    }

    setState(() {
      chatMessages = [
        ...chatMessages,
        ChatMessage(content: prompt, role: ChatRole.user)
      ];
      apiCallInProgress = true;
    });
    bannerGptPromptController.text = '';

    // adding delay so that list view is scrolled after setState re-render has been completed
    Future.delayed(const Duration(milliseconds: 100), () {
      listViewController.jumpTo(listViewController.position.maxScrollExtent);
    });

    getThumbnailsData(prompt).then((response) {
      String botMessage = jsonEncode(response);
      setState(() {
        chatMessages = [
          ...chatMessages,
          ChatMessage(content: botMessage, role: ChatRole.assistant)
        ];
      });
    }).catchError((error) {
      logApiErrorAndShowMessage(context, exception: error);
    }).then((value) {
      setState(() {
        apiCallInProgress = false;
      });
      Future.delayed(const Duration(milliseconds: 100), () {
        listViewController.jumpTo(listViewController.position.maxScrollExtent);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Heading(
          'BannerBot - Youtube Thumbnails',
          type: HeadingType.h4,
        ),
        backgroundColor: CustomColors.darkBackground,
      ),
      body: Stack(children: [
        Container(
            margin: const EdgeInsets.only(bottom: 80),
            child: ListView.builder(
                controller: listViewController,
                itemCount: chatMessages.length,
                shrinkWrap: true,
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.only(top: 12, bottom: 12),
                itemBuilder: (context, index) {
                  var chatItem = chatMessages[index];
                  bool fromBot = chatItem.role == ChatRole.assistant;
                  bool fromSystem = chatItem.role == ChatRole.system;
                  return GestureDetector(
                    onLongPress: () {
                      onChatMessageLongPress(chatItem);
                    },
                    child: fromSystem
                        ? SystemMessage(content: chatItem.content)
                        : BotOrUserMessageBubble(
                            fromBot: fromBot,
                            child: fromBot && index != 0
                                ? ThumbnailsContainer(
                                    openAiResponse: chatItem.content)
                                : CustomText(chatItem.content),
                          ),
                  );
                })),
        Align(
          alignment: Alignment.bottomLeft,
          child: Container(
              margin:
                  const EdgeInsets.only(top: 8, left: 8, right: 8, bottom: 8),
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      margin: const EdgeInsets.only(right: 8),
                      child: CustomTextFormField(
                          onChanged: (value) => {},
                          controller: bannerGptPromptController,
                          minLines: 1,
                          maxLines: 5,
                          textInputType: TextInputType.multiline,
                          hintText: 'Your prompt to generate banner'),
                    ),
                  ),
                  Ink(
                    decoration: const ShapeDecoration(
                      color: CustomColors.secondary,
                      shape: CircleBorder(),
                    ),
                    width: 48,
                    height: 48,
                    child: apiCallInProgress
                        ? const CircularProgressIndicator(
                            color: CustomColors.primary,
                          )
                        : IconButton(
                            tooltip: 'Send',
                            onPressed: onSendPress,
                            color: CustomColors.primary,
                            icon: const Icon(Icons.send_rounded)),
                  )
                ],
              )),
        )
      ]),
    );
  }
}
