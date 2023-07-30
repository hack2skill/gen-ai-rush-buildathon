import 'dart:ui';
import 'package:flutter/material.dart';

class ColorConstant {
  static Color whiteA700B2 = fromHex('#b2ffffff');

  static Color red700 = fromHex('#d13329');

  static Color green600 = fromHex('#359766');

  static Color gray300Cc = fromHex('#cce6e3e7');

  static Color pinkA200 = fromHex('#fe5c73');

  static Color black900 = fromHex('#000000');

  static Color blueGray800 = fromHex('#343c6a');

  static Color blueGray900 = fromHex('#182651');

  static Color indigo60014 = fromHex('#14314ca3');

  static Color blueGray400 = fromHex('#888ea2');

  static Color blueGray600 = fromHex('#505887');

  static Color teal50 = fromHex('#dfeaf2');

  static Color gray300 = fromHex('#e3e4e8');

  static Color blueGray80001 = fromHex('#333b69');

  static Color gray100 = fromHex('#f4f6fa');

  static Color tealA400 = fromHex('#15dba9');

  static Color gray10003 = fromHex('#f4f6f9');

  static Color indigo300 = fromHex('#7a8fd0');

  static Color gray10002 = fromHex('#f2f4f7');

  static Color indigo100 = fromHex('#c6cfeb');

  static Color gray10005 = fromHex('#f3f3f5');

  static Color indigo200 = fromHex('#8e9ed6');

  static Color gray10004 = fromHex('#f4f5f7');

  static Color whiteA70026 = fromHex('#26ffffff');

  static Color gray10001 = fromHex('#f4f4f6');

  static Color blueGray40002 = fromHex('#888888');

  static Color blueGray40001 = fromHex('#8c8f9d');

  static Color indigo700 = fromHex('#2943a1');

  static Color whiteA700 = fromHex('#ffffff');

  static Color indigo500 = fromHex('#425ebd');

  static Color indigo600 = fromHex('#314ca3');

  static Color indigo30001 = fromHex('#718ebf');

  static Color fromHex(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }
}
