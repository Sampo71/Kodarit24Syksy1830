
document.getElementById('send-button').addEventListener('click',sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        sendMessage();
    }
});

async function sendMessage()
{
    // saves the text
    const userInput = document.getElementById('user-input').value;
    if(userInput.trim() === '') return;
    console.log(userInput)

    // clears input field
    document.getElementById('user-input').value = '';

    addMessageToChatBox(userInput);
    
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
    }catch(error){
       console.error('Error', error);
       addMessageToChatBox('ChatGPT: Something went wrong');
    }

    //Clear input field
    document.getElementById('user-input').value = '';
}
function addMessageToChatBox(message){
    //Creates new div
    const messageElement = document.createElement('div');
    //Adding user message to div
    messageElement.textContent = message;
    console.log(messageElement);
    document.getElementById('chatbox').appendChild(messageElement);
}