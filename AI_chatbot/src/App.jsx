import { useState } from "react";
import {Assistant} from "./assistants/googleai";
//import {Assistant} from "./assistants/openai";
import { Chat } from "./Components/Chat/Chat";
import { Controls } from "./Components/Controls/Controls";
import styles from "./App.module.css";
import { Loader } from "./Components/Loader/Loader";





function App() {

  const assistant = new Assistant()

  const [messages,setMessages] =useState([]);
  const [isLoading,setLoading] = useState(false);
  const [isStraming,setIsStreaming] = useState(false);

  function updateLastMessageContent(content){
    setMessages((prevMessages) =>prevMessages.map((message,index) => index === prevMessages.length -1 ?{...message,content:`${message.content}${content}`}:message))
  }
  

  function addMessage(message)
  {
    setMessages((prevMessages) =>[...prevMessages,message]);
  }

  async function handleContentSend(content)
  {
    addMessage({content,role:'user'})
    setLoading(true);

    try {

      const result = await assistant.chatStream(content);
      let isFristChunk =false;

      for await (const chunk of result){

        if(!isFristChunk){
          isFristChunk = true;
          addMessage({content:"" , role:"assistant"});
          setLoading(false);
          setIsStreaming(true);
        }

        updateLastMessageContent(chunk)

      }
      
      setIsStreaming(false);
      
    } catch (error) {
      
      addMessage({content: "Sorry, I could't process your request, Please try again",role:'system'});
      setLoading(false);
      setIsStreaming(false);
    }
    

  }

  return (
    
      <div className={styles.App}>

        {isLoading && <Loader/>}

        <header className={styles.Header}>

          <img className={styles.Logo} src="/pngwing.com-22.png" />
          <h2 className={styles.Title}>AI Chatbot</h2>
        </header>

        <div className={styles.ChatContainer}>
          <Chat messages={messages}/>
        </div>
        <Controls isDisabled={isLoading || isStraming} onSend={handleContentSend}/>

      </div>
    
  )
}



export default App;
