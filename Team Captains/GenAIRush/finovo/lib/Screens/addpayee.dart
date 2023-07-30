import 'package:finovo/Screens/Home.dart';
import 'package:finovo/services/crud.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:google_fonts/google_fonts.dart';

class Addpayee extends StatefulWidget {
  const Addpayee({super.key});

  @override
  State<Addpayee> createState() => _AddpayeeState();
}

class _AddpayeeState extends State<Addpayee> {
  final TextEditingController accountnumber = TextEditingController();
  final TextEditingController name = TextEditingController();
  bool load = false;
  bool selected = true;
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Stack(
      children: [
        Container(width: width,height: height,child: Image.asset("assets/background.jpg",fit: BoxFit.cover,)),
        Scaffold(backgroundColor: Colors.transparent,
          // appBar: AppBar(backgroundColor: Colors.black,
          //   title: Text("Finovo"),
          // ),
          body: Container(
            child: Column(
              children: [
                SizedBox(height: height/25,),
                Text("Finovo",style: TextStyle(color: Colors.white,fontSize: 35),),            SizedBox(height: height/8,),

                Padding(
                  padding: const EdgeInsets.only(left: 22, right: 22, top: 8),
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: TextField(
                      controller: accountnumber,
                      style: TextStyle(color: Colors.white),
                      onChanged: (String value) {},
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.white),
                            borderRadius: BorderRadius.circular(25),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(width: 3, color: Colors.white),
                            borderRadius: BorderRadius.circular(25),
                          ),
                          fillColor: Colors.white,
                          focusColor: Colors.white,
                          // hintText: "Email",
                          label: const Text(
                            "Account Number",
                            style: TextStyle(color: Colors.white),
                          ),
                          hintStyle: TextStyle(color: Colors.white)),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Padding(
                  padding:
                      const EdgeInsets.only(left: 22, right: 22, bottom: 8, top: 8),
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: TextField(
                      controller: name,
                      style: TextStyle(color: Colors.white),
                      obscureText: true,
                      onChanged: (String value) {},
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.white),
                            borderRadius: BorderRadius.circular(25),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(width: 3, color: Colors.white),
                            borderRadius: BorderRadius.circular(25),
                          ),
                          fillColor: Colors.white,
                          // hintText: "Password",
                          label: Text(
                            "Name",
                            style: TextStyle(color: Colors.white),
                          ),
                          hintStyle: TextStyle(color: Colors.white)),
                    ),
                  ),
                ),
                SizedBox(height: height/10,),
                InkWell(
                  onTap: () {},
                  child: Padding(
                    padding: EdgeInsets.only(
                        top: 0.0, left: width / 10, right: width / 10, bottom: 20.0),
                    child: InkWell(
                      onTap: () async {
                        setState(() {
                          load = !load;
                          selected = !selected;
                        });
                        // AuthService().signInUser(
                        //     context: context,
                        //     email: emailController.text,
                        //     password: passwordController.text);
          // Crud().read();
                        // Navigator.push(
                        //   context,
                        //   MaterialPageRoute(builder: (context) => const Home()),
                        // );
                      },
                      child: AnimatedContainer(
                        width: selected ? width : height / 15,
                        height: height / 20,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                              color: Color.fromARGB(255, 105, 104, 104),
                              blurRadius: 10,
                              spreadRadius: -2,
                              offset: Offset(-2, -2),
                            ),
                            BoxShadow(
                              color: Color.fromARGB(255, 117, 116, 116),
                              blurRadius: 20,
                              spreadRadius: -2,
                              offset: Offset(2, 2),
                            ),
                          ],
                          color: Colors.black,
                          borderRadius: BorderRadius.all(
                            Radius.circular(20.0),
                          ),
                        ),
                        duration: const Duration(milliseconds: 500),
                        child: Column(
                          children: [
                            load
                                ? Container(
                                    width: width / 1.2,
                                    height: 40,
                                    child: Center(child: CircularProgressIndicator()),
                                  )
                                : Padding(
                                    padding: EdgeInsets.only(
                                        top: height / 65, right: 20.0),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          "Add", //one8@gmail.com  one812345
                                          style: GoogleFonts.bebasNeue(
                                              fontSize: 20, color: Colors.amber),
                                        ),
                                      ],
                                    ),
                                  ),
                          ],
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ],
    );
  }
}
