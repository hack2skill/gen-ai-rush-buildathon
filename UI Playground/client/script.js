
// window.addEventListener('load', initialLoadRepoFetch);

const form = document.querySelector('form');
// const chatContainer = document.querySelector('#chat_container');

var button = document.getElementById("copybtn");
button.addEventListener("click", copy);


// change on repodrop down
const dropdown = document.getElementById('reposelectop');
// dropdown.addEventListener('change', getRepo); chnage now
dropdown.addEventListener('change' , getbranch)

const dropdown_mod = document.getElementById('moduleselect')
// dropdown_mod.addEventListener('change',getmodules)
dropdown_mod.addEventListener('change', getModulesOnChange)

const branchDropDown = document.getElementById('branchselect')
branchDropDown.addEventListener('change', getRepo)



const openButton = document.getElementById('openButton');
const card = document.getElementById('card');

openButton.addEventListener('click', () => {
  card.classList.toggle('open');
});

let gitpat
let repoOwner

const saveCred = document.getElementById('saveButton')
saveCred.addEventListener('click', saveinletcred)

const resetCred = document.getElementById('resetButton')
resetCred.addEventListener('click' , reset)

const gitpattoken = document.getElementById('gitpat')
const repo = document.getElementById('repoowner')




// next button to validate and send to prompt

const next_btn = document.getElementById('next_pass')
next_btn.addEventListener('click', passcode)


const mod_text_area = document.getElementById('module_text_code')
const code = document.getElementById('code')

const radioButtons = document.querySelectorAll('input[name="content"]');

const testScenarioTextArea = document.getElementById('scenario')



// save to sheet functionality
// const saveToSheet = document.getElementById('savetosheet')
// saveToSheet.addEventListener('click' , saveSheet);


// --------- <Code break flow check -> send > --------------
const reposendfinal = document.getElementById('reposendfinal')
reposendfinal.addEventListener('click' , callupload)

const resFromGpt = document.getElementById('result')



function callupload(){
  // console.log(resFromGpt.value)
  upload(resFromGpt.value)
}

function saveinletcred(){
  gitpat = gitpattoken.value;
  repoOwner = repo.value;
  gitpattoken.disabled = true;
  repo.disabled=true;
  saveCred.disabled = true
  console.log(gitpat)
  console.log(repoOwner)
  initialLoadRepoFetch()

}

function reset(){
  gitpattoken.disabled = false;
  repo.disabled=false;
  gitpattoken.value = ""
  repo.value = ""
  saveCred.disabled = false
}


radioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "AI") {
      getAi()
    }
    else if (selectedValue == 'manual') {
      manual()
    }
  });
});


function getbranch(){

  const currentSelectedRepo = dropdown.value;

  fetch('https://rhjkfe3uzyp6k7qtxsgbv3eahe0vylke.lambda-url.us-east-1.on.aws/'+ gitpat +"/"+repoOwner+"/"+currentSelectedRepo,)
    .then(response => response.json())
    .then(data => {
      // Process the response data
      console.log(data);

      data.forEach((item) => {
        const option = document.createElement('option');
        option.text = item;
        option.value = item;
        branchDropDown.add(option);
      });
    })
    .catch(error => {

      console.error(error);
    });

}



function manual() {
  console.log("Called manual")
  testScenarioTextArea.innerHTML = ''
}

async function getAi() {
  const preScenarioTest = "what are the  possible test case scenario give me atmost 3 in bullet points and i do not want any extra information - just the headings"
  loader(testScenarioTextArea)

  const responseForScenario = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: preScenarioTest + code.value
    })
  })
  // console.log(code.value)
  console.log(responseForScenario)
  if (responseForScenario.ok) {
    const dataScenario = await responseForScenario.json();
    const parsedData = dataScenario.bot.trim();
    // console.log(parsedData)
    // typeText(messageDiv, parsedData);  // not sure if we need it
    testScenarioTextArea.innerHTML = parsedData
    clearInterval(loadInterval)

  } else {
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong"
  }


}

function passcode() {
  code.innerHTML = mod_text_area.value
}

