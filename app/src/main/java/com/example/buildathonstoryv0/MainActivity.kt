package com.example.buildathonstoryv0

import android.graphics.BitmapFactory
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.text.SpannableStringBuilder
import android.text.Spanned
import android.text.style.ImageSpan
import android.util.Base64
import android.util.Log
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.ImageButton
import android.widget.TextView
import android.widget.ToggleButton
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.RetryPolicy
import com.android.volley.VolleyError
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.buildathonstoryv0.ui.theme.BuildathonStoryV0Theme
import okhttp3.HttpUrl
import org.json.JSONObject
import java.util.Locale

class MainActivity : ComponentActivity() {
    private lateinit var pawpatrolbutton: ToggleButton
    private lateinit var carbutton: ToggleButton
    private lateinit var pikachubutton: ToggleButton
    private lateinit var lionbutton: ToggleButton
    private lateinit var peppapigbutton: ToggleButton
    private lateinit var sciencebutton: ToggleButton
    private lateinit var otherInterestsEditText: EditText
    private lateinit var childNameEditText: EditText
    private lateinit var submitButton: Button
    private lateinit var addImagesCheckBox: CheckBox
    private lateinit var resultTextView: TextView
    private lateinit var playAudioButton: ImageButton
    lateinit var tts: TextToSpeech

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        pawpatrolbutton = findViewById(R.id.pawpatrolbutton)
        carbutton = findViewById(R.id.carbutton)
        pikachubutton = findViewById(R.id.pikachubutton)
        lionbutton = findViewById(R.id.lionbutton)
        peppapigbutton = findViewById(R.id.peppapigbutton)
        sciencebutton = findViewById(R.id.sciencebutton)
        otherInterestsEditText = findViewById(R.id.other_interests_edittext)
        childNameEditText = findViewById(R.id.child_name_edittext)
        submitButton = findViewById(R.id.submit_button)
        addImagesCheckBox = findViewById(R.id.add_images_checkbox)
        playAudioButton = findViewById(R.id.play_audio)
        resultTextView = findViewById(R.id.resultTv)

        tts = TextToSpeech(applicationContext, TextToSpeech.OnInitListener {
            if(it == TextToSpeech.SUCCESS){
                Log.d("TTS: ", "Initialization successful")
                tts.language = Locale("en", "IN")
            }
            else{
                Log.e("TTS", "Initialization failed with error code: $it")
            }
        })

        submitButton.setOnClickListener {
            val otherInterests = otherInterestsEditText.text.toString()
            val childName = childNameEditText.text.toString()
            performAction(childName, otherInterests)
        }

