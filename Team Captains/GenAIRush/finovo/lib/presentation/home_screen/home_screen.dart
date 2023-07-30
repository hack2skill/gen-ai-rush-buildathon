import 'package:finovo/core/utils/color_constant.dart';
import 'package:finovo/core/utils/size_utils.dart';
import 'package:finovo/theme/app_decoration.dart';
import 'package:finovo/theme/app_style.dart';
import 'package:finovo/widgets/app_bar/appbar_circleimage.dart';
import 'package:finovo/widgets/app_bar/appbar_image.dart';
import 'package:finovo/widgets/app_bar/appbar_title.dart';
import 'package:finovo/widgets/app_bar/custom_app_bar.dart';

import '../home_screen/widgets/listbalance_item_widget.dart';
import '../home_screen/widgets/listvideocamera_item_widget.dart';

import 'package:flutter/material.dart';


// ignore_for_file: must_be_immutable
class HomeScreen extends StatelessWidget {
  TextEditingController group420Controller = TextEditingController();

  GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            key: _scaffoldKey,
            backgroundColor: ColorConstant.gray100,
            appBar: CustomAppBar(
                height: getVerticalSize(122),
                centerTitle: true,
                title: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
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
                        AppbarCircleimage(
                            //imagePath: ImageConstant.imgEllipse3735x35,
                            margin: getMargin(left: 82))
                      ]),
                      SizedBox(
                        height: 30,
                      )
                    ]),
                styleType: Style.bgFillWhiteA700),
            body: SizedBox(
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
                                            style: AppStyle.txtInterSemiBold16),
                                        GestureDetector(
                                            onTap: () {
                                              onTapTxtSeeAll(context);
                                            },
                                            child: Padding(
                                                padding: getPadding(bottom: 2),
                                                child: Text("",
                                                    overflow:
                                                        TextOverflow.ellipsis,
                                                    textAlign: TextAlign.left,
                                                    style: AppStyle
                                                        .txtInterSemiBold14)))
                                      ])),
                              Align(
                                  alignment: Alignment.centerRight,
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
                                            return ListbalanceItemWidget();
                                          }))),
                              Padding(
                                  padding: getPadding(top: 22),
                                  child: Text("Transaction",
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.left,
                                      style: AppStyle.txtInterSemiBold16)),
                              Container(
                                  margin: getMargin(top: 16, right: 24),
                                  padding: getPadding(
                                      left: 19, top: 20, right: 19, bottom: 20),
                                  decoration: AppDecoration.fillWhiteA700
                                      .copyWith(
                                          borderRadius: BorderRadiusStyle
                                              .roundedBorder15),
                                  child: ListView.separated(
                                      physics: NeverScrollableScrollPhysics(),
                                      shrinkWrap: true,
                                      separatorBuilder: (context, index) {
                                        return SizedBox(
                                            height: getVerticalSize(12));
                                      },
                                      itemCount: 3,
                                      itemBuilder: (context, index) {
                                        return ListvideocameraItemWidget();
                                      })),
                              
                              
                              
                              
                              
                              
                             
                              
                            ]))))));
  }

  onTapTxtSeeAll(BuildContext context) {}

  onTapMenu(BuildContext context) {
    _scaffoldKey.currentState?.openDrawer();
  }
}
