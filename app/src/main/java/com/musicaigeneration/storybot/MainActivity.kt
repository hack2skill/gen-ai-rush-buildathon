package com.musicaigeneration.storybot

import android.content.Intent
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.transition.TransitionManager
import android.util.Log
import android.view.KeyEvent
import android.view.View
import android.view.ViewGroup
import android.view.ViewTreeObserver
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.ToggleButton
import androidx.activity.ComponentActivity
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.RetryPolicy
import com.android.volley.VolleyError
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.bumptech.glide.Glide
import com.bumptech.glide.annotation.GlideModule
import com.bumptech.glide.module.AppGlideModule
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import okhttp3.HttpUrl
import org.json.JSONArray
import org.json.JSONObject
import java.util.Locale


@GlideModule
class MyAppGlideModule : AppGlideModule()

class SignInActivity : AppCompatActivity() {

    private lateinit var mGoogleSignInClient: GoogleSignInClient
    private val RC_SIGN_IN = 9001

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        // Configure sign-in to request the user's ID, email address, and basic profile.
        // ID and basic profile are included in DEFAULT_SIGN_IN.
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .build()

        // Build a GoogleSignInClient with the options specified by gso.
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)

        val signInButton = findViewById<SignInButton>(R.id.sign_in_button)
        signInButton.setOnClickListener {
            signIn()
        }

    }

    fun onClick(v: View) {
        when (v.id) {
            R.id.sign_in_button -> signIn()
        }
    }

    private fun signIn() {
        val signInIntent = mGoogleSignInClient.signInIntent
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }
    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    private fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account: GoogleSignInAccount = completedTask.getResult(ApiException::class.java)
            Log.d("handleSignInResult:","just before the start Activity function")

            // Signed in successfully, show authenticated UI.
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        } catch (e: ApiException) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            Log.w("failed login", "signInResult:failed code=" + e.statusCode)
        }
    }
}


class MainActivity : ComponentActivity() {
    lateinit var initialText1:TextView
    lateinit var initialText2:TextView
    lateinit var nameInput:EditText
    lateinit var sendBtn:Button;
    lateinit var resultTv:TextView;
    lateinit var intBtn:EditText;
    lateinit var interestsInput:EditText
    lateinit var addInterestButton:Button
    lateinit var currentInterestsList:TextView
    lateinit var clearInterestsButton:Button
    lateinit var diggerButton:ToggleButton
    lateinit var lionButton:ToggleButton
    lateinit var magicButton:ToggleButton
    lateinit var planetButton:ToggleButton
    lateinit var monkeyButton:ToggleButton
    lateinit var jeepButton:ToggleButton

    lateinit var clear_interests_button:Button
    lateinit var storyImage:ImageView
    lateinit var audioButton:ImageButton
    private val inputLayout by lazy { findViewById<View>(R.id.inputLayout) }
    private val outputLayout by lazy { findViewById<View>(R.id.outputLayout) }
    private val scrollView by lazy { findViewById<ScrollView>(R.id.scrollViewInputLayout) }
    private val insideScrollViewInputLayout by lazy {findViewById<LinearLayout>(R.id.insideScrollViewInputLayout)}

    var isInputLayoutMinimized = false
    var isOutputLayoutMinimized = true

    lateinit var tts:TextToSpeech
    val interests = mutableListOf<String>()
    lateinit var rootView:View

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        setContentView(R.layout.activity_main)
        rootView = findViewById(android.R.id.content)

        val viewTreeObserver = inputLayout.viewTreeObserver
        viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                inputLayout.viewTreeObserver.removeOnGlobalLayoutListener(this)
                val inputLayoutHeight = inputLayout.height
                Log.d("inputLayout height set to: ", "" + inputLayoutHeight)
                // Set the initial height of the top part to 50% of the screen.
                inputLayout.layoutParams.height = (resources.displayMetrics.heightPixels * 0.50).toInt()

            }
        })

        val viewTreeObserver2 = outputLayout.viewTreeObserver
        viewTreeObserver2.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                outputLayout.viewTreeObserver.removeOnGlobalLayoutListener(this)
                val outputLayoutHeight = outputLayout.height
                Log.d("outputLayout height set to: ", "" + outputLayoutHeight)
            }
        })


