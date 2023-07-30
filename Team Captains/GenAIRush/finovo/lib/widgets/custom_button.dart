import 'package:finovo/core/utils/color_constant.dart';
import 'package:finovo/core/utils/size_utils.dart';
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  CustomButton(
      {this.shape,
      this.padding,
      this.variant,
      this.fontStyle,
      this.alignment,
      this.margin,
      this.onTap,
      this.width,
      this.height,
      this.text,
      this.prefixWidget,
      this.suffixWidget});

  ButtonShape? shape;

  ButtonPadding? padding;

  ButtonVariant? variant;

  ButtonFontStyle? fontStyle;

  Alignment? alignment;

  EdgeInsetsGeometry? margin;

  VoidCallback? onTap;

  double? width;

  double? height;

  String? text;

  Widget? prefixWidget;

  Widget? suffixWidget;

  @override
  Widget build(BuildContext context) {
    return alignment != null
        ? Align(
            alignment: alignment!,
            child: _buildButtonWidget(),
          )
        : _buildButtonWidget();
  }

  _buildButtonWidget() {
    return Padding(
      padding: margin ?? EdgeInsets.zero,
      child: TextButton(
        onPressed: onTap,
        style: _buildTextButtonStyle(),
        child: _buildButtonWithOrWithoutIcon(),
      ),
    );
  }

  _buildButtonWithOrWithoutIcon() {
    if (prefixWidget != null || suffixWidget != null) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          prefixWidget ?? SizedBox(),
          Text(
            text ?? "",
            textAlign: TextAlign.center,
            style: _setFontStyle(),
          ),
          suffixWidget ?? SizedBox(),
        ],
      );
    } else {
      return Text(
        text ?? "",
        textAlign: TextAlign.center,
        style: _setFontStyle(),
      );
    }
  }

  _buildTextButtonStyle() {
    return TextButton.styleFrom(
      fixedSize: Size(
        width ?? double.maxFinite,
        height ?? getVerticalSize(40),
      ),
      padding: _setPadding(),
      backgroundColor: _setColor(),
      side: _setTextButtonBorder(),
      shadowColor: _setTextButtonShadowColor(),
      shape: RoundedRectangleBorder(
        borderRadius: _setBorderRadius(),
      ),
    );
  }

  _setPadding() {
    switch (padding) {
      case ButtonPadding.PaddingAll14:
        return getPadding(
          all: 15,
        );
      case ButtonPadding.PaddingT11:
        return getPadding(
          left: 12,
          top: 12,
          bottom: 12,
        );
      case ButtonPadding.PaddingAll11:
        return getPadding(
          all: 10,
        );
      default:
        return getPadding(
          all: 5,
        );
    }
  }

  _setColor() {
    switch (variant) {
      case ButtonVariant.FillIndigo60014:
        return ColorConstant.indigo60014;
      case ButtonVariant.OutlineGray300cc:
        return ColorConstant.indigo600;
      case ButtonVariant.OutlineIndigo500:
        return null;
      default:
        return ColorConstant.indigo600;
    }
  }

  _setTextButtonBorder() {
    switch (variant) {
      case ButtonVariant.OutlineIndigo500:
        return BorderSide(
          color: ColorConstant.indigo500,
          width: getHorizontalSize(
            1.00,
          ),
        );
      case ButtonVariant.FillIndigo60014:
      case ButtonVariant.FillIndigo600:
      case ButtonVariant.OutlineGray300cc:
        return null;
      default:
        return null;
    }
  }

  _setTextButtonShadowColor() {
    switch (variant) {
      case ButtonVariant.OutlineGray300cc:
        return ColorConstant.gray300Cc;
      case ButtonVariant.OutlineIndigo500:
      case ButtonVariant.FillIndigo60014:
      case ButtonVariant.FillIndigo600:
        return null;
      default:
        return null;
    }
  }

  _setBorderRadius() {
    switch (shape) {
      case ButtonShape.RoundedBorder15:
        return BorderRadius.circular(
          getHorizontalSize(
            15.00,
          ),
        );
      case ButtonShape.CircleBorder25:
        return BorderRadius.circular(
          getHorizontalSize(
            25.00,
          ),
        );
      case ButtonShape.CircleBorder20:
        return BorderRadius.circular(
          getHorizontalSize(
            20.00,
          ),
        );
      case ButtonShape.RoundedBorder7:
        return BorderRadius.circular(
          getHorizontalSize(
            7.00,
          ),
        );
      case ButtonShape.Square:
        return BorderRadius.circular(0);
      default:
        return BorderRadius.circular(
          getHorizontalSize(
            12.00,
          ),
        );
    }
  }

  _setFontStyle() {
    switch (fontStyle) {
      case ButtonFontStyle.InterMedium16:
        return TextStyle(
          color: ColorConstant.blueGray400,
          fontSize: getFontSize(
            16,
          ),
          fontFamily: 'Inter',
          fontWeight: FontWeight.w500,
          height: getVerticalSize(
            1.25,
          ),
        );
      case ButtonFontStyle.InterRegular18:
        return TextStyle(
          color: ColorConstant.whiteA700,
          fontSize: getFontSize(
            18,
          ),
          fontFamily: 'Inter',
          fontWeight: FontWeight.w400,
          height: getVerticalSize(
            1.22,
          ),
        );
      case ButtonFontStyle.InterMedium13WhiteA700:
        return TextStyle(
          color: ColorConstant.whiteA700,
          fontSize: getFontSize(
            13,
          ),
          fontFamily: 'Inter',
          fontWeight: FontWeight.w500,
          height: getVerticalSize(
            1.23,
          ),
        );
      case ButtonFontStyle.InterMedium12WhiteA700:
        return TextStyle(
          color: ColorConstant.whiteA700,
          fontSize: getFontSize(
            12,
          ),
          fontFamily: 'Inter',
          fontWeight: FontWeight.w500,
          height: getVerticalSize(
            1.25,
          ),
        );
      case ButtonFontStyle.InterMedium15WhiteA700:
        return TextStyle(
          color: ColorConstant.whiteA700,
          fontSize: getFontSize(
            15,
          ),
          fontFamily: 'Inter',
          fontWeight: FontWeight.w500,
          height: getVerticalSize(
            1.27,
          ),
        );
      default:
        return TextStyle(
          color: ColorConstant.indigo500,
          fontSize: getFontSize(
            12,
          ),
          fontFamily: 'Inter',
          fontWeight: FontWeight.w500,
          height: getVerticalSize(
            1.25,
          ),
        );
    }
  }
}

enum ButtonShape {
  Square,
  RoundedBorder12,
  RoundedBorder15,
  CircleBorder25,
  CircleBorder20,
  RoundedBorder7,
}

enum ButtonPadding {
  PaddingAll3,
  PaddingAll14,
  PaddingT11,
  PaddingAll11,
}

enum ButtonVariant {
  OutlineIndigo500,
  FillIndigo60014,
  FillIndigo600,
  OutlineGray300cc,
}

enum ButtonFontStyle {
  InterMedium12Indigo500_1,
  InterMedium16,
  InterRegular18,
  InterMedium13WhiteA700,
  InterMedium12WhiteA700,
  InterMedium15WhiteA700,
}
