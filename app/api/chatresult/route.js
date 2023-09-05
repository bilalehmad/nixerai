
import { getServerSession  } from 'next-auth/next';
import {authOptions} from '../auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import { cookies } from 'next/dist/client/components/headers';

export const POST = async (req) => {

    if (req.method !== 'POST') {
        return new Response('Method should be POST',{staus:405});
    }
    else {
      try {
        const session = await getServerSession(authOptions);
        if(!session?.user){
            redirect('/')
        }
        const { model,messages } = await req.json();
            const reqUrl = new URL(req.url);
            const origin = reqUrl.origin;
            //console.log(origin,"------------------------origin")
            //console.log(messages,"-------------------Request")
            const _url = `${origin}/api/chat/new`;
            const userId = session?.user.id;
            const _data = {
                messages:messages,
                userId: userId
            }
            const _headers = {
                'Content-type': 'application/json'
            }

            const _response = await fetch(_url, {
                method: 'POST', 
                headers: _headers,
                body: JSON.stringify(_data), 
            })

            const _result = await _response.json();
            //console.log(_result._id)
            const chatID = _result._id;
            var data = {
                model: model,
                messages: messages,
                stream: true
            }
            
            const url = 'https://api.openai.com/v1/chat/completions';
            const headers = {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
            }

            const response = await fetch(url, {
                method: 'POST', 
                headers: headers, 
                body: JSON.stringify(data)
            })
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            var result = [];
            var fullContent = "";
            result.push(chatID)
            while(true) {
                const chunk = await reader.read();
                const {done, value} = chunk;
                if(done){
                    break;
                }
                const decodedChunk = decoder.decode(value);
                const lines = decodedChunk.split("\n");
                
                const parsedLines = lines.map((line) => line.replace(/^data: /,"").trim())
                                    .filter(line => line !== "" && line !== "[DONE]")
                                    .map(line => JSON.parse(line))
                for(const parsedLine of parsedLines)
                {
                    const {choices} = parsedLine;
                    const {delta} = choices[0];
                    const {content} = delta;
                    if(content)
                    {
                        // console.log(content)
                        fullContent += content;
                        result.push(content)
                    }
                }
            }
            const url_ = `${origin}/api/chat/send`;

            const data_ = {
                chatID: chatID,
                role: "assistant",
                content : fullContent,
                userId: userId
            }
            const response_ = await fetch(url_, {
                method: 'POST', 
                body: JSON.stringify(data_), 
            })

            const result_ = await response_.json();
            //console.log(result_)
            // const result = await response.json()
            return new Response(JSON.stringify(result), { status: 200 })
        
        } catch (error) {
            console.log(error)
            return new Response("Failed to fetch all Tool", { status: 500 })
        }
    }
    
  }