import 'package:finovo/core/utils/size_utils.dart';
import 'package:finovo/theme/app_style.dart';
import 'package:finovo/widgets/custom_button.dart';
import 'package:finovo/widgets/custom_text_form_field.dart';
import 'package:flutter/material.dart';


// ignore_for_file: must_be_immutable
class SettingEditProfilePage extends StatefulWidget {
  @override
  _SettingEditProfilePageState createState() => _SettingEditProfilePageState();
}

class _SettingEditProfilePageState extends State<SettingEditProfilePage>
    with AutomaticKeepAliveClientMixin<SettingEditProfilePage> {
  TextEditingController languageController = TextEditingController();

  TextEditingController languageOneController = TextEditingController();

  TextEditingController emailOneController = TextEditingController();

  TextEditingController passwordOneController = TextEditingController();

  List<String> dropdownItemList = [
    "Item One",
    "Item Two",
    "Item Three",
  ];

  TextEditingController group572Controller = TextEditingController();

  TextEditingController group572OneController = TextEditingController();

  TextEditingController group572TwoController = TextEditingController();

  TextEditingController zipcodeController = TextEditingController();

  TextEditingController group572ThreeController = TextEditingController();

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
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Padding(
                  padding: getPadding(
                    left: 20,
                    top: 25,
                    right: 20,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      
                      Padding(
                        padding: getPadding(
                          top: 22,
                        ),
                        child: Text(
                          "Your Name",
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: AppStyle.txtInterRegular13Bluegray400,
                        ),
                      ),
                      CustomTextFormField(
                        focusNode: FocusNode(),
                        controller: languageController,
                        hintText: "Charlene Reed ",
                        margin: getMargin(
                          top: 8,
                        ),
                      ),
                      Padding(
                        padding: getPadding(
                          top: 16,
                        ),
                        child: Text(
                          "User Name",
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: AppStyle.txtInterRegular13Bluegray400,
                        ),
                      ),
                      CustomTextFormField(
                        focusNode: FocusNode(),
                        controller: languageOneController,
                        hintText: "Charlene Reed ",
                        margin: getMargin(
                          top: 8,
                        ),
                      ),
                      Padding(
                        padding: getPadding(
                          top: 16,
                        ),
                        child: Text(
                          "Email",
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: AppStyle.txtInterRegular13Bluegray400,
                        ),
                      ),
                      CustomTextFormField(
                        focusNode: FocusNode(),
                        controller: emailOneController,
                        hintText: "user@gmail.com ",
                        margin: getMargin(
                          top: 8,
                        ),
                      ),
                      Padding(
                        padding: getPadding(
                          top: 16,
                        ),
                        child: Text(
                          "Password",
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: AppStyle.txtInterRegular13Bluegray400,
                        ),
                      ),
                      CustomTextFormField(
                        focusNode: FocusNode(),
                        controller: passwordOneController,
                        hintText: "**********",
                        margin: getMargin(
                          top: 8,
                        ),
                        textInputType: TextInputType.visiblePassword,
                        isObscureText: true,
                      ),
                      
                      
                      Padding(
                        padding: getPadding(
                          top: 17,
                        ),
                        
                      ),
                      
                      CustomButton(
                        height: getVerticalSize(
                          40,
                        ),
                        text: "Save",
                        margin: getMargin(
                          top: 20,
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