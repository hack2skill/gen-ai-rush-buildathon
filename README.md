
# Team Name - The Centennials
#### Problem Statement - Harnessing the Full Potential of Generative AI: Smartphone users face difficulties in effectively utilizing Generative AI for various tasks, hindering their productivity and creativity.
#### Team Leader Email - kailashps.1011@gmail.com

## A Brief of the Prototype:
  AI Everywhere on Your Smartphone: Our app brings the power of Generative AI to your fingertips, allowing you to access personalized productivity recommendations and mental health support anytime, anywhere.

  <p align="center">
  <a href="https://firebasestorage.googleapis.com/v0/b/palmapi-b548f.appspot.com/o/ggg.png?alt=media&token=f99af299-5506-44df-b1e2-3cc12912de6d">
    <img src="https://firebasestorage.googleapis.com/v0/b/palmapi-b548f.appspot.com/o/ggg.png?alt=media&token=f99af299-5506-44df-b1e2-3cc12912de6d" border="0"></a>
</p>

<p align="center">
  <a href="https://firebasestorage.googleapis.com/v0/b/palmapi-b548f.appspot.com/o/ggg2.png?alt=media&token=8416d2a6-fb27-4518-b2d1-ee660562c010">
    <img src="https://firebasestorage.googleapis.com/v0/b/palmapi-b548f.appspot.com/o/ggg2.png?alt=media&token=8416d2a6-fb27-4518-b2d1-ee660562c010" border="0">
  </a>
</p>

  
## Tech Stack

Following latest Android Norms

- Kotlin DSl used (with version catalog .toml file)
- Ime Service in Jetpack Compose
- Accessibility service
- Ktor-Client used.
- Account Manager for Android.
- Node JS for Backend
- Llama Index
- MBTI Personality Prediction Model

### Android 
| Name | Description |
| --- | --- |
| [`@compose`](https://developer.android.com/jetpack/compose) | Jetpack Compose |
| [`@materialUI`](https://m3.material.io/) | Material 3 |
| [`@ktor-client`](https://ktor.io/docs/create-client.html) | Ktor CLient |
| [`@navigation-compose`](https://developer.android.com/jetpack/compose/navigation) | Navigation Compose |
| [`@coil`](https://coil-kt.github.io/coil/compose/) | Coil-Compose |
| [`@ksp-room`](https://developer.android.com/build/migrate-to-ksp) | Room Android |
| [`@dagger-hilt`](https://developer.android.com/training/dependency-injection/hilt-android) | Dagger-hilt |
| [`@camera-x`](https://developer.android.com/training/camerax) | Camera-X |
| [`@mlkit`](https://developers.google.com/ml-kit) | MLKit-Google |
| [`@keyboard-compose`](https://kotlinlang.org/api/latest/jvm/stdlib/) | Kotlin-STDLIB |

### Manifest Overview

| Permissions | Required |
| --- | --- |
| Internet | Yes |
| Post Notifications (33+) | Optional |
| Accessibility Service | Optional (Required only when you want to use) |
| Read Accounts | Yes |
| Camera | Optional (For ML-KIT) |
| Record Audio | Optional (For Speech-to-text) |

## Services Used
| Name | Description |
| --- | --- |
| Accessibility | To call AI from Anywhere in Android. |
| IME SERVICE | To use inbuilt AI Keyboard |
| Authenticator | (Required) To manage Accounts on your Device |

   
## Step-by-Step Code Execution Instructions:
  - The Following project was build using `AGP 8.1.0`
-  Check your Android Studio's AGP.
-  If it is `lower` than given AGP follow given steps :-
-  -  #### Go to gradle/libs.version.toml
   -  #### In [versions] change value of AGP as per requirement
  
   
## Acknowledgements

 - [Kotlin docs](https://kotlinlang.org/)
 - [Developer Docs](https://developer.android.com/)
 

