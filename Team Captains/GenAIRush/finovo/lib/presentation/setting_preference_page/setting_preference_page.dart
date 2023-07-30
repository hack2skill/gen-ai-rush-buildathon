import 'package:finovo/core/utils/size_utils.dart';
import 'package:finovo/theme/app_style.dart';
import 'package:finovo/widgets/custom_button.dart';
import 'package:finovo/widgets/custom_text_form_field.dart';
import 'package:flutter/material.dart';


// ignore_for_file: must_be_immutable
class SettingPreferencePage extends StatefulWidget {
  @override
  _SettingPreferencePageState createState() => _SettingPreferencePageState();
}

class _SettingPreferencePageState extends State<SettingPreferencePage>
    with AutomaticKeepAliveClientMixin<SettingPreferencePage> {
  TextEditingController currencyOneController = TextEditingController();

  TextEditingController timezoneOneController = TextEditingController();

  @override
  bool get wantKeepAlive => true;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.transparent,
        resizeToAvoidBottomInset: false,
        body: SizedBox(
          width: size.width,
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: getPadding(
                    left: 20,
                    top: 23,
                    right: 20,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Account Number",
                        
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.left,
                        style: AppStyle.txtInterRegular13Bluegray400,
                      ),
                      CustomTextFormField(
                        focusNode: FocusNode(),
                        controller: currencyOneController,
                        hintText: "A/c",
                        margin: getMargin(
                          top: 7,
                        ),
                      ),
                      Padding(
                        padding: getPadding(
                          top: 16,
                        ),
                        child: Text(
                          "Name",
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: AppStyle.txtInterRegular13Bluegray400,
                        ),
                      ),
                      CustomTextFormField(
                        focusNode: FocusNode(),
                        controller: timezoneOneController,
                        hintText: "Enter payee name",
                        margin: getMargin(
                          top: 8,
                        ),
                        textInputAction: TextInputAction.done,
                      ),
            
                      CustomButton(
                        height: getVerticalSize(
                          40,
                        ),
                        text: "Save",
                        margin: getMargin(
                          top: 17,
                        ),
                        shape: ButtonShape.RoundedBorder7,
                        padding: ButtonPadding.PaddingAll11,
                        fontStyle: ButtonFontStyle.InterMedium15WhiteA700,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