//        inputLayout = findViewById(R.id.inputLayout)
//        outputLayout = findViewById(R.id.outputLayout)

        initialText1 = findViewById(R.id.initialText1)
        initialText2 = findViewById(R.id.initialText2)
        nameInput = findViewById(R.id.name_input)
        interestsInput = findViewById(R.id.interests_input)
        //clear_interests_button = findViewById(R.id.clear_interests_button)
        currentInterestsList = findViewById(R.id.currentInterests)
        clearInterestsButton = findViewById(R.id.clearInterestsButton)
        diggerButton = findViewById(R.id.diggerButton)
        lionButton = findViewById(R.id.lionButton)
        magicButton = findViewById(R.id.magicButton)
        planetButton = findViewById(R.id.planetButton)
        monkeyButton = findViewById(R.id.monkeyButton)
        jeepButton = findViewById(R.id.jeepButton)

        sendBtn = findViewById(R.id.submit_button)
        resultTv = findViewById(R.id.ResultText)
        audioButton = findViewById(R.id.audioButton)
        var audioToggle = 0
        inputLayout.setClickable(true)
        scrollView.setClickable(true)

        tts = TextToSpeech(applicationContext, TextToSpeech.OnInitListener {
            if(it == TextToSpeech.SUCCESS){
                //Log.d("Languages: ", tts.availableLanguages.toString())
                tts.language = Locale("en", "IN")

            }
            else{
                Log.e("TTS", "Initialization failed with error code: $it")
            }
        })

        val interestButtons = arrayOf(
        diggerButton,
        lionButton,
        magicButton,
        planetButton,
        monkeyButton,
        jeepButton,
        )

        interestsInput.setOnKeyListener { v, keyCode, event ->
            if (keyCode == KeyEvent.KEYCODE_ENTER && event.action == KeyEvent.ACTION_UP) {
                // Perform action on key press
                val interestsInputText = interestsInput.text.toString().replace(Regex("[^A-Za-z0-9 ,']|\n"), "")
                if (interestsInputText.isNotEmpty()) {
                    if (interests.contains(interestsInputText)) {}
                    else {
                        interests.add(interestsInputText)
                    }
                }
                // Convert the interests list to a comma separated string
                val interestsString = interests.joinToString(", ")

                currentInterestsList.text =  interestsString
                interestsInput.setText("")
                true
            } else {
                false
            }
        }

        clearInterestsButton.setOnClickListener {
            interestsInput.setText("")
            currentInterestsList.setText("")
            for (button in interestButtons) {
                if (button.isChecked) {
                    button.isChecked = false
                }
            }
            interests.clear()
               }

        fun onInputMinimizedPartClick() {
            // Animate the top part to become big again
            val transition = TransitionManager.beginDelayedTransition(rootView as ViewGroup?)
            val layoutParams = inputLayout.layoutParams as LinearLayout.LayoutParams
            layoutParams.height = 0
            layoutParams.weight = 3f
            inputLayout.layoutParams = layoutParams

            val outputLayoutParams = outputLayout.layoutParams as LinearLayout.LayoutParams
            outputLayoutParams.height = 0
            outputLayoutParams.weight = 1f
            outputLayout.layoutParams = outputLayoutParams
            showComponents()
            isInputLayoutMinimized = false
            isOutputLayoutMinimized = true

            Log.d("inputLayout height set to: ", "" + inputLayout.height)
            Log.d("outputLayout height set to: ", "" + outputLayout.height)
        }

        fun onOutputMinimizedPartClick() {
            // Animate the top part to become small
            val transition = TransitionManager.beginDelayedTransition(rootView as ViewGroup?)
            val layoutParams = inputLayout.layoutParams as LinearLayout.LayoutParams
            layoutParams.height = 0
            layoutParams.weight = 0.5f
            inputLayout.layoutParams = layoutParams

            val outputLayoutParams = outputLayout.layoutParams as LinearLayout.LayoutParams
            outputLayoutParams.height = 0
            outputLayoutParams.weight = 3.5f
            outputLayout.layoutParams = outputLayoutParams

            Log.d("inputLayout height set to: ", "" + inputLayout.height)
            Log.d("outputLayout height set to: ", "" + outputLayout.height)
            hideComponents()
            scrollView.post {
                scrollView.fullScroll(View.FOCUS_DOWN)
            }
            isInputLayoutMinimized = true
            isOutputLayoutMinimized = false
            Log.d("isInputLayoutMinimized after story clicked", isInputLayoutMinimized.toString())
        }

        Log.d("Setting OnClickListener", "Setting OnClickListener for inputLayout")
        inputLayout.setOnClickListener {
            Log.d("isInputLayoutMinimized when inputLayout is clicked", isInputLayoutMinimized.toString())
            if (isInputLayoutMinimized) {
                onInputMinimizedPartClick()
            }
        }

        Log.d("Setting OnClickListener for Output", "Setting OnClickListener for outputLayout")
        outputLayout.setOnClickListener {
            Log.d("isoutputLayoutMinimized when outputLayout is clicked", isOutputLayoutMinimized.toString())
            if (isOutputLayoutMinimized) {
                onOutputMinimizedPartClick()
            }
        }

        resultTv.setOnClickListener{
            outputLayout.performClick()
        }

        scrollView.setOnClickListener {
            inputLayout.performClick()
        }

        insideScrollViewInputLayout.setOnClickListener{
            Log.d("InsideViewScroll: ", "inside view scroll layout")
            inputLayout.performClick()
        }

        sendBtn.setOnClickListener {
            // Animate the top part to become small
            val transition = TransitionManager.beginDelayedTransition(rootView as ViewGroup?)
            val layoutParams = inputLayout.layoutParams as LinearLayout.LayoutParams
            layoutParams.height = 0
            layoutParams.weight = 0.5f
            inputLayout.layoutParams = layoutParams

            val outputLayoutParams = outputLayout.layoutParams as LinearLayout.LayoutParams
            outputLayoutParams.height = 0
            outputLayoutParams.weight = 3.5f
            outputLayout.layoutParams = outputLayoutParams

            Log.d("inputLayout height set to: ", "" + inputLayout.height)
            Log.d("outputLayout height set to: ", "" + outputLayout.height)
            hideComponents()
            scrollView.post {
                scrollView.fullScroll(View.FOCUS_DOWN)
            }
            isInputLayoutMinimized = true
            Log.d("isInputLayoutMinimized after story clicked", isInputLayoutMinimized.toString())

            //   interests.clear()
            // Add the interests from the interestsInput field
                val interestsInputText = interestsInput.text.toString().replace(Regex("[^A-Za-z0-9 ,']|\n"), "")
                if (interestsInputText.isNotEmpty()) {
                    if (interests.contains(interestsInputText)) {}
                    else {
                        interests.add(interestsInputText)
                    }
                }

                // Add the interests from the checkboxes
                for (i in 0 until interestButtons.size) {
                    val checkbox = interestButtons[i]
                    if (checkbox.isChecked) {
                        var buttonName = checkbox.resources.getResourceEntryName(checkbox.id)
                        buttonName = buttonName.replace("Button", "")

                        //val checkboxText = checkbox.text.toString()
                        if (interests.contains(buttonName)) {}
                        else {
                            interests.add(buttonName)
                        }
                    }
                }

                // Convert the interests list to a comma separated string
                val interestsString = interests.joinToString(", ")
                // Log the interestsString variable
                Log.d("MyApp", "Interests: $interestsString")
                var duration = "long"
                //if (ThreeminutesCheckbox.isChecked){
            //    duration = "short"
            //}
            //  if (FiveminutesCheckbox.isChecked){
            //      duration = "medium"
            //  }
            //  if (TenminutesCheckbox.isChecked){
            //      duration = "long"
            //  }

                performAction( nameInput.text.toString(), interestsString, duration)
                //val imagePrompt = "Please make an image that can serve as a cover for a story starring a a 3 year old and $interestsString."
                //generateImages(imagePrompt)

            Log.d("exiting SubmitClick", "Exiting submit button click")
        }

        audioButton.setOnClickListener {
            val storyText = resultTv.text.toString()
            if (storyText.isNotEmpty()) {
                val isSpeaking = tts.isSpeaking
                if (isSpeaking)
                {
                    tts.stop()
                }
                else
                {
                    val chunks = storyText.chunked(4000) // split the text into smaller chunks
                    for (chunk in chunks) {
                        tts.speak(
                            chunk,
                            TextToSpeech.QUEUE_ADD,
                            null,
                            null
                        ) // add each chunk to the TTS queue
                    }
                }

            }
            else {
                tts.speak("There is no story generated yet. Please generate a story first", TextToSpeech.QUEUE_FLUSH, null, null)
            }

        }


    }

    fun performAction(nameInput:String, input:String, duration:String){
        resultTv.text = "Generating Story..."
        // Instantiate the RequestQueue.
        val queue = Volley.newRequestQueue(this)
        val url = "https://gpt-trials-py-run-mja7vtntja-uc.a.run.app/"
        //Log.d("input", input)
        val jsonObject = JSONObject()
        var prompt:String
        if (nameInput.isEmpty())
        {
            prompt = "Make a story appropriate to a 3 year old. The story should also involve $input.The story should have many dialogs and an implicit moral. The story should be engaging for a 3 year old child.  The story should approximately have 500 words"
        }
        else
        {
            prompt = "Make a story appropriate to a 3 year old. The story should star a 3 year old names $nameInput and also involve $input.The story should have many dialogs and an implicit moral. The story should be engaging for a 3 year old child.  The story should approximately have 500 words"

        }

        val requestUrl = HttpUrl.Builder()
            .scheme("https")
            .host("gpt-trials-py-run-mja7vtntja-uc.a.run.app")
            .addQueryParameter("prompt", prompt)
            .build()

        // Request a string response from the provided URL.
        val stringRequest = StringRequest(
            Request.Method.GET, requestUrl.toString(),
            Response.Listener<String> { response ->
                val jsonResponse = JSONObject(response)
                val story = jsonResponse.getString("response")
                // Display the first 500 characters of the response string.
                resultTv.text = story
            },
            Response.ErrorListener {
                // Log the error message
                Log.e("MyApp", "Error occurred: ${it.message}")

                resultTv.text = "That didn't work!"
            })

        stringRequest.setRetryPolicy(object : RetryPolicy {
            override fun getCurrentTimeout(): Int {
                return 60000
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

    fun generateImages(input:String){
        // Instantiate the RequestQueue.
        val queue = Volley.newRequestQueue(this)
        val url = "https://api.openai.com/v1/images/generations"
        //Log.d("input", input)
        val jsonObject = JSONObject()
        val prompt = input//"Make a story appropriate to a 3 year old. The story should also involve $input.The story should have many dialogs and a moral at the end of it."

        Log.d("ImageGenerationPrompt: ", prompt)
        jsonObject.put("prompt", prompt)
        jsonObject.put("n", 1)
        //jsonObject.put("stream", "True")
        jsonObject.put("size", "256x256")

        Log.d("ImageGenerationJson", jsonObject.toString())

        // Request a string response from the provided URL.
        val stringRequest = object: JsonObjectRequest(
            Request.Method.POST, url,jsonObject,
            Response.Listener<JSONObject> { response ->
                var imageURL = response.getJSONArray("data").getJSONObject(0).getString("url")
                // Display the first 500 characters of the response string.
                //resultTv.text = imageURL
                Glide.with(this)
                    .load(imageURL)
                    .into(storyImage)
                storyImage.visibility = View.VISIBLE
            },
            Response.ErrorListener {
                // Log the error message
                Log.e("MyApp", "Error occurred: ${it.message}")

                resultTv.text = "That didn't work!" })
        {
            override fun getHeaders(): MutableMap<String, String> {
                var map = HashMap<String, String>()
                map.put("Content-Type","application/json")
                map.put("Authorization" , "Bearer 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")
                return map
            }
        }

        stringRequest.setRetryPolicy(object:RetryPolicy{
            override fun getCurrentTimeout(): Int {
                return 10000
            }

            override fun getCurrentRetryCount(): Int {
                return 5
            }

            override fun retry(error: VolleyError?) {

            }
        })

        // Add the request to the RequestQueue.
        queue.add(stringRequest)
    }

    private fun hideComponents() {
        initialText1.visibility = View.GONE
        initialText2.visibility = View.GONE
        nameInput.visibility = View.GONE
        interestsInput.visibility = View.GONE
        currentInterestsList.visibility = View.GONE
        diggerButton.visibility = View.GONE
        lionButton.visibility = View.GONE
        magicButton.visibility = View.GONE
        planetButton.visibility = View.GONE
        monkeyButton.visibility = View.GONE
        jeepButton.visibility = View.GONE
        // ...
    }
    private fun showComponents() {
        initialText1.visibility = View.VISIBLE
        initialText2.visibility = View.VISIBLE
        nameInput.visibility = View.VISIBLE
        interestsInput.visibility = View.VISIBLE
        currentInterestsList.visibility = View.VISIBLE
        diggerButton.visibility = View.VISIBLE
        lionButton.visibility = View.VISIBLE
        magicButton.visibility = View.VISIBLE
        planetButton.visibility = View.VISIBLE
        monkeyButton.visibility = View.VISIBLE
        jeepButton.visibility = View.VISIBLE

    }

}