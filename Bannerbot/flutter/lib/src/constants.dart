class AiBotConstants {
  static String introMessageForBannerGpt = '''
Hello, I am BannerBot. I can generate Youtube thumbnails for you. 
Tell me about your Youtube video. Use below example prompts to get started.
Note that, I do not remember our previous conversations so your each prompt should be complete in itself.
''';
  static List<String> bannerGptExamplePrompts = [
    "Create a thumbnail for Javascript tutorial video",
    "I am making a video on 'How to earn online using Mobile'. Generate thumbnail for the same.",
  ];
}
