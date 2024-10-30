
document.getElementById('send-images-button').addEventListener('click',sendImages);
document.getElementById('send-button').addEventListener('click',sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        sendMessage();
    }
});

function sendImages(){
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
    
}

async function sendMessage()
{
    // saves the text
    const userInput = document.getElementById('user-input').value;
    if(userInput.trim() === '') return;
    console.log(userInput)

    // clears input field
    document.getElementById('user-input');

    addMessageToChatBox('You:' + userInput,'user-message');
    
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
        addMessageToChatBox(data.reply, 'bot-message');
    }catch(error){
       console.error('Error', error);
       addMessageToChatBox('ChatGPT: Something went wrong','bot-message');
    }

    //Clears input field
    document.getElementById('user-input').value = '';
}
function addMessageToChatBox(message,className){
    //Creates new div
    const messageElement = document.createElement('div');
    messageElement.classList.add('message',className);

    //Adding user message to div
    messageElement.textContent = message;
    console.log(messageElement);
    document.getElementById('chatbox').appendChild(messageElement);
}