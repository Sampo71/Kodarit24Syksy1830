
document.getElementById('send-button').addEventListener('click',sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        sendMessage();
    }
});

document.getElementById('send-images-button').addEventListener('click',sendImages);
document.getElementById('send-answer-button').addEventListener('click',sendAnswer);

async function sendAnswer(){
   // console.log("Lähetetään vastausta");
   const answerInput = document.getElementById('answer-input').value
   if(answerInput.trim() === '') return;

   console.log(answerInput);
   addMessageToChatBox('You: ' + answerInput,'user-message', 'omaopebox');
   document.getElementById('answer-Input').value ='';
   try{

   }catch(error){
       console.log('Error:',error);
   }
}

async function sendImages(){
    const imageInput = document.getElementById('image-input');
    const files = imageInput.files;
    if(files.length === 0){
        alert('Select images first!')
        return;
    }

    const formData = new FormData();

   for(let i = 0; i < files.length; i++){
      formData.append('images',files[i]);

      console.log(formData)
   }

   try{
       const response = await fetch('/upload-Images',{
           method:'POST',
           body:formData
       })
       const data = await response.json();
       console.log(data);
       currentQuestion = data.question
       correctAnswer = data.answer
       console.log('Current question:' + currentQuestion);
       console.log('Current answer:' + correctAnswer);    
       addMessageToChatBox('OmaOpe: ' + currentQuestion, 'bot-message','omaopebox');

   }catch(error){
       console.error('Error:',error);
   }
    
}

async function sendMessage()
{
    // saves the text
    const userInput = document.getElementById('user-input').value;
    if(userInput.trim() === '') return;
    console.log(userInput)

    // clears input field
    document.getElementById('user-input');

    addMessageToChatBox('You:' + userInput,'user-message','chatbox');
    
    try{
        const response = await fetch('/chat',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question:userInput})
        });
    
        const data = await response.json();
    
        console.log(data);
        addMessageToChatBox(data.reply, 'bot-message','chatbox');
    }catch(error){
       console.error('Error', error);
       addMessageToChatBox('ChatGPT: Something went wrong','bot-message','chatbox');
    }

    //Clears input field
    document.getElementById('user-input').value = '';
}
function addMessageToChatBox(message,className,box){
    //Creates new div
    const messageElement = document.createElement('div');
    messageElement.classList.add('message',className);

    //Adding user message to div
    messageElement.textContent = message;
    console.log(messageElement);
    document.getElementById(box).appendChild(messageElement);
}