function initialLoadRepoFetch() {
  fetch('https://j6ielk5n6hszckjljf2h5dqld40rjwfg.lambda-url.us-east-1.on.aws/'+ gitpat +"/"+repoOwner ,)
    .then(response => response.json())
    .then(data => {
      // Process the response data
      console.log(data);

      data.forEach((item) => {
        const option = document.createElement('option');
        option.text = item;
        option.value = item;
        dropdown.add(option);
      });
    })
    .catch(error => {

      console.error(error);
    });

}

function getRepo() {


  console.log(dropdown.value + " " + branchDropDown.value)
  getmodules(dropdown.value , branchDropDown.value)
  // fetch('https://x5jxndkenyhwewpvzrslwufyle0egkxk.lambda-url.us-east-1.on.aws/',)
  // .then(response => response.json())
  // .then(data => {
  //   // Process the response data
  //   console.log(data);

  //   data.forEach((item) => {
  //     const option = document.createElement('option');
  //     option.text = item;
  //     option.value = item;
  //     dropdown.add(option);
  //   });

  //   console.log(dropdown.value)
  //   getmodules(dropdown.value)

  //   // Update the dropdown or perform other actions
  //   // based on the response data
  // })
  // .catch(error => {
  //   // Handle any errors that occurred during the request
  //   console.error(error);
  // });

}

function getmodules(repo_name,branchName) {

  fetch('https://k7utvfotny65blulvwbt4cfk5q0tzfbd.lambda-url.us-east-1.on.aws/'+ gitpat +"/"+repoOwner+ "/" + repo_name + "/"+branchName,)
    .then(response => response.json())
    .then(data => {
      // Process the response data
      console.log(data);
      dropdown_mod.innerHTML = ''
      const option = document.createElement('option');
      option.text = "Select";

      dropdown_mod.add(option);
      data.forEach((item) => {
        const option = document.createElement('option');
        option.text = item;
        option.value = item;
        dropdown_mod.add(option);
      });

      console.log(dropdown_mod.value);
      // getcodefrommodule(dropdown_mod.value);     uncommment this line


      // Update the dropdown or perform other actions
      // based on the response data
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });

}

function getModulesOnChange() {
  console.log(dropdown_mod.value)
  getcodefrommodule(dropdown_mod.value)
}


function getcodefrommodule(module_name) {
  fetch('https://4abx25jvldfd5ju2vcinbr2ska0smysf.lambda-url.us-east-1.on.aws/' + module_name + "/"+ dropdown.value + "/" + branchDropDown.value + "/" + gitpat +"/"+repoOwner,)
    .then(response => response.json())
    .then(data => {
      // Process the response data
      console.log(data)

      mod_text_area.innerHTML = data;


      // Update the dropdown or perform other actions
      // based on the response data
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });

}





// var button = document.getElementById("savebtn");
// button.addEventListener("click", save);

let loadInterval;

// AWS.config.update({
//   accessKeyId: 'AKIA3BDIM4TSEY5MUWPL',
//   secretAccessKey: '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',
//   region: 'us-east-1'
// });

const s3 = new AWS.S3({
  accessKeyId: 'AKIARV5DYSHCSW7TYOEZ',
  secretAccessKey: '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',
});

const lambda = new AWS.Lambda({
  accessKeyId: 'AKIARV5DYSHCSW7TYOEZ',
  secretAccessKey: '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',
  region: 'us-east-1'
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('waiting for file upload');
  await sleep(5000); // Sleep for 5 seconds (5000 milliseconds)
  console.log('file upload completed');
}


async function upload(parsedData) {
  console.log(parsedData)
  const params = {
    Bucket: "tempopenaibucket",
    Key: "Text.txt",
    Body: parsedData,

  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      return;
    }
    console.log('File uploaded successfully:', data.Location);
  });

  //alert("The code has been pushed to repo successfully")
  console.log("code pushed to bucket")

  reposendfinal.innerHTML = "Code in Transit"
  await run()


  triggerLambda("pushbacktogithub")
}

