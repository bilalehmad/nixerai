
export const POST = async (req) => {

    if (req.method !== 'POST') {
        return new Response('Method should be POST',{staus:405});
    }
    else {
      try {
        const { model,messages } = await req.json();;
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
            body: JSON.stringify(data), 
          })
          const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        var result = [];
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
                    result.push(content)
                }
            }
        }
        // const result = await response.json()
        return new Response(JSON.stringify(result), { status: 200 })
        
        } catch (error) {
            console.log(error)
            return new Response("Failed to fetch all Tool", { status: 500 })
        }
    }
    
  }