        playAudioButton.setOnClickListener {
            val storyText = resultTextView.text.toString()
            if (tts.isSpeaking) {
                // Stop the TTS engine if it is currently speaking
                tts.stop()
            } else if (storyText.isNotEmpty()) {
                Log.d("TTS: ", "storyText is NOT empty")
                tts.speak(storyText, TextToSpeech.QUEUE_FLUSH, null, null)
                Log.d("TTS", "TTS has started")
                Log.d("Contents of StoryText", "storyText: $storyText")
            } else {
                Log.d("TTS", "storyText is empty")
                tts.speak("There is no story generated yet. Please generate a story first", TextToSpeech.QUEUE_FLUSH, null, null)
            }
        }
    }

    private fun performAction(nameInput: String, otherInterests: String) {
            resultTextView.text = "Generating Story..."

            val selectedButtons = mutableListOf<String>()
            if (pawpatrolbutton.isChecked) {
                selectedButtons.add("Paw Patrol")
            }
            if (carbutton.isChecked) {
                selectedButtons.add("Cars")
            }
            if (pikachubutton.isChecked) {
                selectedButtons.add("Pikachu")
            }
            if (lionbutton.isChecked) {
                selectedButtons.add("Lion")
            }
            if (peppapigbutton.isChecked) {
                selectedButtons.add("Peppa Pig")
            }
            if (sciencebutton.isChecked) {
                selectedButtons.add("Science")
            }

            val selectedButtonsString = selectedButtons.joinToString(separator = ", ")

            // Instantiate the RequestQueue.
            val queue = Volley.newRequestQueue(this)
            val url = "https://593f-34-87-63-234.ngrok.io"
            //Log.d("input", input)
            val jsonObject = JSONObject()
            var prompt:String
            if (nameInput.isEmpty())
            {
                if (selectedButtons.isEmpty()) {
                    prompt = "Make a story appropriate to a 3 year old. The story should also involve $otherInterests.The story should have many dialogs and an implicit moral. The story should be engaging for a 3 year old child.  The story should approximately have 500 words"
                } else {
                    prompt = "Make a story appropriate to a 3 year old. The story should also involve $otherInterests and $selectedButtonsString.The story should have many dialogs and an implicit moral. The story should be engaging for a 3 year old child.  The story should approximately have 500 words"
                }
            }
            else
            {
                if (selectedButtons.isEmpty()) {
                    prompt = "Make a story appropriate to a 3 year old. The story should star a 3 year old named $nameInput and also involve $otherInterests.The story should have many dialogs and an implicit moral. The story should be engaging for a 3 year old child.  The story should approximately have 500 words"
                } else {
                    prompt = "Make a story appropriate to a 3 year old. The story should star a 3 year old named $nameInput and also involve $otherInterests and $selectedButtonsString.The story should have many dialogs and an implicit moral. The story should be engaging for a 3 year old child.  The story should approximately have 500 words"
                }

            }
            val addImagesIsChecked = if (addImagesCheckBox.isChecked) "true" else "false"

        val requestUrl = HttpUrl.Builder()
            .scheme("https")
            .host("593f-34-87-63-234.ngrok.io")
            .addQueryParameter("prompt", prompt)
            .addQueryParameter("isPictureStory", addImagesIsChecked.toString())
            .build()


// Request a string response from the provided URL.
        val stringRequest = StringRequest(
            Request.Method.GET, requestUrl.toString(),
            Response.Listener<String> { response ->
                val jsonResponse = JSONObject(response)
                val stories = jsonResponse.getJSONArray("stories")
                val images = jsonResponse.getJSONArray("images")

                // Log the size of the stories and images arrays
                Log.d("MyApp", "Stories array size: ${stories.length()}")
                Log.d("MyApp", "Images array size: ${images.length()}")

                // Create a SpannableStringBuilder to hold the final text with images
                val builder = SpannableStringBuilder()

                // Check if the images array is not empty
                if (images.length() > 0) {
                    // Iterate over the stories and images arrays
                    for (i in 0 until stories.length()) {
                        // Append the current story to the builder
                        builder.append(stories.getString(i))

                        // Decode the current image from base64 and create a Bitmap
                        val imageBytes = Base64.decode(images.getString(i), Base64.DEFAULT)
                        val bitmap = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)

                        // Create an ImageSpan from the Bitmap
                        val imageSpan = ImageSpan(this, bitmap)

                        // Append a space character to the builder and set its span to the ImageSpan
                        builder.append(" ")
                        builder.setSpan(imageSpan, builder.length - 1, builder.length, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
                    }
                } else {
                    // The images array is empty, so just append all of the stories to the builder
                    for (i in 0 until stories.length()) {
                        builder.append(stories.getString(i))
                    }
                }

                // Update the resultTextView with the final text with images
                resultTextView.text = builder
            },

            Response.ErrorListener {
                // Log the error message
                Log.e("MyApp", "Error occurred: ${it.message}")

                resultTextView.text = "That didn't work!"
            })

            stringRequest.setRetryPolicy(object : RetryPolicy {
                override fun getCurrentTimeout(): Int {
                    return 500000
                }

                override fun getCurrentRetryCount(): Int {
                    return 15
                }

                override fun retry(error: VolleyError?) {

                }
            })

            // Add the request to the RequestQueue.
            queue.add(stringRequest)
    }
}