async function triggerLambda(lambdaFunctionName) {
  const userInput = prompt("Enter Your File Name include extention")
  const commitMessage = prompt("Enter your commit message")
  console.log(lambda)
  const params = {
    FunctionName: lambdaFunctionName,
    InvocationType: 'Event', // Set the invocation type as needed (Event, RequestResponse, etc.)
    Payload: JSON.stringify({
      param1: branchDropDown.value,
      param2: userInput,
      param3: dropdown.value,
      param4: gitpat,
      param5: repoOwner, 
      //param6: dropdown_mod.value,
      param7: commitMessage,
      param6: 'src/test/java/com/brillio',
      param8 : 'Text.txt'
    })
  };

  try {
    const response = await lambda.invoke(params).promise();
    reposendfinal.innerHTML = "Push Success"
    await run()
    reposendfinal.innerHTML = "Send To Repo"
    console.log('Lambda function triggered successfully:', response);
    // Handle the response from the Lambda function if needed
  } catch (error) {
    console.error('Failed to trigger Lambda function:', error);
    // Handle the error if the Lambda function invocation fails
  }
}

function copy() {

  var copyText = document.getElementById("result");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert("Copied To ClipBoard");

}


function downloadFile(filename, content) {
  // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
  const element = document.createElement('a');

  //A blob is a data type that can store binary data
  // "type" is a MIME type
  // It can have a different value, based on a file you want to save
  const blob = new Blob([content], { type: 'plain/text' });

  //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
  const fileUrl = URL.createObjectURL(blob);

  //setAttribute() Sets the value of an attribute on the specified element.
  element.setAttribute('href', fileUrl); //file location
  element.setAttribute('download', filename); // file name
  element.style.display = 'none';

  //use appendChild() method to move an element from one element to another
  document.body.appendChild(element);
  element.click();

  //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
  document.body.removeChild(element);
};

window.onload = () => {
  document.getElementById('savebtn').
    addEventListener('click', e => {

      //The value of the file name input box
      // const filename = "new.txt";
      var filename = prompt("Please Enter Your File Name ", "Unit Test Case");
      filename = filename + ".txt"
      //The value of what has been input in the textarea
      const content = document.getElementById('result').value;


      // The && (logical AND) operator indicates whether both operands are true. If both operands have nonzero values, the result has the value 1 . Otherwise, the result has the value 0.

      if (filename && content) {
        downloadFile(filename, content);
      }
    });
};

function loader(element) {

  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  element.innerHTML += text
}


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const data = new FormData(form);
//   const messageDiv = document.getElementById("result");

//   loader(messageDiv)

//   let message = "Assume you are a software tester, you need to provide test cases for the code and scenarios provided. ";
//   let postMessage = "provide me the unit test code for these scenarios using junit, ensure to include all import statements ";
//   console.log(message)
//   const response = await fetch('http://localhost:5000', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       prompt: message + data.get('code') + postMessage + data.get('scenario')
//     })
//   })

//   console.log(message + data.get('code') + postMessage + data.get('scenario'))

//   console.log(response)

//   clearInterval(loadInterval);
//   messageDiv.innerHTML = ""

//   if (response.ok) {
//     const data = await response.json();
//     const parsedData = data.bot.trim();
//     console.log(parsedData)
//     typeText(messageDiv, parsedData);
    
//   } else {
//     const err = await response.text();
//     messageDiv.innerHTML = "Something went wrong"
//   }
// }

async function getdata() {
  const params = {
    Bucket: "turingtribe",
    Key: "Text.txt",
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data.Body.toString('utf-8'))
      resFromGpt.innerHTML = " "
      resFromGpt.innerHTML = data.Body.toString('utf-8')
    }
  });
}

const handleSubmit = async (e) => {
  e.preventDefault();

  resFromGpt.innerHTML = ""
  const promptTosend =code.value +  testScenarioTextArea.value

  const params = {
    FunctionName: "OnlyOpenAI",
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({
      param1: promptTosend,
    }),
  };

  try {
    console.log("Open AI Function triggered")
    const response = await lambda.invoke(params).promise();
    console.log('Lambda function triggered successfully:', response);

  } catch (error) {
    console.error('Failed to trigger Lambda function:', error);
  }
  getdata()
}



form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
})
